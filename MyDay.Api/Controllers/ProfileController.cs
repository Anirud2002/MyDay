using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Amazon.DynamoDBv2.DataModel;
using Microsoft.AspNetCore.Mvc;
using MyDay.Api.DTOs;
using MyDay.Api.Entities;
using MyDay.Api.Extensions;

namespace MyDay.Api.Controllers
{
    [Route("api/[controller]")]
    public class ProfileController : ControllerBase
    {
        private readonly IDynamoDBContext _context;
        public ProfileController(IDynamoDBContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult> UpdateProfile([FromBody] ProfileDTO profileDTO)
        {
            if (!String.IsNullOrEmpty(profileDTO.userName))
            {
                if (await UserExists(profileDTO.userName))
                {
                    return BadRequest("Username already taken!");
                }
            }

            var userName = User.GetUserName();
            var user = await _context.LoadAsync<MyDayUser>(userName);

            user.UserName = profileDTO.userName ?? user.UserName;
            user.FirstName = profileDTO.name.Trim().Split(" ")[0];
            user.LastName = profileDTO.name.Trim().Split(" ").Length > 1 ? profileDTO.name.Trim().Split(" ")[1] : " ";
            user.City = profileDTO.city;
            user.Description = profileDTO.city;

            await _context.SaveAsync<MyDayUser>(user);
            return new OkObjectResult(user);
        }

        public async Task<bool> UserExists(string userName)
        {
            var user = await _context.LoadAsync<MyDayUser>(userName);
            if (user == null) return false;
            return true;
        }
    }
}