$(document).ready(function(){
	
	var t = $('#sample_3').DataTable();

	if(getUrlVars()["typeId"]){
		var data = getUrlVars()["typeId"];

		var dataArray = data.split('_');
	    
	    var globalBatchId= dataArray[0]+"_"+dataArray[1];
	    var globalTypeId=dataArray[2]
	}else{
		swal({
					  title: "Please select Batch!",
					  text: "Specify the batch and then check it's progress.",
					  type: "warning",
					  showCancelButton: false,
					  confirmButtonClass: "btn-warning",
					  confirmButtonText: "Ok",
					  closeOnConfirm: true
					},
					function(){
					  	window.location.href= "reports.html";	
		});
	}

	getBatchStats(globalBatchId,function(status,results){
		console.log(results);
		$("#batchStartDate").html(dateTimeString(results[0].get("startDate")));
		$("#batchEndDate").html(dateTimeString(results[0].get("endDate")));
		if(results.length){
			for(var i=0;i<results.length;i++){
				console.log("This is the "+i+" Loop of batch Table");
				var batchId = results[i].get("batchId");
				var type = results[i].get("type");
				var startDate = dateTimeString(results[i].get('startDate'));

				if(type=="KRA"){
					getKraStats(batchId,function(status,data){
						
						for(var i=0;i<data.length;i++){
							var empId = data[i].get("empId");
							var empName = data[i].get("empName");
							if(data[i].get("supervisorName")){
								var supervisorName = data[i].get("supervisorName");
							}else{
								var supervisorName = "";
							}
							var stage = data[i].get("stage");
							var image = "<img class=\"img-circle pull-left\" style=\"margin-top: 5px; margin-right: 10px\" src=\"../assets/pages/media/users/avatar1.jpg\" width=\"54px\" height=\"54px\">";
							var submissionDate = dateTimeString(data[i].get("endDate"));
							var endDate = dateTimeString(data[i].get("valDate"));
							t.row.add([image,empId,empName,supervisorName,stage,submissionDate,endDate]).draw(false);
						}	
					});
				}else if(type=="Learning"){
					getLearningStats(batchId,function(status,data){

							for(var i=0;i<data.length;i++){
							var empId = data[i].get("empId");
							var empName = data[i].get("empName");
							var supervisorName = data[i].get("supervisorName");
							var stage = data[i].get("stage");
							var submissionDate = data[i].get("endDate");
							var endDate = data[i].get("valDate");
							t.row.add([empId,empName,supervisorName,stage,submissionDate,endDate]).draw(false);
						}	
					});
				}
			}
		}
	});

	/*$("#batchIdentify").html(globalBatchId);
	//$("#batchStartDate").html(globalTypeId);*/
});