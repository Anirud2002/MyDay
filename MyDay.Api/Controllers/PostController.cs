using System.Security.Claims;
using Amazon.DynamoDBv2.DataModel;
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

        [HttpPost("myday")]
        public async Task<ActionResult> CreateMyDayPost([FromBody] MyDayPostDTO myDayPostDTO)
        {
            var userName = User.GetUserName();

            if (string.IsNullOrEmpty(userName))
            {
                return BadRequest("User not found!");
            }

            return new OkObjectResult(new PostDTO
            {
                PostID = Guid.NewGuid().ToString(),
                Category = "MyDay",
                PostedOn = DateTime.Now,
                Body = myDayPostDTO.Body,
                Hashtags = new List<string>() { "day", "myLyf"},
                
            });
        }
    }

    
}

