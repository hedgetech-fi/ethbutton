!function(n) {
	var t = {};
	
	function e(r) {
		if (t[r])return t[r].exports;
		var i = t[r] = {
			i: r,
			l: !1,
			exports: {}
		};
		
		return n[r].call(i.exports, i, i.exports, e),
			i.l = !0, i.exports
	}
	
	e.m = n,
		e.c = t,
		e.d = function (n, t, r) {
		e.o(n, t) || Object.defineProperty(n, t, {
			configurable: !1,
			enumerable: !0,
			get: r
		})
	},
		e.n = function (n) {
		var t = n && n.__esModule?function() {
			return n.default
			}
			
			:function() {
					return n
				};
				
				return e.d(t, "a", t), t
		},
			e.o = function (n, t) {
			return Object.prototype.hasOwnProperty.call(n, t)
		},
			e.p = "", e(e.s = 0)
	}
	
	([function(n, t, e) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var r = e(1),
			i = e.n(r),
			o = e(2),
			s = e(3),
			u = e(4);
		const a = Object(o.a)(window),
			c = a?new i.a(a):null,
			l = Object(s.a)(window),
			f = Object(u.a)(window.document, l, c);
		l.parentNode.replaceChild(f, l)
	}, function(n, t, e) {
		"use strict";
		n.exports = r;
		function r(n, t) {
			var e = this,
				i = t || {};
			
			if (!(this instanceof r))throw new Error('[ethjs-rpc] the EthRPC object requires the "new" flag in order to function normally (i.e. `const eth = new EthRPC(provider);`).');
			e.options = Object.assign({
				jsonSpace: i.jsonSpace || 0,
				max: i.max || 9999999999999
			}),
				e.idCounter = Math.floor(Math.random() * e.options.max),
				e.setProvider = function (n) {
				if ("object" != typeof n)throw new Error("[ethjs-rpc] the EthRPC object requires that the first input 'provider' must be an object, got '" + typeof n + "' (i.e. 'const eth = new EthRPC(provider);')");
				e.currentProvider = n
			}, e.setProvider(n)
		}
		
		r.prototype.sendAsync = function (n, t) {
			var e = this,
				r = t || function() {};
			
			e.idCounter = e.idCounter % e.options.max;
			var i, o,
				s = (i = n,
				o = e.idCounter++, Object.assign({},
			{
				id: o,
				jsonrpc: "2.0",
				params: []
			},
			i));
			return new Promise(function(n, t) {
				e.currentProvider.sendAsync(s, function(i, o) {
					var u = o || {};
					
					if (i || u.error) {
						var a = "[ethjs-rpc] " + (u.error?"rpc": "") + " error with payload " + JSON.stringify(s, null, e.options.jsonSpace) + " " + (i?String(i):JSON.stringify(u.error, null, e.options.jsonSpace)),
							c = new Error(a);
						return c.value = i || u.error, t(c), r(c, null)
					}
					
					return n(u.result), r(null, u.result)
				})
			})
		}
	}, function(n, t, e) {
		"use strict";
		t.a = function (n) {
			if (void 0 !== n.web3 && n.web3.currentProvider)return n.web3.currentProvider;
			return null
		}
	}, function(n, t, e) {
		"use strict";
		t.a = function (n) {
			const t = n.document.querySelectorAll(r);
			return t[t.length - 1]
		};
		
		const r = 'script[data-meta="eth-button"]'
	}, function(n, t, e) {
		"use strict";
		t.a = function (n, t, e) {
			const c = Object(r.a)(t);
			Object(i.a)(n);
			const l = u(n, "div", "EthSENDButton"),
				f = Object(o.a)(c.address.toLowerCase(), 8, 8);
			f.className = "EthSENDButton--Blockie",
				f.title = c.address, l.appendChild(f);
			const h = u(n, "div", "EthSENDButton--Content", l),
				d = u(n, "div", "EthSENDButton--LabelRow", h);
			u(n, "div", "EthSENDButton--LabelRow--Caption", d).innerHTML = "Give ETH to";
			const p = u(n, "div", "EthSENDButton--LabelRow--Address", d),
				g = u(n, "a", null, p);
			g.href = "https://etherscan.io/address/" + c.address + "/",
				g.innerHTML = c.address,
				g.title = c.address,
				g.target = "_blank";
			const w = u(n, "div", "EthSENDButton--InputRow", h),
				m = u(n, "input", "EthSENDButton--InputRow--Input", w);
			m.placeholder = "0.0Ξ",
				m.min = "0",
				m.step = "0.01",
				m.type = "number";
			const b = u(n, "div", "EthSENDButton--InputRow--Button disabled", w);
			if (b.innerHTML = "SEND", !e) {
				l.className = l.className + " disabled";
				const t = u(n, "div", "EthSENDButton--DisabledOverlay", l),
					e = u(n, "div", null, t);
				return e.innerHTML = a, l
			}
			
			let v = !1;
			const y = ["enabled", "disabled", "loading", "done", "error"];
			function x(n) {
				const t = y.slice();
				t.splice(t.indexOf(n), 1);
				const e = new RegExp(t.join("|"));
				return!!b.className.match(e) && (b.className = b.className.replace(e, n), !0)
			}
			
			function E() {
				parseFloat(m.value) > 0?x("enabled") && (b.innerHTML = "SEND",
					v = !0):x("disabled") && (b.innerHTML = "SEND",
					v = !1)
			}
			
			b.addEventListener("click", function(n) {
				v && (x("loading") && (b.innerHTML = "<div></div>",
					v = !1),
					m.disabled = !0, Object(s.a)(e, c.address, m.value).then(function(n) {
					x("done") && (b.innerHTML = "✔",
						v = !1), console.log(n)
				}).catch (function(n) {
					m.disabled = !1, x("error") && (b.innerHTML = "✘",
						v = !1), setTimeout(E, 3e3), console.error(n)
				}))
			});
			function N(n) {
				E()
			}
			
			return m.addEventListener("change", N), m.addEventListener("keyup", N), l
		};
		
		var r = e(5),
			i = e(6),
			o = e(7),
			s = e(8);
		function u(n, t, e, r) {
			const i = n.createElement(t);
			return e && (i.className = e), r && r.appendChild(i), i
		}
		
		const a = 'SEND <a href="https://ethereum.org/" target="_blank" title="Ethereum">Ether</a>
	}, function(n, t, e) {
		"use strict";
		t.a = function (n) {
			const t = n.getAttribute("data-address");
			if (!t)throw new Error("Eth-Button requires a `data-address` attribute!");
			return {
				address: t
			}
		}
	}, function(n, t, e) {
		"use strict";
		t.a = function (n) {
			if (n.getElementById(i))return;
			const t = n.createElement("style");
			t.type = "text/css",
				t.innerHTML = r,
				t.id = i, n.head.appendChild(t)
		};
		
		const r = "\n.EthSENDButton {\n  box-sizing: border-box;\n  display: flex;\n  border-radius: 4px;\n  width: 256px;\n  max-width: 256px;\n  padding: 2px;\n  font-family: sans-serif;\n  overflow:hidden;\n}\n\n.EthSENDButton a {\n  text-decoration: none;\n  color: #0099ff;\n}\n\n.EthSENDButton.disabled {\n  position: relative;\n  height: 66px;\n}\n\n.EthSENDButton--DisabledOverlay {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-color: rgba(255, 255, 255, 0.9);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 4px;\n}\n\n.EthSENDButton--DisabledOverlay > div {\n  border: 1px solid #c22;\n  border-radius: 4px;\n  padding: 4px;\n  max-width: 75%;\n  text-align: center;\n}\n\n.EthSENDButton * {\n  box-sizing: border-box;\n}\n\n.EthSENDButton--Blockie {\n  box-shadow: 0 0 5px 0px rgba(34, 34, 34, 0.5);\n  width: 64px;\n  height: 64px;\n  border-radius: 50%;\n  flex: 0 0 auto;\n}\n\n.EthSENDButton--Content {\n  padding: 5px;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  max-width: 192px;\n}\n\n.EthSENDButton--LabelRow {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n\n.EthSENDButton--LabelRow--Caption {\n  width: 50%;\n}\n\n.EthSENDButton--LabelRow--Address {\n  width: 50%;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  word-wrap: initial;\n}\n\n.EthSENDButton--InputRow {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n\n.EthSENDButton--InputRow--Input {\n  text-align: right;\n  border-radius: 4px;\n  height: 24px;\n  width: 50%;\n}\n\n.EthSENDButton--InputRow--Button {\n  display: inline-block;\n  background-color: white;\n  padding: 3px 6px;\n  border-radius: 4px;\n  border: 1px solid #0099ff;\n  color: #0099ff;\n  cursor: pointer;\n  width: 75px;\n  text-align: center;\n  height: 24px;\n  transition: color 0.5s ease, border-color 0.5s ease;\n  line-height: 16px;\n}\n\n.EthSENDButton--InputRow--Button.disabled {\n  color: #ccc;\n  border-color: #ccc;\n  cursor: default;\n}\n\n.EthSENDButton--InputRow--Button.done {\n  color: #2c2;\n  border-color: #2c2;\n  cursor: default;\n}\n\n.EthSENDButton--InputRow--Button.error {\n  color: #c22;\n  border-color: #c22;\n  cursor: default;\n}\n\n.EthSENDButton--InputRow--Button.loading div {\n  display: inline-block;\n  width: 16px;\n  height: 16px;\n  border: 2px rgba(00, 153, 255, 0.25) solid;\n\tborder-top: 2px rgba(00, 153, 255, 1) solid;\n\tborder-radius: 50%;\n\t-webkit-animation: loading .6s infinite linear;\n\tanimation: loading .6s infinite linear;\n}\n@-webkit-keyframes loading {\n\tfrom { -webkit-transform: rotate(0deg); }\n\tto { -webkit-transform: rotate(359deg); }\n}\n@keyframes loading {\n\tfrom { transform: rotate(0deg); }\n\tto { transform: rotate(359deg); }\n}\n",
			i = "EthButtonStyles"
	}, function(n, t, e) {
		"use strict";
		const r = new Array(4);
		function i() {
			let n = r[0] ^ r[0] << 11;
			return r[0] = r[1], r[1] = r[2], r[2] = r[3], r[3] = r[3] ^ r[3] >> 19 ^n ^n >> 8, (r[3] >>> 0) / (1 << 31 >>> 0)
		}
		
		function o() {
			return"hsl(" + Math.floor(360 * i()) + "," + (60 * i() + 40 + "%") + "," + (25 * (i() + i() + i() + i()) + "%") + ")"
		}
		
		t.a = function (n, t, e) {
			!function(n) {
				for (let n = 0;
				n < r.length;
				n++)r[n] = 0;
				for (let t = 0;
				t < n.length;
				t++)r[t % 4] = (r[t % 4] << 5) - r[t % 4] + n.charCodeAt(t)
			}
			
			(n);
			const s = o(),
				u = o(),
				a = o();
			return function(n, t, e, r, i) {
				const o = document.createElement("canvas"),
					s = Math.sqrt(n.length);
				o.width = o.height = s * e;
				const u = o.getContext("2d");
				u.fillStyle = r, u.fillRect(0, 0, o.width, o.height),
					u.fillStyle = t;
				for (let r = 0; r < n.length; r++) {
					const o = Math.floor(r / s),
						a = r % s;
					u.fillStyle = 1 === n[r]?t: i, n[r] && u.fillRect(a * e, o * e, e, e)
				}
				
				return o
			}
			
			(function(n) {
				const t = n,
					e = n,
					r = Math.ceil(t / 2),
					o = t - r,
					s = [];
				for (let n = 0; n < e; n++) {
					let n = [];
					for (let t = 0;
					t < r;
					t++)n[t] = Math.floor(2.3 * i());
					const t = n.slice(0, o);
					t.reverse(),
						n = n.concat(t);
					for (let t = 0;
					t < n.length;
					t++)s.push(n[t])
				}
				
				return s
			}
			
			(t), s, e, u, a)
		}
	}, function(n, t, e) {
		"use strict";
		t.a = function (n, t, e, r) {
			return (u = n, u.sendAsync({
				method: "eth_accounts"
			})).then(function(s) {
				return function(n, t, e, r, s) {
					s = s || {};
					
					const u = {
						from: t,
						to: e,
						value: (a = r,
						"0x" + new i.a(a).times(o).floor().toString(16))
					};
					
					var a;
					s.gas && (u.gas = s.gas);
					s.gasPrice && (u.gasPrice = s.gasPrice);
					return n.sendAsync({
						method: "eth_sendTransaction",
						params: [u]
					})
				}
				
				(n, s[0], t, e, r)
			}).then(function(t) {
				return console.log(t), s(n, t)
			});
			var u
		};
		
		var r = e(9),
			i = e.n(r);
		const o = new i.a("1000000000000000000");
		function s(n, t) {
			return n.sendAsync({
				method: "eth_getTransactionReceipt",
				params: [t]
			}).then(function(e) {
				return e || new Promise(function(n) {
					setTimeout(n, 1e3)
				}).then(function() {
					return s(n, t)
				})
			})
		}
	}, function(n, t, e) {
		var r;
		!function(i) {
			"use strict";
			var o,
				s = /^-?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i,
				u = Math.ceil,
				a = Math.floor,
				c = " not a boolean or binary digit",
				l = "rounding mode",
				f = "number type has more than 15 significant digits",
				h = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$_",
				d = 1e14,
				p = 14,
				g = 9007199254740991,
				w = [1, 10, 100, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9, 1e10, 1e11, 1e12, 1e13],
				m = 1e7,
				b = 1e9;
			function v(n) {
				var t, e,
					r = 0,
					i = H.prototype,
					o = new H(1),
					S = 20,
					L = 4,
					j =  -7,
					A = 21,
					C =  -1e7,
					k = 1e7,
					I = !0,
					P = G,
					_ = !1,
					T = 1,
					F = 0,
					q = {
					decimalSeparator: ".",
					groupSeparator: ",",
					groupSize: 3,
					secondaryGroupSize: 0,
					fractionGroupSeparator: " ",
					fractionGroupSize: 0
				};
				
				function H(n, t) {
					var i, o, u, c, l, d,
						w = this;
					if (!(w instanceof H))return new H(n, t);
					if (null !=t && P(t, 2, 64, r, "base")) {
						if (d = n + "", 10 == (t |= 0))return W(w = new H(n instanceof H?n: d), S + w.e + 1, L);
						if ((c = "number" == typeof n) && 0 *n != 0 || !new RegExp("^-?" + (i = "[" + h.slice(0, t) + "]+") + "(?:\\." +i + ")?$", t < 37?"i": "").test(d))return e(w, d, c, t);
						c?(w.s = 1 /n < 0?(d = d.slice(1),  -1):1, I && d.replace(/^0\.0*|\./, "").length > 15 && J(r, f, n),
							c = !1):w.s = 45 === d.charCodeAt(0)?(d = d.slice(1),  -1):1,
							d = U(d, 10, t, w.s)
					} else {
						if (n instanceof H)return w.s = n.s,
							w.e = n.e,
							w.c = (n = n.c)?n.slice():n, void (r = 0);
						if ((c = "number" == typeof n) && 0 *n == 0) {
							if (w.s = 1 /n < 0?(n =  - n,  -1):1, n === ~ ~ n) {
								for (o = 0,
									u = n;
								u >= 10;
								u /= 10, o++);
								return w.e = o,
									w.c = [n], void (r = 0)
							}
							
							d = n + ""
						} else {
							if (!s.test(d = n + ""))return e(w, d, c);
							w.s = 45 === d.charCodeAt(0)?(d = d.slice(1),  -1):1
						}
					}
					
					for ((o = d.indexOf(".")) > -1 && (d = d.replace(".", "")), (u = d.search(/e/i)) > 0?(o < 0 && (o = u), o += + d.slice(u + 1),
						d = d.substring(0, u)):o < 0 && (o = d.length),
						u = 0;
					48 === d.charCodeAt(u);
					u++);
					for (l = d.length;
					48 === d.charCodeAt(--l);
					);
					if (d = d.slice(u, l + 1))if (l = d.length, c &&I &&l > 15 && (n >g ||n !== a(n)) && J(r, f, w.s * n), (o = o -u - 1) > k)w.c = w.e = null;
					else if (o < C)w.c = [w.e = 0];
					else {
						if (w.e = o,
							w.c = [],
							u = (o + 1) % p, o < 0 && (u += p), u < l) {
							for (u && w.c.push(+ d.slice(0, u)), l -= p;
							u < l;
							)w.c.push(+ d.slice(u, u += p));
							d = d.slice(u),
								u = p - d.length
						} else u -= l;
						for (;
						u--;
						d += "0");
						w.c.push(+ d)
					} else w.c = [w.e = 0];
					r = 0
				}
				
				H.another = v,
					H.ROUND_UP = 0,
					H.ROUND_DOWN = 1,
					H.ROUND_CEIL = 2,
					H.ROUND_FLOOR = 3,
					H.ROUND_HALF_UP = 4,
					H.ROUND_HALF_DOWN = 5,
					H.ROUND_HALF_EVEN = 6,
					H.ROUND_HALF_CEIL = 7,
					H.ROUND_HALF_FLOOR = 8,
					H.EUCLID = 9,
					H.config = H.set = function () {
					var n, t,
						e = 0,
						i = {},
					o = arguments,
						s = o[0],
						u = s && "object" == typeof s?function() {
						if (s.hasOwnProperty(t))return null != (n = s[t])
					}
					
					:function() {
						if (o.length > e)return null != (n = o[e++])
					};
					
					return u(t = "DECIMAL_PLACES") && P(n, 0, b, 2, t) && (S = 0 | n), i[t] = S, u(t = "ROUNDING_MODE") && P(n, 0, 8, 2, t) && (L = 0 | n), i[t] = L, u(t = "EXPONENTIAL_AT") && (O(n)?P(n[0],  - b, 0, 2, t) && P(n[1], 0, b, 2, t) && (j = 0 | n[0],
						A = 0 | n[1]):P(n,  - b, b, 2, t) && (j =  - (A = 0 | (n < 0? - n: n)))), i[t] = [j, A], u(t = "RANGE") && (O(n)?P(n[0],  - b,  -1, 2, t) && P(n[1], 1, b, 2, t) && (C = 0 | n[0],
						k = 0 | n[1]):P(n,  - b, b, 2, t) && (0 | n?C =  - (k = 0 | (n < 0? - n: n)):I && J(2, t + " cannot be zero", n))), i[t] = [C, k], u(t = "ERRORS") && (n === !!n || 1 ===n || 0 === n?(r = 0,
						P = (I = !!n)?G: N):I && J(2, t + c, n)), i[t] = I, u(t = "CRYPTO") && (!0 ===n || !1 ===n || 1 ===n || 0 === n?n?!(n = "undefined" == typeof crypto) &&crypto && (crypto.getRandomValues || crypto.randomBytes)?_ = !0:I?J(2, "crypto unavailable", n?void 0:crypto):_ = !1:_ = !1:I && J(2, t + c, n)), i[t] = _, u(t = "MODULO_MODE") && P(n, 0, 9, 2, t) && (T = 0 | n), i[t] = T, u(t = "POW_PRECISION") && P(n, 0, b, 2, t) && (F = 0 | n), i[t] = F, u(t = "FORMAT") && ("object" == typeof n?q = n: I && J(2, t + " not an object", n)), i[t] = q, i
				},
					H.max = function () {
					return z(arguments, i.lt)
				},
					H.min = function () {
					return z(arguments, i.gt)
				},
					H.random = function () {
					var n = 9007199254740992,
						t = Math.random() *n & 2097151?function() {
						return a(Math.random() * n)
					}
					
					:function() {
						return 8388608 * (1073741824 * Math.random() | 0) + (8388608 * Math.random() | 0)
					};
					
					return function(n) {
						var e, r, i, s, c,
							l = 0,
							f = [],
							h = new H(o);
						if (n = null !=n && P(n, 0, b, 14)?0 | n: S,
							s = u(n / p), _)if (crypto.getRandomValues) {
							for (e = crypto.getRandomValues(new Uint32Array(s *= 2));
							l < s;
							)(c = 131072 * e[l] + (e[l + 1] >>> 11)) >= 9e15?(r = crypto.getRandomValues(new Uint32Array(2)), e[l] = r[0], e[l + 1] = r[1]):(f.push(c % 1e14), l += 2);
							l = s / 2
						} else if (crypto.randomBytes) {
							for (e = crypto.randomBytes(s *= 7);
							l < s;
							)(c = 281474976710656 * (31 & e[l]) + 1099511627776 * e[l + 1] + 4294967296 * e[l + 2] + 16777216 * e[l + 3] + (e[l + 4] << 16) + (e[l + 5] << 8) + e[l + 6]) >= 9e15?crypto.randomBytes(7).copy(e, l):(f.push(c % 1e14), l += 7);
							l = s / 7
						} else _ = !1, I && J(14, "crypto unavailable", crypto);
						if (!_)for (;
						l < s;
						)(c = t()) < 9e15 && (f[l++] =c % 1e14);
						for (s = f[--l], n %= p, s &&n && (c = w[p - n], f[l] = a(s / c) * c);
						0 === f[l];
						f.pop(), l--);
						if (l < 0)f = [i = 0];
						else {
							for (i =  -1;
							0 === f[0];
							f.splice(0, 1), i -= p);
							for (l = 1,
								c = f[0];
							c >= 10;
							c /= 10, l++);
							l <p && (i -=p - l)
						}
						
						return h.e = i,
							h.c = f, h
					}
				}
				
				();
				function U(n, e, r, i) {
					var o, s, u, a, c, l, f,
						d = n.indexOf("."),
						p = S,
						g = L;
					for (r < 37 && (n = n.toLowerCase()), d >= 0 && (u = F,
						F = 0,
						n = n.replace(".", ""),
						c = (f = new H(r)).pow(n.length - d),
						F = u,
						f.c = D(R(x(c.c), c.e), 10, e),
						f.e = f.c.length),
						s = u = (l = D(n, r, e)).length;
					0 == l[--u];
					l.pop());
					if (!l[0])return"0";
					if (d < 0?--s: (c.c = l,
						c.e = s,
						c.s = i,
						l = (c = t(c, f, p, g, e)).c,
						a = c.r,
						s = c.e),
						d = l[o = s +p + 1],
						u = e / 2,
						a = a ||o < 0 || null != l[o + 1],
						a = g < 4?(null !=d || a) && (0 ==g ||g == (c.s < 0?3:2)):d >u ||d ==u && (4 ==g ||a || 6 ==g && 1 & l[o - 1] ||g == (c.s < 0?8:7)), o < 1 || !l[0])n = a?R("1",  - p):"0";
					else {
						if (l.length = o, a)for (--e;
						++l[--o] > e;
						)l[o] = 0, o || (++s,
							l = [1].concat(l));
						for (u = l.length;
						!l[--u];
						);
						for (d = 0,
							n = "";
						d <= u;
						n += h.charAt(l[d++]));
						n = R(n, s)
					}
					
					return n
				}
				
				t = function () {
					function n(n, t, e) {
						var r, i, o, s,
							u = 0,
							a = n.length,
							c = t % m,
							l = t /m | 0;
						for (n = n.slice();
						a--;
						)u = ((i = c * (o = n[a] % m) + (r = l *o + (s = n[a] /m | 0) * c) %m *m + u) /e | 0) + (r /m | 0) +l * s, n[a] =i % e;
						return u && (n = [u].concat(n)), n
					}
					
					function t(n, t, e, r) {
						var i, o;
						if (e != r)o = e > r?1: -1;
						else for (i = o = 0;
						i < e;
						i++)if (n[i] != t[i]) {
							o = n[i] > t[i]?1: -1;
							break
						}
						
						return o
					}
					
					function e(n, t, e, r) {
						for (var i = 0;
						e--;
						)n[e] -= i,
							i = n[e] < t[e]?1:0, n[e] =i *r + n[e] - t[e];
						for (;
						!n[0] && n.length > 1;
						n.splice(0, 1));
					}
					
					return function(r, i, o, s, u) {
						var c, l, f, h, g, w, m, b, v, x, E, N, O, D, B, R, M,
							S = r.s == i.s?1: -1,
							L = r.c,
							j = i.c;
						if (!(L && L[0] &&j && j[0]))return new H(r.s && i.s && (L?!j || L[0] != j[0]:j)?L && 0 == L[0] || !j?0 * S: S / 0:NaN);
						for (v = (b = new H(S)).c = [],
							S = o + (l = r.e - i.e) + 1, u || (u = d,
							l = y(r.e / p) - y(i.e / p),
							S = S /p | 0),
							f = 0;
						j[f] == (L[f] || 0);
						f++);
						if (j[f] > (L[f] || 0) &&l--, S < 0)v.push(1),
							h = !0;
						else {
							for (D = L.length,
								R = j.length,
								f = 0, S += 2, (g = a(u / (j[0] + 1))) > 1 && (j = n(j, g, u),
								L = n(L, g, u),
								R = j.length,
								D = L.length),
								O = R,
								E = (x = L.slice(0, R)).length;
							E < R;
							x[E++] = 0);
							M = j.slice(),
								M = [0].concat(M),
								B = j[0], j[1] >=u / 2 &&B++;
							do {
								if (g = 0, (c = t(j, x, R, E)) < 0) {
								if (N = x[0], R !=E && (N = N *u + (x[1] || 0)), (g = a(N / B)) > 1)for (g >=u && (g = u - 1),
									m = (w = n(j, g, u)).length,
									E = x.length;
								1 == t(w, x, m, E);
								)g--, e(w, R < m?M: j, m, u),
									m = w.length,
									c = 1;
								else 0 ==g && (c = g = 1),
									m = (w = j.slice()).length;
								if (m <E && (w = [0].concat(w)), e(x, w, E, u),
									E = x.length,  -1 == c)for (;
								t(j, x, R, E) < 1;
								)g++, e(x, R < E?M: j, E, u),
									E = x.length
								} else 0 ===c && (g++,
									x = [0]);
								v[f++] = g, x[0]?x[E++] = L[O] || 0:(x = [L[O]],
									E = 1)
								}
								
							while ((O++ <D || null != x[0]) &&S--);
							h = null != x[0], v[0] || v.splice(0, 1)
						}
						
						if (u == d) {
							for (f = 1,
								S = v[0];
							S >= 10;
							S /= 10, f++);
							W(b, o + (b.e = f +l *p - 1) + 1, s, h)
						} else b.e = l,
							b.r =  + h;
						return b
					}
				}
				
				();
				function $(n, t, e, r) {
					var i, o, s, u, a;
					if (e = null !=e && P(e, 0, 8, r, l)?0 | e: L, !n.c)return n.toString();
					if (i = n.c[0],
						s = n.e, null == t)a = x(n.c),
						a = 19 ==r || 24 ==r &&s <= j?B(a, s):R(a, s);
					else if (o = (n = W(new H(n), t, e)).e,
						u = (a = x(n.c)).length, 19 ==r || 24 ==r && (t <=o ||o <= j)) {
						for (;
						u < t;
						a += "0", u++);
						a = B(a, o)
					} else if (t -= s,
						a = R(a, o), o + 1 > u) {
						if (--t > 0)for (a += ".";
						t--;
						a += "0");
					} else if ((t +=o - u) > 0)for (o + 1 ==u && (a += ".");
					t--;
					a += "0");
					return n.s < 0 && i?"-" + a: a
				}
				
				function z(n, t) {
					var e, r,
						i = 0;
					for (O(n[0]) && (n = n[0]),
						e = new H(n[0]); ++i < n.length; ) {
						if (!(r = new H(n[i])).s) {
							e = r;
							break
						}
						
						t.call(e, r) && (e = r)
					}
					
					return e
				}
				
				function G(n, t, e, r, i) {
					return (n <t ||n >e ||n != M(n)) && J(r, (i || "decimal places") + (n <t ||n > e?" out of range": " not an integer"), n), !0
				}
				
				function V(n, t, e) {
					for (var r = 1,
						i = t.length;
					!t[--i];
					t.pop());
					for (i = t[0];
					i >= 10;
					i /= 10, r++);
					return (e = r +e *p - 1) > k?n.c = n.e = null:e < C?n.c = [n.e = 0]:(n.e = e,
						n.c = t), n
				}
				
				e = function () {
					var n = /^(-?)0([xbo])(?=\w[\w.]*$)/i,
						t = /^([^.]+)\.$/,
						e = /^\.([^.]+)$/,
						i = /^-?(Infinity|NaN)$/,
						o = /^\s*\+(?=[\w.])|^\s+|\s+$/g;
					return function(s, u, a, c) {
						var l,
							f = a?u: u.replace(o, "");
						if (i.test(f))s.s = isNaN(f)?null:f < 0? -1:1;
						else {
							if (!a && (f = f.replace(n, function(n, t, e) {
								return l = "x" == (e = e.toLowerCase())?16:"b" == e?2:8, c &&c != l?n: t
							}), c && (l = c,
								f = f.replace(t, "$1").replace(e, "0.$1")), u != f))return new H(f, l);
							I && J(r, "not a" + (c?" base " + c: "") + " number", u),
								s.s = null
						}
						
						s.c = s.e = null,
							r = 0
					}
				}
				
				();
				function J(n, t, e) {
					var i = new Error(["new BigNumber", "cmp", "config", "div", "divToInt", "eq", "gt", "gte", "lt", "lte", "minus", "mod", "plus", "precision", "random", "round", "shift", "times", "toDigits", "toExponential", "toFixed", "toFormat", "toFraction", "pow", "toPrecision", "toString", "BigNumber"][n] + "() " +t + ": " + e);
					throw i.name = "BigNumber Error",
						r = 0, i
				}
				
				function W(n, t, e, r) {
					var i, o, s, c, l, f, h,
						g = n.c,
						m = w;
					if (g) {
						n: {
							for (i = 1,
							c = g[0];
							c >= 10;
							c /= 10,
							i++);
							if ((o = t - i) < 0)o += p,
							s = t,
							h = (l = g[f = 0]) / m[i -s - 1] % 10 | 0;
							else if ((f = u((o + 1) / p)) >= g.length) {
								if (!r)break n;
								for (;
								g.length <= f;
								g.push(0));
								l = h = 0,
									i = 1,
									s = (o %= p) -p + 1
							} else {
								for (l = c = g[f],
									i = 1;
								c >= 10;
								c /= 10, i++);
								h = (s = (o %= p) -p + i) < 0?0:l / m[i -s - 1] % 10 | 0
							}
							
							if (r = r ||t < 0 || null != g[f + 1] || (s < 0?l: l % m[i -s - 1]),
							r = e < 4?(h || r) && (0 ==e ||e == (n.s < 0?3:2)):h > 5 || 5 ==h && (4 ==e ||r || 6 ==e && (o > 0?s > 0?l / m[i - s]:0:g[f - 1]) % 10 & 1 ||e == (n.s < 0?8:7)),
							t < 1 || !g[0])return g.length = 0,
							r?(t -= n.e + 1,
							g[0] = m[(p -t % p) % p],
							n.e =  -t || 0):g[0] = n.e = 0,
							n;
							if (0 == o?(g.length = f,
							c = 1,
							f--):(g.length = f + 1,
							c = m[p - o], g[f] =s > 0?a(l / m[i - s] % m[s]) * c: 0),
							r)for (; ; ) {
								if (0 == f) {
									for (o = 1,
										s = g[0];
									s >= 10;
									s /= 10, o++);
									for (s = g[0] += c,
										c = 1;
									s >= 10;
									s /= 10, c++);
									o !=c && (n.e++, g[0] ==d && (g[0] = 1));
									break
								}
								
								if (g[f] += c, g[f] != d)break;
								g[f--] = 0,
									c = 1
							}
							
							for (o = g.length;
							0 === g[--o];
							g.pop());
						}
						
						n.e > k?n.c = n.e = null:n.e <C && (n.c = [n.e = 0])
					}
					
					return n
				}
				
				return i.absoluteValue = i.abs = function () {
					var n = new H(this);
					return n.s < 0 && (n.s = 1), n
				},
					i.ceil = function () {
					return W(new H(this), this.e + 1, 2)
				},
					i.comparedTo = i.cmp = function (n, t) {
					return r = 1, E(this, new H(n, t))
				},
					i.decimalPlaces = i.dp = function () {
					var n, t,
						e = this.c;
					if (!e)return null;
					if (n = ((t = e.length - 1) - y(this.e / p)) * p,
						t = e[t])for (;
					t % 10 == 0;
					t /= 10, n--);
					return n < 0 && (n = 0), n
				},
					i.dividedBy = i.div = function (n, e) {
					return r = 3, t(this, new H(n, e), S, L)
				},
					i.dividedToIntegerBy = i.divToInt = function (n, e) {
					return r = 4, t(this, new H(n, e), 0, 1)
				},
					i.equals = i.eq = function (n, t) {
					return r = 5, 0 === E(this, new H(n, t))
				},
					i.floor = function () {
					return W(new H(this), this.e + 1, 3)
				},
					i.greaterThan = i.gt = function (n, t) {
					return r = 6, E(this, new H(n, t)) > 0
				},
					i.greaterThanOrEqualTo = i.gte = function (n, t) {
					return r = 7, 1 === (t = E(this, new H(n, t))) || 0 === t
				},
					i.isFinite = function () {
					return!!this.c
				},
					i.isInteger = i.isInt = function () {
					return!!this.c && y(this.e / p) > this.c.length - 2
				},
					i.isNaN = function () {
					return!this.s
				},
					i.isNegative = i.isNeg = function () {
					return this.s < 0
				},
					i.isZero = function () {
					return!!this.c && 0 == this.c[0]
				},
					i.lessThan = i.lt = function (n, t) {
					return r = 8, E(this, new H(n, t)) < 0
				},
					i.lessThanOrEqualTo = i.lte = function (n, t) {
					return r = 9,  -1 === (t = E(this, new H(n, t))) || 0 === t
				},
					i.minus = i.sub = function (n, t) {
					var e, i, o, s,
						u = this.s;
					if (r = 10,
						t = (n = new H(n, t)).s, !u || !t)return new H(NaN);
					if (u != t)return n.s =  - t, this.plus(n);
					var a = this.e / p,
						c = n.e / p,
						l = this.c,
						f = n.c;
					if (!a || !c) {
						if (!l || !f)return l?(n.s =  - t, n):new H(f?this:NaN);
						if (!l[0] || !f[0])return f[0]?(n.s =  - t, n):new H(l[0]?this:3 == L? -0:0)
					}
					
					if (a = y(a),
						c = y(c),
						l = l.slice(),
						u = a - c) {
						for ((s = u < 0)?(u =  - u,
							o = l):(c = a,
							o = f), o.reverse(),
							t = u;
						t--;
						o.push(0));
						o.reverse()
					} else for (i = (s = (u = l.length) < (t = f.length))?u: t,
						u = t = 0;
					t < i;
					t++)if (l[t] != f[t]) {
						s = l[t] < f[t];
						break
					}
					
					if (s && (o = l,
						l = f,
						f = o,
						n.s =  - n.s), (t = (i = f.length) - (e = l.length)) > 0)for (;
					t--;
					l[e++] = 0);
					for (t = d - 1; i > u; ) {
						if (l[--i] < f[i]) {
							for (e = i;
							e && !l[--e];
							l[e] = t);
							--l[e], l[i] += d
						}
						
						l[i] -= f[i]
					}
					
					for (;
					0 == l[0];
					l.splice(0, 1), --c);
					return l[0]?V(n, l, c):(n.s = 3 == L? -1:1,
						n.c = [n.e = 0], n)
				},
					i.modulo = i.mod = function (n, e) {
					var i, o;
					return r = 11,
						n = new H(n, e), !this.c || !n.s || n.c && !n.c[0]?new H(NaN):!n.c || this.c && !this.c[0]?new H(this):(9 == T?(o = n.s,
						n.s = 1,
						i = t(this, n, 0, 3),
						n.s = o, i.s *= o):i = t(this, n, 0, T), this.minus(i.times(n)))
				},
					i.negated = i.neg = function () {
					var n = new H(this);
					return n.s =  - n.s || null, n
				},
					i.plus = i.add = function (n, t) {
					var e,
						i = this.s;
					if (r = 12,
						t = (n = new H(n, t)).s, !i || !t)return new H(NaN);
					if (i != t)return n.s =  - t, this.minus(n);
					var o = this.e / p,
						s = n.e / p,
						u = this.c,
						a = n.c;
					if (!o || !s) {
						if (!u || !a)return new H(i / 0);
						if (!u[0] || !a[0])return a[0]?n: new H(u[0]?this:0 * i)
					}
					
					if (o = y(o),
						s = y(s),
						u = u.slice(),
						i = o - s) {
						for (i > 0?(s = o,
							e = a):(i =  - i,
							e = u), e.reverse();
						i--;
						e.push(0));
						e.reverse()
					}
					
					for ((i = u.length) - (t = a.length) < 0 && (e = a,
						a = u,
						u = e,
						t = i),
						i = 0;
					t;
					)i = (u[--t] = u[t] + a[t] + i) /d | 0, u[t] =d === u[t]?0:u[t] % d;
					return i && (u = [i].concat(u), ++s), V(n, u, s)
				},
					i.precision = i.sd = function (n) {
					var t, e,
						r = this.c;
					if (null !=n &&n !== !!n && 1 !==n && 0 !==n && (I && J(13, "argument" + c, n), n != !!n && (n = null)), !r)return null;
					if (t = (e = r.length - 1) *p + 1,
						e = r[e]) {
						for (;
						e % 10 == 0;
						e /= 10, t--);
						for (e = r[0];
						e >= 10;
						e /= 10, t++);
					}
					
					return n && this.e + 1 >t && (t = this.e + 1), t
				},
					i.round = function (n, t) {
					var e = new H(this);
					return (null ==n || P(n, 0, b, 15)) && W(e,  ~ ~n + this.e + 1, null !=t && P(t, 0, 8, 15, l)?0 | t: L), e
				},
					i.shift = function (n) {
					return P(n,  - g, g, 16, "argument")?this.times("1e" + M(n)):new H(this.c && this.c[0] && (n < -g ||n > g)?this.s * (n < 0?0:1 / 0):this)
				},
					i.squareRoot = i.sqrt = function () {
					var n, e, r, i, o,
						s = this.c,
						u = this.s,
						a = this.e,
						c = S + 4,
						l = new H("0.5");
					if (1 !==u || !s || !s[0])return new H(!u ||u < 0 && (!s || s[0])?NaN:s?this:1 / 0);
					if (0 == (u = Math.sqrt(+ this)) ||u == 1 / 0?(((e = x(s)).length + a) % 2 == 0 && (e += "0"),
						u = Math.sqrt(e),
						a = y((a + 1) / 2) - (a < 0 ||a % 2),
						r = new H(e = u == 1 / 0?"1e" + a: (e = u.toExponential()).slice(0, e.indexOf("e") + 1) + a)):r = new H(u + ""), r.c[0])for ((u = (a = r.e) + c) < 3 && (u = 0);
					;
					)if (o = r,
						r = l.times(o.plus(t(this, o, c, 1))), x(o.c).slice(0, u) === (e = x(r.c)).slice(0, u)) {
						if (r.e <a &&--u, "9999" != (e = e.slice(u - 3, u + 1)) && (i || "4999" != e)) {
							+e && (+ e.slice(1) || "5" != e.charAt(0)) || (W(r, r.e +S + 2, 1),
								n = !r.times(r).eq(this));
							break
						}
						
						if (!i && (W(o, o.e +S + 2, 0), o.times(o).eq(this))) {
							r = o;
							break
						}
						
						c += 4, u += 4,
							i = 1
					}
					
					return W(r, r.e +S + 1, L, n)
				},
					i.times = i.mul = function (n, t) {
					var e, i, o, s, u, a, c, l, f, h, g, w, b, v, x,
						E = this.c,
						N = (r = 17,
						n = new H(n, t)).c;
					if (!(E &&N && E[0] && N[0]))return!this.s || !n.s ||E && !E[0] && !N ||N && !N[0] && !E?n.c = n.e = n.s = null:(n.s *= this.s, E && N?(n.c = [0],
						n.e = 0):n.c = n.e = null), n;
					for (i = y(this.e / p) + y(n.e / p), n.s *= this.s, (c = E.length) < (h = N.length) && (b = E,
						E = N,
						N = b,
						o = c,
						c = h,
						h = o),
						o = c + h,
						b = [];
					o--;
					b.push(0));
					for (v = d,
						x = m,
						o = h; --o >= 0; ) {
						for (e = 0,
							g = N[o] % x,
							w = N[o] /x | 0,
							s = o + (u = c);
						s > o;
						)e = ((l = g * (l = E[--u] % x) + (a = w *l + (f = E[u] /x | 0) * g) %x *x + b[s] + e) /v | 0) + (a /x | 0) +w * f, b[s--] =l % v;
						b[s] = e
					}
					
					return e?++i: b.splice(0, 1), V(n, b, i)
				},
					i.toDigits = function (n, t) {
					var e = new H(this);
					return n = null !=n && P(n, 1, b, 18, "precision")?0 | n: null,
						t = null !=t && P(t, 0, 8, 18, l)?0 | t: L, n?W(e, n, t):e
				},
					i.toExponential = function (n, t) {
					return $(this, null !=n && P(n, 0, b, 19)?1 + ~ ~ n: null, t, 19)
				},
					i.toFixed = function (n, t) {
					return $(this, null !=n && P(n, 0, b, 20)? ~ ~n + this.e + 1:null, t, 20)
				},
					i.toFormat = function (n, t) {
					var e = $(this, null !=n && P(n, 0, b, 21)? ~ ~n + this.e + 1:null, t, 21);
					if (this.c) {
						var r,
							i = e.split("."),
							o =  + q.groupSize,
							s =  + q.secondaryGroupSize,
							u = q.groupSeparator,
							a = i[0],
							c = i[1],
							l = this.s < 0,
							f = l?a.slice(1):a,
							h = f.length;
						if (s && (r = o,
							o = s,
							s = r, h -= r), o > 0 &&h > 0) {
							for (r = h %o || o,
								a = f.substr(0, r);
							r < h;
							r += o)a +=u + f.substr(r, o);
							s > 0 && (a +=u + f.slice(r)), l && (a = "-" + a)
						}
						
						e = c?a + q.decimalSeparator + ((s =  + q.fractionGroupSize)?c.replace(new RegExp("\\d{" +s + "}\\B", "g"), "$&" + q.fractionGroupSeparator):c):a
					}
					
					return e
				},
					i.toFraction = function (n) {
					var e, r, i, s, u, a, c, l, f,
						h = I,
						d = this.c,
						g = new H(o),
						m = r = new H(o),
						b = c = new H(o);
					if (null !=n && (I = !1,
						a = new H(n),
						I = h, (h = a.isInt()) && !a.lt(o) || (I && J(22, "max denominator " + (h?"out of range": "not an integer"), n),
						n = !h && a.c && W(a, a.e + 1, 1).gte(o)?a: null)), !d)return this.toString();
					for (f = x(d),
						s = g.e = f.length - this.e - 1, g.c[0] = w[(u = s % p) < 0?p + u: u],
						n = !n || a.cmp(g) > 0?s > 0?g: m: a,
						u = k,
						k = 1 / 0,
						a = new H(f), c.c[0] = 0;
					l = t(a, g, 0, 1), 1 != (i = r.plus(l.times(b))).cmp(n);
					)r = b,
						b = i,
						m = c.plus(l.times(i = m)),
						c = i,
						g = a.minus(l.times(i = g)),
						a = i;
					return i = t(n.minus(r), b, 0, 1),
						c = c.plus(i.times(m)),
						r = r.plus(i.times(b)),
						c.s = m.s = this.s,
						e = t(m, b, s *= 2, L).minus(this).abs().cmp(t(c, r, s, L).minus(this).abs()) < 1?[m.toString(), b.toString()]:[c.toString(), r.toString()],
						k = u, e
				},
					i.toNumber = function () {
					return + this
				},
					i.toPower = i.pow = function (n, t) {
					var e, i, s,
						c = a(n < 0? - n:  + n),
						l = this;
					if (null !=t && (r = 23,
						t = new H(t)), !P(n,  - g, g, 23, "exponent") && (!isFinite(n) ||c >g && (n /= 0) || parseFloat(n) !=n && !(n = NaN)) || 0 == n)return e = Math.pow(+ l, n), new H(t?e % t: e);
					for (t?n > 1 && l.gt(o) && l.isInt() && t.gt(o) && t.isInt()?l = l.mod(t):(s = t,
						t = null):F && (e = u(F /p + 2)),
						i = new H(o); ; ) {
						if (c % 2) {
							if (!(i = i.times(l)).c)break;
							e?i.c.length >e && (i.c.length = e):t && (i = i.mod(t))
						}
						
						if (!(c = a(c / 2)))break;
						l = l.times(l), e?l.c && l.c.length >e && (l.c.length = e):t && (l = l.mod(t))
					}
					
					return t?i: (n < 0 && (i = o.div(i)), s?i.mod(s):e?W(i, F, L):i)
				},
					i.toPrecision = function (n, t) {
					return $(this, null !=n && P(n, 1, b, 24, "precision")?0 | n: null, t, 24)
				},
					i.toString = function (n) {
					var t,
						e = this.s,
						r = this.e;
					return null === r?e?(t = "Infinity", e < 0 && (t = "-" + t)):t = "NaN": (t = x(this.c),
						t = null !=n && P(n, 2, 64, 25, "base")?U(R(t, r), 0 | n, 10, e):r <=j ||r >= A?B(t, r):R(t, r), e < 0 && this.c[0] && (t = "-" + t)), t
				},
					i.truncated = i.trunc = function () {
					return W(new H(this), this.e + 1, 1)
				},
					i.valueOf = i.toJSON = function () {
					var n,
						t = this.e;
					return null === t?this.toString():(n = x(this.c),
						n = t <=j ||t >= A?B(n, t):R(n, t), this.s < 0?"-" + n: n)
				},
					i.isBigNumber = !0, null !=n && H.config(n), H
			}
			
			function y(n) {
				var t = 0 | n;
				return n > 0 ||n === t?t: t - 1
			}
			
			function x(n) {
				for (var t, e,
					r = 1,
					i = n.length,
					o = n[0] + ""; r < i; ) {
					for (t = n[r++] + "",
						e = p - t.length;
					e--;
					t = "0" + t);
					o += t
				}
				
				for (i = o.length;
				48 === o.charCodeAt(--i);
				);
				return o.slice(0, i + 1 || 1)
			}
			
			function E(n, t) {
				var e, r,
					i = n.c,
					o = t.c,
					s = n.s,
					u = t.s,
					a = n.e,
					c = t.e;
				if (!s || !u)return null;
				if (e = i && !i[0],
					r = o && !o[0], e || r)return e?r?0: - u: s;
				if (s != u)return s;
				if (e = s < 0,
					r = a == c, !i || !o)return r?0:!i ^ e?1: -1;
				if (!r)return a >c ^ e?1: -1;
				for (u = (a = i.length) < (c = o.length)?a: c,
					s = 0;
				s < u;
				s++)if (i[s] != o[s])return i[s] > o[s] ^ e?1: -1;
				return a == c?0:a >c ^ e?1: -1
			}
			
			function N(n, t, e) {
				return (n = M(n)) >=t &&n <= e
			}
			
			function O(n) {
				return"[object Array]" == Object.prototype.toString.call(n)
			}
			
			function D(n, t, e) {
				for (var r, i,
					o = [0],
					s = 0,
					u = n.length; s < u; ) {
					for (i = o.length;
					i--;
					o[i] *= t);
					for (o[r = 0] += h.indexOf(n.charAt(s++));
					r < o.length;
					r++)o[r] >e - 1 && (null == o[r + 1] && (o[r + 1] = 0), o[r + 1] += o[r] /e | 0, o[r] %= e)
				}
				
				return o.reverse()
			}
			
			function B(n, t) {
				return (n.length > 1?n.charAt(0) + "." + n.slice(1):n) + (t < 0?"e": "e+") + t
			}
			
			function R(n, t) {
				var e, r;
				if (t < 0) {
					for (r = "0.";
					++t;
					r += "0");
					n = r + n
				} else if (++t > (e = n.length)) {
					for (r = "0", t -= e;
					--t;
					r += "0");
					n += r
				} else t <e && (n = n.slice(0, t) + "." + n.slice(t));
				return n
			}
			
			function M(n) {
				return (n = parseFloat(n)) < 0?u(n):a(n)
			}
			
			(o = v()).default = o.BigNumber = o, void 0 === (r = function() {
			return o
			}
			
			.call(t, e, t, n)) || (n.exports = r)
			}
			
			()
			}]);