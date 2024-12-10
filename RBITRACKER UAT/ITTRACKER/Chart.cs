using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RBIDATATRACK
{
    public class Chart
    {
        public Title1 title { get; set; }
        public Tooltip tooltip { get; set; }
        public Legend legend { get; set; }
        public List<string> color { get; set; }
        public Toolbox toolbox { get; set; }
        public bool calculable { get; set; }
        public List<Series> series { get; set; }
    }

    public class Title1
    {
        public string text { get; set; }
        public string subtext { get; set; }
        public string x { get; set; }
    }

    public class Tooltip
    {
        public string trigger { get; set; }
        public string formatter { get; set; }
    }

    public class Legend
    {
        public string orient { get; set; }
        public string x { get; set; }
        public List<string> data { get; set; }
    }

    public class Title2
    {
        public string mark { get; set; }
        public string markUndo { get; set; }
        public string markClear { get; set; }
    }

    public class Mark
    {
        public bool show { get; set; }
        public Title2 title { get; set; }
    }

    public class DataView
    {
        public bool show { get; set; }
        public bool readOnly { get; set; }
        public string title { get; set; }
        public List<string> lang { get; set; }
    }

    public class Title4
    {
        public string pie { get; set; }
        public string funnel { get; set; }
    }

    public class Funnel
    {
        public string x { get; set; }
        public string y { get; set; }
        public string width { get; set; }
        public string height { get; set; }
        public string funnelAlign { get; set; }
        public int max { get; set; }
    }

    public class Option
    {
        public Funnel funnel { get; set; }
    }

    public class MagicType
    {
        public bool show { get; set; }
        public Title4 title { get; set; }
        public List<string> type { get; set; }
        public Option option { get; set; }
    }

    public class Restore
    {
        public bool show { get; set; }
        public string title { get; set; }
    }

    public class SaveAsImage
    {
        public bool show { get; set; }
        public string title { get; set; }
        public List<string> lang { get; set; }
    }

    public class Feature
    {
        public Mark mark { get; set; }
        public DataView dataView { get; set; }
        public MagicType magicType { get; set; }
        public Restore restore { get; set; }
        public SaveAsImage saveAsImage { get; set; }
    }

    public class Toolbox
    {
        public bool show { get; set; }
        public string orient { get; set; }
        public Feature feature { get; set; }
    }

    public class data
    {
        public object value { get; set; }
        public string name { get; set; }
    }

    public class Series
    {
        public string name { get; set; }
        public string type { get; set; }
        public string radius { get; set; }
        public List<string> center { get; set; }
        public List<data> data { get; set; }
    }

    public class RootObject
    {
        

    }
}