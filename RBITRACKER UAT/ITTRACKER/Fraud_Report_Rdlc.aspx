 <%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Fraud_Report_Rdlc.aspx.cs" Inherits="RBIDATATRACK.Fraud_Report_Rdlc" %>

<%@ Register assembly="Microsoft.ReportViewer.WebForms, Version=15.0.0.0, Culture=neutral, PublicKeyToken=89845dcd8080cc91" namespace="Microsoft.Reporting.WebForms" tagprefix="rsweb" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
  
</head>
    
<body>
    <form id="form1" runat="server">
        
        <rsweb:ReportViewer ID="ReportViewer1" runat="server" Font-Names="Verdana" Font-Size="8pt" Height="505px" WaitMessageFont-Names="Verdana" WaitMessageFont-Size="14pt" Width="744px" >
            <LocalReport ReportPath="Fraud_Categorywise.rdlc">
            </LocalReport>
        </rsweb:ReportViewer>
        <asp:ScriptManager ID="ScriptManager2" runat="server">
        </asp:ScriptManager>
        <div>
        </div>
    </form>
</body>
</html>
