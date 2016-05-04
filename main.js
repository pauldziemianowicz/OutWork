$(function () {

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

  $('form#onboarding1').on("submit", function(e){
    e.preventDefault();
    console.log("we submitted");
    userAccountData.userFirstName = $('input[name=user-first-name]')[0].value;
    userAccountData.userLastName = $('input[name=user-last-name]')[0].value;
    userAccountData.userPassword1 = $('input[name=user-password1]')[0].value;
    userAccountData.userPassword2 = $('input[name=user-password2]')[0].value;
    userAccountData.userEmail = $('input[name=user-email]')[0].value;
    userAccountData.userDOB = $('input[name=user-DOB]')[0].value;
    userAccountData.accountExists = true;
    userAccountData.loggedIn = true;
    localStorage.setItem('userAccountData', JSON.stringify(userAccountData));
  })
});
