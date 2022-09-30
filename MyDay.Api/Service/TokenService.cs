using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using MyDay.Api.Entities;
using MyDay.Api.Interface;

namespace MyDay.Api.Service
{
	public class TokenService : ITokenService
	{
        private readonly SymmetricSecurityKey _key;
		private readonly IConfiguration _config;
		public TokenService(IConfiguration config)
		{
			_config = config;
			_key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Jwt:TokenKey"]));
		}

		public string CreateToken(MyDayUser user)
        {
			var claims = new List<Claim>
			{
				new Claim(JwtRegisteredClaimNames.NameId, user.UserName)
			};

			var creds = new SigningCredentials(_key, SecurityAlgorithms.HmacSha512Signature);
			var tokenDescriptor = new SecurityTokenDescriptor
			{
				Subject = new ClaimsIdentity(claims),
				Issuer = _config["Jwt:Issuer"],
				Audience = _config["Jwt:Audience"],
				SigningCredentials = creds,
				Expires = DateTime.Now.AddDays(30)
			};

			var tokenHandler = new JwtSecurityTokenHandler();
			var token = tokenHandler.CreateToken(tokenDescriptor);

			return tokenHandler.WriteToken(token);
        }
	}
}

