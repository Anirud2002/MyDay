using Amazon.DynamoDBv2.DataModel;
using Microsoft.AspNetCore.Mvc;
using MyDay.Api.DTOs;
using MyDay.Api.Entities;
using MyDay.Api.Extensions;

namespace MyDay.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IDynamoDBContext _dynamoDBContext;
        public UserController(IDynamoDBContext dynamoDBContext)
        {
            _dynamoDBContext = dynamoDBContext;
        }
        [HttpGet("{username}")]
        public async Task<ActionResult> GetUserDetails(string userName)
        {
            var user = await _dynamoDBContext.LoadAsync<MyDayUser>(userName);
            return new OkObjectResult(new UserDetailsDTO().toViewModel(user));
        }
    }
}