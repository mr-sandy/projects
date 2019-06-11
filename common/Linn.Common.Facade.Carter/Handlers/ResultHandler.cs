namespace Linn.Common.Facade.Carter.Handlers
{
    using System;
    using System.Threading;
    using System.Threading.Tasks;
    using Linn.Common.Facade.Carter.Serialisers;
    using Microsoft.AspNetCore.Http;

    public abstract class ResultHandler<T> : IHandler
    {
        private readonly string contentType;
        private readonly ISerialiser serialiser;

        protected ResultHandler(string contentType, ISerialiser serialiser)
        {
            this.contentType = contentType;
            this.serialiser = serialiser;
        }

        public abstract Func<T, string> GenerateLocation { get; }

        // TODO Replace requestedContentType with array of content types
        public bool CanHandle(object model, string requestedContentType)
        {
            return model is IResult<T> && requestedContentType.IndexOf(this.contentType, StringComparison.InvariantCultureIgnoreCase) > -1;
        }

        public async Task Handle(HttpRequest req, HttpResponse res, object model, CancellationToken cancellationToken)
        {
            var result = (IResult<T>)model;

            var visitor = new ResultVisitor<T>(this.contentType, this.serialiser, this.GenerateLocation);

            var action = result.Accept(visitor);

            await action(res, cancellationToken);
        }
    }
}