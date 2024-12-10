$(window).on('load', function () {
    //alert('sdfgh');
   
    $("[id*=hdnPriority]").val("3");
    $("[id*=hdnErrorReportImpact]").val("2");

  
    
    loadyear();
    loadmonth();
  
    isNumberKey(evt);
   

    //GetReqTypeList();
    //getModule();

});


function frmExit() {
    var a = $('#ddlDevlp').val();
    alert(a);
   // window.open("index.aspx", "_self");
}


function loadyear() {
    //alert('type');
    //debugger;

    var indata = 1;

    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "Fmr_Returns.aspx/getfinyear",
        data: "{pageVal:'Fmr_year', pageval1 :''}",
        dataType: "json",
        success: function (Result) {
            Result = Result.d;
         
            //$('#ddlType').append($("<option selected disabled></option>").val("-1").html("Select Type "));
            $.each(Result, function (key, value) {
                //alert(value.name);
                $('#ddlyear').append($("<option></option>").val(value.id).html(value.name));
            });
        }
    });
}

function loadmonth() {

    var indata = 1;

    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "Fmr_Returns.aspx/getmonth",
        data: "{pageVal:'Fmr_month', pageval1 :''}",
        dataType: "json",
        success: function (Result) {
            Result = Result.d;

            //$('#ddlcategory').append($("<option selected disabled></option>").val("-1").html("Select Category "));
            $.each(Result, function (key, value) {
                
                $('#ddlMonth').append($("<option></option>").val(value.id).html(value.name));
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

function RequestConfirm() {
    //alert('confirm');
    //debugger


    if ($("#ddlyear").find('option:selected').val() == "-1") {
         Swal.fire({
             type: 'warning',
             title: 'Oops...!',
             text: "SELECT YEAR",
             icon: "warning",
             button: "Ok!",
         });

         return;
     }
    else if ($("#ddlMonth").find('option:selected').val() == "-1") {
        Swal.fire({
            type: 'warning',
            title: 'Oops...!',
            text: "select  Date Of Reporting",
            icon: "warning",
            button: "Ok!",
        });
       
        return;
    }
  
    if ($("#ddlfmr").find('option:selected').val() == "-1") {
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

         
          
        var yearid = $("#ddlyear").find('option:selected').val();
        var monthid = $("#ddlMonth").find('option:selected').val();
        var fmrid = $("#ddlfmr").find('option:selected').val(); 

        var year = $("#ddlyear").find('option:selected').text();
        var month = $("#ddlMonth").find('option:selected').text();
        var fmr = $("#ddlfmr").find('option:selected').text();

        var rmrks = $("[id*=txtdescription]").val();
        var user = $("[id*=hdUserId]").val();

        var data = year + 'µ' + month + 'µ' + fmr + 'µ' + yearid + 'µ' + monthid + 'µ' + fmrid + 'µ' + rmrks + 'µ' + user;
        //alert(data);
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
                        let InputData1 = data + "µ" + fileno + "µ" + extension + "µ" + fileName.replace(/[^a-zA-Z0-9._]/g, '') ;
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
                            url: "Fmr_Returns.aspx/UploadingFile",
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
                                            text: fmr+' Filing Success',
                                            icon: "success",
                                            timer: 1500,
                                            showConfirmButton: false
                                        }).then(function () {
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
        else {
            return false;
        }
    })
     
}



