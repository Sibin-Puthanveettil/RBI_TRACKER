$(window).on('load', function () {
    //alert('sdfgh');
    $("#ddldate").datepicker({
        dateFormat: 'dd/MM/yy',
        maxDate: new Date(),
        changeMonth: true,
        changeYear: true,
        stepMonths: true,
        todayHighlight: true,
        onSelect: function (dateText, inst) {
        }

    });
    $("[id*=hdnPriority]").val("3");
    $("[id*=hdnErrorReportImpact]").val("2");

  
    
    loadfrdtype();
    loadfrdcat();
    loadbranch();
    mailuser();
    isNumberKey(evt);
   

    //GetReqTypeList();
    //getModule();

});
var modal_data = "";


function frmExit() {
    var a = $('#ddlDevlp').val();
    alert(a);
   // window.open("index.aspx", "_self");
}


function loadfrdtype() {
    //alert('type');
    //debugger;

    var indata = 1;

    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "IncidentEntry.aspx/getFillData",
        data: "{pageVal:'FraudType', pageval1 :''}",
        dataType: "json",
        success: function (Result) {
            Result = Result.d;
         
            //$('#ddlType').append($("<option selected disabled></option>").val("-1").html("Select Type "));
            $.each(Result, function (key, value) {
                //alert(value.name);
                $('#ddlType').append($("<option></option>").val(value.id).html(value.name));
            });
        }
    });
}

function loadfrdcat() {

    var indata = 1;

    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "IncidentEntry.aspx/getFillData",
        data: "{pageVal:'Fraudcat', pageval1 :''}",
        dataType: "json",
        success: function (Result) {
            Result = Result.d;

            //$('#ddlcategory').append($("<option selected disabled></option>").val("-1").html("Select Category "));
            $.each(Result, function (key, value) {
                
                $('#ddlcategory').append($("<option></option>").val(value.id).html(value.name));
            });
        }
    });
}

function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode != 46 && charCode > 31
        && (charCode < 48 || charCode > 57))
        return false;

    return true;
}
function loadbranch() {

    var indata = 1;

    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "IncidentEntry.aspx/getFillData",
        data: "{pageVal:'branchload', pageval1 :'', pageval2 :''}",
        dataType: "json",
        success: function (Result) {
            Result = Result.d;
            //$('#ddlDevlp').append($("<option></option>").val("-1").html("Choose Developer"));
            $.each(Result, function (key, value) {
                $('#ddlbranch').append($("<option></option>").val(value.id).html(value.name));
               // $('#ddlDevlp1').append($("<option></option>").val(value.id).html(value.name));
            });
        }
    }); 
}

function addremark() {

    //alert('remark');
    //debugger;
    var remark = $("[id*=addRemark]").val();

    if (remark == '') {
        Swal.fire({
            type: 'warning',
            title: 'Oops...!',
            text: "PLEASE ENTER REMARKS",
            icon: "warning",
            button: "Ok!",
        });
        return false;
    }

    else {
        modal_data = remark;
        $('#myModal').modal('hide');

        }


}

function load_popup() {

   
    $('#addRemark').val("");

    if ($("#ddlType").find('option:selected').val() == "34") {
        $('#myModal').modal('show');

    }
  }



function RequestConfirm() {
    //alert('confirm');
    //debugger

    var mailuser = $('#ddlDevlp').val();

      if ($("#ddlbranch").find('option:selected').val() == "-1") {
         Swal.fire({
             type: 'warning',
             title: 'Oops...!',
             text: "SELECT ANY BRANCH",
             icon: "warning",
             button: "Ok!",
         });

         return;
     }
    else if (document.getElementById('ddldate').value == '') {
        Swal.fire({
            type: 'warning',
            title: 'Oops...!',
            text: "select  Date Of Reporting",
            icon: "warning",
            button: "Ok!",
        });
       
        return;
    }
  
     else if (mailuser== '') {
         Swal.fire({
             type: 'warning',
             title: 'Oops...!',
             text: "Select Mail users!!!",
             icon: "warning",
             button: "Ok!",
         });
         return;
     }

    else {
          var Branch = $("#ddlbranch option:selected").text();
         var Amount = $('#txtamt').val();
            var irregularity = document.getElementById('txtirreglar').value;
         var Fraud_desc = $("[id*=txtdesc]").val();
         
         var Typeid = $("#ddlType option:selected").val();
            var FraudCat = $("#ddlcategory option:selected").text();
            //alert(Branch);
          var Date = $("[id*=ddldate]").val();

          var Fraudid = $("#ddlType option:selected").val();

          if (Fraudid == 0) {
              FraudType = "Nill";
          }
          else {
              var FraudType = $("#ddlType option:selected").text();
          }

          var zoneid = $("#ddlzone option:selected").val();
          if (zoneid == 0) {
              zone = "Nill"
          }
          else {
              var zone = $("#ddlzone option:selected").text();
          }
          
         
          
               //           1                              2              3           4,5             6               7              8                    9                     10           11            12
         var Data = $("[id*=hdUserId]").val() + '~' + FraudType + '~' + Date + '~' + Branch + '~' + Amount + '~' + zone + '~' + irregularity + '~' + Fraud_desc + '~' + modal_data + '~' + zoneid + '~' + Typeid;
         var maildata = $("[id*=hdUserId]").val() + '!' + Branch + '!' + Amount + '!' + Date + '!' + Fraud_desc + '!' + FraudType + '!' + zone + '!' + irregularity;
        //alert(Data);
    }


    Swal.fire({
        title: 'Information',
        text: "Do You want to Confirm?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
    }).then((result) => {
        if (result.value == true) {

            $.ajax({
                type: "post",
                contentType: "application/json; charset=utf-8",
                url: "IncidentEntry.aspx/RequestConfirm",
                data: "{typ:'SELMENUID',val:'" + Data + "',mdata:'" + maildata + "',mailuser:'" + mailuser + "'}",
                dataType: "json",
                async: false,

                success: function (Result) {

                    Result = Result.d
                    alert(Result);
                    debugger;
                    var x = Result.split('~')[1].toString();
                    //$('#Hd_fraudId').val(x);
 
                    var y = $("[id*=Hd_fraudId]").val();
                    //alert(y);
                    var res=Result.split('~')[0].toString();
                    if (res == "done") {
                        let uploadedElements = "";
                        uploadedElements = $(".file-uploaded");
                        if (uploadedElements.length <= 0) {
                            //alert(maildata);
                            Swal.fire({
                                type: 'success',
                                title: 'success',
                                text: "Incident Entry Successful Incident Id:" + $("[id*=Hd_fraudId]").val(),
                                icon: "success",
                               // allowOutsideClick: false,
                               // timer: 1500,
                               //showConfirmButton: true
                            }).then(function () {

                                //SendMail(maildata);

                                
             
                                location.reload();
                            });
                        } else {

                            docupload(maildata);

                        }
                    }
                    else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Something went wrong!'

                        });
                        return false;

                    }

                },
                error: function (Result) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!'

                    });
                   // dangerAlert("Failed to create Reqeust", 5000);
                    return false;
                }
            });
        }
        else {
            return false;
        }
    })
     
}

function docupload(maildata) {
    var data = maildata
    //alert('docupload');
    //debugger;
    let uploadedElements = "";
    uploadedElements = $(".file-uploaded");
    //alert('alert');
    //debugger;
    for (let i = 0; i < uploadedElements.length; i++) {

        let extension = "";
        let element = uploadedElements.eq(i)[0];
        let fileList = element.files;
        let fileReader = new FileReader();
        if (fileReader && fileList && fileList.length) {
            let fileSize = fileList[0].size / 1048576;
            if (fileSize > 20) {
                Swal.fire("Please Upload Files Less Than 15 MB..!", 3000);
                return false;
            }
            let fileName = fileList[0].name;
            extension = fileName.replace(/^.*\./, '');
            if (extension == fileName) {
                extension = '';
            } else {
                extension = extension.toLowerCase();
            }
            fileReader.readAsDataURL(fileList[0]);
            fileReader.onload = function () {
                let fileno = i + 1;
                let imageData1 = fileReader.result;
                let InputData1 = $("[id*=Hd_fraudId]").val() + "µ" + fileno + "µ" + extension + "µ" + fileName.replace(/[^a-zA-Z0-9._]/g, '') + "µ" + $("[id*=hdUserId]").val();
                var sessionkey = $("[id*=hdSesssion]").val();
                var keySession = sessionkey.substring(0, 16);
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
                    url: "IncidentEntry.aspx/UploadingFile",
                    data: "{ImageData:'" + imageData1 + "',InputData:'" + encryptedInput + "'}",
                    dataType: "json",
                    async: false,
                    success: function (Result) {

                        if (Result.d.toString() == "666") {
                            //A delete function for delete from table
                            Swal.fire("Failed to upload files. File type not supported. Please try again.", 3000);
                            delete_data();
                            return flase;
                        }
                        else {
                            if (i == uploadedElements.length - 1) {

                                Swal.fire({
                                    type: 'success',
                                    title: 'success',
                                    text: "Incident Entry Successful Incident Id:" + $("[id*=Hd_fraudId]").val(),
                                    icon: "success",
                                    timer: 1500,
                                    showConfirmButton: false
                                }).then(function () {
                                   // SendMail(maildata);

                                    location.reload();
                                });
                       
                            }
                        }

                    },
                    error: function (Result) {
                        let timerInterval
                        Swal.fire({
                            width: 400,
                            type: 'error',
                            title: 'Oops...!',
                            html: Result,
                            allowOutsideClick: false,
                            timer: 5000,
                            onBeforeOpen: () => {
                                timerInterval = setInterval(() => {
                                    Swal.getContent().querySelector('strong')
                                        .textContent = Swal.getTimerLeft()
                                }, 100)
                            },
                            onClose: () => {
                                clearInterval(timerInterval)
                            }
                        }).then((result) => {
                            if (
                                result.dismiss === Swal.DismissReason.timer
                            ) {
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

function SendMail(maildata) {

    //alert('123');
    //debugger;
    var mailuser = $('#ddlDevlp').val();

    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "IncidentEntry.aspx/MailDtlsLoad",
        data: "{mdata:'" + maildata + "', mailuser :'" + mailuser +"'}",
        dataType: "json",
        async: false,
        success: function (Result) {

            Result = Result.d

            console.log(Result);

            localStorage.setItem("Exception-SendMail()", Result);  

            delete_attachment();

        },
        error: function (Result) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!'

            });
            // dangerAlert("Failed to create Reqeust", 5000);
            console.log(Result);
            return false;
        }
    });
}


function delete_attachment() {  

    var maildata = "";
    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "IncidentEntry.aspx/delete_attachment",
        data: "{s:'" + maildata + "'}",
        dataType: "json",
        async: false,

        success: function (Result) {

            console.log("Deleted!!");
        }

    });
}


function mailuser() {

   

    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "IncidentEntry.aspx/mailusers",
        data: "{pageVal:'mailuser', pageval1 :'', pageval2 :''}",
        dataType: "json",
        success: function (Result) {
            Result = Result.d;
            $('#ddlDevlp').append($("<option></option>").val("-1").html("Choose Mail users:"));
            $.each(Result, function (key, value) {
                $('#ddlDevlp').append($("<option></option>").val(value.id).html(value.name));
            });
        }
    });
}