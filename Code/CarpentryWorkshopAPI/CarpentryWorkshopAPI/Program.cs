using CarpentryWorkshopAPI.IServices.Account;
using CarpentryWorkshopAPI.IServices.IAdvance;
using CarpentryWorkshopAPI.IServices.IBonus;
using CarpentryWorkshopAPI.IServices.IDay;
using CarpentryWorkshopAPI.IServices.ILink;
using CarpentryWorkshopAPI.IServices.ISalary;
using CarpentryWorkshopAPI.IServices.SpecialOccasion;
using CarpentryWorkshopAPI.Mapper;
using CarpentryWorkshopAPI.Models;
using CarpentryWorkshopAPI.Services.Account;
using CarpentryWorkshopAPI.Services.Advance;
using CarpentryWorkshopAPI.Services.Bonus;
using CarpentryWorkshopAPI.Services.Day;
using CarpentryWorkshopAPI.Services.Link;
using CarpentryWorkshopAPI.Services.Salary;
using CarpentryWorkshopAPI.Services.SpecialOccasion;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;
using System.Text.Json.Serialization;
//using Microsoft.Extensions.Options;
//using CarpentryWorkshopAPI.Services;
//using CarpentryWorkshopAPI.IServices.t;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Your API", Version = "v1" });

    // Add JWT bearer token authorization in Swagger UI
    var securityScheme = new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Description = "JWT Authorization header using the Bearer scheme.",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.Http,
        Scheme = "bearer",
        BearerFormat = "JWT",
        Reference = new OpenApiReference
        {
            Type = ReferenceType.SecurityScheme,
            Id = JwtBearerDefaults.AuthenticationScheme
        }
    };

    c.AddSecurityDefinition(JwtBearerDefaults.AuthenticationScheme, securityScheme);

    var securityRequirement = new OpenApiSecurityRequirement
    {
        { securityScheme, Array.Empty<string>() }
    };

    c.AddSecurityRequirement(securityRequirement);
});
// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddDistributedMemoryCache();
builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromSeconds(10);
    options.Cookie.HttpOnly = true;
    options.Cookie.IsEssential = true;
});
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = builder.Configuration["JWT:Issuer"],
                    ValidAudience = builder.Configuration["JWT:Audience"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWT:SecretKey"]))
                };

                options.Events = new JwtBearerEvents
                {
                    OnTokenValidated = context =>
                    {
                        return Task.CompletedTask;
                    }
                };
            });

builder.Services.AddDbContext<SEPG4CCMSContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));

});
builder.Services.AddScoped<IAdvanceService, AdvanceService>();
builder.Services.AddScoped<IDayService, DayService>();
builder.Services.AddScoped<ILinkService, LinkService>();
builder.Services.AddScoped<IAccountService, AccountService>();
builder.Services.AddScoped<IExcelSalarySevice, ExcelSalarySevice>();
builder.Services.AddScoped<IBonusService, BonusService>();
builder.Services.AddScoped<ISalaryService, SalaryService>();
builder.Services.AddScoped<ISpecialOccasion, SpecialOccasionService>();
builder.Services.AddControllers().AddJsonOptions(x => x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddAutoMapper(typeof(MapperProfile));

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.UseSwagger();
app.UseSession();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
});
app.UseCors(
    builder =>
    {
        builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
    }
    );
app.Run();