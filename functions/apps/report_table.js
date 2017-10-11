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
				console.log("This is the "+i+" Loop");
				var batchId = results[i].get("batchId");
				var type = results[i].get("type");		
				var startDate = dateTimeString(results[i].get('startDate'));

				if(type=="KRA"){
					//console.log("Identified this batch "+batchId+" as KRA");
					getKraStats(batchId,function(status,data){
						//console.log("The targeted Users are : "+data.length);
						console.log("And the "+batchId+" is of type :"+type+" and was started on "+startDate);	
						t.row.add([data[0].get("batchId"),'KRA',startDate,data.length,"inProgress","completed","rejected","Withdrew"]).draw(false);
					});
				}else if(type=="Learning"){
					//console.log("Identified this batch "+batchId+" as Learning");
					getLearningStats(batchId,function(status,data){
						//console.log("The targeted Users are : "+data.length);
						console.log("And the "+batchId+" is of type :"+type+" and was started on "+startDate);	
						t.row.add([data[0].get("batchId"),'Learning',startDate,data.length,"inProgress","completed","rejected","Withjdrew"]).draw(false);
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