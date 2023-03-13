using System;
using CloudinaryDotNet.Actions;

namespace MyDayApi.Interface
{
	public interface IPhotoService
	{
		Task<ImageUploadResult> AddImageAsync(IFormFile file);
		Task<DeletionResult> DeleteImageAsync(string publicID);
	}
}

