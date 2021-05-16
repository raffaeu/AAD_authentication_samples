using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace Aad.Spa.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WebSettingsController : ControllerBase
    {
        private readonly IOptions<WebSettings> webSettings;

        public WebSettingsController(IOptions<WebSettings> webSettings) 
        {
            this.webSettings = webSettings;
        }

        [HttpGet]
        public WebSettings Get()
        {
            return this.webSettings.Value;
        }
    }
}
