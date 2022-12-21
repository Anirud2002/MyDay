using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Amazon.DynamoDBv2.DataModel;
using FakeItEasy;
using Microsoft.AspNetCore.Mvc;
using MyDay.Api.Controllers;
using MyDay.Api.DTOs;
using MyDay.Api.Entities;
using Shouldly;
using Xunit;

namespace MyDay.Tests.ControllerTests
{
    public class PostControllerTests
    {
        private PostController _postController;
        private IDynamoDBContext _dynamoDBContext;
        public PostControllerTests()
        {
            // Dependencies
            _dynamoDBContext = A.Fake<IDynamoDBContext>();

            // SUT -> System Under Test
            _postController = new PostController(_dynamoDBContext);
        }

        [Fact]
        public void PostController_GetPosts_ReturnSuccess()
        {
            // Arrage - What do I need to bring in?
            var posts = A.Fake<Task<ActionResult>>();
            A.CallTo(() => _postController.GetPosts("MYDAY")).Returns(posts);

            // Act
            var result = _postController.GetPosts("MYDAY");

            // Assert
            result.ShouldBeOfType<Task<ActionResult>>();

        }
    }
}

