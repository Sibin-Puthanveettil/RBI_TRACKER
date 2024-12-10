$(window).on('load', function () {
    GetDeveloper();
    TeamMembers();
    $('#ddlWorks').val(-1);
    $("#fromdate").datepicker({
        dateFormat: 'dd/M/yy',
        changeMonth: true,
        changeYear: true,
        stepMonths: true,
        maxDate: '0',
        todayHighlight: true,

        onSelect: function (dateText, inst) {
        }

    });
    $("#todate").datepicker({
        dateFormat: 'dd/M/yy',
        changeMonth: true,
        changeYear: true,
        stepMonths: true,
        maxDate: '0',
        todayHighlight: true,

        onSelect: function (dateText, inst) {
        }

    });
    $("#commonRpt").show();
    checkAccessiblity($("[id*=hdUserId]").val());
});
function checkAccessiblity(usr) {
    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "DailyTrackReport.aspx/Accessible",
        data: "{pageVal:'GetAccessible', pageval1 :'" + usr+"', pageval2 :''}",
        dataType: "json",
        success: function (Result) {
            Result = Result.d;
            if (Result == '999') {
                $("#rbcwr").prop("disabled", true);
                $("#rbtwr").prop("disabled", true);
                $("#rbQArpt").prop("disabled", true);
            }
        }
    });
}
function GetDeveloper() {

    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "DailyTrackReport.aspx/getFillData",
        data: "{pageVal:'GetDeveloper', pageval1 :'', pageval2 :''}",
        dataType: "json",
        success: function (Result) {
            Result = Result.d;
            //$('#ddlDevlp').append($("<option></option>").val("-1").html("Choose Developer"));
            $.each(Result, function (key, value) {
                $('#ddlDevlp').append($("<option></option>").val(value.id).html(value.name));
               // $('#ddlDevlp1').append($("<option></option>").val(value.id).html(value.name));
            });
        }
    }); 
}

function TeamMembers() {
    
    var user = $("[id*=hdUserId]").val();
    
    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "DailyTrackReport.aspx/getFillData",
        data: "{pageVal:'TEAMMz', pageval1 :'" + user+"', pageval2 :''}",
        dataType: "json",
        success: function (Result) {
            Result = Result.d;
            $('#ddlDevlp1').append($("<option></option>").val("-1").html("Choose Developer"));
            $.each(Result, function (key, value) {
                $('#ddlDevlp1').append($("<option></option>").val(value.id).html(value.name));
            });
        }
    });
}
function GetAssignedWork() {
   // alert('d');
    var seldevpr = $("#ddlDevlp").val();
    if (seldevpr == 0) {
        $("#AssgnedWrks").hide();
        $("#AssgnedWrks1").hide();
    }
    else {
        $("#AssgnedWrks").show();
        $("#AssgnedWrks1").show();
    }
   // $('#ddlWorks').empty();
    //alert(seldevpr);
    debugger;
    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "DailyTrackReport.aspx/GetAssgnedWrk",
        data: "{pageVal:'GetAssignedPrjt', pageval1 :'"+seldevpr+"'}",
        dataType: "json",
        success: function (Result) {
            Result = Result.d;
           // $('#ddlDevlp').append($("<option></option>").val("-1").html("Choose Developer"));
            $.each(Result, function (key, value) {
                $('#ddlWorks').append($("<option></option>").val(value.id).html(value.name));
            });
        }
    });
}
function frmExit() {
    window.open("index.aspx", "_self");
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

function viewReport() {
    var flag = "";
   // alert($("[id*=hdUserId]").val());
    flag = $("input:radio[name=Rpt]:checked").val();
    var fromdate = $("#fromdate").val();
    var todate = $("#todate").val();
    if (flag == 0) {
       
        var devolpr = $('#ddlDevlp').val();
        //if (devolpr == "-1") {
        //    alert("Choose a Developer..!");
        //    $('#ddlDevlp').focus();
        //    return false;
        //}
        if (fromdate == "") fromdate = "-1";
        if (todate == "") todate = "-1";
        var dd = $('#ddlWorks').val();       
        wh = devolpr + 'æ' + dd + 'æ' + fromdate + 'æ' + todate + 'æ';
        encryptUrl(wh);       
    }
    else if (flag == 1) {
        if ($('#ddCRF').val() == "") {
            alert("Please enter CRFID ");
            $('#ddCRF').focus();
            return false;
        }
        else {
            
            if (fromdate == "") fromdate = "-1";
            if (todate == "") todate = "-1";
            wh = $('#ddCRF').val() + 'æ' + fromdate + 'æ' + todate + 'æ'+'CRFWISE';
            encryptUrl(wh);
        }

    }
    else if (flag == 2) {
          if (fromdate == "") fromdate = "-1";
        if (todate == "") todate = "-1";
        var teamList = $("#ddlDevlp1").val();
        if (teamList == "") {
            alert("Choose Developers:");
            return false;
        }
        wh = teamList + 'æ'+fromdate + 'æ' + todate + 'æ' + 'TMWISE';
        encryptUrl(wh);

    }

    else if (flag == 3) {
        if ($('#ddCRFQA').val() == "") {
            alert("Please enter CRFID ");
            $('#ddCRFQA').focus();
            return false;
        }
        else {

            if (fromdate == "") fromdate = "-1";
            if (todate == "") todate = "-1";
            wh = $('#ddCRFQA').val() + 'æ' + fromdate + 'æ' + todate + 'æ' + 'CRF-WISEQA';
            encryptUrl(wh);
        }

    }
    
}
function showCommon() {
    $("#commonRpt").show();
    $("#CrfWiseRpt").hide();
    $("#TeamRpt").hide();
    $("#CrfWiseRptQA").hide();
    clear();
}
function showCRFWise() {
    $("#commonRpt").hide();
    $("#CrfWiseRpt").show();
    $("#TeamRpt").hide();
    $("#CrfWiseRptQA").hide();
    clear();
}
function showTeamWise() {
    $("#commonRpt").hide();
    $("#CrfWiseRpt").hide();
    $("#TeamRpt").show();
    $("#CrfWiseRptQA").hide();
    clear();
}
function showCRFWiseQA() {
    $("#commonRpt").hide();
    $("#CrfWiseRpt").hide();
    $("#TeamRpt").hide();
    $("#CrfWiseRptQA").show();
    clear();
}
function encryptUrl(dtdata) {
    //alert('enter');
    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "DailyTrackReport.aspx/Encrypt",
        data: "{clearText:'" + dtdata + "'}",
        dataType: "json",
        success: function (Result) {
            Result = Result.d;
           //alert(Result);
            //window.open("POFormView.aspx?poid=" + Result);
            window.open("DailyReport.aspx?mnuId=" + Result + "");

        }
    });

}
function clear() {
    $("#fromdate").val("");
    $("#todate").val("");
    $("#ddlDevlp").val('-1');  
    $("#ddCRF").val(""); 
    $("#ddlDevlp1").val("");
    $("#ddCRFQA").val("");
}