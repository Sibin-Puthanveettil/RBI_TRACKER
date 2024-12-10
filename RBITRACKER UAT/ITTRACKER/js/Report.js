$(window).on('load', function () {
    GetFirmList();
    GetDocTypeList();
    GetDepartment();
    GetStatus();
    $("[id*=hdnPriority]").val("-1");
    
});
function frmExit() {
    window.open("index.aspx", "_self");
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

function GetStatus() {
    var QueryString = "GetStatus";
    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "StatusReport.aspx/getFillData",
        data: "{pageVal:'GetStatus', pageval1 :'', pageval2 :''}",
        dataType: "json",
        success: function (Result) {
            Result = Result.d;
            $('#ddlStatus').append($("<option ></option>").val("-1").html("All Status"));
            $.each(Result, function (key, value) {
                $('#ddlStatus').append($("<option></option>").val(value.id).html(value.name));
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
        data: "{pageVal:'GetDepartment', pageval1 :'', pageval2 :''}",
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
        url: "StatusReport.aspx/getFillData",
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


$(document).ready(function () {
       $('#rbnPriority a').on('click', function () {
        var sel = $(this).data('title');
        var tog = $(this).data('toggle');
        $('#' + tog).prop('value', sel);

        $('a[data-toggle="' + tog + '"]').not('[data-title="' + sel + '"]').removeClass('active').addClass('notActive');
        $('a[data-toggle="' + tog + '"][data-title="' + sel + '"]').removeClass('notActive').addClass('active');
        if (sel == 1) {
            $('a[data-toggle="' + tog + '"]').not('[data-title="' + sel + '"]').removeClass('btn-red').addClass('btn-dark');
            $('a[data-toggle="' + tog + '"][data-title="' + sel + '"]').removeClass('btn-dark').addClass('btn-red');
        }
        if (sel == 2) {
            $('a[data-toggle="' + tog + '"]').not('[data-title="' + sel + '"]').removeClass('btn-orange').addClass('btn-dark');
            $('a[data-toggle="' + tog + '"][data-title="' + sel + '"]').removeClass('btn-dark').addClass('btn-orange');
        }
        if (sel == 3) {
            $('a[data-toggle="' + tog + '"]').not('[data-title="' + sel + '"]').removeClass('btn-yellow').addClass('btn-dark');
            $('a[data-toggle="' + tog + '"][data-title="' + sel + '"]').removeClass('btn-dark').addClass('btn-yellow');
        }
      })
});

function GenerateRpt() {
    var Data, itmdata, dateval, itmdatachild, circularStatus, confidentStatus, firmid, docType, Priority, dept;
    if ($('#chkCircular').prop('checked')) {
        circularStatus = "Y";
    }
    else {
        circularStatus = "N";
    }
    firmid = $("#ddlFirm option:selected").val();
    docType = $("#ddlDocType option:selected").val();
    dept = $("#ddlDept option:selected").val();
    Priority = $("[id*=hdnPriority]").val();
    Data = firmid + 'µ' + docType + 'µ' + dept + 'µ' + Priority + 'µ' + circularStatus + 'µ' + $('#txtSubject').val() + 'µ' + $('#ddlStatus').val() + "µ" + $("[id*=hdUserId]").val() + 'µ' + $("[id*=hdBranchId]").val()
    
    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "StatusReport.aspx/GetReportDtls",
        data: "{pageVal:'GetReportList', pageval1 :'" + Data +"'}",
        dataType: "json",
        success: function (Result) {
            Result = Result.d;
            //alert(Result);
            //fillTable(Result);
            fillTableNew(Result);
        }
    });
}

function fillTable(data) {
    debugger;
    $("#tblPendingList").empty();
    var valData, valData1, valPriorityId, valPriority, valNatureId, valNature;
    var n = 0;
    valData = data.split('Θ');
    if ($("#tblPendingList tr").length == 0) {
        $("#tblPendingList").append('<thead class="bg-success text-white">< tr ><th scope="col">NoteId</th><th scope="col">Firm</th><th scope="col">Department</th><th scope="col">Subject</th><th scope="col">Nature</th><th scope="col">Priority</th><th scope="col">DocumentType</th><th scope="col">Circular</th><th scope="col">Status</th><th scope="col">CreatedBy</th><th scope="col">CreatedDate</th><th scope="col">Remarks</th></tr ></thead><tbody>'
        );
    }
    for (i = 0; i < valData.length - 1; i++) {
        valData1 = valData[i].split('^');
        valNatureId = valData1[6];
        valPriorityId = valData1[7];
        //alert(valNatureId);
        if (valPriorityId ==1) { valNature = "<i class='fa fa-circle' style='color:#FF0000; font-size: 10px; padding-right: 2px;'></i>" }
        else { valNature = "<i class='fa fa-circle' style='color:#fdee30; font-size: 10px; padding-right: 2px;'></i>" }

        //if (valNatureId == "Y") { valNature = "<i class='fa fa-circle' style='color:#FF0000; font-size: 10px; padding-right: 2px;'></i>" }
        //else if (valNatureId == "N") { valNature = "<i class='fa fa-circle' style='color:#fdee30; font-size: 10px; padding-right: 2px;'></i>" }

        if (valPriorityId == 1) { valPriority = "<i class='fa fa-circle' style='color:#FF0000; font-size: 10px; padding-right: 2px;'></i>" }
        else if (valPriorityId == 2) { valPriority = "<i class='fa fa-circle' style='color:#fb8c00; font-size: 10px; padding-right: 2px;'></i>" }
        else if (valPriorityId == 3) { valPriority = "<i class='fa fa-circle' style='color:#fdee30; font-size: 10px; padding-right: 2px;'></i>" }

        $('#tblPendingList').append('<tr style="cursor:pointer">' +
            //'<td>' + valData1[0] + '</td>' +
            '<td><a href="#" onclick="openDetails(\'' + valData1[0] + '\'); return false">' + valData1[0] + '</a></td>' +
            '<td>' + valData1[1] + '</td>' +
            //'<td>' + valData1[2] + '</td>' +
            '<td>' + valData1[3] + '</td>' +
            '<td>' + valData1[4] + '</td>' +            
            '<td>' + valNature + '</td>' +
            '<td>' + valPriority + '</td>' +
            '<td>' + valData1[8] + '</td>' +
            '<td>' + valData1[9] + '</td>' +
            '<td>' + valData1[10] + '</td>' +
            '<td>' + valData1[11] + '</td>' + 
            '<td>' + valData1[12] + '</td>' + 
            '<td>' + valData1[5] + '</td>' +
            '</tr>');
        //'</tr> </tbody>');   
    }
    $('#tblPendingList').append('</tbody>');

}

function fillTableNew(data) {
    
    var valData, valData1, valPriorityId, valPriority, valNatureId, valNature, barStatus;
    var n = 0;
    valData = data.split('Θ');
    if (valData.length > 0) {

        $('#rptReportDiv').show();
        $('#rptEmptyDiv').hide();
        $("#tblSearchReport").empty();
        if ($("#tblSearchReport tr").length == 0) {
            //$("#tblSearchReport").append('<thead class="bg-success text-white">< tr ><th scope="col">NoteId</th><th scope="col">Firm</th><th scope="col">Department</th><th scope="col">NoteType</th><th scope="col">Subject</th><th scope="col">Nature</th><th scope="col">Priority</th><th scope="col">Circular</th><th scope="col">Status</th><th scope="col">WorkFlow</th><th scope="col">CreatedBy</th><th scope="col">CreatedDate</th><th scope="col">Content</th><th scope="col">Attachements</th></tr ></thead><tbody>'
            $("#tblSearchReport").append('<thead class="bg-success text-white">< tr ><th scope="col">NoteId</th><th scope="col">Firm</th><th scope="col">Department</th><th scope="col">NoteType</th><th scope="col">Subject</th><th scope="col">Priority</th><th scope="col">Status</th><th scope="col">CreatedBy</th><th scope="col">CreatedDate</th><th scope="col">Content</th><th scope="col">Attachements</th></tr ></thead><tbody>'
            );
        }
        for (i = 0; i < valData.length - 1; i++) {
            debugger;
            var valStatusData;
            valData1 = valData[i].split('^');
            valNatureId = valData1[5];
            valPriorityId = valData1[6];
            //alert(valNatureId);
            //314706±MINNU K.P±0±P±1¥342614±SHAHANAS NAJUMUDHEEN±1±P±1¥19675±JOHN K THOMAS±2±P±2¥55323±JENIN J±2±P±2¥14955±LIMA ANIL±2±S±3¥329294±SINU ASWAKUMAR±2±S±4¥10001±NANDAKUMAR V.P±2±F±5
            if (valNatureId == 1) { valNature = "<i class='fa fa-circle' style='color:#FF0000; font-size: 10px; padding-right: 2px;'></i>" }
            else { valNature = "<i class='fa fa-circle' style='color:#fdee30; font-size: 10px; padding-right: 2px;'></i>" }

            if (valPriorityId == 1) { valPriority = "<i class='fa fa-circle' style='color:#FF0000; font-size: 10px; padding-right: 2px;'></i>" }
            else if (valPriorityId == 2) { valPriority = "<i class='fa fa-circle' style='color:#fb8c00; font-size: 10px; padding-right: 2px;'></i>" }
            else if (valPriorityId == 3) { valPriority = "<i class='fa fa-circle' style='color:#fdee30; font-size: 10px; padding-right: 2px;'></i>" }
            valStatusData = valData1[11].split('¥');
            //alert(valStatusData);
            //debugger;
            if (valStatusData.length > 0) {
                barStatus = "";
                //314706±MINNU K.P±0±P±1
                //b.approver_id || '±' || b.approver_name || '±' || b.status_id|| '±' || b.para_seq|| '±' || b.order_id
                //0-Recommended,1-InProgress ,2-Pending,3-Not Recommend,9-Rejected
                for (k = 0; k < valStatusData.length; k++) {
                    var valStatus;
                    valStatus = valStatusData[k].split('±');
                    //for (l = 0; l < valStatus.length - 1; l++) {
                    // alert(valStatus[2]);
                    if (valStatus[2] == 0) {
                        barStatus = barStatus + "<i class='fa fa-square' style='color:#A0D468; font-size: 13px; padding-right: 2px;' data-toggle='tooltip' title='Recommended by " + valStatus[1] + "'></i>"
                    }
                    else if (valStatus[2] == 1) {
                        barStatus = barStatus + "<i class='fa fa-square' style='color:#7460ee; font-size: 13px; padding-right: 2px;' data-toggle='tooltip' title='Assigned to " + valStatus[1] + "'></i>"
                    }
                    else if (valStatus[2] == 3) {
                        barStatus = barStatus + "<i class='fa fa-square' style='color:#EC87C0; font-size: 13px; padding-right: 2px;' data-toggle='tooltip' title='Not Recommended by " + valStatus[1] + "'></i>"
                    }
                    else if (valStatus[2] == 9) {
                        barStatus = barStatus + "<i class='fa fa-square' style='color:#FF0000; font-size: 13px; padding-right: 2px;' data-toggle='tooltip' title='Rejected by " + valStatus[1] + "'></i>"
                    }
                    else {
                        barStatus = barStatus + "<i class='fa fa-square' style='color:#ccd1d9; font-size: 13px; padding-right: 2px;' data-toggle='tooltip' title='Not Received in " + valStatus[1] + "'></i>"
                    }

                    //}

                }
                //alert(barStatus)
            }
            //var serstr = "MAFIL/FY19-20/000122";
            $('#tblSearchReport').append('<tr style="cursor:pointer;">' +
                '<td><a href="#" onclick="openDetails(\'' + valData1[0] + '\'); return false">' + valData1[0] + '</a></td>' +
                '<td>' + valData1[1] + '</td>' +
                '<td>' + valData1[3] + '</td>' +
                '<td>' + valData1[8] + '</td>' +
                '<td>' + valData1[4] + '</td>' +
                //'<td>' + valNature + '</td>' +
                '<td style=" width:5px;">' + valPriority + '</td>' +
                '<td>' + valData1[10] + '</td>' +
               // '<td>' + valData1[8] + '</td>' +
               // '<td style="white-space: nowrap;">' + barStatus + '</td>' +
                '<td>' + valData1[11] + '</td>' +
                '<td>' + valData1[12] + '</td>' +
                //'<td>' + valData1[12] + '</td>' +
                //'<td>' + valData1[5] + '</td>' +
                '<td><a href="#" onclick="openContent(\'' + valData1[0] + '\'); return false">ViewContent</a></td>' +
                '<td><a href="#" onclick="openAttach(\'' + valData1[0] + '\'); return false">ViewAttachements</a></td>' +
                '</tr>');
            //'</tr> </tbody>');   
        }
        $('#tblSearchReport').append('</tbody>');
    }
    else {
        $('#rptReportDiv').hide();
        $('#rptEmptyDiv').show();
    }


}
function openContent(noteid) {
    // settings = "width=840, height=580, top=20, left=20";
    var str = Encrypt(noteid);
    settings = "width=840, height=580, top=20, left=20, scrollbars=yes, location=no, directories=no, status=no, menubar=no, toolbar=no, resizable=no, dependent=no";
    win = window.open('ViewerNoteContent.aspx?noteid=' + str, '', settings);
    win.focus();
}
function openAttach(noteid) {
    // settings = "width=840, height=580, top=20, left=20";
    var str = Encrypt(noteid);
    settings = "width=840, height=580, top=20, left=20, scrollbars=yes, location=no, directories=no, status=no, menubar=no, toolbar=no, resizable=no, dependent=no";
    win = window.open('ViewerNoteAttachements.aspx?noteid=' + str, '', settings);
    win.focus();
}
function openDetails(noteid) {
    var note = Encrypt(noteid);
    window.location = "ViewerNoteDetails.aspx?noteid=" + note;
    //settings = "width=840, height=580, top=20, left=20, scrollbars=yes, location=no, directories=no, status=no, menubar=no, toolbar=no, resizable=no, dependent=no";
    //win = window.open('ViewerNoteAttachements.aspx?noteid='+str, '', settings);
    //win.focus();
}
function Encrypt(value) {
    var result = "";
    for (i = 0; i < value.length; i++) {
        if (i < value.length - 1) {
            result += value.charCodeAt(i) + 10;
            result += "-";
        }
        else {
            result += value.charCodeAt(i) + 10;
        }
    }
    return result;
}