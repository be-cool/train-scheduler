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
//   console.log(database);

// button to add trains onto the schedule
$("#add-train-btn").on("click", function (event) {
  event.preventDefault();
  console.log(1);


  var trainName = $("#train-name-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var frequency = $("#frequency-input").val().trim();
  var start = $("#start-input").val().trim();

  // taking the input for start time and transforming it into the format accepted for
  // the moment.js



  // var niceStart = moment.unix(start).format("HH:mm")
  // console.log(niceStart)

  // var nextArrival = moment().diff(moment(start, "X"), "minutes");
  // console.log(nextArrival)


  console.log(trainName);
  console.log(destination);
  console.log(frequency);


  var newTrain = {
    trainName,
    destination,
    frequency,
    start
  };

  database.ref('/trains/').push(newTrain);

  // console.log(newTrain.name);
  // console.log(newTrain.destination);
  // console.log(newTrain.frequency);


  // creating a new row div for any train that is input into the schedule

});
database.ref('/trains/').on("child_added", function (childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().trainName;
  var destination = childSnapshot.val().destination;
  var frequency = childSnapshot.val().frequency;
  var start = childSnapshot.val().start;

  var startTime = start;
  var startTimeHours = parseInt(startTime.split(":")[0]);
  var startTimeMinutes = parseInt(startTime.split(":")[1]);

  console.log(startTimeHours, startTimeMinutes);
  var today = new Date();
  var todayYear = today.getFullYear();
  var todayMonth = today.getMonth() + 1;
  var todayDay = today.getDay();
  var todayHours = today.getHours();
  var todayMinutes = today.getMinutes();
  console.log(todayHours, todayMinutes);

  if (todayDay < 10) {
    todayDay = "0" + todayDay;
  }
  if (todayMonth < 10) {
    todayMonth = "0" + todayMonth;
  }
  var today
  console.log(todayYear, todayMonth, todayDay);
  todayString = todayYear + "-" + todayMonth + '-' + todayDay + ' ' + startTime;
  console.log(todayString)


  var todayStartTime = moment(todayString, "YYYY-MM-DD HH:mm").format("X");
  console.log(todayStartTime);


  var minutesSinceStart = moment().diff(moment(todayStartTime, "X"), "minutes");
  console.log(minutesSinceStart);
  var minutesAway = (frequency - (minutesSinceStart % frequency));

  var nextTrain = moment().add(minutesAway, "minutes").format('LT');

  

  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(destination),
    $("<td>").text(frequency),
    $("<td>").text(nextTrain),
    $("<td>").text(minutesAway),
  );
  $("#train-table > tbody").append(newRow);
});

