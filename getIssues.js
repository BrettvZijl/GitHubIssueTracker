var client= new Array();	//name of client
var action= new Array();	//title of issue
var desc= new Array();	//description of issue
var num= new Array();		//number of issue
var priority= new Array(); //priority
var cat= new Array();		//category
var assign= new Array();		//assigned to 
var comments= new Array();		//comments
var state= new Array();		//status of issue
var output= new Array();

$(document).ready(function() {
	$.get("https://api.github.com/repos/MachineTi/spiraleye_openerp_addons_6.1/issues?per_page=100",function(data,status){
			
		var issues= eval(data);
			
		
		for (var z=0; z < issues.length; ++z){
			client[z]="<td>";	//name of client
			action[z]="<td>";	//title of issue
			desc[z]="<td>";	//description of issue
			num[z]="<td>";		//number of issue
			priority[z]="<td>"; //priority
			cat[z]="<td>"		//category
			assign[z]="<td>";	//assigned to 
			comments[z]="<td>";	//comments
			state[z]="<td>";
		}
		
		for (var i=0; i<issues.length; ++i){						//go through the issues object picking out the info
			for (var j=0; j<issues[i].labels.length; ++j){			//go through the labels finding the clients, category and priority
				var label= issues[i].labels[j].name;
				if (label[0]=='C'){
					client[i]= client[i] + label.substr(2);
				}
				else if (label[0]=='P'){
					priority[i]= priority[i] + label.substr(2);
				}
				else{
					cat[i]= cat[i] + label;
				}
			}//end for j
			
			action[i]= action[i] + issues[i].title;
			if (issues[i].body!= null){
				if (issues[i].body.search("<script>")> -1){
					//alert("found");
					desc[i]=	desc[i] + issues[i].body.substr(0, issues[i].body.indexOf("<script>"));
				}
				else{
					desc[i]= desc[i] + issues[i].body;
				}
			}
			num[i]= num[i] + issues[i].number;
			if (issues[i].assignee!= null){
				assign[i]= assign[i] + issues[i].assignee.login;
			}
			state[i]= state[i] + issues[i].state;
			
			client[i]=client[i] + "</td>";	
			action[i]=action[i] + "</td>";	
			desc[i]=desc[i] + "</td>";
			num[i]= num[i] + "</td>";		
			priority[i]=priority[i] + "</td>"; 
			cat[i]=cat[i] + "</td>";	
			assign[i]=assign[i] + "</td>";	
			comments[i]= comments[i] + "</td>";	
			state[i]=state[i] + "</td>";
			
			output[i]= "<tr>" + client[i] + action[i] + desc[i] + num[i] + priority[i] + cat[i] + assign[i] + comments[i] + state[i] + "</tr>";			//all the strings combined, to be appended to the table
			
			
			
			/*client="<td>";	
			action="<td>";	
			desc="<td>";	
			num="<td>";		
			priority="<td>"; 
			cat="<td>"		
			assign="<td>";	
			comments="<td>"	
			status="<td>";*/	
		}//end for i
		
		for (var y=0; y<issues.length; ++y){
			//alert(output[y]);
			$("#issues").append(output[y]);
		}
	});
	
	
});

function Sortvals(){
	var val= $("#sortVal").val();
	var ord= $("#sortOrd").val();
	
	if (val=="num"){
		if (ord=="asc"){
			sortByNumAsc();
		}
		else{
			sortByNumDesc();
		}
	}
	else{
		if (ord=="asc"){
			sortByPriAsc();
		}
		else{
			sortByPriDesc();
		}
	}
}

function sortByNumAsc(){								//sort the issues by GH Number in ascending order 
	var swapped=true;
	while (swapped){
		swapped=false;
		for (var i=1; i<output.length; ++i){
			var n1= num[i-1].substring(num[i-1].indexOf(">")+1, num[i-1].lastIndexOf("<"));
			var n2= num[i].substring(num[i].indexOf(">")+1, num[i].lastIndexOf("<"));
			
			if (parseInt(n1) > parseInt(n2)){
				//alert(n1+" "+n2+" "+i);
				var temp1= output[i-1];
				var temp2= num[i-1];
				output[i-1]= output[i];
				num[i-1]= num[i];
				output[i]=temp1;
				num[i]=temp2;
				swapped= true;
			}
		} 
	}
	var head= "<tr><th>Client Name</th><th>Action Item/Request</th><th>Description</th><th>GH Number</th><th>Priority</th><th>Category</th><th>Assigned To</th><th>Comments</th><th>Status</th></tr>";
	
	$("#issues").html(head);
	for (var y=0; y<output.length; ++y){
		//alert(output[y]);
		$("#issues").append(output[y]);
	}
}

/*
**************************************
Need to add function for swapping all the arrays values
**************************************
*/

function sortByNumDesc(){
	location.reload();
}
