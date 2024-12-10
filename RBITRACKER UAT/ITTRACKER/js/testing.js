// Modified by Yadhu-3581lo91
var tot = 0;
var days = "";

$(window).on('load', function () {   
    CRFLoad();
    testempname();
    $("#Doc").hide();
    $("#Doc1").hide();
    $("#lblstaDt").datepicker({ dateFormat: 'dd-MM-y', minDate: 0, changeMonth: true, changeYear: true, stepMonths: true, todayHighlight: true, onSelsect: function (dateText, inst) { } });
    $("#lblendDt").datepicker({ dateFormat: 'dd-MM-y', minDate: 0, changeMonth: true, changeYear: true, stepMonths: true, todayHighlight: true, onSelsect: function (dateText, inst) { } });
   // $("#tardt").datepicker({ dateFormat: 'dd-MM-y', minDate: 0, changeMonth: true, changeYear: true, stepMonths: true, todayHighlight: true, onSelsect: function (dateText, inst) { } });
    $("#startdt").datepicker({
        dateFormat: 'dd/MM/yy',
        changeMonth: true,
        changeYear: true,
        stepMonths: true,
        todayHighlight: true,
        onSelect: function (dateText, inst) {
        }

    });
    $("#tardt").datepicker({
        dateFormat: 'dd/MM/yy',
        changeMonth: true,
        changeYear: true,
        stepMonths: true,
        todayHighlight: true,
        onSelect: function (dateText, inst) {
        }

    });
    
});
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

function CRFLoad() {

    //var usr = $("[id*=hdUserId]").val();
    var usr = $("[id*=hdUserId]").val();
    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "Testing_Work_assign.aspx/getFillData",
        data: "{pageVal:'TestWorkAssgning', pageval1 :'" + usr + "',pageval2 : ''}",
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
    $("#checkfile").hide();

    $("#buttongro").show();
    //alert(CRFID);
    CRFSearch();
    $("#snote").show();
    if (CRFID == -1) {
        $("#CrfDetailsID").hide();
    }
    else {
        $("#CrfDetailsID").show();

    }
    $("#textgroup1").show();
    $("#atta").show();
    $("#remar").show();
    $("#workassign").show();

    detailsLoad(CRFID);
    filesFill(CRFID);
    

    var crfval = $("#ddlCrf option:selected").text();
    var reqid = crfval.split('~');
    $("[id*=hdrqtid]").val(reqid[1]);
    CRFID = CRFID + '~' + reqid[1];
    manpower(CRFID);
    GetUatDetail(reqid[1]);
    fillTADetails(reqid[1]);
    TestCaseFileLoad(reqid[1]);
}
// changed for automatic loading of target date of testing
//Changed by Yadhu--358191
function manpower(crf) {
    
    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "Testing_Work_assign.aspx/getmanpowerData",
        data: "{pageVal:'ManpowerData', pageval1 :'" + crf + "'}",
        dataType: "json",
        success: function (Result) {
            Result = Result.d;
            $("#testman").val(Result.split('~')[0]);
           //  var Tardate =Result.split('~')[1];
           // var monthValue = Tardate.split("/")[1];
           // var mon = dateCheck(monthValue.toString().toLowerCase().substring(0, 3));
           // alert(mon);
           // if (Tardate.split("/")[2].length > 2) {
           //     $('#tardt').val(Tardate.split("/")[0] + "/" + mon + "/" + Tardate.split("/")[2]);
           // }
           
            
        }
    });
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
        case "nov": return "November";
            break;
        case "dec": return "December";
            break;
    }

}
function CRFSearch() {
    
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
        url: "Testing_Work_assign.aspx/getFillData",
        data: "{pageVal:'DataLoadTesting', pageval1 :'" + CRFID + "',pageval2 :'" + reqid[1] + "'}",
        dataType: "json",
        success: function (Result) {

            Result = Result.d;
            $.each(Result, function (key, value) {
                var crfdtl = value.id;

                var cdtl = crfdtl.split('±');
               // alert(cdtl[8]);
                $('#lblTeam').html(cdtl[0]);
                $('#lblType').html(cdtl[1]);;
                $('#lblReqtr').html(cdtl[2]);
                $('#lblRqstDt').html(cdtl[3]);
                $('#lblTarDt').html(cdtl[8]);
                $('#lblDvCom').html(cdtl[6]);
                //$('#tardt').val(cdtl[8]);
                var monthValue = cdtl[8].split("-")[1];
                var mon = dateCheck(monthValue.toString().toLowerCase().substring(0, 3));
                if (cdtl[8].split("-")[2].length > 2) {
                    $('#tardt').val(cdtl[8].split("-")[0] + "/" + mon + "/" + cdtl[8].split("-")[2]);
                }
                else {
                    $('#tardt').val(cdtl[8].split("-")[0] + "/" + mon + "/20" + cdtl[8].split("-")[2]);
                }
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
                //alert(cdtl[8]);
               // $('#tardt').val(cdtl[8]);
               // var Tardate = Result.split('~')[1];
                //var monthValue = Tardate.split("/")[1];
                //var mon = dateCheck(monthValue.toString().toLowerCase().substring(0, 3));
                //// alert(mon);
                //if (Tardate.split("/")[2].length > 2) {
                //    $('#tardt').val(Tardate.split("/")[0] + "/" + mon + "/" + Tardate.split("/")[2]);
                //}
                
            });
        },
        error: function (Result) {

            alert(Result);
        }
    });

}
function detailsLoad(noteid) {
    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "Testing_Work_assign.aspx/getRequestNote",
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
        url: "Testing_Work_assign.aspx/getFileData",
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
// edited on 20-02-2021
function ShowTable() {
    if ($("#ddlCrf").val() == -1) {
        alert("Please select a CRF");
    }
    if ($("#assignremark").val() == "" || $("#assignto").val() == -1 || $("#assman").val() == "" || $("#tardt").val() == "") {
        alert("Please fill the form properly");
        return false;
    }
    //$.ajax({
    //    type: "post",
    //    contentType: "application/json; charset=utf-8",
    //    url: "Testing_Work_assign.aspx/ManPower_validation",
    //    data: "{pageVal:'ManpowerValidation', pageval1 :'" + usr + "', pageval2 :'" + usr + "', pageval3 :'" + usr + "'}",
    //    dataType: "json",
    //    success: function (Result) {
    //        Result = Result.d;
    //        valData = Result.split('§');
    //        for (i = 0; i < valData.length - 1; i++) {
    //            valData1 = valData[i].split('^');
    //            $('#assignto').append($("<option></option>").val(valData1[0] + '^' + valData1[3]).html(valData1[1]));
    //        }
    //    }
    //});



    var frmDateCom = $("#startdt").val();
    var newFrmDate = Date.parse(frmDateCom);

    var startDateCheck = newFrmDate - days;
    if (startDateCheck > 0) {
        var proceed = confirm(" Are you Ready for Late starting?");
        if (proceed) {
            var count = 1;
        }
        else {
            $("#startdt").focus();
            return false;
        }
    }
    if (startDateCheck < 0) {
        var proceed = confirm(" Are you Ready for Early starting?");
        if (proceed) {
            var count = 1;
        }
        else {
            $("#startdt").focus();
            return false;
        }
    }
    
    var ToDateCom = $("#tardt").val();
    var NewToDate = Date.parse(ToDateCom);
    var dateDifference = NewToDate - newFrmDate;
    if (dateDifference < 0) {
        alert("Choose End Date greater than Start Date.!");
        $("#startdt").val("");
        $("#startdt").focus();
        return false;
    }



    var data1, data;
    
    var a = parseInt($("#assman").val());
    var b = parseInt($("#testman").val());
    tot = tot + a;
    $("#testman").val(b);
    if (tot <= b) {
        data1 = $("[id*=hddata]").val();
        data = $("#assignremark").val() + "^" + $("#assignto option:selected").text() + "^" + $("#assman").val() + "^" + $("#tardt").val() + "^" + $("#assignto").val() + "^" + $("#startdt").val() + "¶";
        data1 = data1 + data;
        $("[id*=hddata]").val(data1);
        filltab(data);
    }
    else {
        alert("Manpower Exceeds.. Make sure Assign Manpower less than Testing Manpower.!");
        tot = 0;
        if ($("#tabChange tr").length >= 2) {
            dirRemovefromHidden();
        }
        //$("#assignremark").val("");
        //$("#assman").val("");
        //$("#tardt").val("");
        //$("#assignto").val(-1);
        return false;      
       
    }

}
function testempname() {
    var usr = $("[id*=hdUserId]").val();
    var valData, valData1;
    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "Testing_Work_assign.aspx/TestEmp_Deatails",
        data: "{pageVal:'TestingTeamMember', pageval1 :'" + usr + "'}",
        dataType: "json",
        success: function (Result) {
            Result = Result.d;
            valData = Result.split('§');
            for (i = 0; i < valData.length - 1; i++) {
                valData1 = valData[i].split('^');
                $('#assignto').append($("<option></option>").val(valData1[0] + '^' + valData1[3]).html(valData1[1]));
            }
        }
    });

}
function fillStartDate() {
    var stdt = $('#assignto').val().split('^')[1];
    stdt = stdt.replace(/-/g, '/');
    var monthValue = stdt.split("/")[1];
    var mon = dateCheck(monthValue.toString().toLowerCase().substring(0, 3));
    if (stdt.split("/")[2].length > 2) {
        $('#startdt').val(stdt.split("/")[0] + "/" + mon + "/" + stdt.split("/")[2]);
    }
    else {
        $('#startdt').val(stdt.split("/")[0] + "/" + mon + "/20" + stdt.split("/")[2]);
    }
}
function filltab(data) {
    var valData, valData1, gstno, n = 1;
    $("#DivShwTbl").show();
    valData = data.split('¶');
   
    if ($("#tabChange tr").length == 0) {
        
        $("#tabChange").empty();
        $('#tabChange').append('<tr style="background-color:honeydew;color:black"><th class="text-center">Assign Remark</th><th class="text-center">Assign To</th><th class="text-center">Manpower</th><th class="text-center">Start Date</th><th class="text-center">Target Date</th><th class="text-center" style="display:none">Assigned</th><th class="text-center">DELETE</th></tr>');
    }
    //var sno = $('#tableData tr').length;
    
    for (i = 0; i < valData.length - 1; i++) {
        valData1 = valData[i].split('^');

        $('#tabChange').append('<tbody><tr>' +

            '<td class="text-center">' + valData1[0] + '</td>' +
            '<td class="text-center">' + valData1[1] + '</td>' +
            '<td class="text-center">' + valData1[2] + '</td>' +
            '<td class="text-center">' + valData1[6] + '</td>' +
            '<td class="text-center">' + valData1[3] + '</td>' +
            '<td class="text-center" style = "display:none">' + valData1[4] + '</td>' +
            '<td class="text-center"><a href="javascript:void(0);" class="remove"  id="remrow"><span class="glyphicon glyphicon-trash">Remove</span></a></td></tr > </tbody > ');
        $("#assignremark").val("");
        $("#assman").val("");
        //$("#tardt").val("");
        //$("#assignto").val(-1);
    }
}
$(document).on('click', '.remove', function () {
    
    $(this).closest('tr').remove();
    dirRemovefromHidden();
    return false;
});
function dirRemovefromHidden() {
    var data = "";
    //alert(document.getElementById('tabChange').rows.length);
    var table = document.getElementById('tabChange');
    var rowLength = table.rows.length;
    if (rowLength > 1) {
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
    else {
        tot = 0;
    }
}
function calTotdtl(data) {
    var valData, valData1, remvalue;
    valData = data.split('¶');
    for (i = 0; i < valData.length - 1; i++) {
        valData1 = valData[i].split('^');
       // alert(valData1[2]);
        remvalue = parseInt(valData1[2]);
    }
    tot = remvalue;
}



function frmExit() {
    window.open("index.aspx", "_self");
}
function savedata() {
    //taalert(circularStatus);
    var crf = $("#ddlCrf").val();
    var table = document.getElementById('tabChange');
    var rowLength = table.rows.length;
    var data = "";
    if (rowLength < 2) {
        alert("Please assign the CRF for atleast 1 person.!");
        return false;
      
    }
   var man_power=parseInt($("#testman").val());
    var bal = parseInt(man_power) - parseInt(tot);
    if (bal>0) {
        alert("As per total time assigned for testing, You have " + bal + " hours left.!");
        return false;
        
    }



    for (var i = 1; i < rowLength; i += 1) {
        var row = table.rows[i];
        //your code goes here, looping over every row.
        //cells are accessed as easy

        var cellLength = row.cells.length;
        for (var y = 0; y < cellLength - 1; y += 1) {
            var cell = row.cells[y];
            data = data + cell.innerText + '^';
        }
        data = data + '§';
    }
    var usr = $("[id*=hdUserId]").val();
    var rmk = $("#txtRemarks").val();
    
    var dtl = $("[id*=hdrqtid]").val() + '~' + rmk + '~' + usr + '~' + crf;
    
    //alert(dtl);
   // alert(data);
    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "Testing_Work_assign.aspx/TestAssignConfirm",
        data: "{pageVal:'Testassign',pageval1 :'" + dtl + "',pageval2 : '" + data +"',pageval3 : ''}",
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
                showConfirmButton: false,
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
                    window.open('Testing_Work_assign.aspx', '_self');
                }
            }).then((result) => {
                if (
                    // Read more about handling dismissals
                    result.dismiss === Swal.DismissReason.timer
                ) {
                    window.open('Testing_Work_assign.aspx', '_self');
                }
            })

        }
    });
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


function GetUatDetail(req) {
    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "Testing_Work_assign.aspx/UATDetail",
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
    $("#tblUatDtls").empty();
    if ($("#tblUatDtls tr").length == 0) {
        $('#tblUatDtls').append('<tr style="background-color:honeydew;color:black"><th class="text-center">UATLINK</th><th class="text-center">UATPATH</th><th class="text-center">DBTYPE</th><th class="text-center">DBOBJECT</th><th class="text-center">DEVELOPER</th></tr>');
    }
    //var sno = $('#tableData tr').length;
    for (i = 0; i < valData.length - 1; i++) {
        valData1 = valData[i].split('^');

        $('#tblUatDtls').append('<tbody><tr class="text-center"  >' +


            '<td>' + valData1[0] + '</td>' +
            '<td>' + valData1[4] + '</td>' +
            '<td>' + valData1[1] + '</td>' +
            '<td>' + valData1[2] + '</td>' +
            '<td>' + valData1[3] + '</td></tr > </tbody > ');


    }

}
// for showing test case files
function TestCaseFileLoad(request_id) {


    $("#tblFilesTestCase").empty();
    var filenm = "TestCases_" + $("[id*=hdUserId]").val() + "_" + request_id.replace(/[^a-zA-Z0-9]/g, '') + "_";
    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "DeveloperUpdation.aspx/getFileData",
        async: false,
        data: "{pageVal:'GetAttachListTestCases', pageval1 :'" + request_id + "', pageval2 :'" + filenm + "'}",
        dataType: "json",
        success: function (Result) {

            Result = Result.d;


            var valData, valData1;
            var n = 0;
            valData = Result.split('Θ');
            if ($("#tblFilesTestCase tr").length == 0) {
                $('#tblFilesTestCase').append('<thead class="bg-success text-white"><tr><th scope="col">File No</th><th scope="col">File Name</th></tr></thead>');
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

                $('#tblFilesTestCase').append('<tbody><tr>' +
                    '<td>' + contentDtl[0] + '</td>' +
                    '<td><a href="' + myUrl + '" download="' + filename + '" class="file-list1">' + contentDtl[1] + '</a></td>' +
                    '</tr> </tbody>');
            }


        },
        error: function (Result) {

        }
    });
    if ($("#tblFilesTestCase tr").length > 0) {
        $("#Doc1").show();
    }
}



function fillTADetails(req) {
    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "Testing_Work_assign.aspx/TestingTADtls",
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