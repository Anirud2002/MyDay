using System;
using MyDay.Api.Entities;

namespace MyDay.Api.DTOs
{
	public class RegisterDTO
	{
        public string UserName { get; set; } = string.Empty;
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
    }
}

