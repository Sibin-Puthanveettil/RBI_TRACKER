$(window).on('load', function () {
    $("[id*=hdData]").val('');
    var usr = $("[id*=hdUserId]").val();
    $.ajax({
        type: "post",

        contentType: "application/json; charset=utf-8",
        url: "crbrequest.aspx/getEditDataFxd",
        data: "{pageVal:'CRBREQUEST', pageval1:'" + usr +"',pageval2:''}",
        dataType: "json",
        success: function (Result) {
            if (Result.d != "") {

                valData = Result.d;
                $("[id*=hdData]").val(valData); 
                fillFxdTableDtl(valData);
            } else if (Result.d == "") {
                // $('#lblfixdtab').html('Recieve Other items');
                // $("#fiexedtab").hide();
                $("#othritm").show();
                $('[href="#fiexedtab"]').closest('li').hide();
                // $(this).parent().addClass("active");
            }
        },
        error: function (Result) {

           
        }
    });
});
function fillFxdTableDtl(data) {
 
    var valData, valData1, i, j;
    var n = 1;
    valData = data.split('§');
   
    if ($("#tableData tr").length == 0) {
        $("#tableData").empty();
       
        $('#tableData').append('<tr style="background-color:grey;color:black"><th class="text-center">SLNo.</th><th class="text-center">CRF Id</th><th class="text-center">RequestId</th><th class="text-center">Project Name</th><th class="text-center">Developer</th><th class="text-center">Tech Lead</th> <th class="text-center">Tester</th><th class="text-center">Code Review</th><th class="text-center">DB Release</th><th class="text-center">Down Time</th><th class="text-center">Parent Apps</th><th class="text-center">Maximo SR</th><th class="align-center">Select<input type="checkbox" data-toggle="collapse" data-target="#cheq" id="chkSelectAll" onchange="selectAll()"/></th></tr>');
    }
    //var sno = $('#tableData tr').length;
    for (i = 0; i < valData.length - 1; i++) {
       
        valData1 = valData[i].split('^');
       
                           $('#tableData').append('<tbody><tr>' +
             
                        '<td>' + parseInt(n) + '</td>' +
                        '<td>' + valData1[0] + '</td>' +
                        '<td>' + valData1[1] + '</td>' +
                        '<td>' + valData1[2] + '</td>' +
                        '<td>' + valData1[3] + '</td>' +
                        '<td>' + valData1[4] + '</td>' +
                        '<td>' + valData1[5] + '</td>' +
                               
                               '<td><table><tr><td><label>Yes</label><input  id="rbnyes' + (i + 1) + '" type="radio" name="rbncode' + (i + 1) + '" /></td><td> <label>No</label><input  id="rbnno' + (i + 1) + '" type="radio" name="rbncode' + (i + 1) + '" class="text-right" /></td></tr></table></td>' +
                               '<td><table><tr><td><label>Yes</label><input  id="rbnyes1' + (i + 1) + '" type="radio" name="rbncode1' + (i + 1) + '" /></td><td> <label>No</label><input  id="rbnno1' + (i + 1) + '" type="radio" name="rbncode1' + (i + 1) + '" class="text-right" /></td></tr></table></td>' +
                               '<td><table><tr><td><label>Yes</label><input  id="rbnyes2' + (i + 1) + '" type="radio" name="rbncode2' + (i + 1) + '"  /></td><td> <label>No</label><input  id="rbnno2' + (i + 1) + '" type="radio" name="rbncode2' + (i + 1) + '" class="text-right" /></td></tr></table></td>' +
                               '<td><input  placeholder="Parent Apps" id="parent' + (i + 1) + '" type="parent"  onkeyup="$(this).val($(this).val().toUpperCase())" /></td>' +
                               '<td><input  placeholder="Maximo SR" id="maxsr' + (i + 1) + '" type="text"  onkeyup="$(this).val($(this).val().toUpperCase())" /></td>' +
                               '<td><input class="form-control input-sm align-right "  id="chkSelect' + parseInt(i + 1) + '"  name="Paymnt" type="checkbox"/></td></tr > </tbody > ' );

        n = n + 1;
 
    }
  
}
function frmExit() {
    window.open("index.aspx", "_self");

}
function selectAll() {
    var data;
    data = $("[id*=hdData]").val();
    
    valData = data.split('§');
    for (i = 1; i < valData.length; i++) {
        
        $('#chkSelect' + i).prop('checked', $('#chkSelectAll').prop('checked'));
    }
    
}
function confirmdata() {
    var RtnType, RtnVal, RtnType1, RtnVal1, RtnType2, RtnVal2, deldtl='',draftno,reqid;
    var usr = $("[id*=hdUserId]").val();
    var table = document.getElementById('tableData');
    for (i = 1; i < $("#tableData tr").length; i++) {
        
        if ($('[id*=chkSelect' + i + ']:checked').val()) {
            draftno = table.rows[i].cells[1].innerText;
            reqid = table.rows[i].cells[2].innerText;
            if ($('#rbnyes' + i).prop("checked")) {
                RtnType = 1;
                RtnVal = 'Y';
            }
            else if ($('#rbnno' + i).prop("checked")) {
                RtnType = 2;
                RtnVal = 'N';
            }
            else {
                RtnType = 0;
                RtnVal = '';
            } 

            if ($('#rbnyes1' + i).prop("checked")) {
                RtnType1 = 1;
                RtnVal1 = 'Y';
            }
            else if ($('#rbnno1' + i).prop("checked")) {
                RtnType1 = 2;
                RtnVal1 = 'N';
            }
            else {
                RtnType1 = 0;
                RtnVal1 = '';
            }

            if ($('#rbnyes2' + i).prop("checked")) {
                RtnType2 = 1;
                RtnVal2 = 'Y';
            }
            else if ($('#rbnno2' + i).prop("checked")) {
                RtnType2 = 2;
                RtnVal2 = 'N';
            }
            else {
                RtnType2 = 0;
                RtnVal2 = '';
            }


            if ($('#parent' + i).val() == "") {
                alert('Please Parent Apps!!!');
                return false;
            }
            if ($('#maxsr' + i).val() == "") {
                alert('Please Enter Maximo SR!!!');
                return false;
            }

            deldtl = deldtl + draftno + 'µ' + reqid + 'µ' + RtnVal + 'µ' + RtnVal1 + 'µ' + RtnVal2 + 'µ' + $('#parent' + i).val() + 'µ' + $('#maxsr' + i).val()+ '§';

           
        }
    } 
    $("[id*=hdData]").val(deldtl);
    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "crbrequest.aspx/CRBRequestConfirm",
        data: "{pageVal:'CRBCONFIRM', pageval1 :'REQUESTCONFIRM',pageval2:'" +deldtl+ "',pageval3:'" + usr+"'}",
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
                    window.open('crbrequest.aspx?crfid=1', '_self');
                }
            }).then((result) => {
                if (
                    // Read more about handling dismissals
                    result.dismiss === Swal.DismissReason.timer
                ) {
                    window.open('crbrequest.aspx?crfid=1', '_self');
                }
            })

        }
    });


}

//function confirmdata(sid, uqId, rqid) {
   
//    var act = $("[id*=hdAct]").val();
//    var usr = $("[id*=hdUserId]").val();
   
   
//    var myTab = document.getElementById('tableData');
//    var deldtl = "", data = "";
//    var row = myTab.rows[sid];
//    var cellLength = row.cells.length;
    
//    var RtnVal;
//    if ($('#rbnyes' + sid).prop("checked")) {
//        RtnType = 1;
//        RtnVal = 'Y';
//    }
//    else if ($('#rbnno' + sid).prop("checked")) {
//        RtnType = 2;
//        RtnVal = 'N';
//    }
//    else {
//        RtnType = 0;
//        RtnVal = '';
//    }
  
//    var RtnType1;
//    var RtnVal1;

//    if ($('#rbnyes1' + sid).prop("checked")) {
//        RtnType1 = 1;
//        RtnVal1 = 'Y';
//    }
//    else if ($('#rbnno1' + sid).prop("checked")) {
//        RtnType1 = 2;
//        RtnVal1 = 'N';
//    }
//    else {
//        RtnType1 = 0;
//        RtnVal1 = '';
//    }
//    var RtnType2;
//    var RtnVal2;
   
//    if ($('#rbnyes2' + sid).prop("checked")) {
//        RtnType2 = 1;
//        RtnVal2 = 'Y';
//    }
//    else if ($('#rbnno2' + sid).prop("checked")) {
//        RtnType2 = 2;
//        RtnVal2 = 'N';
//    }
//    else {
//        RtnType2 = 0;
//        RtnVal2 = '';
//    }

   
//    if ($('#parent' + uqId).val() == "") {
//        alert('Please Parent Apps!!!');
//        return false;
//    }
//    if ($('#maxsr' + uqId).val() == "") {
//        alert('Please Enter Maximo SR!!!');
//        return false;
//    }

//    deldtl = uqId + 'µ' + rqid + 'µ' + RtnVal + 'µ' + RtnVal1 + 'µ' + RtnVal2 + 'µ' + $('#parent' + sid).val() + 'µ' + $('#maxsr' + sid).val() + 'µ' + usr + 'µ';

//    alert(deldtl);
    
//    $.ajax({
//        type: "post",
//        contentType: "application/json; charset=utf-8",
//        url: "crbrequest.aspx/Confirm",
//        data: "{pageVal:'CRBCONFIRM', pageval1:'" + deldtl + "'}",
//        dataType: "json",
      
//          });


//}



