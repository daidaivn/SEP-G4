using System.Net;

namespace CarpentryWorkshopAPI.IServices.ILink
{
    public interface ILinkService
    {
        bool UrlIsValid(string url, string error);
    }
}
