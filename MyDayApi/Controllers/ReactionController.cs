using System.Security.Cryptography;
using System.Text;
using Amazon.DynamoDBv2.DataModel;
using Amazon.DynamoDBv2.Model;
using Microsoft.AspNetCore.Mvc;
using MyDayApi.DTOs;
using MyDayApi.Entities;
using MyDayApi.Interface;
using MyDayApi.DTOs;

namespace MyDayApi.Controllers
{
    [Route("api/[controller]")]
    public class ReactionController : Controller
    {
        private readonly IDynamoDBContext _dynamoDBContext;

        public ReactionController(IDynamoDBContext dynamoDBContext)
        {
            _dynamoDBContext = dynamoDBContext;
        }

        [HttpPost("addComment")]
        public async Task<ActionResult> AddComment([FromBody] AddCommentDTO addComment)
        {
            ArgumentNullException.ThrowIfNull(addComment.PostID);
            ArgumentNullException.ThrowIfNull(addComment.Comment);
            ArgumentNullException.ThrowIfNull(addComment.UserName);
            ArgumentNullException.ThrowIfNull(addComment.PostCreatedDate);

            var user = await _dynamoDBContext.LoadAsync<MyDayUser>(addComment.UserName);
            if (user == null)
            {
                return BadRequest("Cannot add comment!");
            }

            var post = await _dynamoDBContext.LoadAsync<Post>(addComment.PostID, addComment.PostCreatedDate);
            post.Comments.Add(
                new Comment
                {
                    UserName = user.UserName,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    CommentBody = addComment.Comment,
                    CommentedOn = DateTime.Now
                }
            );

            await _dynamoDBContext.SaveAsync<Post>(post);

            return new OkResult();
        }
    }
}