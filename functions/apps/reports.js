$(document).ready(function(){
	console.log("Jquery loaded for report_table");
	$("#printFunction").click(function(){
	    window.print();
	});
	populateList();
});

//function to populate bootstrap datatable
function populateList(){

	var t = $('#sample_3').DataTable();
	var batchId = "";
	getBatchStats(batchId,function(status,results){
		console.log(results);
		if(results.length){
			for(var i=0;i<results.length;i++){
				console.log("This is the "+i+" Loop of batch Table");
				var batchId = results[i].get("batchId");
				var type = results[i].get("type");		
				var startDate = dateTimeString(results[i].get('startDate'));

				if(type=="KRA"){
					getKraStats(batchId,function(status,data){
						
						var inProgressCount = 0;
						var completedCount = 0;
						var rejectedCount = 0;
						var initiatedCount = 0;
						var linkBox = '<a align="center" href="reports_workflow.html?typeId='+data[0].get("batchId")+'_KRA"><i class="fa fa-expand"></i></a>'

						for(var i=0;i<data.length;i++){
							var stage = data[i].get("stage");
							switch (stage)
							{
							   case "inProgress":
							   		inProgressCount++;
							   		console.log("inProgress found,now breaking");
							   		break;

							   case "accepted":
							   		completedCount++;
							   		console.log("accepted case found now breaking");
							   		break;

							   case "rejected": 
							       rejectedCount++;
							       console.log('found rejected case now breaking');
							       break;

							   default: 
							       console.log('This case is of init');
							       initiatedCount++;
							       break;
							}
							console.log("This is the "+i+" Loop inProgress:"+inProgressCount+" completed: "+completedCount+" rejected :"+rejectedCount);
						}	
						t.row.add([linkBox,'KRA',data[0].get("batchId"),startDate,data.length,inProgressCount,completedCount,rejectedCount]).draw(false);
					});
				}else if(type=="Learning"){
					getLearningStats(batchId,function(status,data){
						//console.log("And the "+batchId+" is of type :"+type+" and was started on "+startDate);	
						var inProgressCount = 0;
						var completedCount = 0;
						var rejectedCount = 0;
						var initiatedCount = 0;
						var linkBox = '<a align="center" href="reports_workflow.html?typeId='+data[0].get("batchId")+'_Learning"><i class="fa fa-expand"></i></a>'

						for(var i=0;i<data.length;i++){
							var stage = data[i].get("stage");
							switch (stage)
							{
							   case "inProgress":
							   		inProgressCount++;
							   		break;

							   case "accepted":
							   		completedCount++;
							   		break;

							   case "rejected": 
							       rejectedCount++;
							       break;

							   default: 
							       initiatedCount++;
							       break;
							}
						}
						t.row.add([linkBox,'Learning',data[0].get("batchId"),startDate,data.length,inProgressCount,completedCount,rejectedCount]).draw(false);
						
						//t.row.add([data[0].get("batchId"),'Learning',startDate,data.length,"inProgress","completed","rejected","Withdrew"]).draw(false);
					});
				}
			}
		}
	});
}

/*
for(var i=0;i<data.length;i++){
							var stage = data[i].get("stage");
						}
*/