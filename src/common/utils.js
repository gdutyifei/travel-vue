// Utilities

var utils = {
	/**
	 * 日期格式化
	 *
	 * @param {Date} date 指定日期
	 * @param {String} format
	 * @returns {String}
	 * @summary 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
	 * 			年(y)可以用 1-4个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
	 * @example (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02
	 *          08:09:04.423 (new Date()).Format("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18
	 */
	formatDate: function(date, format) {
		var o = {
			'M+': date.getMonth() + 1, //month
			'd+': date.getDate(), //day
			'h+': date.getHours(), //hour
			'm+': date.getMinutes(), //minute
			's+': date.getSeconds(), //second
			'q+': Math.floor((date.getMonth() + 3) / 3), //quarter
			'S': date.getMilliseconds() //millisecond
		};
		if (/(y+)/.test(format)) {
			format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
		}
		for ( var k in o) {
			if (new RegExp('(' + k + ')').test(format)) {
				format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
			}
		}
		return format;
	},

	// 获取过去的n天
	getBeforeDay: function(date, days) {
		var date = date || new Date();
		return new Date(Date.parse(date.toString()) - 86400000 * days);
	},

	// 查询字符串
	getQueryString: function(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg); // 获取url中"?"符后的字符串并正则匹配
		var context = "";
		if (r != null) {
			context = r[2];
		}
		reg = null;
		r = null;
		return (context == null || context == "" || context == "undefined") ? "" : context;
	},

	// 提取Hash字符串
	getHashString: function(url) {
		// return window.location.hash;
		var matched = /#[^?]*(?=\?|$)/.exec(url);
		return matched ? matched[0] : '';
	},

	// 删除空白字符串
	delBlankSpace: function(str) {
		var str = str.replace(/<\/?[^>]*>/gim, "");// 去掉所有的html标记
		var result = str.replace(/(^\s+)|(\s+$)/g, "");// 去掉前后空格
		return result.replace(/\s/g, "");// 去除文章中间空格
	},

	// 判断参数非空
	validateBlank: function(tmp) {
		if (!tmp && typeof (tmp) != "undefined" && tmp != 0) {
			// null
			return;
		} else if (typeof (tmp) == "undefined") {
			// undefined
			return;
		} else if (Array.isArray(tmp) && tmp.length === 0) {
			// 空数组
			return;
		} else if ($.trim(tmp) == "") {
			// 空串
			return;
		} else if (Object.prototype.isPrototypeOf(tmp) && Object.keys(tmp).length === 0) {
			// 空对象
			return;
		} else {
			return tmp;
		}
	},

	// 检测段落里空格和换行,转换成html输出
	blankRegExp: function(str) {
		if (typeof str != "string")
			return "";

		return this.htmlEncode(str).replace(/\r*\n/g, '<br/>');
	},

	// 转义html为安全文本
	htmlEncode: function(str) {
		//多个replace会有bug
		//return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;").replace(/\'/g, "&#39;").replace(/ /g, "&nbsp;");
		var html_encodes = {
			'&': '&amp;',
			'<': '&lt;',
			'>': '&gt;',
			'"': '&quot;',
			"'": "&#39;",
			' ': '&nbsp;'
		};
		return str.replace(/(&|<|>|\"|\'| )/g, function(str, item) {
			return html_encodes[item];
		});
	},

	// 正则解码
	htmlDecode: function(str) {
		var html_decodes = {
			 '&amp;':'&',
			 '&lt;':'<',
			 '&gt;':'>',
			 '&quot;':'"',
			 "&#39;":"'",
			 '&nbsp;':' '
		};
		return str.replace(/(&amp;|&lt;|&gt;|&quot;|&#39;|&nbsp;)/g, function(str, item) {
			return html_decodes[item];
		});
	},

	// 用浏览器内部转换器实现html转码
    HTMLEncode: function(html) {
	    var temp = document.createElement("div");
	    (temp.textContent != undefined) ? (temp.textContent = html) : (temp.innerText = html);
	    var output = temp.innerHTML;
	    temp = null;
	    return output;
    },

	// 用浏览器内部转换器实现html解码
	HTMLDecode: function(input) {
		var converter = document.createElement("DIV");
		converter.innerHTML = input;
		var output = converter.innerText;
		converter = null;
		return output;
	},

	// 判断微信内置浏览器
	isWeixin: function() {
		var ua = navigator.userAgent.toLowerCase();
		return (ua.match(/MicroMessenger/i) == 'micromessenger');
	},

	// 设置标题
	setTitle: function(t) {
		document.title = t;

		// [Hack]修改iOS微信浏览器的title
		if (this.isWeixin()) {
			var i = document.createElement('iframe');
			i.src = '//m.baidu.com/favicon.ico';
			i.style.display = 'none';
			i.onload = function() {
				setTimeout(function() {
					i.remove();
				}, 9);
			}
			document.body.appendChild(i);
		}
	}
};


export default {
  // 查询字符串
  getQueryString: function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg); // 获取url中"?"符后的字符串并正则匹配
    var context = "";
    if (r != null) {
      context = r[2];
    }
    reg = null;
    r = null;
    return (context == null || context == "" || context == "undefined") ? "" : context;
  },
  // 验证手机号码格式
  validateTelphone: function(telphone) {
    if (!(/^1[34578]\d{9}$/.test(telphone))) {
      return false;
    } else {
      return true;
    }
  },
  checkPasswordFormat: function(password) {
    var reg1 = new RegExp(/^[0-9A-Za-z]+$/);
    if (password == null || password.length < 8) {
      return false;
    }
    if (!reg1.test(password)) {
      return false;
    }
    var reg = new RegExp(/[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/);
    if (reg.test(password)) {
      return true;
    } else {
      return false;
    }
  }
}
