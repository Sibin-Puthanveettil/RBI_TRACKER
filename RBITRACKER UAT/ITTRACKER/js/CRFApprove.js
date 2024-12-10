var tid = "";
var thead = "";
$(window).on('load', function () {
    $("#Doc").hide();
    $("[id*=hddraftid]").val(''); 
    let querystring = window.location.search.substring(1);
    let crfid = querystring.split("=")[1]; 
    
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
    techlead();
    
});
function CRFLoad() {
    var usr = $("[id*=hdUserId]").val();
    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "CRFHODApprove.aspx/getFillData",
        data: "{pageVal:'DraftApprove', pageval1 :'"+usr+"'}",
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
    filesFill(CRFID);
    $("#txtRemarks").val("");
}
function CRFSearch(CRFID) {
     
    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "CRFHODApprove.aspx/getFillData",
        data: "{pageVal:'DraftApproveDetail', pageval1 :'" + CRFID + "'}",
        dataType: "json",
        success: function (Result) {
            //alert(Result.d);
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
        url: "CRFHODApprove.aspx/getRequestNote",
        data: "{pageVal:'GetRequestNotes', pageval1:'" + noteid + "',pageval2:'2'}",
        dataType: "json",
        success: function (Result) {
            Result = Result.d;
            $('.summernoteview').summernote('code', Result);
        }
    });
}
function CRFIDLBL(noteid) {
    
    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "CRFHODApprove.aspx/getRequestNote",
        data: "{pageVal:'CRFSUBJECT', pageval1:'" + noteid + "',pageval2:'2'}",
        dataType: "json",
        success: function (Result) {
            Result = Result.d;
            $('#lblCRFID').html(Result);
        }
    });
}
function filesFill(noteid) {

    $("#tblFiles").empty();
    var filenm = $("[id*=hdUserId]").val() + noteid.replace(/[^a-zA-Z0-9]/g, '') + "_";
    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "CRFHODApprove.aspx/getFileData",
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
function NoteRecommendConfirm() {

    var crfid = $("#ddlCrf").val();
    if (crfid == -1) {
        alert("Please select CRF..");
        $("#ddlCrf").focus();
        return false;
    }
    Data = '';
    itmdata = '';
    Data = $("#txtRemarks").val() + 'µ' + $("[id*=hddraftid]").val() + 'µ' + $("[id*=hdUserId]").val() + 'µ1';
    
    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "CRFHODApprove.aspx/ConfirmRecommendNote",
        data: "{pageVal:'ConfirmRecommendNote', pageval1 :'" + Data + "',pageval2:'',pageval3:''}",
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
                        window.open('CRFHODApprove.aspx?crfid=1', '_self');
                    }
                }).then((result) => {
                    if (
                        // Read more about handling dismissals
                        result.dismiss === Swal.DismissReason.timer
                    ) {
                        window.open('CRFHODApprove.aspx?crfid=1', '_self');
                    }
                })
            }
            else {
                alert("Something went wrong.! Please contact IT support..")
            }

        }
    });


}

function NoteRecommendReject() {

    var crfid = $("#ddlCrf").val();
    if (crfid == -1) {
        alert("Please choose a CRF to reject.!");
        $("#ddlCrf").focus();
        return false;
    }
    Data = '';
    itmdata = '';
    if ($("#txtRemarks").val() == "") {
        alert("You need to add remarks for reject..!");
        $("#txtRemarks").focus();
        return false;
    }
    Data = $("#txtRemarks").val() + 'µ' + $("[id*=hddraftid]").val() + 'µ' + $("[id*=hdUserId]").val() + 'µ15';
    
    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "CRFHODApprove.aspx/RejectRecommendNote",
        data: "{pageVal:'ConfirmRecommendNote', pageval1 :'" + Data + "',pageval2:'',pageval3:''}",
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
                html: "Rejected ",
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
                    window.open('CRFHODApprove.aspx?crfid=1', '_self');
                }
            }).then((result) => {
                if (
                    // Read more about handling dismissals
                    result.dismiss === Swal.DismissReason.timer
                ) {
                    window.open('CRFHODApprove.aspx?crfid=1', '_self');
                }
            })

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