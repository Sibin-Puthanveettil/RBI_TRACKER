using System;
using System.Collections.Generic;
using System.Data;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Services;

namespace RBIDATATRACK
{
    public partial class Index : System.Web.UI.Page
    {
        public void Page_Init(object o, EventArgs e)
        {

            Response.Cache.SetCacheability(HttpCacheability.NoCache);

            Response.Cache.SetExpires(DateTime.UtcNow.AddHours(-1));

            Response.Cache.SetNoStore();
        }
        protected void Page_Load(object sender, EventArgs e)
        {
            string usr, bid, fimid;
            if (string.IsNullOrEmpty(Session["username"] as string))
            {
                Response.Redirect("SessionExpired.aspx");
            }
            else
            {
                //TMS_Service.TMS_ServiceClient obj = new TMS_Service.TMS_ServiceClient();
                //DataTable dt = new DataTable();
                //string user = Session["username"].ToString();
                //string result = obj.TestService("", user);
                //DataTable alertdt = new DataTable();
                //alertdt = obj.TreasuryFillData("TRESURYLOAN", "getAlertCount", user, "").Tables[0];
                //if (alertdt.Rows.Count > 0)
                //{
                //    alertPending.InnerHtml = alertdt.Rows[0][0].ToString();
                //}
                usr = Session["username"].ToString();
                bid = Session["branch_id"].ToString();
                fimid = Session["firm_id"].ToString();
                this.hdUserId.Value = usr;
                this.hdBranchId.Value = bid;
                this.hdFirmId.Value = fimid;
            }
            //Chart newchart = new Chart();
            //newchart.title1.text = "fdfgd";
        }

        public class getListData
        {
            public string lst { get; set; }
        }
        [WebMethod(EnableSession = true)]
        public static List<getListData> getListPending(string pageVal, string pageval1, string pageval2)
        {
            DataSet ds;
            List<getListData> getData = new List<getListData>();
            //PWA_Service.PWA_ServiceClient obj1 = new PWA_Service.PWA_ServiceClient();
            //ds = obj1.PwaSelectData("PWAAPP", pageVal, pageval1, pageval2, "");
            // ITTracker.ITService.ITServiceClient obj1 = new ITTracker.ITService.ITServiceClient();

            RBIDATATRACK.CompService.CompServiceClient obj = new RBIDATATRACK.CompService.CompServiceClient();


            ds = obj.CompSelect(pageVal, pageval1, pageval2, "", "");

            try
            {
                if (ds.Tables[0].Rows.Count > 0)
                {
                    foreach (DataRow dr in ds.Tables[0].Rows)
                    {
                        getData.Add(new getListData()
                        {
                            lst = dr[0].ToString()
                        });
                    }
                }
            }
            catch (Exception e)
            {
                // return e.Message;
            }
            return getData;
        }

        [WebMethod(EnableSession = true)]

        public static Chart pieChart1(string typ, string val1)
        {
            DataSet ds = new DataSet();
            string str = "";
           
            PWA_Service.PWA_ServiceClient obj1 = new PWA_Service.PWA_ServiceClient();
            if (typ == "1")
            {
                ds = obj1.PwaSelectData("PWAAPP", "GetDashBoardChart", val1, "", "");
            }
            if (typ == "2")
            {
                ds = obj1.PwaSelectData("PWAAPP", "GetDashBoardChartRev", val1, "", "");
            }
            
            if (typ == "3")
            {
                ds = obj1.PwaSelectData("PWAAPP", "GetDashBoardChart", val1, "", "");
            }


            //  ds = obj1.PwaSelectData("PWAAPP", "GetDashBoardChart", val1, "", "");

            Title1 Title = new Title1();
            Title.text = "";
            Title.subtext = "";
            Title.x = "center";

            Tooltip tooltips = new Tooltip();
            tooltips.trigger = "item";
            tooltips.formatter = "{a} <br/>{b}: {c} ({d}%)";

            List<string> datas = new List<string>();

            try
            {
                if (ds.Tables.Count > 0)
                {
                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        foreach (DataRow dr in ds.Tables[0].Rows)
                        {
                            datas.Add(dr[0].ToString());
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                datas.Add("In Progress");
                datas.Add("Approved");
                datas.Add("Rejected");
                datas.Add("Cancelled");
                datas.Add("Need Discussion");
                datas.Add("Skipped");
            }



           
            Legend Legends = new Legend();
            Legends.orient = "vertical";
            Legends.x = "left";
            Legends.data = datas;

            List<string> colors = new List<string>();
            //['#ffbc34', '#4fc3f7', '#212529', '#f62d51', '#2962FF'],
            colors.Add("#ffbc34");
            colors.Add("#4fc3f7");
            colors.Add("#044689");
            colors.Add("#f62d51");
            colors.Add("#2962FF");
            Title2 title2 = new Title2();
            title2.mark = "Markline switch";
            title2.markUndo = "Undo markline";
            title2.markClear = "Clear markline";

            Mark Mark = new Mark();
            Mark.show = true;
            Mark.title = title2;


            List<string> lang = new List<string>();
            lang.Add("View chart data");
            lang.Add("Close");
            lang.Add("Update");

            DataView DataView = new DataView();
            DataView.lang = lang;
            DataView.show = true;
            DataView.title = "View data";

            Funnel Funnel = new Funnel();
            Funnel.x = "25%";
            Funnel.y = "20%";
            Funnel.width = "50%";
            Funnel.height = "70%";
            Funnel.funnelAlign = "left";
            Funnel.max = 1548;

            Title4 title4 = new Title4();
            title4.pie = "Switch to pies";
            title4.funnel = "Switch to funnel";

            List<string> type = new List<string>();
            type.Add("pie");
            type.Add("funnel");
            Option Option = new Option();
            Option.funnel = Funnel;

            MagicType magicTypes = new MagicType();
            magicTypes.show = true;
            magicTypes.title = title4;
            magicTypes.type = type;
            magicTypes.option = Option;


            Restore Restore = new Restore();
            Restore.show = true;
            Restore.title = "Refresh";

            List<string> lang1 = new List<string>();
            lang1.Add("Save");

            SaveAsImage saveAsImage = new SaveAsImage();
            saveAsImage.show = true;
            saveAsImage.title = "Save as image";
            saveAsImage.lang = lang1;

            Feature Feature = new Feature();
            Feature.mark = Mark;
            Feature.dataView = DataView;
            Feature.magicType = magicTypes;
            Feature.restore = Restore;
            Feature.saveAsImage = saveAsImage;


            Toolbox Toolbox = new Toolbox();
            Toolbox.show = true;
            Toolbox.orient = "vertical";
            Toolbox.feature = Feature;

            List<string> center = new List<string>();
            center.Add("50%");
            center.Add("57.5%");

            List<data> data1 = new List<data>();

            try
            {
                if (ds.Tables.Count > 0)
                {
                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        foreach (DataRow dr in ds.Tables[0].Rows)
                        {
                            data1.Add(new data()
                            {
                                value = dr[1].ToString(),
                                name = dr[0].ToString()
                            });

                        }
                    }
                }
            }
            catch (Exception ex)
            {
                
            }

            List<Series> Series = new List<Series>();
            Series.Add(new Series()
            {
                name = "Status",
                type = "pie",
                radius = "50%",
                center = center,
                data = data1
            });


            Chart Chart = new Chart();
            if (datas.Count > 0)
            {
                Chart.title = Title;
                Chart.tooltip = tooltips;
                Chart.legend = Legends;
                Chart.color = colors;
                Chart.toolbox = Toolbox;
                Chart.calculable = true;
                Chart.series = Series;
            }

            JavaScriptSerializer js = new JavaScriptSerializer();
            string jsonData = js.Serialize(Chart);
            return Chart;
       
       
       }
    }
}