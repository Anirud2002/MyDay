# Stage 0
FROM mcr.microsoft.com/dotnet/sdk:6.0 as dotnet-img

WORKDIR /app

COPY . ./

RUN dotnet restore
RUN dotnet publish -c Release -o out

# Stage 1
FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /app
COPY --from=dotnet-img /app/out ./
EXPOSE 5000
ENTRYPOINT ["dotnet", "MyDay.Api.dll"]