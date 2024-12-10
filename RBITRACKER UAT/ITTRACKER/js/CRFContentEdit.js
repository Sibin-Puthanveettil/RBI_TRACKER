$(window).on('load', function () {
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
    $("#TarDt").datepicker({
        dateFormat: 'dd/MM/yy',
        minDate: 0,
        changeMonth: true,
        changeYear: true,
        stepMonths: true,
        todayHighlight: true,
        onSelect: function (dateText, inst) {
        }

    });
    $("[id*=hdnPriority]").val("3");
    GetTeamList();
    GetReqTypeList();

});
function CRFLoad() {
    
    var usr = $("[id*=hdUserId]").val();
    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "CrfContentUserEdit.aspx/getFillData",
        data: "{pageVal:'USERCONTENTEDIT', pageval1 :'" + usr + "'}",
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
    $("[id*=hddraftid]").val(CRFID);
    $("[id*=hdNoteID]").val(CRFID);
    detailsLoad(CRFID);
    filesFill(CRFID);
    var dtl = $('#ddlCrf option:selected').text();
    var ddtl = dtl.split('~');
    $('#txtSubject').val(ddtl[1]);
}

function detailsLoad(noteid) {
   
    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "CrfContentUserEdit.aspx/getRequestNote",
        data: "{pageVal:'GetRequestNotes', pageval1:'" + noteid + "',pageval2:'2'}",
        dataType: "json",
        success: function (Result) {
            Result = Result.d;
            
            $('.summernote').summernote('code', Result);
        }
    });
}

function filesFill(noteid) {

    $("#tblFiles").empty();
    var filenm = $("[id*=hdUserId]").val() + noteid.replace(/[^a-zA-Z0-9]/g, '') + "_";
    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "CrfContentUserEdit.aspx/getFileData",
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
function frmExit() {
    window.open("index.aspx", "_self");
}
function successAlert(msg, tim) {
    $("#msgSuccess").text(msg);
    $(".alertSuccess").show();
    setTimeout(function () {
       
        $(".alertSuccess").hide();
    }, tim);
}

function dangerAlert(msg, tim) {
    $("#msgDanger").text(msg);
    $(".alertDanger").show();
    setTimeout(function () {
        
        $(".alertDanger").hide();
    }, tim);
}

function warningAlert(msg, tim) {
    $("#msgWarning").text(msg);
    $(".alertWarning").show();
    setTimeout(function () {
        //            $(".alertSuccess").fadeTo(500, 0).slideUp(500, function(){
        //    $(this).remove(); 
        //});
        $(".alertWarning").hide();
    }, tim);
}
function CleanPastedHTML(input) {
    // 1. remove line breaks / Mso classes
    var stringStripper = /(\n|\r| class=(")?Mso[a-zA-Z]+(")?)/g;
    var output = input.replace(stringStripper, ' ');
    // 2. strip Word generated HTML comments
    var commentSripper = new RegExp('<!--(.*?)-->', 'g');
    var output = output.replace(commentSripper, '');
    var tagStripper = new RegExp('<(/)*(meta|link|span|\\?xml:|st1:|o:|font)(.*?)>', 'gi');
    // 3. remove tags leave content if any
    output = output.replace(tagStripper, '');
    // 4. Remove everything in between and including tags '<style(.)style(.)>'
    var badTags = ['style', 'script', 'applet', 'embed', 'noframes', 'noscript'];

    for (var i = 0; i < badTags.length; i++) {
        tagStripper = new RegExp('<' + badTags[i] + '.*?' + badTags[i] + '(.*?)>', 'gi');
        output = output.replace(tagStripper, '');
    }
    // 5. remove attributes ' style="..."'
    var badAttributes = ['style', 'start'];
    for (var i = 0; i < badAttributes.length; i++) {
        var attributeStripper = new RegExp(' ' + badAttributes[i] + '="(.*?)"', 'gi');
        output = output.replace(attributeStripper, '');
    }
    return output;
}
$(document).ready(function () {
    $('.summernote').summernote({
        height: 135, // set editor height
        minHeight: null, // set minimum height of editor
        maxHeight: null, // set maximum height of editor
        focus: false, // set focus to editable area after initializing summernote
        toolbar: [
            //[ 'style', [ 'style' ] ],
            ['font', ['bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript', 'clear']],
            ['fontname', ['fontname']],
            ['fontsize', ['fontsize']],
            ['color', ['color']],
            ['para', ['ol', 'ul', 'paragraph', 'height']],
            ['table', ['table']],
            //['insert', ['picture']],
            ['view', ['undo', 'redo']]
            //['insert', ['image', 'doc']],
            //['view', ['undo', 'redo']]           
            //['insert', ['link','image', 'doc', 'video']], // image and doc are customized buttons
            //[ 'insert', [ 'link'] ],
            //[ 'view', [ 'undo', 'redo', 'fullscreen', 'codeview', 'help' ] ]
        ]
    });
   
    $(".note-editable").on("keypress", function () {

        var limiteCaracteres = 255;
        var caracteres = $(this).text();
        var totalCaracteres = caracteres.length;
        
        $("#total-caracteres").text(totalCaracteres);

        
    });



    var paraDiv = $("#parallelrow");
    var j = $("#p_rowid").length + 1;



});
/************************************/
//inline-editor
/************************************/
$('.inline-editor').summernote({
    airMode: true
});

/************************************/
//edit and save mode
/************************************/
window.edit = function () {
    $(".click2edit").summernote()
},
    window.save = function () {
        $(".click2edit").summernote('destroy');
    }

var edit = function () {
    $('.click2edit').summernote({ focus: true });
};

var save = function () {
    var markup = $('.click2edit').summernote('code');
    $('.click2edit').summernote('destroy');
};

/************************************/
//airmode editor
/************************************/
$('.airmode-summer').summernote({
    airMode: true
});


$(document).on('click', '.remove-prow', function () {
    $(this).parent().parent().remove();
});
$(document).on('click', '.cancel-emp', function () {
    $(this).parent().remove();
});
function addQuotes(value) {
    var quotedVar = "\'" + value + "\'";
    return quotedVar;
}
$(function () {
   
    $("body").on("click", ".remove", function () {
        $(this).closest("tr").remove();
    });


});
function SaveImage(noteid) {
    var extension = "";

    let uploadedElements = $(".file-uploaded");
    for (let i = 0; i < uploadedElements.length; i++) {

        let element = uploadedElements.eq(i)[0];
        let fileList = element.files;
        let fileReader = new FileReader();
        if (fileReader && fileList && fileList.length) {
            let fileSize = fileList[0].size / 1048576;
            if (fileSize > 2) {
                alert("Please Upload Files Less Than 2MB");
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
                let InputData1 = noteid + "µ" + fileno + "µ" + extension + "µ" + fileName.replace(/[^a-zA-Z0-9._]/g, '');
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
                    url: "CrfContentUserEdit.aspx/UploadingFile",
                    data: "{ImageData:'" + imageData1 + "',InputData:'" + encryptedInput + "'}",
                    dataType: "json",
                    success: function (Result) {
                       
                    },
                    error: function (Result) {
                        alert(Result);

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
var start = function () {
    $('.block-ui').removeClass('clear');
}

var finish = function () {
    $('.block-ui').addClass('clear');
}


function onlyNos(e, t) {


    try {
        if (window.event) {
            //To disable other button clicks
            if (window.event.keyCode == 13) {
                e.preventDefault();
                //  if (!($('#txt_PartAmount').prop(disable, true))) {
                if ($('#txt_PartAmount').attr('readonly') == undefined) {
                    $("#btn_paypart").click();
                }
            }
            var charCode = window.event.keyCode;
        }
        else if (e) {
            var charCode = e.which;
        }
        else { return true; }
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;
    }
    catch (err) {
        alert(err.Description);
    }
}

function ReqNoteCofirm() {

    var markup = $('.summernote').summernote('code');
    var subj = $('#txtSubject').val();

    if (subj == '' || subj == 'undefined' || subj == null) {
        //alert("Please Enter Subject..!");
        $('#txtSubject').focus();
        dangerAlert("Please Enter Subject..!", 3000);
        return false;
    }

    var len1 = markup.length,Data;



   
    //Check file size
    let uploadedElements = $(".file-uploaded");
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
        }
    }


    

    //upload image
    uploadedElements = $(".file-uploaded");
    if (uploadedElements.length <= 0) {
        ConfirmNote();
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
                    let InputData1 = $("[id*=hdNoteID]").val() + "µ" + fileno + "µ" + extension + "µ" + fileName.replace(/[^a-zA-Z0-9._]/g, '');
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
                        url: "CrfContentUserEdit.aspx/UploadingFile",
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

                                    ConfirmNote();

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

    
    function ConfirmNote() {

        $('.block-ui').removeClass('clear');
        //Result = empdata.split("~");
        // $('.block-ui').removeClass('clear');
        Data = '';
        itmdata = '';
        var subjectval = $('#txtSubject').val();
        
        subjectval = subjectval.replace(/\\/g, '\\\\').replace(/[“”‘’']/g, '\\\'');
        
        Data = $("[id*=hdBranchId]").val() + 'µ' + subjectval + 'µ' + $("[id*=hdUserId]").val() + 'µ' + $("[id*=hdNoteID]").val();
        markup = markup.replace(/\\/g, '\\\\').replace(/[“”‘’']/g, '\\\'');
 

        $.ajax({
            type: "post",
            contentType: "application/json; charset=utf-8",
            url: "CrfContentUserEdit.aspx/ConfirmRecommendNote",
            data: "{pageVal:'ConfirmEditNote', pageval1 :'" + Data + "',pageval2:'ConfirmRequestNote',pageval3:'" + markup + "'}",
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
                        window.open('CrfContentUserEdit.aspx?crfid=1', '_self');
                    }
                }).then((result) => {
                    if (
                        // Read more about handling dismissals
                        result.dismiss === Swal.DismissReason.timer
                    ) {
                        window.open('CrfContentUserEdit.aspx?crfid=1', '_self');
                    }
                })

            }
        });


    }

}

