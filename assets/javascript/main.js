var newTrain = {
  name: "",
  destination: "",
  start: "",
  freq: ""
};
var config = {
  apiKey: "AIzaSyDvQYG3tuDoAjyXrnYldBtWUBlGQVRD4X8",
  authDomain: "train-schedule-316e6.firebaseapp.com",
  databaseURL: "https://train-schedule-316e6.firebaseio.com",
  projectId: "train-schedule-316e6",
  storageBucket: "train-schedule-316e6.appspot.com",
  messagingSenderId: "27197639235"
};
firebase.initializeApp(config);

var database = firebase.database();

$("#addTrain").on("click", function (event) {

  event.preventDefault();


  var trainName = $("#trainName").val().trim();
  var trainDestination = $("#Destination").val().trim();
  var trainStart = moment($("#firstTrain").val().trim(), "hmm").format("HH:MM");
  var trainFreq = $("#frequency").val().trim();

  newTrain = {
    name: trainName,
    destination: trainDestination,
    start: trainStart,
    freq: trainFreq
  };

  console.log(newTrain)

  database.ref().push(newTrain);

  $("#trainName").val("");
  $("#Destination").val("");
  $("#firstTrain").val("");
  $("#frequency").val("");
});

database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  
  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var trainStart = childSnapshot.val().start;
  var trainFreq = childSnapshot.val().freq;

  
  console.log(trainName);
  console.log(trainDestination);
  console.log(trainStart);
  console.log(trainFreq);

  var currTime = moment().endOf(trainStart).fromNow(); 
  
  
  
  console.log(currTime);
  
  var newRow = $("<div class ='row'>").append(
    $("<div class='col-md-3'>").text(trainName),
    $("<div class='col-md-3'>").text(trainDestination),
    $("<div class='col-md-2'>").text(trainFreq),
   // $("<div class='col-md-2'>").text(empMonths),
    //$("<div class='col-md-2'>").text(empRate),
  );

  ($("#list")).append(newRow);
});
