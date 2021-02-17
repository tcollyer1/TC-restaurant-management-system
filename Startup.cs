using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace management_system
{
    public class Startup
    {
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();            
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseRouting();

            app.UseDefaultFiles();
            app.UseStaticFiles();

            app.UseCors(policy => policy.WithOrigins("http://127.0.0.1:5500").AllowAnyHeader().AllowAnyMethod());
            app.UseCors(policy => policy.WithOrigins("https://localhost:44338").AllowAnyHeader().AllowAnyMethod());

            // app.UseEndpoints(endpoints =>
            // {
            //   endpoints.MapGet("/", async context =>
            //   {
            //       await context.Response.WriteAsync("Hello World!");
            //   });
            // });

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            BookingData.Initialize();
        }
    }
}
