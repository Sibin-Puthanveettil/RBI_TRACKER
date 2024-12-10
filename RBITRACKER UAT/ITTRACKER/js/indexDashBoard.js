$(window).on('load', function () {
    //$(".loader").show();
    $("[id*=hdnNotifyCount]").val("0");
    $("[id*=hdnAlertCount]").val("0")
    $(".loaderColor").show();
    getNotification();
    getAlert();
    loadbasicpieChart();
    //$(".loader").fadeOut();        
    $(".loaderColor").fadeOut();    
     //setInterval("my_function();", 10000);
    my_function();
    
    //$('#graphDiv').hide();
    //$('#graphEmptyDiv').show();
});
function my_function() {
    //$('#refresh').load(location.href + ' #jotime');
    //$(".loader").show();
    
    $(".loaderColor").show();
    getNotification();
    getAlert();
    loadbasicpieChart();
    //$(".loader").fadeOut();
    $(".loaderColor").fadeOut();
}

function getNotification() {
    
   
    var Data = '';
    Data = $("[id*=hdBranchId]").val() + 'µ' + $("[id*=hdFirmId]").val() + 'µ' + $("[id*=hdUserId]").val()
   
    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "Index.aspx/getListPending",
        data: "{pageVal:'GetDashBoardNotification', pageval1 :'" + Data + "', pageval2 :''}",
        dataType: "json",
        success: function (Result) {
            Result = Result.d;
            var lenRow = Result.length;
            var notifyCount = $("[id*=hdnNotifyCount]").val();
            if (lenRow == 0) {
                $('#notifyDiv').hide();
                $('#notifyEmptyDiv').show();
            }
            else if (lenRow != notifyCount) {
                document.getElementById("notifyDiv").innerHTML = "";
                $('#notifyDiv').show();
                $('#notifyEmptyDiv').hide();
                var rowid = 0;
                var firstNote = '';           
               
                $.each(Result, function (key, value) {
                    var listOfNotify = value.lst;
                    var notifyList = listOfNotify.split('µ');
                    var listLength = notifyList.length;
                    //alert(notifyList[0]);
                    //a.note_id|| 'µ' ||c.subject|| 'µ' ||a.alert||'µ'||a.status||'µ'||trunc(months_between(SYSDATE,a.updated_date)/12)||'¥'||trunc(mod( months_between(SYSDATE,a.updated_date) ,12))||'¥'||trunc(SYSDATE - add_months( a.updated_date, months_between(SYSDATE,a.updated_date)))||'¥'||trunc(24*mod(SYSDATE - a.updated_date,1))||'¥'||trunc( mod(mod(SYSDATE - a.updated_date,1)*24,1)*60 )||'¥'||trunc(mod(mod(mod(SYSDATE - a.updated_date,1)*24,1)*60,1)*60)
                    var notifyDiv1 = document.createElement("div");

                    if (notifyList[3] == "Created") { notifyDiv1.className = "alert alert-requested"; }
                    else if (notifyList[3] == "Recommended") { notifyDiv1.className = "alert alert-recommend"; }
                    else if (notifyList[3] == "Not Recommended") { notifyDiv1.className = "alert alert-reject"; }
                    else if (notifyList[3] == "Rejected") { notifyDiv1.className = "alert alert-reject"; }
                    else { notifyDiv1.className = "alert alert-recommend"; }

                    //alert(notifyList[1]);
                    //notifyDiv1.className = "alert alert-recommend";
                    rowid = rowid + 1;
                    if (rowid == 1) {
                        firstNote = notifyList[0];                        
                        //notifyDiv1.addClass('clearfix');
                    }
                    notifyDiv1.setAttribute('id', 'dival' + notifyList[0]);
                    notifyDiv1.onclick = function () { /*ContentFill(approveList[0]);alert(notifyList[0]);*/ var note = Encrypt(notifyList[0]); window.location = "ViewerNoteDetails.aspx?noteid=" + note; };

                    var notifySpan1 = document.createElement("div");
                    if (notifyList[3] == "Created") { notifySpan1.className = "alert-icon bg-info"; }
                    else if (notifyList[3] == "Recommended") { notifySpan1.className = "alert-icon bg-orange"; }
                    else if (notifyList[3] == "Not Recommended") { notifySpan1.className = "alert-icon bg-danger"; }
                    else if (notifyList[3] == "Rejected") { notifySpan1.className = "alert-icon bg-danger"; }
                    else { notifySpan1.className = "alert-icon bg-orange"; }
                    

                    var notifyI1 = document.createElement("i");
                    notifyI1.className = "far fa-bell";

                    var notifyDiv2 = document.createElement("div");
                    notifyDiv2.className = "notification-info";

                    var myList = document.createElement("ul");

                    // add a class name to list
                    myList.className = "clearfix notification-meta";

                    // create list item for every element 
                    var listItem = document.createElement("li");

                    listItem.className = "pull-left notification-sender";

                    var span1 = document.createElement("span");
                    var aItem1 = document.createElement("a");
                    aItem1.className = "head6 text-maroon";
                    aItem1.setAttribute('href', '#');
                    var aValue = document.createTextNode(notifyList[0]);
                    aItem1.appendChild(aValue);
                    span1.appendChild(aItem1);
                    listItem.appendChild(span1); 

                    var pItem2 = document.createElement("p");
                    var span2 = document.createElement("span");
                    span2.className = "head7 text-primary";
                    var spanValue2 = document.createTextNode(notifyList[1]);
                    span2.appendChild(spanValue2);
                    pItem2.appendChild(span2);
                    listItem.appendChild(pItem2); 

                    var pItem3 = document.createElement("p");
                    var pValue3 = document.createTextNode(notifyList[2]);
                    pItem3.appendChild(pValue3);
                    listItem.appendChild(pItem3);                        

                    myList.appendChild(listItem);
                    

                    var listItem1 = document.createElement("li");

                    listItem1.className = "pull-right notification-time";

                    var listValue1 = document.createTextNode("");
                    var splitTime;
                    splitTime = notifyList[4].split('¥');//5
                    if (splitTime[0] > 0) { listValue1 = document.createTextNode(splitTime[0] + " Years ago"); }
                    else if (splitTime[1] > 0) { listValue1 = document.createTextNode(splitTime[1] + " Months ago"); }
                    else if (splitTime[2] > 0) { listValue1 = document.createTextNode(splitTime[2] + " Days ago"); }
                    else if (splitTime[3] > 0) { listValue1 = document.createTextNode(splitTime[3] + " Hours ago"); }
                    else if (splitTime[4] > 0) { listValue1 = document.createTextNode(splitTime[4] + " Minutes ago"); }
                    else if (splitTime[5] > 0) { listValue1 = document.createTextNode(splitTime[5] + " Seconds ago"); }
                    listItem1.appendChild(listValue1);

                    myList.appendChild(listItem1);

                    notifyDiv2.appendChild(myList);
                    notifySpan1.appendChild(notifyI1);
                    notifyDiv1.appendChild(notifySpan1);

                    notifyDiv1.appendChild(notifyDiv2);
                    

                    document.getElementById("notifyDiv").appendChild(notifyDiv1);
                });
                $("[id*=hdnNotifyCount]").val(rowid);
            }



        },
        error: function (Result) {
        }
    });
}
function getAlert() {
   
    //$('#alertDiv').hide();
    //$('#alertEmptyDiv').show();
    var Data = '';
    Data = $("[id*=hdBranchId]").val() + 'µ' + $("[id*=hdFirmId]").val() + 'µ' + $("[id*=hdUserId]").val()
   
    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "Index.aspx/getListPending",
        data: "{pageVal:'GetDashBoardAlert', pageval1 :'" + Data + "', pageval2 :''}",
        dataType: "json",
        success: function (Result) {
            Result = Result.d;
            var lenRow = Result.length;
            var AlertCount = $("[id*=hdnAlertCount]").val();
            if (lenRow == 0) {
                $('#alertDiv').hide();
                $('#alertEmptyDiv').show();
            }
            else if (lenRow != AlertCount) {
                document.getElementById("alertDiv").innerHTML = "";
                $('#alertDiv').show();
                $('#alertEmptyDiv').hide();
                var rowid = 0;
                var firstNoteAlert = '';

                $.each(Result, function (key, value) {

                    var listOfAlert = value.lst;
                    var alertList = listOfAlert.split('µ');
                    var listLength = alertList.length;
                    //alert(notifyList[0]);
                    //substr(replace (translate (initcap (REGEXP_REPLACE(REGEXP_REPLACE(a.creater_name,'[.]',' '), '[^0-9A-Za-z .]', '')), ' abcdefghijklmnopqrstuvwxyz', ' '), ' '),1,2)||'µ'||a.note_id||'µ'||initcap (a.subject)||'µ'||a.priority||'µ'||trunc(months_between(SYSDATE,c.received_date)/12)||'¥'||trunc(mod( months_between(SYSDATE,c.received_date) ,12))||'¥'||trunc(SYSDATE - add_months( c.received_date, months_between(SYSDATE,c.received_date)))||'¥'||trunc(24*mod(SYSDATE - c.received_date,1))||'¥'||trunc( mod(mod(SYSDATE - c.received_date,1)*24,1)*60 )||'¥'||trunc(mod(mod(mod(SYSDATE - c.received_date,1)*24,1)*60,1)*60)
                    var alertDiv1 = document.createElement("div");
                    alertDiv1.className = "alert alert-pending";

                    rowid = rowid + 1;
                    if (rowid == 1) {
                        firstNoteAlert = alertList[1];
                    }
                    
                    alertDiv1.setAttribute('id', 'divalert' + alertList[1]);
                    alertDiv1.onclick = function ()
                    { /*ContentFill(approveList[0]);alert(alertList[1]); */
                        var note = Encrypt(alertList[1]);
                        
                        if (alertList[9] == "0") {
                            window.location = "CRFHODApprove.aspx?crfid=" + note;
                        }
                        else if (alertList[9] == "2") {
                            window.location = "pmoverification.aspx?crfid=" + note;
                        }
                        else if (alertList[9] == "5") {
                            window.location = "TechnicalAnalysis.aspx?crfid=" + note;
                        }
                        //else if (alertList[9] == "3") {
                        //    window.location = "CRFHODApprove.aspx?crfid=" + note;
                        //}
                        //else if (alertList[9] == "4") {
                        //    window.location = "CRFHODApprove.aspx?crfid=" + note;
                        //}
                        //else if (alertList[9] == "5") {
                        //    window.location = "CRFHODApprove.aspx?crfid=" + note;
                        //}
                        //else if (alertList[9] == "6") {
                        //    window.location = "CRFHODApprove.aspx?crfid=" + note;
                        //}
                        //else if (alertList[9] == "7") {
                        //    window.location = "CRFHODApprove.aspx?crfid=" + note;
                        //}
                        //else if (alertList[9] == "8") {
                        //    window.location = "CRFHODApprove.aspx?crfid=" + note;
                        //}
                        //else if (alertList[9] == "9") {
                        //    window.location = "CRFHODApprove.aspx?crfid=" + note;
                        //}
                        //else if (alertList[9] == "10") {
                        //    window.location = "CRFHODApprove.aspx?crfid=" + note;
                        //}
                        //else if (alertList[9] == "11") {
                        //    window.location = "CRFHODApprove.aspx?crfid=" + note;
                        //}
                        //else if (alertList[9] == "12") {
                        //    window.location = "CRFHODApprove.aspx?crfid=" + note;
                        //}
                    };
                    
                    var alertSpan1 = document.createElement("div");
                    alertSpan1.className = "ms-Persona-imageArea";
                    var aItem2 = document.createElement("div");
                    if (alertList[3] == 1) { aItem2.className = "ms-Persona-initials ms-Persona-initials--red"; }
                    else if (alertList[3] == 2) { aItem2.className = "ms-Persona-initials ms-Persona-initials--orange"; }
                    else if (alertList[3] == 3) { aItem2.className = "ms-Persona-initials ms-Persona-initials--yellow"; }

                    //aItem2.setAttribute('href', 'javascript:void(0)');
                    //var aValue2 = document.createTextNode(notifyList[0]);
                    //aItem2.appendChild(aValue2); 
                    aItem2.innerHTML = alertList[0];
                    alertSpan1.appendChild(aItem2); 

                    //alert(alertList[2]);

                    var alertDiv2 = document.createElement("div");
                    alertDiv2.className = "notification-info";

                    var myList = document.createElement("ul");

                    //// add a class name to list
                    myList.className = "clearfix notification-meta";

                    //// create list item for every element 
                    var listItem = document.createElement("li");

                    listItem.className = "pull-left notification-sender";

                    var span1 = document.createElement("span");
                    var aItem1 = document.createElement("a");
                    aItem1.className = "head6 text-maroon";
                    aItem1.setAttribute('href', '#');
                    var aValue = document.createTextNode(alertList[1]);
                    aItem1.appendChild(aValue);
                    span1.appendChild(aItem1);
                    listItem.appendChild(span1);

                    var pItem2 = document.createElement("p");
                    var span2 = document.createElement("span");
                    span2.className = "head7 text-primary";
                    var spanValue2 = document.createTextNode(alertList[2]);
                    span2.appendChild(spanValue2);
                    pItem2.appendChild(span2);
                    listItem.appendChild(pItem2);

                    var pItem3 = document.createElement("p");
                    var pVal = "";
                    
                   
                    if (alertList[9] == "0") {
                        pVal = "Pending for HOD Recommendation";
                    }
                    else if (alertList[9] == "2") {
                        pVal = "Pending for PMO Verification";
                    }
                    else if (alertList[9] == "5") {
                        pVal = "Pending for Technical Analysis";
                    }
                    else if (alertList[9] == "7") {
                        pVal = "Pending for Developer Updation";
                    }
                    else if (alertList[9] == "8") {
                        pVal = "Pending for Developer Updation";
                    }
                    else if (alertList[9] == "9") {
                        pVal = "Pending for Test Assign";
                    }
                    else if (alertList[9] == "10") {
                        pVal = "Pending for Test Case Updation";
                    }
                    else if (alertList[9] == "11") {
                        pVal = "Pending for Test Result Updation";
                    }
                    else if (alertList[9] == "13") {
                        pVal = "Pending for PreUat";
                    }
                    else if (alertList[9] == "14") {
                        pVal = "Pending for CRB request";
                    }
                    else if (alertList[9] == "15") {
                        pVal = "Pending for CRB Approve";
                    }
                    else if (alertList[9] == "17") {
                        pVal = "Pending for Feed back Request";
                    }
                    else if (alertList[9] == "18") {
                        pVal = "Pending for User Feed back";
                    }
                    else {
                        pVal = "Pending for Recommendation";
                    }
                    var pValue3 = document.createTextNode(pVal);
                    pItem3.appendChild(pValue3);


                    var pItem4 = document.createElement("p");

                    var span4 = document.createElement("span");
                    span4.className = "text-info";
                    var spanValue4 = document.createTextNode("CRF Created By " + alertList[8]);
                    span4.appendChild(spanValue4);
                    pItem4.appendChild(span4);

                    //var pVal4 = ;

                    //var pValue4 = document.createTextNode(pVal4);
                    //pItem4.appendChild(pValue4);

                    listItem.appendChild(pItem3);
                    listItem.appendChild(pItem4);
                    myList.appendChild(listItem);


                    var listItem1 = document.createElement("li");

                    listItem1.className = "pull-right notification-time";

                    var listValue1 = document.createTextNode("");
                    var splitTime;
                    splitTime = alertList[4].split('¥');//5
                    if (splitTime[0] > 0) { listValue1 = document.createTextNode(splitTime[0] + " Years ago"); }
                    else if (splitTime[1] > 0) { listValue1 = document.createTextNode(splitTime[1] + " Months ago"); }
                    else if (splitTime[2] > 0) { listValue1 = document.createTextNode(splitTime[2] + " Days ago"); }
                    else if (splitTime[3] > 0) { listValue1 = document.createTextNode(splitTime[3] + " Hours ago"); }
                    else if (splitTime[4] > 0) { listValue1 = document.createTextNode(splitTime[4] + " Minutes ago"); }
                    else if (splitTime[5] > 0) { listValue1 = document.createTextNode(splitTime[5] + " Seconds ago"); }
                    listItem1.appendChild(listValue1);

                    myList.appendChild(listItem1);

                    alertDiv2.appendChild(myList);
                    //notifySpan1.appendChild(notifyI1);
                    alertDiv1.appendChild(alertSpan1);

                    alertDiv1.appendChild(alertDiv2);


                    document.getElementById("alertDiv").appendChild(alertDiv1);
                });

            }



        },
        error: function (Result) {
        }
    });
}
function Encrypt(value) {
    var result = "";
    for (i = 0; i < value.length; i++) {
        if (i < value.length - 1) {
            result += value.charCodeAt(i) + 10;
            result += "-";
        }
        else {
            result += value.charCodeAt(i) + 10;
        }
    }
    return result;
}

function loadbasicpieChart() {
    var Option = "";
    Data = $("[id*=hdBranchId]").val() + 'µ' + $("[id*=hdFirmId]").val() + 'µ' + $("[id*=hdUserId]").val();
    
    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "Index.aspx/pieChart1",
        data: "{typ:'', val1 :'" + Data +"'}",
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