using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyDayApi.DTOs
{
    public class LikePostDTO
    {
        public string PostID { get; set; } = string.Empty;
        public long PostCreatedDate { get; set; }
        public bool isLiked { get; set; } = false;
    }
}