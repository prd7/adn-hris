$(document).ready(function(){
	
	var t = $('#sample_3').DataTable();
	getEmployeeData(function(data){
		if(data.length){
			console.log("CAme back inside directory with data");
			for(var i=0;i<data.length;i++){
							if(data[i].get("profileImage")){
								var link = data[i].get("profileImage")._url;
								var image = "<img class=\"img-circle pull-left\" style=\"margin-top: 5px; margin-right: 10px\" src="+link+" width=\"54px\" height=\"54px\">";
							}else{
								var image = "<img class=\"img-circle pull-left\" style=\"margin-top: 5px; margin-right: 10px\" src=\"../assets/pages/media/users/avatar1.jpg\" width=\"54px\" height=\"54px\">";
							}
							var empId = data[i].get("empId");
							var empName = data[i].get("name");
							if(data[i].get("supervisorName")){
								var supervisorName = data[i].get("supervisorName");
							}else{
								var supervisorName = "";
							}
							
							var employeeGrade = data[i].get("employeeGrade");
							if(data[i].get("officeEmail")){
								var officeEmail = data[i].get("officeEmail");
							}else{
								var officeEmail = "";
							}
							if(data[i].get("designation")){
								var designation = data[i].get("designation");
							}else{
								var designation = "";
							}
							var department = data[i].get("department");
							var buisnessDivision = data[i].get("buisnessDivision");
							if(data[i].get("vertical")){
								var vertical = data[i].get("vertical");
							}else{
								var vertical = "";
							}
							if(data[i].get("subVertical")){
								var subVertical = data[i].get("subVertical");
							}else{
								var subVertical = "";
							}
							
							t.row.add([image,empId,empName,supervisorName,employeeGrade,officeEmail,designation,department,buisnessDivision,vertical,subVertical]).draw(false);
			}
		}
	});
	
});