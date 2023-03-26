using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.DataModel;
using Amazon.Runtime;
using MyDayApi.Extensions;
using MyDayApi.Interface;
using MyDayApi.Options;
using MyDayApi.Service;
using MyDayApi.Helpers;

var builder = WebApplication.CreateBuilder(args);
ConfigurationManager configuration = builder.Configuration;


// Add services to the container.


// adding dynamoDB
var credentials = new BasicAWSCredentials(configuration["MyDayDB:AccessKey"], configuration["MyDayDB:SecretAccessKey"]);

var config = new AmazonDynamoDBConfig()
{
    RegionEndpoint = Amazon.RegionEndpoint.USWest2
};
var client = new AmazonDynamoDBClient(credentials, config);
builder.Services.AddSingleton<IAmazonDynamoDB>(client);
builder.Services.AddSingleton<IDynamoDBContext, DynamoDBContext>();

// adding Cloudinary
builder.Services.Configure<CloudinarySettings>(configuration.GetSection("CloudinarySettings"));

// adding TokenService
builder.Services.AddScoped<ITokenService, TokenService>();

// adding PhotoService
builder.Services.AddScoped<IPhotoService, PhotoService>();


builder.Services.AddControllers();
builder.Services.AddCors();
builder.Services.AddAuthorization();
builder.Services.AddAuthenticationServices(builder.Configuration);

// adding ApiGateway & Lambda
builder.Services.AddAWSLambdaHosting(LambdaEventSource.RestApi);

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseRouting();

app.UseCors(options => options.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:4200"));

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
