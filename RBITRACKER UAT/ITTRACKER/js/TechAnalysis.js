$(window).on('load', function () {
    $("[id*=hddraftid]").val('');
    let querystring = window.location.search.substring(1);
    let crfid = querystring.split("=")[1];
    $("[id*=hdman]").val(0);
    $("[id*=hddev]").val(0);
    $("[id*=hdcst]").val(0);
    $("[id*=hdtest]").val(0);
    $("[id*=hddata]").val("");
    $("[id*=hdRqstID]").val(0);
    $("[id*=hdDevlpr]").val("");
    $("#Doc").hide();
    if (crfid == 1) {
        $("#div1").show();
        $("#div2").hide();
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
        filesFill(crfid);
        
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
    getDepartment();
  
});
function CRFLoad() {
    var usr = $("[id*=hdUserId]").val();
    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "TechnicalAnalysis.aspx/getFillData",
        data: "{pageVal:'TechLeadVerification', pageval1 :'" + usr + "'}",
        dataType: "json",
        success: function (Result) {
            Result = Result.d;
            // $('#ddlCrf').append($("<option selected disabled></option>").val("-1").html("Choose CRF"));
            $.each(Result, function (key, value) {
                $('#ddlCrf').append($("<option></option>").val(value.id).html(value.name));
            });
        }
    });
}
function fillCRFData() {
    var CRFID = $("#ddlCrf").val();
    $("[id*=hddraftid]").val(CRFID);
    CRFSearch(CRFID);
    $("#snote").show();
    if (CRFID == -1) {
        $("#CrfDetailsID").hide();
    }
    else {
        $("#CrfDetailsID").show();

    }
    detailsLoad(CRFID);
    filesFill(CRFID)
    GetRequestId(CRFID);
    $("#txtRemarks").val("");
    ModHdFdback(CRFID);

}
function CRFIDLBL(noteid) {
    var usr = $("[id*=hdUserId]").val();
    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "TechnicalAnalysis.aspx/getRequestNote",
        data: "{pageVal:'CRFSUBJECTREQST', pageval1:'" + noteid + "',pageval2:'" + usr+"'}",
        dataType: "json",
        success: function (Result) {
            Result = Result.d;
            $('#lblCRFID').html(Result);
            var reqid = Result.split('~');
            
            $("[id*=hdRqstID]").val(reqid[1]);
        }
    });
}
function GetRequestId(CRFID) {
    
    var usr = $("[id*=hdUserId]").val();
    usr = usr + '^' + CRFID;
    var dtl = $('#ddlCrf option:selected').text();
    var ddtl = dtl.split('~');

    $("[id*=hdRqstID]").val(ddtl[1]);
   
}
function CRFSearch(CRFID) {
    

    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "TechnicalAnalysis.aspx/getFillData",
        data: "{pageVal:'DraftApproveDetail', pageval1 :'" + CRFID + "'}",
        dataType: "json",
        success: function (Result) {

            Result = Result.d;
            $.each(Result, function (key, value) {
                var crfdtl = value.id;

                var cdtl = crfdtl.split('±');

                $('#lblTeam').html(cdtl[0]);
                $('#lblType').html(cdtl[1]);;
                $('#lblReqtr').html(cdtl[2]);
                $('#lblRqstDt').html(cdtl[3]);
                $('#lblTarDt').html(cdtl[4]); 
                if (cdtl[6] == 1) {
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
            });
        },
        error: function (Result) {

            alert(Result);
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
        url: "TechnicalAnalysis.aspx/getRequestNote",
        data: "{pageVal:'GetRequestNotes', pageval1:'" + noteid + "',pageval2:'2'}",
        dataType: "json",
        success: function (Result) {
            Result = Result.d;
            $('.summernoteview').summernote('code', Result);
        }
    });
}

function filesFill(noteid) {

    $("#tblFiles").empty();
    var filenm = $("[id*=hdUserId]").val() + noteid.replace(/[^a-zA-Z0-9]/g, '') + "_";
    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "TechnicalAnalysis.aspx/getFileData",
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
    $("#dman").show();
    $("#dman1").show();
    $("#dman2").show();
    $("#dman3").show();
    $("#dman4").show();
    GetChangeList();
}
function infra() {
    $("#dmans").show();
    $("#dmans1").show();
    $("#dmans2").show();
    $("#dmans3").show();
   
}
function infras() {
    $("#dmans").hide();
    $("#dmans1").hide();
    $("#dmans2").hide();
    $("#dmans3").hide();

}
function inimp() {
    $("#dmanz").show();
}
function inimpa() {
    $("#dmanz").hide();
}
function GetChangeList() {
    $('#ddlChange').empty();
    var CRFID1 = $("#ddlCrf").val();

    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "TechnicalAnalysis.aspx/getFillData",
        data: "{pageVal:'IT_CHANGES', pageval1 :'" + CRFID1 + "'}",
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
        url: "TechnicalAnalysis.aspx/getFillData",
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
function getDepartment() {

    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "CRFStatusReport.aspx/getFillData",
        data: "{pageVal:'getDepartment', pageval1 :'', pageval2 :''}",
        dataType: "json",
        success: function (Result) {
            Result = Result.d;
            $('#ddlDept').append($("<option></option>").val("-1").html("Choose Department"));
            $.each(Result, function (key, value) {
                $('#ddlDept').append($("<option></option>").val(value.id).html(value.name));
            });
        }
    });
}
function CalTotal() {

    if ($("#ddlCrf").val() == -1) {
        alert("Please choose a CRF.!");
        $("#ddlCrf").focus();
        return false;
    }

    if ($("#ddlDevlp").val() == -1) {
        alert("Choose a developer.!");
        $("#ddlDevlp").focus();
        return false;
    }
   
    if ($("#txtStartDt").val() != "") {
        var frmDateCom = $("#txtStartDt").val();
        var newFrmDate = Date.parse(frmDateCom);

    }
    else {
        alert("Choose Start Date.!")
        $("#txtStartDt").focus();
        return false;
    }

    if ($("#txtEndDt").val() != "") {
        var ToDateCom = $("#txtEndDt").val();
        var NewToDate = Date.parse(ToDateCom);
    }
    else {
        alert("Choose End Date.!")
        $("#txtEndDt").focus();
        return false;
    }
    var dateDifference = NewToDate - newFrmDate;
    if (dateDifference < 0) {
        alert("Choose End Date greater than Start Date.!");
        $("#txtEndDt").val("");
        $("#txtEndDt").focus();
        return false;
    }

    //if ($("#ddlDevlp").val() == '-1') {
    //    alert("Select Developer!!!");
    //    $("#ddlDevlp").focus();
    //    return false;
    //}
    //if (ToDateCom == "") {
    //    alert("Enter End Date!!!");

    //    $("#txtEndDt").focus();
    //    return false;
    //}
    //if (frmDateCom == "") {
    //    alert("Enter Start Date!!!");

    //    $("#txtStartDt").focus();
    //    return false;
    //}

    //const dateDifference = NewToDate.getDate() - newFrmDate.getDate();



    if ($("#ddlChange").val() == -1 || $("#ddlChange").val() == null) {
        alert("Select Changes !!!");
        $("#ddlChange").focus();
        return false;
    }

    if ($("#ddlWork").val() == -1|| $("#ddlWork").val() == null) {
        alert("Select Related Work  !!!");
        $("#ddlWork").focus();
        return false;
    }
    if ($("#TNoc").val() == "" || $("#TNoc").val() == '0') {
        alert("Enter No Of  Changes!!!");
        $("#TNoc").focus();
        return false;
    }
    var chid = $("#ddlWork").val();
    var wrk = chid.split('^');
    var data1,totm = 0, totc = 0, cst, wrkhr, noc, data = "", totman = 0, totcst = 0, tstval, tstrslt, totdev=0, tottst=0,totcod=0,totvapt=0;
    totdev = $("[id*=hddev]").val();
    totcst = $("[id*=hdcst]").val();
    tstval = $("[id*=hdtest]").val();
    data1 = $("[id*=hddata]").val();
    tstrslt = tstval.split('^');
    noc = $("#TNoc").val();
    wrkhr = wrk[1];
    cst = wrk[2];
    totm = noc * wrkhr;
   
    data = $('#txtPhase').val() + "^" + $('#ddlChange option:selected').text() + "^" + $('#ddlWork option:selected').text() + "^" + $("#TNoc").val() + "^" + totm + "^" + $('#ddlDevlp option:selected').text() + "^" + $("#txtStartDt").val() + "^" + $("#txtEndDt").val() + "^" + $('#ddlChange').val() + "^" + $('#ddlWork').val() + "^" + $('#ddlDevlp').val() + "¶";
    data1 = data1 + data;
    $("[id*=hddata]").val(data1);
    //alert($('#ddlChange').val());
   // alert($('#ddlWork').val());

    filltab(data);

    totdev = parseInt(totdev) + parseInt(totm);
    //tottst = parseFloat(totdev * tstrslt[0]).toFixed(2);
    totcod = parseFloat(totdev * tstrslt[1]).toFixed(2);
    //totvapt = parseFloat(totdev * tstrslt[2]).toFixed(2);
    totman = parseFloat(totdev) + parseFloat(totcod);
    //totcst = parseFloat(parseInt(totman) * parseInt(cst)).toFixed(2);
    $("#DevWork").val(totdev);
    $("#TstWrk").val(tottst);
    $("#CodWork").val(totcod);
   // $("#VaptWrk").val(totvapt);
    $("#TWork").val(totman);
   // $("#TCost").val(totcst);
    $("[id*=hddev]").val(totdev);
    $("[id*=hdman]").val(totman);
    //$("[id*=hdcst]").val(totcst);
    $("#TNoc").val("");
    //$("#ddlWork").val("-1");
    //$("#ddlDevlp").val("-1");
    //$("#txtStartDt").val("");
    //$("#txtEndDt").val("");
    //$("#ddlChange").val("-1");
    //$("#txtPhase").val("");
}
function filltab(data) {
      var valData, valData1, gstno, n = 1;
      valData = data.split('¶');
      //alert(valData);
     if ($("#tabChange tr").length == 0) {
          $("#tabChange").empty();
         $('#tabChange').append('<tr style="color:black; background-color:honeydew" class="text-left"><th class="text-left">Phase</th><th class="text-left">change</th><th class="text-left">Work</th><th class="text-left">Number</th><th class="text-left">Manpower</th><th class="text-left">Developer</th><th class="text-left">StartDt</th><th class="text-left">EndDt</th><th class="text-left">DELETE</th></tr>');
     }
      //var sno = $('#tableData tr').length;
      for (i = 0; i < valData.length - 1; i++) {
        valData1 = valData[i].split('^');
        
        $('#tabChange').append('<tbody><tr>' +

            '<td>' + valData1[0] + '</td>' +
            '<td>' + valData1[1] + '</td>' +
            '<td>' + valData1[2] + '</td>' +
            '<td>' + valData1[3] + '</td>' +
            '<td>' + valData1[4] + '</td>' +
            '<td>' + valData1[5] + '</td>' +
            '<td>' + valData1[6] + '</td>' +
            '<td>' + valData1[7] + '</td>' +
            '<td style="display:none">' + valData1[8] + '</td>' +
            '<td style="display:none">' + valData1[9] + '</td>' +
            '<td style="display:none">' + valData1[10] + '</td>' +
            '<td style="display:none">' + valData1[11] + '</td>' +
            '<td style="display:none">' + valData1[12] + '</td>' +
            '<td><a href="javascript:void(0);" class="remove"  id="remrow"><span class="glyphicon glyphicon-trash">Remove</span></a></td></tr > </tbody > ');
         }

 }
function GetTestValue() {
 
    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "TechnicalAnalysis.aspx/getFillData",
        data: "{pageVal:'TESTVALUE', pageval1 :''}",
        dataType: "json",
        success: function (Result) {
            Result = Result.d;
            $.each(Result, function (key, value) {
                var val1 = value.id;
                $("[id*=hdtest]").val(val1);
            });
        }
    });
}
function TeamMembers() {
    var usr = $("[id*=hdUserId]").val();
    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "TechnicalAnalysis.aspx/fillTable",
        data: "{pageVal:'TEAMMEMBERS', pageval1 :'" + usr + "'}",
        dataType: "json",
        success: function (Result) {
            Result = Result.d;
           // alert(Result);
                fillTableDtl(Result);
           
        }
    });
}
function fillTableDtl(data) {
    var valData, valData1;
    valData = data.split('§');
    $('#ddlDevlp').empty();
    $('#ddlDevlp').append($("<option></option>").val("-1").html("Choose Developer"));

    if ($("#tblEmps tr").length == 0) {
        $("#tblEmps").empty();
        $('#tblEmps').append('<tr style="background-color:rosybrown;color:black"><th class="text-center">EmpCode</th><th class="text-center">EmpName</th><th class="text-center">Date</th></tr>');
    }
    //var sno = $('#tableData tr').length;
    for (i = 0; i < valData.length - 1; i++) {
        valData1 = valData[i].split('^');

        $('#tblEmps').append('<tbody><tr class="text-center" style="background-color:linen" >' +


            '<td>' + valData1[0] + '</td>' +
            '<td>' + valData1[1] + '</td>' +
            '<td>' + valData1[2] + '</td></tr > </tbody > ');

        $('#ddlDevlp').append($("<option></option>").val(valData1[0]+'^'+valData1[3]).html(valData1[1]));
    }
 

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

function empdatesel() {
    var devlp = $("[id*=hdDevlpr]").val();
    var emp = $('#ddlDevlp').val();
    //alert(emp);

    //var empsplt = emp.split('^');
    //var stdt = empsplt[1];
    //stdt = stdt.replace(/-/g, '/');
    //var empid = empsplt[0];
    //$('#txtStartDt').val(stdt);
    //devlp = empid + '^' + devlp;
    //$("[id*=hdDevlpr]").val(devlp);
    
    var empsplt = emp.split('^');
    var stdt = empsplt[1];
    stdt = stdt.replace(/-/g, '/');
    var monthValue = stdt.split("/")[1];
    var mon = dateCheck(monthValue.toString().toLowerCase().substring(0, 3)); 
    var empid = empsplt[0];
    if (stdt.split("/")[2].length > 2) {
        $('#txtStartDt').val(stdt.split("/")[0] + "/" + mon + "/"+ stdt.split("/")[2]);
    }
    else {
        $('#txtStartDt').val(stdt.split("/")[0] + "/" + mon + "/20" + stdt.split("/")[2]);
    }
   
    devlp = empid + '^' + devlp;
    $("[id*=hdDevlpr]").val(devlp);

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

        //your code goes here, looping over every row.
        //cells are accessed as easy
        
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
        totdev = parseInt(totdev)+ parseInt(valData1[4]);

    }
    tstval = $("[id*=hdtest]").val();
    tstrslt = tstval.split('^');   
    //tottst = totdev * tstrslt[0];
    totcod = totdev * tstrslt[1];
   // totvapt = totdev * tstrslt[2];
    totman = parseInt(totdev) + parseInt(totcod);
   // totcst = parseInt(totman) * parseInt(cst);
    $("#DevWork").val(totdev);
    //$("#TstWrk").val(tottst);
    $("#CodWork").val(totcod);
    //$("#VaptWrk").val(totvapt);
    $("#TWork").val(totman);
    $("#TCost").val(totcst);
    $("[id*=hddev]").val(totdev);
    $("[id*=hdman]").val(totman);
   // $("[id*=hdcst]").val(totcst);
}

function TAConfirm() {
    var Prio = "";
    var imp = ""; 
    var rb = "";
    var infr = "";
    var Re = "";
    var dept = "";
    var CRFID = $("#ddlCrf").val();
    if (CRFID == -1) {
        alert("Please Choose CRF..");
        return false;
    }
    rbIn = $("input:radio[name=rbIn]:checked").val();
    //rbIn=$("#rbReturn").prop("checked")
    if (rbIn == '0') rb = "Yes";
    else if (rbIn == '1') rb = "No";

    rbImp = $("input:radio[name=rbImp]:checked").val();
    //rbIn=$("#rbReturn").prop("checked")
    if (rbImp == '0') imp = "Yes";
    else if (rbImp == '1') imp = "No";
    
    
    rbInfra = $("input:radio[name=rbInfra]:checked").val();
    if (rbInfra == '0') infr = "Yes";
    else if (rbInfra == '1') infr = "No";

    if (rb == ""){
        alert("Please Choose  InformationSecurity ..");
        return false;
    } 
    //if (imp == "") {
    //    alert("Please Choose Change impact ..");
    //    return false;
    //} 
    if (infr == "") {
        alert("Please Choose InfrastructureChange ..");
        return false;
    }    
   
    Module = $("#txtmodule").val();
    Space = $("#txtspac").val();
    Estimate = $("#txtestimate").val();
    Reason = $("#txtreason").val();
   // department = $("#ddlDept").val();

    rbPrio = $("input:radio[name=rbPrio]:checked").val();
    if (rbPrio == '0') Prio = "Low";
    else if (rbPrio == '1') Prio = "Medium";
    else if (rbPrio == '2') Prio = "High";
    if (Prio == "") {
        alert("Please Choose Risk Classification  ..");
        return false;
    }  
    //if ($("#ddlDept").val() == "") {
    //    alert("Please select the department !!!");
    //    $("#ddlDept").focus();
    //    return false;
    //}
    rbRe = $("input:radio[name=rbRe]:checked").val();
    if (rbRe == '0')  Re = "Low";
    else if (rbRe == '1') Re = "Medium";
    else if (rbRe == '2') Re = "High";
    //if (imp == 'Yes') {
    //    if ($("#ddlDept").val() == "") {
    //        alert("Please Complete impact change !!!");
    //        $("#ddlDept").focus();
    //        return false;
    //    }
    //}
    //    else {
    //        $("#ddlDept").val('Nil');
    //    }
    if (infr == 'Yes') {
        if (Re == "") {
            alert("Please Choose Impact in server resource..");
            return false;
        }
        if ($("#txtmodule").val() == "") {
            alert("Please Complete Infrastructure Change !!!");
            $("#txtmodule").focus();
            return false;
        }
        if ($("#txtspace").val() == "") {
            alert("Please Complete Infrastructure Change !!!");
            $("#txtspace").focus();
            return false;
        }
        if ($("#txtestimate").val() == "") {
            alert("Please Complete Infrastructure Change !!!");
            $("#txtestimate").focus();
            return false;
        }
        if ($("#txtreason").val() == "") {
            alert("Please Complete Infrastructure Change !!!");
            $("#txtreason").focus();
            return false;
        }
    }
    else {
        Re = 'Nil';
        $("#txtreason").val('Nil');
        $("#txtestimate").val('Nil');
        $("#txtspace").val('Nil');
        $("#txtmodule").val('0');
    }
    if ($("#ddlDept").val() == "") {
        dept = "Nil";
    }
    else {
        dept = $("#ddlDept").val();
    }

    $("[id*=hddraftid]").val(CRFID);

    var Data = '', itmdata = '',audit='';
    var reqid = $("[id*=hdRqstID]").val();

   //audit = Prio + 'µ' + rb + 'µ' + infr + 'µ' + $("#txtmodule").val() + 'µ' + $("#txtspace").val() + 'µ' + $("#txtestimate").val() + 'µ' + $("#txtreason").val() + 'µ' + Re + 'µ' + $("#ddlDept").val() + 'µ';
    audit = imp + 'µ' + rb + 'µ' + infr + 'µ' + Prio + 'µ' + dept + 'µ' + $("#txtmodule").val() + 'µ' + $("#txtspace").val() + 'µ' + $("#txtestimate").val() + 'µ' + Re + 'µ' + $("#txtreason").val() + 'µ';
    
  // alert(audit);
   // alert("rb")
    var rmk = $('#txtRemarks').val();
    var rmk = $('#txtRemarks').val();
    Data = $("[id*=hddraftid]").val() + 'µ' + $("[id*=hdRqstID]").val() + 'µ' + $   ("[id*=hdUserId]").val() + 'µ' + $('#DevWork').val() + 'µ' + $('#CodWork').val() + 'µ' + $('#TWork').val() + 'µ' + rmk + 'µ';
    if ($("[id*=hddata]").val() == "") {
        alert("Please Complete TA properly!!!");
        return false;
    }
    itmdata = $("[id*=hddata]").val();
    //alert(Data);
    //alert(itmdata);
    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "TechnicalAnalysis.aspx/TACompleteConfirm",
        data: "{pageVal:'TACONFIRM', pageval1 :'" + Data + "',pageval2:'" + itmdata + "',pageval3:'1',pageval4:'" + audit + "'}",
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
                        window.open('TechnicalAnalysis.aspx?crfid=1', '_self');
                    }
                }).then((result) => {
                    if (
                        // Read more about handling dismissals
                        result.dismiss === Swal.DismissReason.timer
                    ) {
                        window.open('TechnicalAnalysis.aspx?crfid=1', '_self');
                    }
                })


            }
            else {
                alert("Something went wrong.!Please contact IT Support");
            }


        }
    });


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

function ReturnNote() {
    var crfid = $("[id*=hddraftid]").val();
    if ($("#ddlCrf").val() == -1) {
        alert("Please choose a CRF to return..!");
        $("#ddlCrf").focus();
        return false;
    }

    if ($("#txtRemarks").val() == "") {
        alert("You need to add remarks for return.!");
        $("#txtRemarks").focus();
        return false;
    }

    var Data = '';

    Data = $("#txtRemarks").val() + 'µ' + crfid + 'µ' + $("[id*=hdUserId]").val() + 'µ';
    var sts = '2';

    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "TechnicalAnalysis.aspx/TACompleteConfirm",
        data: "{pageVal:'PMOReturn', pageval1 :'" + Data + "',pageval2:'" + crfid + "',pageval3:'" + sts + "',pageval4:''}", 
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
                html: "Success!! ",
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
                    window.open('TechnicalAnalysis.aspx?crfid=1', '_self');
                }
            }).then((result) => {
                if (
                    // Read more about handling dismissals
                    result.dismiss === Swal.DismissReason.timer
                ) {
                    window.open('TechnicalAnalysis.aspx?crfid=1', '_self');
                }
            })

        }
    });


}
function ModHdFdback(crfid) {
  //  alert("hai");
    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "TechnicalAnalysis.aspx/ModHdFeedback",
        data: "{pageVal:'ModHdFdback', pageval1 :'" + crfid + "'}",
        dataType: "json",
        success: function (Result) {
            Result = Result.d;
            if (Result != "NA") {
                $("#ModHeadFdbk").show();
                ModHdFdbackFill(Result);  
            }
            else $("#ModHeadFdbk").hide();
                                   
        }
    });
}
function ModHdFdbackFill(data) {
    var valData, valData1, risk, n = 1;
    valData = data.split('¶');
   // alert(data);
    if ($("#tblHdFdbk tr").length == 0) {
        $("#tblHdFdbk").empty();
        $('#tblHdFdbk').append('<tr style="color:black; background-color:honeydew" class="text-left"><th class="text-left">Module Name</th><th class="text-left">Head</th><th class="text-left">Sensitive Information</th><th class="text-left">Risk</th></tr>');
    }
    for (i = 0; i < valData.length-1; i++) {
        valData1 = valData[i].split('^');
        if (valData1[3] == '0') risk = "Low";
        else if (valData1[3] == '1') risk = "Medium";
        else if (valData1[3] == '2') risk = "High";
        $('#tblHdFdbk').append('<tbody><tr>' +

            '<td>' + valData1[0] + '</td>' +
            '<td>' + valData1[1] + '</td>' +
            '<td>' + valData1[2] + '</td>' +
            '<td>' + risk + '</td> </tbody > ');
    }

}