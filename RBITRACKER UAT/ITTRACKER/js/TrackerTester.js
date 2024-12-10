
$(window).on('load', function () {

    WorkDescLoad();
    checkdata();
    $("[id*=hddraftid]").val('');
    let querystring = window.location.search.substring(1);
    let crfid = querystring.split("=")[1];
    AssignedProjectLoad();
    
    $("#datepicker").datepicker({
        dateFormat: 'dd/M/yy',
        changeMonth: true,
        changeYear: true,
        stepMonths: true,
        maxDate: '0',
        todayHighlight: true,

        onSelect: function (dateText, inst) {
        }

    });
    GetTeamList();
});
function GetTeamList() {
    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "AddRequest.aspx/getFillData",
        data: "{pageVal:'IT_TEAM', pageval1 :''}",
        dataType: "json",
        success: function (Result) {
            Result = Result.d;
            $('#ddlTeam').append($("<option selected disabled></option>").val("-1").html("Choose Team"));
            $.each(Result, function (key, value) {
                $('#ddlTeam').append($("<option></option>").val(value.id).html(value.name));
            });
        }
    });
}
function checkdata() {

    var usr = $("[id*=hdUserId]").val();
    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "Dailytrackingtester.aspx/selectdata",
        data: "{pageVal:'CHECKDETAILS', pageval1 :'" + usr + "'}",
        dataType: "json",
        success: function (Result) {
            Result = Result.d;

            if (Result != '100~') {
                display(Result);
            }

        }
    });
}

function FillAssignedProjects(CRFID) {
    var CRFID = $("#ddlCrf").val();
    $("[id*=hddraftid]").val(CRFID);
    CRFSearch(CRFID);
    $("#snote").show();
    detailsLoad(CRFID);
    filesFill(CRFID);
    selectmodule();



}

function AssignedProjectLoad() {
    var usr = $("[id*=hdUserId]").val();

    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "Dailytrackingtester.aspx/getFillData",
        data: "{pageVal:'GetAssignedPrjt', pageval1 :'" + usr + "'}",
        dataType: "json",
        success: function (Result) {
            Result = Result.d;


            $.each(Result, function (key, value) {
                $('#ddlWorks').append($("<option></option>").val(value.id).html(value.name));
            });
        }
    });
}

/*Selected assigned project*/
function SelectAssignedProjects() {
    var projectid = $("#ddlWorks").val();
    var assgnedwork = "";
    assgnedwork = $("#ddlWorks option:selected").text();

    
}
/*Description of work performed*/
function WorkDescLoad() {

    var usr = $("[id*=hdUserId]").val();
    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "Dailytrackingtester.aspx/getDescOfWork",
        data: "{pageVal:'GetDescOfWorkTester', pageval1 :'" + usr + "'}",
        dataType: "json",
        success: function (Result) {
            Result = Result.d;

            // $('#ddlCrf').append($("<option selected disabled></option>").val("-1").html("Choose CRF"));
            $.each(Result, function (key, value) {
                $('#ddlDesc').append($("<option></option>").val(value.id).html(value.name));
            });

        }
    });
}
function ShowDesc() {
    $("#select_date_frm").show();
    $("#txtsection").show();
    $("#timesectn").show();

}
/*Add butn function*/
function AddNote() {
    debugger;
    var dat = $("#datepicker").val();


    var AssgnedWork = "", AssignedWorkDetail = "", DescWork = "", DescWorkText = "", DetailDesc = "", Remarks = "", Time = "", Hr = "", Min = "", percent="";
    AssgnedWork = $("#txtWorks").val(); 
    AssignedWorkDetail = $("#txtDescription").val();
   // alert(AssgnedWork);
   // alert(AssignedWorkDetail);

    DescWork = $("#ddlDesc").val();
    DescWorkText = $("#ddlDesc option:selected").text();
    DetailDesc = $("#txtReason").val();
    Remarks = $("#txtRemarks").val();
    percent = $("#txtpercentage").val();
    if (percent > 100) { alert("Percentage of completion should not exceed 100%"); return false; }
    ///*#<%=*/recipient.ClientID %>
    // Hr = document.getElementById("<%=ddlHours.ClientID %>").val();
    Hr = $("#ContentPlaceHolder1_ddlHours").val();
    // Hr = $("#<%=ddlHours.ClientID %>").val();
    //alert(Hr);
    Min = $("#ContentPlaceHolder1_ddlMinutes").val();
    // Min = $("#ddlMinutes").val();
    Time = Hr + ":" + Min;
    //Time = $("#ttime").val();
    //alert(Time);
    //||  DescWork == -1 
    if (AssgnedWork == "" || DescWork == -1 || DetailDesc == "" || Remarks == "" || Time == "0:00" || dat == "" || percent == "") {
        if (AssgnedWork == -1) {
            alert('Enter assigned work');
            return false;
        }
        else if (DescWork == -1) {
            alert('Select description of work performed');
            return false;
        }
        else if (DetailDesc == "") {
            alert('Enter reason in detail description');
            return false;
        }
        else if (Remarks == "") {
            alert('Please enter your remarks');
            return false;
        }
        else if (Time == "0:00") {
            alert('Please enter time taken for your discussion');
            return false;

        }

        else if (dat == "") {
            alert('Please Select date');
            return false;

        }

        else if (percent == "") {
            alert('Please enter the percentage of completion');
            return false;
        }


    }
    else {


        data = AssgnedWork + "^" + AssignedWorkDetail + "^" + DescWork + "^" + DescWorkText + "^" + DetailDesc + "^" + Time + "^" + Remarks + "^" + dat + "^" + percent + "~";
      
        display(data);
    }
}
var n = 0;
function display(data) {
   // alert("hai");
    debugger;
    var valData = data.split('~');
    //alert(data);
    //alert("Length:"+valData.length);
    if ($("#tableData tr").length == 0) {
        $("#tableData").empty();
        $("#tableData").append('<tr style="background-color:#fdd935;color:#ed2023"><th class="text-center">SLNo.</th><th class="text-center">Assigned Work</th><th class="text-center">Description of Work Performed</th><th class="text-center">Detail Description</th><th class="text-center">Time</th><th class="text-center">Remarks</th><th class="text-center">Date</th><th class="text-center">Percentage</th><th class="text-center">Delete</th><tr>');
    }

    for (i = 0; i < valData.length - 1; i++) {
        //alert('ww');
        valData1 = valData[i].split('^');
       

        $("#tableData").append('<tr id="row_' + (n + 1) + '">' +

            '<td class="text-center slrow_' + (n + 1) + '">' + parseInt(n + 1) + '</td>' +

            '<td class="text-center">' + valData1[1] +  '</td>' +
            '<td class="text-center">' + valData1[3] + '</td>' +
            '<td class="text-center">' + valData1[4] + '</td>' +

            '<td class="text-center">' + valData1[5] + '</td>' +
            '<td class="text-center" >' + valData1[6] + '</td>' +
            '<td class="text-center" >' + valData1[7] + '</td>' +
            '<td class="text-center" >' + valData1[8] + '</td>' +

            '<td class="text-center" ><i class="fas fa-trash-alt" style="cursor:pointer" onclick="FnDelete(' + (n + 1) + ',' + valData1[8] + ')"></i></td>' +
            //'<td class="text-center" style="display:none"><input type="hidden" id="workrow_' + (n + 1) + '" value="' + valData1[0] + '"></td>' +
            '<td class="text-center" style="display:none">' + valData1[0] + '</td>' +

            //'<td class="text-center" style="display:none"><input type="hidden" id="descrow_' + (n + 1) + '" value="' + valData1[2] + '"></td>'+
            '<td class="text-center" style="display:none">' + valData1[2] + '</td>' +
            '</tr >');

        n = n + 1;

    }

    $("#tableData").show();

    $("#txtReason").val("");
    $("#txtRemarks").val("");
    $("#txtpercentage").val("");
    $("#datepicker").val("");
    $("#showSubmitBtn").show();
}
function frmExit() {
    window.open("index.aspx", "_self");

}
/*insert data into tabel */
function ConfirmNote() {
    debugger;
    var ItemDtls = "";
    var usr = $("[id*=hdUserId]").val();

    //if ($("#tableData tr").length == 0 || $("#tableData tr").length == 1) {
    if ($("#tableData tr").length == 0) {
        alert("Add Any Item....!!!!");
        return false;
    }
    else {
        var table = document.getElementById('tableData');

        var rowLength = table.rows.length;


        for (var i = 1; i < rowLength - 1; i++) {
            debugger;

            var DescId = table.rows[i + 1].cells[10].innerHTML;

            // var DraftDtl = data.split('-');
            // alert("rowleng:"+rowLength);
            var workId = table.rows[i + 1].cells[9].innerHTML;
            //ItemDtls = ItemDtls + table.rows[i].cells[1].innerHTML + '^' + table.rows[i].cells[2].innerHTML + '^' + table.rows[i].cells[3].innerHTML + '^' + table.rows[i].cells[4].innerHTML + '^' + table.rows[i].cells[5].innerHTML + '$';
            ItemDtls = ItemDtls + workId + '^' + DescId + '^' + table.rows[i + 1].cells[3].innerHTML + '^' + table.rows[i + 1].cells[4].innerHTML + '^' + table.rows[i + 1].cells[5].innerHTML + '^' + usr + '^' + table.rows[i + 1].cells[6].innerHTML + '^' + table.rows[i + 1].cells[7].innerHTML + '$';

        }

        
        $.ajax({
            type: "post",
            contentType: "application/json; charset=utf-8",

            url: "dailytrackingtester.aspx/InsertData",
            data: "{pageVal:'DailyTrack', pageval1 :'" + ItemDtls + "',pageval2:'" + usr + "'}",
            dataType: "json",
            success: function (result) {

                result = result.d;
                alert(result);
                window.open('dailytrackingtester.aspx?crfid=1', '_self');
            },
            error: function (result) {
               // alert('Failed');
                // window.location = "../VMSReports/vms_maintenance.aspx";
            }
        });


    }

}
function FnDelete(val, val1) {

    $("#row_" + val).remove();

    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "Dailytrackingtester.aspx/selectdata",
        data: "{pageVal:'DELETEROW', pageval1 :'" + val1 + "'}",
        dataType: "json",
        success: function (Result) {
            Result = Result.d;

            if (Result == '1~') {
                alert("Deleted");
            }


        }
    });
    var table = document.getElementById('tableData');

    var rowLength = table.rows.length;

    if (rowLength < 3) {
        $("#tableData").hide();
    }
   
}

function onlyNos(e, t) {

    try {
        if (window.event) { //To disable other button clicks
            if (window.event.keyCode == 13) { e.preventDefault(); } var charCode = window.event.keyCode;
        } else if (e) { var charCode = e.which; } else { return true; } if (charCode > 31 && (charCode < 48 || charCode > 57)) { return false; } return true;
    } catch (err) { alert(err.Description); }
}

          