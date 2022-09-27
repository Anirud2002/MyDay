using System;
using Microsoft.Extensions.Options;
using MyDay.Api.Interface;
using MyDay.Api.Options;

namespace MyDay.Api.Service
{
	public class CredentialService : ICredentialService
	{
        public DynamoDBAccessOptions options { get; set; } = new DynamoDBAccessOptions();

        public CredentialService(IOptions<DynamoDBAccessOptions> config)
        {
            options.AccessKey = config.Value.AccessKey;
            options.SecretAccessKey = config.Value.SecretAccessKey;
        }

        public List<string> GetDBCreds()
        {
            return new List<string>()
            {
                options.AccessKey,
                options.SecretAccessKey
            };
        }
        
    }
}


