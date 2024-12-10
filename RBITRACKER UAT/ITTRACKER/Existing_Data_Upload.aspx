<%@ Page Title="" Language="C#" MasterPageFile="~/PWA_Master.Master" AutoEventWireup="true" CodeBehind="Existing_Data_Upload.aspx.cs" Inherits="RBIDATATRACK.Existing_Data_Upload" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
 <meta charset="utf-8" />
  <%-- <title>Convert Excel to HTML Table using JavaScript</title>--%>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  <%--  <script src="../App_Themes/Theme/assets/js/plcustomerupload.js"></script>
    <script src="../App_Themes/Theme/assets/js/UploadEligible.js"></script>--%>
      <script src="js/UploadEligible.js"></script>
   <script src="js/ExistingData.js"></script>
  

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
       <div class="container">
        <div class="content-wrapper">
            <section class="content">

                <div class="row">
                    <div class="widget-header align-center">
                        <h2 style="color: #091221"><i class="icon-reorder"></i>Fraud Data Upload</h2>
                    </div>
                </div>

                <div class="box box-info">
                    <div class="box box-default">
                        <br />
                        <br />
                        <div class="box-body">
                            <div class="row">

                                <div class="col-sm-2 form-group">
                                    <label>Choose File</label>
                                </div>

                                <div class="col-sm-2 form-group pull-left">
                                    <input type="file" id="excel_file" />
                                </div>

                                <div class="col-sm-8 form-group pull-left">
                                    <input id="btnConf" type="button" name="Confirm" value="Confirm" class="btn-input mt-1" onclick="UploadFiles()" data-toggle="modal" data-backdrop="false" style="width: 110px" />
                                </div>

                            </div>
                            <br />
                            <br />
                            <label style="font-size:medium; color:red" id="lblRowLength"></label>
                            <div class="row">

                                <%--<div class="col-sm-1 form-group">
                                </div>--%>

                                <%--<div class="col-sm-10 form-group pull-right">    --%>                               
                                    <div id="excel_data" class="mt-5"></div>
                               <%-- </div>

                                <div class="col-sm-1 form-group">
                                </div>--%>

                            </div>
                            <br />
                            <br />
                        </div>
                    </div>
                </div>

            </section>
        </div>
    </div>

    <input id="hdvUserID" type="hidden" runat="server" />
    <input id="hdvBranchID" type="hidden" runat="server" />
    <script>
        const excel_file = document.getElementById('excel_file');
        excel_file.addEventListener('change', (event) => {
            if (!['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'].includes(event.target.files[0].type)) {
                document.getElementById('excel_data').innerHTML = '<div class="alert alert-danger">Only .xlsx or .xls file format are allowed</div>';
                excel_file.value = '';
                return false;
            }
            var reader = new FileReader();
            reader.readAsArrayBuffer(event.target.files[0]);
            reader.onload = function (event) {
                var data = new Uint8Array(reader.result);
                var work_book = XLSX.read(data, { type: 'array' });
                var sheet_name = work_book.SheetNames;
                var sheet_data = XLSX.utils.sheet_to_json(work_book.Sheets[sheet_name[0]], { header: 1 });
                if (sheet_data.length > 0) {
                    var table_output = '<table id="tbldata" class="table table-striped table-bordered">';
                    for (var row = 0; row < sheet_data.length; row++) {
                        table_output += '<tr>';
                        for (var cell = 0; cell < sheet_data[row].length; cell++) {
                            if (row == 0) {
                                table_output += '<th>' + sheet_data[row][cell] + '</th>';
                            }
                            else {
                                table_output += '<td>' + sheet_data[row][cell] + '</td>';
                            }
                        }
                        table_output += '</tr>';
                    }
                    table_output += '</table>';
                    document.getElementById('excel_data').innerHTML = table_output;
                    alert(table_output);
                }
                
                excel_file.value = '';
                $("tr:empty").remove();
                var table = document.getElementById('tbldata');
                rowLength = table.rows.length - 1;
                $('#lblRowLength').text("Number of Rows: " + " " + rowLength);
            }
        });
    </script>
    <style>
        #btnConf {
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 4px 30px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 10px;
  border-radius: 4px;
}
    </style>


</asp:Content>
