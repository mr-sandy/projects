namespace Linn.Common.Facade.Carter.Handlers
{
    using System;
    using System.Threading;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Http;

    public abstract class ResultHandler<T, TR> : IHandler where TR : IResourceBuilder<T>
    {
        private readonly IResourceBuilder<T> resourceBuilder;
        private readonly string contentType;
        private readonly ISerialiser serialiser;

        protected ResultHandler(TR resourceBuilder, string contentType, ISerialiser serialiser)
        {
            this.resourceBuilder = resourceBuilder;
            this.contentType = contentType;
            this.serialiser = serialiser;
        }

        public bool CanHandle(object model, string requestedContentType)
        {
            return model is IResult<T> && requestedContentType.Equals(this.contentType, StringComparison.InvariantCultureIgnoreCase);
        }

        public async Task Handle(HttpRequest req, HttpResponse res, object model, CancellationToken cancellationToken)
        {
            var result = (IResult<T>)model;

            var visitor = new ResultVisitor<T>(this.contentType, this.serialiser, this.resourceBuilder);

            var action = result.Accept(visitor);

            await action(res, cancellationToken);
        }
    }
}