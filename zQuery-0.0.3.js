//立即调用函数
(function (window,undefined) {
  //创建jQuery工厂函数
  var jQuery = function (selector) {
    return new jQuery.fn.init(selector)
  };
  //设置jQuery的原型对象
  jQuery.fn = jQuery.prototype = {
    constructor : jQuery,
    //设置init初始化方法
    init : function (selector) {
      /**
       * 判断传进来的类型,分以下几种情况
       * 01 类型为false
       * 02 字符串(选择器,标签,代码片段)
       * 03 数组
       * 04 伪数组
       * 05 对象,数字
       * 06 函数
       */
      // 01 类型为false的处理
      if (!selector) {
        return this
      }
      // 02 类型为字符串
      else if (typeof selector === 'string') {
        // 02.1 是否是标签字符串
        if (selector.charAt(0) === '<' && selector.charAt(selector.length - 1) === '>' && selector.length >= 3) {
          //是标签则转换成伪数组(对象)赋值给init实例对象
          var oDiv = document.createElement('div');
          oDiv.innerHTML = selector;
          //获取标签对象遍历,把每个标签对象传给init实例对象
          for (var i = 0; i<oDiv.children.length; i++) {
            this[i] = oDiv.children[i];
          }
          this.length = oDiv.children.length;
          //返回this
          return this
        }
      }
    }
  };
  //设置init的原型对象为jQuery的原型对象
  jQuery.fn.init.prototype = jQuery.fn;
  //jQuery绑定给window对象的方法
  window.jQuery = window.$ = jQuery;
})(window);