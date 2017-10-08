$(document).ready(function(){
	console.log("Jquery Loaded");

	//password matching while typing
	$('#password_strength, #confirm_password').on('keyup', function () {
      if ($('#password_strength').val() == $('#confirm_password').val()) {
        $('#message').html('Matching').css('color', 'green');
      } else 
        $('#message').html('Not Matching').css('color', 'red');
    });


	$("#submitForm").click(function(){
		console.log("Came inside");
		var empObject = JSON.parse(localStorage.empObject);
		var username = empObject.userName;
		var password = $("#password_strength").val();
		var repassword = $("#confirm_password").val();

		if(password != repassword){
			swal("Error!", "Passwords do not match.", "warning");
			console.log("password DONT match!");
		}
		else{
			console.log("password match! now going in changePassword");
			//cahnge password in module
			changePassword(username,password,function(status){
				console.log("Password Changed");
				//swal confirmation before loging out
				swal({
				  title: "Password changed successfully!",
				  text: " Please LogIn again with new password.",
				  type: "success",
				  showCancelButton: false,
				  confirmButtonClass: "btn-success",
				  confirmButtonText: "Ok",
				  closeOnConfirm: true
				},
				function(){
					console.log("Came in Swal");
					clearLocalStorage();
				  	window.location.href= "../index.html";	
				});
				//window.location.href= "../index.html";
			});
		}		
	});

	function clearLocalStorage() {
	   localStorage.clear();
	   console.log("Cleared Local Storage");
	};
});