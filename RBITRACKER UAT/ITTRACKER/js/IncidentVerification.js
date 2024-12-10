$(window).on('load', function () {
    //alert('verify');
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
    //loaddata();
    loadfrid();
    $('#ddlzone').prop('disabled', true);
});

function frmExit() {
    window.open("index.aspx", "_self");
}


function loadfrid() {
   
    var indata = 1;

    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "IncidentVerification.aspx/getFillData",
        data: "{pageVal:'Dataload', pageval1 :'', pageval2 :''}",
        dataType: "json",
        success: function (Result) {
            Result = Result.d;
            //$('#ddlDevlp').append($("<option></option>").val("-1").html("Choose Developer"));
            $.each(Result, function (key, value) {
                $('#ddlinc').append($("<option></option>").val(value.id).html(value.name));
                // $('#ddlDevlp1').append($("<option></option>").val(value.id).html(value.name));
            });
        }
    });
}

function disable_items()
{
    
    $('#ddlzone').prop('disabled', true);

    $('#ddlbranch').prop('disabled', true);
    $('#ddlType').prop('disabled', true);

    $('#txtirreglar').prop('readonly', true);
    $('#txtamt').prop('readonly', true);
    $('#ddldate').prop('disabled', true);
    $('#txtdescription').prop('disabled', true);

}


function get_doccuments() {

    disable_items();
    document.getElementById("remarks").value = "";
    debugger;

    var usrId = $("[id*=hdUserId]").val();
    var dpId = $("[id*=hdDepid]").val();
   

  
    var dpValue = $("[id*=ddlinc]").val();
    //alert(dpValue);
    debugger;
    if (dpValue != "-1") {
        //cleardata(); --need to uncomment
     
        $.ajax({
        
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "IncidentVerification.aspx/get_upload_dtls",
            data: "{pageVal:'valueload', pageval1 :'" + dpValue + "' , pageval2 :''}",
            dataType: "json",
            success: function (Result) {
                
                debugger;
                var res1 = Result.d;
                var resZO = res1.split("~")[0].toString();
                var resIRR = res1.split("~")[1].toString();    
                var resDT = res1.split("~")[2].toString(); 
                var resTY = res1.split("~")[3].toString();    
                var resBR = res1.split("~")[4].toString() + "~" + res1.split("~")[5].toString();
                var resAMT = res1.split("~")[6].toString();
                var resDTL = res1.split("~")[7].toString();
                var restyp = res1.split("~")[8].toString();

                $("#ddlbranch").empty();
               // $("#ddlType").empty();
               // $("#ddlzone").empty();
                
                //$('#ddlzone').append($("<option></option>").val("1").html(resZO));
                $('#ddlzone').val(resZO);
                $('#ddlType').val(restyp);
                $('#txtirreglar').val(resIRR);
                $('#ddldate').val(resDT);
               // $('#ddlType').append($("<option></option>").val("1").html(resTY));
                $('#ddlbranch').append($("<option></option>").val("-1").html(resBR));
                $('#txtamt').val(resAMT);
                $('#txtdescription').val(resDTL);
                
                //alert(resBR)
                
              //loadbranch();
                //loadfrdtype();
                //loadfrdcat();
                            

            }
        });
    }
    else {
        cleardata();
    }
}
function cleardata() {
    
    document.getElementById("txtdate").value = "";
    document.getElementById("txtamount").value = "";
    document.getElementById("ddlbranch").value = "";
    document.getElementById("ddlType").value = "";
    document.getElementById("ddlcategory").value = "";
}

function edit()
{

    debugger;
      
    //$('#ddlzone').append($("<option></option>").val("1").html("Zone 1-Ernakulam"));
    //$('#ddlzone').append($("<option></option>").val("2").html("Zone 2-Madurai"));
    //$('#ddlzone').append($("<option></option>").val("3").html("Zone 3-Chennai"));
    //$('#ddlzone').append($("<option></option>").val("4").html("Zone 4-Bangalore"));
    //$('#ddlzone').append($("<option></option>").val("5").html("Zone 5-Hyderabad"));
    //$('#ddlzone').append($("<option></option>").val("6").html("Zone 6-Mumbai"));
    //$('#ddlzone').append($("<option></option>").val("7").html("Zone 7-Orissa"));
    //$('#ddlzone').append($("<option></option>").val("8").html("Zone 8-Delhi"));


    $('#ddlzone').prop('disabled', false);

    $('#ddlbranch').prop('disabled', false);
    $('#ddlType').prop('disabled', false);

    $('#txtirreglar').prop('readonly', false);
    $('#txtamt').prop('readonly', false);
    $('#ddldate').prop('disabled', false);
    $('#txtdescription').prop('disabled', false);

   

    loadbranch();
    loadfrdtype();
   

}
//function loadfrdtype() {

//    var indata = 1;

//    $.ajax({
//        type: "post",
//        contentType: "application/json; charset=utf-8",
//        url: "IncidentEntry.aspx/getFillData",
//        data: "{pageVal:'FraudType', pageval1 :''}",
//        dataType: "json",
//        success: function (Result) {
//            Result = Result.d;

//            //$('#ddlType').append($("<option selected disabled></option>").val("-1").html("Select Type "));
//            $.each(Result, function (key, value) {
//                //alert(value.name);
//                $('#ddlType').append($("<option></option>").val(value.id).html(value.name));
//            });
//        }
//    });
//}
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

function Verify() {
    if ($("#ddlinc").find('option:selected').val() == "-1") {

        Swal.fire({
            type: 'warning',
            title: 'Oops...!',
            text: "SELECT FRAUD",
            icon: "warning",
            button: "Ok!",
        });
        return;
    }

    else if (document.getElementById('ddldate').value == '') {
        Swal.fire({
            type: 'warning',
            title: 'Oops...!',
            text: "SELECT ANY DATE",
            icon: "warning",
            button: "Ok!",
        });
       // alert('SELECT ANY DATE');
        return;
    }
    else if (document.getElementById('txtamt').value == '') {
        Swal.fire({
            type: 'warning',
            title: 'Oops...!',
            text: "FILL AMOUNT",
            icon: "warning",
            button: "Ok!",
        });
        //alert('FILL AMOUNT ');
        return;
    }
    else if (document.getElementById('txtdescription').value == '') {

        Swal.fire({
            type: 'warning',
            title: 'Oops...!',
            text: "FILL REMARKS",
            icon: "warning",
            button: "Ok!",
        });
        return;
    }
    else if ($("#ddlzone").find('option:selected').val() == "-1") {

        Swal.fire({
            type: 'warning',
            title: 'Oops...!',
            text: "SELECT ZONE",
            icon: "warning",
            button: "Ok!",
        });
        return;
    }
    else {
        debugger;
        var FraudId = $("#ddlinc option:selected").text();
        var FraudType = $("#ddlType option:selected").text();
        var Type_id = $("#ddlType option:selected").val();
        var Zone = $("#ddlzone option:selected").text();
        var Zoneid = $("#ddlzone option:selected").val();
        var Branch = $("#ddlbranch option:selected").text();
        var spdata = Branch.split('~');
        var brchid = spdata[0];
        var brname = spdata[1];
        var Date = document.getElementById('ddldate').value;
        var Amount = document.getElementById('txtamt').value;
        var Irreg = document.getElementById('txtirreglar').value;
        var Frdtls = document.getElementById('txtdescription').value;
        var Remarks = document.getElementById('remarks').value;

        var Data = $("[id*=hdUserId]").val() + '~' + FraudId + '~' + FraudType + '~' + Date + '~' + Zone + '~' + brchid + '~' + brname + '~' + Irreg + '~' + Amount + '~' + Frdtls + '~' + Remarks + '~' + Zoneid + '~' + Type_id;
        var maildata = FraudId + '!' + FraudType + '!' + Date + '!' + Zone + '!' + brchid + '!' + brname + '!' + Irreg + '!' + Amount + '!' + Frdtls + '!' + Remarks;
        
    }

    Swal.fire({
        title: 'Information',
        text: "Do You want to Confirm?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
    }).then((result) =>  {
        if (result.value == true) {
            $.ajax({
                type: "post",
                contentType: "application/json; charset=utf-8",
                url: "IncidentVerification.aspx/RequestVerify",
                data: "{typ:'SELMENUID',val:'" + Data + "',mdata:'" + maildata + "'}",
                dataType: "json",
                async: false,

                success: function (Result) {

                    Result = Result.d
                    //alert(Result);
                    if (Result == "done") {
                        Swal.fire({
                            type: 'success',
                            title: 'success',
                            text: "Verified",
                            icon: "success",
                            timer: 1500,
                            showConfirmButton: false
                        }).then(function () {
                            location.reload();
                        });
                    } else { }


                },
                error: function (Result) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!'

                    });
                    //dangerAlert("Failed to create Reqeust", 5000);
                    return false;
                }
            });
        }
        else {
            return false;
        }
    })



    
}

function Reject() {
   

   
    //alert('verify');

    var FraudId = $("#ddlinc option:selected").text();
    var FraudType = $("#ddlType option:selected").text();
    var Zone = $("#ddlzone option:selected").text();
    var Branch = $("#ddlbranch option:selected").text();
    var spdata = Branch.split('~');
    var brchid = spdata[0];
    var brname = spdata[1];
    debugger;
    var Date = document.getElementById('ddldate').value;
    var Amount = document.getElementById('txtamt').value;
    var Irreg = document.getElementById('txtirreglar').value;
    var Frdtls = document.getElementById('txtdescription').value;
    var Remarks = document.getElementById('remarks').value;
   
    var Data = $("[id*=hdUserId]").val() + '~' + FraudId + '~' + Remarks;

    var maildata = FraudId + '!' + FraudType + '!' + Date + '!' + Zone + '!' + brchid + '!' + brname + '!' + Irreg + '!' + Amount + '!' + Frdtls + '!' + Remarks;

    //alert(Data);

    Swal.fire({
        title: 'Information',
        text: "Are You sure to Reject?",
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
                url: "IncidentVerification.aspx/RejectIncident",
                data: "{typ:'SELMENUID',val:'" + Data + "',frdid:'" + maildata + "'}",
                dataType: "json",
                async: false,

                success: function (Result) {

                    Result = Result.d
                    //alert(Result);
                    if (Result == "done") {
                        Swal.fire({
                            type: 'success',
                            title: 'success',
                            text: "Successfully Rejected",
                            icon: "success",
                            timer: 1500,
                            showConfirmButton: false
                        }).then(function () {
                            location.reload();
                        });
                    } else { }


                },
                error: function (Result) {
                    dangerAlert("Failed to create Reqeust", 5000);
                    return false;
                }
            });
        }
        else {
            return false;
        }
    })
   
}
