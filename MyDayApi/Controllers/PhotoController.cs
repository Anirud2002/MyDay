using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Amazon.DynamoDBv2.DataModel;
using Microsoft.AspNetCore.Mvc;
using MyDayApi.Entities;
using MyDayApi.Extensions;
using MyDayApi.Interface;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MyDayApi.Controllers
{
    [Route("/api/[controller]")]
    public class PhotoController : Controller
    {
        private readonly IDynamoDBContext _context;
        public IPhotoService _photoService;

        public PhotoController(IDynamoDBContext context, IPhotoService photoService)
        {
            _context = context;
            _photoService = photoService;
        }

        [HttpPost("add-photo")]
        public async Task<ActionResult> AddPhoto(IFormFile file)
        {
            var user = await _context.LoadAsync<MyDayUser>(User.GetUserName());
            if (user == null)
            {
                return BadRequest("User not logged in!");
            }

            var result = await _photoService.AddImageAsync(file);
            if (result.Error != null) return BadRequest(result.Error.Message);

            var photo = new Photo()
            {
                URL = result.SecureUrl.AbsoluteUri,
                PublicID = result.PublicId
            };

            return new OkObjectResult("Photo uploaded");
        }
    }
}

