function helloMyParse()
{
    //alert("attempting save");
    // Replace this line with the one on your Quickstart Guide Page
    Parse.initialize("cardforgegame","brian"); // Your App Name
    Parse.serverURL = 'https://cardforge.herokuapp.com/parse'; // Your Server URL
    Parse.useMasterKey = true;

    var TestObject = Parse.Object.extend("TestObject");
    var testObject = new TestObject();
    testObject.set("whatev", "whatwwhat");

    testObject.save(null, {
    success: function(testObject) {
      alert('New object created with objectId: ' + testObject.id);
    },
    error: function(testObject, error) {
      // Execute any logic that should take place if the save fails.
      // error is a Parse.Error with an error code and message.
      alert('Failed to create new object, with error code: ' + error.message);
    }
})
};

function editMarkerInfo(objectId,name,description,positionData,type,phone)
{
    var enteredPin = prompt("Please enter your 4-digit PIN:");

    Parse.$ = jQuery;
    Parse.initialize("cardforgegame","brian"); // Your App Name
    Parse.serverURL = 'https://cardforge.herokuapp.com/parse'; // Your Server URL
    Parse.useMasterKey = true;

    var gpsMarker = Parse.Object.extend("GPSMarkerObject");
    var query = new Parse.Query(gpsMarker);
    query.get(objectId, {
        success: function(markerParse) {
          var pin = markerParse.get("pin");
          if (enteredPin === pin)
          {
              markerParse.set("name", name);
              markerParse.set("description", description);
              markerParse.set("positionData", positionData);
              markerParse.set("type", type);
              markerParse.set("phone", phone);
              markerParse.save();
              alert("Your pin information has now been edited, thank you!");
          }
          else
          {
              alert("Incorrect 4-digit PIN, please try again.");
          }
        },
        error: function(error) {
          alert("Error: " + error.code + " " + error.message);
        }
      });
}

function adminEditMarkerInfo(objectId,name,description,positionData,type,phone)
{
    Parse.$ = jQuery;
    Parse.initialize("cardforgegame","brian"); // Your App Name
    Parse.serverURL = 'https://cardforge.herokuapp.com/parse'; // Your Server URL
    Parse.useMasterKey = true;

    var gpsMarker = Parse.Object.extend("GPSMarkerObject");
    var query = new Parse.Query(gpsMarker);
    query.get(objectId, {
        success: function(markerParse) {
          var pin = markerParse.get("pin");
              markerParse.set("name", name);
              markerParse.set("description", description);
              markerParse.set("positionData", positionData);
              markerParse.set("type", type);
              markerParse.set("phone", phone);
              markerParse.save();
              alert("Your pin information has now been edited, thank you!");
        },
        error: function(error) {
          alert("Error: " + error.code + " " + error.message);
        }
      });
}

function createNewGPSMarker (name, description, positionData,type,phone,pin, address)
{
  //alert("attempting save gps marker");
  // Replace this line with the one on your Quickstart Guide Page
  Parse.initialize("cardforgegame","brian"); // Your App Name
  Parse.serverURL = 'https://cardforge.herokuapp.com/parse'; // Your Server URL
  Parse.useMasterKey = true;

  var TestObject = Parse.Object.extend("GPSMarkerObject");
  var testObject = new TestObject();

//  var postACL = new Parse.ACL(Parse.User.current());
  //postACL.setPublicReadAccess(true);
  //postACL.setPublicWriteAccess(false);
  //testObject.setACL(postACL);
  testObject.set("name", name);
  testObject.set("description",description);
  testObject.set("positionData",positionData);
  testObject.set("type",type);
  testObject.set("phone",phone);
  testObject.set("pin",pin);
  testObject.set("address",address);
  testObject.set("dispatcherMarked",false);


  testObject.save(null, {
  success: function(testObject) {
    //alert('New gps marker created with objectId: ' + testObject.id);
  },
  error: function(testObject, error) {
    // Execute any logic that should take place if the save fails.
    // error is a Parse.Error with an error code and message.
    alert('Failed to create gps marker, with error code: ' + error.message);
  }
})
}

function retrieveGPSMarkers (callbackFunction)
{
  //alert("querying list of gps markers");

  Parse.$ = jQuery;
  Parse.initialize("cardforgegame","brian"); // Your App Name
  Parse.serverURL = 'https://cardforge.herokuapp.com/parse'; // Your Server URL
  Parse.useMasterKey = true;

  var gpsMarker = Parse.Object.extend("GPSMarkerObject");
  var query = new Parse.Query(gpsMarker);
  query.descending("updatedAt")
  query.limit(5000);
  query.find({
    success: function(results) {
      console.log('gpsmarkers: ',results);
      //alert("Successfully retrieved " + results.length + " gps markers.");
      // Do something with the returned Parse.Object values
      for (var i = 0; i < results.length; i++) {
        var object = results[i];
        //alert(object.id + ' - ' + object.get('name'));

      }
        callbackFunction(results);
    },
    error: function(error) {
      //alert("Error: " + error.code + " " + error.message);
      callbackFunction(error);
    }
  });
}

function deleteGPSMarker (callbackFunction)
{
  //alert("querying list of gps markers");

  Parse.$ = jQuery;
  Parse.initialize("cardforgegame","brian"); // Your App Name
  Parse.serverURL = 'https://cardforge.herokuapp.com/parse'; // Your Server URL
  Parse.useMasterKey = true;

  var gpsMarker = Parse.Object.extend("GPSMarkerObject");
  var query = new Parse.Query(gpsMarker);
  query.descending("updatedAt")
  query.limit(5000);
  query.find({
    success: function(results) {
      alert("Successfully retrieved " + results.length + " gps markers.");
      // Do something with the returned Parse.Object values
      for (var i = 0; i < results.length; i++) {
        var object = results[i];
        //alert(object.id + ' - ' + object.get('name'));

      }
        callbackFunction(results);
    },
    error: function(error) {
      alert("Error: " + error.code + " " + error.message);
      callbackFunction(error);
    }
  });
}

function markerDisplay(objectId,callBack)
{
    // var enteredPin = prompt("Please enter your 4-digit PIN:");

    Parse.$ = jQuery;
    Parse.initialize("cardforgegame","brian"); // Your App Name
    Parse.serverURL = 'https://cardforge.herokuapp.com/parse'; // Your Server URL
    Parse.useMasterKey = true;

    var gpsMarker = Parse.Object.extend("GPSMarkerObject");
    var query = new Parse.Query(gpsMarker);
    console.log('objectId: ',objectId);
    query.get(objectId,{
        success: function(results) {

          let attrs = results.attributes;
          callBack(attrs,objectId);
        },
        error: function(error) {
          alert("Error: " + error.code + " " + error.message);
        }
      });
}

// This function should be able to allow a User to specify how many hours they want to filter by. hoursAgo can be changed and may be set by a function argument. Right now, this function works if called and displays the pins by the correct filter hour amount.
function retrieveGPSMarkersByRecency (callbackFunction, hoursAgo)
{
  Parse.$ = jQuery;
  Parse.initialize("cardforgegame","brian"); // Your App Name
  Parse.serverURL = 'https://cardforge.herokuapp.com/parse'; // Your Server URL
  Parse.useMasterKey = true;

  var gpsMarker = Parse.Object.extend("GPSMarkerObject");
  var query = new Parse.Query(gpsMarker);
  query.descending("updatedAt")
  query.limit(5000);
  query.find({
    success: function(results) {
      var nowInEpochTimeHours = (Math.ceil((Date.now() / 1000) / 3600));
      var epochTimeAdjustment = (nowInEpochTimeHours - hoursAgo);
      console.log("nowInEpochTimeHours: " + nowInEpochTimeHours);
      console.log("epochTimeAdjustment: " + epochTimeAdjustment);
      // console.log(Math.ceil(nowInEpochTimeHours) + " hours since Epoch Time (Now).");
      var recentPinArray = [];
      for (var i = 0; i < results.length; i++) {
        var object = results[i];
        var objectTimeInHours = (Math.ceil((object.updatedAt.getTime() / 1000) / 3600));
        if (objectTimeInHours >= epochTimeAdjustment) {
          console.log(recentPinArray.length);
          recentPinArray.push(object)
        }
      }
        callbackFunction(recentPinArray);
    },
    error: function(error) {
      callbackFunction(error);
    }
  });
}
