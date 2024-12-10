using System;
using System.Collections.Generic;
using System.Data;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace RBIDATATRACK
{
    public partial class Incident_Remove : System.Web.UI.Page
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

                if ((usr == "375485") || (usr == "18906")||(depid == "547"))
                {

                }
                else
                {
                    Response.Redirect("NotAutorized.aspx");
                }

            }

        }

        public class fraud_details
        {
            public string fraud_typ { get; set; }
            public string zone { get; set; }
            public string loass_amt { get; set; }
            public string irregularity { get; set; }
            public string reprort_date { get; set; }
       



        }





        public class getDropDownData
        {
            public string id { get; set; }
            public string name { get; set; }
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
        // 

        [WebMethod(EnableSession = true)]

        public static fraud_details get_fraud_dtls(string p_flag, string pageval)
        {

            DataSet ds;
            //string timestamp = DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss tt");

            fraud_details fd = new fraud_details();
            RBIDATATRACK.CompService.CompServiceClient obj1 = new RBIDATATRACK.CompService.CompServiceClient();
                //sinfini_recovery.mana.SMSTool sms = new sinfini_recovery.mana.SMSTool();

                ds = obj1.CompSelect(p_flag, pageval, "", "", "");
            try
            {
                if (ds.Tables[0].Rows.Count > 0)
                {
                    fd.fraud_typ = ds.Tables[0].Rows[0][0].ToString();
                    fd.zone = ds.Tables[0].Rows[0][1].ToString();
                    fd.loass_amt = ds.Tables[0].Rows[0][2].ToString();
                    fd.irregularity = ds.Tables[0].Rows[0][3].ToString();
                    fd.reprort_date = ds.Tables[0].Rows[0][4].ToString();
                
                }
            }
            catch (Exception e)
            {
               



            }

            return fd;

        }
        //

        [WebMethod(EnableSession = true)]

        public static string RequestConfirm(string typ, string val)
        {

            string str = "", usrid, branch, amount;
            DataSet ds;
            //string timestamp = DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss tt");
            try
            {

                RBIDATATRACK.CompService.CompServiceClient obj1 = new RBIDATATRACK.CompService.CompServiceClient();
                //sinfini_recovery.mana.SMSTool sms = new sinfini_recovery.mana.SMSTool();

                str = obj1.CompConfirm("Confirmremove", val, "", "a", "a");

            }
            catch (Exception e)
            {
                string ERROR = "Error Occured...!";
                return ERROR;



            }
            return str;

        }
        //

        [WebMethod(EnableSession = true)]

        public static string MailDtlsLoad(string typ, string val)
        {
            List<string> cclList = new List<string>();
            List<string> TomailList = new List<string>();
            string mail_id = "";
            string str = "", usrid, branch, amount, mail_desc, frd_type, zone, irregularity,date,reason;
            string res = "done";
            DataSet ds;
         
 
            //to download attachment for the mail


            DateTime CurrentDate = DateTime.Now;

            string DocDate = CurrentDate.ToString("ddMMyyhhmmss");

            RBIDATATRACK.CompService.CompServiceClient obj = new RBIDATATRACK.CompService.CompServiceClient();


            DataTable ds1 = new DataTable();


            ds1 = obj.CompSelect("get_empmail", val, "", "", "").Tables[0];
            foreach (DataRow dr in ds1.Rows)
            {



                IncidentEntry d = new IncidentEntry();
                mail_id = dr[0].ToString();

                TomailList.Add(mail_id);


            }
            cclList.Add("398023@manappuram.com");
            cclList.Add("313586@manappuram.com");
            cclList.Add("compliance@manappuram.com");
            cclList.Add("kiranjithkv@manappuram.com");

            branch = ds1.Rows[0][1].ToString();
            date = ds1.Rows[0][2].ToString();
            amount = ds1.Rows[0][3].ToString();
            frd_type = ds1.Rows[0][4].ToString();
            zone = ds1.Rows[0][5].ToString();
            irregularity = ds1.Rows[0][6].ToString();
            reason = ds1.Rows[0][7].ToString();


            try
            {
              

                
                string subj = "FRAUD REMOVED";
                string imageUrlLog = GetImageUrl("files/img/manappuram_logo.png");
                string imageContentLog = "<img src='" + imageUrlLog + "' alt='Alternate Text' />";
                string imageUrlPaperless = GetImageUrl("files/img/paperlessBanner.png");
                string imageContentPaperless = "<img src='" + imageUrlPaperless + "' alt='Alternate Text' />";
                string bdy = "<p style='font-family: Calibri,Arial,Helvetica,sans-serif;font-size:12pt;color:rgb(0,0,0); '>Dear Sir/Madam ,<br/><br/> A fraud has been removed <br/> <br/> <br/><br/><u><b>Fraud Details </b></u><br/><br/><p><br><br><table style='font-size: 10pt; border: 1px solid #ccc;width: 75%;margin:auto'><tr><th style='border: 1px solid white;border-collapse: collapse; background-color: #fef9e7'>Branch Name</th><td style='border: 1px solid white;border-collapse: collapse; background-color: #fef9e7'>" + branch + "</td></tr><tr><th style='border: 1px solid white;border-collapse: collapse; background-color: #fef9e7'>Created Date</th><td style='border: 1px solid white;border-collapse: collapse; background-color: #fef9e7'>" + date + "</td></tr><tr><th style='border: 1px solid white;border-collapse: collapse; background-color: #fef9e7'>Amount</th><td style='border: 1px solid white;border-collapse: collapse; background-color: #fef9e7'>" + amount + "</td></tr><tr><th style='border: 1px solid white;border-collapse: collapse; background-color: #fef9e7' >Fraud Type</th><td style='border: 1px solid white;border-collapse: collapse; background-color: #fef9e7'>" + frd_type + "</td></tr><tr><th style='border: 1px solid white;border-collapse: collapse; background-color: #fef9e7' >Zone Name</th><td style='border: 1px solid white;border-collapse: collapse; background-color: #fef9e7' >" + zone + "</td></tr><tr><th style='border: 1px solid white;border-collapse: collapse; background-color: #fef9e7' >Irregularity</th><td style='border: 1px solid white;border-collapse: collapse; background-color: #fef9e7' >" + irregularity + "</td><tr><th style='border: 1px solid white;border-collapse: collapse; background-color: #fef9e7' >Reason</th><td style='border: 1px solid white;border-collapse: collapse; background-color: #fef9e7' >" + reason + "</td></table> <br><br><br/><br/><br/> Thanks & Regards,<br/>Compliance Portal<br/><span style = 'font-size:11.0pt; font-family:Calibri,sans-serif; color:gray' lang='EN-IN'>Please do not reply to this email ID as this is an automatically generated email and reply to this ID is not being monitored</span></p>" + imageContentLog + " " + imageContentPaperless + "<p><span style = 'color:rgb(105,105,105); font-size:7pt; font-family:arial,sans-serif; line-height:normal; background-color:rgba(0,0,0,0)' >Please be aware that this email/attachment contains MAFIL confidential/sensitive data. You are requested to follow MAFIL Information Security and data sharing policies in case the data is shared further. Feel free to contact AGM Information Security when youare in doubt.</span></p>";



                SendMail(TomailList, bdy, subj, cclList);



            }
            catch (Exception ef)
            {
                //return ef.Message;
                string msg = ef.Message;
            }


            return res;

        }
        //

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

        public static string SendMail(List<string> toMail, string body, string subject, List<string> cclist)
        {
            string exp = "";
            try
            {
                SmtpClient server = new SmtpClient("smtp.office365.com");
                server.Port = 587;
                server.EnableSsl = true;
                server.UseDefaultCredentials = false;
                int tls12 = 3072;
                System.Net.ServicePointManager.SecurityProtocol = (SecurityProtocolType)tls12;
                server.Credentials = new System.Net.NetworkCredential("compliancemail@manappuram.com", "HR@9850cb", "smtp.office365.com");
                server.Timeout = 100000;
                server.TargetName = "STARTTLS/smtp.office365.com";
                server.DeliveryMethod = SmtpDeliveryMethod.Network;
                MailMessage mail = new MailMessage();
                //Live
                //if (toMail.Count > 0)
                //    foreach (string c in toMail) mail.To.Add(new MailAddress(c));
                //if (cclist.Count > 0)
                //       foreach (string c in cclist) mail.CC.Add(new MailAddress(c));

                //Testing
                mail.CC.Add("375485@manappuram.com");
                mail.To.Add("375485@manappuram.com");

                mail.From = new MailAddress("compliancemail@manappuram.com");

                mail.Subject = subject;
                mail.IsBodyHtml = true;
                mail.Body = body;

                mail.IsBodyHtml = true;
                server.Send(mail);
            }
            catch (Exception e)
            {
                exp = e.ToString();
                return exp;
                throw e;
            }
            return exp;

        }
    }
}