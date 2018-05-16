namespace Linn.Common.Facade.Carter.Negotiators
{
    using System;
    using System.Collections.Generic;

    public class JsonResponseNegotiator : ResponseNegotiator
    {
        private const string ContentType = "application/json";
        private static readonly IEnumerable<string> SupportedContentTypes = new[] { "application/json" };

        public JsonResponseNegotiator(IServiceProvider serviceProvider) 
            : base(serviceProvider, ContentType, SupportedContentTypes)
        {
        }
    }
}