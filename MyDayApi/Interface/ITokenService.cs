using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MyDayApi.Entities;
using MyDayApi.Service;

namespace MyDayApi.Interface
{
    public interface ITokenService
    {
        string CreateToken(MyDayUser user);
    }
}