using Microsoft.Reporting.WebForms;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Windows;
using System.Web.Services;
using System.IO;
using System.Drawing;
using System.Drawing.Imaging;
using System.Drawing.Drawing2D;

namespace RBIDATATRACK
{
    public partial class Fraud_Reports : System.Web.UI.Page
    {
        string branch_Id;
        protected void Page_Load(object sender, EventArgs e)
        {
            string usr;
            if (string.IsNullOrEmpty(Session["username"] as string))
            {
                Response.Redirect("~/Login.aspx");
            }
            else
            {
                branch_Id = Session["branch_id"].ToString();

                if (branch_Id == "0")
                {
                    usr = Session["username"].ToString();
                    this.hdUserId.Value = usr;
                }
                else
                {
                    //  Response.Redirect("../Err_Page.aspx");
                }
            }
        }
        public class drpDtls
        {
            public string did { get; set; }
            public string dname { get; set; }
        }

        [WebMethod(EnableSession = true)]
        public static List<drpDtls> GetDepartmentList(string type, string usrId)
        {
            //WebReference.Service dbs = new WebReference.Service();

            RBIDATATRACK.CompService.CompServiceClient obj = new RBIDATATRACK.CompService.CompServiceClient();
          
            List<drpDtls> brdtls = new List<drpDtls>();
            DataSet ds = new DataSet();

            ds = obj.CompSelect("Fraud_RDLC_Report", "11", "", "","");
            if (ds.Tables[0].Rows.Count > 0)
            {
                foreach (DataRow dr in ds.Tables[0].Rows)
                {
                    brdtls.Add(new drpDtls()
                    {
                        did = dr[0].ToString(),
                        dname = dr[1].ToString()
                    });
                }
            }
            return brdtls;
        }
    }
}