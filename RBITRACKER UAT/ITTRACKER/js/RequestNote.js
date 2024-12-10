$(window).on('load', function () {
  //$(".loaderColor").hide();    
    $("[id*=hdnPriority]").val("3");
    $("[id*=hdnApproverType]").val("S");
   // $("#SeqA").trigger("click");
    GetFirmList();
    GetDocTypeList();
    setTimeout(function () { $('#SeqA').click() }, 100);
    //ShowApprovers();
    //var paraDiv = $("#parallelrow");
    //var j = $("#p_rowid").length + 1;
    //alert(j)
    //var ApprType = $("[id*=hdnApproverType]").val();
    //var apprvType = "";
    //if (ApprType == "P") {
    //    apprvType = "Parallel";
    //}
    //else if (ApprType == "S") {
    //    apprvType = "Sequential";
    //}
    ////else if (ApprType == "F") {
    ////    apprvType = "Final Approver";
    ////}
    //var SrchStringLen = addQuotes('2');
    //var hiddenVariable = addQuotes('hdnEmpCodeRec' + j);
    //var pageflag = addQuotes('PWAAPP');
    //var QueryID = addQuotes('GetEmployee');
    //var ShowValue = addQuotes('r_emp' + j);
    //$('<div class="row" id="p_rowid"><div class="col-md-2"><div class="form-group"><b>' + apprvType + '</b></div></div><div class="col-md-8 employee-id-row"><div class="form-group"><div class="all-emp" id="r_emp' + j + '"></div><div class="autocomplete" style="width:100%;" align="left"><input type="text" id="txtEmpCode' + j + '" autocomplete="off" class= "text-uppercase" style = "border-top: none;border-left: none;width:100%" name = "search" placeholder = "Search Employee.." onkeyup = "SearchDataAutoCompleteEmp(this.id, this.value,' + SrchStringLen + ',' + hiddenVariable + ',' + pageflag + ',' + QueryID + ' ,' + ShowValue + ')"/></div ></div></div><div class="col-md-2"><input id="hdnEmpCodeRec' + j + '" type="hidden"/><input id="hdnApprType' + j + '" type="hidden" value="' + ApprType + '" class="hdnApprType"/><button type="button" class="btn btn-danger remove-prow"><i class="fa fa-minus-circle"></i>&nbsp; Remove&nbsp;</button></div></div> ').appendTo(paraDiv);
    //j++;
    //return false;

});
function frmExit() {
    window.open("index.aspx", "_self");
}
function successAlert(msg, tim) {
    $("#msgSuccess").text(msg);
    $(".alertSuccess").show();
    setTimeout(function () {
        //            $(".alertSuccess").fadeTo(500, 0).slideUp(500, function(){
        //    $(this).remove(); 
        //});
        $(".alertSuccess").hide();
    }, tim);
}

function dangerAlert(msg, tim) {
    $("#msgDanger").text(msg);
    $(".alertDanger").show();
    setTimeout(function () {
        //            $(".alertSuccess").fadeTo(500, 0).slideUp(500, function(){
        //    $(this).remove(); 
        //});
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
    //$('.summernote').on('summernote.keydown', function (we, e) {
    //    //remove ' and \ 
    //    if (e.keyCode == 220 || e.keyCode == 222) {
    //        e.preventDefault();
    //        //alert('Key is downed:' + e.keyCode);
    //        return false;
    //    }

    //});
    $('.summernote').on('summernote.paste', function (e, evt) {
        //$(".loaderColor").show();
        //alert('Called event paste' + e.);
        //var bufferText = ((ne.originalEvent || ne).clipboardData || window.clipboardData).getData('Text');
        //ne.preventDefault();
        ////document.execCommand('insertText', false, bufferText);
        //alert('Called event paste' + bufferText);

        evt.preventDefault();
        var bufferText = evt.originalEvent.clipboardData.getData('text/plain'), html = evt.originalEvent.clipboardData.getData('text/html');
        //alert( bufferText);
        //alert(html);
        // $('.summernote').summernote('insertText', bufferText.replace(/'/g, ''));
        //bufferText = bufferText.replace(/[“”‘’]/g, '');
        if (!html) {
            // $('.summernote').summernote('insertText', bufferText.replace(/\\/g, '\\\\').replace(/[“”‘’']/g, '\\\''));
            $('.summernote').summernote('insertText', bufferText);
        }
        else {
            //html = html.replace(/[“”‘’]/g, '');
            var cleaned = CleanPastedHTML(html); //this is where to call whatever clean function you want. I have mine in a different file, called CleanPastedHTML.
            //alert(cleaned);
            //$('.summernote').summernote('pasteHTML', cleaned.replace(/\\/g, '\\\\').replace(/[“”‘’']/g, '\\\''));
            $('.summernote').summernote('pasteHTML', cleaned);

        }


        //$('.summernote').summernote('pasteHTML', html);
        //var markup = $('.summernote').summernote('code');
        //var cleaned = CleanPastedHTML(markup);
        //debugger;
        //$('.summernote').summernote('code', '');
        //alert(cleaned);
        //alert(cleaned.replace(/\\/g, '').replace(/'/g, ''));
        //$('.summernote').summernote('pasteHTML', cleaned.replace(/\\/g, '').replace(/'/g, ''));
        //alert(cleaned.replace(/\\/g, '\\\\').replace(/'/g, '\\\''));
        //$('.summernote').summernote('pasteHTML', cleaned.replace(/\\/g, '\\\\').replace(/'/g, '\\\''));
        //alert(cleaned.replace(/\\/g, '').replace(/'/g, ''));
        $("#total-caracteres").text(bufferText.length);
        // $(".loaderColor").fadeOut();    
        //$('.summernote').summernote('pasteHTML', cleaned.replace(/\\/g, '').replace(/'/g, ''));
    });
    //$('.summernoteview').summernote({
    //    height: 350, // set editor height
    //    minHeight: null, // set minimum height of editor
    //    maxHeight: null, // set maximum height of editor
    //    focus: false, // set focus to editable area after initializing summernote
    //    toolbar: [
    //    ]
    //});
    //$(".summernoteview").summernote("disable");
    //$(".note-editable").on("keydown", function (e)) {
    //    if (e.keyCode == 220 || e.keyCode == 222) {
    //        alert('Key is downed:' + e.keyCode);
    //        return false;
    //    }

    //});
    $(".note-editable").on("keypress", function () {
       
        var limiteCaracteres = 255;
        var caracteres = $(this).text();
        var totalCaracteres = caracteres.length;
        //var newstring = caracteres.replace(/'/g, '');
        //alert(newstring);
        //$(this).text(newstring);
        //Update value
        $("#total-caracteres").text(totalCaracteres);

        //Check and Limit Charaters
        //if (totalCaracteres >= limiteCaracteres) {
        //    return false;
        //}
    });



$('#rbnPriority a').on('click', function () {
        var sel = $(this).data('title');
        var tog = $(this).data('toggle');
        $('#' + tog).prop('value', sel);

        $('a[data-toggle="' + tog + '"]').not('[data-title="' + sel + '"]').removeClass('active').addClass('notActive');
        $('a[data-toggle="' + tog + '"][data-title="' + sel + '"]').removeClass('notActive').addClass('active');
        if (sel == 1) {
            $('a[data-toggle="' + tog + '"]').not('[data-title="' + sel + '"]').removeClass('btn-red').addClass('btn-dark');
            $('a[data-toggle="' + tog + '"][data-title="' + sel + '"]').removeClass('btn-dark').addClass('btn-red');
        }
        if (sel == 2) {
            $('a[data-toggle="' + tog + '"]').not('[data-title="' + sel + '"]').removeClass('btn-orange').addClass('btn-dark');
            $('a[data-toggle="' + tog + '"][data-title="' + sel + '"]').removeClass('btn-dark').addClass('btn-orange');
        }
        if (sel == 3) {
            $('a[data-toggle="' + tog + '"]').not('[data-title="' + sel + '"]').removeClass('btn-yellow').addClass('btn-dark');
            $('a[data-toggle="' + tog + '"][data-title="' + sel + '"]').removeClass('btn-dark').addClass('btn-yellow');
        }


    })
    var paraDiv = $("#parallelrow");
    var j = $("#p_rowid").length + 1;
    

$('#rbnApproverType a').on('click', function () {
    
        var sel = $(this).data('title');
        var tog = $(this).data('toggle');
        $('#' + tog).prop('value', sel);

        $('a[data-toggle="' + tog + '"]').not('[data-title="' + sel + '"]').removeClass('active').addClass('notActive');
        $('a[data-toggle="' + tog + '"][data-title="' + sel + '"]').removeClass('notActive').addClass('active');
        //ShowApprovers();
        //debugger;
        var ApprType = $("[id*=hdnApproverType]").val();
        var apprvType = "";
        if (ApprType == "P") {
            apprvType = "Parallel";
        }
        else if (ApprType == "S") {
            apprvType = "Sequential";
        }
        //else if (ApprType == "F") {
        //    apprvType = "Final Approver";
        //}
        var SrchStringLen = addQuotes('2');
        var hiddenVariable = addQuotes('hdnEmpCodeRec' + j);
        //var hiddenVariable = addQuotes('hdnEmpCodeRec');
        var pageflag = addQuotes('PWAAPP');
        var QueryID = addQuotes('GetEmployee');
        var ShowValue = addQuotes('r_emp' + j);
        $('<div class="row" id="p_rowid"><div class="col-md-2"><div class="form-group"><b>' + apprvType + '</b></div></div><div class="col-md-8 employee-id-row"><div class="form-group"><div class="all-emp" id="r_emp' + j + '"></div><div class="autocomplete" style="width:100%;" align="left"><input type="text" id="txtEmpCode' + j + '" autocomplete="off" class= "text-uppercase" style = "border-top: none;border-left: none;width:100%" name = "search" placeholder = "Search Employee.." onkeyup = "SearchDataAutoCompleteEmp(this.id, this.value,' + SrchStringLen + ',' + hiddenVariable + ',' + pageflag + ',' + QueryID + ' ,' + ShowValue + ')"/></div ></div></div><div class="col-md-2"><input id="hdnEmpCodeRec' + j + '" type="hidden"/><input id="hdnApprType' + j + '" type="hidden" value="' + ApprType + '" class="hdnApprType"/><button type="button" class="btn btn-danger remove-prow"><i class="fa fa-minus-circle"></i>&nbsp; Remove&nbsp;</button></div></div> ').appendTo(paraDiv);
        j++;
        return false;
    })
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
    //var paraDiv = $("#parallelrow");
    //var j = $("#p_rowid").length + 1;
   
    //$("#addPara").bind("click", function () {
    //    debugger;
    //    var ApprType = $("[id*=hdnApproverType]").val();
    //    var apprvType = "";
    //    if (ApprType == "P") {
    //        apprvType = "Parallel";
    //    }
    //    else if (ApprType == "S") {
    //        apprvType = "Sequential";
    //    }
    //    //else if (ApprType == "F") {
    //    //    apprvType = "Final Approver";
    //    //}
    //    var SrchStringLen = addQuotes('2');
    //    var hiddenVariable = addQuotes('hdnEmpCodeRec' + j);
    //    var pageflag = addQuotes('PWAAPP');
    //    var QueryID = addQuotes('GetEmployee');
    //    var ShowValue = addQuotes('r_emp' + j);
    //    $('<div class="row" id="p_rowid"><div class="col-md-2"><div class="form-group"><b>' + apprvType + '</b></div></div><div class="col-md-8 employee-id-row"><div class="form-group"><div class="all-emp" id="r_emp' + j + '"></div><div class="autocomplete" style="width:100%;" align="left"><input type="text" id="txtEmpCode' + j + '" autocomplete="off" class= "text-uppercase" style = "border-top: none;border-left: none;width:100%" name = "search" placeholder = "Search Employee.." onkeyup = "SearchDataAutoCompleteEmp(this.id, this.value,' + SrchStringLen + ',' + hiddenVariable + ',' + pageflag + ',' + QueryID + ' ,' + ShowValue + ')"/></div ></div></div><div class="col-md-2"><input id="hdnEmpCodeRec' + j + '" type="hidden"/><input id="hdnApprType' + j + '" type="hidden" value="' + ApprType +'" class="hdnApprType"/><button type="button" class="btn btn-danger remove-prow"><i class="fa fa-minus-circle"></i>&nbsp; Remove&nbsp;</button></div></div> ').appendTo(paraDiv);
    //    j++;
    //    return false;
    //});

    $("body").on("click", ".remove", function () {
        $(this).closest("tr").remove();
    });


});
function ShowApprovers() {
    var paraDiv = $("#parallelrow");
    var j = $("#p_rowid").length + 1;

    var ApprType = $("[id*=hdnApproverType]").val();
    var apprvType = "";
    if (ApprType == "P") {
        apprvType = "Parallel";
    }
    else if (ApprType == "S") {
        apprvType = "Sequential";
    }
    //else if (ApprType == "F") {
    //    apprvType = "Final Approver";
    //}
    var SrchStringLen = addQuotes('2');
    var hiddenVariable = addQuotes('hdnEmpCodeRec' + j);
    var pageflag = addQuotes('PWAAPP');
    var QueryID = addQuotes('GetEmployee');
    var ShowValue = addQuotes('r_emp' + j);
    $('<div class="row" id="p_rowid"><div class="col-md-2"><div class="form-group"><b>' + apprvType + '</b></div></div><div class="col-md-8 employee-id-row"><div class="form-group"><div class="all-emp" id="r_emp' + j + '"></div><div class="autocomplete" style="width:100%;" align="left"><input type="text" id="txtEmpCode' + j + '" autocomplete="off" class= "text-uppercase" style = "border-top: none;border-left: none;width:100%" name = "search" placeholder = "Search Employee.." onkeyup = "SearchDataAutoCompleteEmp(this.id, this.value,' + SrchStringLen + ',' + hiddenVariable + ',' + pageflag + ',' + QueryID + ' ,' + ShowValue + ')"/></div ></div></div><div class="col-md-2"><input id="hdnEmpCodeRec' + j + '" type="hidden"/><input id="hdnApprType' + j + '" type="hidden" value="' + ApprType + '" class="hdnApprType"/><button type="button" class="btn btn-danger remove-prow"><i class="fa fa-minus-circle"></i>&nbsp; Remove&nbsp;</button></div></div> ').appendTo(paraDiv);
    j++;
    return false;
}
//function funcMyHtml() {
//    var markup = $('.summernote').summernote('code');
//    alert(markup);

//    //var div = document.getElementById('summernoteview');
//    var Data, itmdata, dateval, itmdatachild;
//    Data = '';
//    Data = '1µ' + $('#txtSubject').val() + 'µ' + $('#txtRemarks').val()
//    //div.innerHTML = markup;
//    $('.summernoteview').summernote('code', markup);
//    $.ajax({
//        type: "post",
//        contentType: "application/json; charset=utf-8",
//        url: "RequestNote.aspx/getFillData",
//        data: "{pageVal:'getFillDataConfirm', pageval1 :'" + Data + "',pageval2:'" + markup + "'}",
//        dataType: "json",
//        success: function (Result) {
//            Result = Result.d;
//            $.each(Result, function (key, value) {
//                // $('#ddlDocType').append($("<option></option>").val(value.id).html(value.name));
//                alert(value.name);
//            });
//        }
//    });

//}
//-----------select firm -------------------//

function GetFirmList() {
    var QueryString = "GetFirmList";
        $.ajax({
            type: "post",
            contentType: "application/json; charset=utf-8",
            url: "RequestNote.aspx/getFillData",
            data: "{pageVal:'GetFirmList', pageval1 :'', pageval2 :''}",
            dataType: "json",
            success: function (Result) {
                Result = Result.d;
                $('#ddlFirm').append($("<option selected disabled></option>").val("-1").html("Choose Firm"));
                $.each(Result, function (key, value) {                   
                    $('#ddlFirm').append($("<option></option>").val(value.id).html(value.name));
                });
            }
        });
 }

//-----------select Document type-------------------//

function GetDocTypeList() {
    var QueryString = "GetDocTypeList";
    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "RequestNote.aspx/getFillData",
        data: "{pageVal:'GetDocTypeList', pageval1 :'', pageval2 :''}",
        dataType: "json",
        success: function (Result) {
            Result = Result.d;
            $('#ddlDocType').append($("<option selected disabled></option>").val("-1").html("Choose Document Type"));
            $.each(Result, function (key, value) {
                $('#ddlDocType').append($("<option></option>").val(value.id).html(value.name));
            });
        }
    });
}

//function SavingFile() {
//    debugger;
//    var fileList = document.getElementById("fileUploaded").files;
//    var fileReader = new FileReader();
//    if (fileReader && fileList && fileList.length) {
//        var fileSize = fileList[0].size / 1048576;
//        if (fileSize > 2) {
//            alert("Please Upload Files Less Than 2MB");
//            return false;
//        }
//        var fileName = fileList[0].name;
//        // Use a regular expression to trim everything before final dot
//        extension = fileName.replace(/^.*\./, '');
//        // Iff there is no dot anywhere in filename, we would have extension == filename,
//        // so we account for this possibility now
//        if (extension == fileName) {
//            extension = '';
//        } else {
//            // if there is an extension, we convert to lower case
//            // (N.B. this conversion will not effect the value of the extension
//            // on the file upload.)
//            extension = extension.toLowerCase();
//        }
//        fileReader.readAsDataURL(fileList[0]);
//        fileReader.onload = function () {

//            ///var InputData = noteid + "µ1" + "µ" + extension + "µ" + fileName;
//            var InputData = "1µ1" + "µ" + extension + "µ" + fileName;

//            $.ajax({
//                type: "POST",
//                contentType: "application/json; charset=utf-8",
//                url: "RequestNote.aspx/UploadingFile",
//                data: "{ImageData:'" + imageData + "',InputData:'" + InputData + "'}",
//                dataType: "json",
//                async: false,
//                success: function (Result) {
//                    $("#fileUploaded").val(null);
//                    //return Result.d;
//                    alert('Successfully Uploaded');
//                    window.open('RequestNote.aspx', '_self');
//                },
//                error: function (Result) {
//                    alert(Result);
//                }
//            });

//        };
//    }
//    else {
//        return false;
//    }
//}

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
                    url: "RequestNote.aspx/UploadingFile",
                    data: "{ImageData:'" + imageData1 + "',InputData:'" + encryptedInput + "'}",
                    dataType: "json",
                    success: function (Result) {
                        //$("#imgFileType").val(null);
                        //return Result.d;
                        //alert('Successfully Uploaded');
                        //window.open('POUpload.aspx', '_self');
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
    alert(markup);
    //alert(markup);
    var selectedFirm = $("#ddlFirm option:selected").val();

    if (selectedFirm === '-1') {
        
        //alert("Please select firm from the list and then proceed!");
        $('#ddlFirm').focus();
        dangerAlert("Please select firm from the list and then proceed!", 3000);
        return false;
    }
    else {
        firmid = selectedFirm;
    }

    var selectedDocType = $("#ddlDocType option:selected").val();
    if (selectedDocType === '-1') {
        
        //alert("Please select Document Type from the list and then proceed!");
        $('#ddlDocType').focus();
        warningAlert("Please select Document Type from the list and then proceed!", 3000);
        return false;
    }
    else {
        docType = selectedDocType;
    }
    var subj = $('#txtSubject').val();

    if (subj == '' || subj == 'undefined' || subj == null) {
        //alert("Please Enter Subject..!");
        $('#txtSubject').focus();
        dangerAlert("Please Enter Subject..!", 3000);
        return false;
    }
   
    var len1 = markup.length;
    //var div = document.getElementById('summernoteview');
    var Data, itmdata, dateval, itmdatachild, circularStatus, confidentStatus, firmid, docType, Priority,costStatus;
    //Nature of Note---Is it Confidential?
    if ($('#chkConfidential').prop('checked')) {
        confidentStatus = "Y";
    }
    else {
        confidentStatus = "N";
    }
    //Do you want to issue Circular/Office Note for this?
    if ($('#chkCircular').prop('checked')) {
        circularStatus = "Y";
    }
    else {
        circularStatus = "N";
    }

    //Is there any cost involved???
    if ($('#chkCostInvolved').prop('checked')) {
        costStatus = "Y";
    }
    else {
        costStatus = "N";
    }
    Priority = $("[id*=hdnPriority]").val();
  
    var empCodes = "";
    var apprType = "";
  
    var empdata = "";
    var apprRow = document.getElementById("parallelrow").querySelectorAll("div.row");
    var len1 = apprRow.length;
    if (len1 > 0) {
        for (var i = 0; i < len1; i++) {
            //apprType = apprRow[i].querySelectorAll("input.hdnApprType").value;
            //apprType = apprRow[i].childNodes[2].querySelectorAll("input.hdnApprType").value;
            apprType = apprRow[i].childNodes;
            apprType1 = apprType[2].querySelectorAll("input.hdnApprType");
            apprRow1 = apprRow[i].childNodes;
            empRow = apprRow1[1].querySelectorAll("span.visuallyhidden");
            var len3 = empRow.length;
            if (i == 0) {
                empdata = apprType1[0].value + '£';
            }
            else {
                empdata += '±' + apprType1[0].value + '£';
            }
            if (len3 == 0) {
                //alert("Please Add Approver..!");
                dangerAlert("Please Add Approver..!", 3000);
                return false;
            }
            for (var j = 0; j < len3; j++) {
                if (j == 0) { empdata += empRow[j].innerHTML; }
                else { empdata += '¥' + empRow[j].innerHTML; }

            }
        }
    }
    else {
        //alert("Please Add Approver Type..!");
        dangerAlert("Please Add Approver Type..!", 3000);
        return false;
    }
  
    if ($('#txt_cost').val() == '') {
        dangerAlert("Please enter cost.", 5000);
        return false;

    }
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


    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "RequestNote.aspx/GetNewNoteID",
        data: "{pageVal:'GetNewNoteId'}",
        dataType: "json",
        async: false,
        success: function (Result) {

            Result = Result.d;          
            $("[id*=hdNoteID]").val(Result);
          
        },
        error: function (Result)
        {
            dangerAlert("Failed to create Note", 5000);
                    return false;
        }
    });


  
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
                        url: "RequestNote.aspx/UploadingFile",
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
    
    //upload image

    
    //if (uploadedElements.length >= 0) {
    //    alert("1");
    //    if (uploadFlag = uploadedElements.length) {
    //        alert("2");
    //        ConfirmNote();
    //    }
    //    else {
    //        dangerAlert("Failed to upload files. Please try again.")
    //        return;
    //    }

    //}
    //else {
    //    alert("3");
    //    ConfirmNote();
    //}
 

    function ConfirmNote() {
       
        $('.block-ui').removeClass('clear');
        //Result = empdata.split("~");
        // $('.block-ui').removeClass('clear');
        Data = '';
        itmdata = '';
        var subjectval = $('#txtSubject').val();
        //alert(subjectval);
        subjectval = subjectval.replace(/\\/g, '\\\\').replace(/[“”‘’']/g, '\\\'');
        //alert(subjectval);
        Data = $("[id*=hdBranchId]").val() + 'µ' + firmid + 'µ' + subjectval + 'µ' + $('#txtRemarks').val() + 'µ' + confidentStatus + 'µ' + circularStatus + 'µ' + docType + 'µ' + Priority + 'µ' + $("[id*=hdUserId]").val() + 'µ' + $('#txt_cost').val() + 'µ' + $("[id*=hdNoteID]").val();

        markup = markup.replace(/\\/g, '\\\\').replace(/[“”‘’']/g, '\\\'');
        alert(Data);
        alert(empdata);
        $.ajax({
            type: "post",
            contentType: "application/json; charset=utf-8",
            url: "RequestNote.aspx/RequestNoteConfirm",
            data: "{pageVal:'ConfirmRequestNote', pageval1 :'" + Data + "',pageval2:'" + empdata + "',pageval3:'" + markup + "'}",
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
                    html: "Requested Successfully...!Note ID is :-  " + noteid,
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
                        window.open('RequestNote.aspx', '_self');
                    }
                }).then((result) => {
                    if (
                        // Read more about handling dismissals
                        result.dismiss === Swal.DismissReason.timer
                    ) {
                        window.open('RequestNote.aspx', '_self');
                    }
                })

            }
        });


    }
   
}

