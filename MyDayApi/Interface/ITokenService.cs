using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MyDay.Api.Entities;
using MyDay.Api.Service;

namespace MyDay.Api.Interface
{
    public interface ITokenService
    {
        string CreateToken(MyDayUser user);
    }
}