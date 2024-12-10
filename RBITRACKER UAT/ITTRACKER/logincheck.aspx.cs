using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.IO;
using System.Text;
using System.Security.Cryptography;
using System.Data;
using System.Net;

namespace RBIDATATRACK
{
    public partial class logincheck : System.Web.UI.Page
    {
        Helper.Oracle.OracleHelper oh = new Helper.Oracle.OracleHelper();
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        public void Page_Init(object o, EventArgs e)
        {
            string use = Convert.ToString(HttpContext.Current.Session["user_id"]);
            string[] usrs;
            usrs = use.Split('!');
            string usrid = usrs[0];
            string ipshow = usrs[1];
            //string usrid = "19675";
            //string sessionid= Session["sessionid"].ToString();
            //string key = HttpUtility.UrlEncode(Encrypt(usrid));
            // string keystring = usrid + '¥' + Convert.ToString(HttpContext.Current.Session["branch_id"]) + '¥' + Convert.ToString(HttpContext.Current.Session["branch_name"]) + '¥' + Convert.ToString(HttpContext.Current.Session["user_name"]) + '¥' + Convert.ToString(HttpContext.Current.Session["emp_branch_id"]) + '¥' + Convert.ToString(HttpContext.Current.Session["access_id"]) + '¥' + Convert.ToString(HttpContext.Current.Session["role_id"]) + '¥' + Convert.ToString(HttpContext.Current.Session["firm_id"]) + '¥' + Convert.ToString(HttpContext.Current.Session["firm_name"]) + '¥' + Convert.ToString(HttpContext.Current.Session["message"]) + '¥' + Convert.ToString(HttpContext.Current.Session["title"]);

            // string strLanip = GetLanIPAddress();
            // string HostAddress = System.Net.Dns.GetHostName();

            //string ipshow = GetUserIP();
            //oh.ExecuteNonQuery("insert into TBL_BRS_LOG(details,tra_dt) values('" + ipshow + "',sysdate)");
           // oh.ExecuteNonQuery("insert into TBL_BRS_ERRORLOG(error,en_date) values('" + ipshow + "',sysdate)");
            DataTable dtUsrDtls = new DataTable();
            //dtUsrDtls = oh.ExecuteDataSet("select max(t.sessionid) from LOGIN_SESSION t where user_id =" + usrid + "").Tables[0];
            dtUsrDtls = oh.ExecuteDataSet("select t.sessionid from LOGIN_SESSION t where t.ipaddress='" + ipshow + "' and t.curr_date in (select max(a.curr_date) curr_date from  LOGIN_SESSION a where a.ipaddress='" + ipshow + "' ) ").Tables[0];
            //oh.ExecuteNonQuery("insert into TBL_BRS_LOG(details,tra_dt) values('" + dtUsrDtls.Rows[0][0].ToString() + "',sysdate)");
            string key = "";
            if (dtUsrDtls.Rows.Count>0)
            {
                key = HttpUtility.UrlEncode(Encrypt(usrid, dtUsrDtls.Rows[0][0].ToString()));
            }
            else
            {
                key = HttpUtility.UrlEncode(Encrypt(usrid, "J1MAORUPPHANAMN"));
            }


            //context.Session("branch_id") = arrStr(0)
            //        context.Session("branch_name") = arrStr(1)
            //        context.Session("user_id") = arrStr(2)
            //        context.Session("user_name") = arrStr(3)
            //        context.Session("emp_branch_id") = arrStr(4)
            //        context.Session("access_id") = arrStr(5)
            //        context.Session("role_id") = arrStr(6)


            //string technology = HttpUtility.UrlEncode(Encrypt(ddlTechnology.SelectedItem.Value));

            //Response.Redirect(string.Format("~/CS2.aspx?name={0}&technology={1}", name, technology));


            string host = HttpContext.Current.Request.Url.Authority.ToString();
            string virtualpath = HttpContext.Current.Request.Url.Segments[1];
            string filename = "/SessionCheck.aspx?key=";
            string url = "http://" + host + "/" + virtualpath + filename + key;

            string k = "Firefox " + url + "";
            System.Web.UI.ScriptManager.RegisterClientScriptBlock(Page, typeof(Page), "Script", "RunNotePad('" + k + "');", true);
        }
        private string Encrypt(string clearText, string EncryptionKey)
        {
            //string EncryptionKey = "MAKV2SPBNI99212";
           
            //string EncryptionKey = "J1MAORUPPHANAMN";
            byte[] clearBytes = Encoding.Unicode.GetBytes(clearText);
            using (Aes encryptor = Aes.Create())
            {
                Rfc2898DeriveBytes pdb = new Rfc2898DeriveBytes(EncryptionKey, new byte[] { 0x49, 0x76, 0x61, 0x6e, 0x20, 0x4d, 0x65, 0x64, 0x76, 0x65, 0x64, 0x65, 0x76 });
                encryptor.Key = pdb.GetBytes(32);
                encryptor.IV = pdb.GetBytes(16);
                using (MemoryStream ms = new MemoryStream())
                {
                    using (CryptoStream cs = new CryptoStream(ms, encryptor.CreateEncryptor(), CryptoStreamMode.Write))
                    {
                        cs.Write(clearBytes, 0, clearBytes.Length);
                        cs.Close();
                    }
                    clearText = Convert.ToBase64String(ms.ToArray());
                }
            }
            return clearText;
        }

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
            string ipList = Request.ServerVariables["HTTP_X_FORWARDED_FOR"];

            if (!string.IsNullOrEmpty(ipList))
            {
                return ipList.Split(',')[0];
            }

            return Request.ServerVariables["REMOTE_ADDR"];
        }
    }
}