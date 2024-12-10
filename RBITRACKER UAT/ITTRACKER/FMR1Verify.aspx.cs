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
using System.Text.RegularExpressions;
namespace RBIDATATRACK
{
    public partial class FMR1Verify : System.Web.UI.Page
    {
        public void Page_Init(object o, EventArgs e)
        {

            Response.Cache.SetCacheability(HttpCacheability.NoCache);

            Response.Cache.SetExpires(DateTime.UtcNow.AddHours(-1));

            Response.Cache.SetNoStore();
        }
        protected void Page_Load(object sender, EventArgs e)
        {
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
                //this.hdfraudno.Value = "1005";
                DataTable dt1, dt2 = new DataTable();
                RBIDATATRACK.CompService.CompServiceClient obj = new RBIDATATRACK.CompService.CompServiceClient();
                dt1 = obj.CompSelect("RBI", "EMPLOYEEDT", usr, "", "").Tables[0];
                dt2 = obj.CompSelect("RBI", "CHECKACC", usr, "", "").Tables[0];
                this.hdDept.Value = dt1.Rows[0][0].ToString();
                if ((usr == "18906") || (usr == "365705") ||dt1.Rows[0][0].ToString() == "547" || usr == "359491" || usr == "18906")
                {
                   
                }
                else {
                    Response.Redirect("NotAutorized.aspx");
                }
                if (dt1.Rows[0][2].ToString() == "0" || dt1.Rows[0][0].ToString() == "541" || dt1.Rows[0][0].ToString() == "598" || dt1.Rows[0][0].ToString() == "23" || dt1.Rows[0][0].ToString() == "547")
                {  //Department Head sign in//
                    this.hdaccess.Value = "1";
                }
                else if (dt2.Rows[0][0].ToString() == "0")
                {
                    // Enter staff login//
                    this.hdaccess.Value = "0";
                }
                else
                {
                    Response.Redirect("../NotAutorized.aspx");
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

            ds = obj.CompSelect("RBI", pageVal, pageval1, "", "");
            //PWA_Service.PWA_ServiceClient obj1 = new PWA_Service.PWA_ServiceClient();
            //ds = obj1.PwaSelectData("PWAAPP", pageVal, pageval1, "", "");
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
        public static List<getDropDownData> ddrFraudType(string typ, string val1)
        {
            DataSet ds;
            List<getDropDownData> getData = new List<getDropDownData>();
            RBIDATATRACK.CompService.CompServiceClient obj = new RBIDATATRACK.CompService.CompServiceClient();


            ds = obj.CompSelect("RBI", typ, val1, "", "");



            //  ds = obj.CompSelect("RBI", typ, val1, "", "");
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
        public static List<getDropDownData> ddrBranch(string typ, string val1)
        {
            DataSet ds;
            List<getDropDownData> getData = new List<getDropDownData>();
            RBIDATATRACK.CompService.CompServiceClient obj = new RBIDATATRACK.CompService.CompServiceClient();
            ds = obj.CompSelect("RBI", typ, val1, "", "");
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
        public static List<getDropDownData> ddrBrTyp(string typ, string val1)
        {
            DataSet ds;
            List<getDropDownData> getData = new List<getDropDownData>();
            RBIDATATRACK.CompService.CompServiceClient obj = new RBIDATATRACK.CompService.CompServiceClient();
            ds = obj.CompSelect("RBI", typ, val1, "", "");
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
        public static List<getDropDownData> ddrInsuranceClaim(string typ, string val1)
        {
            DataSet ds;
            List<getDropDownData> getData = new List<getDropDownData>();
            RBIDATATRACK.CompService.CompServiceClient obj = new RBIDATATRACK.CompService.CompServiceClient();
            ds = obj.CompSelect("RBI", typ, val1, "", "");
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
        public static string GetBranch(string typ, string val1)
        {
            DataSet ds;
            DataTable dt = new DataTable();
            string Rslt = "", BranchId;

            string UserName = HttpContext.Current.Session["username"].ToString();
            BranchId = HttpContext.Current.Session["branch_id"].ToString();

            //string indata = BranchId + '~' + UserName + '~' + val;

            List<getDropDownData> getData = new List<getDropDownData>();
            RBIDATATRACK.CompService.CompServiceClient obj = new RBIDATATRACK.CompService.CompServiceClient();
            dt = obj.CompSelect("RBI", typ, val1, "", "").Tables[0];

            try
            {
                Rslt = dt.Rows[0][0].ToString();

                return Rslt;
            }
            catch (Exception e)
            {
                Rslt = "Error";
            }
            return Rslt;
        }


        [WebMethod(EnableSession = true)]
        public static List<getDropDownData> PrinParty(string typ, string val1)
        {
            DataSet ds;
            List<getDropDownData> getData = new List<getDropDownData>();
            RBIDATATRACK.CompService.CompServiceClient obj = new RBIDATATRACK.CompService.CompServiceClient();
            ds = obj.CompSelect("RBI", typ, val1, "", "");
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
        public static List<getDropDownData> AreaOpr(string typ, string val1)
        {
            DataSet ds;
            List<getDropDownData> getData = new List<getDropDownData>();
            RBIDATATRACK.CompService.CompServiceClient obj = new RBIDATATRACK.CompService.CompServiceClient();
            ds = obj.CompSelect("RBI", typ, val1, "", "");
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
        public static List<getDropDownData> FrStatus(string typ, string val1)
        {
            DataSet ds;
            List<getDropDownData> getData = new List<getDropDownData>();
            RBIDATATRACK.CompService.CompServiceClient obj = new RBIDATATRACK.CompService.CompServiceClient();
            ds = obj.CompSelect("RBI", typ, val1, "", "");
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
        public static List<getDropDownData> FrNature(string typ, string val1)
        {
            DataSet ds;
            List<getDropDownData> getData = new List<getDropDownData>();
            RBIDATATRACK.CompService.CompServiceClient obj = new RBIDATATRACK.CompService.CompServiceClient();
            ds = obj.CompSelect("RBI", typ, val1, "", "");
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
        public static string GetTableIrr(string typ, string val1)
        {
            DataSet dt;
            int i = 0;
            string data = "";
            //val = HttpContext.Current.Session["branch_id"].ToString();
            //typ = HttpContext.Current.Session["username"].ToString();
            RBIDATATRACK.CompService.CompServiceClient obj = new RBIDATATRACK.CompService.CompServiceClient();
            dt = obj.CompSelect("RBI", typ, val1, "", "");

            try
            {
                if (dt.Tables[0].Rows.Count > 0)
                {
                    foreach (DataRow dr in dt.Tables[0].Rows)
                    {
                        //30-10-2020 00:00:00
                        //var srt1  = dt.Tables[0].Rows[i][4].ToString().Remove(11,8);
                        ////var srt2 = srt1 + ":" + "AM";
                        //var str2 = srt1.Substring(0, 10);
                        string str2 = Convert.ToDateTime(dt.Tables[0].Rows[i][4]).ToString("dd-MM-yyyy");
                        data = data + dt.Tables[0].Rows[i][0].ToString() + "!" + dt.Tables[0].Rows[i][1].ToString() + "!" + dt.Tables[0].Rows[i][2].ToString() + "!" + dt.Tables[0].Rows[i][3].ToString() + "!" + str2 + "!" + dt.Tables[0].Rows[i][5].ToString() + "!" + dt.Tables[0].Rows[i][6].ToString() + "!" + dt.Tables[0].Rows[i][7].ToString() + "!" + dt.Tables[0].Rows[i][8].ToString() + "!" + dt.Tables[0].Rows[i][9].ToString() + "!" + dt.Tables[0].Rows[i][10].ToString() + "!" + dt.Tables[0].Rows[i][11].ToString() + "!" + dt.Tables[0].Rows[i][12].ToString() + "@";
                        i++;
                    }
                    return data;
                }
                else
                {
                    return data;
                }

            }
            catch (Exception e)
            {
                return data;
            }

        }

        [WebMethod(EnableSession = true)]
        public static string GetBorrowCust(string typ, string val1)
        {
            DataSet dt;
            int i = 0;
            string data = "";
            //val = HttpContext.Current.Session["branch_id"].ToString();
            //typ = HttpContext.Current.Session["username"].ToString();
            RBIDATATRACK.CompService.CompServiceClient obj = new RBIDATATRACK.CompService.CompServiceClient();
            dt = obj.CompSelect("RBI", typ, val1, "", "");

            try
            {
                if (dt.Tables[0].Rows.Count > 0)
                {
                    foreach (DataRow dr in dt.Tables[0].Rows)
                    {
                        data = data + dt.Tables[0].Rows[i][0].ToString() + "!" + dt.Tables[0].Rows[i][1].ToString() + "!" + dt.Tables[0].Rows[i][2].ToString() + "@";
                        i++;
                    }
                    return data;
                }
                else
                {
                    return data;
                }

            }
            catch (Exception e)
            {
                return data;
            }

        }

        [WebMethod(EnableSession = true)]
        public static string LoadFraudDetails(string typ, string val1)
        {
            // Getting income tax upload 
            string result = "";
            DataSet ds, ds1;
            var data1 = "";
            try
            {

                RBIDATATRACK.CompService.CompServiceClient obj = new RBIDATATRACK.CompService.CompServiceClient();

                ds1 = obj.CompSelect("RBI", typ, val1, "", "");
                data1 = ds1.Tables[0].Rows[0][0].ToString();
            }
            catch (Exception e)
            {
                result = e.Message.ToString();
            }
            return data1;
        }

        [WebMethod(EnableSession = true)]
        public static string LoadFraudNumber(string typ, string val1)
        {
            string result = "";
            DataSet ds, ds1;
            var data1 = "";
            var data2 = "";
            var data3 = "";
            var data4 = "";
            try
            {

                RBIDATATRACK.CompService.CompServiceClient obj = new RBIDATATRACK.CompService.CompServiceClient();

                ds1 = obj.CompSelect("RBI", typ, val1, "", "");
                data1 = ds1.Tables[0].Rows[0][0].ToString();
                data2 = Regex.Replace(data1, @"\d", "");
                data3 = Regex.Replace(data1, @"[a-zA-Z:,]", "");
                data4 = data2 + "~" + data3;
            }
            catch (Exception e)
            {
                result = e.Message.ToString();
            }
            return data4;
        }
        [WebMethod(EnableSession = true)]
        public static string GetBorrowPleg(string typ, string val1)
        {
            DataSet dt;
            int i = 0;
            string data = "";
            //val = HttpContext.Current.Session["branch_id"].ToString();
            //typ = HttpContext.Current.Session["username"].ToString();
            RBIDATATRACK.CompService.CompServiceClient obj = new RBIDATATRACK.CompService.CompServiceClient();
            dt = obj.CompSelect("RBI", typ, val1, "", "");

            try
            {
                if (dt.Tables[0].Rows.Count > 0)
                {
                    foreach (DataRow dr in dt.Tables[0].Rows)
                    {
                        //var srt1 = dt.Tables[0].Rows[i][4].ToString().Remove(11, 8);
                        string srt1 = Convert.ToDateTime(dt.Tables[0].Rows[i][3]).ToString("dd-MM-yyyy");
                        data = data + dt.Tables[0].Rows[i][0].ToString() + "!" + dt.Tables[0].Rows[i][1].ToString() + "!" + dt.Tables[0].Rows[i][2].ToString() + "!" + srt1 + "!" + dt.Tables[0].Rows[i][4].ToString() + "!" + dt.Tables[0].Rows[i][5].ToString() + "@";
                        i++;
                    }
                    return data;
                }
                else
                {
                    return data;
                }

            }
            catch (Exception e)
            {
                return data;
            }

        }

        [WebMethod(EnableSession = true)]
        public static string SaveCusPleg(string typ, string val1)
        {
            DataSet ds;
            DataTable dt = new DataTable();
            string Rslt = "", BranchId;

            string UserName = HttpContext.Current.Session["username"].ToString();
            BranchId = HttpContext.Current.Session["branch_id"].ToString();

            //string indata = BranchId + '~' + UserName + '~' + val;

            List<getDropDownData> getData = new List<getDropDownData>();
            RBIDATATRACK.CompService.CompServiceClient obj = new RBIDATATRACK.CompService.CompServiceClient();
            //  dt = obj.CompSelect("RBI", typ, val1, "UserName", "").Tables[0];
            Rslt = obj.CompConfirm(typ, val1, "", "", "");

            try
            {

                return Rslt;
            }
            catch (Exception e)
            {
                Rslt = "Error";
            }
            return Rslt;
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
        public static string SaveFMR1(string typ, string compdata, string val1, string subdata, string mdata)
        {
            DataSet ds,ds1;
            DataTable dt = new DataTable();
            string Rslt = "", BranchId;

            string UserName = HttpContext.Current.Session["username"].ToString();
            BranchId = HttpContext.Current.Session["branch_id"].ToString();
            List<string> TomailList = new List<string>();
            List<string> ccList = new List<string>();
            string to_mail = "";
            string cc = "";
            string access1 = "SaveFMR1Comp";
            string access2 = "RejectFMR1";
            string UsrName = HttpContext.Current.Session["username"].ToString();
            BranchId = HttpContext.Current.Session["branch_id"].ToString();
            string dept = HttpContext.Current.Session["department_id"].ToString();
            int dep = Int32.Parse(dept);
            //string indata = BranchId + '~' + UserName + '~' + val;

            List<getDropDownData> getData = new List<getDropDownData>();
            RBIDATATRACK.CompService.CompServiceClient obj = new RBIDATATRACK.CompService.CompServiceClient();
            //  dt = obj.CompSelect("RBI", typ, val1, "UserName", "").Tables[0];
            Rslt = obj.CompConfirm(typ, val1, subdata, compdata, "");
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
                if (Rslt != null)
                {
                    if (typ == access1)
                    {
                        try
                        {
                            DataTable dt1, dt2, dt3, dt4;
                            //dt1 = obj1.CompSelect("GetEmailNoteRequest", usrid, "", "", "").Tables[0];
                            string usrmail = usid+ "@manappuram.com";
                            cc = usrmail + ";" + cc;
                            ccList.Add(usrmail);

                            string subj = "RBI FRAUD REPORTING ALERT";
                            string imageUrlLog = GetImageUrl("files/img/manappuram_logo.png");
                            string imageContentLog = "<img src='" + imageUrlLog + "' alt='Alternate Text' />";
                            string imageUrlPaperless = GetImageUrl("files/img/paperlessBanner.png");
                            string imageContentPaperless = "<img src='" + imageUrlPaperless + "' alt='Alternate Text' />";
                            string bdy = "<p style='font-family: Calibri,Arial,Helvetica,sans-serif;font-size:12pt;color:rgb(0,0,0);'>Dear Sir/Madam, ,<br/><br/> A  fraud has been confirmed by  Compliance Department and placed for your review on    :  </b>" + revdt + ", <br/>Kindly process the same at the earliest.. <br/> <br/><br/><u><b>Fraud Details </b></u><br/><br/> <br>Branch Name &ensp; Amount  &ensp; Date of Detection </br>" + branch + "  &ensp; " + amount + " &ensp; " + dtdate + " <br/><br/><br/><br/>  Thanks & Regards,<br/>Compliance Portal<br/><span style = 'font-size:11.0pt; font-family:&quot;Calibri&quot;,sans-serif; color:gray' lang='EN-IN'>Please do not reply to this email ID as this is an automatically generated email and reply to this ID is not being monitored</span></p>" + imageContentLog + "   " + imageContentPaperless + "<p><span style = 'color:rgb(105,105,105); font-size:7pt; font-family:arial,sans-serif; line-height:normal; background-color:rgba(0,0,0,0)' >Please be aware that this email/attachment contains MAFIL confidential/sensitive data. You are requested to follow MAFIL Information Security and data sharing policies in case the data is shared further. Feel free to contact AGM Information Security when youare in doubt.</span></p>";
                            string audtmail1 = "gmaudit@manappuram.com";
                            to_mail = audtmail1 + ";" + to_mail;
                            TomailList.Add(audtmail1);
                            string audtmail2 = "agmia@manappuram.com";
                            to_mail = audtmail2 + ";" + to_mail;
                            TomailList.Add(audtmail2);
                            string riimmail = "agmriim@manappuram.com";
                            to_mail = riimmail + ";" + to_mail;
                            TomailList.Add(riimmail);
                            string compmail = "compliance @manappuram.com";
                            to_mail = compmail + ";" + to_mail;
                            TomailList.Add(compmail);
                           SendMail(TomailList, ccList, bdy, subj);
                        }
                        catch (Exception ef)
                        {
                            //return ef.Message;
                            string msg = ef.Message;
                        }


                    }
                    if (typ == access2)
                    {
                        try
                        {
                            DataTable dt1, dt2, dt3, dt4;
                            //dt1 = obj1.CompSelect("GetEmailNoteRequest", usrid, "", "", "").Tables[0];
                            string usrmail = "usid+ @manappuram.com";
                            cc = usrmail + ";" + cc;
                            ccList.Add(usrmail);

                            string subj = "RBI FRAUD REPORTING ALERT";
                            string imageUrlLog = GetImageUrl("files/img/manappuram_logo.png");
                            string imageContentLog = "<img src='" + imageUrlLog + "' alt='Alternate Text' />";
                            string imageUrlPaperless = GetImageUrl("files/img/paperlessBanner.png");
                            string imageContentPaperless = "<img src='" + imageUrlPaperless + "' alt='Alternate Text' />";
                            string bdy = "<p style='font-family: Calibri,Arial,Helvetica,sans-serif;font-size:12pt;color:rgb(0,0,0);'>Dear Sir/Madam, ,<br/><br/> A  fraud has been modified by Compliance Department  and placed for your review on    :  </b>" + revdt + ", <br/>Kindly process the same at the earliest.. <br/> <br/><br/><u><b>Fraud Details </b></u><br/><br/> <br>Branch Name &ensp; Amount  &ensp; Date of Detection </br>" + branch + "  &ensp; " + amount + " &ensp; " + dtdate + " <br/><br/><br/><br/>  Thanks & Regards,<br/>Compliance Portal<br/><span style = 'font-size:11.0pt; font-family:&quot;Calibri&quot;,sans-serif; color:gray' lang='EN-IN'>Please do not reply to this email ID as this is an automatically generated email and reply to this ID is not being monitored</span></p>" + imageContentLog + "   " + imageContentPaperless + "<p><span style = 'color:rgb(105,105,105); font-size:7pt; font-family:arial,sans-serif; line-height:normal; background-color:rgba(0,0,0,0)' >Please be aware that this email/attachment contains MAFIL confidential/sensitive data. You are requested to follow MAFIL Information Security and data sharing policies in case the data is shared further. Feel free to contact AGM Information Security when youare in doubt.</span></p>";
                            string audtmail1 = "gmaudit@manappuram.com";
                            to_mail = audtmail1 + ";" + to_mail;
                            TomailList.Add(audtmail1);
                            string audtmail2 = "agmia@manappuram.com";
                            to_mail = audtmail2 + ";" + to_mail;
                            TomailList.Add(audtmail2);
                            string riimmail = "agmriim@manappuram.com";
                            to_mail = riimmail + ";" + to_mail;
                            TomailList.Add(riimmail);
                            string compmail = "compliance @manappuram.com";
                            to_mail = compmail + ";" + to_mail;
                            TomailList.Add(compmail);
                            SendMail(TomailList, ccList, bdy, subj);

                        }
                        catch (Exception ef)
                        {
                            //return ef.Message;
                            string msg = ef.Message;
                        }

                    
                    }

                }
                return Rslt;
            }
            catch (Exception e)
            {
                Rslt = "Error";
            }
            return Rslt;
        }
        [WebMethod(EnableSession = true)]
        public static string SendMail(List<string> toMail, List<string> cc, string body, string subject)
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
                if (cc.Count > 0)
                    foreach (string c in cc) mail.CC.Add(new MailAddress(c));
                //if (cc != "" || cc != null) mail.CC.Add(new MailAddress(cc));
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
        public static string confirm_Request(string flag, string data, string contnt)
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


        [WebMethod(EnableSession = true)]
        public static string LoadFraudDTL(string typ, string val1)
        {
            DataSet dt;
            int i = 0;
            string data = "";
            //val = HttpContext.Current.Session["branch_id"].ToString();
            //typ = HttpContext.Current.Session["username"].ToString();
            RBIDATATRACK.CompService.CompServiceClient obj = new RBIDATATRACK.CompService.CompServiceClient();
            dt = obj.CompSelect("RBI", typ, val1, "", "");

            try
            {
                if (dt.Tables[0].Rows.Count > 0)
                {
                    foreach (DataRow dr in dt.Tables[0].Rows)
                    {
                        data = data + dt.Tables[0].Rows[i][0].ToString() + "^" + dt.Tables[0].Rows[i][1].ToString() + "^" + dt.Tables[0].Rows[i][2].ToString() + "^" + dt.Tables[0].Rows[i][3].ToString() + "^" + dt.Tables[0].Rows[i][4].ToString() + "^" + dt.Tables[0].Rows[i][5].ToString() +
                             "^" + dt.Tables[0].Rows[i][6].ToString() + "^" + dt.Tables[0].Rows[i][7].ToString() + "^" + dt.Tables[0].Rows[i][8].ToString() + "^" + dt.Tables[0].Rows[i][9].ToString() + "¶";
                        i++;
                    }
                    return data;
                }
                else
                {
                    return data;
                }

            }
            catch (Exception e)
            {
                return data;
            }
        }
    }
}