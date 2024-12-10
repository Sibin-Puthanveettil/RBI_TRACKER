<%@ Page Title="" Language="C#" MasterPageFile="~/PWA_Master.Master" AutoEventWireup="true" CodeBehind="Incident_doc_verify.aspx.cs" Inherits="RBIDATATRACK.Incident_doc_verify" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
<%--        <script src="js/Incident_doc_verify.js + "new Date().getTime()"></script>--%>
        <script src="js/Incident_doc_verify.js" + "new Date().getTime()"></script>

     <style>
        .alert-info {
            width: 100% !important;
            padding: 0 0 0 12px !important;
            border-radius: 8px !important;
            font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
            font-weight: 800 !important;
            height: auto !important;
        }


        thead {
            font-weight: bolder !important;
            position: sticky !important;
            top: 0 !important;
            z-index: 0 !important;
        }

        #FrmDt, #ToDt {
            cursor: pointer;
        }
      

        #card {
            width: 100% !important;
            background-color: #f3f3f3 !important;
            padding: 20px !important;
            height: auto !important;
        }

        .form-control {
            height: 38px !important;
            background-color: white !important;
            color: black !important;
            width: 100% !important;
        }

        .row {
            padding: 4px !important;
        }

        .rpt {
            height: 38px !important;
            width: auto !important;
        }
       
        hr {
            border-color: white !important;
            border-width: thick !important;
        }
 $loader-width: 250px;
 $loader-dot-size: 20px;

.container {
  height: 100vh;
  width: 100vw;
  font-family: Helvetica;
}

         .loaderColorCont {
             flex: 1 1 auto;
             background: #f3f3f3 !important;
             height: 20px;
             width: 250px;
             position: absolute;
             top: 0;
             bottom: 0;
             left: 0;
             right: 0;
             margin: auto;
         }

.loader {
   background:#f3f3f3 !important;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}

.loader--dot {
  border-radius: 100%;
  background-color: black;
  position: absolute;
  border: 2px solid white;
                            }

  &:first-child {
    background-color: #8cc759;
    animation-delay: 0.5s;
  }

  &:nth-child(2) {
    background-color: #8c6daf;
    animation-delay: 0.4s;
  }

  &:nth-child(3) {
    background-color: #ef5d74;
    animation-delay: 0.3s;
  }

  &:nth-child(4) {
    background-color: #f9a74b;
    animation-delay: 0.2s;
  }

  &:nth-child(5) {
    background-color: #60beeb;
    animation-delay: 0.1s;
  }

  &:nth-child(6) {
    background-color: #fbef5a;
    animation-delay: 0s;
  }


         .loader--text {
             position: absolute;
             top: 200%;
             left: 0;
             right: 0;
             width: 4rem;
             margin: auto;
         }

  &:after {
    content: "Loading";
    font-weight: bold;
    animation: loading-text 3s infinite;
  }


@keyframes loader {
  15% {
    transform: translateX(0);
  }

  45% {
    transform: translateX(calc(#{$loader-width} - #{$loader-dot-size}));
  }

  65% {
    transform: translateX(calc(#{$loader-width} - #{$loader-dot-size}));
  }

  95% {
    transform: translateX(0);
  }
}

@keyframes loading-text {
  0% {
    content: "Loading";
  }

  25% {
    content: "Loading.";
  }

  50% {
    content: "Loading..";
  }

  75% {
    content: "Loading...";
  }
}

    </style>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
     

    <div class="container-fluid" id="containerFluid" style="width: 100% !important; padding: 20px !important">

        <div class="ma-header">
            <div class="alert-info">
                <h2 style="width: auto !important" id="Heading"><i class="icon icon-file"></i>&nbsp FMR-1 DOCUMENT VERIFICATION</h2>
            </div>
        </div>

        <div id="card">

            <div class="row">

                             <div class="col-md-2 dateField" id="FrmDiv">

                    <input class="form-control" type="text" id="ddlfrmdt" readonly="true" placeholder="Select From Date" />

                </div>


                <div class="col-md-2 dateField" id="ToDiv">

                    <input class="form-control" type="text" id="ddltodt" readonly="true" placeholder="Select To Date" />

                </div>
                                       <%--  <div class="col-md-5">
               <div class="form-group">
                 <label for="ddldate">From Date: <span class="text-danger">*</span></label>
                  <label class="pure-material-textfield-outlined">
                <input type="text" placeholder=" "id="ddlfrmdt" title="TarDt" readonly= "true" />
                 <span>Select Date...</span>
                </label>
               </div>
             </div>

            <div class="col-md-5">
               <div class="form-group">
                 <label for="ddldate">To Date: <span class="text-danger">*</span></label>
                  <label class="pure-material-textfield-outlined">
                <input type="text" placeholder=" "id="ddltodt" title="TarDt" readonly= "true" />
                 <span>Select Date...</span>
                </label>
               </div>
             </div>--%>
                     <div class="col-md-1 col-sm-2 col-xs-4">

                    <button class="btn btn-info" role="button" style="width: 100%;" onclick="load_incident();">View</button>
                </div>
   
                     <div class="col-md-2 " id="nothing">


                </div>

                <div class="col-md-3 align-right">

                    <select class="form-control " id="ddlincident" data-toggle="tooltip" title="Choose Fraud..." onchange="getDataTableHeader()">
                    </select>

                </div>
<%--                <div class="col-md-3">

                    <select class="form-control" id="ReportType"  data-toggle="tooltip" title="Choose Report Type" onchange="ChangeReportType(this.value)">
                        <option value="1">KYC DETAILS</option>
                        <option value="2">LOAN DOCUMENTS</option> 

                    </select>

                </div>--%>


   






           

                <%--    <div class="Loading" id="Loading">

                <p>Loading...</p>

            </div>--%>
            </div>


            <hr />



            <div class="row">
                    <div class="col-md-3">

                    <input class="form-control" id="searchInput" style="width: 50% !important" placeholder="Search rows..." onkeypress="searchTable()" onkeyup="searchTable()" onkeydown="searchTable()" onchange="searchTable()" />
                    <span id="RowCount" style="font-size: 8px; z-index: 1 !important"></span>
                </div>
                  <div class="col-md-3">
                    <div style="display: flex; justify-content: center; align-items: center; align-content: center;">
                        <h3 id="Loading" style="display: none">Loading...!</h3>
                    </div>
                </div>
                                  <div class="col-md-3">
        <%--     <div class="loaderColorCont" id="Loading" style="display: none">
            <div class="loaderColorCont--dot"></div>
            <div class="loaderColorCont--dot"></div>
            <div class="loaderColorCont--dot"></div>
            <div class="loaderColorCont--dot"></div>
            <div class="loaderColorCont--dot"></div>
            <div class="loaderColorCont--dot"></div>
            
        </div>--%>
</div>
                   <div class="col-md-3 right" style="text-align: right !important">
                    <button class="btn btn-success" id="GetReport" onclick="excelreport()" style="width: auto !important">Export</button>
                </div>
                </div>

            <div class="row">
                <div class="col-md-12" style="background-color: white !important; border-radius: 12px !important; box-shadow: inset -1px -1px 12px -1px rgba(0,0,0,1); padding: 20px">
                    <div class="table-responsive" style="overflow: auto; height: 450px; width: 100%;">
                        <table class="table table-hover table-bordered w3-table-all" id="table-report" style="text-align: center; position: relative;">

                        </table>
                    </div>
                </div>
            </div>
        </div>
              <div class="col-md-2 col-sm-2 col-xs-4">
                        <a href="#" class="btn btn-sm animated-button thar-one btn-red" style="width: 100%; margin: 5px;"
                            onclick="frmExit();"><i class="fa fa-sign-out-alt"></i>Exit</a>
                    </div>
    </div>

  <input id="hdUserId" type="hidden" runat="server"/>
        <input id="hdBranchId" type="hidden" runat="server"/>
        <input id="hdFirmId" type="hidden" runat="server"/>
     <input id="hdSesssion" type="hidden" runat="server"/>
     <input id="hdNoteID" type="hidden" runat="server"/>
    <input id="hddpt_id" type="hidden" runat="server"/>
    <input id="hdpst_id" type="hidden" runat="server"/>
    <input id="Hd_fraudId" type="hidden" runat="server"/></asp:Content>
