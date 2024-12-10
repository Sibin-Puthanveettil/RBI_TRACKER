// js page for TestingTA
// created by Yadhu-358191
var confirmFlag = 0;
var workHours = 0;
var workHours2 = 0;
var workHours3 = 0;
var checkHours = 0;
$(window).on('load', function () {
    $("[id*=hddraftid]").val('');
    $("#datahide").hide();
    $("#parallelrow").hide();
    let querystring = window.location.search.substring(1);
    let crfid = querystring.split("=")[1];
    $("[id*=hdman]").val(0);
    $("[id*=hddev]").val(0);
    $("[id*=hdcst]").val(0);
    $("[id*=hdtest]").val(0);
    $("[id*=hddata]").val("");
    $("[id*=hdRqstID]").val(0);
    $("[id*=hdDevlpr]").val("");
    if (crfid == 1) {
        $("#div1").show();
        $("#div2").hide();
        $("#Doc").hide();
        CRFLoad();
    }
    else {
        $("#div1").hide();
        $("#div2").show();
        crfid = Decrypt(crfid);
        $("[id*=hddraftid]").val(crfid);
        CRFIDLBL(crfid);
        CRFSearch(crfid);
        $("#snote").show();
        detailsLoad(crfid);
        testempname();
        
    }

    $("#txtEndDt").datepicker({
        dateFormat: 'dd/MM/yy',
        changeMonth: true,
        changeYear: true,
        stepMonths: true,
        todayHighlight: true,
        onSelect: function (dateText, inst) {
        }

    });
    $("#txtStartDt").datepicker({
        dateFormat: 'dd/MM/yy',
        changeMonth: true,
        changeYear: true,
        stepMonths: true,
        todayHighlight: true,
        onSelect: function (dateText, inst) {
        }

    });
    
   
    GetTestValue();
    TeamMembers();
 
});
function CRFLoad() {

     
    var usr = $("[id*=hdUserId]").val();

   
    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "TechnicalAnalysisTesting.aspx/getFillData",
        data: "{pageVal:'TAforTestingCRFLoad', pageval1 :'" + usr + "',pageval2 :''}",
        dataType: "json",
        success: function (Result) {
            Result = Result.d;
            $.each(Result, function (key, value) {
                $('#ddlCrf').append($("<option></option>").val(value.id).html(value.name));
            });
        }
    });
}
function fillCRFData() {
    checkHours = 0;
    $("#datahide").hide();
    $("#parallelrow").hide();
    $("#txtBusHours").val("");
    $("#lblBusHours").html("");
    Clear();
    Clear1();
    var CRFID = $("#ddlCrf").val();
    $("[id*=hddraftid]").val(CRFID);
    var dtl = $('#ddlCrf option:selected').text();
    var ddtl = dtl.split('~');
    $("[id*=hdRqstID]").val(ddtl[0]);
    CRFSearch(CRFID);
    $("#snote").show();
    if (CRFID == -1) {
        $("#CrfDetailsID").hide();
        $('#boxdata').hide();
    }
    else {
        $("#CrfDetailsID").show();
        $('#boxdata').show();

    }
   
    detailsLoad(CRFID);
    filesFill(CRFID)
    GetRequestId();
    $("#txtRemarks").val("");

}

function CRFIDLBL(noteid) {
    var usr = $("[id*=hdUserId]").val();
    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "TechnicalAnalysisTesting.aspx/getRequestNote",
        data: "{pageVal:'CRFSUBJECTREQST', pageval1:'" + noteid + "',pageval2:'" + usr+"'}",
        dataType: "json",
        success: function (Result) {
            Result = Result.d;
            $('#lblCRFID').html(Result);
            var reqid = Result.split('~');
            
            $("[id*=hdRqstID]").val(reqid[1]);
           // alert($("[id*=hdRqstID]").val());
        }
    });
}
function GetRequestId() {
    
    var usr = $("[id*=hdUserId]").val();
   // usr = usr + '^' + CRFID;
    var dtl = $('#ddlCrf option:selected').text();
    var ddtl = dtl.split('~');
    //var dtls;
    //return dtls;
}
   

function CRFSearch(CRFID) {
    var crfval = $("#ddlCrf option:selected").text();
    var reqid = crfval.split('~');
    //alert(reqid[0] + " " + reqid[1] + "  " + reqid[2]);
    var CRFID = $("#ddlCrf").val();
    if (CRFID == "") {
        alert("Please Choose CRF!!!");
    }
    

    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "TechnicalAnalysisTesting.aspx/getFillData",
        data: "{pageVal:'DataLoadTestingTAPage', pageval1 :'" + CRFID + "',pageval2 :'" + reqid[0] + "'}",
        dataType: "json",
        success: function (Result) {

            Result = Result.d;
            $.each(Result, function (key, value) {
                var crfdtl = value.id;
                var cdtl = crfdtl.split('±');
                var data = cdtl[8];
                empdatesel(data);
                GetProjectType();
                $('#lblTeam').html(cdtl[0]);
                $('#lblType').html(cdtl[1]);;
                $('#lblReqtr').html(cdtl[2]);
                $('#lblRqstDt').html(cdtl[3]);
                $('#lblTarDt').html(cdtl[6]);
                $('#lblUserExpectDate').html(cdtl[4]);
                $('#lblTechLead').html(cdtl[9]);
                $('#lblCreator').html(cdtl[10]);
                $('#lblDvlpmtStartDate').html(cdtl[11]);
                $('#lblDeptName').html(cdtl[12]);
                if (cdtl[7] == 1) {
                    $('#lblErrorImpact').html("Yes");
                    //$('#lblErrorImpact').prop(color, red);
                }
                else {
                    $('#lblErrorImpact').html("No");
                    //$('#lblErrorImpact').prop(color, red);
                }
                if (cdtl[5] == 1) {
                    $('#lblPrior').html("High");
                    $('#lblPrior').prop(color = red);
                } else if (cdtl[5] == 2) {
                    $('#lblPrior').html("Medium");
                    $('#lblPrior').prop(color, red);
                } if (cdtl[5] == 3) {
                    $('#lblPrior').html("Low");
                    $('#lblPrior').prop(color, red);

                }
                
                //empdatesel(cdtl[6]);
                //$('#txtStartDt').val()
            });
        },
        error: function (Result) {

            alert(Result);
        }
    });

}
function showPhase() {
    var val = ($('#ddlProjType').val());
    $('#ddlPhase').empty();
    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "TechnicalAnalysisTesting.aspx/getFillData",
        data: "{pageVal:'GetProjectPhase', pageval1 :'" + val + "', pageval2 :''}",
        dataType: "json",
        success: function (Result) {
            Result = Result.d;
            $('#ddlPhase').append($("<option selected disabled></option>").val("-1").html("Choose Phase"));
            $.each(Result, function (key, value) {
                $('#ddlPhase').append($("<option></option>").val(value.id).html(value.name));
            });
        }
    });
}
////     
function HandOver() {
    if ($('#ddlCrf').val() == -1) {
        alert("Please Select a CRF..");
        return false;
    }
    var usr = $("[id*=hdUserId]").val();
    var proceed = confirm(' Are you sure you want to HandOver this?');
    if (proceed) {

        $.ajax({
            type: "post",
            contentType: "application/json; charset=utf-8",
            url: "TechnicalAnalysisTesting.aspx/TACompleteConfirm",
            data: "{pageVal:'HandOver', pageval1 :'" + $("[id*=hdUserId]").val() + "',pageval2:'" + $("[id*=hdRqstID]").val() + "',pageval3:'2'}",
            dataType: "json",
            async: false,
            success: function (Result) {
                $('.block-ui').addClass('clear');
                Result = Result.d;
                var noteid = Result;
                if (noteid.includes("µ")) {
                    var msg = noteid.split("µ");
                    var stat = msg[0];
                    var content = msg[1];
                    if (stat == "9") {
                        dangerAlert(content, 5000);
                        return false;
                    }
                }
                if (noteid != '0') {

                    let timerInterval
                    Swal.fire({
                        width: 400,
                        type: 'success',
                        title: 'Success!',
                        html: "Handed Over.!! ",
                        //showConfirmButton: false,
                        allowOutsideClick: false,
                        timer: 10000,
                        onBeforeOpen: () => {
                            //Swal.showLoading()
                            timerInterval = setInterval(() => {
                                Swal.getContent().querySelector('strong')
                                    .textContent = Swal.getTimerLeft()
                            }, 100)
                        },
                        onClose: () => {
                            clearInterval(timerInterval)
                            window.open('TechnicalAnalysisTesting.aspx?crfid=1', '_self');
                        }
                    }).then((result) => {
                        if (
                            // Read more about handling dismissals
                            result.dismiss === Swal.DismissReason.timer
                        ) {
                            window.open('TechnicalAnalysisTesting.aspx?crfid=1', '_self');
                        }
                    })


                }
                else {
                    alert("Something went wrong.!Please contact IT Support");
                }


            }
        });
    }
    else {

        return false;
    }
}
/////
function showRelatedWork() {
    var val = ($('#ddlPhase').val());
    var val1 = ($('#ddlProjType').val());
    $('#ddlRelWork').empty();
    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "TechnicalAnalysisTesting.aspx/getFillData",
        data: "{pageVal:'GetProjectRelWork', pageval1 :'" + val1 + "', pageval2 :'" + val + "'}",
        dataType: "json",
        success: function (Result) {
            Result = Result.d;
            $('#ddlRelWork').append($("<option selected disabled></option>").val("-1").html("Choose Related Work"));
            $.each(Result, function (key, value) {
                $('#ddlRelWork').append($("<option></option>").val(value.id).html(value.name));
            });
        }
    });
}

$(document).ready(function () {
    $('.summernoteview').summernote({
        height: 200, // set editor height
        minHeight: null, // set minimum height of editor
        maxHeight: null, // set maximum height of editor
        focus: false, // set focus to editable area after initializing summernote
        toolbar: [
        ]
    });
    $(".summernoteview").summernote("disable");
    $("#summernoteview").summernote("fullscreen.toggle");
});
function Decrypt(value) {
    var result = "";
    var array = value.split("-");

    for (i = 0; i < array.length; i++) {
        result += String.fromCharCode(array[i] - 10);
    }
    return result;
}


function detailsLoad(noteid) {
    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "TechnicalAnalysisTesting.aspx/getRequestNote",
        data: "{pageVal:'GetRequestNotes', pageval1:'" + noteid + "',pageval2:'2'}",
        dataType: "json",
        success: function (Result) {
            Result = Result.d;
            $('.summernoteview').summernote('code', Result);
        }
    });
}

function testempname() {


    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "TechnicalAnalysisTesting.aspx/getempData",
        data: "{pageVal:'TestingTeamMember'}",
        dataType: "json",
        success: function (Result) {
            Result = Result.d;
            // $('#ddlCrf').append($("<option selected disabled></option>").val("-1").html("Choose CRF"));
            $.each(Result, function (key, value) {
                $('#assignto').append($("<option></option>").val(value.id).html(value.name));
            });
        }
    });

}

function filesFill(noteid) {

    $("#tblFiles").empty();
    var filenm = $("[id*=hdUserId]").val() + noteid.replace(/[^a-zA-Z0-9]/g, '') + "_";
    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "TechnicalAnalysisTesting.aspx/getFileData",
        async: false,
        data: "{pageVal:'GetAttachList', pageval1 :'" + noteid + "', pageval2 :'" + filenm + "'}",
        dataType: "json",
        success: function (Result) {

            Result = Result.d;


            var valData, valData1;
            var n = 0;
            valData = Result.split('Θ');
            if ($("#tblFiles tr").length == 0) {
                $('#tblFiles').append('<thead class="bg-success text-white"><tr><th scope="col">File No</th><th scope="col">File Name</th></tr></thead>');
            }

            for (j = 0; j < valData.length - 1; j++) {

                var contentDtl = valData[j].split('µ');
                //alert(contentDtl[3]);
                var binaryString = contentDtl[3];
                var filename = filenm + contentDtl[1];
                var extension = contentDtl[2];
                var _location = document.location.toString();
                var applicationNameIndex = _location.indexOf('/', _location.indexOf('://') + 3);
                var applicationName = _location.substring(0, applicationNameIndex) + '/';
                var myUrl;
                if (document.location.hostname === "localhost") {
                    myUrl = applicationName + "Images/" + filename;
                }
                else {
                    myUrl = applicationName + "ams/Images/" + filename;
                }

                $('#tblFiles').append('<tbody><tr>' +
                    '<td>' + contentDtl[0] + '</td>' +
                    '<td><a href="' + myUrl + '" download="' + filename + '" class="file-list1">' + contentDtl[1] + '</a></td>' +
                    '</tr> </tbody>');
            }


        },
        error: function (Result) {

        }
    });
    if ($("#tblFiles tr").length > 1) {
        $("#Doc").show();
    }
}

function frmExit() {
    window.open("index.aspx", "_self");
}

function manpower() {
   // $("#dman").show();
    $("#dman1").show();
    //$("#dman2").show();
    $("#dman3").show();
    $("#dman4").show();
    GetChangeList();
}
function GetChangeList() {
    $('#ddlChange').empty();
    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "TechnicalAnalysisTesting.aspx/getFillData",
        data: "{pageVal:'IT_CHANGES', pageval1 :''}",
        dataType: "json",
        success: function (Result) {
            Result = Result.d;
            $('#ddlChange').append($("<option selected disabled></option>").val("-1").html("Choose Changes"));
            $.each(Result, function (key, value) {
                $('#ddlChange').append($("<option></option>").val(value.id).html(value.name));
            });
        }
    });
}
function GetWorkList() {
    var chid = $("#ddlChange").val();
    $('#ddlWork').empty();
    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "TechnicalAnalysisTesting.aspx/getFillData",
        data: "{pageVal:'WORKLIST', pageval1 :'" + chid +"'}",
        dataType: "json",
        success: function (Result) {
            Result = Result.d;
            $('#ddlWork').append($("<option selected disabled></option>").val("-1").html("Choose Related Work"));
            $.each(Result, function (key, value) {
                $('#ddlWork').append($("<option></option>").val(value.id).html(value.name));
            });
        }
    });
}

function GetProjectType() {
    $('#ddlProjType').empty();
    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "TechnicalAnalysisTesting.aspx/getFillData",
        data: "{pageVal:'GetProjectType', pageval1 :'', pageval2 :''}",
        dataType: "json",
        success: function (Result) {
            Result = Result.d;
            $('#ddlProjType').append($("<option selected disabled></option>").val("-1").html("Choose Project Type"));
            $.each(Result, function (key, value) {
                $('#ddlProjType').append($("<option></option>").val(value.id).html(value.name));
            });
        }
    });
    
}
function CalTotal() {   

    var flag = 0;
    checkHours = 1;
    var frmDateCom = $("#txtStartDt").val();
    var ToDateCom = $("#txtEndDt").val();
    var newFrmDate = Date.parse(frmDateCom);
    var NewToDate = Date.parse(ToDateCom);
    $("#parallelrow").show();
    manpower();
   // GetRequestId();
    if (ToDateCom == "") {
        alert("Enter End Date!!!");

        $("#txtEndDt").focus();
        return false;
        flag = 0;
    }
    else {
        flag = 1;
    }
    if (frmDateCom == "") {
        alert("Enter Start Date!!!");

        $("#txtStartDt").focus();
        return false;
        flag = 0;
    }
    else {
        dateforcheck = Date.parse($("#txtStartDt").val())
        flag = 1;
    }
    var dateDifference = NewToDate - newFrmDate;
    if (dateDifference < 0) {
        alert("Choose To Date greater than Start Date");
        $("#txtEndDt").val("");
        $("#txtEndDt").focus();
        flag = 0;
        return false;
        
    }
    else {

        flag = 1;
    }
    if ($('#ddlProjType').val() == null) {
        alert("Choose Project Type");
        $('#ddlProjType').focus();
        return false;
        flag = 0;
    }
    else {
        flag = 1;
    }
    if ($('#ddlPhase').val() == null) {
        alert("Choose Project Phase");
        $('#ddlPhase').focus();
        return false;
        flag = 0;
    }
    else {
        flag = 1;
    }
    if ($('#ddlRelWork').val() == null) {
        alert("Choose Project Related Work.");
        $('#ddlRelWork').focus();
        return false;
        flag = 0;
    }
    else {
        flag = 1;
    }

   
    var data1,totm = 0, totc = 0, cst=2500, wrkhr, noc, data = "", totman = 0, totcst = 0, tstval, tstrslt, totdev=0, tottst=0,totcod=0,totvapt=0;
    totdev = $("[id*=hddev]").val();
    totcst = $("[id*=hdcst]").val();
    tottst = $("[id*=hdtest]").val();
    data1 = $("[id*=hddata]").val();
    wrkhr = $('#ddlRelWork option:selected').text().split('(')[1].split('H')[0];
    tstval = $('#TNoc').val();
    data1 = $("[id*=hddata]").val();
    if (flag == 1) {

        var usr = $("[id*=hdUserId]").val();
        var dtl = $('#ddlCrf option:selected').text();
        var ddtl = dtl.split('~');
        var dtls;


        $("[id*=hdRqstID]").val(ddtl[0]);
        $.ajax({
            type: "post",
            contentType: "application/json; charset=utf-8",
            url: "TechnicalAnalysisTesting.aspx/getRequestNote",
            data: "{pageVal:'GETDEV_MANPOWER', pageval1:'" + ddtl[0] + "',pageval2:''}",
            dataType: "json",
            success: function (Result) {
                Result = Result.d;
                dtls = Result.split('~');
                $("#DevWork").val(dtls[0]);
                $("#CodRvw").val(dtls[1]);
                $("[id*=hdcdrw]").val(dtls[1]);
                $("[id*=hddevwork]").val(dtls[0]);
                var testrow = parseFloat(parseFloat(wrkhr) * parseInt(tstval)).toFixed(2);
                tottst = parseFloat(parseFloat(tottst) + parseFloat(parseFloat(wrkhr) * parseInt(tstval))).toFixed(2);
                totman = parseFloat(parseInt(totman) + parseInt(dtls[0]) + parseFloat(tottst) + parseInt(dtls[1])).toFixed(2);
                totcst = parseFloat(parseInt(totman) * parseInt(cst)).toFixed(2);
                data = $('#ddlProjType option:selected').text() + "^" + $('#ddlPhase option:selected').text() + "^" + $('#ddlRelWork option:selected').text() + " X " + tstval+ "^" + $("#txtStartDt").val() + "^" + $("#txtEndDt").val() + "^" + wrkhr + "^" + tstval + "^" + testrow + "¶"; 
                data1 = data1 + data;
                $("[id*=hddata]").val(data1);
                filltab(data);
                $('#TNoc').val("");
                $("#ddlRelWork").val(null);


                $("#TstWrk").val(tottst);
                $("#TWork").val(totman);
                $("#TCost").val(totcst);
                $("[id*=hddev]").val(totdev);
                $("[id*=hdman]").val(totman);
                $("[id*=hdtest]").val(tottst);
                $("[id*=hdcst]").val(totcst);

            }
        });
       
       
    }
    
}
function filltab(data) {
      var valData, valData1, gstno, n = 1;
      valData = data.split('¶');
     if ($("#tabChange tr").length == 0) {
          $("#tabChange").empty();
         $('#tabChange').append('<tr style="background-color:honeydew;color:black"><th class="text-center">Project Type</th><th class="text-center">Phase</th><th class="text-center">Related Work</th><th class="text-center">StartDate</th><th class="text-center">EndDate</th><th class="text-center">TestCases</th><th class="text-center">DELETE</th></tr>');
     }
      for (i = 0; i < valData.length - 1; i++) {
          valData1 = valData[i].split('^');
          if (valData1[7] != "") {
              workHours = parseInt(workHours) - parseInt(valData1[7]);
              $("#txtBusHours").val(workHours);
              $("#lblBusHours").html(workHours);
              
          }
        $('#tabChange').append('<tbody><tr>' +

            '<td style="text-align:center">' + valData1[0] + '</td>' +
            '<td style="text-align:center">' + valData1[1] + '</td>' +
            '<td style="text-align:center">' + valData1[2] + '</td>' +
            '<td style="text-align:center">' + valData1[3] + '</td>' +
            '<td style="text-align:center">' + valData1[4] + '</td>' +
            '<td style="text-align:center">' + valData1[6] + '</td>' +
            '<td style="display:none">' + valData1[7] + '</td>' +
            '<td><a href="javascript:void(0);" class="remove"  id="remrow"><span class="glyphicon glyphicon-trash">Remove</span></a></td></tr > </tbody > ');
         }

 }


function empdatesel(data) {
   
    data = data.replace(/-/g, '/');
    var monthValue = data.split("/")[1];
    var mon = dateCheck(monthValue.toString().toLowerCase().substring(0, 3));
    if (data.split("/")[2].length > 2) {
        $('#txtStartDt').val(data.split("/")[0] + "/" + mon + "/" + data.split("/")[2]);
    }
    else {
        $('#txtStartDt').val(data.split("/")[0] + "/" + mon + "/20" + data.split("/")[2]);
    }

}

$(document).on('click', '.remove', function () {
 
    $(this).closest('tr').remove();
    dirRemovefromHidden();
    return false;
});
function dirRemovefromHidden() {
    var data = "";
    var table = document.getElementById('tabChange');
    var rowLength = table.rows.length;
    for (var i = 1; i < rowLength; i += 1) {
        var row = table.rows[i];
        var cellLength = row.cells.length;
        for (var y = 0; y < cellLength - 1; y += 1) {
            var cell = row.cells[y];
            data = data + cell.innerText + '^';
        }
        data = data + '¶';
    }

    $("[id*=hddata]").val(data);
    calTotdtl(data);
}
function calTotdtl(data) {   
    var valData, valData1, cst=2500, totman = 0, totcst = 0, tstval, tstrslt, totdev = 0, tottst = 0, totcod = 0, totvapt = 0;   
    valData = data.split('¶');
    for (i = 0; i < valData.length - 1; i++) {
        valData1 = valData[i].split('^');
        tottst = tottst + parseInt(valData1[6]);
        workHours2 = parseInt(workHours2) - parseInt(valData1[6]);

    }
    if ($("#tabChange tr").length < 2) { 
        workHours = parseInt(workHours3);
        workHours2 = parseInt(workHours3);
    }
    else {
        workHours = parseInt(workHours2);
    }   
    $("#txtBusHours").val(workHours);
    $("#lblBusHours").html(workHours);
    workHours2 = parseInt(workHours3);
    var testvalue = $("[id*=hdtest]").val();
    $("#TstWrk").val(parseInt(testvalue) - parseFloat(tottst));
    totman = $("[id*=hdman]").val();
    totman = parseFloat(parseInt(totman) - (parseInt(testvalue) - parseFloat(tottst))).toFixed(2);
    totcst = parseFloat(parseInt(totman) * parseInt(cst)).toFixed(2);
    $("#DevWork").val($("[id*=hddevwork]").val());
    $("#CodRvw").val($("[id*=hdcdrw]").val());
    $("#TstWrk").val(tottst);
    $("#TWork").val(totman);
    $("#TCost").val(totcst);
    $("[id*=hdman]").val(totman);
    $("[id*=hdtest]").val(tottst);
    $("[id*=hdcst]").val(totcst);
}
function dateCheck(dateValue) {
    switch (dateValue) {
        case "jan": return "January";
            break;
        case "feb": return "February";
            break;
        case "mar": return "March";
            break;
        case "apr": return "April";
            break;
        case "may": return "May";
            break;
        case "jun": return "June";
            break;
        case "jul": return "July";
            break;
        case "aug": return "August";
            break;
        case "sep": return "September";
            break;
        case "oct": return "October";
            break;
        case "nov": return "November";
            break;
        case "dec": return "December";
            break;
    }

}
function ApplicableHide() {
    if ($('#ddlCrf').val() == -1) {
        alert("Please Select a CRF..");
        return false;
    }
    if ($('#applicableOption').prop('checked')) {
        $('#boxdata').hide();
    }
    else {
        $('#boxdata').show();
    }
}
function businessHRFill() {
    $("[id*=hdtest]").val(0);
    $("[id*=hddata]").val(null);
    $("#TstWrk").val(0);
    if (checkHours == 1) {
        $("#TWork").val(parseFloat(parseInt($("#DevWork").val()) + parseInt($("#CodRvw").val())).toFixed(2));
        $("#TCost").val(parseFloat(parseInt($("#TWork").val()) * parseInt('2500')).toFixed(2));
        $("[id*=hdman]").val(parseFloat(parseInt($("#DevWork").val()) + parseInt($("#CodRvw").val())).toFixed(2));
        $("[id*=hdcst]").val(parseFloat(parseInt($("#DevWork").val()) + parseInt($("#CodRvw").val())).toFixed(2));

    }
        if ($("#txtStartDt").val() != "" && $("#txtEndDt").val() != "") {

        var frmDateCom = $("#txtStartDt").val();
        var ToDateCom = $("#txtEndDt").val();
        var newFrmDate = Date.parse(frmDateCom);
        var NewToDate = Date.parse(ToDateCom);
        var dateDifference = NewToDate - newFrmDate;
        if (dateDifference < 0) {
            alert("Choose To Date greater than Start Date");
            $("#txtEndDt").val("");
            $("#txtEndDt").focus();
            return false;
        }
        else {
            $("#datahide").show();
           
        }
        $.ajax({
            type: "post",
            contentType: "application/json; charset=utf-8",
            url: "TechnicalAnalysisTesting.aspx/getBussinessHours",
            async: false,
            data: "{pageVal:'getHours', pageval1:'" + frmDateCom + "',pageval2:'" + ToDateCom + "'}",
            dataType: "json",
            success: function (Result) {

                Result = Result.d;
                Result = parseInt(Result) + 8;
                $("#txtBusHours").val(Result);
                $("#lblBusHours").html(Result);
                workHours = parseInt(Result);
                workHours2 = parseInt(Result);
                workHours3 = parseInt(Result);
            }

        });
    }
    else return false;
}
function NotApplicable() {
    
    if ($('#ddlCrf').val() == -1) {
        alert("Please Select a CRF..");
        return false;
    }
    var circularStatus, NotApplicable;
    if ($('#applicableOption').prop('checked')) {
        circularStatus = 1;
        NotApplicable = "Yes";
        if ($('#txtRemarks').val() == "") {
            alert("Please add your remarks..!");
            return false;
        }
    }
    else {
        circularStatus = 0;
        NotApplicable = "No";
    }
    var proceed = confirm(' You selected "Not Applicable" as " ' + NotApplicable + '". Do you want to continue?');
    if (proceed) {
        var hourLeft = parseInt($("#txtBusHours").val());
        if (hourLeft == null) {
            alert("Please completed Testing TA properly..");
            confirmFlag = 1;
            return false;
        }
        else if (hourLeft >= 0) {
            confirmFlag = 0;
        }
        else if (hourLeft < 0) {
            alert(" Time exceeds..You can't confirm..");
            confirmFlag = 1;
            return false;
        }
        
        if (confirmFlag == 0) {

            let uploadedElements = $(".file-uploaded");
            for (let i = 0; i < uploadedElements.length; i++) {
                let extension = "";
                let element = uploadedElements.eq(i)[0];
                let fileList = element.files;
                let fileReader = new FileReader();
                if (fileReader && fileList && fileList.length) {
                    let fileSize = fileList[0].size / 1048576;
                    if (fileSize > 10) {
                        alert("Please Upload Files Less Than 10MB..!", 3000);
                        return false;
                    }
                }
            }

            uploadedElements = $(".file-uploaded");
            if (uploadedElements.length <= 0) {

                TestingTAConfirm(circularStatus);
            }
            else {

                for (let i = 0; i < uploadedElements.length; i++) {
                    let extension = "";
                    let element = uploadedElements.eq(i)[0];
                    let fileList = element.files;
                    let fileReader = new FileReader();
                    if (fileReader && fileList && fileList.length) {
                        let fileSize = fileList[0].size / 1048576;
                        if (fileSize > 10) {
                            alert("Please Upload Files Less Than 10MB..!");
                            return false;
                        }
                        let fileName = fileList[0].name;
                        extension = fileName.replace(/^.*\./, '');
                        if (extension == fileName) {
                            extension = '';
                        } else {
                            extension = extension.toLowerCase();
                        }
                        fileReader.readAsDataURL(fileList[0]);
                        fileReader.onload = function () {
                            let fileno = i + 1;
                            let imageData1 = fileReader.result;
                            let InputData1 = $("[id*=hdRqstID]").val() + "µ" + fileno + "µ" + extension + "µ" + fileName.replace(/[^a-zA-Z0-9._]/g, '');
                            var sessionkey = $("[id*=hdSesssion]").val();
                            var keySession = sessionkey.substring(0, 16);
                            var key = CryptoJS.enc.Utf8.parse(keySession);
                            var iv = CryptoJS.enc.Utf8.parse(keySession);
                            var encryptedInput = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(InputData1), key,
                                {
                                    keySize: 128 / 8,
                                    iv: iv,
                                    mode: CryptoJS.mode.CBC,
                                    padding: CryptoJS.pad.Pkcs7
                                });
                            $.ajax({
                                type: "POST",
                                contentType: "application/json; charset=utf-8",
                                url: "TechnicalAnalysisTesting.aspx/UploadingFile",
                                data: "{ImageData:'" + imageData1 + "',InputData:'" + encryptedInput + "'}",
                                dataType: "json",
                                async: false,
                                success: function (Result) {

                                    if (Result.d.toString() == "666") {

                                        dangerAlert("Failed to upload files. File type not supported. Please try again.", 3000);
                                        return flase;

                                    }
                                    else {
                                        if (i == uploadedElements.length - 1) {

                                            TestingTAConfirm(circularStatus);

                                        }
                                    }

                                },
                                error: function (Result) {
                                    //alert(Result);
                                    let timerInterval
                                    Swal.fire({
                                        width: 400,
                                        type: 'error',
                                        title: 'Oops...!',
                                        html: Result,
                                        //showConfirmButton: false,
                                        allowOutsideClick: false,
                                        timer: 5000,
                                        onBeforeOpen: () => {
                                            //Swal.showLoading()
                                            timerInterval = setInterval(() => {
                                                Swal.getContent().querySelector('strong')
                                                    .textContent = Swal.getTimerLeft()
                                            }, 100)
                                        },
                                        onClose: () => {
                                            clearInterval(timerInterval)
                                            //window.open('Approve2.aspx', '_self');
                                        }
                                    }).then((result) => {
                                        if (
                                            // Read more about handling dismissals
                                            result.dismiss === Swal.DismissReason.timer
                                        ) {
                                            //window.open('Approve2.aspx', '_self');
                                        }
                                    })
                                }
                            });

                        };
                    }
                    else {

                        return false;
                    }
                    //do something with element

                }
            }
        }
        }

    else {
        return false;
    }
       
}
function Clear1() {
   
    $('#DevWork').val("");
    $('#CodRvw').val("");
    $('#TstWrk').val("");
    $('#TWork').val("");
    $('#TCost').val("");
    $('#txtRemarks').val("");
    
    

}
function Clear2() {
    $("#tabChange tr").remove();
    $("#tabChange").val("");
    $("#txtBusHours").val("");
    $("#lblBusHours").html("");

    $('#TstWrk').val("");
    $("#datahide").hide();
}
function Clear() {
    $('#lblTeam').val("");
    $('#lblType').val("");
    $('#lblReqtr').val("");
    $('#lblRqstDt').val("");
    $('#lblTarDt').val("");
    $('#lblUserExpectDate').val("");
    $('#lblErrorImpact').val("");
    $('#lblPrior').html("");
    $('#txtStartDt').val("");
    $('#txtEndDt').val("");
    $('#ddlProjType').val("-1");
    $('#ddlPhase').val("-1");
    $('#ddlRelWork').val("-1");
    $('#TNoc').val("");
    $("#tabChange tr").remove();
    $("#tabChange").val("");
    

}


function TestingTAConfirm(circularStatus) {
    var Data = '', itmdata = '', flag=0;
    var table = document.getElementById('tabChange');
    var rowLength = table.rows.length;
    var reqid = $("[id*=hdRqstID]").val();
    var dtls, totman = 0, cst = 2500, totcst = 0;
    var rmk = $('#txtRemarks').val();
    if (circularStatus == 0) {
        Data = $("[id*=hddraftid]").val() + 'µ' + reqid + 'µ' + $("[id*=hdUserId]").val() + 'µ' + $('#DevWork').val() + 'µ' + $('#TstWrk').val() + 'µ' + $('#CodRvw').val() + 'µ' + $('#TWork').val() + 'µ' + $('#TCost').val() + 'µ' + rmk + 'µ' + circularStatus + 'µ';
        if ($("[id*=hddata]").val() == "" || rowLength < 2) {
            alert("Please Complete TA properly!!!");
            return false;
        }
        itmdata = $("[id*=hddata]").val();
        $("[id*=hdDetails]").val(Data);
        
    }
    if (circularStatus != 0 && flag == 0) {
        $.ajax({
            type: "post",
            contentType: "application/json; charset=utf-8",
            url: "TechnicalAnalysisTesting.aspx/getRequestNote",
            async: false,
            data: "{pageVal:'GETDEV_MANPOWER', pageval1:'" + reqid + "',pageval2:''}",
            dataType: "json",
            success: function (Result) {
                
                Result = Result.d;
                dtls = Result.split('~');
                $("[id*=hdcdrw]").val(dtls[1]);
                $("[id*=hddevwork]").val(dtls[0]);
                totman = parseInt(totman)+parseInt(dtls[0]) + parseInt(dtls[1]);
                totcst = parseFloat(parseInt(totman) * parseInt(cst)).toFixed(2);
                itmdata = '';
                Data = $("[id*=hddraftid]").val() + 'µ' + reqid + 'µ' + $("[id*=hdUserId]").val() + 'µ' + dtls[0] + 'µ' + '0' + 'µ' + dtls[1] + 'µ' + totman + 'µ' + totcst + 'µ' + rmk + 'µ' + circularStatus + 'µ';
                $("[id*=hdDetails]").val(Data);

            }
        });

    }
    if (confirmFlag == 0) {
        $.ajax({
            type: "post",
            contentType: "application/json; charset=utf-8",
            url: "TechnicalAnalysisTesting.aspx/TACompleteConfirm",
            data: "{pageVal:'TA_TESTINGCONFIRM', pageval1 :'" + $("[id*=hdDetails]").val() + "',pageval2:'" + itmdata + "',pageval3:'1'}",
            dataType: "json",
            async: false,
            success: function (Result) {
                $('.block-ui').addClass('clear');
                Result = Result.d;
                var noteid = Result;
                if (noteid.includes("µ")) {
                    var msg = noteid.split("µ");
                    var stat = msg[0];
                    var content = msg[1];
                    if (stat == "9") {
                        dangerAlert(content, 5000);
                        return false;
                    }
                }


                let timerInterval
                Swal.fire({
                    width: 400,
                    type: 'success',
                    title: 'Success!',
                    html: "TA Completed!! ",
                    //showConfirmButton: false,
                    allowOutsideClick: false,
                    timer: 10000,
                    onBeforeOpen: () => {
                        //Swal.showLoading()
                        timerInterval = setInterval(() => {
                            Swal.getContent().querySelector('strong')
                                .textContent = Swal.getTimerLeft()
                        }, 100)
                    },
                    onClose: () => {
                        clearInterval(timerInterval)
                        window.open('TechnicalAnalysisTesting.aspx?crfid=1', '_self');
                    }
                }).then((result) => {
                    if (
                        // Read more about handling dismissals
                        result.dismiss === Swal.DismissReason.timer
                    ) {
                        window.open('TechnicalAnalysisTesting.aspx?crfid=1', '_self');
                    }
                })

            }
        });
    }
    


}



function Decrypt(value) {
    var result = "";
    var array = value.split("-");

    for (i = 0; i < array.length; i++) {
        result += String.fromCharCode(array[i] - 10);
    }
    return result;
} 

function isNumber(evt, val1, isDec) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (isDec == 0 && charCode == 46) {
        return false;
    } else if (isDec == 1 && charCode == 46) {
        var dec = val1.split('.');
        if (dec.length > 1 && charCode == 46) {
            return false;
        }
    }

    if (charCode == 37 || charCode == 39 || charCode == 46) {
        return true;
    }
    if ((charCode > 31 && charCode < 48) || charCode > 57) {
        return false;
    }
    return true;
}

