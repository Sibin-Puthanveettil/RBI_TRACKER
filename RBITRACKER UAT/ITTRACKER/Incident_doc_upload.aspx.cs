using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace RBIDATATRACK
{
    public partial class Incident_doc_upload : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            string usr, bid, fimid, sessn, depid, pid;

            bid = Session["branch_id"].ToString();
            fimid = Session["firm_id"].ToString();
            sessn = Session["sessionkey"].ToString();
            depid = Session["department_id"].ToString();
            pid = Session["post_id"].ToString();
            usr = Session["username"].ToString();


            this.hdUserId.Value = usr;
            this.hdBranchId.Value = bid;
            this.hdFirmId.Value = fimid;
            this.hdSesssion.Value = sessn;
            this.hddpt_id.Value = depid;
            this.hdpst_id.Value = pid;
        }
        public class getDropDownData
        {
            public string id { get; set; }
            public string name { get; set; }
        }

        [WebMethod(EnableSession = true)]
        public static List<getDropDownData> getFillData(string p_flag, string p_pageval)
        {
            DataSet ds;
            List<getDropDownData> getData = new List<getDropDownData>();

            RBIDATATRACK.CompService.CompServiceClient obj = new RBIDATATRACK.CompService.CompServiceClient();
            ds = obj.CompSelect(p_flag, p_pageval, "", "", "");
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
        public class fraud_details
        {
            public string branch { get; set; }
            public string fraud_typ { get; set; }
            public string zone { get; set; }
            public string loass_amt { get; set; }
            public string irregularity { get; set; }
            public string reprort_date { get; set; }
            public string Fraud_desc { get; set; }



        }

        [WebMethod(EnableSession = true)]

        public static fraud_details get_fraud_dtls(string p_flag, string pageval)
        {

            DataSet ds;
            //string timestamp = DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss tt");

            fraud_details fd = new fraud_details();
            RBIDATATRACK.CompService.CompServiceClient obj1 = new RBIDATATRACK.CompService.CompServiceClient();
            //sinfini_recovery.mana.SMSTool sms = new sinfini_recovery.mana.SMSTool();

            ds = obj1.CompSelect(p_flag, pageval, "", "", "");
            try
            {
                if (ds.Tables[0].Rows.Count > 0)
                {

                    fd.branch = ds.Tables[0].Rows[0][0].ToString();
                    fd.fraud_typ = ds.Tables[0].Rows[0][1].ToString();
                    fd.zone = ds.Tables[0].Rows[0][2].ToString();
                    fd.loass_amt = ds.Tables[0].Rows[0][3].ToString();
                    fd.irregularity = ds.Tables[0].Rows[0][4].ToString();
                    fd.reprort_date = ds.Tables[0].Rows[0][5].ToString();
                    fd.Fraud_desc = ds.Tables[0].Rows[0][6].ToString();
                }
            }
            catch (Exception e)
            {




            }

            return fd;

        }
        //

        //
        [WebMethod(EnableSession = true)]
        public static string UploadingFile(string ImageData, string InputData)
        {
            String InputDataDecrypted = ClientsideEncryption.AESEncrytDecry.DecryptStringAES(InputData);


            List<string> extentions = new List<string>();

            extentions.InsertRange(extentions.Count, new string[] { "pdf", "jpg", "gif", "jpeg", "bmp", "tif", "tiff", "png", "xps", "doc", "docx", "fax", "wmp", "ico", "txt", "rtf", "xls", "xlsx", "ppt", "pptx", "odt", "ods" });

            string InputDataExt = InputDataDecrypted.Split('µ')[2];

            if (extentions.Contains(InputDataExt))
            {
                string result = "";
                string InputString = ImageData.Split(',')[1];
                Byte[] imgByte = Convert.FromBase64String(InputString);
                //RBIDATATRACK.CompService.CompServiceClient obj1 = new RBIDATATRACK.CompService.CompServiceClient();
                RBIDATATRACK.PWA_Service.PWA_ServiceClient obj2 = new RBIDATATRACK.PWA_Service.PWA_ServiceClient();
                //RBIDATATRACK.PurchaseSer.PurchaseClient obj3= new RBIDATATRACK.PurchaseSer.PurchaseClient();

                //result = obj1.RBIDocumentUpload("4", InputDataDecrypted, imgByte);
                    result = obj2.PwaDocumentUpload("19", InputDataDecrypted, imgByte);
                //result = obj3.PurchaseDocumentUpload("4", InputDataDecrypted, imgByte);
                return result;
            }
            else
            {
                return "666";
            }

        }

        [WebMethod(EnableSession = true)]

        public static string delete_failed_docupload(string typ)
        {

            string str = "", usrid, branch, amount;
            DataSet ds;
            try
            {

                RBIDATATRACK.CompService.CompServiceClient obj1 = new RBIDATATRACK.CompService.CompServiceClient();
                //sinfini_recovery.mana.SMSTool sms = new sinfini_recovery.mana.SMSTool();

                str = obj1.CompConfirm("delete_data", typ, "a", "a", "a");

            }
            catch (Exception e)
            {
                string ERROR = "Error Occured...!";
                return ERROR;



            }
            return str;

        }

       
        //
    }
}

















                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   