using System;
using System.Collections.Generic;
using System.Data;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace RBIDATATRACK
{
    public partial class Incident_doc_verify : System.Web.UI.Page
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

                if ((usr == "375485") || (usr == "377453") || (Dvl > 0) || (depid == "547"))
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
        public static string getFillTable(string pageVal, string pageval1)
        {
            string header = "";
            string usr = "";
            try
            {
                DataSet ds, ds1 = new DataSet();
                //DataTable ds, ds1 = new DataTable();


                RBIDATATRACK.CompService.CompServiceClient obj = new RBIDATATRACK.CompService.CompServiceClient();



                ds = obj.CompSelect("Get_fraud_upd_dtls", pageval1, "", "", "");


                header = Incident_doc_verify.DataTableToHTMLTable(ds.Tables[0]);



                DataTableToHTMLTable(ds.Tables[0]);
            }

            catch (Exception e)
            {
                header = e.ToString();
            }

            return header.ToString();
        }


        private static string DataTableToHTMLTable(DataTable inTable)
        {

            DataTable dt = inTable;

            // Create a StringBuilder object to store the table header.
            StringBuilder header = new StringBuilder();

            // Add the table header to the StringBuilder object.
            header.Append("<thead class='bg-primary text-white' style='text-align:center';><tr>");
            header.AppendFormat("<th data-sortable='true'>S.no</th>");
            foreach (DataColumn column in dt.Columns)
            {

                header.AppendFormat("<th data-sortable='true'>{0}</th>", column.ColumnName);
            }
            header.Append("</tr></thead>");

            // Create a StringBuilder object to store the table body.
            StringBuilder body = new StringBuilder();

            // Add the table body to the StringBuilder object.
            int i = 1;
            foreach (DataRow row in dt.Rows)
            {
                body.Append("<tr>");
                body.AppendFormat("<td>{0}</td>", i++);
                foreach (DataColumn column in dt.Columns)
                {
                    object value = row[column.ColumnName];

                    body.AppendFormat("<td>{0}</td>", value);

                }
                body.Append("</tr>");
            }

            // Return the table.
            return header.ToString() + body.ToString();

        }

        //doc view//


        [WebMethod(EnableSession = true)]
        public static string imageview(string QueryString, string data)
        {
            byte[] dataFile = new byte[0];
            string Result = "", extension = "", filename = "";

            DateTime CurrentDate = DateTime.Now;

            string DocDate = CurrentDate.ToString("ddMMyyhhmmss");

            Incident_doc_verify d = new Incident_doc_verify();
            RBIDATATRACK.CompService.CompServiceClient obj = new RBIDATATRACK.CompService.CompServiceClient();


            DataTable ds = new DataTable();


            string DataExistence = "0";

            ds = obj.CompSelect("upd_doc_view", data, "", "", "").Tables[0];


            try
            {
                if (ds.Rows.Count > 0)
                {
                    dataFile = (byte[])ds.Rows[0][0];

                    if (dataFile.Length > 0)
                    {

                        filename = ds.Rows[0][1].ToString();

                        d.DownloadFile(filename, dataFile);





                        DataExistence = "1";
                    }
                    else
                    {
                        DataExistence = "0";

                    }
                }
            }

            catch (Exception e)
            {
                return "0"+ e;
            }

            return DataExistence + "^" + filename;
        }




        public void DownloadFile(string fn, byte[] s)
        {
            string FileName = fn;

            System.Web.HttpResponse Response = System.Web.HttpContext.Current.Response;
            using (Stream file = File.OpenWrite(Server.MapPath("~/Images/" + fn)))
            {
                file.Write(s, 0, s.Length);
            }
        }

        [WebMethod(EnableSession = true)]
        public static string deleteDownloadFile(string input)
        {
            string fname = input;
            Incident_doc_verify d = new Incident_doc_verify();
            d.filedelete(fname);
            return "File Deleted Successfully";
        }

        public void filedelete(string fname)
        {
            File.Delete(Server.MapPath("~/Images/" + fname));
        }
        public static byte[] ConvertToJpg(byte[] bytes)
        {
            using (var ms = new MemoryStream(bytes))
            {
                var image = new Bitmap(ms);
                var ms2 = new MemoryStream();
                image.Save(ms2, ImageFormat.Jpeg);
                return ms2.ToArray();
            }
        }

  
      

        [WebMethod(EnableSession = true)]




        public static string Verify_fraud(string typ, string input)
        {

            string str = "", usrid, branch, amount;
            DataSet ds;
            //string timestamp = DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss tt");
            try
            {

                RBIDATATRACK.CompService.CompServiceClient obj1 = new RBIDATATRACK.CompService.CompServiceClient();
                //sinfini_recovery.mana.SMSTool sms = new sinfini_recovery.mana.SMSTool();

                str = obj1.CompConfirm(typ, input, "", "a", "a");

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

        public static string Reject_fraud(string typ, string input)
        {

            string str = "", usrid, branch, amount;
            DataSet ds;
            //string timestamp = DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss tt");
            try
            {

                RBIDATATRACK.CompService.CompServiceClient obj1 = new RBIDATATRACK.CompService.CompServiceClient();
                //sinfini_recovery.mana.SMSTool sms = new sinfini_recovery.mana.SMSTool();

                str = obj1.CompConfirm(typ, input, "", "a", "a");

            }
            catch (Exception e)
            {
                string ERROR = "Error Occured...!";
                return ERROR;



            }
            return str;

        }

        [WebMethod(EnableSession = true)]
        public static string MailDtlsLoad(string typ, string mdata)
        {
            List<string> cclList = new List<string>();
            List<string> TomailList = new List<string>();
            string res = "done";

            try
            {

                RBIDATATRACK.CompService.CompServiceClient obj = new RBIDATATRACK.CompService.CompServiceClient();
                DataTable ds1 = new DataTable();
                ds1 = obj.CompSelect(typ, mdata, "", "", "").Tables[0];
                if (ds1.Rows.Count > 0)
                {
                    TomailList.Add(ds1.Rows[0][7].ToString());
                    cclList.Add("kiranjithkv@manappuram.com");


                    DataTable dt1, dt2, dt3, dt4;

                string imageUrlLog = GetImageUrl("files/img/manappuram_logo.png");
                string imageContentLog = "<img src='" + imageUrlLog + "' alt='Alternate Text' />";
                string imageUrlPaperless = GetImageUrl("files/img/paperlessBanner.png");
                string imageContentPaperless = "<img src='" + imageUrlPaperless + "' alt='Alternate Text' />";
                string subj = "FMR-1 DOCUMENTS REJECTED PLEASE UPLOAD AGAIN";
                string bdy = "<p style='font-family: Calibri,Arial,Helvetica,sans-serif;font-size:12pt;color:rgb(0,0,0); '>Dear " + ds1.Rows[0][0].ToString() + " ,<br/><br/> FMR-1 Documents are rejected by compliance department <br/>Kindly process the same at the earliest.. <br/> <br/><br/><u><b>Fraud Details </b></u><br/><br/><p><br><table style='font-size: 10pt; border: 1px solid #ccc;width: 75%;margin:auto'><tr><th style='border: 1px solid white;border-collapse: collapse; background-color: #fef9e7'>Branch Name</th><td style='border: 1px solid white;border-collapse: collapse; background-color: #fef9e7'>" + ds1.Rows[0][1].ToString() + "</td></tr><tr><th style='border: 1px solid white;border-collapse: collapse; background-color: #fef9e7'>Date Of Reporting</th><td style='border: 1px solid white;border-collapse: collapse; background-color: #fef9e7'>" + ds1.Rows[0][2].ToString() + "</td></tr><tr><th style='border: 1px solid white;border-collapse: collapse; background-color: #fef9e7'>Amount</th><td style='border: 1px solid white;border-collapse: collapse; background-color: #fef9e7'>" + ds1.Rows[0][3].ToString() + "</td></tr><tr><th style='border: 1px solid white;border-collapse: collapse; background-color: #fef9e7' >Fraud Type</th><td style='border: 1px solid white;border-collapse: collapse; background-color: #fef9e7'>" + ds1.Rows[0][4].ToString() + "</td></tr><tr><th style='border: 1px solid white;border-collapse: collapse; background-color: #fef9e7' >Zone Name</th><td style='border: 1px solid white;border-collapse: collapse; background-color: #fef9e7' >" + ds1.Rows[0][5].ToString() + "</td></tr><tr><th style='border: 1px solid white;border-collapse: collapse; background-color: #fef9e7' >Irregularity</th><td style='border: 1px solid white;border-collapse: collapse; background-color: #fef9e7' >" + ds1.Rows[0][6].ToString() + "</td></table> <br><br><br/><br/><br/> Thanks & Regards,<br/>Compliance Portal<br/><span style = 'font-size:11.0pt; font-family:Calibri,sans-serif; color:gray' lang='EN-IN'>Please do not reply to this email ID as this is an automatically generated email and reply to this ID is not being monitored</span></p>" + imageContentLog + " " + imageContentPaperless + "<p><span style = 'color:rgb(105,105,105); font-size:7pt; font-family:arial,sans-serif; line-height:normal; background-color:rgba(0,0,0,0)' >Please be aware that this email/attachment contains MAFIL confidential/sensitive data. You are requested to follow MAFIL Information Security and data sharing policies in case the data is shared further. Feel free to contact AGM Information Security when youare in doubt.</span></p>";
                SendMail(TomailList, bdy, subj, cclList); 

                    //string reqname = dt1.Rows[0][1].ToString();
                    //string reqdate = dt1.Rows[0][2].ToString();
                }

            }
            catch (Exception ef)
            {
                //return ef.Message;
                string msg = ef.Message;
            }


            return res;
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


    }
}