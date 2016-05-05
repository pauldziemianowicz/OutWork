$(function () {

  var test = "test";

  var userAccountData = {
    userFirstName: "",
    userLastName: "",
    userPassword1: "",
    userPassword2: "",
    userEmail: "",
    userDOB: "",
    accountExists: false,
    loggedIn: false,
  };

  var dashCatSelected = "sleep";    // = selected dashboard category (default)
  var subMenuSelected = "overview"; // = selected dashboard submenu item (default)

  // localStorage object storing up-to-date time/date data
  var localDateInfo = {
    currentTime: "",
    currentTimeOld: "",
    currentDoM: "",
    currentDoMOld: "",
    currentDoW: "",
    currentDoWOld: "",
    currentHour: "",
    currentHourOld: "",
    currentMinute: "",
    currentMinuteOld: "",
    currentSecond: "",
    currentSecondOld: "",
  };

  var sleepData = {};       // for storing and updating sleep data in local storage
  var nutritionData = {};   // for storing and updating nutrition data in local storage
  var exerciseData = {};    // for storing and updating exercise data in local storage

  var localStorage1; // = userAccountData2 on index.html

  var localStorage2; // = userAccountData2 on home.html

// 1 - localStorage account data storage and page nav mechanism
// --------------------------------------------------------

//When submit event fires from index.html, if .accountExists within localStorage object userAccountData
//is true (hitting submit sets it to true), switch the url to home.html and set the new home.html localStorage
//object to equal (hold the same properties and values) as the local storage object from index.html after submit event fired.
  function verifyUserOnSubmit() {
    //set variable to current local storage object//
    localStorage1 = JSON.parse(localStorage.userAccountData);
    if(localStorage1.accountExists) {
      localStorage.userAccountData2 = JSON.stringify(localStorage1);
      window.location.replace("home.html");
      localStorage.userAccountData2 = JSON.stringify(localStorage1);
      localStorage2 = localStorage.userAccountData2;
      localDateInfo.accountDayCounter = 0;
      localDateInfo.testCounter = 0;
      console.log(localStorage2);
    }
  };

//When called, if current url is index.html, if accountExists property in localStorage is true,
//change url to home.html. if accountExists is not true, set localStorage to empty userAccountData object.
  function verifyUserOnLoad() {
    if(window.location.href === "file:///Users/Paul/Projects/OutWork/index.html") {
      if(localStorage.userAccountData2) {
        if(JSON.parse(localStorage.userAccountData2).accountExists === true) {
          window.location.replace("home.html");
        }
      } else {
      localStorage.setItem('userAccountData', JSON.stringify(userAccountData));
      }
    } else if(window.location.href === "file:///Users/Paul/Projects/OutWork/home.html") {
    localStorage.setItem('userAccountData', JSON.stringify(userAccountData));
  }
};

  verifyUserOnLoad();

  $('#onboarding1').on("submit", function(e){
    e.preventDefault();
    var form = $('#onboarding1')[0];
    userAccountData.userFirstName = $('input[name=user-first-name]')[0].value;
    userAccountData.userLastName = $('input[name=user-last-name]')[0].value;
    userAccountData.userPassword1 = $('input[name=user-password1]')[0].value;
    userAccountData.userPassword2 = $('input[name=user-password2]')[0].value;
    userAccountData.userEmail = $('input[name=user-email]')[0].value;
    userAccountData.userDOB = $('input[name=user-DOB]')[0].value;
    userAccountData.accountExists = true;
    userAccountData.loggedIn = true
    //set index.html local storage to form submitted fields//
    localStorage.setItem('userAccountData', JSON.stringify(userAccountData));
    form.reset();
    verifyUserOnSubmit();
  })

// 2 - Dashboard and SubMenu Selection Display Mechanism
// -------------------------------------------------

$('nav.dashboard-bottom-nav').css("visibility", "hidden");

function dashCatSelectDisplay() {
  if(dashCatSelected === "sleep") {
    $('#sleep-category').css("background-color", "rgba(62, 21, 195, 0.5)");
    $('#nutrition-category').css("background-color", "rgba(43, 128, 62, 1)");
    $('#exercise-category').css("background-color", "rgba(220, 11, 35, 1)");
  }
  else if(dashCatSelected === "nutrition") {
    $('#nutrition-category').css("background-color", "rgba(43, 128, 62, 0.5)");
    $('#sleep-category').css("background-color", "rgba(62, 21, 195, 1)");
    $('#exercise-category').css("background-color", "rgba(220, 11, 35, 1)");
  }
  else if(dashCatSelected === "exercise") {
    $('#exercise-category').css("background-color", "rgba(220, 11, 35, 0.5)");
    $('#sleep-category').css("background-color", "rgba(62, 21, 195, 1)");
    $('#nutrition-category').css("background-color", "rgba(43, 128, 62, 1)");
  }
};

function subMenuSelectDislay() {
  if(subMenuSelected === "overview") {
    $('.sub-overview').css("background-color", "rgb(255, 255, 255)");
    $('.sub-update').css("background-color", "rgba(205, 205, 205, 0.5)");
    $('.sub-goals').css("background-color", "rgba(205, 205, 205, 0.5)");
    $('.sub-log').css("background-color", "rgba(205, 205, 205, 0.5)");

  }
  else if(subMenuSelected === "update") {
    $('.sub-overview').css("background-color", "rgba(205, 205, 205, 0.5)");
    $('.sub-update').css("background-color", "rgb(255, 255, 255)");
    $('.sub-goals').css("background-color", "rgba(205, 205, 205, 0.5)");
    $('.sub-log').css("background-color", "rgba(205, 205, 205, 0.5)");
  }
  else if(subMenuSelected === "goals") {
    $('.sub-overview').css("background-color", "rgba(205, 205, 205, 0.5)");
    $('.sub-update').css("background-color", "rgba(205, 205, 205, 0.5)");
    $('.sub-goals').css("background-color", "rgb(255, 255, 255)");
    $('.sub-log').css("background-color", "rgba(205, 205, 205, 0.5)");
  }
  else if(subMenuSelected === "log") {
    $('.sub-overview').css("background-color", "rgba(205, 205, 205, 0.5)");
    $('.sub-update').css("background-color", "rgba(205, 205, 205, 0.5)");
    $('.sub-goals').css("background-color", "rgba(205, 205, 205, 0.5)");
    $('.sub-log').css("background-color", "rgb(255, 255, 255)");
  }
};

$('#sleep-category').on('click', function(){
  dashCatSelected = "sleep";
  subMenuSelected = "overview";
  console.log(dashCatSelected);
  console.log(subMenuSelected);
  $('nav.dashboard-bottom-nav').css("visibility", "visible");
  dashCatSelectDisplay();
  subMenuSelectDislay();
});

$('#nutrition-category').on('click', function(){
  dashCatSelected = "nutrition";
  subMenuSelected = "overview";
  console.log(dashCatSelected);
  console.log(subMenuSelected);
  $('nav.dashboard-bottom-nav').css("visibility", "visible");
  dashCatSelectDisplay();
  subMenuSelectDislay();
});

$('#exercise-category').on('click', function(){
  dashCatSelected = "exercise";
  subMenuSelected = "overview";
  console.log(dashCatSelected);
  console.log(subMenuSelected);
  $('nav.dashboard-bottom-nav').css("visibility", "visible");
  dashCatSelectDisplay();
  subMenuSelectDislay();
});

$('.sub-overview').on('click', function() {
  subMenuSelected = "overview";
  subMenuSelectDislay();
});

$('.sub-update').on('click', function() {
  subMenuSelected = "update";
  subMenuSelectDislay();
});

$('.sub-goals').on('click', function() {
  subMenuSelected = "goals";
  subMenuSelectDislay();
});

$('.sub-log').on('click', function() {
  subMenuSelected = "log";
  subMenuSelectDislay();
});

// DATE & TIME REFERENCE
// ---------------------
// ---------------------

var lsDateObject = JSON.parse(localStorage.localDateInfo);
var needsUpdate = false;

console.log("recent local storage");
console.log(lsDateObject);
console.log("current localDateInfo variable");
console.log(localDateInfo);

// setInterval(dateNow(), 1000);
// function dateNow() {
//   var now = new Date();
//   console.log(now.getTime())
// };

function validateNewMinute() {
  var lsDateObject = JSON.parse(localStorage.localDateInfo);
  // if(lsDateObject.currentSecond !== lsDateObject.currentSecondOld) {
  //   needsupdate = true;
  // }
  // else {
    setTimeout(countMinuteMS, 1000);
  // }

  function countMinuteMS() {
    console.log(needsUpdate);
    console.log(localDateInfo.currentMinuteOld);
    console.log(localDateInfo.currentMinute);
    console.log(localDateInfo.currentSecond);
    if(localDateInfo.currentMinute !== localDateInfo.currentMinuteOld) {
      needsUpdate = true;
    };
    if(localDateInfo.currentSecond > 55) {
      needsUpdate = false;
    }
    console.log(needsUpdate);
    var now = new Date();
    var nowMS = now.getTime();
    console.log(nowMS);
    setTimeout(countMinuteMS, 500)
  }
}

pullOldFromLSOnInit();

validateNewMinute();

resumeTestCounter();

storeDateInfo();
setInterval(storeDateInfo, 1000);

// A - Resume Counter
// ------------------
// when user refreshes page, this ensures that the testCounter/dayCounter
// are not reset to 0 each time, but resume from where they left off -- the
// last stored localStorage value;

function resumeTestCounter() {
  var lsDateObject = JSON.parse(localStorage.localDateInfo);
  if(!lsDateObject.testCounter) {
    localDateInfo.testCounter = 0;
  } else {
    localDateInfo.testCounter = lsDateObject.testCounter;
  }
};

// function resumeDayCounter() {
//   var lsDateObject = JSON.parse(localStorage.localDateInfo);
//   if(!lsDateObject.accountDayCounter) {
//     localDateInfo.accountDayCounter = 0;
//   } else {
//     localDateInfo.accountDayCounter = lsDateObject.accountDayCounter;
//   }
// };

// B - Update Local Storage Date Info
// ----------------------------------
// Throw newly defined current Date values into localStorage as current properties.
// If currentMinuteOld is an empty string "" (as set upon page refresh with variable
// assignment, set it to localStorage value of currentMinute which has just been defined
// -- if currentMinute is empty string, then we know it's the user's first time on the site.

// function updateLSDateInfo() {
//   if(localDateInfo.currentMinuteOld === "") {
//     localDateInfo.currentMinuteOld = localDateInfo.currentMinute;
//   }
//   localStorage.localDateInfo = JSON.stringify(localDateInfo);
//   console.log(localStorage.localDateInfo);
//   console.log(JSON.parse(localStorage.localDateInfo));
// };


// B -
//
// i. when called, Updates local storage with current localDateInfo variable
// ii. when called, if value value of property currentMinuteOld in localDateInfo
//     var is "", update it with most recent assigned currentMinute from end of
//     last session. This will allow us

function pullOldFromLSOnInit() {
  var lsDateObject = JSON.parse(localStorage.localDateInfo);
  if(localDateInfo.currentTimeOld === "") {
    localDateInfo.currentTimeOld = lsDateObject.currentTimeOld;
  }
  if(localDateInfo.currentDoM === "") {
    localDateInfo.currentDoMOld = lsDateObject.currentDoMOld;
  }
  if(localDateInfo.currentDoWOld === "") {
    localDateInfo.currentDoWOld = lsDateObject.currentDoWOld;
  }
  if(localDateInfo.currentHourOld === "") {
    localDateInfo.currentHourOld = lsDateObject.currentHourOld;
  }
  if(localDateInfo.currentMinuteOld === "") {
    localDateInfo.currentMinuteOld = lsDateObject.currentMinuteOld;
  }
  if(localDateInfo.currentSecondOld === "") {
    localDateInfo.currentSecondOld = lsDateObject.currentSecondOld;
  }
};

function updateLSDateInfo() {
  var lsDateObject = JSON.parse(localStorage.localDateInfo);
  localStorage.localDateInfo = JSON.stringify(localDateInfo);
  // console.log(localDateInfo);
  // console.log(lsDateObject);
}

function storeDateInfo() {
  var currentTimeL = new Date();
  localDateInfo.currentTime = currentTimeL;
  localDateInfo.currentDoM = currentTimeL.getDate();
  localDateInfo.currentDoW = currentTimeL.getDay();
  localDateInfo.currentHour = currentTimeL.getHours();
  localDateInfo.currentMinute = currentTimeL.getMinutes();
  localDateInfo.currentSecond = currentTimeL.getSeconds();
  // updates current___ properties to LS from localDateInfo
  updateLSDateInfo();
  // console.log("currentTime is more recent than currentTimeOld");
  setTimeout(saveCurrentToCurrentOld, 500);
  validateNewFakeDay();
};

// before this function runs (between storeDataInfo call and 2500ms after
// setTimeout is called within, is when the discrepancy between
// current and currentOld properties exists.
function saveCurrentToCurrentOld() {
  localDateInfo.currentTimeOld = localDateInfo.currentTime;
  localDateInfo.currentDoMOld = localDateInfo.currentDoM;
  localDateInfo.currentDoWOld = localDateInfo.currentDoW;
  localDateInfo.currentHourOld = localDateInfo.currentHour;
  localDateInfo.currentMinuteOld = localDateInfo.currentMinute;
  localDateInfo.currentSecondOld = localDateInfo.currentSecond;
  updateLSDateInfo();
  // console.log("currentTimeOld = currentTime");
};

function validateNewFakeDay() {
  var lsDateObject = JSON.parse(localStorage.localDateInfo);
  var oldDate = lsDateObject.currentTimeOld.substr(0,10);
  var newDate = lsDateObject.currentTime.substr(0,10);
  var oldMinute = lsDateObject.currentMinuteOld;
  var newMinute = localDateInfo.currentMinute;
  // if(newDate === oldDate) {
  // if()
  // localDateInfo.accountDayCounter += 1;
  // }
  if (newMinute !== oldMinute) {
    localDateInfo.testCounter += 1;
    console.log(localDateInfo.testCounter);
    console.log(localDateInfo.testCounter);
    console.log(localDateInfo.testCounter);
    console.log(localDateInfo.testCounter);
    console.log(localDateInfo.testCounter);
    }
  };

// Storing and Interacting with Sleep data
// Storing and Interacting with Nutrition data
// Storing and Interacting with Exercise data

});
