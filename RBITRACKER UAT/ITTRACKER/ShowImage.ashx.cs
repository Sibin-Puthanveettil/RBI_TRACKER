using System;
using System.Data;
using System.IO;
using System.Web;

namespace RBIDATATRACK
{
    /// <summary>
    /// Summary description for ShowImage
    /// </summary>
    public class ShowImage : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            Int32 empno;
            if (context.Request.QueryString["id"] != null)
                empno = Convert.ToInt32(context.Request.QueryString["id"]);
            else
                throw new ArgumentException("No parameter specified");

            context.Response.ContentType = "image/jpeg";
            Stream strm = ShowEmpImage(empno);
            if (strm != null)
            {
                byte[] buffer = new byte[4096];
                int byteSeq = strm.Read(buffer, 0, 4096);

                while (byteSeq > 0)
                {
                    context.Response.OutputStream.Write(buffer, 0, byteSeq);
                    byteSeq = strm.Read(buffer, 0, 4096);
                }
            }
        }

        public Stream ShowEmpImage(int empno)
        {
            string empcode = Convert.ToString(empno);
            PWA_Service.PWA_ServiceClient obj = new PWA_Service.PWA_ServiceClient();
            DataSet ds = new DataSet();
            ds = obj.PwaSelectData("PWAAPP", "GetEmpImage", empno.ToString(), "", "");
            Byte[] bytes = null;
            if (ds.Tables[0].Rows.Count > 0 && ds.Tables[0].Rows[0]["image"] != DBNull.Value)
            {
                bytes = (Byte[])ds.Tables[0].Rows[0]["image"];
            }
            else
            {
                //string exePath =System.IO.Path.GetDirectoryName(System.Reflection.Assembly.GetEntryAssembly().Location);

                string startupPath = AppDomain.CurrentDomain.BaseDirectory;
                string targetPath = startupPath + "img\\";

                System.Drawing.Image img = System.Drawing.Image.FromFile(targetPath + "1.jpg");
                using (MemoryStream ms = new MemoryStream())
                {
                    img.Save(ms, System.Drawing.Imaging.ImageFormat.Jpeg);
                    bytes = ms.ToArray();
                }
            }

            try
            {
                return new MemoryStream(bytes);
            }
            catch
            {
                return null;
            }
        }
        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}