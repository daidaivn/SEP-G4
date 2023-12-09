using CarpentryWorkshopAPI.IServices.ILink;
using System.Net;

namespace CarpentryWorkshopAPI.Services.Link
{
    public class LinkService : ILinkService
    {
        public bool UrlIsValid(string url, string errorUrl)
        {
            try
            {
                HttpWebRequest request = HttpWebRequest.Create(url) as HttpWebRequest;
                request.Timeout = 5000;
                request.Method = "HEAD";
                using (HttpWebResponse response = request.GetResponse() as HttpWebResponse)
                {
                    int statusCode = (int)response.StatusCode;
                    if (!response.ResponseUri.AbsoluteUri.ToString().Equals(errorUrl))
                    {
                        if (statusCode >= 100 && statusCode < 400)
                        {
                            return true;
                        }
                        else if (statusCode >= 500 && statusCode <= 510)
                        {
                            return false;
                        }
                    }
                    else
                    {
                        return false;
                    }
                }
            }
            catch (WebException ex)
            {
                if (ex.Status == WebExceptionStatus.ProtocolError)
                {
                    return false;
                }
            }

            return false;
        }


    }
}
