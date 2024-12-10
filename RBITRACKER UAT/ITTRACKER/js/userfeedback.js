var tid = "";
var thead = "";
$(window).on('load', function () {
    CRFLoad();
    $("#Doc").hide();
});
function CRFLoad() {
    var usr = $("[id*=hdUserId]").val();
    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "userfeedback.aspx/getFillData",
        data: "{pageVal:'feedbacksel', pageval1 :'" + usr + "'}",
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
    var dtl = $('#ddlCrf option:selected').text();
    var ddtl = dtl.split('~');
    $("[id*=hdRqstID]").val(ddtl[1]);
    var reqid = $("[id*=hdRqstID]").val();
    PathLoad(CRFID);
    $("#txtRemarks").val("");

}

function PathLoad(CRFID) {
    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "userfeedback.aspx/getpath",
        data: "{pageVal:'GETPATH', pageval1 :'" + CRFID + "'}",
        dataType: "json",
        success: function (Result) {
            Result = Result.d;
            var data = Result.split('§');

            $('#lbllnk').html(data[1]);
            $('#lblPath').html(data[0]);
        }
    });
}

function CRFSearch(CRFID) {

    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "userfeedback.aspx/getFillData",
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
        url: "userfeedback.aspx/getRequestNote",
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
        url: "userfeedback.aspx/getFileData",
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
                    myUrl = applicationName + "paperless/Images/" + filename;
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

    //if ($("#ddlCrf").val() == -1) {
    // alert("Please Choose a CRF.!");
    // $("#ddlCrf").focus();
    // return false;
    //}
    var crfid = $("#ddlCrf").val() + '§' + $("[id*=hdRqstID]").val() + '§' + $("[id*=hdUserId]").val();
    // var feeddata = $("[id*=HdStar1]").val() + '§' + $("[id*=HdStar2]").val() + '§' + $("[id*=HdStar3]").val() + '§' + $("[id*=HdStar4]").val() + '§' + $("[id*=HdStar5]").val() + '§' + $("#txtRemarks").val();
    var firstQn, SecQn, ThirdQn, FourthQn, FifthQn;
    if ($("[id*=HdStar1]").val() == "") {
        firstQn = 0;
    }
    else firstQn = $("[id*=HdStar1]").val();
    if ($("[id*=HdStar2]").val() == "") {
        SecQn = 0;
    }
    else SecQn = $("[id*=HdStar2]").val();
    if ($("[id*=HdStar3]").val() == "") {
        ThirdQn = 0;
    }
    else ThirdQn = $("[id*=HdStar3]").val();
    if ($("[id*=HdStar4]").val() == "") {
        FourthQn = 0;
    }
    else FourthQn = $("[id*=HdStar4]").val();
    if ($("[id*=HdStar5]").val() == "") {
        FifthQn = 0;
    }
    else FifthQn = $("[id*=HdStar5]").val();
    if (FifthQn == 0 || FourthQn == 0 || ThirdQn == 0 || SecQn == 0 || firstQn == 0) {
        alert("Please give rating for all Questions..");
        return false;
    }

    var feeddata = firstQn + '§' + SecQn + '§' + ThirdQn + '§' + FourthQn + '§' + FifthQn + '§' + $("#txtRemarks").val();
    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "userfeedback.aspx/Confirmdata",
        data: "{pageVal:'USERFEEDBACK', pageval1 :'USERCONFIRM',pageval2:'" + crfid + "',pageval3:'" + feeddata + "'}",
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
                    html: "Success ",
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
                        window.open('userfeedback.aspx', '_self');
                    }
                }).then((result) => {
                    if (
                        // Read more about handling dismissals
                        result.dismiss === Swal.DismissReason.timer
                    ) {
                        window.open('userfeedback.aspx', '_self');
                    }
                })
            }
            else {
                alert("Someting went wrong.! Please contact IT Support.!");
            }

        }
    });

}
function Starvalueselect(id) {
    $("[id*=HdStar1]").val('');
    $("[id*=HdStar1]").val(id);
}
function Starvalueselect2(id) {

    $("[id*=HdStar2]").val('');

    $("[id*=HdStar2]").val(id);

}

function Starvalueselect3(id) {

    $("[id*=HdStar3]").val('');

    $("[id*=HdStar3]").val(id);

}

function Starvalueselect4(id) {

    $("[id*=HdStar4]").val('');

    $("[id*=HdStar4]").val(id);

}

function Starvalueselect5(id) {

    $("[id*=HdStar5]").val('');

    $("[id*=HdStar5]").val(id);

}
function ReturnNote() {
    if ($("#ddlCrf").val() == "-1") {
        alert("Please select a CRF to return..");
        return false;
    }
    if ($("#txtRemarks").val()=="") {
        alert("Please add Remark.");
        return false;
    }
    Swal.fire({
        title: 'Are you Sure.?',
        text: 'Click Return ,if you are not satisfied...',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Return!'
    }).then((result) => {
        if (result.value == true) {
            Returning();
        }
        else {
            return false;
        }
    })
}
function Returning() {
    var crf = $("#ddlCrf").val();
    var rqid = $("[id*=hdRqstID]").val();
    var user = $("[id*=hdUserId]").val();
    var rmk = $("#txtRemarks").val();
    var data = crf + '§' + rqid + '§' + user + '§' + rmk;
    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "userfeedback.aspx/ReturnCRFUAT",
        data: "{pageVal:'ReturnCRFToUAT', pageval1:'" + data + "',pageval2:'" + rmk+"'}",
        dataType: "json",
        success: function (Result) {
            Result = Result.d;
            if (Result != "0") {
                Swal.fire({
                    width: 400,
                    type: 'success',
                    title: 'Success!',
                    html: "Success ",
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
                        window.open('userfeedback.aspx', '_self');
                    }
                }).then((result) => {
                    if (
                        // Read more about handling dismissals
                        result.dismiss === Swal.DismissReason.timer
                    ) {
                        window.open('userfeedback.aspx', '_self');
                    }
                })
            }
            else {
                alert("Something went wrong. Please contact IT Support");
                return false;
            }
        }
    });
}