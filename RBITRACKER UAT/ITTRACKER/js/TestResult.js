$(window).on('load', function () {
    
    $('#divtblPrincpleIntDtl').show();
    $('#tblticket').show();    

    $("[id*=hdRqstID]").val('');
    $("#retest").prop("checked", false);
    $("#testover").prop("checked", false);
    $("#contentModelFlow").hide();
    CRFLoad();
    GetSeverity();
    GetEnvironment();
    GetEmpStatus();

    if ($("[id*=hdEmpCheck]").val()==0) {
        GetBugStatus();
        $('#DivTestStatus').hide();
    } else {
        GetBugStatusDev();
        $("#ExceptionDiv").hide();         
    }    
    GetTestStatus();
    $("#txtFromDate").datepicker({
        dateFormat: 'dd/MM/yy',
        changeMonth: true,
        changeYear: true,
        stepMonths: true,
        todayHighlight: true,
        onSelect: function (dateText, inst) {
        }
    });
});

function shdetails(tn) {
    var SoI;
    var input = tn;
    var QueryString = "GetTview";

    SoI = tn.substring(0, 2);
    $("#ticket_show").text(tn);

        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            async: false,
            url: "CRFTestResult.aspx/FillBugDetails",
            data: "{pageVal:'FillBugDetails', pageval1 :'" + input + "', pageval2:''}",
            dataType: "json",
            success: function (Result) {
                Result = Result.d.split("^");
      
                $('#txtSubject').val(Result[0]);
                $('#txtDescription').val(Result[1]);
                $('#txtFromDate').val(Result[2]); 
                $('#ddlEnvironment').val(Result[3]);
                $('#ddlPriority').val(Result[4]);
                
                if ($("[id*=hdEmpCheck]").val() == 0) {
                    $('#ddlBugstatus').val("5");
                } else {
                    $('#ddlBugstatus').val("2");
                }
                $("[id*=hdBugId]").val(Result[6]);
                alert(Result[7]);
                $("#txtBugRemarks").val(Result[7]);
             
                $("#ddlPriority").prop("disabled", true);
                $("#ddlEnvironment").prop("disabled", true);
                $("#txtDescription").prop("disabled", true);
                $("#txtSubject").prop("disabled", true);
                $("#txtFromDate").prop("disabled", true);    

                $("#btnSubmitD").show();
                $("#btnAdd").hide(); 
                $("#DivBug").show(); 
         
           
            },
            error: function (Result) {
                alert(Result);
            }
        });

  
}


function gr() {

    $('#tblticket').find('tr').click(function () {
        var row = $(this).find('td:eq(1)').text();
 
       shdetails(row);
        //WorkLogView(row);
        //UserApprvTview(row);
        //global_tickno = row;
        $('#tblticket').removeEventListener();
    });
}
function HandOver() {
    if ($('#ddlCrf').val() == -1) {
        alert("Please Select a CRF..");
        return false;
    }
    var usr = $("[id*=hdUserId]").val();
    var rmk = $("[id*=txtRemarks]").val();
    if (rmk = "") {
        alert("Please Add Your Remark for Return..");
        return false;
    }
    var proceed = confirm(' Are you  want to Return CRF.?');
    if (proceed) {

        $.ajax({
            type: "post",
            contentType: "application/json; charset=utf-8",
            url: "CRFTestResult.aspx/ReturnToTestLead",
            data: "{pageVal:'ReturnToTestLead', pageval1 :'" + $("[id*=hdUserId]").val() + "',pageval2:'" + $("[id*=hdRqstID]").val() + "'}",
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
                            window.open('CRFTestResult.aspx', '_self');
                        }
                    }).then((result) => {
                        if (
                            // Read more about handling dismissals
                            result.dismiss === Swal.DismissReason.timer
                        ) {
                            window.open('CRFTestResult.aspx', '_self');
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



function BugTviewForTester(req) {

    var k;
    $('#divtblPrincpleIntDtl').show();
    $('#tblticket').show();
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "CRFTestResult.aspx/GetBugTble",
        async: false,
        //data: "{QueryStr : '" + Querystring + "',input :'" + InputString + "'}",
        data: "{pageVal:'GetBugDetailsForTester', pageval1 :'" + req + "', pageval2:''}",
        dataType: "json",
        success: function (Result) {
            if (Result.d.length > 0) {
                $('#tblticket').empty();
                $('#tblticket').append('<thead < tr style="color:black; background-color:honeydew" class="text-left" ><td scope="col">NO</td><td scope="col">Bug ID</td><td scope="col">Subject</td><td scope="col">Request No</td> <td scope="col">Bug Status</td> <td scope="col">Date</td> </tr></thead><tbody>');
                for (var i = 0; i < Result.d.length; i++) {
                    k = i + 1;
                    $('#tblticket').append('<tr><td>' + k + '</td>' +
                        '<td>' + Result.d[i].BugID + '</td>' +
                        '<td>' + Result.d[i].BugSub + '</td>' +
                        '<td>' + Result.d[i].RequestNo + '</td>' +
                        '<td>' + Result.d[i].BugStatus + '</td>' +
                        '<td>' + Result.d[i].BUGDate + '</td>' + '</tr>');
                }
                $('#tblticket').append(
                    '</tbody>');
            } else {

                $('#tblticket').empty();
                $('#tblticket').hide();

            }

        },
        error: function (Result) {
            alert(Result);
        }
    });

}

function BugTview(req) {
    
    var k;
    $('#divtblPrincpleIntDtl').show();
    $('#tblticket').show();
     
    $.ajax({       
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "CRFTestResult.aspx/GetBugTble",
        async: false,
        //data: "{QueryStr : '" + Querystring + "',input :'" + InputString + "'}",
        data: "{pageVal:'GetBugDetails', pageval1 :'" + req + "', pageval2:''}",
        dataType: "json",
        success: function (Result) {
            if (Result.d.length > 0) {
                $('#tblticket').empty();
                $('#tblticket').append('<thead < tr style="color:black; background-color:honeydew" class="text-left" ><td scope="col">NO</td><td scope="col">Bug ID</td><td scope="col">Subject</td><td scope="col">Request No</td> <td scope="col">Bug Status</td> <td scope="col">Date</td> </tr></thead><tbody>');
                for (var i = 0; i < Result.d.length; i++) {
                    k = i + 1;
                    $('#tblticket').append('<tr><td>' + k + '</td>' +
                        '<td>' + Result.d[i].BugID + '</td>' +
                        '<td>' + Result.d[i].BugSub + '</td>' +
                        '<td>' + Result.d[i].RequestNo + '</td>' +
                        '<td>' + Result.d[i].BugStatus + '</td>' +
                        '<td>' + Result.d[i].BUGDate + '</td>' + '</tr>');
                }
                $('#tblticket').append(
                    '</tbody>');
                $('#DivBug').show();
               
            } else {

                $('#tblticket').empty();
                $('#tblticket').hide();
                $('#DivBug').hide();

            }

        },
        error: function (Result) {
            alert(Result);
        }
    });
}
function Clear() {

    $("#ddlPriority").prop("disabled", false);
    $("#ddlEnvironment").prop("disabled", false);
    $("#txtDescription").prop("disabled", false);
    $("#txtSubject").prop("disabled", false);
    $("#txtFromDate").prop("disabled", false);

    $("#ddlPriority").val("-1");
    $("#ddlEnvironment").val("-1");
    $("#txtDescription").val("");
    $("#txtSubject").val("");
    $("#txtFromDate").val("");

    $("#btnSubmitD").hide();
    $("#btnAdd").show();
  
}
function Clear1() {

    $("#ddlPriority").val("");
    $("#ddlEnvironment").val("");
    $("#txtDescription").val("");
    $("#txtSubject").val("");
    $("#txtFromDate").val("");
    $("#txtBugRemarks").val("");

}
function ApplicableHide() {
    if ($('#ddlCrf').val() == -1) {
        alert("Please Select a CRF..");
        return false;
    }
    if ($('#applicableOption').prop('checked')) {
        $('#DivBug').show();
        Clear();
    }
    else {
        $('#DivBug').hide();
    }
}
function HideContentFlow() {
    $("#contentModelFlow").hide();
}
function ShowContentFlow() {
    $("#contentModelFlow").show();
}
//$("#ddlBugstatus").change(function () {
//    alert("test");
//});
function CRFLoad() {
    var usr = $("[id*=hdUserId]").val();
    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "CRFTestResult.aspx/getFillData",
        data: "{pageVal:'TestResultUpdation', pageval1 :'" + usr + "',pageval2 :''}",
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
function CalTotal() {
    var data, data1;

    //if ($("#ddlCrf").val() == -1 || $("#ddlCrf").val() == null) {
    //    alert("Select CRF !!!");
    //    $("#ddlCrf").focus();
    //    return false;
    //}
    var TestStageVal;
    var TestStage = $("input:radio[name=opttest]:checked").val();
 
    if (TestStage == "Initial") {
        TestStageVal = 1;
    }
    else {
        TestStageVal = 2;
    }
 

    
    if ($("#txtSubject").val() == "") {
        alert("Please Enter Subject.!");
        $("#txtSubject").focus();
        return false;
    }

    if ($("#txtDescription").val() == "") {
        alert("Please Enter Description.!");
        $("#txtDescription").focus();
        return false;
    }
   
    if ($("#txtFromDate").val() != "") {
        var frmDateCom = $("#txtFromDate").val();
        var newFrmDate = Date.parse(frmDateCom);

    }
    else {
        alert("Choose a Date.!")
        $("#txtFromDate").focus();
        return false;
    }

    if ($("#ddlPriority").val() == -1 || $("#ddlPriority").val() == null) {
        alert("Select Severity !!!");
        $("#ddlPriority").focus();
        return false;
    }

    if ($("#ddlEnvironment").val() == -1 || $("#ddlEnvironment").val() == null) {
        alert("Select Environment  !!!");
        $("#ddlEnvironment").focus();
        return false;
    }
    
    if ($("#ddlBugstatus").val() == -1 || $("#ddlBugstatus").val() == null) {
        alert("Select Bug status  !!!");
        $("#ddlBugstatus").focus();
        return false;
    }
    data1 = $("[id*=hddata]").val();

    data = $('#txtSubject').val() + "^" + $('#txtDescription').val() + "^" + $('#ddlPriority option:selected').text() + "^" + $('#ddlEnvironment option:selected').text() + "^" + $('#ddlBugstatus option:selected').text() + "^" + TestStage + "^" + $("#txtFromDate").val() + "^" + $("#ddlPriority").val() + "^" + $("#ddlBugstatus").val() + "^" + $("#ddlEnvironment").val() + "^" + TestStageVal + "^" + $("#txtBugRemarks").val() + "¶";
    data1 = data1 + data;   
 
    $("[id*=hddata]").val(data1);    
    filltab(data);
}
function BugFix() {
  
    var data, usr;
    var req = $("[id*=hdRqstID]").val();
    data = $("[id*=hdBugId]").val() + "µ" + $("[id*=ddlBugstatus]").val() + "µ" + $("[id*=hdRqstID]").val() + "µ" + $("[id*=hdUserId]").val() + "µ" + $("#ddlCrf").val() + "µ" + $("#txtBugRemarks").val() + "µ" + $("[id*=hdEmpCheck]").val();

    var usr = $("[id*=hdUserId]").val();
    if ($("[id*=txtSubject]").val()=="") {
        alert("Please select atleast one Bug");
        return false;
    }
    
    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "CRFTestResult.aspx/BugFixed",
        data: "{pageVal:'BugFixed',pageval1 :'" + data + "',pageval2 :'" + $("[id*=hdRqstID]").val() + "', pageval3:''}",
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
            //alert(noteid);         

            if ($("[id*=hdEmpCheck]").val() == 0) {
                
                
                BugTview(req);
                $("#ddlPriority").prop("disabled", true);
                $("#ddlEnvironment").prop("disabled", true);
                $("#txtDescription").prop("disabled", true);
                $("#txtSubject").prop("disabled", true);
                $("#txtFromDate").prop("disabled", true);
                $("#btnSubmitD").show();
                $("#btnAdd").hide();
                $('#divBugF').hide();
                $('#lblBugF').hide();
                $('#DivBug').show();
            }
            else {
                BugTviewForTester(req);
                
                $("#ddlPriority").prop("disabled", true);
                $("#ddlEnvironment").prop("disabled", true);
                $("#txtDescription").prop("disabled", true);
                $("#txtSubject").prop("disabled", true);
                $("#txtFromDate").prop("disabled", true);
                $("#btnSubmitD").show();
                $("#btnAdd").hide();
                //$('#divBugF').hide();
                //$('#lblBugF').hide();
                $('#DivBug').show();

            }
        }        
    });
    Clear1();
}
function filltab(data) {
    var valData, valData1, gstno, n = 1;
    valData = data.split('¶');
    //alert(valData);
    if ($("#tabChange tr").length == 0) {
        $("#tabChange").empty();
        $('#tabChange').append('<tr style="color:black; background-color:honeydew" class="text-left"><th class="text-left">Subject</th><th class="text-left">Severity</th><th class="text-left">Environment</th><th class="text-left">Bug Status</th><th class="text-left">Test Stage</th><th class="text-left">Date</th><th class="text-left">DELETE</th></tr>');
    }
    //var sno = $('#tableData tr').length;
    for (i = 0; i < valData.length - 1; i++) {
        valData1 = valData[i].split('^');

        $('#tabChange').append('<tbody><tr>' +

            '<td style="word-wrap:break-word; width:10%;" class="text-left">' + valData1[0] + '</td>' +
            '<td style="display:none; word-wrap:break-word; width:10%;" class="text-left">' + valData1[1] + '</td>' +
            '<td>' + valData1[2] + '</td>' +
            '<td>' + valData1[3] + '</td>' +
            '<td>' + valData1[4] + '</td>' +
            '<td>' + valData1[5] + '</td>' +
            '<td>' + valData1[6] + '</td>' +
            //'<td>' + valData1[7] + '</td>' +
            '<td style="display:none">' + valData1[7] + '</td>' +
            '<td style="display:none">' + valData1[8] + '</td>' +
            '<td style="display:none">' + valData1[9] + '</td>' +
            '<td style="display:none">' + valData1[10] + '</td>' +
            //'<td style="display:none">' + valData1[11] + '</td>' +
            '<td><a href="javascript:void(0);" class="remove"  id="remrow"><span class="glyphicon glyphicon-trash">Remove</span></a></td></tr > </tbody > ');

    }
    Clear1();
}

function GetBugStatus() {
 
    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "CRFTestResult.aspx/getFillData",
        data: "{pageVal:'GetBugStatus', pageval1 :'', pageval2 :''}",
        async: false,
        dataType: "json",
        success: function (Result) {
            Result = Result.d;
            //$('#ddlPriority').append($("<option ></option>").val("-1").html("All Department"));
            $.each(Result, function (key, value) {
                $('#ddlBugstatus').append($("<option></option>").val(value.id).html(value.name));
            });
        }
    });
}
function GetBugStatusDev() {

    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "CRFTestResult.aspx/getFillData",
        data: "{pageVal:'GetBugStatusDev', pageval1 :'', pageval2 :''}",
        async: false,
        dataType: "json",
        success: function (Result) {
            Result = Result.d;
            //$('#ddlPriority').append($("<option ></option>").val("-1").html("All Department"));
            $.each(Result, function (key, value) {
                $('#ddlBugstatus').append($("<option></option>").val(value.id).html(value.name));
            });
        }
    });
}
function GetTestStatus() {

    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "CRFTestResult.aspx/getFillData",
        data: "{pageVal:'GetTestStatus', pageval1 :'', pageval2 :''}",
        async: false,
        dataType: "json",
        success: function (Result) {
            Result = Result.d;
            //$('#ddlPriority').append($("<option ></option>").val("-1").html("All Department"));
            $.each(Result, function (key, value) {
                $('#ddlTestStatus').append($("<option></option>").val(value.id).html(value.name));
            });
        }
    });
}
function GetEmpStatus() {

    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "CRFTestResult.aspx/CheckEmployeeDepartment",
        async: false,
        data: "{pageVal:'CheckEmployeeDepartment', pageval1 :'" + $("[id*=hdUserId]").val() + "', pageval2 :''}",
        dataType: "json",
        success: function (Result) {
            Result = Result.d;
         
            if (Result == "0") {
                $("[id*=hdEmpCheck]").val(Result);
            
            }
            else {
                $("[id*=hdEmpCheck]").val("1");
            }
        }        
    });    
}
function GetBugStatusAgainstReqForDev() {

    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "CRFTestResult.aspx/CheckEmployeeDepartment",
        async: false,
        data: "{pageVal:'CheckBugStatusForDev', pageval1 :'" + $("[id*=hdRqstID]").val() + "', pageval2 :''}",
        dataType: "json",
        success: function (Result) {
            Result = Result.d;
            BugDetails = Result;
            //var Bugd = BugDetails.split('±');
            //$("[id*=hdTestCheck]").val(Bugd[1]);
            $("[id*=hdBugStatus]").val(BugDetails);
        }
    });

}

function GetBugStatusAgainstReq() {

    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "CRFTestResult.aspx/CheckEmployeeDepartment",
        async: false,
        data: "{pageVal:'CheckBugStatus', pageval1 :'" + $("[id*=hdRqstID]").val() + "', pageval2 :''}",
        dataType: "json",
        success: function (Result) {
            Result = Result.d;  
            BugDetails = Result;
            var Bugd = BugDetails.split('±');
            $("[id*=hdTestCheck]").val(Bugd[1]);  
            $("[id*=hdBugStatus]").val(Bugd[0]);  
        }
    });
  
}

function GetEnvironment() {

    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "CRFTestResult.aspx/getFillData",
        data: "{pageVal:'GetEnvironment', pageval1 :'', pageval2 :''}",
        async: false,
        dataType: "json",
        success: function (Result) {
            Result = Result.d;
            //$('#ddlPriority').append($("<option ></option>").val("-1").html("All Department"));
            $.each(Result, function (key, value) {
                $('#ddlEnvironment').append($("<option></option>").val(value.id).html(value.name));
            });
        }
    });
}
function GetSeverity() {

    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "CRFTestResult.aspx/getFillData",
        data: "{pageVal:'GetSeverity', pageval1 :'', pageval2 :''}",
        async: false,
        dataType: "json",
        success: function (Result) {
            Result = Result.d;
            //$('#ddlPriority').append($("<option ></option>").val("-1").html("All Department"));
            $.each(Result, function (key, value) {
                $('#ddlPriority').append($("<option></option>").val(value.id).html(value.name));
            });
        }
    });
}
function fillCRFData() {
    var CRFID = $("#ddlCrf").val();
    CRFSearch();
    $("#snote").show();
    if (CRFID == -1) {
        $("#CrfDetailsID").hide();
 
    }
    else {
        $("#CrfDetailsID").show();

    }
    detailsLoad(CRFID);   
    GetEmpStatus();
    var crfdata = $('#ddlCrf option:selected').text();
    var ddtl = crfdata.split('~');
    var req = ddtl[0];
    $("[id*=hdRqstID]").val(req);
    $("#txtRemarks").val(""); 
    $("#txtBugRemarks").val(""); 
    $("#txtException").val("");  
    
    filesFill(req);
    filesFillDev(req);
    TestCaseFileLoad(req);
    fillTADetails(req);

    if ($("[id*=hdEmpCheck]").val() == 0) {
        BugTview(req);
        $("#ddlPriority").prop("disabled", true);
        $("#ddlEnvironment").prop("disabled", true);
        $("#txtDescription").prop("disabled", true);
        $("#txtSubject").prop("disabled", true);
        $("#txtFromDate").prop("disabled", true);
        $("#btnSubmitD").show();
        $("#btnAdd").hide();
        $('#divBugF').hide();
        $('#lblBugF').hide();
        $('#DivTestStatus').hide();
        $('#testerReturn').hide();
        //$('#DivBug').show();        
    }
    else {
        BugTviewForTester(req);
        document.getElementById("Initial").disabled = true;
        document.getElementById("Retesting").disabled = true;
        $('#testerReturn').show();
        GetBugStatusAgainstReq();
        if ($("[id*=hdTestCheck]").val() != 0) {
            $("#Retesting").prop("checked", true);
        } else {
            $("#Initial").prop("checked", true);
        }
    }
    GetUatDetail(req);
}

//for showing test case files
function TestCaseFileLoad(request_id) {


    $("#tblTestCase").empty();
    var filenm = "TestCases_" + $("[id*=hdUserId]").val() + "_" + request_id.replace(/[^a-zA-Z0-9]/g, '') + "_";
    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "CRFTestResult.aspx/getFileData",
        async: false,
        data: "{pageVal:'GetAttachListTestCases', pageval1 :'" + request_id + "', pageval2 :'" + filenm + "'}",
        dataType: "json",
        success: function (Result) {

            Result = Result.d;

            var valData, valData1;
            var n = 0;
            valData = Result.split('Θ');
            if ($("#tblTestCase tr").length == 0) {
                $('#tblTestCase').append('<thead class="bg-success text-white"><tr><th scope="col">File No</th><th scope="col">File Name</th></tr></thead>');
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

                $('#tblTestCase').append('<tbody><tr>' +
                    '<td>' + contentDtl[0] + '</td>' +
                    '<td><a href="' + myUrl + '" download="' + filename + '" class="file-list1">' + contentDtl[1] + '</a></td>' +
                    '</tr> </tbody>');
            }


        },
        error: function (Result) {

        }
    });
    if ($("#tblFilesTestCase tr").length > 1) {
        $("#Doc1").show();
    }
}


function fillTADetails(req) {
    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "CRFTestResult.aspx/TestingTADtls",
        data: "{pageVal:'TestingTADtls', pageval1 :'" + req + "', pageval2:''}",
        dataType: "json",
        success: function (Result) {
            Result = Result.d;
            var valData, valData1;
            valData = Result.split('¶');
            $("#tblTestingTADtls").empty();
            if ($("#tblTestingTADtls tr").length == 0) {
                $('#tblTestingTADtls').append('<tr style="background-color:honeydew;color:black"><th class="text-center">TEST LEAD</th><th class="text-center">PROJECT TYPE</th><th class="text-center">PHASE</th><th class="text-center">DESCRIPTION</th><th class="text-center">TEST STARTDATE</th><th class="text-center">TEST ENDDATE</th><th class="text-center">WORK HOURS</th></tr>');
            }
            //var sno = $('#tableData tr').length;
            for (i = 0; i < valData.length - 1; i++) {
                valData1 = valData[i].split('µ');
                //alert(valData1);
                //alert(valData1[0] + "   " + valData1[4] + "  " + valData1[5] + "  " + valData1[6] + "  " + valData1[8]);
                $('#tblTestingTADtls').append('<tbody><tr class="text-center"' +


                    '<td>' + valData1[0] + '</td>' +
                    '<td>' + valData1[0] + '</td>' +
                    '<td>' + valData1[4] + '</td>' +
                    '<td>' + valData1[5] + '</td>' +
                    '<td>' + valData1[6] + '</td>' +
                    '<td>' + valData1[2] + '</td>' +
                    '<td>' + valData1[3] + '</td>' +
                    '<td>' + valData1[8] + '</td></tr > </tbody > ');
                var days1 = valData1[2];
                days = Date.parse(days1);



            }
        }
    });
}

function CRFSearch() {
    var crfval = $("#ddlCrf option:selected").text();
    var reqid = crfval.split('~');
    //alert(reqid[0] + " " + reqid[1] + "  " + reqid[2]);
    var CRFID = $("#ddlCrf").val();
    // alert(CRFID);
    if (CRFID == "") {
        alert("Please Choose CRF!!!");
    }
    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "CRFTestResult.aspx/getFillData",
        async:false,
        data: "{pageVal:'DataLoadTesting', pageval1 :'" + CRFID + "',pageval2 :'" + reqid[0] + "'}",
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
                $('#lblTarDt').html(cdtl[8]);
                $('#lblDvCom').html(cdtl[6]);
                $('#lblUserExpectDate').html(cdtl[4]);
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
        url: "CRFTestResult.aspx/GetNewNoteID",
        data: "{pageVal:'GetRequestNotes', pageval1:'" + noteid + "',pageval2:'2'}",
        async: false,
        dataType: "json",
        success: function (Result) {
            Result = Result.d;
            $('.summernoteview').summernote('code', Result);
        }
    });
}
function ReportShow() {
    var note = window.location = "BugStatusReport.aspx?";
    //Encrypt(alertList[1]);
};
function WorkFlowFill(noteid) {
  
    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "Approve2.aspx/getListPending",
        data: "{pageVal:'GetIPWorkFlowList', pageval1 :'" + noteid + "', pageval2 :''}",
        dataType: "json",
        success: function (Result) {
            Result = Result.d;
            document.getElementById("WorkFlowSection").innerHTML = "";
            var parentSec = document.createElement("section");
            parentSec.className = "timeline1";

            var parentDiv = document.createElement("div");
            parentDiv.className = "container";
            var sideNum = 1;
            $.each(Result, function (key, value) {

                var listOfApprove = value.lst;
                var workflowList = listOfApprove.split('µ');
  

                var tlitemDiv = document.createElement("div");
                tlitemDiv.className = "timeline-item";
                var tlimgDiv = document.createElement("div");
                tlimgDiv.className = "timeline-img";
                tlimgDiv.innerHTML = workflowList[0];
                tlitemDiv.appendChild(tlimgDiv);

                var tlConDiv = document.createElement("div");
                if ((sideNum % 2) == 0) {
                    /*even */
                    tlConDiv.className = "timeline-content js--fadeInRight";
                }
                else if ((sideNum % 2) != 0) {
                    /*odd */
                    tlConDiv.className = "timeline-content js--fadeInLeft";
                };


                var tlConDateDiv = document.createElement("div");
                tlConDateDiv.className = "wf-date";
                tlConDateDiv.innerHTML = workflowList[1];

                var tlConHead = document.createElement("h6");
                tlConHead.innerHTML = workflowList[2];
           
                var tlConHead1 = document.createElement("h7");
                tlConHead1.setAttribute('style', 'color:#FF4081;');
                tlConHead1.innerHTML = workflowList[3];

                tlConDiv.appendChild(tlConDateDiv);
                tlConDiv.appendChild(tlConHead);
                tlConDiv.appendChild(tlConHead1);

                var tlInChk = document.createElement("input");
                tlInChk.setAttribute('type', 'checkbox');
                tlInChk.setAttribute('id', 'post-' + sideNum);
                tlInChk.className = "read-more-state";
                tlConDiv.appendChild(tlInChk);

   

                var tlConP = document.createElement("p");
                tlConP.className = "read-more-wrap";
                var x = workflowList[4];
                var c = x.split(' ').length;
                var y = x.split(' ').slice(0, 10).join(' ');
                var z = x.split(' ').slice(10, c).join(' ');

                tlConP.innerHTML = y;
                if (c > 10) {
                    var tlConSpanP = document.createElement("span");
                    tlConSpanP.className = "read-more-target";
                    tlConSpanP.innerHTML = z;
                    tlConP.appendChild(tlConSpanP);
                    
                }
                tlConDiv.appendChild(tlConP);
                if (c > 10) {
                    var tlLbl = document.createElement("label");
                    tlLbl.setAttribute('for', 'post-' + sideNum);
                    tlLbl.className = "read-more-trigger bnt-more";
                    tlConDiv.appendChild(tlLbl);
                }


                tlitemDiv.appendChild(tlConDiv);
                parentDiv.appendChild(tlitemDiv);
                sideNum = sideNum + 1;

            });
            parentSec.appendChild(parentDiv);
            document.getElementById("WorkFlowSection").appendChild(parentSec);


        },
        error: function (Result) {
        }
    });
}
function filesFillDev(noteid) {

    $("#tblFilesD").empty();
    var filenm = $("[id*=hdUserId]").val() + noteid.replace(/[^a-zA-Z0-9]/g, '') + "_";
    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "CRFTestResult.aspx/getFileData",
        async: false,
        data: "{pageVal:'GetAttachListDev', pageval1 :'" + noteid + "', pageval2 :'" + filenm + "'}",
        dataType: "json",
        success: function (Result) {

            Result = Result.d;


            var valData, valData1;
            var n = 0;
            valData = Result.split('Θ');
            if ($("#tblFilesD tr").length == 0) {
                $('#tblFilesD').append('<thead class="bg-success text-white"><tr><th scope="col">File No</th><th scope="col">File Name</th></tr></thead>');
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

                $('#tblFilesD').append('<tbody><tr>' +
                    '<td>' + contentDtl[0] + '</td>' +
                    '<td><a href="' + myUrl + '" download="' + filename + '" class="file-list1">' + contentDtl[1] + '</a></td>' +
                    '</tr> </tbody>');
            }


        },
        error: function (Result) {

        }
    });
}

function filesFill(noteid) {

    $("#tblFiles").empty();
    var filenm = $("[id*=hdUserId]").val() + noteid.replace(/[^a-zA-Z0-9]/g, '') + "_";
    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "CRFTestResult.aspx/getFileData",
        async: false,
        data: "{pageVal:'GetAttachListTester', pageval1 :'" + noteid + "', pageval2 :'" + filenm + "'}",
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
}

function frmExit() {
    window.open("index.aspx", "_self");
}


function GetUatDetail(req) {
    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "CRFTestResult.aspx/UATDetail",
        data: "{pageVal:'uatdtl', pageval1 :'" + req + "', pageval2:''}",
        dataType: "json",
        success: function (Result) {
            Result = Result.d;
            filluat(Result);
        }
    });
}

function filluat(data) {
    var valData, valData1;
    valData = data.split('§');

    if ($("#tblUatDtls tr").length == 0) {
        $("#tblUatDtls").empty();
        $('#tblUatDtls').append('<tr style="background-color:rosybrown;color:black"><th class="text-center">UATLINK</th><th class="text-center">UATPATH</th><th class="text-center">DBTYE</th><th class="text-center">DBOBJECT</th></tr>');
    }
    //var sno = $('#tableData tr').length;
    for (i = 0; i < valData.length - 1; i++) {
        valData1 = valData[i].split('^');

        $('#tblUatDtls').append('<tbody><tr class="text-center" style="background-color:linen" >' +


            '<td>' + valData1[0] + '</td>' +
            '<td>' + valData1[4] + '</td>' +
            '<td>' + valData1[1] + '</td>' +
            '<td>' + valData1[2] + '</td></tr > </tbody > ');


    }

}

//Confirmation Edited By SaBran
function Exceptionconfirm() {

    var empDept;
    var TestStatus;
    uploadedElements = $(".file-uploaded");
    var crf = $("#ddlCrf").val();
    if (crf == -1) {
        alert("Please select a CRF.!");
        $("#ddlCrf").focus();
        return false;
    }

    var proceed = confirm("Do you sure want to continue with the Exception ?");
    if (proceed) {
        //GetBugStatusAgainstReq();
        if (uploadedElements.length <= 0) {
            //alert("Hiii");
            if ($("#txtRemarks").val() == "") {
                alert("Please fill remark");
                return false;
            }
    
            ConfirmException();
        }
        else {
            alert($("#txtException").val());
            if ($("#txtException").val()=="") {
               
                return false;
            }

            for (let i = 0; i < uploadedElements.length; i++) {

                let extension = "";
                let element = uploadedElements.eq(i)[0];
                let fileList = element.files;
                let fileReader = new FileReader();
                if (fileReader && fileList && fileList.length) {
                    let fileSize = fileList[0].size / 1048576;
                    if (fileSize > 10) {
                        dangerAlert("Please Upload Files Less Than 10MB..!", 3000);
                        //alert("Please Upload Files Less Than 10MB");
                        return false;
                    }
                    let fileName = fileList[0].name;
                    // Use a regular expression to trim everything before final dot
                    extension = fileName.replace(/^.*\./, '');
                    // Iff there is no dot anywhere in filename, we would have extension == filename,
                    // so we account for this possibility now
                    if (extension == fileName) {
                        extension = '';
                    } else {
                        // if there is an extension, we convert to lower case
                        // (N.B. this conversion will not effect the value of the extension
                        // on the file upload.)
                        extension = extension.toLowerCase();
                    }
                    fileReader.readAsDataURL(fileList[0]);
                    fileReader.onload = function () {
                        let fileno = i + 1;
                        let imageData1 = fileReader.result;
                        let InputData1 = "";

                        GetEmpStatus();
                        InputData1 = $("[id*=hdRqstID]").val() + "µ" + fileno + "µ" + extension + "µ" + fileName.replace(/[^a-zA-Z0-9._]/g, '') + "µ" + $("[id*=hdUserId]").val() + "µ" + $("[id*=hdEmpCheck]").val();
                        var sessionkey = $("[id*=hdSesssion]").val();
                        var keySession = sessionkey.substring(0, 16);

                        //var key = CryptoJS.enc.Utf8.parse('8080808080808080');
                        //var iv = CryptoJS.enc.Utf8.parse('8080808080808080');
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
                            url: "CRFTestResult.aspx/UploadingFile",
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
                                        ConfirmException();
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
                                    showConfirmButton: true,
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
    else {
        return false;
    }   


}

//Confirmation Edited By SaBran
function TestResultconfirm() {

    var empDept;
    var TestStatus;
    uploadedElements = $(".file-uploaded"); 
    var crf = $("#ddlCrf").val();

    if (crf == -1) {
        alert("Please select a CRF.!");
        $("#ddlCrf").focus();
        return false;
    }
    
    TestStatus = $('#ddlTestStatus').val();
    if ($("[id*=hdEmpCheck]").val() == 0) {
        GetBugStatusAgainstReqForDev();
        if ($("[id*=hdBugStatus]").val() != 0) {
            alert("Bug Found.! You Cannot Confirm.!");
            return false;
        }
    }
    else {
        if (TestStatus == -1) {
            alert("Please select a Test Status.!");
            $("#ddlTestStatus").focus();
            return false;
        }
        if (TestStatus == 1) {

            if ($("#tabChange tr").length >= 2) {
                alert("Bug Found.! You Cannot Recommend.!");
                return false;
            }
            GetBugStatusAgainstReq();

            if ($("[id*=hdBugStatus]").val() != 0) {
                alert("Bug Found.! You Cannot Confirm.!");
                return false;
            }
        }
        else {
            if ($("#tabChange tr").length >= 2) {
            }
            else {
                alert("No Bug Found.! You Cannot ReAssinged to Developer.!");
                return false;
            }

        }

    }


    if (uploadedElements.length <= 0) {
        ConfirmTestResult();
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
                    dangerAlert("Please Upload Files Less Than 10MB..!", 3000);
                    //alert("Please Upload Files Less Than 10MB");
                    return false;
                }
                let fileName = fileList[0].name;
                // Use a regular expression to trim everything before final dot
                extension = fileName.replace(/^.*\./, '');
                // Iff there is no dot anywhere in filename, we would have extension == filename,
                // so we account for this possibility now
                if (extension == fileName) {
                    extension = '';
                } else {
                    // if there is an extension, we convert to lower case
                    // (N.B. this conversion will not effect the value of the extension
                    // on the file upload.)
                    extension = extension.toLowerCase();
                }
                fileReader.readAsDataURL(fileList[0]);
                fileReader.onload = function () {
                    let fileno = i + 1;
                    let imageData1 = fileReader.result;
                    let InputData1 = "";

                    GetEmpStatus();                 
                    InputData1 = $("[id*=hdRqstID]").val() + "µ" + fileno + "µ" + extension + "µ" + fileName.replace(/[^a-zA-Z0-9._]/g, '') + "µ" + $("[id*=hdUserId]").val() + "µ" + $("[id*=hdEmpCheck]").val();
                    var sessionkey = $("[id*=hdSesssion]").val();
                    var keySession = sessionkey.substring(0, 16);

                    //var key = CryptoJS.enc.Utf8.parse('8080808080808080');
                    //var iv = CryptoJS.enc.Utf8.parse('8080808080808080');
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
                        url: "CRFTestResult.aspx/UploadingFile",
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
                                    ConfirmTestResult();
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
                                showConfirmButton: true,
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

function ConfirmException() {
    var BugFound; var rdbtn; var EmpCheck;
    var radVal = $("input[name='opttest']:checked").val();

    if ($("[id*=hdEmpCheck]").val() == 0) {
        EmpCheck = "2";
    }
    else {
        EmpCheck = "1";
    }

    if (radVal == "Initial") {
        rdbtn = "1";
    } else if (radVal == "Retesting") {
        rdbtn = "2";
    }

    var data = $("#ddlCrf").val() + '^' + rdbtn + '^' + $("#txtRemarks").val() + '^' + $("[id*=hdRqstID]").val() + '^' + $("[id*=hdUserId]").val() + '^' + "0";
    var itmdata = '';

    itmdata = $("[id*=hddata]").val();

    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "CRFTestResult.aspx/TestConfirm",
        data: "{pageVal:'ConfirmException',pageval1 :'" + data + "',pageval2 :'', pageval3:'" + EmpCheck + "'}",
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
                html: "Success...!  ",
                showConfirmButton: true,
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
                    window.open('CRFTestResult.aspx', '_self');
                }
            }).then((result) => {
                if (
                    // Read more about handling dismissals
                    result.dismiss === Swal.DismissReason.timer
                ) {
                    window.open('CRFTestResult.aspx', '_self');
                }
            })

        }
    });
}

function ConfirmTestResult() {
    var BugFound;var rdbtn; var EmpCheck;
    var radVal = $("input[name='opttest']:checked").val();

    if ($("[id*=hdEmpCheck]").val() == 0) {
        EmpCheck = "2";
    }
    else{
        EmpCheck = "1";
    }

    if (radVal == "Initial") {
        rdbtn = "1";
    } else if (radVal == "Retesting") {
        rdbtn = "2";
    }

    var data = $("#ddlCrf").val() + '^' + rdbtn + '^' + $("#txtRemarks").val() + '^' + $("[id*=hdRqstID]").val() + '^' + $("[id*=hdUserId]").val() + '^' + $('#ddlTestStatus').val() + '^' + EmpCheck;
    var itmdata = '';

    itmdata = $("[id*=hddata]").val();

    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "CRFTestResult.aspx/TestConfirm",
        data: "{pageVal:'ConfirmTestResult',pageval1 :'" + data + "',pageval2 :'" + itmdata + "', pageval3:'" + EmpCheck +"'}",
        dataType: "json",
        async: false,
        success: function (Result) {
            $('.block-ui').addClass('clear');
            Result = Result.d;
            if (Result == "0") {
                alert("Something  went wrong, Please contact support.!!");

            }
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
                html: "Success...!  ",
                showConfirmButton: true,
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
                    window.open('CRFTestResult.aspx', '_self');
                }
            }).then((result) => {
                if (
                    // Read more about handling dismissals
                    result.dismiss === Swal.DismissReason.timer
                ) {
                    window.open('CRFTestResult.aspx', '_self');
                }
            })

        }
    });
}