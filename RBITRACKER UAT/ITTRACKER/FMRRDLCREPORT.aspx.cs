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
    public partial class FMRRDLCREPORT : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            string dte = DateTime.Now.ToString("M-d-yyyy");
            string typ = Request.QueryString.Get("key");
            string num = Request.QueryString.Get("newkey");
            if (num == "1")
            {
                if (typ != null)
                {
                    DataSet dt1, dt2, dt3, dt4, dt5, dt6, dt7;
                    RBIDATATRACK.CompService.CompServiceClient obj = new RBIDATATRACK.CompService.CompServiceClient();
                    dt1 = obj.CompSelect("FMRRDLC", "FIRST3", typ, "", "");
                    dt2 = obj.CompSelect("FMRRDLC", "table1", typ, "", "");
                    dt3 = obj.CompSelect("FMRRDLC", "table2", typ, "", "");
                    dt4 = obj.CompSelect("FMRRDLC", "table3", typ, "", "");
                    dt5 = obj.CompSelect("FMRRDLC", "table4", typ, "", "");
                    dt6 = obj.CompSelect("FMRRDLC", "table5", typ, "", "");
                    dt7 = obj.CompSelect("FMRRDLC", "table6", typ, "", "");
                    ReportViewer rv = new ReportViewer();
                    rv.LocalReport.DataSources.Clear();
                    ReportDataSource rep = new ReportDataSource("DataSet1", dt1.Tables[0]);
                    ReportDataSource rep1 = new ReportDataSource("DataSet2", dt2.Tables[0]);
                    ReportDataSource rep2 = new ReportDataSource("DataSet3", dt3.Tables[0]);
                    ReportDataSource rep3 = new ReportDataSource("DataSet4", dt4.Tables[0]);
                    ReportDataSource rep4 = new ReportDataSource("DataSet5", dt5.Tables[0]);
                    ReportDataSource rep5 = new ReportDataSource("DataSet6", dt6.Tables[0]);
                    ReportDataSource rep6 = new ReportDataSource("DataSet7", dt7.Tables[0]);
                    rv.LocalReport.DataSources.Add(rep);
                    rv.LocalReport.DataSources.Add(rep1);
                    rv.LocalReport.DataSources.Add(rep2);
                    rv.LocalReport.DataSources.Add(rep3);
                    rv.LocalReport.DataSources.Add(rep4);
                    rv.LocalReport.DataSources.Add(rep5);
                    rv.LocalReport.DataSources.Add(rep6);
                    rv.LocalReport.ReportPath = "FMRReportRDLC.rdlc";
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
                    // Response.ContentType = "application/pdf";
                    Response.ContentType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
                    Response.AppendHeader("Content-Disposition", "attachment; filename=RDLC.docx");
                    Response.OutputStream.Write(bytes, 0, bytes.Length);
                    Response.Flush();
                    Response.End();
                }
            }
            else if (num == "2")
            {
                if (typ != null)
                {
                    DataSet dt1;
                    RBIDATATRACK.CompService.CompServiceClient obj = new RBIDATATRACK.CompService.CompServiceClient();
                    dt1 = obj.CompSelect("FMRRDLC", "DODATAFMR", typ, "", "");
                    ReportViewer rv = new ReportViewer();
                    rv.LocalReport.DataSources.Clear();
                    ReportDataSource rep = new ReportDataSource("DataSet1", dt1.Tables[0]);
                     rv.LocalReport.DataSources.Add(rep);
                     rv.LocalReport.ReportPath = "DOReportRDLC.rdlc";
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
                   // Response.ContentType = "application/pdf";
                    Response.ContentType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
                    Response.AppendHeader("Content-Disposition", "attachment; filename=RDLC.docx");
                    Response.OutputStream.Write(bytes, 0, bytes.Length);
                    Response.Flush();
                    Response.End();
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