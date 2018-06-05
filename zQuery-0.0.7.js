// 00 立即调用函数
(function (window,undefined) {
  // 01 创建jQuery工厂函数
  var jQuery = function (selector) {
    return new jQuery.fn.init(selector)
  };
  // 02 设置jQuery的原型对象
  jQuery.fn = jQuery.prototype = {
    constructor : jQuery,
    init : function (selector) {
      // 0 判断是否类型为false
      if (!selector) {
        return this
      }
      // 1 判断是否是字符串
      else if (tools.isString(selector)) {
        // 是否是标签元素
        if (tools.isHTML(selector)) {
          var oDiv = document.createElement('div').innerHTML = selector;
          [].push.apply(this,oDiv.children);
          return this
        }
        // 不然为选择器
        else {
          var obj = document.querySelectorAll(selector);
          [].push.apply(this,selector);
          return this
        }
      }
      // 2 判断是否是数组
      else if (tools.isArray(selector)) {
        [].push.apply(this,selector);
        return this
      }
      // 3 判断是否是伪数组
      else if (tools.isLikeArray(selector)) {
        [].push.apply(this,selector);
        return this
      }
    }
  };
  // 03 设置init的原型对象为jQuery的原型对象
  jQuery.fn.init.prototype = jQuery.fn;
  // 04 把jQuery绑定为window对象的方法
  window.jQuery = window.$ = jQuery;

  // 工具类
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
     * 判断是否是标签元素字符串
     * @param string
     * @returns {boolean}
     */
    isHTML : function (string) {
      var str = tools.trim(string);
      return str.charAt(0) === '<' && str.charAt(str.length - 1) === '>' && str.length >= 3
    },
    /**
     * 去除字符串开头结尾的空格
     * @param string
     * @returns {*}
     */
    trim : function (string) {
      if (string.trim) {
        return string.trim()
      } else {
        return string.replace(/^\s+|\s+$/g,'')
      }
    },
    /**
     * 判断是否是数组
     * @param array
     * @returns {*}
     */
    isArray : function (array) {
      // 判断是否支持isarray方法
      if (array.isArray) {
        return array.isArray()
      }
      // 兼容性处理
      else {
        return Object.prototype.toString.call(array) === '[object Array]'
      }
    },
    /**
     * 判断是否是伪数组
     * @param obj
     */
    isLikeArray : function (obj) {
      /*
      * 伪数组的特点
      * 1 是对象
      * 2 拥有length属性
      * 3 拥有length - 1 属性
      * 4 容错处理 不能是window对象,应为window对象也拥有length属性
      * */
      return typeof obj === 'object' && ('length' in obj) && (obj.length - 1 in obj) && obj !== window.window
    }
  }
})(window);