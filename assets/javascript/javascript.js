var config = {
    apiKey: "AIzaSyB6bl9d9X907z-j587AkDyDjgyl_Tdy_BI",
    authDomain: "train-schedule-7e69d.firebaseapp.com",
    databaseURL: "https://train-schedule-7e69d.firebaseio.com",
    projectId: "train-schedule-7e69d",
    storageBucket: "",
    messagingSenderId: "5930692439"
  };
  firebase.initializeApp(config);

var database = firebase.database();

var trainName = '';
var destination = '';
var frequency = '';
var nextArrival = '';
var firstTrainTime = '';

var currentTime = moment();
  console.log("current time: " + currentTime);

$("#submit").on("click", function(event){
  event.preventDefault();
  trainName = $("#train-name").val().trim();
  destination = $("#destination").val().trim();
  firstTrainTime = $("#first-train-time").val().trim();
  frequency = $("#frequency").val().trim();

  database.ref().push({
    trainName : trainName,
    destination: destination,
    firstTrainTime: firstTrainTime,
    frequency: frequency,
  });
  
  $("#train-name").val(" ");
  $("#destination").val(" ");
  $("#first-train-time").val('');
  $("#frequency").val(" ");

});

database.ref().on("child_added", function(childSnapshot){
 console.log(childSnapshot.val().trainName);
 console.log(childSnapshot.val().destination);
 console.log(childSnapshot.val().firstTrainTime);
 console.log(childSnapshot.val().frequency);


var tFrequency = childSnapshot.val().frequency;
var firstTime = childSnapshot.val().firstTrainTime;
var firstTimeConvert = moment(firstTime, "HH:mm").subtract(1,"years");
console.log(firstTimeConvert);
var diffTime = moment().diff(moment(firstTimeConvert), "minutes");
console.log(diffTime);
var tripRemainder = diffTime % tFrequency;
console.log(tripRemainder);
var minutesTilTrain = tFrequency - tripRemainder;
console.log(minutesTilTrain);
var nextTrain = moment().add(minutesTilTrain, "minutes").format("kk: mm");
console.log("Next Train Arrives at: " + nextTrain);
 
$("#main-table").append(`
            <tr>
                    <td>${childSnapshot.val().trainName}</td>
                    <td>${childSnapshot.val().destination}</td> 
                    <td>${childSnapshot.val().frequency}</td> 
                    <td>${nextTrain}</td>
                    <td>${minutesTilTrain}</td> 
                    
                   
            </tr> 
            `);

}) 