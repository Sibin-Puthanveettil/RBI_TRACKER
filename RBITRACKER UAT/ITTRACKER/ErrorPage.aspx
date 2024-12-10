<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ErrorPage.aspx.cs" Inherits="RBIDATATRACK.ErrorPage" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">

    <title></title>
    <script type="text/javascript" src="http://code.jquery.com/jquery-1.8.2.js"></script>
 <link rel="Stylesheet" href="CSS/menustyle.css" type="text/css" />
 <style type="text/css">
#overlay {
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;
background-color: #000;
filter:alpha(opacity=70);
-moz-opacity:0.7;
-khtml-opacity: 0.7;
opacity: 0.7;
z-index: 100;
display: none;
}
.cnt223 a{
text-decoration: none;
}
.popup{
width: 100%;
margin: 0 auto;
display: none;
position: fixed;
z-index: 101;
}
.cnt223{
min-width: 40%;
width: 40%;
min-height: 150px;
margin: 100px auto;
background: #f3f3f3;
position: relative;
z-index: 103;
padding: 10px;
border-radius: 5px;
box-shadow: 0 2px 5px #000;
height: 150px;
}
.cnt223 p{
clear: both;
color: #555555;
text-align: justify;
}
.cnt223 p a{
color: #d91900;
font-weight: bold;
}
.cnt223 .x{
float: right;
height: 35px;
left: 22px;
position: relative;
top: -25px;
}
.cnt223 .x:hover{
cursor: pointer;
}
.navbar-brand {
    font-size: 1.09375rem;
    line-height: inherit;
}
@media (max-width:575.98px) {
         .cnt223 {
             min-width: 80%;
             width: 80%;
         }

     }
</style>


<script type='text/javascript'>
$(function(){
var overlay = $('<div id="overlay"></div>');
overlay.show();
overlay.appendTo(document.body);
$('.popup').show();
$('.close').click(function(){
$('.popup').hide();
overlay.appendTo(document.body).remove();
return false;
});

});
</script>
</head>
<body>
    <form id="form1" runat="server">
       <div class='popup' >
<div class='cnt223' >
<div style="width:100%; background-color:#fdd935; "><a class="navbar-brand" href="#"><img src="files/img/logo.png"  class="dark-logo" /></a></div>

<p>
    <span style="font-family: Arial;font-size: 20pt; font-weight:bolder; text-align: left;color:#3e5569;">Sorry! We couldn't find it..</span>
    <img src="img/caution.png" width="50" height="50" alt="error"/>    
    <br/>
<span style="font-family: Arial;font-size: 14pt; text-align: left;color:#3e5569;">Error:Something Went wrong, please contact IT support ..</span>
<br/>
<br/>
<br/>
 
</p>

</div>
</div> 
    </form>
</body>
</html>
