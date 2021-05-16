using System;

namespace Aad.Spa.Controllers
{
    public class WebSettings
    {
        public const string Name = "WebSettings";
        public string AppId { get; set; }
        public string RedirectUri { get; set; }
        public string[] Scopes { get; set; }
    }
}
