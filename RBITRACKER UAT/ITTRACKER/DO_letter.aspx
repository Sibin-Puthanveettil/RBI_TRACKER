<%@ Page Title="" Language="C#" MasterPageFile="~/PWA_Master.Master" AutoEventWireup="true" CodeBehind="DO_Letter.aspx.cs" Inherits="RBIDATATRACK.DO_Letter" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="StyleAutoComplete.css" rel="stylesheet"/>
<script src="AutoCompleteJS.js"></script>
    <script src="js/DOLetter.js" + "new Date().getTime()"></script>
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
    .textboxclass {
    height: 10px;
    width: 80px;
     }
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
        0%, 40%, 100% 
        {
            transform: scaleY(0.4);
        }
        20% 
        {
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
                     <div class="col-md-12 align-content-md-center" >
                         <h3 style="color: #008cff; left:45px;">DO LETTER</h3>
                     </div>
                 </div>
             </div>
           </div>

              <div class="container">
              <br/>
               <div class="row col-md-12">
                <div class="row col-md-4 align-content-md-center ">
                 <label for="ddlbranch">DO Letter : <span class="text-danger">*</span></label>
                    </div>
                   <div class="col-md-4 align-left">
                       <select class="form-control select2" id="ddlletter" style="width: 150%"  onchange="ddldoletter(this);">
                           <option value="-1">Select </option>
                           <option value="1">New DO Letter </option>
                           <option value="2">Pending DO Letter </option>
                  </select>
                  </div>
                 </div>
                  <br />
                     <div class="row col-md-12" style="display:none" id="pendingvisb">
                <div class="row col-md-4 align-content-md-center ">
                 <label for="ddlbranch">Pending DO Letter : <span class="text-danger">*</span></label>
                    </div>
                   <div class="col-md-4 align-left">
                       <select class="form-control select2" id="ddlpending" style="width: 150%"  onchange="ddlpendingletter(this);" >
                   </select>
                  </div>
                 </div>
                  <br/>
                       <div class="row col-md-12" style="display:none" id="fraudidvisb">
                <div class="row col-md-4 align-content-md-center ">
                 <label for="ddlbranch">Fraud Details : <span class="text-danger">*</span></label>
                    </div>
                   <div class="col-md-4 align-left">
                       <select class="form-control select2" id="ddlfraudid" style="width: 150%"  onchange="ddlfraudidchng(this);" >
                          
                  </select>
                  </div>
                 </div>
               <br/>
           </div>
             <div class="container" style="display:none" id="visb">
           
           <div class="row" style="display:none" >
             <div class="col-md-5">
              <div class="form-group">
                 <label for="ddlfrn">Fraud ID: <span class="text-danger">*</span></label>
                  <label class="pure-material-textfield-outlined">
                  <input type="text" readonly placeholder=" "id="fraud_id" maxlength="10" onkeypress="return isNumberKey(event)" oninput="this.value = this.value.replace(0-9);"  />
                 <span>Fraud ID</span>
                </label>
              </div>
             </div>  
               <div class="col-md-5" id="hid0" style="display:none">
              <div class="form-group">
                 <label for="ddlfrn">Edited Fraud ID: <span class="text-danger">*</span></label>
                  <label class="pure-material-textfield-outlined">
                  <input type="text" id="efraud_id"   disabled="disabled"  />
                 <span>Fraud Number</span>
                </label>
              </div>
             </div>
                    </div>
                <div class="row" >
                  <div class="col-md-5">
              <div class="form-group">
                 <label for="ddlfrn">Fraud Number: <span class="text-danger">*</span></label>
                  <label class="pure-material-textfield-outlined">
                  <input type="text" placeholder=" "id="fraud_num" disabled="disabled" readonly maxlength="10"  onkeypress="return isNumberKey(event)" oninput="this.value = this.value.replace(0-9);"  />
                 <span>Can't Enter Fraud Number</span>
                </label>
              </div>
             </div>
                
                 <div class="col-md-5" id="hid1" style="display:none">
              <div class="form-group">
                 <label for="ddlfrn">Edited Fraud Number: <span class="text-danger">*</span></label>
                  <label class="pure-material-textfield-outlined">
                  <input type="text" id="efraud_num"   disabled="disabled"  />
                 <span>Fraud Number </span>
                </label>
              </div>
             </div>
         </div>
           
            <div class="row" >
               <div class="col-md-5">
                 <div class="form-group">
                  <label for="amn_inv">Amount involved: <span class="text-danger">*</span></label>
                  <label class="pure-material-textfield-outlined">
                  <input type="text" placeholder=" "id="amount_inv" maxlength="15"  onkeypress="return isNumberKey(event)" maxlength="12" oninput="this.value = this.value.replace(0-9);"/>
                  <span>Amount involved</span>
                  </label>
                 </div>
               </div>
                   <div class="col-md-5" id="hid2" style="display:none">
                 <div class="form-group">
                 <label for="ddlfrn">Edited Amount involved: <span class="text-danger">*</span></label>
                  <label class="pure-material-textfield-outlined">
                  <input type="text" id="eamount_inv"  disabled="disabled"  />
                 <span>Amount involved</span>
                </label>
              </div>
             </div>
            </div>

            <div class="row" >
             <div class="col-md-5">
             <div class="form-group">
                 <label for="amn_inv">Nature of Fraud: <span class="text-danger">*</span></label>
                 <div class="div-select-dark">
                     <select class="form-control select2" id="name_fraud" style="width: 100%" >
                     </select>
                  </div>
               </div>
              </div>
                  <div class="col-md-5" id="hid3" style="display:none">
              <div class="form-group">
                 <label for="ddlfrn">Edited Nature of Fraud: <span class="text-danger">*</span></label>
                  <label class="pure-material-textfield-outlined">
                  <input type="text" id="ename_fraud"  disabled="disabled"  />
                 <span>Nature of Fraud</span>
                </label>
              </div>
             </div>
              </div>

            <div class="row" >
             <div class="col-md-5">
              <div class="form-group">
                  <label for="ddlname">Modus operandi in brief : <span style="color:red">*</span></label>  
                  <label class="pure-material-textfield-outlined">
                  <%--<input  style="height:125px" type="text" id="ddlModus"  onchange="checklimit('history')" maxlength="2000"  oninput="this.value = this.value.replace(/[^ a-zA-Z0-9&.,_-“”‘’'%]/g, '');" />
                  --%> 
                       <label  class=" col-md-10" id="Modus" style="display:none;"><span style="color:red">Minimum 300 character required</span></label>
                    <textarea  style="height:125px" class="form-control" rows="1" cols="13" name="Modus_operandi" id="ddlModus"  onchange="checklimit('Modus')"  ></textarea>
                   <%-- <span>Minimum 300 character required</span>   --%>
                  </label>
               </div>
             </div>
                <div class="col-md-5" id="hid4" style="display:none">
              <div class="form-group">
                 <label for="ddlfrn">Edited Modus operandi in brief: <span class="text-danger">*</span></label>
                  <label class="pure-material-textfield-outlined">
                <%--  <input  style="height:125px" type="text" id="eddlModus"   disabled="disabled"  oninput="this.value = this.value.replace(/[^ a-zA-Z0-9&.,_-“”‘’'%]/g, '');" />
                --%>  <textarea  style="height:125px"  rows="1" cols="13" readonly  id="eddlModus"   oninput="this.value = this.value.replace(/[^-@.,/#&+\w\s]/g, '');"></textarea>
                  
                      <span>Modus operandi in brief</span>
                </label>
              </div>
             </div>
             </div> 

             <div class="row" >
             <div class="col-md-5">
             <div class="form-group">
               <label for="ddlbranch">Branch : <span class="text-danger">*</span></label>
                  <div class="div-select-dark">
                    <select class="form-control select2" id="ddlbranch" style="width: 100%" disabled="disabled" >
                        </select>
                   </div>
               </div>
             </div>
           </div>

             <div class="row" >
             <div class="col-md-5">
             <div class="form-group">
                 <label for="amn_inv">Names of parties involved: <span class="text-danger">*</span></label>
                 <div class="div-select-dark">
                     <select  class="form-control select2" id="ddlcategory" style="width: 100%"  >
                    </select>
                   </div>
               </div>
             </div>
                  <div class="col-md-5" id="hid5" style="display:none">
              <div class="form-group">
                 <label for="ddlfrn">Edited Names of parties involved: <span class="text-danger">*</span></label>
                  <label class="pure-material-textfield-outlined">
                  <input type="text" id="eddlcategory"  readonly  />
                 <span>Names of parties involved</span>
                </label>
              </div>
             </div>
                </div>
          
              <div class="row" >
             <div class="col-md-5">
             <div class="form-group">
                  <label for="ddlname">Name of officials involved : <span class="text-danger">*</span></label>
               <label class="pure-material-textfield-outlined">
               <input type="text" style="height:70px" placeholder=" "id="ddlofficials"  maxlength="200" oninput="this.value = this.value.replace(/[^ a-zA-Z0-9&.,_-“”‘’'%]/g, '');" />
                 <span>Name of officials involved</span>
                </label>
               </div>
             </div>
                   <div class="col-md-5" id="hid6" style="display:none">
              <div class="form-group">
                 <label for="ddlfrn">Edited Name of officials involved : <span class="text-danger">*</span></label>
                  <label class="pure-material-textfield-outlined">
                  <input type="text" id="eddlofficials" readonly  style="height:70px" />
                 <span>Name of officials involved</span>
                </label>
              </div>
             </div>
              </div>      

             <div class="row" >
             <div class="col-md-5">
             <div class="form-group">
              <label for="ddlbranch">Whether the complaint has been lodged with the police : <span class="text-danger">*</span></label>
                     <div class="div-select-dark">
                     <select   class="form-control select2" id="ddllodged" style="width: 100%" >
                     <option selected="selected" value="-1">Select</option>
                     <option value="1">Yes</option>
                     <option value="2">No</option>
                         </select>
                   </div>
               </div>
             </div>
                  <div class="col-md-5" id="hid7" style="display:none">
              <div class="form-group">
                 <label for="ddlfrn">Edited Whether the complaint has been lodged with the police: <span class="text-danger">*</span></label>
                  <label class="pure-material-textfield-outlined">
                  <input type="text" id="eddllodged"  disabled="disabled"  />
                 <span>Whether the complaint has been lodged with the police</span>
                </label>
              </div>
             </div>
                </div>
             
           
            <div class="row" >
             <div class="col-md-5">
             <div class="form-group">
                 <label class="pure-material-textfield-outlined">
                        <textarea rows="1" cols="13" style="height:80px"  id="txtRemarks" maxlength="200"  oninput="this.value = this.value.replace(/[^-@.,/#&+\w\s]/g, '');"></textarea>
                         <span>Other details</span>
                        </label>
               </div>
             </div>
             <div class="col-md-5" id="hid8" style="display:none">
             <div class="form-group">
                 <label class="pure-material-textfield-outlined">
                        <textarea rows="1" cols="13" style="height:80px" id="etxtRemarks"  readonly   oninput="this.value = this.value.replace(/[^-@.,/#&+\w\s]/g, '');"></textarea>
                         <span>Edited Other details</span>
                        </label>
               </div>
             </div>
                </div>  
       
        
           <div class="row">
               <div class="col-md-2 col-sm-2 col-xs-4">
                        <a href="#" class="btn btn-sm animated-button thar-one btn-primary" style="width: 100%; margin: 5px;"
                            onclick="BtnSave();" id="btnSubmit"><i class="fa fa-thumbs-up"></i>Confirm</a>
               </div>
                 <div class="col-md-2 col-sm-2 col-xs-4" id="btnhide" style="display:none">
                        <a href="#" class="btn btn-sm animated-button thar-one btn-primary" style="width: 100%; margin: 5px;"
                            onclick="Btnpen();" id="btnSub"><i class="fa fa-thumbs-up"></i>Confirm</a>
               </div>
               <div class="col-md-2 col-sm-2 col-xs-4">
                        <a href="#" class="btn btn-sm animated-button thar-one btn-red" style="width: 100%; margin: 5px;"
                            onclick="frmexit();"><i class="fa fa-sign-out-alt"></i>Exit</a>
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
</asp:Content>
