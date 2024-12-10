<%@ Page Title="" Language="C#" MasterPageFile="~/PWA_Master.Master" AutoEventWireup="true" CodeBehind="Fraud_Reports.aspx.cs" Inherits="RBIDATATRACK.Fraud_Reports" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
   <script type="text/javascript">
$( window ).on( "load", function() {
     
});
    


 function ViewAttachment() {
     var e = document.getElementById("ddl_department");
     var strUser = e.options[e.selectedIndex].value;
   //  var e = $("#ddl_department option:selected").val();
   
    if (strUser == '-1') {
        alert("Select a document");
        return;
     }
     window.open('Fraud_Report_Rdlc.aspx?key='+strUser+'')
  

                
        
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
                                           <label class="col-md-2 cntr-text">Department</label>
                                            <div class="col-md-4">
                                                <select class="form-control" id="ddl_department" name="blid" onchange="get_Details()">
                                                        <option value="-1" selected="selected" >--Select--</option>
                                                    <option value="1"  >Frauds Outstanding</option>
                                                    <option value="2"  >Category wise classification of frauds reported during the quarter</option>
                                                    <option value="3"  >Perpetrator wise classification of frauds reported during the quarter </option>
                                                  
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
