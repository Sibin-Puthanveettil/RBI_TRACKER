$(window).on('load', function () {
    // alert("sdfgh");


 
    loadfrd();


});




function loadfrd() {
    //alert('type');
    //debugger;

    var user = $("[id*=hdUserId]").val();

    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "Incident_doc_upload.aspx/getFillData",
        data: "{p_flag:'load_fraud_list', p_pageval :'" + user + "'}",
        dataType: "json",
        success: function (Result) {
            Result = Result.d;

            //$('#ddlType').append($("<option selected disabled></option>").val("-1").html("Select Type "));
            $.each(Result, function (key, value) {
                //alert(value.name);
                $('#ddlfraud').append($("<option></option>").val(value.id).html(value.name));
            });
        }
    });
}

function get_fraud_dtls() {
    //alert('123');
    //debugger;
    var fraud_id = $("#ddlfraud option:selected").val();



    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "Incident_doc_upload.aspx/get_fraud_dtls",
        data: "{p_flag:'Get_fraud_details', pageval :'" + fraud_id + "'}",
        dataType: "json",
        async: false,

        success: function (Result) {

            //alert('123');
            //debugger;
            $("[id*=txtbranch]").val(Result.d.branch);
            $("[id*=txtfraud]").val(Result.d.fraud_typ);
            $("[id*=txtzone]").val(Result.d.zone);
            $("[id*=txtamt]").val(Result.d.loass_amt);
            $("[id*=txtirreglar]").val(Result.d.irregularity);
            $("[id*=txtdate]").val(Result.d.reprort_date);
            $("[id*=txtdescription]").val(Result.d.Fraud_desc);




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






function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode != 46 && charCode > 31
        && (charCode < 48 || charCode > 57))
        return false;

    return true;
}






function RequestConfirm() {

    var fraud_id = $("#ddlfraud option:selected").val();  
    let uploadedElements = "";
    uploadedElements = $(".file-uploaded");

    if (fraud_id == '-1') {
        Swal.fire({
            type: 'warning',
            title: 'Oops...!',
            text: "Please select fraud !!",
            icon: "warning",
            button: "Ok!",
        });
        return false;
    }

    if (uploadedElements.length == 0) {
        Swal.fire({
            type: 'warning',
            title: 'Oops...!',
            text: "Please upload document for confirm ",
            icon: "warning",
            button: "Ok!",
        });
        return false;
    }
    debugger;
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
                let InputData1 = fraud_id + "µ" + fileno + "µ" + extension + "µ" + fileName.replace(/[^a-zA-Z0-9._]/g, '') + "µ" + $("[id*=hdUserId]").val();
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
                    url: "Incident_doc_upload.aspx/UploadingFile",
                    data: "{ImageData:'" + imageData1 + "',InputData:'" + encryptedInput + "'}",
                    dataType: "json",
                    async: false,
                    success: function (Result)
                    {

                        if (Result.d.toString() == "666") {
                            //A delete function for delete from table
                            Swal.fire("Failed to upload files. File type not supported. Please try again.", 3000);
                            return flase;
                        }
                        else {
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
                                    window.open('Incident_doc_upload.aspx', '_self');
                                }
                            }).then((result) => {
                                if (
                                    // Read more about handling dismissals
                                    result.dismiss === Swal.DismissReason.timer
                                ) {
                                    window.open('Incident_doc_upload.aspx', '_self');
                                }
                            })
                        }


                    },
                   
                });

            };
        }
        else {

            return false;
        }
        //do something with element


    }
}

function frmExit() {

    window.open("index.aspx", "_self");
}








