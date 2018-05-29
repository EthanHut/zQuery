// 00 立即调用函数
(function (window,undefined) {
  // 01 创建工厂函数
  var jQuery = function (selector) {
    // 返回init的实例对象
    return new jQuery.fn.init(selector)
  };
  // 02 设置jQuery的原型对象
  jQuery.fn = jQuery.prototype = {
    constructor : jQuery,
    init : function (selector) {
      /**
       * 判断传进来的参数
       * 00 类型为false
       * 01 类型为字符串(选择器,标签代码)
       * 02 数组
       * 03 伪数组
       * 04 对象 数字
       * 05 函数
       */
      // 类型为false返回实例本身
      if (!selector) {
        return this
      }
      // 类型为字符串
      else if (tools.isString(selector)) {
        // 是否为标签字符串(首字符为<并且尾字符为>并且字符数量大于等于3个)
        if (tools.isString(selector)) {
          var oDiv = document.createElement('div');
          oDiv.innerHTML = selector;
          var childNode = oDiv.children;
          //遍历伪数组,传给init的实例对象
          for (var i = 0; i<childNode.length; i++) {
            this[i] = childNode[i];
          }
          //设置init实例对象length属性
          this.length = childNode.length;
          //返回实例对象
          return this
        }
      }
    }
  };
  // 03 设置init的原型对象为jQuery的原型对象
  jQuery.fn.init.prototype = jQuery.fn;
  // 04 jQuery绑定为window对象的方法
  window.jQuery = window.$ = jQuery;

  // 工具类
  var tools = {
    /**
     * 判断是否为字符串
     * @param string
     * @returns {boolean}
     */
    isString : function (string) {
      return typeof string === 'string'
    },
    /**
     * 判断是否是HTML标签
     * @param string
     * @returns {boolean}
     */
    isHTML : function (string) {
      var str = tools.trim(string);
      return str.charAt(0) === '<' && str.charAt(str.length - 1) === '>' && str.length >= 3
    },
    /**
     * 字符串开头和结尾的空格去除
     * @param string
     * @returns {*}
     */
    trim : function (string) {
      //trim方法的兼容判断,trim方法是ES5版本的方法
      if (string.trim) {
        return string.trim()
      }
      else {
        //trim方法的兼容处理,用replace方法,不能传入空,否则只会替换一次,用正则表达式
        return string.replace(/^\s+|\s+$/g,'')
      }
    }
  }
})(window);