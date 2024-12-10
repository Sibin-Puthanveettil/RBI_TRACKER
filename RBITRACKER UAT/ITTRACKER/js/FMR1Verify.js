$(window).on('load', function () {

    loadfrdtype();
    loadBranch();
    loadPrinParty();
    ddlArOpr();
    ddlFrStatus();
    ddl_NatureFr();
    loadInsuranceClaim();   
    FRLoad();
    $("#ToDt").datepicker({
        dateFormat: 'dd/MM/yy',
        maxDate: new Date(),
        changeMonth: true,
        changeYear: true,
        stepMonths: true,
        todayHighlight: true,
        onSelect: function (dateText, inst) {
        }

    });

    $("#FrmDt").datepicker({
        dateFormat: 'dd/MM/yy',
        maxDate: new Date(),
        changeMonth: true,
        changeYear: true,
        stepMonths: true,
        todayHighlight: true,
        onSelect: function (dateText, inst) {
        }

    });
    $("#DtOcT").datepicker({
        dateFormat: 'dd/MM/yy',
        maxDate: new Date(),
        changeMonth: true,
        changeYear: true,
        stepMonths: true,
        todayHighlight: true,
        onSelect: function (dateText, inst) {
        }

    });
    $("#DtOcF").datepicker({
        dateFormat: 'dd/MM/yy',
        maxDate: new Date(),
        changeMonth: true,
        changeYear: true,
        stepMonths: true,
        todayHighlight: true,
        onSelect: function (dateText, inst) {
        }

    });
    $("#DtDetT").datepicker({
        dateFormat: 'dd/MM/yy',
        maxDate: new Date(),
        changeMonth: true,
        changeYear: true,
        stepMonths: true,
        todayHighlight: true,
        onSelect: function (dateText, inst) {
        }

    });
    $("#DtDetF").datepicker({
        dateFormat: 'dd/MM/yy',
        maxDate: new Date(),
        changeMonth: true,
        changeYear: true,
        stepMonths: true,
        todayHighlight: true,
        onSelect: function (dateText, inst) {
        }

    });

    $("#DtRBI").datepicker({
        dateFormat: 'dd/MM/yy',
        maxDate: new Date(),
        changeMonth: true,
        changeYear: true,
        stepMonths: true,
        todayHighlight: true,
        onSelect: function (dateText, inst) {
        }

    });


    $("#DtRef").datepicker({
        dateFormat: 'dd/MM/yy',
        maxDate: new Date(),
        changeMonth: true,
        changeYear: true,
        stepMonths: true,
        todayHighlight: true,
        onSelect: function (dateText, inst) {
        }

    });

    $("#Dt_Recr").datepicker({
        dateFormat: 'dd/MM/yy',
        maxDate: new Date(),
        changeMonth: true,
        changeYear: true,
        stepMonths: true,
        todayHighlight: true,
        onSelect: function (dateText, inst) {
        }

    });
    $("#Dtstaff").datepicker({
        dateFormat: 'dd/MM/yy',
        maxDate: new Date(),
        changeMonth: true,
        changeYear: true,
        stepMonths: true,
        todayHighlight: true,
        onSelect: function (dateText, inst) {
        }

    });



    $("#DtCom").datepicker({
        dateFormat: 'dd/MM/yy',
        maxDate: new Date(),
        changeMonth: true,
        changeYear: true,
        stepMonths: true,
        todayHighlight: true,
        onSelect: function (dateText, inst) {
        }

    });

    $("#DtIssFinal").datepicker({
        dateFormat: 'dd/MM/yy',
        maxDate: new Date(),
        changeMonth: true,
        changeYear: true,
        stepMonths: true,
        todayHighlight: true,
        onSelect: function (dateText, inst) {
        }

    });

    $("#DtIssue").datepicker({
        dateFormat: 'dd/MM/yy',
        maxDate: new Date(),
        changeMonth: true,
        changeYear: true,
        stepMonths: true,
        todayHighlight: true,
        onSelect: function (dateText, inst) {
        }

    });

    $("#DtComp").datepicker({
        dateFormat: 'dd/MM/yy',
        maxDate: new Date(),
        changeMonth: true,
        changeYear: true,
        stepMonths: true,
        todayHighlight: true,
        onSelect: function (dateText, inst) {
        }

    });
    $("#Dtcompl").datepicker({
        dateFormat: 'dd/MM/yy',
        maxDate: new Date(),
        changeMonth: true,
        changeYear: true,
        stepMonths: true,
        todayHighlight: true,
        onSelect: function (dateText, inst) {
        }

    });

    $("#DtSub").datepicker({
        dateFormat: 'dd/MM/yy',
        maxDate: new Date(),
        changeMonth: true,
        changeYear: true,
        stepMonths: true,
        todayHighlight: true,
        onSelect: function (dateText, inst) {
        }

    });

});

function isNumber(evt) {
    var iKeyCode = (evt.which) ? evt.which : evt.keyCode
    if (iKeyCode != 46 && iKeyCode > 31 && (iKeyCode < 48 || iKeyCode > 57))
        return false;

    return true;
}

function onlyAlphabets(e, t) {
    debugger;
    try {
        if (window.event) {
            var charCode = window.event.keyCode;
        }
        else if (e) {
            var charCode = e.which;
        }
        else { return true; }
        if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || charCode == 32 || charCode == 8)
            return true;
        else
            return false;
    }
    catch (err) {
        alert(err.Description);
    }
}


///////////////////////////////////////////FRAUD LOAD/////////////////////////////////////////////

function FRLoad() {

    var usr = $("[id*=hdUserId]").val();
    var acc = $("[id*=hdaccess]").val();
    var flag = "getfraudComp";
   
    var data = $("[id*=hdDept]").val() + '~' + usr;
    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "FMR1Verify.aspx/getFillData",
        data: "{pageVal:'" + flag + "', pageval1 :'" + data + "'}",
        dataType: "json",
        success: function (Result) {
            Result = Result.d;
            // $('#ddlCrf').append($("<option></option>").val("-1").html("Choose CRF"));
            $.each(Result, function (key, value) {
                $('#ddlFr').append($("<option></option>").val(value.id).html(value.name));
            });
        }
    });
}

function fillFRData() {
    debugger;
    var FraudType = $("#ddlFr option:selected").val();
    $("[id*=hdfraudno]").val(FraudType);
   
    var acc = $("[id*=hdaccess]").val();
    var seq = $("[id*=hdseq]").val();
    var dept = $("[id*=hdDept]").val();
    var a = "DetailsBrief";
    var b = "DetailsModus";
    var FrNo = $("[id*=hdfraudno]").val();

    $('#txt_f1').val(''); $('#txt_f2').val(''); $('#txt_gplace').val(''); $('#txt_district').val(''); $('#txt_state').val(''); $('#txt_BrVeh').val('');
    $('#txt_vehPlace').val(''); $('#txt_vehDist').val(''); $('#txt_vehState').val(''); $('#txt_prinacc').val(''); $('#txt_commit').val(''); $('#txt_getamt').val('');
    $('#txt_entamt').val(''); $('#txt_totamt').val(''); $('#tx_delay').val(''); $('#txt_comp').val(''); $('#DtRef').val(''); $('#txtprespo').val('');
    $('#Dtcompl').val(''); $('#DtSub').val(''); $('#txt_CompRej').val(''); $('#Dt_Recr').val(''); $('#txt_prepos').val(''); $('#Dtstaff').val('');
    $('#txt_stafreason').val(''); $('#txt_avoidinc').val(''); $('#txt_amtoff').val(''); $('#txt_considers').val(''); $('#comprmk').val('');
    $('#DtOcT').val(''); $('#DtOcF').val(''); $('#DtDetT').val(''); $('#DtDetF').val(''); $('#txt_Delayrs').val(''); $('#txt_inspaudit1').val('');
    $('#txt_inspaudit2').val(''); $('#txt_insrsn').val(''); $('#txt_riimtotamt').val(''); $('#txt_ins').val(''); $('#txt_othsrc').val(''); $('#txt_losstot').val('');

        $.ajax({

            type: "post",
            contentType: "application/json; charset=utf-8",
            url: "FMR1Verify.aspx/LoadFraudDetails",
            data: "{typ:'DetailsFraud', val1 :' " + FraudType + "'}",
            dataType: "json",
            success: function (Result) {


                var res1 = Result.d;
                var resdata1 = res1.split("~")[0].toString(); var resdata2 = res1.split("~")[1].toString(); var resdata3 = res1.split("~")[2].toString();
                var resdata4 = res1.split("~")[3].toString(); var resdata5 = res1.split("~")[4].toString(); var resdata6 = res1.split("~")[5].toString();
                var resdata7 = res1.split("~")[6].toString(); var resdata8 = res1.split("~")[7].toString(); var resdata9 = res1.split("~")[8].toString();
                var resdata10 = res1.split("~")[9].toString(); var resdata11 = res1.split("~")[10].toString(); var resdata12 = res1.split("~")[11].toString();
                var resdata13 = res1.split("~")[12].toString(); var resdata14 = res1.split("~")[13].toString(); var resdata15 = res1.split("~")[14].toString();
                var resdata16 = res1.split("~")[15].toString(); var resdata17 = res1.split("~")[16].toString(); var resdata18 = res1.split("~")[17].toString();
                var resdata19 = res1.split("~")[18].toString(); var resdata20 = res1.split("~")[19].toString(); var resdata21 = res1.split("~")[20].toString();
                var resdata22 = res1.split("~")[21].toString(); var resdata23 = res1.split("~")[22].toString(); var resdata24 = res1.split("~")[23].toString();
                var resdata25 = res1.split("~")[24].toString(); var resdata26 = res1.split("~")[25].toString(); var resdata27 = res1.split("~")[26].toString();
                var resdata28 = res1.split("~")[27].toString(); var resdata29 = res1.split("~")[28].toString(); var resdata30 = res1.split("~")[29].toString();
                var resdata31 = res1.split("~")[30].toString(); var resdata32 = res1.split("~")[31].toString(); var resdata33 = res1.split("~")[32].toString();
                var resdata34 = res1.split("~")[33].toString(); var resdata35 = res1.split("~")[34].toString(); var resdata36 = res1.split("~")[35].toString();
                var resdata37 = res1.split("~")[36].toString(); var resdata38 = res1.split("~")[37].toString(); var resdata39 = res1.split("~")[38].toString();
                var resdata40 = res1.split("~")[39].toString(); var resdata41 = res1.split("~")[40].toString(); var resdata42 = res1.split("~")[41].toString();
                var resdata43 = res1.split("~")[42].toString();
                if (resdata2 != "") {

                    var txt_1 = resdata2.substr(0, 4);
                    var txt_2 = resdata2.substr(4, 12);
                    $('#txt_f1').val(txt_1);
                    $('#txt_f2').val(txt_2);

                }
                if (resdata1 == '1') {


                    $("#ddlbrGold").empty();
                    $("#ddlBranch").empty();

                    document.getElementById("ddl_frd_typ").selectedIndex = resdata1;

                    ddlFraudType();
                    $('#ddlbrGold').append($("<option></option>").val("" + resdata3 + "").html(resdata4));
                    $('#ddlBranch').append($("<option></option>").val(resdata5).html(resdata6));
                    $('#txt_gplace').val(resdata7);
                    $('#txt_district').val(resdata8);
                    $('#txt_state').val(resdata9);
                }
                if (resdata1 != '1') {
                    document.getElementById("ddl_frd_typ").selectedIndex = resdata1;
                    ddlFraudType();
                    $('#ddl_brType').append($("<option></option>").val(resdata3).html(resdata4));
                    $('#txt_BrVeh').val(resdata6);
                    $('#txt_vehPlace').val(resdata7);
                    $('#txt_vehDist').val(resdata8);
                    $('#txt_vehState').val(resdata9);
                }

                //    document.getElementById("ddlPrinAcc").selectedIndex = resdata9;
                $("#ddlPrinAcc").val(resdata10);
                $('#txt_prinacc').val(resdata11);

                $("#ddlArOpr").val(resdata12);
                $("#ddl_fr").val(resdata13);
                $("#ddl_NatureFr").val(resdata14);

                $("#ddl_commit").val(resdata15);

                if (resdata15 == '22') {
                    commitChng();
                    $("#ddl_commit").val(resdata15);
                    $('#txt_commit').val(resdata16);
                }

                $('#txt_getamt').val(resdata17);
                $('#txt_entamt').val(resdata18);
                $('#txt_totamt').val(resdata19);

                $('#DtRBI').val(resdata20);
                $('#tx_delay').val(resdata21);

                $('#ddr_staff').val(resdata22);
                $('#ddr_cus').val(resdata23);
                $('#ddr_out').val(resdata24);
                $('#ddr_ctrl').val(resdata25);
                $('#ddr_info').val(resdata26);
                $('#ddr_comp').val(resdata27);
                if (resdata27 == "22") {
                    compChng();
                    $('#txt_comp').val(resdata28);
                    $('#DtRef').val(resdata29);
                    $('#txtprespo').val(resdata30);
                    $('#Dtcompl').val(resdata31);
                    $('#DtSub').val(resdata32);
                }
                else {
                    compChng();
                    $('#txt_CompRej').val(resdata33);
                }
                $('#Dt_Recr').val(resdata34);
                $('#txt_prepos').val(resdata35);
                $('#ddrstaffside').val(resdata36);

                if (resdata36 == "22") {
                    staffsideChng();
                    $('#Dtstaff').val(resdata37);
                }
                $('#ddrdepartpos').val(resdata38);
                if (resdata38 == "23") {
                    departposChng();
                    $('#txt_stafreason').val(resdata39);
                }
                else {
                    departposChng();
                    $("#tblObject").empty();
                    debugger
                    $.ajax({
                        type: "post",
                        contentType: "application/json; charset=utf-8",
                        url: "FMR1Verify.aspx/LoadFraudDTL",
                        data: "{typ:'" + 'DetailsDepartment' + "', val1 :'" + FrNo + "'}",
                        dataType: "json",
                        success: function (Result) {
                            Result = Result.d;
                            $("[id*=hddata]").val(Result);
                            var valData = Result.split('¶');

                            if ($("#tblObject tr").length == 0) {

                                $("#tblObject").empty();
                                $('#tblObject').append('<tr style="background-color:darkgrey;color:black"><th class="text-center">empcode</th><th class="text-center">empname</th><th class="text-center">Designation</th><th class="text-center">Whether suspended /Dt.of Suspension</th><th class="text-center">Date of issue</th><th class="text-center">Date of commencement</th><th class="text-center">Date of completion</th><th class="text-center">Date of issue of final orders</th><th class="text-center">Punishment awarded</th><th class="text-center">Details of prosecution</th><th class="text-center">DELETE</th></tr>');
                            }
                            //var sno = $('#tableData tr').length;

                            for (i = 0; i < valData.length - 1; i++) {
                                var valData1 = valData[i].split('^');

                                $('#tblObject').append('<tbody><tr>' +

                                    '<td class="text-center">' + valData1[0] + '</td>' +
                                    '<td class="text-center">' + valData1[1] + '</td>' +
                                    '<td class="text-center">' + valData1[2] + '</td>' +
                                    '<td class="text-center">' + valData1[3] + '</td>' +
                                    '<td class="text-center">' + valData1[4] + '</td>' +
                                    '<td class="text-center">' + valData1[5] + '</td>' +
                                    '<td class="text-center">' + valData1[6] + '</td>' +
                                    '<td class="text-center">' + valData1[7] + '</td>' +
                                    '<td class="text-center">' + valData1[8] + '</td>' +
                                    '<td class="text-center">' + valData1[9] + '</td>' +
                                    '<td><a href="javascript:void(0);" class="remove"  id="remrow"><span class="glyphicon glyphicon-trash">Remove</span></a></td></tr > </tbody > ');
                            }
                            return;

                        }
                    });
                }

                $('#txt_avoidinc').val(resdata40);
                $('#txt_amtoff').val(resdata41);
                $('#txt_considers').val(resdata42);

                $("[id*=hdseq]").val(resdata43);
                BriefHisload(a);
                BriefHisload(b);

            }


        });

    
        $.ajax({

            type: "post",
            contentType: "application/json; charset=utf-8",
            url: "FMR1Verify.aspx/LoadFraudDetails",
            data: "{typ:'DetailsAuditFraud', val1 :' " + FraudType + "'}",
            dataType: "json",
            success: function (Result) {
                var res1 = Result.d;
                var resdata1 = res1.split("~")[0].toString(); var resdata2 = res1.split("~")[1].toString(); var resdata3 = res1.split("~")[2].toString();
                var resdata4 = res1.split("~")[3].toString(); var resdata5 = res1.split("~")[4].toString(); var resdata6 = res1.split("~")[5].toString();
                var resdata7 = res1.split("~")[6].toString(); var resdata8 = res1.split("~")[7].toString();

                $("#DtOcT").val(resdata1);
                $("#DtOcF").val(resdata2);
                $("#DtDetT").val(resdata3);
                $("#DtDetF").val(resdata4);
                $("#txt_Delayrs").val(resdata5);
                $("#ddl_inpaudit").val(resdata6);

                if (resdata6 == '22') {
                    inpauditChng();
                    $("#txt_inspaudit1").val(resdata7);
                    $('#txt_inspaudit2').val(resdata8);
                }

            }
        });

        $.ajax({

            type: "post",
            contentType: "application/json; charset=utf-8",
            url: "FMR1Verify.aspx/LoadFraudDetails",
            data: "{typ:'DetailsRIIMFraud', val1 :' " + FraudType + "'}",
            dataType: "json",
            success: function (Result) {
                var res1 = Result.d;
                var resdata1 = res1.split("~")[0].toString(); var resdata2 = res1.split("~")[1].toString(); var resdata3 = res1.split("~")[2].toString();
                var resdata4 = res1.split("~")[3].toString(); var resdata5 = res1.split("~")[4].toString(); var resdata6 = res1.split("~")[5].toString();

                $("#ddl_InsClaim").val(resdata1);
                if (resdata1 == '32' || resdata1 == '33') {
                    InsClaimChng();
                    $("#txt_insrsn").val(resdata2);
                }
                $("#txt_riimtotamt").val(resdata3);
                $("#txt_ins").val(resdata4);
                $("#txt_othsrc").val(resdata5);
                $("#txt_losstot").val(resdata6);
            }
        });

    
    if (FraudType != -1) {
        var x = document.getElementById("main");
        //var y = document.getElementById("BranchVeh");
        //if (x.style.display === "none") {
        //    x.style.display = "block";
        //    // y.style.display = "none";
        //} else {
        //    x.style.display = "none";
        //    // y.style.display = "block";
        //}
        x.style.display = "block";
    }

    getCust();

}

/////////////////////////////////////////////////////////////////////////////////////////////////
function BriefHisload(args) {
    var seq = $("[id*=hdseq]").val();

    $.ajax({

        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "FMR1Verify.aspx/LoadFraudDetails",
        data: "{typ:'" + args + "', val1 :' " + seq + "'}",
        dataType: "json",
        success: function (Result) {
            var res1 = Result.d;
            var resdata1 = res1.split("~")[0].toString();
            if (args == 'DetailsBrief') {
                $('#txt_history').val(resdata1);
            }
            else {
                $('#txt_Modus').val(resdata1);
            }
        }
    });
}
function loadfrdtype() {

    var indata = 1;

    $.ajax({

        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "FMR1Verify.aspx/ddrFraudType",
        data: "{typ:'FraudType', val1 :' " + indata + "'}",
        dataType: "json",
        success: function (Result) {

            Result = Result.d;
            $('#ddl_frd_typ').append($("<option></option>").val("-1").html("SELECT FRAUD TYPE"));
            $.each(Result, function (key, value) {
                $('#ddl_frd_typ').append($("<option></option>").val(value.id).html(value.name));

            });

        }
    });

}
function loadInsuranceClaim() {

    var indata = 1;

    $.ajax({

        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "FMR1Verify.aspx/ddrInsuranceClaim",
        data: "{typ:'InsuranceClaim', val1 :' " + indata + "'}",
        dataType: "json",
        success: function (Result) {

            Result = Result.d;
            $('#ddl_InsClaim').append($("<option></option>").val("-1").html("SELECT OPTION"));
            $.each(Result, function (key, value) {
                $('#ddl_InsClaim').append($("<option></option>").val(value.id).html(value.name));

            });

        }
    });

}

function loadBranch() {

    var indata = 1;

    $.ajax({

        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "FMR1Verify.aspx/ddrBranch",
        data: "{typ:'Branch', val1 :' " + indata + "'}",
        dataType: "json",
        success: function (Result) {

            Result = Result.d;

            $.each(Result, function (key, value) {
                $('#ddlBranch').append($("<option></option>").val(value.id).html(value.name));

            });

            $.each(Result, function (key, value) {
                $('#ddlBranchPop').append($("<option></option>").val(value.id).html(value.name));

            });


        }
    });

}
function loadPrinParty() {

    var indata = 1;

    $.ajax({

        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "FMR1Verify.aspx/PrinParty",
        data: "{typ:'PrinParty', val1 :' " + indata + "'}",
        dataType: "json",
        success: function (Result) {

            Result = Result.d;
            $('#ddlPrinAcc').append($("<option></option>").val("-1").html("SELECT PRINCIPAL PARTY/ACCOUNT"));
            $.each(Result, function (key, value) {
                $('#ddlPrinAcc').append($("<option></option>").val(value.id).html(value.name));

            });

        }
    });

}

function ddlArOpr() {

    var indata = 1;

    $.ajax({

        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "FMR1Verify.aspx/AreaOpr",
        data: "{typ:'AreaOpr', val1 :' " + indata + "'}",
        dataType: "json",
        success: function (Result) {

            Result = Result.d;
            $('#ddlArOpr').append($("<option></option>").val("-1").html("SELECT AREA OF OPERATION"));
            $.each(Result, function (key, value) {
                $('#ddlArOpr').append($("<option></option>").val(value.id).html(value.name));

            });

        }
    });

}

function ddlFrStatus() {

    var indata = 1;

    $.ajax({

        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "FMR1Verify.aspx/FrStatus",
        data: "{typ:'FrStatus', val1 :' " + indata + "'}",
        dataType: "json",
        success: function (Result) {

            Result = Result.d;
            $('#ddl_fr').append($("<option></option>").val("-1").html("SELECT OPTION"));
            $.each(Result, function (key, value) {
                $('#ddl_fr').append($("<option></option>").val(value.id).html(value.name));

            });

        }
    });



    $.ajax({

        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "FMR1Verify.aspx/FrStatus",
        data: "{typ:'FrStatus', val1 :' " + indata + "'}",
        dataType: "json",
        success: function (Result) {

            Result = Result.d;
            $('#ddl_commit').append($("<option></option>").val("-1").html("SELECT OPTION"));
            $.each(Result, function (key, value) {

                $('#ddl_commit').append($("<option></option>").val(value.id).html(value.name));

            });

            $('#ddl_inpaudit').append($("<option></option>").val("-1").html("SELECT OPTION"));
            $.each(Result, function (key, value) {
                $('#ddl_inpaudit').append($("<option></option>").val(value.id).html(value.name));

            });

            $('#ddr_staff').append($("<option></option>").val("-1").html("SELECT OPTION"));
            $.each(Result, function (key, value) {
                $('#ddr_staff').append($("<option></option>").val(value.id).html(value.name));

            });

            $('#ddr_cus').append($("<option></option>").val("-1").html("SELECT OPTION"));
            $.each(Result, function (key, value) {
                $('#ddr_cus').append($("<option></option>").val(value.id).html(value.name));

            });

            $('#ddr_out').append($("<option></option>").val("-1").html("SELECT OPTION"));
            $.each(Result, function (key, value) {
                $('#ddr_out').append($("<option></option>").val(value.id).html(value.name));

            });

            $('#ddr_ctrl').append($("<option></option>").val("-1").html("SELECT OPTION"));
            $.each(Result, function (key, value) {
                $('#ddr_ctrl').append($("<option></option>").val(value.id).html(value.name));

            });

            $('#ddr_info').append($("<option></option>").val("-1").html("SELECT OPTION"));
            $.each(Result, function (key, value) {
                $('#ddr_info').append($("<option></option>").val(value.id).html(value.name));

            });

            $('#ddr_comp').append($("<option></option>").val("-1").html("SELECT OPTION"));
            $.each(Result, function (key, value) {
                $('#ddr_comp').append($("<option></option>").val(value.id).html(value.name));

            });

            $('#ddrstaffside').append($("<option></option>").val("-1").html("SELECT OPTION"));
            $.each(Result, function (key, value) {
                $('#ddrstaffside').append($("<option></option>").val(value.id).html(value.name));

            });

            $('#ddrdepartpos').append($("<option></option>").val("-1").html("SELECT OPTION"));
            $.each(Result, function (key, value) {
                $('#ddrdepartpos').append($("<option></option>").val(value.id).html(value.name));

            });
        }
    });

}

function ddl_NatureFr() {

    var indata = 1;

    $.ajax({

        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "FMR1Verify.aspx/FrNature",
        data: "{typ:'FrNature', val1 :' " + indata + "'}",
        dataType: "json",
        success: function (Result) {

            Result = Result.d;
            $('#ddl_NatureFr').append($("<option></option>").val("-1").html("SELECT NATURE OF FRAUD"));
            $.each(Result, function (key, value) {
                $('#ddl_NatureFr').append($("<option></option>").val(value.id).html(value.name));

            });

        }
    });

}
function frdnoload() {
    var FraudType = $("#ddlFr option:selected").val();
    //alert(FraudType);
    $.ajax({

        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "FMR1Verify.aspx/LoadFraudNumber",
        data: "{typ:'frnumload', val1 :' " + FraudType + "'}",
        dataType: "json",
        success: function (Result) {
            //alert(Result);
            var res1 = Result.d;
            var resdata1 = res1.split("~")[0].toString();
            var resdata2 = res1.split("~")[1].toString();

            //alert(resdata1);
            //alert(resdata2);
            $('#txt_f1').val(resdata1);
            $('#txt_f2').val(resdata2);
        }
    });

}
function empdata() {
    var usr = $("#emp_code").val();
    //alert(usr);
    $.ajax({

        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "FMR1Verify.aspx/LoadFraudDetails",
        data: "{typ:'emp_dtls', val1 :' " + usr + "'}",
        dataType: "json",
        success: function (Result) {
            //alert(Result);
            var res1 = Result.d;
            var resdata1 = res1.split("~")[0].toString();
            var resdata2 = res1.split("~")[1].toString();
            $('#emp_name').val(resdata1);
            $('#emp_des').val(resdata2);
        }
    });

}
function ddlFraudType() {

    var FraudType = $("#ddl_frd_typ option:selected").val();
    var x1 = document.getElementById("txt_getamt");
    var x2 = document.getElementById("gettot");
    var x3 = document.getElementById("lbl1");
    var x4 = document.getElementById("lbl2");
    if (FraudType == 1) {
        var x = document.getElementById("BranchGold");
        var y = document.getElementById("BranchVeh");

        x.style.display = "block";
        y.style.display = "none";
        x1.style.display = "block";
        x2.style.display = "block";
        x3.style.display = "none";
        x4.style.display = "none";
        $('#txt_getamt').val('');
        $('#txt_entamt').val('');
        $('#txt_totamt').val('');

    }
    else {
        var x = document.getElementById("BranchVeh");
        var y = document.getElementById("BranchGold");
        //if (x.style.display === "none") {

        x.style.display = "block";
        y.style.display = "none";
        x1.style.display = "none";
        x2.style.display = "none";
        x3.style.display = "block";
        x4.style.display = "block";
        $('#txt_getamt').val('');
        $('#txt_entamt').val('');
        $('#txt_totamt').val('');
    }

    var indata = 1;

    $("#ddlbrGold").empty();
    $("#ddl_brType").empty();


    $.ajax({

        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "FMR1Verify.aspx/ddrBrTyp",
        data: "{typ:'BrType', val1 :' " + indata + "'}",
        dataType: "json",
        success: function (Result) {

            Result = Result.d;


            if (FraudType == 1) {

                $('#ddlbrGold').append($("<option></option>").val("-1").html("SELECT FRAUD TYPE"));
                $.each(Result, function (key, value) {
                    $('#ddlbrGold').append($("<option></option>").val(value.id).html(value.name));

                });
            }
            else {

                $('#ddl_brType').append($("<option></option>").val("-1").html("SELECT FRAUD TYPE"));
                $.each(Result, function (key, value) {
                    $('#ddl_brType').append($("<option></option>").val(value.id).html(value.name));

                });
            }

        }
    });


}

function GetBranchDtl() {

    var indata = $("#ddlBranch option:selected").val();

    $.ajax({

        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "FMR1Verify.aspx/GetBranch",
        data: "{typ:'GetBrDtl', val1 :' " + indata + "'}",
        dataType: "json",
        success: function (Result) {


            var indta = Result.d;

            if (indta.toString().split('~').length > 0) {

                $("#txt_district").val(indta.toString().split('~')[0].toString());

                $("#txt_state").val(indta.toString().split('~')[1].toString());

                //   $("#phacc_rmks").val(indta.toString().split('~')[4].toString());


            }


        }
    });

}

function commitChng() {

    var indata = $("#ddl_commit option:selected").text();


    if (indata == "Yes") {
        var x = document.getElementById("commit");
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }
    }
    else {
        var x = document.getElementById("commit");
        x.style.display = "none";
    }


}

function compChng() {

    var indata = $("#ddr_comp option:selected").text();


    if (indata == "Yes") {
        var x = document.getElementById("comp");
        var y = document.getElementById("CompRej");
        if (x.style.display === "none") {
            x.style.display = "block";
            y.style.display = "none";
        } else {
            x.style.display = "none";
            y.style.display = "block";
        }
    }
    else if (indata == "No") {
        var x = document.getElementById("CompRej");
        var y = document.getElementById("comp");
        if (x.style.display === "none") {
            x.style.display = "block";
            y.style.display = "none";
        } else {
            x.style.display = "none";
            y.style.display = "block";
        }
    }
    else {
        var x = document.getElementById("CompRej");
        var y = document.getElementById("comp");
        x.style.display = "none";
        y.style.display = "none";
    }


}


function inpauditChng() {

    var indata = $("#ddl_inpaudit option:selected").text();


    if (indata == "Yes") {
        var x = document.getElementById("inspaudit1");
        var y = document.getElementById("inspaudit2");
        if (x.style.display === "none" || y.style.display === "none") {
            x.style.display = "block";
            y.style.display = "block";
        } else {
            x.style.display = "none";
            y.style.display = "none";
        }
    }
    else {
        var x = document.getElementById("inspaudit1");
        var y = document.getElementById("inspaudit2");
        x.style.display = "none";
        y.style.display = "none";
    }


}

function InsClaimChng() {
    var indata = $("#ddl_InsClaim option:selected").text();


    if (indata == "No" || indata == "In Progress") {
        var x = document.getElementById("InsClaim");
        if (x.style.display === "none" || y.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }
    }
    else {
        var x = document.getElementById("InsClaim");
        x.style.display = "none";
    }


}



function staffsideChng() {
    var indata = $("#ddrstaffside option:selected").text();
    if (indata == "Yes") {
        var x = document.getElementById("chng");
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }
    }
    else {
        var x = document.getElementById("chng");
        x.style.display = "none";
    }

}

function departposChng() {
    var indata = $("#ddrdepartpos option:selected").text();
    if (indata == "Yes") {
        var x = document.getElementById("Staffside1");
        var y = document.getElementById("Staffside2");
        if (x.style.display === "none") {
            x.style.display = "block";
            y.style.display = "none";
        } else {
            x.style.display = "none";
            y.style.display = "none";
        }
    }
    else if (indata == "No") {
        var x = document.getElementById("Staffside1");
        var y = document.getElementById("Staffside2");
        if (y.style.display === "none") {
            y.style.display = "block";
            x.style.display = "none";
        } else {
            x.style.display = "none";
            y.style.display = "none";
        }
    }
    else {
        var x = document.getElementById("Staffside1");
        var y = document.getElementById("Staffside2");
        x.style.display = "none";
        y.style.display = "none";
    }

}

$(document).on("change", ".txt_cal", function () {
    var y = $("[id*=txt_totamt]").val();
    var sum = 0;
    $(".txt_cal").each(function () {
        sum += +$(this).val();
    });
    sum = +y - +sum;
    $(".total").val(sum);
});

$(document).on("change", ".totcnt", function () {
    var y = $("[id*=txt_totamt]").val();
    var sum = 0;
    $(".txt_cal").each(function () {
        sum += +$(this).val();
    });
    sum = +y - +sum;
    $(".total").val(sum);
});

$(document).on("change", ".amt", function () {

    var sum = 0;
    $(".amt").each(function () {
        sum += +$(this).val();
    });

    $(".totcnt").val(sum);
});


//--------------------Brief History validation------------------

function checklimit(args) {

    if (args == 'history') {
        var myLength = $("#txt_history").val().length;
        if (myLength < 10) {

            var x = document.getElementById("his");
            if (x.style.display === "none") {
                x.style.display = "block";
                return;
            }
        }
        var x = document.getElementById("his");
        if (x.style.display === "block") {
            x.style.display = "none";
            return;
        }
    }

    else if (args == 'Modus') {
        var myLength = $("#txt_history").val().length;

        if (myLength < 10) {

            var x = document.getElementById("his");
            if (x.style.display === "none") {
                x.style.display = "block";
                return;
            }
        }
        var x = document.getElementById("his");
        if (x.style.display === "block") {
            x.style.display = "none";
            return;
        }
    }
}

function ADDObject() {
    if ($("#emp_code").val() == -1) {
        Swal.fire({
            type: 'warning',
            title: 'Oops...!',
            text: "Please enter employee code.!",
            icon: "warning",
            button: "Ok!",
        });
        //alert("Please enter employee code.!");
        $("#mdnames").focus();
        return false;
    }
    if ($("#emp_name").val() == "") {
        
            Swal.fire({
                type: 'warning',
                title: 'Oops...!',
                text: "Please enter employee name.!",
                icon: "warning",
                button: "Ok!",
            });
            //alert("Please enter employee name.!");
            $("#filetfs").focus();
            return false;
        }

        if ($("#emp_des").val() == "") {
           
                Swal.fire({
                    type: 'warning',
                    title: 'Oops...!',
                    text: "Please enter Designation.!",
                    icon: "warning",
                    button: "Ok!",
                });
                // alert("Please enter Designation.!");
                $("#uatlink").focus();
                return false;
            }
            if ($("#susp").val() == "") {
                Swal.fire({
                    type: 'warning',
                    title: 'Oops...!',
                    text: "Please enter suspended / Dt.of Suspension.!",
                    icon: "warning",
                    button: "Ok!",
                });
                //alert("Please enter suspended / Dt.of Suspension.!");
                $("#uatpath").focus();
                return false;
            }
            if ($("#DtIssue").val() == '') {
                Swal.fire({
                    type: 'warning',
                    title: 'Oops...!',
                    text: "Please enter Date of Issue.!",
                    icon: "warning",
                    button: "Ok!",
                });
                //alert("Please enter Date of Issue.!");
                $("#ddlproc").focus();
                return false;
            }
            if ($("#DtCom").val() == "") {
                Swal.fire({
                    type: 'warning',
                    title: 'Oops...!',
                    text: "Please enter Date of commencement.!",
                    icon: "warning",
                    button: "Ok!",
                });
                //alert("Please enter Date of commencement.!");
                $("#table").focus();
                return false;
            }
            if ($("#DtComp").val() == "") {
                Swal.fire({
                    type: 'warning',
                    title: 'Oops...!',
                    text: "Please enter Date of completion of Inquiry.!",
                    icon: "warning",
                    button: "Ok!",
                });
                //alert("Please enter Date of completion of Inquiry.!");
                $("#table").focus();
                return false;
            }
            if ($("#DtIssFinal").val() == "") {
                Swal.fire({
                    type: 'warning',
                    title: 'Oops...!',
                    text: "Please enter Date of issue of final orders.!",
                    icon: "warning",
                    button: "Ok!",
                });
                //alert("Please enter Date of issue of final orders.!");
                $("#table").focus();
                return false;
            }
            if ($("#Punish").val() == "") {
                Swal.fire({
                    type: 'warning',
                    title: 'Oops...!',
                    text: "Please Punishment awarded.!",
                    icon: "warning",
                    button: "Ok!",
                });
                //alert("Please Punishment awarded.!");
                $("#table").focus();
                return false;
            }
            if ($("#DtlPros").val() == "") {
                Swal.fire({
                    type: 'warning',
                    title: 'Oops...!',
                    text: "Please enter Details of prosecution.!",
                    icon: "warning",
                    button: "Ok!",
                });
                //alert("Please enter Details of prosecution.!");
                $("#table").focus();
                return false;
            }
            if ($("#table").val() == "") {
                Swal.fire({
                    type: 'warning',
                    title: 'Oops...!',
                    text: "Please enter Details.!",
                    icon: "warning",
                    button: "Ok!",
                });
                //alert("Please enter Details.!");
                $("#table").focus();
                return false;
            }
            data1 = $("[id*=hddata]").val();
            var empcode = $("#emp_code").val();
            var empname = $("#emp_name").val();
            var emp_desi = $("#emp_des").val();
            var suspenddt = $("#susp").val();
            var DtIssu = $("#DtIssue").val();
            var DtCom = $("#DtCom").val();
            var DtComp = $("#DtComp").val();
            var DtIssueFi = $("#DtIssFinal").val();
            var Punish = $("#Punish").val();
            var DtlPros = $("#DtlPros").val();

            var txtobjct = $("#table").val();
            var table = document.getElementById('tblObject');
            var rowLength = table.rows.length;
            for (var i = 1; i < rowLength; i++) {
                var empchk = table.rows[i].cells[0].innerHTML;
                if (empcode == empchk) {
                    
                        Swal.fire({
                            type: 'info',
                            title: '',
                            text: "Already Add !...",
                            icon: "info",
                            button: "Ok!",
                        });
                        // alert("Already Add !...");
                        return false;
                    }
                }
                var data = empcode + '^' + empname + '^' + emp_desi + '^' + suspenddt + '^' + DtIssu + '^' + DtCom + '^' + DtComp + '^' + DtIssueFi + '^' + Punish + '^' + DtlPros + "¶";
                data1 = data1 + data;
                // alert(data1);
                $("[id*=hddata]").val(data1);
                filltab(data);
        }
        

function ADDbrrdtl() {
    
    if ($("#brrsrno").val() == "") {
        Swal.fire({
            type: 'warning',
            title: 'Oops...!',
            text: "Please enter SR NO.!",
            icon: "warning",
            button: "Ok!",
        });
        //alert("Please enter employee code.!");
       
        return false;
    }
    if ($("#brrprty").val() == "") {

        Swal.fire({
            type: 'warning',
            title: 'Oops...!',
            text: "Please enter Type of party.!",
            icon: "warning",
            button: "Ok!",
        });
        //alert("Please enter employee name.!");
        
        return false;
    }

    if ($("#brrpracc").val() == "") {

        Swal.fire({
            type: 'warning',
            title: 'Oops...!',
            text: "Please enter Name of party/account",
            icon: "warning",
            button: "Ok!",
        });
        // alert("Please enter Designation.!");
       
        return false;
    }
    if ($("#brraddr").val() == "") {
        Swal.fire({
            type: 'warning',
            title: 'Oops...!',
            text: "Please enter Party Address!",
            icon: "warning",
            button: "Ok!",
        });
        //alert("Please enter suspended / Dt.of Suspension.!");
      
        return false;
    }
   
    data8 = $("[id*=hdbrrdata]").val();
    
    var brrsrno = $("#brrsrno").val();
    var brrtyp = $("#brrprty").val();
    var brraccnm = $("#brrpracc").val();
    var brraddr = $("#brraddr").val();
    

    var txtobjct = $("#table").val();
    var brrtable = document.getElementById('tblbrr');
    var rowLength = brrtable.rows.length;
 
    var data = brrsrno + '@' + brrtyp + '@' + brraccnm + '@' + brraddr + "&";
  
    data8 = data8 + data;
    // alert(data1);
    $("[id*=hdbrrdata]").val(data8);
   
    fillbrrtab(data);

}
function fillbrrtab(data) {
  
    var valData, valData1, gstno, n = 1;
    valData = data.split('&');
    
    //alert(valData);
    if ($("#tblbrr tr").length == 0) {
        $("#tblbrr").empty();
        $('#tblbrr').append('<tr style="background-color:darkgrey;color:black"><th class="text-center">SrNo</th><th class="text-center">Type of party</th><th class="text-center">Name of party</th><th class="text-center">Party Address</th><th class="text-center">DELETE</th></tr>');
    }
    //var sno = $('#tableData tr').length;
    for (i = 0; i < valData.length - 1; i++) {
        valData1 = valData[i].split('@');
       
        $('#tblbrr').append('<tbody><tr>' +

            '<td>' + valData1[0] + '</td>' +
            '<td>' + valData1[1] + '</td>' +
            '<td>' + valData1[2] + '</td>' +
            '<td>' + valData1[3] + '</td>' +
            '<td><a href="javascript:void(0);" class="remove"  id="remrow"><span class="glyphicon glyphicon-trash">Remove</span></a></td></tr > </tbody > ');
    }
    $('#brrsrno').val('');
    $('#brrprty').val('');
    $('#brrpracc').val('');
    $('#brraddr').val('');
   
    //$("#mdnames").val("-1");
    //$("#ddlproc").val("-1");
    //$("#table").val("");
    //$("#filetfs").val("");
    //$("#uatlink").val("");
    //$("#uatpath").val("");


}

function ADDbrraccdtl() {
   
    if ($("#prtysrno").val() == "") {
        Swal.fire({
            type: 'warning',
            title: 'Oops...!',
            text: "Please enter Party Sr.No!",
            icon: "warning",
            button: "Ok!",
        });
        //alert("Please enter employee code.!");

        return false;
    }
    if ($("#prtyname").val() == "") {

        Swal.fire({
            type: 'warning',
            title: 'Oops...!',
            text: "Please enter Name of party/Acount!",
            icon: "warning",
            button: "Ok!",
        });
        //alert("Please enter employee name.!");

        return false;
    }

    if ($("#prtybrsno").val() == "") {

        Swal.fire({
            type: 'warning',
            title: 'Oops...!',
            text: "Please enter Borrowal account Sr no",
            icon: "warning",
            button: "Ok!",
        });
        // alert("Please enter Designation.!");

        return false;
    }
    if ($("#prtyntracc").val() == "") {
        Swal.fire({
            type: 'warning',
            title: 'Oops...!',
            text: "Please enter Nature of Account!",
            icon: "warning",
            button: "Ok!",
        });
        //alert("Please enter suspended / Dt.of Suspension.!");

        return false;
    }

    if ($("#datesnton").val() == "") {

        Swal.fire({
            type: 'warning',
            title: 'Oops...!',
            text: "Please enter Date of Sanction",
            icon: "warning",
            button: "Ok!",
        });
        //alert("Please enter employee name.!");

        return false;
    }

    if ($("#sanlim").val() == "") {

        Swal.fire({
            type: 'warning',
            title: 'Oops...!',
            text: "Please enter Sanction Limit",
            icon: "warning",
            button: "Ok!",
        });
        // alert("Please enter Designation.!");

        return false;
    }
    if ($("#balouts").val() == "") {
        Swal.fire({
            type: 'warning',
            title: 'Oops...!',
            text: "Please enter Balance Outstanding",
            icon: "warning",
            button: "Ok!",
        });
        //alert("Please enter suspended / Dt.of Suspension.!");

        return false;
    }

    data9 = $("[id*=hdbrraccdata]").val();
    //alert(data9);
    var prtysrno = $("#prtysrno").val();
    var prtnm = $("#prtyname").val();
    var prtyaccsno = $("#prtybrsno").val();
    var partyntr = $("#prtyntracc").val();
    var prtydate = $("#datesnton").val();
    var partysanlim = $("#sanlim").val();
    var balouts = $("#balouts").val();

    var txtobjct = $("#table").val();
    var brrtable = document.getElementById('tblbrracc');
    var rowLength = brrtable.rows.length;

    var data = prtysrno + '!' + prtnm + '!' + prtyaccsno + '!' + partyntr + '!' + prtydate + '!' + partysanlim + '!' + balouts + "*";
    //alert(data);
    data9 = data9 + data;
    // alert(data1);
    $("[id*=hdbrraccdata]").val(data9);

    fillbrracctab(data);

}
function fillbrracctab(data) {
    //alert('fillbrracctab');
    var valData, valData1, gstno, n = 1;
    valData = data.split('*');
    //alert(valData);
    //alert(valData);
    if ($("#tblbrracc tr").length == 0) {
        $("#tblbrracc").empty();
        $('#tblbrracc').append('<tr style="background-color:darkgrey;color:black"><th class="text-center">Party Sr.No</th><th class="text-center">Name of party/Acount</th><th class="text-center">Borrowal account Sr no</th><th class="text-center">Nature of Account</th><th class="text-center">Date of Sanction</th><th class="text-center">Sanction Limit</th><th class="text-center">Balance Outstanding</th><th class="text-center">DELETE</th></tr>');
    }
    //var sno = $('#tableData tr').length;
    for (i = 0; i < valData.length - 1; i++) {
        valData1 = valData[i].split('!');
        //alert(valData1);
        $('#tblbrracc').append('<tbody><tr>' +

            '<td>' + valData1[0] + '</td>' +
            '<td>' + valData1[1] + '</td>' +
            '<td>' + valData1[2] + '</td>' +
            '<td>' + valData1[3] + '</td>' +
            '<td>' + valData1[4] + '</td>' +
            '<td>' + valData1[5] + '</td>' +
            '<td>' + valData1[6] + '</td>' +
            '<td><a href="javascript:void(0);" class="remove"  id="remrow"><span class="glyphicon glyphicon-trash">Remove</span></a></td></tr > </tbody > ');
    }
    $('#prtysrno').val('');
    $('#prtyname').val('');
    $('#prtybrsno').val('');
    $('#prtyntracc').val('');
    $('#datesnton').val('');
    $('#sanlim').val('');
    $('#balouts').val('');
    //$("#mdnames").val("-1");
    //$("#ddlproc").val("-1");
    //$("#table").val("");
    //$("#filetfs").val("");
    //$("#uatlink").val("");
    //$("#uatpath").val("");


}


            function filltab(data) {
                var valData, valData1, gstno, n = 1;
                valData = data.split('¶');
                //alert(valData);
                if ($("#tblObject tr").length == 0) {
                    $("#tblObject").empty();
                    $('#tblObject').append('<tr style="background-color:darkgrey;color:black"><th class="text-center">empcode</th><th class="text-center">empname</th><th class="text-center">Designation</th><th class="text-center">Whether suspended /Dt.of Suspension</th><th class="text-center">Date of issue</th><th class="text-center">Date of commencement</th><th class="text-center">Date of completion</th><th class="text-center">Date of issue of final orders</th><th class="text-center">Punishment awarded</th><th class="text-center">Details of prosecution</th><th class="text-center">DELETE</th></tr>');
                }
                //var sno = $('#tableData tr').length;
                for (i = 0; i < valData.length - 1; i++) {
                    valData1 = valData[i].split('^');

                    $('#tblObject').append('<tbody><tr>' +

                        '<td>' + valData1[0] + '</td>' +
                        '<td>' + valData1[1] + '</td>' +
                        '<td>' + valData1[2] + '</td>' +
                        '<td>' + valData1[3] + '</td>' +
                        '<td>' + valData1[4] + '</td>' +
                        '<td>' + valData1[5] + '</td>' +
                        '<td>' + valData1[6] + '</td>' +
                        '<td>' + valData1[7] + '</td>' +
                        '<td>' + valData1[8] + '</td>' +
                        '<td>' + valData1[9] + '</td>' +
                        '<td><a href="javascript:void(0);" class="remove"  id="remrow"><span class="glyphicon glyphicon-trash">Remove</span></a></td></tr > </tbody > ');
                }
                $('#emp_code').val('');
                $('#emp_name').val('');
                $('#emp_des').val('');
                $('#susp').val('');
                $('#DtIssue').val('');
                $('#DtCom').val('');
                $('#DtComp').val('');
                $('#DtIssFinal').val('');
                $('#Punish').val('');
                $('#DtlPros').val('');
                //$("#mdnames").val("-1");
                //$("#ddlproc").val("-1");
                //$("#table").val("");
                //$("#filetfs").val("");
                //$("#uatlink").val("");
                //$("#uatpath").val("");


            }
            $(document).on('click', '.remove', function () {

                $(this).closest('tr').remove();
                dirRemovefromHidden();
                return false;
            });
            function dirRemovefromHidden() {
                var data = "";

                var table = document.getElementById('tblObject');

                var rowLength = table.rows.length;

                for (var i = 1; i < rowLength; i += 1) {
                    var row = table.rows[i];

                    //your code goes here, looping over every row.
                    //cells are accessed as easy

                    var cellLength = row.cells.length;
                    for (var y = 0; y < cellLength - 1; y += 1) {
                        var cell = row.cells[y];
                        data = data + cell.innerText + '^';
                    }
                    data = data + '¶';
                }

                $("[id*=hddata]").val(data);


            }

function getDetails() {
    //alert("getDetails");
    var Branch = $("#ddlBranchPop option:selected").val();
    var frmdt = $('#FrmDt').val();
    var todt = $('#ToDt').val();
    var FraudID = $("#ddlFr option:selected").val();
    var data = Branch + '~' + frmdt + '~' + todt + '~' + FraudID;


    $("#tabChange").empty();

    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "FMR1.aspx/GetTableIrr",
        data: "{typ:'" + 'Irregularity' + "', val1 :'" + data + "'}",
        dataType: "json",
        success: function (Result) {
            Result = Result.d;
            //alert(Result);

            getCust();
            var valData = Result.split('@');


            if ($("#tabChange tr").length == 0) {

                $("#tabChange").empty();
                $('#tabChange').append('<tr><th style="width:200px;text-align:center;">Customer_ID</th><th style="width:200px;text-align:center;">Customer_Name</th><th style="width:200px;text-align:center;">Product_Type</th><th style="width:200px;text-align:center;">Pledge_No</th><th style="width:200px;text-align:center;">Tra_Dt</th><th style="width:200px;text-align:center;">pledge_val</th><th style="width:200px;text-align:center;">gross_weight</th><th style="width:200px;text-align:center;">net_weight</th><th style="width:200px;text-align:center;">Irregularity_type</th><th style="width:200px;text-align:center;">Auditor_Loss</th><th style="width:200px;text-align:center;">weightloss</th><th style="width:200px;text-align:center;">Amount</th><th style="width:200px;text-align:center;">int_Accured</th><th style="width:200px;text-align:center;">Select All<input type="checkbox" class="selectallapp"></th></tr>');
            }
            //var sno = $('#tableData tr').length;

            for (i = 0; i < valData.length - 1; i++) {
                var valData1 = valData[i].split('!');

                $('#tabChange').append('<tbody><tr>' +

                    '<td class="text-center">' + valData1[0] + '</td>' +
                    '<td class="text-center">' + valData1[1] + '</td>' +
                    '<td class="text-center">' + valData1[2] + '</td>' +
                    '<td class="text-center">' + valData1[3] + '</td>' +
                    '<td class="text-center">' + valData1[4] + '</td>' +
                    '<td class="text-center">' + valData1[5] + '</td>' +
                    '<td class="text-center">' + valData1[6] + '</td>' +
                    '<td class="text-center">' + valData1[7] + '</td>' +
                    '<td class="text-center">' + valData1[8] + '</td>' +
                    '<td class="text-center">' + valData1[9] + '</td>' +
                    '<td class="text-center">' + valData1[10] + '</td>' +
                    '<td class="text-center">' + valData1[11] + '</td>' +
                    '<td class="text-center">' + valData1[12] + '</td>' +

                    '<td class="text-center"><input type="checkbox"  name="rad' + (i + 1) + '" id="item' + (i + 1) + '" value=1> </td>' +

                    '</tr > </tbody > ');
            }

           
            return;

        }
    });
}

            //function getDetails() {

            //    var Branch = $("#ddlBranchPop option:selected").val();
            //    var frmdt = $('#FrmDt').val();
            //    var todt = $('#ToDt').val();
            //    var data = Branch + '~' + frmdt + '~' + todt;
            //    $("#tabChange").empty();

            //    $.ajax({
            //        type: "post",
            //        contentType: "application/json; charset=utf-8",
            //        url: "FMR1Verify.aspx/GetTableIrr",
            //        data: "{typ:'" + 'Irregularity' + "', val1 :'" + data + "'}",
            //        dataType: "json",
            //        success: function (Result) {
            //            Result = Result.d;
            //            var valData = Result.split('@');


            //            if ($("#tabChange tr").length == 0) {

            //                $("#tabChange").empty();
            //                $('#tabChange').append('<tr><th style="width:200px;text-align:center;">Customer_ID</th><th style="width:200px;text-align:center;">Customer_Name</th><th style="width:200px;text-align:center;">Pledge_No</th><th style="width:200px;text-align:center;">Tra_Dt</th><th style="width:200px;text-align:center;">Amount</th><th style="width:200px;text-align:center;">Select All<input type="checkbox" class="selectallapp"></th></tr>');
            //            }
            //            //var sno = $('#tableData tr').length;

            //            for (i = 0; i < valData.length - 1; i++) {
            //                var valData1 = valData[i].split('!');

            //                $('#tabChange').append('<tbody><tr>' +

            //                    '<td class="text-center">' + valData1[0] + '</td>' +
            //                    '<td class="text-center">' + valData1[1] + '</td>' +
            //                    '<td class="text-center">' + valData1[2] + '</td>' +
            //                    '<td class="text-center">' + valData1[3] + '</td>' +
            //                    '<td class="text-center">' + valData1[4] + '</td>' +
            //                    '<td class="text-center"><input type="checkbox"  name="rad' + (i + 1) + '" id="item' + (i + 1) + '" value=1> </td>' +

            //                    '</tr > </tbody > ');
            //            }
            //            return;

            //        }
            //    });
            //}



            function getCust() {

                //var Branch = $("#ddlBranchPop option:selected").val();
                //var frmdt = $('#FrmDt').val();
                //var todt = $('#ToDt').val();
                //var data = Branch + '~' + frmdt + '~' + todt;
                var FrNo = $("[id*=hdfraudno]").val();


                $("#TabCust").empty();

                $.ajax({
                    type: "post",
                    contentType: "application/json; charset=utf-8",
                    url: "FMR1Verify.aspx/GetBorrowCust",
                    data: "{typ:'" + 'BorrowCust' + "', val1 :'" + FrNo + "'}",
                    dataType: "json",
                    success: function (Result) {
                        Result = Result.d;
                        var valData = Result.split('@');


                        if ($("#TabCust tr").length == 0) {

                            $("#TabCust").empty();
                            $('#TabCust').append('<tr><th style="width:200px;text-align:center;">Sr.No.</th><th style="width:200px;text-align:center;">Type of party </th><th style="width:200px;text-align:center;">Name of party/account</th><th style="width:200px;text-align:center;">Party Address</th></tr>');
                        }
                        //var sno = $('#tableData tr').length;

                        for (i = 0; i < valData.length - 1; i++) {
                            var valData1 = valData[i].split('!');

                            $('#TabCust').append('<tbody><tr>' +

                                '<td class="text-center">' + (i + 1) + '</td>' +
                                '<td class="text-center">' + valData1[0] + '</td>' +
                                '<td class="text-center">' + valData1[1] + '</td>' +
                                '<td class="text-center">' + valData1[2] + '</td>' +
                                '</tr > </tbody > ');
                        }
                        return;

                    }
                });


                $("#TabCustPleg").empty();
                $.ajax({
                    type: "post",
                    contentType: "application/json; charset=utf-8",
                    url: "FMR1Verify.aspx/GetBorrowPleg",
                    data: "{typ:'" + 'BorrowPleg' + "', val1 :'" + FrNo + "'}",
                    dataType: "json",
                    success: function (Result) {
                        Result = Result.d;
                        var valData = Result.split('@');


                        if ($("#TabCustPleg tr").length == 0) {

                            $("#TabCustPleg").empty();
                            $('#TabCustPleg').append('<tr><th style="width:200px;text-align:center;">Party Sr.No.</th><th style="width:200px;text-align:center;">Name of party / account</th><th style="width:200px;text-align:center;">Borrowal Account Sr.No.</th><th style="width:200px;text-align:center;">Nature of Account</th><th style="width:200px;text-align:center;">Date of Sanction</th><th style="width:200px;text-align:center;">Sanctioned Limit</th><th style="width:200px;text-align:center;">Balance outstanding</th></tr>');
                        }
                        //var sno = $('#tableData tr').length;

                        for (i = 0; i < valData.length - 1; i++) {
                            var valData1 = valData[i].split('!');

                            $('#TabCustPleg').append('<tbody><tr>' +

                                '<td class="text-center">' + (i + 1) + '</td>' +
                                '<td class="text-center">' + valData1[0] + '</td>' +
                                '<td class="text-center">' + valData1[1] + '</td>' +
                                '<td class="text-center">' + valData1[2] + '</td>' +
                                '<td class="text-center">' + valData1[3] + '</td>' +
                                '<td class="text-center">' + valData1[4] + '</td>' +
                                '<td class="text-center">' + valData1[5] + '</td>' +
                                '</tr > </tbody > ');
                        }
                        return;

                    }
                });

            }



            $(document).on('click', '.selectallapp', function () {
                var l = $("#tabChange tr").length;
                if ($(".selectallapp").prop("checked") == true) {
                    $(".selectallapp1").prop('checked', false);
                    for (i = 1; i <= l; i++) {
                        $('#item' + i).prop('checked', true);

                    }
                }
                else {
                    for (i = 1; i <= l; i++) {
                        $('#item' + i).prop('checked', false);

                    }
                }



            });
function calculateamt() {
    let CalAmt = $('#CalAmt').val();
    var c = 0;
    var All = "";
    if (CalAmt == "") {
        CalAmt = 0;
    }
    else {
        CalAmt = CalAmt;
    }
    var table = document.getElementById('tabChange');
    var rowLength = table.rows.length;

    for (var i = 0; i < rowLength; i++) {
        if ($('#item' + i).prop('checked') == true) {

            CalAmt = +CalAmt + +table.rows[i].cells[11].innerHTML;
            c = c + 1;
            All = All + table.rows[i].cells[0].innerHTML + '~' + table.rows[i].cells[1].innerHTML + '~' + table.rows[i].cells[2].innerHTML + '~' + table.rows[i].cells[3].innerHTML + '~' + table.rows[i].cells[4].innerHTML + '~' + table.rows[i].cells[5].innerHTML + '~' + table.rows[i].cells[6].innerHTML + '~' + table.rows[i].cells[7].innerHTML + '~' + table.rows[i].cells[8].innerHTML + '~' + table.rows[i].cells[9].innerHTML + '~' + table.rows[i].cells[10].innerHTML + '~' + table.rows[i].cells[11].innerHTML + '~' + table.rows[i].cells[12].innerHTML + "@";

        }
    }

    if (c == 0) {
        Swal.fire({
            type: 'warning',
            title: 'Oops...!',
            text: "Please select any items..",
            icon: "warning",
            button: "Ok!",
        });
        // alert("Please select any items..")
        //  $("#BtnSubmit").prop('disabled', false);
    }
    else {
        var usrId = $("[id*=hdUserId]").val();
        var FraudID = $("#ddlFr option:selected").val();
        var data = All + '#' + usrId + '#' + FraudID;
        document.getElementById("CalAmt").value = CalAmt;
        document.getElementById("txt_getamt").value = CalAmt;
        document.getElementById("txt_totamt").value = CalAmt;
        document.getElementById("txt_entamt").value = "";

        $.ajax({
            type: "post",
            contentType: "application/json; charset=utf-8",
            url: "FMR1.aspx/SaveCusPleg",
            data: "{typ:'" + 'SaveCusPleg' + "', val1 :'" + data + "'}",
            dataType: "json",
            success: function (Result) {
                Result = Result.d;
                var valData = Result.split('@');
                if (valData = "done") {
                    getDetails();
                }
                else {
                    return;
                }

                //if ($("#tabChange tr").length == 0) {

                //    $("#tabChange").empty();
                //    $('#tabChange').append('<tr><th style="width:200px;text-align:center;">Customer_ID</th><th style="width:200px;text-align:center;">Customer_Name</th><th style="width:200px;text-align:center;">Product_Type</th><th style="width:200px;text-align:center;">Pledge_No</th><th style="width:200px;text-align:center;">Tra_Dt</th><th style="width:200px;text-align:center;">pledge_val</th><th style="width:200px;text-align:center;">gross_weight</th><th style="width:200px;text-align:center;">net_weight</th><th style="width:200px;text-align:center;">Irregularity_type</th><th style="width:200px;text-align:center;">Auditor_Loss</th><th style="width:200px;text-align:center;">weightloss</th><th style="width:200px;text-align:center;">Amount</th><th style="width:200px;text-align:center;">int_Accured</th><th style="width:200px;text-align:center;">Select All<input type="checkbox" class="selectallapp"></th></tr>');
                //}
                ////var sno = $('#tableData tr').length;

                //for (i = 0; i < valData.length - 1; i++) {
                //    var valData1 = valData[i].split('!');

                //    $('#tabChange').append('<tbody><tr>' +

                //        '<td class="text-center">' + valData1[0] + '</td>' +
                //        '<td class="text-center">' + valData1[1] + '</td>' +
                //        '<td class="text-center">' + valData1[2] + '</td>' +
                //        '<td class="text-center">' + valData1[3] + '</td>' +
                //        '<td class="text-center">' + valData1[4] + '</td>' +
                //        '<td class="text-center">' + valData1[5] + '</td>' +
                //        '<td class="text-center">' + valData1[6] + '</td>' +
                //        '<td class="text-center">' + valData1[7] + '</td>' +
                //        '<td class="text-center">' + valData1[8] + '</td>' +
                //        '<td class="text-center">' + valData1[9] + '</td>' +
                //        '<td class="text-center">' + valData1[10] + '</td>' +
                //        '<td class="text-center">' + valData1[11] + '</td>' +
                //        '<td class="text-center">' + valData1[12] + '</td>' +
                //        '<td class="text-center"><input type="checkbox"  name="rad' + (i + 1) + '" id="item' + (i + 1) + '" value=1> </td>' +

                //        '</tr > </tbody > ');
                //}
                return;

            }
        });

        getDetails();
    }
}




            ////function calculateamt() {
            ////    let CalAmt = $('#CalAmt').val();
            ////    var c = 0;
            ////    var All = "";
            ////    if (CalAmt == "") {
            ////        CalAmt = 0;
            ////    }
            ////    else {
            ////        CalAmt = CalAmt;
            ////    }
            ////    var table = document.getElementById('tabChange');
            ////    var rowLength = table.rows.length;

            ////    for (var i = 0; i < rowLength; i++) {
            ////        if ($('#item' + i).prop('checked') == true) {

            ////            CalAmt = +CalAmt + +table.rows[i].cells[4].innerHTML;
            ////            c = c + 1;
            ////            All = All + table.rows[i].cells[0].innerHTML + '~' + table.rows[i].cells[1].innerHTML + '~' + table.rows[i].cells[2].innerHTML + '~' + table.rows[i].cells[3].innerHTML + '~' + table.rows[i].cells[4].innerHTML + "@";

            ////        }
            ////    }

            ////    if (c == 0) {

            ////        Swal.fire({
            ////            type: 'warning',
            ////            title: 'Oops...!',
            ////            text: "Please select any items..",
            ////            icon: "warning",
            ////            button: "Ok!",
            ////        });
            ////        //alert("Please select any items..")
            ////        //  $("#BtnSubmit").prop('disabled', false);
            ////    }
            ////    else {
            ////        var usrId = $("[id*=hdUserId]").val();
            ////        var FraudID = $("#ddlFr option:selected").val();
            ////        var data = All + '#' + usrId + '#' + FraudID;
            ////        document.getElementById("CalAmt").value = CalAmt;
            ////        document.getElementById("txt_getamt").value = CalAmt;
            ////        document.getElementById("txt_totamt").value = CalAmt;
            ////        document.getElementById("txt_entamt").value = "";

            ////        $.ajax({
            ////            type: "post",
            ////            contentType: "application/json; charset=utf-8",
            ////            url: "FMR1Verify.aspx/SaveCusPleg",
            ////            data: "{typ:'" + 'SaveCusPleg' + "', val1 :'" + data + "'}",
            ////            dataType: "json",
            ////            success: function (Result) {
            ////                Result = Result.d;
            ////                var valData = Result.split('@');


            ////                if ($("#tabChange tr").length == 0) {

            ////                    $("#tabChange").empty();
            ////                    $('#tabChange').append('<tr><th style="width:200px;text-align:center;">Customer_ID</th><th style="width:200px;text-align:center;">Customer_Name</th><th style="width:200px;text-align:center;">Pledge_No</th><th style="width:200px;text-align:center;">Tra_Dt</th><th style="width:200px;text-align:center;">Amount</th><th style="width:200px;text-align:center;">Select All<input type="checkbox" class="selectallapp"></th></tr>');
            ////                }
            ////                //var sno = $('#tableData tr').length;

            ////                for (i = 0; i < valData.length - 1; i++) {
            ////                    var valData1 = valData[i].split('!');

            ////                    $('#tabChange').append('<tbody><tr>' +

            ////                        '<td class="text-center">' + valData1[0] + '</td>' +
            ////                        '<td class="text-center">' + valData1[1] + '</td>' +
            ////                        '<td class="text-center">' + valData1[2] + '</td>' +
            ////                        '<td class="text-center">' + valData1[3] + '</td>' +
            ////                        '<td class="text-center">' + valData1[4] + '</td>' +
            ////                        '<td class="text-center"><input type="checkbox"  name="rad' + (i + 1) + '" id="item' + (i + 1) + '" value=1> </td>' +

            ////                        '</tr > </tbody > ');
            ////                }
            ////                return;

            ////            }
            ////        });
            ////    }
            ////}

            function totamtonchange() {
                document.getElementById("txt_totamt").value = CalAmt;
            }

            function FRConfirm() {
                debugger

                var acc = $("[id*=hdaccess]").val();
                var dept = $("[id*=hdDept]").val();
                var user = $("[id*=hdUserId]").val();
                var FraudID = $("#ddlFr option:selected").val();
                //if (acc == '0') {

                var FraudType = $("#ddl_frd_typ option:selected").val();
                var FraudTypetxt = $("#ddl_frd_typ option:selected").text();
                var FraudNo = $("#txt_f1").val() + $("#txt_f2").val();
                var NBFCName = $("#txt_HName").val();

                var GoldFrType = $("#ddlbrGold option:selected").val();
                var GoldFrTypeTxt = $("#ddlbrGold option:selected").text();
                var GoldBrId = $("#ddlBranch option:selected").val();
                var GoldBr = $("#ddlBranch option:selected").text();
                var GoldPlace = $("#txt_gplace").val();
                var GoldDis = $("#txt_district").val();
                var GoldState = $("#txt_state").val();

                var VehFrType = $("#ddl_brType option:selected").val();
                var VehBr = $("#txt_BrVeh").val();
                var VehPlace = $("#txt_vehPlace").val();
                var VehDis = $("#txt_vehDist").val();
                var VehState = $("#txt_vehState").val();

                var PrinAcc = $("#ddlPrinAcc option:selected").val();
                var PrinAccTxt = $("#ddlPrinAcc option:selected").val();
                var PrinAcctxt = $("#txt_prinacc").val();
                var ArOp = $("#ddlArOpr option:selected").val();
                var FrOcc = $("#ddl_fr option:selected").val();
                var NatFr = $("#ddl_NatureFr option:selected").val();

                var commitdl = $("#ddl_commit option:selected").val();
                var commitdltxt = $("#ddl_commit option:selected").text();
                var commitTxt = $("#txt_commit").val();

                var calAmt = $("#txt_getamt").val();
                var EntAmt = $("#txt_entamt").val();
                var TotAmt = $("#txt_totamt").val();

                var RBIDt = $("#DtRBI").val();

                var txtdelay = $("#tx_delay").val();
                var txthist = $("#txt_history").val();
                var txtmodux = $("#txt_Modus").val();

                var staff = $("#ddr_staff option:selected").val();
                var customer = $("#ddr_cus option:selected").val();
                var outsider = $("#ddr_out option:selected").val();
                var ctrlOff = $("#ddr_ctrl option:selected").val();
                var ImpInfoSys = $("#ddr_info option:selected").val();

                var complaint = $("#ddr_comp option:selected").val();
                var compName = $("#txt_comp").val();
                var compref = $("#DtRef").val();
                var compPrePos = $("#txtprespo").val();
                var compDt = $("#Dtcompl").val();
                var compDtSub = $("#DtSub").val();
                var compRej = $("#txt_CompRej").val();

                var Recovery = $("#Dt_Recr").val();
                var RecoveryTxt = $("#txt_prepos").val();

                var staffside1 = $("#ddrstaffside option:selected").val();
                var staffside1txt = $("#ddrstaffside option:selected").text();
                var staffside2 = $("#Dtstaff").val();

                var departpos = $("#ddrdepartpos option:selected").val();
                var departpostxt = $("#ddrdepartpos option:selected").text();
                var stafreason = $("#txt_stafreason").val();

                var provision = $("#txt_provision").val();
                var avoidinc = $("#txt_avoidinc").val();
                var amtoff = $("#txt_amtoff").val();
                var consider = $("#txt_considers").val();
                var comprmks = $("#comprmk").val();

                if (FraudType == '-1') {
                    Swal.fire({
                        type: 'warning',
                        title: 'Oops...!',
                        text: "Select Fraud Type",
                        icon: "warning",
                        button: "Ok!",
                    });
                    //alert("Select Fraud Type");
                    return;
                }
                else if (FraudType == '1') {
                    if (GoldBrId == "-1" || GoldFrType == "-1" || GoldPlace == "" || GoldDis == "" || GoldState == "") {
                        Swal.fire({
                            type: 'warning',
                            title: 'Oops...!',
                            text: "Complete Branch Details in FMR1-A",
                            icon: "warning",
                            button: "Ok!",
                        });
                        //alert("Complete Branch Details in FMR1-A"); 
                        return;
                    }
                }
                else if (FraudType == '2') {
                    if (VehBr == " " || VehFrType == "-1" || VehPlace == "" || VehDis == "" || VehState == "") {
                        Swal.fire({
                            type: 'warning',
                            title: 'Oops...!',
                            text: "Complete Branch Details in FMR1-A",
                            icon: "warning",
                            button: "Ok!",
                        });
                        //alert("Complete Branch Details in FMR1-A"); 
                        return;
                    }
                }
                if (PrinAcc == "-1" || PrinAcctxt == "") {
                    Swal.fire({
                        type: 'warning',
                        title: 'Oops...!',
                        text: "Select Name of the Principal party / account",
                        icon: "warning",
                        button: "Ok!",
                    });
                    //alert("Select Name of the Principal party / account"); 
                    return;
                }

                else if (ArOp == "-1") {
                    Swal.fire({
                        type: 'warning',
                        title: 'Oops...!',
                        text: "Select Area of operation",
                        icon: "warning",
                        button: "Ok!",
                    });
                    //alert("Select Area of operation");
                    return;
                }
                else if (FrOcc == "-1") {
                    Swal.fire({
                        type: 'warning',
                        title: 'Oops...!',
                        text: "Select Whether fraud has occurred in a borrowal account",
                        icon: "warning",
                        button: "Ok!",
                    });
                    //alert("Select Whether fraud has occurred in a borrowal account");
                    return;
                }
                else if (NatFr == "-1") {
                    Swal.fire({
                        type: 'warning',
                        title: 'Oops...!',
                        text: "Select Nature of fraud",
                        icon: "warning",
                        button: "Ok!",
                    });
                    //alert("Select Nature of fraud");
                    return;
                }
                else if (commitdl == "-1" || (commitdltxt == "Yes" && (commitTxt == ""))) {
                    Swal.fire({
                        type: 'warning',
                        title: 'Oops...!',
                        text: "Select Whether computer is used in committing the fraud?",
                        icon: "warning",
                        button: "Ok!",
                    });
                    //alert("Select Whether computer is used in committing the fraud?");
                    return;
                }
                else if (EntAmt == "") {
                    Swal.fire({
                        type: 'warning',
                        title: 'Oops...!',
                        text: "Fill values in Total Amount",
                        icon: "warning",
                        button: "Ok!",
                    });
                    // alert("Fill values in Total Amount");
                    return;
                }
                else if (RBIDt == "") {
                    Swal.fire({
                        type: 'warning',
                        title: 'Oops...!',
                        text: "Select RBI reported date in FMR1-B",
                        icon: "warning",
                        button: "Ok!",
                    });
                    //alert("Select RBI reported date in FMR1-B");
                    return;
                }
                else if (txtdelay == "") {
                    Swal.fire({
                        type: 'warning',
                        title: 'Oops...!',
                        text: "Select Reasons for delay in FMR1-B",
                        icon: "warning",
                        button: "Ok!",
                    });
                    //alert("Select Reasons for delay in FMR1-B");
                    return;
                }
                else if (txthist == "") {
                    Swal.fire({
                        type: 'warning',
                        title: 'Oops...!',
                        text: "Select Brief history in FMR1-B",
                        icon: "warning",
                        button: "Ok!",
                    });
                    // alert("Select Brief history in FMR1-B");
                    return;
                }
                else if (txtmodux == "") {
                    Swal.fire({
                        type: 'warning',
                        title: 'Oops...!',
                        text: "Select Modus operandi in FMR1-B",
                        icon: "warning",
                        button: "Ok!",
                    });
                    //alert("Select Modus operandi in FMR1-B");
                    return;
                }
                else if (staff == "-1" || customer == "-1" || outsider == "-1" || ctrlOff == "-1" || ImpInfoSys == "-1") {
                    Swal.fire({
                        type: 'warning',
                        title: 'Oops...!',
                        text: "Select all sections in Fraud committed in FMR1-B",
                        icon: "warning",
                        button: "Ok!",
                    });
                    //alert("Select all sections in Fraud committed in FMR1-B");
                    return;
                }

                if ((complaint == "-1") || (complaint == "Yes" && compName == "" && compref == "" && compPrePos == "" && compDt == "" && compDtSub == "") || (complaint == "No" && compRej == "")) {
                    Swal.fire({
                        type: 'warning',
                        title: 'Oops...!',
                        text: "Select Complaint with Police in FMR1-B",
                        icon: "warning",
                        button: "Ok!",
                    });
                    // alert("Select Complaint with Police in FMR1-B");
                    return;
                }
                else if (Recovery == "" || RecoveryTxt == "") {
                    Swal.fire({
                        type: 'warning',
                        title: 'Oops...!',
                        text: "Select Recovery suit with Court/Others in FMR1-B",
                        icon: "warning",
                        button: "Ok!",
                    });
                    //  alert("Select Recovery suit with Court/Others in FMR1-B");
                    return;
                }
                else if ((staffside1 == "-1") || (staffside1txt == "Yes" && staffside2 == "")) {
                    Swal.fire({
                        type: 'warning',
                        title: 'Oops...!',
                        text: "Select Whether any internal investigation has been/is proposed to be conducted in FMR1-B",
                        icon: "warning",
                        button: "Ok!",
                    });
                    // alert("Select Whether any internal investigation has been/is proposed to be conducted in FMR1-B");
                    return;
                }
                else if ((departpos == "-1") || (departpostxt == "No" && stafreason == "")) {
                    Swal.fire({
                        type: 'warning',
                        title: 'Oops...!',
                        text: "Select Whether any departmental enquiry has been/is proposed to be conducted in FMR1-B",
                        icon: "warning",
                        button: "Ok!",
                    });
                    // alert("Select Whether any departmental enquiry has been/is proposed to be conducted in FMR1-B");
                    return;
                }
                else if (avoidinc == "") {
                    Swal.fire({
                        type: 'warning',
                        title: 'Oops...!',
                        text: "Select Steps taken to avoid such incidents in FMR1-B",
                        icon: "warning",
                        button: "Ok!",
                    });
                    // alert("Select Steps taken to avoid such incidents in FMR1-B");
                    return;
                }
                else if (amtoff == "") {
                    Swal.fire({
                        type: 'warning',
                        title: 'Oops...!',
                        text: "Select Amount written off in FMR1-B",
                        icon: "warning",
                        button: "Ok!",
                    });
                    // alert("Select Amount written off in FMR1-B");
                    return;
                }
                else if (consider == "") {
                    Swal.fire({
                        type: 'warning',
                        title: 'Oops...!',
                        text: "Select Suggestions for consideration of RBI in FMR1-B",
                        icon: "warning",
                        button: "Ok!",
                    });
                    //alert("SelectSuggestions for consideration of RBI in FMR1-B");
                    return;
                }
                else if (FraudNo == "") {
                    Swal.fire({
                        type: 'warning',
                        title: 'Oops...!',
                        text: "Select Fraud number",
                        icon: "warning",
                        button: "Ok!",
                    });
                    //alert("Select Fraud number");
                    return;
                }


                if (FraudTypetxt == "GOLD") {

                    var data1 = user + '~' + FraudID + '~' + FraudType + '~' + FraudNo + '~' + NBFCName + '~' + GoldFrType + '~' + GoldBrId + '~' + GoldBr + '~' + GoldPlace + '~' + GoldDis + '~' +
                        GoldState + '~' + PrinAcc + '~' + PrinAcctxt + '~' + ArOp + '~' + FrOcc + '~' + NatFr + '~' + commitdl + '~' +
                        commitTxt + '~' + calAmt + '~' + EntAmt + '~' + TotAmt;

                }
                else {

                    var data1 = user + '~' + FraudID + '~' + FraudType + '~' + FraudNo + '~' + NBFCName + '~' + VehFrType + '~' + "" + '~' + VehBr + '~' + VehPlace + '~' + VehDis + '~' +
                        VehState + '~' + PrinAcc + '~' + PrinAcctxt + '~' + ArOp + '~' + FrOcc + '~' + NatFr + '~' + commitdl + '~' + commitTxt + '~' + "" + '~' + EntAmt + '~' + TotAmt + '~' + comprmks;
                }

                var data2 = RBIDt + '~' + txtdelay + '~' + staff + '~' + customer + '~' + outsider + '~' + ctrlOff + '~' + ImpInfoSys + '~' + complaint + '~' +
                    compName + '~' + compref + '~' + compPrePos + '~' + compDt + '~' + compDtSub + '~' + compRej;


                var data3 = Recovery + '~' + RecoveryTxt + '~' + staffside1 + '~' + staffside2 + '~' + departpos + '~' +
                    stafreason + '~' + avoidinc + '~' + provision + '~' + amtoff + '~' + consider;

                var indata1 = data1 + '$' + data2 + '$' + data3;
                if (departpostxt == "Yes") {

                    var loopdata1 = $("[id*=hddata]").val();
                }
                else {
                    var loopdata1 = "";
                }
                //alert(loopdata1);
                if (chkbrrinv.checked == true) {
                       
                    var loopdata2 = $("[id*=hdbrrdata]").val();
                }
               else {
                 var loopdata2 = "";
                }
                //alert(loopdata2);

                
                if (chkbrracc.checked == true) {
                    var loopdata3 = $("[id*=hdbrraccdata]").val();
                    }
               else {
                        var loopdata3 = "";
               }
                //alert(loopdata3);

                var loopdata = loopdata1 + "$" + loopdata2 + "$" + loopdata3;
                //alert(loopdata);
                var access = 'SaveFMR1Comp';
                //}

                //else if (acc == '1') {
                //    if (dept == '4') {
                var Dtoccto = $("#DtOcT").val();
                var DtoccFrm = $("#DtOcF").val();
                var DtDetTo = $("#DtDetT").val();
                var DtDetFrm = $("#DtDetF").val();
                var RsDelay = $("#txt_Delayrs").val();
                var ddlinspaudit = $("#ddl_inpaudit option:selected").val();
                var whyfrd = $("#txt_inspaudit1").val();

                var actionfrd = $("#txt_inspaudit2").val();
                if (ddlinspaudit == "-1" || (ddlinspaudit == "22" && whyfrd == "" && actionfrd == "")) {
                    Swal.fire({
                        type: 'warning',
                        title: 'Oops...!',
                        text: "Select Whether internal inspection/ audit was conducted",
                        icon: "warning",
                        button: "Ok!",
                    });
                    //alert("Select Whether internal inspection/ audit was conducted ");
                    return;
                }
                else if (Dtoccto == "" || DtoccFrm == "") {
                    Swal.fire({
                        type: 'warning',
                        title: 'Oops...!',
                        text: "Select Date of occurence",
                        icon: "warning",
                        button: "Ok!",
                    });
                    //alert("Select Date of occurence");
                    return;
                }
                else if (DtDetTo == "" || DtDetFrm == "") {
                    Swal.fire({
                        type: 'warning',
                        title: 'Oops...!',
                        text: "Select Date of detection",
                        icon: "warning",
                        button: "Ok!",
                    });
                    //alert("Select Date of detection");
                    return;
                }
                else if (RsDelay == "") {
                    Swal.fire({
                        type: 'warning',
                        title: 'Oops...!',
                        text: "Select Reason for Delay",
                        icon: "warning",
                        button: "Ok!",
                    });
                    // alert("Select Reason for Delay");
                    return;
                }

                var indata2 = user + '~' + FraudID + '~' + Dtoccto + '~' + DtoccFrm + '~' + DtDetTo + '~' + DtDetFrm + '~' + RsDelay
                    + '~' + ddlinspaudit + '~' + whyfrd + '~' + actionfrd;
                //    var access = 'SaveFMR1Audit';
                //}
                //else if (dept == '598') {

                var claim = $("#ddl_InsClaim option:selected").val();
                var claimreason = $("#txt_insrsn").val();
                var Amt_recoverd = $("#txt_riimtotamt").val();
                var Amt_Insurance = $("#txt_ins").val();
                var Amt_Source = $("#txt_othsrc").val();
                var Total_amt = $("#txt_losstot").val();

                if (claim == "-1") {
                    Swal.fire({
                        type: 'warning',
                        title: 'Oops...!',
                        text: "Select  Whether any claim has been lodged with an insurance company",
                        icon: "warning",
                        button: "Ok!",
                    });
                    return;
                }
                else if (Amt_recoverd == "") {
                    Swal.fire({
                        type: 'warning',
                        title: 'Oops...!',
                        text: "Fill Amount recovered from party/parties concerned",
                        icon: "warning",
                        button: "Ok!",
                    });
                    return;
                }
                else if (Amt_Insurance == "") {
                    Swal.fire({
                        type: 'warning',
                        title: 'Oops...!',
                        text: "Fill Amount From insurance",
                        icon: "warning",
                        button: "Ok!",
                    });
                    return;
                }
                else if (Amt_Source == "") {
                    Swal.fire({
                        type: 'warning',
                        title: 'Oops...!',
                        text: "Fill Amount From other Sources",
                        icon: "warning",
                        button: "Ok!",
                    });
                    return;
                }

                var indata3 = user + '~' + FraudID + '~' + claim + '~' + claimreason + '~' + Amt_recoverd + '~' + Amt_Insurance + '~' + Amt_Source
                    + '~' + Total_amt;
                //        var access = 'SaveFMR1RIIM';
                //    }

                //}






                if (chkPassport.checked == true) {
                    var Sr = $("#SrNo").val();
                    if (Sr != "") {
                        var Sr1 = $("#SrNo1").val();
                        if (Sr1 != "") {
                            var subdata1 = Sr + '*' + $("#Name_party").val() + '*' + $("#Name_Dirt").val() + '*' + $("#Add").val() + '&' + Sr1 + '*' + $("#Name_party1").val() + '*' + $("#Name_Dirt1").val() + '*' + $("#Add1").val() + '&';
                        }
                        else {
                            var subdata1 = Sr + '*' + $("#Name_party").val() + '*' + $("#Name_Dirt").val() + '*' + $("#Add").val() + '&';
                        }
                    }

                }
                else {
                    var subdata1 = 99999;
                }

                if (chkPasspot.checked == true) {
                    var NmP = $("#NmPa").val();
                    if (NmP != "") {
                        var NmP1 = $("#NmPa1").val();
                        if (NmP1 != "") {
                            var subdata2 = NmP + '*' + $("#SrNoAssoc").val() + '*' + $("#NmAssoc").val() + '*' + $("#AddAssoc").val() + '&' + NmP1 + '*' + $("#SrNoAssoc1").val() + '*' + $("#Name_Dirt1").val() + '*' + $("#Add1").val() + '&';
                        }
                        else {
                            var subdata2 = NmP + '*' + $("#Name_party").val() + '*' + $("#Name_Dirt").val() + '*' + $("#Add").val() + '&';
                        }
                    }

                }
                else {
                    var subdata2 = 99999;
                }

                if (chkPasspott.checked == true) {
                    var NmA = $("#NmAs").val();
                    if (NmA != "") {
                        var NmA1 = $("#NmAs1").val();
                        if (NmA1 != "") {
                            var subdata3 = NmA + '*' + $("#SrNoAs").val() + '*' + $("#NmDirt").val() + '*' + $("#AddAsc").val() + '&' + NmA1 + '*' + $("#SrNoAs1").val() + '*' + $("#NmDirt1").val() + '*' + $("#AddAsc1").val() + '&';
                        }
                        else {
                            var subdata3 = NmA + '*' + $("#SrNoAs").val() + '*' + $("#NmDirt").val() + '*' + $("#AddAsc").val() + '&';
                        }
                    }
                }
                else {
                    var subdata3 = 99999;
                }
                
              
                var subdata = subdata1 + '^' + subdata2 + '^' + subdata3;
               

                var indata = indata1 + '#' + indata2 + '#' + indata3;
                var maildata = FraudID;

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
                            url: "FMR1Verify.aspx/SaveFMR1",
                            data: "{typ:'" + access + "', compdata :'" + subdata + "', val1 :'" + indata + "', subdata :'" + loopdata + "', mdata :'" + FraudID + "'}",
                            dataType: "json",
                            success: function (Result) {
                                Result = Result.d;

                                confirm(Result, '1', txthist);
                                confirm(Result, '2', txtmodux);
                                Swal.fire({
                                    type: 'success',
                                    title: 'Verified',
                                    text: "Verification Completed",
                                    icon: "success",
                                    timer: 1500,
                                    showConfirmButton: false
                                }).then(function () {
                                    location.reload();
                                });
                                // alert("Successfully Uploaded");

                                window.open('FMR1.aspx', '_self');

                            },
                            error: function (Result) {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Oops...',
                                    text: 'Something went wrong!'

                                });
                                //alert("Something went wrong;");
                            }
                        });
                    }
                    else {
                        return false;
                    }
                })

                //$.ajax({
                //    type: "post",
                //    contentType: "application/json; charset=utf-8",
                //    url: "FMR1Verify.aspx/SaveFMR1",
                //    data: "{typ:'" + access + "', compdata :'" + subdata + "', val1 :'" + indata + "', subdata :'" + loopdata + "'}",
                //    dataType: "json",
                //    success: function (Result) {
                //        Result = Result.d;

                //           confirm(Result, '1', txthist);  
                //           confirm(Result, '2', txtmodux);
                //        alert("Successfully Uploaded");

                //        window.open('FMR1.aspx', '_self');

                //    },
                //    error: function (Result) {
                //        alert("Something went wrong;");
                //    }
                //});
            }

            function confirm(req_data, flag, msg_content) {
               
                var data = req_data;
                $.ajax({
                    type: "post",
                    contentType: "application/json; charset=utf-8",
                    url: "FMR1Verify.aspx/confirm_Request",
                    data: "{flag:'" + flag + "',data:'" + data + "',contnt:'" + msg_content + "'}",
                    dataType: "json",
                    async: false,
                    success: function (Result) {

                    },
                    error: function (Result) {
                        var alertmsg = "Something went wrong";
                        alerts(alertmsg);
                        return false;
                    }
                });

            }

            ////////////////////////REJECTED//////////////////////////////

            function FRConfirmModify() {
                debugger

                var acc = $("[id*=hdaccess]").val();
                var dept = $("[id*=hdDept]").val();
                var user = $("[id*=hdUserId]").val();
                var FraudID = $("#ddlFr option:selected").val();
                //if (acc == '0') {

                var FraudType = $("#ddl_frd_typ option:selected").val();
                var FraudTypetxt = $("#ddl_frd_typ option:selected").text();
                var FraudNo = $("#txt_f1").val() + $("#txt_f2").val();
                var NBFCName = $("#txt_HName").val();

                var GoldFrType = $("#ddlbrGold option:selected").val();
                var GoldFrTypeTxt = $("#ddlbrGold option:selected").text();
                var GoldBrId = $("#ddlBranch option:selected").val();
                var GoldBr = $("#ddlBranch option:selected").text();
                var GoldPlace = $("#txt_gplace").val();
                var GoldDis = $("#txt_district").val();
                var GoldState = $("#txt_state").val();

                var VehFrType = $("#ddl_brType option:selected").val();
                var VehBr = $("#txt_BrVeh").val();
                var VehPlace = $("#txt_vehPlace").val();
                var VehDis = $("#txt_vehDist").val();
                var VehState = $("#txt_vehState").val();

                var PrinAcc = $("#ddlPrinAcc option:selected").val();
                var PrinAccTxt = $("#ddlPrinAcc option:selected").val();
                var PrinAcctxt = $("#txt_prinacc").val();
                var ArOp = $("#ddlArOpr option:selected").val();
                var FrOcc = $("#ddl_fr option:selected").val();
                var NatFr = $("#ddl_NatureFr option:selected").val();

                var commitdl = $("#ddl_commit option:selected").val();
                var commitdltxt = $("#ddl_commit option:selected").text();
                var commitTxt = $("#txt_commit").val();

                var calAmt = $("#txt_getamt").val();
                var EntAmt = $("#txt_entamt").val();
                var TotAmt = $("#txt_totamt").val();

                var RBIDt = $("#DtRBI").val();

                var txtdelay = $("#tx_delay").val();
                var txthist = $("#txt_history").val();
                var txtmodux = $("#txt_Modus").val();

                

                var staff = $("#ddr_staff option:selected").val();
                var customer = $("#ddr_cus option:selected").val();
                var outsider = $("#ddr_out option:selected").val();
                var ctrlOff = $("#ddr_ctrl option:selected").val();
                var ImpInfoSys = $("#ddr_info option:selected").val();

                var complaint = $("#ddr_comp option:selected").val();
                var compName = $("#txt_comp").val();
                var compref = $("#DtRef").val();
                var compPrePos = $("#txtprespo").val();
                var compDt = $("#Dtcompl").val();
                var compDtSub = $("#DtSub").val();
                var compRej = $("#txt_CompRej").val();

                var Recovery = $("#Dt_Recr").val();
                var RecoveryTxt = $("#txt_prepos").val();

                var staffside1 = $("#ddrstaffside option:selected").val();
                var staffside1txt = $("#ddrstaffside option:selected").text();
                var staffside2 = $("#Dtstaff").val();

                var departpos = $("#ddrdepartpos option:selected").val();
                var departpostxt = $("#ddrdepartpos option:selected").text();
                var stafreason = $("#txt_stafreason").val();

                var provision = $("#txt_provision").val();
                var avoidinc = $("#txt_avoidinc").val();
                var amtoff = $("#txt_amtoff").val();
                var consider = $("#txt_considers").val();
                var comprmks = $("#comprmk").val();

                if (FraudType == '-1') {
                    Swal.fire({
                        type: 'warning',
                        title: 'Oops...!',
                        text: "Select Fraud Type",
                        icon: "warning",
                        button: "Ok!",
                    });
                    //alert("Select Fraud Type");
                    return;
                }
                else if (FraudType == '1') {
                    if (GoldBrId == "-1" || GoldFrType == "-1" || GoldPlace == "" || GoldDis == "" || GoldState == "") {
                        Swal.fire({
                            type: 'warning',
                            title: 'Oops...!',
                            text: "Complete Branch Details in FMR1-A",
                            icon: "warning",
                            button: "Ok!",
                        });
                        // alert("Complete Branch Details in FMR1-A");
                        return;
                    }
                }
                else if (FraudType == '2') {
                    if (VehBr == " " || VehFrType == "-1" || VehPlace == "" || VehDis == "" || VehState == "") {
                        Swal.fire({
                            type: 'warning',
                            title: 'Oops...!',
                            text: "Complete Branch Details in FMR1-A",
                            icon: "warning",
                            button: "Ok!",
                        });
                        //alert("Complete Branch Details in FMR1-A");
                        return;
                    }
                }
                if (PrinAcc == "-1" || PrinAcctxt == "") {
                    Swal.fire({
                        type: 'warning',
                        title: 'Oops...!',
                        text: "Select Name of the Principal party / account",
                        icon: "warning",
                        button: "Ok!",
                    });
                    //alert("Select Name of the Principal party / account");
                    return;
                }
                else if (ArOp == "-1") {
                    Swal.fire({
                        type: 'warning',
                        title: 'Oops...!',
                        text: "Select Area of operation",
                        icon: "warning",
                        button: "Ok!",
                    });
                    // alert("Select Area of operation");
                    return;
                }
                else if (FrOcc == "-1") {
                    Swal.fire({
                        type: 'warning',
                        title: 'Oops...!',
                        text: "Select Whether fraud has occurred in a borrowal account",
                        icon: "warning",
                        button: "Ok!",
                    });
                    // alert("Select Whether fraud has occurred in a borrowal account");
                    return;
                }
                else if (NatFr == "-1") {
                    Swal.fire({
                        type: 'warning',
                        title: 'Oops...!',
                        text: "Select Nature of fraud",
                        icon: "warning",
                        button: "Ok!",
                    });
                    //alert("Select Nature of fraud");
                    return;
                }
                else if (commitdl == "-1" || (commitdltxt == "Yes" && (commitTxt == ""))) {
                    Swal.fire({
                        type: 'warning',
                        title: 'Oops...!',
                        text: "Select Whether computer is used in committing the fraud?",
                        icon: "warning",
                        button: "Ok!",
                    });
                    // alert("Select Whether computer is used in committing the fraud?");
                    return;
                }
                else if (EntAmt == "") {
                    Swal.fire({
                        type: 'warning',
                        title: 'Oops...!',
                        text: "Fill values in Total Amount",
                        icon: "warning",
                        button: "Ok!",
                    });
                    // alert("Fill values in Total Amount");
                    return;
                }
                else if (RBIDt == "") {
                    Swal.fire({
                        type: 'warning',
                        title: 'Oops...!',
                        text: "Select RBI reported date",
                        icon: "warning",
                        button: "Ok!",
                    });
                    // alert("Select RBI reported date ");
                    return;
                }
                else if (txtdelay == "") {
                    Swal.fire({
                        type: 'warning',
                        title: 'Oops...!',
                        text: "Select Reasons for delay",
                        icon: "warning",
                        button: "Ok!",
                    });
                    //alert("Select Reasons for delay");
                    return;
                }
                else if (txthist == "") {
                    Swal.fire({
                        type: 'warning',
                        title: 'Oops...!',
                        text: "Select Brief history",
                        icon: "warning",
                        button: "Ok!",
                    });
                    // alert("Select Brief history");
                    return;
                }
                else if (txtmodux == "") {
                    Swal.fire({
                        type: 'warning',
                        title: 'Oops...!',
                        text: "Select Modus operandi",
                        icon: "warning",
                        button: "Ok!",
                    });
                    //alert("Select Modus operandi");
                    return;
                }
                else if (staff == "-1" || customer == "-1" || outsider == "-1" || ctrlOff == "-1" || ImpInfoSys == "-1") {
                    Swal.fire({
                        type: 'warning',
                        title: 'Oops...!',
                        text: "Select all sections in Fraud committed",
                        icon: "warning",
                        button: "Ok!",
                    });
                    //alert("Select all sections in Fraud committed");
                    return;
                }

                if ((complaint == "-1") || (complaint == "Yes" && compName == "" && compref == "" && compPrePos == "" && compDt == "" && compDtSub == "") || (complaint == "No" && compRej == "")) {
                    Swal.fire({
                        type: 'warning',
                        title: 'Oops...!',
                        text: "Select Complaint with Police",
                        icon: "warning",
                        button: "Ok!",
                    });
                    // alert("Select Complaint with Police");
                    return;
                }
                else if (Recovery == "" || RecoveryTxt == "") {
                    Swal.fire({
                        type: 'warning',
                        title: 'Oops...!',
                        text: "Select Recovery suit with Court/Others",
                        icon: "warning",
                        button: "Ok!",
                    });
                    //alert("Select Recovery suit with Court/Others");
                    return;
                }
                else if ((staffside1 == "-1") || (staffside1txt == "Yes" && staffside2 == "")) {
                    Swal.fire({
                        type: 'warning',
                        title: 'Oops...!',
                        text: "Select Whether any internal investigation has been/is proposed to be conducted",
                        icon: "warning",
                        button: "Ok!",
                    });
                    //alert("Select Whether any internal investigation has been/is proposed to be conducted");
                    return;
                }
                else if ((departpos == "-1") || (departpostxt == "No" && stafreason == "")) {
                    Swal.fire({
                        type: 'warning',
                        title: 'Oops...!',
                        text: "Select Whether any departmental enquiry has been/is proposed to be conducted",
                        icon: "warning",
                        button: "Ok!",
                    });
                    // alert("Select Whether any departmental enquiry has been/is proposed to be conducted");
                    return;
                }
                else if (avoidinc == "") {
                    Swal.fire({
                        type: 'warning',
                        title: 'Oops...!',
                        text: "Select Steps taken to avoid such incidents",
                        icon: "warning",
                        button: "Ok!",
                    });
                    //alert("Select Steps taken to avoid such incidents");
                    return;
                }
                else if (amtoff == "") {
                    Swal.fire({
                        type: 'warning',
                        title: 'Oops...!',
                        text: "Select Amount written off",
                        icon: "warning",
                        button: "Ok!",
                    });
                    //alert("Select Amount written off");
                    return;
                }
                else if (consider == "") {
                    Swal.fire({
                        type: 'warning',
                        title: 'Oops...!',
                        text: "Select Suggestions for consideration of RBI",
                        icon: "warning",
                        button: "Ok!",
                    });
                    //alert("Select Suggestions for consideration of RBI");
                    return;
                }

                if (FraudTypetxt == "GOLD") {

                    var data1 = user + '~' + FraudID + '~' + FraudType + '~' + FraudNo + '~' + NBFCName + '~' + GoldFrType + '~' + GoldBrId + '~' + GoldBr + '~' + GoldPlace + '~' + GoldDis + '~' +
                        GoldState + '~' + PrinAcc + '~' + PrinAcctxt + '~' + ArOp + '~' + FrOcc + '~' + NatFr + '~' + commitdl + '~' +
                        commitTxt + '~' + calAmt + '~' + EntAmt + '~' + TotAmt + '~' + comprmks; ddlFr
                }
                else {

                    var data1 = user + '~' + FraudID + '~' + FraudType + '~' + FraudNo + '~' + NBFCName + '~' + VehFrType + '~' + "" + '~' + VehBr + '~' + VehPlace + '~' + VehDis + '~' +
                        VehState + '~' + PrinAcc + '~' + PrinAcctxt + '~' + ArOp + '~' + FrOcc + '~' + NatFr + '~' + commitdl + '~' + commitTxt + '~' + "" + '~' + EntAmt + '~' + TotAmt + '~' + comprmks;
                }

                var data2 = RBIDt + '~' + txtdelay + '~' + staff + '~' + customer + '~' + outsider + '~' + ctrlOff + '~' + ImpInfoSys + '~' + complaint + '~' +
                    compName + '~' + compref + '~' + compPrePos + '~' + compDt + '~' + compDtSub + '~' + compRej;


                var data3 = Recovery + '~' + RecoveryTxt + '~' + staffside1 + '~' + staffside2 + '~' + departpos + '~' +
                    stafreason + '~' + avoidinc + '~' + provision + '~' + amtoff + '~' + consider;

                var indata1 = data1 + '$' + data2 + '$' + data3;
                if (departpostxt == "Yes") {

                    var loopdata = $("[id*=hddata]").val();
                }
                else {
                    var loopdata = "";
                }
                var access = 'RejectFMR1';
                //}

                //else if (acc == '1') {
                //    if (dept == '4') {
                var Dtoccto = $("#DtOcT").val();
                var DtoccFrm = $("#DtOcF").val();
                var DtDetTo = $("#DtDetT").val();
                var DtDetFrm = $("#DtDetF").val();
                var RsDelay = $("#txt_Delayrs").val();
                var ddlinspaudit = $("#ddl_inpaudit option:selected").val();
                var whyfrd = $("#txt_inspaudit1").val();

                var actionfrd = $("#txt_inspaudit2").val();
                if (ddlinspaudit == "-1" || (ddlinspaudit == "22" && whyfrd == "" && actionfrd == "")) {
                    Swal.fire({
                        type: 'warning',
                        title: 'Oops...!',
                        text: "Select Whether internal inspection/ audit was conducted",
                        icon: "warning",
                        button: "Ok!",
                    });
                    //alert("Select Whether internal inspection/ audit was conducted ");
                    return;
                }
                else if (Dtoccto == "" || DtoccFrm == "") {
                    Swal.fire({
                        type: 'warning',
                        title: 'Oops...!',
                        text: "Select Date of occurence",
                        icon: "warning",
                        button: "Ok!",
                    });
                    //alert("Select Date of occurence");
                    return;
                }
                else if (DtDetTo == "" || DtDetFrm == "") {
                    Swal.fire({
                        type: 'warning',
                        title: 'Oops...!',
                        text: "Select Date of detection",
                        icon: "warning",
                        button: "Ok!",
                    });
                    //alert("Select Date of detection");
                    return;
                }
                else if (RsDelay == "") {
                    Swal.fire({
                        type: 'warning',
                        title: 'Oops...!',
                        text: "Select Reason for Delay",
                        icon: "warning",
                        button: "Ok!",
                    });
                    //alert("Select Reason for Delay");
                    return;
                }

                var indata2 = user + '~' + FraudID + '~' + Dtoccto + '~' + DtoccFrm + '~' + DtDetTo + '~' + DtDetFrm + '~' + RsDelay
                    + '~' + ddlinspaudit + '~' + whyfrd + '~' + actionfrd;
                //    var access = 'SaveFMR1Audit';
                //}
                //else if (dept == '598') {

                var claim = $("#ddl_InsClaim option:selected").val();
                var claimreason = $("#txt_insrsn").val();
                var Amt_recoverd = $("#txt_riimtotamt").val();
                var Amt_Insurance = $("#txt_ins").val();
                var Amt_Source = $("#txt_othsrc").val();
                var Total_amt = $("#txt_losstot").val();

                var indata3 = user + '~' + FraudID + '~' + claim + '~' + claimreason + '~' + Amt_recoverd + '~' + Amt_Insurance + '~' + Amt_Source
                    + '~' + Total_amt;
                //        var access = 'SaveFMR1RIIM';
                //    }

                //}






                if (chkPassport.checked == true) {
                    var Sr = $("#SrNo").val();
                    if (Sr != "") {
                        var Sr1 = $("#SrNo1").val();
                        if (Sr1 != "") {
                            var subdata1 = Sr + '*' + $("#Name_party").val() + '*' + $("#Name_Dirt").val() + '*' + $("#Add").val() + '&' + Sr1 + '*' + $("#Name_party1").val() + '*' + $("#Name_Dirt1").val() + '*' + $("#Add1").val() + '&';
                        }
                        else {
                            var subdata1 = Sr + '*' + $("#Name_party").val() + '*' + $("#Name_Dirt").val() + '*' + $("#Add").val() + '&';
                        }
                    }

                }
                else {
                    var subdata1 = 99999;
                }

                if (chkPasspot.checked == true) {
                    var NmP = $("#NmPa").val();
                    if (NmP != "") {
                        var NmP1 = $("#NmPa1").val();
                        if (NmP1 != "") {
                            var subdata2 = NmP + '*' + $("#SrNoAssoc").val() + '*' + $("#NmAssoc").val() + '*' + $("#AddAssoc").val() + '&' + NmP1 + '*' + $("#SrNoAssoc1").val() + '*' + $("#Name_Dirt1").val() + '*' + $("#Add1").val() + '&';
                        }
                        else {
                            var subdata2 = NmP + '*' + $("#Name_party").val() + '*' + $("#Name_Dirt").val() + '*' + $("#Add").val() + '&';
                        }
                    }

                }
                else {
                    var subdata2 = 99999;
                }

                if (chkPasspott.checked == true) {
                    var NmA = $("#NmAs").val();
                    if (NmA != "") {
                        var NmA1 = $("#NmAs1").val();
                        if (NmA1 != "") {
                            var subdata3 = NmA + '*' + $("#SrNoAs").val() + '*' + $("#NmDirt").val() + '*' + $("#AddAsc").val() + '&' + NmA1 + '*' + $("#SrNoAs1").val() + '*' + $("#NmDirt1").val() + '*' + $("#AddAsc1").val() + '&';
                        }
                        else {
                            var subdata3 = NmA + '*' + $("#SrNoAs").val() + '*' + $("#NmDirt").val() + '*' + $("#AddAsc").val() + '&';
                        }
                    }
                }
                else {
                    var subdata3 = 99999;
                }


                var subdata = subdata1 + '^' + subdata2 + '^' + subdata3;


                var indata = indata1 + '#' + indata2 + '#' + indata3;

                Swal.fire({
                    title: 'Information',
                    text: "ARE YOU SURE TO RETURN??",
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
                            url: "FMR1Verify.aspx/SaveFMR1",
                            data: "{typ:'" + access + "', compdata :'" + subdata + "', val1 :'" + indata + "', subdata :'" + loopdata + "',, mdata :'" + FraudID + "'}",
                            dataType: "json",
                            success: function (Result) {
                                Result = Result.d;

                                confirm(Result, '1', txthist);
                                confirm(Result, '2', txtmodux);
                                Swal.fire({
                                    type: 'success',
                                    title: 'Success',
                                    text: "Retured For Modification!!",
                                    icon: "success",
                                    timer: 1500,
                                    showConfirmButton: false
                                }).then(function () {
                                    location.reload();
                                });
                                // alert("Successfully Uploaded");

                                //window.open('FMR1.aspx', '_self');

                            },
                            error: function (Result) {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Oops...',
                                    text: 'Something went wrong!'

                                });
                                //alert("Something went wrong;");
                            }
                        });
                    }
                    else {
                        return false;
                    }
                })

                //$.ajax({
                //    type: "post",
                //    contentType: "application/json; charset=utf-8",
                //    url: "FMR1Verify.aspx/SaveFMR1",
                //    data: "{typ:'" + access + "', compdata :'" + subdata + "', val1 :'" + indata + "', subdata :'" + loopdata + "'}",
                //    dataType: "json",
                //    success: function (Result) {
                //        Result = Result.d;

                //        confirm(Result, '1', txthist);
                //        confirm(Result, '2', txtmodux);
                //        alert("Successfully Uploaded");

                //        window.open('FMR1Verify.aspx', '_self');

                //    },
                //    error: function (Result) {
                //        alert("Something went wrong;");
                //    }
            
                //});
            }
      