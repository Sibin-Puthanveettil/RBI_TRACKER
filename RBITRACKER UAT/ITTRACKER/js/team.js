$(window).on('load', function () {
    $("[id*=hdman]").val(0);
    $("[id*=hddev]").val(0);
    $("[id*=hdcst]").val(0);
    $("[id*=hdtest]").val(0);
    $("[id*=hddata]").val("");
    $("[id*=hdRqstID]").val(0);
    $("[id*=hdDevlpr]").val("");
});




function showmodule() {
    $("#moduledata").show();
    $("#devdata").hide();
    $("#tecl").hide();
    $("#mod").show();
    $("#dev").hide();
  
}
function Refresh() {  
    $("#divtechnew").hide();
    $("#techleaddata").hide();
    $("#delete").hide();
    $("#devdata").hide();
    $("#insertdev").hide();
    $("#moduledata").hide();
    $("#delete").hide();
    $("#tecl").show();
    $("#mod").show();
    $("#dev").show();

    $("#subcrfdis").hide();
    $("#devlopertab").hide();
    $("#parallelrow1").hide();
    $("#parallelrow2").hide();



    $("#datesel").hide();
    $("#parallelrow2").hide();
    $("#parallelrow1").hide();
    $("#techleaddetails").hide();
    $("#devlopsel").hide();
    $("#remar1").hide();

   // $("#tabChange").remove();
    $("#dd_subcrf").val("-1"); 
}

function showdeveloper() {
    $("#techleaddata").show();
    $("#devdata").show();
    $("#insertdev").hide();
    $("#moduledata").hide();
    $("#delete").hide();
    $("#tecl").hide();
    $("#mod").hide();
    $("#dev").show();
}
function showtechlead() {
    $("#divtechnew").show();
    $("#techleaddata").hide();
    $("#devdata").hide();
    $("#insertdev").hide();
    $("#moduledata").hide();
    $("#delete").hide();
    $("#tecl").show();
    $("#mod").hide(); 
    $("#dev").hide(); 
    $("#modDatas").hide();
    fillCRFDetails();
}
function showtech() {
    
    var crf = $("#txtmodule").val();
    var subid = $("#dd_subcrf").val();
    gettechleaddatatabl(crf);

}
//Delete developer onclick
//function showdeltldp() {

//    var crf = $("#txtmodule").val();
//    var subid = $("#dd_subcrf").val();
//    $("#devlopertab").hide();
//    gettechleaddatatabl(crf);

//}
function showdev() {
   
    $("#lblstaDt").datepicker({
        dateFormat: 'dd/MM/yy',
         changeMonth: true,
        changeYear: true,
        stepMonths: true,
        todayHighlight: true,
        onSelect: function (dateText, inst) {
        }

    });
 
    $("#lblTarDt").datepicker({
        dateFormat: 'dd/MM/yy',
        
        changeMonth: true,
        changeYear: true,
        stepMonths: true,
        todayHighlight: true,
        onSelect: function (dateText, inst) {
        }

    });
    
    var crf = $("#txtmodule").val();
    var subid = $("#dd_subcrf").val();
    getDevelopdatatabl(crf);
}
// insert new developer or tech lead insert on click
function shownewtldp() {
    var radValtl = $("input[name='rbRess']:checked").val();
    //alert(radValtl);
    if (radValtl == 'rbtech') {
        
        $("#parallelrow1").show(); 
        $("#parallelrow2").hide();
        $("#techleaddetails").show();
        $("#datesel").hide();
        $("#devlopertab").hide();
        $("#devlopsel").hide();
        $("#remar1").hide();
        fillTLDetails();
    } else if (radValtl == 'rbdeve') {
        $("#devlopertab").show();
        $("#datesel").show();
        $("#parallelrow2").show();
        $("#subcrfdis").show();
        $("#parallelrow1").hide();
        $("#techleaddetails").hide();
        $("#devlopsel").hide();
        $("#remar1").show();

        $("#dman1").show();
        $("#dman2").show();
        $("#dman3").show();
        GetChangeList();


        fillDvlr();
        
    }

}
//delete developer or tech lead
function showdeltldp() {
    var radValtl = $("input[name='rbRess']:checked").val();
    if (radValtl == 'rbtech') {
        
        $("#techleaddetails").show();
        $("#subcrfdis").show();
        $("#devlopertab").hide();
        $("#parallelrow1").hide();
        $("#parallelrow2").hide();
        $("#datesel").hide();
        $("#devlopsel").hide();
        $("#remar1").hide();
        fillTLDetails();
    } else if (radValtl == 'rbdeve') {
        
        $("#subcrfdis").show();
        $("#techleaddetails").hide();
   
        $("#parallelrow1").hide();
        $("#parallelrow2").hide();
        $("#datesel").hide();
        $("#devlopsel").show();
        $("#remar1").show();
        $("#devlopertab").hide();
        fillDvlr();
        
    }
}
// change developer or tech lead----change onclick
function showcangetldp() {
    var radValtl = $("input[name='rbRess']:checked").val();
    if (radValtl == 'rbtech') {
        $("#devlopertab").hide();
        $("#parallelrow1").show();
        $("#techleaddetails").show();
        $("#subcrfdis").show();
        $("#parallelrow2").hide();
        $("#datesel").hide();
        $("#devlopsel").hide();
        $("#remar1").hide();
       
        
        fillTLDetails();
    } else if (radValtl == 'rbdeve') {
 
        $("#subcrfdis").show();
        $("#parallelrow2").show();
        $("#datesel").show();
        $("#devlopsel").show();
        $("#remar1").show();
        $("#parallelrow1").hide();
        $("#techleaddetails").hide();
        $("#devlopertab").show();
        $("#remar").hide();
        $("#remar1").show();

        fillDvlr();
    }
}

function getEmployeeDetails() {

    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "team_module_dev.aspx/getData",
        data: "{pageVal:'GetAllEmp', pageval1 :'', pageval2 :''}",
        dataType: "json",
        success: function (Result) {
            Result = Result.d;
            $('#txtEmpCode').append($("<option></option>").val("-1").html("Choose Employee"));
            $.each(Result, function (key, value) {
                $('#txtEmpCode').append($("<option></option>").val(value.id).html(value.name));
            });
        }
    });
}
function ShowPurpose() {

    $("#insert").show();
    $("#delete").hide();
    $("#techlead").empty();
    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "team_module_dev.aspx/getData",
        data: "{pageVal:'TEAMMODULE',pageval1 :'ITTEAM',pageval2:''}",
        dataType: "json",
        success: function (Result) {
            Result = Result.d;
            $('#techlead').append($("<option selected disabled></option>").val("-1").html("Choose Team"));
            $.each(Result, function (key, value) {
                $('#techlead').append($("<option></option>").val(value.id).html(value.name));
            });
        }
    });

}  
function ShowPurpose1() {
    $("#insert").hide();
    $("#delete").show();
    $("#techlead1").empty();
    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "team_module_dev.aspx/getData",
        data: "{pageVal:'TEAMMODULE',pageval1 :'ITTEAM',pageval2:''}",
        dataType: "json",
        success: function (Result) {
            Result = Result.d;
            $('#techlead1').append($("<option selected disabled></option>").val("-1").html("Choose a Team"));
            $.each(Result, function (key, value) {
                $('#techlead1').append($("<option></option>").val(value.id).html(value.name));
            });
        }
    });
}
function moduleselect() {
    $("#module1").empty();
    var mod = $("#techlead1").val();
    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "team_module_dev.aspx/getData",
        data: "{pageVal:'TEAMMODULE',pageval1 :'MODULE',pageval2 :'" + mod + "'}",
        dataType: "json",
        success: function (Result) {
            Result = Result.d;
            $('#module1').append($("<option selected disabled></option>").val("-1").html("Select Module"));
            $.each(Result, function (key, value) {
                $('#module1').append($("<option></option>").val(value.id).html(value.name));
            });
        }
    });
}
function adddata() {

    var mod = $("#txtmod").val();
    var txt = $("#techlead option:selected").text();
    valData = mod + "^" + txt + "~";
    ShowTable(valData);

}



function ShowTable(data) {
    var valData = data.split('~');

    if ($("#tableData tr").length == 0) {
        $("#tableData").empty();
        $('#tableData').append('<tr style="color:black; background-color:honeydew"><th class="text-center">TEAM</th><th class="text-center">MODULE</th><th class="text-center">REMOVE</th></tr>');
    }


    for (i = 0; i < valData.length - 1; i++) {
        var valData1 = valData[i].split('^');

        $('#tableData').append('<tbody><tr>' +

            '<td class="text-center">' + valData1[1] + '</td>' +
            '<td class="text-center">' + valData1[0] + '</td>' +
          
            '<td class="text-center"><a href="javascript:void(0);" class="remove"  id="remrow"><span class="glyphicon glyphicon-trash">Remove</span></a></td></tr></tbody>');
    }
  
    $("#txtmod").val('');
   
   
}

function GetEmpDetails() {

}

function adddata1() {

    var mod = $("#module1 option:selected").text();
   
    var txt = $("#techlead1 option:selected").text();
    valData = mod + "^" + txt + "~";
    ShowTable1(valData);


}
function ShowTable1(data) {
    var valData = data.split('~');

    if ($("#tableData1 tr").length == 0) {
        $("#tableData1").empty();
        $('#tableData1').append('<tr style="color:black; background-color:honeydew"><th class="text-center">TEAM</th><th class="text-center">MODULE</th><th class="text-center">REMOVE</th></tr>');
    }


    for (i = 0; i < valData.length - 1; i++) {
        var valData1 = valData[i].split('^');

        $('#tableData1').append('<tbody><tr>' +

            '<td class="text-center">' + valData1[1] + '</td>' +
            '<td class="text-center">' + valData1[0] + '</td>' +

            '<td class="text-center"><a href="javascript:void(0);" class="remove"  id="remrow"><span class="glyphicon glyphicon-trash">Remove</span></a></td></tr></tbody>');
    }

    $("#txtmod").val('');


}
$(document).on('click', '.remove', function () {

    $(this).closest('tr').remove();
    return false;
});

function ConfirmNote() {
    var ItemDtls = "";
    if ($("#tableData tr").length == 0 || $("#tableData tr").length == 1) {
        Swal.fire("Add Any Item....!!!!");
        return false;
    }
    else {
        var table = document.getElementById('tableData');

        var rowLength = table.rows.length;

        for (var i = 1; i < rowLength; i++) {

            ItemDtls = ItemDtls + table.rows[i].cells[0].innerHTML + '^' + table.rows[i].cells[1].innerHTML +'$';
         
        }
     
        $.ajax({
            type: "post",
            contentType: "application/json; charset=utf-8",
            url: "team_module_dev.aspx/Confirm",
            data: "{pageVal:'TEAMMODULE',pageval1 :'CONFIRMINSERT',pageval2 :'" + ItemDtls + "'}",
            dataType: "json",
            success: function (Result) {
                Result = Result.d;
               // alert(Result);
                window.open('team_module_dev.aspx', '_self');

            }
        });
    }
}
function ConfirmNote1() {
    var ItemDtls = "";
    if ($("#tableData1 tr").length == 0 || $("#tableData1 tr").length == 1) {
        Swal.fire("Add Any Item....!!!!");
        return false;
    }
    else {
        var table = document.getElementById('tableData1');

        var rowLength = table.rows.length;

        for (var i = 1; i < rowLength; i++) {

            ItemDtls = ItemDtls + table.rows[i].cells[0].innerHTML + '^' + table.rows[i].cells[1].innerHTML + '$';

        }

        $.ajax({
            type: "post",
            contentType: "application/json; charset=utf-8",
            url: "team_module_dev.aspx/Confirm",
            data: "{pageVal:'TEAMMODULE',pageval1 :'CONFIRMDELETE',pageval2 :'" + ItemDtls + "'}",
            dataType: "json",
            success: function (Result) {
                Result = Result.d;
                window.open('team_module_dev.aspx', '_self');
            }
        });
    }
}
function adddevelpordata() {
    
    var txt = $("#ddlteam option:selected").text();
    if (txt.trim() == 'Choose a Team') {
        Swal.fire("Please Choose a Team!");
        $("#ddlteam").focus();
        return false;
    }


    var mod = $("#txtEmpCode").val() + "^" + $("#txtEmpCode option:selected").text();
    if ($("#txtEmpCode").val() == '-1') {
        Swal.fire("Please Choose an Employee!");
        $("#txtEmpCode").focus();
        return false;
    }

    if ($("#Category option:selected").text().trim() == 'Select Category') {
        Swal.fire("Please Choose Category of developer!");
        $("#Category").focus();
        return false;
    }
    valData = txt + "^" + mod + "^" + $("#Category option:selected").text() + "^" + $("#ddlteam").val() + "^" + $("#Category").val()+ "~";
    
    ShowDevTable(valData);

}

function ShowDevTable(data) {
    var valData = data.split('~');

    if ($("#tabledeveloperData tr").length == 0) {
        $("#tabledeveloperData").empty();
        $('#tabledeveloperData').append('<tr style="color:black; background-color:honeydew"><th class="text-center">TEAM</th><th style="display:none;" class="text-center">MemberId</th><th class="text-center">Member</th><th class="text-center">Category</th><th style="display:none;" class="text-center">TeamId</th><th style="display:none;" class="text-center">CategoryId</th><th class="text-center">REMOVE</th></tr>');
    }


    for (i = 0; i < valData.length - 1; i++) {
        var valData1 = valData[i].split('^');

        $('#tabledeveloperData').append('<tbody><tr>' +

            '<td class="text-center">' + valData1[0] + '</td>' +
            '<td class="text-center" style="display:none;">' + valData1[1] + '</td>' +
            '<td class="text-center">' + valData1[2] + '</td>' +
            '<td class="text-center">' + valData1[3] + '</td>' +
            '<td class="text-center" style="display:none;">' + valData1[4] + '</td>' +
            '<td class="text-center" style="display:none;">' + valData1[5] + '</td>' +
            '<td class="text-center"><a href="javascript:void(0);" class="remove"  id="remrow"><span class="glyphicon glyphicon-trash">Remove</span></a></td></tr></tbody>');
    }

    $("#txtdevelpr").val('');


}
function InsertPurpose() {
    $("#deletedev").hide();
    $("#insertdev").show();
    //$("#delete").hide();
    //$("#techlead").empty();
    $('#ddlteam').empty();
    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "team_module_dev.aspx/getData",
        data: "{pageVal:'TEAMMODULE',pageval1 :'ITTEAM',pageval2:''}",
        dataType: "json",
        success: function (Result) {
            Result = Result.d;
            $('#ddlteam').append($("<option selected disabled></option>").val("-1").html("Choose a Team"));
            $.each(Result, function (key, value) {
                $('#ddlteam').append($("<option></option>").val(value.id).html(value.name));
            });
        }
    });
    getEmployeeDetails();
    DeveloperCategory();
} 
function DeletePurpose() {
    $("#insertdev").hide();
    $("#deletedev").show();
    $('#ddlteam1').empty();
    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "team_module_dev.aspx/getData",
        data: "{pageVal:'TEAMMODULE',pageval1 :'ITTEAM',pageval2:''}",
        dataType: "json",
        success: function (Result) {
            Result = Result.d;
            $('#ddlteam1').append($("<option selected disabled></option>").val("-1").html("Choose a Team"));
            $.each(Result, function (key, value) {
                $('#ddlteam1').append($("<option></option>").val(value.id).html(value.name));
            });
        }
    });
    //getEmployeeDetailsDlt();
    
}
function getEmployeeDetailsDlt() {
    var team = $('#ddlteam1').val();
    $('#txtEmpCode1').empty();
    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "team_module_dev.aspx/getData",
        data: "{pageVal:'GetEmpTeam', pageval1 :'" + team+"', pageval2 :''}",
        dataType: "json",
        success: function (Result) {
            Result = Result.d;
            $('#txtEmpCode1').append($("<option></option>").val("-1").html("Choose Employee"));
            $.each(Result, function (key, value) {
                $('#txtEmpCode1').append($("<option></option>").val(value.id).html(value.name));
            });
        }
    });
}
function deldevelpordata() {

    var txt = $("#ddlteam1 option:selected").text();
    if (txt.trim() == 'Choose a Team') {
        Swal.fire("Please Choose a Team!");
        $("#ddlteam1").focus();
        return false;
    }


    var mod = $("#txtEmpCode1").val() + "^" + $("#txtEmpCode1 option:selected").text();
    if ($("#txtEmpCode1").val() == '-1') {
        Swal.fire("Please Choose an Employee!");
        $("#txtEmpCode1").focus();
        return false;
    }

    var data = txt + "^" + mod + "^"  + $("#ddlteam1").val() + "^" +  "~";
 
    var valData = data.split('~');

    if ($("#tabledeveloperDel tr").length == 0) {
        $("#tabledeveloperDel").empty();
        $('#tabledeveloperDel').append('<tr style="color:black; background-color:honeydew"><th class="text-center">TEAM</th><th style="display:none;" class="text-center">MemberId</th><th class="text-center">Member</th><th style="display:none;" class="text-center">TeamId</th><th class="text-center">REMOVE</th></tr>');
    }


    for (i = 0; i < valData.length - 1; i++) {
        var valData1 = valData[i].split('^');

        $('#tabledeveloperDel').append('<tbody><tr>' +

            '<td class="text-center">' + valData1[0] + '</td>' +
            '<td class="text-center" style="display:none;">' + valData1[1] + '</td>' +
            '<td class="text-center">' + valData1[2] + '</td>' +
            '<td class="text-center" style="display:none;">' + valData1[3] + '</td>' +
            '<td class="text-center"><a href="javascript:void(0);" class="remove"  id="remrow"><span class="glyphicon glyphicon-trash">Remove</span></a></td></tr></tbody>');
    }

    $("#txtEmpCode1").val('');



}

function DeveloperCategory() {

    
    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "team_module_dev.aspx/getData",
        data: "{pageVal:'TEAMMODULE',pageval1 :'Category',pageval2:''}",
        dataType: "json",
        success: function (Result) {
            Result = Result.d;
            $('#Category').append($("<option selected disabled></option>").val("-1").html("Select Category"));
            $.each(Result, function (key, value) {
                $('#Category').append($("<option></option>").val(value.id).html(value.name));
            });
        }
    });
} 

function ConfirmDeldev() {

    var ItemDtls = "";
    if ($("#tabledeveloperDel tr").length == 0 || $("#tabledeveloperDel tr").length == 1) {
        Swal.fire("Please complete properly....!!!!");
        return false;
    }
    
    else {
        var table = document.getElementById('tabledeveloperDel');
      
        var rowLength = table.rows.length;
        for (var i = 1; i < rowLength; i++) {
            ItemDtls = ItemDtls + table.rows[i].cells[1].innerHTML + '^' + table.rows[i].cells[3].innerHTML + '$';

        }
        $.ajax({
            type: "post",
            contentType: "application/json; charset=utf-8",
            url: "team_module_dev.aspx/Confirm",
            data: "{pageVal:'TEAMMODULE',pageval1 :'DEVELOPERDEL',pageval2 :'" + ItemDtls + "'}",
            dataType: "json",
            success: function (Result) {
                Result = Result.d;
                Swal.fire(Result);
                window.open('team_module_dev.aspx', '_self');

            }
        });
    }
}

function ConfirmNotedev() {
    var ItemDtls = "";
    if ($("#tabledeveloperData tr").length == 0 || $("#tabledeveloperData tr").length == 1) {
        Swal.fire("Add Any Item....!!!!");
        return false;
    }
    else {
        var table = document.getElementById('tabledeveloperData');

        var rowLength = table.rows.length;

        for (var i = 1; i < rowLength; i++) {

            ItemDtls = ItemDtls + table.rows[i].cells[1].innerHTML + '^' + table.rows[i].cells[4].innerHTML + '^' + table.rows[i].cells[5].innerHTML  + '$';

        }

        $.ajax({
            type: "post",
            contentType: "application/json; charset=utf-8",
            url: "team_module_dev.aspx/Confirm",
            data: "{pageVal:'TEAMMODULE',pageval1 :'DEVELOPERADD',pageval2 :'" + ItemDtls + "'}",
            dataType: "json",
            success: function (Result) {
                Result = Result.d;
                Swal.fire(Result);
                window.open('team_module_dev.aspx', '_self');

            }
        });
    }
}

function subcrfonchange() {
    
    $("#dd_subcrf").empty();
    setTimeout(function () {
   
        var crf = $("#txtmodule").val();
       
        $.ajax({
            type: "post",
            contentType: "application/json; charset=utf-8",
            url: "team_module_dev.aspx/getData",
            data: "{pageVal:'TEAMMODULE',pageval1 :'SUBCRF',pageval2:'" + crf + "'}",
            dataType: "json",
            success: function (Result) {
                Result = Result.d;
                $('#dd_subcrf').append($("<option selected></option>").val("-1").html("Select Sub CRF"));
                $.each(Result, function (key, value) {
                    $('#dd_subcrf').append($("<option></option>").val(value.id).html(value.name));
                });
            }
        });

    }, 1000);
}

function gettechleaddatatabl(crf) {
    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "team_module_dev.aspx/getTableData",
        data: "{pageVal:'TEAMMODULE',pageval1 :'CRFTECHLEAD',pageval2:'" + crf + "'}",
        dataType: "json",
        success: function (Result) {
            Result = Result.d;
            fillTLTable(Result);
        }
    });
}

function fillTLTable(data) {
    $("#tabChange").empty();
    var valData, valData1;
    valData = data.split('Θ');

    if ($("#tabChange tr").length == 0) {
        $("#tabChange").empty();
        $('#tabChange').append('<tr style="color:black; background-color:honeydew""><th class="text-center">RequestId</th><th class="text-center">TechLead</th><th class="text-center">TechLeadName</th></tr>');
    }
    //var sno = $('#tableData tr').length;
    for (i = 0; i < valData.length - 1; i++) {
        valData1 = valData[i].split('µ');

        $('#tabChange').append('<tbody><tr class="text-center" style="background-color:linen" >' +


            '<td>' + valData1[0] + '</td>' +
            '<td>' + valData1[1] + '</td>' +
            '<td>' + valData1[2] + '</td></tr > </tbody > ');


    }

}
function getDevelopdatatabl(crf) {
    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "team_module_dev.aspx/getTableData",
        data: "{pageVal:'TEAMMODULE',pageval1 :'CRFDEVELOPER',pageval2:'" + crf + "'}",
        dataType: "json",
        success: function (Result) {
            Result = Result.d;
            fillDPTable(Result);
        }
    });
}

function fillDPTable(data) {
    $("#tabChange").empty();
    var valData, valData1;
    valData = data.split('Θ');

    if ($("#tabChange tr").length == 0) {
        $("#tabChange").empty();
        $('#tabChange').append('<tr style="color:black; background-color:honeydew"><th class="text-center">RequestId</th><th class="text-center">Developer</th><th class="text-center">Name</th><th class="text-center">StartDate</th><th class="text-center">EndDate</th></tr>');
    }
    //var sno = $('#tableData tr').length;
    for (i = 0; i < valData.length - 1; i++) {
        valData1 = valData[i].split('µ');

        $('#tabChange').append('<tbody><tr class="text-center" style="background-color:linen" >' +


            '<td>' + valData1[0] + '</td>' +
            '<td>' + valData1[1] + '</td>' +
            '<td>' + valData1[2] + '</td>' +
            '<td>' + valData1[3] + '</td>' +
            '<td>' + valData1[4] + '</td></tr > </tbody > ');


    }

}

function ConfirmNotetech() {

    setTimeout(function () {
        var rdbtn, radValtl = '';
        radValtl = $("input[name='rbTlDl']:checked").val();
        

        if (radValtl == "rbnewtldl") {
            rdbtn = "1";
        } else if (radValtl == "rbremov") {
            rdbtn = "2";
        } else if (radValtl == "rbchange") {
            rdbtn = "3";
        } else {
            Swal.fire("Select Change!!!");

            return false;
        }
        
        var usr = $("[id*=hdUserId]").val();
        var remark = $("#txtRemarks").val();
        var crf = $("#txtmodule").val();
        var tech = $("#tecLeads").val();
        var subcrf = $("#dd_subcrf").val();
        

        if (crf.trim().length == 0) {
            Swal.fire("Please Enter Select CRF...!!!");
            return false;
        }
        if (rdbtn == 1 || rdbtn == 3) {
            if (tech.trim().length == 0) {
                Swal.fire("Please Enter Tech Lead...!!!");
                return false;
            }
        }
        if (rdbtn == 2 || rdbtn == 3) {
            if (subcrf.trim().length == '-1') {
                Swal.fire("Please Select SubCRF...!!!");
                return false;
            }
        }
        if (remark.trim().length == 0) {
            Swal.fire("Please Enter Remark...!!!");
            return false;
        }
        input = crf + "^" + tech + "^" + subcrf + "^" + usr + "^" + remark + "^" + rdbtn;
        //alert(input);
        $.ajax({
            type: "post",
            contentType: "application/json; charset=utf-8",
            url: "team_module_dev.aspx/Confirm",
            data: "{pageVal:'TEAMMODULE',pageval1 :'CONFIRMTECH',pageval2:'" + input + "'}",
            dataType: "json",
            success: function (Result) {
                Result = Result.d;
                Swal.fire(Result); 
                window.open('team_module_dev.aspx','_self');
            }
        });

    }, 1000);

}

function getdevelplist(){
    var crf = $("#txtmodule").val() + "µ" + $("#dd_subcrf").val();
    $("#dd_develp").empty();
    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "team_module_dev.aspx/getData",
        data: "{pageVal:'TEAMMODULE',pageval1 :'DEVELOPERLIST',pageval2:'" + crf + "'}",
        dataType: "json",
        success: function (Result) {
            Result = Result.d;
            $('#dd_develp').append($("<option selected></option>").val("-1").html("Choose already assigned developer.!"));
            $.each(Result, function (key, value) {
                $('#dd_develp').append($("<option></option>").val(value.id).html(value.name));
            });
        }
    });





}

function ConfirmCRFdevloper() {

    setTimeout(function () {
        var rdbtn, radValtl = '', remark='',usr=0, dev=0, devselct=0, start_dt='', end_dt='', subcrf=0;
        radValtl = $("input[name='rbTlDl']:checked").val();


        

        usr = $("[id*=hdUserId]").val();
        if ($("#txtRemarks2").val().trim() != "") remark = $("#txtRemarks2").val();
        else if ($("#txtRemarks1").val().trim() != "") remark = $("#txtRemarks1").val();
        crf = $("#txtmodule").val();
        if ($("#txtdev").val() != '-1') dev = $("#txtdev").val();
        else if ($("#dd_develp").val() != '-1') dev = $("#dd_develp").val();
        dev = $("#txtdev").val();
        devselct = $("#dd_develp").val();
         start_dt = $("#lblstaDt").val();
         end_dt = $("#lblTarDt").val();
         subcrf = $("#dd_subcrf").val();

        if (radValtl == "rbnewtldl") {
            rdbtn = "1";
        } else if (radValtl == "rbremov") {
            rdbtn = "2";
        } else if (radValtl == "rbchange") {
            rdbtn = "3";
        } else {
            Swal.fire("Select Change!!!");

            return false;
        }
        if (crf.trim().length == 0) {
            Swal.fire("Please Enter Select CRF...!!!");
            return false;
        }
        if (rdbtn == 1 || rdbtn == 3) {
            if (dev.trim().length == 0) {
                Swal.fire("Please Enter DEveloper...!!!");
                return false;
            }
        }
        if (rdbtn == 2 || rdbtn == 3) {
            if (subcrf.trim().length == '-1') {
                Swal.fire("Please Select SubCRF...!!!");
                return false;
            }
        }
        
       
        if (remark.trim().length == 0) {
            Swal.fire("Please Enter Remark...!!!");
            return false;
        }

        var data = "";
        var table = document.getElementById('tabChanged');
        var rowLength = table.rows.length;
        if (rowLength < 2) {
            Swal.fire("Please fill TA properly..!!!");
            return false;
        }
        for (var i = 1; i < rowLength; i += 1) {
            var row = table.rows[i];
            var cellLength = row.cells.length;
            for (var y = 0; y < cellLength - 1; y += 1) {
                var cell = row.cells[y];
                data = data + cell.innerText + '^';
            }
            data = data + '¶';
        }
        var devWork = $("#DevWork").val();
        var TWork = $("#TWork").val();
        var data1 = devWork + "^" + TWork;
        //alert(data);
        //alert(data1);

        input = crf + "^" + dev + "^" + subcrf + "^" + usr + "^" + remark + "^" + start_dt + "^" + end_dt + "^" + devselct + "^" + rdbtn + "^" + devWork + "^"; 
        input = input + "$$" + data;
        //alert(input);
        //return false;
        $.ajax({
            type: "post",
            contentType: "application/json; charset=utf-8",
            url: "team_module_dev.aspx/Confirm",
            data: "{pageVal:'TEAMMODULE',pageval1 :'CONFIRMDEV',pageval2:'" + input + "'}",
            dataType: "json",
            success: function (Result) {
                Result = Result.d;
                Swal.fire(Result);
                window.open('team_module_dev.aspx','_self');
            }
        });

    }, 1000);

}
function fillCRFDetails() {
    $('#txtmodule').empty();
    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "team_module_dev.aspx/getData",
        data: "{pageVal:'TEAMMODULE',pageval1 :'GETCRFDATA',pageval2:''}",
        dataType: "json",
        success: function (Result) {
            Result = Result.d;
            $('#txtmodule').append($("<option selected></option>").val("-1").html("Choose CRF.."));
            $.each(Result, function (key, value) {
                $('#txtmodule').append($("<option></option>").val(value.id).html(value.name));
            });
        }
    });
} 
function fillTLDetails() {
    $('#tecLeads').empty();
    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "team_module_dev.aspx/getData",
        data: "{pageVal:'TEAMMODULE',pageval1 :'GETTECH',pageval2:''}",
        dataType: "json",
        success: function (Result) {
            Result = Result.d;
            $('#tecLeads').append($("<option selected></option>").val("-1").html("Choose tech leads"));
            $.each(Result, function (key, value) {
                $('#tecLeads').append($("<option></option>").val(value.id).html(value.name));
            });
        }
    });
}
function fillDvlr() {
    $('#txtdev').empty();
    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "team_module_dev.aspx/getData",
        data: "{pageVal:'TEAMMODULE',pageval1 :'GETDEVLO',pageval2:''}",
        dataType: "json",
        success: function (Result) {
            Result = Result.d;
            $('#txtdev').append($("<option selected></option>").val("-1").html("Choose Developer"));
            $.each(Result, function (key, value) {
                $('#txtdev').append($("<option></option>").val(value.id).html(value.name));
            });
        }
    });
}
function GetChangeList() {
    $('#ddlChange').empty();
    var CRFID1 = $("#txtmodule").val();

    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "TechnicalAnalysis.aspx/getFillData",
        data: "{pageVal:'IT_CHANGES', pageval1 :'" + CRFID1 + "'}",
        dataType: "json",
        success: function (Result) {
            Result = Result.d;
            $('#ddlChange').append($("<option selected disabled></option>").val("-1").html("Choose Changes"));
            $.each(Result, function (key, value) {
                $('#ddlChange').append($("<option></option>").val(value.id).html(value.name));
            });
        }
    });
}
function GetWorkList() {
    var chid = $("#ddlChange").val();
    $('#ddlWork').empty();
    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "TechnicalAnalysis.aspx/getFillData",
        data: "{pageVal:'WORKLIST', pageval1 :'" + chid + "'}",
        dataType: "json",
        success: function (Result) {
            Result = Result.d;
            $('#ddlWork').append($("<option selected disabled></option>").val("-1").html("Choose Related Work"));
            $.each(Result, function (key, value) {
                $('#ddlWork').append($("<option></option>").val(value.id).html(value.name));
            });
        }
    });
}
function CalTotal() {


    if ($("#txtdev").val() == '-1') {
        Swal.fire("Choose a developer.!");
        $("#txtdev").focus();
        return false;
    }

    if ($("#lblstaDt").val() != "") {
        var frmDateCom = $("#lblstaDt").val();
        var newFrmDate = Date.parse(frmDateCom);

    }
    else {
        Swal.fire("Choose Start Date.!")
        $("#lblstaDt").focus();
        return false;
    }

    if ($("#lblTarDt").val() != "") {
        var ToDateCom = $("#lblTarDt").val();
        var NewToDate = Date.parse(ToDateCom);
    }
    else {
        Swal.fire("Choose End Date.!")
        $("#lblTarDt").focus();
        return false;
    }
    var dateDifference = NewToDate - newFrmDate;
    if (dateDifference < 0) {
        Swal.fire("Choose End Date greater than Start Date.!");
        $("#lblstaDt").val("");
        $("#lblTarDt").focus();
        return false;
    }





    if ($("#ddlChange").val() == -1 || $("#ddlChange").val() == null) {
        Swal.fire("Select Changes !!!");
        $("#ddlChange").focus();
        return false;
    }

    if ($("#ddlWork").val() == -1 || $("#ddlWork").val() == null) {
        Swal.fire("Select Related Work  !!!");
        $("#ddlWork").focus();
        return false;
    }
    if ($("#TNoc").val() == "" || $("#TNoc").val() == '0') {
        Swal.fire("Enter No Of  Changes!!!");
        $("#TNoc").focus();
        return false;
    }
    var chid = $("#ddlWork").val();
   
    var wrk = chid.split('^');
    var data1, totm = 0, totc = 0, cst, wrkhr, noc, data = "", totman = 0, totcst = 0, tstval, tstrslt, totdev = 0, tottst = 0, totcod = 0, totvapt = 0;
    totdev = $("[id*=hddev]").val();
    totcst = $("[id*=hdcst]").val();
    tstval = $("[id*=hdtest]").val();
    data1 = $("[id*=hddata]").val();
    tstrslt = tstval.split('^');
    noc = $("#TNoc").val();
    wrkhr = wrk[1];
    cst = wrk[2];
    totm = noc * wrkhr;

    data = $('#ddlChange option:selected').text() + "^" + $('#ddlWork option:selected').text() + "^" + $("#TNoc").val() + "^" + totm + "^" + $('#txtdev option:selected').text() + "^" + $("#lblstaDt").val() + "^" + $("#lblTarDt").val() + "^" + $('#ddlChange').val() + "^" + $('#ddlWork').val() + "^" + $('#txtdev').val() + "¶";
    data1 = data1 + data;
    $("[id*=hddata]").val(data1);


    filltab(data);

    totdev = parseInt(totdev) + parseInt(totm);
    prevTotalTA($("#dd_subcrf").val());
    var prevTA = $("[id*=hdCrv]").val();
    //alert(prevTA);
  
    totcod = totcod+parseInt(prevTA);
    //alert(totcod);
    //alert(totman);
    totman = parseFloat(totdev) + parseFloat(totcod);
    //alert(totman);
    $("#DevWork").val(totdev);
   // $("#TstWrk").val(tottst);
   
    $("#TWork").val(totman);
    $("[id*=hddev]").val(totdev);
    $("[id*=hdman]").val(totman);

    $("#TNoc").val("");

}
function prevTotalTA(reqid) {
    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "team_module_dev.aspx/Confirm",
        data: "{pageVal:'PrevTATH', pageval1 :'" + reqid + "',pageval2:''}",
        dataType: "json",
        async: false,
        success: function (Result) {
            Result = Result.d;
            
            $("#CodWork").val(Result);
            $("[id*=hdCrv]").val(Result);
        }
    });
}




function filltab(data) {
    var valData, valData1, gstno, n = 1;
    valData = data.split('¶');
    //alert(valData);
    if ($("#tabChanged tr").length == 0) {
        $("#tabChanged").empty();
        $('#tabChanged').append('<tr style="color:black; background-color:honeydew" class="text-left"><th class="text-left">change</th><th class="text-left">Work</th><th class="text-left">Number</th><th class="text-left">Manpower</th><th class="text-left">Developer</th><th class="text-left">StartDt</th><th class="text-left">EndDt</th><th class="text-left">DELETE</th></tr>');
    }
    //var sno = $('#tableData tr').length;
    for (i = 0; i < valData.length - 1; i++) {
        valData1 = valData[i].split('^');

        $('#tabChanged').append('<tbody><tr>' +

            '<td>' + valData1[0] + '</td>' +
            '<td>' + valData1[1] + '</td>' +
            '<td>' + valData1[2] + '</td>' +
            '<td>' + valData1[3] + '</td>' +
            '<td>' + valData1[4].split('-')[1] + '</td>' +
            '<td>' + valData1[5] + '</td>' +
            '<td>' + valData1[6] + '</td>' +
           
            '<td style="display:none">' + valData1[7] + '</td>' +
            '<td style="display:none">' + valData1[8] + '</td>' +
            '<td style="display:none">' + valData1[9] + '</td>' +
            //'<td style="display:none">' + valData1[11] + '</td>' +
         
            '<td><a href="javascript:void(0);" class="remove"  id="remrow"><span class="glyphicon glyphicon-trash">Remove</span></a></td></tr > </tbody > ');
    }

}
$(document).on('click', '.remove', function () {

    $(this).closest('tr').remove();
    dirRemovefromHidden();
    return false;
});

function dirRemovefromHidden() {
    var data = "";

    var table = document.getElementById('tabChanged');

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

    calTotdtl(data);
}
function calTotdtl(data) {

    var valData, valData1, cst = 2500, totman = 0, totcst = 0, tstval, tstrslt, totdev = 0, tottst = 0, totcod = 0, totvapt = 0;

    valData = data.split('¶');
    for (i = 0; i < valData.length - 1; i++) {
        valData1 = valData[i].split('^');
        //alert(valData[i]);
        totdev = parseInt(totdev) + parseInt(valData1[3]);
    }

    totman = parseInt(totdev) +parseInt( $("[id*=hdCrv]").val());

    $("#DevWork").val(totdev);

    $("#CodWork").val($("[id*=hdCrv]").val());

    $("#TWork").val(totman);

    $("[id*=hddev]").val(totdev);
    $("[id*=hdman]").val(totman);

}