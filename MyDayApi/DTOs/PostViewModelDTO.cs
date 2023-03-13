using System;
using MyDay.Api.Entities;
using MyDayApi.Entities;

namespace MyDay.Api.DTOs
{
    public class PostViewModelDTO
    {
        public string PostID { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string UserName { get; set; } = string.Empty;
        public long PostedOn { get; set; }
        public string Body { get; set; } = string.Empty;
        public List<string> Hashtags { get; set; } = new List<string>();
        public int Likes { get; set; }
        public List<Comment>? Comments { get; set; }
        public List<Photo> Photos { get; set; } = new List<Photo>();
        public List<string> LikedBy { get; set; } = new List<string>();

        public PostViewModelDTO toViewModel(Post post)
        {
            return new PostViewModelDTO()
            {
                PostID = post.PostID,
                Category = post.Category,
                FirstName = post.FirstName,
                LastName = post.LastName,
                UserName = post.UserName,
                PostedOn = post.PostedOn,
                Body = post.Body,
                Hashtags = post.Hashtags,
                Likes = post.Likes,
                Photos = post.Photos,
                LikedBy = post.LikedBy,
                Comments = post.Comments
            };
        }
    }
}


