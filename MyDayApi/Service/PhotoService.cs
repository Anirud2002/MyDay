using System;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.Extensions.Options;
using MyDayApi.Helpers;
using MyDayApi.Interface;

namespace MyDayApi.Service
{
	public class PhotoService : IPhotoService
	{
		private readonly Cloudinary _cloudinary;

		public PhotoService(IOptions<CloudinarySettings> config)
		{
			var acc = new Account(
					config.Value.CloudName,
					config.Value.ApiKey,
					config.Value.ApiSecret
				);
			_cloudinary = new Cloudinary(acc);
		}

		public async Task<ImageUploadResult> AddImageAsync(IFormFile file) {
			var uploadResult = new ImageUploadResult();
			if(file.Length > 0) {
				using var stream = file.OpenReadStream();
				var uploadParams = new ImageUploadParams()
				{
					File = new FileDescription(file.FileName, stream),
					Transformation = new Transformation().Height(500).Width(500).Crop("fill").Gravity("face")
				};
				uploadResult = await _cloudinary.UploadAsync(uploadParams);

				return uploadResult;
			}
			return uploadResult;

		}

		public async Task<DeletionResult> DeleteImageAsync(string publicID)
		{
			var deleteParams = new DeletionParams(publicID);
			var result = await _cloudinary.DestroyAsync(deleteParams);
			return result;
		}
	}
}

