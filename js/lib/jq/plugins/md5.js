(function(){
	md5 = function (s) {
		function g(f, e, c, a, b, d) {
			e = m(m(e, f), m(a, d));
			return m(e << b | e >>> 32 - b, c)
		}
		function h(f, e, c, a, b, d, h) {
			return g(e & c | ~e & a, f, e, b, d, h)
		}
		function k(f, e, c, a, b, d, h) {
			return g(e & a | c & ~a, f, e, b, d, h)
		}
		function l(f, e, c, a, b, d, h) {
			return g(c ^ (e | ~a), f, e, b, d, h)
		}
		function n(f, e) {
			var c = f[0],
				a = f[1],
				b = f[2],
				d = f[3],
				c = h(c, a, b, d, e[0], 7, -680876936),
				d = h(d, c, a, b, e[1], 12, -389564586),
				b = h(b, d, c, a, e[2], 17, 606105819),
				a = h(a, b, d, c, e[3], 22, -1044525330),
				c = h(c, a, b, d, e[4], 7, -176418897),
				d = h(d, c, a, b, e[5], 12, 1200080426),
				b = h(b, d, c, a, e[6], 17, -1473231341),
				a = h(a, b, d, c, e[7], 22, -45705983),
				c = h(c, a, b, d, e[8], 7, 1770035416),
				d = h(d, c, a, b, e[9], 12, -1958414417),
				b = h(b, d, c, a, e[10], 17, -42063),
				a = h(a, b, d, c, e[11], 22, -1990404162),
				c = h(c, a, b, d, e[12], 7, 1804603682),
				d = h(d, c, a, b, e[13], 12, -40341101),
				b = h(b, d, c, a, e[14], 17, -1502002290),
				a = h(a, b, d, c, e[15], 22, 1236535329),
				c = k(c, a, b, d, e[1], 5, -165796510),
				d = k(d, c, a, b, e[6], 9, -1069501632),
				b = k(b, d, c, a, e[11], 14, 643717713),
				a = k(a, b, d, c, e[0], 20, -373897302),
				c = k(c, a, b, d, e[5], 5, -701558691),
				d = k(d, c, a, b, e[10], 9, 38016083),
				b = k(b, d, c, a, e[15], 14, -660478335),
				a = k(a, b, d, c, e[4], 20, -405537848),
				c = k(c, a, b, d, e[9], 5, 568446438),
				d = k(d, c, a, b, e[14], 9, -1019803690),
				b = k(b, d, c, a, e[3], 14, -187363961),
				a = k(a, b, d, c, e[8], 20, 1163531501),
				c = k(c, a, b, d, e[13], 5, -1444681467),
				d = k(d, c, a, b, e[2], 9, -51403784),
				b = k(b, d, c, a, e[7], 14, 1735328473),
				a = k(a, b, d, c, e[12], 20, -1926607734),
				c = g(a ^ b ^ d, c, a, e[5], 4, -378558),
				d = g(c ^ a ^ b, d, c, e[8], 11, -2022574463),
				b = g(d ^ c ^ a, b, d, e[11], 16, 1839030562),
				a = g(b ^ d ^ c, a, b, e[14], 23, -35309556),
				c = g(a ^ b ^ d, c, a, e[1], 4, -1530992060),
				d = g(c ^ a ^ b, d, c, e[4], 11, 1272893353),
				b = g(d ^ c ^ a, b, d, e[7], 16, -155497632),
				a = g(b ^ d ^ c, a, b, e[10], 23, -1094730640),
				c = g(a ^ b ^ d, c, a, e[13], 4, 681279174),
				d = g(c ^ a ^ b, d, c, e[0], 11, -358537222),
				b = g(d ^ c ^ a, b, d, e[3], 16, -722521979),
				a = g(b ^ d ^ c, a, b, e[6], 23, 76029189),
				c = g(a ^ b ^ d, c, a, e[9], 4, -640364487),
				d = g(c ^ a ^ b, d, c, e[12], 11, -421815835),
				b = g(d ^ c ^ a, b, d, e[15], 16, 530742520),
				a = g(b ^ d ^ c, a, b, e[2], 23, -995338651),
				c = l(c, a, b, d, e[0], 6, -198630844),
				d = l(d, c, a, b, e[7], 10, 1126891415),
				b = l(b, d, c, a, e[14], 15, -1416354905),
				a = l(a, b, d, c, e[5], 21, -57434055),
				c = l(c, a, b, d, e[12], 6, 1700485571),
				d = l(d, c, a, b, e[3], 10, -1894986606),
				b = l(b, d, c, a, e[10], 15, -1051523),
				a = l(a, b, d, c, e[1], 21, -2054922799),
				c = l(c, a, b, d, e[8], 6, 1873313359),
				d = l(d, c, a, b, e[15], 10, -30611744),
				b = l(b, d, c, a, e[6], 15, -1560198380),
				a = l(a, b, d, c, e[13], 21, 1309151649),
				c = l(c, a, b, d, e[4], 6, -145523070),
				d = l(d, c, a, b, e[11], 10, -1120210379),
				b = l(b, d, c, a, e[2], 15, 718787259),
				a = l(a, b, d, c, e[9], 21, -343485551);
			f[0] = m(c, f[0]);
			f[1] = m(a, f[1]);
			f[2] = m(b, f[2]);
			f[3] = m(d, f[3])
		}
		function p(f) {
			txt = "";
			var e = f.length,
				c = [1732584193, -271733879, -1732584194, 271733878],
				a;
			for (a = 64; a <= e; a += 64) {
				for (var b = c, d = f.substring(a - 64, a), h = [], g = void 0, g = 0; 64 > g; g += 4) h[g >> 2] = d.charCodeAt(g) + (d.charCodeAt(g + 1) << 8) + (d.charCodeAt(g + 2) << 16) + (d.charCodeAt(g + 3) << 24);
				n(b, h)
			}
			f = f.substring(a - 64);
			b = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
			d = f.length;
			for (a = 0; a < d; a++) b[a >> 2] |= f.charCodeAt(a) << (a % 4 << 3);
			b[a >> 2] |= 128 << (a % 4 << 3);
			if (55 < a) for (n(c, b), a = 16; a--;) b[a] = 0;
			b[14] = 8 * e;
			n(c, b);
			return c
		}
		function q(f) {
			for (var e = f.length, c = 0; c < e; c++) {
				for (var a = f, b = c, d = f[c], g = "", h = 0; 4 > h; h++) g += r[d >> 8 * h + 4 & 15] + r[d >> 8 * h & 15];
				a[b] = g
			}
			return f.join("")
		}
		function m(f, e) {
			return f + e & 4294967295
		}
		var r = "0123456789abcdef".split("");
		"5d41402abc4b2a76b9719d911017c592" != q(p("hello")) && (m = function (f, e) {
			var c = (f & 65535) + (e & 65535);
			return (f >> 16) + (e >> 16) + (c >> 16) << 16 | c & 65535
		});
		return q(p(s))
	}
})();
