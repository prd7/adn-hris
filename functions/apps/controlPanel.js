$(document).ready(function(){
	$("#sendEmail").click(function(){
		sendEmail(['m.mayur404@gmail.com','theprithvirajdeshmukh@gmail.com'],[],'Test Email','Test Body',function(status){
			console.log("Send Email Status "+status);
		});
	});
});