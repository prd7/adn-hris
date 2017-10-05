//function to set kra
function setKRA(kraArray,typeId,callback) {
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
                        addToApprovalTable('KRA', KRA.get('kraId'), KRA.get('supervisorId'),KRA.get('empId'), 'live', new Date()); //this will add a copy to input table
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