$(window).on('load', function () {
    //alert('sdfgh');
   
    $("[id*=hdnPriority]").val("3");
    $("[id*=hdnErrorReportImpact]").val("2");

  
    
    loadyear();
    loadmonth();
  
    isNumberKey(evt);
   

    //GetReqTypeList();
    //getModule();

});


function frmExit() {
    var a = $('#ddlDevlp').val();
    alert(a);
   // window.open("index.aspx", "_self");
}


function loadyear() {
    //alert('type');
    //debugger;

    var indata = 1;

    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "Fmr_Returns_view.aspx/getfinyear",
        data: "{pageVal:'Fmr_year', pageval1 :''}",
        dataType: "json",
        success: function (Result) {
            Result = Result.d;
         
            //$('#ddlType').append($("<option selected disabled></option>").val("-1").html("Select Type "));
            $.each(Result, function (key, value) {
                //alert(value.name);
                $('#ddlyear').append($("<option></option>").val(value.id).html(value.name));
            });
        }
    });
}

function loadmonth() {

    var indata = 1;

    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "Fmr_Returns_view.aspx/getmonth",
        data: "{pageVal:'Fmr_month', pageval1 :''}",
        dataType: "json",
        success: function (Result) {
            Result = Result.d;

            //$('#ddlcategory').append($("<option selected disabled></option>").val("-1").html("Select Category "));
            $.each(Result, function (key, value) {
                
                $('#ddlMonth').append($("<option></option>").val(value.id).html(value.name));
            });
        }
    });
}

function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode != 46 && charCode > 31
        && (charCode < 48 || charCode > 57))
        return false;

    return true;
}


function getDataTableHeader() {
    //alert('hii');
    // Make an Ajax call to the server.
    year = $("#ddlyear option:selected").val();
    month = $("#ddlMonth option:selected").val();
    Fraudid = $("#ddlfmr option:selected").val();

    if (year == '-1') {
        Swal.fire({
            type: 'warning',
            title: 'Oops...!',
            text: "SELECT YEAR !!",
            icon: "warning",
            button: "Ok!",
        });
        return false;
    }
    else if (month == '-1') {
        Swal.fire({
            type: 'warning',
            title: 'Oops...!',
            text: "SELECT MONTH !!",
            icon: "warning",
            button: "Ok!",
        });
        return false;
    }
    else if (Fraudid == '-1') {
        Swal.fire({
            type: 'warning',
            title: 'Oops...!',
            text: "SELECT FMR !!",
            icon: "warning",
            button: "Ok!",
        });
        return false;
    }
    else {



        document.getElementById("Loading").style.display = "block";
        var usr_id = $("[id*=hdUserId]").val();

        var data = year + '~' + month + '~' + Fraudid;
        //alert(data);




        $("#table-report").html("");


        $.ajax({
            type: "post",
            contentType: "application/json; charset=utf-8",
            url: "Fmr_Returns_view.aspx/getFillTable",
            data: "{pageVal:'get_fmr_dtls', pageval1 :'" + data + "'}",

            success: function (response) {
                //alert('hiii');
                //debugger;
                response = response.d;
                // Get the table header from the response.
                document.getElementById("Loading").style.display = "none";
                //document.getElementById("tbl-content").style.display = 'block';


                // $("#table-report").html(response.d);
                document.getElementById("table-report").innerHTML = response;



            }
        });
    }
}


function searchTable() {
    // Get the input value

    var input = document.getElementById("searchInput").value.toLowerCase();



    // Get the table and table rows
    var table = document.getElementById("table-report");
    var rows = table.getElementsByTagName("tr");
    var count = 0;
    // Loop through all table rows except the first one (i.e., the table head),
    // and hide those that do not match the search query
    for (var i = 1; i < rows.length; i++) {



        var cells = rows[i].getElementsByTagName("td");
        var found = false;
        for (var j = 0; j < cells.length; j++) {
            var cellText = cells[j].textContent.toLowerCase();
            if (cellText.indexOf(input) > -1) {
                found = true;
                break;
            }


        }
        if (found) {
            rows[i].style.display = "";
            count++;

        } else {
            rows[i].style.display = "none";
        }


    }

    if (input.length == 0) {
        $('#RowCount').hide();
    }
    else {
        $('#RowCount').show();
        $('#RowCount').text(count + ' Rows Selected');
    }



}








function excelreport() {
    //alert('hihii');
    //debugger;
    var tab_text = "<table border='2px'><tr bgcolor='#87AFC6'>";
    var textRange; var j = 0;
    tab = document.getElementById('table-report');

    for (j = 0; j < tab.rows.length; j++) {

        tab_text = tab_text + tab.rows[j].innerHTML + "</tr>";
        tab_text = tab_text + "</tr>";
    }




    tab_text = tab_text + "</table>";
    tab_text = tab_text.replace(/<A[^>]*>|<\/A>/g, "");
    tab_text = tab_text.replace(/<img[^>]*>/gi, "");
    tab_text = tab_text.replace(/<input[^>]*>|<\/input>/gi, "");




    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");



    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
        txtArea1.document.open("txt/html", "replace");
        txtArea1.document.write(tab_text);
        txtArea1.document.close();
        txtArea1.focus();
        sa = txtArea1.document.execCommand("SaveAs", true, "FMR_Filing_report.xls");
    }
    else {


        var link = document.createElement("a");
        link.setAttribute("href", "data:application/vnd.ms-excel," + encodeURIComponent(tab_text));
        link.setAttribute("download", 'FMR_Filing_report.xls');
        link.style.display = "none";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

    }

    return (sa);



}


//doc_view//

function Doc_view(slno, flg) {
    //alert('hiii');
    //debugger;


    var QueryString = flg;

    var srno = slno;



    $.ajax({
        type: "POST",
        url: "Fmr_Returns_view.aspx/imageview",
        data: "{QueryString:'" + QueryString + "', data:'" + srno + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Result) {
            //alert('123');
            //debugger;
            Result=Result.d

            //alert(Result);

            var status = Result.split("^")[0];
            var filename = Result.split("^")[1];

            if (status == "0") {

                alert("Document not uploaded!");
                return false;
            }
            else {

                OpenDialogue(filename)
            }

        }

    });


}




function OpenDialogue(FileName) {

    var myUrl = "../Images/" + FileName;
    // var myUrl = "RBITRACKER/Images/" + FileName;

    OpenDialog(myUrl, 875, 650, function (termsOfServiceAccepted) {

        if (termsOfServiceAccepted) {

            $.ajax({
                type: "POST",
                url: "Fmr_Returns_view.aspx/deleteDownloadFile",
                contentType: "application/json; charset=utf-8",
                data: "{input: '" + FileName + "'}",
                dataType: "json",

                success: function (Result) {

                    var GetResult = Result.d
                },
                error: function (Result) {
                }
            });

        }
    });



}

function OpenDialog(url, width, height, callback) {

    var win = window.open(url, "Loanverification", height, "menubar=0,toolbar=0", "_blank");
    var timer = setInterval(function () {

        if (win.closed) {
            clearInterval(timer);
            var returnValue = true;
            callback(returnValue);
        }
    }, 10);
}







