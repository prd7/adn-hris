function reviewKRA(empId,supervisorId,supervisorInput,typeId,supervisorReview,callback){
    var KRA = new Parse.Object.extend('Kra');
    var kraQuery = new Parse.Query(KRA);
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
                dummyArray.push(dummyObj);//push object into array
                newKRA.set('supervisorData',dummyArray);
                if(supervisorReview){
                    newKRA.set('stage','accepted');
                }else{
                    newKRA.set('stage','rejected');
                }

                newKRA.save(null, {
                    success: function(KRA) {
                        console.log('KRA updated with objectId: ' + KRA.id);
                        addToInputTable('KRA', KRA.get('lrnid'), KRA.get('empId'), 'live', new Date());
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


