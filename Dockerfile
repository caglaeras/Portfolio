# Aşama 1: Derleme (Build)
# .NET SDK imajını kullan (net9.0 için)
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build 
WORKDIR /src

# Proje dosyasını kopyala ve geri yükle
COPY ["Portfolio.csproj", "."]
RUN dotnet restore "Portfolio.csproj"

# Kalan dosyaları kopyala ve derle
COPY . .
RUN dotnet publish "Portfolio.csproj" -c Release -o /app/publish

# Aşama 2: Çalıştırma (Final Image)
# Çalışma zamanı imajını kullan
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS final 
WORKDIR /app
EXPOSE 8080

# Çalıştırılabilir çıktıları kopyala
COPY --from=build /app/publish .

# Uygulama başladığında çalıştırılacak komut
ENTRYPOINT ["dotnet", "Portfolio.dll"]