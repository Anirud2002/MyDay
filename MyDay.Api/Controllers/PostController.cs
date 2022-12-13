using System.Security.Claims;
using Amazon.DynamoDBv2.DataModel;
using Amazon.DynamoDBv2.DocumentModel;
using Microsoft.AspNetCore.Mvc;
using MyDay.Api.DTOs;
using MyDay.Api.Entities;
using MyDay.Api.Extensions;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MyDay.Api.Controllers
{
    [Route("/api/[controller]")]
    public class PostController : Controller
    {
        private readonly IDynamoDBContext _dynamoDBContext;
        public PostController(IDynamoDBContext dynamoDBContext)
        {
            _dynamoDBContext = dynamoDBContext;
        }

        [HttpGet("{category}")]
        public async Task<ActionResult> GetPosts(string category)
        {
            var conditions = new List<ScanCondition>();
            // using scan condition because every post was different partition key
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


            foreach (String id in user.PostIDs)
            {
                var post = await _dynamoDBContext.QueryAsync<Post>(id, config).GetRemainingAsync();
                if (post.Count > 0)
                {
                    myDayPosts.Add(new PostViewModelDTO().toViewModel(post[0]));
                }
            }
            return new OkObjectResult(myDayPosts.OrderByDescending(x => x.PostedOn).ToList());
        }

        [HttpPost]
        public async Task<ActionResult> CreateMyDayPost([FromBody] PostDTO postDTO)
        {
            var userName = User.GetUserName();

            if (string.IsNullOrEmpty(userName))
            {
                return BadRequest("User not found!");
            };

            var user = await _dynamoDBContext.LoadAsync<MyDayUser>(userName);

            var post = new Post()
            {
                PostID = Guid.NewGuid().ToString(),
                PostedOn = DateTime.Now,
                Category = postDTO.Category.ToUpper(),
                FirstName = user.FirstName,
                LastName = user.LastName,
                UserName = user.UserName,
                Body = postDTO.Body,
                Hashtags = postDTO.Hashtags,
                Likes = 0,
                Comments = new List<Comment>(),
                LikedBy = new List<string>()
            };

            // inserting new PostID for that particular user
            user.PostIDs.Insert(0, post.PostID);

            await _dynamoDBContext.SaveAsync<MyDayUser>(user);
            await _dynamoDBContext.SaveAsync<Post>(post);

            return new OkObjectResult(new PostViewModelDTO().toViewModel(post));
        }
    }


}

