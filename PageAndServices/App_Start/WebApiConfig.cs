﻿using PageAndServices.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace PageAndServices
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            //config.Filters.Add(new ValidationActionFilter());

            // Controller Only
            // To handle routes like `/api/VTRouting`
            config.Routes.MapHttpRoute(
                name: "ApiControllerOnly",
                routeTemplate: "api/{controller}",
                defaults: new { action = "DefaultAction" }
            );

            // Controller with ID
            // To handle routes like `/api/VTRouting/1`
            config.Routes.MapHttpRoute(
                name: "ApiControllerAndId",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { action = "DefaultAction" },
                constraints: new { id = @"^\d+$" } // Only integers 
            );

            // Controllers with Actions
            // To handle routes like `/api/VTRouting/1/route`
            config.Routes.MapHttpRoute(
                name: "ApiControllerAndIdAndAction",
                routeTemplate: "api/{controller}/{id}/{action}",
                defaults: new { },
                constraints: new { id = @"^\d+$" } // Only integers 
            );

            // Controllers with Actions
            // To handle routes like `/api/VTRouting/route`
            config.Routes.MapHttpRoute(
                name: "ApiControllerAndAction",
                routeTemplate: "api/{controller}/{action}"
            );
        }
    }
}
