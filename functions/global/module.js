// Initialize Parse
Parse.initialize("vrfgweyfrhcq82h8rtcrgeg");
Parse.serverURL = 'http://adn-server.herokuapp.com/parse'

Date.prototype.addHours = function(h) {
    this.setTime(this.getTime() + (h * 60 * 60 * 1000));
    return this;
}
Date.prototype.subHours = function(h) {
    this.setTime(this.getTime() - (h * 60 * 60 * 1000));
    return this;
}

function getUrlVars() {
    var vars = [],
        hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

function dateTimeString(eventDate) {
    var monthString = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var dateString = eventDate.getDate() + " " + monthString[eventDate.getMonth()];
    var hours = eventDate.getHours();
    var min = eventDate.getMinutes();
    if (min < 10) {
        min = "0" + min;
    }
    if (hours > 12) {
        //PM Time
        hours = hours % 12;
        var timeString = hours + ":" + min + " PM";
    } else {
        hours = hours % 12;
        if (hours == 0) {
            hours = 12;
            var timeString = hours + ":" + min + " PM";
        } else {
            var timeString = hours + ":" + min + " AM";
        }
        //AM Time
    }
    var finalTime = dateString + ', ' + timeString;
    return finalTime;
}

//a generic function to send notifications
function sendNoti(senderId, type, title, body, link, recipientId) {
    console.log("came in to set notifications");
    getNotificationCount(function(count) { //get count of entries in Learning table
        var Notification = Parse.Object.extend("Notification");
        var newNoti = new Notification();

        newNoti.set('notiId', 'noti_' + (count + 1));
        newNoti.set('senderId', senderId);
        newNoti.set('type', type);
        newNoti.set('title', title);
        newNoti.set('body', body);
        newNoti.set('link', link);
        newNoti.set('recipientId', recipientId);
        newNoti.set('isUnread', true);
        //newNoti.set('isHidden',false);
        newNoti.set('startDate', new Date());
        //newNoti.set('readDate',new Date());

        newNoti.save(null, {
            success: function(Notification) {
                console.log("notifications sent");
                console.log('New notification object created with objectId: ' + Notification.id);
            },
            error: function(Notification, error) {
                console.log('Failed to create new object, with error code: ' + error.message);
            }
        });
    });

}

//function to get notifications count in the header.js
function getNotificationCount(callback) {
    var Notification = new Parse.Object.extend('Notification');
    var query = new Parse.Query(Notification);
    var notificationIndex = 0;
    query.count({
        success: function(count) {
            //console.log(count);
            callback(count);
        }
    });
}

//function to fetch notifications
function fetchNotifications(empId,type,callback) {
    //console.log("Fetching Notifications for:"+type);
    var Notification = Parse.Object.extend("Notification");
    var query = new Parse.Query(Notification);
    query.equalTo("recipientId", empId);
    if(type=="isUnread"){
        query.equalTo("isUnread", true);
    }else{
        query.equalTo("isUnread", false);
    }
    query.find({
        success: function(results) {
            if (results.length) {
                callback(true, results);
            } else {
                callback(false, null);
            }
        },
        error: function(error) {
            console.log("Error : " + error.code + " " + error.message);
        }
    });
}

//function to mark notification status as read
function markRead(objectId, callback) {
    var Notification = Parse.Object.extend("Notification");
    var query = new Parse.Query(Notification);
    query.equalTo("objectId", objectId);
    query.find({
        success: function(results) {
            console.log(results[0]);
            var newNoti = results[0];
            newNoti.set('isUnread', false);
            newNoti.save(null, {
                success: function(Notification) {
                    console.log("notifications marked read");
                    callback(true);
                    //console.log('New object created with objectId: ' + Notification.id);
                },
                error: function(Notification, error) {
                    console.log('Failed to create new object, with error code: ' + error.message);
                }
            });
        }
    });
}

//login function
function checklogin(username, password, callback) {
    console.log("came in checkLOgin in the module.");
    var Employee = Parse.Object.extend("Employee");
    var query = new Parse.Query(Employee);
    query.equalTo("userName", username);
    query.equalTo("password", password);
    query.find({
        success: function(results) {
            if (results.length) {
                //to get info in local storage upon first login
                localStorage.empId = results[0].get('empId');
                localStorage.empObject = JSON.stringify(results[0]);
                localStorage.loggedIn = "true";
                callback(true, results[0]);
            } else {
                callback(false, null);
            }
        },
        error: function(error) {
            alert("Error: " + error.code + " " + error.message);
        }
    });
}

//function to add new employee
function addEmployee(empArray, callback) {
    var Emp = new Parse.Object.extend('Employee');
    var newEmp = new Emp();

    newEmp.set('name', empArray[0].value);
    newEmp.set('officeEmail', empArray[1].value);
    newEmp.set('officeMobile', empArray[2].value);
    newEmp.set('empId', empArray[3].value);
    newEmp.set('buisnessDivsion', empArray[4].value);
    newEmp.set('department', empArray[5].value);
    newEmp.set('vertical', empArray[6].value);
    newEmp.set('subVertical', empArray[7].value);
    newEmp.set('designation', empArray[8].value);
    //newEmp.set('jobTitle',empArray[9].value);
    //save it in newEmp
    newEmp.save(null, {
        success: function(Employee) {
            //console.log('New employee object created with objectId: ' + Employee.id);
            callback(true);
        },
        error: function(Employee, error) {
            // error is a Parse.Error with an error code and message.
            alert('Failed to create new object, with error code: ' + error.message);
        }
    });
}


//empId validation function
function validateEmpId(empId, callback) {
    console.log("came into validation function");
    console.log(empId);
    var Employee = Parse.Object.extend("Employee");
    var query = new Parse.Query(Employee);
    query.equalTo("empId", empId);
    query.count({
        success: function(count) {
            console.log(count);
            if (count > 0) {
                //to get info in local storage upon first login
                callback(false);
            } else {
                callback(true);
            }
        },
        error: function(error) {
            alert("Error: " + error.code + " " + error.message);
        }
    });
}

//chaneg password
function changePassword(username, password, callback) {
    console.log("came in changePassword in the module.");
    var Employee = Parse.Object.extend("Employee");
    var query = new Parse.Query(Employee);
    query.equalTo("userName", username);
    query.find({
        success: function(results) {
            if (results.length) {
                console.log("Came into results function");
                var newEmp = results[0];
                newEmp.set('password', password);
                newEmp.set('passwordReset', true); //setting change password to true indication pass reset for first time
                newEmp.save(null, {
                    success: function(Employee) {
                        callback(true);
                    },
                    error: function(Employee, error) {
                        alert('Failed to create new object, with error code: ' + error.message);
                    }
                });
                console.log("changed the password in module.");
                callback(true, results[0]);
            } else {
                callback(false, null);
            }
        },
        error: function(error) {
            alert("Error: " + error.code + " " + error.message);
        }
    });
}

//function to submit personal form
function submitPersonal(empId, dataArray, type, callback) {
    console.log("Came inside submitPersonal in module.js " + empId);

    var Employee = Parse.Object.extend("Employee");
    var query = new Parse.Query(Employee);
    query.equalTo("empId", empId);
    query.find({
        success: function(results) {
            if (results.length) {
                console.log("came into results  function " + empId);
                var newEmp = results[0];
                console.log("This is the employee");
                console.log(newEmp);
                console.log(dataArray);
                //access the status array to update status of each accordion
                var statusArray = results[0].get("statusPersonal");

                var personalArray = results[0].get("personal"); //to fetch existing array
                var academicDetailsArray = results[0].get("academicDetails"); //to fetch existing array
                var familyDetailsArray = results[0].get("familyDetails"); //to fetch existing array
                var length = dataArray.length;
                var dummyObj = new Object();

                if (type == "personal") {
                    console.log("came inside personal condition");
                    personalArray[0].gender = dataArray[4].value;
                    personalArray[0].personalEmail = dataArray[8].value;
                    newEmp.set('officeEmail',dataArray[9].value);
                    personalArray[0].personalMobile = dataArray[6].value;
                    personalArray[0].dob = dataArray[5].value;
                    personalArray[0].bloodGroup = dataArray[10].value;
                    personalArray[0].religion = dataArray[11].value;
                    personalArray[0].nationality = dataArray[13].value;
                    personalArray[0].homePhone = dataArray[7].value;
                    personalArray[0].motherName = dataArray[3].value;
                    personalArray[0].fatherName = dataArray[2].value;
                    personalArray[0].maritialStatus = dataArray[12].value;
                    personalArray[0].emergencyContactName = dataArray[14].value;
                    personalArray[0].emergencyContactNumber = dataArray[15].value;
                    statusArray[0].personalStatus = true;//this will set the status of personal array
                    //console.log("came till the end");
                    console.log(statusArray[0].personalStatus);
                } else if (type == "address") {
                    personalArray[0].presentAddress = dataArray[0].value + "," + dataArray[1].value + "," + dataArray[2].value + "," + dataArray[3].value + "," + dataArray[4].value + "," + dataArray[5].value;
                    personalArray[0].permanentAddress = dataArray[6].value + "," + dataArray[7].value + "," + dataArray[8].value + "," + dataArray[9].value + "," + dataArray[10].value + "," + dataArray[11].value;
                    statusArray[0].addressStatus = true
                }
                newEmp.set('personal', personalArray);

                if (type == "academic") {
                    for (i = 0; i < (length / 11); i++) {
                        var academicObj = new Object();
                        academicObj.levelOfEducation = dataArray[(11 * i) + 0].value;
                        academicObj.examDegreeTitle = dataArray[(11 * i) + 1].value;
                        academicObj.major = dataArray[(11 * i) + 2].value;
                        academicObj.instituteName = dataArray[(11 * i) + 3].value;
                        academicObj.result = dataArray[(11 * i) + 4].value;
                        academicObj.marks = dataArray[(11 * i) + 5].value;
                        academicObj.cgpa = dataArray[(11 * i) + 6].value;
                        academicObj.scale = dataArray[(11 * i) + 7].value;
                        academicObj.yearOfPassing = dataArray[(11 * i) + 8].value;
                        academicObj.duration = dataArray[(11 * i) + 9].value;
                        academicObj.achievements = dataArray[(11 * i) + 10].value;
                        //push this object to the array
                        console.log(academicObj);
                        academicDetailsArray.push(academicObj);
                    }
                    newEmp.set('academicDetails', academicDetailsArray);
                    statusArray[0].academicStatus = true
                }else if (type == "family") {
                    for (i = 0; i < (length / 9); i++) {

                        for (j = 0; j < 9; j++) {
                            var familyObj = new Object();
                            familyObj.name = dataArray[(9 * i) + j].value;
                            familyObj.relation = dataArray[(9 * i) + j].value;
                            familyObj.gender = dataArray[(9 * i) + j].value;
                            familyObj.contact = dataArray[(9 * i) + j].value;
                            familyObj.dateOfBirth = dataArray[(9 * i) + j].value;
                            familyObj.age = dataArray[(9 * i) + j].value;
                        }
                        familyDetailsArray.push(familyObj);
                    }
                    statusArray[0].familyStatus = true
                    newEmp.set('familyDetails', familyDetailsArray);
                }

                newEmp.set('statusPersonal', statusArray);
                newEmp.save(null, {
                    success: function(Employee) {
                        console.log('New object created/saved with objectId: ' + Employee.id);
                        callback(true);
                    },
                    error: function(Employee, error) {
                        alert('Failed to create new object, with error code: ' + error.message);
                    }
                });
            } else {
                callback(false);
            }
        },
        error: function(error) {
            alert("Error: " + error.code + " " + error.message);
        }
    });
}

//function to check the values of status array in database
function checkStatus(empId, type, callback) {
    console.log("Came inside function to check if the values are present in the array");

    var Employee = Parse.Object.extend("Employee");
    var query = new Parse.Query(Employee);
    query.equalTo("empId", empId);
    query.find({
        success: function(results) {
            if (results.length) {
                var newEmp = results[0];
                if (type == "personal") {
                    var statusArray = results[0].get("statusPersonal");
                    //console.log(statusArray);
                    var length = statusArray.length;
                    if (statusArray[0].personalStatus && statusArray[0].addressStatus && statusArray[0].academicStatus && statusArray[0].familyStatus && statusArray[0].documentStatus) {
                        //addToApprovalTable('employeeProfile', 'p_'+Employee.get('empId'), Employee.get('hrId'),Employee.get('empId'),Employee.get('name'), 'live', new Date()); 
                        console.log("all values are true in personal status");
                    } else {
                        console.log("All status flags are not true yet");
                    }
                    //console.log(results[0].get("personal"));
                    callback(results[0]);
                } else if (type == "office") {
                    var statusArray = results[0].get("statusOffice");
                    console.log(statusArray);
                    console.log("Came inside office array");
                    if (statusArray[0].officeInfoStatus && statusArray[0].joiningDetailStatus && statusArray[0].performanceStatus && statusArray[0].separationInfoStatus && statusArray[0].positionHistoryStatus && statusArray[0].perviousEmploymentStatus && statusArray[0].bankStatus && statusArray[0].salaryStatus && statusArray[0].otherBenefitStatus && statusArray[0].companyCarStatus && statusArray[0].personalCarStatus) {
                        console.log("all vlaues are true in office status");
                        //addToApprovalTable('employeeProfile', 'ofc_'+Employee.get('empId'), Employee.get('supervisorId'),Employee.get('hrId'),Employee.get('hrId'), 'live', new Date()); //this will add a copy to input table
                    }
                    callback(results[0]);
                }
            }
        },
        error: function(error) {
            alert("Error: " + error.code + " " + error.message);
        }
    });
}


//submit office info
function submitOfficeInfo(empId, dataArray, type, callback) {
    console.log("Came inside submitOfficeInfo in module.js " + empId);

    var Employee = Parse.Object.extend("Employee");
    var query = new Parse.Query(Employee);
    query.equalTo("empId", empId);
    query.find({
        success: function(results) {
            if (results.length) {
                console.log("came into results  function " + empId);
                var newEmp = results[0];
                console.log(newEmp); //result found in search
                console.log(dataArray); //array passed to this function

                //access the status array to update status of each accordion
                var statusArray = results[0].get("statusOffice");

                var officeArray = results[0].get("officeDetails");
                var dummyObj = new Object();
                //console.log(officeArray[0]);

                //if(officeArray[0]){
                if (type == "basicOffice") {
                    console.log("came in basicOffice");
                    //newEmp.set('officeEmail',dataArray[4].value);
                    //newEmp.set('officeEmail',dataArray[4].value);
                    //newEmp.set('officeMobile',dataArray[6].value);

                    officeArray[0].idCardNumber = dataArray[2].value;
                    officeArray[0].companyName = dataArray[3].value;
                    officeArray[0].facility = dataArray[7].value;
                    officeArray[0].city = dataArray[8].value;
                    officeArray[0].country = dataArray[9].value;
                    officeArray[0].costCenter = dataArray[10].value;
                    statusArray[0].officeInfoStatus = true //status flag for basic office info
                } else if (type == "joiningDetails") {
                    console.log("came in joiningDetails");
                    officeArray[0].dateOfJoining = dataArray[0].value;
                    officeArray[0].dateOfConfirmation = dataArray[1].value;
                    officeArray[0].stateOfConfirmation = dataArray[2].value;
                    officeArray[0].workPermitNumber = dataArray[3].value;
                    officeArray[0].effectiveDate = dataArray[4].value;
                    officeArray[0].expiryDate = dataArray[5].value;
                    statusArray[0].joiningDetailStatus = true //status flag for joining details info
                } else if (type == "performanceRating") {
                    console.log("came in performanceRatingr");
                    officeArray[0].pfRating1516 = dataArray[0].value;
                    officeArray[0].pfRating1617 = dataArray[1].value;
                    statusArray[0].performanceStatus = true //status flag for performance rating
                } else if (type == "separationDetails") {
                    console.log("came in separationDetails");
                    officeArray[0].dateOfResignation = dataArray[23].value;
                    officeArray[0].dateOfSeparation = dataArray[5].value;
                    officeArray[0].separationEffectiveDate = dataArray[9].value;
                    officeArray[0].separationType = dataArray[24].value;
                    statusArray[0].separationInfoStatus = true //status flag for separation details
                }
                //}

                newEmp.set('statusOffice', statusArray);
                newEmp.set('officeDetails', officeArray);
                newEmp.save(null, {
                    success: function(Employee) {
                        console.log('New object created/saved with objectId: ' + Employee.id);
                        callback(true);
                    },
                    error: function(Employee, error) {
                        alert('Failed to create new object, with error code: ' + error.message);
                    }
                });
                //callback(true);
            } else {
                callback(false);
            }
        },
        error: function(error) {
            alert("Error: " + error.code + " " + error.message);
        }
    });
}

//function to submit previous emp details in the office profile(HR)
function submitPositionDetails(empId, dataArray, callback) {
    console.log("Came inside PositionDetails in module.js " + empId);

    var Employee = Parse.Object.extend("Employee");
    var query = new Parse.Query(Employee);
    query.equalTo("empId", empId);
    query.find({
        success: function(results) {
            if (results.length) {
                console.log("came into results  function " + empId);
                var newEmp = results[0];
                console.log(newEmp);
                console.log(dataArray);

                newEmp.set('designation', empArray[0].value);
                newEmp.set('employeeGrade', empArray[2].value);
                newEmp.set('buisnessDivision', empArray[3].value);
                newEmp.set('department', empArray[4].value);
                newEmp.set('vertical', empArray[5].value);
                newEmp.set('subVertical', empArray[6].value);

                var statusArray = results[0].get("statusOffice"); //array to set the flags of completion
                var officePosArray = results[0].get("officePositionDetails");

                if (officePosArray) {
                    officePosArray[0].designation = dataArray[0].value;
                    officePosArray[0].employeeCategory = dataArray[1].value;
                    officePosArray[0].employeeGrade = dataArray[2].value;
                    officePosArray[0].buisnessDivision = dataArray[3].value;
                    officePosArray[0].department = dataArray[4].value;
                    officePosArray[0].vertical = dataArray[5].value;
                    officePosArray[0].subVertical = dataArray[6].value;
                    officePosArray[0].reportingManagerId = dataArray[7].value;
                    officePosArray[0].reviewerId = dataArray[8].value;
                    officePosArray[0].buisnessHrSpocId = dataArray[9].value;
                    officePosArray[0].buisnessHrHeadId = dataArray[10].value;
                    officePosArray[0].groupHrHeadId = dataArray[11].value;
                    statusArray[0].positionHistoryStatus = true
                }

                newEmp.set('statusOffice', statusArray);
                newEmp.set('officePositionDetails', officePosArray);
                newEmp.save(null, {
                    success: function(Employee) {
                        console.log('New office Position object created with objectId: ' + Employee.id);
                        callback(true);
                    },
                    error: function(Employee, error) {
                        alert('Failed to create new object, with error code: ' + error.message);
                    } // error is a Parse.Error with an error code and message.
                });
                callback(true);
            } else {
                callback(false);
            }
        },
        error: function(error) {
            alert("Error: " + error.code + " " + error.message);
        }
    });
}

//function to submit previous emp details in the office profile(HR)
function submitpreviousEmployment(empId, dataArray, callback) {
    console.log("Came inside submitpreviousEmployment in module.js " + empId);

    var Employee = Parse.Object.extend("Employee");
    var query = new Parse.Query(Employee);
    query.equalTo("empId", empId);
    query.find({
        success: function(results) {
            if (results.length) {
                console.log("came into results  function " + empId);
                var newEmp = results[0];
                console.log(newEmp);
                console.log(dataArray);

                var statusArray = results[0].get("statusOffice"); //array to set the flags of completion

                var dummyArray = new Array();
                var dummyObj = new Object();

                dummyObj.companyName = dataArray[0].value;
                dummyObj.companyBuisness = dataArray[1].value;
                dummyObj.designation = dataArray[2].value;
                dummyObj.department = dataArray[3].value;
                dummyObj.responsibility = dataArray[4].value;
                dummyObj.companyLocation = dataArray[5].value;
                dummyObj.employmentPeriod = dataArray[6].value;
                dummyObj.areaOfExperience = dataArray[7].value;

                dummyArray.push(dummyObj); //push object into previosWorkDetails array
                statusArray[0].perviousEmploymentStatus = true
                newEmp.set('previousWorkDetails', dummyArray);
                newEmp.set('statusOffice', statusArray); //set the status array
                newEmp.save(null, {
                    success: function(Employee) {
                        console.log('New previousEmployment object created with objectId: ' + Employee.id);
                        callback(true);
                    },
                    error: function(Employee, error) {
                        alert('Failed to create new object, with error code: ' + error.message);
                    }
                });
                callback(true);
            } else {
                callback(false);
            }
        },
        error: function(error) {
            alert("Error: " + error.code + " " + error.message);
        }
    });
}

//submit payroll information
function submitPayrollInformation(empId, dataArray, type, callback) {
    console.log("Came inside submitPayrollInformation in module.js " + empId);
    var Employee = Parse.Object.extend("Employee");
    var query = new Parse.Query(Employee);
    query.equalTo("empId", empId);
    query.find({
        success: function(results) {
            if (results.length) {
                console.log("Found the " + empId + " entry in table.");
                var newEmp = results[0];
            }
            console.log(newEmp);
            var statusArray = results[0].get("statusOffice"); //array to set the flags of completion

            if (type == "bankDetails") {
                var dummyArray = new Array();
                var dummyObj = new Object();
                dummyObj.bankName = dataArray[0].value;
                dummyObj.accountName = dataArray[1].value;
                dummyObj.accountNumber = dataArray[2].value;
                dummyObj.currency = dataArray[3].value;
                dummyArray.push(dummyObj);
                statusArray[0].bankStatus = true
                newEmp.set('bankDetails', dummyArray);
            } else if (type == "salaryDetails") { //salaryDetails
                var dummyArray = new Array();
                var dummyObj = new Object();
                dummyObj.basic = dataArray[0].value;
                dummyObj.hra = dataArray[1].value;
                dummyObj.conveyanceAllowance = dataArray[2].value;
                dummyObj.lfa = dataArray[3].value;
                dummyObj.medicalAllowance = dataArray[4].value;
                dummyObj.specialAllowance = dataArray[5].value;
                dummyObj.grossSalary = dataArray[6].value;
                dummyObj.lunchAllowance = dataArray[7].value;
                dummyObj.mobileAllowance = dataArray[8].value;
                dummyObj.otherAllowance = dataArray[9].value;
                dummyObj.totalEarnings = dataArray[10].value;
                dummyArray.push(dummyObj); //push object into array
                statusArray[0].salaryStatus = true
                newEmp.set('salaryDetails', dummyArray); //push into salary details array
            } else if (type == "otherBenefitDetails") {
                var dummyArray = new Array();
                var dummyObj = new Object();
                dummyObj.festivalAllowance = dataArray[0].value;
                dummyObj.providentFundMembership = dataArray[1].value;
                dummyObj.groupLifeInsurance = dataArray[2].value;
                dummyObj.hospitalizationScheme = dataArray[3].value;
                dummyArray.push(dummyObj); //push object into array
                statusArray[0].otherBenefitStatus = true
                newEmp.set('otherBenefitDetails', dummyArray);
            } else if (type = 'companyCarDetails') {
                var dummyArray = new Array();
                var dummyObj = new Object();
                dummyObj.registrationNumber = dataArray[0].value;
                dummyObj.effectiveDate = dataArray[1].value;
                dummyObj.expiryDate = dataArray[2].value;
                dummyObj.fuelAllowance = dataArray[3].value;
                dummyObj.maintainanceAllowance = dataArray[4].value;
                dummyObj.driverAllowance = dataArray[5].value;
                dummyObj.grossPay = dataArray[6].value;
                dummyArray.push(dummyObj); //push object into array
                statusArray[0].companyCarStatus = true
                newEmp.set('companyCarDetails', dummyArray);
            } else if (type == "personalCarDetails") {
                var dummyArray = new Array();
                var dummyObj = new Object();
                console.log("came in personal car");
                dummyObj.registrationNumber = dataArray[0].value;
                dummyObj.effectiveDate = dataArray[1].value;
                dummyObj.expiryDate = dataArray[2].value;
                dummyObj.ownCarUsageAllowance = dataArray[3].value;
                dummyArray.push(dummyObj); //push object into array
                statusArray[0].personalCarStatus = true
                newEmp.set('personalCarDetails', dummyArray);
            }
            newEmp.set('statusOffice', statusArray); //set the status array
            newEmp.save(null, {
                success: function(Employee) {
                    console.log('New payroll Info object created with objectId: ' + Employee.id);
                    callback(true);
                },
                error: function(Employee, error) {
                    alert('Failed to create new object, with error code: ' + error.message);
                }
            });
            //callback(true);
        },
        error: function(error) {
            callback(false);
            alert("Error: " + error.code + " " + error.message);
        }
    });
}

//function to fetch the data for KRA select
function selectWizard(dept, grade, callback) {
    console.log("came in kraSelect in the module.");
    var Employee = Parse.Object.extend("Employee");
    var query = new Parse.Query(Employee);
    if (dept)
        query.equalTo("department", dept); //if the dept is present it will consider this
    if (grade.length > 0)
        query.containedIn("employeeGrade", grade); //containedIn: because grade is array
    query.find({
        success: function(results) {
            if (results.length) {
                callback(true, results);
            } else {
                callback(false, null);
            }
        },
        error: function(error) {
            alert("Error: " + error.code + " " + error.message);
        }
    });
}

//this will keep record of initiated actions as a batch with initiator ID
function batchInitialize(empArray, initiatorId, type, callback) {
    var BatchRecords = new Parse.Object.extend('BatchRecords');
    var query = new Parse.Query(BatchRecords);
    var batchIndex = 0;
    query.count({
        success: function(count) {
            //var BatchRecords = Parse.Object.extend("BatchRecords");
            var newBatch = new BatchRecords();

            newBatch.set('batchId', 'batchId_' + count);
            newBatch.set('initiatorId', initiatorId);
            newBatch.set('type', type);
            newBatch.set('startDate', new Date());
            var valDate = new Date();
            newBatch.set('endDate', valDate.addHours(730));
            newBatch.set('isComplete', false);

            newBatch.save(null, {
                success: function(BatchRecords) {
                    console.log('New batch record object created with objectId: ' + BatchRecords.id);
                    if(type=="KRA"){
                        initiateKRA(empArray,initiatorId,newBatch.get("batchId"),function(status){
                            if(status){
                                callback(true);
                            }else{
                                callback(false);
                            }
                        });
                    }else if(type=="Learning"){
                        initiateLearning(empArray,initiatorId,newBatch.get("batchId"),function(status){
                            if(status){
                                callback(true);
                            }else{
                                callback(false);
                            }
                        });
                    }
                },
                error: function(BatchRecords, error) {
                    console.log('Failed to create new object, with error code: ' + error.message);
                    callback(false);
                }
            });
        }
    });
}


//funtion to initiate KRA for some selected array of employees
function initiateKRA(empArray, initiatorId, batchId, callback) {
    //add to input table of all employees-being done in addToKraTable

    //send notification

    var Employee = new Parse.Object.extend('Employee');
    var query = new Parse.Query(Employee);
    query.containedIn('empId', empArray);
    query.find({
        success: function(results) {
            if (results.length > 0) {
                getKRACount(function(count) { //get count of entries in KRA table
                    for (i = 0; i < results.length; i++) {
                        addToKRATable(results[i], count + i, initiatorId, batchId); //to initiate KRA for selection,add values into KRA table
                        callback(true);
                    }
                });
            }
        }
    })
}

//function to get count of entries in KRA table
function getKRACount(callback) {
    var KRA = new Parse.Object.extend('Kra');
    var kraQuery = new Parse.Query(KRA);
    var kraIndex = 0;
    kraQuery.count({
        success: function(count) {
            console.log(count);
            callback(count);
        }
    });
}

function addToKRATable(empData, kraIndex, initiatorId, batchId) {
    console.log(JSON.stringify(empData.get('empId')));
    //console.log("%s,%d",empId,kraIndex);
    var KRA = new Parse.Object.extend('Kra');
    var newKRA = new KRA();
    newKRA.set('kraId', 'k_' + kraIndex);
    newKRA.set('empId', empData.get('empId'));
    newKRA.set('empName', empData.get('name'));
    newKRA.set('empRef', empData);
    var dummyArray = new Array();
    var dummyObj = new Object(); //create object to push into array
    dummyObj.kra = "";
    dummyObj.kraCat = "";
    dummyObj.kraWeight = "00";
    dummyObj.kraUos = "";
    dummyObj.kraMos = "";
    dummyArray.push(dummyObj); //push object into array

    newKRA.set('kraValue', dummyArray); //kraValue is the name of the array
    newKRA.set('version', 'live');
    newKRA.set('startDate', new Date());
    newKRA.set('endDate', new Date());
    //set validity date
    var valDate = new Date();
    newKRA.set('valDate', valDate.addHours(730));

    var dummyArray = new Array();
    var dummyObj = new Object(); //create object to push into array
    dummyObj.supervisorId = empData.get('supervisorId');
    dummyObj.supervisorInput = "";
    dummyObj.supervisorInputDate = new Date();
    //dummyObj.supervisorReview = false;
    dummyArray.push(dummyObj); //push object into array
    newKRA.set('supervisorData', dummyArray);
    newKRA.set('supervisorId', empData.get('supervisorId'));
    newKRA.set('supervisorName', empData.get('supervisorName'));

    newKRA.set('cameFrom', initiatorId);
    newKRA.set('batchId',batchId);
    newKRA.set('wentTo', empData.get('empId'));
    newKRA.set('stage', 'init');
    console.log("**Adding to KRA Table**");
    newKRA.save(null, {
        success: function(KRA) {
            console.log('New entry added to KRA table,with objectId: ' + KRA.id);
            //console.log(JSON.stringify(KRA));
            addToInputTable('KRA', KRA.get('kraId'), KRA.get('empId'), KRA.get('empName'),KRA.get('supervisorId'),KRA.get('supervisorName'), 'live', new Date()); //this will add a copy to input table
            
            var notiType= "KRA";
            var notiTitle= "KRA Initiated.";
            var notiBody= "Please fill the KRA and submit to "+KRA.get('supervisorName');
            var notiLink= "inputRequests";
            var notiReceipent= KRA.get('empId');
            sendNoti(initiatorId,notiType,notiTitle,notiBody,notiLink,notiReceipent);

        },
        error: function(KRA, error) {
            alert('Failed to create new object, with error code: ' + error.message);
        }
    });
}

//function to set kra
function setKRA(kraArray, typeId, callback) {
    console.log("CAme in setKRA");
    //var empId = localStorage.empId;
    //var kraId = localStorage.kraId;

    var empId = '';
    var kraId = typeId;
    console.log("The KRA array is:");
    console.log(kraArray);

    var Kra = Parse.Object.extend("Kra");
    var query = new Parse.Query(Kra);
    query.equalTo("kraId", typeId); //match kraId to table
    query.find({
        success: function(results) {
            if (results.length) {

                var newKRA = results[0];
                var dummyArray = new Array();
                //push kraArray into table
                for (i = 0; i < kraArray.length; i++) {
                    if (kraArray[i].complete) {
                        var dummyObj = new Object(); //create object to push into array
                        dummyObj.kra = kraArray[i].kra;
                        dummyObj.kraCat = kraArray[i].kraCategory;
                        dummyObj.kraWeight = kraArray[i].kraWeight;
                        dummyObj.kraUos = kraArray[i].kraUnitSuccess;
                        dummyObj.kraMos = kraArray[i].kraMeasureSuccess;
                        dummyArray.push(dummyObj); //push object into array
                    }
                }

                newKRA.set('kraValue', dummyArray); //kraValue is the name of the array
                newKRA.set('version', 'live');
                newKRA.set('stage', 'posted');
                newKRA.set('endDate', new Date());
                newKRA.save(null, {
                    success: function(KRA) {
                        // Execute any logic that should take place after the object is saved.
                        console.log('New KRA set with objectId: ' + KRA.id);
                        addToApprovalTable('KRA', KRA.get('kraId'), KRA.get('supervisorId'), KRA.get('empId'), KRA.get('empName'), 'live', new Date()); //this will add a copy to input table
                        callback(true);
                    },
                    error: function(KRA, error) {
                        // Execute any logic that should take place if the save fails.
                        // error is a Parse.Error with an error code and message.
                        callback(false);
                        console.log('Failed to create new KRA object, with error code: ' + error.message);
                    }
                });
            } else {
                callback(false);
            }
        },
        error: function(error) {
            console.log("Error: " + error.code + " " + error.message);
        }
    });
}

//function to save as draft KRA
function setKRADraft(kraArray, typeId, callback) {
    console.log("Came in setDraft");
    //var empId = localStorage.empId;
    //var kraId = localStorage.kraId;

    //var kraId = 'k_0';
    var kraId = typeId;
    console.log(kraArray);

    var Kra = Parse.Object.extend("Kra");
    var query = new Parse.Query(Kra);
    query.equalTo("kraId", kraId); //match kraId to table
    query.find({
        success: function(results) {
            if (results.length) {
                console.log("came in results");
                var newKRA = results[0];
                var dummyArray = new Array();
                //push kraArray into table using loop
                for (i = 0; i < kraArray.length; i++) {

                    var dummyObj = new Object(); //create object to push into array
                    dummyObj.kra = kraArray[i].kra;
                    dummyObj.kraCat = kraArray[i].kraCategory;
                    dummyObj.kraWeight = kraArray[i].kraWeight;
                    dummyObj.kraUos = kraArray[i].kraUnitSuccess;
                    dummyObj.kraMos = kraArray[i].kraMeasureSuccess;
                    dummyArray.push(dummyObj); //push object into array

                }
                newKRA.set('kraValue', dummyArray); //kraValue is the name of the array
                newKRA.set('version', 'live');
                newKRA.set('stage', 'draft');
                newKRA.set('endDate', new Date());
                newKRA.save(null, {
                    success: function(KRA) {
                        console.log('New kra draft object created with objectId: ' + KRA.id);
                        addToDraftTable('KRA', KRA.get('kraId'), KRA.get('empId'), KRA.get('empName'), 'live', new Date());
                        callback(true);
                    },
                    error: function(KRA, error) {
                        callback(false);
                        console.log('Failed to create new kra draft object, with error code: ' + error.message);
                    }
                });
            } else {
                callback(false);
            }
        },
        error: function(error) {
            console.log("Error: " + error.code + " " + error.message);
        }
    });
}

//funtion to initiate Learning for some selected array of employees
function initiateLearning(empArray, initiatorId, batchId, callback) {
    //add to Learning table
    //add to input table of all employees-being done in addToLearningTable

    //send notification
    var Employee = new Parse.Object.extend('Employee');
    var query = new Parse.Query(Employee);
    query.containedIn('empId', empArray);
    query.find({
        success: function(results) {
            if (results.length > 0) {
                getLearningCount(function(count) { //get count of entries in Learning table
                    for (i = 0; i < results.length; i++) {
                        addToLearningTable(results[i], count + i, initiatorId, batchId); //to initiate Learning for selection,add values into Learning table
                        callback(true);
                    }
                });
            }
        }
    })
}

//function to get count of entries in Learning table
function getLearningCount(callback) {
    var Learning = new Parse.Object.extend('Learning');
    var learningQuery = new Parse.Query(Learning);
    var learningIndex = 0;
    learningQuery.count({
        success: function(count) {
            console.log(count);
            callback(count);
        }
    });
}

function addToLearningTable(empData, learningIndex, initiatorId, batchId) {
    console.log(JSON.stringify(empData.get('empId')));
    //console.log("%s,%d",empId,LearningIndex);
    var Learning = new Parse.Object.extend('Learning');
    var newLearning = new Learning();
    newLearning.set('lrnid', 'lrn_' + learningIndex);
    newLearning.set('empId', empData.get('empId'));
    newLearning.set('empName', empData.get('name'));
    newLearning.set('empRef', empData);
    var dummyArray = new Array();
    var dummyObj = new Object(); //create object to push into array
    dummyObj.developmentArea = "";
    dummyObj.developmentPlan = "";
    dummyObj.learningMos = "";
    dummyObj.timeline = "";
    dummyObj.supportRequired = "";
    dummyArray.push(dummyObj);

    newLearning.set('learningValue', dummyArray); //LearningValue is the name of the array
    newLearning.set('version', 'live');
    newLearning.set('startDate', new Date());
    newLearning.set('endDate', new Date());
    //set validity date
    var valDate = new Date();
    newLearning.set('valDate', valDate.addHours(730));

    var dummyArray1 = new Array();
    var dummyObj1 = new Object(); //create object to push into array
    dummyObj1.supervisorId = empData.get('supervisorId');
    dummyObj1.supervisorInput = "";
    dummyObj1.supervisorReview = false;
    dummyArray1.push(dummyObj1); //push object into array
    newLearning.set('supervisorData', dummyArray1);
    newLearning.set('supervisorId', empData.get('supervisorId'));
    newLearning.set('supervisorName', empData.get('supervisorName'));

    newLearning.set('cameFrom', initiatorId);
    newLearning.set('batchId',batchId);
    newLearning.set('wentTo', empData.get('empId'));
    newLearning.set('stage', 'init');
    console.log("**Adding to Learning Table**");
    newLearning.save(null, {
        success: function(Learning) {
            console.log('New Learning object created with objectId: ' + Learning.id);
            //console.log(JSON.stringify(Learning));
            addToInputTable('Learning', Learning.get('lrnid'), Learning.get('empId'), Learning.get('empName'),Learning.get('supervisorId'),Learning.get('supervisorName'), 'live', new Date()); //this will add a copy to input table
        },
        error: function(Learning, error) {
            alert('Failed to create new object, with error code: ' + error.message);
        }
    });
}

//function to set Learning
function setLearning(learningArray, typeId, callback) {
    console.log("Came in setLearning");
    //var empId = localStorage.empId;
    console.log("The Learning array is:");
    console.log(learningArray);
    console.log(learningArray.length);

    var Learning = Parse.Object.extend("Learning");
    var query = new Parse.Query(Learning);
    query.equalTo("lrnid", typeId); //match LearningId to table
    query.find({
        success: function(results) {
            if (results.length) {
                console.log("came inside results");
                var newLearning = results[0];
                var dummyArray = new Array();
                //push LearningArray into table
                for (i = 0; i < learningArray.length; i++) {
                    console.log("got inside for loop");
                    if (learningArray[i].complete) {
                        var dummyObj = new Object(); //create object to push into array
                        dummyObj.developmentArea = learningArray[i].learningDevArea;
                        dummyObj.developmentPlan = learningArray[i].learningDevPlan;
                        dummyObj.learningMos = learningArray[i].learningMeasureofSuccess;
                        dummyObj.timeline = learningArray[i].learningTimeline;
                        dummyObj.supportRequired = learningArray[i].learningSupportRequired;
                        dummyArray.push(dummyObj); //push object into array
                    }
                }
                newLearning.set('learningValue', dummyArray); //experimenting with dummy array
                //newLearning.set('learningValue', newLearning); //LearningValue is the name of the array
                newLearning.set('version', 'live');
                newLearning.set('stage', 'posted');
                newLearning.set('endDate', new Date());
                console.log("came til the end");
                newLearning.save(null, {
                    success: function(Learning) {
                        console.log('New Learning set with objectId: ' + Learning.id);
                        addToApprovalTable('learning', Learning.get('lrnid'), Learning.get('supervisorId'), Learning.get('empId'),Learning.get('empName'), 'live', new Date()); //this will add a copy to input table
                        callback(true);
                    },
                    error: function(Learning, error) {
                        callback(false);
                        console.log('Failed to create new Learning object, with error code: ' + error.message);
                    }
                });
            } else {
                callback(false);
            }
        },
        error: function(error) {
            console.log("Error: " + error.code + " " + error.message);
        }
    });
}

//function to save as draft Learning
function setLearningDraft(learningArray, typeId, callback) {
    console.log("Came in Learning setDraft");
    //var empId = localStorage.empId;
    //var LearningId = localStorage.LearningId;

    //var lrnid = typeId;
    console.log(typeId);
    console.log(learningArray);

    var Learning = Parse.Object.extend("Learning");
    var query = new Parse.Query(Learning);
    query.equalTo("lrnid", typeId); //match LearningId to table
    query.find({
        success: function(results) {
            if (results.length) {
                console.log("came in results");
                var newLearning = results[0];
                var dummyArray = new Array();
                //push LearningArray into table using loop
                for (i = 0; i < learningArray.length; i++) {

                    var dummyObj = new Object(); //create object to push into array
                    dummyObj.developmentArea = learningArray[i].developmentArea;
                    dummyObj.developmentPlan = learningArray[i].developmentPlan;
                    dummyObj.learningMos = learningArray[i].learningMos;
                    dummyObj.timeline = learningArray[i].timeline;
                    dummyObj.supportRequired = learningArray[i].supportRequired;
                    dummyArray.push(dummyObj); //push object into array

                }
                newLearning.set('learningValue', dummyArray); //LearningValue is the name of the array
                newLearning.set('version', 'live');
                newLearning.set('stage', 'draft');
                newLearning.set('endDate', new Date());
                newLearning.save(null, {
                    success: function(Learning) {
                        console.log('New Learning draft object created with objectId: ' + Learning.id);
                        addToDraftTable('learning', Learning.get('lrnid'), Learning.get('empId'), Learning.get('empName'), 'live', new Date());
                        callback(true);
                    },
                    error: function(Learning, error) {
                        callback(false);
                        console.log('Failed to create new Learning draft object, with error code: ' + error.message);
                    }
                });
            } else {
                callback(false);
            }
        },
        error: function(error) {
            console.log("Error: " + error.code + " " + error.message);
        }
    });
}

//Generic Function to add to Input Table
function addToInputTable(type, typeId, empId, empName, supervisorId, supervisorName, status, startDate) {
    console.log("Adding to Input Table");

    var Inputs = Parse.Object.extend("Inputs");
    var query = new Parse.Query(Inputs);
    query.equalTo("empId", empId);
    query.equalTo("typeId", typeId);
    query.find({
        success: function(results) {
            if (results.length) {
                var newInputs = results[0];
                //newInputs.set('status', 'sentBack');
            } else {
                var newInputs = new Inputs();
                //newInputs.set('status', status);
            }
            newInputs.set('type', type);
            newInputs.set('typeId', typeId);
            newInputs.set('empId', empId);
            newInputs.set('empName', empName);
            newInputs.set('supervisorId', supervisorId);
            newInputs.set('supervisorName', supervisorName);
            newInputs.set('status', status);
            newInputs.set('startDate', startDate);

            //newInputs.set('endDate',new Date());

            newInputs.save(null, {
                success: function(Inputs) {
                    console.log('New input table object created with objectId: ' + Inputs.id);
                },
                error: function(Inputs, error) {
                    alert('Failed to create new object, with error code: ' + error.message);
                }
            });
        }
    });


}

//Generic Function to add to approval Table
function addToApprovalTable(type, typeId, empId, cameFrom, cameFromName, status, startDate) {
    console.log("Adding entry in approval table");
    resetInputTable(typeId, 'inProgress', function() {
        console.log("INput table reset succes,came back to add to approval");
        var Approvals = Parse.Object.extend("Approvals");
        var query = new Parse.Query(Approvals);
        query.equalTo("empId", empId);
        query.equalTo("typeId", typeId);
        query.find({
            success: function(results) {
                if (results.length) {
                    var newApprovals = results[0];
                } else {
                    var newApprovals = new Approvals();
                }
                newApprovals.set('type', type);
                newApprovals.set('typeId', typeId);
                newApprovals.set('empId', empId);
                newApprovals.set('status', status);
                newApprovals.set('cameFrom', cameFrom);
                newApprovals.set('cameFromName', cameFromName);
                newApprovals.set('startDate', startDate);
                //newInputs.set('endDate',new Date());

                newApprovals.save(null, {
                    success: function(Inputs) {
                        console.log('New Approval Table object created with objectId: ' + Approvals.id);
                        resetDraftTable(typeId, 'dead');
                    },
                    error: function(Inputs, error) {
                        alert('Failed to create new object, with error code: ' + error.message);
                    }
                });
            }
        });
    });
}

//generic draft table
function addToDraftTable(type, typeId, empId, empName, status, startDate) {
    console.log("Adding to Draft Table"); //now clear the entry from input table
    resetInputTable(typeId, 'inDraft', function() {
        //setting the draft table entry
        var Drafts = Parse.Object.extend("Drafts");
        var query = new Parse.Query(Drafts);
        query.equalTo("empId", empId);
        query.equalTo("typeId", typeId);
        query.find({
            success: function(results) {
                if (results.length) {
                    var newDrafts = results[0];
                } else {
                    var newDrafts = new Drafts();
                }
                //newDrafts.set('draftId','draft_0');
                newDrafts.set('type', type);
                newDrafts.set('typeId', typeId);
                newDrafts.set('empId', empId);
                newDrafts.set('empName', empName);
                newDrafts.set('status', status);
                newDrafts.set('startDate', new Date());
                //newDrafts.set('endDate',new Date());

                newDrafts.save(null, {
                    success: function(Drafts) {
                        console.log('New Draft object created with objectId: ' + Drafts.id);
                    },
                    error: function(Drafts, error) {
                        alert('Failed to create new draft object, with error code: ' + error.message);
                    }
                });
            }
        });
    });
}

//clear entry from Input table
function resetInputTable(typeId, status, callback) {
    console.log("Clearing entry in input table");
    var Inputs = Parse.Object.extend("Inputs");
    var query = new Parse.Query(Inputs);
    query.equalTo("typeId", typeId);
    query.find({
        success: function(results) {
            if (results.length) {
                console.log("got values in input table");
                var newInputs = results[0];
                newInputs.set('status', status);
                newInputs.save(null, {
                    success: function(Inputs) {
                        callback();
                    },
                    error: function(Inputs, error) {
                        alert('Failed to create new object, with error code: ' + error.message);
                    }
                });
            } else {
                console.log("failed in input table");
                callback();
            }
        }
    });
}

//clear entry from Approvals table
function resetApprovalTable(typeId, status, callback) {
    console.log("Clearing entry in Approvals table");
    var Approvals = Parse.Object.extend("Approvals");
    var query = new Parse.Query(Approvals);
    query.equalTo("typeId", typeId);
    query.find({
        success: function(results) {
            if (results.length) {
                console.log("got values in Approval table");
                var newApprovals = results[0];
                newApprovals.set('status', status);
                newApprovals.save(null, {
                    success: function(Approvals) {
                        callback();
                    },
                    error: function(Approvals, error) {
                        alert('Failed to create new object, with error code: ' + error.message);
                    }
                });
            } else {
                console.log("failed in Approval table");
                callback();
            }
        }
    });
}

//clear entry from dRAFT table
function resetDraftTable(typeId, status, callback) {
    console.log("Clearing entry in draft table");
    var Drafts = Parse.Object.extend("Drafts");
    var query = new Parse.Query(Drafts);
    query.equalTo("typeId", typeId);
    query.find({
        success: function(results) {
            if (results.length) {
                var newDraft = results[0];
                newDraft.set('status', status);
                newDraft.save(null, {
                    success: function(Drafts) {
                        callback();
                    },
                    error: function(Drafts, error) {
                        alert('Failed to create new object, with error code: ' + error.message);
                    }
                });
            } else {
                callback();
            }
        }
    });
}

//function to check and then fetch a KRA for an emplopyee
function fetchKra(empId, kraId, callback) {
    var Kra = Parse.Object.extend("Kra");
    var query = new Parse.Query(Kra);
    query.equalTo("empId", empId); //match empId to table
    query.equalTo("kraId", kraId); //match kraId to table
    query.find({
        success: function(results) {
            if (results.length) {
                callback(true, results[0]);
            } else {
                callback(false, null);
            }
        },
        error: function(error) {
            console.log("Error: " + error.code + " " + error.message);
        }
    });
}

//function to check and then fetch a KRA for an emplopyee
function fetchLearning(empId, lrnId, callback) {
    var Learning = Parse.Object.extend("Learning");
    var query = new Parse.Query(Learning);
    query.equalTo("lrnid", lrnId);
    query.equalTo("empId", empId); //match empId to table

    query.find({
        success: function(results) {
            if (results.length) {
                callback(true, results[0]);
            } else {
                callback(false, null);
            }
        },
        error: function(error) {
            console.log("Error: " + error.code + " " + error.message);
        }
    });
}

//function to check input table
function checkInputTable(empId, callback) {
    var Inputs = Parse.Object.extend("Inputs");
    var query = new Parse.Query(Inputs);
    query.equalTo("empId", empId); //match kraId to table
    query.equalTo("status", "live"); //only the live entries of the table
    query.find({
        success: function(results) {
            if (results.length) { //try in future for more results
                var inputNumber = results.length;
                console.log("these many results were found in input table: " + inputNumber);
                //var inputObject = JSON.stringify(results[0]);
                console.log(results);
                callback(true, results);
            } else {
                callback(false, null);
            }
        },
        error: function(error) {
            console.log("Error: " + error.code + " " + error.message);
        }
    });
}

//function to check drafts table
function checkDraftsTable(empId, callback) {
    var Drafts = Parse.Object.extend("Drafts");
    var query = new Parse.Query(Drafts);
    query.equalTo("empId", empId); //match kraId to table
    query.equalTo("status", "live"); //match kraId to table
    query.find({
        success: function(results) {
            if (results.length) { //try in future for more results
                var draftsNumber = results.length;
                console.log("these many results were found in drafts table: " + draftsNumber);
                console.log(results);
                callback(true, results);
            } else {
                callback(false, null);
            }
        },
        error: function(error) {
            console.log("Error: " + error.code + " " + error.message);
        }
    });
}

//function to check approvals table
function checkApprovalTable(empId, callback) {
    var Approvals = Parse.Object.extend("Approvals");
    var query = new Parse.Query(Approvals);
    query.equalTo("empId", empId); //match kraId to table
    query.equalTo("status", "live"); //match kraId to table
    query.find({
        success: function(results) {
            if (results.length) { //try in future for more results
                var approvalsNumber = results.length;
                //console.log("these many results were found in approvals table: "+approvalsNumber);
                //console.log(results);
                callback(true, results);
            } else {
                callback(false, null);
            }
        },
        error: function(error) {
            console.log("Error: " + error.code + " " + error.message);
        }
    });
}

//function to check participated in approvals table
function checkParticipated(empId, callback) {
    var Approvals = Parse.Object.extend("Approvals");
    var query = new Parse.Query(Approvals);
    query.equalTo("empId", empId);
    query.equalTo("status", "accepted");
    query.equalTo("status", "rejected");
    query.find({
        success: function(results) {
            if (results.length) {
                var approvalsNumber = results.length;
                //console.log("these many results were found in approvals table: " + approvalsNumber);
                //console.log(results);
                callback(true, results);
            } else {
                callback(false, null);
            }
        },
        error: function(error) {
            console.log("Error: " + error.code + " " + error.message);
        }
    });
}

//function to check Clarification table
function checkClarificationTable(empId, callback) {
    var Clarification = Parse.Object.extend("Clarification");
    var query = new Parse.Query(Clarification);
    query.equalTo("empId", empId);
    query.equalTo("status", "live");
    query.find({
        success: function(results) {
            if (results.length) { //try in future for more results
                var clarificationNumber = results.length;
                console.log("these many results were found in Clarification table: " + clarificationNumber);
                console.log(results);
                callback(true, results);
            } else {
                callback(false, null);
            }
        },
        error: function(error) {
            console.log("Error: " + error.code + " " + error.message);
        }
    });
}

//function to check inProgress table
function checkInProgress(empId, callback) {
    var Inputs = Parse.Object.extend("Inputs");
    var query = new Parse.Query(Inputs);
    query.equalTo("empId", empId); //match kraId to table
    query.equalTo("status", "inProgress"); //only the live entries of the table
    query.find({
        success: function(results) {
            if (results.length) { //try in future for more results
                var inputNumber = results.length;
                console.log("these many results were found in input table: " + inputNumber);
                //var inputObject = JSON.stringify(results[0]);
                console.log(results);
                callback(true, results);
            } else {
                callback(false, null);
            }
        },
        error: function(error) {
            console.log("Error: " + error.code + " " + error.message);
        }
    });
}

//function to check checkApproved table
function checkApproved(empId, callback) {
    var Inputs = Parse.Object.extend("Inputs");
    var query = new Parse.Query(Inputs);
    query.equalTo("empId", empId); //match kraId to table
    query.equalTo("status", "accepted"); //only the live entries of the table
    query.find({
        success: function(results) {
            if (results.length) { //try in future for more results
                var inputNumber = results.length;
                console.log("these many results were found in input table: " + inputNumber);
                //var inputObject = JSON.stringify(results[0]);
                console.log(results);
                callback(true, results);
            } else {
                callback(false, null);
            }
        },
        error: function(error) {
            console.log("Error: " + error.code + " " + error.message);
        }
    });
}

//function to check rejected table
function checkRejected(empId, callback) {
    var Inputs = Parse.Object.extend("Inputs");
    var query = new Parse.Query(Inputs);
    query.equalTo("empId", empId); //match kraId to table
    query.equalTo("status", "rejected"); //only the live entries of the table
    query.find({
        success: function(results) {
            if (results.length) { //try in future for more results
                var inputNumber = results.length;
                console.log("these many results were found in input table: " + inputNumber);
                //var inputObject = JSON.stringify(results[0]);
                console.log(results);
                callback(true, results);
            } else {
                callback(false, null);
            }
        },
        error: function(error) {
            console.log("Error: " + error.code + " " + error.message);
        }
    });
}


//functino calling the mail API
function sendEmail(to, cc, subject, body, callback) {
    //to is an Array, cc is an Array

    $.post("http://adn-hris.herokuapp.com/api/mail", {
            to: to,
            cc: cc,
            subject: subject,
            body: body
        })
        .done(function(data) {
            callback(true);
        });
}

//function to reject Learning
function reviewLearning(empId, supervisorId, supervisorInput, typeId, supervisorReview, callback) {
    var Learning = Parse.Object.extend("Learning");
    var query = new Parse.Query(Learning);
    query.equalTo("lrnid", typeId); //match LearningId to table
    query.equalTo("empId", empId);
    query.find({
        success: function(results) {
            if (results.length) {
                var newLearning = results[0];

                var dummyArray = results[0].get("supervisorData");
                var dummyObj = new Object(); //create object to push into array
                //dummyObj.supervisor = new Employee();
                dummyObj.supervisorId = supervisorId;
                dummyObj.supervisorInput = supervisorInput;
                dummyObj.supervisorInputDate = new Date();
                dummyObj.supervisorReview = supervisorReview;
                dummyArray.push(dummyObj); //push object into array
                newLearning.set('supervisorData', dummyArray);
                if (supervisorReview) {
                    newLearning.set('stage', 'accepted');
                } else {
                    newLearning.set('stage', 'rejected');
                }

                newLearning.save(null, {
                    success: function(Learning) {
                        console.log('Learning updated with objectId: ' + Learning.id);
                        callback(true);
                    },
                    error: function(Learning, error) {
                        callback(false);
                        console.log('Failed to update Learning object, with error code: ' + error.message);
                    }
                });
            }
        },
        error: function(error) {
            console.log("Error: " + error.code + " " + error.message);
        }
    });
}

//function to review KRA
function reviewKRA(empId, supervisorId, supervisorInput, typeId, supervisorReview, callback) {
    var KRA = new Parse.Object.extend('Kra');
    var query = new Parse.Query(KRA);
    query.equalTo("kraId", typeId); //match kraId to table
    query.equalTo("empId", empId);
    query.find({
        success: function(results) {
            if (results.length) {
                var newKRA = results[0];

                var dummyArray = results[0].get("supervisorData");
                var dummyObj = new Object(); //create object to push into array
                //dummyObj.supervisor = new Employee();
                dummyObj.supervisorId = supervisorId;
                dummyObj.supervisorInput = supervisorInput;
                dummyObj.supervisorInputDate = new Date();
                dummyObj.supervisorReview = supervisorReview;
                dummyArray.push(dummyObj); //push object into array
                console.log(dummyArray);
                newKRA.set('supervisorData', dummyArray);
                if (supervisorReview) {
                    newKRA.set('stage', 'accepted');
                } else {
                    newKRA.set('stage', 'rejected');
                }

                newKRA.save(null, {
                    success: function(KRA) {
                        console.log('KRA updated with objectId: ' + KRA.id);
                        callback(true);
                    },
                    error: function(KRA, error) {
                        callback(false);
                        console.log('Failed to update KRA object, with error code: ' + error.message);
                    }
                });
            }
        },
        error: function(error) {
            console.log("Error: " + error.code + " " + error.message);
        }
    });
}

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

//function to fetch KRA table data
function getKraStats(batchId,callback) {
    //console.log("Getting KRA stats from Module");
    var KRA = new Parse.Object.extend('Kra');
    var query = new Parse.Query(KRA);
    query.equalTo("batchId", batchId);
    query.find({
        success: function(results) {
            if (results.length) {
                callback(false,results);
            }  
        }
    });
}

//function to fetch Learning table data
function getLearningStats(batchId,callback) {
    //console.log("Getting Learning stats from Module");
    var Learning = new Parse.Object.extend('Learning');
    var query = new Parse.Query(Learning);
    query.equalTo("batchId", batchId);
    query.find({
        success: function(results) {
            if (results.length) {
                callback(false,results);
            }  
        }
    });
}

//function to get batch stats
function getBatchStats(callback){
    console.log("Getting Batch wise stats from Module");
    var BatchRecords = new Parse.Object.extend('BatchRecords');
    var query = new Parse.Query(BatchRecords);
    query.find({
        success: function(results) {
            if (results.length) {
                console.log("found fdata");
                callback(false,results);
            }  
        }
    });

}