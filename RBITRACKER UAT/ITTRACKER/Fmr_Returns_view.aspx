<%@ Page Title="" Language="C#" MasterPageFile="~/PWA_Master.Master" AutoEventWireup="true" CodeBehind="Fmr_Returns_view.aspx.cs" Inherits="RBIDATATRACK.Fmr_Returns_view" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
         <link href="StyleAutoComplete.css" rel="stylesheet" />
<script src="AutoCompleteJS.js"></script>
    <script src="js/Fmr_returns_view.js"></script>
     <link href="css/MultipleUpload.css" rel="stylesheet"/>
    <script src="js/MultipleUpload.js"></script>


    <script type="text/javascript" src="http://github.com/malsup/blockui/raw/master/jquery.blockUI.js?v2.34"></script>
     <script src="js/aes.js"></script>
    <style>

            .select2-container--default .select2-selection--multiple .select2-selection__choice {
    background-color: #2962ff !important;
    padding: 0px 12px !important;
    color:#ffffff !important;
}

        .select2-container .select2-selection--multiple {
    box-sizing: border-box;
    cursor: pointer;
    display: table !important;
    min-height: auto;
    user-select: none;
    -webkit-user-select: none;
    min-width: 100% !important;
}
    .pure-material-textfield-outlined {
        --pure-material-safari-helper1: rgb(var(--pure-material-primary-rgb, 33, 150, 243));
        position: relative;
        display: inline-block;
        padding-top: 7px;
        /*font-family: var(--pure-material-font, "Roboto", "Segoe UI", BlinkMacSystemFont, system-ui, -apple-system);*/
        font-size: 12px;
        line-height: 1.5;
        overflow: hidden;
        width: 100%;
        /*height: 2.3em;*/
    }

        /* Input, Textarea */
        .pure-material-textfield-outlined > input,
        .pure-material-textfield-outlined > textarea {
            box-sizing: border-box;
            margin: 0;
            border: solid 1px; /* Safari */
            border-color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.6);
            border-top-color: transparent;
            border-radius: 4px;
            padding: 5px 13px 5px;
            width: 100%;
            height: inherit;
            color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.87);
            background-color: transparent;
            box-shadow: none; /* Firefox */
            font-family: inherit;
            font-size: inherit;
            line-height: inherit;
            caret-color: rgb(var(--pure-material-primary-rgb, 33, 150, 243));
            transition: border 0.2s, box-shadow 0.2s;
        }

            /* Span */
            .pure-material-textfield-outlined > input + span,
            .pure-material-textfield-outlined > textarea + span {
                position: absolute;
                top: 0;
                left: 0;
                display: flex;
                border-color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.6);
                width: 100%;
                max-height: 80%;
                color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.6);
                font-size: 75%;
                line-height: 15px;
                cursor: text;
                transition: color 0.2s, font-size 0.2s, line-height 0.2s;
            }

                /* Corners */
                .pure-material-textfield-outlined > input + span::before,
                .pure-material-textfield-outlined > input + span::after,
                .pure-material-textfield-outlined > textarea + span::before,
                .pure-material-textfield-outlined > textarea + span::after {
                    content: "";
                    display: block;
                    box-sizing: border-box;
                    margin-top: 6px;
                    border-top: solid 1px;
                    border-top-color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.6);
                    min-width: 10px;
                    height: 8px;
                    pointer-events: none;
                    box-shadow: inset 0 1px transparent;
                    transition: border-color 0.2s, box-shadow 0.2s;
                }

                .pure-material-textfield-outlined > input + span::before,
                .pure-material-textfield-outlined > textarea + span::before {
                    margin-right: 4px;
                    border-left: solid 1px transparent;
                    border-radius: 4px 0;
                }

                .pure-material-textfield-outlined > input + span::after,
                .pure-material-textfield-outlined > textarea + span::after {
                    flex-grow: 1;
                    margin-left: 4px;
                    border-right: solid 1px transparent;
                    border-radius: 0 4px;
                }

        /* Hover */
        .pure-material-textfield-outlined:hover > input,
        .pure-material-textfield-outlined:hover > textarea {
            border-color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.87);
            border-top-color: transparent;
        }

            .pure-material-textfield-outlined:hover > input + span::before,
            .pure-material-textfield-outlined:hover > textarea + span::before,
            .pure-material-textfield-outlined:hover > input + span::after,
            .pure-material-textfield-outlined:hover > textarea + span::after {
                border-top-color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.87);
            }

            .pure-material-textfield-outlined:hover > input:not(:focus):placeholder-shown,
            .pure-material-textfield-outlined:hover > textarea:not(:focus):placeholder-shown {
                border-color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.87);
            }

        /* Placeholder-shown */
        .pure-material-textfield-outlined > input:not(:focus):placeholder-shown,
        .pure-material-textfield-outlined > textarea:not(:focus):placeholder-shown {
            border-top-color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.6);
        }

            .pure-material-textfield-outlined > input:not(:focus):placeholder-shown + span,
            .pure-material-textfield-outlined > textarea:not(:focus):placeholder-shown + span {
                font-size: inherit;
                line-height: 50px;
            }

                .pure-material-textfield-outlined > input:not(:focus):placeholder-shown + span::before,
                .pure-material-textfield-outlined > textarea:not(:focus):placeholder-shown + span::before,
                .pure-material-textfield-outlined > input:not(:focus):placeholder-shown + span::after,
                .pure-material-textfield-outlined > textarea:not(:focus):placeholder-shown + span::after {
                    border-top-color: transparent;
                }

        /* Focus */
        .pure-material-textfield-outlined > input:focus,
        .pure-material-textfield-outlined > textarea:focus {
            border-color: rgb(var(--pure-material-primary-rgb, 33, 150, 243));
            border-top-color: transparent;
            box-shadow: inset 1px 0 var(--pure-material-safari-helper1), inset -1px 0 var(--pure-material-safari-helper1), inset 0 -1px var(--pure-material-safari-helper1);
            outline: none;
        }

            .pure-material-textfield-outlined > input:focus + span,
            .pure-material-textfield-outlined > textarea:focus + span {
                color: rgb(var(--pure-material-primary-rgb, 33, 150, 243));
            }

                .pure-material-textfield-outlined > input:focus + span::before,
                .pure-material-textfield-outlined > input:focus + span::after,
                .pure-material-textfield-outlined > textarea:focus + span::before,
                .pure-material-textfield-outlined > textarea:focus + span::after {
                    border-top-color: var(--pure-material-safari-helper1) !important;
                    box-shadow: inset 0 1px var(--pure-material-safari-helper1);
                }

        /* Disabled */
        .pure-material-textfield-outlined > input:disabled,
        .pure-material-textfield-outlined > input:disabled + span,
        .pure-material-textfield-outlined > textarea:disabled,
        .pure-material-textfield-outlined > textarea:disabled + span {
            border-color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.38) !important;
            border-top-color: transparent !important;
            color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.38);
            pointer-events: none;
        }

            .pure-material-textfield-outlined > input:disabled + span::before,
            .pure-material-textfield-outlined > input:disabled + span::after,
            .pure-material-textfield-outlined > textarea:disabled + span::before,
            .pure-material-textfield-outlined > textarea:disabled + span::after {
                border-top-color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.38) !important;
            }

            .pure-material-textfield-outlined > input:disabled:placeholder-shown,
            .pure-material-textfield-outlined > input:disabled:placeholder-shown + span,
            .pure-material-textfield-outlined > textarea:disabled:placeholder-shown,
            .pure-material-textfield-outlined > textarea:disabled:placeholder-shown + span {
                border-top-color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.38) !important;
            }

                .pure-material-textfield-outlined > input:disabled:placeholder-shown + span::before,
                .pure-material-textfield-outlined > input:disabled:placeholder-shown + span::after,
                .pure-material-textfield-outlined > textarea:disabled:placeholder-shown + span::before,
                .pure-material-textfield-outlined > textarea:disabled:placeholder-shown + span::after {
                    border-top-color: transparent !important;
                }

    /* Faster transition in Safari for less noticable fractional font-size issue */
    @media not all and (min-resolution:.001dpcm) {
        @supports (-webkit-appearance:none) {
            .pure-material-textfield-outlined > input,
            .pure-material-textfield-outlined > input + span,
            .pure-material-textfield-outlined > textarea,
            .pure-material-textfield-outlined > textarea + span,
            .pure-material-textfield-outlined > input + span::before,
            .pure-material-textfield-outlined > input + span::after,
            .pure-material-textfield-outlined > textarea + span::before,
            .pure-material-textfield-outlined > textarea + span::after {
                transition-duration: 0.1s;
            }
        }
    }
</style>

<style>
    .myAlert-top {
        position: fixed;
        top: 10%;
        left: 8%;
        width: 90%;
    }

    .myAlert-bottom {
        position: fixed;
        bottom: 10%;
        left: 5%;
        width: 90%;
    }

    .alert {
        display: none;
    }
</style>

<style>
    .block-ui {
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: black;
        opacity: 0.75;
        display: flex;
        text-align: center;
        z-index: 1100;
    }

        .block-ui .loading:after {
            content: " ";
            background: black;
            opacity: 0.4;
            pointer-events: none;
            border-radius: 4px;
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
        }

        .block-ui .loading .loaderwait {
            display: none;
            margin: auto;
            width: 50px;
            height: 30px;
            text-align: center;
            font-size: 10px;
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: 1100;
            display: block;
        }

            .block-ui .loading .loaderwait div {
                background-color: white;
                height: 100%;
                width: 6px;
                display: inline-block;
                animation: stretchdelay 1.2s infinite ease-in-out;
            }

            .block-ui .loading .loaderwait .rect2 {
                animation-delay: -1.1s;
            }

            .block-ui .loading .loaderwait .rect3 {
                animation-delay: -1s;
            }

            .block-ui .loading .loaderwait .rect4 {
                animation-delay: -0.9s;
            }

            .block-ui .loading .loaderwait .rect5 {
                animation-delay: -0.8s;
            }

            .block-ui .loading .loaderwait.load2 .loader2 {
                display: block;
            }

            .block-ui .loading .loaderwait.load3 .loader3 {
                display: block;
            }

            .block-ui .loading .loaderwait.load4 .loader4 {
                display: block;
            }

        .block-ui.clear {
            animation: dissappear 1s 1;
            -webkit-animation-fill-mode: forwards;
            animation-fill-mode: forwards;
        }

        .block-ui .loading-info {
            margin: auto;
            align-content: center;
            align-items: center;
            align-self: center;
        }

            .block-ui .loading-info .loading-text {
                display: block;
            }

                .block-ui .loading-info .loading-text .text {
                    margin: 0 0 2em 0;
                    position: relative;
                    z-index: 9;
                    color: white;
                }

                .block-ui .loading-info .loading-text button {
                    margin-top: 15px;
                    position: relative;
                    z-index: 9;
                }

    @keyframes stretchdelay {
        0%, 40%, 100% {
            transform: scaleY(0.4);
        }

        20% {
            transform: scaleY(1);
        }
    }

    @keyframes dissappear {
        0% {
            opacity: 1;
        }

        99% {
            opacity: 0;
            display: none;
            width: 100%;
            height: 100%;
            margin-top: 0;
            margin-left: 0;
        }

        100% {
            width: 0;
            height: 0px;
            margin-top: -100000px;
            margin-left: -100000000px;
        }
    }
</style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="row">
  <div class="col-12">
    <div class="card card-5 rightmarg"> 
      <form class="form-horizontal" runat="server" method="post" enctype="multipart/form-data">    
       <div class="card-body">
           <div class="container">
                        <div class="row ">
                            <div class="ma-header">
                                <div class="col-md-12">
                                    <h3 class="text-center"; style="color: #010024;"><i class=""></i>FMR RETURNS</h3>
                                </div>
                            </div>
                        </div>
           </div>
           <div class="container">

            <div class="row" id="row1">
             <div class="col-md-5">
               <div class="form-group">
                 <label for="year">Year : <span class="text-danger">*</span></label>
                  <div class="div-select-dark">
                       <select class="form-control select2" id="ddlyear" style="width: 100%" name="year" onchange="">
                    <option value="-1">Select Year</option>
                </select>
                  </div>
               </div>
             </div>

             <%--<div class="row" >--%>
             <div class="col-md-5">
              <div class="form-group">
                 <label for="ddlmonth">Month : <span class="text-danger">*</span></label>
                   <div class="div-select-dark">
                     <select class="form-control select2" id="ddlMonth" style="width: 100%" name="month" onchange="">
                    <option value="-1">Select Month</option>
                          </select>
                   </div>
              </div>
             </div>
          <%--</div>--%>

           </div>

           <div class="row" id="row2">
             <div class="col-md-5">
              <div class="form-group">
                 <label for="ddlcategory">FMR : <span class="text-danger">*</span> </label>
                   <div class="div-select-dark">
                      <select class="select-light" id="ddlfmr" style="width: 100%" name="fmr" onchange="">
                    <option value="-1">Select FMR</option>
                    <option value="1">FMR 1</option>
                    <option value="2">FMR 2</option>
                    <option value="3">FMR 3</option>

                          </select>
                   </div>
              </div>
             </div>

                <div class="col-md-3 col-sm-1 col-xs-4"><br/>
                        <a href="#" class="btn btn-sm animated-button thar-one btn-primary" style="width: 100%; margin: 5px;"
                            onclick="getDataTableHeader();" id="get_rpt"><i class="fa fa-thumbs-up"></i>GET REPORT</a>
                    </div>
                </div>


          <div class="row">
                    <div class="col-md-4">

                    <input class="form-control" id="searchInput" style="width: 50% !important" placeholder="Search rows..." onkeypress="searchTable()" onkeyup="searchTable()" onkeydown="searchTable()" onchange="searchTable()" />
                    <span id="RowCount" style="font-size: 8px; z-index: 1 !important"></span>
                </div>
                  <div class="col-md-4">
                    <div style="display: flex; justify-content: center; align-items: center; align-content: center;">
                        <h3 id="Loading" style="display: none">Loading...!</h3>
                    </div>
                </div>
                 <div class="col-md-4 right" style="text-align: right !important">
                    <button class="btn btn-success" id="GetReport" onclick="excelreport()" style="width: auto !important">Export</button>
                </div>
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
       
                <div class="row">
<%--               <div class="col-md-2 col-sm-2 col-xs-4">
                        <a href="#" class="btn btn-sm animated-button thar-one btn-primary" style="width: 100%; margin: 5px;"
                            onclick="RequestConfirm();" id="btnSubmit"><i class="fa fa-thumbs-up"></i>Confirm</a>
                    </div>--%>
             <div class="col-md-2 col-sm-2 col-xs-4">
                        <a href="#" class="btn btn-sm animated-button thar-one btn-red" style="width: 100%; margin: 5px;"
                            onclick="frmExit();"><i class="fa fa-sign-out-alt"></i>Exit</a>
                    </div>
                    </div>
               <div>

               </div>

 

            </div>
                    </form>

           </div>

       </div>
      </div>
  
  
    <input id="hdUserId" type="hidden" runat="server"/>
        <input id="hdBranchId" type="hidden" runat="server"/>
        <input id="hdFirmId" type="hidden" runat="server"/>
     <input id="hdSesssion" type="hidden" runat="server"/>
     <input id="hdNoteID" type="hidden" runat="server"/>
    <input id="hddpt_id" type="hidden" runat="server"/>
    <input id="hdpst_id" type="hidden" runat="server"/>
    <input id="Hd_fraudId" type="hidden" runat="server"/>
</asp:Content>
