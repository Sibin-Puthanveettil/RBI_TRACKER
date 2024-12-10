<%@ Page Title="" Language="C#" MasterPageFile="~/PWA_Master.Master" AutoEventWireup="true" CodeBehind="Index.aspx.cs" Inherits="RBIDATATRACK.Index" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
   <%--<script src="js/chart.js"></script>--%>
    <script src="js/indexDashBoard.js?v=2"></script>
<%--      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">--%>
    <style>

/* Style the tab */
.tab1 {
  overflow: hidden;
  border: 1px solid #ccc;
  background-color: #f1f1f1;
}

/* Style the buttons inside the tab */
.tab1 button {
  background-color: inherit;
  float: left;
  border: none;
  outline: none;
  /*cursor: pointer;*/
  padding: 14px 16px;
  transition: 0.3s;
  font-size: 17px;
}

/* Change background color of buttons on hover */
.tab1 button:hover {
  background-color: #ddd;
}

/* Create an active/current tablink class */
.tab button.active {
  background-color: #ccc;
}

/* Style the tab content */
.tabcontent1 {
  display: none;
  padding: 6px 12px;
  border: 1px solid #ccc;
  border-top: none;
}
</style>
    <script>
        document.getElementById("London").click();
function openCity(evt, cityName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent1");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks1");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
        }
    function loadPopup()
    {
          $.ajax({
                type: "GET",
                url: "CreateNote.aspx"
          }).done(function(data) {
                $('body').append($(data).popup());
                $('#popup1').popup('open');
          });
    }
</script>
   
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">


<%--<div class="row">

<div class="col-lg-3 col-md-6">
<div class="card card-hover card-5 rightmarg bg-green animated bounceIn" style="cursor: pointer;">            
<div class="card-body text-white">
<div class="d-flex flex-row">
<div class="display-6 align-self-center"><i class="fa fa-folder-open fa-2x"></i></div>
<div class="p-10 align-self-center">
</div>
<div class="ml-auto align-self-center">
<h2 class="font-medium m-b-0" id="alertPending"  runat="server"></h2>
<span>Pending</span>
</div>
</div>
</div>
</div>
</div>


<div class="col-lg-3 col-md-6">
<div class="card card-hover card-5 rightmarg bg-info animated bounceIn"  style="cursor: pointer;">            
<div class="card-body text-white">
<div class="d-flex flex-row">
<div class="display-6 align-self-center"><i class="fa fa-check-square fa-2x"></i></div>
<div class="p-10 align-self-center">
</div>
<div class="ml-auto align-self-center">
<h2 class="font-medium m-b-0" id="alertComplete"></h2>
<span>Completed</span>
</div>
</div>
</div>
</div>
</div>


<div class="col-lg-3 col-md-6">
<div class="card card-hover card-5 rightmarg bg-danger animated bounceIn" style="cursor: pointer;">            
<div class="card-body text-white">
<div class="d-flex flex-row">
<div class="display-6 align-self-center"><i class="fa fa-exclamation-circle fa-2x"></i></div>
<div class="p-10 align-self-center">
</div>
<div class="ml-auto align-self-center">
<h2 class="font-medium m-b-0" id="alertReject"></h2>
<span>Rejected</span>
</div>
</div>
</div>
</div>
</div>


<div class="col-lg-3 col-md-6">
<div class="card card-hover card-5 rightmarg bg-warning animated bounceIn" style="cursor: pointer;">            
<div class="card-body text-white">
<div class="d-flex flex-row">
<div class="display-6 align-self-center"><i class="fa fa-rss fa-2x"></i></div>
<div class="p-10 align-self-center">
</div>
<div class="ml-auto align-self-center">
<h2 class="font-medium m-b-0" id="alertNotify"></h2>
<span>Notifications</span>
</div>
</div>
</div>
</div>
</div>
</div>--%>

<%--<div class="row">--%>


<%--<div class="col-md-4">
<div class="card card-5 animated bounceIn">  
<div class="loaderColor">
<div class="loaderColor--dot"></div>
<div class="loaderColor--dot"></div>
<div class="loaderColor--dot"></div>
<div class="loaderColor--dot"></div>
<div class="loaderColor--dot"></div>
<div class="loaderColor--dot"></div>
<div class="loaderColor--text"></div>
</div>
<%--<div class="table-responsive vh-60">
<table class="table1 table-hover" id="tblFundDtlAlert" > 
</table> 
</div>--%>
<%--<div class="card-header">
NOTIFICATION
</div>
    <!--notification Start-->
<section class="panel vh-60  scrollable">

<div class="panel-body" id="notifyDiv">

</div>
<div class="panel-body" style="display: none;" id="notifyEmptyDiv">
<%--<div style="font-size: 18px; text-align: center;"><i class="fa fa-bell fa-5x" aria-hidden="true" style="opacity: 0.5;"></i></div>--%>
<%--<div style="font-size: 18px; text-align: center;padding-top: 40%;">    <h5>You don't have any notifications right now...!</h5></div>--%>
<%--    <div style="font-size: 12px; text-align: center;">Notifications about your Notes will show up here...</div>--%>
<%--</div>
 </section>
    <!--notification end-->
</div>  
</div>
  --%>
<%--<div class="col-md-4">
<div class="card card-5 animated bounceIn">  
<div class="loaderColor">
<div class="loaderColor--dot"></div>
<div class="loaderColor--dot"></div>
<div class="loaderColor--dot"></div>
<div class="loaderColor--dot"></div>
<div class="loaderColor--dot"></div>
<div class="loaderColor--dot"></div>
<div class="loaderColor--text"></div>
</div>
<div class="card-header">
Action List
</div>
    <!--alerts Start-->
<section class="panel vh-60  scrollable">
<div class="panel-body" id="alertDiv">


</div>
<div class="panel-body" style="display: none;" id="alertEmptyDiv">
<div style="font-size: 18px; text-align: center;"><i class="fa fa-exclamation-triangle fa-5x" aria-hidden="true" style="opacity: 0.5;"></i></div>
<div style="font-size: 18px; text-align: center;padding-top: 40%;">    <h5>You don't have any alerts right now...!</h5></div>
    <div style="font-size: 12px; text-align: center;">Your pending Approvals will appear here...</div>
</div>
 </section>
    <!--alerts end-->
</div>  
</div>--%>

<%--<div class="col-md-4" id="pi1">
<div class="card card-5 animated bounceIn">  
<div class="loaderColor">
<div class="loaderColor--dot"></div>
<div class="loaderColor--dot"></div>
<div class="loaderColor--dot"></div>
<div class="loaderColor--dot"></div>
<div class="loaderColor--dot"></div>
<div class="loaderColor--dot"></div>
<div class="loaderColor--text"></div>
</div>
<div class="card-header">
CREATOR 
</div>
<section class="panel vh-60  scrollable">
<%--<div class="card-body analytics-info">
<h4 class="card-title"></h4>--%>
<%--<div class="panel-body" id="graphDiv">
<div id="basic-pie1" style="height:390px;" ></div>
</div>
<div class="panel-body" style="display: none;" id="graphEmptyDiv">
<%--<div style="font-size: 18px; text-align: center;"><i class="fa fa-chart-pie fa-5x" aria-hidden="true" style="opacity: 0.5;"></i></div>--%>
<%--<div style="font-size: 18px; text-align: center;padding-top: 40%;"><h5>You don't have permission to view Graph...!</h5></div>
<div style="font-size: 12px; text-align: center;">Your work flow graph will appear here...</div>
</div> --%>
<%--</div>--%>
<%--
</section>
</div>  
</div>


    <div class="col-md-4" id="pi2">
<div class="card card-5 animated bounceIn">  
<div class="loaderColor">
<div class="loaderColor--dot"></div>
<div class="loaderColor--dot"></div>
<div class="loaderColor--dot"></div>
<div class="loaderColor--dot"></div>
<div class="loaderColor--dot"></div>
<div class="loaderColor--dot"></div>
<div class="loaderColor--text"></div>
</div>



<div class="card-header">
REVIEWER 
</div>
<section class="panel vh-60  scrollable">
<%--<div class="card-body analytics-info">
<h4 class="card-title"></h4>--%>
<%--<div class="panel-body" id="graphDiv1">
<div id="basic-pie2" style="height:390px;" ></div>
</div>
<div class="panel-body" style="display: none;" id="graphEmptyDiv1">
<%--<div style="font-size: 18px; text-align: center;"><i class="fa fa-chart-pie fa-5x" aria-hidden="true" style="opacity: 0.5;"></i></div>--%>
<%--<div style="font-size: 18px; text-align: center;padding-top: 40%;"><h5>You don't have permission to view Graph...!</h5></div>
<div style="font-size: 12px; text-align: center;">Your work flow graph will appear here...</div>
</div>
</section>
</div>  
</div>



<%------------------------------------------------------------------------%>



<%------------------------------------------------------------------------%>

   <%-- </div>>--%>

<div id="theModal" class="modal fade text-center">
    <div class="modal-dialog">
      <div class="modal-content">
      </div>
    </div>
  </div>
<input id="hdUserId" type="hidden" runat="server"/>
        <input id="hdBranchId" type="hidden" runat="server"/>
        <input id="hdFirmId" type="hidden" runat="server"/>
    <input id="hdnNotifyCount" type="hidden" runat="server"/>
    <input id="hdnAlertCount" type="hidden" runat="server"/>
</asp:Content>
