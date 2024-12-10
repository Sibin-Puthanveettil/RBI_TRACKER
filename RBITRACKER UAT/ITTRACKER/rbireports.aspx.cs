using System;
using System.Collections.Generic;
using System.Data;
using System.Drawing.Imaging;
using System.IO;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;        
using System.Web.Services;
using System.Net.Mail;
using System.Linq;

namespace RBIDATATRACK
{
    public partial class rbireports : System.Web.UI.Page
    {
        static string empname;
        string mnuName, val, indata, frdt, todt, unid, type = "", menuId;
       
    
        DataSet ds, ds1 = new DataSet();
        DataTable dt1 = new DataTable();
        RBIDATATRACK.CompService.CompServiceClient obj = new RBIDATATRACK.CompService.CompServiceClient();
        protected void Page_Load(object sender, EventArgs e)
        {
            menuId = Request.QueryString.Get("mnuId");  
            val = Request.QueryString.Get("val");
           
             unid = Request.QueryString.Get("unid");
          
            empname = HttpContext.Current.Session["username"].ToString();
            string indata = menuId + "~" + "" + "~" + "" + "~" + val + "~" + "" + "~" + "";

            try
            {
                ds = obj.CompSelect("GETREPORTS", "", indata, "", "");
                 ds1 = obj.CompSelect("GETREPDATA", "", menuId + "~" + "105", "","");
                DataTableToHTMLTable(ds.Tables[0]);
                lblTitle.Text = ds1.Tables[0].Rows[0][2].ToString();
            }
            catch (Exception)
            {
                ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "alertMessage", "alert('No Data')", true);
            }

        }
        public string DataTableToHTMLTable(DataTable inTable)
        {
            System.Text.StringBuilder dString = new System.Text.StringBuilder();
            dString.Append("<table id='example' class='display' cellpadding='0' cellspacing='0' border='0'>");
            dString.Append(GetHeader(inTable));
            dString.Append(GetBody(inTable));
            dString.Append("</table>");
            MyTable.InnerHtml = dString.ToString();
            return "";
        }


        private string GetHeader(DataTable dTable)
        {
            System.Text.StringBuilder dString = new System.Text.StringBuilder();
            dString.Append("<thead><tr>");
            foreach (DataColumn dColumn in dTable.Columns)
            {
                dString.AppendFormat("<th>{0}</th>", dColumn.ColumnName);
            }
            dString.Append("</tr></thead>");
            return dString.ToString();
        }
        private string GetBody(DataTable dTable)
        {

            int rowcnt = 0;
            System.Text.StringBuilder dString = new System.Text.StringBuilder();
            dString.Append("<tbody>");
            foreach (DataRow dRow in dTable.Rows)
            {

                dString.Append("<tr class='odd_gradeX'>");
                for (int dCount = 0; dCount < dTable.Columns.Count; dCount++)
                {
                    if (ds1.Tables[0].Rows[0][0].ToString() == "6")
                    {
                        dString.AppendFormat("<td style=text-align:left><a href = javascript:GetASORPT('" + frdt + "','" + todt + "','" + (Convert.ToInt32(ds1.Tables[0].Rows[0][1]) + (dCount - 1)).ToString() + "','" + dRow[0] + "','" + dRow[0] + "')> {0} </a></td>", dRow[dCount]);
                    }
                    else if (ds1.Tables[0].Rows[0][0].ToString() == "2")
                    {
                        if (dCount == 0)
                        {
                            dString.AppendFormat("<td style=text-align:left><a href = javascript:GetASORPT('','','" + ds1.Tables[0].Rows[0][1].ToString() + "','" + dRow[0] + "','')> {0} </a></td>", dRow[dCount]);
                        }
                        else
                        { dString.AppendFormat("<td style=text-align:left>{0}</td>", dRow[dCount]); }

                    }
                    else
                    {
                        dString.AppendFormat("<td style=text-align:left>{0}</td>", dRow[dCount]);
                    }
                }
                dString.Append("</tr>");

                rowcnt = rowcnt + 5;
            }
            dString.Append("</tbody>");
            return dString.ToString();
        }

        private string GetFooter(DataTable dTable)
        {
            System.Text.StringBuilder dString = new System.Text.StringBuilder();
            dString.Append("<tfoot><tr>");
            foreach (DataColumn dColumn in dTable.Columns)
            {
                dString.AppendFormat("<th>{0}</th>", dColumn.ColumnName);
            }
            dString.Append("</tr></tfoot>");
            return dString.ToString();
        }

        protected void btn_Excel_Click(object sender, EventArgs e)
        {


            System.IO.StringWriter stringWrite = new System.IO.StringWriter();
            HtmlTextWriter htmlWrite = new HtmlTextWriter(stringWrite);
            Response.Clear();
            Response.Charset = "";
            Response.ContentEncoding = System.Text.Encoding.UTF8;
            Response.Cache.SetCacheability(HttpCacheability.NoCache);
            Response.ContentType = "application/vnd.ms-excel";
            Response.AddHeader("content-disposition", "attachment;filename=RBI_Automation_Report.xls");
            Panel1.RenderControl(htmlWrite);
            Response.Write(stringWrite.ToString());
            Response.End();

            string input = empname + "~" + "365705" + "~" + "Automation of RBI";
            //ds = obj.CommonSelect("DOORSTEP", "insert_log", "", input);
        }
    }
}