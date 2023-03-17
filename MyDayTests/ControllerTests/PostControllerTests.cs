using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Amazon.DynamoDBv2.DataModel;
using FakeItEasy;
using Microsoft.AspNetCore.Mvc;
using MyDayApi.Controllers;
using MyDayApi.DTOs;
using MyDayApi.Interface;
using Shouldly;
using Xunit;

namespace MyDayTests.ControllerTests
{
    public class PostControllerTests
    {
        [Fact]
        public void PostController_GetPosts_ReturnSuccess()
        {
            // Arrage - What do I need to bring in?
            var _dynamoDBContext = A.Fake<IDynamoDBContext>();
            var _photoService = A.Fake<IPhotoService>();
            // SUT -> System Under Test
            var _postController = new PostController(_dynamoDBContext, _photoService);

            // Act
            var result = _postController.GetPosts("MYDAY");

            // Assert
            result.ShouldNotBeNull();
            result.ShouldBeOfType<Task<ActionResult>>();

        }

        [Fact]
        public void PostController_GetUserMyDayPost_ReturnsSuccess()
        {
            // Arrange
            var _dynamoDBContext = A.Fake<IDynamoDBContext>();
            var _photoService = A.Fake<IPhotoService>();

            var postController = new PostController(_dynamoDBContext, _photoService);
            var category = "MYDAY";

            // Act
            var result = postController.GetUserMyDayPost(category);

            // Assert
            result.ShouldNotBeNull();
            result.ShouldBeOfType<Task<ActionResult>>();
        }

        [Fact]
        public void PostController_CreateMyDayPost_ReturnsSuccess()
        {
            // Arrange
            var _dynamoDBContext = A.Fake<IDynamoDBContext>();
            var _photoService = A.Fake<IPhotoService>();

            var postController = new PostController(_dynamoDBContext, _photoService);
            var post = new PostDTO()
            {
                Body = "This is a test",
                Category = "MYDAY",
                Hashtags = new List<string>()
            };

            // Act
            var result = postController.CreateMyDayPost(post);

            // Assert
            result.ShouldNotBeNull();
            result.ShouldBeOfType<Task<ActionResult>>();
        }

        [Fact]
        public void PostController_DeletePost_ReturnsSuccess()
        {
            // Arrange
            var _dynamoDBContext = A.Fake<IDynamoDBContext>();
            var _photoService = A.Fake<IPhotoService>();

            var postController = new PostController(_dynamoDBContext, _photoService);
            var postID = "1234";
            var date = 123456677889;

            // Act
            var result = postController.DeletePost(postID, date);

            // Assert
            result.ShouldNotBeNull();
            result.ShouldBeOfType<Task<ActionResult>>();
        }
    }
}