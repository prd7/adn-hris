$(document).ready(function(){
	console.log("Jquery Loaded for login page.");
    
$('.forget-password').click(function(){
	$('.login-form').hide();
	$('.forget-form').show();
})

	if(localStorage.empId){
		console.log(localStorage.empId);
		console.log(localStorage.empObject);
		var empObject = JSON.parse(localStorage.empObject);
		console.log(empObject.password);
	}

	$("#submitForm").click(function(){

		var username = $("#username").val();
		var password = $("#password").val();

		console.log("Got into Login.js");
		if(username && password){
			checklogin(username,password,function(status,data){
				if(status){
					$("#username").val();
					$("#password").val();
					var department=data.get("department");
					//alert(department);
					
					if(data.get("passwordReset")){
						if(department=="Human Resources"){
							window.location.href= "pages/controlPanel.html";
						}else{
							window.location.href= "pages/userProfile.html"; //redirect to index page if password is changed once
							//window.location.href= "home.html";
						}
					}
					else{
						window.location.href= "pages/password_change.html"; //redirect to change password for new user
					}
				}
				else{
					alert("Wrong username or password.");
				}
			});	
		}
		else{
			alert("Please enter username and password");
		}
	});
});
