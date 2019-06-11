namespace Linn.Common.Facade.Carter.Tests.Extensions
{
    using System.Net.Http;
    using System.Net.Http.Headers;
    using Newtonsoft.Json;

    internal static class HttpExtensions
    {
        public static void Accept(this HttpClient client, string contentType)
        {
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue(contentType));
        }

        public static T DeserializeBody<T>(this HttpResponseMessage res)
        {
            return JsonConvert.DeserializeObject<T>(res.Content.ReadAsStringAsync().Result);
        }
    }
}
