<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="home.aspx.cs" Inherits="RBIDATATRACK.home" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
 <%-- <script>
     function ready() {
         debugger;
    alert('DOM is ready');
    var MacAddress = "";
    var HostName = "";
    var InstallDt = "";
    var NetCon = "";
    var temInstalled = 0;
    var wmi = GetObject("winmgmts:{impersonationLevel=impersonate}");
    e = new Enumerator(wmi.ExecQuery("SELECT * FROM Win32_NetworkAdapterConfiguration WHERE IPEnabled = True"));
    for (; !e.atEnd(); e.moveNext()) {
        var s = e.item();
        HostName = s.DNSHostName;
        if (HostName != null && HostName != '')
            break;
    }
    e = new Enumerator(wmi.ExecQuery("Select * from Win32_NetworkAdapter WHERE  Manufacturer != 'Microsoft'  AND NOT PNPDeviceID LIKE 'ROOT\%'"));
    for (; !e.atEnd(); e.moveNext()) {
        var s = e.item();
        //          if (s.NetConnectionID != null) 
        //            {             
        if (s.MACAddress != null) {
            MacAddress = s.MACAddress;
            if (MacAddress != null && MacAddress != '')
                break;
        }
        //            }
    }

    e = new Enumerator(wmi.ExecQuery("Select * from Win32_Registry"));
    for (; !e.atEnd(); e.moveNext()) {
        var s = e.item();
        InstallDt = s.InstallDate;
    }

    temInstalled = getBesInfo(wmi);

    if (trim(MacAddress) == '') {
        alert('E001 - Not able to fetch physical address of your system. Please enable "Local Area Connection".\n');
        return false;
    }

    if (trim(HostName) == '') {
        alert('E002 - Host name should not be empty. Please check your computer name\n');
        return false;
    }

    //document.getElementById(hid).value = HostName + '~' + MacAddress + '~' + InstallDt + '~' + temInstalled;
         alert(HostName);
         alert(MacAddress);
    return true;
    // image is not yet loaded (unless was cached), so the size is 0x0
   
  }

  document.addEventListener("DOMContentLoaded", ready);
</script> --%> 
</head>
<body>
    <form id="form1" runat="server">
        <div>
        </div>
    </form>
</body>
</html>
