function frmExit() {
    window.open("index.aspx", "_self");
}
$(window).on('load', function () {
    $("#Shwbnk").hide();
    $("#shwCountry").hide();
    clear();
    GetFiTypeDtl();
    getbankDtls();
    GetStateDtl();
    getCountryDtls();
});
function clear() {
    $("#txt_PinCode").val('');
    $("#txt_PinCode").prop("readonly", "true");
    $("#txt_Addrs").val('');
    $("#txt_brnchname").val('');
    $("#txt_bankname").val('');

    $("#txt_CntPrsn").val('');
    $("#EmailID").val('');
    $("#txt_phone").val('');
    $("#txt_Mobno").val('');
    $("#txtPan").val('');
    $("#txtGst").val('');
    $("#txt_CIN").val('');
}
////  -----------  EMAIL VALIDATION
function CheckEmailId(Semail, ControlID) {
    var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (filter.test(Semail)) {
        return true;
    }
    else {
        alert("Enter Valid Email ID");
        $("#" + ControlID).val("");
        return false;
    }
}
////   -----------PHONE NUMBER VALIDATION
function isNumber(evt, val1, isDec) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (isDec = 0 && charCode == 46) {
        return false;
    } else if (isDec = 1 && charCode == 46) {
        var dec = val1.split('.');
        if (dec.length > 1 && charCode == 46) {
            return false;
        }
        return true;
    }

    if (charCode == 37 || charCode == 39) {
        return true;
    }
    if ((charCode > 31 && charCode < 48) || charCode > 57) {
        return false;
    }
    return true;
}
//-------------PAN VALIDATION--------
function ChkPanVendor(pan) {
    if (pan != "") {
        var PanNo = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
        if (document.getElementById("txtPan").value.match(PanNo)) {

        }
        else {
            //alert("Invalid PAN...");
            ModelPopWarning("Invalid PAN...");
            document.getElementById("txtPan").value = "";
            //window.setTimeout(function () {
            //    document.getElementById("txtPan").focus();
            //}, 0);
            return false;

        }
    } else {
        //alert("Enter PAN Number...");
        ModelPopWarning("Enter PAN Number...");
        document.getElementById("txtPan").value = "";
        //window.setTimeout(function () {
        //    document.getElementById("txtPan").focus();
        //}, 0);
        return;
    }
}
//----GST VALIDATION ------
function checkGST(GST) {
    var pangst = GST.slice(2, 12);
    var panno = GST.slice(2);
    // var Pan = $("#txtPan").val();
    if (Pan != pangst) {
        //alert("Pan Number not Match with GST Number..!!");
        ModelPopWarning("Pan Number not Match with GST Number..!!");
        //$("#txtGst").focus();
        $("#txtGst").val("");
        return false;
    }
    else if (panno != "") {
        var regpan = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}([0-9a-zA-Z]){1}([a-zA-Z]){1}[0-9a-zA-Z]{1}?$/;
        if (regpan.test(panno) == true) {
            //return true;
        }
        else {
            //alert("GST NUMBER Not valid .. !");
            ModelPopWarning("GST Number is Not valid .. !");
            $("#txtGst").val("");
            return false;
        }
    }

    var StateGstCode = GST.slice(0, 2);
    if (GSTStateID != StateGstCode) {
        //alert("GST State ID Mismatch...!!!");
        ModelPopWarning("GST State ID Mismatch...!!!");
        $("#txtGst").val("");
        return false;
    }
    return true;
}

//-------------------
function showBank() {
    if ($("#ddlFIType").val() == "1") {
        $("#Shwbnk").fadeIn();
        $("#txt_bankname").val('');
        $("#txt_bankname").prop("readonly", "true");
        $("#shwCountry").fadeOut();
    }
    else if ($("#ddlFIType").val() == "4") {
        $("#shwCountry").fadeIn();
        $("#shwState").fadeOut();
        $("#Shwbnk").fadeOut();
        $("#txt_bankname").removeAttr('readonly');
        $("#txt_bankname").val('');
    }
    else {
        $("#shwCountry").fadeOut();
        $("#shwState").fadeIn();
        $("#Shwbnk").fadeOut();
        $("#txt_bankname").removeAttr('readonly');
        $("#txt_bankname").val('');
    }
}
//-----------------------
function getbankDtls() {
    var QueryString = "GetBank";
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "NewFI.aspx/getBank",
        data: "{QueryString : '" + QueryString + "'}",
        dataType: "json",
        success: function (Result) {
            $('#ddlBank').empty();
            $('#ddlBank').append($("<option></option>").val("-1").html("Select Bank"));
            $.each(Result.d, function (data, value) {
                $('#ddlBank').append($("<option></option>").val(value.BId).html(value.BName));
            })
        },
        error: function (Result) {
            alert(Result);
        }
    });
}
function getBnkName() {
    var InputString = $("#ddlBank").val();
    var QueryString = "GetBankName";
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "NewFI.aspx/getBankName",
        data: "{QueryStr : '" + QueryString + "', input: '" + InputString + "'}",
        dataType: "json",
        success: function (Result) {
            $("#txt_bankname").val(Result.d);
        },
        error: function (Result) {
            alert(Result);
        }
    });
}

function GetFiTypeDtl() {
    var QueryString = "GetFIType";
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "NewFI.aspx/getFinancialType",
        data: "{QueryString:'" + QueryString + "'}",
        dataType: "json",
        success: function (Result) {
            $('#ddlFIType').empty();
            $('#ddlFIType').append($("<option></option>").val("-1").html("Select Financial Institution Type"));
            $.each(Result.d, function (data, value) {
                $('#ddlFIType').append($("<option></option>").val(value.TID).html(value.TName));
            })
        },
        error: function (Result) {
            alert(Result);
        }
    });
}
function GetStateDtl() {
    var QueryString = "GetState";
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "NewFI.aspx/GetStateDetails",
        data: "{QueryString:'" + QueryString + "'}",
        dataType: "json",
        success: function (Result) {
            $('#ddl_state').empty();
            $('#ddl_state').append($("<option></option>").val("-1").html("Select State"));
            $.each(Result.d, function (data, value) {
                $('#ddl_state').append($("<option></option>").val(value.SId).html(value.SName));
            })
        },
        error: function (Result) {
            alert(Result);
        }
    });
}
function GetDistrDtl() {
    var InputString = $("#ddl_state").val();
    var QueryString = "GetDistricts";
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "NewFI.aspx/GetDistrDetails",
        data: "{QureyStr: '" + QueryString + "', input:'" + InputString + "'}",
        dataType: "json",
        success: function (Result) {
            $('#ddl_Distrct').empty();
            $('#ddl_Distrct').append($("<option></option>").val("-1").html("Select District"));
            $.each(Result.d, function (data, value) {
                $('#ddl_Distrct').append($("<option></option>").val(value.DId).html(value.DName));
            })
        },
        error: function (Result) {
            alert(Result);
        }
    });
}
function GetPostOfcDtl() {
    var InputString = $("#ddl_Distrct").val();
    var QueryString = "GetPostOffc";
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "NewFI.aspx/GetPostDetails",
        data: "{QureyStr: '" + QueryString + "', input:'" + InputString + "'}",
        dataType: "json",
        success: function (Result) {
            $('#ddl_postOffce').empty();
            $('#ddl_postOffce').append($("<option></option>").val("-1").html("Select Post Office"));
            $.each(Result.d, function (data, value) {
                $('#ddl_postOffce').append($("<option></option>").val(value.PId).html(value.PName));
            })
        },
        error: function (Result) {
            alert(Result);
        }
    });
}
function GetPinDtl() {
    var InputString = $("#ddl_postOffce").val();
    var QueryString = "GetPinCode";
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "NewFI.aspx/GetPincode",
        data: "{QureyStr: '" + QueryString + "', input:'" + InputString + "'}",
        dataType: "json",
        success: function (Result) {
            $("#txt_PinCode").val(Result.d);
        },
        error: function (Result) {
            alert(Result);
        }
    });
}
function getCountryDtls() {
    var QueryString = "GetCountry";
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "NewFI.aspx/GetCountry",
        data: "{QureyStr: '" + QueryString + "'}",
        dataType: "json",
        success: function (Result) {
            $('#ddl_country').empty();
            $('#ddl_country').append($("<option></option>").val("-1").html("Select Country"));
            $.each(Result.d, function (data, value) {
                $('#ddl_country').append($("<option></option>").val(value.Id).html(value.Name));
            })
        },
        error: function (Result) {
            alert(Result);
        }
    });
}

function AddFinancInst() {

    if ($("#ddlFIType").val() == "4") {
        if ($("#ddl_country").val() == "-1") {
            ModelPopWarning("Please Select Country");
            //alert("Please Select Country");
            return false;
        }
    }
    else if ($("#ddlFIType").val() != "4") {
        if ($("#ddl_state").val() == "-1") {
            ModelPopWarning("Please Select State");
            //alert("Please Select State");
            return false;
        }
        else if ($("#ddl_Distrct").val() == "-1") {
            ModelPopWarning("Please Select District");
            //alert("Please Select District");
            return false;
        }
        else if ($("#ddl_postOffce").val() == "-1") {
            ModelPopWarning("Please Select Post Office");
            //alert("Please Select Post Office");
            return false;
        }
    }
    if ($("#ddlFIType").val() == "-1") {
        ModelPopWarning("Please Select Financial Type");
        //alert("Please Select Financial Type");
        return false;
    }
    else if ($("#txt_bankname").val() == "") {
        ModelPopWarning("Please Select/Enter bank Name");
        //alert("Please Enter bank Name");
        return false;
    }
    else if ($("#txt_brnchname").val() == "") {
        ModelPopWarning("Please Enter Branch Name");
        //alert("Please Enter Branch Name");
        return false;
    }
    else if ($("#txt_Addrs").val() == "") {
        ModelPopWarning("Please Enter Bank Address");
        //alert("Please Enter Bank Address");
        return false;
    }

    else if ($("#txt_CntPrsn").val() == "") {
        ModelPopWarning("Please Enter Contact Person Name");
        //alert("Please Enter Contact Person Name");
        return false;
    }
    else if ($("#txt_Email").val() == "") {
        ModelPopWarning("Please Enter Email ID");
        //alert("Please Enter Email ID");
    }
    else if ($("#txt_phone").val() == "") {
        ModelPopWarning("Please Enter Phone Number");
        //alert("Please Enter Phone Number");
        return false;
    }
    else if ($("#txt_Mobno").val() == "") {
        ModelPopWarning("Please Enter Mobile Number");
        //alert("Please Enter Mobile Number");
        return false;
    }
    else if ($("#txt_pan").val() == "") {
        ModelPopWarning("Please Enter PAN");
        //alert("Please Enter PAN ");
        return false;
    }
    else if ($("#txt_gstn").val() == "") {
        ModelPopWarning("Please Enter GSTN");
        //alert("Please Enter GSTN");
        return false;
    }
    else if ($("#txt_CIN").val() == "") {
        ModelPopWarning("Please Enter CIN");
        //alert("Please Enter CIN");
        return false;
    }
    else {
        //var Address = $("#txt_Addrs").val() + "," + $("#txt_brnchname").val();
        //
        var Address = $("#txt_Addrs").val();
        var InputData = $("#ddlFIType").val() + "µ" + $("#txt_bankname").val() + "µ" + $("#ddlBank").val() + "µ" + Address + "µ" + $("#ddl_postOffce").val() + "µ" + $("#txt_CntPrsn").val() + "µ" + $("#txt_Email").val() + "µ" + $("#txt_phone").val() + "µ" + $("#txt_Mobno").val() + "µ" + $("#txt_pan").val() + "µ" + $("#txt_gstn").val() + "µ" + $("[id*=hdUserId]").val() + "µ" + $("#txt_CIN").val() + "µ" + $("#ddl_country").val() + "µ" + $("[id*=hdBrid]").val() + "µ" + $("[id*=hdFirmId]").val() + "µ" + $("#txt_brnchname").val();
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "NewFI.aspx/AddFinancialInst",
            data: "{input:'" + InputData + "'}",
            dataType: "json",
            success: function (Result) {
                alert(Result.d);
                window.open('NewFI.aspx', '_self');
                //$("#ddlFIType").val('-1');
                //$("#txt_bankname").val('');
                //$("#ddlBank").val('-1');
                //$("#txt_brnchname").val('');
                //$("#txt_Addrs").val('');
                //$("#ddl_state").val('-1');
                //$("#ddl_Distrct").val('-1');
                //$("#ddl_postOffce").val('-1');
                //$("#txt_PinCode").val('');
                //$("#txt_CntPrsn").val('');
                //$("#txt_Email").val('');
                //$("#txt_phone").val('');
                //$("#txt_Mobno").val('');
                //$("#txt_pan").val('');
                //$("#txt_gstn").val('');
                //$("#txt_CIN").val('');
                //$("#Shwbnk").hide();
                //$("#ddl_country").val('');
                //$("#txt_bankname").removeAttr('readonly');
            },

            error: function (Result) {
                alert(Result);
            }
        });
    }
    
}
function ModelPopSuccess(msg) {
    $("#successMsgContent").html(msg);
    $("#centralModalSuccess").modal("show");
}
function ModelPopWarning(msg) {
    $("#warnMsgContent").html(msg);
    $("#centralModalWarning").modal("show");
}