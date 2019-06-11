namespace Linn.Common.Facade.Carter.Extensions
{
    using System.Linq;
    using Microsoft.AspNetCore.Http;

    public static class HttpRequestExtensions
    {
        //TODO There must be equivalent code in Carter - have a look
        //Alternatively, could this return an array
        public static string GetContentType(this HttpRequest req)
        {
            return req.Headers.ContainsKey("Accept")
                ? req.Headers["Accept"].FirstOrDefault()
                : req.ContentType ?? "";
        }
    }
}