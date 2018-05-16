namespace Linn.Common.Facade.Carter.Handlers
{
    using Linn.Common.Facade.Carter.Serialisers;

    public class JsonResultHandler<T, TR> : ResultHandler<T, TR> where TR : IResourceBuilder<T>
    {
        public JsonResultHandler(TR resourceBuilder) : base(resourceBuilder, "application/json", new JsonSerialiser())
        {
        }
    }
}