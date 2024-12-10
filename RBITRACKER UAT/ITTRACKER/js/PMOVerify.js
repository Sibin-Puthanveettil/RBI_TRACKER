var tid = "";
var thead = "";
i = 0;
$(window).on('load', function () {
    $("[id*=hddraftid]").val('');
    let querystring = window.location.search.substring(1);
    let crfid = querystring.split("=")[1]; 
    
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
        filesFill(crfid);
    }
    techlead();
    $("#txtDate").datepicker({
        dateFormat: 'dd/MM/yy',
        changeMonth: true,
        changeYear: true,
        stepMonths: true,
        todayHighlight: true,
        onSelect: function (dateText, inst) {
        }

    });

});
function CRFLoad() {
    var usr = $("[id*=hdUserId]").val();
    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "pmoverification.aspx/getFillData",
        data: "{pageVal:'DraftVerify', pageval1 :'"+usr+"'}",
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

function techlead() {
    var usr = $("[id*=hdUserId]").val();
    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "pmoverification.aspx/getFillData",
        data: "{pageVal:'techleadselect', pageval1 :'" + usr + "'}",
        dataType: "json",
        success: function (Result) {
            Result = Result.d;
           
          
            // $('#ddlCrf').append($("<option selected disabled></option>").val("-1").html("Choose CRF"));
            $.each(Result, function (key, value) {
               $('#techlead').append($("<option></option>").val(value.id).html(value.name));
              
            });
        }
    });
}
function CRFIDLBL(noteid) {

    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "pmoverification.aspx/getRequestNote",
        data: "{pageVal:'CRFSUBJECT', pageval1:'" + noteid + "',pageval2:'2'}",
        dataType: "json",
        success: function (Result) {
            Result = Result.d;
            $('#lblCRFID').html(Result);
        }
    });
}
function ShowPurpose() {

    $("#rtnDate").show();
   

}
function ShowPurpose1() {

    $("#rtnDate").hide();


}


function techleadfill() {
    var tlds = '';
    var tl = $("[id*=hdTLead]").val();
    var tlead = $("#techlead").val();
    
    tlead = tlead + '¶';
    tlds = tl + tlead;
    $("[id*=hdTLead]").val(tlds);
   
    filltab(tlead);
}
function filltab(data) {
    var valData, valData1, gstno, n = 1;
    valData = data.split('¶');
    //alert(valData);
    if ($("#tabChange tr").length == 0) {
        $("#tabChange").empty();
        $('#tabChange').append('<tr style="color:black; background-color:honeydew"><th class="text-left" >EMPCODE</th><th class="text-left" style="display:none">Team</th><th class="text-left">NAME</th><th class="text-left">DELETE</th></tr>');
    }
    //var sno = $('#tableData tr').length;
    for (i = 0; i < valData.length - 1; i++) {
        valData1 = valData[i].split('^');

        $('#tabChange').append('<tbody><tr>' +

            '<td>' + valData1[0] + '</td>' +
            '<td style="display:none">' + valData1[1] + '</td>' +
            '<td>' + valData1[2] + '</td>' +
            '<td><a href="javascript:void(0);" class="remove"  id="remrow"><span class="glyphicon glyphicon-trash">Remove</span></a></td></tr > </tbody > ');
    }
}
function fillCRFData(CRFID) {
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
    filesFill(CRFID);
    selectmodule();
    $("#txtRemarks").val("");

}
function CRFSearch(CRFID) {
    
    
    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "pmoverification.aspx/getFillData",
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
                    $('#lblPrior').prop(color= red);
                }else if (cdtl[5] == 2) {
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
        url: "pmoverification.aspx/getRequestNote",
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
        url: "pmoverification.aspx/getFileData",
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
function ConfirmNote() {

    var crfid = $("[id*=hddraftid]").val();
    var mod = $("#exmodule").val();
    var sts = '1';
    var Data = '', input = '', RtnType, RtnVal;
    var tm = $("#appt").val();
    // alert($("#appt").val());
    if ($("#ddlCrf").val() == -1) {
        alert("Please select a CRF.!");
        $("#ddlCrf").focus();
        return false;
    }

    if ($("#rbReturn").prop("checked")) {
        RtnType = 1;
        RtnVal = 'Y'; sts = '2';
    }
    else if ($("#rbNonReturn").prop("checked")) {
        RtnType = 2;
        RtnVal = 'N';
    }
    else {
        RtnType = 0;
        RtnVal = '';


    }
    var pur = $("#techlead").val();
    if (pur == -1) {
        alert("Please Select Tech Lead...!!!");
        $("#techlead").focus();
        return false;
    }

    var grid = $("#tabChange tr").length;
    if (grid < 2) {
        alert("Please Select Tech Lead...!!!");
        $("#techlead").focus();
        return false;
    }

    if (RtnType == 0) {
        alert("Please Select Need Discussion...!!!");
        return false;
    }
    if (RtnType == 1 && $("#txtDate").val() == '') {
        alert("Please Select Time And Date...!!!");
        if ($("#appt").val() == '') {
            alert("Please select Time..!")
            return false;
        }
        return false;
    }

    Data = $("#txtRemarks").val() + 'µ' + crfid + 'µ' + $("[id*=hdUserId]").val() + 'µ';

    input = RtnVal + 'µ' + $("#txtDate").val() + 'µ' + $("#appt").val() + 'µ' + $("[id*=hdTLead]").val() + 'µ' + mod;
    Data = Data + input;

    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "pmoverification.aspx/PMOConfirm",
        data: "{pageVal:'PMOVerification', pageval1 :'" + Data + "',pageval2:'" + sts + "',pageval3:''}",
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
                    html: "Verification Completed!! ",
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
                        window.open('pmoverification.aspx?crfid=1', '_self');
                    }
                }).then((result) => {
                    if (
                        // Read more about handling dismissals
                        result.dismiss === Swal.DismissReason.timer
                    ) {
                        window.open('pmoverification.aspx?crfid=1', '_self');
                    }
                })
            }
            else {
                alert("Something went wrong..! Please contact IT support.!");
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

function RejectNote() {

    var crfid = $("[id*=hddraftid]").val();
    if ($("#ddlCrf").val() == -1) {
        alert("Please select a CRF to return.!");
        $("#ddlCrf").focus();
        return false;
    }

    var Data = '';
    if ($("#txtRemarks").val() == "") {
        alert("You need to add remarks for reject..!");
        $("#txtRemarks").focus();
        return false;
    }
    
    Data = $("#txtRemarks").val() + 'µ' + crfid + 'µ' + $("[id*=hdUserId]").val() + 'µ';
    var sts = '3';
      

    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "pmoverification.aspx/PMOConfirm",
        data: "{pageVal:'PMOReject', pageval1 :'" + Data + "',pageval2:'" + sts+"',pageval3:''}",
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
                html: "Rejected!! ",
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
                    window.open('pmoverification.aspx?crfid=1', '_self');
                }
            }).then((result) => {
                if (
                    // Read more about handling dismissals
                    result.dismiss === Swal.DismissReason.timer
                ) {
                    window.open('pmoverification.aspx?crfid=1', '_self');
                }
            })

        }
    });



}
function selectmodule() {
    var val = $("#ddlCrf").val();
   
    $("#exmodule").empty();
        $.ajax({
            type: "post",
            contentType: "application/json; charset=utf-8",
            url: "pmoverification.aspx/Getexmodule",
            data: "{pageVal:'Getpmomodule',pageval1:'" +val+ "'}",
            dataType: "json",
            async: false,
            success: function (Result) {

                Result = Result.d;
                $("#exmodule").empty();
                $("#exmodule").append($("<option></option>").val("-1").html("Choose Module"));
                $.each(Result, function (key, value) {
                    $("#exmodule").append($("<option></option>").val(value.id).html(value.name));
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
    $("[id*=hdTLead]").val(data);
    
}

function ReturnNote() {

    var crfid = $("[id*=hddraftid]").val();
    if ($("#ddlCrf").val() == -1) {
        alert("Please select a CRF to return.!");
        $("#ddlCrf").focus();
        return false;
    }

    var Data = '';
    if ($("#txtRemarks").val() == "") {
        alert("You need to add remarks for return..!");
        $("#txtRemarks").focus();
        return false;
    }

    Data = $("#txtRemarks").val() + 'µ' + crfid + 'µ' + $("[id*=hdUserId]").val() + 'µ';
    var sts = '4';


    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "pmoverification.aspx/PMOConfirm",
        data: "{pageVal:'PMOReturn', pageval1 :'" + Data + "',pageval2:'" + sts + "',pageval3:''}",
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
                    window.open('pmoverification.aspx?crfid=1', '_self');
                }
            }).then((result) => {
                if (
                    // Read more about handling dismissals
                    result.dismiss === Swal.DismissReason.timer
                ) {
                    window.open('pmoverification.aspx?crfid=1', '_self');
                }
            })

        }
    });



}