function checkUser()
  {
  Parse.initialize("cardforgegame","brian"); // Your App Name
  Parse.serverURL = 'https://cardforge.herokuapp.com/parse'; // Your Server URL
  Parse.useMasterKey = true;
  var can_vet = false;
  var can_edit = false;

  var currentUser = Parse.User.current();
  if(currentUser){
    console.log('current user is: ',currentUser.attributes);
    if(currentUser.attributes.auth=='admin'){
      can_edit=true;
    }
    if(currentUser.attributes.can_vet_others){
      can_vet=true;
    }
    return {can_vet,can_edit};
  }else{
    console.log('nobody logged in');
    return {can_vet,can_edit};
  }
}

var credentials = checkUser();

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
  console.log('credentials: ',credentials);
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
  query.limit=10000;
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

function updatePositionData(objectId) {
  var latLngRaw = prompt("Please enter the new location: (e.g. 29.74593050000001, -95.39948299999998)");
  var splitString = latLngRaw.split(",");
  if (splitString == null)
    return;
  if (splitString.length !== 2) {
    alert("Incorrect format, must be two numbers separated by a comma. Please try again.");
    return;
  }
  if (isNaN(splitString[0]) || isNaN(splitString[1])) {
    alert("Incorrect format, at least one of input is not a number. Please try again.");
    return;
  }
  var latLng = new google.maps.LatLng(splitString[0], splitString[1]);

  Parse.$ = jQuery;
  Parse.initialize("cardforgegame", "brian"); // Your App Name
  Parse.serverURL = 'https://cardforge.herokuapp.com/parse'; // Your Server URL
  Parse.useMasterKey = true;

  var gpsMarker = Parse.Object.extend("GPSMarkerObject");
  var query = new Parse.Query(gpsMarker);
  query.get(objectId, {
    success: function(markerParse) {
      //var pin = markerParse.get("pin");
      markerParse.set("positionData", latLng);
      markerParse.save();

      alert("Position updated, refresh map to see update.");

    },
    error: function(error) {
      alert("Error: " + error.code + " " + error.message);
    }
  });
}
function createNewDispatcher(name,username,email,description,phone,password){
  console.log('createNewDispatcher');
  Parse.initialize("cardforgegame","brian"); // Your App Name
  Parse.serverURL = 'https://cardforge.herokuapp.com/parse'; // Your Server URL
  var user = new Parse.User();
  user.set("name", name);
  user.set("username", username);
  user.set("auth","entry");
  user.set("can_vet_others",false);
  user.set("password", password);
  user.set("description", description);
  user.set("email", email);
  user.set("type", "HarveyResponse");

  // other fields can be set just like with Parse.Object
  user.set("phone", phone);

  user.signUp(null, {
    success: function(user) {
      // Hooray! Let them use the app now.
      console.log('new user! ',user);
      Parse.useMasterKey = true;

      var TestObject = Parse.Object.extend("Dispatcher_Privileges");
      var testObject = new TestObject();
      testObject.set("userid",user.id);
    },
    error: function(user, error) {
      // Show the error message somewhere and let the user try again.
      alert("Error: " + error.code + " " + error.message);
    }
  });

}

function promoteDispatcher(id){
  Parse.initialize("cardforgegame","brian"); // Your App Name
  Parse.serverURL = 'https://cardforge.herokuapp.com/parse'; // Your Server URL
  Parse.Cloud.define("stealGold", function(request, response) {
    var query = new Parse.Query(Parse.User);
    query.equalTo("objectId", request.params.targetObjectId);
      query.find({
        success: function(dispatcher) {
          dispatcher = dispatcher[0];
          dispatcher.set("name","Harry");
        }
    });
  });
//   var query = new Parse.Query(Parse.User);
//   query.equalTo("objectId", id);
//   query.find({
//     success: function(dispatcher) {
//       dispatcher = dispatcher[0];
//       dispatcher.set("name","Harry");
//     }
// });
//   console.log('promoting dispatcher: ',id);
//   if(credentials.can_vet){
//     console.log('this person can vet: ',credentials.can_vet);
//   }else{
//     alert('Incorrect authorization level.');
//   }
}

function logoutDispatcher(){
  Parse.User.logOut().then(() => {
    var currentUser = Parse.User.current();  // this will now be null
  });
}
