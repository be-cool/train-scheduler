var config = {
    apiKey: "AIzaSyAHaeKzr7d6xWpVxNdt7myRrMIq1JONc3k",
    authDomain: "train-homework-d94d8.firebaseapp.com",
    databaseURL: "https://train-homework-d94d8.firebaseio.com",
    projectId: "train-homework-d94d8",
    storageBucket: "",
    messagingSenderId: "191448017935",
    appId: "1:191448017935:web:967f76d3e3fa99f7"
  };
  // Initialize Firebase
  firebase.initializeApp(config);

// initialize firebase   

  database = firebase.database();
  console.log(database);

// button to add trains onto the schedule
$("add-train-btn").on("click", function(event) {
    event.preventDefault();


var trainName = $("#train-name-input").val().trim();
var destination = $("#destination-input").val().trim();
var frequency = $("#frequency-input").val().trim();
console.log(trainName);
console.log(destination);
console.log(frequency);

var newTrain = {
    name:trainName,
    destination,
    frequency
};

database.ref().push(newTrain);

console.log(newTrain.name);
console.log(newTrain.destination);
console.log(newTrain.frequency);

alert ("new train added");

// creating a new row div for any train that is input into the schedule
var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(destination),
    $("<td>").text(frequency),

);

$("#train-table > tbody").append(newRow);
});

