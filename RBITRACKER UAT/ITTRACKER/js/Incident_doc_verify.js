var ExcelFileName = $('#Heading').text();

$(window).on('load', function () {

    //alert('1234');
    //debugger;

    $("#ddlfrmdt").datepicker({
        dateFormat: 'dd/MM/yy',
        maxDate: new Date(),
        changeMonth: true,
        changeYear: true,
        stepMonths: true,
        todayHighlight: true,
        onSelect: function (dateText, inst) {
        }

    });

    $("#ddltodt").datepicker({
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



});




function load_incident() {
    //alert('type');
    //debugger;
    //const element = document.getElementById("ddlincident");
    //element.innerHTML = "";






    if ($('#ddlfrmdt').val() == "") {

        Swal.fire({
            type: 'warning',
            title: 'Oops...!',
            text: "Please Choose From date !!",
            icon: "warning",
            button: "Ok!",
        });

        $('#ddlfrmdt').focus();

        return false;
    }


    else if ($('#ddltodt').val() == "") {

        Swal.fire({
            type: 'warning',
            title: 'Oops...!',
            text: "Please Choose To date !!",
            icon: "warning",
            button: "Ok!",
        });

        $('#ddltodt').focus();

        return false;
    }
    else {


        var data = $('#ddlfrmdt').val() + '~' + $('#ddltodt').val();
        var indata = 1;

        $.ajax({
            type: "post",
            contentType: "application/json; charset=utf-8",
            url: "Incident_doc_verify.aspx/getFillData",
            data: "{pageVal:'Get_fraud_upd_list', pageval1 :'" + data + "'}",
            dataType: "json",
            success: function (Result) {
                Result = Result.d;
                if (Result == "") {
                    Swal.fire({
                        type: 'warning',
                        title: 'Oops...!',
                        text: "No Fraud Found in this dates",
                        icon: "warning",
                        button: "Ok!",
                    });
                    return false;
                }
                $("#table-report").html("");

                $("#ddlincident").empty();

                $('#ddlincident').append($("<option selected disabled></option>").val("-1").html("Select Fraud "));
                $.each(Result, function (key, value) {
                    //alert(value.name);
                    $('#ddlincident').append($("<option></option>").val(value.id).html(value.name));
                });
            }
        });
    }
}


function getDataTableHeader() {
    // Make an Ajax call to the server.
    Fraudid = $("#ddlincident option:selected").val();

    if (Fraudid == '-1') {
        Swal.fire({
            type: 'warning',
            title: 'Oops...!',
            text: "Please select fraud !!",
            icon: "warning",
            button: "Ok!",
        });
        return false;
    }

    document.getElementById("Loading").style.display = "block";
    var QueryString = "Load_dis_report";
    var usr_id = $("[id*=hdUserId]").val();






    $("#table-report").html("");


    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "Incident_doc_verify.aspx/getFillTable",
        data: "{pageVal:'Get_fraud_upd_dtls', pageval1 :'" + Fraudid +"'}",

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
        sa = txtArea1.document.execCommand("SaveAs", true, "Fraud_updation_report.xls");
    }
    else {


        var link = document.createElement("a");
        link.setAttribute("href", "data:application/vnd.ms-excel," + encodeURIComponent(tab_text));
        link.setAttribute("download",'Fraud_updation_report.xls');
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
    if (slno == "") {
        Swal.fire({
            type: 'warning',
            title: 'Oops...!',
            text: "No Document Found",
            icon: "warning",
            button: "Ok!",
        });
        return false;
    }

    var QueryString = flg;

    var srno = slno;



    $.ajax({
        type: "POST",
        url: "Incident_doc_verify.aspx/imageview",
        data: "{QueryString:'" + QueryString + "', data:'" + srno + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Result) {
          
            Res = Result.d;

            var status = Res.split("^")[0];
            var filename = Res.split("^")[1];

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
                url: "Incident_doc_verify.aspx/deleteDownloadFile",
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





function Verify_click(frd_id, slno,emp,sts,verfiy_sts,flg,mail_id) {
    //alert('123');
    //debugger;

    if (slno == "") {
        Swal.fire({
            type: 'warning',
            title: 'Oops...!',
            text: "Cannot verify without updating documents..!!",
            icon: "warning",
            button: "Ok!",
        });
        return false;
    }
    if ((verfiy_sts == 1) || (verfiy_sts == 5)) {
        Swal.fire({
            type: 'warning',
            title: 'Oops...!',
            text: "Already Uptated..!!",
            icon: "warning",
            button: "Ok!",
        });
        return false;
    }


    var Querrystring = flg;

    var usr_id = $("[id*=hdUserId]").val(); 
                                                                 //mail type
    data = usr_id + '~' + frd_id + '~' + slno + '~' + emp + '~' + sts + '~' + mail_id;


    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "Incident_doc_verify.aspx/Verify_fraud",
        data: "{typ : '" + Querrystring + "',input :'" + data + "'}",
        dataType: "json",

        success: function (Result) {
            Result = Result.d;
            //alert(Result);
            //debugger;
            if (Result == '111') {
                Swal.fire({
                    type: 'success',
                    title: 'success',
                    text: "Verified successfully",
                    icon: "success",
                   // timer: 1500,
                    showConfirmButton: true
                });
                getDataTableHeader();
            }

            else {
                Swal.fire({
                    type: 'warning',
                    title: 'Oops...!',
                    text: "Someting went Wrong !!!",
                    icon: "warning",
                    button: "Ok!",
                });
            }

        },

        error: function (Result) {

            Swal.fire({
                type: 'warning',
                title: 'Oops...!',
                text: "Someting went Wrong !!!",
                icon: "warning",
                button: "Ok!",
            });


        }


    });

}

function Reject_click(frd_id, slno, emp, sts, verfiy_sts, flg,mail_id) {
    //alert('123');
    //debugger;

    if (slno == "") {
        Swal.fire({
            type: 'warning',
            title: 'Oops...!',
            text: "Cannot reject without updating documents..!!",
            icon: "warning",
            button: "Ok!",
        });
        return false;
    }
    if ((verfiy_sts == 1) ||(verfiy_sts == 5)) {
        Swal.fire({
            type: 'warning',
            title: 'Oops...!',
            text: "Already Uptated..!!",
            icon: "warning",
            button: "Ok!",
        });
        return false;
    }


    var Querrystring = flg;

    var usr_id = $("[id*=hdUserId]").val();
         //verified_by                                                        
    data = usr_id + '~' + frd_id + '~' + slno + '~' + emp + '~' + sts + '~' + mail_id;


    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "Incident_doc_verify.aspx/Reject_fraud",
        data: "{typ : '" + Querrystring + "',input :'" + data + "'}",
        dataType: "json",

        success: function (Result) {
            Result = Result.d;
            //alert(Result);
            //debugger;
            if (Result == '111') {
                Swal.fire({
                    type: 'success',
                    title: 'success',
                    text: "Rejected successfully",
                    icon: "success",
                    
                    // timer: 1500,
                    showConfirmButton: true
                });
                SendMail(data);
                getDataTableHeader();
            }

            else {
                Swal.fire({
                    type: 'warning',
                    title: 'Oops...!',
                    text: "Someting went Wrong !!!",
                    icon: "warning",
                    button: "Ok!",
                });            }

        },

        error: function (Result) {

            Swal.fire({
                type: 'warning',
                title: 'Oops...!',
                text: "Someting went Wrong !!!",
                icon: "warning",
                button: "Ok!",
            });


        }


    });

}

function frmExit() {

    window.open("index.aspx", "_self");
}

function SendMail(data) {

    //alert('123');
    //debugger;

    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "Incident_doc_verify.aspx/MailDtlsLoad",
        data: "{typ:'ver_rej_maildtls', mdata :'" + data  + "'}",
        dataType: "json",
        async: false,

        success: function (Result) {

            Result = Result.d

            console.log(Result);


        },
        error: function (Result) {

            console.log(Result);
            return false;
        }
    });
}