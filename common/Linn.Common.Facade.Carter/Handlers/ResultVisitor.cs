namespace Linn.Common.Facade.Carter.Handlers
{
    using System;
    using System.Threading;
    using System.Threading.Tasks;
    using Linn.Common.Facade;
    using Microsoft.AspNetCore.Http;
    using Microsoft.Extensions.Primitives;

    public delegate Task ResponseAction(HttpResponse res, CancellationToken cancellationToken);

    public class ResultVisitor<T> : IResultVisitor<T, ResponseAction>
    {
        private readonly string contentType;
        private readonly ISerialiser serialiser;
        private readonly IResourceBuilder<T> resourceBuilder;

        public ResultVisitor(string contentType, ISerialiser serialiser, IResourceBuilder<T> resourceBuilder)
        {
            this.contentType = contentType;
            this.serialiser = serialiser;
            this.resourceBuilder = resourceBuilder;
        }

        public ResponseAction Visit(SuccessResult<T> result)
        {
            var resource = this.resourceBuilder.Build(result.Data);

            return async (res, cancellationToken) =>
            {
                res.StatusCode = 200;
                res.ContentType = this.contentType;
                await res.WriteAsync(this.serialiser.Serialise(resource), cancellationToken);
            };
        }

        public ResponseAction Visit(UnauthorisedResult<T> result)
        {
            throw new NotImplementedException();
        }

        public ResponseAction Visit(NotFoundResult<T> result)
        {
            return (res, cancellationToken) =>
            {
                res.StatusCode = 404;
                res.ContentType = this.contentType;

                return Task.CompletedTask;
            };
        }

        public ResponseAction Visit(CreatedResult<T> result)
        {
            var resource = this.resourceBuilder.Build(result.Data);
            var location = this.resourceBuilder.GetLocation(result.Data);

            return async (res, cancellationToken) =>
            {
                res.Headers["Location"] = "/projects/1";
                res.StatusCode = 201;
                res.ContentType = this.contentType;
                await res.WriteAsync(this.serialiser.Serialise(resource), cancellationToken);
            };
        }

        public ResponseAction Visit(BadRequestResult<T> result)
        {
            throw new NotImplementedException();
        }

        public ResponseAction Visit(ServerFailureResult<T> result)
        {
            throw new NotImplementedException();
        }
    }
}