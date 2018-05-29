
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
      /**
       * 传进来的值分以下几种情况
       * 01 类型为false的值
       * 02 字符串(选择器)
       * 03 字符串(标签/代码片段)
       * 04 伪数组
       * 05 数组
       * 06 对象
       * 07 DOM对象
       * 08 数字
       * 09 函数
       */

      //判断类型是否false
      if(!selector){
        //是false返回init的实例对象
        return this
      }
    }
  };

  // 03 设置init构造函数的原型对象为jquery的原型对象
  jQuery.fn.init.prototype = jQuery.fn;

  // 04 把函数作用域内的jQuery绑定给全局对象window
  window.jQuery = window.$ = jQuery;
})(window);