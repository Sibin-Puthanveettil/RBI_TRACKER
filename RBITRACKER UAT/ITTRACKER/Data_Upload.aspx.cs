using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.OleDb;
using System.Globalization;
using System.Drawing.Imaging;
using System.IO;
using System.Text;
using System.Web;
using System.Web.Services;
using System.Net.Mail;
using System.Linq;
using System.Web.UI;
using System.Web.UI.WebControls;



namespace RBIDATATRACK
{
    public partial class Data_Upload : System.Web.UI.Page
    {
        string result;
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
            }

        }

        protected void confirm_click(object sender, EventArgs e)
        {
            RBIDATATRACK.CompService.CompServiceClient obj1 = new RBIDATATRACK.CompService.CompServiceClient();

            GHelper.Report.ExcelExport Gobj = new GHelper.Report.ExcelExport();
            string connectionString = "";

            try
            {
                if (FileUpload2.HasFile)
                {

                    string FileName = Path.GetFileName(FileUpload2.PostedFile.FileName);
                    string Extension = Path.GetExtension(FileUpload2.PostedFile.FileName);

                    string fileLocation = Server.MapPath(FileName);
                    int length = FileUpload2.PostedFile.ContentLength;
                    byte[] pic = new byte[length];
                    FileUpload2.PostedFile.InputStream.Read(pic, 0, length);
                    Random random = new Random();
                    int num = random.Next();

                    string FolderPath = ConfigurationManager.AppSettings["FolderPath"];
                    string FilePath = Server.MapPath(FolderPath + FileName);
                    FileUpload2.SaveAs(FilePath);

                    if (Extension == ".xls")
                    {
                        if (Environment.GetEnvironmentVariable("PROCESSOR_ARCHITECTURE") == "x86")
                        {

                            connectionString = "Provider=Microsoft.Jet.OLEDB.4.0;Data Source=" + FilePath + ";Extended Properties=\"Excel 8.0;HDR=YES;IMEX=1\"";

                        }
                        else
                        {
                            connectionString = "Provider=Microsoft.ACE.OLEDB.12.0;Data Source=" + FilePath + ";Extended Properties=\"Excel 12.0;HDR=Yes;IMEX=1\"";

                        }

                    }
                    else
                    {
                        System.Text.StringBuilder cl_script1 = new System.Text.StringBuilder();
                        cl_script1.Append("alert('uploaded file is not the Excel file with .xls extension');");
                        Page.ClientScript.RegisterClientScriptBlock(this.GetType(), "clientscript", cl_script1.ToString(), true);
                        return;
                    }
                    OleDbConnection con = new OleDbConnection(connectionString);
                    OleDbCommand cmd = new OleDbCommand();
                    cmd.CommandType = System.Data.CommandType.Text;
                    cmd.Connection = con;
                    OleDbDataAdapter dAdapter = new OleDbDataAdapter(cmd);
                    DataTable dtExcelRecords = new DataTable();

                    con.Open();
                    DataTable dtExcelSheetName = con.GetOleDbSchemaTable(OleDbSchemaGuid.Tables, null);
                    string getExcelSheetName = dtExcelSheetName.Rows[0]["Table_Name"].ToString();
                    cmd.CommandText = "SELECT * FROM [" + getExcelSheetName + "]";
                    dAdapter.SelectCommand = cmd;
                    dAdapter.Fill(dtExcelRecords);
                    con.Close();
                    if (dtExcelRecords.Rows.Count > 25000)
                    {
                        System.Text.StringBuilder cl_script1 = new System.Text.StringBuilder();
                        cl_script1.Append("alert('Only a Maximum of 25000 Records can be Uploaded at a Time..!!!');");
                        Page.ClientScript.RegisterClientScriptBlock(this.GetType(), "clientscript", cl_script1.ToString(), true);
                        return;
                    }

                    foreach (DataRow dr in dtExcelRecords.Rows)
                    {
                        int sl_no;
                        string year;
                        DateTime date_of_detection;
                        string fraud_no;
                        string branch_name;
                        string state;
                        string region;
                        string tot_amnt_invd;
                        string rcvry_at_rptng;
                        string extnt_loss;
                        string amnt_rcvd_staff;                   
                        string amnt_rcvd_cstmr;
                        string insrnc_rcvry;
                        string net_loss;
                        string wrtn_boks;
                        string prvsn_amnt;


                        try
                        {

                            sl_no = Convert.ToInt32(dr[0].ToString());
                            year = dr[1].ToString();
                            date_of_detection = Convert.ToDateTime(dr[2].ToString());
                            fraud_no = dr[3].ToString();
                            branch_name = dr[4].ToString();
                            state = dr[5].ToString();
                            region = dr[6].ToString();
                            tot_amnt_invd = dr[7].ToString();
                            rcvry_at_rptng = dr[8].ToString();
                            extnt_loss = dr[9].ToString();
                            amnt_rcvd_staff = dr[10].ToString();
                            amnt_rcvd_cstmr = dr[11].ToString();
                            insrnc_rcvry = dr[12].ToString();
                            net_loss = dr[13].ToString();
                            wrtn_boks = dr[14].ToString();
                            prvsn_amnt = dr[15].ToString();



                            string finalValue = sl_no + "~" + year + "~" + date_of_detection.ToString("dd/M/yyyy", CultureInfo.InvariantCulture) + "~" + fraud_no + "~" + branch_name + "~" + state + "~" + region + "~" + tot_amnt_invd + "~" + rcvry_at_rptng + "~" + extnt_loss + "~" + amnt_rcvd_staff + "~" + amnt_rcvd_cstmr + "~" + insrnc_rcvry + "~" + net_loss + "~" + wrtn_boks + "~" + prvsn_amnt;

                            DataTable dt4 = new DataTable();

                            dt4 = obj1.CompSelect("Advanved_data", "", finalValue, "", "").Tables[0];
                            result = dt4.Rows[0][0].ToString();

                        }
                        catch (Exception ex)
                        {
                            System.Text.StringBuilder cl_script1 = new System.Text.StringBuilder();
                            cl_script1.Append("alert('" + ex.Message + "'dfghjkl');");
                            Page.ClientScript.RegisterClientScriptBlock(this.GetType(), "clientscript", cl_script1.ToString(), true);
                            return;
                        }

                    }

                    //Response.Write(@"<script langauge='text/javascript'>alert('" + result + ");</script>");
                    Response.Write("<script>alert('" + result + "')</script>");

                }

                else
                {

                    System.Text.StringBuilder cl_script1 = new System.Text.StringBuilder();
                    cl_script1.Append("alert('please uploaded a file');");
                    Page.ClientScript.RegisterClientScriptBlock(this.GetType(), "clientscript", cl_script1.ToString(), true);
                    return;
                }
            }
            catch (Exception ex)
            {
                System.Text.StringBuilder cl_script1 = new System.Text.StringBuilder();
                cl_script1.Append("alert('" + ex.Message + "'dfghjkl');");
                Page.ClientScript.RegisterClientScriptBlock(this.GetType(), "clientscript", cl_script1.ToString(), true);
                return;
            }
        }

        protected void confirm_click1(object sender, EventArgs e)
        {
            RBIDATATRACK.CompService.CompServiceClient obj1 = new RBIDATATRACK.CompService.CompServiceClient();

            GHelper.Report.ExcelExport Gobj = new GHelper.Report.ExcelExport();
            string connectionString = "";

            try
            {
                if (FileUpload2.HasFile)
                {

                    string FileName = Path.GetFileName(FileUpload2.PostedFile.FileName);
                    string Extension = Path.GetExtension(FileUpload2.PostedFile.FileName);

                    string fileLocation = Server.MapPath(FileName);
                    int length = FileUpload2.PostedFile.ContentLength;
                    byte[] pic = new byte[length];
                    FileUpload2.PostedFile.InputStream.Read(pic, 0, length);
                    Random random = new Random();
                    int num = random.Next();

                    string FolderPath = ConfigurationManager.AppSettings["FolderPath"];
                    string FilePath = Server.MapPath(FolderPath + FileName);
                    FileUpload2.SaveAs(FilePath);

                    if (Extension == ".xls")
                    {
                        if (Environment.GetEnvironmentVariable("PROCESSOR_ARCHITECTURE") == "x86")
                        {

                            connectionString = "Provider=Microsoft.Jet.OLEDB.4.0;Data Source=" + FilePath + ";Extended Properties=\"Excel 8.0;HDR=YES;IMEX=1\"";

                        }
                        else
                        {
                            connectionString = "Provider=Microsoft.ACE.OLEDB.12.0;Data Source=" + FilePath + ";Extended Properties=\"Excel 12.0;HDR=Yes;IMEX=1\"";

                        }

                    }
                    else
                    {
                        System.Text.StringBuilder cl_script1 = new System.Text.StringBuilder();
                        cl_script1.Append("alert('uploaded file is not the Excel file with .xls extension');");
                        Page.ClientScript.RegisterClientScriptBlock(this.GetType(), "clientscript", cl_script1.ToString(), true);
                        return;
                    }
                    OleDbConnection con = new OleDbConnection(connectionString);
                    OleDbCommand cmd = new OleDbCommand();
                    cmd.CommandType = System.Data.CommandType.Text;
                    cmd.Connection = con;
                    OleDbDataAdapter dAdapter = new OleDbDataAdapter(cmd);
                    DataTable dtExcelRecords = new DataTable();

                    con.Open();
                    DataTable dtExcelSheetName = con.GetOleDbSchemaTable(OleDbSchemaGuid.Tables, null);
                    string getExcelSheetName = dtExcelSheetName.Rows[0]["Table_Name"].ToString();
                    cmd.CommandText = "SELECT * FROM [" + getExcelSheetName + "]";
                    dAdapter.SelectCommand = cmd;
                    dAdapter.Fill(dtExcelRecords);
                    con.Close();
                    if (dtExcelRecords.Rows.Count > 25000)
                    {
                        System.Text.StringBuilder cl_script1 = new System.Text.StringBuilder();
                        cl_script1.Append("alert('Only a Maximum of 25000 Records can be Uploaded at a Time..!!!');");
                        Page.ClientScript.RegisterClientScriptBlock(this.GetType(), "clientscript", cl_script1.ToString(), true);
                        return;
                    }

                    foreach (DataRow dr in dtExcelRecords.Rows)
                    {
                        int sl_no;
                        string year;
                        DateTime date_of_detection;
                        string fraud_no;
                        string branch_name;
                        string state;
                        string region;
                        string tot_amnt_invd;
                        string rcvry_at_rptng;
                        string extnt_loss;
                        string amnt_rcvd_staff;
                        string amnt_rcvd_cstmr;
                        string insrnc_rcvry;
                        string net_loss;
                        string wrtn_boks;
                        string prvsn_amnt;
                        string comp_vercl;
                        string cls_or_not;


                        try
                        {

                            sl_no = Convert.ToInt32(dr[0].ToString());
                            year = dr[1].ToString();
                            date_of_detection = Convert.ToDateTime(dr[2].ToString());
                            fraud_no = dr[3].ToString();
                            branch_name = dr[4].ToString();
                            state = dr[5].ToString();
                            region = dr[6].ToString();
                            tot_amnt_invd = dr[7].ToString();
                            rcvry_at_rptng = dr[8].ToString();
                            extnt_loss = dr[9].ToString();
                            amnt_rcvd_staff = dr[10].ToString();
                            amnt_rcvd_cstmr = dr[11].ToString();
                            insrnc_rcvry = dr[12].ToString();
                            net_loss = dr[13].ToString();
                            wrtn_boks = dr[14].ToString();
                            prvsn_amnt = dr[15].ToString();
                            comp_vercl = dr[14].ToString();
                            cls_or_not = dr[15].ToString();


                            string finalValue = sl_no + "~" + year + "~" + date_of_detection.ToString("dd/M/yyyy", CultureInfo.InvariantCulture) + "~" + fraud_no + "~" + branch_name + "~" + state + "~" + region + "~" + tot_amnt_invd + "~" + rcvry_at_rptng + "~" + extnt_loss + "~" + amnt_rcvd_staff + "~" + amnt_rcvd_cstmr + "~" + insrnc_rcvry + "~" + net_loss + "~" + wrtn_boks + "~" + prvsn_amnt + "~" + comp_vercl + "~" + cls_or_not;

                            DataTable dt4 = new DataTable();

                            dt4 = obj1.CompSelect("Cash_data", "", finalValue, "", "").Tables[0];
                            result = dt4.Rows[0][0].ToString();

                        }
                        catch (Exception ex)
                        {
                            System.Text.StringBuilder cl_script1 = new System.Text.StringBuilder();
                            cl_script1.Append("alert('" + ex.Message + "'dfghjkl');");
                            Page.ClientScript.RegisterClientScriptBlock(this.GetType(), "clientscript", cl_script1.ToString(), true);
                            return;
                        }

                    }
                    Response.Write("<script>alert('" + result + "')</script>");

                }

                else
                {

                    System.Text.StringBuilder cl_script1 = new System.Text.StringBuilder();
                    cl_script1.Append("alert('please uploaded a file');");
                    Page.ClientScript.RegisterClientScriptBlock(this.GetType(), "clientscript", cl_script1.ToString(), true);
                    return;
                }
            }
            catch (Exception ex)
            {
                System.Text.StringBuilder cl_script1 = new System.Text.StringBuilder();
                cl_script1.Append("alert('" + ex.Message + "'dfghjkl');");
                Page.ClientScript.RegisterClientScriptBlock(this.GetType(), "clientscript", cl_script1.ToString(), true);
                return;
            }
        }
        protected void confirm_click2(object sender, EventArgs e)
        {
            RBIDATATRACK.CompService.CompServiceClient obj1 = new RBIDATATRACK.CompService.CompServiceClient();

            GHelper.Report.ExcelExport Gobj = new GHelper.Report.ExcelExport();
            string connectionString = "";

            try
            {
                if (FileUpload2.HasFile)
                {

                    string FileName = Path.GetFileName(FileUpload2.PostedFile.FileName);
                    string Extension = Path.GetExtension(FileUpload2.PostedFile.FileName);

                    string fileLocation = Server.MapPath(FileName);
                    int length = FileUpload2.PostedFile.ContentLength;
                    byte[] pic = new byte[length];
                    FileUpload2.PostedFile.InputStream.Read(pic, 0, length);
                    Random random = new Random();
                    int num = random.Next();

                    string FolderPath = ConfigurationManager.AppSettings["FolderPath"];
                    string FilePath = Server.MapPath(FolderPath + FileName);
                    FileUpload2.SaveAs(FilePath);

                    if (Extension == ".xls")
                    {
                        if (Environment.GetEnvironmentVariable("PROCESSOR_ARCHITECTURE") == "x86")
                        {

                            connectionString = "Provider=Microsoft.Jet.OLEDB.4.0;Data Source=" + FilePath + ";Extended Properties=\"Excel 8.0;HDR=YES;IMEX=1\"";

                        }
                        else
                        {
                            connectionString = "Provider=Microsoft.ACE.OLEDB.12.0;Data Source=" + FilePath + ";Extended Properties=\"Excel 12.0;HDR=Yes;IMEX=1\"";

                        }

                    }
                    else
                    {
                        System.Text.StringBuilder cl_script1 = new System.Text.StringBuilder();
                        cl_script1.Append("alert('uploaded file is not the Excel file with .xls extension');");
                        Page.ClientScript.RegisterClientScriptBlock(this.GetType(), "clientscript", cl_script1.ToString(), true);
                        return;
                    }
                    OleDbConnection con = new OleDbConnection(connectionString);
                    OleDbCommand cmd = new OleDbCommand();
                    cmd.CommandType = System.Data.CommandType.Text;
                    cmd.Connection = con;
                    OleDbDataAdapter dAdapter = new OleDbDataAdapter(cmd);
                    DataTable dtExcelRecords = new DataTable();

                    con.Open();
                    DataTable dtExcelSheetName = con.GetOleDbSchemaTable(OleDbSchemaGuid.Tables, null);
                    string getExcelSheetName = dtExcelSheetName.Rows[0]["Table_Name"].ToString();
                    cmd.CommandText = "SELECT * FROM [" + getExcelSheetName + "]";
                    dAdapter.SelectCommand = cmd;
                    dAdapter.Fill(dtExcelRecords);
                    con.Close();
                    if (dtExcelRecords.Rows.Count > 25000)
                    {
                        System.Text.StringBuilder cl_script1 = new System.Text.StringBuilder();
                        cl_script1.Append("alert('Only a Maximum of 25000 Records can be Uploaded at a Time..!!!');");
                        Page.ClientScript.RegisterClientScriptBlock(this.GetType(), "clientscript", cl_script1.ToString(), true);
                        return;
                    }

                    foreach (DataRow dr in dtExcelRecords.Rows)
                    {
                        int sl_no;
                        string year;
                        DateTime date_of_detection;
                        string fraud_no;
                        string branch_name;
                        string state;
                        string region;
                        string tot_amnt_invd;
                        string extnt_loss;
                        string amnt_rcvd_staff;
                        string amnt_rcvd_cstmr;
                        string insrnc_rcvry;
                        string net_loss;
                        string wrtn_boks;
                        string prvsn_amnt;
                        string comp_vercl;
                        string cls_or_not;


                        try
                        {

                            sl_no = Convert.ToInt32(dr[0].ToString());
                            year = dr[1].ToString();
                            date_of_detection = Convert.ToDateTime(dr[2].ToString());
                            fraud_no = dr[3].ToString();
                            branch_name = dr[4].ToString();
                            state = dr[5].ToString();
                            region = dr[6].ToString();
                            tot_amnt_invd = dr[7].ToString();
                            extnt_loss = dr[8].ToString();
                            amnt_rcvd_staff = dr[9].ToString();
                            amnt_rcvd_cstmr = dr[10].ToString();
                            insrnc_rcvry = dr[11].ToString();
                            net_loss = dr[12].ToString();
                            wrtn_boks = dr[13].ToString();
                            prvsn_amnt = dr[14].ToString();
                            comp_vercl = dr[15].ToString();
                            cls_or_not = dr[16].ToString();


                            string finalValue = sl_no + "~" + year + "~" + date_of_detection.ToString("dd/M/yyyy", CultureInfo.InvariantCulture) + "~" + fraud_no + "~" + branch_name + "~" + state + "~" + region + "~" + tot_amnt_invd + "~" + extnt_loss + "~" + amnt_rcvd_staff + "~" + amnt_rcvd_cstmr + "~" + insrnc_rcvry + "~" + net_loss + "~" + wrtn_boks + "~" + prvsn_amnt + "~" + comp_vercl + "~" + cls_or_not;

                            DataTable dt4 = new DataTable();

                            dt4 = obj1.CompSelect("Other_data", "", finalValue, "", "").Tables[0];
                            result = dt4.Rows[0][0].ToString();

                        }
                        catch (Exception ex)
                        {
                            System.Text.StringBuilder cl_script1 = new System.Text.StringBuilder();
                            cl_script1.Append("alert('" + ex.Message + "'dfghjkl');");
                            Page.ClientScript.RegisterClientScriptBlock(this.GetType(), "clientscript", cl_script1.ToString(), true);
                            return;
                        }

                    }
                    Response.Write("<script>alert('" + result + "')</script>");

                }

                else
                {

                    System.Text.StringBuilder cl_script1 = new System.Text.StringBuilder();
                    cl_script1.Append("alert('please uploaded a file');");
                    Page.ClientScript.RegisterClientScriptBlock(this.GetType(), "clientscript", cl_script1.ToString(), true);
                    return;
                }
            }
            catch (Exception ex)
            {
                System.Text.StringBuilder cl_script1 = new System.Text.StringBuilder();
                cl_script1.Append("alert('" + ex.Message + "'dfghjkl');");
                Page.ClientScript.RegisterClientScriptBlock(this.GetType(), "clientscript", cl_script1.ToString(), true);
                return;
            }
        }
        protected void confirm_click3(object sender, EventArgs e)
        {
            RBIDATATRACK.CompService.CompServiceClient obj1 = new RBIDATATRACK.CompService.CompServiceClient();

            GHelper.Report.ExcelExport Gobj = new GHelper.Report.ExcelExport();
            string connectionString = "";

            try
            {
                if (FileUpload2.HasFile)
                {

                    string FileName = Path.GetFileName(FileUpload2.PostedFile.FileName);
                    string Extension = Path.GetExtension(FileUpload2.PostedFile.FileName);

                    string fileLocation = Server.MapPath(FileName);
                    int length = FileUpload2.PostedFile.ContentLength;
                    byte[] pic = new byte[length];
                    FileUpload2.PostedFile.InputStream.Read(pic, 0, length);
                    Random random = new Random();
                    int num = random.Next();

                    string FolderPath = ConfigurationManager.AppSettings["FolderPath"];
                    string FilePath = Server.MapPath(FolderPath + FileName);
                    FileUpload2.SaveAs(FilePath);

                    if (Extension == ".xls")
                    {
                        if (Environment.GetEnvironmentVariable("PROCESSOR_ARCHITECTURE") == "x86")
                        {

                            connectionString = "Provider=Microsoft.Jet.OLEDB.4.0;Data Source=" + FilePath + ";Extended Properties=\"Excel 8.0;HDR=YES;IMEX=1\"";

                        }
                        else
                        {
                            connectionString = "Provider=Microsoft.ACE.OLEDB.12.0;Data Source=" + FilePath + ";Extended Properties=\"Excel 12.0;HDR=Yes;IMEX=1\"";

                        }

                    }
                    else
                    {
                        System.Text.StringBuilder cl_script1 = new System.Text.StringBuilder();
                        cl_script1.Append("alert('uploaded file is not the Excel file with .xls extension');");
                        Page.ClientScript.RegisterClientScriptBlock(this.GetType(), "clientscript", cl_script1.ToString(), true);
                        return;
                    }
                    OleDbConnection con = new OleDbConnection(connectionString);
                    OleDbCommand cmd = new OleDbCommand();
                    cmd.CommandType = System.Data.CommandType.Text;
                    cmd.Connection = con;
                    OleDbDataAdapter dAdapter = new OleDbDataAdapter(cmd);
                    DataTable dtExcelRecords = new DataTable();

                    con.Open();
                    DataTable dtExcelSheetName = con.GetOleDbSchemaTable(OleDbSchemaGuid.Tables, null);
                    string getExcelSheetName = dtExcelSheetName.Rows[0]["Table_Name"].ToString();
                    cmd.CommandText = "SELECT * FROM [" + getExcelSheetName + "]";
                    dAdapter.SelectCommand = cmd;
                    dAdapter.Fill(dtExcelRecords);
                    con.Close();
                    if (dtExcelRecords.Rows.Count > 25000)
                    {
                        System.Text.StringBuilder cl_script1 = new System.Text.StringBuilder();
                        cl_script1.Append("alert('Only a Maximum of 25000 Records can be Uploaded at a Time..!!!');");
                        Page.ClientScript.RegisterClientScriptBlock(this.GetType(), "clientscript", cl_script1.ToString(), true);
                        return;
                    }

                    foreach (DataRow dr in dtExcelRecords.Rows)
                    {
                        int sl_no;              
                        string fraud_no;
                        string pledge_no;
                        string pledge_Amnt;
                        string pledge_status;
                        string wrtn_of_stats;
                        string cls_or_not;
                        try
                        {

                            sl_no = Convert.ToInt32(dr[0].ToString());
                            fraud_no = dr[1].ToString();
                            pledge_no = dr[2].ToString();
                            pledge_Amnt = dr[3].ToString();
                            pledge_status = dr[4].ToString();
                            wrtn_of_stats = dr[5].ToString();
                            cls_or_not = dr[6].ToString();



                            string finalValue = sl_no + "~" + fraud_no + "~" + pledge_no + "~" + pledge_Amnt + "~" + pledge_status + "~" + wrtn_of_stats + "~" + cls_or_not;

                            DataTable dt4 = new DataTable();

                            dt4 = obj1.CompSelect("pledge_data", "", finalValue, "", "").Tables[0];
                            result = dt4.Rows[0][0].ToString();

                        }
                        catch (Exception ex)
                        {
                            System.Text.StringBuilder cl_script1 = new System.Text.StringBuilder();
                            cl_script1.Append("alert('" + ex.Message + "'dfghjkl');");
                            Page.ClientScript.RegisterClientScriptBlock(this.GetType(), "clientscript", cl_script1.ToString(), true);
                            return;
                        }

                    }
                    Response.Write("<script>alert('" + result + "')</script>");

                }

                else
                {

                    System.Text.StringBuilder cl_script1 = new System.Text.StringBuilder();
                    cl_script1.Append("alert('please uploaded a file');");
                    Page.ClientScript.RegisterClientScriptBlock(this.GetType(), "clientscript", cl_script1.ToString(), true);
                    return;
                }
            }
            catch (Exception ex)
            {
                System.Text.StringBuilder cl_script1 = new System.Text.StringBuilder();
                cl_script1.Append("alert('" + ex.Message + "'dfghjkl');");
                Page.ClientScript.RegisterClientScriptBlock(this.GetType(), "clientscript", cl_script1.ToString(), true);
                return;
            }
        }
        protected void confirm_click4(object sender, EventArgs e)
        {
            RBIDATATRACK.CompService.CompServiceClient obj1 = new RBIDATATRACK.CompService.CompServiceClient();

            GHelper.Report.ExcelExport Gobj = new GHelper.Report.ExcelExport();
            string connectionString = "";

            try
            {
                if (FileUpload2.HasFile)
                {

                    string FileName = Path.GetFileName(FileUpload2.PostedFile.FileName);
                    string Extension = Path.GetExtension(FileUpload2.PostedFile.FileName);

                    string fileLocation = Server.MapPath(FileName);
                    int length = FileUpload2.PostedFile.ContentLength;
                    byte[] pic = new byte[length];
                    FileUpload2.PostedFile.InputStream.Read(pic, 0, length);
                    Random random = new Random();
                    int num = random.Next();

                    string FolderPath = ConfigurationManager.AppSettings["FolderPath"];
                    string FilePath = Server.MapPath(FolderPath + FileName);
                    FileUpload2.SaveAs(FilePath);

                    if (Extension == ".xls")
                    {
                        if (Environment.GetEnvironmentVariable("PROCESSOR_ARCHITECTURE") == "x86")
                        {

                            connectionString = "Provider=Microsoft.Jet.OLEDB.4.0;Data Source=" + FilePath + ";Extended Properties=\"Excel 8.0;HDR=YES;IMEX=1\"";

                        }
                        else
                        {
                            connectionString = "Provider=Microsoft.ACE.OLEDB.12.0;Data Source=" + FilePath + ";Extended Properties=\"Excel 12.0;HDR=Yes;IMEX=1\"";

                        }

                    }
                    else
                    {
                        System.Text.StringBuilder cl_script1 = new System.Text.StringBuilder();
                        cl_script1.Append("alert('uploaded file is not the Excel file with .xls extension');");
                        Page.ClientScript.RegisterClientScriptBlock(this.GetType(), "clientscript", cl_script1.ToString(), true);
                        return;
                    }
                    OleDbConnection con = new OleDbConnection(connectionString);
                    OleDbCommand cmd = new OleDbCommand();
                    cmd.CommandType = System.Data.CommandType.Text;
                    cmd.Connection = con;
                    OleDbDataAdapter dAdapter = new OleDbDataAdapter(cmd);
                    DataTable dtExcelRecords = new DataTable();

                    con.Open();
                    DataTable dtExcelSheetName = con.GetOleDbSchemaTable(OleDbSchemaGuid.Tables, null);
                    string getExcelSheetName = dtExcelSheetName.Rows[0]["Table_Name"].ToString();
                    cmd.CommandText = "SELECT * FROM [" + getExcelSheetName + "]";
                    dAdapter.SelectCommand = cmd;
                    dAdapter.Fill(dtExcelRecords);
                    con.Close();
                    if (dtExcelRecords.Rows.Count > 25000)
                    {
                        System.Text.StringBuilder cl_script1 = new System.Text.StringBuilder();
                        cl_script1.Append("alert('Only a Maximum of 25000 Records can be Uploaded at a Time..!!!');");
                        Page.ClientScript.RegisterClientScriptBlock(this.GetType(), "clientscript", cl_script1.ToString(), true);
                        return;
                    }

                    foreach (DataRow dr in dtExcelRecords.Rows)
                    {
                        int sl_no;
                        string fraud_no;
                        string state;
                        string branch_id;
                        string branch_name;
                        string region;
                        string Emp_invlvd;
                        string EMP_Code;
                        string cls_or_not;
                        try
                        {

                            sl_no = Convert.ToInt32(dr[0].ToString());
                            fraud_no = dr[1].ToString();
                            state = dr[2].ToString();
                            branch_id = dr[3].ToString();
                            branch_name = dr[4].ToString();
                            region = dr[5].ToString();
                            Emp_invlvd = dr[6].ToString();
                            EMP_Code = dr[7].ToString();
                            cls_or_not = dr[8].ToString();

                            string finalValue = sl_no + "~" + fraud_no + "~" + state + "~" + branch_id + "~" + branch_name + "~" + region + "~" + Emp_invlvd + "~" + EMP_Code + "~" + cls_or_not;

                            DataTable dt4 = new DataTable();

                            dt4 = obj1.CompSelect("employee_data", "", finalValue, "", "").Tables[0];
                            result = dt4.Rows[0][0].ToString();

                        }
                        catch (Exception ex)
                        {
                            System.Text.StringBuilder cl_script1 = new System.Text.StringBuilder();
                            cl_script1.Append("alert('" + ex.Message + "'dfghjkl');");
                            Page.ClientScript.RegisterClientScriptBlock(this.GetType(), "clientscript", cl_script1.ToString(), true);
                            return;
                        }

                    }
                    Response.Write("<script>alert('" + result + "')</script>");

                }

                else
                {

                    System.Text.StringBuilder cl_script1 = new System.Text.StringBuilder();
                    cl_script1.Append("alert('please uploaded a file');");
                    Page.ClientScript.RegisterClientScriptBlock(this.GetType(), "clientscript", cl_script1.ToString(), true);
                    return;
                }
            }
            catch (Exception ex)
            {
                System.Text.StringBuilder cl_script1 = new System.Text.StringBuilder();
                cl_script1.Append("alert('" + ex.Message + "'dfghjkl');");
                Page.ClientScript.RegisterClientScriptBlock(this.GetType(), "clientscript", cl_script1.ToString(), true);
                return;
            }
        }
        protected void btnExit_Click(object sender, EventArgs e)

        {


            Response.Redirect("index.aspx");


        }

    }
}