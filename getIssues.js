$.get("https://api.github.com/repos/MachineTi/spiraleye_openerp_addons_6.1/issues",function(data,status){
    var object=eval(data);
	$("#plc").text("Title: " + object[1].title + " Client: " + object[1].labels[1].name);
});

