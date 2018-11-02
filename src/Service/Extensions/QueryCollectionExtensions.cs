namespace Linn.Projects.Service.Extensions
{
    using Microsoft.AspNetCore.Http;

    public static class QueryCollectionExtensions
    {
        public static int? LookupAsInt(this IQueryCollection query, string key)
        {
            return query.ContainsKey(key) && int.TryParse(query[key], out var result) 
                ? (int?) result 
                : null;
        }
    }
}