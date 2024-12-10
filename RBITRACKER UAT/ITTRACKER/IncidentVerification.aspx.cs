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
namespace RBIDATATRACK
{
    public partial class IncidentVerification : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            RBIDATATRACK.CompService.CompServiceClient obj1 = new RBIDATATRACK.CompService.CompServiceClient();
            DataTable dt1, dt2 = new DataTable();
            string usr, bid, fimid, sessn;
            if (string.IsNullOrEmpty(Session["username"] as string))
            {
                Response.Redirect("SessionExpired.aspx");
            }
            else
            {
                usr = Session["username"].ToString();
                bid = Session["branch_id"].ToString();
                fimid = Session["firm_id"].ToString();
                sessn = Session["sessionkey"].ToString();
                this.hdUserId.Value = usr;
                this.hdBranchId.Value = bid;
                this.hdFirmId.Value = fimid;
                this.hdSesssion.Value = sessn;

                dt1 = obj1.CompSelect("RBI", "EMPLOYEEDT", usr, "", "").Tables[0];
                dt2 = obj1.CompSelect("RBI", "CHECKACC", usr, "", "").Tables[0];
                this.hddpt_id.Value = dt1.Rows[0][0].ToString();
                if (dt1.Rows[0][0].ToString() == "547" || usr == "365705" || usr == "18906" || usr == "359491" || usr == "359288"|| usr == "375485"||usr == "375494")
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


        [WebMethod(EnableSession = true)]
        public static string get_upload_dtls(string pageVal, string pageval1)
        {
            DataSet ds;
            string Result = "";

            RBIDATATRACK.CompService.CompServiceClient obj = new RBIDATATRACK.CompService.CompServiceClient();
            ds = obj.CompSelect(pageVal, pageval1, "", "", "");
            try
            {
                Result = ds.Tables[0].Rows[0][0].ToString();
                    //return Result;
            }
            catch (Exception e)
            {

            }
            return Result;
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

        public static string RequestVerify(string typ, string val, string mdata)
        {

            string str = "", usrid,usrnme;
            DataSet ds;
            List<string> TomailList = new List<string>();
            string to_mail = "";
            //string timestamp = DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss tt");
            try
            {

                RBIDATATRACK.CompService.CompServiceClient obj1 = new RBIDATATRACK.CompService.CompServiceClient();
                //sinfini_recovery.mana.SMSTool sms = new sinfini_recovery.mana.SMSTool();
                RBIDATATRACK.CompService.CompServiceClient obj = new RBIDATATRACK.CompService.CompServiceClient();
                //string[] frd = frdid.Split('~');
                //string frd1 = frd[0].ToString();
                str = obj1.CompConfirm("Verifyincident", val, "a", "a", "a");
                string[] mdatas = mdata.Split('!');
                string frdid = mdatas[0].ToString();
                string[] frd = frdid.Split('~');
                string frd1 = frd[0].ToString();
                ds = obj.CompSelect("Get_email_dtl", frd1, "", "", "");
                usrid = ds.Tables[0].Rows[0][0].ToString();
                usrnme= ds.Tables[0].Rows[0][1].ToString();

                string frtype = mdatas[1].ToString();
                DateTime detdate = Convert.ToDateTime(mdatas[2]);
                string zon = mdatas[3].ToString();
                string branch = mdatas[4].ToString()+"!"+ mdatas[5].ToString();
                string irr = mdatas[6].ToString();
                string amt = mdatas[7].ToString();
                string frdetails = mdatas[8].ToString();
                string rems = mdatas[9].ToString();

                var dtdate = detdate.ToString("dd/MM/yyyy");
              


                DateTime expiryDate = DateTime.Now;
                var revdt = expiryDate.ToString("dd/MM/yyyy");
                if (str != null)
                {
                    try
                    {
                        DataTable dt1, dt2, dt3, dt4;
                        //dt1 = obj1.CompSelect("GetEmailNoteRequest", usrid, "", "", "").Tables[0];
                        string cc = "compliance@manappuram.com";
                        string subj = "FRAUD REPORTED IN "+branch+" ON "+ revdt ;
                        string imageUrlLog = GetImageUrl("files/img/manappuram_logo.png");
                        string imageContentLog = "<img src='" + imageUrlLog + "' alt='Alternate Text' />";
                        string imageUrlPaperless = GetImageUrl("files/img/paperlessBanner.png");
                        string imageContentPaperless = "<img src='" + imageUrlPaperless + "' alt='Alternate Text' />";
                        string bdy = "<p style='font-family: Calibri,Arial,Helvetica,sans-serif;font-size:12pt;color:rgb(0,0,0); '>Dear Compliance Team ,<br/><br/> A fraud has been verified by <b> "+ usrid + "</b> on :" +
                            " </b>" + revdt + ", <br/> <br/> <br/><br/><u><b>Fraud Details </b></u><br/><br/><p><b>" + frdetails + "</b><br>" +
                            " <br><table style='font-size: 10pt; border: 1px solid #ccc;width: 75%;margin:auto'>" +
                            "<tr><th style='border: 1px solid white;border-collapse: collapse; background-color: #fef9e7'>Branch Name</th><td style='border: 1px solid white;border-collapse: collapse; background-color: #fef9e7'>" + branch + "</td>" +
                            "</tr><tr><th style='border: 1px solid white;border-collapse: collapse; background-color: #fef9e7'>Date Of Reporting</th><td style='border: 1px solid white;border-collapse: collapse; background-color: #fef9e7'>" + dtdate + "</td></tr>" +
                            "<tr><th style='border: 1px solid white;border-collapse: collapse; background-color: #fef9e7'>Amount</th><td style='border: 1px solid white;border-collapse: collapse; background-color: #fef9e7'>" + amt + "</td></tr>" +
                            "<tr><th style='border: 1px solid white;border-collapse: collapse; background-color: #fef9e7' >Fraud Type</th><td style='border: 1px solid white;border-collapse: collapse; background-color: #fef9e7'>" + frtype + "</td></tr>" +
                            "<tr><th style='border: 1px solid white;border-collapse: collapse; background-color: #fef9e7' >Zone Name</th><td style='border: 1px solid white;border-collapse: collapse; background-color: #fef9e7' >" + zon + "</td></tr>" +
                            "<tr><th style='border: 1px solid white;border-collapse: collapse; background-color: #fef9e7' >Irregularity</th><td style='border: 1px solid white;border-collapse: collapse; background-color: #fef9e7' >" + irr + "</td>" +
                            "</table>" + "" +
                            " <br><br><br/><br/><br/> Thanks & Regards,<br/>Compliance Portal<br/><span style = 'font-size:11.0pt; font-family:Calibri,sans-serif; color:gray' lang='EN-IN'>Please do not reply to this email ID as this is an automatically generated email and reply to this ID is not being monitored</span></p>" + imageContentLog + " " + imageContentPaperless + "<p><span style = 'color:rgb(105,105,105); font-size:7pt; font-family:arial,sans-serif; line-height:normal; background-color:rgba(0,0,0,0)' >Please be aware that this email/attachment contains MAFIL confidential/sensitive data. You are requested to follow MAFIL Information Security and data sharing policies in case the data is shared further. Feel free to contact AGM Information Security when youare in doubt.</span></p>";
                        // string bdy = "<p style='font-family: Calibri,Arial,Helvetica,sans-serif;font-size:12pt;color:rgb(0,0,0);'>Dear Sir/Madam, ,<br/><br/> A  fraud has been assigned for data updation on  :  </b>" + revdt + ", <br/>Kindly process the same at the earliest.. <br/> <br/><br/><u><b>Fraud Details </b></u><br/><br/> <br>Branch Name &ensp; Amount  &ensp; Date of Detection </br>" + branch + "  &ensp; " + amount + " &ensp; " + dtdate + " <br/><br/><br/><br/>  Thanks & Regards,<br/>Compliance Portal<br/><span style = 'font-size:11.0pt; font-family:&quot;Calibri&quot;,sans-serif; color:gray' lang='EN-IN'>Please do not reply to this email ID as this is an automatically generated email and reply to this ID is not being monitored</span></p>" + imageContentLog + "   " + imageContentPaperless + "<p><span style = 'color:rgb(105,105,105); font-size:7pt; font-family:arial,sans-serif; line-height:normal; background-color:rgba(0,0,0,0)' >Please be aware that this email/attachment contains MAFIL confidential/sensitive data. You are requested to follow MAFIL Information Security and data sharing policies in case the data is shared further. Feel free to contact AGM Information Security when youare in doubt.</span></p>";


                        string usrmail = usrid + "@manappuram.com";
                        to_mail = usrmail + ";" + to_mail;
                        TomailList.Add(usrmail);
                        string audtmail1 = "gmaudit@manappuram.com";
                        to_mail = audtmail1 + ";" + to_mail;
                        TomailList.Add(audtmail1);
                        string audtmail2 = "agmia@manappuram.com";
                        to_mail = audtmail2 + ";" + to_mail;
                        TomailList.Add(audtmail2);
                        string riimmail = "agmriim@manappuram.com";
                        to_mail = riimmail + ";" + to_mail;
                        TomailList.Add(riimmail);


                        //string usrmail ="375485@manappuram.com";
                        //to_mail = usrmail + ";" + to_mail;
                        //TomailList.Add(usrmail);
                        //string cc = "375494@manappuram.com";


                        SendMail(TomailList, cc, bdy, subj);


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
            catch (Exception e)
            {
                string ERROR = "Error Occured...!";
                return ERROR;



            }
            return str;

        }

        [WebMethod(EnableSession = true)]
        public static string SendMail(List<string> toMail, string cc, string body, string subject)
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
                if (toMail.Count > 0)
                    foreach (string c in toMail) mail.To.Add(new MailAddress(c));
                //mail.To.Add(new MailAddress(toMail));
                mail.From = new MailAddress("compliancemail@manappuram.com");
                mail.Subject = subject;
                mail.IsBodyHtml = true;
                mail.Body = body;
                
                if (cc != "" || cc != null) mail.CC.Add(new MailAddress(cc));
                System.Net.ServicePointManager.SecurityProtocol = System.Net.SecurityProtocolType.Tls | System.Net.SecurityProtocolType.Tls11 | System.Net.SecurityProtocolType.Tls12;
                System.Net.ServicePointManager.SecurityProtocol = System.Net.SecurityProtocolType.Tls | System.Net.SecurityProtocolType.Tls11 | System.Net.SecurityProtocolType.Tls12;
                mail.IsBodyHtml = true;
                //server.Send(mail);
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

        public static string RejectIncident(string typ, string val,string frdid)
        {

            string str = "", usrid, usrnme;
            DataSet ds;
            List<string> TomailList = new List<string>();
            string to_mail = "";
            //string timestamp = DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss tt");
            try
            {

                RBIDATATRACK.CompService.CompServiceClient obj1 = new RBIDATATRACK.CompService.CompServiceClient();
                //sinfini_recovery.mana.SMSTool sms = new sinfini_recovery.mana.SMSTool();
                RBIDATATRACK.CompService.CompServiceClient obj = new RBIDATATRACK.CompService.CompServiceClient();
                string[] frd = frdid.Split('!');
                string frd1 = frd[0].ToString();
                str = obj1.CompConfirm("Reject", val, "a", "a", "a");
                ds = obj.CompSelect("Get_email_rej", frd1, "", "", "");
                usrid = ds.Tables[0].Rows[0][0].ToString();
                usrnme = ds.Tables[0].Rows[0][1].ToString();

                string[] mdatas = frdid.Split('!'); 
                string fraudid = mdatas[0].ToString();
                string frtype = mdatas[1].ToString();
                DateTime detdate = Convert.ToDateTime(mdatas[2]);
                string zon = mdatas[3].ToString();
                string branch = mdatas[4].ToString() + "!" + mdatas[5].ToString();
                string irr = mdatas[6].ToString();
                string amt = mdatas[7].ToString();
                string frdetails = mdatas[8].ToString();
                string rems = mdatas[9].ToString();

                var dtdate = detdate.ToString("dd/MM/yyyy");



                DateTime expiryDate = DateTime.Now;
                var revdt = expiryDate.ToString("dd/MM/yyyy");
                if (str != null)
                {
                    try
                    {
                        DataTable dt1, dt2, dt3, dt4;
                        //dt1 = obj1.CompSelect("GetEmailNoteRequest", usrid, "", "", "").Tables[0];
                        string cc = "compliance@manappuram.com";
                        string subj = "FRAUD REPORTED IN " + branch + " ON " + revdt;
                        string imageUrlLog = GetImageUrl("files/img/manappuram_logo.png");
                        string imageContentLog = "<img src='" + imageUrlLog + "' alt='Alternate Text' />";
                        string imageUrlPaperless = GetImageUrl("files/img/paperlessBanner.png");
                        string imageContentPaperless = "<img src='" + imageUrlPaperless + "' alt='Alternate Text' />";

                        string bdy = "<p style='font-family: Calibri,Arial,Helvetica,sans-serif;font-size:12pt;color:rgb(0,0,0); '>Dear Compliance Team ,<br/><br/> A fraud has been rejected by <b> " + usrid + "</b> on :" +
                            " </b>" + revdt + ", <br/> <br/> <br/><br/><u><b>Fraud Details </b></u><br/><br/><p><b>" + frdetails + "</b><br>" +
                            " <br><table style='font-size: 10pt; border: 1px solid #ccc;width: 75%;margin:auto'>" +
                            "<tr><th style='border: 1px solid white;border-collapse: collapse; background-color: #fef9e7'>Branch Name</th><td style='border: 1px solid white;border-collapse: collapse; background-color: #fef9e7'>" + branch + "</td>" +
                            "</tr><tr><th style='border: 1px solid white;border-collapse: collapse; background-color: #fef9e7'>Date Of Reporting</th><td style='border: 1px solid white;border-collapse: collapse; background-color: #fef9e7'>" + dtdate + "</td></tr>" +
                            "<tr><th style='border: 1px solid white;border-collapse: collapse; background-color: #fef9e7'>Amount</th><td style='border: 1px solid white;border-collapse: collapse; background-color: #fef9e7'>" + amt + "</td></tr>" +
                            "<tr><th style='border: 1px solid white;border-collapse: collapse; background-color: #fef9e7' >Fraud Type</th><td style='border: 1px solid white;border-collapse: collapse; background-color: #fef9e7'>" + frtype + "</td></tr>" +
                            "<tr><th style='border: 1px solid white;border-collapse: collapse; background-color: #fef9e7' >Zone Name</th><td style='border: 1px solid white;border-collapse: collapse; background-color: #fef9e7' >" + zon + "</td></tr>" +
                            "<tr><th style='border: 1px solid white;border-collapse: collapse; background-color: #fef9e7' >Irregularity</th><td style='border: 1px solid white;border-collapse: collapse; background-color: #fef9e7' >" + irr + "</td>" +
                            "</table>" + "" +
                            " <br><br><br/><br/><br/> Thanks & Regards,<br/>Compliance Portal<br/><span style = 'font-size:11.0pt; font-family:Calibri,sans-serif; color:gray' lang='EN-IN'>Please do not reply to this email ID as this is an automatically generated email and reply to this ID is not being monitored</span></p>" + imageContentLog + " " + imageContentPaperless + "<p><span style = 'color:rgb(105,105,105); font-size:7pt; font-family:arial,sans-serif; line-height:normal; background-color:rgba(0,0,0,0)' >Please be aware that this email/attachment contains MAFIL confidential/sensitive data. You are requested to follow MAFIL Information Security and data sharing policies in case the data is shared further. Feel free to contact AGM Information Security when youare in doubt.</span></p>";

                        //string bdy = "<p style='font-family: Calibri,Arial,Helvetica,sans-serif;font-size:12pt;color:rgb(0,0,0);'>Dear" + usrnme + ",<br/><br/> An fraud incident created by .</b>" + usrid + ", <br/>Entered Suucssfully. <br/> <br/><br/><u><b>Fraud Entered by   </b></u><br/><br/> " + usrid + " <br/><br/><br/><br/>  Thanks & Regards,<br/>Compliance Portal<br/><span style = 'font-size:11.0pt; font-family:&quot;Calibri&quot;,sans-serif; color:gray' lang='EN-IN'>Please do not reply to this email ID as this is an automatically generated email and reply to this ID is not being monitored</span></p>" + imageContentLog + "   " + imageContentPaperless + "<p><span style = 'color:rgb(105,105,105); font-size:7pt; font-family:arial,sans-serif; line-height:normal; background-color:rgba(0,0,0,0)' >Please be aware that this email/attachment contains MAFIL confidential/sensitive data. You are requested to follow MAFIL Information Security and data sharing policies in case the data is shared further. Feel free to contact AGM Information Security when youare in doubt.</span></p>";

                        string usrmail = usrid + "@manappuram.com";
                        to_mail = usrmail + ";" + to_mail;
                        TomailList.Add(usrmail);

                        string audtmail1 = "gmaudit@manappuram.com";
                        to_mail = audtmail1 + ";" + to_mail;
                        TomailList.Add(audtmail1);
                        string audtmail2 = "agmia@manappuram.com";
                        to_mail = audtmail2 + ";" + to_mail;
                        TomailList.Add(audtmail2);
                        string riimmail = "agmriim@manappuram.com";
                        to_mail = riimmail + ";" + to_mail;
                        TomailList.Add(riimmail);


                        //string usrmail = "375485@manappuram.com";
                        //to_mail = usrmail + ";" + to_mail;
                        //TomailList.Add(usrmail);
                        //string cc = "375494@manappuram.com";

                        SendMail(TomailList, cc, bdy, subj);


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
            catch (Exception e)
            {
                string ERROR = "Error Occured...!";
                return ERROR;



            }
            return str;

        }

    }
}