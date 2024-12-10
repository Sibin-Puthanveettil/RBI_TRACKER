$(window).on('load', function () {

    $("[id*=hdnPriority]").val("3");
    $("[id*=hdnErrorReportImpact]").val("2");
    
    load_incident();

});


function frmExit() {
    var a = $('#ddlDevlp').val();
    alert(a);
   // window.open("index.aspx", "_self");
}


function load_incident() {
    //alert('type');
    //debugger;

    var indata = 1;

    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "Incident_Remove.aspx/getFillData",
        data: "{pageVal:'Fraud_load', pageval1 :''}",
        dataType: "json",
        success: function (Result) {
            Result = Result.d;
         
            //$('#ddlType').append($("<option selected disabled></option>").val("-1").html("Select Type "));
            $.each(Result, function (key, value) {
                //alert(value.name);
                $('#ddlincident').append($("<option></option>").val(value.id).html(value.name));
            });
        }
    });
}


function get_fraud_dtls() {
        //    alert('123');
        //debugger;
    var fraud_id= $("#ddlincident option:selected").val();



        $.ajax({
            type: "post",
            contentType: "application/json; charset=utf-8",
            url: "Incident_Remove.aspx/get_fraud_dtls",
            data: "{p_flag:'load_fraud_dtls', pageval :'" + fraud_id + "'}",
            dataType: "json",
            async: false,

            success: function (Result) {

                //alert('123');
                //debugger;

                $("[id*=frd_type]").val(Result.d.fraud_typ);
                $("[id*=zone]").val(Result.d.zone);
                $("[id*=txtamt]").val(Result.d.loass_amt);
                $("[id*=txtirreglar]").val(Result.d.irregularity);
                $("[id*=ddldate]").val(Result.d.reprort_date);




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
    //alert('confirm');
    //debugger


    if ($("#ddlincident option:selected").val() == "-1") {

            Swal.fire({
                type: 'warning',
                title: 'Oops...!',
                text: "SELECT FRAUD ID",
                icon: "warning",
                button: "Ok!",
            });
          
            return false;
    }
    
    //else if ($("[id*=frd_type]").val() == "") {
    //    Swal.fire({
    //        type: 'warning',
    //        title: 'Oops...!',
    //        text: "SELECT ANY ZONE",
    //        icon: "warning",
    //        button: "Ok!",
    //    });
       
    //    return;
    // }
    //else if ($("[id*=zone]").val() == "") {
    //     Swal.fire({
    //         type: 'warning',
    //         title: 'Oops...!',
    //         text: "SELECT ANY BRANCH",
    //         icon: "warning",
    //         button: "Ok!",
    //     });

    //     return;
    // }
    //else if ($("[id*=txtamt]").val() == '') {
    //    Swal.fire({
    //        type: 'warning',
    //        title: 'Oops...!',
    //        text: "SELECT ANY DATE",
    //        icon: "warning",
    //        button: "Ok!",
    //    });
       
    //    return;
    //}
    //else if ($("[id*=txtirreglar]").val() == '') {
    //    Swal.fire({
    //        type: 'warning',
    //        title: 'Oops...!',
    //        text: "FILL AMOUNT",
    //        icon: "warning",
    //        button: "Ok!",
    //    });
    //    return;
    // }
    //else if ($("[id*=ddldate]").val()== '') {
    //     Swal.fire({
    //         type: 'warning',
    //         title: 'Oops...!',
    //         text: "ENTER FRAUD DETAILS",
    //         icon: "warning",
    //         button: "Ok!",
    //     });
    //     return;
    //}
    else if ($('#txtdescription').val() == '') {
        Swal.fire({
            type: 'warning',
            title: 'Oops...!',
            text: "ENTER REASON FOR REMOVING",
            icon: "warning",
            button: "Ok!",
        });
        return;
    }

    else {
         var fraud_id = $("#ddlincident option:selected").val();
        var fraud_typ = $("[id*=frd_type]").val();
        var zone = $("[id*=zone]").val();
        var amount = $("[id*=txtamt]").val();
        var irregularity = $("[id*=txtirreglar]").val();
         var date = $("[id*=ddldate]").val();
        var reason = $('#txtdescription').val();





         
          
               //           1                              2              3              
        var Data = $("[id*=hdUserId]").val() + '~' + fraud_id + '~' + reason;
        $("[id*=Hd_fraudId]").val(fraud_id);

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
                url: "Incident_Remove.aspx/RequestConfirm",
                data: "{typ:'Confirmremove',val:'" + Data + "'}",
                dataType: "json",
                async: false,

                success: function (Result) {

                    Result = Result.d
                    //alert(Result);
                    //debugger;
                  
                    if (Result == "done") {
                 
                            //alert(maildata);
                            Swal.fire({
                                type: 'success',
                                title: 'success',
                                text: "Incident Removed Successfully",
                                icon: "success",
                                timer: 1500,
                                showConfirmButton: false
                            }).then(function () {
                               SendMail();
             
                                location.reload();
                            });
                   
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
function SendMail(maildata) {

    //alert('123');
    //debugger;
    var fraud_id = $("[id*=Hd_fraudId]").val();

    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "Incident_Remove.aspx/MailDtlsLoad",
        data: "{typ:'load_mail_emp',val:'" + fraud_id + "'}",
        dataType: "json",
        async: false,

        success: function (Result) {

            Result = Result.d
            //alert(Result);
            //if (Result == "done") {
            //    Swal.fire({
            //        type: 'success',
            //        title: 'success',
            //        text: "Incident Entry Successful",
            //        icon: "success",
            //        timer: 1500,
            //        showConfirmButton: false
            //    }).then(function () {
            //        location.reload();
            //    });
            //} else {
            //    Swal.fire({
            //        icon: 'error',
            //        title: 'Oops...',
            //        text: 'Something went wrong!'

            //    });

            //}
            console.log(Result);



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




