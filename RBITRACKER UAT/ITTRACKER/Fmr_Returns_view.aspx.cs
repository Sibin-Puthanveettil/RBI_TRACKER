using System;
using System.Collections.Generic;
using System.Data;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace RBIDATATRACK
{
    public partial class Fmr_Returns_view : System.Web.UI.Page
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

                if ((usr == "375485") ||(depid == "547"))
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
        public static List<getDropDownData> getfinyear(string pageVal, string pageval1)
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
        public static List<getDropDownData> getmonth(string pageVal, string pageval1)
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
        public static string getFillTable(string pageVal, string pageval1)
        {
            string header = "";
            string usr = "";
            try
            {
                DataSet ds, ds1 = new DataSet();
                //DataTable ds, ds1 = new DataTable();


                RBIDATATRACK.CompService.CompServiceClient obj = new RBIDATATRACK.CompService.CompServiceClient();



                ds = obj.CompSelect("get_fmr_dtls", pageval1, "", "", "");


                header = Fmr_Returns_view.DataTableToHTMLTable(ds.Tables[0]);



                DataTableToHTMLTable(ds.Tables[0]);
            }

            catch (Exception e)
            {
                header = e.ToString();
            }

            return header.ToString();
        }

        [WebMethod(EnableSession = true)]

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

            Fmr_Returns_view d = new Fmr_Returns_view();
            RBIDATATRACK.CompService.CompServiceClient obj = new RBIDATATRACK.CompService.CompServiceClient();


            DataTable ds = new DataTable();


            string DataExistence = "0";

            ds = obj.CompSelect(QueryString, data, "", "", "").Tables[0];


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
                return "0" + e;
            }

            return DataExistence + "^" + filename;
        }

        //public void zip_dics(string fn, byte[] s)
        //{

        //    string compressedFileName = fn;

        //    Response.AddHeader("Content-Disposition", "attachment; filename=" + compressedFileName + ".zip");
        //    Response.ContentType = "application/zip";

        //    using (var zipStream = new ZipOutputStream(Response.OutputStream))
        //    {
        //        foreach (string filePath in filePaths)
        //        {
        //            byte[] fileBytes = System.IO.File.ReadAllBytes(filePath);

        //            var fileEntry = new ZipEntry(Path.GetFileName(filePath))
        //            {
        //                Size = fileBytes.Length
        //            };

        //            zipStream.PutNextEntry(fileEntry);
        //            zipStream.Write(fileBytes, 0, fileBytes.Length);
        //        }

        //        zipStream.Flush();
        //        zipStream.Close();
        //    }
        //}


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
            Fmr_Returns_view d = new Fmr_Returns_view();
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








    }

}