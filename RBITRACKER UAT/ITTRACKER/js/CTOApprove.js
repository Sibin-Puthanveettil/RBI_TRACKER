$(window).on('load', function () {
    CRFLoad();
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
        url: "CRFCTOApproval.aspx/getFillData",
        data: "{pageVal:'MakeRequest', pageval1 :'" + usr + "'}",
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
    var crf = $("#ddlCrf").val();
    if (crf == -1) {
        $("#error").show();
        $("#snote").hide();
        $("#textgroup1").hide();
        $("#atta").hide();
        $("#remar").hide();
        $("#DivShwTbl").hide();
    }
    else {
    var CRFID = $("#ddlCrf").val();
    $("#checkfile").hide();
    $("#error").hide();
    $("#buttongro").show();
    //alert(CRFID);
    CRFSearch();
    $("#snote").show();
    $("#textgroup1").show();
    $("#atta").show();
    $("#remar").show();
    $("#DivShwTbl").show();
    detailsLoad(CRFID);
    filesFill(CRFID);
        showtable(CRFID);
    }
}
function showtable(crf) {
    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "CRFCTOApproval.aspx/getTableData",
        data: "{pageVal:'showtable', pageval1 :'" + crf + "'}",
        dataType: "json",
        success: function (Result) {
            var valdata = Result.d;
            filltab(valdata);
           
        }
    });
   
}
function filltab(data) {
   
    var valData, valData1, gstno, n = 1;
    $("#DivShwTbl").show();
    valData = data.split('§');
    
    if ($("#tabChange tr").length == 0) {

        $("#tabChange").empty();
        $('#tabChange').append('<tr style="background-color:darkgrey;color:black"><th class="text-center">Request Id</th><th class="text-center">Tech Lead</th><th class="text-center">Development</th><th class="text-center">Testing</th><th class="text-center">Code Review</th><th class="text-center">VAPT</th><th class="text-center">Total Time</th><th class="text-center">Total Cost</th><th class="text-center">Remarks</th></tr>');
    }
    //var sno = $('#tableData tr').length;

    for (i = 0; i < valData.length - 1; i++) {
        valData1 = valData[i].split('^');

        $('#tabChange').append('<tbody><tr>' +

            '<td class="text-center">' + valData1[0] + '</td>' +
            '<td class="text-center">' + valData1[1] + '</td>' +
            '<td class="text-center">' + valData1[2] + '</td>' +
            '<td class="text-center">' + valData1[3] + '</td>' +
            '<td class="text-center">' + valData1[4] + '</td>' +
            '<td class="text-center">' + valData1[5] + '</td>' +
            '<td class="text-center">' + valData1[6] + '</td>' +
            '<td class="text-center">' + valData1[7] + '</td>' +
            '<td class="text-center">' + valData1[8] + '</td>' +

            '</tbody > ');
        
    }
}
function CRFSearch() {
    var CRFID = $("#ddlCrf").val();
    if (CRFID == "") {
        alert("Please Choose CRF!!!");
    }

    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "CRFCTOApproval.aspx/getFillData",
        data: "{pageVal:'DraftApproveDetail', pageval1 :'" + CRFID + "'}",
        dataType: "json",
        success: function (Result) {

            Result = Result.d;
            $.each(Result, function (key, value) {
                var crfdtl = value.id;

                var cdtl = crfdtl.split('±');
                

                $('#lblTeam').val(cdtl[0]);
                $('#lblType').val(cdtl[1]);
                $('#lblReqtr').val(cdtl[2]);
                $('#lblTarDt').val(cdtl[4]);
                $('#lblreqdt').val(cdtl[3]);
                //$('#lblpri').val(cdtl[5]);

                
                if (cdtl[5] == 1) {
                    
                    $('#lblpri').val("High");
                    $('#lblpri').prop(color = red);
                } else if (cdtl[5] == 2) {
                    
                    $('#lblpri').val("Medium");
                    $('#lblpri').prop(color, red);
                } if (cdtl[5] == 3) {
                    
                    $('#lblpri').val("Low");
                    $('#lblpri').prop(color, red);

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
        url: "CRFCTOApproval.aspx/getRequestNote",
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
        url: "CRFCTOApproval.aspx/getFileData",
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
}
function frmExit() {
    window.open("index.aspx", "_self");
}
function approve() {
    var crf = $("#ddlCrf").val();
    if (crf == -1) {
        $("#error").show();
    }
    else {
        var crf = $("#ddlCrf").val();
        var re = $("#txtRemarks").val();
        var data = crf + '^' + re;
       
        $.ajax({
            type: "post",
            contentType: "application/json; charset=utf-8",
            url: "CRFCTOApproval.aspx/savedata",
            data: "{pageVal:'ctoapproved', pageval1:'" + data + "'}",
            dataType: "json",
            success: function (Result) {
               
              
            }
        });
    }
}
function reject() {
    var crf = $("#ddlCrf").val();
    if (crf == -1) {
        $("#error").show();
    }
    else {
        var crf = $("#ddlCrf").val();
        var re = $("#txtRemarks").val();
        var data = crf + '^' + re +'^';
      
        $.ajax({
            type: "post",
            contentType: "application/json; charset=utf-8",
            url: "CRFCTOApproval.aspx/rejectdata",
            data: "{pageVal:'ctorejected', pageval1:'" + data + "'}",
            dataType: "json",
            success: function (Result) {


            }
        });
    }
}