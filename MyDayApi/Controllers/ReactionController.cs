using System.Security.Cryptography;
using System.Text;
using Amazon.DynamoDBv2.DataModel;
using Amazon.DynamoDBv2.Model;
using Microsoft.AspNetCore.Mvc;
using MyDayApi.DTOs;
using MyDayApi.Entities;
using MyDayApi.Extensions;

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

        [HttpPost("add-like")]
        public async Task<ActionResult> AddLike([FromBody] LikePostDTO likedPost)
        {
            var user = await _dynamoDBContext.LoadAsync<MyDayUser>(User.GetUserName());
            if (user == null)
            {
                return BadRequest("Cannot like the post!");
            }

            var post = await _dynamoDBContext.LoadAsync<Post>(likedPost.PostID, likedPost.PostCreatedDate);
            if (likedPost.isLiked)
            {
                post.Likes--;
                if(post.Likes < 0)
                {
                    post.Likes = 0; // just being safe and setting likes to zero if in-case the likes is below 0
                }
                post.LikedBy.Remove(User.GetUserName());
            }
            else
            {
                post.Likes++;
                post.LikedBy.Add(User.GetUserName());
            }


            await _dynamoDBContext.SaveAsync<Post>(post);
            return new OkResult();
        }

        [HttpPost("add-comment")]
        public async Task<ActionResult> AddComment([FromBody] AddCommentDTO addComment)
        {
            ArgumentNullException.ThrowIfNull(addComment.PostID);
            ArgumentNullException.ThrowIfNull(addComment.Comment);
            ArgumentNullException.ThrowIfNull(addComment.UserName);
            ArgumentNullException.ThrowIfNull(addComment.PostCreatedDate);

            var user = await _dynamoDBContext.LoadAsync<MyDayUser>(User.GetUserName());
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