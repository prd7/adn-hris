$(document).ready(function(){
	console.log("Jquery Loaded for login page.");
	$("#printFunction").click(function(){
	    window.print();
	});
    
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
					swal("Wrong username or password.");
				}
			});	
		}
		else{
			swal("Please enter username and password");
		}
	});

	//forget password function
	$("#submitForget").click(function(){
		var email = $("#forgetEmail").val();
		if(validateEmail(email)){
			console.log("is valid");	
			forgetPasswordMail(email,function(status,results){
				if(status){
					console.log(results);
					console.log(results[0].get("empId"));
					console.log(results[0].get("officeEmail"));
					console.log(results[0].get("userName"));
					console.log(results[0].get("password"));
					
					var emailSubject = "You have raised a password change request "+results[0].get("name")+".";
					var emailBody = "Your old user name is "+results[0].get("userName")+" and your old password is "+results[0].get("password")+". PLease Login And reset your pass.";
					
					//pass values to sendMail function to send mails
					sendEmail(email,'',emailSubject,emailBody,function(status){
						console.log("Sent Email Status "+status);
						swal("Email sent to your registered email ID");
					});				
				}else{
					console.log("Email not registered");
					swal({
					  title: "Email not registered!",
					  text: "Please enter a valid registered email address.",
					  type: "warning",
					  showCancelButton: false,
					  confirmButtonClass: "btn-warning",
					  confirmButtonText: "Ok",
					  closeOnConfirm: true
					},
					function(){
					  	window.location.href= "index.html";	
				});

				}
			});
		}else{
			console.log("is not valid");
		}
	});
});

function validateEmail(email) {
  var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  return emailReg.test( email );
}
