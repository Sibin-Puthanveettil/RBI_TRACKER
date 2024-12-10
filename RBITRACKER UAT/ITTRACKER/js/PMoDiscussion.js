var tid = "";
var thead = "";
$(window).on('load', function () {
    $("[id*=hddraftid]").val('');
    let querystring = window.location.search.substring(1);
    let crfid = querystring.split("=")[1];
    techlead();
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
        TechAnalystLoad(crfid);
    }
    $("#tDate").datepicker({
        dateFormat: 'dd/MM/yy',
        minDate: 0,
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
        url: "PMODiscussion.aspx/getFillData",
        data: "{pageVal:'PMODiscussSel', pageval1 :'" + usr + "'}",
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
    TechAnalystLoad(CRFID);

}
function CRFSearch(CRFID) {
   

    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "PMODiscussion.aspx/getFillData",
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
        url: "PMODiscussion.aspx/getRequestNote",
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
        url: "PMODiscussion.aspx/getFileData",
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
}

function frmExit() {
    window.open("index.aspx", "_self");

}
function ConfirmNote() {

    if ($("#ddlCrf").val() == -1) {
        alert("Please select a CRF.!");
        $("#ddlCrf").focus();
        return false;
    }
    
    var a,b,c,d;
    if ($("#chepmo").prop("checked")) {
        a = 1;

    }
    else {
        a = 0;
    }
    if ($("#chere").prop("checked")) {
        b = 1;
    }
    else {
        b = 0;
    }
    if ($("#chetech").prop("checked")) {
        c = 1;
    }
    else {
        c = 0;
    }
    if ($("#chemd").prop("checked")) {
        d = 1;
    }
    else {
        d = 0;
    }
    var rmk = $('#txtRemarks').val();
    var Data = '';
    var newtl = $("[id*=hdTLead]").val();
    Data = $("[id*=hddraftid]").val() + 'µ' + $("[id*=hdUserId]").val() + 'µ' + a + 'µ' + b + 'µ' + c + 'µ' + d + 'µ' + rmk + 'µ';
    
    

    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "PMODiscussion.aspx/ConfirmRecommendNote",
        data: "{pageVal:'PMODiscussionConfirm', pageval1 :'" + Data + "',pageval2:'" + newtl +"',pageval3:'" + newtl +"'}",
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

           // if (noteid != "0") {
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
                        window.open('PMODiscussion.aspx?crfid=1', '_self');
                    }
                }).then((result) => {
                    if (
                        // Read more about handling dismissals
                        result.dismiss === Swal.DismissReason.timer
                    ) {
                        window.open('PMODiscussion.aspx?crfid=1', '_self');
                    }
                })
            //}
            //else {
            //    alert("Something went wrong.Please contact IT Support!!");
            //}

        }
    });

    
   

}
function ReturnNote() {

    if ($("#ddlCrf").val() == -1) {
        alert("Please choose a CRF to return.!");
        $("#ddlCrf").focus();
        return false;
    }
    if ($("#txtRemarks").val() == "") {
        alert("Please add remarks to return");
        $("#txtRemarks").focus();
        return false;
    }

    var crfid = $("[id*=hddraftid]").val();

    var Data = '';


    Data = $("#txtRemarks").val() + 'µ' + crfid + 'µ' + $("[id*=hdUserId]").val() + 'µ';
    alert(Data);
    var sts = '4';
    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "PMODiscussion.aspx/ConfirmRecommendNote",
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



function RejectNote() {

    if ($("#ddlCrf").val() == -1) {
        alert("Please choose a CRF to return.!");
        $("#ddlCrf").focus();
        return false;
    }
    if ($("#txtRemarks").val() == "") {
        alert("Please add remarks to return");
        $("#txtRemarks").focus();
        return false;
    }

    var a, b, c, d;
    if ($("#chepmo").prop("checked")) {
        a = 1;

    }
    else {
        a = 0;
    }
    if ($("#chere").prop("checked")) {
        b = 1;
    }
    else {
        b = 0;
    }
    if ($("#chetech").prop("checked")) {
        c = 1;
    }
    else {
        c = 0;
    }
    if ($("#chemd").prop("checked")) {
        d = 1;
    }
    else {
        d = 0;
    }
    var rmk = $('#txtRemarks').val();
    var Data = '';

    Data =  rmk + 'µ'+$("[id*=hddraftid]").val() + 'µ' + $("[id*=hdUserId]").val() + 'µ' + a + 'µ' + b + 'µ' + c + 'µ' + d + 'µ' ;

    

    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "PMODiscussion.aspx/ConfirmRecommendNote",
        data: "{pageVal:'PMOReject', pageval1 :'" + Data + "',pageval2:'2',pageval3:''}",
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
                    window.open('PMODiscussion.aspx?crfid=1', '_self');
                }
            }).then((result) => {
                if (
                    // Read more about handling dismissals
                    result.dismiss === Swal.DismissReason.timer
                ) {
                    window.open('PMODiscussion.aspx?crfid=1', '_self');
                }
            })

        }
    });




}

function techlead() {
    var usr = $("[id*=hdUserId]").val();
    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "PMODiscussion.aspx/getFillData",
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
        $('#tabChange').append('<tr style="color:black; background-color:honeydew"><th class="text-left">EMPCODE</th><th class="text-left" style="display:none">Team</th><th class="text-left">NAME</th><th class="text-left">DELETE</th></tr>');
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

function TechAnalystLoad(CRFID) {
    var techld = '';
    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "PMODiscussion.aspx/getFillData",
        data: "{pageVal:'getoldtechlead', pageval1 :'" + CRFID + "'}",
        dataType: "json",
        success: function (Result) {
            Result = Result.d;


            // $('#ddlCrf').append($("<option selected disabled></option>").val("-1").html("Choose CRF"));
            $.each(Result, function (key, value) {
                techld = techld + value.id + '^' + value.name + '¶';

            });
            filltabTechlead(techld);
        }
    });
}
function filltabTechlead(data) {
    $("#tabTeachLead").empty();
    var valData, valData1, gstno, n = 1;
    valData = data.split('¶');
    //alert(valData);
    if ($("#tabTeachLead tr").length == 0) {
        $("#tabTeachLead").empty();
        $('#tabTeachLead').append('<tr style="color:black; background-color:honeydew"><th class="text-left">EMPCODE</th><th class="text-left">NAME</th>');
    }
    //var sno = $('#tableData tr').length;
    for (i = 0; i < valData.length - 1; i++) {
        valData1 = valData[i].split('^');



        $('#tabTeachLead').append('<tbody><tr>' +



            '<td>' + valData1[0] + '</td>' +
            '<td>' + valData1[1] + '</td></tr > </tbody > ');
    }
}