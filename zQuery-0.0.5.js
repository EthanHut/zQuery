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
       * 0 类型为false
       * 1 类型为字符串(选择器,标签代码)
       * 2 数组
       * 3 伪数组
       * 4 对象,数字
       * 5 函数
       */
      // 类型为false
      if (!selector) {
        return this
      } else if (tools.isString(selector)) {
        if (tools.isHTML(selector)) {
          var oDiv = document.createElement('div');
          oDiv.innerHTML = selector;
          var childNode = oDiv.children;
          for (var i = 0;i<childNode.length; i++) {
            this[i] = childNode[i];
          }
          this.length = childNode.length;
          return this
        }
      }
    }
  };
  // 03 设置init的原型对象为jQuery的原型对象
  jQuery.fn.init.prototype = jQuery.fn;
  // 04 绑定jQuery给window对象的方法
  window.jQuery = window.$ = jQuery;

  //工具类
  var tools = {
    /**
     * 判断是否是字符串
     * @param string
     * @returns {boolean}
     */
    isString : function (string) {
      return typeof string === 'string'
    },
    /**
     * 判断是否是标签元素
     * @param string
     * @returns {boolean}
     */
    isHTML : function (string) {
      var str = tools.trim(string);
      return str.charAt(0) === '<' && str.charAt(str.length - 1) === '>' && str.length >= 3
    },
    /**
     * 去除字符串中开头结尾的空格
     * @param string
     * @returns {*}
     */
    trim : function (string) {
      if (string.trim) {
        return string.trim()
      }else {
        return string.replace(/^\s+|\s+$/g,'')
      }
    }
  }
})(window);