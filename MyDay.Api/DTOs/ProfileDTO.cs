using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyDay.Api.DTOs
{
    public class ProfileDTO
    {
        public string name { get; set; }
        public string userName { get; set; }
        public string city { get; set; }
        public string description { get; set; }
    }
}