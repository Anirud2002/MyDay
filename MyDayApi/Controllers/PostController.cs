using System.Security.Claims;
using Amazon.DynamoDBv2.DataModel;
using Amazon.DynamoDBv2.DocumentModel;
using Microsoft.AspNetCore.Mvc;
using MyDay.Api.DTOs;
using MyDay.Api.Entities;
using MyDay.Api.Extensions;
using MyDayApi.Entities;
using MyDayApi.Interface;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MyDay.Api.Controllers
{
    [Route("/api/[controller]")]
    public class PostController : Controller
    {
        private readonly IDynamoDBContext _dynamoDBContext;
        public IPhotoService _photoService;
        public PostController(IDynamoDBContext dynamoDBContext, IPhotoService photoService)
        {
            _dynamoDBContext = dynamoDBContext;
            _photoService = photoService;
        }

        [HttpGet("{category}")]
        public async Task<ActionResult> GetPosts(string category)
        {
            var conditions = new List<ScanCondition>();
            // using scan condition because every post has different partition key
            conditions.Add(new ScanCondition("Category", ScanOperator.Contains, category.ToUpper()));
            List<Post> posts = await _dynamoDBContext.ScanAsync<Post>(conditions).GetRemainingAsync();

            List<PostViewModelDTO> postViewModel = new List<PostViewModelDTO>();

            for (int i = 0; i < posts.Count; i++)
            {
                postViewModel.Add(new PostViewModelDTO().toViewModel(posts[i]));
            }

            return new OkObjectResult(postViewModel);
        }

        [HttpGet("userposts/{category}")]
        public async Task<ActionResult> GetUserMyDayPost(string category)
        {
            var userName = User.GetUserName();
            var user = await _dynamoDBContext.LoadAsync<MyDayUser>(userName);
            List<PostViewModelDTO> myDayPosts = new List<PostViewModelDTO>();

            var config = new DynamoDBOperationConfig
            {
                QueryFilter = new List<ScanCondition>() {
                new ScanCondition("Category", ScanOperator.Equal, category.ToUpper())
            }
            };


            foreach (string id in user.PostIDs)
            {
                var post = await _dynamoDBContext.QueryAsync<Post>(id, config).GetRemainingAsync();
                if (post.Count > 0)
                {
                    myDayPosts.Add(new PostViewModelDTO().toViewModel(post[0]));
                }
            }
            return new OkObjectResult(myDayPosts);
        }

        [HttpPost]
        public async Task<ActionResult> CreateMyDayPost([FromForm] PostDTO postDTO)
        {
            var userName = User.GetUserName();
            var user = await _dynamoDBContext.LoadAsync<MyDayUser>(userName);

            if (user == null)
            {
                return BadRequest("User not found!");
            };

            var photo = new List<Photo>();
            
            if(postDTO.Photo != null)
            {
                var result = await _photoService.AddImageAsync(postDTO.Photo);
                if (result.Error != null) return BadRequest("Couldn't add the photo");
                photo.Add(new Photo
                {
                    URL = result.SecureUrl.AbsoluteUri,
                    PublicID = result.PublicId
                });
            }

            var creatorPic = new Photo();

            if (!string.IsNullOrEmpty(user.ProfilePic.URL)) // if the user posting something has an image, set that as creator pic
            {
                creatorPic = user.ProfilePic;
            }

            var post = new Post()
            {
                PostID = Guid.NewGuid().ToString(),
                PostedOn = ((DateTimeOffset)DateTime.Now).ToUnixTimeMilliseconds(),
                Category = postDTO.Category.ToUpper(),
                FirstName = user.FirstName,
                LastName = user.LastName,
                UserName = user.UserName,
                CreatorPic = creatorPic,
                Body = postDTO.Body,
                Hashtags = postDTO.Hashtags,
                Likes = 0,
                Photos = photo,
                Comments = new List<Comment>(),
                LikedBy = new List<string>()
            };

            // inserting new PostID for that particular user
            user.PostIDs.Insert(0, post.PostID);

            await _dynamoDBContext.SaveAsync<MyDayUser>(user);
            await _dynamoDBContext.SaveAsync<Post>(post);

            return new OkObjectResult(new PostViewModelDTO().toViewModel(post));
        }

        [HttpDelete("{postID}/{date}")]
        public async Task<ActionResult> DeletePost(string postID, long date)
        {
            var user = await _dynamoDBContext.LoadAsync<MyDayUser>(User.GetUserName());
            var idxToRemove = user.PostIDs.FindIndex(id => id.Contains(postID));
            // getting rid of the particular post id from the user table as well
            if (idxToRemove >= 0)
            {
                user.PostIDs.RemoveAt(idxToRemove);
                if (user.PostIDs.Count == 0)
                {
                    user.PostIDs = new List<string>(); // if not working, set the value to "null"
                }
                await _dynamoDBContext.SaveAsync<MyDayUser>(user);
            }

            var post = await _dynamoDBContext.LoadAsync<Post>(postID, date);


            await _dynamoDBContext.DeleteAsync<Post>(post);
            return new OkResult();
        }
    }



}

