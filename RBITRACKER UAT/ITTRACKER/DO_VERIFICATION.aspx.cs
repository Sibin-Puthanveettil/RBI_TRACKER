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
    public partial class DO_VERIFICATION : System.Web.UI.Page
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
                if (dt1.Rows[0][0].ToString() == "547" || usr == "365705" || usr == "18906" || usr == "359491" || usr == "359288")
                {

                }
                else
                {
                    //Response.Redirect("../NotAutorized.aspx");
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
        public static string GetDoData(string pageVal, string pageval1,string pageval2)
        {
            DataSet ds;
            string Result = "";

            RBIDATATRACK.CompService.CompServiceClient obj = new RBIDATATRACK.CompService.CompServiceClient();
            ds = obj.CompSelect(pageVal, pageval1, pageval2, "", "");
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
        public static string RequestVerify(string typ, string val)
        {

            string str = "";
            //string timestamp = DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss tt");
            try
            {

                RBIDATATRACK.CompService.CompServiceClient obj1 = new RBIDATATRACK.CompService.CompServiceClient();
                //sinfini_recovery.mana.SMSTool sms = new sinfini_recovery.mana.SMSTool();

                str = obj1.CompConfirm("Verifyincident", val, "a", "a", "a");
            }
            catch (Exception e)
            {
                string ERROR = "Error Occured...!";
                return ERROR;



            }
            return str;

        }


        [WebMethod(EnableSession = true)]
        public static string VerifyReturnData(string pageVal, string pageval1)  //REJECY AND UPDATE and verify and update
        {
            string str = "";
            RBIDATATRACK.CompService.CompServiceClient obj = new RBIDATATRACK.CompService.CompServiceClient();
            try
            {
                str = obj.CompConfirm(pageVal, pageval1, "", "", "");
            }
            catch (Exception e)
            {

            }
            return str;
        }

      

    }
}