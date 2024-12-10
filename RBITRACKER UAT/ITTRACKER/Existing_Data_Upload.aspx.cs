using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Data.OleDb;
using System.Configuration;
using System.Web.Services;
using Helper.Oracle;
using System.Web.Configuration;
using System.Collections;
using System.Web.Security;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;
using System.Net;
using System.Net.Mail;
using System.Text.RegularExpressions;
namespace RBIDATATRACK
{
    public partial class Existing_Data_Upload : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            string UserName = Session["username"].ToString();
            string BranchId = Session["branch_id"].ToString();
            this.hdvUserID.Value = UserName;
            this.hdvBranchID.Value = BranchId;
        }

        [WebMethod(EnableSession = true)]
        public static string Confirm(string typ, string val, string val1, string val2)
        {

            string result = "";
            try
            {
                //CommonService.CommonServiceClient obj = new CommonService.CommonServiceClient();
                RBIDATATRACK.CompService.CompServiceClient obj1 = new RBIDATATRACK.CompService.CompServiceClient();
                DataTable dt14 = new DataTable();
                dt14 = obj1.CompSelect("Advanved_data", "", val, "", "").Tables[0];

                result = Convert.ToString(dt14.Rows[0][0]);

            }
            catch (Exception e)
            {

            }
            return result;
        }

    }
}