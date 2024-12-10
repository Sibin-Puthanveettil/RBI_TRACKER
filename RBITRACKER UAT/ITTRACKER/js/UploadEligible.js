
/// **** Window on load  ********

$(window).on('load', function () {
    //$("#inputGroupFile04").val('');
    //document.getElementById("inputGroupFileAddon04").disabled = true;
    //getAccess();
    alert('eligible');
});


function ViewData() {
    var inputGroupFile04 = document.getElementById("inputGroupFile04");
    var regex = /^([a-zA-Z0-9\s_\\.\-:()])+(.csv|.txt)$/;
    if (regex.test(inputGroupFile04.value.toLowerCase())) {
        if (typeof FileReader != "undefined") {
            var reader = new FileReader();
            reader.onload = function (e) {
                var table = document.getElementById("table");
                var rows = e.target.result.split("\n");
                for (var i = 0; i < rows.length; i++) {
                    var cells = rows[i].split(",");

                    if (cells.length > 1) {
                        var row = table.insertRow(-1);
                        for (var j = 0; j < cells.length; j++) {
                            var cell = row.insertCell(-1);
                            cell.innerHTML = cells[j];
                            $("#shwtable").show();

                        }
                    }
                }

                var table = document.getElementById('table');
                var rowLength = table.rows.length;
                if (rowLength == 0) {
                    alert("Uploaded file is empty...! Browse a vaild file...!!!");
                    document.getElementById("btnConf").disabled = true;
                    $("#inputGroupFile04").val('');
                    return false;
                }

                var dvCSV = document.getElementById("dvCSV");
                dvCSV.innerHTML = "";
                dvCSV.appendChild(table);
                window.scrollTo(0, document.body.scrollHeight);
            };
            reader.readAsText(inputGroupFile04.files[0]);

        } else {
            alert("This browser does not support HTML5.");
        }
    } else {
        alert("Please upload a valid CSV file.")

    }
    $("#inputGroupFileAddon04").prop('disabled', true);


}

function frmExit() {
    window.location = "Index.aspx";
}

function start() {
    alert('start');
}

var rslt = ""

function UploadFiles() {
    alert('ghjkl');
    var caseData = '';
    var table = document.getElementById('tbldata');
    var uid = $("[id*=hdvUserID]").val();
    if (table == null) {
        alert("Please select a file");

    }
    else if ((table.rows.length - 1) < 1) {
        alert("Please select a Valid file");
    }
     else
    {
    var rowLength = table.rows.length - 1;
    document.getElementById("btnConf").disabled = true;
    var CaseD1 = "";
    var count = Math.ceil(rowLength / 45);
    var arrCase = [];
    var m = 0;
    var n = 1;
    var k = "";
    for (var i = 0; i < count; i++) {
        for (var j = n; j <= rowLength; j++) {
            var dval = table.rows[j].cells[2].innerHTML;
            alert(dval);
            new Date1((dval - (25567 + 1)) * 86400 * 1000);
            //var date1 = Date;
            alert(Date1);
            alert('hello');
            CaseD1 = CaseD1 + table.rows[j].cells[0].innerHTML + '~' + table.rows[j].cells[1].innerHTML + '~' + table.rows[j].cells[2].innerHTML + '~' + table.rows[j].cells[3].innerHTML + '~' + table.rows[j].cells[4].innerHTML + '~' + table.rows[j].cells[5].innerHTML + '~' + table.rows[j].cells[6].innerHTML + '~' + table.rows[j].cells[7].innerHTML + '~' + table.rows[j].cells[8].innerHTML + '~' + table.rows[j].cells[9].innerHTML + '~' + table.rows[j].cells[10].innerHTML + '~' + table.rows[j].cells[11].innerHTML + '~' + table.rows[j].cells[7].innerHTML + '~' + table.rows[j].cells[12].innerHTML + '~' + table.rows[j].cells[13].innerHTML + '~' + table.rows[j].cells[14].innerHTML + '~' + table.rows[j].cells[15].innerHTML + '*';
             //alert(CaseD1);
            if (j % 45 == 0) {
                break;
            }
        }
        n = j + 1;

        if (m < count) {
            arrCase[m] = CaseD1;
        }
        CaseD1 = "";
        m = m + 1;
    }

    for ( k = 0; k < count; k++) {
        SaveData(arrCase[k], k, count, rowLength);
       }
    }
}
function SaveData(DataVal, k, count, rowLength) {
    alert('kkkkkk');
    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "Existing_Data_Upload.aspx/Confirm",
        data: "{typ:'insert',val :'" + DataVal + "', val1 : '', val2: ''}",
        dataType: "json",
        success: function (Result) {
            Result = Result.d;
  
            if (Result == '111' && k == count - 1) {
                alert(rowLength + " " +" Rows Uploaded Successfully");
                window.location = "UploadEligibleCustomer.aspx";
                rslt = Result;
            }            
        }
    });

}


function ClearData() {
    document.getElementById("inputGroupFileAddon04").disabled = false;
    $("#inputGroupFile04").change(function () {
        document.getElementById("inputGroupFileAddon04").disabled = false;
        $("#table").empty();
        $("#table").last().css("border", "none");
        document.getElementById("btnConf").disabled = true;
    });
}

//function getAccess() {
//    var uid = $("[id*=hdvUserID]").val();
//    $.ajax({
//        type: "post",
//        contentType: "application/json; charset=utf-8",
//        url: "UploadEligibleCustomer.aspx/GetAccess",
//        data: "{typ:'Check_Access',val :'" + uid + "', val1 : '', val2: ''}",
//        dataType: "json",
//        success: function (Result) {
//            Result = Result.d;
//            if (Result == '777') {
//                alert("You are not authorise to view this page");
//                window.open("../Index/Index.aspx", "_self");
//            }
//        }
//    });
//}




