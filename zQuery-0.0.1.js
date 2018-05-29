
// 00 外层是立即调用函数
(function (window,undefined) {
  // 01 声明jQuery变量并定义为工厂函数
  var jQuery = function (selector,context) {
    return new jQuery.prototype.init(selector,context);
  };

  // 02 设置jQuery的原型对象
  jQuery.fn = jQuery.prototype = {
    constructor : jQuery,
    init :function(selector,context){
      //......
    }
  };

  // 03 设置init构造函数的原型对象为jquery的原型对象
  jQuery.fn.init.prototype = jQuery.fn;

  // 04 把函数作用域内的jQuery绑定给全局对象window
  window.jQuery = window.$ = jQuery;
})(window);