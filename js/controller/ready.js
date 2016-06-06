// FastClick Only iOS
// 在 Android 低端机下，效果不理想，不使用
if ('addEventListener' in document && /(iphone|ipad|ipod|ios)/i.test(navigator.userAgent.toLowerCase())) {
  document.addEventListener('DOMContentLoaded', function() {
    FastClick.attach(document.body);
  }, false);
};

// cxDialog 默认设置
$.cxDialog.defaults.baseClass = 'ios';
$.cxDialog.defaults.background = 'rgba(0,0,0,0.4)';
$.cxDialog.defaults.ok = function(){};

// 全局操作
$('body').on('click', 'a', function(){
  var _this = this;
  var _rel = _this.rel;
  var _rev = _this.rev;
  var _opt;

  try {
    _opt = JSON.parse(_this.dataset.option);
  } catch (e) {
    _opt = {};
  };

  // 显示提示
  if (_rel === 'call_tip') {
    APP.tipShow(_rev);
    return false;

  // 显示二维码
  } else if (_rel === 'call_qrcode') {
    _opt = $.extend({}, {
      info: _rev
    }, _opt);
    
    APP.qrcodeShow(_opt);
    return false;

  // 发送短信验证码
  } else if (_rel === 'call_sms') {
    APP.smsSend(_this);
    return false;

  // 显示面板
  } else if (_rel === 'call_panel') {
    document.getElementById(_rev).classList.toggle('out');
    return false;
  };
});

// 顶部操作
$('#header').on('click', 'dt', function() {
  var _dl = $(this).closest('dl');
  if (_dl.hasClass('menu')) {
    _dl.toggleClass('open');
  } else {
    setTimeout(function() {
      _dl.removeClass('open');
    }, 200);
  };
});


// 解决 iOS 输入框获取焦点时 fixed 错位
(function(){
  if ('addEventListener' in document && /(iphone|ipad|ipod|ios)/i.test(navigator.userAgent.toLowerCase())) {
    var docbody = document.body;

    var hasFix = function(e) {
      var _types = ['checkbox', 'radio', 'file', 'button', 'submit', 'reset', 'image', 'range'];
      var _nodeName = e.target.nodeName.toLowerCase();

      if (_nodeName === 'textarea' || _nodeName === 'select') {
        return true;
      } else if (_nodeName === 'input') {
        if (_types.indexOf(e.target.type) <= -1) {
          return true;
        };
      };
      return false;
    };

    docbody.addEventListener('focus', function(e) {
      if (hasFix(e) && !docbody.classList.contains('onfocus')) {
        docbody.classList.add('onfocus');
      };
    }, true);

    docbody.addEventListener('blur', function(e) {
      if (hasFix(e)) {
        docbody.classList.remove('onfocus');
      };
    }, true);
  };
})();


// 当前页面二维码
(function(){
  var box = $('<div></div>', {class: 'this_qrcode'});
  var pic = document.createElement('div');

  var qrcode = new QRCode(pic, {
    text: location.href,
    width: 88,
    height: 88,
    colorDark : "#000000",
    colorLight : "#ffffff",
    correctLevel : QRCode.CorrectLevel.L
  });

  box.prepend(pic).append('<p>微信扫一扫<br>获得更多内容</p>').appendTo('body');
})();


// flex 兼容
(function() {
  // iOS 不需要 fix
  if (/(iphone|ipad|ipod|ios)/i.test(navigator.userAgent.toLowerCase())) {
    return;
  };

  // 如果支持 flex 则不需要 fix
  if (!!((window.CSS && window.CSS.supports))) {
    if (CSS.supports('display', 'flex')) {
      return;
    };
  };

  var footerNav = document.getElementById('footer_nav');
  if (footerNav) {
    footerNav.classList.add('flex');
    footerNav.classList.add('flex_' + footerNav.querySelectorAll('a').length);
  };

  var tabNavArray = document.querySelectorAll('.nav_tab');
  if (tabNavArray.length) {
    for (var i = 0, l = tabNavArray.length; i < l; i++) {
      tabNavArray[i].classList.add('flex');
      tabNavArray[i].classList.add('flex_' + tabNavArray[i].querySelectorAll('a').length);
    };
  };
})();
