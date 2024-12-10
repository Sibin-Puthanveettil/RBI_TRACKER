using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Services;
using System.Data;
using System.Data.OleDb;
using System.IO;
using System.Configuration;
using System.Collections;
using System.Net.Mail;

namespace RBIDATATRACK
{
    public partial class PWA_Master : System.Web.UI.MasterPage
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            //HttpContext.Current.Session["username"] = "375485";
            //HttpContext.Current.Session["user_name"] = "SIBIN";
            if (string.IsNullOrEmpty(Session["username"] as string))
            {
                Response.Redirect("SessionExpired.aspx");
            }
            string user = Session["username"].ToString();
            String mid = "";
            if (string.IsNullOrEmpty(Request.QueryString["mid"] as string))
            {
                mid = "";
            }
            else
            {
                mid = Request.QueryString["mid"];
            }

            string user_name = Session["user_name"].ToString();
           

            uname.InnerHtml = user_name;
            uname1.InnerHtml = user_name;
            uname2.InnerHtml = user_name;

            DataTable dt = new DataTable();

            RBIDATATRACK.CompService.CompServiceClient obj = new RBIDATATRACK.CompService.CompServiceClient();
            dt = obj.CompSelect("MENUACCESS",user, "MAIN_MENU",  "", "").Tables[0];

            //PWA_Service.PWA_ServiceClient obj = new PWA_Service.PWA_ServiceClient();
            //dt = obj.PwaSelectData("PWAAPP", "GetMainMenu", user, "", "").Tables[0];
            if (dt.Rows.Count > 0)
            {
                rpt_mainmenu.DataSource = dt;
                rpt_mainmenu.DataBind();
            }
            Image1.ImageUrl = "ShowImage.ashx?id=" + user;
            Image2.ImageUrl = "ShowImage.ashx?id=" + user;
            Image3.ImageUrl = "ShowImage.ashx?id=" + user;

            this.hdUserId.Value = Session["username"].ToString();
            this.hdBranchId.Value = Session["branch_id"].ToString();
            this.hdFirmId.Value = Session["firm_id"].ToString();
            
        }
   

       
        protected void rpt_mainmenu_ItemDataBound(object sender, RepeaterItemEventArgs e)
        {

            if (e.Item.ItemType == ListItemType.Item || e.Item.ItemType == ListItemType.AlternatingItem)
            {
                ////string MenuId = (e.Item.FindControl("MenuId") as HiddenField).Value;
                //int MenuId = Convert.ToInt32(DataBinder.Eval(e.Item.DataItem, "ID"));
                //Repeater rpt_submenu = e.Item.FindControl("rpt_submenu") as Repeater;
                //string user = Session["username"].ToString();
                //DataTable dt = new DataTable();
                //ITTracker.ITService.ITServiceClient obj = new ITTracker.ITService.ITServiceClient();
                //dt = obj.TrackerSelect("MENUACCESS", user, "SUBMENU", Convert.ToString(MenuId),"").Tables[0];

                ////PWA_Service.PWA_ServiceClient obj1 = new PWA_Service.PWA_ServiceClient();
                ////dt = obj1.PwaSelectData("PWAAPP", "GetSubMenu", user, Convert.ToString(MenuId), "").Tables[0];
                ////dt = obj.TreasuryFillData("MENUACCESS", user, "SUBMENU", Convert.ToString(MenuId)).Tables[0];
                //if (dt.Rows.Count > 0)
                //{
                //    rpt_submenu.DataSource = dt;
                //    rpt_submenu.DataBind();
                //}
                if (e.Item.ItemType == ListItemType.Item || e.Item.ItemType == ListItemType.AlternatingItem)
                {
                    //string MenuId = (e.Item.FindControl("MenuId") as HiddenField).Value;
                    int MenuId = Convert.ToInt32(DataBinder.Eval(e.Item.DataItem, "ID"));
                    Repeater rpt_submenu = e.Item.FindControl("rpt_submenu") as Repeater;
                    string user = Session["username"].ToString();
                    DataTable dt = new DataTable();
                    RBIDATATRACK.CompService.CompServiceClient obj = new RBIDATATRACK.CompService.CompServiceClient();
                    dt = obj.CompSelect("MENUACCESS", user, "SUBMENU", Convert.ToString(MenuId),"").Tables[0];

                    //dt = obj.PurchaseFillData("MENUACCESS", user, "SUBMENU", Convert.ToString(MenuId)).Tables[0];
                    if (dt.Rows.Count > 0)
                    {
                        rpt_submenu.DataSource = dt;
                        rpt_submenu.DataBind();
                    }

                }
            }
        }

        [WebMethod(EnableSession = true)]
        public static string getAccessibility(string pageval, string pageval1)
        {
            string result = "";


            try
            {
                DataTable dt = new DataTable();
                RBIDATATRACK.CompService.CompServiceClient obj = new RBIDATATRACK.CompService.CompServiceClient();
                dt = obj.CompSelect(pageval, pageval1, "", "", "").Tables[0];
                if (dt.Rows.Count > 0)
                {
                    result = dt.Rows[0][0].ToString();
                }
                else
                {
                    result = "";
                }

            }
            catch (Exception e)
            {

            }
            return result;
        }

        protected void rpt_submenu_ItemDataBound(object sender, RepeaterItemEventArgs e)
        {
            if (e.Item.ItemType == ListItemType.Item || e.Item.ItemType == ListItemType.AlternatingItem)
            {
                //string MenuId = (e.Item.FindControl("MenuId") as HiddenField).Value;
                int MenuId = Convert.ToInt32(DataBinder.Eval(e.Item.DataItem, "ID"));
                Repeater rpt_submenusecond = e.Item.FindControl("rpt_submenusecond") as Repeater;
                string user = Session["username"].ToString();
                DataTable dt = new DataTable();
                RBIDATATRACK.CompService.CompServiceClient obj = new RBIDATATRACK.CompService.CompServiceClient();
                dt = obj.CompSelect("MENUACCESS", user, "SUBMENU1", Convert.ToString(MenuId), "").Tables[0];

                if (dt.Rows.Count > 0)
                {
                    rpt_submenusecond.DataSource = dt;
                    rpt_submenusecond.DataBind();
                }

            }

        }

        protected void rpt_mainmenu_ItemCommand(object source, RepeaterCommandEventArgs e)
        {

        }
    }
}