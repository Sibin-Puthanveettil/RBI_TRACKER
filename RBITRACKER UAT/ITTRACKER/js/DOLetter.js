$(window).on('load', function () {
    $("#TarDt").datepicker({
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
    isNumberKey(evt);
    //loadbranch();
    //loadfrdcat();
    //naturefraud();
    //ddlpending();
    yesorno();
});

function yesorno()
{
    $('#ddllodged').append($("<option selected disabled></option>").val("-1").html("Select"));
    $('#ddllodged').append($("<option ></option>").val("1").html("Yes"));
    $('#ddllodged').append($("<option ></option>").val("2").html("No"));

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
            var v = $("#ddlbranch").val();
            if (v == 1) { $("#ddlbranch option[value='-1']").remove(); }
            else {
              $('#ddlbranch').append($("<option selected disabled></option>").val("-1").html("Select Branch  "));
            }
            $.each(Result, function (key, value) {
                $('#ddlbranch').append($("<option></option>").val(value.id).html(value.name));
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
            var v = $("#ddlcategory").val();

            if (v == 1) { $("#ddlcategory option[value='-1']").remove(); }
            else {
                $('#ddlcategory').append($("<option selected disabled></option>").val("-1").html("Select Parties  "));
            }
                $.each(Result, function (key, value) {

                $('#ddlcategory').append($("<option></option>").val(value.id).html(value.name));
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
            var v = $("#name_fraud").val();

            if (v == 1) { $("#name_fraud option[value='-1']").remove(); }
            else {
                $('#name_fraud').append($("<option selected disabled></option>").val("-1").html("Select Nature of Fraud "));
            }
                $.each(Result, function (key, value) {

                $('#name_fraud').append($("<option></option>").val(value.id).html(value.name));
            });
        }
    });
}

function ddlpending() {
    var EmpCode = $("[id*=hdUserId]").val();
    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "DO_Letter.aspx/getFillData",
        data: "{pageVal:'pendingload', pageval1 :'" + EmpCode + "', pageval2 :''}",
        dataType: "json",
        success: function (Result) {
            Result = Result.d;
            $.each(Result, function (key, value) {
                $('#ddlpending').append($("<option></option>").val(value.id).html(value.name));
            });
        }
    });
}

function ddldoletter(sel) {

    var val = $("#ddlletter option:selected").val(); //doletterchange
    if (val == 1) {
       ddlfraudid();
    $('#ddlfraudid').append($("<option></option>").val("-1").html("select"));
         $("#visb").hide();
        $("#fraudidvisb").show();
        $("#pendingvisb").hide();
        $("#ddlpending").empty();
        //$("#ddlbranch").empty();
        //$("#ddlcategory").empty();
       
        cleardata();
        $("#name_fraud").empty();
        $("#ddlbranch").empty();
        $("#ddlcategory").empty();
        $("#ddllodged").empty();
        yesorno();
         loadbranch();
         loadfrdcat();
         naturefraud();
      
    }
    else if (val == 2) {
        ddlpending();
        $("#ddlfraudid").empty();
        $("#fraudidvisb").hide();
        $("#pendingvisb").show();
        $("#visb").hide();
        $("#hid1").show();
        $("#hid2").show();
        $("#hid3").show();
        $("#hid4").show();
        $("#hid5").show();
        $("#hid6").show();
        $("#hid7").show();
        $("#hid8").show();
        //$("#name_fraud").empty();
        //$("#ddlbranch").empty();
        //$("#ddlcategory").empty();
      
    }
    else {
        location.reload();
    }
}     //first dropdown

function ddlpendingletter(sel) {
    $("#btnhide").show(); 
    $("#btnSubmit").hide();
    var selID = document.getElementById("ddlpending");
    var text = selID.options[selID.selectedIndex].value;
    if (text == "-1")
    {
        alert("Select a pending request");
        location.reload(); 
    }

    $("#name_fraud").empty();
    $("#ddlbranch").empty();
    $("#ddlcategory").empty();
    $("#ddllodged").empty();
    $("#visb").show(); 
    var e = document.getElementById("ddlpending");
    var strUser = e.options[e.selectedIndex].text;
    var val = strUser.split("~");
    var ddldata = val[0];
    var oldstatus = 4;
    $("#visb").show();
    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "DO_VERIFICATION.aspx/GetDoData",
        data: "{pageVal:'PendingDOLetter', pageval1 :'" + ddldata + "', pageval2 :'" + oldstatus + "'}",
        dataType: "json",
        success: function (Results) {
            Results = Results.d;
            var ddlfraudd = Results.split("~")[0].toString();
            var amntt = Results.split("~")[1].toString();
            var bridd = Results.split("~")[2].toString();
            var brnchh = Results.split("~")[3].toString();
            var brnchname = bridd + "~" + brnchh;
            var partyy = Results.split("~")[4].toString();
            var officll = Results.split("~")[5].toString();
            var lodgdd = Results.split("~")[6].toString();
            var moduluss = Results.split("~")[7].toString();
            var otherr = Results.split("~")[8].toString();
            var naturee = Results.split("~")[10].toString();
            var frnumbr = Results.split("~")[11].toString();
             $('#fraud_num').val(frnumbr); 
            $('#fraud_id').val(ddlfraudd);
            $('#amount_inv').val(amntt);
            $('#ddlModus').val(moduluss);
            $("#ddlbranch").val(brnchname);
            $('#txtRemarks').val(otherr);
            $('#ddlofficials').val(officll);
         loadbranch();
          naturefraud();
          loadfrdcat();
          //  $("#name_fraud option[value='-1']").remove();
          //  $("#ddlbranch option[value='-1']").remove();
          //  $("#ddlbranch option[value='-1']").remove();
            $('#name_fraud').append($("<option></option>").val("1").html(naturee));
            $('#ddlbranch').append($("<option></option>").val("1").html(brnchname));
            $('#ddllodged').append($("<option></option>").val("1").html(lodgdd));
             $('#ddlcategory').append($("<option></option>").val("1").html(partyy));
           // $("#ddlcategory").val($("#ddlcategory option:first").val());

        }   
    });
    var penstatus = 2;

       $.ajax({

        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "DO_VERIFICATION.aspx/GetDoData",
        data: "{pageVal:'PendingDOLetter', pageval1 :'" + ddldata + "', pageval2 :'" + penstatus + "'}",
        dataType: "json",
        success: function (Result) {
            Result = Result.d;
            var ddlfraud = Result.split("~")[0].toString();
            var amnt = Result.split("~")[1].toString();
            var brid = Result.split("~")[2].toString();
            var brnch = Result.split("~")[3].toString();
            var party = Result.split("~")[4].toString();
            var officl = Result.split("~")[5].toString();
            var lodgd = Result.split("~")[6].toString();
            var modulus = Result.split("~")[7].toString();
            var other = Result.split("~")[8].toString();
            var nature = Result.split("~")[10].toString();
            var frnum = Result.split("~")[11].toString();
            $('#efraud_id').val(ddlfraud);
            $('#eamount_inv').val(amnt);
            $('#eddlModus').val(modulus);
            $('#etxtRemarks').val(other);
            $('#eddlofficials').val(officl);
            $('#eddllodged').val(lodgd);
            $('#ename_fraud').val(nature);
            $('#eddlbranch').val(brnch);
            $('#eddlcategory').val(party); 
            $('#efraud_num').val(frnum); 

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

            $('#ddlType').append($("<option selected disabled></option>").val("-1").html("Select Type "));
            $.each(Result, function (key, value) {
                //alert(value.name);
                $('#ddlType').append($("<option></option>").val(value.id).html(value.name));
            });
        }
    });
}

function BtnSave() {
    
    if (document.getElementById('ddlfraudid') == "-1")
    {
        Swal.fire({
            type: 'warning',
            title: 'Oops...!',
            text: "Select Any Farud",
            icon: "warning",
            button: "Ok!",
        });
        return;
    

    }
    else
    {
        if (document.getElementById('amount_inv').value == '') {

            Swal.fire({
                type: 'warning',
                title: 'Oops...!',
                text: "Fill Amount involved",
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

          
        }
        else if (document.getElementById('ddllodged').value == "-1") { 


            Swal.fire({
                type: 'warning',
                title: 'Oops...!',
                text: "Fill Lodged Data",
                icon: "warning",
                button: "Ok!",
            });
            return;
            
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
          
        }

        else {
           var status = 0;
            var EmpCode = $("[id*=hdUserId]").val();
           // var fraudnum = $('#fraud_num').val();
            var fraudnum = "";
            var amnt_invo = $('#amount_inv').val();
            var nature_fraud = $('#name_fraud option:selected').text();
            var branch_id = $('#ddlbranch option:selected').val();
            var brid = branch_id.split('-');
            var branchname = brid[0];
            var e = document.getElementById("ddlbranch");
            var strUser = e.options[e.selectedIndex].text;
            var val = strUser.split("~");
            var branchid = val[0];
            var party = $('#ddlcategory option:selected').text();
            var officials = $('#ddlofficials').val();
            var lodged = $('#ddllodged option:selected').text();
            var Modus = $("#ddlModus").val();
            var Remarks = $("#txtRemarks").val();
            var e = document.getElementById("ddlfraudid");
            var strUser = e.options[e.selectedIndex].text;
            var val = strUser.split("~");
            var frid = val[0];
            var datas = frid + '~' + amnt_invo + '~' + branchid + '~' + party + '~' + officials + '~' + lodged + '~' + Modus + '~' + Remarks + '~' + EmpCode + '~' + nature_fraud + '~' + status + '~' + fraudnum;
            
            Swal.fire({
                title: 'Information',
                text: "Are You want to Confirm?",
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
                        url: "DO_Letter.aspx/saveData",
                        data: "{typ:'ConfirmSave',val:'" + datas + "',mdata:'" + frid + "'}",
                        dataType: "json",
                        async: false,   
                        success: function (Result) {

                            Result = Result.d;
                            confirmModus(Result, '3', Modus);
                            Swal.fire({
                                type: 'success',
                                title: 'success',
                                text: "DO Letter Entry Successfully Completed",
                                icon: "success",
                                timer: 1500,
                                showConfirmButton: false
                            }).then(function () {
                                location.reload();
                            });
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
  
}
function confirmModus(req_data, flag, msg_content) {
    debugger
  
    var data = req_data;
    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "DO_Letter.aspx/Save_Modus",
        data: "{flag:'" + flag + "',data:'" + data + "',contnt:'" + msg_content + "'}",
        dataType: "json",
        async: false,
        success: function (Result) {
            Swal.fire({
                type: 'success',
                title: 'success',
                text: "successful",
                icon: "success",
                timer: 1500,
                showConfirmButton: false
            });
            //alerts("successful");
        },
        error: function (Result) {
            var alertmsg = "Something went wrong";
            alerts(alertmsg);
            return false;
        }
    });

}
function frmexit() {
    window.open("index.aspx", "_self");
}

function ddlfraudid() {
    $("#visb").show();
    var EmpCode = $("[id*=hdUserId]").val();
  $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "DO_Letter.aspx/getFillData",
      data: "{pageVal:'frauidDO', pageval1 :'" + EmpCode + "', pageval2 :''}",
        dataType: "json",
        success: function (Result) {
            Result = Result.d;
            $.each(Result, function (key, value) {
                
                $('#ddlfraudid').append($("<option></option>").val(value.id).html(value.name));
            });
        }
    });
}

function ddlfraudidchng(sel)
{
    var frddd = $('#ddlfraudid option:selected').text();
    var ffid = frddd.split('~');
    var idd = ffid[0];
    if (idd == "select") {
        $("#visb").hide();
    }else
    
    $("#visb").show();
    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "DO_VERIFICATION.aspx/GetDoData",
        data: "{pageVal:'fraudiddata', pageval1 :'" + idd + "', pageval2 :'" + idd + "'}",
        dataType: "json",
        success: function (Result) {
            Result = Result.d;
            var famnt = Result.split("~")[0].toString();
            var fbrname = Result.split("~")[1].toString();
            var fcat = Result.split("~")[2].toString();
            var brid = Result.split("~")[3].toString();
            $("#ddlbranch").empty();
            $('#amount_inv').val(famnt);
              $('#ddlbranch').append($("<option></option>").val("1").html(brid +"~"+fbrname));

        }
    });
}

function cleardata() {
    $("#hid1").hide();
    document.getElementById("hid1").value = "";
    document.getElementById("fraud_num").value = "";
    $("#hid2").hide();
    document.getElementById("hid2").value = "";
    document.getElementById("amount_inv").value = "";
    $("#hid3").hide();
    document.getElementById("hid3").value = "";
    document.getElementById("name_fraud").value = "";
    $("#hid4").hide();
    document.getElementById("hid4").value = "";
    document.getElementById("ddlModus").value = "";
    $("#hid5").hide();
    document.getElementById("hid5").value = "";
    document.getElementById("ddlbranch").value = "";
    $("#hid6").hide();
    document.getElementById("hid6").value = "";
    document.getElementById("ddlcategory").value = "";
    $("#hid7").hide();
    document.getElementById("hid7").value = "";
    document.getElementById("ddlofficials").value = "";
    $("#hid8").hide();
    document.getElementById("hid8").value = "";
    document.getElementById("ddllodged").value = "";
    document.getElementById("txtRemarks").value = "";
}

function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode != 46 && charCode > 31
        && (charCode < 48 || charCode > 57))
        return false;

    return true;
}

function Btnpen() {

    if (document.getElementById('ddlfraudid') == "-1") { alert("select fraud id"); }
    else {
        if (document.getElementById('amount_inv').value == '') {
            Swal.fire({
                type: 'warning',
                title: 'Oops...!',
                text: "Fill Amount involved",
                icon: "warning",
                button: "Ok!",
            });
            return;


            //alert('Fill Amount involved');
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
            //alert('Select Name of Fraud');
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
            //alert('Fill Modulus');
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
          //  alert('Fill Modulus ');
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
            var status = 4;
            var EmpCode = $("[id*=hdUserId]").val();
           // var fraudnum = $('#fraud_num').val();
              var fraudnum = "";
            var amnt_invo = $('#amount_inv').val();
            var nature_fraud = $('#name_fraud option:selected').text();
            var branch_id = $('#ddlbranch option:selected').text();
            var brid = branch_id.split('~');
            var branchname = brid[0];
            var party = $('#ddlcategory option:selected').text();
            var officials = $('#ddlofficials').val();
            var lodged = $('#ddllodged option:selected').text();
            var Modus = $("#ddlModus").val();
            var Remarks = $("#txtRemarks").val();
            var frid = $("#fraud_id").val();
            var datas = frid + '~' + amnt_invo + '~' + branchname + '~' + party + '~' + officials + '~' + lodged + '~' + Modus + '~' + Remarks + '~' + EmpCode + '~' + nature_fraud + '~' + status + '~' + fraudnum;

          Swal.fire({
                title: 'Information',
                text: "Are You want to Confirm?",
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
                        url: "DO_Letter.aspx/UodateReturnData",
                        data: "{typ:'VerifyReturnUpdate',val:'" + datas + "'}",
                        dataType: "json",
                        async: false,
                        success: function (Result) {

                            Result = Result.d;
                            confirmModus(Result, '3', Modus);
                            Swal.fire({
                                type: 'success',
                                title: 'success',
                                text: " Completed Successfully ",
                                icon: "success",
                                timer: 1500,
                                showConfirmButton: false
                            }).then(function () {
                                location.reload();
                            });
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

}

//minimum
function checklimit(args) {
    var myLength = $("#ddlModus").val().length;
    if (myLength < 300) {
        var x = document.getElementById("Modus");
        if (x.style.display === "none") {
            x.style.display = "block";
            return;
        }
    } else {
        var x = document.getElementById("Modus");
        x.style.display = "none";

    }
   
}


