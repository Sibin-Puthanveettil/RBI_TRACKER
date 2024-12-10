$(window).on('load', function () {
    //$(".loader").show();
    $(".loaderColor").show();
    //getFundDetails();   
   // getFundDtlAlert();
    //loadbasicpieChart();
    //$(".loader").fadeOut();        
    $(".loaderColor").fadeOut();
   // setInterval("my_function();", 5000);
   
});
function my_function() {
    //$('#refresh').load(location.href + ' #jotime');
    //$(".loader").show();
    $(".loaderColor").show();
    getFundDetails();
    getFundDtlAlert();
    loadbasicpieChart();
    //$(".loader").fadeOut();
    $(".loaderColor").fadeOut();
}
$(function () {
    // Resize chart on menu width change and window resize
    $(window).on('resize', resize);
    $(".sidebartoggler").on('click', resize);

    // Resize function
    function resize() {
        setTimeout(function () {

            // Resize chart
            basicpieChart.resize();
        }, 200);
    }
});
$(".tabledtl tr").click(function () {
    window.location = "LoanAvailment.aspx";
});

function getFundDetails() {
    $("#tblFundDetails").show();
    var InputString = "";
    var Querystring = "getFundDetails";
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "index.aspx/getTableData",
        data: "{typ:'" + Querystring + "', val1:'" + InputString + "',data:''}",
        dataType: "json",
        success: function (Result) {
            if (Result.d.length > 0) {
                Result = Result.d;
                funddtlfilltable(Result);
                
            }
        },
        error: function (Result) {
            alert(Result);
        }
    });
}

function funddtlfilltable(data) {
    $("#tblFundDtlHead").empty();
    $("#tblFundDetails").empty();
    var valData, valData1, valStat, valPer, valWidth, valPercent,valAvailed,valRow;
    var n = 0;
    valData = data.split('Θ');
    if ($("#tblFundDtlHead tr").length == 0) {
        //$('#tblFundDetails').append('<thead class="bg-success text-white"><tr><th scope="col">Fund Type</th><th scope="col">Financial Institution</th><th scope="col">Fund ID</th><th scope="col">Loan ID</th><th scope="col">Loan Amount</th><th scope="col">Interest Rate</th><th scope="col">Tenure</th><th scope="col">Loan Date</th><th scope="col">Maturity Date</th><th scope="col">Repayment Date</th></tr></thead>');
        //$('#tblFundDtlHead').append('<thead class="bg-primary text-white vh-10"><tr><th scope="col">FI Name</th><th scope="col">Fund Name</th><th scope="col">Loan Limit</th><th scope="col">Loan Balance</th><th scope="col">Status</th></tr></thead>');
        $('#tblFundDtlHead').append('<thead class="bg-primary text-white vh-10"><tr><th scope="col" class="col-3">FI Name</th><th scope="col" class="col-3">Fund Name</th><th scope="col" class="col-2">Status</th><th scope="col" class="col-4">Availed Percentage</th></tr></thead>');
    }
    $('#tblFundDetails').append('<tbody class="tabledtl">');
    for (i = 0; i < valData.length - 1; i++) {
        valData1 = valData[i].split('µ');
        if (valData1[4] == 1) { valStat = "<div class='foo bg-info' data-toggle='tooltip' data-placement='auto' title='Live'></div>"; valRow = "<tr class='d-flex table-success'>"}
        if (valData1[4] == -1) { valStat = "<div class='foo bg-green' data-toggle='tooltip' data-placement='auto' title='Not Approved'></div>"; valRow = "<tr class='d-flex table-info'>" }
        if (valData1[4] == 9) { valStat = "<div class='foo bg-warning' data-toggle='tooltip' data-placement='auto' title='Rejected'></div>"; valRow = "<tr class='d-flex table-danger'>" }
        if (valData1[4] == 0) { valStat = "<div class='foo bg-danger' data-toggle='tooltip' data-placement='auto' title='Settled'></div>"; valRow = "<tr class='d-flex table-danger'>" }
 
        valPercent = valData1[6];
        valAvailed = "Loan Limit-" + valData1[2] + " Loan Balance-" + valData1[3];
        if (valPercent < 40) {valPer = "<div class='progress1' data-toggle='tooltip' data-placement='auto' title='" + valAvailed + "'><div class='progress-bar1 progress-bar-success progress-bar-striped active' role ='progressbar' aria-valuenow='" + valPercent + "' aria-valuemin='0' aria-valuemax='100' style='width:" + valPercent + "%'>" + valPercent + "%</div></div>";}
        if (valPercent >= 40 && valPercent < 60) { valPer = "<div class='progress1' data-toggle='tooltip' data-placement='auto' title='" + valAvailed + "'><div class='progress-bar1 progress-bar-info progress-bar-striped active' role ='progressbar' aria-valuenow='" + valPercent + "' aria-valuemin='0' aria-valuemax='100' style='width:" + valPercent + "%'>" + valPercent + "%</div></div>"; }
        if (valPercent >= 60 && valPercent < 80) { valPer = "<div class='progress1' data-toggle='tooltip' data-placement='auto' title='" + valAvailed + "'><div class='progress-bar1 progress-bar-warning progress-bar-striped active' role ='progressbar' aria-valuenow='" + valPercent + "' aria-valuemin='0' aria-valuemax='100' style='width:" + valPercent + "%'>" + valPercent + "%</div></div>"; }
        if (valPercent > 80) { valPer = "<div class='progress1' data-toggle='tooltip' data-placement='auto' title='" + valAvailed + "'><div class='progress-bar1 progress-bar-danger progress-bar-striped active' role ='progressbar' aria-valuenow='" + valPercent + "' aria-valuemin='0' aria-valuemax='100' style='width:" + valPercent + "%'>" + valPercent + "%</div></div>"; }

        $('#tblFundDetails').append(valRow +
            //'<td class="col-3"><a href="LoanAvailment.aspx">' + valData1[0] + '</a></td>' +
            '<td class="col-3">' + valData1[0] + '</td>' +
            '<td class="col-3">' + valData1[1] + '</td>' +
            //'<td>' + valData1[2] + '</td>' +
            //'<td>' + valData1[3] + '</td>' +
            '<td class="col-2">' + valStat + '</td>' +
            '<td class="col-4">' + valPer + '</td>' +
            //'<td>' + valData1[6] + '</td>' +
            //'<td>' + valData1[7] + '</td>' +
            //'<td>' + valData1[8] + '</td>' +
            //'<td>' + valData1[9] + '</td>' +
            '</tr>');
    }
    $('#tblFundDetails').append('</tbody>');
}

function getFundDtlAlert() {
    $("#tblFundDtlAlert").show();
    var InputString = "";
    var Querystring = "getEmiDetailsAlert";
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "index.aspx/getTableData",
        data: "{typ:'" + Querystring + "', val1:'" + InputString + "',data:''}",
        dataType: "json",
        success: function (Result) {
            if (Result.d.length > 0) {
                Result = Result.d;
                //funddtlAlertfilltable(Result);
                //funddtlAlertfilllist(Result);
            }
        },
        error: function (Result) {
            alert(Result);
        }
    });
}
function funddtlAlertfilllist(data) {
    var li = $('<li class="feed-item"/>').appendTo('#lstAlert');

}
function funddtlAlertfilltable(data) {
    $("#tblFundDtlAlert").empty();
    var valData, valData1, valStat;
    var n = 0;
    valData = data.split('Θ');
    if ($("#tblFundDtlAlert tr").length == 0) {
       // $('#tblFundDtlAlert').append('<thead><tr><th scope="col">FI Name</th><th scope="col">Fund Name</th><th scope="col">Loan Limit</th><th scope="col">Loan Balance</th><th scope="col">Status</th></tr></thead>');
    }
    $('#tblFundDtlAlert').append('<tbody>');
    for (i = 0; i < valData.length - 1; i++) {
        valData1 = valData[i].split('µ');
        //if (valData1[4] == 1) { valStat = "<div class='foo bg-info'></div>" }
        //if (valData1[4] == -1) { valStat = "<div class='foo bg-green'></div>" }
        //if (valData1[4] == 9) { valStat = "<div class='foo bg-warning'></div>" }
        //if (valData1[4] == 0) { valStat = "<div class='foo bg-danger'></div>" }
        $('#tblFundDtlAlert').append('<tr>' +
            '<td><div class="flashit"><div class="alert-icon bg-danger"><i class="far fa-bell"></i></div></div></td>' +
            '<td><a href="LoanRePayment.aspx">' + valData1[0] + '</a></td>' +
            //'<td><div class="flashit">' + valData1[1] + '</div></td>' +
            '<td><span class="badge badge-pill badge-danger float-right">' + valData1[1] + '</span></td>' +
            //'<td>' + valData1[3] + '</td>' +
            //'<td>' + valStat + '</td>' +
            //'<td>' + valData1[6] + '</td>' +
            //'<td>' + valData1[7] + '</td>' +
            //'<td>' + valData1[8] + '</td>' +
            //'<td>' + valData1[9] + '</td>' +LoanAvailment.aspx
            '</tr> </tbody>');
    }
    $('#tblFundDtlAlert').append('</tbody>');
}

function loadbasicpieChart() {
    var QueryString = "SELINTRESTTYPE";
    var Option = "";
    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "index.aspx/pieChart1",
        data: "{typ:'', val1 :''}",
        dataType: "json",
        success: function (Result) {
            Result = Result.d;
            Option = Result;
            //alert(Option);
            //"use strict";
            //var basicpieChart = echarts.init(document.getElementById('basic-pie1'));
            //basicpieChart.setOption(Option);

            basicpieChart1(Option);
            //AreaChart(Option);
            //MorrisChart(Option);
        }
    });
}
function basicpieChart1(Option) {
    "use strict";
    var basicpieChart = echarts.init(document.getElementById('basic-pie1'));
    basicpieChart.setOption(Option);
}

//$(document).ready(function () {

//    var mousePos = {};

//    function getRandomInt(min, max) {
//        return Math.round(Math.random() * (max - min + 1)) + min;
//    }

//    $(window).mousemove(function (e) {
//        mousePos.x = e.pageX;
//        mousePos.y = e.pageY;
//    });

//    $(window).mouseleave(function (e) {
//        mousePos.x = -1;
//        mousePos.y = -1;
//    });

//    var draw = setInterval(function () {
//        if (mousePos.x > 0 && mousePos.y > 0) {

//            var range = 0.2;

//            var color = "background: rgb(" + getRandomInt(0, 255) + "," + getRandomInt(0, 255) + "," + getRandomInt(0, 255) + ");";

//            var sizeInt = getRandomInt(5, 15);
//            size = "height: " + sizeInt + "px; width: " + sizeInt + "px;";

//            var left = "left: " + getRandomInt(mousePos.x - range - sizeInt, mousePos.x + range) + "px;";

//            var top = "top: " + getRandomInt(mousePos.y - range - sizeInt, mousePos.y + range) + "px;";

//            var style = left + top + color + size;
//            $("<div class='ball' style='" + style + "'></div>").appendTo('#wrap').one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function () { $(this).remove(); });
//        }
//    }, 1);
//});