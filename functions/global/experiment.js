
function uploadData(callback){
    var start = 0;
    var end = 461;
    for(i=start;i<end;i++){

        var Employee = Parse.Object.extend("Employee");
        var newEmployee = new Employee();

        newEmployee.set('empId',EmployeeDataJSON[i].A);
        newEmployee.set('userName',EmployeeDataJSON[i].A);
        newEmployee.set('password',EmployeeDataJSON[i].A);
        newEmployee.set('name',EmployeeDataJSON[i].C);
        newEmployee.set('passwordReset',false);
        newEmployee.set('designation',EmployeeDataJSON[i].D);
        newEmployee.set('department',EmployeeDataJSON[i].F);
        newEmployee.set('buisnessDivision',EmployeeDataJSON[i].E);
        newEmployee.set('officeEmail',EmployeeDataJSON[i].I);
        newEmployee.set('officePhone','9999999999');
        newEmployee.set('employeeGrade',EmployeeDataJSON[i].B);
        newEmployee.set('vertical',EmployeeDataJSON[i].G);
        newEmployee.set('subVertical',EmployeeDataJSON[i].H);
        //newEmployee.set('supervisor',new Employee());
        newEmployee.set('supervisorId',EmployeeDataJSON[i].J);
        newEmployee.set('supervisorName',EmployeeDataJSON[i].K);
        newEmployee.set('companyName','ADN Telecom');

        //personalDetails array
        var dummyArray = new Array();
        var dummyObj = new Object(); //create object to push into array
        //dummyObj.personal = new Array();
        dummyObj.gender = "Male";
        dummyObj.personalEmail = "";
        dummyObj.personalMobile = "";
        dummyObj.dob = "";
        dummyObj.bloodGroup = "";
        dummyObj.religion = "Islam";
        dummyObj.nationality = "Bangladesh";
        dummyObj.homePhone = "";
        dummyObj.motherName = "";
        dummyObj.fatherName = "";
        dummyObj.presentAddress = "";
        dummyObj.permanentAddress = "";
        dummyObj.maritialStatus = "";
        dummyObj.emergencyContactName = "";
        dummyObj.emergencyContactNumber = "";
        dummyObj.nationalId = "";
        dummyObj.birthRegistrationNumber = "";
        dummyObj.passportNumber = "";


        dummyArray.push(dummyObj);//push object into personal array
        newEmployee.set('personal',dummyArray);


        //academicDetails
        var dummyArray = new Array();
        var dummyObj = new Object(); //create object to push into academicDetails array
        dummyObj.levelOfEducation="";
        dummyObj.examDegreeTitle="";
        dummyObj.major="";
        dummyObj.instituteName="";
        dummyObj.result="";
        dummyObj.marks="";
        dummyObj.cgpa="";
        dummyObj.scale="";
        dummyObj.yearOfPassing="";
        dummyObj.duration="";
        dummyObj.achievements="";

        dummyArray.push(dummyObj);//push object into academicDetails array
        newEmployee.set('academicDetails',dummyArray);

        //familyDetails
        var dummyArray = new Array();
        var dummyObj = new Object(); //create object to push into familyDetails array
        dummyObj.relation="";
        dummyObj.name="";
        dummyObj.gender="";
        dummyObj.dateOfBirth="";
        dummyObj.age="";
        dummyObj.contact="";

        dummyArray.push(dummyObj);//push object into familyDetails array
        newEmployee.set('familyDetails',dummyArray);

        //officeDetails array
        var dummyArray = new Array();
        var dummyObj = new Object(); //create object to push into officeDetails array
        dummyObj.dateOfJoining = "";
        dummyObj.dateOfConfirmation = "";
        dummyObj.stateOfConfirmation = "";
        dummyObj.idCardNumber = "";
        dummyObj.officeMobileNumber = "";
        dummyObj.jobTitle = "";
        dummyObj.pfRating1516 = "";
        dummyObj.pfRating1617 = "";
        dummyObj.dateOfResignation = "";
        dummyObj.dateOfSeparation = "";
        dummyObj.separationType = "";
        dummyObj.separationEffectiveDate = "";
        dummyObj.workPermitNumber = "";
        dummyObj.effectiveDate = "";
        dummyObj.expiryDate = "";
        dummyObj.facility = "";
        dummyObj.city = "Dhaka";
        dummyObj.country = "Bangladesh";
        dummyObj.costCenter = "";

        dummyArray.push(dummyObj);//push object into officeDetails array
        newEmployee.set('officeDetails',dummyArray);

        var dummyArray = new Array();
        var dummyObj = new Object();

        dummyObj.designation = EmployeeDataJSON[i].D;
        dummyObj.department = EmployeeDataJSON[i].F;
        dummyObj.employeeCategory = "";
        dummyObj.buisnessDivision = EmployeeDataJSON[i].E;
        dummyObj.employeeGrade = EmployeeDataJSON[i].B;
        dummyObj.vertical = EmployeeDataJSON[i].G;
        dummyObj.subVertical = EmployeeDataJSON[i].H;
        //dummyObj.reportingManager = new Employee();
        dummyObj.reportingManagerId = "";
        //dummyObj.reviewer = new Employee();
        dummyObj.reviewerId = "";
        //dummyObj.buisnessHrSpoc = new Employee();
        dummyObj.buisnessHrSpocId = "";
        //dummyObj.buisnessHrHead = new Employee();
        dummyObj.buisnessHrHeadId = "";
        //dummyObj.groupHrHead = new Employee();
        dummyObj.groupHrHeadId = "";

        dummyArray.push(dummyObj);//push object into officeDetails array
        newEmployee.set('officePositionDetails',dummyArray);

        //previosWorkDetails
        var dummyArray = new Array();
        var dummyObj = new Object(); //create object to push into previosWorkDetails array
        dummyObj.companyName="";
        dummyObj.companyBuisness="";
        dummyObj.designation="";
        dummyObj.department="";
        dummyObj.responsibility="";
        dummyObj.companyLocation="Dhaka";
        dummyObj.employmentPeriod="";
        dummyObj.areaOfExperience="";

        dummyArray.push(dummyObj);//push object into previosWorkDetails array
        newEmployee.set('previousWorkDetails',dummyArray);

        //bankDetails
        var dummyArray = new Array();
        var dummyObj = new Object();
        dummyObj.bankName = "";
        dummyObj.accountName = "";
        dummyObj.accountNumber = "";
        dummyObj.currency = "";
        dummyArray.push(dummyObj);
        newEmployee.set('bankDetails',dummyArray);

        //salaryDetails
        var dummyArray = new Array();
        var dummyObj = new Object(); //create object to push into array
        dummyObj.basic = "xyz";
        dummyObj.hra = "xyz";
        dummyObj.conveyanceAllowance = "20";
        dummyObj.lfa = "xyz";
        dummyObj.medicalAllowance = "xyz";
        dummyObj.specialAllowance = "xyz";
        dummyObj.grossSalary = "xyz";
        dummyObj.lunchAllowance = "xyz";
        dummyObj.mobileAllowance = "xyz";
        dummyObj.otherAllowance = "xyz";
        dummyObj.totalEarnings = "xyz";
        dummyArray.push(dummyObj);//push object into array
        newEmployee.set('salaryDetails',dummyArray);//kraValue is the name of the array

        //otherBenefitDetails
        var dummyArray = new Array();
        var dummyObj = new Object(); //create object to push into array
        dummyObj.festivalAllowance = "E1001";
        dummyObj.providentFundMembership = "xyz";
        dummyObj.groupLifeInsurance = "yes";
        dummyObj.hospitalizationScheme = "yes";
        dummyArray.push(dummyObj);//push object into array
        newEmployee.set('otherBenefitDetails',dummyArray);

        //companyCarDetails
        var dummyArray = new Array();
        var dummyObj = new Object(); //create object to push into array
        dummyObj.registrationNumber = "E1001";
        dummyObj.effectiveDate = "xyz";
        dummyObj.expiryDate = "yes";
        dummyObj.fuelAllowance = "yes";
        dummyObj.maintainanceAllowance = "yes";
        dummyObj.driverAllowance = "yes";
        dummyObj.grossPay = "yes";
        dummyArray.push(dummyObj);//push object into array
        newEmployee.set('companyCarDetails',dummyArray);

        //personalCarDetails
        var dummyArray = new Array();
        var dummyObj = new Object(); //create object to push into array
        dummyObj.registrationNumber = "E1001";
        dummyObj.effectiveDate = "xyz";
        dummyObj.expiryDate = "yes";
        dummyObj.ownCarUsageAllowance = "yes";
        dummyArray.push(dummyObj);//push object into array
        newEmployee.set('personalCarDetails',dummyArray);

        var dummyArray = new Array();
        var dummyObj = new Object();
        dummyObj.officeInfoStatus =  false ;
        dummyObj.joiningDetailStatus = false ;
        dummyObj.performanceStatus =  false ;
        dummyObj.separationInfoStatus = false ;
        dummyObj.positionHistoryStatus = false ;
        dummyObj.perviousEmploymentStatus = false ;
        dummyObj.bankStatus = false ;
        dummyObj.salaryStatus =  false ;
        dummyObj.otherBenefitStatus = false ;
        dummyObj.companyCarStatus = false ;
        dummyObj.personalCarStatus = false ;
        dummyArray.push(dummyObj);
        newEmployee.set('statusOffice',dummyArray);

        var dummyArray = new Array();
        var dummyObj = new Object();
        dummyObj.personalStatus= false ;
        dummyObj.addressStatus= false ;
        dummyObj.academicStatus= false ;
        dummyObj.familyStatus= false ;
        dummyObj.documentStatus= false ;
        dummyArray.push(dummyObj);
        newEmployee.set('statusPersonal',dummyArray);

        newEmployee.save(null, {
          success: function(Employee) {
            console.log('New object created with objectId: ' + Employee.id);
            callback(true);
          },
          error: function(Employee, error) {
            // error is a Parse.Error with an error code and message.
            console.log('Failed to create new object, with error code: ' + error.message);
            callback(false);
          }
        });   
    }
}

/*

var sideMenuControlPanelObject = '<li class="nav-item '+ admin +' ">'+
'                               <a href="controlPanel.html" class="nav-link nav-toggle">'+
'                                   <i class="fa fa-gear"></i>'+
'                                    <span class="title">Control Panel</span>'+
'                                </a>'+
'                           </li>';

setCounters();
populateNoti();
//setSideMenu();

function setSideMenu(){
    var sideMenuControlPanelObject = '<li class="nav-item '+ admin +' ">'+
    '                               <a href="controlPanel.html" class="nav-link nav-toggle">'+
    '                                   <i class="fa fa-gear"></i>'+
    '                                    <span class="title">Control Panel</span>'+
    '                                </a>'+
    '                           </li>';

    if(localStorage.empId=="3010269"){
        var ul = document.getElementById("sideMenu");
       document.getElementById("sideMenu").append(sideMenuControlPanelObject);
    }
}


*/


/*

//function to upload documents
function uploadDocument(empId, id, type, callback) {
    // What to do here?
    var x = document.getElementById(id);
    var txt = "";
    if ('files' in x) {
        if (x.files.length == 0) {
            swal("No File Selected");
        } else {

            var file = x.files[0];
            if ('name' in file) {
                txt += "name: " + file.name + "<br>";
            }
            if ('size' in file) {
                txt += "size: " + file.size + " bytes <br>";
            }
            var reader = new FileReader();
            reader.addEventListener("load", function() {
                console.log(reader.result);
                var Employee = Parse.Object.extend("Employee");
                var query = new Parse.Query(Employee);
                query.equalTo("empId", empId);
                query.find({
                    success: function(results) {
                        if (results.length) {
                            var emp = results[0];
                            if (type == "smartCard") {
                                var parseFile = new Parse.File(empId + '_nIdSmartCard.jpg', {
                                    base64: reader.result
                                }, 'image/jpg');
                                emp.set('nIdSmartCard', parseFile);
                            } else if (type == "oldFormat") {
                                var parseFile = new Parse.File(empId + '_nIdOldFormat.jpg', {
                                    base64: reader.result
                                }, 'image/jpg');
                                emp.set('nIdOldFormat', parseFile);
                            } else if (type == "passport") {
                                var parseFile = new Parse.File(empId + '_passport.jpg', {
                                    base64: reader.result
                                }, 'image/jpg');
                                emp.set('passport', parseFile);
                            } else if (type == "birthRegistration") {
                                var parseFile = new Parse.File(empId + '_birthRegistration.jpg', {
                                    base64: reader.result
                                }, 'image/jpg');
                                emp.set('birthRegistration', parseFile);
                            } else {
                                var parseFile = new Parse.File(empId + 'profile.jpg', {
                                    base64: reader.result
                                }, 'image/jpg');
                                emp.set('profileImage', parseFile);
                            }
                            emp.save(null, {
                                success: function(emp) {
                                    //alert("file save success");
                                    swal("The file has been uploaded Successfully.");
                                    callback(true);
                                }
                            });

                        }
                    },
                    error: function(error) {
                        alert("Error: " + error.code + " " + error.message);
                    }
                });
                /*var parseFile = new Parse.File('image.png', { base64: reader.result },'image/png');
                showLoading();
                parseFile.save().then(function(result) {
                // The file has been saved to Parse.
                console.log("File Save Successfully")
                photoArray.push(result.url());
                console.log(photoArray);
                $("#new-venue-photos-section").append(file.name);
                $("#new-venue-photos-section").append('<hr/>');
                hideLoading();
                }, function(error) {
                // The file either could not be read, or could not be saved to Parse.
                hideLoading();
                console.log("File Save Failed");
                console.log(error)
                });*/
/*
            }, false);

            if (file) {
                reader.readAsDataURL(file);
            }
        }
    } else {
        alert("No File Selected");
    }
    console.log(txt);
}


*/