namespace Linn.Projects.Service.Host.Negotiators
{
    using System;
    using System.IO;
    using System.Net;
    using System.Threading;
    using System.Threading.Tasks;
    using Carter;
    using HandlebarsDotNet;
    using Linn.Common.Configuration;
    using Microsoft.AspNetCore.Http;
    using Microsoft.Net.Http.Headers;
    using Newtonsoft.Json;

    public class HtmlNegotiator : IResponseNegotiator
    {
        private readonly Func<object, string> template;

        public HtmlNegotiator()
        {
            var source = File.ReadAllText("./Views/Index.html");

            this.template = Handlebars.Compile(source);
        }

        public bool CanHandle(MediaTypeHeaderValue accept)
        {
            return accept.MediaType.Equals("text/html");
        }

        public async Task Handle(HttpRequest req, HttpResponse res, object model, CancellationToken cancellationToken)
        {
            var data = new
            {
                settings = JsonConvert.SerializeObject(new
                {
                    AuthorityUrl = ConfigurationManager.Configuration["AUTHORITY_URL"],
                    AppRoot = ConfigurationManager.Configuration["APP_ROOT"]
                })
            };

            res.ContentType = "text/html";
            res.StatusCode = (int) HttpStatusCode.OK;
            await res.WriteAsync(this.template(data), cancellationToken);
        }
    }
}