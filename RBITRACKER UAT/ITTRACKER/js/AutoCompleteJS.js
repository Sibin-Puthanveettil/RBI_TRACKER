function autocomplete(inp, arr, hiddenVariable, ShowValVariable) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    //inp.addEventListener("input", function (e)
    if (arr.length > 0) {
        var a, b, i, val;
        val = document.getElementById('' + inp + '').value
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false; }
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", inp + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        document.getElementById('' + inp + '').parentNode.appendChild(a);
        /*for each item in the array...*/
        
        for (i = 0; i < arr.length; i++) {
            /*check if the item starts with the same letters as the text field value:*/
            //if (arr[i].split("ʒ")[1].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                /*create a DIV element for each matching element:*/
            b = document.createElement("DIV");
           
                /*make the matching letters bold:*/
                //b.innerHTML = "<strong>" + arr[i].split("ʒ")[1].substr(0, val.length) + "</strong>";
                //b.innerHTML += arr[i].split("ʒ")[1].substr(val.length);
                b.innerHTML = arr[i].split("ʒ")[1];
                /*insert a input field that will hold the current array item's value:*/
                b.innerHTML += "<input type='hidden' value='" + arr[i].split("ʒ")[0] + "'>";
                b.innerHTML += "<input type='hidden' value='" + arr[i].split("ʒ")[1] + "'>";
                /*execute a function when someone clicks on the item value (DIV element):*/
            b.addEventListener("click", function (e) {
                
                    /*insert the value for the autocomplete text field:*/
                    document.getElementById('' + inp + '').value = this.getElementsByTagName("input")[0].value;
                    //document.getElementById('' + hiddenVariable + '').value = this.getElementsByTagName("input")[1].value;
                    $("[id*=" + hiddenVariable + "]").val(this.getElementsByTagName("input")[0].value);
                    document.getElementById('' + ShowValVariable + '').innerHTML = this.getElementsByTagName("input")[1].value;
                    /*close the list of autocompleted values,
                    (or any other open lists of autocompleted values:*/
                    //var v = document.form1.txtValue.value;
                    //// get the TextBox Value and assign it into the variable
                    //AddOpt = new Option(v, v);
                    //document.form1.lstValue.options[i++] = AddOpt;
                    //var listBox = document.getElementById('ListBox1');
                    //var option = document.createElement("OPTION");
                    //option.innerHTML = this.getElementsByTagName("input")[1].value;
                    //option.value = this.getElementsByTagName("input")[0].value;
                    //listBox.appendChild(option);
                // get reference to select element
                //var sel = document.getElementById('selDemo');

                //// create new option element
                //var opt = document.createElement('option');
                //var txt = this.getElementsByTagName("input")[1].value;
                //var val=this.getElementsByTagName("input")[0].value;
                //// create text node to add to option element (opt)
                //opt.appendChild(document.createTextNode(txt));

                //// set value property of opt
                //opt.value = val;

                // add opt to end of select box (sel)
                //sel.appendChild(opt); 

                //var getValue = this.getElementsByTagName("input")[1].value;
                //$('.all-emp').append('<span class="emp_names">' + getValue + ' <span class="cancel-email">x</span></span>');

                closeAllLists();
                });
            a.appendChild(b);
            //a.appendChild(sel);
            //}
        }
    } else {
        closeAllLists();
        $("[id*=" + hiddenVariable + "]").val("");
    }
    /*execute a function presses a key on the keyboard:*/
    document.getElementById('' + inp + '').addEventListener("keydown", function (e) {
        var x = document.getElementById(inp + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x[currentFocus].click();
            }
        } else if (e.keyCode == 8 || e.keyCode == 46) {
            document.getElementById('' + hiddenVariable + '').value = "";
        }
    });
    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }
    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
    $("[id*=" + hiddenVariable + "]").val("");
}

//var countries = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua &amp; Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia &amp; Herzegovina", "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central Arfrican Republic", "Chad", "Chile", "China", "Colombia", "Congo", "Cook Islands", "Costa Rica", "Cote D Ivoire", "Croatia", "Cuba", "Curacao", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Polynesia", "French West Indies", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauro", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Pierre &amp; Miquelon", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "St Kitts &amp; Nevis", "St Lucia", "St Vincent", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor L'Este", "Togo", "Tonga", "Trinidad &amp; Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks &amp; Caicos", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States of America", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Virgin Islands (US)", "Yemen", "Zambia", "Zimbabwe"];    
//function LoadDataAutoComplete(ControlID, SearchKey, SrchStringLen,hiddenVariable, QueryFlag, QueryID,ShowValue) {
//    var ArrayList = [];
//    if (SearchKey.length >= SrchStringLen) {
//        $.ajax({
//            type: "POST",
//            contentType: "application/json; charset=utf-8",
//            url: "ServiceAutoComplete.asmx/GetAutoSearchData",
//            data: "{SearchKey:'" + SearchKey + "',QueryFlag:'" + QueryFlag + "',QueryID:'" + QueryID + "'}",
//            dataType: "json",
//            success: function (Result) {
//                ArrayList = Result.d;
//                autocomplete(ControlID, ArrayList, hiddenVariable, ShowValue);
//            },
//            error: function (Result) {
//                alert(Result.d);
//            }
//        });
//    } else if (SearchKey.length == 0) {
//        ArrayList = [];
//        autocomplete(ControlID, ArrayList, hiddenVariable, ShowValue);
//    }

//}

function SearchDataAutoCompleteEmp(ControlID, SearchKey, SrchStringLen, hiddenVariable, pageflag, QueryID, ShowValue) {
  //  alert(SearchKey);
    var ArrayList = [];
    var usrid = $("[id*=hdUserId]").val();
    if (SearchKey.length >= SrchStringLen) {
       // alert(SearchKey);
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "ServiceAutoComplete.asmx/GetAutoSearchData",
            data: "{SearchKey:'" + SearchKey + "',pageflag:'" + pageflag + "',QueryID:'" + QueryID + "'}",
            dataType: "json",
            success: function (Result) {
                ArrayList = Result.d;
                autocompleteemployee(ControlID, ArrayList, hiddenVariable, ShowValue);
            },
            error: function (Result) {
                alert(Result.d);
            }
        });
    } else if (SearchKey.length == 0) {
        ArrayList = [];
        autocompleteemployee(ControlID, ArrayList, hiddenVariable, ShowValue);
    }

}
function autocompleteemployee(inp, arr, hiddenVariable, ShowValVariable) {
    
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    //inp.addEventListener("input", function (e)
    if (arr.length > 0) {
        var a, b, i, val;
        val = document.getElementById('' + inp + '').value
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false; }
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", inp + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        document.getElementById('' + inp + '').parentNode.appendChild(a);
        /*for each item in the array...*/
        
        Loop1:
        for (i = 0; i < arr.length; i++) {           
            //var emid = "#empid" + hiddenVariable;
            //var emid = "#empidhdnEmpCodeRec";
            var emid = "span.visuallyhidden";
            spans = document.querySelectorAll(emid);// get all the elements with id=spanr_emp2
            var len = spans.length;
            var empCodes = "";
            var arrEmpCode = "";
            Loop2:  
            for (var si = 0; si < len; si++) {
                //console.log('span value', spans[si].textContent);// console the textContent
                empCodes = spans[si].textContent;
                arrEmpCode=arr[i].split("ʒ")[0];
                if (empCodes === arrEmpCode) {
                    continue Loop1;
                }
            }
            
            /*check if the item starts with the same letters as the text field value:*/
            //if (arr[i].split("ʒ")[1].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            /*create a DIV element for each matching element:*/
            b = document.createElement("DIV");

            /*make the matching letters bold:*/
            //b.innerHTML = "<strong>" + arr[i].split("ʒ")[1].substr(0, val.length) + "</strong>";
            //b.innerHTML += arr[i].split("ʒ")[1].substr(val.length);
            b.innerHTML = arr[i].split("ʒ")[1];
            /*insert a input field that will hold the current array item's value:*/

            b.innerHTML += "<input type='hidden' value='" + arr[i].split("ʒ")[0] + "'>";
            b.innerHTML += "<input type='hidden' value='" + arr[i].split("ʒ")[1] + "'>";

            /*execute a function when someone clicks on the item value (DIV element):*/
            b.addEventListener("click", function (e) {
                /*insert the value for the autocomplete text field:*/
                document.getElementById('' + inp + '').value = "";
                var hdnValue = "";
                var hdnEmp = $("[id*=" + hiddenVariable + "]").val();
                if (hdnEmp == '0' || hdnEmp == '' || hdnEmp == 'undefined' || hdnEmp == null) {
                    hdnValue = this.getElementsByTagName("input")[0].value;
                }
                else {
                    hdnValue = hdnEmp + "£" + this.getElementsByTagName("input")[0].value;
                }
                //hdnValue = hdnEmp + "£" + this.getElementsByTagName("input")[0].value;
                //document.getElementById('' + inp + '').value = this.getElementsByTagName("input")[0].value;
                //document.getElementById('' + hiddenVariable + '').value = this.getElementsByTagName("input")[1].value;
                $("[id*=" + hiddenVariable + "]").val(hdnValue);
                //var hdnValue1 = "";
                //var hdnEmp1 = $("[id*=hdnAllEmployees]").val();
                //if (hdnEmp1 == '0' || hdnEmp1 == '' || hdnEmp1 == 'undefined' || hdnEmp1 == null) {
                //    hdnValue1 = this.getElementsByTagName("input")[0].value;
                //}
                //else {
                //    hdnValue1 = hdnEmp1 + "£" + this.getElementsByTagName("input")[0].value;
                //}
                //$("[id*=hdnAllEmployees]").val(hdnValue1);
                //document.getElementById('' + ShowValVariable + '').innerHTML = this.getElementsByTagName("input")[1].value;
                //debugger;
                var getValue = this.getElementsByTagName("input")[1].value;
                var getEmpCode = this.getElementsByTagName("input")[0].value;
                $("[id*=hdDeveloperID]").val(getEmpCode+ "^" +getValue);
                $("[id*=" + ShowValVariable + "]").append('<span class="emp_names">' + getValue + ' <span class="cancel-emp">x</span><span class="visuallyhidden" id="empid' + hiddenVariable + '">' + getEmpCode + '</span></span>');
                //$('.all-emp').append('<span class="emp_names">' + getValue + ' <span class="cancel-email">x</span></span>');//<span class="visuallyhidden" id="span' + ShowValVariable + '">' + getEmpCode + '</span>
                //$(ShowValVariable).append('<span class="emp_names">' + getValue + ' <span class="cancel-email">x</span></span>');
                //alert(empCodes);
                //alert(hdnValue1);
                //$("#paral").hide();
                $("#txtmodule").prop("readonly", true);
                $("#txtEmpCode").prop("readonly", true);
                closeAllLists();
            });
            a.appendChild(b);
            //a.appendChild(sel);
            //}
        }
    } else {
        closeAllLists();
        //$("[id*=" + hiddenVariable + "]").val("");
    }
    /*execute a function presses a key on the keyboard:*/
    document.getElementById('' + inp + '').addEventListener("keydown", function (e) {
        var x = document.getElementById(inp + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x[currentFocus].click();
            }
        } else if (e.keyCode == 8 || e.keyCode == 46) {
            //document.getElementById('' + hiddenVariable + '').value = "";
        }
    });
    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }
    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
    //$("[id*=" + hiddenVariable + "]").val("");
}

function SearchDataAutoCompleteEmpSingle(ControlID, SearchKey, SrchStringLen, hiddenVariable, pageflag, QueryID, ShowValue) {
    var noteid = $("[id*=hdnNoteId]").val();
    //alert(noteid)
    var ArrayList = [];
    if (SearchKey.length >= SrchStringLen) {
        SearchKey = SearchKey + 'µ' + noteid;
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "ServiceAutoComplete.asmx/GetAutoSearchData",
            data: "{SearchKey:'" + SearchKey + "',pageflag:'" + pageflag + "',QueryID:'" + QueryID + "'}",
            dataType: "json",
            success: function (Result) {
                ArrayList = Result.d;
                autocompleteemployeesingle(ControlID, ArrayList, hiddenVariable, ShowValue);
            },
            error: function (Result) {
                alert(Result.d);
            }
        });
    } else if (SearchKey.length == 0) {
        ArrayList = [];
        SearchKey = SearchKey + 'µ' + noteid;
        autocompleteemployeesingle(ControlID, ArrayList, hiddenVariable, ShowValue);
    }

}
function autocompleteemployeesingle(inp, arr, hiddenVariable, ShowValVariable) {
    //debugger;
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    //inp.addEventListener("input", function (e)
    if (arr.length > 0) {
        var a, b, i, val;
        val = document.getElementById('' + inp + '').value
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false; }
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", inp + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        document.getElementById('' + inp + '').parentNode.appendChild(a);
        /*for each item in the array...*/
        
        Loop1:
        for (i = 0; i < arr.length; i++) {
            var emid = "#empid" + hiddenVariable;
            spans = document.querySelectorAll(emid);// get all the elements with id=spanr_emp2
            var len = spans.length;
            var empCodes = "";
            var arrEmpCode = "";
            Loop2:
            for (var si = 0; si < len; si++) {
                //console.log('span value', spans[si].textContent);// console the textContent
                empCodes = spans[si].textContent;
                arrEmpCode = arr[i].split("ʒ")[0];
                if (empCodes === arrEmpCode) {
                    continue Loop1;
                }
            }

            /*check if the item starts with the same letters as the text field value:*/
            //if (arr[i].split("ʒ")[1].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            /*create a DIV element for each matching element:*/
            b = document.createElement("DIV");

            /*make the matching letters bold:*/
            //b.innerHTML = "<strong>" + arr[i].split("ʒ")[1].substr(0, val.length) + "</strong>";
            //b.innerHTML += arr[i].split("ʒ")[1].substr(val.length);
            b.innerHTML = arr[i].split("ʒ")[1];
            /*insert a input field that will hold the current array item's value:*/

            b.innerHTML += "<input type='hidden' value='" + arr[i].split("ʒ")[0] + "'>";
            b.innerHTML += "<input type='hidden' value='" + arr[i].split("ʒ")[1] + "'>";

            /*execute a function when someone clicks on the item value (DIV element):*/
            b.addEventListener("click", function (e) {
                /*insert the value for the autocomplete text field:*/
                document.getElementById('' + inp + '').value = "";
                var hdnValue = "";
                var hdnEmp = $("[id*=" + hiddenVariable + "]").val();
                if (hdnEmp == '0' || hdnEmp == '' || hdnEmp == 'undefined' || hdnEmp == null) {
                    hdnValue = this.getElementsByTagName("input")[0].value;
                }
                else {
                    hdnValue = hdnEmp + "£" + this.getElementsByTagName("input")[0].value;
                }
                //hdnValue = hdnEmp + "£" + this.getElementsByTagName("input")[0].value;
                //document.getElementById('' + inp + '').value = this.getElementsByTagName("input")[0].value;
                //document.getElementById('' + hiddenVariable + '').value = this.getElementsByTagName("input")[1].value;
                $("[id*=" + hiddenVariable + "]").val(hdnValue);
                //document.getElementById('' + ShowValVariable + '').innerHTML = this.getElementsByTagName("input")[1].value;
                //debugger;
                var getValue = this.getElementsByTagName("input")[1].value;
                var getEmpCode = this.getElementsByTagName("input")[0].value;
                document.getElementById('' + ShowValVariable + '').innerHTML = "";
                $("[id*=" + ShowValVariable + "]").append('<span class="emp_names">' + getValue + ' <span class="cancel-emp">x</span><span class="visuallyhidden" id="empid' + hiddenVariable + '">' + getEmpCode + '</span></span>');
                // $('.all-emp').append('<span class="emp_names">' + getValue + ' <span class="cancel-email">x</span></span>');//<span class="visuallyhidden" id="span' + ShowValVariable + '">' + getEmpCode + '</span>
                //$(ShowValVariable).append('<span class="emp_names">' + getValue + ' <span class="cancel-email">x</span></span>');
                //alert(empCodes);
                closeAllLists();
            });
            a.appendChild(b);
            //a.appendChild(sel);
            //}
        }
    } else {
        closeAllLists();
        //$("[id*=" + hiddenVariable + "]").val("");
    }
    /*execute a function presses a key on the keyboard:*/
    document.getElementById('' + inp + '').addEventListener("keydown", function (e) {
        var x = document.getElementById(inp + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x[currentFocus].click();
            }
        } else if (e.keyCode == 8 || e.keyCode == 46) {
            //document.getElementById('' + hiddenVariable + '').value = "";
        }
    });
    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }
    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
    //$("[id*=" + hiddenVariable + "]").val("");
}