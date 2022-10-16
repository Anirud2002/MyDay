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
            conditions.Add(new ScanCondition("Category", ScanOperator.Contains, category.ToUpper()));
            List<Post> posts = await _dynamoDBContext.ScanAsync<Post>(conditions).GetRemainingAsync();

            List<PostViewModelDTO> postViewModel = new List<PostViewModelDTO>();

            for(int i = 0; i < posts.Count; i++)
            {
                postViewModel.Add(new PostViewModelDTO()
                {
                    PostID = posts[i].PostID,
                    PostedOn = posts[i].PostedOn,
                    Category = posts[i].Category,
                    FirstName = posts[i].FirstName,
                    LastName = posts[i].LastName,
                    UserName = posts[i].UserName,
                    Body = posts[i].Body,
                    Hashtags = posts[i].Hashtags,
                    Likes = posts[i].Likes,
                    LikedBy = posts[i].LikedBy,
                    Comments = posts[i].Comments
                });
            }

            return new OkObjectResult(postViewModel);
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
                Category = postDTO.Category,
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

            await _dynamoDBContext.SaveAsync<Post>(post);
            await _dynamoDBContext.SaveAsync<MyDayUser>(user);

            return new OkObjectResult(new PostViewModelDTO
            {
                PostID = post.PostID,
                Category = postDTO.Category,
                FirstName = user.FirstName,
                LastName = user.LastName,
                UserName = user.UserName,
                PostedOn = post.PostedOn,
                Body = postDTO.Body,
                Hashtags = postDTO.Hashtags
            });
        }
    }

    
}

