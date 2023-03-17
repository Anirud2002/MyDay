using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyDayApi.DTOs
{
    public class ProfileDTO
    {
        public string fullName { get; set; } = string.Empty;
        public string userName { get; set; } = String.Empty;
        public string city { get; set; } = string.Empty;
        public string description { get; set; } = string.Empty;
    }
}