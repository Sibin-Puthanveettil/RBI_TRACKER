$(window).on('load', function () {
   
    loaddata();
    
});

function loaddata() {
    //alert("load");
    var indata = 1;

    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "Excel_Reports.aspx/getFillData",
        data: "{pageVal:'Statusload', pageval1 :'', pageval2 :''}",
        dataType: "json",
        success: function (Result) {
            Result = Result.d;
            //$('#ddlDevlp').append($("<option></option>").val("-1").html("Choose Developer"));
            $.each(Result, function (key, value) {
                $('#ddldoc').append($("<option></option>").val(value.id).html(value.name));
                // $('#ddlDevlp1').append($("<option></option>").val(value.id).html(value.name));
            });
        }
    });
}

function frmExit() {
    window.open("index.aspx", "_self");
}




function viewreport(){
    var val = $("#ddldoc option:selected").val();

    if (val == 0) {
        var val1 = 0;
        var mid = 1600;
        window.location = "rbireports.aspx?mnuId=" + mid + "&val=" + val1 ;
    }
    else {
        var val1 = $("#ddldoc option:selected").val();
        var mid = 1601;
        window.location = "rbireports.aspx?mnuId=" + mid + "&val=" + val1 ;
    }
}

//function viewReport() {
//    alert('report');
//    var val = $("#ddldoc option:selected").val();
    

//    if (val == 0) {

//        var mid = $("#ddlDO option:selected").val();
//        alert(mid);

//        if (mid == -1) {
            
//            alert("select any do letter");
//        }
//        else if (mid == 0) {
//            var menuid = 0;
//            var mname = "totaldo";
//        }
//        else {
//            var menuid = 1600;
//            var mname = "doletter";
//        }
//        window.location = "rbireports.aspx?mnuId=" + mid + "&mnuName=" + mname  + "&menuId=" + menuid + "&frdt=" + $("#txt_frm").val();
//    }

//    if (val == 1) {

//        var mid = $("#ddlFMR option:selected").val();
//        alert(mid);

//        if (mid == -1) {

//            alert("select any FMR");
//        }
//        else if (mid == 0) {
//            var menuid = 0;
//            var mname = "totaldo";
//        }
//        else {
//            var menuid = 1601;
            
//            var mname = "doletter";
//        }
//        alert(menuid);
//        alert(mid);
//        window.location = "rbireports.aspx?mnuId=" + mid + "&mnuName=" + mname + "&menuId=" + menuid + "&frdt=" + $("#txt_frm").val();
//    }
//    else {
//        alert("select correct option");
//    }

   

//}