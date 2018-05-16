namespace Linn.Common.Facade.Carter.Negotiators
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading;
    using System.Threading.Tasks;
    using global::Carter;
    using Linn.Common.Facade.Carter.Extensions;
    using Microsoft.AspNetCore.Http;
    using Microsoft.Net.Http.Headers;

    public abstract class ResponseNegotiator : IResponseNegotiator
    {
        private readonly IServiceProvider serviceProvider;
        private readonly string contentType;
        private readonly IEnumerable<string> supportedContentTypes;

        protected ResponseNegotiator(IServiceProvider serviceProvider, string contentType, IEnumerable<string> supportedContentTypes)
        {
            this.serviceProvider = serviceProvider;
            this.contentType = contentType;
            this.supportedContentTypes = supportedContentTypes;
        }

        public bool CanHandle(MediaTypeHeaderValue accept)
        {
            return this.supportedContentTypes.Any(c => c.Equals(accept.MediaType.Value, StringComparison.OrdinalIgnoreCase));
        }

        public async Task Handle(HttpRequest req, HttpResponse res, object model, CancellationToken cancellationToken)
        {
            var handler = this.serviceProvider.GetHandler(model, this.contentType);

            if (handler == null)
            {
                res.StatusCode = 406; // Not acceptable
            }
            else
            {
                await handler.Handle(req, res, model, cancellationToken);
            }
        }
    }
}