$(document).ready(function(){
	console.log("Jquery loaded for report_table");
	populateList();
});

//function to populate bootstrap datatable
function populateList(){

	var t = $('#sample_3').DataTable();
	getBatchStats(function(status,results){
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
						t.row.add([data[0].get("batchId"),'KRA',startDate,data.length,inProgressCount,completedCount,rejectedCount,"Withdrew"]).draw(false);
					});
				}else if(type=="Learning"){
					getLearningStats(batchId,function(status,data){
						//console.log("And the "+batchId+" is of type :"+type+" and was started on "+startDate);	
						var inProgressCount = 0;
						var completedCount = 0;
						var rejectedCount = 0;
						var initiatedCount = 0;

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
						t.row.add([data[0].get("batchId"),'KRA',startDate,data.length,inProgressCount,completedCount,rejectedCount,"Withdrew"]).draw(false);
						
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
/*
	for(i=0;i<data.length;i++){
		var empId = data[i].get('empId');
		var name = data[i].get('name');
		var dept = data[i].get('department');
		var grade = data[i].get('employeeGrade');
		//var checkboxClass = 'checkboxSel'+i;
		//var checkbox = '<input id="btSelectItem'+i+'" type="checkbox" value="'+data[i].get('empId')+'" name="tableSelect">';
	//t.row.add(['KRA','startDate',name,dept,dept,dept,dept,grade]).draw(false);
	}
*/