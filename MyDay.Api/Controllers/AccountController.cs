using System.Security.Cryptography;
using System.Text;
using Amazon.DynamoDBv2.DataModel;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using MyDay.Api.DTOs;
using MyDay.Api.Entities;
using MyDay.Api.Options;


namespace MyDay.Api.Controllers
{
    [Route("api/[controller]")]
    public class AccountController : Controller
    {
        private readonly IDynamoDBContext _dynamoDBContext;
        public AccountController(IDynamoDBContext dynamoDBContext)
        {
            _dynamoDBContext = dynamoDBContext;
        }

        [HttpPost("register")]
        public async Task<ActionResult> GetUser([FromBody] RegisterDTO registerDTO)
        {
            if (await UserExists(registerDTO.UserName))
            {
                return BadRequest("Username taken!");
            }
            using var hmac = new HMACSHA512();
            var user = new MyDayUser()
            {
                AppUserID = Guid.NewGuid().ToString(),
                UserName = registerDTO.UserName,
                FirstName = registerDTO.FirstName,
                LastName = registerDTO.LastName,
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDTO.Password)),
                PasswordSalt = hmac.Key,
                City = registerDTO.City,
                Description = string.Empty,
                Joined = DateTime.Now,
                Links = new List<string>(),
            };
            await _dynamoDBContext.SaveAsync(user);
            return new OkObjectResult(user);
        }

        public async Task<bool> UserExists(string userName)
        {
            var user = await _dynamoDBContext.LoadAsync<MyDayUser>(userName);
            if(user != null)
            {
                return true;
            }
            return false;
        }
        
    }
}

