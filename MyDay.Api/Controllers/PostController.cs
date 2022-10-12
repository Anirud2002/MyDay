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
            conditions.Add(new ScanCondition("Category", ScanOperator.Contains, category));
            List<Post> posts = await _dynamoDBContext.ScanAsync<Post>(conditions).GetRemainingAsync();

            return new OkObjectResult(posts);
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
                AppUserID = user.AppUserID,
                PostedOn = DateTime.Now,
                Category = postDTO.Category,
                FirstName = user.FirstName,
                LastName = user.LastName,
                UserName = user.UserName,
                MyDayPostID = Guid.NewGuid().ToString(),
                Body = postDTO.Body,
                Hastags = postDTO.Hashtags,
                Likes = 0,
                Comments = new List<Comment>(),
                LikedBy = new List<string>()
            };

            await _dynamoDBContext.SaveAsync<Post>(post);

            return new OkObjectResult(new PostViewModelDTO
            {
                PostID = Guid.NewGuid().ToString(),
                Category = postDTO.Category,
                PostedOn = DateTime.Now,
                Body = postDTO.Body,
                Hashtags = postDTO.Hashtags
            });
        }
    }

    
}

