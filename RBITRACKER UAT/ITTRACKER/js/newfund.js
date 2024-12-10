function frmExit() {
    window.open("index.aspx", "_self");
}
$(window).on('load', function () {
    $("#SelctType").hide();
    $("#tableShowFI").hide();
    GetFundDtls();
    GetFIType();
    //getbnkledg();   
    //getLoanLedg();
    $("#txt_AgrmntDt").datepicker({
        dateFormat: 'dd/MM/yy',
        changeMonth: true,
        changeYear: true,
        stepMonths: true,
        todayHighlight: true,
        onSelect: function (dateText, inst) {

        }
    });

    $("#txt_DtAgrmntFrm").datepicker({
        dateFormat: 'dd/MM/yy',
        changeMonth: true,
        changeYear: true,
        stepMonths: true,
        todayHighlight: true,
        onSelect: function (dateText, inst) {

        }
    });

    $("#txt_DtAgrmntTo").datepicker({
        dateFormat: 'dd/MM/yy',
        changeMonth: true,
        changeYear: true,
        stepMonths: true,
        todayHighlight: true,
        onSelect: function (dateText, inst) {

        }
    });

});
function showTypes() {
    if ($("#radGYes").prop("checked")) {
        $("#SelctType").fadeIn();
        getGuarenteeType();
    }
    else if ($("#radGNo").prop("checked")) {
        $("#SelctType").fadeOut();
    }
}
function GetFundDtls() {
    var QueryString = "GetFundType";
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "NewFund.aspx/getFundType",
        data: "{QueryString:'" + QueryString + "'}",
        dataType: "json",
        success: function (Result) {
            $('#ddlCatgry').empty();
            $('#ddlCatgry').append($("<option></option>").val("-1").html("Select Fund Category "));
            $.each(Result.d, function (data, value) {
                $('#ddlCatgry').append($("<option></option>").val(value.Id).html(value.Name));
            })
        },
        error: function (Result) {
            alert(Result);
        }
    });
}
function GetSubFundDtls() {
    var InputString = $("#ddlCatgry").val();
    var QueryString = "GetSubFundType";
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "NewFund.aspx/getSubFund",
        data: "{QueryString:'" + QueryString + "',input : '" + InputString + "'}",
        dataType: "json",
        success: function (Result) {
            $('#ddlsSubCat').empty();
            $('#ddlsSubCat').append($("<option></option>").val("-1").html("Select Sub Fund Category "));
            $.each(Result.d, function (data, value) {
                $('#ddlsSubCat').append($("<option></option>").val(value.SbId).html(value.SbName));
            })
        },
        error: function (Result) {
            alert(Result);
        }
    });
}
function GetFIType() {
     var QueryString = "GetFIType";
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "NewFund.aspx/getFinancialType",
        data: "{QueryString:'" + QueryString + "'}",
        dataType: "json",
        success: function (Result) {
            $('#ddlFiTyp').empty();
            $('#ddlFiTyp').append($("<option></option>").val("-1").html("Select Financial Institution Type "));
            $.each(Result.d, function (data, value) {
                $('#ddlFiTyp').append($("<option></option>").val(value.FtId).html(value.FtName));
            })
        },
        error: function (Result) {
            alert(Result);
        }
    });
}
function GetFIDetails() {
    var InputString = $("#ddlFiTyp").val();
    var QueryString = "GetFI";
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "NewFund.aspx/getFIDtls",
        data: "{QueryString:'" + QueryString + "',input : '" + InputString + "'}",
        dataType: "json",
        success: function (Result) {
            $('#ddlFInst').empty();
            $('#ddlFInst').append($("<option></option>").val("-1").html("Select Financial Institution "));
            $.each(Result.d, function (data, value) {
                $('#ddlFInst').append($("<option></option>").val(value.FId).html(value.FName));
            })
        },
        error: function (Result) {
            alert(Result);
        }
    });
}
function getFITableDtls() {
    $("#tableShowFI").show();
    var InputString = $("#ddlFInst").val();
    var Querystring = "GetFITable";
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "NewFund.aspx/getTable",
        data: "{QueryStr : '" + Querystring + "',input :'" + InputString + "'}",
        dataType: "json",
        success: function (Result) {
            if (Result.d.length > 0) {
                $('#tableShowFI').empty();//t.fi_name,t.branch,t.addrss,t.contact_person,t.phone_no,t.mobile_no,t.email_id,t.pan,t.gstn,t.cin
                $("#tableShowFI").append('<thead class="bg-inverse text-white">< tr ><th scope="col">Name</th><th scope="col">Branch</th><th scope="col">Address</th> <th scope="col">ContactPerson</th> <th scope="col">TelephoneNumber</th><th scope="col">MobileNumber</th><th scope="col">EmailID</th><th scope="col">PANNo</th><th scope="col">GSTN</th><th scope="col">CIN</th></tr></thead><tbody class="border border-dark">'
                );
                for (var i = 0; i < Result.d.length; i++) {
                    $("#tableShowFI").append('<tr><td>' + Result.d[i].FIName + '</td>' +
                        '<td>' + Result.d[i].FIBranch + '</td>' +
                        '<td>' + Result.d[i].FAddr + '</td>' +
                        '<td>' + Result.d[i].Fcnct + '</td>' +
                        '<td>' + Result.d[i].Fphn + '</td>' +
                        '<td>' + Result.d[i].FMob + '</td>' +
                        '<td>' + Result.d[i].Fmail + '</td>' +
                        '<td>' + Result.d[i].FPan + '</td>' +
                        '<td>' + Result.d[i].FGstn + '</td>' +
                        '<td>' + Result.d[i].FCIN + '</td>' +
                        '</tr >');
                }
                $("#tableShowFI").append(
                    '</tbody>');
            }
        },
        error: function (Result) {
            alert(Result);
        }
    });
}
function getGuarenteeType() {
    var QueryString = "PersonalGuarantee";
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "NewFund.aspx/getPernlGurntee",
        data: "{QueryStr:'" + QueryString + "'}",
        dataType: "json",
        success: function (Result) {
            $('#ddlPrsnGrntee').empty();
            $('#ddlPrsnGrntee').append($("<option></option>").val("-1").html("Select Personal Guarantee Type "));
            $.each(Result.d, function (data, value) {
                $('#ddlPrsnGrntee').append($("<option></option>").val(value.Id).html(value.Name));
            })
        },
        error: function (Result) {
            alert(Result);
        }
    });
}
function AddLoanMst() {
    var Guarntee, gtype ;
    var Todate = Date.parse($("#txt_DtAgrmntTo").val());
    var FrmDate = Date.parse($("#txt_DtAgrmntFrm").val());
    var roi = $("#txt_ROI").val();
    var DateDiff = Todate - FrmDate;
    if (DateDiff < 0) {
        alert("Choose Agreement To Date greater than Agreement From Date");
        $("#txt_DtAgrmntFrm").val("");
        $("#txt_DtAgrmntTo").focus();
        return false;
    }

    if ($("#radGYes").prop("checked") == true) {
        Guarntee = 1;
         gtype = $("#ddlPrsnGrntee").val();
    }
    else if ($("#radGNo").prop("checked") == true) {
        Guarntee = 0;
        gtype = 0;
    } 
    if ($("#ddlCatgry").val() == "-1") {
        ModelPopWarning("Please select Fund Category");
        //alert("Please select Fund Category");
        return false;
    }
    else if ($("#ddlsSubCat").val() == "-1") {
        ModelPopWarning("Please Select Sub Category");
        //alert("Please Select Sub Category");
        return false;
    }
    else if ($("#ddlFiTyp").val() == "-1") {
        ModelPopWarning("Please Select Financial Type");
        //alert("Please Select Financial Type");
        return false;
    }
    else if ($("#ddlFInst").val() == "-1") {
        ModelPopWarning("Please Financial Institution");
        //alert("Please Financial Institution");
        return false;
        }
    else if ($("#ddlBnkLedger").val() == "-1") {
        ModelPopWarning("Please Select Bank Account Ledger");
            //alert("Please Select Bank Account Ledger");
            return false;
        }
    else if ($("#ddlLoanAccn").val() == "-1") {
        ModelPopWarning("Please select Loan Ledger");
           // alert("Please select Loan Ledger");
            return false;
    }
    else if ($("#txt_loan").val() == "") {
        ModelPopWarning("Please Enter Amount");
        //alert("Please Enter Amount");
        return false;
    }
    else if ($("#txt_AgrmntDt").val() == "") {
        ModelPopWarning("Please Enter Agreement Date Entered");
        //alert("Please Enter Agreement Date Entered ");
        return false;
    }
    else if ($("#txt_DtAgrmntFrm").val() == "") {
        ModelPopWarning("Please Enter Agreement from Date");
        //alert("Please Enter Agreement from Date");
        return false;
    }
    else if ($("#txt_DtAgrmntTo").val() == "") {
        ModelPopWarning("Please Enter Agreement To Date");
        //alert("Please Enter Agreement To Date ");
        return false;
        }
    else if ($("#txt_ROI").val() == "") {
        ModelPopWarning("Please Enter ROI");
           // alert("Please Enter ROI");
            return false;
        }
    else if ($("#radGYes").prop("checked") == false && $("#radGNo").prop("checked") == false) {
        ModelPopWarning("Choose Personal Guarantee");
           // alert("Choose Personal Guarantee ");
            return false;
    }
    //else if ($("[id*=hdSerLoan]").val().split("-", 1)=="")
    //{
    //    ModelPopWarning("Please select Loan Ledger");
    //    return false;
    //}
    else if ($("[id*=hdSerLoan]").val() == "") {
        ModelPopWarning("Please select Loan Ledger");
        return false;
    }
    else if ($("#txtLoan").val() == "") {
        ModelPopWarning("Please select Loan Ledger");
        return false;
    }
    else {
        var agrmtdtto;
        var agrmtdtfrm;
        var agrmtdt;
        var dd1;
        var mm1;
        var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        var Month1;
        var Month2;
        var Month3;

        var DtAgrmnt = Date.parse($("#txt_AgrmntDt").val());
        var DtAgrmntfrm = Date.parse($("#txt_DtAgrmntFrm").val());
        var DtAgrmntto = Date.parse($("#txt_DtAgrmntTo").val());
        var date1 = new Date(DtAgrmntto);
        var date2 = new Date(DtAgrmnt);
        var date3 = new Date(DtAgrmntfrm);

        Month1 = months[date1.getMonth()];
        mm1 = ((date1.getMonth() + 1).toString().length == 1) ? "0" + (date1.getMonth() + 1).toString() : (date1.getMonth() + 1).toString();
        dd1 = ((date1.getDate()).toString().length == 1) ? "0" + (date1.getDate()).toString() : (date1.getDate()).toString();
        agrmtdtto = dd1 + "/" + Month1 + "/" + date1.getFullYear();

        Month2 = months[date2.getMonth()];
        var mm2 = ((date2.getMonth() + 1).toString().length == 1) ? "0" + (date2.getMonth() + 1).toString() : (date2.getMonth() + 1).toString();
        var dd2 = ((date2.getDate()).toString().length == 1) ? "0" + (date2.getDate()).toString() : (date2.getDate()).toString();
        agrmtdt = dd2 + "/" + Month2 + "/" + date2.getFullYear();

        Month3 = months[date3.getMonth()];
        var mm3 = ((date3.getMonth() + 1).toString().length == 1) ? "0" + (date3.getMonth() + 1).toString() : (date3.getMonth() + 1).toString();
        var dd3 = ((date3.getDate()).toString().length == 1) ? "0" + (date3.getDate()).toString() : (date3.getDate()).toString();
        agrmtdtfrm = dd3 + "/" + Month3 + "/" + date3.getFullYear();

        var InputData = $("#ddlCatgry").val() + "µ" + $("#ddlsSubCat").val() + "µ" + $("#ddlFiTyp").val() + "µ" + $("#ddlFInst").val() + "µ" + agrmtdt + "µ" + agrmtdtfrm + "µ" + agrmtdtto + "µ" + $("#txt_loan").val() + "µ" + $("[id*=hdUserId]").val() + "µ" + Guarntee + "µ" + gtype + "µ" + $("[id*=hdSerLoan]").val().split("-", 1) + "µ" + $("[id*=hdBrid]").val() + "µ" + $("[id*=hdFirmId]").val() + "µ" + $("#txt_ROI").val();
            $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "NewFund.aspx/AddLoanMaster",
            data: "{input:'" + InputData + "'}",
            dataType: "json",
                success: function (Result) {                    
                   // $("#dangerMsgContent").html(Result.d.msg);
                    //jQuery("#centralModalDanger").modal('show');
                    //$("#centralModalDanger").modal("show");
                //ModelPopSuccess(Result.d.msg);
                alert(Result.d.msg);
                //$("#ddlCatgry").val('-1');
                //$("#ddlsSubCat").val('-1');
                //$("#ddlFiTyp").val('-1');
                //$("#ddlFInst").val('-1');
                //$("#txt_loan").val('');
                //$("#txt_tenor").val('');
                //$("#txt_DtROI").val('');
                //$("#txt_AgrmntDt").val('');
                //$("#txt_DtAgrmntFrm").val('');
                //$("#txt_DtAgrmntTo").val('');
                //$("#tableShowFI").empty();
                //$("#ddlLoanAccn").val('-1');
                //$("#ddlBnkLedger").val('-1');
                //$("#txt_ROI").val('');
                //$('#radGNo').prop('checked', false);
                //$('#radGYes').prop('checked', false);
                window.open('newfund.aspx', '_self');
            },
                error: function (Result) {
                   // $("#dangerMsgContent").html(Result);
                   // $("#centralModalDanger").modal("show");
                alert(Result);
            }
        });
   }
}
function AmountToWords(price) {
    var sglDigit = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"],
        dblDigit = ["Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"],
        tensPlace = ["", "Ten", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"],
        handle_tens = function (dgt, prevDgt) {
            return 0 == dgt ? "" : " " + (1 == dgt ? dblDigit[prevDgt] : tensPlace[dgt])
        },
        handle_utlc = function (dgt, nxtDgt, denom) {
            return (0 != dgt && 1 != nxtDgt ? " " + sglDigit[dgt] : "") + (0 != nxtDgt || dgt > 0 ? " " + denom : "")
        };

    var str = "",
        digitIdx = 0,
        digit = 0,
        nxtDigit = 0,
        words = [];
    if (price += "", isNaN(parseInt(price))) str = "";
    else if (parseInt(price) > 0 && price.length <= 10) {
        for (digitIdx = price.length - 1; digitIdx >= 0; digitIdx--) switch (digit = price[digitIdx] - 0, nxtDigit = digitIdx > 0 ? price[digitIdx - 1] - 0 : 0, price.length - digitIdx - 1) {
            case 0:
                words.push(handle_utlc(digit, nxtDigit, ""));
                break;
            case 1:
                words.push(handle_tens(digit, price[digitIdx + 1]));
                break;
            case 2:
                words.push(0 != digit ? " " + sglDigit[digit] + " Hundred" + (0 != price[digitIdx + 1] && 0 != price[digitIdx + 2] ? " and" : "") : "");
                break;
            case 3:
                words.push(handle_utlc(digit, nxtDigit, "Thousand"));
                break;
            case 4:
                words.push(handle_tens(digit, price[digitIdx + 1]));
                break;
            case 5:
                words.push(handle_utlc(digit, nxtDigit, "Lakh"));
                break;
            case 6:
                words.push(handle_tens(digit, price[digitIdx + 1]));
                break;
            case 7:
                words.push(handle_utlc(digit, nxtDigit, "Crore"));
                break;
            case 8:
                words.push(handle_tens(digit, price[digitIdx + 1]));
                break;
            case 9:
                words.push(0 != digit ? " " + sglDigit[digit] + " Hundred" + (0 != price[digitIdx + 1] || 0 != price[digitIdx + 2] ? " and" : " Crore") : "")
        }
        str = words.reverse().join("")
    } else str = "Equal or Above Thousand Crore";
    return str

}
function AccName() {
    var LoanAcc = "";
    LoanAcc = $("[id*=hdSerLoan]").val().split("-", 2);
    LoanAccName.innerHTML = $("[id*=hdSerLoan]").val().split("-", 2);
}
//function ModelPopSuccess(msg) {
//    $("#successMsgContent").html(msg);
//    //jQuery("#centralModalDanger").modal('show');
//    $("#centralModalSuccess").modal("show");
//}
function ModelPopWarning(msg) {
    $("#warnMsgContent").html(msg);
    $("#centralModalWarning").modal("show");
}
//function getbnkledg() {
//    var QueryString = "GetBankLedger";
//    $.ajax({
//        type: "POST",
//        contentType: "application/json; charset=utf-8",
//        url: "NewFund.aspx/getBankLedg",
//        data: "{QueryStr:'" + QueryString + "'}",
//        dataType: "json",
//        success: function (Result) {
//            $('#ddlBnkLedger').empty();
//            $('#ddlBnkLedger').append($("<option></option>").val("-1").html("Select Bank Account Ledger "));
//            $.each(Result.d, function (data, value) {
//                $('#ddlBnkLedger').append($("<option></option>").val(value.Id).html(value.Name));
//            })
//        },
//        error: function (Result) {
//            alert(Result);
//        }
//    });
//}
//function getLoanLedg() {
//    var QueryString = "GetLoanLedger";
//    $.ajax({
//        type: "POST",
//        contentType: "application/json; charset=utf-8",
//        url: "NewFund.aspx/getloanLedg",
//        data: "{QueryStr:'" + QueryString + "'}",
//        dataType: "json",
//        success: function (Result) {
//            $('#ddlLoanAccn').empty();
//            $('#ddlLoanAccn').append($("<option></option>").val("-1").html("Select Loan Ledger "));
//            $.each(Result.d, function (data, value) {
//                $('#ddlLoanAccn').append($("<option></option>").val(value.Id).html(value.Name));
//            })
//        },
//        error: function (Result) {
//            alert(Result);
//        }
//    });
//}