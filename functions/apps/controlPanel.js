$(document).ready(function(){

	//this is how we will populate datas
	console.log(EmployeeDataJSON);
	var start = 1;
	var end = 10;
	for(i=start;i<end;i++){
		console.log(EmployeeDataJSON[i].A);
		console.log(EmployeeDataJSON[i].B);
		console.log(EmployeeDataJSON[i].C);
		console.log(EmployeeDataJSON[i].D);
		console.log(EmployeeDataJSON[i].E);
		console.log(EmployeeDataJSON[i].F);
		console.log(EmployeeDataJSON[i].G);
		console.log(EmployeeDataJSON[i].H);
		console.log(EmployeeDataJSON[i].I);
		console.log(EmployeeDataJSON[i].J);
	}
	/*
	$('#bulkUpload').click(function (){
		uploadData(function(status){
			alert("Data uploaded");
		});
	});*/


	$('#addEmployee').click(function (){
		window.location.href = 'add_employee.html';
	});
	$('#bulkEmail').click(function (){
		window.location.href = 'selectWizard.html';
	});
	$('#initiateKRA').click(function (){
		window.location.href = 'selectWizard.html';
	});
	$('#initiateLearning').click(function (){
		window.location.href = 'selectWizard.html';
	});
	$('#batchReports').click(function (){
		window.location.href = 'reports.html';
	});
	$('#directory').click(function (){
		window.location.href = 'directory.html';
	});
});