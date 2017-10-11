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

	$("#sendEmail").click(function(){
		/*
		sendEmail(['m.mayur404@gmail.com','theprithvirajdeshmukh@gmail.com'],[],'Test Email','Test Body',function(status){
			console.log("Sent Email Status "+status);
			alert("Email sent to test ids");
		});
		*/
	});
});