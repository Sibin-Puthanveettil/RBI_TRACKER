$(window).on('load', function () {
    
    $("#txtFromDate").datepicker({
        dateFormat: 'dd/MM/yy',
        changeMonth: true,
        changeYear: true,
        stepMonths: true,
        todayHighlight: true,
        onSelect: function (dateText, inst) {
        }

    });
    $("#txtToDate").datepicker({
        dateFormat: 'dd/MM/yy',
        changeMonth: true,
        changeYear: true,
        stepMonths: true,
        todayHighlight: true,
        onSelect: function (dateText, inst) {
        }

    });
    //GetFirmList();
    //GetDocTypeList();
    //GetDepartment();
    GetStatus();
    //GetReportAccess();
});
function frmExit() {
    window.open("index.aspx", "_self");
}

function viewBugReport() {
    var frmDateCom = $("#txtFromDate").val();
    var ToDateCom = $("#txtToDate").val();
    var newFrmDate = Date.parse(frmDateCom);
    var NewToDate = Date.parse(ToDateCom);
    var dateDifference = NewToDate - newFrmDate;
    if (dateDifference < 0) {
        alert("Choose To Date greater than From Date");
        $("#txtFromDate").val("");
        $("#txtToDate").focus();
        return;
    }

    wh = $('#txtFromDate').val() + 'æ' + $('#txtToDate').val() + 'æ' + $('#ddlStatus').val() + 'æ' + $('#txtCrdId').val() + 'æ' + $('#txtRequestId').val() + 'æ';

    encryptUrl(wh);

}
function onlyNos(e, t) {

    try {
        if (window.event) { //To disable other button clicks
            if (window.event.keyCode == 13) { e.preventDefault(); } var charCode = window.event.keyCode;
        } else if (e) { var charCode = e.which; } else { return true; } if (charCode > 31 && (charCode < 48 || charCode > 57)) { return false; } return true;
    } catch (err) { alert(err.Description); }
}
//-----------select Department-------------------//

function GetStatus() {
  
    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "BugStatusReport.aspx/getFillData",
        data: "{pageVal:'GetBugStatusReport', pageval1 :'', pageval2 :''}",
        dataType: "json",
        success: function (Result) {
            Result = Result.d;
            $('#ddlStatus').append($("<option ></option>").val("-1").html("All Status"));
            $.each(Result, function (key, value) {
                $('#ddlStatus').append($("<option></option>").val(value.id).html(value.name));
            });
            //$('#ddlStatus').append($("<option ></option>").val("111").html("My Recommended"));
        }
    });
}
//-----------select firm -------------------//

function GetFirmList() {
    var QueryString = "GetFirmList";
    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "StatusReport.aspx/getFillData",
        data: "{pageVal:'GetFirmList', pageval1 :'', pageval2 :''}",
        dataType: "json",
        success: function (Result) {
            Result = Result.d;
            $('#ddlFirm').append($("<option ></option>").val("-1").html("All Firm"));
            $.each(Result, function (key, value) {
                $('#ddlFirm').append($("<option></option>").val(value.id).html(value.name));
            });
        }
    });
}


//-----------select Department-------------------//

function GetDepartment() {
    var QueryString = "GetDepartment";
    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "StatusReport.aspx/getFillData",
        data: "{pageVal:'getDepartment', pageval1 :'', pageval2 :''}",
        dataType: "json",
        success: function (Result) {
            Result = Result.d;
            $('#ddlDept').append($("<option ></option>").val("-1").html("All Department"));
            $.each(Result, function (key, value) {
                $('#ddlDept').append($("<option></option>").val(value.id).html(value.name));
            });
        }
    });
}
//-----------select Document type-------------------//

function GetDocTypeList() {
    var QueryString = "GetDocTypeList";
    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "BugStatusReport.aspx/getFillData",
        data: "{pageVal:'GetDocTypeList', pageval1 :'', pageval2 :''}",
        dataType: "json",
        success: function (Result) {
            Result = Result.d;
            $('#ddlDocType').append($("<option ></option>").val("-1").html("All Document Type"));
            $.each(Result, function (key, value) {
                $('#ddlDocType').append($("<option></option>").val(value.id).html(value.name));
            });
        }
    });
}
function encryptUrl(dtdata) {
    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "BugStatusReport.aspx/Encrypt",
        data: "{clearText:'" + dtdata + "'}",
        dataType: "json",
        success: function (Result) {
            Result = Result.d;
            //window.open("POFormView.aspx?poid=" + Result);
            window.open("BugReport.aspx?mnuId=" + Result + "");

        }
    });

}
