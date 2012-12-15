T.cache('X.ALG.MD5', ['K'], function(e) {
	var H = K.entity(e.pkg),
		encode=function() {
			var y = 1,
				m = 8,
				w = 16;
			function o(d,s) {
				y=s;
				return p(d);
			}

			function p(d) {
				return q(r(s(d), d.length * m))
			}

			function r(d, a) {
				d[a >> 5] |= 128 << a % 32;
				d[(a + 64 >>> 9 << 4) + 14] = a;
				a = 1732584193;
				for (var c = -271733879, b = -1732584194, e = 271733878, f = 0; f < d.length; f += 16) {
					var k = a,
						t = c,
						u = b,
						v = e;
					a = g(a, c, b, e, d[f + 0], 7, -680876936);
					e = g(e, a, c, b, d[f + 1], 12, -389564586);
					b = g(b, e, a, c, d[f + 2], 17, 606105819);
					c = g(c, b, e, a, d[f + 3], 22, -1044525330);
					a = g(a, c, b, e, d[f + 4], 7, -176418897);
					e = g(e, a, c, b, d[f + 5], 12, 1200080426);
					b = g(b, e, a, c, d[f + 6], 17, -1473231341);
					c = g(c, b, e, a, d[f + 7], 22, -45705983);
					a = g(a, c, b, e, d[f + 8], 7, 1770035416);
					e = g(e, a, c, b, d[f + 9], 12, -1958414417);
					b = g(b, e, a, c, d[f + 10], 17, -42063);
					c = g(c, b, e, a, d[f + 11], 22, -1990404162);
					a = g(a, c, b, e, d[f + 12], 7, 1804603682);
					e = g(e, a, c, b, d[f + 13], 12, -40341101);
					b = g(b, e, a, c, d[f + 14], 17, -1502002290);
					c = g(c, b, e, a, d[f + 15], 22, 1236535329);
					a = h(a, c, b, e, d[f + 1], 5, -165796510);
					e = h(e, a, c, b, d[f + 6], 9, -1069501632);
					b = h(b, e, a, c, d[f + 11], 14, 643717713);
					c = h(c, b, e, a, d[f + 0], 20, -373897302);
					a = h(a, c, b, e, d[f + 5], 5, -701558691);
					e = h(e, a, c, b, d[f + 10], 9, 38016083);
					b = h(b, e, a, c, d[f + 15], 14, -660478335);
					c = h(c, b, e, a, d[f + 4], 20, -405537848);
					a = h(a, c, b, e, d[f + 9], 5, 568446438);
					e = h(e, a, c, b, d[f + 14], 9, -1019803690);
					b = h(b, e, a, c, d[f + 3], 14, -187363961);
					c = h(c, b, e, a, d[f + 8], 20, 1163531501);
					a = h(a, c, b, e, d[f + 13], 5, -1444681467);
					e = h(e, a, c, b, d[f + 2], 9, -51403784);
					b = h(b, e, a, c, d[f + 7], 14, 1735328473);
					c = h(c, b, e, a, d[f + 12], 20, -1926607734);
					a = i(a, c, b, e, d[f + 5], 4, -378558);
					e = i(e, a, c, b, d[f + 8], 11, -2022574463);
					b = i(b, e, a, c, d[f + 11], 16, 1839030562);
					c = i(c, b, e, a, d[f + 14], 23, -35309556);
					a = i(a, c, b, e, d[f + 1], 4, -1530992060);
					e = i(e, a, c, b, d[f + 4], 11, 1272893353);
					b = i(b, e, a, c, d[f + 7], 16, -155497632);
					c = i(c, b, e, a, d[f + 10], 23, -1094730640);
					a = i(a, c, b, e, d[f + 13], 4, 681279174);
					e = i(e, a, c, b, d[f + 0], 11, -358537222);
					b = i(b, e, a, c, d[f + 3], 16, -722521979);
					c = i(c, b, e, a, d[f + 6], 23, 76029189);
					a = i(a, c, b, e, d[f + 9], 4, -640364487);
					e = i(e, a, c, b, d[f + 12], 11, -421815835);
					b = i(b, e, a, c, d[f + 15], 16, 530742520);
					c = i(c, b, e, a, d[f + 2], 23, -995338651);
					a = j(a, c, b, e, d[f + 0], 6, -198630844);
					e = j(e, a, c, b, d[f + 7], 10, 1126891415);
					b = j(b, e, a, c, d[f + 14], 15, -1416354905);
					c = j(c, b, e, a, d[f + 5], 21, -57434055);
					a = j(a, c, b, e, d[f + 12], 6, 1700485571);
					e = j(e, a, c, b, d[f + 3], 10, -1894986606);
					b = j(b, e, a, c, d[f + 10], 15, -1051523);
					c = j(c, b, e, a, d[f + 1], 21, -2054922799);
					a = j(a, c, b, e, d[f + 8], 6, 1873313359);
					e = j(e, a, c, b, d[f + 15], 10, -30611744);
					b = j(b, e, a, c, d[f + 6], 15, -1560198380);
					c = j(c, b, e, a, d[f + 13], 21, 1309151649);
					a = j(a, c, b, e, d[f + 4], 6, -145523070);
					e = j(e, a, c, b, d[f + 11], 10, -1120210379);
					b = j(b, e, a, c, d[f + 2], 15, 718787259);
					c = j(c, b, e, a, d[f + 9], 21, -343485551);
					a = l(a, k);
					c = l(c, t);
					b = l(b, u);
					e = l(e, v)
				}
				return w == 16 ? [c, b] : [a, c, b, e]
			}

			function n(d, a, c, b, e, f) {
				return l(x(l(l(a, d), l(b, f)), e), c)
			}

			function g(d, a, c, b, e, f, k) {
				return n(a & c | ~a & b, d, a, e, f, k)
			}

			function h(d, a, c, b, e, f, k) {
				return n(a & b | c & ~b, d, a, e, f, k)
			}

			function i(d, a, c, b, e, f, k) {
				return n(a ^ c ^ b, d, a, e, f, k)
			}

			function j(d, a, c, b, e, f, k) {
				return n(c ^ (a | ~b), d, a, e, f, k)
			}

			function l(d, a) {
				var c = (d & 65535) + (a & 65535);
				d = (d >> 16) + (a >> 16) + (c >> 16);
				return d << 16 | c & 65535
			}

			function x(d, a) {
				return d << a | d >>> 32 - a
			}

			function s(d) {
				for (var a = Array(), c = (1 << m) - 1, b = 0; b < d.length * m; b += m) a[b >> 5] |= (d.charCodeAt(b / m) & c) << b % 32;
				return a
			}

			function q(d) {
				for (var a = y ? "0123456789abcdef" : "0z1y2x3w4v5u6g7k", c = "", b = 0; b < d.length * 4; b++) c += a.charAt(d[b >> 2] >> b % 4 * 8 + 4 & 15) + a.charAt(d[b >> 2] >> b % 4 * 8 & 15);
				return c
			}
			return o
		}(),
		m = {
			improved:function(s){
				return encode(s,0);
			},
			normal: function(s){
				return encode(s,1);
			}
		};
	H.MD5 = m;
});