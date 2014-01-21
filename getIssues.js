$.get("https://api.github.com/repos/MachineTi/spiraleye_openerp_addons_6.1/issues?per_page=100",function(data,status){
    var client="<td>";	//name of client
	var action="<td>";	//title of issue
	var desc="<td>";	//description of issue
	var num="<td>";		//number of issue
	var priority="<td>"; //priority
	var cat="<td>"		//category
	var assign="<td>";	//assigned to 
	var comments="<td>"	//comments
	var status="<td>";	//status of issue
	
	var issues= eval(data);
	
	for (var i=0; i<issues.length; ++i){						//go through the issues object picking out the info
		for (var j=0; j<issues[i].labels.length; ++j){			//go through the labels finding the clients, category and priority
			var label= issues[i].labels[j].name;
			if (label[0]=='C'){
				client= client + label.substr(2);
			}
			else if (label[0]=='P'){
				priority= priority + label.substr(2);
			}
			else{
				cat= cat + label + "</td>";
			}
		}//end for j
		
		action= action + issues[i].title;
		desc=	desc + issues[i].body;
		num= num + issues[i].number;
		if (issues[i].assignee!= null){
			assign= assign + issues[i].assignee.login;
		}
		status= status + issues[i].state;
		
		client=client + "</td>";	
		action=action + "</td>";	
		desc=desc + "</td>";
		num= num + "</td>";		
		priority=priority + "</td>"; 
		cat=cat + "</td>";	
		assign=assign + "</td>";	
		comments= comments + "</td>";	
		status=status + "</td>";
		
		var output= "<tr>" + client + action + desc + num + priority + cat + assign + comments + status + "</tr>";			//all the strings combined, to be appended to the table
		
		$("#issues").append(output);
		
		client="<td>";	
		action="<td>";	
		desc="<td>";	
		num="<td>";		
		priority="<td>"; 
		cat="<td>"		
		assign="<td>";	
		comments="<td>"	
		status="<td>";	
	}//end for i
});

