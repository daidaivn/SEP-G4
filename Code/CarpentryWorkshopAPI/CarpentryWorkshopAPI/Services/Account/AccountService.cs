using CarpentryWorkshopAPI.IServices.Account;
using System.Net.Sockets;
using System.Text;
using System.Text.RegularExpressions;

namespace CarpentryWorkshopAPI.Services.Account
{
    public class AccountService : IAccountService
    {
        public dynamic GenerateRandomString(int length)
        {
            const string chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            Random random = new Random();
            char[] randomArray = new char[length];

            for (int i = 0; i < length; i++)
            {
                randomArray[i] = chars[random.Next(chars.Length)];
            }

            return new string(randomArray);
        }
        public dynamic isEmail(string inputEmail)
        {
            inputEmail = inputEmail ?? string.Empty;
            string strRegex = @"^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}" +
                  @"\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\" +
                  @".)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$";
            Regex re = new Regex(strRegex);
            if (re.IsMatch(inputEmail))
                return (true);
            else
                return (false);
        }
        public dynamic Check_Gmail(string gmail)
        { 
            bool ketqua = false;
            TcpClient tClient = new TcpClient("gmail-smtp-in.l.google.com", 25);
            string CRLF = "\r\n";
            byte[] dataBuffer;
            string ResponseString;
            NetworkStream netStream = tClient.GetStream();
            StreamReader reader = new StreamReader(netStream);
            ResponseString = reader.ReadLine();
            dataBuffer = BytesFromString("HELO Admin" + CRLF);
            netStream.Write(dataBuffer, 0, dataBuffer.Length);
            ResponseString = reader.ReadLine();
            dataBuffer = BytesFromString("MAIL FROM:<ccmsadm12@gmail.com>" + CRLF);
            netStream.Write(dataBuffer, 0, dataBuffer.Length);
            ResponseString = reader.ReadLine();
            dataBuffer = BytesFromString("RCPT TO:<" + gmail.Trim() + ">" + CRLF);
            netStream.Write(dataBuffer, 0, dataBuffer.Length);
            ResponseString = reader.ReadLine();
            if (GetResponseCode(ResponseString) == 550)
            {
                ketqua = false;
            }
            else
            {
                ketqua = true;
            }
            dataBuffer = BytesFromString("QUITE" + CRLF);
            netStream.Write(dataBuffer, 0, dataBuffer.Length);
            tClient.Close();

            return ketqua;
        }
        public dynamic BytesFromString(string str)
        {
            return Encoding.ASCII.GetBytes(str);
        }
        public dynamic GetResponseCode(string ResponseString)
        {
            return int.Parse(ResponseString.Substring(0, 3));
        }
    }
}
