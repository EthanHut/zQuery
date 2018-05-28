
// 00 外层是立即调用函数
(function (window,undefined) {
  // 01 声明jQuery变量并定义为工厂函数
  var jQuery = function (selector,context) {
    return new jQuery.prototype.init(selector,context);
  };
  // 02 设置jQuery的原型对象
  jQuery.fn = jQuery.prototype = {
    constructor : jQuery,
    getName : function(){

    },
    init :function(selector,context){
      this.Name = selector;
      this.age = context;
    }
  };
  // 03 设置init构造函数的原型对象为jquery的原型对象
  jQuery.fn.init.prototype = jQuery.fn;

})(window)