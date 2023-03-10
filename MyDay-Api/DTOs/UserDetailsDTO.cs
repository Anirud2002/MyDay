using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MyDay.Api.Entities;
using MyDayApi.Entities;

namespace MyDay.Api.DTOs
{
    public class UserDetailsDTO
    {
        public string UserName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public Photo ProfilePic { get; set; } = new Photo();
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public DateTime Joined { get; set; }
        public string City { get; set; } = string.Empty;
        public List<string> Links { get; set; } = new List<string>();
        public string Description { get; set; } = string.Empty;

        public UserDetailsDTO toViewModel(MyDayUser user)
        {
            return new UserDetailsDTO()
            {
                UserName = user.UserName,
                Email = user.Email,
                ProfilePic = user.ProfilePic,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Joined = user.Joined,
                City = user.City,
                Links = user.Links,
                Description = user.Description
            };
        }
    }
}