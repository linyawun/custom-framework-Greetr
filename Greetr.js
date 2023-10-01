(function (global, $) {
  //最前面家分號，避免前面的程式碼忘記以分號結尾
  //用IIFE包住程式碼，避免變數衝突

  var Greetr = function (firstName, lastName, language) {
    //回傳另一個函式建構子的結果，而不是直接用new來建構新物件
    return new Greetr.init(firstName, lastName, language);
  };

  var supportedLangs = ['en', 'es'];
  var greetings = {
    en: 'Hello',
    es: 'Hola',
  };
  var formalGreetings = {
    en: 'Greetings',
    es: 'Saludos',
  };
  var logMessage = {
    en: 'Logged in',
    es: 'Inicio sesion',
  };

  Greetr.prototype = {
    //這裡可以放任何Greetr物件都可以使用的方法
    fullName: function () {
      return this.firstName + ' ' + this.lastName;
    },
    validate: function () {
      if (supportedLangs.indexOf(this.language) === -1) {
        throw 'Invalid language';
      }
    },
    greeting: function () {
      return greetings[this.language] + ' ' + this.firstName + '!';
    },
    formalGreetings: function () {
      return formalGreetings[this.language] + ', ' + this.fullName();
    },
    greet: function (formal) {
      //以formal參數來決定要使用哪個方法
      var msg;
      //if undefined or null it will be coerced to 'false'
      if (formal) {
        msg = this.formalGreetings();
      } else {
        msg = this.greeting();
      }

      if (console) {
        console.log(msg);
      }

      //'this' refers to the calling object at execution time makes the method chainable
      return this;
    },
    log: function () {
      if (console) {
        console.log(logMessage[this.language] + ': ' + this.fullName());
      }
      return this;
    },
    setLang: function (lang) {
      this.language = lang;
      this.validate();

      return this;
    },
    HTMLGreeting: function (selector, formal) {
      if (!$) {
        throw 'jQuery not loaded';
      }
      if (!selector) {
        throw 'Missing jQuery selector';
      }
      var msg;
      if (formal) {
        msg = this.formalGreetings();
      } else {
        msg = this.greeting();
      }
      $(selector).html(msg); //將該DOM元素的html設為msg

      return this;
    },
  };

  Greetr.init = function (firstName, lastName, language) {
    //可以取用外層的變數greetings，形成閉包，但外面使用者無法取得這些變數
    var self = this;
    self.firstName = firstName || '';
    self.lastName = lastName || '';
    self.language = language || 'en';
    self.validate();
  };

  //所有用 Greetr.init 建構出來的物件的原型都會指向 Greetr.init.prototype
  //讓Greetr.init的原型指向Greetr.prototype，在那裏放置共用的方法
  Greetr.init.prototype = Greetr.prototype;

  //將Greetr變成全域物件，並且用G$縮寫
  global.Greetr = global.G$ = Greetr;
})(window, jQuery);
