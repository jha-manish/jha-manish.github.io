/*! Blast.js (2.0.0): julian.com/research/blast (C) 2015 Julian Shapiro. MIT @license: en.wikipedia.org/wiki/MIT_License */
!function ($, e, t, a) {
    var r = function () {
        if (t.documentMode)return t.documentMode;
        for (var e = 7; e > 0; e--) {
            var r = t.createElement("div");
            if (r.innerHTML = "<!--[if IE " + e + "]><span></span><![endif]-->", r.getElementsByTagName("span").length)return r = null, e;
            r = null
        }
        return a
    }(), n = e.console || {
            log: function () {
            }, time: function () {
            }
        }, i = "blast", s = {
        latinPunctuation: "â€“â€”â€²â€™'â€œâ€³â€ž\"(Â«.â€¦Â¡Â¿â€²â€™'â€â€³â€œ\")Â».â€¦!?",
        latinLetters: "\\u0041-\\u005A\\u0061-\\u007A\\u00C0-\\u017F\\u0100-\\u01FF\\u0180-\\u027F"
    }, l = {
        abbreviations: new RegExp("[^" + s.latinLetters + "](e\\.g\\.)|(i\\.e\\.)|(mr\\.)|(mrs\\.)|(ms\\.)|(dr\\.)|(prof\\.)|(esq\\.)|(sr\\.)|(jr\\.)[^" + s.latinLetters + "]", "ig"),
        innerWordPeriod: new RegExp("[" + s.latinLetters + "].[" + s.latinLetters + "]", "ig"),
        onlyContainsPunctuation: new RegExp("[^" + s.latinPunctuation + "]"),
        adjoinedPunctuation: new RegExp("^[" + s.latinPunctuation + "]+|[" + s.latinPunctuation + "]+$", "g"),
        skippedElements: /(script|style|select|textarea)/i,
        hasPluginClass: new RegExp("(^| )" + i + "( |$)", "gi")
    };
    $.fn[i] = function (d) {
        function o(e) {
            return e.replace(l.abbreviations, function (e) {
                return e.replace(/\./g, "{{46}}")
            }).replace(l.innerWordPeriod, function (e) {
                return e.replace(/\./g, "{{46}}")
            })
        }

        function c(e) {
            return e.replace(/{{(\d{1,3})}}/g, function (e, t) {
                return String.fromCharCode(t)
            })
        }

        function u(e, a) {
            var r = t.createElement(a.tag);
            if (r.className = i, a.customClass && (r.className += " " + a.customClass, a.generateIndexID && (r.id = a.customClass + "-" + f.blastedIndex)), "all" === a.delimiter && /\s/.test(e.data) && (r.style.whiteSpace = "pre-line"), a.generateValueClass === !0 && !a.search && ("character" === a.delimiter || "word" === a.delimiter)) {
                var n, s = e.data;
                "word" === a.delimiter && l.onlyContainsPunctuation.test(s) && (s = s.replace(l.adjoinedPunctuation, "")), n = i + "-" + a.delimiter.toLowerCase() + "-" + s.toLowerCase(), r.className += " " + n
            }
            return a.aria && r.setAttribute("aria-hidden", "true"), r.appendChild(e.cloneNode(!1)), r
        }

        function g(e, t) {
            var a = -1, r = 0;
            if (3 === e.nodeType && e.data.length) {
                if (f.nodeBeginning && (e.data = t.search || "sentence" !== t.delimiter ? c(e.data) : o(e.data), f.nodeBeginning = !1), a = e.data.search(h), -1 !== a) {
                    var n = e.data.match(h), i = n[0], s = n[1] || !1;
                    "" === i ? a++ : s && s !== i && (a += i.indexOf(s), i = s);
                    var d = e.splitText(a);
                    d.splitText(i.length), r = 1, t.search || "sentence" !== t.delimiter || (d.data = c(d.data));
                    var p = u(d, t, f.blastedIndex);
                    d.parentNode.replaceChild(p, d), f.wrappers.push(p), f.blastedIndex++
                }
            } else if (1 === e.nodeType && e.hasChildNodes() && !l.skippedElements.test(e.tagName) && !l.hasPluginClass.test(e.className))for (var m = 0; m < e.childNodes.length; m++)f.nodeBeginning = !0, m += g(e.childNodes[m], t);
            return r
        }

        function p(t, s) {
            s.debug && n.time("blast reversal");
            var l = !1;
            t.removeClass(i + "-root").removeAttr("aria-label").find("." + i).each(function () {
                var e = $(this);
                if (e.closest("." + i + "-root").length)l = !0; else {
                    var t = this.parentNode;
                    7 >= r && t.firstChild.nodeName, t.replaceChild(this.firstChild, this), t.normalize()
                }
            }), e.Zepto ? t.data(i, a) : t.removeData(i), s.debug && (n.log(i + ": Reversed Blast" + (t.attr("id") ? " on #" + t.attr("id") + "." : ".") + (l ? " Skipped reversal on the children of one or more descendant root elements." : "")), n.timeEnd("blast reversal"))
        }

        var m = $.extend({}, $.fn[i].defaults, d), h, f = {};
        if (m.search.length && ("string" == typeof m.search || /^\d/.test(parseFloat(m.search))))m.delimiter = m.search.toString().replace(/[-[\]{,}(.)*+?|^$\\\/]/g, "\\$&"), h = new RegExp("(?:^|[^-" + s.latinLetters + "])(" + m.delimiter + "('s)?)(?![-" + s.latinLetters + "])", "i"); else switch ("string" == typeof m.delimiter && (m.delimiter = m.delimiter.toLowerCase()), m.delimiter) {
            case"all":
                h = /(.)/;
                break;
            case"letter":
            case"char":
            case"character":
                h = /(\S)/;
                break;
            case"word":
                h = /\s*(\S+)\s*/;
                break;
            case"sentence":
                h = /(?=\S)(([.]{2,})?[^!?]+?([.â€¦!?]+|(?=\s+$)|$)(\s*[â€²â€™'â€â€³â€œ")Â»]+)*)/;
                break;
            case"element":
                h = /(?=\S)([\S\s]*\S)/;
                break;
            default:
                if (!(m.delimiter instanceof RegExp))return n.log(i + ": Unrecognized delimiter, empty search string, or invalid custom Regex. Aborting."), !0;
                h = m.delimiter
        }
        if (this.each(function () {
                var e = $(this), r = e.text();
                if (d !== !1) {
                    f = {
                        blastedIndex: 0,
                        nodeBeginning: !1,
                        wrappers: f.wrappers || []
                    }, e.data(i) === a || "search" === e.data(i) && m.search !== !1 || (p(e, m), m.debug && n.log(i + ": Removed element's existing Blast call.")), e.data(i, m.search !== !1 ? "search" : m.delimiter), m.aria && e.attr("aria-label", r), m.stripHTMLTags && e.html(r);
                    try {
                        t.createElement(m.tag)
                    } catch (s) {
                        m.tag = "span", m.debug && n.log(i + ": Invalid tag supplied. Defaulting to span.")
                    }
                    e.addClass(i + "-root"), m.debug && n.time(i), g(this, m), m.debug && n.timeEnd(i)
                } else d === !1 && e.data(i) !== a && p(e, m);
                m.debug && $.each(f.wrappers, function (e, t) {
                    n.log(i + " [" + m.delimiter + "] " + this.outerHTML), this.style.backgroundColor = e % 2 ? "#f12185" : "#075d9a"
                })
            }), d !== !1 && m.returnGenerated === !0) {
            var b = $().add(f.wrappers);
            return b.prevObject = this, b.context = this.context, b
        }
        return this
    }, $.fn.blast.defaults = {
        returnGenerated: !0,
        delimiter: "word",
        tag: "span",
        search: !1,
        customClass: "",
        generateIndexID: !1,
        generateValueClass: !1,
        stripHTMLTags: !1,
        aria: !0,
        debug: !1
    }
}(window.$ || window.Zepto, window, document);


/*! alertify - v0.3.11 - 2013-10-08 */
!function (a, b) {
    "use strict";
    var c, d = a.document;
    c = function () {
        var c, e, f, g, h, i, j, k, l, m, n, o, p, q = {}, r = {}, s = !1, t = {ENTER: 13, ESC: 27, SPACE: 32}, u = [];
        return r = {
            buttons: {
                holder: '<nav class="alertify-buttons">{{buttons}}</nav>',
                submit: '<button type="submit" class="alertify-button alertify-button-ok" id="alertify-ok">{{ok}}</button>',
                ok: '<button class="alertify-button alertify-button-ok" id="alertify-ok">{{ok}}</button>',
                cancel: '<button class="alertify-button alertify-button-cancel" id="alertify-cancel">{{cancel}}</button>'
            },
            input: '<div class="alertify-text-wrapper"><input type="text" class="alertify-text" id="alertify-text"></div>',
            message: '<p class="alertify-message">{{message}}</p>',
            log: '<article class="alertify-log{{class}}">{{message}}</article>'
        }, p = function () {
            var a, c, e = !1, f = d.createElement("fakeelement"), g = {
                WebkitTransition: "webkitTransitionEnd",
                MozTransition: "transitionend",
                OTransition: "otransitionend",
                transition: "transitionend"
            };
            for (a in g)if (f.style[a] !== b) {
                c = g[a], e = !0;
                break
            }
            return {type: c, supported: e}
        }, c = function (a) {
            return d.getElementById(a)
        }, q = {
            labels: {ok: "OK", cancel: "Cancel"},
            delay: 5e3,
            buttonReverse: !1,
            buttonFocus: "ok",
            transition: b,
            addListeners: function (a) {
                var b, c, i, j, k, l = "undefined" != typeof f, m = "undefined" != typeof e, n = "undefined" != typeof o, p = "", q = this;
                b = function (b) {
                    return "undefined" != typeof b.preventDefault && b.preventDefault(), i(b), "undefined" != typeof o && (p = o.value), "function" == typeof a && ("undefined" != typeof o ? a(!0, p) : a(!0)), !1
                }, c = function (b) {
                    return "undefined" != typeof b.preventDefault && b.preventDefault(), i(b), "function" == typeof a && a(!1), !1
                }, i = function () {
                    q.hide(), q.unbind(d.body, "keyup", j), q.unbind(g, "focus", k), l && q.unbind(f, "click", b), m && q.unbind(e, "click", c)
                }, j = function (a) {
                    var d = a.keyCode;
                    (d === t.SPACE && !n || n && d === t.ENTER) && b(a), d === t.ESC && m && c(a)
                }, k = function () {
                    n ? o.focus() : !m || q.buttonReverse ? f.focus() : e.focus()
                }, this.bind(g, "focus", k), this.bind(h, "focus", k), l && this.bind(f, "click", b), m && this.bind(e, "click", c), this.bind(d.body, "keyup", j), this.transition.supported || this.setFocus()
            },
            bind: function (a, b, c) {
                "function" == typeof a.addEventListener ? a.addEventListener(b, c, !1) : a.attachEvent && a.attachEvent("on" + b, c)
            },
            handleErrors: function () {
                if ("undefined" != typeof a.onerror) {
                    var b = this;
                    return a.onerror = function (a, c, d) {
                        b.error("[" + a + " on line " + d + " of " + c + "]", 0)
                    }, !0
                }
                return !1
            },
            appendButtons: function (a, b) {
                return this.buttonReverse ? b + a : a + b
            },
            build: function (a) {
                var b = "", c = a.type, d = a.message, e = a.cssClass || "";
                switch (b += '<div class="alertify-dialog">', b += '<a id="alertify-resetFocusBack" class="alertify-resetFocus" href="#">Reset Focus</a>', "none" === q.buttonFocus && (b += '<a href="#" id="alertify-noneFocus" class="alertify-hidden"></a>'), "prompt" === c && (b += '<div id="alertify-form">'), b += '<article class="alertify-inner">', b += r.message.replace("{{message}}", d), "prompt" === c && (b += r.input), b += r.buttons.holder, b += "</article>", "prompt" === c && (b += "</div>"), b += '<a id="alertify-resetFocus" class="alertify-resetFocus" href="#">Reset Focus</a>', b += "</div>", c) {
                    case"confirm":
                        b = b.replace("{{buttons}}", this.appendButtons(r.buttons.cancel, r.buttons.ok)), b = b.replace("{{ok}}", this.labels.ok).replace("{{cancel}}", this.labels.cancel);
                        break;
                    case"prompt":
                        b = b.replace("{{buttons}}", this.appendButtons(r.buttons.cancel, r.buttons.submit)), b = b.replace("{{ok}}", this.labels.ok).replace("{{cancel}}", this.labels.cancel);
                        break;
                    case"alert":
                        b = b.replace("{{buttons}}", r.buttons.ok), b = b.replace("{{ok}}", this.labels.ok)
                }
                return l.className = "alertify alertify-" + c + " " + e, k.className = "alertify-cover", b
            },
            close: function (a, b) {
                var c, d, e = b && !isNaN(b) ? +b : this.delay, f = this;
                this.bind(a, "click", function () {
                    c(a)
                }), d = function (a) {
                    a.stopPropagation(), f.unbind(this, f.transition.type, d), m.removeChild(this), m.hasChildNodes() || (m.className += " alertify-logs-hidden")
                }, c = function (a) {
                    "undefined" != typeof a && a.parentNode === m && (f.transition.supported ? (f.bind(a, f.transition.type, d), a.className += " alertify-log-hide") : (m.removeChild(a), m.hasChildNodes() || (m.className += " alertify-logs-hidden")))
                }, 0 !== b && setTimeout(function () {
                    c(a)
                }, e)
            },
            dialog: function (a, b, c, e, f) {
                j = d.activeElement;
                var g = function () {
                    m && null !== m.scrollTop && k && null !== k.scrollTop || g()
                };
                if ("string" != typeof a)throw new Error("message must be a string");
                if ("string" != typeof b)throw new Error("type must be a string");
                if ("undefined" != typeof c && "function" != typeof c)throw new Error("fn must be a function");
                return this.init(), g(), u.push({
                    type: b,
                    message: a,
                    callback: c,
                    placeholder: e,
                    cssClass: f
                }), s || this.setup(), this
            },
            extend: function (a) {
                if ("string" != typeof a)throw new Error("extend method must have exactly one paramter");
                return function (b, c) {
                    return this.log(b, a, c), this
                }
            },
            hide: function () {
                var a, b = this;
                u.splice(0, 1), u.length > 0 ? this.setup(!0) : (s = !1, a = function (c) {
                    c.stopPropagation(), b.unbind(l, b.transition.type, a)
                }, this.transition.supported ? (this.bind(l, this.transition.type, a), l.className = "alertify alertify-hide alertify-hidden") : l.className = "alertify alertify-hide alertify-hidden alertify-isHidden", k.className = "alertify-cover alertify-cover-hidden", j.focus())
            },
            init: function () {
                d.createElement("nav"), d.createElement("article"), d.createElement("section"), null == c("alertify-cover") && (k = d.createElement("div"), k.setAttribute("id", "alertify-cover"), k.className = "alertify-cover alertify-cover-hidden", d.body.appendChild(k)), null == c("alertify") && (s = !1, u = [], l = d.createElement("section"), l.setAttribute("id", "alertify"), l.className = "alertify alertify-hidden", d.body.appendChild(l)), null == c("alertify-logs") && (m = d.createElement("section"), m.setAttribute("id", "alertify-logs"), m.className = "alertify-logs alertify-logs-hidden", d.body.appendChild(m)), d.body.setAttribute("tabindex", "0"), this.transition = p()
            },
            log: function (a, b, c) {
                var d = function () {
                    m && null !== m.scrollTop || d()
                };
                return this.init(), d(), m.className = "alertify-logs", this.notify(a, b, c), this
            },
            notify: function (a, b, c) {
                var e = d.createElement("article");
                e.className = "alertify-log" + ("string" == typeof b && "" !== b ? " alertify-log-" + b : ""), e.innerHTML = a, m.appendChild(e), setTimeout(function () {
                    e.className = e.className + " alertify-log-show"
                }, 50), this.close(e, c)
            },
            set: function (a) {
                var b;
                if ("object" != typeof a && a instanceof Array)throw new Error("args must be an object");
                for (b in a)a.hasOwnProperty(b) && (this[b] = a[b])
            },
            setFocus: function () {
                o ? (o.focus(), o.select()) : i.focus()
            },
            setup: function (a) {
                var d, j = u[0], k = this;
                s = !0, d = function (a) {
                    a.stopPropagation(), k.setFocus(), k.unbind(l, k.transition.type, d)
                }, this.transition.supported && !a && this.bind(l, this.transition.type, d), l.innerHTML = this.build(j), g = c("alertify-resetFocus"), h = c("alertify-resetFocusBack"), f = c("alertify-ok") || b, e = c("alertify-cancel") || b, i = "cancel" === q.buttonFocus ? e : "none" === q.buttonFocus ? c("alertify-noneFocus") : f, o = c("alertify-text") || b, n = c("alertify-form") || b, "string" == typeof j.placeholder && "" !== j.placeholder && (o.value = j.placeholder), a && this.setFocus(), this.addListeners(j.callback)
            },
            unbind: function (a, b, c) {
                "function" == typeof a.removeEventListener ? a.removeEventListener(b, c, !1) : a.detachEvent && a.detachEvent("on" + b, c)
            }
        }, {
            alert: function (a, b, c) {
                return q.dialog(a, "alert", b, "", c), this
            }, confirm: function (a, b, c) {
                return q.dialog(a, "confirm", b, "", c), this
            }, extend: q.extend, init: q.init, log: function (a, b, c) {
                return q.log(a, b, c), this
            }, prompt: function (a, b, c, d) {
                return q.dialog(a, "prompt", b, c, d), this
            }, success: function (a, b) {
                return q.log(a, "success", b), this
            }, error: function (a, b) {
                return q.log(a, "error", b), this
            }, set: function (a) {
                q.set(a)
            }, labels: q.labels, debug: q.handleErrors
        }
    }, "function" == typeof define ? define([], function () {
        return new c
    }) : "undefined" == typeof a.alertify && (a.alertify = new c)
}(this);


(function(factory) {
    /* global define */
    if ( typeof define === 'function' && define.amd ) {
        define(['jquery'], factory);
    } else if ( typeof module === 'object' && module.exports ) {
        // Node/CommonJS
        module.exports = function( root, jQuery ) {
            if ( jQuery === undefined ) {
                if ( typeof window !== 'undefined' ) {
                    jQuery = require('jquery');
                } else {
                    jQuery = require('jquery')(root);
                }
            }
            factory(jQuery);
            return jQuery;
        };
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function($) {
    'use strict';

    var pluginName = 'drawsvg',
        defaults = {
            duration: 1000,
            stagger: 200,
            easing: 'swing',
            reverse: false,
            callback: $.noop
        },
        DrawSvg = (function() {
            var fn = function fn(elm, options) {
                var _this = this,
                    opts = $.extend(defaults, options);

                _this.$elm = $(elm);

                if ( !_this.$elm.is('svg') )
                    return;

                _this.options = opts;
                _this.$paths = _this.$elm.find('path');

                _this.totalDuration = opts.duration + (opts.stagger * _this.$paths.length);
                _this.duration = opts.duration / _this.totalDuration;

                _this.$paths.each(function(index, elm) {
                    var pathLength = elm.getTotalLength();

                    elm.pathLen = pathLength;
                    elm.delay = (opts.stagger * index) / _this.totalDuration;
                    elm.style.strokeDasharray = [pathLength, pathLength].join(' ');
                    elm.style.strokeDashoffset = pathLength;
                });

                _this.$elm.attr('class', function(index, classNames) {
                    return [classNames, pluginName + '-initialized'].join(' ');
                });
            };

            fn.prototype.getVal = function(p, easing) {
                return 1 - $.easing[easing](p, p, 0, 1, 1);
            };

            fn.prototype.progress = function progress(prog) {
                var _this = this,
                    opts = _this.options,
                    duration = _this.duration;

                _this.$paths.each(function(index, elm) {
                    var elmStyle = elm.style;

                    if ( prog === 1 ) {
                        elmStyle.strokeDashoffset = 0;
                    } else if ( prog === 0 ) {
                        elmStyle.strokeDashoffset = elm.pathLen + 'px';
                    } else if ( prog >= elm.delay && prog <= duration + elm.delay ) {
                        var p = ((prog - elm.delay) / duration);
                        elmStyle.strokeDashoffset = ((_this.getVal(p, opts.easing) * elm.pathLen) * (opts.reverse ? -1 : 1)) + 'px';
                    }
                });
            };

            fn.prototype.animate = function animate() {
                var _this = this;

                _this.$elm.attr('class', function(index, classNames) {
                    return [classNames, pluginName + '-animating'].join(' ');
                });

                $({ len: 0 }).animate({
                    len: 1
                }, {
                    easing: 'linear',
                    duration: _this.totalDuration,
                    step: function(now, fx) {
                        _this.progress.call(_this, now / fx.end);
                    },
                    complete: function() {
                        _this.options.callback.call(this);

                        _this.$elm.attr('class', function(index, classNames) {
                            return classNames.replace(pluginName + '-animating', '');
                        });
                    }
                });
            };

            return fn;
        })();

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function(method, args) {
        return this.each(function() {
            var data = $.data(this, pluginName);

            ( data && ''+method === method && data[method] ) ?
                data[method](args) :
                $.data(this, pluginName, new DrawSvg(this, method));
        });
    };
}));
