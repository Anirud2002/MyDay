using System.Security.Cryptography;
using System.Text;
using Amazon.DynamoDBv2.DataModel;
using Amazon.DynamoDBv2.Model;
using Microsoft.AspNetCore.Mvc;
using MyDay.Api.DTOs;
using MyDay.Api.Entities;
using MyDay.Api.Interface;
using MyDayApi.DTOs;

namespace MyDay.Api.Controllers
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
                    AppUserID = user.AppUserID,
                    UserName = user.UserName,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    CommentBody = addComment.Comment,
                    CommentedOn = DateTime.Now
                }
            );

            return new OkResult();
        }
    }
}