$(window).on('load', function () {
    loadfraud();
    isNumberKey(evt);
});

function loadfraud() {
    var EmpCode = $("[id*=hdUserId]").val();
    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "DO_VERIFICATION.aspx/getFillData",
        data: "{pageVal:'DoLetterDropDown', pageval1 :'" + EmpCode + "', pageval2 :''}",
        dataType: "json",
        success: function (Result) {
            Result = Result.d;
            $.each(Result, function (key, value) {
                $('#ddlfraud').append($("<option></option>").val(value.id).html(value.name));
                // $('#ddlDevlp1').append($("<option></option>").val(value.id).html(value.name)); jyo
            });
        }
    });
}

function ddlchange(sel) {
    $('#txt_f1').val("");
    $('#txt_f2').val("");
    var e = document.getElementById("ddlfraud");
    var strUser = e.options[e.selectedIndex].text;
    var selid = e.options[e.selectedIndex].value;
    if (selid == -1) { location.reload(); } else
        var val = strUser.split("~");
   
    //alert(val[0]);
    var ddldata = val[0];
    $("#visb").show(); 
    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "DO_VERIFICATION.aspx/GetDoData",
        data: "{pageVal:'DoLetterDataLoad', pageval1 :'" + ddldata + "', pageval2 :'" + ddldata + "'}",
        dataType: "json",
        async: false,
        beforeSend: function () {
          
        },
        success: function (Result) {
            Result = Result.d;
            var ddlfraud = Result.split("~")[0].toString();
            var amnt = Result.split("~")[1].toString();
            var brid = Result.split("~")[2].toString();
            var brnch = Result.split("~")[3].toString();
            var brnchidandname = brid + "~" + brnch;
            var party = Result.split("~")[4].toString();
            var officl = Result.split("~")[5].toString();
            var lodgd = Result.split("~")[6].toString();
            var modulus = Result.split("~")[7].toString();
            var other = Result.split("~")[8].toString();
            var nature = Result.split("~")[10].toString();
            var frdid = Result.split("~")[11].toString();
            $('#fraud_id').val(frdid);
            $('#fraud_num').val(ddlfraud);
            $('#amount_inv').val(amnt);
            $('#ddlModus').val(modulus);
            $('#txtRemarks').val(other);
            $('#ddlofficials').val(officl);
            $('#ddllodged').val(lodgd);
           // $('#ddllodged').append($("<option></option>").val("1").html(lodgd));
           // loadbranch();
            $("#name_fraud").empty();
            $("#ddlbranch").empty();
            $("#ddlcategory").empty();
            $("#ddllodged").empty();
            loadfrdcat();
            naturefraud();
            //  $('#name_fraud').val(nature);
            $('#name_fraud').append($("<option></option>").val("1").html(nature));
            //  $('#ddlbranch').val(brnch);
            $('#ddlbranch').append($("<option></option>").val("1").html(brnchidandname));
            //  $('#ddlcategory').val(party);
            $('#ddlcategory').append($("<option></option>").val("1").html(party));
        }
    });
}

function loadbranch() {

    var indata = 1;

    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "DO_Letter.aspx/getFillData",
        data: "{pageVal:'branchload', pageval1 :'', pageval2 :''}",
        dataType: "json",
        success: function (Result) {
            Result = Result.d;
            $.each(Result, function (key, value) {
                $('#ddlbranch').append($("<option></option>").val(value.id).html(value.name));
            });
        }
    });
}

function naturefraud() {
    var indata = 1;

    $.ajax({

        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "DO_Letter.aspx/getFillData",
        data: "{pageVal:'FraudNature', pageval1 :''}",
        dataType: "json",
        success: function (Result) {
            Result = Result.d;
              $.each(Result, function (key, value) {

                $('#name_fraud').append($("<option></option>").val(value.id).html(value.name));
            });
        }
    });
}

function loadfrdtype() {

    var indata = 1;

    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "DO_Letter.aspx/getFillData",
        data: "{pageVal:'FraudType', pageval1 :''}",
        dataType: "json",
        success: function (Result) {
            Result = Result.d;

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
        url: "DO_Letter.aspx/getFillData",
        data: "{pageVal:'Fraudcat', pageval1 :''}",
        dataType: "json",
        success: function (Result) {
            Result = Result.d;

            $.each(Result, function (key, value) {

                $('#ddlcategory').append($("<option></option>").val(value.id).html(value.name));
            });
        }
    });
}

function doReject() {

    var e = document.getElementById("ddlfraud");
    var selid = e.options[e.selectedIndex].value;
   
    if (selid == -1) {
        Swal.fire({
            type: 'warning',
            title: 'Oops...!',
            text: "Select Fraud first",
            icon: "warning",
            button: "Ok!",
        });
        return;
    } else
        var fraudid = $('#fraud_id').val();
    var stats = 1; //reject
    var datas = fraudid + '~' + stats;
   

    Swal.fire({
        title: 'Information',
        text: "ARE YOU SURE TO REJECT?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
    }).then((result) => {
        if (result.value == true) {
            $.ajax({
                type: "post",
                url: "DO_VERIFICATION.aspx/VerifyReturnData",
                contentType: "application/json; charset=utf-8",
                data: "{pageVal:'DOReject', pageval1 :'" + datas + "'}",
                dataType: "json",
                async: false,



                success: function (Result) {
                    Result = Result.d;
                    Swal.fire({
                        type: 'success',
                        title: 'success',
                        text: "Rejected Successfully ",
                        icon: "success",
                        timer: 1500,
                        showConfirmButton: false
                    }).then(function () {
                        cleartextbox();
                        location.reload();
                    });



                }
            });
        }
        else {
            return false;
        }
    })

}

function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode != 46 && charCode > 31
        && (charCode < 48 || charCode > 57))
        return false;

    return true;
}




function Verify() {
    var e = document.getElementById("ddlfraud");
 
    var selid = e.options[e.selectedIndex].value;
    if (selid == -1) {
        Swal.fire({
            type: 'warning',
            title: 'Oops...!',
            text: "Select Fraud first",
            icon: "warning",
            button: "Ok!",
        });
        return;
    } else
        var fraudid = $('#fraud_id').val();
    if (document.getElementById('amount_inv').value == '') {

        Swal.fire({
            type: 'warning',
            title: 'Oops...!',
            text: "Fill Amount involved",
            icon: "warning",
            button: "Ok!",
        });
        return;
        // alert('Fill Amount involved');
    }
    else if (document.getElementById('txt_f1').value == '') {

        Swal.fire({
            type: 'warning',
            title: 'Oops...!',
            text: "Fill FrauidNo involved",
            icon: "warning",
            button: "Ok!",
        });
        return;
    }
    else if (document.getElementById('txt_f2').value == '') {
        Swal.fire({
            type: 'warning',
            title: 'Oops...!',
            text: "Fill FrauidNo involved",
            icon: "warning",
            button: "Ok!",
        });
        return;
    }
    else if ($("#name_fraud").find('option:selected').val() == "-1") {

        Swal.fire({
            type: 'warning',
            title: 'Oops...!',
            text: "Select Name of Fraud",
            icon: "warning",
            button: "Ok!",
        });
        return;
       // alert('Select Name of Fraud');
    }
    else if (document.getElementById('ddlModus').value == '') {
        Swal.fire({
            type: 'warning',
            title: 'Oops...!',
            text: "Fill Modulus",
            icon: "warning",
            button: "Ok!",
        });
        return;
      //  alert('Fill Modulus');
    }
    else if ($("#ddlbranch").find('option:selected').val() == "-1") {
        Swal.fire({
            type: 'warning',
            title: 'Oops...!',
            text: "SELECT ANY BRANCH",
            icon: "warning",
            button: "Ok!",
        });
        return;

       // alert('SELECT ANY BRANCH');
    }
    else if ($("#ddlcategory").find('option:selected').val() == "-1") {
        Swal.fire({
            type: 'warning',
            title: 'Oops...!',
            text: "Select Names of parties",
            icon: "warning",
            button: "Ok!",
        });
        return;

       // alert('Select Names of parties');
    }

    else if (document.getElementById('ddlofficials').value == '') {
        Swal.fire({
            type: 'warning',
            title: 'Oops...!',
            text: "Select Name of officials",
            icon: "warning",
            button: "Ok!",
        });
        return;
       // alert('Select Name of officials');
    }
    else if (document.getElementById('ddlModus').value == '') {
        Swal.fire({
            type: 'warning',
            title: 'Oops...!',
            text: "Fill Modulus",
            icon: "warning",
            button: "Ok!",
        });
        return;
        //alert('Fill Modulus ');
    }
    else if (document.getElementById('ddllodged').value == '') {
        Swal.fire({
            type: 'warning',
            title: 'Oops...!',
            text: "Fill Lodged Data",
            icon: "warning",
            button: "Ok!",
        });
        return;
        //alert('Fill Lodged Data');
    }
    else if (document.getElementById('txtRemarks').value == '') {
        Swal.fire({
            type: 'warning',
            title: 'Oops...!',
            text: "Fill Remarks",
            icon: "warning",
            button: "Ok!",
        });
        return;

        //alert('Fill Remarks');
    }

    else {
      
        var status = 3; // verify
        var EmpCode = $("[id*=hdUserId]").val();
      //  var fraudnum = $('#fraud_num').val();
        var txtf1 = $('#txt_f1').val();
        var txtf2 = $('#txt_f2').val();
        var fraudnum = txtf1 + txtf2;
        var amnt_invo = $('#amount_inv').val();
        var nature_fraud = $('#name_fraud option:selected').text();
        var branch_id = $('#ddlbranch option:selected').text();
        var frddd = $('#ddlfraud option:selected').text();
        var brid = frddd.split('~');
        var branchname = brid[2];
        var branchid = brid[1];   
        var party = $('#ddlcategory option:selected').text();
        var officials = $('#ddlofficials').val();
        // var lodged = $('#ddllodged option:selected').text();
        var lodged = $("#ddllodged").val();
        var Modus = $("#ddlModus").val();
        var Remarks = $("#txtRemarks").val();
        var frid = $("#fraud_id").val();
        var datas = frid + '~' + amnt_invo + '~' + branchid + '~' + party + '~' + officials + '~' + lodged + '~' + Modus + '~' + Remarks + '~' + EmpCode + '~' + nature_fraud + '~' + branchid + '~' + status + '~' + fraudnum;


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
                    url: "DO_VERIFICATION.aspx/VerifyReturnData",
                    contentType: "application/json; charset=utf-8",
                    data: "{pageVal:'VerifyUpdate', pageval1 :'" + datas + "'}",
                    dataType: "json",
                    async: false,
                    success: function (Result) {

                        Result = Result.d;
                      
                        Swal.fire({
                            type: 'success',
                            title: 'success',
                            text: "Verified Successfully ",
                            icon: "success",
                            timer: 1500,
                            showConfirmButton: false
                        }).then(function () {
                            cleartextbox();
                            $("#visb").hide();
                        });

                        location.reload();
                        //alert("successful");
                    }
                });
            }
            else {
                return false;
            }
        })

       
    }

}

function frmExit() {
    window.open("index.aspx", "_self");
}

function ddlbranchchange(sel) {
   
}

function ReturnData() {
    var e = document.getElementById("ddlfraud");
  
    var selid = e.options[e.selectedIndex].value;
    if (selid == -1) {
        Swal.fire({
            type: 'warning',
            title: 'Oops...!',
            text: "Select Fraud first",
            icon: "warning",
            button: "Ok!",
        });
        return;
    } else
        var fraudid = $('#fraud_id').val();
    if (document.getElementById('amount_inv').value == '') {
        Swal.fire({
            type: 'warning',
            title: 'Oops...!',
            text: "Fill Amount involved",
            icon: "warning",
            button: "Ok!",
        });
        return;
        //  alert('Fill Amount involved');
    }
    else if ($("#name_fraud").find('option:selected').val() == "-1") {
        Swal.fire({
            type: 'warning',
            title: 'Oops...!',
            text: "Select Name of Fraud",
            icon: "warning",
            button: "Ok!",
        });
        return;
        // alert('Select Name of Fraud');
    }
    else if (document.getElementById('ddlModus').value == '') {
        Swal.fire({
            type: 'warning',
            title: 'Oops...!',
            text: "Fill Modulus",
            icon: "warning",
            button: "Ok!",
        });
        return;
        //  alert('Fill Modulus');
    }
    else if ($("#ddlbranch").find('option:selected').val() == "-1") {
        Swal.fire({
            type: 'warning',
            title: 'Oops...!',
            text: "SELECT ANY BRANCH",
            icon: "warning",
            button: "Ok!",
        });
        return;
        //alert('SELECT ANY BRANCH');
    }
    else if ($("#ddlcategory").find('option:selected').val() == "-1") {
        Swal.fire({
            type: 'warning',
            title: 'Oops...!',
            text: "Select Names of parties",
            icon: "warning",
            button: "Ok!",
        });
        return;
        //alert('Select Names of parties');
    }

    else if (document.getElementById('ddlofficials').value == '') {
        Swal.fire({
            type: 'warning',
            title: 'Oops...!',
            text: "Select Name of officials",
            icon: "warning",
            button: "Ok!",
        });
        return;
        // alert('Select Name of officials');
    }
    else if (document.getElementById('ddlModus').value == '') {
        Swal.fire({
            type: 'warning',
            title: 'Oops...!',
            text: "Fill Modulus",
            icon: "warning",
            button: "Ok!",
        });
        return;
        //alert('Fill Modulus ');
    }
    else if (document.getElementById('ddllodged').value == '') {
        Swal.fire({
            type: 'warning',
            title: 'Oops...!',
            text: "Fill Lodged Data",
            icon: "warning",
            button: "Ok!",
        });
        return;
        //alert('Fill Lodged Data');
    }
    else if (document.getElementById('txtRemarks').value == '') {
        Swal.fire({
            type: 'warning',
            title: 'Oops...!',
            text: "Fill Remarks",
            icon: "warning",
            button: "Ok!",
        });
        return;
        // alert('Fill Remarks');
    }

    else {


        var status = 2; // return
        var EmpCode = $("[id*=hdUserId]").val();
        // var fraudnum = $('#fraud_num').val();
        var fraudnum = "";
        var amnt_invo = $('#amount_inv').val();
        var nature_fraud = $('#name_fraud option:selected').text();
        var frddd = $('#ddlfraud option:selected').text();
        var brid = frddd.split('~');
        var branchname = brid[2];
        var branchid = brid[1];
        var party = $('#ddlcategory option:selected').text();
        var officials = $('#ddlofficials').val();
        var lodged = $("#ddllodged").val();
        var Modus = $("#ddlModus").val();
        var Remarks = $("#txtRemarks").val();
        var frid = $("#fraud_id").val();
        var datas = frid + '~' + amnt_invo + '~' + branchid + '~' + party + '~' + officials + '~' + lodged + '~' + Modus + '~' + Remarks + '~' + EmpCode + '~' + nature_fraud + '~' + status + '~' + fraudnum;
        var bol = "";



    

        var dataa = frid + '~' + 4 + '~' + 0;
      

            Swal.fire({
                title: 'Information',
                text: "ARE YOU SURE TO RETURN?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes'
            }).then((result) => {
                if (result.value == true) {
                    $.ajax({
                        type: "post",
                        url: "DO_VERIFICATION.aspx/VerifyReturnData",
                        contentType: "application/json; charset=utf-8",
                        data: "{pageVal:'InsertNewReturnData', pageval1 :'" + datas + "'}",
                        dataType: "json",
                        async: false,
                        //beforeSend: function () {
                        //    return confirm("Are you sure you want to confirm?");
                        //},
                        success: function (Result) {
                            Result = Result.d;
                            bol = 1;
                            //$("#visb").hide();
                            //location.reload(); 
                        }
                    });
                    if (bol == 1) {
                        $.ajax({
                            type: "post",
                            url: "DO_VERIFICATION.aspx/VerifyReturnData",
                            contentType: "application/json; charset=utf-8",
                            data: "{pageVal:'UpdateReturnData', pageval1 :'" + dataa + "'}",
                            dataType: "json",
                            success: function (Result) {

                                Swal.fire({
                                    type: 'success',
                                    title: 'success',
                                    text: "Returned Successfully ",
                                    icon: "success",
                                    timer: 2000,
                                    showConfirmButton: false
                                }).then(function () {
                                    Result = Result.d;
                                    cleartextbox();
                                    $("#visb").hide();
                                });

                                location.reload();
                                bol = "";
                            }
                        });
                    }
                }
            })
        
      

    }

}


function cleartextbox() {
   // document.getElementById('fraud_num').value ="";
    document.getElementById('amount_inv').value ="";
    document.getElementById('ddlofficials').value = "";
    document.getElementById('ddlModus').value = "";
    document.getElementById('ddllodged').value = "";
    document.getElementById('txtRemarks').value = "";
    document.getElementById('txt_f1').value = "";
    document.getElementById('txt_f2').value = "";
   
}





