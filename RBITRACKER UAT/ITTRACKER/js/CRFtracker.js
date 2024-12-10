

function frmExit() {
    window.open("index.aspx", "_self");
}


function GetCRFDetails() {
    setTimeout(function () {
        req = $('[id*=hdnCRFID]').val();
   
    
    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "CRFtracker.aspx/getTableData",
        data: "{pageVal:'TACompleteData', pageval1 :'" + req + "', pageval2:''}",
        dataType: "json",
        success: function (Result) {
            Result = Result.d;
            fillTATable(Result);
        }
        });
    }, 1000);
}

function fillTATable(data) {
   
    var valData, valData1;
    valData = data.split('Θ');

    if ($("#tabChange tr").length == 0) {
        $("#tabChange").empty();
        $('#tabChange').append('<tr style="background-color:rosybrown;color:black;"><th colspan="10" class="text-center">Technical Analysis Completed Details</th></tr>');
        $('#tabChange').append('<tr style="background-color:rosybrown;color:black"><th class="text-center">RequestId</th><th class="text-center">TechLead</th><th class="text-center">Developer</th><th class="text-center">StartDate</th><th class="text-center">EndDate</th><th class="text-center">Phase</th><th class="text-center">TechChanges</th><th class="text-center">Description</th><th class="text-center">NoOfChanges</th><th class="text-center">TotalHours</th></tr>');
    }
    //var sno = $('#tableData tr').length;
    for (i = 0; i < valData.length - 1; i++) {
        valData1 = valData[i].split('µ');

        $('#tabChange').append('<tbody><tr class="text-center" style="background-color:linen" >' +


            '<td>' + valData1[0] + '</td>' +
            '<td>' + valData1[1] + '</td>' +
            '<td>' + valData1[2] + '</td>' +
            '<td>' + valData1[3] + '</td>' +
            '<td>' + valData1[4] + '</td>' +
            '<td>' + valData1[5] + '</td>' +
            '<td>' + valData1[6] + '</td>' +
            '<td>' + valData1[7] + '</td>' +
            '<td>' + valData1[8] + '</td>' +
            '<td>' + valData1[9] + '</td></tr > </tbody > ');


    }

}



function ConfirmNote() {
    
    setTimeout(function () {
       
        var crfid = $('[id*=hdnCRFID]').val();
       
        var date = $("#txt_date").val();
      
        var reason = $("#txtreason").val();
       
        var user = $("[id*=hdUserId]").val();
      
        data = crfid + "^" + date + "^" + reason + "^" + user;

        $.ajax({
            type: "post",
            contentType: "application/json; charset=utf-8",
            url: "CRFtracker.aspx/Confirm",
            data: "{pageVal:'TRACKER_UPDATE', pageval1 :'DATEREVISION', pageval2:'" + data + "'}",
            dataType: "json",
            success: function (Result) {
                Result = Result.d;
                alert("Success!!!");
                window.open("CRFtracker.aspx", "_self");
            }
        });

    }, 1000);

}
