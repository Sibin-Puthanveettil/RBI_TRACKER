<%@ Page Title="" Language="C#" MasterPageFile="~/PWA_Master.Master" AutoEventWireup="true" CodeBehind="FMRRDLCREPORT.aspx.cs" Inherits="RBIDATATRACK.FMRRDLCREPORT" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
   <script type="text/javascript">
$( window ).on( "load", function() {
    
});
       function loadfraudid() {
           $("#ddlrep").empty();
           var RPT;
           var EmpCode = $("[id*=hdUserId]").val();
           var val = $("#ddl_department option:selected").val();
           if (val == 1)
           { RPT = "loadreportfraudid";}
           else if (val == 2)
           { RPT="loadDOreportfraudid"}
           else
           { alert("select report"); }
    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "FMRRDLCREPORT.aspx/getFillData",
        data: "{pageVal:'"+RPT+"', pageval1 :'', pageval2 :''}",
        dataType: "json",
        success: function (Result) {
            Result = Result.d;
               $('#ddlrep').append($("<option selected disabled></option>").val("-1").html("Select Fraud Number"));
            $.each(Result, function (key, value) {
                $('#ddlrep').append($("<option></option>").val(value.id).html(value.name));
            });
              
        }
    });
           RPT = "";
}

 function ViewAttachment() {
     var e = document.getElementById("ddlrep");
     var strUser = e.options[e.selectedIndex].value;
       var d = document.getElementById("ddl_department");
     var dousr = d.options[d.selectedIndex].value;
   //  var e = $("#ddl_department option:selected").val();
  
    if (strUser == '-1') {
        alert("Select a document");
        return;
     }
     window.open('FMRRDLCREPORT.aspx?key='+strUser+'&newkey='+dousr+'')
              
        
}
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="panel panel-default col-md-12">
        <div id="Tabs" role="tabpanel">
            <form id="Form1" class="form-horizontal row-border" action="#" runat="server">
                <div class="tab-content">
                    <div id="parent">

                        <div class="row ">
                            <div class="ma-header">
                                <div class="col-md-10">
                                   <h3 style="color: #091221"><i class="icon-user"></i>FRAUD REPORTS</h3>
                                </div>
                            </div>
                        </div>
                          <div class="form-group clonedInput">
                            <div class="col-md-10">
                                <div class="widget box" >
                                  <div class="widget-content">
                                     <div class="form-group">
                                           <label class="col-md-2 cntr-text">Report</label>
                                            <div class="col-md-4">
                                                <select class="form-control" id="ddl_department" name="blid" onchange="loadfraudid();">
                                                        <option value="-1" selected="selected" >Select Report</option>
                                                    <option value="1">FMR RDLC REPORT</option>
                                                      <option value="2">DO RDLC REPORT</option>
                                                       
                                                </select>
                                            </div>
                                         <br />
                                           <label class="col-md-2 cntr-text">Fraud Number</label>
                                         
                                         <div class="col-md-4">
                                                <select class="form-control" id="ddlrep" name="blid" onchange="get_Details()">
                                                        </select>
                                            </div>
                                      </div>
                                       <div class="form-group">
                                            <label class="col-md-2 cntr-text">ViewReport</label>                                            
                                            <div class="col-md-4">
                                                <button type="button" class="btn btn-success" id="btnView" onclick="ViewAttachment();" style="border-radius:25px;width:180px" >View</button>
                                            </div>
                                       </div>
                                      </div>
                                </div>
                            </div>
                         </div>
                    </div>
                 </div>
                <input id="hdUserId" type="hidden" runat="server"/>
  </form>
  </div>
  </div>
</asp:Content>
