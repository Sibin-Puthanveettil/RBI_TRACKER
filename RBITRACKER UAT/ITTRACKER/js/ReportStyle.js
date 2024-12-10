$(window).on('load', function () {
    $(document).ready(function () {
        var oTable = $('#example').dataTable({
            "bJQueryUI": true,
            "sPaginationType": "full_numbers",
            "sDom": 'T<"clear"><"H"lfr>t<"F"ip>',
            "bAutoWidth": false,
            "oTableTools": {
                "aButtons": [
                    "copy", "csv", "xls", "pdf",
                    {
                        "sExtends": "collection",
                        "sButtonText": "Save",
                        "aButtons": ["csv", "xls", "pdf"]
                    }
                ]
            }
        });

    });
});