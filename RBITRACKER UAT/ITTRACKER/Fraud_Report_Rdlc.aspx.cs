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
    public partial class Fraud_Report_Rdlc : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            string dte = DateTime.Now.ToString("M-d-yyyy");
            string typ = Request.QueryString.Get("key");
            // hrm 
            if (typ == "1")
            {
                DataSet dt1;
                RBIDATATRACK.CompService.CompServiceClient obj = new RBIDATATRACK.CompService.CompServiceClient();
                dt1 = obj.CompSelect("fraud_outstanding", "", "", "","");
                ReportViewer rv = new ReportViewer();
                rv.LocalReport.DataSources.Clear();
                ReportDataSource rep = new ReportDataSource("DataSet1", dt1.Tables[0]);
                rv.LocalReport.DataSources.Add(rep);
                rv.LocalReport.ReportPath = "Frauds_Outstanding.rdlc";
                rv.LocalReport.EnableExternalImages = true;
                rv.LocalReport.Refresh();
                Warning[] warnings;
                string[] streamIds;
                string mimeType = string.Empty;
                string encoding = string.Empty;
                string extension = string.Empty;
                byte[] bytes = rv.LocalReport.Render("WORDOPENXML", null, out mimeType, out encoding, out extension, out streamIds, out warnings);
                Response.Buffer = true;
                Response.Clear();
                Response.ContentType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
                Response.AppendHeader("Content-Disposition", "attachment; filename=RDLC.docx");
                Response.OutputStream.Write(bytes, 0, bytes.Length);
                Response.Flush();
                Response.End();
            }
            else if (typ == "2")
            {
                DataSet dt1;
                RBIDATATRACK.CompService.CompServiceClient obj = new RBIDATATRACK.CompService.CompServiceClient();
                dt1 = obj.CompSelect("Category_wise", "", "", "", "");
               
                ReportViewer rv = new ReportViewer();
                rv.LocalReport.DataSources.Clear();
                ReportDataSource rep = new ReportDataSource("DataSet1", dt1.Tables[0]);
               
                rv.LocalReport.DataSources.Add(rep);
               
                rv.LocalReport.ReportPath = "Fraud_Categorywise.rdlc";
                rv.LocalReport.EnableExternalImages = true;
                rv.LocalReport.Refresh();
                Warning[] warnings;
                string[] streamIds;
                string mimeType = string.Empty;
                string encoding = string.Empty;
                string extension = string.Empty;
                byte[] bytes = rv.LocalReport.Render("WORDOPENXML", null, out mimeType, out encoding, out extension, out streamIds, out warnings);
                Response.Buffer = true;
                Response.Clear();
                Response.ContentType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
                Response.AppendHeader("Content-Disposition", "attachment; filename=RDLC.docx");
                Response.OutputStream.Write(bytes, 0, bytes.Length);
                Response.Flush();
                Response.End();

            }
            else if (typ == "3")
            {
                DataSet dt1;
                RBIDATATRACK.CompService.CompServiceClient obj = new RBIDATATRACK.CompService.CompServiceClient();
                dt1 = obj.CompSelect("Perpetrator_wise", "", "", "", "");
                ReportViewer rv = new ReportViewer();
                rv.LocalReport.DataSources.Clear();
                ReportDataSource rep = new ReportDataSource("DataSet1", dt1.Tables[0]);
                rv.LocalReport.DataSources.Add(rep);
                rv.LocalReport.ReportPath = "Fraud_Perpetratorwise.rdlc";
                rv.LocalReport.EnableExternalImages = true;
                rv.LocalReport.Refresh();
                Warning[] warnings;
                string[] streamIds;
                string mimeType = string.Empty;
                string encoding = string.Empty;
                string extension = string.Empty;
                byte[] bytes = rv.LocalReport.Render("WORDOPENXML", null, out mimeType, out encoding, out extension, out streamIds, out warnings);
                Response.Buffer = true;
                Response.Clear();
                Response.ContentType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
                Response.AppendHeader("Content-Disposition", "attachment; filename=RDLC.docx");
                Response.OutputStream.Write(bytes, 0, bytes.Length);
                Response.Flush();
                Response.End();
            }
        }

    }
}