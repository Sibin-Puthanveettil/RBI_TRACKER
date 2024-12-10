$(window).on('load', function () {
    
    CRFLoad();
    $("#Doc").hide();
    $("#Doc1").hide();
    modulenameload();
    getobject();
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
    
    var usr = $("[id*=hdUserId]").val();
    
    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "DeveloperUpdation.aspx/getFillData",
        data: "{pageVal:'Requestupdation', pageval1 :'" + usr + "'}",
        dataType: "json",
        success: function (Result) {
            Result = Result.d;
            // $('#ddlCrf').append($("<option></option>").val("-1").html("Choose CRF"));
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
    CRFSearch(CRFID);
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
    detailsLoad(CRFID);
    filesFill(CRFID);
    GetRequestId(CRFID);
    Tafill(CRFID);
    var crf = $("[id*=hdRqstID]").val();
    TestCaseFileLoad(crf);
    workstatusload(crf);
    $("#txtRemarks").val("");
}
function GetRequestId(CRFID) {

    var usr = $("[id*=hdUserId]").val();
    usr = usr + '^' + CRFID;
    var dtl = $('#ddlCrf option:selected').text();
    var ddtl = dtl.split('~');
    
    $("[id*=hdRqstID]").val(ddtl[0]);
       
}
function CRFSearch(CRFID) {
    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "TechnicalAnalysis.aspx/getFillData",
        data: "{pageVal:'DraftApproveDetailTaTargetDate', pageval1 :'" + CRFID + "'}",
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
                $('#lblTarDt').html(cdtl[6]);
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
function detailsLoad(noteid) {
    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "DeveloperUpdation.aspx/getRequestNote",
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
        url: "DeveloperUpdation.aspx/getFileData",
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
//for showing test case files
function TestCaseFileLoad(request_id) {
    

    $("#tblFilesTestCase").empty();
    var filenm = "TestCases_" + $("[id*=hdUserId]").val()+"_" + request_id.replace(/[^a-zA-Z0-9]/g, '') + "_";
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
    if ($("#tblFilesTestCase tr").length > 1) {
        $("#Doc1").show();
    }
}





function frmExit() {
    window.open("index.aspx", "_self");
}
function updationcheck() {
    var err = $("#ddlCrf").val();
    var sta = $("#wstatus option:selected");
    var value = sta.text();
    
    
 
    if (err != -1) {
        if (value == "Development Over") {
           
            
            $("#checkfile").show();
            getobject();

            
        }
        else {
            
            $("#checkfile").hide();
        }
    }
    else {
        $("#error").show();
        $("#checkfile").hide();
    }
}
function workstatusload(CRFID) {
    var usr = $("[id*=hdUserId]").val();
    $('#wstatus').empty();
    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "DeveloperUpdation.aspx/getworkData",
        data: "{pageVal:'developworkstatus', pageval1:'" + CRFID + "',pageval2:'" + usr+"'}",
        dataType: "json",
        success: function (Result) {
            Result = Result.d;
            $('#wstatus').append($("<option></option>").val("-1").html("Choose Status"));
            $.each(Result, function (key, value) {
                $('#wstatus').append($("<option></option>").val(value.id).html(value.name));
            });
        }
    });

}
function getobject() {
    $('#ddlproc').empty();
    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "DeveloperUpdation.aspx/getmoduleData",
        data: "{pageVal:'getobjectlist'}",
        dataType: "json",
        success: function (Result) {
            Result = Result.d;
             $('#ddlproc').append($("<option></option>").val("-1").html("Choose Object"));
            $.each(Result, function (key, value) {
                $('#ddlproc').append($("<option></option>").val(value.id).html(value.name));
            });
        }
    });

}
function modulenameload() {
    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "DeveloperUpdation.aspx/getmoduleData",
        data: "{pageVal:'modulename'}",
        dataType: "json",
        success: function (Result) {
            Result = Result.d;
            // $('#ddlCrf').append($("<option selected disabled></option>").val("-1").html("Choose CRF"));
            $.each(Result, function (key, value) {
                $('#mdnames').append($("<option></option>").val(value.id).html(value.name));
            });
        }
    });
}


function ADDObject() {
 
    if ($("#mdnames").val() == -1) {
        alert("Please enter module name.!");
        $("#mdnames").focus();
        return false;
    }
    if ($("#filetfs").val() == "") {
        alert("Please fill folder/file name.!");
        $("#filetfs").focus();
        return false;
    }

    if ($("#uatlink").val() == "") {
        alert("Please provide UAT/Testing link.!");
        $("#uatlink").focus();
        return false;
    }
    if ($("#uatpath").val() == "") {
        alert("Please provide UAT path.!");
        $("#uatpath").focus();
        return false;
    }
    if ($("#ddlproc").val() == '-1') {
        alert("Select DB Object type  !!!");
        $("#ddlproc").focus();
        return false;
    }
    if ($("#table").val() == "") {
        alert("Enter Object Name  !!!");
        $("#table").focus();
        return false;
    }
    data1 = $("[id*=hddata]").val();
    var ws = $("#ddlproc").val();
    var wrktxt = $('#ddlproc option:selected').text();
    var txtobjct = $("#table").val();
    var data = wrktxt + '^' + txtobjct + '^' + ws + "¶";
    data1 = data1 + data;
   // alert(data1);
    $("[id*=hddata]").val(data1);
    filltab(data);
}

function filltab(data) {
    var valData, valData1, gstno, n = 1;
    valData = data.split('¶');
    //alert(valData);
    if ($("#tblObject tr").length == 0) {
        $("#tblObject").empty();
        $('#tblObject').append('<tr style="background-color:darkgrey;color:black"><th class="text-center">Type</th><th class="text-center">Object</th><th class="text-center">Typeid</th><th class="text-center">DELETE</th></tr>');
    }
    //var sno = $('#tableData tr').length;
    for (i = 0; i < valData.length - 1; i++) {
        valData1 = valData[i].split('^');

        $('#tblObject').append('<tbody><tr>' +

            '<td>' + valData1[0] + '</td>' +
            '<td>' + valData1[1] + '</td>' +
            '<td>' + valData1[2] + '</td>' +
            '<td><a href="javascript:void(0);" class="remove"  id="remrow"><span class="glyphicon glyphicon-trash">Remove</span></a></td></tr > </tbody > ');
    }
    //$("#mdnames").val("-1");
    //$("#ddlproc").val("-1");
    //$("#table").val("");
    //$("#filetfs").val("");
    //$("#uatlink").val("");
    //$("#uatpath").val("");


}

$(document).on('click', '.remove', function () {

    $(this).closest('tr').remove();
    dirRemovefromHidden();
    return false;
});
function dirRemovefromHidden() {
    var data = "";

    var table = document.getElementById('tblObject');

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

   
}

function updat() {

    var crf = $("#ddlCrf").val();
    if (crf == -1) {
        alert("Please select a CRF.!");
        $("#ddlCrf").focus();
        return false;
    }

    if ($("#wstatus").val() == -1) {
        alert("Please choose a status!");
        $("#wstatus").focus();
        return false;
    }
        var crfSelect = $("#ddlCrf option:selected").val();
        var ws = $("#wstatus").val();
        var tr = $("#txtRemarks").val();
        var mdn = $("#mdnames").val();
        var ff = $("#filetfs").val();
        var ul = $("#uatlink").val();
        var pro = $("#proc").val();
        var tt = $("#table").val();
        var usr = $("[id*=hdUserId]").val();
    var objdata = $("[id*=hddata]").val();
    var dtl;
      
        
        if ($("#wstatus").val() == 2) {
            if ($("#mdnames").val() == '-1') {
                alert("Select Module !!!");
                $("#mdnames").focus();
                return false;
            }

            if ($("#uatlink").val() == "") {
                alert("Enter UAT Link!!!");
                $("#uatlink").focus();
                return false;
            }
            if ($("#uatpath").val() == "") {
                alert("Enter UAT Path!!");
                $("#uatpath").focus();
                return false;
            }
            var grid = $("#tabChange tr").length;
            if (grid < 2) {
                alert("Please Select Tech Lead...!!!");
                $("#techlead").focus();
                return false;
            }
    }

    if ($("#mdnames").val() != -1 && $("#uatpath").val() != "" && $("#uatlink").val() != "" && $("#table").val() != "" && $("#ddlproc").val() != -1) {
        dtl = mdn + '~' + ff + '~' + ul + '~' + $("#uatpath").val() + '^';
    }
    //else {
    //    dtl = "";
    //}
        DATA = ws + '^' + tr + '^' + crf + '^' + usr + '^' + $("[id*=hdRqstID]").val();
       // var dtl = mdn + '~' + ff + '~' + ul + '~' + $("#uatpath").val() +'^';

        
        $.ajax({
            type: "post",
            contentType: "application/json; charset=utf-8",
            url: "DeveloperUpdation.aspx/DeveloperConfirm",
            data: "{pageVal:'ConfirmDeveloper',pageval1 :'" + DATA + "',pageval2 :'" + dtl + "', pageval3:'" + objdata + "'}",
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

                if (noteid != "0") { 
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
                        window.open('DeveloperUpdation.aspx', '_self');
                    }
                }).then((result) => {
                    if (
                        // Read more about handling dismissals
                        result.dismiss === Swal.DismissReason.timer
                    ) {
                        window.open('DeveloperUpdation.aspx', '_self');
                    }
                        })
                }
                else {
                    alert("Something went wrong..! Please contact IT support.!");
                }

            }
        });
    //}
}
function Tafill(noteid) {
    $("#tabChange").empty();
    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "ViewerNoteDetails.aspx/getTableData",
        data: "{pageVal:'TACompleteData', pageval1 :'" + noteid + "', pageval2:''}",
        dataType: "json",
        success: function (Result) {
            Result = Result.d;
            fillTATable(Result);
        }
    });
}

function fillTATable(data) {
    var valData, valData1;
    valData = data.split('Θ');

    if ($("#tabChange tr").length == 0) {
        $("#tabChange").empty();
        $('#tabChange').append('<tr style="color:black; background-color:honeydew"><th colspan="10" class="text-center"><b>Technical Analysis Completed Details</b></th></tr>');
        $('#tabChange').append('<tr style="color:black; background-color:honeydew"><th class="text-center">RequestId</th><th class="text-center">TechLead</th><th class="text-center">Developer</th><th class="text-center">StartDate</th><th class="text-center">EndDate</th><th class="text-center">Phase</th><th class="text-center">TechChanges</th><th class="text-center">Description</th><th class="text-center">NoOfChanges</th><th class="text-center">TotalHours</th></tr>');
    }
    //var sno = $('#tableData tr').length;
    for (i = 0; i < valData.length - 1; i++) {
        valData1 = valData[i].split('µ');

        $('#tabChange').append('<tbody><tr class="text-center" style="" >' +


            '<td>' + valData1[0] + '</td>' +
            '<td>' + valData1[1] + '</td>' +
            '<td>' + valData1[2] + '</td>' +
            '<td>' + valData1[3] + '</td>' +
            '<td>' + valData1[4] + '</td>' +
            '<td>' + valData1[5] + '</td>' +
            '<td>' + valData1[6] + '</td>' +
            '<td>' + valData1[7] + '</td>' +
            '<td>' + valData1[8] + '</td>' +
            '<td>' + valData1[9] + '</td></tr > </tbody > ');


    }

}