using System;
using System.Collections.Generic;
using System.Data;
using System.Drawing.Imaging;
using System.IO;
using System.Text;
using System.Web;
using System.Web.Services;
using System.Net.Mail;
using System.Linq;

namespace RBIDATATRACK
{
    public partial class DO_Letter : System.Web.UI.Page
    {
        
        protected void Page_Load(object sender, EventArgs e)
        {
            string usr, bid, fimid, sessn, depid, pid;
            int Dvl;
            if (string.IsNullOrEmpty(Session["username"] as string))
            {
                Response.Redirect("SessionExpired.aspx");
            }
            else
            {
                DataTable dt = new DataTable();
                usr = Session["username"].ToString();

                RBIDATATRACK.CompService.CompServiceClient obj = new RBIDATATRACK.CompService.CompServiceClient();
                dt = obj.CompSelect("dephead", usr, "", "", "").Tables[0];

                Dvl = Convert.ToInt32(dt.Rows[0][0].ToString());
                bid = Session["branch_id"].ToString();
                fimid = Session["firm_id"].ToString();
                sessn = Session["sessionkey"].ToString();
                depid = Session["department_id"].ToString();
                pid = Session["post_id"].ToString();

                this.hdUserId.Value = usr;
                this.hdBranchId.Value = bid;
                this.hdFirmId.Value = fimid;
                this.hdSesssion.Value = sessn;
                this.hddpt_id.Value = depid;
                this.hdpst_id.Value = pid;

                if ((usr == "18906") || (usr == "365705") || (usr == "359491") || (usr == "359288") || (pid == "-36") || (Dvl > 0) || (depid == "547"))
                {

                }
                else
                {
                    Response.Redirect("/NotAutorized.aspx");
                }

            }
        }
        public class getDropDownData
        {
            public string id { get; set; }
            public string name { get; set; }
        }
        [WebMethod(EnableSession = true)]
        public static string GetImageUrl(string imagePath)
        {
            System.Drawing.Image image = System.Drawing.Image.FromFile(System.Web.HttpContext.Current.Server.MapPath(imagePath));
            MemoryStream memoryStream = new MemoryStream();
            image.Save(memoryStream, ImageFormat.Png);
            Byte[] bytes = new Byte[memoryStream.Length];
            memoryStream.Position = 0;
            memoryStream.Read(bytes, 0, (int)bytes.Length);
            string base64String = Convert.ToBase64String(bytes, 0, bytes.Length);
            string imageUrl = "data:image/png;base64," + base64String;
            return imageUrl;
        }

        [WebMethod(EnableSession = true)]        
        public static string  saveData(string typ, string val, string mdata)  //proc_compliance_confirm  
        {
            DataSet ds, ds1;
            string str = "" ;
          
            RBIDATATRACK.CompService.CompServiceClient obj = new RBIDATATRACK.CompService.CompServiceClient();
            RBIDATATRACK.CompService.CompServiceClient obj1 = new RBIDATATRACK.CompService.CompServiceClient();
            ds = obj1.CompSelect("Get_mail_data", mdata, "", "", "");
            ds1 = obj.CompSelect("Get_email_dtl", mdata, "", "", "");
            string usid = ds1.Tables[0].Rows[0][0].ToString();
            string usname = ds1.Tables[0].Rows[0][1].ToString();
            string branch = ds.Tables[0].Rows[0][0].ToString();
            string amount = ds.Tables[0].Rows[0][1].ToString();
            string dtdate = ds.Tables[0].Rows[0][2].ToString();
            DateTime expiryDate = DateTime.Now;
            var revdt = expiryDate.ToString("dd/MM/yyyy");
            try
            {
            str = obj.CompConfirm("ConfirmSave", val , "a", "a", "a");

                if (str != null)
                {
                    try
                    {
                        DataTable dt1, dt2, dt3, dt4;
                        //dt1 = obj1.CompSelect("GetEmailNoteRequest", usrid, "", "", "").Tables[0];
                        string cc = usid + "@manappuram.com";
                        string subj = "RBI FRAUD REPORTING ALERT";
                        string imageUrlLog = GetImageUrl("files/img/manappuram_logo.png");
                        string imageContentLog = "<img src='" + imageUrlLog + "' alt='Alternate Text' />";
                        string imageUrlPaperless = GetImageUrl("files/img/paperlessBanner.png");
                        string imageContentPaperless = "<img src='" + imageUrlPaperless + "' alt='Alternate Text' />";
                        string bdy = "<p style='font-family: Calibri,Arial,Helvetica,sans-serif;font-size:12pt;color:rgb(0,0,0);'>Dear Compliance Team ,<br/><br/> A  fraud has been assigned for your review on :  </b>" + revdt + ", <br/>Kindly process the same at the earliest.. <br/> <br/><br/><u><b>Fraud Details </b></u><br/><br/> <br>Branch Name &ensp; Amount  &ensp; Date of Detection </br>" + branch + "  &ensp; " + amount + " &ensp; " + dtdate + " <br/><br/><br/><br/>  Thanks & Regards,<br/>Compliance Portal<br/><span style = 'font-size:11.0pt; font-family:&quot;Calibri&quot;,sans-serif; color:gray' lang='EN-IN'>Please do not reply to this email ID as this is an automatically generated email and reply to this ID is not being monitored</span></p>" + imageContentLog + "   " + imageContentPaperless + "<p><span style = 'color:rgb(105,105,105); font-size:7pt; font-family:arial,sans-serif; line-height:normal; background-color:rgba(0,0,0,0)' >Please be aware that this email/attachment contains MAFIL confidential/sensitive data. You are requested to follow MAFIL Information Security and data sharing policies in case the data is shared further. Feel free to contact AGM Information Security when youare in doubt.</span></p>";

                        string to_mail = "compliance@manappuram.com";
                        SendMail(to_mail, cc, bdy, subj);


                        //string reqname = dt1.Rows[0][1].ToString();
                        //string reqdate = dt1.Rows[0][2].ToString();
                    }
                    catch (Exception ef)
                    {
                        //return ef.Message;
                        string msg = ef.Message;
                    }
                }
            }
            catch (Exception e) {

            }
            return str;
        }

        [WebMethod(EnableSession = true)]
        public static string SendMail(string toMail, string cc, string body, string subject)
        {
            string exp = "";
            try
            {
                SmtpClient server = new SmtpClient("smtp.office365.com");
                server.Port = 587;
                server.EnableSsl = true;
                server.UseDefaultCredentials = false;
                server.Credentials = new System.Net.NetworkCredential("compliancemail@manappuram.com", "HR@9850cb", "smtp.office365.com");
                server.Timeout = 10000;
                server.TargetName = "STARTTLS/smtp.office365.com";
                server.DeliveryMethod = SmtpDeliveryMethod.Network;
                MailMessage mail = new MailMessage();
                mail.To.Add(new MailAddress(toMail));
                mail.From = new MailAddress("compliancemail@manappuram.com");
                mail.Subject = subject;
                mail.IsBodyHtml = true;
                mail.Body = body;
                if (cc != "" || cc != null) mail.CC.Add(new MailAddress(cc));
                System.Net.ServicePointManager.SecurityProtocol = System.Net.SecurityProtocolType.Tls | System.Net.SecurityProtocolType.Tls11 | System.Net.SecurityProtocolType.Tls12;
                System.Net.ServicePointManager.SecurityProtocol = System.Net.SecurityProtocolType.Tls | System.Net.SecurityProtocolType.Tls11 | System.Net.SecurityProtocolType.Tls12;
                mail.IsBodyHtml = true;
                server.Send(mail);
            }
            catch (Exception e)
            {
                exp = "NA";
                return exp;
                throw e;
            }
            return exp;

        }
        [WebMethod(EnableSession = true)]
        public static string UodateReturnData(string typ, string val)  //proc_compliance_confirm  
        {
            string str = "";
            RBIDATATRACK.CompService.CompServiceClient obj = new RBIDATATRACK.CompService.CompServiceClient();
            try
            {
                str = obj.CompConfirm("VerifyReturnUpdate", val, "a", "a", "a");
            }
            catch (Exception e)
            {

            }
            return str;
        }

        [WebMethod(EnableSession = true)]
        public static List<getDropDownData> getFillData(string pageVal, string pageval1)
        {
            DataSet ds;
            List<getDropDownData> getData = new List<getDropDownData>();

            RBIDATATRACK.CompService.CompServiceClient obj = new RBIDATATRACK.CompService.CompServiceClient();
            ds = obj.CompSelect(pageVal, pageval1, "", "", "");
            try
            {
                if (ds.Tables[0].Rows.Count > 0)
                {
                    foreach (DataRow dr in ds.Tables[0].Rows)
                    {
                        getData.Add(new getDropDownData()
                        {
                            id = dr[0].ToString(),
                            name = dr[1].ToString()
                        });
                    }
                }
            }
            catch (Exception e)
            {
            }
            return getData;
        }

        [WebMethod(EnableSession = true)]
        public static string Save_Modus(string flag, string data, string contnt)
        {
            DataTable dt;
            string Rslt = "";

            RBIDATATRACK.CompService.CompServiceClient obj = new RBIDATATRACK.CompService.CompServiceClient();
            try
             {


                //var newAttach = Encoding.Unicode.GetBytes(contnt);

                obj.DocumentNclobUpload(flag, data, contnt);

                //Rslt = dt.Rows[0][0].ToString();
                return Rslt;
            }
            catch (Exception e)
            {
                return e.Message;
            }

        }

    }
}