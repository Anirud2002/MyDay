using System.Security.Cryptography;
using System.Text;
using Amazon.DynamoDBv2.DataModel;
using Amazon.DynamoDBv2.Model;
using Microsoft.AspNetCore.Mvc;
using MyDay.Api.DTOs;
using MyDay.Api.Entities;
using MyDay.Api.Interface;

namespace MyDay.Api.Controllers
{
    [Route("api/[controller]")]
    public class AccountController : Controller
    {
        private readonly IDynamoDBContext _dynamoDBContext;
        private readonly ITokenService _tokenService;
        public AccountController(IDynamoDBContext dynamoDBContext, ITokenService tokenService)
        {
            _dynamoDBContext = dynamoDBContext;
            _tokenService = tokenService;
        }

        [HttpPost("register")]
        public async Task<ActionResult> Register([FromBody] RegisterDTO registerDTO)
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
                Email = registerDTO.Email,
                LastName = registerDTO.LastName,
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDTO.Password)),
                PasswordSalt = hmac.Key,
                City = string.Empty,
                PostIDs = new List<string>(),
                Description = string.Empty,
                Joined = DateTime.Now,
                Links = new List<string>(),
            };
            await _dynamoDBContext.SaveAsync<MyDayUser>(user);

            return new OkObjectResult(new UserDTO()
            {
                UserName = user.UserName,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Token = _tokenService.CreateToken(user)
            });
        }

        [HttpPost("login")]
        public async Task<ActionResult> Login([FromBody] LoginDTO loginDTO)
        {
            var user = await _dynamoDBContext.LoadAsync<MyDayUser>(loginDTO.UserName);

            // check for username if it exists
            if (user == null) return BadRequest("Username/Password Invalid");

            using var hmac = new HMACSHA512(user.PasswordSalt);
            var hash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDTO.Password));

            for (var i = 0; i < hash.Length; i++)
            {
                if (user.PasswordHash[i] != hash[i]) return BadRequest("Username/Password Invalid");
            }

            return new OkObjectResult(new UserDTO()
            {
                UserName = user.UserName,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Token = _tokenService.CreateToken(user),
            });

        }

        public async Task<bool> UserExists(string userName)
        {
            var user = await _dynamoDBContext.LoadAsync<MyDayUser>(userName);
            if (user != null)
            {
                return true;
            }
            return false;
        }

    }
}

