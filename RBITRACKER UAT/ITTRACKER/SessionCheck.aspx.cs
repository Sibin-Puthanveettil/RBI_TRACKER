using System;
using System.Data;
using System.IO;
using System.Net;
using System.Security.Cryptography;
using System.Text;
using System.Web;
namespace RBIDATATRACK
{

    public partial class SessionCheck : System.Web.UI.Page
    {
        Helper.Oracle.OracleHelper oh = new Helper.Oracle.OracleHelper();

        protected void Page_Load(object sender, EventArgs e)
        {

        }

        public void Page_Init(object o, EventArgs e)
        {

            Response.Cache.SetCacheability(HttpCacheability.NoCache);

            Response.Cache.SetExpires(DateTime.UtcNow.AddHours(-1));

            Response.Cache.SetNoStore();
            //try
            //{
                //string strLanip = GetLanIPAddress();
                //string HostAddress = System.Net.Dns.GetHostName();

                //oh.ExecuteNonQuery("insert into TBL_BRS_LOG(details,tra_dt) values('" + strLanip + "',sysdate)");
                //oh.ExecuteNonQuery("insert into TBL_BRS_LOG(details,tra_dt) values('" + HostAddress + "',sysdate)");
                string ipshow = GetUserIP();
            //}
            //catch (Exception er)
            //{
            //    oh.ExecuteNonQuery("insert into TBL_BRS_ERRORLOG(error,en_date) values('" + er.Message + "',sysdate)");
            //    Response.Redirect("SessionExpired.aspx");
            //}
            //string[] computer_name = System.Net.Dns.GetHostEntry(Request.ServerVariables["REMOTE_ADDR"]).HostName.Split(new Char[] { '.' });
            //string ecname = System.Environment.MachineName;   
            //string hostnam = computer_name[0].ToString();

            DataTable dtUsrDtls1 = new DataTable();
            //dtUsrDtls = oh.ExecuteDataSet("select max(t.sessionid) from LOGIN_SESSION t where user_id =" + usrid + "").Tables[0];

            dtUsrDtls1 = oh.ExecuteDataSet("select t.sessionid from LOGIN_SESSION t where t.ipaddress='" + ipshow + "' and t.curr_date in (select max(a.curr_date) curr_date from  LOGIN_SESSION a where a.ipaddress='" + ipshow + "' ) ").Tables[0];


            //oh.ExecuteNonQuery("insert into TBL_BRS_ERRORLOG(error,en_date) values('" + ipshow + "',sysdate)");
            //oh.ExecuteNonQuery("insert into TBL_BRS_L OG(details,tra_dt) values('" + dtUsrDtls1.Rows[0][0].ToString() + "',sysdate)");
            //19675

            //Comment..................

            string userid = "402833";//Compliance



            // string userid = "49425";//fzm mumbi
            //string userid = "15974";//fzm kerala
            //string userid = "59317";//HOOP kerala
            // string userid = "405555";
            //string userid = "49425";//Mumbai
            ///string userid = "64600";//delhi
            ///string userid = "14838";



            HttpContext.Current.Session["sessionkey"] = "908DC2AFF18EA20D10B63C36A04F2D25910C85C57705A9A156A146B24776F916CE8A9E00159820FE2AEC916F90F2FB4AF0C05A58DF7893B20B2AC6F952DD549C";
            //////////Muthu  10700
            //10039  bindu
            //19675
            //307519 joby   310463
            //320258 hridya
            //joshy 58723
            //sabitha--313301
            //--314706--minnu
            //--339423--CTO
            //--18906--Rajeev
            // string userid = "315033";
            //string userid = "12626";// naresh
            //string userid = "301437";// vipin
            //string userid = "69674";//RIIM
            //string userid = "315033";
            //string userid = "323435";// audit

            ////Uncomment 
            //string userid = "";
            //if (dtUsrDtls1.Rows.Count > 0)
            //{
            //    userid = Decrypt(HttpUtility.UrlDecode(Request.QueryString["key"]), dtUsrDtls1.Rows[0][0].ToString());
            //    HttpContext.Current.Session["sessionkey"] = dtUsrDtls1.Rows[0][0].ToString();
            //}
            //else
            //{
            //    userid = Decrypt(HttpUtility.UrlDecode(Request.QueryString["key"]), "J1MAORUPPHANAMN");
            //}
            HttpContext.Current.Session["username"] = userid;

            DataTable dtUsrDtls = new DataTable();
             dtUsrDtls = oh.ExecuteDataSet("SELECT A.BRANCH_ID,B.BRANCH_NAME,A.EMP_NAME,A.ACCESS_ID,A.FIRM_ID,A.DEPARTMENT_ID,A.POST_ID FROM BRANCH_MASTER B,EMP_MASTER A WHERE A.BRANCH_ID=B.BRANCH_ID AND A.STATUS_ID=1 AND A.EMP_CODE=" + userid + "").Tables[0];
                HttpContext.Current.Session["branch_id"] = dtUsrDtls.Rows[0][0];
                HttpContext.Current.Session["branch_name"] = dtUsrDtls.Rows[0][1];
                HttpContext.Current.Session["user_name"] = dtUsrDtls.Rows[0][2];
           // HttpContext.Current.Session["username"] = dtUsrDtls.Rows[0][2];

            HttpContext.Current.Session["access_id"] = dtUsrDtls.Rows[0][3];
                HttpContext.Current.Session["firm_id"] = dtUsrDtls.Rows[0][4];
            HttpContext.Current.Session["department_id"] = dtUsrDtls.Rows[0][5];
            HttpContext.Current.Session["post_id"] = dtUsrDtls.Rows[0][6];
            //String strVisitorip = GetIpAddress();

            //String strMacid = GetMACAddress();



            //System.Net.IPHostEntry ipList;
            //ipList = System.Net.Dns.GetHostByAddress(Request.ServerVariables["REMOTE_HOST"].ToString());
            //Response.Write(ipList.HostName.ToString());


            //String ipAddress = System.Web.HttpContext.Current.Request.UserHostAddress;
            HttpContext.Current.Session["system_ip"] = ipshow;

                //HttpContext.Current.Session["emp_branch_id"] = dtUsrDtls.Rows[0][3];
                //HttpContext.Current.Session["role_id"] = dtUsrDtls.Rows[0][5];
                //HttpContext.Current.Session["firm_name"] = dtUsrDtls.Rows[0][7];
                //HttpContext.Current.Session["message"] = dtUsrDtls.Rows[0][8];
                //HttpContext.Current.Session["title"] = dtUsrDtls.Rows[0][9];
                //Response.Redirect("sea.aspx");


                Response.Redirect("index.aspx");
           
        }

        //public string GetIpAddress()
        //{
        //    string stringIpAddress;
        //    stringIpAddress = Request.ServerVariables["HTTP_X_FORWARDED_FOR"];
        //    if (stringIpAddress == null)
        //    {
        //        stringIpAddress = Request.ServerVariables["REMOTE_ADDR"];
        //    }
        //    return "Visitor IP Address is " + stringIpAddress;
        //}

        public string GetLanIPAddress()
        {
            //Get Host Name
            string stringHostName = Dns.GetHostName();
            //Get Ip Host Entry
            IPHostEntry ipHostEntries = Dns.GetHostEntry(stringHostName);
            //Get Ip Address From The Ip Host Entry Address List
            IPAddress[] arrIpAddress = ipHostEntries.AddressList;
            return arrIpAddress[arrIpAddress.Length - 1].ToString();
        }
        private string GetUserIP()
        {
            try
            {
                string ipList = Request.ServerVariables["HTTP_X_FORWARDED_FOR"];

                if (!string.IsNullOrEmpty(ipList))
                {
                    return ipList.Split(',')[0];
                }

                return Request.ServerVariables["REMOTE_ADDR"];
            }
            catch (Exception e)
            {
                oh.ExecuteNonQuery("insert into TBL_BRS_ERRORLOG(error,en_date) values('" + e.Message + "',sysdate)");
                return e.Message;
            }
           
        }
        //public string GetMACAddress()
        //{
        //    NetworkInterface[] nics = NetworkInterface.GetAllNetworkInterfaces();
        //    String sMacAddress = string.Empty;
        //    foreach (NetworkInterface adapter in nics)
        //    {
        //        if (sMacAddress == String.Empty)// only return MAC Address from first card  
        //        {
        //            IPInterfaceProperties properties = adapter.GetIPProperties();
        //            sMacAddress = adapter.GetPhysicalAddress().ToString();
        //        }
        //    }
        //    return sMacAddress;
        //}
        public string GetMACAddress()
        {
            string mac_src = "";
            string macAddress = "";

            foreach (System.Net.NetworkInformation.NetworkInterface nic in System.Net.NetworkInformation.NetworkInterface.GetAllNetworkInterfaces())
            {
                if (nic.OperationalStatus == System.Net.NetworkInformation.OperationalStatus.Up)
                {
                    mac_src += nic.GetPhysicalAddress().ToString();
                    break;
                }
            }

            while (mac_src.Length < 12)
            {
                mac_src = mac_src.Insert(0, "0");
            }

            for (int i = 0; i < 11; i++)
            {
                if (0 == (i % 2))
                {
                    if (i == 10)
                    {
                        macAddress = macAddress.Insert(macAddress.Length, mac_src.Substring(i, 2));
                    }
                    else
                    {
                        macAddress = macAddress.Insert(macAddress.Length, mac_src.Substring(i, 2)) + "-";
                    }
                }
            }
            return macAddress;
        }

        private string Decrypt(string cipherText, string EncryptionKey)
        {
            //string EncryptionKey = "MAKV2SPBNI99212";
            //string EncryptionKey = "J1MAORUPPHANAMN";
            cipherText = cipherText.Replace(" ", "+");
            byte[] cipherBytes = Convert.FromBase64String(cipherText);
            using (Aes encryptor = Aes.Create())
            {
                Rfc2898DeriveBytes pdb = new Rfc2898DeriveBytes(EncryptionKey, new byte[] { 0x49, 0x76, 0x61, 0x6e, 0x20, 0x4d, 0x65, 0x64, 0x76, 0x65, 0x64, 0x65, 0x76 });
                encryptor.Key = pdb.GetBytes(32);
                encryptor.IV = pdb.GetBytes(16);
                using (MemoryStream ms = new MemoryStream())
                {
                    using (CryptoStream cs = new CryptoStream(ms, encryptor.CreateDecryptor(), CryptoStreamMode.Write))
                    {
                        cs.Write(cipherBytes, 0, cipherBytes.Length);
                        cs.Close();
                    }
                    cipherText = Encoding.Unicode.GetString(ms.ToArray());
                }
            }
            return cipherText;
        }
    }
}