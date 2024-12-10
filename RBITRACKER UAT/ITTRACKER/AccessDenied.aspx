<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="AccessDenied.aspx.cs" Inherits="RBIDATATRACK.AccessDenied" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
<style>
    body {
  padding: 0;
  margin: 0;
  background: repeating-linear-gradient(45deg, darkred, darkred 2px, #330000 3px, #330000 8px);
  -webkit-user-select: none;         
  -moz-user-select: none; 
  -ms-user-select: none; 
}
#spam {
  background-color: lightgray;
  border-radius: 5px;
  margin: auto;
  width: 85%;
  cursor: not-allowed;
}
h1 {
  padding-top: 30px;
  font-size: 60px;
  font-family: Arial;
  text-align: center;
  border-bottom: 1px solid #333;
  border-bottom-style: dashed;
  padding-bottom: 20px;
}
spam {
   color: red;
   text-decoration: none;
   cursor: not-allowed;
}
p {
  text-align: center;
  font-family: Arial;
  font-weight: bold;
  padding-bottom: 3%;
}
small {
  font-family: Arial;
  text-align: center;
  word-spacing: -1px;
  font-size: 10px;
  font-weight: normal;
  color: gray;
}
#gears {
  text-align: center;
  color: #333;
  width: 200px;
  margin: auto;
  border-radius: 10px;
  background-color: rgba(0,0,0,0.85);
  /* opacity: 0.85; */
  padding: 30px 0px;
}
.back {
    text-align: center;
  position: relative;
  display: inline-block;
  text-decoration: none;
  padding: 10px 10px 10px 40px;
}

.back h4 {
  color: #4A4F6A;
  font-size 16px;
  transform: translateY(8px);
  transition: transform 500ms 0s cubic-bezier(0.2, 0, 0, 1);
}

.back span {
  opacity: 0;
  color: #858BA9;
  font-size: 12px;
  font-weight: 300;
  display: inline-block;
  transform: translateY(10px);
  transition:
    transform 500ms 0s cubic-bezier(0.2, 0, 0, 1),
    opacity 500ms 0s cubic-bezier(0.2, 0, 0, 1)
}

.back div {
  top: 11px;
  left: 0;
  content: '';
  width: 30px;
  height: 30px;
  display: block;
  overflow: hidden;
  position: absolute;
  border-radius: 50%;
  transform: scale(1);
  background-color: #E9E7F2;
  transition: transform 400ms 0s cubic-bezier(0.2, 0, 0, 1.6);
}

.back div::after {
  top: 0;
  left: 0;
  content: '';
  /*width: 60px;
  height: 30px;*/
  position: absolute;
  background-position: 0 0;
  background-image: url('https://s3-eu-west-1.amazonaws.com/thomascullen-codepen/back.svg');
  transition: transform 400ms 0s cubic-bezier(0.2, 0, 0, 1);
}

.back:hover h4 {
  color: #171922;
}

.back:hover h4,
.back:hover span {
  opacity: 1;
  transform: translateY(0);
}

.back:hover div {
  transform: scale(1.1);
  background-color: white;
  box-shadow:
    0 2px 10px 0 rgba(185,182,198,0.00),
    0 1px 3px 0 rgba(175,172,189,0.25);
}

.back:hover div::after {
  transform: translateX(-30px);
}
div.backBtn {
  width: 100px;
  left: 250px;
  top: 300px;
  background-color: #f4f4f4;
  transition: all 0.4s ease;
  position: fixed;
  cursor: pointer;
}

span.line {
  bottom: auto;
  right: auto;
  top: auto;
  left: auto;
  background-color: #333;
  border-radius: 10px;
  width: 100%;
  left: 0px;
  height: 2px;
  display: block;
  position: absolute;
  transition: width 0.2s ease 0.1s, left 0.2s ease, transform 0.2s ease 0.3s, background-color 0.2s ease;
}

span.tLine {
  top: 0px;
}

span.mLine {
  top: 13px;
  opacity: 0;
}

span.bLine {
  top: 26px;
}

.label {
  position: absolute;
  left: 0px;
  top: 5px;
  width: 100%;
  text-align: center;
  transition: all 0.4s ease;
  font-size: 1em;
}

div.backBtn:hover span.label {
  left: 25px
}

div.backBtn:hover span.line {
  left: -10px;
  height: 5px;
  background-color: #F76060;
}

div.backBtn:hover span.tLine {
  width: 25px;
  transform: rotate(-45deg);
  left: -15px;
  top: 6px;
}

div.backBtn:hover span.mLine {
  opacity: 1;
  width: 30px;
}

div.backBtn:hover span.bLine {
  width: 25px;
  transform: rotate(45deg);
  left: -15px;
  top: 20px;
}
</style>
</head>
<body>
    <form id="form1" runat="server">
        <div>
              <div id="spam">
    <h1> Access Denied</h1>
    <p>You dont have permission to view this page<br/>
        <br/>
        
    <small>---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------</small>
      <a  href="Index.aspx">
  <div class="backBtn">
      <span class="line tLine"></span>
      <span class="line mLine"></span>
      <span class="label">Back to Home</span>
      <span class="line bLine"></span>
	</div>
</a>
        
    </p>
  </div><br/><br/>
  <div id="gears">
<svg xmlns="http://www.w3.org/2000/svg" width="120px" height="120px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="uil-gears"><rect x="0" y="0" width="100" height="100" fill="none" class="bk"/><g transform="translate(-20,-20)"><path d="M79.9,52.6C80,51.8,80,50.9,80,50s0-1.8-0.1-2.6l-5.1-0.4c-0.3-2.4-0.9-4.6-1.8-6.7l4.2-2.9c-0.7-1.6-1.6-3.1-2.6-4.5 L70,35c-1.4-1.9-3.1-3.5-4.9-4.9l2.2-4.6c-1.4-1-2.9-1.9-4.5-2.6L59.8,27c-2.1-0.9-4.4-1.5-6.7-1.8l-0.4-5.1C51.8,20,50.9,20,50,20 s-1.8,0-2.6,0.1l-0.4,5.1c-2.4,0.3-4.6,0.9-6.7,1.8l-2.9-4.1c-1.6,0.7-3.1,1.6-4.5,2.6l2.1,4.6c-1.9,1.4-3.5,3.1-5,4.9l-4.5-2.1 c-1,1.4-1.9,2.9-2.6,4.5l4.1,2.9c-0.9,2.1-1.5,4.4-1.8,6.8l-5,0.4C20,48.2,20,49.1,20,50s0,1.8,0.1,2.6l5,0.4 c0.3,2.4,0.9,4.7,1.8,6.8l-4.1,2.9c0.7,1.6,1.6,3.1,2.6,4.5l4.5-2.1c1.4,1.9,3.1,3.5,5,4.9l-2.1,4.6c1.4,1,2.9,1.9,4.5,2.6l2.9-4.1 c2.1,0.9,4.4,1.5,6.7,1.8l0.4,5.1C48.2,80,49.1,80,50,80s1.8,0,2.6-0.1l0.4-5.1c2.3-0.3,4.6-0.9,6.7-1.8l2.9,4.2 c1.6-0.7,3.1-1.6,4.5-2.6L65,69.9c1.9-1.4,3.5-3,4.9-4.9l4.6,2.2c1-1.4,1.9-2.9,2.6-4.5L73,59.8c0.9-2.1,1.5-4.4,1.8-6.7L79.9,52.6 z M50,65c-8.3,0-15-6.7-15-15c0-8.3,6.7-15,15-15s15,6.7,15,15C65,58.3,58.3,65,50,65z" fill="#8f7f59" transform="rotate(32.43 50 50)"><animateTransform attributeName="transform" type="rotate" from="90 50 50" to="0 50 50" dur="1s" repeatCount="indefinite"/></path></g><g transform="translate(20,20) rotate(15 50 50)"><path d="M79.9,52.6C80,51.8,80,50.9,80,50s0-1.8-0.1-2.6l-5.1-0.4c-0.3-2.4-0.9-4.6-1.8-6.7l4.2-2.9c-0.7-1.6-1.6-3.1-2.6-4.5 L70,35c-1.4-1.9-3.1-3.5-4.9-4.9l2.2-4.6c-1.4-1-2.9-1.9-4.5-2.6L59.8,27c-2.1-0.9-4.4-1.5-6.7-1.8l-0.4-5.1C51.8,20,50.9,20,50,20 s-1.8,0-2.6,0.1l-0.4,5.1c-2.4,0.3-4.6,0.9-6.7,1.8l-2.9-4.1c-1.6,0.7-3.1,1.6-4.5,2.6l2.1,4.6c-1.9,1.4-3.5,3.1-5,4.9l-4.5-2.1 c-1,1.4-1.9,2.9-2.6,4.5l4.1,2.9c-0.9,2.1-1.5,4.4-1.8,6.8l-5,0.4C20,48.2,20,49.1,20,50s0,1.8,0.1,2.6l5,0.4 c0.3,2.4,0.9,4.7,1.8,6.8l-4.1,2.9c0.7,1.6,1.6,3.1,2.6,4.5l4.5-2.1c1.4,1.9,3.1,3.5,5,4.9l-2.1,4.6c1.4,1,2.9,1.9,4.5,2.6l2.9-4.1 c2.1,0.9,4.4,1.5,6.7,1.8l0.4,5.1C48.2,80,49.1,80,50,80s1.8,0,2.6-0.1l0.4-5.1c2.3-0.3,4.6-0.9,6.7-1.8l2.9,4.2 c1.6-0.7,3.1-1.6,4.5-2.6L65,69.9c1.9-1.4,3.5-3,4.9-4.9l4.6,2.2c1-1.4,1.9-2.9,2.6-4.5L73,59.8c0.9-2.1,1.5-4.4,1.8-6.7L79.9,52.6 z M50,65c-8.3,0-15-6.7-15-15c0-8.3,6.7-15,15-15s15,6.7,15,15C65,58.3,58.3,65,50,65z" fill="#9f9fab" transform="rotate(57.57 50 50)"><animateTransform attributeName="transform" type="rotate" from="0 50 50" to="90 50 50" dur="1s" repeatCount="indefinite"/></path></g></svg></div>
        </div>
    </form>
</body>
</html>
