// 00 立即调用函数
(function (window,undefined) {
  // 01 创建工厂函数
  var jQuery = function (selector) {
    return new jQuery.fn.init(selector)
  };
  // 02 设置jQuery的原型对象
  jQuery.fn = jQuery.prototype = {
    constructor : jQuery,
    init : function (selector) {
      // 0 判断类型是否为false
      if (!selector) {
        return this
      }
      // 1 判断是否传递函数
      else if (tools.isFunction(selector)) {
        // 监听DOM
        tools.DOMCompleteListener(selector)
      }
      // 2 判断类型是否是字符串
      else if (tools.isString(selector)) {
        // 判断是否是标签
        if (tools.isHTML(selector)) {
          var oDiv = document.createElement('div').innerHTML = selector;
          [].push.apply(this,oDiv.children);
          return this
        }
        // 不是标签则是选择器
        else {
          var obj = document.querySelectorAll(selector);
          [].push.apply(this,obj);
          return this
        }
      }
      // 3 判断类型是否是数组
      else if (tools.isArray(selector)) {
        [].push.apply(this,selector);
        return this
      }
      // 4 判断是伪数组
      else if (tools.isLikeArray(selector)) {
        // aplly方法只能接收数组或者系统原有的伪数组,不能接收自定义的伪数组,否则会在IE9以下出现兼容问题
        // 兼容思路: 将自定义的伪数组转换成数组
        var arr = [].slice.apply(selector);
        [].push.apply(this,arr);
        return this
      }
      // 5 都不是则判定为对象|数组|DOM
      else {
        this['0'] = selector;
        this.length = 1;
        return this
      }
    }
  };
  // 03 设置init的原型对象为jQuery的原型对象
  jQuery.fn.init.prototype = jQuery.fn;
  // 04 将jQuery绑定为window对象的方法
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
     * 判断是否是标签元素
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
      }
      else {
        return string.replace(/^\s+|\s+$/g,'')
      }
    },
    /**
     * 判断是否是数组
     * @param array
     * @returns {*}
     */
    isArray : function (array) {
      if (array.isArray) {
        return array.isArray()
      }
      else {
        return Object.prototype.toString.apply(array) === '[object Array]'
      }
    },
    /**
     * 判断是否是伪数组
     * @param likeArray
     * @returns {boolean}
     */
    isLikeArray : function (likeArray) {
      /**
       * 伪数组特点
       * ##是一个对象
       * ##拥有length属性
       * ##拥有length-1属性
       * ##不是window对象,因为winodw对象也拥有length属性
       */
      return typeof likeArray === 'object' && ('length' in likeArray) && (likeArray.length - 1 in likeArray) && likeArray !== window.window
    },
    /**
     * 判断是否是函数
     * @param fn
     * @returns {boolean}
     */
    isFunction : function (fn) {
      return typeof fn === 'function'
    },
    /**
     *
     * @param callBack
     * @constructor
     */
    DOMCompleteListener : function (callBack) {
      /**
       * 如果是函数的话,需要监听DOM加载完成就执行函数
       * 这里使用addEventListener和attachEvent方法
       */
      // 如果DOM状态加载完成直接调用回调函数
      if (document.readyState === 'complete') {
        callBack()
      }
      // addeventlistener支持判断,如果支持则使用此方法监听DOM加载完成事件
      else if (document.addEventListener) {
        document.addEventListener('DOMContentLoaded',callBack)
      }
      // 不支持则使用attachEvent事件监听
      else {
        document.attachEvent('onreadystatechange',function () {
          // 判断DOM加载完成
          if (document.readyState === 'complete') {
            callBack()
          }
        })
      }
    }
  }
})(window)