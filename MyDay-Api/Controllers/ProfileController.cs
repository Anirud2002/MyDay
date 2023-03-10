using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Amazon.DynamoDBv2.DataModel;
using Microsoft.AspNetCore.Mvc;
using MyDay.Api.DTOs;
using MyDay.Api.Entities;
using MyDay.Api.Extensions;
using MyDayApi.Entities;
using MyDayApi.Interface;

namespace MyDay.Api.Controllers
{
    [Route("api/[controller]")]
    public class ProfileController : ControllerBase
    {
        private readonly IDynamoDBContext _context;
        private readonly IPhotoService _photoService;
        public ProfileController(IDynamoDBContext context, IPhotoService photoService)
        {
            _context = context;
            _photoService = photoService;
        }

        [HttpPost]
        public async Task<ActionResult> UpdateProfile([FromBody] ProfileDTO profileDTO)
        {
            var userName = User.GetUserName();
            if (!userName.Equals(profileDTO.userName))
            {
                if (await UserExists(profileDTO.userName))
                {
                    return BadRequest("Username already taken!");
                }
            }

            var user = await _context.LoadAsync<MyDayUser>(userName);

            user.UserName = profileDTO.userName;
            user.FirstName = profileDTO.fullName.Trim().Split(" ")[0];
            user.LastName = profileDTO.fullName.Trim().Split(" ").Length > 1 ? profileDTO.fullName.Trim().Split(" ")[1] : " ";
            user.City = profileDTO.city;
            user.Description = profileDTO.description;

            await _context.SaveAsync<MyDayUser>(user);
            return new OkObjectResult(new UserDetailsDTO().toViewModel(user));
        }

        [HttpPost("upload-profile-pic")]
        public async Task<ActionResult> UploadProfilePic(IFormFile file)
        {
            ArgumentNullException.ThrowIfNull(file);

            var user = await _context.LoadAsync<MyDayUser>(User.GetUserName());
            var result = await _photoService.AddImageAsync(file);
            var photo = new Photo()
            {
                URL = result.SecureUrl.AbsoluteUri,
                PublicID = result.PublicId
            };
            if (!String.IsNullOrEmpty(user.ProfilePic.PublicID)) // if user has existing pic, delete it and add the new one
            {
                await _photoService.DeleteImageAsync(user.ProfilePic.PublicID);
            }
            user.ProfilePic = photo;
            await _context.SaveAsync<MyDayUser>(user);
            return new OkObjectResult(new UserDetailsDTO().toViewModel(user));
        }

        public async Task<bool> UserExists(string userName)
        {
            var user = await _context.LoadAsync<MyDayUser>(userName);
            if (user == null) return false;
            return true;
        }
    }
}