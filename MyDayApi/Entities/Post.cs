﻿using Amazon.DynamoDBv2.DataModel;
using MyDayApi.Entities;

namespace MyDayApi.Entities
{
    [DynamoDBTable("Post")]
    public class Post
    {
        [DynamoDBHashKey]
        public string PostID { get; set; } = string.Empty;
        [DynamoDBRangeKey]
        public long PostedOn { get; set; }
        public string Category { get; set; } = string.Empty;
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string UserName { get; set; } = string.Empty;
        public Photo CreatorPic { get; set; } = new Photo();
        public string Body { get; set; } = string.Empty;
        public int Likes { get; set; }
        public List<Comment> Comments { get; set; } = new List<Comment>();
        public List<Photo> Photos { get; set; } = new List<Photo>();
        // stores the liked users UserName
        public List<string> LikedBy { get; set; } = new List<string>();
    }
}

