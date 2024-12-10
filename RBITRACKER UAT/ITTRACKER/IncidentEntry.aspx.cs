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
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Threading.Tasks;
using System.Net;

namespace RBIDATATRACK
{
    public partial class IncidentEntry : System.Web.UI.Page
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

                if ((usr == "370085") || (usr == "377453") || (usr == "18906") || (pid == "-36") || (Dvl > 0) || (depid == "547"))
                {

                }
                else
                {
                    Response.Redirect("NotAutorized.aspx");
                }

            }

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
        public static List<getDropDownData> mailusers(string pageVal, string pageval1)
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

        //mail
        [WebMethod(EnableSession = true)]

        public static string RequestConfirm(string typ, string val, string mdata, string mailuser)
        {

            string str = "", usrid, branch, amount;
            DataSet ds;
            //string timestamp = DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss tt");
            try
            {

                RBIDATATRACK.CompService.CompServiceClient obj1 = new RBIDATATRACK.CompService.CompServiceClient();
                //sinfini_recovery.mana.SMSTool sms = new sinfini_recovery.mana.SMSTool();

                str = obj1.CompConfirm("ConfirmAddRequest", val, mailuser, "a", "a");

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

        public static string MailDtlsLoad(string mdata, string mailuser)
        {
            List<string> cclList = new List<string>();
            List<string> TomailList = new List<string>();
            List<string> filepathList = new List<string>();

            string str = "", usrid, branch, amount, mail_desc, frd_type, zone, irregularity;
            string res = "done";
            DataSet ds;
            //string timestamp = DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss tt");
            string[] mdatas = mdata.Split('!');
            string[] user_mail = mailuser.Split(',');
            usrid = mdatas[0].ToString();
            branch = mdatas[1].ToString();
            DateTime detdate = Convert.ToDateTime(mdatas[3]);
            var dtdate = detdate.ToString("dd/MM/yyyy");
            amount = mdatas[2].ToString();
            DateTime expiryDate = DateTime.Now;
            var revdt = expiryDate.ToString("dd/MM/yyyy");
            mail_desc = mdatas[4].ToString();
            frd_type = mdatas[5].ToString();
            zone = mdatas[6].ToString();
            irregularity = mdatas[7].ToString();

            //to download attachment for the mail

            byte[] dataFile = new byte[0];

            DateTime CurrentDate = DateTime.Now;

            string DocDate = CurrentDate.ToString("ddMMyyhhmmss");

            RBIDATATRACK.CompService.CompServiceClient obj = new RBIDATATRACK.CompService.CompServiceClient();


            DataTable ds1 = new DataTable();

            try
            {


                string result = "";
                string solutionDirectoryEX = AppDomain.CurrentDomain.BaseDirectory; // main path
                string folder_path = solutionDirectoryEX + "Email_attachment";

                foreach (string file in Directory.GetFiles(folder_path))
                {
                    if (File.Exists(file))
                    {
                        filepathList.Add(file);
                    }
                }


                int EmpCount = user_mail.Length;

                for (int i = 0; i < EmpCount; i++)
                {

                    string Employee = user_mail[i];
                    string to_mail = Employee;
                    TomailList.Add(to_mail);
                }

                cclList.Add("398023@manappuram.com");
                cclList.Add("313586@manappuram.com");
                cclList.Add("compliance@manappuram.com");
                cclList.Add("kiranjithkv@manappuram.com");


                string subj = "FRAUD REPORTED IN " + branch + " BRANCH ON " + dtdate + "";
                string imageUrlLog = GetImageUrl("files/img/manappuram_logo.png");
                string imageContentLog = "<img src='" + imageUrlLog + "' alt='Alternate Text' />";
                string imageUrlPaperless = GetImageUrl("files/img/paperlessBanner.png");
                string imageContentPaperless = "<img src='" + imageUrlPaperless + "' alt='Alternate Text' />";
                string bdy = "<p style='font-family: Calibri,Arial,Helvetica,sans-serif;font-size:12pt;color:rgb(0,0,0); '>Dear Team ,<br/><br/> A fraud has been assigned for your review on : </b>" + revdt + ", <br/>Kindly process the same at the earliest.. <br/> <br/><br/><u><b>Fraud Details </b></u><br/><br/><p><b>" + mail_desc + "</b><br> <br><table style='font-size: 10pt; border: 1px solid #ccc;width: 75%;margin:auto'><tr><th style='border: 1px solid white;border-collapse: collapse; background-color: #fef9e7'>Branch Name</th><td style='border: 1px solid white;border-collapse: collapse; background-color: #fef9e7'>" + branch + "</td></tr><tr><th style='border: 1px solid white;border-collapse: collapse; background-color: #fef9e7'>Date Of Reporting</th><td style='border: 1px solid white;border-collapse: collapse; background-color: #fef9e7'>" + dtdate + "</td></tr><tr><th style='border: 1px solid white;border-collapse: collapse; background-color: #fef9e7'>Amount</th><td style='border: 1px solid white;border-collapse: collapse; background-color: #fef9e7'>" + amount + "</td></tr><tr><th style='border: 1px solid white;border-collapse: collapse; background-color: #fef9e7' >Fraud Type</th><td style='border: 1px solid white;border-collapse: collapse; background-color: #fef9e7'>" + frd_type + "</td></tr><tr><th style='border: 1px solid white;border-collapse: collapse; background-color: #fef9e7' >Zone Name</th><td style='border: 1px solid white;border-collapse: collapse; background-color: #fef9e7' >" + zone + "</td></tr><tr><th style='border: 1px solid white;border-collapse: collapse; background-color: #fef9e7' >Irregularity</th><td style='border: 1px solid white;border-collapse: collapse; background-color: #fef9e7' >" + irregularity + "</td></table> <br><br><br/><br/><br/> Thanks & Regards,<br/>Compliance Portal<br/><span style = 'font-size:11.0pt; font-family:Calibri,sans-serif; color:gray' lang='EN-IN'>Please do not reply to this email ID as this is an automatically generated email and reply to this ID is not being monitored</span></p>" + imageContentLog + " " + imageContentPaperless + "<p><span style = 'color:rgb(105,105,105); font-size:7pt; font-family:arial,sans-serif; line-height:normal; background-color:rgba(0,0,0,0)' >Please be aware that this email/attachment contains MAFIL confidential/sensitive data. You are requested to follow MAFIL Information Security and data sharing policies in case the data is shared further. Feel free to contact AGM Information Security when youare in doubt.</span></p>";

                res = SendMail(TomailList, bdy, subj, filepathList, cclList);


            }
            catch (Exception ef)
            {
                //return ef.Message;
                res = ef.Message;
            }


            return res;

        }
        //





        [WebMethod(EnableSession = true)]

        public static string SendMail(List<string> toMail, string body, string subject, List<string> path, List<string> cclist)
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
                Attachment attch;

                //Live
                //if (toMail.Count > 0)
                //    foreach (string c in toMail) mail.To.Add(new MailAddress(c));

                //if (cclist.Count > 0)
                //    foreach (string c in cclist) mail.CC.Add(new MailAddress(c));

                //Testing
                mail.To.Add("375485@manappuram.com");
                mail.CC.Add("375485@manappuram.com"); // TO BE COMMENTED


                if (path.Count > 0)
                {


                    foreach (string i in path)
                    {
                        attch = new Attachment(i);
                        mail.Attachments.Add(attch);
                    }

                }

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



        [WebMethod(EnableSession = true)]
        public static string UploadingFile(string ImageData, string InputData)
        {
            String InputDataDecrypted = ClientsideEncryption.AESEncrytDecry.DecryptStringAES(InputData);


            List<string> extentions = new List<string>();

            extentions.InsertRange(extentions.Count, new string[] { "pdf", "jpg", "gif", "jpeg", "bmp", "tif", "tiff", "png", "xps", "doc", "docx", "fax", "wmp", "ico", "txt", "rtf", "xls", "xlsx", "ppt", "pptx", "odt", "ods" });

            string InputDataExt = InputDataDecrypted.Split('µ')[2];

            if (extentions.Contains(InputDataExt))
            {
                string result = "";
                string InputString = ImageData.Split(',')[1];
                Byte[] imgByte = Convert.FromBase64String(InputString);
                RBIDATATRACK.PWA_Service.PWA_ServiceClient obj2 = new RBIDATATRACK.PWA_Service.PWA_ServiceClient();

                result = obj2.PwaDocumentUpload("17", InputDataDecrypted, imgByte);
                return result;
            }
            else
            {
                return "666";
            }

        }

        [WebMethod(EnableSession = true)]

        public static string delete_failed_docupload(string typ)
        {

            string str = "", usrid, branch, amount;
            DataSet ds;
            try
            {

                RBIDATATRACK.CompService.CompServiceClient obj1 = new RBIDATATRACK.CompService.CompServiceClient();
                //sinfini_recovery.mana.SMSTool sms = new sinfini_recovery.mana.SMSTool();

                str = obj1.CompConfirm("delete_data", typ, "a", "a", "a");

            }
            catch (Exception e)
            {
                string ERROR = "Error Occured...!";
                return ERROR;



            }
            return str;

        }
        //

    }
}



