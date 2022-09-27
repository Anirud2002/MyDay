using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Amazon.DynamoDBv2.DataModel;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using MyDay.Api.Entities;
using MyDay.Api.Options;


namespace MyDay.Api.Controllers
{
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private readonly IDynamoDBContext _dynamoDBContext;
        public UserController(IDynamoDBContext dynamoDBContext, IOptions<DynamoDBAccessOptions> dynamoDBAccessOptions)
        {
            _dynamoDBContext = dynamoDBContext;
        }

        [HttpPost("create")]
        public async Task GetUser()
        {
            var user = new MyDayUser()
            {
                UserName = "Chhimi69",
                FirstName = "Chhimi",
                LastName = "Shrestha",
                AppUserID = Guid.NewGuid().ToString(),
                PasswordHash = { },
                PasswordSalt = { },
                Joined = DateTime.Now,
                City = "Boise",
                Links = new List<string>() { "https://github.com/Anirud2002"},
                Description = "This is Anirud ko budi"
            };
            await _dynamoDBContext.SaveAsync<MyDayUser>(user);
        }

        
    }
}

