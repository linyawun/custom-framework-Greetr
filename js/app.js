//get a new object (the architecture allows us to not have to use the 'new' keyword here)
var g = G$('John', 'Doe');

//let's use our object on the click of the login button
$('#login').click(function () {
  var loginGrtr = G$('John', 'Doe');
  $('#logindiv').hide(); //隱藏選擇按鈕和下拉選單

  //依據選項設定language，並呼叫HTMLGreeting
  loginGrtr.setLang($('#lang').val()).HTMLGreeting('#greeting', true).log();
});
