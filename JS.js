﻿var recordCount = 0;
var recordPriority;
var recordColor;
var date;
var i;
var yCursor;

window.onload = function ()
{
    document.getElementById("addRecord").onclick = addRecord;
    
    document.getElementById("formCancel").onclick = closeForm;
    
}
function newRecord(event)
{
    event.preventDefault();
    document.getElementById("form").style.display = "none";
	
	recordPriority = (document.querySelector('input[name="priority"]:checked').value);
    switch(recordPriority){
        case "1":
            recordColor = "#FF8888";
            break;
        case "2":
            recordColor = "#FFCC88";
            break;
        case "3":
            recordColor = "#FFFF77";
            break;
        case "4":
            recordColor = "#88EE88";
            break;
        case "5":
            recordColor = "#9999FF";
            break;
        default:
            recordColor = "#FFFF77";
    }
	
	var duplicate = false;
	
/*	    */date = new Date();
/*    D */var dateWork = document.getElementById("form1").value;
/*    A */
/*    T */var year;
/*    E */var month;
/*      */var day;
/*    G */i=0;
/*    E */
/*    T */for(; dateWork[i] != "-"; i++){
/*    T */    if(year == undefined){year = dateWork[i];}
/*    I */    else{year += dateWork[i];}
/*    N */}
/*    G */i++;
/*      */for(; dateWork[i] != "-"; i++){
/*    A */    if(month == undefined){month = dateWork[i];}
/*    N */    else{month += dateWork[i];}
/*    D */}
/*      */i++;
/*    C */for(; dateWork[i] != "-" && dateWork[i] != undefined; i++){
/*    O */    if(day == undefined){day = dateWork[i];}
/*    N */    else{day += dateWork[i];}
/*    V */}
/*    E */if(month >=10){dateWork = (day + ". " + month + ". " + year);}
/*    R */else{dateWork = (day + ". " + month[1] + ". " + year);}
/*		*/
/*    T */var today = (date.getDate() + ". " + (date.getMonth()+1) + ". " + date.getFullYear());
	
	if(document.getElementById("form").style.backgroundColor == "rgb(153, 254, 254)"){
		duplicate = true;
		/*var i = event.pageY;
		console.log(i);
		i -= 60;
        i /= 66;
		i = Math.round(i);
		console.log(i);*/
		}
	else 
	{for(i=1; i<=recordCount; i++)
	{
		console.log(document.getElementsByClassName("column2")[i].innerHTML);
		console.log(document.getElementById("form2").value);
		console.log("---");
		console.log(document.getElementsByClassName("column1")[i].innerHTML);
		console.log(dateWork);
		console.log("++++++")
		if(document.getElementsByClassName("column2")[i].innerText == document.getElementById("form2").value && document.getElementsByClassName("column1")[i].innerText == dateWork)
		{
			duplicate = true;
			break;
		}
	}
	}
	console.log(duplicate + " on record " + i);
    if(duplicate == false)
	{
		var records = document.getElementById("data");
		
		var rw = document.createElement("tr");
		var date = document.createElement("td");
		var subject = document.createElement("td");
		var description = document.createElement("td");
		var author = document.createElement("td");
		var dateOfAdding = document.createElement("td");
		var action = document.createElement("td");
		var actionButton1 = document.createElement("button");
		var actionButton2 = document.createElement("button");
		var actionButton3 = document.createElement("button");
		
		var dateText = document.createTextNode(dateWork);
		var subjectText = document.createTextNode(document.getElementById("form2").value);
		var descriptionText = document.createTextNode(document.getElementById("form3").value);
		var authorText = document.createTextNode(document.getElementById("form4").value);
		var dateOfAddingText = document.createTextNode(today);
		var actionButton1Text = document.createTextNode("Like");
		var actionButton2Text = document.createTextNode("Edit");
		var actionButton3Text = document.createTextNode("Delete");
	
		actionButton1.appendChild(actionButton1Text);
		actionButton1.className = "action1";
		actionButton2.appendChild(actionButton2Text);
		actionButton2.className = "action2";
		actionButton3.appendChild(actionButton3Text);
		actionButton3.className = "action3";
		
		date.appendChild(dateText);
		subject.appendChild(subjectText);
		description.appendChild(descriptionText);
		author.appendChild(authorText);
		dateOfAdding.appendChild(dateOfAddingText);
		action.appendChild(actionButton1);
		action.appendChild(actionButton2);
		action.appendChild(actionButton3);
		
		date.className = "column1";
		subject.className = "column2";
		description.className = "column3";
		author.className = "column4";
		dateOfAdding.className = "column5";
		action.className = "column6";
		
		date.style.backgroundColor = recordColor;
		subject.style.backgroundColor = recordColor;
		description.style.backgroundColor = recordColor;
		author.style.backgroundColor = recordColor;
		dateOfAdding.style.backgroundColor = recordColor;
		action.style.backgroundColor = recordColor;
		
		rw.appendChild(date);
		rw.appendChild(subject);
		rw.appendChild(description);
		rw.appendChild(author);
		rw.appendChild(dateOfAdding);
		rw.appendChild(action);
		
		records.appendChild(rw);
		
		document.getElementsByClassName("action1")[recordCount].onclick = upvoteRecord;
		document.getElementsByClassName("action2")[recordCount].onclick = editRecord;
		document.getElementsByClassName("action3")[recordCount].onclick = removeRecord;
		
		document.getElementById("home").style.height = ((recordCount * 66) + 60) + "px";
		recordCount++;
	}
	else
	{
		alert("Ve Vámi zadaný den je již písemka z tohoto předmětu zadána. Daný záznam byl tedy upraven dle Vámi zadaných dat jakožto duplikát.")
		document.getElementsByTagName("tr")[yCursor].childNodes[0].innerHTML = dateWork;
		document.getElementsByTagName("tr")[yCursor].childNodes[1].innerHTML = document.getElementById("form2").value;
		document.getElementsByTagName("tr")[yCursor].childNodes[2].innerHTML = document.getElementById("form3").value;
		document.getElementsByTagName("tr")[yCursor].childNodes[3].innerHTML = document.getElementById("form4").value;
	}
}

function addRecord()
    {
        document.getElementById("form").style.display = "block";
		document.getElementById("form").style.backgroundColor = "#99FFFF";
		
		document.getElementById("form1").value = "";
		document.getElementById("form2").value = "";
		document.getElementById("form3").value = "";
		document.getElementById("form4").value = "";
		document.getElementById("priority1").childNodes[1].checked = false;
		document.getElementById("priority2").childNodes[1].checked = false;
		document.getElementById("priority3").childNodes[1].checked = true;
		document.getElementById("priority4").childNodes[1].checked = false;
		document.getElementById("priority5").childNodes[1].checked = false;
    }

function closeForm()
    {
        document.getElementById("form").style.display = "none";
    }

function upvoteRecord()
    {
        console.log("Upvoted");
    }

function editRecord(event)
        {
			yCursor = event.pageY;
            yCursor -= 60;
            yCursor /= 66;
			yCursor = Math.round(yCursor);
            //console.log("Editted");
            document.getElementById("form").style.display = "block";
			document.getElementById("form").style.backgroundColor = "#99FEFE";
			var dateTemp = document.getElementsByClassName("column1")[yCursor].innerHTML;
			var year=undefined;
			var month=undefined;
			var day=undefined;
			
			i=0;
			//console.log(dateTemp);
			
			for(; dateTemp[i] != "."; i++){
			if(day == undefined){day = dateTemp[i];}
			else{day += dateTemp[i];}
			}
			i++; i++;
			for(; dateTemp[i] != "."; i++){
			    if(month == undefined){month = dateTemp[i];}
				else{month += dateTemp[i];}
			}
			i++; i++;
			for(; dateTemp[i] != "." && dateTemp[i] != undefined; i++){
				if(year == undefined){year = dateTemp[i];}
				else{year += dateTemp[i];}
			}
			
			if(month >= 10){dateTemp = year + "-" + (month - 1) + "-" + day;}
			else{dateTemp = year + "-" + "0" + (month - 1) + "-" + day;}
			
            document.getElementById("form1").value = dateTemp;
			document.getElementById("form2").value = document.getElementsByClassName("column2")[yCursor].innerHTML;
			document.getElementById("form3").value = document.getElementsByClassName("column3")[yCursor].innerHTML;
			document.getElementById("form4").value = document.getElementsByClassName("column4")[yCursor].innerHTML;
			
			//console.log(document.getElementsByClassName("column1")[yCursor].style.backgroundColor);
			switch(document.getElementsByClassName("column1")[yCursor].style.backgroundColor){
				case "rgb(255, 136, 136)":
					document.getElementById("priority1").childNodes[1].checked = true;
					break;
				case "rgb(255, 204, 136)":
					document.getElementById("priority2").childNodes[1].checked = true;
					break;
				case "rgb(255, 255, 119)":
					document.getElementById("priority3").childNodes[1].checked = true;
					break;
				case "rgb(136, 238, 136)":
					document.getElementById("priority4").childNodes[1].checked = true;
					break;
				case "rgb(153, 153, 255)":
					document.getElementById("priority5").childNodes[1].checked = true;
					break;
			}
        }

function removeRecord(event)
        {
            //console.log("Deleted");
            var yCursor = event.pageY;
            yCursor -= 60;
            yCursor /= 66;
            //yCursor -= 1;
            yCursor = Math.round(yCursor);
            //console.log(yCursor);
            document.getElementById("data").removeChild(document.getElementsByTagName("tr")[yCursor]);
			recordCount--;
        }