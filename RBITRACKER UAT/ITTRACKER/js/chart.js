$(window).on('load', function () {
    //digi();    
});
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

function basicpieChart() {
    "use strict";
    var basicpieChart = echarts.init(document.getElementById('basic-pie1'));
    var option = {
        // Add title
        title: {
            text: '',
            subtext: '',
            x: 'center'
        },

        // Add tooltip
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },

        // Add legend
        legend: {
            orient: 'vertical',
            x: 'left',
            data: ['SHORT TERM LOAN', 'TERM LOAN', 'CASH CREDIT', 'COMMERCIAL PAPER', 'PUBLIC ISSUE']
        },

        // Add custom colors
        color: ['#ffbc34', '#4fc3f7', '#212529', '#f62d51', '#2962FF'],

        // Display toolbox
        toolbox: {
            show: true,
            orient: 'vertical',
            feature: {
                mark: {
                    show: true,
                    title: {
                        mark: 'Markline switch',
                        markUndo: 'Undo markline',
                        markClear: 'Clear markline'
                    }
                },
                dataView: {
                    show: true,
                    readOnly: false,
                    title: 'View data',
                    lang: ['View chart data', 'Close', 'Update']
                },
                magicType: {
                    show: true,
                    title: {
                        pie: 'Switch to pies',
                        funnel: 'Switch to funnel',
                    },
                    type: ['pie', 'funnel'],
                    option: {
                        funnel: {
                            x: '25%',
                            y: '20%',
                            width: '50%',
                            height: '70%',
                            funnelAlign: 'left',
                            max: 1548
                        }
                    }
                },
                restore: {
                    show: true,
                    title: 'Refresh'
                },
                saveAsImage: {
                    show: true,
                    title: 'Save as image',
                    lang: ['Save']
                }
            }
        },

        // Enable drag recalculate
        calculable: true,

        // Add series
        series: [{
            name: 'Fund',
            type: 'pie',
            radius: '70%',
            center: ['50%', '57.5%'],
            data: [
                { value: 279874350000, name: 'SHORT TERM LOAN' },
                { value: 10210320000, name: 'TERM LOAN' },
                { value: 1050500000, name: 'CASH CREDIT' },
                { value: 89698856, name: 'COMMERCIAL PAPER' },
                { value: 252555, name: 'PUBLIC ISSUE' }
            ]
        }]
    };

    basicpieChart.setOption(option);
    }
function AreaChart(Option) {
    var a = c3.generate({
        bindto: "#area-chart",
        size: { height: 400 },
        point: { r: 4 },
        color: { pattern: ["#2962FF", "#4fc3f7", "#4fc3f6"] },
        data: {
            columns: [
                ["data1", 0, 0, 10000000000, 0, 0, 0, 0, 0, 0, 0],
                ["data2", 0, 0, 0, 0, 0, 0, 4000000000, 0, 0, 0],
                ["data3", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

            ],
            types: { data1: "area", data2: "area-spline", data3: "area-spline"}
        },
        grid: { y: { show: !0 } }
    });
}
function MorrisChart(Option) {
    "use strict";
    Morris.Area({
        element: 'morris-area-chart',
        data: [{
            period: '2010',
            iphone: 50,
            ipad: 80,
            itouch: 20
        }, {
            period: '2011',
            iphone: 130,
            ipad: 100,
            itouch: 80
        }, {
            period: '2012',
            iphone: 80,
            ipad: 60,
            itouch: 70
        }, {
            period: '2013',
            iphone: 70,
            ipad: 200,
            itouch: 140
        }, {
            period: '2014',
            iphone: 180,
            ipad: 150,
            itouch: 140
        }, {
            period: '2015',
            iphone: 105,
            ipad: 100,
            itouch: 80
        },
        {
            period: '2016',
            iphone: 250,
            ipad: 150,
            itouch: 200
        }],
        xkey: 'period',
        ykeys: ['iphone', 'ipad', 'itouch'],
        labels: ['iPhone', 'iPad', 'iPod Touch'],
        pointSize: 3,
        fillOpacity: 0,
        pointStrokeColors: ['#55ce63', '#2962FF', '#2f3d4a'],
        behaveLikeLine: true,
        gridLineColor: '#e0e0e0',
        lineWidth: 3,
        hideHover: 'auto',
        lineColors: ['#55ce63', '#2962FF', '#2f3d4a'],
        resize: true

    });

    Morris.Area({
        element: 'morris-area-chart2',
        data: [{
            period: '2010',
            SiteA: 0,
            SiteB: 0,

        }, {
            period: '2011',
            SiteA: 130,
            SiteB: 100,

        }, {
            period: '2012',
            SiteA: 80,
            SiteB: 60,

        }, {
            period: '2013',
            SiteA: 70,
            SiteB: 200,

        }, {
            period: '2014',
            SiteA: 180,
            SiteB: 150,

        }, {
            period: '2015',
            SiteA: 105,
            SiteB: 90,

        },
        {
            period: '2016',
            SiteA: 250,
            SiteB: 150,

        }],
        xkey: 'period',
        ykeys: ['SiteA', 'SiteB'],
        labels: ['Site A', 'Site B'],
        pointSize: 0,
        fillOpacity: 0.4,
        pointStrokeColors: ['#b4becb', '#2962FF'],
        behaveLikeLine: true,
        gridLineColor: '#e0e0e0',
        lineWidth: 0,
        smooth: false,
        hideHover: 'auto',
        lineColors: ['#b4becb', '#2962FF'],
        resize: true

    });


    // LINE CHART
    var line = new Morris.Line({
        element: 'morris-line-chart',
        resize: true,
        data: [
            { y: '2011 Q1', item1: 2666 },
            { y: '2011 Q2', item1: 2778 },
            { y: '2011 Q3', item1: 4912 },
            { y: '2011 Q4', item1: 3767 },
            { y: '2012 Q1', item1: 6810 },
            { y: '2012 Q2', item1: 5670 },
            { y: '2012 Q3', item1: 4820 },
            { y: '2012 Q4', item1: 15073 },
            { y: '2013 Q1', item1: 10687 },
            { y: '2013 Q2', item1: 8432 }
        ],
        xkey: 'y',
        ykeys: ['item1'],
        labels: ['Item 1'],
        gridLineColor: '#eef0f2',
        lineColors: ['#2962FF'],
        lineWidth: 1,
        hideHover: 'auto'
    });
    // Morris donut chart

    Morris.Donut({
        element: 'morris-donut-chart',
        data: [{
            label: "Download Sales",
            value: 12,

        }, {
            label: "In-Store Sales",
            value: 30
        }, {
            label: "Mail-Order Sales",
            value: 20
        }],
        resize: true,
        colors: ['#2962FF', '#55ce63', '#2f3d4a']
    });

    // Morris bar chart
    Morris.Bar({
        element: 'morris-bar-chart',
        data: [{
            y: '2006',
            a: 100,
            b: 90,
            c: 60
        }, {
            y: '2007',
            a: 75,
            b: 65,
            c: 40
        }, {
            y: '2008',
            a: 50,
            b: 40,
            c: 30
        }, {
            y: '2009',
            a: 75,
            b: 65,
            c: 40
        }, {
            y: '2010',
            a: 50,
            b: 40,
            c: 30
        }, {
            y: '2011',
            a: 75,
            b: 65,
            c: 40
        }, {
            y: '2012',
            a: 100,
            b: 90,
            c: 40
        }],
        xkey: 'y',
        ykeys: ['a', 'b', 'c'],
        labels: ['A', 'B', 'C'],
        barColors: ['#55ce63', '#2f3d4a', '#2962FF'],
        hideHover: 'auto',
        gridLineColor: '#eef0f2',
        resize: true
    });
    // Extra chart
    Morris.Area({
        element: 'extra-area-chart',
        data: [{
            period: '2010',
            iphone: 0,
            ipad: 0,
            itouch: 0
        }, {
            period: '2011',
            iphone: 50,
            ipad: 15,
            itouch: 5
        }, {
            period: '2012',
            iphone: 20,
            ipad: 50,
            itouch: 65
        }, {
            period: '2013',
            iphone: 60,
            ipad: 12,
            itouch: 7
        }, {
            period: '2014',
            iphone: 30,
            ipad: 20,
            itouch: 120
        }, {
            period: '2015',
            iphone: 25,
            ipad: 80,
            itouch: 40
        }, {
            period: '2016',
            iphone: 10,
            ipad: 10,
            itouch: 10
        }


        ],
        lineColors: ['#55ce63', '#2f3d4a', '#2962FF'],
        xkey: 'period',
        ykeys: ['iphone', 'ipad', 'itouch'],
        labels: ['Site A', 'Site B', 'Site C'],
        pointSize: 0,
        lineWidth: 0,
        resize: true,
        fillOpacity: 0.8,
        behaveLikeLine: true,
        gridLineColor: '#e0e0e0',
        hideHover: 'auto'

    });
}

function digi() {
    var date = new Date(),
        hour = date.getHours(),
        minute = checkTime(date.getMinutes()),
        ss = checkTime(date.getSeconds());
    var d = new Date();
    var weekday = new Array(7);
    weekday[0] = "Sun";
    weekday[1] = "Mon";
    weekday[2] = "Tue";
    weekday[3] = "Wed";
    weekday[4] = "Thur";
    weekday[5] = "Fri";
    weekday[6] = "Sat";
    var month = new Array();
    month[0] = "Jan";
    month[1] = "Feb";
    month[2] = "Mar";
    month[3] = "Apr";
    month[4] = "May";
    month[5] = "Jun";
    month[6] = "Jul";
    month[7] = "Aug";
    month[8] = "Sep";
    month[9] = "Oct";
    month[10] = "Nov";
    month[11] = "Dec";
    var m = month[d.getMonth()];
    var n = weekday[d.getDay()];
    var dat = d.getDate();
    var y = d.getFullYear();
    function checkTime(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }

    if (hour > 12) {
        hour = hour - 12;
        if (hour == 12) {
            hour = checkTime(hour);
            document.getElementById("digitt").innerHTML = n + " " + m + " " + dat + " " + y + " " + hour + ":" + minute + ":" + ss + " AM";
        }
        else {
            hour = checkTime(hour);
            document.getElementById("digitt").innerHTML = n + " " + m + " " + dat + " " + y + " " + hour + ":" + minute + ":" + ss + " PM";
        }
    }
    else {
        document.getElementById("digitt").innerHTML = n + " " + m + " " + dat + " " + y + " " + hour + ":" + minute + ":" + ss + " AM";
    }
    var time = setTimeout(digi, 1000);
}
//document.onkeydown = function (e) {
//    debugger;
//    if (e.keyCode == 123) {
//        return false;
//    }
//    if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
//        return false;
//    }
//    if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
//        return false;
//    }
//    if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
//        return false;
//    }

//    if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
//        return false;
//    }
//}