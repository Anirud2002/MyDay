using System;
using System.Security.Claims;

namespace MyDay.Api.Extensions
{
	public static class ClaimsPrincipalExtension
	{
		public static string GetUserName(this ClaimsPrincipal user)
        {
			return user.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        }
	}
}

