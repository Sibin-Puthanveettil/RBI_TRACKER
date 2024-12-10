$(window).on('load', function () {
  
    $("[id*=hdRqstID]").val('');
    CRFLoad();

});
function CRFLoad() {
    var usr = $("[id*=hdUserId]").val();
    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "CRFTestCaseUpdation.aspx/getFillData",
        data: "{pageVal:'testcaseupdation', pageval1 :'" + usr + "',pageval2 :''}",
        dataType: "json",
        success: function (Result) {
            Result = Result.d;
            $.each(Result, function (key, value) {
                $('#ddlCrf').append($("<option></option>").val(value.id).html(value.name));
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
    filesFill(CRFID);
    var crfdata = $('#ddlCrf option:selected').text();
    var ddtl = crfdata.split('~');
    var req = ddtl[1];
    $("[id*=hdRqstID]").val(req)
    GetStatus(req);
    GetUatDetail(req);
    TestCaseFileLoad(req);
    $("#txtRemarks").val("");
}
function CRFSearch() {
    var crfval = $("#ddlCrf option:selected").text();
    var reqid = crfval.split('~');
    var CRFID = $("#ddlCrf").val();
    if (CRFID == "") {
        alert("Please Choose CRF!!!");
    }
    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "CRFTestCaseUpdation.aspx/getFillData",
        data: "{pageVal:'DataLoadTestingAttachment', pageval1 :'" + CRFID + "',pageval2 :'" + reqid[1] + "'}",
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
                $('#lblDvCom').html(cdtl[6]);
                $('#lblTarDt').html(cdtl[8]);
                $('#lblUserExpectDate').html(cdtl[4]);
                if (cdtl[7] == 1) {
                    $('#lblErrorImpact').html("Yes");
                }
                else {
                    $('#lblErrorImpact').html("No");
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

function TestCaseFileLoad(request_id) {

    var count = 0;
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
    if ($("#tblFilesTestCase tr").length > 1 && count == 0) {
        //alert("You have already attached the Test Case file..Do you need to attach again?.");
        var proceed = confirm("You have already attached the Test Case file..Do you need to attach again?. Click OK for attach new test case OR Click REMOVE button for delete from your Queue.");
        if (proceed) {
            count = 1;
        }
        else {
            return false;
        }
    }
}


function detailsLoad(noteid) {
    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "CRFTestCaseUpdation.aspx/getRequestNote",
        data: "{pageVal:'GetRequestNotes', pageval1:'" + noteid + "',pageval2:'2'}",
        dataType: "json",
        success: function (Result) {
            Result = Result.d;
            $('.summernoteview').summernote('code', Result);
        }
    });
}

function NoNeedTestCase() {
    if ($("#txtRemarks").val() == "") {
        alert("Kindly add Remarks..!");
        return false;
    }
    var data = $("#ddlCrf").val() + '^' + $("#txtRemarks").val() + '^' + $("[id*=hdRqstID]").val() + '^' + $("[id*=hdUserId]").val() + '^' + '0';
    ConfirmTestcase(data);
}



function filesFill(noteid) {

    $("#tblFiles").empty();
    var filenm = $("[id*=hdUserId]").val() + noteid.replace(/[^a-zA-Z0-9]/g, '') + "_";
    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "CRFTestCaseUpdation.aspx/getFileData",
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

function GetStatus(crfid) {
    usr = $("[id*=hdUserId]").val();
    var data = crfid + '~' + usr;
    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "CRFTestCaseUpdation.aspx/getFillData",
        data: "{pageVal:'workstatus', pageval1 :'"+data+"'}",
        dataType: "json",
        success: function (Result) {
            Result = Result.d;
            // $('#ddlCrf').append($("<option selected disabled></option>").val("-1").html("Choose CRF"));
            $.each(Result, function (key, value) {
                $('#ddlStatus').append($("<option></option>").val(value.id).html(value.name));
            });
        }
    });
}
function GetUatDetail(req) {
    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "CRFTestCaseUpdation.aspx/UATDetail",
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
        $('#tblUatDtls').append('<tr style="background-color:rosybrown;color:black"><th class="text-center">UATLINK</th><th class="text-center">UATPATH</th><th class="text-center">DBTYE</th><th class="text-center">DBOBJECT</th><th class="text-center">DEVELOPER</th></tr>');
    }
    //var sno = $('#tableData tr').length;
    for (i = 0; i < valData.length - 1; i++) {
        valData1 = valData[i].split('^');

        $('#tblUatDtls').append('<tbody><tr class="text-center" style="background-color:linen" >' +


            '<td>' + valData1[0] + '</td>' +
            '<td>' + valData1[4] + '</td>' +
            '<td>' + valData1[1] + '</td>' +
            '<td>' + valData1[2] + '</td>' +
            '<td>' + valData1[3] + '</td></tr > </tbody > ');

        
    }

}

function Testcaseconfirm() {
    if ($("#txtRemarks").val() == "") {
        alert("Kindly add Remarks..!");
        return false;
    }
    //alert("haiii");
    var data = $("#ddlCrf").val() + '^' + $("#txtRemarks").val() + '^' + $("[id*=hdRqstID]").val() + '^' + $("[id*=hdUserId]").val() + '^' +'1';
    //alert(data);
    uploadedElements = $(".file-uploaded");
    if (uploadedElements.length <= 0) {
        
        alert("Please Attach File..! If you don't need to attach Test Case ,Please Click REMOVE Button", 3000);
        return false;
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
                    let InputData1 = $("[id*=hdRqstID]").val() + "µ" + fileno + "µ" + extension + "µ" + fileName.replace(/[^a-zA-Z0-9._]/g, '') + "µ" + $("[id*=hdUserId]").val();
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
                        url: "CRFTestCaseUpdation.aspx/UploadingFile",
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

                                    ConfirmTestcase(data);

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
                                //showConfirmButton: false,
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

function ConfirmTestcase(data){
   // var data = $("#ddlCrf").val() + '^' + $("#txtRemarks").val() + '^' + $("[id*=hdRqstID]").val() + '^' + $("[id*=hdUserId]").val() + '^' +'0';
   

    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "CRFTestCaseUpdation.aspx/TestConfirm",
        data: "{pageVal:'ConfirmTestCase',pageval1 :'" + data + "',pageval2 :'', pageval3:''}",
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
                    window.open('CRFTestCaseUpdation.aspx', '_self');
                }
            }).then((result) => {
                if (
                    // Read more about handling dismissals
                    result.dismiss === Swal.DismissReason.timer
                ) {
                    window.open('CRFTestCaseUpdation.aspx', '_self');
                }
            })

        }
    });
}