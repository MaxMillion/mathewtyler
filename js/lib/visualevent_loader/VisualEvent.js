/**
 * SyntaxHighlighter
 * http://alexgorbatchev.com/SyntaxHighlighter
 *
 * SyntaxHighlighter is donationware. If you are using it, please donate.
 * http://alexgorbatchev.com/SyntaxHighlighter/donate.html
 *
 * @version
 * 3.0.83 (July 02 2010)
 *
 * @copyright
 * Copyright (C) 2004-2010 Alex Gorbatchev.
 *
 * @license
 * Dual licensed under the MIT and GPL licenses.
 */

if (typeof XRegExp == "undefined") {
	var XRegExp;
	if (XRegExp) throw Error("can't load XRegExp twice in the same frame");
	(function () {
		function a(a, b, c) {
			if (Array.prototype.indexOf) return a.indexOf(b, c);
			for (var d = c || 0; d < a.length; d++) if (a[d] === b) return d;
			return -1
		}
		function b(a, b, c, d) {
			var e = i.length,
				f, g, j;
			h = !0;
			try {
				while (e--) {
					j = i[e];
					if (c & j.scope && (!j.trigger || j.trigger.call(d))) {
						j.pattern.lastIndex = b, g = j.pattern.exec(a);
						if (g && g.index === b) {
							f = {
								output: j.handler.call(d, g, c),
								match: g
							};
							break
						}
					}
				}
			} catch (k) {
				throw k
			} finally {
				h = !1
			}
			return f
		}
		function c(a) {
			return (a.global ? "g" : "") + (a.ignoreCase ? "i" : "") + (a.multiline ? "m" : "") + (a.extended ? "x" : "") + (a.sticky ? "y" : "")
		}
		function d(a, b) {
			if (!XRegExp.isRegExp(a)) throw TypeError("type RegExp expected");
			var d = a._xregexp;
			return a = XRegExp(a.source, c(a) + (b || "")), d && (a._xregexp = {
				source: d.source,
				captureNames: d.captureNames ? d.captureNames.slice(0) : null
			}), a
		}
		XRegExp = function (a, c) {
			var e = [],
				g = XRegExp.OUTSIDE_CLASS,
				i = 0,
				k, l, m, n, p;
			if (XRegExp.isRegExp(a)) {
				if (c !== undefined) throw TypeError("can't supply flags when constructing one RegExp from another");
				return d(a)
			}
			if (h) throw Error("can't call the XRegExp constructor within token definition functions");
			c = c || "", k = {
				hasNamedCapture: !1,
				captureNames: [],
				hasFlag: function (a) {
					return c.indexOf(a) > -1
				},
				setFlag: function (a) {
					c += a
				}
			};
			while (i < a.length) l = b(a, i, g, k), l ? (e.push(l.output), i += l.match[0].length || 1) : (m = j.exec.call(o[g], a.slice(i))) ? (e.push(m[0]), i += m[0].length) : (n = a.charAt(i), n === "[" ? g = XRegExp.INSIDE_CLASS : n === "]" && (g = XRegExp.OUTSIDE_CLASS), e.push(n), i++);
			return p = RegExp(e.join(""), j.replace.call(c, f, "")), p._xregexp = {
				source: a,
				captureNames: k.hasNamedCapture ? k.captureNames : null
			}, p
		}, XRegExp.version = "1.5.0", XRegExp.INSIDE_CLASS = 1, XRegExp.OUTSIDE_CLASS = 2;
		var e = /\$(?:(\d\d?|[$&`'])|{([$\w]+)})/g,
			f = /[^gimy]+|([\s\S])(?=[\s\S]*\1)/g,
			g = /^(?:[?*+]|{\d+(?:,\d*)?})\??/,
			h = !1,
			i = [],
			j = {
				exec: RegExp.prototype.exec,
				test: RegExp.prototype.test,
				match: String.prototype.match,
				replace: String.prototype.replace,
				split: String.prototype.split
			}, k = j.exec.call(/()??/, "")[1] === undefined,
			l = function () {
				var a = /^/g;
				return j.test.call(a, ""), !a.lastIndex
			}(),
			m = function () {
				var a = /x/g;
				return j.replace.call("x", a, ""), !a.lastIndex
			}(),
			n = RegExp.prototype.sticky !== undefined,
			o = {};
		o[XRegExp.INSIDE_CLASS] = /^(?:\\(?:[0-3][0-7]{0,2}|[4-7][0-7]?|x[\dA-Fa-f]{2}|u[\dA-Fa-f]{4}|c[A-Za-z]|[\s\S]))/, o[XRegExp.OUTSIDE_CLASS] = /^(?:\\(?:0(?:[0-3][0-7]{0,2}|[4-7][0-7]?)?|[1-9]\d*|x[\dA-Fa-f]{2}|u[\dA-Fa-f]{4}|c[A-Za-z]|[\s\S])|\(\?[:=!]|[?*+]\?|{\d+(?:,\d*)?}\??)/, XRegExp.addToken = function (a, b, c, e) {
			i.push({
				pattern: d(a, "g" + (n ? "y" : "")),
				handler: b,
				scope: c || XRegExp.OUTSIDE_CLASS,
				trigger: e || null
			})
		}, XRegExp.cache = function (a, b) {
			var c = a + "/" + (b || "");
			return XRegExp.cache[c] || (XRegExp.cache[c] = XRegExp(a, b))
		}, XRegExp.copyAsGlobal = function (a) {
			return d(a, "g")
		}, XRegExp.escape = function (a) {
			return a.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
		}, XRegExp.execAt = function (a, b, c, e) {
			b = d(b, "g" + (e && n ? "y" : "")), b.lastIndex = c = c || 0;
			var f = b.exec(a);
			return e ? f && f.index === c ? f : null : f
		}, XRegExp.freezeTokens = function () {
			XRegExp.addToken = function () {
				throw Error("can't run addToken after freezeTokens")
			}
		}, XRegExp.isRegExp = function (a) {
			return Object.prototype.toString.call(a) === "[object RegExp]"
		}, XRegExp.iterate = function (a, b, c, e) {
			var f = d(b, "g"),
				g = -1,
				h;
			while (h = f.exec(a)) c.call(e, h, ++g, a, f), f.lastIndex === h.index && f.lastIndex++;
			b.global && (b.lastIndex = 0)
		}, XRegExp.matchChain = function (a, b) {
			return function c(a, e) {
				var f = b[e].regex ? b[e] : {
					regex: b[e]
				}, g = d(f.regex, "g"),
					h = [],
					i;
				for (i = 0; i < a.length; i++) XRegExp.iterate(a[i], g, function (a) {
						h.push(f.backref ? a[f.backref] || "" : a[0])
					});
				return e === b.length - 1 || !h.length ? h : c(h, e + 1)
			}([a], 0)
		}, RegExp.prototype.apply = function (a, b) {
			return this.exec(b[0])
		}, RegExp.prototype.call = function (a, b) {
			return this.exec(b)
		}, RegExp.prototype.exec = function (b) {
			var d = j.exec.apply(this, arguments),
				e, f;
			if (d) {
				!k && d.length > 1 && a(d, "") > -1 && (f = RegExp(this.source, j.replace.call(c(this), "g", "")), j.replace.call(b.slice(d.index), f, function () {
					for (var a = 1; a < arguments.length - 2; a++) arguments[a] === undefined && (d[a] = undefined)
				}));
				if (this._xregexp && this._xregexp.captureNames) for (var g = 1; g < d.length; g++) e = this._xregexp.captureNames[g - 1], e && (d[e] = d[g]);
				!l && this.global && !d[0].length && this.lastIndex > d.index && this.lastIndex--
			}
			return d
		}, l || (RegExp.prototype.test = function (a) {
			var b = j.exec.call(this, a);
			return b && this.global && !b[0].length && this.lastIndex > b.index && this.lastIndex--, !! b
		}), String.prototype.match = function (a) {
			XRegExp.isRegExp(a) || (a = RegExp(a));
			if (a.global) {
				var b = j.match.apply(this, arguments);
				return a.lastIndex = 0, b
			}
			return a.exec(this)
		}, String.prototype.replace = function (b, c) {
			var d = XRegExp.isRegExp(b),
				f, g, h;
			return d && typeof c.valueOf() == "string" && c.indexOf("${") === -1 && m ? j.replace.apply(this, arguments) : (d ? b._xregexp && (f = b._xregexp.captureNames) : b += "", typeof c == "function" ? g = j.replace.call(this, b, function () {
				if (f) {
					arguments[0] = new String(arguments[0]);
					for (var a = 0; a < f.length; a++) f[a] && (arguments[0][f[a]] = arguments[a + 1])
				}
				return d && b.global && (b.lastIndex = arguments[arguments.length - 2] + arguments[0].length), c.apply(null, arguments)
			}) : (h = this + "", g = j.replace.call(h, b, function () {
				var b = arguments;
				return j.replace.call(c, e, function (c, d, e) {
					if (!d) {
						var h = +e;
						return h <= b.length - 3 ? b[h] : (h = f ? a(f, e) : -1, h > -1 ? b[h + 1] : c)
					}
					switch (d) {
					case "$":
						return "$";
					case "&":
						return b[0];
					case "`":
						return b[b.length - 1].slice(0, b[b.length - 2]);
					case "'":
						return b[b.length - 1].slice(b[b.length - 2] + b[0].length);
					default:
						var g = "";
						d = +d;
						if (!d) return c;
						while (d > b.length - 3) g = String.prototype.slice.call(d, -1) + g, d = Math.floor(d / 10);
						return (d ? b[d] || "" : "$") + g
					}
				})
			})), d && b.global && (b.lastIndex = 0), g)
		}, String.prototype.split = function (a, b) {
			if (!XRegExp.isRegExp(a)) return j.split.apply(this, arguments);
			var c = this + "",
				d = [],
				e = 0,
				f, g;
			if (b === undefined || +b < 0) b = Infinity;
			else {
				b = Math.floor(+b);
				if (!b) return []
			}
			a = XRegExp.copyAsGlobal(a);
			while (f = a.exec(c)) {
				if (a.lastIndex > e) {
					d.push(c.slice(e, f.index)), f.length > 1 && f.index < c.length && Array.prototype.push.apply(d, f.slice(1)), g = f[0].length, e = a.lastIndex;
					if (d.length >= b) break
				}
				a.lastIndex === f.index && a.lastIndex++
			}
			return e === c.length ? (!j.test.call(a, "") || g) && d.push("") : d.push(c.slice(e)), d.length > b ? d.slice(0, b) : d
		}, XRegExp.addToken(/\(\?#[^)]*\)/, function (a) {
			return j.test.call(g, a.input.slice(a.index + a[0].length)) ? "" : "(?:)"
		}), XRegExp.addToken(/\((?!\?)/, function () {
			return this.captureNames.push(null), "("
		}), XRegExp.addToken(/\(\?<([$\w]+)>/, function (a) {
			return this.captureNames.push(a[1]), this.hasNamedCapture = !0, "("
		}), XRegExp.addToken(/\\k<([\w$]+)>/, function (b) {
			var c = a(this.captureNames, b[1]);
			return c > -1 ? "\\" + (c + 1) + (isNaN(b.input.charAt(b.index + b[0].length)) ? "" : "(?:)") : b[0]
		}), XRegExp.addToken(/\[\^?]/, function (a) {
			return a[0] === "[]" ? "\\b\\B" : "[\\s\\S]"
		}), XRegExp.addToken(/^\(\?([imsx]+)\)/, function (a) {
			return this.setFlag(a[1]), ""
		}), XRegExp.addToken(/(?:\s+|#.*)+/, function (a) {
			return j.test.call(g, a.input.slice(a.index + a[0].length)) ? "" : "(?:)"
		}, XRegExp.OUTSIDE_CLASS, function () {
			return this.hasFlag("x")
		}), XRegExp.addToken(/\./, function () {
			return "[\\s\\S]"
		}, XRegExp.OUTSIDE_CLASS, function () {
			return this.hasFlag("s")
		})
	})()
}
var VisualEventSyntaxHighlighter = function () {
	function a(a) {
		var b = a.target,
			c = y(b, ".Event_syntaxhighlighter"),
			d = y(b, ".container"),
			e = document.createElement("textarea"),
			f;
		if (!d || !c || z(d, "textarea")) return;
		f = C(c.id), H(c, "source");
		var g = d.childNodes,
			h = [];
		for (var i = 0; i < g.length; i++) h.push(g[i].innerText || g[i].textContent);
		h = h.join("\r"), e.appendChild(document.createTextNode(h)), d.appendChild(e), e.focus(), e.select(), s(e, "blur", function (a) {
			e.parentNode.removeChild(e), G(c, "source")
		})
	}
	function b(a) {
		var b = "<![CDATA[",
			c = "]]>",
			d = h(a),
			e = !1,
			f = b.length,
			g = c.length;
		d.indexOf(b) == 0 && (d = d.substring(f), e = !0);
		var i = d.length;
		return d.indexOf(c) == i - g && (d = d.substring(0, i - g), e = !0), e ? d : a
	}
	function c() {
		var a = document.getElementsByTagName("script"),
			b = [];
		for (var c = 0; c < a.length; c++) a[c].type == "syntaxhighlighter" && b.push(a[c]);
		return b
	}
	function d(a) {
		var b = /(.*)((>|<).*)/;
		return a.replace(J.regexLib.url, function (a) {
			var c = "",
				d = null;
			if (d = b.exec(a)) a = d[1], c = d[2];
			return '<a href="' + a + '">' + a + "</a>" + c
		})
	}
	function e(a, b) {
		function c(a, b) {
			return a[0]
		}
		var d = 0,
			e = null,
			f = [],
			g = b.func ? b.func : c;
		while ((e = b.regex.exec(a)) != null) {
			var h = g(e, b);
			typeof h == "string" && (h = [new J.Match(h, e.index, b.css)]), f = f.concat(h)
		}
		return f
	}
	function f(a, b) {
		return a.index < b.index ? -1 : a.index > b.index ? 1 : a.length < b.length ? -1 : a.length > b.length ? 1 : 0
	}
	function g(a) {
		var b = E(i(a)),
			c = new Array,
			d = /^\s*/,
			e = 1e3;
		for (var f = 0; f < b.length && e > 0; f++) {
			var g = b[f];
			if (h(g).length == 0) continue;
			var j = d.exec(g);
			if (j == null) return a;
			e = Math.min(j[0].length, e)
		}
		if (e > 0) for (var f = 0; f < b.length; f++) b[f] = b[f].substr(e);
		return b.join("\n")
	}
	function h(a) {
		return a.replace(/^\s+|\s+$/g, "")
	}
	function i(a) {
		var b = /<br\s*\/?>|<br\s*\/?>/gi;
		return J.config.bloggerMode == 1 && (a = a.replace(b, "\n")), J.config.stripBrs == 1 && (a = a.replace(b, "")), a
	}
	function j(a, b) {
		function c(a, b, c) {
			return a.substr(0, b) + f.substr(0, c) + a.substr(b + 1, a.length)
		}
		var d = E(a),
			e = "\t",
			f = "";
		for (var g = 0; g < 50; g++) f += "                    ";
		return a = p(a, function (a) {
			if (a.indexOf(e) == -1) return a;
			var d = 0;
			while ((d = a.indexOf(e)) != -1) {
				var f = b - d % b;
				a = c(a, d, f)
			}
			return a
		}), a
	}
	function k(a, b) {
		var c = "";
		for (var d = 0; d < b; d++) c += " ";
		return a.replace(/\t/g, c)
	}
	function l(a, b) {
		var c = a.toString();
		while (c.length < b) c = "0" + c;
		return c
	}
	function m(a, b) {
		return a == null || a.length == 0 || a == "\n" ? a : (a = a.replace(/</g, "<"), a = a.replace(/ {2,}/g, function (a) {
			var b = "";
			for (var c = 0; c < a.length - 1; c++) b += J.config.space;
			return b + " "
		}), b != null && (a = p(a, function (a) {
			if (a.length == 0) return "";
			var c = "";
			return a = a.replace(/^( | )+/, function (a) {
				return c = a, ""
			}), a.length == 0 ? c : c + '<code class="' + b + '">' + a + "</code>"
		})), a)
	}
	function n(a) {
		var b, c = {}, d = new XRegExp("^\\[(?<values>(.*?))\\]$"),
			e = new XRegExp("(?<name>[\\w-]+)\\s*:\\s*(?<value>[\\w-%#]+|\\[.*?\\]|\".*?\"|'.*?')\\s*;?", "g");
		while ((b = e.exec(a)) != null) {
			var f = b.value.replace(/^['"]|['"]$/g, "");
			if (f != null && d.test(f)) {
				var g = d.exec(f);
				f = g.values.length > 0 ? g.values.split(/\s*,\s*/) : []
			}
			c[b.name] = f
		}
		return c
	}
	function o(a) {
		return a.replace(/^[ ]*[\n]+|[\n]*[ ]*$/g, "")
	}
	function p(a, b) {
		var c = E(a);
		for (var d = 0; d < c.length; d++) c[d] = b(c[d], d);
		return c.join("\n")
	}
	function q(a, b) {
		var c = J.vars.discoveredBrushes,
			d = null;
		if (c == null) {
			c = {};
			for (var e in J.brushes) {
				var f = J.brushes[e],
					g = f.aliases;
				if (g == null) continue;
				f.brushName = e.toLowerCase();
				for (var h = 0; h < g.length; h++) c[g[h]] = e
			}
			J.vars.discoveredBrushes = c
		}
		return d = J.brushes[c[a]], d == null && b != 0 && r(J.config.strings.noBrush + a), d
	}
	function r(a) {
		window.alert(J.config.strings.alert + a)
	}
	function s(a, b, c, d) {
		function e(a) {
			a = a || window.event, a.target || (a.target = a.srcElement, a.preventDefault = function () {
				this.returnValue = !1
			}), c.call(d || window, a)
		}
		a.attachEvent ? a.attachEvent("on" + b, e) : a.addEventListener(b, e, !1)
	}
	function t(a, b, c, d, e) {
		var f = (screen.width - c) / 2,
			g = (screen.height - d) / 2;
		e += ", left=" + f + ", top=" + g + ", width=" + c + ", height=" + d, e = e.replace(/^,/, "");
		var h = window.open(a, b, e);
		return h.focus(), h
	}
	function u(a) {
		var b = {
			"true": !0,
			"false": !1
		}[a];
		return b == null ? a : b
	}
	function v(a, b) {
		var c = {}, d;
		for (d in a) c[d] = a[d];
		for (d in b) c[d] = b[d];
		return c
	}
	function w(a) {
		return (a || "") + Math.round(Math.random() * 1e6).toString()
	}
	function x(a, b, c) {
		c = Math.max(c || 0, 0);
		for (var d = c; d < a.length; d++) if (a[d] == b) return d;
		return -1
	}
	function y(a, b) {
		return z(a, b, !0)
	}
	function z(a, b, c) {
		if (a == null) return null;
		var d = c != 1 ? a.childNodes : [a.parentNode],
			e = {
				"#": "id",
				".": "className"
			}[b.substr(0, 1)] || "nodeName",
			f, g;
		f = e != "nodeName" ? b.substr(1) : b.toUpperCase();
		if ((a[e] || "").indexOf(f) != -1) return a;
		for (var h = 0; d && h < d.length && g == null; h++) g = z(d[h], b, c);
		return g
	}
	function A(a) {
		J.vars.highlighters[D(a.id)] = a
	}
	function B(a) {
		return document.getElementById(D(a))
	}
	function C(a) {
		return J.vars.highlighters[D(a)]
	}
	function D(a) {
		var b = "highlighter_";
		return a.indexOf(b) == 0 ? a : b + a
	}
	function E(a) {
		return a.split("\n")
	}
	function F(a) {
		var b = [];
		for (var c = 0; c < a.length; c++) b.push(a[c]);
		return b
	}
	function G(a, b) {
		a.className = a.className.replace(b, "")
	}
	function H(a, b) {
		I(a, b) || (a.className += " " + b)
	}
	function I(a, b) {
		return a.className.indexOf(b) != -1
	}
	typeof require != "undefined" && typeof XRegExp == "undefined" && (XRegExp = require("XRegExp").XRegExp);
	var J = {
		defaults: {
			"class-name": "",
			"first-line": 1,
			"pad-line-numbers": !1,
			highlight: null,
			title: null,
			"smart-tabs": !0,
			"tab-size": 4,
			gutter: !0,
			toolbar: !0,
			"quick-code": !0,
			collapse: !1,
			"auto-links": !0,
			light: !1,
			"html-script": !1
		},
		config: {
			space: " ",
			useScriptTags: !0,
			bloggerMode: !1,
			stripBrs: !1,
			tagName: "pre",
			strings: {
				expandSource: "expand source",
				help: "?",
				jsbin: "Run in JS Bin",
				alert: "SyntaxHighlighter\n\n",
				noBrush: "Can't find brush for: ",
				brushNotHtmlScript: "Brush wasn't configured for html-script option: ",
				aboutDialog: '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml"><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8" /><title>About SyntaxHighlighter</title></head><body style="font-family:Geneva,Arial,Helvetica,sans-serif;background-color:#fff;color:#000;font-size:1em;text-align:center;"><div style="text-align:center;margin-top:1.5em;"><div style="font-size:xx-large;">SyntaxHighlighter</div><div style="font-size:.75em;margin-bottom:3em;"><div>version 3.0.83 (July 02 2010)</div><div><a href="http://alexgorbatchev.com/SyntaxHighlighter" target="_blank" style="color:#005896">http://alexgorbatchev.com/SyntaxHighlighter</a></div><div>JavaScript code syntax highlighter.</div><div>Copyright 2004-2010 Alex Gorbatchev.</div></div><div>If you like this script, please <a href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=2930402" style="color:#005896">donate</a> to <br/>keep development active!</div></div></body></html>'
			}
		},
		vars: {
			discoveredBrushes: null,
			highlighters: {}
		},
		brushes: {},
		regexLib: {
			multiLineCComments: /\/\*[\s\S]*?\*\//gm,
			singleLineCComments: /\/\/.*$/gm,
			singleLinePerlComments: /#.*$/gm,
			doubleQuotedString: /"([^\\"\n]|\\.)*"/g,
			singleQuotedString: /'([^\\'\n]|\\.)*'/g,
			multiLineDoubleQuotedString: new XRegExp('"([^\\\\"]|\\\\.)*"', "gs"),
			multiLineSingleQuotedString: new XRegExp("'([^\\\\']|\\\\.)*'", "gs"),
			xmlComments: /(<|<)!--[\s\S]*?--(>|>)/gm,
			url: /\w+:\/\/[\w-.\/?%&=:@;]*/g,
			phpScriptTags: {
				left: /(<|<)\?=?/g,
				right: /\?(>|>)/g
			},
			aspScriptTags: {
				left: /(<|<)%=?/g,
				right: /%(>|>)/g
			},
			scriptScriptTags: {
				left: /(<|<)\s*script.*?(>|>)/gi,
				right: /(<|<)\/\s*script\s*(>|>)/gi
			}
		},
		toolbar: {
			getHtml: function (a) {
				function b(a, b) {
					return J.toolbar.getButtonHtml(a, b, J.config.strings[b])
				}
				var c = '<div class="toolbar">',
					d = J.toolbar.items,
					e = d.list;
				for (var f = 0; f < e.length; f++) c += (d[e[f]].getHtml || b)(a, e[f]);
				return c += "</div>", c
			},
			getButtonHtml: function (a, b, c) {
				return '<span><a href="#" class="toolbar_item command_' + b + " " + b + '">' + c + "</a></span>"
			},
			handler: function (a) {
				function b(a) {
					var b = new RegExp(a + "_(\\w+)"),
						c = b.exec(d);
					return c ? c[1] : null
				}
				var c = a.target,
					d = c.className || "",
					e = C(y(c, ".Event_syntaxhighlighter").id),
					f = b("command");
				e && f && J.toolbar.items[f].execute(e), a.preventDefault()
			},
			items: {
				list: ["expandSource", "help"],
				expandSource: {
					getHtml: function (a) {
						if (a.getParam("collapse") != 1) return "";
						var b = a.getParam("title");
						return J.toolbar.getButtonHtml(a, "expandSource", b ? b : J.config.strings.expandSource)
					},
					execute: function (a) {
						var b = B(a.id);
						G(b, "collapsed")
					}
				},
				help: {
					execute: function (a) {
						var b = t("", "_blank", 500, 250, "scrollbars=0"),
							c = b.document;
						c.write(J.config.strings.aboutDialog), c.close(), b.focus()
					}
				},
				jsbin: {
					execute: function (a) {
						var b = document.createElement("form");
						b.method = "POST", b.action = "http://live.datatables.net", b.style.display = "none";
						var c = document.createElement("textarea");
						c.name = "js", c.value = a.code, b.appendChild(c), document.body.appendChild(b), b.submit()
					}
				}
			}
		},
		findElements: function (a, b) {
			var d = b ? [b] : F(document.getElementsByTagName(J.config.tagName)),
				e = J.config,
				f = [];
			e.useScriptTags && (d = d.concat(c()));
			if (d.length === 0) return f;
			for (var g = 0; g < d.length; g++) {
				var h = {
					target: d[g],
					params: v(a, n(d[g].className))
				};
				if (h.params["brush"] == null) continue;
				f.push(h)
			}
			return f
		},
		highlight: function (a, c) {
			var d = this.findElements(a, c),
				e = "innerHTML",
				f = null,
				g = J.config;
			if (d.length === 0) return;
			for (var h = 0; h < d.length; h++) {
				var c = d[h],
					i = c.target,
					j = c.params,
					k = j.brush,
					l;
				if (k == null) continue;
				if (j["html-script"] == "true" || J.defaults["html-script"] == 1) f = new J.HtmlScript(k), k = "htmlscript";
				else {
					var m = q(k);
					if (m) f = new m;
					else continue
				}
				l = i[e], g.useScriptTags && (l = b(l)), (i.title || "") != "" && (j.title = i.title), j.brush = k, f.init(j), c = f.getDiv(l), (i.id || "") != "" && (c.id = i.id), i.parentNode.replaceChild(c, i)
			}
		},
		all: function (a) {
			s(window, "load", function () {
				J.highlight(a)
			})
		}
	};
	return J.all = J.all, J.highlight = J.highlight, J.Match = function (a, b, c) {
		this.value = a, this.index = b, this.length = a.length, this.css = c, this.brushName = null
	}, J.Match.prototype.toString = function () {
		return this.value
	}, J.HtmlScript = function (a) {
		function b(a, b) {
			var g = a.code,
				h = [],
				i = f.regexList,
				j = a.index + a.left.length,
				k = f.htmlScript,
				l;
			for (var m = 0; m < i.length; m++) l = e(g, i[m]), c(l, j), h = h.concat(l);
			k.left != null && a.left != null && (l = e(a.left, k.left), c(l, a.index), h = h.concat(l)), k.right != null && a.right != null && (l = e(a.right, k.right), c(l, a.index + a[0].lastIndexOf(a.right)), h = h.concat(l));
			for (var n = 0; n < h.length; n++) h[n].brushName = d.brushName;
			return h
		}
		function c(a, b) {
			for (var c = 0; c < a.length; c++) a[c].index += b
		}
		var d = q(a),
			f, g = new J.brushes.Xml,
			h = null,
			i = this,
			j = "getDiv getHtml init".split(" ");
		if (d == null) return;
		f = new d;
		for (var k = 0; k < j.length; k++)(function () {
				var a = j[k];
				i[a] = function () {
					return g[a].apply(g, arguments)
				}
			})();
		if (f.htmlScript == null) {
			r(J.config.strings.brushNotHtmlScript + a);
			return
		}
		g.regexList.push({
			regex: f.htmlScript.code,
			func: b
		})
	}, J.Highlighter = function () {}, J.Highlighter.prototype = {
		getParam: function (a, b) {
			var c = this.params[a];
			return u(c == null ? b : c)
		},
		create: function (a) {
			return document.createElement(a)
		},
		findMatches: function (a, b) {
			var c = [];
			if (a != null) for (var d = 0; d < a.length; d++) typeof a[d] == "object" && (c = c.concat(e(b, a[d])));
			return this.removeNestedMatches(c.sort(f))
		},
		removeNestedMatches: function (a) {
			for (var b = 0; b < a.length; b++) {
				if (a[b] === null) continue;
				var c = a[b],
					d = c.index + c.length;
				for (var e = b + 1; e < a.length && a[b] !== null; e++) {
					var f = a[e];
					if (f === null) continue;
					if (f.index > d) break;
					f.index == c.index && f.length > c.length ? a[b] = null : f.index >= c.index && f.index < d && (a[e] = null)
				}
			}
			return a
		},
		figureOutLineNumbers: function (a) {
			var b = [],
				c = parseInt(this.getParam("first-line"));
			return p(a, function (a, d) {
				b.push(d + c)
			}), b
		},
		isLineHighlighted: function (a) {
			var b = this.getParam("highlight", []);
			return typeof b != "object" && b.push == null && (b = [b]), x(b, a.toString()) != -1
		},
		getLineHtml: function (a, b, c) {
			var d = ["line", "number" + b, "index" + a, "alt" + (b % 2 == 0 ? 1 : 2).toString()];
			return this.isLineHighlighted(b) && d.push("highlighted"), b == 0 && d.push("break"), '<div class="' + d.join(" ") + '">' + c + "</div>"
		},
		getLineNumbersHtml: function (a, b) {
			var c = "",
				d = E(a).length,
				e = parseInt(this.getParam("first-line")),
				f = this.getParam("pad-line-numbers");
			f == 1 ? f = (e + d - 1).toString().length : isNaN(f) == 1 && (f = 0);
			for (var g = 0; g < d; g++) {
				var h = b ? b[g] : e + g,
					a = h == 0 ? J.config.space : l(h, f);
				c += this.getLineHtml(g, h, a)
			}
			return c
		},
		getCodeLinesHtml: function (a, b) {
			a = h(a);
			var c = E(a),
				d = this.getParam("pad-line-numbers"),
				e = parseInt(this.getParam("first-line")),
				a = "",
				f = this.getParam("brush");
			for (var g = 0; g < c.length; g++) {
				var i = c[g],
					j = /^( |\s)+/.exec(i),
					k = null,
					l = b ? b[g] : e + g;
				j != null && (k = j[0].toString(), i = i.substr(k.length), k = k.replace(" ", J.config.space)), i = h(i), i.length == 0 && (i = J.config.space), a += this.getLineHtml(g, l, (k != null ? '<code class="' + f + ' spaces">' + k + "</code>" : "") + i)
			}
			return a
		},
		getTitleHtml: function (a) {
			return a ? "<caption>" + a + "</caption>" : ""
		},
		getMatchesHtml: function (a, b) {
			function c(a) {
				var b = a ? a.brushName || f : f;
				return b ? b + " " : ""
			}
			var d = 0,
				e = "",
				f = this.getParam("brush", "");
			for (var g = 0; g < b.length; g++) {
				var h = b[g],
					i;
				if (h === null || h.length === 0) continue;
				i = c(h), e += m(a.substr(d, h.index - d), i + "plain") + m(h.value, i + h.css), d = h.index + h.length + (h.offset || 0)
			}
			return e += m(a.substr(d), c() + "plain"), e
		},
		getHtml: function (a) {
			var b = "",
				c = ["Event_syntaxhighlighter"],
				e, f, h;
			return this.getParam("light") == 1 && (this.params.toolbar = this.params.gutter = !1), className = "Event_syntaxhighlighter", this.getParam("collapse") == 1 && c.push("collapsed"), (gutter = this.getParam("gutter")) == 0 && c.push("nogutter"), c.push(this.getParam("class-name")), c.push(this.getParam("brush")), a = o(a).replace(/\r/g, " "), e = this.getParam("tab-size"), a = this.getParam("smart-tabs") == 1 ? j(a, e) : k(a, e), a = g(a), gutter && (h = this.figureOutLineNumbers(a)), f = this.findMatches(this.regexList, a), b = this.getMatchesHtml(a, f), b = this.getCodeLinesHtml(b, h), this.getParam("auto-links") && (b = d(b)), typeof navigator != "undefined" && navigator.userAgent && navigator.userAgent.match(/MSIE/) && c.push("ie"), b = '<div id="' + D(this.id) + '" class="' + c.join(" ") + '">' + (this.getParam("toolbar") ? J.toolbar.getHtml(this) : "") + '<table border="0" cellpadding="0" cellspacing="0">' + this.getTitleHtml(this.getParam("title")) + "<tbody>" + "<tr>" + (gutter ? '<td class="gutter">' + this.getLineNumbersHtml(a) + "</td>" : "") + '<td class="code">' + '<div class="container">' + b + "</div>" + "</td>" + "</tr>" + "</tbody>" + "</table>" + "</div>", b
		},
		getDiv: function (b) {
			b === null && (b = ""), this.code = b;
			var c = this.create("div");
			return c.innerHTML = this.getHtml(b), this.getParam("toolbar") && s(z(c, ".toolbar"), "click", J.toolbar.handler), this.getParam("quick-code") && s(z(c, ".code"), "dblclick", a), c
		},
		init: function (a) {
			this.id = w(), A(this), this.params = v(J.defaults, a || {}), this.getParam("light") == 1 && (this.params.toolbar = this.params.gutter = !1)
		},
		getKeywords: function (a) {
			return a = a.replace(/^\s+|\s+$/g, "").replace(/\s+/g, "|"), "\\b(?:" + a + ")\\b"
		},
		forHtmlScript: function (a) {
			this.htmlScript = {
				left: {
					regex: a.left,
					css: "script"
				},
				right: {
					regex: a.right,
					css: "script"
				},
				code: new XRegExp("(?<left>" + a.left.source + ")" + "(?<code>.*?)" + "(?<right>" + a.right.source + ")", "sgi")
			}
		}
	}, J
}();
typeof exports != "undefined" ? exports.VisualEventSyntaxHighlighter = VisualEventSyntaxHighlighter : null,
function () {
	function a() {
		var a = "break case catch continue default delete do else false  for function if in instanceof new null return super switch this throw true try typeof var while with",
			b = VisualEventSyntaxHighlighter.regexLib;
		this.regexList = [{
				regex: b.multiLineDoubleQuotedString,
				css: "string"
			}, {
				regex: b.multiLineSingleQuotedString,
				css: "string"
			}, {
				regex: b.singleLineCComments,
				css: "comments"
			}, {
				regex: b.multiLineCComments,
				css: "comments"
			}, {
				regex: /\s*#.*/gm,
				css: "preprocessor"
			}, {
				regex: new RegExp(this.getKeywords(a), "gm"),
				css: "keyword"
			}
		], this.forHtmlScript(b.scriptScriptTags)
	}
	a.prototype = new VisualEventSyntaxHighlighter.Highlighter, a.aliases = ["js", "jscript", "javascript"], VisualEventSyntaxHighlighter.brushes.JScript = a
}(),
function (a, b, c) {
	a.VisualEvent = function () {
		if (!this instanceof VisualEvent) {
			alert("VisualEvent warning: Must be initialised with the 'new' keyword.");
			return
		}
		VisualEvent.instance !== null && VisualEvent.instance.close(), VisualEvent.instance = this, this.s = {
			elements: null,
			mouseTimer: null,
			nonDomEvents: 0,
			scripts: []
		}, this.dom = {
			label: c('<div id="Event_Label"><span class="Event_LabelClose">x</span><span class="Event_LabelHelp">?</span>Visual Event <span class="Event_LabelBy">by <a href="http://sprymedia.co.uk/">Allan Jardine</a>.</span><span class="Event_LabelEvents"></span> events were found attached to <span class="Event_LabelNodes"></span> nodes. <span class="Event_LabelNonDom"></span> events were attached to elements not currently in the document.</div>')[0],
			display: c('<div id="Event_Display"></div>')[0],
			lightbox: c('<div id="Event_Lightbox"><div class="Event_NodeName">Node: <i></i><div class="Event_NodeRemove">Remove from display</div></div><div><div class="Event_Nav"><ul></ul></div></div><div class="Event_Code"></div></div>')[0],
			help: c('<div id="Event_Help"><div class="Event_HelpInner"><h1>Visual Event help</h1><p>Visual Event will show which elements on any given page have Javascript events attached to them, what those events are and the code associated with the events. In Webkit browsers and Opera, Visual Event will also indicate where the code in question was defined.</p><p>Note that Visual Event is only able to show events for Javascript libraries for which it has a parser. This is currently: DOM0 events, Glow, jQuery, MooTools, Prototype and YUI2.</p><p>Commands:</p><table cellpadding="0" cellspacing="0" border="0"><tr><td>Double click element with event</td><td>Hide event indicator. Allows access to nodes underneath</td></tr><tr><td>Key: space</td><td>Restore all events to be visible</td></tr><tr><td>Key: esc</td><td>Quit out of Visual Event</td></tr><tr><td>Key: h</td><td>Show / hide this help box</td></tr><tr><td>Key: r</td><td>Reload and display events on page</td></tr></table><p>The colour of the elements that have been detected to have an event reflect the type of events that are attached to the element:</p><table cellpadding="0" cellspacing="0" border="0" class="Event_LabelColorInfo"><tr><td width="15%"><div class="EventLabel Event_LabelColour Event_bg_blue"></div></td><td width="14%"><div class="EventLabel Event_LabelColour Event_bg_red"></div></td><td width="14%"><div class="EventLabel Event_LabelColour Event_bg_yellow"></div></td><td width="14%"><div class="EventLabel Event_LabelColour Event_bg_green"></div></td><td width="14%"><div class="EventLabel Event_LabelColour Event_bg_purple"></div></td><td width="14%"><div class="EventLabel Event_LabelColour Event_bg_orange"></div></td><td width="15%"><div class="EventLabel Event_LabelColour Event_bg_black"></div></td></tr><tr><td>Mouse event</td><td>UI event</td><td>HTML event</td><td>Mouse + HTML</td><td>Mouse + UI</td><td>HTML + UI</td><td>Mouse + HTML + UI</td></tr></table><p>Visual Event is open source software (GPLv2). If you would like to contribute an enhancement, please fork the project on <a href="https://github.com/SpryMedia/VisualEvent">Github</a>!</p><p class="Event_HelpClose">Click anywhere to close this help box.</p></div></div>')[0],
			activeEventNode: null
		}, this._construct()
	}, VisualEvent.prototype = {
		close: function (a) {
			c("*").unbind(".VisualEvent"), c(b).unbind("keydown.VisualEvent"), c(this.dom.display).remove(), c(this.dom.lightbox).remove(), c(this.dom.label).remove(), c(this.dom.help).remove(), typeof VisualEvent_Loader != "undefined" && !VisualEvent_Loader.jQueryPreLoaded && c.noConflict(), VisualEvent.instance = null
		},
		reInit: function () {
			c("*").unbind(".VisualEvent"), c(b).unbind("keydown.VisualEvent"), c(this.dom.display).empty(), c(this.dom.display).remove(), c(this.dom.lightbox).remove(), c(this.dom.label).remove(), c(this.dom.help).remove(), this.s.elements.splice(0, this.s.elements.length), this.s.nonDomEvents = 0, this._construct()
		},
		_construct: function () {
			var a = this,
				d, e, f = c(b).height(),
				g = c(b).width();
			this.dom.display.style.width = g + "px", this.dom.display.style.height = f + "px", b.body.appendChild(this.dom.display), b.body.appendChild(this.dom.lightbox), b.body.appendChild(this.dom.label), c(this.dom.lightbox).bind("mouseover.VisualEvent", function (b) {
				a._timerClear(b)
			}).bind("mousemove.VisualEvent", function (b) {
				a._timerClear(b)
			}).bind("mouseout.VisualEvent", function (b) {
				a._lightboxHide()
			}), c("div.Event_NodeRemove", this.dom.lightbox).bind("click.VisualEvent", function (b) {
				a.dom.activeEventNode.style.display = "none", a.dom.lightbox.style.display = "none"
			}), c(b).bind("keydown.VisualEvent", function (b) {
				(b.which === 0 || b.which === 27) && a.close(), b.which === 72 ? c(a.dom.help).filter(":visible").length === 0 ? a._help() : a._hideHelp() : b.which === 32 ? (c("div.EventLabel").css("display", "block"), b.preventDefault()) : b.which === 82 && a.reInit()
			}), this.s.elements = this._eventsLoad();
			for (d = 0, e = this.s.elements.length; d < e; d++) this._eventElement(this.s.elements[d]);
			this._renderLabel(), this._scriptsLoad()
		},
		_help: function () {
			b.body.appendChild(this.dom.help)
		},
		_hideHelp: function () {
			b.body.removeChild(this.dom.help)
		},
		_scriptsLoad: function () {
			if (this.s.scripts.length > 0) return;
			var a = [],
				c = b.getElementsByTagName("script");
			for (var d = 0, e = c.length; d < e; d++) c[d].src && c[d].src !== "" ? c[d].src.indexOf("VisualEvent") === -1 && a.push(c[d].src) : this.s.scripts.push({
					src: "Inline script",
					code: c[d].text
				});
			this._scriptLoadQueue(a)
		},
		_scriptLoadQueue: function (a) {
			if (a.length === 0) return;
			var b = this,
				d = a.shift();
			c.ajax({
				dataType: "text",
				type: "GET",
				url: d,
				success: function (c) {
					b.s.scripts.push({
						src: d,
						code: c
					}), b._scriptLoadQueue(a)
				},
				error: function () {
					b._scriptLoadQueue(a)
				}
			})
		},
		_scriptSource: function (a) {
			var b = "",
				d = [],
				e, f, g;
			a = c.trim(a.replace(/^(function.*?\))/, ""));
			for (e = 0, f = this.s.scripts.length; e < f; e++) this.s.scripts[e].code.indexOf(a) !== -1 && (g = this.s.scripts[e].code.split(a), d.push({
					src: this.s.scripts[e].src,
					line: g[0].split("\n").length
				}));
			if (d.length === 0) b = "Function definition could not be found automatically<br/>";
			else if (d.length === 1) b = "Function defined on line " + d[0].line + ' in <a href="' + d[0].src + '">' + this._scriptName(d[0].src) + "</a><br/>";
			else {
				b = "Function could originate in multiple locations:<br/>";
				for (e = 0, f = d.length; e < f; e++) b += e + 1 + ". line " + d[0].line + ' in <a href="' + d[0].src + '">' + this._scriptName(d[0].src) + "</a><br/>"
			}
			return b
		},
		_scriptName: function (a) {
			var b = a.split("/");
			return b[b.length - 1]
		},
		_eventsLoad: function () {
			var a, b, c = [],
				d;
			for (a = 0, b = VisualEvent.parsers.length; a < b; a++) try {
					d = VisualEvent.parsers[a](), c = c.concat(d)
			} catch (e) {}
			return typeof VisualEvents == "object" && this._ceckIntegrity(VisualEvents) && (c = this._combineEvents(c, VisualEvents)), this._merge(c)
		},
		_eventElement: function (a) {
			var d = this,
				e, f, g, h;
			if (c(a.node).filter(":visible").length === 0) {
				this.s.nonDomEvents += 1;
				return
			}
			g = c(a.node).offset(), h = b.createElement("div"), h.style.position = "absolute", h.style.top = g.top + "px", h.style.left = g.left + "px", h.className = "EventLabel Event_bg_" + this._getColorFromTypes(a.listeners), a.node != b.body && a.node != b.documentElement && (h.style.width = a.node.offsetWidth - 4 + "px", h.style.height = a.node.offsetHeight - 4 + "px"), c(h).bind("dblclick.VisualEvent", function (a) {
				return this.style.display = "none", !1
			}).bind("mouseover.VisualEvent", function (b) {
				d.dom.activeEventNode = this, d._lightboxList(b, a.node, a.listeners)
			}).bind("mouseout.VisualEvent", function (a) {
				d._lightboxHide()
			}), this.dom.display.appendChild(h)
		},
		_lightboxList: function (a, b, d) {
			var e = this,
				f, g, h;
			this._timerClear(), c("i", this.dom.lightbox).html(this._renderNodeInfo(b)), c("div.Event_Code", this.dom.lightbox).empty(), h = c("ul", this.dom.lightbox).empty();
			for (f = 0, g = d.length; f < g; f++) h.append(c("<li>" + d[f].type + "</li>").bind("mouseover.VisualEvent", this._lightboxCode(a, b, d[f])));
			c("li:eq(0)", this.dom.lightbox).mouseover(), this._lightboxPosition(this.dom.lightbox, b)
		},
		_lightboxCode: function (a, b, d) {
			var e = this;
			return function () {
				c("li", this.parentNode).removeClass("Event_EventSelected"), c(this).addClass("Event_EventSelected");
				var f = e._createEvent(a, d.type, a.target);
				e._renderCode(a, d.func, d.source, d.type, f === null ? null : function () {
					b.dispatchEvent(f), setTimeout(function () {
						e.reInit.call(e)
					}, 200)
				})
			}
		},
		_lightboxPosition: function (d, e) {
			var f = c(e).offset(),
				g = f.top + 15,
				h = f.left,
				i = c(a).width() - 25,
				j = c(b).height(),
				k = c(d).width(),
				l = c(d).height();
			h + k > i && (h -= h + k - i), g + l > j && (l -= g + l - j), g < 0 && (g = 0), h < 0 && (h = 0), d.style.top = g + "px", d.style.left = h + "px", d.style.display = "block"
		},
		_lightboxHide: function () {
			var a = this;
			this.s.mouseTimer = setTimeout(function () {
				a.dom.lightbox.style.display = "none"
			}, 200)
		},
		_renderCode: function (a, d, e, f, g) {
			var h = this,
				i = a.target,
				j, k;
			this._timerClear(a), g === null ? c("div.Event_Code", this.dom.lightbox).html('<div id="Event_inner"><p><i>' + f + "</i> event subscribed by " + e + "<br/>" + this._scriptSource(d) + '</p><pre id="Event_code" class="brush: js"></pre></div>') : (c("div.Event_Code", this.dom.lightbox).html('<div id="Event_inner"><p><i>' + f + "</i> event subscribed by " + e + " (" + '<span id="Event_Trigger">trigger event</span>)<br/>' + this._scriptSource(d) + '</p><pre id="Event_code" class="brush: js"></pre></div>'), c("#Event_Trigger").bind("click.VisualEvent", g));
			var l = d.split("\n");
			if (l.length > 1) {
				var m = l[l.length - 1].match(/^(\s*)/g);
				l[0] = m + l[0], d = l.join("\n")
			}
			c("pre", this.dom.lightbox).html(d.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")), VisualEventSyntaxHighlighter.highlight(null, b.getElementById("Event_code"))
		},
		_renderNodeInfo: function (a) {
			var b = a.nodeName.toLowerCase(),
				c = a.getAttribute("id");
			c && c !== "" && (b += "#" + c);
			var d = a.className;
			return d !== "" && (b += "." + d), b
		},
		_renderLabel: function () {
			var a = this,
				b = 0,
				d, e;
			for (d = 0, e = this.s.elements.length; d < e; d++) b += this.s.elements[d].listeners.length;
			c("span.Event_LabelEvents", this.dom.label).html(b), c("span.Event_LabelNodes", this.dom.label).html(this.s.elements.length), c("span.Event_LabelNonDom", this.dom.label).html(this.s.nonDomEvents), c("span.Event_LabelClose", this.dom.label).bind("click.VisualEvent", function () {
				a.close()
			}), c("span.Event_LabelHelp", this.dom.label).bind("click.VisualEvent", function () {
				a._help()
			}), c(this.dom.help).bind("click.VisualEvent", function () {
				a._hideHelp()
			})
		},
		_createEvent: function (d, e, f) {
			var g = null,
				h = c(f).offset(),
				i = this._eventTypeGroup(e);
			if (b.createEvent) switch (i) {
				case "mouse":
					g = b.createEvent("MouseEvents"), g.initMouseEvent(e, !0, !0, a, 0, h.left, h.top, h.left, h.top, d.ctrlKey, d.altKey, d.shiftKey, d.metaKey, d.button, null);
					break;
				case "html":
					g = b.createEvent("HTMLEvents"), g.initEvent(e, !0, !0);
					break;
				case "ui":
					g = b.createEvent("UIEvents"), g.initUIEvent(e, !0, !0, a, 0);
					break;
				default:
			} else if (b.createEventObject) switch (i) {
				case "mouse":
					g = b.createEventObject(), g.screenX = h.left, g.screenX = h.top, g.clientX = h.left, g.clientY = h.top, g.ctrlKey = d.ctrlKey, g.altKey = d.altKey, g.metaKey = d.metaKey, g.button = d.button, g.relatedTarget = null;
					break;
				case "html":
				case "ui":
					g = b.createEventObject();
					break;
				default:
			}
			return g
		},
		_timerClear: function (a) {
			this.s.mouseTimer !== null && (clearTimeout(this.s.mouseTimer), this.s.mouseTimer = null)
		},
		_merge: function (a) {
			var b = [],
				c, d, e, f, g;
			for (d = 0, e = a.length; d < e; d++) {
				c = !1;
				for (f = 0, g = b.length; f < g; f++) if (b[f].node == a[d].node) {
						b[f].listeners = b[f].listeners.concat(a[d].listeners), c = !0;
						break
					}
				c || b.push(a[d])
			}
			return b
		},
		_combineEvents: function (a, b) {
			var c, d, e, f;
			for (c = 0; c < b.length; c++) if (typeof b[c].listeners != "undefined") a.push(b[c]);
				else {
					e = -1;
					for (d = 0; d < a.length; d++) if (a[d].node == b[c].node) {
							e = d;
							break
						}
					if (e == -1) a.push({
							node: b[c].node,
							source: b[c].source,
							listeners: [{
									type: b[c].type,
									func: b[c].func,
									removed: b[c].removed
								}
							]
						});
					else {
						f = -1;
						for (d = 0; d < a[e].listeners.length; d++) if (a[e].listeners[d].type == b[c].type && a[e].listeners[d].func == b[c].func) {
								a[e].listeners[d].removed = b[c].removed, f = d;
								break
							}
						f != -1 && a[e].listeners.push({
							type: b[c].type,
							func: b[c].func,
							removed: b[c].removed
						})
					}
				}
			return a
		},
		_eventTypeGroup: function (a) {
			switch (a) {
			case "click":
			case "dblclick":
			case "mousedown":
			case "mousemove":
			case "mouseout":
			case "mouseover":
			case "mouseup":
			case "scroll":
				return "mouse";
			case "change":
			case "focus":
			case "blur":
			case "select":
			case "submit":
				return "html";
			case "keydown":
			case "keypress":
			case "keyup":
			case "load":
			case "unload":
				return "ui";
			default:
				return "custom"
			}
		},
		_getColorFromTypes: function (a) {
			var b = !1,
				c = !1,
				d = !1,
				e, f;
			for (f = 0; f < a.length; f++) {
				e = this._eventTypeGroup(a[f].type);
				switch (e) {
				case "mouse":
					b = !0;
					break;
				case "html":
					c = !0;
					break;
				case "ui":
					d = !0;
					break;
				default:
					d = !0
				}
			}
			if (b && c && d) return "black";
			if (!b && c && d) return "orange";
			if (b && !c && d) return "purple";
			if (b && c && !d) return "green";
			if (b) return "blue";
			if (c) return "yellow";
			if (d) return "red"
		}
	}, VisualEvent.parsers = [], VisualEvent.instance = null, VisualEvent.close = function () {
		VisualEvent.instance.close(), VisualEvent.instance = null
	}
}(window, document, jQuery),
function (a, b, c, d) {
	d.parsers.push(function () {
		var a = [],
			c, d = b.getElementsByTagName("*"),
			e = ["click", "dblclick", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "change", "focus", "blur", "scroll", "select", "submit", "keydown", "keypress", "keyup", "load", "unload"],
			f, g, h, i = e.length;
		for (f = 0, g = d.length; f < g; f++) for (h = 0; h < i; h++) typeof d[f]["on" + e[h]] == "function" && a.push({
					node: d[f],
					listeners: [{
							type: e[h],
							func: d[f]["on" + e[h]].toString(),
							removed: !1,
							source: "DOM 0 event"
						}
					]
				});
		return a
	})
}(window, document, jQuery, VisualEvent),
function (a, b, c, d) {
	d.parsers.push(function () {
		if (typeof Ext == "undefined" || Ext.versions.core.version.indexOf("4.0") !== 0) return [];
		var a = [];
		for (var b in Ext.cache) {
			var d = Ext.cache[b];
			if (typeof d.events == "object") {
				var e = d.events;
				if (!c.isEmptyObject(e)) {
					var f = [];
					for (var g in e) if (e[g].length > 0) for (var h = 0; h < e[g].length; ++h) f.push({
									type: g,
									func: e[g][h].fn.toString(),
									removed: !1,
									source: "ExtJS " + Ext.versions.core.version
								});
					f.length > 0 && a.push({
						node: d.el.dom,
						listeners: f
					})
				}
			}
		}
		return a
	})
}(window, document, jQuery, VisualEvent),
function (a, b, c, d) {
	d.parsers.push(function () {
		if (typeof glow == "undefined" || typeof glow.events.listenersByObjId == "undefined") return [];
		var a = glow.events.listenersByObjId,
			c = "__eventId" + glow.UID,
			d = [],
			e = b.getElementsByTagName("*"),
			f, g, h, i, j, k, l;
		for (f = 0, g = e.length; f < g; f++) if (typeof e[f][c] != "undefined") {
				j = e[f][c], d.push({
					node: e[f],
					listeners: []
				});
				for (k in a[j]) {
					l = a[j][k];
					for (h = 0, i = l.length; h < i; h++) d[d.length - 1].listeners.push({
							type: k,
							func: l[h][2].toString(),
							removed: !1,
							source: "Glow"
						})
				}
			}
		return d
	})
}(window, document, jQuery, VisualEvent),
function (a, b, c, d) {
	function e(a, b) {
		for (i in b) if (typeof b[i].events == "object") {
				var d = b[i].handle.elem,
					e;
				for (type in b[i].events) {
					if (type == "live") continue;
					var f = b[i].events[type];
					for (j in f) {
						var g = [],
							h = "jQuery " + jQuery.fn.jquery;
						typeof f[j].selector != "undefined" && f[j].selector !== null ? (g = c(f[j].selector, b[i].handle.elem), h += " (live event)") : g.push(d);
						for (var k = 0, l = g.length; k < l; k++) a.push({
								node: g[k],
								listeners: []
							}), typeof f[j].origHandler != "undefined" ? e = f[j].origHandler.toString() : typeof f[j].handler != "undefined" ? e = f[j].handler.toString() : e = f[j].toString(), f[j] && f[j].namespace != "VisualEvent" && e != "0" && a[a.length - 1].listeners.push({
								type: type,
								func: e,
								removed: !1,
								source: h
							});
						a[a.length - 1].listeners.length === 0 && a.splice(a.length - 1, 1)
					}
				}
			}
	}
	d.parsers.push(function () {
		var a = jQuery.fn.jquery.substr(0, 3) * 1;
		if (!jQuery || a < 1.5 || a >= 1.7) return [];
		var b = [];
		for (j in jQuery.cache) e(b, jQuery.cache[j]);
		return b
	}), d.parsers.push(function () {
		var a = jQuery.fn.jquery.substr(0, 3) * 1;
		if (!jQuery || a < 1.4) return [];
		var b = [];
		return e(b, jQuery.cache), b
	})
}(window, document, jQuery, VisualEvent),
function (a, b, c, d) {
	d.parsers.push(function () {
		if (!jQuery || jQuery.fn.jquery.substr(0, 3) * 1 > 1.3) return [];
		var a = [],
			b = jQuery.cache;
		for (i in b) if (typeof b[i].events == "object") {
				var c = b[i].handle.elem;
				a.push({
					node: c,
					listeners: []
				});
				for (type in b[i].events) {
					var d = b[i].events[type],
						e;
					for (e in d) break;
					var f = d[e].toString();
					!f.match(/VisualEvent/) && !f.match(/EventLoader/) && a[a.length - 1].listeners.push({
						type: type,
						func: f,
						removed: !1,
						source: "jQuery"
					})
				}
			}
		return a
	}), d.parsers.push(function () {
		if (!jQuery || jQuery.fn.live != "undefined" || typeof jQuery.data == "undefined" || typeof jQuery.data(b, "events") == "undefined" || typeof jQuery.data(b, "events").live == "undefined") return [];
		var a = [],
			d = jQuery.cache;
		return jQuery.each(jQuery.data(b, "events").live || [], function (b, d) {
			var e = d.type.split(".");
			e = e[0];
			var f = d.data;
			c(f).each(function (b) {
				a.push({
					node: this,
					listeners: []
				}), a[a.length - 1].listeners.push({
					type: e,
					func: "Unable to obtain function from live() bound event.",
					removed: !1,
					source: "jQuery 1.3 live"
				})
			})
		}), a
	})
}(window, document, jQuery, VisualEvent),
function (a, b, c, d) {
	d.parsers.push(function () {
		if (typeof jsBase == "undefined") return [];
		var a = [],
			b = jsBase.aEventCache,
			c, d;
		for (c = 0, d = b.length; c < d; c++) a.push({
				node: b[c].nElement,
				listeners: [{
						type: b[c].type,
						func: b[c].fn.toString(),
						removed: !1,
						source: "jsBase"
					}
				]
			});
		return a
	})
}(window, document, jQuery, VisualEvent),
function (a, b, c, d) {
	d.parsers.push(function () {
		if (typeof MooTools == "undefined") return [];
		var a = [],
			d = b.getElementsByTagName("*"),
			e, f, g, h;
		for (e = 0, f = d.length; e < f; e++) {
			g = d[e].retrieve("events", {});
			if (!c.isEmptyObject(g)) {
				a.push({
					node: d[e],
					listeners: []
				});
				for (h in g) a[a.length - 1].listeners.push({
						type: h,
						func: g[h].keys.toString(),
						removed: !1,
						source: "MooTools"
					})
			}
		}
		return a
	})
}(window, document, jQuery, VisualEvent),
function (a, b, c, d) {
	d.parsers.push(function () {
		if (typeof Prototype == "undefined") return [];
		var a = [],
			c = b.getElementsByTagName("*"),
			d, e, f;
		for (d = 0, e = c.length; d < e; d++) if (typeof c[d]._prototypeEventID != "undefined") {
				a.push({
					node: c[d],
					listeners: []
				});
				for (f in Event.cache[c[d]._prototypeEventID]) a[a.length - 1].listeners.push({
						type: f,
						func: Event.cache[c[d]._prototypeEventID][f][0].handler.toString(),
						removed: !1,
						source: "Prototype"
					})
			}
		return a
	})
}(window, document, jQuery, VisualEvent),
function (a, b, c, d) {
	d.parsers.push(function () {
		if (typeof YAHOO == "undefined" || typeof YAHOO.util == "undefined" || typeof YAHOO.util.Event == "undefined") return [];
		var a = b.getElementsByTagName("*"),
			c, d, e, f, g = [],
			h;
		for (c = 0, d = a.length; c < d; c++) {
			h = YAHOO.util.Event.getListeners(a[c]);
			if (h != null && h.length != 0) {
				g.push({
					node: h[0].scope,
					listeners: []
				});
				for (e = 0, f = h.length; e < f; e++) g[g.length - 1].listeners.push({
						type: h[e].type,
						func: h[e].fn.toString(),
						removed: !1,
						source: "YUI 2"
					})
			}
		}
		return g
	})
}(window, document, jQuery, VisualEvent);
