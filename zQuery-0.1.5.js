// 00 立即调用函数
(function (window,undefined) {
  // 01 创建工厂函数
  var jQuery = function (selector) {
    // 返回init的实例对象
    return new jQuery.fn.init(selector)
  };
  // 02 设置jQuery的原型对象
  jQuery.fn = jQuery.prototype = {
    constructor: jQuery,
    init: function (selector) {
      /**
       * 判断传进来的值的类型
       * 类型为false
       * 类型为字符串(选择器,标签)
       * 类型为数组
       * 类型为伪数组
       * 类型为对象,数字
       * 类型为函数
       */
      // 类型为false
      if (!selector) {
        return this
      }
      // 类型为函数
      else if (jQuery.isFunction(selector)) {
        // 调用ready方法
        jQuery.fn.ready(selector);
      }
      // 类型为字符串
      else if (jQuery.isString(selector)) {
        // 判断是否是标签
        if (jQuery.isHTML(selector)) {
          var oDiv = document.createElement('div').innerHTML = selector;
          [].push.apply(this,oDiv.children);
          return this
        }
        // 不是标签就是选择器
        else {
          var obj = document.querySelectorAll(selector);
          [].push.apply(this,obj);
          return this
        }
      }
      // 判断类型为数组
      else if (jQuery.isArray(selector)) {
        [].push.apply(this,selector);
        return this
      }
      // 判断类型是否是伪数组
      else if (jQuery.isLikeArray(selector)) {
        //apply方法只能接受数组或者系统原有的伪数组,不能接受自定义的伪数组对象,否则会在IE9以下出现兼容问题
        // 兼容思路:将自定义的伪数组转换成数组
        var arr = jQuery.fn.toArray();
        [].push.apply(this,arr);
        return this
      }
      // 都不是则判断类型是否是对象|数字|DOM
      else {
        this[0] = selector;
        this.length = 1;
        return this
      }
    },
    length: 0,
    jQuery: '1.0.0',
    selector: ''
  };
  // 设置init的原型为jQuery的原型对象
  jQuery.fn.init.prototype = jQuery.fn;
  // 绑定jQuery为window对象的方法
  window.jQuery = window.$ = jQuery;

  /**
   * 扩展方法
   * 将工具方法遍历映射成jQuery的方法,方便供外界使用
   * 通过扩展方法可将传递的obj对象扩展成jQuery的静态方法或原型方法
   * @param obj
   */
  jQuery.fn.extend = jQuery.extend = function (obj) {
    for (var key in obj) {
      this[key] = obj[key]
    }
  };
  // 扩展静态成员
  jQuery.extend({
    /**
     * 0 判断是否是字符串
     * @param string
     * @returns {boolean}
     */
    isString: function (string) {
      return typeof string === 'string'
    },
    /**
     * 1 判断是否是标签
     * @param string
     * @returns {boolean}
     */
    isHTML: function (string) {
      var str = jQuery.trim(string);
      return str.charAt(0) === '<' && str.charAt(str.length - 1) === '>' && str.length >= 3
    },
    /**
     * 2 去除字符串开始结尾的空格
     * @param string
     * @returns {void|XML}
     */
    trim: function (string) {
      // 判断是否支持trim方法
      if (string.trim) {
        return string.trim()
      }
      // 不支持则使用replace替换方法
      else {
        return string.replace(/^\s+|\s+$/g,'')
      }
    },
    /**
     * 判断类型是否是数组
     * @param arr
     * @returns {boolean}
     */
    isArray: function (arr) {
      return Object.prototype.toString.apply(arr) === '[object Array]'
    },
    /**
     * 判断是否是伪数组
     * @param likeArray
     * @returns {boolean}
     */
    isLikeArray:function (likeArray) {
      /**
       * 伪数组的特点
       * 是一个对象
       * 具有length属性
       * 具有length-1属性
       * 不是window对象,因为window对象也具有length属性
       */
      return typeof likeArray === 'object' && ('length' in likeArray) && (likeArray.length - 1 in likeArray) && !jQuery.isWindow(likeArray)
    },
    /**
     * 判断是否是函数
     * @param fn
     * @returns {boolean}
     */
    isFunction: function (fn) {
      return typeof fn === 'function'
    },
    isWindow: function (obj) {
      return obj === window.window
    }
  });
  // 扩展原型成员
  jQuery.fn.extend({
    /**
     * 监听DOM的加载
     * @param callBack
     */
    ready: function (callBack) {
      // 如果dom加载完毕直接回调函数
      if (document.readyState === 'complete') {
        callBack();
      }
      // 如果支持addEventListener则直接使用
      if (document.addEventListener) {
        document.addEventListener('DOMContentLoaded',callBack)
      }
      // 不支持的话使用attachEvent
      else {
        document.attachEvent('onreadystatechange',function () {
          if (document.readyState === 'complete') {
            callBack();
          }
        })
      }
    },
    /**
     * 伪数组转换成数组
     * @returns {*}
     */
    toArray: function () {
      return [].slice.call(this);
    },
    /**
     * 用来获取实例对象对应索引的DOM对象
     * @param index
     * @returns {*}
     */
    get: function (index) {
      /**
       * get方法接收一个索引,
       * 如果不传,则返回实例对象转换成的数组结构
       * 如果传递为正数,则返回实例对象对应的索引DOM对象
       * 如果传递的负数,则返回实例对象倒数第N个DOM对象
       */
      if (arguments.length === 0) {
        return this.toArray()
      }
      else {
        if (index >= 0) {
          return this[index]
        }
        else {
          return this[this.length + index]
        }
      }
    },
    /**
     * eq方法返回对应索引的DOM对象包装成一个新的init实例对象
     * @param index
     * @returns {jQuery|HTMLElement}
     */
    eq: function (index) {
      /**
       * eq方法返回一个对应的索引的DOM对象包装成一个新的init实例对象
       * 不传值的情况,返回一个空的init实例对象
       */
      if (arguments.length === 0) {
        return $()
      }
      else {
        return $(this.get(index))
      }
    }
  });
})(window);