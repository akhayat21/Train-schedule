//I bought you both tickets to see the 76ers and OKC, but you're all invited to watch the magic game on sunday



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
  var trainStart = $("#firstTrain").val().trim();
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

  var temp1 = trainStart
  var temp2 = moment().format('LT');
  console.log(temp1)
  console.log(temp2)
  var temp3 = moment(temp1,"HH:mm").diff(moment(temp2,"HH:mm"),"minutes");
  console.log(temp3);
  var temp4 = (temp3 % trainFreq);
  console.log(temp4);
  var temp5 = moment(temp2,"HH:mm").add(moment(temp4,"mm"));
  
  
  var newRow = $("<div class ='row'>").append(
    $("<div class='col-md-3'>").text(trainName),
    $("<div class='col-md-3'>").text(trainDestination),
    $("<div class='col-md-2'>").text(trainFreq),
    $("<div class='col-md-2'>").text(temp5),
    $("<div class='col-md-2'>").text(temp4),
  );

  ($("#list")).append(newRow);
});
