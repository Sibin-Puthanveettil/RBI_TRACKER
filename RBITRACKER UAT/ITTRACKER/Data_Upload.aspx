<%@ Page Title="" Language="C#" MasterPageFile="~/PWA_Master.Master" AutoEventWireup="true" CodeBehind="Data_Upload.aspx.cs" Inherits="RBIDATATRACK.Data_Upload" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="StyleAutoComplete.css" rel="stylesheet" />
<script src="AutoCompleteJS.js"></script>
     <link href="css/MultipleUpload.css" rel="stylesheet"/>
    <script src="js/MultipleUpload.js"></script>
    <%--<script src="js/Data_Upload.js"></script>--%>

    <script type="text/javascript" src="http://github.com/malsup/blockui/raw/master/jquery.blockUI.js?v2.34"></script>
     <script src="js/aes.js"></script>

    <script type="text/javascript">
        function Getdisplay(sel) {

    var val = $("#ddldoc option:selected").val();
    if (val == 0)  {
        $("#filevisb").show();
        $("#hidconfirm1").show();
        $("#hidexit").show();
        $("#fraudvisb").hide();
        $("#hidconfirm2").hide();
        $("#hidconfirm3").hide();
        $("#hidconfirm4").hide();
        $("#hidconfirm5").hide();
    }
    else if (val == 1) {
        $("#filevisb").show();
        $("#hidconfirm2").show();
        $("#hidexit").show();
        $("#fraudvisb").hide();
         $("#hidconfirm1").hide();
        $("#hidconfirm3").hide();
        $("#hidconfirm4").hide();
        $("#hidconfirm5").hide();
    }
       else if (val == 2) {
        $("#filevisb").show();
        $("#hidconfirm3").show();
        $("#hidexit").show();
        $("#fraudvisb").hide();
         $("#hidconfirm1").hide();
        $("#hidconfirm2").hide();
        $("#hidconfirm4").hide();
        $("#hidconfirm5").hide();
          }
      else if (val == 3) {
        $("#filevisb").show();
        $("#hidconfirm4").show();
        $("#hidexit").show();
        $("#fraudvisb").hide();
         $("#hidconfirm1").hide();
        $("#hidconfirm3").hide();
        $("#hidconfirm2").hide();
        $("#hidconfirm5").hide();
           }
    else if (val == 4) {
        $("#filevisb").show();
        $("#hidconfirm5").show();
        $("#hidexit").show();
        $("#fraudvisb").hide();
         $("#hidconfirm1").hide();
        $("#hidconfirm3").hide();
        $("#hidconfirm4").hide();
        $("#hidconfirm2").hide();
        
    }
    else {
        window.location.reload();
    }


        }
        function frmexit() {
    window.open("index.aspx", "_self");
}
     </script>

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
    .smallButton {
        border:2px solid;
        background-color:#0bf314;
        border-radius:25px;
        width:180px;
        text-align: center;
        padding: 5px 32px;
    }
    .ExitButton {
        border:2px solid;
        background-color:red;
        border-radius:25px;
        width:180px;
        text-align: center;
        padding: 5px 32px;
    }

    .alert {
        display: none;
    }
    .ma-header{

         text-align: center;
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
      <div class="row justify-content-center align-items-center" >
  <div class="col-12">
    <div class="card card-5 rightmarg"> 
      <form class="form-horizontal" runat="server" method="post" enctype="multipart/form-data">  
       <div class="card-body">
          
           <div class="container"><br />
           <div class="container"><br />
  <div class="row justify-content-center">
     <h4 style="color: #080254; left:50px;">DATA UPLOAD</h4>
      <br />
</div>
               </div><br /><br />
                <div class="row justify-content-center align-items-center" ><br />
                       <div class="row col-md-6 p-1">
                         <label  class=" col-md-4" style=" align-items:center; margin-left : -40px" ">Document : <span style="color:red">*</span></label>

                         <select class="form-control select2  col-md-10 " id="ddldoc" style="width: 50% " onchange="Getdisplay(this);">
                         <option value="-1">SELECT DOCUMENT</option>
                         <option value="0">Advances</option>
                         <option value="1">Cash</option>
                         <option value="2">Others</option>
                         <option value="3">Pledges</option>
                         <option value="4">EMP Data</option>
                      </select>         
                   </div> 
                </div><br />
               
               <div class="row justify-content-center align-items-center" ><br />
                   <div class="row col-md-6 p-1" style="display:none" id="fraudvisb">
                       
                         <label  class=" col-md-4" style=" align-items:center; margin-left : -40px" ">Select Fraud : <span style="color:red">*</span></label>
                         <select class="form-control select2  col-md-10 " id="ddlfrd" style="width: 50% " onchange="Getfrauddata()">
                         <%--  <select class="select-light" id="ddldoc" style="width: 50%  " name="Develpor">--%>
                         <option value="-1">SELECT FRAUD</option>                    
                      </select>         
                   
                </div>
                   </div>

                
                <div class="row justify-content-center align-items-center" ><br />
                    <div class="row col-md-12" style="display:none" id="filevisb">  
                   <%--<label for="rdbNature" class=" col-md-4" style=" align-items:center; margin-left : 200px">Attach File  : </label>
                    <div class="FileUpload2">
                       <div class="file-select">
                          <div class="file-select-button" id="FileUpload" style=" align-items:center ">Choose File</div>
                            <div class="file-select-name" id="noFile" style=" align-items:center">No file chosen...</div>
                             <div class="file-chooser">
                               <input type="file" name="chooseFile" id="FileUpload2"class="file-chooser__input" />
                             </div>
                           </div>
                       </div>--%>
                       
                 <div class="row col-md-12 p-1">
                   <label  class=" col-md-4" style=" align-items:center; margin-left : 200px" > SELECT FILE : <span style="color:red">*</span></label>
                   <asp:FileUpload ID="FileUpload2" runat="server" />
                  </div> 
                </div>
                   </div><br /><br /><br /><br /><br />

                
                <div class="row justify-content-center align-items-center"><br />
                    <div class="row col-md-3" style="display:none" id="hidconfirm1">
               <div class="col-md-2 col-sm-2 col-xs-4">
                          
                   <asp:Button ID="confirm1" CssClass="smallButton" runat="server" OnClick="confirm_click"  Text="CONFIRM" />
               
               </div>
                    </div>
              <div class="row col-md-3" style="display:none" id="hidconfirm2">
               <div class="col-md-2 col-sm-2 col-xs-4">
                   <asp:Button ID="confirm2" CssClass="smallButton" runat="server" OnClick="confirm_click1"  Text="CONFIRM" />
                    
               </div>
                    </div>
                     <div class="row col-md-3" style="display:none" id="hidconfirm3">
               <div class="col-md-2 col-sm-2 col-xs-4">
                <asp:Button ID="confirm3" CssClass="smallButton" runat="server" OnClick="confirm_click2"  Text="CONFIRM" />

               </div>
                    </div>
                     <div class="row col-md-3" style="display:none" id="hidconfirm4">
               <div class="col-md-2 col-sm-2 col-xs-4">
             <asp:Button ID="confirm4" CssClass="smallButton" runat="server" OnClick="confirm_click3"  Text="CONFIRM" />

               </div>
                    </div>
                     <div class="row col-md-3" style="display:none" id="hidconfirm5">
               <div class="col-md-2 col-sm-2 col-xs-4">
               <asp:Button ID="confirm5" CssClass="smallButton" runat="server" OnClick="confirm_click4"  Text="CONFIRM" />

               </div>
                    
          
          
          
          </div>
           </div> <br />
               <div class="row justify-content-center align-items-center">
                   <div class="row col-md-3" style="display:none" id="hidexit">
               <div class="col-md-2 col-sm-2 col-xs-4">
                <asp:Button ID="btnExit" CssClass="ExitButton" runat="server" OnClick="btnExit_Click"  Text="EXIT" />
                    </div>
                </div>
           </div><br /><br /><br /><br />
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
</asp:Content>
