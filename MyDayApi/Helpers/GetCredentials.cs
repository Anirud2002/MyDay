﻿using System;
using Microsoft.Extensions.Options;
using MyDayApi.Options;

namespace MyDayApi.Helpers
{
    public class GetCredentials
    {
        private readonly IConfiguration _config;

        public GetCredentials(IConfiguration config)
        {
            _config = config;
        }


        public List<string> GetAppSecrets()
        {
            var dbOptions = new DynamoDBAccessOptions();
            _config.GetSection(DynamoDBAccessOptions.AccessName).Bind(dbOptions);
            return new List<string>
            {
                dbOptions.AccessKey,
                dbOptions.SecretAccessKey
            };

        }
    }
}

