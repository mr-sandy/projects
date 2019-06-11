namespace Linn.Common.Facade.Carter.Handlers
{
    using System;
    using Linn.Common.Facade.Carter.Serialisers;

    public class JsonResultHandler<T> : ResultHandler<T>
    {
        public JsonResultHandler() : base("application/json", new JsonSerialiser())
        {
        }

        public override Func<T, string> GenerateLocation => r => string.Empty;
    }
}