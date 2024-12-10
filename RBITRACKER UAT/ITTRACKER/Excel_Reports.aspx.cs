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
    public partial class Excel_Reports : System.Web.UI.Page
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

                if ((usr == "18906") || (usr == "365705") || (usr == "359491") || (usr == "359288")  || (Dvl > 0) || (depid == "547"))
                {

                }
                else
                {
                    Response.Redirect("/ErrorPage.aspx");
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

    }
}