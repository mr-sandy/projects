namespace Integration.Tests.Extensions
{
    using System;
    using System.Net.Http;
    using Linn.Projects.Facade.Resources.Activities;
    using Newtonsoft.Json;
    using Newtonsoft.Json.Linq;

    public static class HttpResponseMessageExtensions
    {
        public static T DeserializeBody<T>(this HttpResponseMessage res, JsonSerializerSettings settings = null)
        {
            return JsonConvert.DeserializeObject<T>(res.Content.ReadAsStringAsync().Result, settings);
        }
    }
}