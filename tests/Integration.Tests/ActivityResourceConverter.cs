namespace Integration.Tests
{
    using System;
    using Linn.Projects.Facade.Resources.Activities;
    using Newtonsoft.Json;
    using Newtonsoft.Json.Linq;

    public class ActivityResourceConverter : JsonConverter
    {
        public override bool CanWrite => false;

        public override bool CanConvert(Type objectType) => objectType == typeof(ActivityResource);

        public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
        {
            var jo = JObject.Load(reader);

            switch (jo["type"].Value<string>())
            {
                case "create":
                    return serializer.Deserialize<CreateActivityResource>(jo.CreateReader());

                case "update":
                    return serializer.Deserialize<UpdateActivityResource>(jo.CreateReader());

                case "add-phase":
                    return serializer.Deserialize<AddPhaseActivityResource>(jo.CreateReader());

                case "remove-phase":
                    return serializer.Deserialize<RemovePhaseActivityResource>(jo.CreateReader());

                case "updatePhase":
                    return serializer.Deserialize<UpdatePhaseActivityResource>(jo.CreateReader());

                default:
                    throw new Exception("Unknown activity type resource");
            }
        }

        public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
        {
            throw new NotImplementedException();
        }

    }
}