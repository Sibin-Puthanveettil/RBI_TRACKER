<%@ Page Title="" Language="C#" MasterPageFile="~/PWA_Master.Master" AutoEventWireup="true" CodeBehind="FMR1.aspx.cs" Inherits="RBIDATATRACK.FMR1" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="css/style.min.css" rel="stylesheet" />                                                                                                                                         
    <script src="js/AutoCompleteJS.js"></script>                                                                                                                                                          
    <script src="js/FMREntry.js"></script>
    <link href="css/MultipleUpload.css" rel="stylesheet"/>
    <script src="js/MultipleUpload.js"></script>
  
    <script type="text/javascript" src="http://github.com/malsup/blockui/raw/master/jquery.blockUI.js?v2.34"></script>
     <script src="js/aes.js"></script>
<style>
            table, th, td {
          border: 1px solid black;
          border-collapse: collapse;
        }
        th, td {
          padding: 5px;
        }
        th {
          text-align: left;
        }
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


  

.modal {
  visibility: hidden;
  opacity: 0;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(77, 77, 77, .7);
  transition: all .4s;
}

.modal:target {
  visibility: visible;
  opacity: 1;
}

.modal__content {
  border-radius: 4px;
  position: relative;
  width: 1000px;
  max-width: 90%;
  max-height:90%;
  background: #fff;
  padding: 1em 2em;
  padding-top:50px;
  
 
}

.modal__footer {
  text-align: right;
  a {
    color: #585858;
  }
  i {
    color: #d02d2c;
  }
}
.modal__close {
  position: absolute;
  top: 10px;
  right: 10px;
  color: #585858;
  text-decoration: none;
}




    /*//////////////////////////////////////////////////////////////*/
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
    .tab-content {
		padding:45PX;
}

    @media only screen and (max-width: 520px) {
		.nav-tabs#material-tabs>li>a {
				font-size: 11px;
		}
}
#material-tabs {
		position: relative;
		display: block;
	  padding:0;
		border-bottom: 1px solid #e0e0e0;
}

#material-tabs>a {
		position: relative;
	 display:inline-block;
		text-decoration: none;
		padding: 22px;
		text-transform: uppercase;
		font-size: 14px;
		font-weight: 600;
		color: #424f5a;
		text-align: center;
		outline:;
}

#material-tabs>a.active {
		font-weight: 700;
		outline:none;
}

#material-tabs>a:not(.active):hover {
		background-color: inherit;
		color: #7c848a;
}



#material-tab1-sub {
		position: relative;
		display: block;
	  padding:0;
		border-bottom: 1px solid #e0e0e0;
}

#material-tab1-sub>a {
		position: relative;
	 display:inline-block;
		text-decoration: none;
		padding: 22px;
		text-transform: uppercase;
		font-size: 14px;
		font-weight: 600;
		color: #424f5a;
		text-align: center;
		outline:;
}

#material-tab1-sub>a.active {
		font-weight: 700;
		outline:none;
}

#material-tab1-sub>a:not(.active):hover {
		background-color: inherit;
		color: #7c848a;
}


.yellow-bar {
		position: absolute;
		z-index: 10;
		bottom: 0;
		height: 3px;
		background: #458CFF;
		display: block;
		left: 0;
		transition: left .2s ease;
		-webkit-transition: left .2s ease;
}
#tab1-tab.active ~ span.yellow-bar {
		left: 0;
		width: 80px;
}

#tab2-tab.active ~ span.yellow-bar {
		left:105px;
		width: 70px;
}

#tab3-tab.active ~ span.yellow-bar {
		left: 180px;
		width: 75px;
}

#tab4-tab.active ~ span.yellow-bar {
		left:260px;
		width: 163px;
}

#tab1-sub1.active ~ span.yellow-bar {
		left: 20px;
		width: 100px;
}

#tab1-sub2.active ~ span.yellow-bar {
		left:160px;
		width: 100px;
}
</style>
    <script>
        $(document).ready(function() {
		$('#material-tabs').each(function() {

				var $active, $content, $links = $(this).find('a');

				$active = $($links[0]);
				$active.addClass('active');

				$content = $($active[0].hash);

				$links.not($active).each(function() {
						$(this.hash).hide();
				});

				$(this).on('click', 'a', function(e) {

						$active.removeClass('active');
						$content.hide();

						$active = $(this);
						$content = $(this.hash);

						$active.addClass('active');
						$content.show();

						e.preventDefault();
				});
            });

            $('#material-tab1-sub').each(function() {

				var $active, $content, $links = $(this).find('a');

				$active = $($links[0]);
				$active.addClass('active');

				$content = $($active[0].hash);

				$links.not($active).each(function() {
						$(this.hash).hide();
				});

				$(this).on('click', 'a', function(e) {

						$active.removeClass('active');
						$content.hide();

						$active = $(this);
						$content = $(this.hash);

						$active.addClass('active');
						$content.show();

						e.preventDefault();
				});
		});
        });

    </script>
    <style type="text/css">

        /*#main {
    pointer-events: none;
}*/
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
<div class="container">
<div class="row">
  <div class="col-12">
       
    <div class="card card-5 rightmarg"> 
      <form class="form-horizontal" runat="server" method="post" enctype="multipart/form-data">   
               <br />
          <br />
          <div class="row">
          
           <div class="col-md-2"></div> <label class="col-md-1 align-left ">Fraud <span class="required">*</span> </label>
             <div class="col-md-8 align-left">
               <select id="ddlFr" class="form-control" style="width:100%;" name="CRF_Sel" onchange="fillFRData()">
                   <option value="-1">Choose Fraud</option>
                      </select>
                 </div>
            
           </div>
          <br />
          <br />

                
       <div class="card-body" id="main" style="display:none">
           
           <div id="material-tabs">
						<a id="tab1-tab" href="#FMR1" class="active">FMR1</a>
						<a id="tab2-tab" href="#AUDIT">AUDIT</a>
						<a id="tab3-tab" href="#RIIM">RIIM</a>	
                        <a id="tab4-tab" href="#COMP">COMPLIANCE</a>	
						<span class="yellow-bar"></span>
		   </div>
           <div >
				<div id="FMR1">
                    <div id="material-tab1-sub">
						<a id="tab1-sub1" href="#FMR1A" class="active">FMR1-PART A</a>
						<a id="tab1-sub2" href="#FMR1B">FMR1-PART B</a>						
						<span class="yellow-bar"></span>
				    </div>
                    
                    <div>
                      <%--  -------------FMR1 PART A begin-------------------%>
				    <div id="FMR1A">
                         <br />
                             <div class="row col-md-12 p-1">                           
                                <label class="col-md-4" for="ddlDevlp">Fraud Type : <span class="text-danger  p-2">*</span></label>                               
                                    <select id="ddl_frd_typ" class="form-control" style="width: 30%;" onchange="ddlFraudType()" >
                                    </select>
                            </div>
                             <div  class="row col-md-12 p-1">
                                <label class="col-md-4" for="txtStartDt">Name of the NBFC :<span class="text-danger p-2">*</span></label>                          
                                    <input type="text" class="form-control" style="color:black; width:50%;" id="txt_HName" value="Manappuram Finance Limited" placeholder="Manappuram Finance Limited" readonly maxlength="30" />  
                             </div>
                             <div  class="row col-md-12 p-1" ID="FrNo">
                                <label class="col-md-4" for="txtStartDt">Fraud number :<span class="text-danger p-2">*</span></label>
                             
                                   <input type="text" class="form-control" style="color:black; width:8%;" id="txt_f1" onkeypress="return onlyAlphabets(event,this);" onkeyup="this.value=this.value.toUpperCase()"  maxlength="4" />  
                                   <input type="text" class="form-control" style="color:black; width:30%;"  id="txt_f2"  maxlength="8" onkeypress="javascript:return isNumber(event)" />  
                               
                            </div>
                             <div id="BranchGold" style="display:none; ">
                                     <div class="row col-md-12 p-1">
                                           <br />

                                        <label  class=" col-md-4 ">Branch Type  <span style="color:red">*</span></label>
                                          <select id="ddlbrGold" class="form-control" style="width: 30%;" >
                                          </select>                                                  
                                                                                                                               
                                    </div>
                                    <div class="row col-md-12 p-1">
                                        <label  class=" col-md-4 ">Name of the branch <span style="color:red">*</span></label>
                                        <select class="form-control select2  col-md-4 " id="ddlBranch" style="width: 50%" onchange="GetBranchDtl()">
                                           <%-- <option value="-1">SELECT BRANCH</option>--%>
                                        </select>         
                                                 
                                    </div>                                  
                                                                            
                                    <div class="row col-md-12 p-1">
                                           <br />
                                         <label  class=" col-md-4">Place<span style="color:red">*</span></label>
                                        <input type="text" class="form-control" style="color:black; width:30%;" id="txt_gplace" maxlength="30" ^/>  
                                            <br />
                                      </div>   
                                   <div class="row col-md-12 p-1">

                                        <label  class=" col-md-4 ">District<span style="color:red">*</span></label>
                                        <input type="text" class="form-control" style="color:black; width:30%;" id="txt_district" readonly maxlength="30" />  
                                   </div>        
                                   <div class="row col-md-12 p-1">
      
                                        <label  class=" col-md-4 ">State<span style="color:red">*</span></label>
                                        <input type="text" class="form-control" style="color:black; width:30%;" id="txt_state" readonly maxlength="30" />  
                                                                      
                                    </div>

                                </div>

                                 <div id="BranchVeh" style="display:none; ">
                                       <div class="row col-md-12 p-1">   
                                            <br />
                                            <label class="col-md-4" for="ddlDevlp">Branch Type <span class="text-danger  p-2">*</span></label>                               
                                    <select id="ddl_brType" class="form-control" style="width: 30%;">
                                    </select>
                                          
                                                                        
                                                                                                 
                                    </div>
                                   <div class="row col-md-12 p-1">
                                        <label  class=" col-md-4 ">Name of the branch <span style="color:red">*</span></label>
                                        <input type="text" class="form-control" style="color:black; width:30%;" id="txt_BrVeh"   maxlength="30" />  
                                                      
                                    </div>                                  
                                                                            
                                    <div class="row col-md-12 p-1">
                                           <br />
                                         <label  class=" col-md-4">Place<span style="color:red">*</span></label>
                                        <input type="text" class="form-control" style="color:black; width:30%;" id="txt_vehPlace"  maxlength="250" />  
                                            <br />
                                  </div>   
                                  <div class="row col-md-12 p-1">

                                        <label  class=" col-md-4 ">District<span style="color:red">*</span></label>
                                        <input type="text" class="form-control" style="color:black; width:30%;" id="txt_vehDist"   maxlength="50" />  
                                   </div>        
                                  <div class="row col-md-12 p-1">
      
                                        <label  class=" col-md-4 ">State<span style="color:red">*</span></label>
                                        <input type="text" class="form-control" style="color:black; width:30%;" id="txt_vehState"  maxlength="50" />  
                                                                      
                                    </div>

                                </div>
                                 <div class="row col-md-12 p-1">
                                    <label  class=" col-md-4 ">Name of the Principal party/account<span style="color:red">*</span></label>
                                     <select class="form-control dd-list" id="ddlPrinAcc" style="width: 250px" name="PrinAcc" >
                                    </select>  &nbsp;&nbsp;&nbsp;
                                    <input type="text" class="form-control" style="color:black; width:30%;" id="txt_prinacc" placeholder="Principal party/account"  maxlength="500" />  
                                </div>

                                 <div class="row col-md-12 p-1">
                                    <label  class=" col-md-4 ">Area of operation where the fraud has occurred<span style="color:red">*</span></label>
                                   <select class="form-control dd-list" id="ddlArOpr" style="width: 250px" name="ArOpr" >                                      
                                    </select>
                                     <span style="color:red ">Note:Select the area where highest loss is reported</span>  
                                </div>
                                <div class="row col-md-12 p-1">
                                    <label  class=" col-md-4 ">Whether fraud has occurred in a borrowal account?<span style="color:red">*</span></label>
                                   <select class="form-control dd-list" id="ddl_fr" style="width: 250px" name="frStatus" >                                      
                                    </select>
                                    
                                </div>
                                 <div class="row col-md-12 p-1">
                                    <label  class=" col-md-4 ">Nature of fraud <span style="color:red">*</span></label>
                                   <select class="form-control dd-list" id="ddl_NatureFr" style="width: 250px" name="FrNature" >                                      
                                    </select>                                    
                                </div>
                               
                                <div class="row col-md-12 p-1">
                                    <label  class="col-md-4 "> Whether computer is used in committing the fraud?<span style="color:red">*</span></label>
                                   <select class="form-control dd-list" id="ddl_commit" style="width: 250px; padding-bottom:10px" name="CommitFr" onchange="commitChng();">                                      
                                   </select> 
                                    <br />&nbsp;&nbsp;&nbsp;&nbsp;
                                    <div id="commit" style=" display:none;"> 
                                      <textarea class="form-control" id="txt_commit" rows='2' cols='33' placeholder="Details" ></textarea>
                                    </div>
                                  
                                </div>

                                <div class="row col-md-12 p-1">                                                                                                                                                                                       
                                   <label  class="col-md-4 ">Total amount involved<span style="color:red">*</span></label>                                                                                                                              
                                   <input type="text" class="form-control amt" style="color:black; width:30%;" id="txt_getamt" placeholder="Calculated Amount" readonly maxlength="30" /> 
                                     <a href="#demo-modal" id="gettot"> Link to Audit Report</a>  
                                    
                                    <label  class="col-md-4 " id="lbl1"><span style="color:red"></span></label>                                                                                                                                                                                   
                                    <label  class="col-md-4 " id="lbl2"><span style="color:red"></span></label>  
                                     <br /> <br /><br /> <br />  
                                    
                                    <label  class="col-md-4 "><span style="color:red"></span></label>                                                                                                    
                                    <input type="text" class="form-control amt" style="color:black; width:30%;" id="txt_entamt" onkeypress="javascript:return isNumber(event)" placeholder="Amount"  maxlength="30" /> 
                                    <br /> <br /><br /> <br />                                                                                                                                                                                                                                                   
                                    <label  class="col-md-4 "><span style="color:red"></span></label>                                                                                                                                                                                   
                                    <label  class="col-md-4 "><span style="color:red"></span></label>                                                                                                                                                              
                                    <input type="text" class="form-control totcnt " style="color:black; width:30%;" id="txt_totamt" readonly="true"  placeholder="Total Amount" maxlength="30" onchange="totamtonchange();" /> 
                                </div>

                                
                                <div id="demo-modal"  class="modal"  style="overflow:scroll">
                                    <div class="modal__content" style="overflow:scroll">
                                        <div class="row col-md-12 p-1">
                                            <label  class=" col-md-4 ">Name of the branch <span style="color:red">*</span></label>
                                            <select class="form-control select2  col-md-4 " id="ddlBranchPop" style="width: 50%" onchange="GetBranchDtl()">
                                                <option value="-1">Select Branch</option>
                                            </select>         
                                            
                                        </div>

                                         <div class="row col-md-12 p-1">
                                            <label  class=" col-md-4 ">Period of irregularity reported <span style="color:red">*</span></label>
                                            <input type="text"  class="form-control" style="width:30%;"  placeholder="ToDt "id="FrmDt" title="TarDt" />&nbsp;&nbsp;&nbsp;
                                             <input type="text"  class="form-control" style="width:30%;" placeholder="FromDt"id="ToDt" title="TarDt" />
                                        </div>  
                                        <div class="col-md-4 col-sm-2 col-xs-4">
                                            <a class="btn btn-sm animated-button thar-one btn-primary" style="width: 100%; margin: 5px;"
                                                onclick="getDetails();" id="btnSubmi1" onload="true"><i ></i>Get Report</a>
                                        </div> 
                                         <div style="overflow:scroll"  class="form-group col-md-12  padding-bottom-10px">
                                          
                                            <br />
                                            <br />
                                             <table id="tabChange" style="text-align:center;background-color:antiquewhite;" border="1">             
                                             </table>            
                                             
                                        </div> 
                                        <a class="btn btn-sm animated-button thar-one btn-primary" style="width: 50%; margin: 5px;"
                                                onclick="calculateamt();" id="btnSubmit2" onload="true"><i ></i>Calculate Amount</a>
                                         <div class="row col-md-12 p-1">
                                            <label  class=" col-md-4 ">Calculated Amount <span style="color:red">*</span></label>
                                            <input type="text"  class="form-control" style="width:30%;" readonly  placeholder="Total amount Calculated" id="CalAmt"  />&nbsp;&nbsp;&nbsp;
                                         </div>  
                                          <a href="#" class="modal__close">&times;</a>        
                                    </div>
                                </div>
                                 
                            
                      </div>                   
                      <%---------------END FMR1 PART A begin-------------------%>
                      <%-------------------FMR1 PART B begin-------------------%>
                    <div id="FMR1B">
                          <div class="row col-md-12 p-1">                           
                                <label class="col-md-4" for="ddlDevlp">Date on which reported to RBI: <span class="text-danger  p-2">*</span></label>                               
                                <input type="text" readonly="true"  class="form-control" style="width:30%;" id="DtRBI"/>&nbsp;&nbsp;&nbsp;

                          </div>
                        
                        <div class="row col-md-12 p-1">                           
                                <label class="col-md-4" for="ddlDevlp">Reasons for delay, if any, in reporting the fraud to RBI: <span class="text-danger  p-2">*</span></label>                               
                                <input type="text" class="form-control" style="color:black; width:30%;" id="tx_delay"  />  

                        </div>
                         <div class="row col-md-12 p-1" >                                                                                                                                                                                                                                                     
                                <label  class=" col-md-10 ">Brief history<span style="color:red">*</span></label>                                                                                                                                                                       
                                <label  class=" col-md-10" id="his" style="display:none;"><span style="color:red">Minimum 500 character required</span></label>
                                <textarea class="form-control" id="txt_history"  rows="2" cols="33"  placeholder="Reason" onchange="checklimit('history')" minlength="500"></textarea>
                         </div>                                                                                                                                                                                                                                                     
                         <div class="row col-md-12 p-1" >                                                                                                                                                                                                                                                     
                                <label  class=" col-md-10 ">Modus operandi<span style="color:red">*</span></label>                                                                                                                                                                       
                                <label  class=" col-md-10" id="Modus" style="display:none;"><span style="color:red">Minimum 50 character required</span></label>
                                <textarea class="form-control" id="txt_Modus"  rows="2" cols="33"  placeholder="Reason" minlength="50"></textarea>
                         </div>
                        <div class="row col-md-12 p-1">                                                                                                                                                                                                                                                     
                               <label class="col-md-3"><p style="font-size:15px;color:blue">Fraud committed by</p></label>    
                        </div>
                          <div class="row col-md-12 p-1">   
                               <label class="col-md-3">Staff<span style="color:red">*</span></label>
                               <select class="form-control dd-list" id="ddr_staff" style="width: 250px" name="frstaff">                                      
                               </select>
                        </div>
                        <div class="row col-md-12 p-1">                                                                                                                                                             
                               <label class="col-md-3">Customers<span style="color:red">*</span></label>
                               <select class="form-control dd-list" id="ddr_cus" style="width: 250px" name="frcus">                                      
                               </select>
                        </div>
                        <div class="row col-md-12 p-1">                                                                                                                                                              
                                <label class="col-md-3">Outsiders<span style="color:red">*</span></label>
                                <select class="form-control dd-list" id="ddr_out" style="width: 250px" name="frout">                                      
                                </select>
                         </div>
                        <div class="row col-md-12 p-1">      
                                <label  class=" col-md-4 ">Whether the controlling office (Regional/Zonal) could detect the fraud by a scrutiny of control returns, if any<span style="color:red">*</span></label>
                                <select class="form-control dd-list" id="ddr_ctrl" style="width: 250px" name="frout">                                      
                                </select>
                         </div>
                         <div class="row col-md-12 p-1">      
                                <label  class=" col-md-4 ">Whether there is need to improve the Information system?<span style="color:red">*</span></label>
                                <select class="form-control dd-list" id="ddr_info" style="width: 250px" name="frout">                                      
                                </select>
                         </div>
                          <%--  ----------------------------------------------Complaint with Police--------------------------------------%>
                       <div class="row col-md-12 p-1">                                                                                                                                                                                                                                                     
                               <label class="col-md-12"><p style="font-size:15px;color:blue">Action taken/proposed to be taken</p></label>   
                              
                               <span >(A)</span> <label class="col-md-2">Complaint with Police</label>
                               <label class="col-md-3">Whether any complaint has been lodged with the Police?<span style="color:red">*</span></label>
                               <select class="form-control dd-list" id="ddr_comp" style="width: 200px" name="comp" onchange="compChng();">                                      
                               </select>&nbsp;&nbsp; 
                               <div id="CompRej" style=" display:none;"> 
                                    <textarea class="form-control" id="txt_CompRej"  rows="2" cols="33"  placeholder="Reason" ></textarea>
                               </div>
                        </div>
                    <div id="comp" style=" display:none;"> 
                        <div class="row col-md-12 p-1">                                                                                                                                   
                               <label class="col-md-2"></label>
                               <label class="col-md-3">Name of Police Station<span style="color:red">*</span></label>
                               <input type="text" class="form-control" style="color:black; width:30%;" id="txt_comp" placeholder=""  />  
                        </div>

                        <div class="row col-md-12 p-1">                                                                                                                                   
                               <label class="col-md-2"></label>
                               <label class="col-md-3">Date of reference<span style="color:red">*</span></label>
                               <input type="text"  class="form-control" style="width:30%;"   placeholder="" id="DtRef" />
                        </div>
                        <div class="row col-md-12 p-1">                                                                                                                                   
                               <label class="col-md-2"></label>
                               <label class="col-md-3">Present position of the case <span style="color:red">*</span></label>
                             <input type="text" class="form-control" id="txtprespo"  style="color:black; width:30%;" name="position" list="txtpos">
                                     <datalist id="txtpos">
                                        <option value="In progress">
                                     </datalist>
                        </div>
                        <div class="row col-md-12 p-1">                                                                                                                                   
                               <label class="col-md-2"></label>
                               <label class="col-md-3">Date of completion of Police investigation<span style="color:red">*</span></label>
                             <input type="text" class="form-control" id="Dtcompl"  style="color:black; width:30%;" name="Invest" list="txtInvest1">
                                     <datalist id="txtInvest1">
                                        <option value="In progress">
                                     </datalist>
                        </div>
                        <div class="row col-md-12 p-1">                                                                                                                                   
                               <label class="col-md-2"></label>
                               <label class="col-md-3">Date of submission of investigation report by Police<span style="color:red">*</span></label>
                             <input type="text" class="form-control" id="DtSub"  style="color:black; width:30%;" name="Invest" list="txtInvest2">
                                     <datalist id="txtInvest2">
                                        <option value="In progress">
                                     </datalist>
                        </div>
                   </div>

           <%------------------------------------------------Recovery suit with --------------------------------------%>
                    <div class="row col-md-12 p-1">                                                                                                                                                                                                                                                 
                               <span >(B)</span> <label class="col-md-2">Recovery suit with Court/Others</label>
                               <label class="col-md-3"> Date of filing <span style="color:red">*</span></label>
                                <input type="text"  class="form-control" style="width:30%;"   placeholder="" id="Dt_Recr"/>
                    </div>
                    <div class="row col-md-12 p-1">
                            <label class="col-md-2">                                                                                  </label>                        
                            <label  class=" col-md-3 " style="left:17px"> Present position<span style="color:red">*</span></label>
                            <input type="text"  class="form-control" style="width:30%;"  placeholder="" id="txt_prepos"/>                  

                    </div>
        <%------------------------------------------------Details of staff-side action --------------------------------------%>
                     <div class="row col-md-12 p-1">                                                                                                                                                                                                                                                 
                               <span >(C)</span> <label class="col-md-2">Details of staff-side action</label>
                               <label class="col-md-3"> Whether any internal investigation has been/is proposed to be conducted<span style="color:red">*</span></label>
                               <select class="form-control dd-list" id="ddrstaffside" style="width: 200px" name="comp" onchange="staffsideChng();">                                      
                               </select>                    
                    </div>
                        <div id="chng" style="display:none;">
                            <div   class="row col-md-12 p-1" >  
                              <label class="col-md-2"></label>
                               <label class="col-md-3" style="left:17px">Date of completion<span style="color:red">*</span></label>
                             <input type="text" class="form-control"  style="color:black; width:30%;"  name="position" id="Dtstaff">
                                  
                            </div>
                        </div>
                    <div class="row col-md-12 p-1">
                            <label class="col-md-2">  </label>                        
                            <label  class=" col-md-3" style="left:17px">Whether any departmental enquiry has been/is proposed to be conducted <span style="color:red">*</span></label>
                            <select class="form-control dd-list" id="ddrdepartpos" style="width: 200px;left:17px" name="comp" onchange="departposChng();">                                      
                            </select>                         
                    </div>
                            <div id="Staffside1" style="display:none;">
                                    <div   class="row col-md-12 p-1" >  

                                      <table style="left:40px;">
                                          <th class=" col-md-1 align-right">Employee Code</th>
                                          <th class=" col-md-1 align-right">Name</th>
                                          <th class=" col-md-1 align-right">Designation</th>
                                          <th class=" col-md-2 align-right">Whether suspended/Dt. of Suspension</th>
                                          <th class=" col-md-2 align-right">Date of issue of charge sheet</th>
                                          <th class=" col-md-1 align-right">Date of commencement of domestic inquiry</th>
                                          <th class=" col-md-1 align-right">Date of completion of Inquiry</th>
                                          <th class=" col-md-1 align-right">Date of issue of final orders</th>
                                          <th class=" col-md-1 align-right">Punishment awarded</th>
                                          <th class=" col-md-1  align-right">Details of prosecution<br />/conviction/acquittal, etc</th>
                                          <tr>
                                              <td class=" col-md-1 align-right"><input type="text" id ="emp_code" class="form-control" onchange="empdata();"  style="width: 50px; color:maroon" onkeypress="javascript:return isNumber(event)" required /></td>
                                              <td class=" col-md-1 align-right"><input type="text" id ="emp_name" class="form-control" readonly="true" style="width: 70px; color:maroon" required /></td>
                                              <td class=" col-md-1 align-right"><input type="text" id ="emp_des" class="form-control" readonly="true"  style="width: 70px; color:maroon" required /></td>
                                              <td class=" col-md-2 align-right"><input type="text" id ="susp" class="form-control"  style="width: 70px; color:maroon" required /></td>
                                              <td class=" col-md-2 align-right"><input type="text" id ="DtIssue"  class="form-control"  style="width: 70px; color:maroon" required /></td>
                                              <td class=" col-md-1 align-right"><input type="text" id ="DtCom"   class="form-control"  style="width: 90px; color:maroon" required /></td>
                                              <td class=" col-md-1 align-right"><input type="text" id ="DtComp"   class="form-control"  style="width: 70px; color:maroon" required /></td>
                                              <td class=" col-md-1 align-right"><input type="text" id ="DtIssFinal"   class="form-control"  style="width: 70px; color:maroon" required /></td>
                                              <td class=" col-md-1 align-right"><input type="text" id ="Punish" class="form-control"  style="width: 70px; color:maroon" required /></td>
                                              <td class=" col-md-1 align-right"><input type="text" id ="DtlPros" class="form-control"  style="width: 50px; color:maroon" required /></td>
                                         </tr>                                          
                                      </table> 
                                          <a href="#" class="btn btn-sm animated-button thar-one btn-primary" style="width: 100%;margin: 5px;"onclick="return ADDObject();" id="btnAdd">Add</a>
                                     <div class="form-group col-md-12 padding-bottom-10px" style="color: black;">                   
                                        <div style="overflow:scroll">
                                            <table class="table1 table-hover" id="tblObject" style="width:50%">
                                            </table>
                                        </div>
                                    </div>
                                       
                                    </div>
                            </div>
                            <div id="Staffside2" style=" display:none;"> 
                                    <div   class="row col-md-12 p-1" >  
                                        <label class="col-md-2">  </label>   
                                        <label  class=" col-md-3 " style="left:17px">Reason<span style="color:red">*</span></label>
                                        <input type="text"  class="form-control" style="width:30%;"  placeholder="Reason" id="txt_stafreason"/> 
                                    </div>
                            </div>   
                        
                     <div class="row col-md-12 p-1">   
                               <label class="col-md-3">Steps taken/proposed to be taken to avoid such incidents<span style="color:red">*</span></label>
                              <input type="text"  class="form-control" style="width:30%;"   id="txt_avoidinc"/> 
                    </div>

                    <div class="row col-md-12 p-1">   
                               <label class="col-md-3">Provision held<span style="color:red">*</span></label>
                              <input type="text"  class="form-control" style="width:70%;" readonly="true" value="The required provision will be updated along with the ensuing quarterly FMR 2 & 3 return"  placeholder="The required provision will be updated along with the ensuing quarterly FMR 2 & 3 return" id="txt_provision"/> 
                    </div>
                    <div class="row col-md-12 p-1">   
                               <label class="col-md-3">Amount written off<span style="color:red">*</span></label>
                              <input type="text"  class="form-control" style="width:30%;"   onkeypress="javascript:return isNumber(event)" id="txt_amtoff"/> 
                    </div>
                    <div class="row col-md-12 p-1">   
                               <label class="col-md-3">Suggestions for consideration of RBI<span style="color:red">*</span></label>
                              <input type="text"  class="form-control" style="width:30%;" id="txt_considers"/> 
                    </div>
            </div>
                     <%--   -------------END FMR1 PART B begin-------------------%>
                    </div>
                </div> 
 <%--          ---------------------------------------AUDIT BEGINS-------------------------------------------%>
                <div id="AUDIT">        
                    <br />   <br />
			         <div class="row col-md-12 p-1">                           
                                <label class="col-md-4" for="ddlDevlp">Date of occurrence: <span class="text-danger  p-2">*</span></label>                               
                                <input type="text"  class="form-control" readonly="true" style="width:30%;"  placeholder="ToDt "id="DtOcT" title="TarDt" />&nbsp;&nbsp;&nbsp;
                                <input type="text"  class="form-control" readonly="true" style="width:30%;"  placeholder="FromDt "id="DtOcF" title="TarDt" />&nbsp;&nbsp;&nbsp;
                        </div>
                        <div class="row col-md-12 p-1">                           
                                <label class="col-md-4" for="ddlDevlp">Date of detection: <span class="text-danger  p-2">*</span></label>                               
                                <input type="text"  class="form-control" readonly="true" style="width:30%;"  placeholder="ToDt "id="DtDetT" title="TarDt" />&nbsp;&nbsp;&nbsp;
                                <input type="text"  class="form-control" readonly="true" style="width:30%;"  placeholder="FromDt "id="DtDetF" title="TarDt" />&nbsp;&nbsp;&nbsp;
                        </div>

                        <div class="row col-md-12 p-1">      
                                <label  class=" col-md-4 ">Reasons for delay, if any, in detecting the Fraud<span style="color:red">*</span></label>
                                <input type="text" class="form-control" style="color:black; width:30%;" id="txt_Delayrs"  maxlength="500" />  
                         </div> 
                          <div class="row col-md-12 p-1">      
                                <label  class=" col-md-5 ">Whether internal inspection/ audit (including concurrent audit) was conducted at the branch(es) during the period between the date of first occurrence of the fraud and its 
                                    detection?<span style="color:red">*</span></label>
                                 <select class="form-control dd-list" id="ddl_inpaudit" style="width: 250px; padding-bottom:10px" name="inpaudit" onchange="inpauditChng();">                                      
                                 </select>                                  
                         </div> 
                          <div class="row col-md-12 p-1" id="inspaudit1" style=" display:none;">      
                                <label  class=" col-md-10 ">If yes, why the fraud could not have been detected during such inspection/audit<span style="color:red">*</span></label>
                                 <textarea class="form-control" id="txt_inspaudit1" rows='2' cols='33' placeholder="Reason" ></textarea>
                         </div> 
                          <div class="row col-md-12 p-1"  id="inspaudit2" style=" display:none;">      
                                <label  class=" col-md-10">What action has been taken for non-detection of the fraud during such inspection/audit<span style="color:red">*</span></label>
                                <textarea class="form-control" id="txt_inspaudit2" rows='2' cols='33' placeholder="Reason" ></textarea>                                  
                         </div>                           
                </div>
<%--           --------------------------------------------END OF AUDIT TAB---------------------------------------------------------%>
                
              <%---------------------------------------------RIIM BEGINS-------------------------------------------%>
                  <div id="RIIM">        
                    <br />   <br />
                   
			         <div class="row col-md-12 p-1"> 
                           <label class="col-md-12" ><p style="font-size:15px;">Insurance claim</p></label>
                                <label class="col-md-4" >Whether any claim has been lodged with an insurance company<span class="text-danger  p-2">*</span></label>    
                                <select class="form-control dd-list" id="ddl_InsClaim" style="width: 250px; padding-bottom:10px" name="InsClaim" onchange="InsClaimChng();">                                      
                                </select>  
                        </div>
                        <div class="row col-md-12 p-1" id="InsClaim" style=" display:none;">      
                                <label  class=" col-md-10 "> If Not/In progress, reasons therefore <span style="color:red">*</span></label>
                                <textarea class="form-control" id="txt_insrsn" rows='2' cols='33' placeholder="Reason" ></textarea>
                         </div> 
                        <br />   <br />
                         <div class="row col-md-12 p-1"> 
                           <label class="col-md-12" ><p style="font-size:15px;">Total amount recovered</p></label>
                                <label class="col-md-4" >Amount recovered from party/parties concerned(A)<span class="text-danger  p-2">*</span></label>    
                                <input type="text" class="form-control txt_cal" style="color:black; width:30%;" id="txt_riimtotamt" onkeypress="javascript:return isNumber(event)"  maxlength="30" /> 
                        </div>
                          <div class="row col-md-12 p-1">      
                                <label  class=" col-md-4 "> From insurance(B)<span style="color:red">*</span></label>
                                <input type="text" class="form-control txt_cal" style="color:black; width:30%;" id="txt_ins" onkeypress="javascript:return isNumber(event)"  maxlength="30" /> 
                         </div> 
                         <div class="row col-md-12 p-1">      
                                <label  class=" col-md-4">From other sources(C)<span style="color:red">*</span></label>
                                 <input type="text" class="form-control txt_cal"  style="color:black; width:30%;" id="txt_othsrc" onkeypress="javascript:return isNumber(event)"  maxlength="30" /> 
                         </div> 
                        <div class="row col-md-12 p-1">      
                                <label  class=" col-md-4">Extent of loss to the NBFC(TotalAmountInvolved-(A+B+C))<span style="color:red">*</span></label>
                                 <input type="text" class="form-control total" readonly  style="color:black; width:30%;" id="txt_losstot"  maxlength="30" /> 
                         </div> 

                </div>
              <%-------------------------------------------END OF RIIM --------------------------------------------%>

              <%---------------------------------------------COMPLAINCE BEGINS-------------------------------------------%>
                  <div id="COMP">        
                    <br />   <br />
                   
                      <div class="form-group col-md-12  padding-bottom-10px">
                           <br />
                          <br />
                        <label class="col-md-12" ><p style="font-size:15px;">Borrowal Accounts</p></label>
                        <table id="TabCust" style="text-align:center;background-color:antiquewhite;" border="1">             
                        </table>          
                      </div> 

                      <div class="form-group col-md-12  padding-bottom-10px">
                           <br />
                          <br />
                        <label class="col-md-12" ><p style="font-size:15px;">Borrowal Accounts Details</p></label>
                        <table id="TabCustPleg" style="text-align:center;background-color:antiquewhite;" border="1">             
                        </table>        
                      </div> 
                      <div id="BorrowDirect" >
                          <br />
                          <br />
                           <label class="col-md-12" ><p style="font-size:15px;">Borrowal account Director/proprietor details</p></label>
                                    <div   class="row col-md-12 p-1" > 
                                      <table style="left:40px;">
                                          <th class=" col-md-1 align-right">Sr. No.</th>
                                          <th class=" col-md-1 align-right">Name of party/account</th>
                                          <th class=" col-md-1 align-right">Name of Director/Proprietor</th>
                                          <th class=" col-md-2 align-right">Address</th>
                                            <tr>
                                              <td class=" col-md-1 align-right"><input type="text" id ="SrNo." class="form-control"  style="width: 100%; color:maroon" required /></td>
                                              <td class=" col-md-1 align-right"><input type="text" id ="Name_party" class="form-control"  style="width: 100%; color:maroon" required /></td>
                                              <td class=" col-md-1 align-right"><input type="text" id ="Name_Dirt" class="form-control"  style="width: 100%; color:maroon" required /></td>
                                              <td class=" col-md-2 align-right"><input type="text" id ="Add" class="form-control"  style="width: 100%; color:maroon" required /></td>
                                            </tr> 
                                            <tr>
                                              <td class=" col-md-1 align-right"><input type="text" id ="SrNo1" class="form-control"  style="width: 100%; color:maroon" required /></td>
                                              <td class=" col-md-1 align-right"><input type="text" id ="Name_party1" class="form-control"  style="width: 100%; color:maroon" required /></td>
                                              <td class=" col-md-1 align-right"><input type="text" id ="Name_Dirt1" class="form-control"  style="width: 100%; color:maroon" required /></td>
                                              <td class=" col-md-2 align-right"><input type="text" id ="Add1" class="form-control"  style="width: 100%; color:maroon" required /></td>
                                            </tr> 
                                      </table>                                      
                                    </div>
                       </div>

                       <div id="Associate" >
                          <br />
                          <br />
                           <label class="col-md-12" ><p style="font-size:15px;">Associate Concerns</p></label>
                                    <div   class="row col-md-12 p-1" > 
                                      <table style="left:40px;">
                                          <th class=" col-md-1 align-right">Name of party/account</th>
                                          <th class=" col-md-1 align-right">Sr. No. Associate Concern</th>
                                          <th class=" col-md-1 align-right">Name of Associate Concern</th>
                                          <th class=" col-md-2 align-right">Address</th>
                                            <tr>
                                              <td class=" col-md-1 align-right"><input type="text" id ="NmPa" class="form-control"  style="width: 100%; color:maroon" required /></td>
                                              <td class=" col-md-1 align-right"><input type="text" id ="SrNoAssoc" class="form-control"  style="width: 100%; color:maroon" required /></td>
                                              <td class=" col-md-1 align-right"><input type="text" id ="NmAssoc" class="form-control"  style="width: 100%; color:maroon" required /></td>
                                              <td class=" col-md-2 align-right"><input type="text" id ="AddAssoc" class="form-control"  style="width: 100%; color:maroon" required /></td>
                                            </tr> 
                                              <tr>
                                              <td class=" col-md-1 align-right"><input type="text" id ="NmPa1" class="form-control"  style="width: 100%; color:maroon" required /></td>
                                              <td class=" col-md-1 align-right"><input type="text" id ="SrNoAssoc1" class="form-control"  style="width: 100%; color:maroon" required /></td>
                                              <td class=" col-md-1 align-right"><input type="text" id ="NmAssoc1" class="form-control"  style="width: 100%; color:maroon" required /></td>
                                              <td class=" col-md-2 align-right"><input type="text" id ="AddAssoc1" class="form-control"  style="width: 100%; color:maroon" required /></td>
                                            </tr> 
                                      </table>                                      
                                    </div>
                       </div>
                      <div id="DirectAssociate" >
                          <br />
                          <br />
                           <label class="col-md-12" ><p style="font-size:15px;">Associate Concern Director/proprietor details</p></label>
                                    <div   class="row col-md-12 p-1" > 
                                      <table style="left:40px;">
                                          <th class=" col-md-1 align-right">Name of Associate</th>
                                          <th class=" col-md-1 align-right">Sr. No.</th>
                                          <th class=" col-md-1 align-right">Name of Director</th>
                                          <th class=" col-md-2 align-right">Address</th>
                                            <tr>
                                              <td class=" col-md-1 align-right"><input type="text" id ="NmAs" class="form-control"  style="width: 100%; color:maroon" required /></td>
                                              <td class=" col-md-1 align-right"><input type="text" id ="SrNoAs" class="form-control"  style="width: 100%; color:maroon" required /></td>
                                              <td class=" col-md-1 align-right"><input type="text" id ="NmDirt" class="form-control"  style="width: 100%; color:maroon" required /></td>
                                              <td class=" col-md-2 align-right"><input type="text" id ="AddAsc" class="form-control"  style="width: 100%; color:maroon" required /></td>
                                            </tr> 
                                            <tr>
                                              <td class=" col-md-1 align-right"><input type="text" id ="NmAs1" class="form-control"  style="width: 100%; color:maroon" required /></td>
                                              <td class=" col-md-1 align-right"><input type="text" id ="SrNoAs1" class="form-control"  style="width: 100%; color:maroon" required /></td>
                                              <td class=" col-md-1 align-right"><input type="text" id ="NmDirt1" class="form-control"  style="width: 100%; color:maroon" required /></td>
                                              <td class=" col-md-2 align-right"><input type="text" id ="AddAsc1" class="form-control"  style="width: 100%; color:maroon" required /></td>
                                            </tr>
                                      </table>                                      
                                    </div>
                       </div>
                </div>
              <%-------------------------------------------END OF COMPLAINCE --------------------------------------------%>
           </div>
           <div >
            <div class="row col-md-12" style="background-color:gainsboro;" id="CompRemarks">
                <div class="row col-md-4 align-content-md-center " >
                 <label for="ddlname">Compliance Remarks<span class="text-danger">*</span></label>
                     </div>
                   <div class="col-md-6 align-left">
                  <label class="pure-material-textfield-outlined">
                <input  style="height:65px" type="text" placeholder=" "id="comprmk" title="Fraud_Name"  maxlength="300" oninput="this.value = this.value.replace(/[^ a-zA-Z0-9&.,_-“”‘’'%]/g, '');" />
                 <span>Compliance Remarks</span>
                </label>
              </div>
             </div>
            <div class="col-md-2">
                            <a href="#" class="btn btn-sm animated-button thar-one btn-primary" style="width: 100%; margin: 5px;"
                                onclick="FRConfirm();" id="btnSubmit"><i class="fa fa-thumbs-up" ></i>Confirm</a>
               
            </div>
       </div>
            </div>   
           
               	
          </form>
       </div>      
    </div>
  </div>
 </div>   
    <input id="hdUserId" type="hidden" runat="server"/>
    <input id="hdBranchId" type="hidden" runat="server"/>
    <input id="hdFirmId" type="hidden" runat="server"/>
    <input id="hdSesssion" type="hidden" runat="server"/>
    <input id="hdNoteID" type="hidden" runat="server"/>
    <input id="hddata" type="hidden" runat="server" />
    <input id="hdfraudno" type="hidden" runat="server" />
    <input id="hdaccess" type="hidden" runat="server" />
    <input id="hdDept" type="hidden" runat="server" />
    <input id="hdseq" type="hidden" runat="server" />

</asp:Content>

