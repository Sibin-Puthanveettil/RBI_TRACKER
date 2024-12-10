<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="logincheck.aspx.cs" Inherits="RBIDATATRACK.logincheck" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
  
</head>
     <script type="text/javascript">       
         MyObject = new ActiveXObject("WScript.Shell")
          function RunNotePad(arg1) {
             setTimeout(closeWindow, 10);
             MyObject.Run(arg1);
          }
          function closeWindow() {
              window.open("closer.htm", '_self');
            }
    </script>
<body>
    <form id="form1" runat="server">
        <div>
        </div>
    </form>
</body>
</html>
