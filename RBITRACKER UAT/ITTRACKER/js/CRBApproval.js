$(window).on('load', function () {
   
    var act = $("[id*=hdAct]").val();
    var usr1 = $("[id*=hdUserId]").val();
    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "CRBApproval.aspx/ctoselection",
        data: "{ typ:'CTOSELECTION'}",
        dataType: "json",

        success: function (Result) {

            if (Result.d != "") {

                valData1 = Result.d;
              
               Approverecommend(usr1,valData1);
            } 
           
        },
      
    });
    });
function Approverecommend(usr1,valData1) {
    
        if (usr1 == valData1) {
    
   
        $("#approve").show();
        $("#recommend").hide();

        $.ajax({
            type: "post",
            contentType: "application/json; charset=utf-8",
            url: "CRBApproval.aspx/GetData1",
            data: "{ val:'" + usr1 + "'}",
            dataType: "json",

            success: function (Result) {

                if (Result.d != "") {

                    valData = Result.d;

                    fillFxdTableDtl1(valData);
                } else if (Result.d == "") {

                    $("#othritm").show();
                    $('[href="#fiexedtab"]').closest('li').hide();

                }
            },
            error: function (Result) {


            }
        });
    }
    else {
          
        $("#approve").hide();
        $("#recommend").show();

        $.ajax({
            type: "post",
            contentType: "application/json; charset=utf-8",
            url: "CRBApproval.aspx/GetData",
            data: "{ val:'" + usr1 + "'}",
            dataType: "json",

            success: function (Result) {

                if (Result.d != "") {

                    valData = Result.d;

                    fillFxdTableDtl(valData);
                } else if (Result.d == "") {

                    $("#othritm").show();
                    $('[href="#fiexedtab"]').closest('li').hide();

                }
            },
            error: function (Result) {


            }
        });
    }
       


  
}
function fillFxdTableDtl(data) {

    var valData, valData1, i, j;
    var n = 1;
    $("[id*=hdData]").val(data);
    valData = data.split('§');
 
    if ($("#tableData tr").length == 0) {
        $("#tableData").empty();

        $('#tableData').append('<tr style="background-color:grey;color:black"><th class="text-center">CRF ID</th><th class="text-center">Request Id</th><th class="text-center">Subject</th><th class="text-center">Developer</th><th class="text-center">Parent Apps</th><th class="text-center">SR No</th><th class="text-center">Code Review</th><th class="text-center">DB Release</th><th class="text-center">Down Time</th><th class="align-center">Select<input type="checkbox" data-toggle="collapse" data-target="#cheq" id="chkSelectAll" onchange="selectAll()"/></th></tr>');
    }
    //var sno = $('#tableData tr').length;
    for (i = 0; i < valData.length - 1; i++) {

        valData1 = valData[i].split('^');

        $('#tableData').append('<tbody><tr>' +

            
            '<td class="text-center">' + valData1[0] + '</td>' +
            '<td class="text-center">' + valData1[1] + '</td>' +
            '<td class="text-center">' + valData1[2] + '</td>' +
            '<td class="text-center">' + valData1[3] + '</td>' +
            '<td class="text-center">' + valData1[4] + '</td>' +
            '<td class="text-center">' + valData1[5] + '</td>' +
            '<td class="text-center">' + valData1[6] + '</td>' +
            '<td class="text-center">' + valData1[7] + '</td>' +
            '<td class="text-center">' + valData1[8] + '</td>' +
            '<td><input class="form-control input-sm align-right "  id="chkSelect' + parseInt(i + 1) + '"  name="Paymnt" type="checkbox"/></td></tr > </tbody > ');

        n = n + 1;

    }

}
function selectAll() {
    var data;
    data = $("[id*=hdData]").val();

    valData = data.split('§');
    for (i = 1; i < valData.length; i++) {

        $('#chkSelect' + i).prop('checked', $('#chkSelectAll').prop('checked'));
    }

}
function frmExit() {
    window.open("index.aspx", "_self");

}
function Recommend() {
    var deldtl = '', draftno, reqid;

    
 
    var usr = $("[id*=hdUserId]").val();
    var table = document.getElementById('tableData');
    for (i = 1; i < $("#tableData tr").length; i++) {

        if ($('[id*=chkSelect' + i + ']:checked').val()) {
            draftno = table.rows[i].cells[0].innerText;
            reqid = table.rows[i].cells[1].innerText;
            deldtl = deldtl + draftno + 'µ' + reqid + '§';
        }
    }
    
    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "CRBApproval.aspx/CRBRecommendation",
        data: "{pageVal:'CRBCONFIRM', pageval1 :'RECOMMENDCONFIRM',pageval2:'" + deldtl + "',pageval3:'" + usr + "'}",
        dataType: "json",
        async: false,
        success: function (Result) {
            $('.block-ui').addClass('clear');
            Result = Result.d;
            var noteid = Result;
            if (noteid.includes("µ")) {
                var msg = noteid.split("µ");
                var stat = msg[0];
                var content = msg[1];
                if (stat == "9") {
                    dangerAlert(content, 5000);
                    return false;
                }
            }


            let timerInterval
            Swal.fire({
                width: 400,
                type: 'success',
                title: 'Success!',
                html: "Success!! ",
                //showConfirmButton: false,
                allowOutsideClick: false,
                timer: 10000,
                onBeforeOpen: () => {
                    //Swal.showLoading()
                    timerInterval = setInterval(() => {
                        Swal.getContent().querySelector('strong')
                            .textContent = Swal.getTimerLeft()
                    }, 100)
                },
                onClose: () => {
                    clearInterval(timerInterval)
                    window.open('CRBApproval.aspx?crfid=1', '_self');
                }
            }).then((result) => {
                if (
                    // Read more about handling dismissals
                    result.dismiss === Swal.DismissReason.timer
                ) {
                    window.open('CRBApproval.aspx?crfid=1', '_self');
                }
            })

        }
    });
}
function Approve() {

    var deldtl = '', draftno, reqid;



    var usr = $("[id*=hdUserId]").val();
    var table = document.getElementById('tableData');
    for (i = 1; i < $("#tableData tr").length; i++) {

        if ($('[id*=chkSelect' + i + ']:checked').val()) {
            draftno = table.rows[i].cells[0].innerText;
            reqid = table.rows[i].cells[1].innerText;
            deldtl = deldtl + draftno + 'µ' + reqid + '§';
        }
    }

    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "CRBApproval.aspx/CRBRequestApproval",
        data: "{pageVal:'CRBCONFIRM', pageval1 :'CRBAPPROVECONFIRM',pageval2:'" + deldtl + "',pageval3:'" + usr + "'}",
        dataType: "json",
        async: false,
        success: function (Result) {
            $('.block-ui').addClass('clear');
            Result = Result.d;
            var noteid = Result;
            if (noteid.includes("µ")) {
                var msg = noteid.split("µ");
                var stat = msg[0];
                var content = msg[1];
                if (stat == "9") {
                    dangerAlert(content, 5000);
                    return false;
                }
            }


            let timerInterval
            Swal.fire({
                width: 400,
                type: 'success',
                title: 'Success!',
                html: "Success!! ",
                //showConfirmButton: false,
                allowOutsideClick: false,
                timer: 10000,
                onBeforeOpen: () => {
                    //Swal.showLoading()
                    timerInterval = setInterval(() => {
                        Swal.getContent().querySelector('strong')
                            .textContent = Swal.getTimerLeft()
                    }, 100)
                },
                onClose: () => {
                    clearInterval(timerInterval)
                    window.open('CRBApproval.aspx?crfid=1', '_self');
                }
            }).then((result) => {
                if (
                    // Read more about handling dismissals
                    result.dismiss === Swal.DismissReason.timer
                ) {
                    window.open('CRBApproval.aspx?crfid=1', '_self');
                }
            })

        }
    });
}
function fillFxdTableDtl1(data) {

    var valData, valData1, i, j;
    var n = 1;
    valData = data.split('§');

    if ($("#tableData tr").length == 0) {
        $("#tableData").empty();

        $('#tableData').append('<tr style="background-color:grey;color:black"><th class="text-center">CRF ID</th><th class="text-center">Request Id</th><th class="text-center">Subject</th><th class="text-center">Developer</th><th class="text-center">Parent Apps</th><th class="text-center">SR No</th><th class="text-center">Code Review</th><th class="text-center">DB Release</th><th class="text-center">Down Time</th><th class="align-center">Select<input type="checkbox" data-toggle="collapse" data-target="#cheq" id="chkSelectAll" onchange="selectAll()"/></th></tr>');
    }
    //var sno = $('#tableData tr').length;
    for (i = 0; i < valData.length - 1; i++) {

        valData1 = valData[i].split('^');

        $('#tableData').append('<tbody><tr>' +

            
            '<td class="text-center">' + valData1[0] + '</td>' +
            '<td class="text-center">' + valData1[1] + '</td>' +
            '<td class="text-center">' + valData1[2] + '</td>' +
            '<td class="text-center">' + valData1[3] + '</td>' +
            '<td class="text-center">' + valData1[4] + '</td>' +
            '<td class="text-center">' + valData1[5] + '</td>' +
            '<td class="text-center">' + valData1[6] + '</td>' +
            '<td class="text-center">' + valData1[7] + '</td>' +
            '<td class="text-center">' + valData1[8] + '</td>' +
            '<td><input class="form-control input-sm align-right "  id="chkSelect' + parseInt(i + 1) + '"  name="Paymnt" type="checkbox"/></td></tr > </tbody > ');


        n = n + 1;

    }

}