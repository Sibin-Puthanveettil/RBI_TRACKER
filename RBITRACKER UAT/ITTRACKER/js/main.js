// JScript File

function getMachineInfo(hid)
{   // debugger;
    try
    { 
        if (document.getElementById(hid).value !='')
        {
          return true;
        }
        var MacAddress = "";
        var HostName = "";        
        var InstallDt = "";
        var NetCon = "";
        var temInstalled=0;
        var wmi = GetObject("winmgmts:{impersonationLevel=impersonate}");
        e = new Enumerator(wmi.ExecQuery("SELECT * FROM Win32_NetworkAdapterConfiguration WHERE IPEnabled = True"));
        for(; !e.atEnd(); e.moveNext()) {
           var s = e.item();
           HostName = s.DNSHostName;           
           if (HostName != null && HostName != '')
              break;
        }
        e = new Enumerator(wmi.ExecQuery("Select * from Win32_NetworkAdapter WHERE  Manufacturer != 'Microsoft'  AND NOT PNPDeviceID LIKE 'ROOT\%'"));
        for(; !e.atEnd(); e.moveNext()) 
        {
            var s = e.item();
//          if (s.NetConnectionID != null) 
//            {             
               if (s.MACAddress != null) 
               {
                  MacAddress = s.MACAddress;
                  if (MacAddress != null && MacAddress != '')
                     break;
               }
//            }
        }
       
        e = new Enumerator(wmi.ExecQuery("Select * from Win32_Registry"));
        for(; !e.atEnd(); e.moveNext()) 
        {
            var s = e.item();
            InstallDt = s.InstallDate;
        }
      
         temInstalled=getBesInfo(wmi);
     
         if(trim(MacAddress)=='')
         {
           alert('E001 - Not able to fetch physical address of your system. Please enable "Local Area Connection".\n');
           return false;
         }
         
         if (trim(HostName)=='')
         {
           alert('E002 - Host name should not be empty. Please check your computer name\n');
           return false;
         }
        
        document.getElementById(hid).value =  HostName + '~' +   MacAddress + '~' + InstallDt + '~' + temInstalled;
    
       return true;
   }
   catch(e)
   {
      if(confirm('E003 - There is some error while reading key. Make sure that site is opened in internet explorer and added in the trusted site zone ' + e.message + '\n\n Please Click Ok to proceed adding trusted site'))
      {
        window.open('http://app.manappuram.net/AddTrustedSite/AddTrustedSite.application','popUpWindow','height=50,width=50,left=10,top=10,resizable=no,scrollbars=no,toolbar=no,menubar=no,location=no,directories=no,status=yes');
        clearListCookies();
        self.close();
      }
      return false;
   }
    
}

 function trim(stringToTrim) {
	return stringToTrim.replace(/^\s+|\s+$/g,"");
}

function RemoveWhitespace(str)
{
    return  str.replace(/\s+/g,'');
}

 var retval;
 
function Validate(f)    {
        if (f.txtPwd.value.indexOf("&") > -1)
        {
            alert("E032 - Your password contain ampersand(&) symbol. Please change your password");
            f.txtPwd.focus();
            return false;
        }
         
        var empId=f.txtEmpid.value;
        var pass=Encrypt(f.txtPwd.value);
        //var pass=f.txtPwd.value;
        f.txtPwd.value =pass;
        if (empId=="")  {
            alert("E013 - Please Enter User ID");
            f.txtEmpid.focus();
            return false;
        }
        if (pass=="")   {
            alert("E014 - Please Enter Password");
            f.txtPwd.focus();
            return false;
        }
        
        var res = callAjax("SessionHandler.ashx","?uid=" + empId + "&flg=CHECK");
        var outres = res.split("|")        
        if (outres[0] == 'T')
        {
          if(confirm('E004 - Your previous session is active in the system ' + outres[1] + ', Do you want to delete the existing sesssion?'))
          {
            res = callAjax("SessionHandler.ashx","?uid=" + empId + "&flg=DEL");
          }
          else
          {
             f.txtPwd.value='';
             return false;
          }
        }
       
        res = callAjax("SessionHandler.ashx","?uid=" + empId + "&pwd=" + pass + "&flg=VAL");
        outres = res.split("|")
        if(outres[1]>1 && outres[1]<7)
           {
            var dys=Math.abs(outres[1])-1;
            alert("E005 - Your password will expire in " + dys +" days")        
           }
         if ( outres[1]>=7 && outres[1]<=8)
         {
            alert("E006 - Password Expired. Please change your password and login again"); 
            f.txtEmpid.value='';
            f.txtPwd.value='';
             return false;   
         }
                
        ShowProgress();
        if (document.getElementById("hidCLogin").value == 'Y') 
        {
                if (document.getElementById("hidIn").value == '')
                        document.getElementById("hidIn").value = getCookie("ASDPX");
        }
       
        if(!getMachineInfo('hidIn'))
         {
           HideProgress();
           document.getElementById('butGo').disabled ='';
           return false;
         }
         
         //Chack for HO Access
        if(outres[0]=='A')
        {
        debugger;
           HideProgress();
           showModel();
           return false;     
        }
              
        return true;
    }
   function postdata(flg)
    {            
          if(flg==0)
            {
               document.getElementById('hidflg').value='A';               
               $('#btnHO').click(function () {
                     jQuery.modal.close(); 
                });
            }
          else if(flg==1)
            {
              document.getElementById('hidflg').value='';              
              $('#btnBranch').click(function () {   
                    jQuery.modal.close();  
                });
            }
            return true;
      }
      
    function showModel()
    {
      $("#basic-modal-content").modal({onOpen: function (dialog) {
	        dialog.overlay.fadeIn('slow', function () {
		        dialog.container.slideDown('slow', function () {
			        dialog.data.fadeIn('slow');
		        });
	        });
	        
	        $(".modalCloseImg").click(function () {
//                HideProgress();
		        document.getElementById('txtPwd').value='';
	         });
          
        }});
        
    }
  
  
   function ShowProgress()
   {             
      document.getElementById('butGo').style.cursor="wait";
   } 
 
  function HideProgress()
  {
     document.getElementById('butGo').style.cursor="default";
  }    
  
 function isNumberKey(evt)
    {
   var charCode = (evt.which) ? evt.which : event.keyCode
   if (charCode > 31 && (charCode < 48 || charCode > 57))
      return false;

   return true;
    }

function openwinportal(path)
{
    self.close();
    window.open(path);
    
}

function getCookie(c_name)
{
try
 {
    var c_value = document.cookie;
    var c_start = c_value.indexOf(" " + c_name + "=");
    if (c_start == -1)
      {
      c_start = c_value.indexOf(c_name + "=");
      }
    if (c_start == -1)
      {
      c_value = '';
      }
    else
      {
      c_start = c_value.indexOf("=", c_start) + 1;
      var c_end = c_value.indexOf(";", c_start);
      if (c_end == -1)
      {
    c_end = c_value.length;
    }
    c_value = unescape(c_value.substring(c_start,c_end));
    }
     return c_value;
  } 
  catch(e)
   {
      return '';
   }
}

function clearListCookies()
{   try
   {
        var cookies = document.cookie.split(";");
        for (var i = 0; i < cookies.length; i++)
        {   
            var spcook =  cookies[i].split("=");
            deleteCookie(spcook[0]);
        }
        function deleteCookie(cookiename)
        {
            var d = new Date();
            d.setDate(d.getDate() - 1);
            var expires = ";expires="+d;
            var name=cookiename;
            //alert(name);
            var value="";
            document.cookie = name + "=" + value + expires + "; path=/acc/html";                    
        }
   
   } 
  catch(e)
   {
      return '';
   }
    
}

function openForgotPass(url)
    {     
       var src = url;
        $.modal('<iframe src="' + src + '" height="470" width="520" frameborder="0" allowtransparency="true"></iframe>', {
	        closeClass: "modalClose",
	       
	        containerCss:{
		        backgroundColor:"#fff", 
		        borderColor:"#fff", 
		        height:480, 
		        padding:0, 
		        width:530
	        },
	        overlayClose:false
        });  
    } 
    
function getBesInfo(wmi)
{
    try
   {
        var isTemInstalled=0;
        e = new Enumerator(wmi.ExecQuery("SELECT * FROM Win32_Service where Name='BESCLIENT'"));
        var name='NA';
        var status='NA';
        var startType='NA';
        for(; !e.atEnd(); e.moveNext()) 
         {
             var s = e.item();
             if(s.Name.toUpperCase()=='BESCLIENT')
             {           
               isTemInstalled =1;
               break;
             }
         }            
    } 
   catch(e)
   {
      isTemInstalled=0;
   }
   return isTemInstalled
}