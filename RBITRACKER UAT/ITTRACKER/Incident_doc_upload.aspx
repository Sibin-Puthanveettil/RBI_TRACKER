<%@ Page Title="" Language="C#" MasterPageFile="~/PWA_Master.Master" AutoEventWireup="true" CodeBehind="Incident_doc_upload.aspx.cs" Inherits="RBIDATATRACK.Incident_doc_upload" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="js/Incident_doc_upld.js"></script>
    <%-- <link href="StyleAutoComplete.css" rel="stylesheet" />
<script src="AutoCompleteJS.js"></script>--%>
 
    
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
                                    <h3 class="text-center"; style="color: #010024;"><i class=""></i>FMR-1 DOCUMENT UPLOAD</h3>
                                </div>
                            </div>
                        </div>
               </br>

           </div>
           <div class="container">

            <div class="row" id="row1">
                        <div class="col-md-5">
               <div class="form-group">
                 <label for="ddlfraud">Fraud : </label>
                  <div class="div-select-dark">
                       <select class="form-control select2" id="ddlfraud" style="width: 100%" name="fraud" onchange="get_fraud_dtls();">
                    <option value="-1">Select Fraud</option>
                </select>
                  </div>
               </div>
             </div>

                    <div class="col-md-5">
               <div class="form-group">
                 <label for="txtbranch">Branch: </label>
                  <label class="pure-material-textfield-outlined">
                <input type="text" placeholder=" "id="txtbranch" title="Branch" maxlength="199" readonly="readonly"/>
                 <span>Branch</span>
                </label>
               </div>
             </div>


           </div>

           <div class="row" id="row2">
                 
                    <div class="col-md-5">
               <div class="form-group">
                 <label for="txtfraud">Fraud Type: </label>
                  <label class="pure-material-textfield-outlined">
                <input type="text" placeholder=" "id="txtfraud" title="Fraud_Type" maxlength="199" readonly="true" />
                 <span>Fraud Type</span>
                </label>
               </div>
             </div>
               
                  <div class="col-md-5">
               <div class="form-group">
                 <label for="txtzone">Zone name: </label>
                  <label class="pure-material-textfield-outlined">
                <input type="text" placeholder=" "id="txtzone" title="Zone_name" maxlength="199" readonly="true" />
                 <span>Zone name</span>
                </label>
               </div>
             </div>


                </div>
                         
            <div class="row" id="row3">
             <div class="col-md-5">
               <div class="form-group">
                 <label for="ddlname">Total Loss Amount </label>
                  <label class="pure-material-textfield-outlined">
                <input type="text" placeholder=" " id="txtamt" title="Fraud_amt" maxlength="199" readonly="true" />
                 <span>Enter Amount</span>
                </label>
               </div>
             </div>

             <div class="col-md-5">
               <div class="form-group">
                 <label for="ddlname">Irregularity: </label>
                  <label class="pure-material-textfield-outlined">
                <input type="text" placeholder=" "id="txtirreglar" title="irreglarity" maxlength="199" readonly="true" />
                 <span>Irregularity</span>
                </label>
               </div>
             </div>
  


               </div>
            <div class="row" id="row4">

             <div class="col-md-5">
               <div class="form-group">
                 <label for="txtdate">Date Of Reporting: </label>
                  <label class="pure-material-textfield-outlined">
                <input type="text" placeholder=" "id="txtdate" title="irreglarity" maxlength="199" readonly="true" />
                 <span>Irregularity</span>
                </label>
               </div>
             </div>

          </div>
                             <div class="row" id="row5">
                                       <div class="col-md-10">
                 <label for="ddlatt2">Fraud Details</label>
                        <label class="pure-material-textfield-outlined">

                            <textarea rows="1" cols="13" name="txtdesc" id="txtdescription" title="description" readonly="true"></textarea>
                            <span>Fraud Details</span>
                        </label>

                    </div>
                   </div>
                              


                               <h5><u>Attach Documents</u></h5><br>
                <div class="form-group col-md-10 padding-bottom-10px row" id="parallelrow">
                    <div class="form-group col-md-2 align-right">
                        <label for="rdbNature">Attach Document: </label>
                    </div>
                    <div class="file-upload col-md-4">
                        <div class="file-select">
                            <div class="file-select-button" id="fileName">Choose File</div>
                            <div class="file-select-name" id="noFile">No file chosen...</div>
                            <div class="file-chooser">
                                <input type="file" class="file-chooser__input">
                            </div>
                        </div>
                    </div>
                    <div class="file-uploader__message-area">
                        <p>Select a file to upload</p>
                    </div>

                </div>

 
                <div class="row">
               <div class="col-md-2 col-sm-2 col-xs-4">
                        <a href="#" class="btn btn-sm animated-button thar-one btn-primary" style="width: 100%; margin: 5px;"
                            onclick="RequestConfirm();" id="btnSubmit"><i class="fa fa-thumbs-up"></i>Confirm</a>
                    </div>
             <div class="col-md-2 col-sm-2 col-xs-4">
                        <a href="#" class="btn btn-sm animated-button thar-one btn-red" style="width: 100%; margin: 5px;"
                            onclick="frmExit();"><i class="fa fa-sign-out-alt"></i>Exit</a>
                    </div>
                    </div>
               <div>

               </div>

                 <%--Modal--%>
 
    <div class="modal fade" id="myModal" tabindex="-1" role="dialog">
<div class="modal-dialog" role="document">
<div class="modal-content">
<div class="modal-header" style="background-color: #424242; color: white">
<h5 class="modal-title" style="color: white">Fraud Type</h5>
 
                </div>
<div class="modal-body">
<textarea id="addRemark" class="form-control" placeholder="Enter remark" oninput="return ingoreSymbols(this.value)"></textarea>
</div>
<div class="modal-footer">
 
 
                    <button type="button" class="btn btn-success" id="add-remark" style="width: auto" onclick="addremark()">Ok</button>
<button type="button" class="btn btn-danger" id="Close" data-dismiss="modal" style="width: auto">Close</button>
 
                </div>
</div>
</div>
</div>
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
