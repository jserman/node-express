/*
	[Discuz!] (C)2001-2099 Comsenz Inc.
	This is NOT a freeware, use is subject to license terms

	$Id: common.js 34611 2014-06-11 10:28:49Z nemohou $
*/
function $(e) {
    return e ? document.getElementById(e) : null
}

function $C(e, t, n) {
    var i = [];
    if (t = t || document, n = n || "*", t.getElementsByClassName) {
        var o = t.getElementsByClassName(e);
        if ("*" != n)
            for (var a = 0, c = o.length; c > a; a++) o[a].tagName.toLowerCase() == n.toLowerCase() && i.push(o[a]);
        else i = o
    } else {
        o = t.getElementsByTagName(n);
        var s = new RegExp("(^|\\s)" + e + "(\\s|$)");
        for (a = 0, c = o.length; c > a; a++) s.test(o[a].className) && i.push(o[a])
    }
    return i
}

function _attachEvent(e, t, n, i) {
    i = i ? i : e, e.addEventListener ? e.addEventListener(t, n, !1) : i.attachEvent && e.attachEvent("on" + t, n)
}

function _detachEvent(e, t, n, i) {
    i = i ? i : e, e.removeEventListener ? e.removeEventListener(t, n, !1) : i.detachEvent && e.detachEvent("on" + t, n)
}

function browserVersion(types) {
    var other = 1;
    for (i in types) {
        var v = types[i] ? types[i] : i;
        if (-1 != USERAGENT.indexOf(v)) {
            var re = new RegExp(v + "(\\/|\\s|:)([\\d\\.]+)", "ig"),
                matches = re.exec(USERAGENT),
                ver = null != matches ? matches[2] : 0;
            other = 0 !== ver && "mozilla" != v ? 0 : other
        } else var ver = 0;
        eval("BROWSER." + i + "= ver")
    }
    "ActiveXObject" in window && eval("BROWSER.ie = true"), BROWSER.other = other
}

function getEvent() {
    if (document.all) return window.event;
    for (func = getEvent.caller; null != func;) {
        var e = func.arguments[0];
        if (e && (e.constructor == Event || e.constructor == MouseEvent || "object" == typeof e && e.preventDefault && e.stopPropagation)) return e;
        func = func.caller
    }
    return null
}

function isUndefined(e) {
    return "undefined" == typeof e
}

function in_array(e, t) {
    if ("string" == typeof e || "number" == typeof e)
        for (var n in t)
            if (t[n] == e) return !0;
    return !1
}

function trim(e) {
    return (e + "").replace(/(\s+)$/g, "").replace(/^\s+/g, "")
}

function strlen(e) {
    return BROWSER.ie && -1 != e.indexOf("\n") ? e.replace(/\r?\n/g, "_").length : e.length
}

function mb_strlen(e) {
    for (var t = 0, n = 0; n < e.length; n++) t += e.charCodeAt(n) < 0 || e.charCodeAt(n) > 255 ? "utf-8" == charset ? 3 : 2 : 1;
    return t
}

function mb_cutstr(e, t, n) {
    var i = 0,
        o = "",
        n = n ? n : "...";
    t -= n.length;
    for (var a = 0; a < e.length; a++) {
        if (i += e.charCodeAt(a) < 0 || e.charCodeAt(a) > 255 ? "utf-8" == charset ? 3 : 2 : 1, i > t) {
            o += n;
            break
        }
        o += e.substr(a, 1)
    }
    return o
}

function preg_replace(e, t, n, i) {
    for (var i = i ? i : "ig", o = e.length, a = 0; o > a; a++) re = new RegExp(e[a], i), n = n.replace(re, "string" == typeof t ? t : t[a] ? t[a] : t[0]);
    return n
}

function htmlspecialchars(e) {
    return preg_replace(["&", "<", ">", '"'], ["&amp;", "&lt;", "&gt;", "&quot;"], e)
}

function display(e) {
    var t = $(e);
    t.style.visibility ? t.style.visibility = "visible" == t.style.visibility ? "hidden" : "visible" : t.style.display = "" == t.style.display ? "none" : ""
}

function checkall(e, t, n) {
    var n = n ? n : "chkall";
    count = 0;
    for (var i = 0; i < e.elements.length; i++) {
        var o = e.elements[i];
        o.name && o.name != n && !o.disabled && (!t || t && o.name.match(t)) && (o.checked = e.elements[n].checked, o.checked && count++)
    }
    return count
}

function setcookie(e, t, n, i, o, a) {
    if (("" == t || 0 > n) && (t = "", n = -2592e3), n) {
        var c = new Date;
        c.setTime(c.getTime() + 1e3 * n)
    }
    o = o ? o : cookiedomain, i = i ? i : cookiepath, document.cookie = escape(cookiepre + e) + "=" + escape(t) + (c ? "; expires=" + c.toGMTString() : "") + (i ? "; path=" + i : "/") + (o ? "; domain=" + o : "") + (a ? "; secure" : "")
}

function getcookie(e, t) {
    e = cookiepre + e;
    var n = document.cookie.indexOf(e),
        i = document.cookie.indexOf(";", n);
    if (-1 == n) return "";
    var o = document.cookie.substring(n + e.length + 1, i > n ? i : document.cookie.length);
    return t ? o : unescape(o)
}

function Ajax(e, t) {
    var n = new Object;
    return n.loading = "璇风◢鍊�...", n.recvType = e ? e : "XML", n.waitId = t ? $(t) : null, n.resultHandle = null, n.sendString = "", n.targetUrl = "", n.setLoading = function (e) {
        "undefined" != typeof e && null !== e && (n.loading = e)
    }, n.setRecvType = function (e) {
        n.recvType = e
    }, n.setWaitId = function (e) {
        n.waitId = "object" == typeof e ? e : $(e)
    }, n.createXMLHttpRequest = function () {
        var e = !1;
        if (window.XMLHttpRequest) e = new XMLHttpRequest, e.overrideMimeType && e.overrideMimeType("text/xml");
        else if (window.ActiveXObject)
            for (var t = ["Microsoft.XMLHTTP", "MSXML.XMLHTTP", "Microsoft.XMLHTTP", "Msxml2.XMLHTTP.7.0", "Msxml2.XMLHTTP.6.0", "Msxml2.XMLHTTP.5.0", "Msxml2.XMLHTTP.4.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP"], n = 0; n < t.length; n++) try {
                if (e = new ActiveXObject(t[n])) return e
            } catch (i) {}
        return e
    }, n.XMLHttpRequest = n.createXMLHttpRequest(), n.showLoading = function () {
        !n.waitId || 4 == n.XMLHttpRequest.readyState && 200 == n.XMLHttpRequest.status || (n.waitId.style.display = "", n.waitId.innerHTML = '<span><img src="' + IMGDIR + '/loading.gif" class="vm"> ' + n.loading + "</span>")
    }, n.processHandle = function () {
        if (4 == n.XMLHttpRequest.readyState && 200 == n.XMLHttpRequest.status)
            if (n.waitId && (n.waitId.style.display = "none"), "HTML" == n.recvType) n.resultHandle(n.XMLHttpRequest.responseText, n);
            else if ("XML" == n.recvType) n.XMLHttpRequest.responseXML && n.XMLHttpRequest.responseXML.lastChild && "parsererror" != n.XMLHttpRequest.responseXML.lastChild.localName ? n.resultHandle(n.XMLHttpRequest.responseXML.lastChild.firstChild.nodeValue, n) : n.resultHandle("", n);
        else if ("JSON" == n.recvType) {
            var e = null;
            try {
                e = new Function("return (" + n.XMLHttpRequest.responseText + ")")()
            } catch (t) {
                e = null
            }
            n.resultHandle(e, n)
        }
    }, n.get = function (e, t) {
        e = hostconvert(e), setTimeout(function () {
            n.showLoading()
        }, 250), n.targetUrl = e, n.XMLHttpRequest.onreadystatechange = n.processHandle, n.resultHandle = t;
        var i = isUndefined(i) ? 0 : i;
        window.XMLHttpRequest ? (n.XMLHttpRequest.open("GET", n.targetUrl), n.XMLHttpRequest.setRequestHeader("X-Requested-With", "XMLHttpRequest"), n.XMLHttpRequest.send(null)) : (n.XMLHttpRequest.open("GET", e, !0), n.XMLHttpRequest.setRequestHeader("X-Requested-With", "XMLHttpRequest"), n.XMLHttpRequest.send())
    }, n.post = function (e, t, i) {
        e = hostconvert(e), setTimeout(function () {
            n.showLoading()
        }, 250), n.targetUrl = e, n.sendString = t, n.XMLHttpRequest.onreadystatechange = n.processHandle, n.resultHandle = i, n.XMLHttpRequest.open("POST", e), n.XMLHttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), n.XMLHttpRequest.setRequestHeader("X-Requested-With", "XMLHttpRequest"), n.XMLHttpRequest.send(n.sendString)
    }, n.getJSON = function (e, t) {
        n.setRecvType("JSON"), n.get(e + "&ajaxdata=json", t)
    }, n.getHTML = function (e, t) {
        n.setRecvType("HTML"), n.get(e + "&ajaxdata=html", t)
    }, n
}

function getHost(e) {
    var t = "null";
    "undefined" != typeof e && null != e || (e = window.location.href);
    var n = /^\w+\:\/\/([^\/]*).*/,
        i = e.match(n);
    return "undefined" != typeof i && null != i && (t = i[1]), t
}

function hostconvert(e) {
    e.match(/^https?:\/\//) || (e = SITEURL + e);
    var t = getHost(e),
        n = getHost().toLowerCase();
    return t && n != t && (e = e.replace(t, n)), e
}

function newfunction(e) {
    for (var t = [], n = 1; n < arguments.length; n++) t.push(arguments[n]);
    return function (n) {
        return doane(n), window[e].apply(window, t), !1
    }
}

function evalscript(e) {
    if (-1 == e.indexOf("<script")) return e;
    for (var t = /<script[^\>]*?>([^\x00]*?)<\/script>/gi, n = []; n = t.exec(e);) {
        var i = /<script[^\>]*?src=\"([^\>]*?)\"[^\>]*?(reload=\"1\")?(?:charset=\"([\w\-]+?)\")?><\/script>/i,
            o = [];
        o = i.exec(n[0]), o ? appendscript(o[1], "", o[2], o[3]) : (i = /<script(.*?)>([^\x00]+?)<\/script>/i, o = i.exec(n[0]), appendscript("", o[2], -1 != o[1].indexOf("reload=")))
    }
    return e
}

function safescript(id, call, seconds, times, timeoutcall, endcall, index) {
    seconds = seconds || 1e3, times = times || 0;
    var checked = !0;
    try {
        "function" == typeof call ? call() : eval(call)
    } catch (e) {
        checked = !1
    }
    if (checked) try {
        index = (index || 1) - 1, safescripts[id][index].si && clearInterval(safescripts[id][index].si), "function" == typeof endcall ? endcall() : eval(endcall)
    } catch (e) {} else safescripts[id] && index ? (index = (index || 1) - 1, safescripts[id][index].times++, safescripts[id][index].times >= times && (clearInterval(safescripts[id][index].si), "function" == typeof timeoutcall ? timeoutcall() : eval(timeoutcall))) : (safescripts[id] = safescripts[id] || [], safescripts[id].push({
        times: 0,
        si: setInterval(function () {
            safescript(id, call, seconds, times, timeoutcall, endcall, safescripts[id].length)
        }, seconds)
    }))
}

function $F(func, args, script) {
    var run = function () {
            var argc = args.length,
                s = "";
            for (i = 0; i < argc; i++) s += ",args[" + i + "]";
            eval("var check = typeof " + func + " == 'function'"), check ? eval(func + "(" + s.substr(1) + ")") : setTimeout(function () {
                checkrun()
            }, 50)
        },
        checkrun = function () {
            JSLOADED[src] ? run() : setTimeout(function () {
                checkrun()
            }, 50)
        };
    return script = script || "common_extra", src = JSPATH + script + ".js?" + VERHASH, JSLOADED[src] || appendscript(src), checkrun()
}

function appendscript(e, t, n, i) {
    var o = hash(e + t);
    if (n || !in_array(o, evalscripts)) {
        n && $(o) && $(o).parentNode.removeChild($(o)), evalscripts.push(o);
        var a = document.createElement("script");
        a.type = "text/javascript", a.id = o, a.charset = i ? i : BROWSER.firefox ? document.characterSet : document.charset;
        try {
            e ? (a.src = e, a.onloadDone = !1, a.onload = function () {
                a.onloadDone = !0, JSLOADED[e] = 1
            }, a.onreadystatechange = function () {
                "loaded" != a.readyState && "complete" != a.readyState || a.onloadDone || (a.onloadDone = !0, JSLOADED[e] = 1)
            }) : t && (a.text = t), document.getElementsByTagName("head")[0].appendChild(a)
        } catch (c) {}
    }
}

function hash(e, t) {
    var t = t ? t : 32,
        n = 0,
        i = 0,
        o = "";
    for (filllen = t - e.length % t, i = 0; i < filllen; i++) e += "0";
    for (; n < e.length;) o = stringxor(o, e.substr(n, t)), n += t;
    return o
}

function stringxor(e, t) {
    for (var n = "", i = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", o = Math.max(e.length, t.length), a = 0; o > a; a++) {
        var c = e.charCodeAt(a) ^ t.charCodeAt(a);
        n += i.charAt(c % 52)
    }
    return n
}

function ajaxupdateevents(e, t) {
    $F("_ajaxupdateevents", arguments, "ajax")
}

function ajaxupdateevent(e) {
    $F("_ajaxupdateevent", arguments, "ajax")
}

function ajaxget(e, t, n, i, o, a) {
    $F("_ajaxget", arguments, "ajax")
}

function ajaxpost(e, t, n, i, o, a) {
    $F("_ajaxpost", arguments, "ajax")
}

function ajaxmenu(e, t, n, i, o, a, c, s) {
    $F("_ajaxmenu", arguments, "ajax")
}

function ajaxinnerhtml(e, t) {
    $F("_ajaxinnerhtml", arguments, "ajax")
}

function showPreview(e, t) {
    var n = $(t);
    n && (n.innerHTML = e.replace(/\n/gi, "<bupdateseccoder />"))
}

function showloading(e, t) {
    var e = e ? e : "block",
        t = t ? t : "璇风◢鍊�...";
    $("ajaxwaitid").innerHTML = t, $("ajaxwaitid").style.display = e
}

function doane(t, n, i) {
    var n = isUndefined(n) ? 1 : n,
        i = isUndefined(i) ? 1 : i;
    return e = t ? t : window.event, e || (e = getEvent()), e ? (n && (e.preventDefault ? e.preventDefault() : e.returnValue = !1), i && (e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !0), e) : null
}

function loadcss(e) {
    if (!CSSLOADED[e]) {
        var t = "undefined" == typeof CSSPATH ? "data/cache/style_" : CSSPATH;
        if ($("css_" + e)) $("css_" + e).href = t + STYLEID + "_" + e + "&" + VERHASH;
        else {
            css = document.createElement("link"), css.id = "css_" + e, css.type = "text/css", css.rel = "stylesheet", css.href = t + STYLEID + "_" + e + ".css?" + VERHASH;
            var n = document.getElementsByTagName("head")[0];
            n.appendChild(css)
        }
        CSSLOADED[e] = 1
    }
}

function showMenu(v) {
    var ctrlid = isUndefined(v.ctrlid) ? v : v.ctrlid,
        showid = isUndefined(v.showid) ? ctrlid : v.showid,
        menuid = isUndefined(v.menuid) ? showid + "_menu" : v.menuid,
        ctrlObj = $(ctrlid),
        menuObj = $(menuid);
    if (menuObj) {
        var mtype = isUndefined(v.mtype) ? "menu" : v.mtype,
            evt = isUndefined(v.evt) ? "mouseover" : v.evt,
            pos = isUndefined(v.pos) ? "43" : v.pos,
            layer = isUndefined(v.layer) ? 1 : v.layer,
            duration = isUndefined(v.duration) ? 2 : v.duration,
            timeout = isUndefined(v.timeout) ? 250 : v.timeout,
            maxh = isUndefined(v.maxh) ? 600 : v.maxh,
            cache = isUndefined(v.cache) ? 1 : v.cache,
            drag = isUndefined(v.drag) ? "" : v.drag,
            dragobj = drag && $(drag) ? $(drag) : menuObj,
            fade = isUndefined(v.fade) ? 0 : v.fade,
            cover = isUndefined(v.cover) ? 0 : v.cover,
            zindex = isUndefined(v.zindex) ? JSMENU.zIndex.menu : v.zindex,
            ctrlclass = isUndefined(v.ctrlclass) ? "" : v.ctrlclass,
            winhandlekey = isUndefined(v.win) ? "" : v.win;
        winhandlekey && ctrlObj && !ctrlObj.getAttribute("fwin") && ctrlObj.setAttribute("fwin", winhandlekey), zindex = cover ? zindex + 500 : zindex, "undefined" == typeof JSMENU.active[layer] && (JSMENU.active[layer] = []);
        for (i in EXTRAFUNC.showmenu) try {
            eval(EXTRAFUNC.showmenu[i] + "()")
        } catch (e) {}
        if ("click" == evt && in_array(menuid, JSMENU.active[layer]) && "win" != mtype) return void hideMenu(menuid, mtype);
        if ("menu" == mtype && hideMenu(layer, mtype), ctrlObj && (ctrlObj.getAttribute("initialized") || (ctrlObj.setAttribute("initialized", !0), ctrlObj.unselectable = !0, ctrlObj.outfunc = "function" == typeof ctrlObj.onmouseout ? ctrlObj.onmouseout : null, ctrlObj.onmouseout = function () {
                this.outfunc && this.outfunc(), 3 > duration && !JSMENU.timer[menuid] && (JSMENU.timer[menuid] = setTimeout(function () {
                    hideMenu(menuid, mtype)
                }, timeout))
            }, ctrlObj.overfunc = "function" == typeof ctrlObj.onmouseover ? ctrlObj.onmouseover : null, ctrlObj.onmouseover = function (e) {
                if (doane(e), this.overfunc && this.overfunc(), "click" == evt) clearTimeout(JSMENU.timer[menuid]), JSMENU.timer[menuid] = null;
                else
                    for (var t in JSMENU.timer) JSMENU.timer[t] && (clearTimeout(JSMENU.timer[t]), JSMENU.timer[t] = null)
            })), !menuObj.getAttribute("initialized") && (menuObj.setAttribute("initialized", !0), menuObj.ctrlkey = ctrlid, menuObj.mtype = mtype, menuObj.layer = layer, menuObj.cover = cover, ctrlObj && ctrlObj.getAttribute("fwin") && (menuObj.scrolly = !0), menuObj.style.position = "absolute", menuObj.style.zIndex = zindex + layer, menuObj.onclick = function (e) {
                return doane(e, 0, 1)
            }, 3 > duration && (duration > 1 && (menuObj.onmouseover = function () {
                clearTimeout(JSMENU.timer[menuid]), JSMENU.timer[menuid] = null
            }), 1 != duration && (menuObj.onmouseout = function () {
                JSMENU.timer[menuid] = setTimeout(function () {
                    hideMenu(menuid, mtype)
                }, timeout)
            })), cover)) {
            var coverObj = document.createElement("div");
            coverObj.id = menuid + "_cover", coverObj.style.position = "absolute", coverObj.style.zIndex = menuObj.style.zIndex - 1, coverObj.style.left = coverObj.style.top = "0px", coverObj.style.width = "100%", coverObj.style.height = Math.max(document.documentElement.clientHeight, document.body.offsetHeight) + "px", coverObj.style.backgroundColor = "#000", coverObj.style.filter = "progid:DXImageTransform.Microsoft.Alpha(opacity=50)", coverObj.style.opacity = .5, coverObj.onclick = function () {
                hideMenu()
            }, $("append_parent").appendChild(coverObj), _attachEvent(window, "load", function () {
                coverObj.style.height = Math.max(document.documentElement.clientHeight, document.body.offsetHeight) + "px"
            }, document)
        }
        if (drag && (dragobj.style.cursor = "move", dragobj.onmousedown = function (e) {
                try {
                    dragMenu(menuObj, e, 1)
                } catch (t) {}
            }), cover && ($(menuid + "_cover").style.display = ""), fade) {
            var O = 0,
                fadeIn = function (e) {
                    if (e > 100) return void clearTimeout(t);
                    menuObj.style.filter = "progid:DXImageTransform.Microsoft.Alpha(opacity=" + e + ")", menuObj.style.opacity = e / 100, e += 20;
                    var t = setTimeout(function () {
                        fadeIn(e)
                    }, 40)
                };
            fadeIn(O), menuObj.fade = !0
        } else menuObj.fade = !1;
        menuObj.style.display = "", ctrlObj && ctrlclass && (ctrlObj.className += " " + ctrlclass, menuObj.setAttribute("ctrlid", ctrlid), menuObj.setAttribute("ctrlclass", ctrlclass)), "*" != pos && setMenuPosition(showid, menuid, pos), BROWSER.ie && BROWSER.ie < 7 && winhandlekey && $("fwin_" + winhandlekey) && ($(menuid).style.left = parseInt($(menuid).style.left) - parseInt($("fwin_" + winhandlekey).style.left) + "px", $(menuid).style.top = parseInt($(menuid).style.top) - parseInt($("fwin_" + winhandlekey).style.top) + "px"), maxh && menuObj.scrollHeight > maxh && (menuObj.style.height = maxh + "px", BROWSER.opera ? menuObj.style.overflow = "auto" : menuObj.style.overflowY = "auto"), duration || setTimeout("hideMenu('" + menuid + "', '" + mtype + "')", timeout), in_array(menuid, JSMENU.active[layer]) || JSMENU.active[layer].push(menuid), menuObj.cache = cache, layer > JSMENU.layer && (JSMENU.layer = layer);
        var hasshow = function (e) {
            for (; e.parentNode && "none" !== ("undefined" == typeof e.currentStyle ? window.getComputedStyle(e, null) : e.currentStyle).display;) e = e.parentNode;
            return e === document
        };
        if (!menuObj.getAttribute("disautofocus")) try {
            for (var focused = !1, tags = ["input", "select", "textarea", "button", "a"], i = 0; i < tags.length; i++) {
                var _all = menuObj.getElementsByTagName(tags[i]);
                if (_all.length)
                    for (j = 0; j < _all.length; j++)
                        if ((!_all[j].type || "hidden" != _all[j].type) && hasshow(_all[j])) {
                            _all[j].className += " hidefocus", _all[j].focus(), focused = !0;
                            var cobj = _all[j];
                            _attachEvent(_all[j], "blur", function () {
                                cobj.className = trim(cobj.className.replace(" hidefocus", ""))
                            });
                            break
                        }
                if (focused) break
            }
        } catch (e) {}
    }
}

function delayShow(ctrlObj, call, time) {
    if ("object" == typeof ctrlObj) {
        var ctrlid = ctrlObj.id;
        call = call || function () {
            showMenu(ctrlid)
        }
    }
    var time = isUndefined(time) ? 500 : time;
    delayShowST = setTimeout(function () {
        "function" == typeof call ? call() : eval(call)
    }, time), ctrlObj.delayinit || (_attachEvent(ctrlObj, "mouseout", function () {
        clearTimeout(delayShowST)
    }), ctrlObj.delayinit = 1)
}

function dragMenu(e, t, n) {
    if (t = t ? t : window.event, 1 == n) {
        if (dragMenuDisabled || in_array(t.target ? t.target.tagName : t.srcElement.tagName, ["TEXTAREA", "INPUT", "BUTTON", "SELECT"])) return;
        JSMENU.drag = [t.clientX, t.clientY], JSMENU.drag[2] = parseInt(e.style.left), JSMENU.drag[3] = parseInt(e.style.top), document.onmousemove = function (t) {
            try {
                dragMenu(e, t, 2)
            } catch (n) {}
        }, document.onmouseup = function (t) {
            try {
                dragMenu(e, t, 3)
            } catch (n) {}
        }, doane(t)
    } else if (2 == n && JSMENU.drag[0]) {
        var i = [t.clientX, t.clientY];
        e.style.left = JSMENU.drag[2] + i[0] - JSMENU.drag[0] + "px", e.style.top = JSMENU.drag[3] + i[1] - JSMENU.drag[1] + "px", e.removeAttribute("top_"), e.removeAttribute("left_"), doane(t)
    } else 3 == n && (JSMENU.drag = [], document.onmousemove = null, document.onmouseup = null)
}

function setMenuPosition(e, t, n) {
    var i = $(e),
        o = $(t ? t : e + "_menu");
    !isUndefined(n) && n || (n = "43");
    var a = parseInt(n.substr(0, 1)),
        c = parseInt(n.substr(1, 1)),
        s = -1 != n.indexOf("!") ? 1 : 0,
        r = 0,
        l = 0,
        u = 0,
        d = 0,
        f = 0,
        m = 0,
        p = 0,
        h = 0,
        v = 0,
        g = 0,
        y = 0,
        w = 0,
        b = 0;
    if (!(!o || a > 0 && !i)) {
        switch (i && (r = fetchOffset(i), l = r.left, u = r.top, d = i.offsetWidth, f = i.offsetHeight), h = o.offsetWidth, v = o.clientWidth, g = o.offsetHeight, y = o.clientHeight, a) {
        case 1:
            w = l, b = u;
            break;
        case 2:
            w = l + d, b = u;
            break;
        case 3:
            w = l + d, b = u + f;
            break;
        case 4:
            w = l, b = u + f
        }
        switch (c) {
        case 0:
            o.style.left = (document.body.clientWidth - o.clientWidth) / 2 + "px", p = (document.documentElement.clientHeight - o.clientHeight) / 2;
            break;
        case 1:
            m = w - h, p = b - g;
            break;
        case 2:
            m = w, p = b - g;
            break;
        case 3:
            m = w, p = b;
            break;
        case 4:
            m = w - h, p = b
        }
        var _ = Math.max(document.documentElement.scrollTop, document.body.scrollTop),
            E = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
        s || (in_array(c, [1, 4]) && 0 > m ? (m = w, in_array(a, [1, 4]) && (m += d)) : m + h > E + document.body.clientWidth && l >= h && (m = w - h, in_array(a, [2, 3]) ? m -= d : 4 == a && (m += d)), in_array(c, [1, 2]) && 0 > p ? (p = b, in_array(a, [1, 2]) && (p += f)) : p + g > _ + document.documentElement.clientHeight && u >= g && (p = b - g, in_array(a, [3, 4]) && (p -= f))), "210" == n.substr(0, 3) && (m += 69 - d / 2, p -= 5, "TEXTAREA" == i.tagName && (m -= d / 2, p += f / 2)), (0 == c || o.scrolly) && (BROWSER.ie && BROWSER.ie < 7 ? 0 == c && (p += _) : (o.scrolly && (p -= _), o.style.position = "fixed")), m && (o.style.left = m + "px"), p && (o.style.top = p + "px"), 0 == c && BROWSER.ie && !document.documentElement.clientHeight && (o.style.position = "absolute", o.style.top = (document.body.clientHeight - o.clientHeight) / 2 + "px"), o.style.clip && !BROWSER.opera && (o.style.clip = "rect(auto, auto, auto, auto)")
    }
}

function hideMenu(e, t) {
    if (e = isUndefined(e) ? "" : e, t = isUndefined(t) ? "menu" : t, "" != e)
        if ("number" != typeof e) {
            if ("string" == typeof e) {
                var n = $(e);
                if (!n || t && n.mtype != t) return;
                var i = "",
                    o = "";
                if ((i = $(n.getAttribute("ctrlid"))) && (o = n.getAttribute("ctrlclass"))) {
                    var a = new RegExp(" " + o);
                    i.className = i.className.replace(a, "")
                }
                clearTimeout(JSMENU.timer[e]);
                var c = function () {
                    n.cache ? "hidden" != n.style.visibility && (n.style.display = "none", n.cover && ($(e + "_cover").style.display = "none")) : (n.parentNode.removeChild(n), n.cover && $(e + "_cover").parentNode.removeChild($(e + "_cover")));
                    var t = [];
                    for (var i in JSMENU.active[n.layer]) e != JSMENU.active[n.layer][i] && t.push(JSMENU.active[n.layer][i]);
                    JSMENU.active[n.layer] = t
                };
                if (n.fade) {
                    var s = 100,
                        r = function (e) {
                            if (0 == e) return clearTimeout(t), void c();
                            n.style.filter = "progid:DXImageTransform.Microsoft.Alpha(opacity=" + e + ")", n.style.opacity = e / 100, e -= 20;
                            var t = setTimeout(function () {
                                r(e)
                            }, 40)
                        };
                    r(s)
                } else c()
            }
        } else
            for (var l in JSMENU.active[e]) hideMenu(JSMENU.active[e][l], t);
    else
        for (var u = 1; u <= JSMENU.layer; u++) hideMenu(u, t)
}

function getCurrentStyle(e, t, n) {
    if (e.style[t]) return e.style[t];
    if (e.currentStyle) return e.currentStyle[t];
    if (document.defaultView.getComputedStyle(e, null)) {
        var i = document.defaultView.getComputedStyle(e, null),
            o = i.getPropertyValue(n);
        return o || (o = i[t]), o
    }
    if (window.getComputedStyle) {
        var i = window.getComputedStyle(e, "");
        return i.getPropertyValue(n)
    }
}

function fetchOffset(e, t) {
    var n = 0,
        i = 0,
        t = t ? t : 0;
    if (e.getBoundingClientRect && !t) {
        var o = e.getBoundingClientRect(),
            a = Math.max(document.documentElement.scrollTop, document.body.scrollTop),
            c = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
        "rtl" == document.documentElement.dir && (c = c + document.documentElement.clientWidth - document.documentElement.scrollWidth), n = o.left + c - document.documentElement.clientLeft, i = o.top + a - document.documentElement.clientTop
    }
    if (0 >= n || 0 >= i)
        for (n = e.offsetLeft, i = e.offsetTop; null != (e = e.offsetParent);) position = getCurrentStyle(e, "position", "position"), "relative" != position && (n += e.offsetLeft, i += e.offsetTop);
    return {
        left: n,
        top: i
    }
}

function showTip(e) {
    $F("_showTip", arguments)
}

function showPrompt(e, t, n, i, o) {
    $F("_showPrompt", arguments)
}

function showCreditPrompt() {
    $F("_showCreditPrompt", [])
}

function showDialog(msg, mode, t, func, cover, funccancel, leftmsg, confirmtxt, canceltxt, closetime, locationtime) {
    clearTimeout(showDialogST), cover = isUndefined(cover) ? "info" == mode ? 0 : 1 : cover, leftmsg = isUndefined(leftmsg) ? "" : leftmsg, mode = in_array(mode, ["confirm", "notice", "info", "right"]) ? mode : "alert";
    var menuid = "fwin_dialog",
        menuObj = $(menuid),
        showconfirm = 1;
    if (confirmtxtdefault = "纭畾", closetime = isUndefined(closetime) ? "" : closetime, closefunc = function () {
            "function" == typeof func ? func() : eval(func), hideMenu(menuid, "dialog")
        }, closetime) return void showPrompt(null, null, "<i>" + msg + "</i>", 1e3 * closetime, "popuptext");
    locationtime = isUndefined(locationtime) ? "" : locationtime, locationtime && (leftmsg = locationtime + " 绉掑悗椤甸潰璺宠浆", showDialogST = setTimeout(closefunc, 1e3 * locationtime), showconfirm = 0), confirmtxt = confirmtxt ? confirmtxt : confirmtxtdefault, canceltxt = canceltxt ? canceltxt : "鍙栨秷", menuObj && hideMenu("fwin_dialog", "dialog"), menuObj = document.createElement("div"), menuObj.style.display = "none", menuObj.className = "fwinmask", menuObj.id = menuid, $("append_parent").appendChild(menuObj);
    var hidedom = "";
    BROWSER.ie || (hidedom = '<style type="text/css">object{visibility:hidden;}</style>');
    var s = hidedom + '<table cellpadding="0" cellspacing="0" class="fwin"><tr><td class="t_l"></td><td class="t_c"></td><td class="t_r"></td></tr><tr><td class="m_l">&nbsp;&nbsp;</td><td class="m_c"><h3 class="flb"><em>';
    s += t ? t : "鎻愮ず淇℃伅", s += '</em><span><a href="javascript:;" id="fwin_dialog_close" class="flbc" onclick="hideMenu(\'' + menuid + "', 'dialog')\" title=\"鍏抽棴\">鍏抽棴</a></span></h3>", "info" == mode ? s += msg ? msg : "" : (s += '<div class="c altw"><div class="' + ("alert" == mode ? "alert_error" : "right" == mode ? "alert_right" : "alert_info") + '"><p>' + msg + "</p></div></div>", s += '<p class="o pns">' + (leftmsg ? '<span class="z xg1">' + leftmsg + "</span>" : "") + (showconfirm ? '<button id="fwin_dialog_submit" value="true" class="pn pnc"><strong>' + confirmtxt + "</strong></button>" : ""), s += "confirm" == mode ? '<button id="fwin_dialog_cancel" value="true" class="pn" onclick="hideMenu(\'' + menuid + "', 'dialog')\"><strong>" + canceltxt + "</strong></button>" : "", s += "</p>"), s += '</td><td class="m_r"></td></tr><tr><td class="b_l"></td><td class="b_c"></td><td class="b_r"></td></tr></table>', menuObj.innerHTML = s, $("fwin_dialog_submit") && ($("fwin_dialog_submit").onclick = function () {
        "function" == typeof func ? func() : eval(func), hideMenu(menuid, "dialog")
    }), $("fwin_dialog_cancel") && ($("fwin_dialog_cancel").onclick = function () {
        "function" == typeof funccancel ? funccancel() : eval(funccancel), hideMenu(menuid, "dialog")
    }, $("fwin_dialog_close").onclick = $("fwin_dialog_cancel").onclick), showMenu({
        mtype: "dialog",
        menuid: menuid,
        duration: 3,
        pos: "00",
        zindex: JSMENU.zIndex.dialog,
        cache: 0,
        cover: cover
    });
    try {
        $("fwin_dialog_submit") && $("fwin_dialog_submit").focus()
    } catch (e) {}
}

function showWindow(e, t, n, i, o, a) {
    n = isUndefined(n) ? "get" : n, i = isUndefined(i) ? 1 : i;
    var c = "fwin_" + e,
        s = $(c),
        r = null,
        l = null,
        u = "";
    if (disallowfloat && -1 != disallowfloat.indexOf(e)) return BROWSER.ie && (t += (-1 != t.indexOf("?") ? "&" : "?") + "referer=" + escape(location.href)), location.href = t, void doane();
    var d = function () {
            "get" == n ? (s.url = t, t += (t.search(/\?/) > 0 ? "&" : "?") + "infloat=yes&handlekey=" + e, t += -1 == i ? "&t=" + +new Date : "", BROWSER.ie && t.indexOf("referer=") < 0 && (t = t + "&referer=" + encodeURIComponent(location)), ajaxget(t, "fwin_content_" + e, null, "", "", function () {
                f(), m()
            })) : "post" == n && (s.act = $(t).action, ajaxpost(t, "fwin_content_" + e, "", "", "", function () {
                f(), m()
            })), 6 != parseInt(BROWSER.ie) && (l = setTimeout(function () {
                showDialog("", "info", '<img src="' + IMGDIR + '/loading.gif"> 璇风◢鍊�...')
            }, 500))
        },
        f = function () {
            clearTimeout(l);
            for (var t = s.getElementsByTagName("*"), n = !1, i = 0; i < t.length; i++) t[i].id && t[i].setAttribute("fwin", e), "flb" != t[i].className || n || (t[i].id || (t[i].id = "fctrl_" + e), r = t[i].id, n = !0)
        },
        m = function () {
            hideMenu("fwin_dialog", "dialog"), v = {
                mtype: "win",
                menuid: c,
                duration: 3,
                pos: "00",
                zindex: JSMENU.zIndex.win,
                drag: null == typeof r ? "" : r,
                cache: i
            };
            for (e in o) v[e] = o[e];
            showMenu(v)
        };
    s ? "get" == n && (t != s.url || 1 != i) || "post" == n && $(t).action != s.act ? d() : m() : (s = document.createElement("div"), s.id = c, s.className = "fwinmask", s.style.display = "none", $("append_parent").appendChild(s), evt = ' style="cursor:move" onmousedown="dragMenu($(\'' + c + "'), event, 1)\" ondblclick=\"hideWindow('" + e + "')\"", BROWSER.ie || (u = '<style type="text/css">object{visibility:hidden;}</style>'), s.innerHTML = u + '<table cellpadding="0" cellspacing="0" class="fwin"><tr><td class="t_l"></td><td class="t_c"' + evt + '></td><td class="t_r"></td></tr><tr><td class="m_l"' + evt + ')">&nbsp;&nbsp;</td><td class="m_c" id="fwin_content_' + e + '"></td><td class="m_r"' + evt + '"></td></tr><tr><td class="b_l"></td><td class="b_c"' + evt + '></td><td class="b_r"></td></tr></table>', "html" == n ? ($("fwin_content_" + e).innerHTML = t, f(), m()) : d()), doane(), 1 == a && jq("#fwin_nav").addClass("add")
}

function showError(e) {
    var t = /<script[^\>]*?>([^\x00]*?)<\/script>/gi;
    e = e.replace(t, ""), "" !== e && showDialog(e, "alert", "閿欒淇℃伅", null, !0, null, "", "", "", 3)
}

function hideWindow(e, t, n) {
    t = isUndefined(t) ? 1 : t, n = isUndefined(n) ? 1 : n, hideMenu("fwin_" + e, "win"), n && $("fwin_" + e) && $("append_parent").removeChild($("fwin_" + e)), t && hideMenu()
}

function AC_FL_RunContent() {
    var e = "",
        t = AC_GetArgs(arguments, "clsid:d27cdb6e-ae6d-11cf-96b8-444553540000", "application/x-shockwave-flash");
    if (BROWSER.ie && !BROWSER.opera) {
        e += "<object ";
        for (var n in t.objAttrs) e += n + '="' + t.objAttrs[n] + '" ';
        e += ">";
        for (var n in t.params) e += '<param name="' + n + '" value="' + t.params[n] + '" /> ';
        e += "</object>"
    } else {
        e += "<embed ";
        for (var n in t.embedAttrs) e += n + '="' + t.embedAttrs[n] + '" ';
        e += "></embed>"
    }
    return e
}

function AC_GetArgs(e, t, n) {
    var i = new Object;
    i.embedAttrs = new Object, i.params = new Object, i.objAttrs = new Object;
    for (var o = 0; o < e.length; o += 2) {
        var a = e[o].toLowerCase();
        switch (a) {
        case "classid":
            break;
        case "pluginspage":
            i.embedAttrs[e[o]] = "http://www.macromedia.com/go/getflashplayer";
            break;
        case "src":
            i.embedAttrs[e[o]] = e[o + 1], i.params.movie = e[o + 1];
            break;
        case "codebase":
            i.objAttrs[e[o]] = "http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0";
            break;
        case "onafterupdate":
        case "onbeforeupdate":
        case "onblur":
        case "oncellchange":
        case "onclick":
        case "ondblclick":
        case "ondrag":
        case "ondragend":
        case "ondragenter":
        case "ondragleave":
        case "ondragover":
        case "ondrop":
        case "onfinish":
        case "onfocus":
        case "onhelp":
        case "onmousedown":
        case "onmouseup":
        case "onmouseover":
        case "onmousemove":
        case "onmouseout":
        case "onkeypress":
        case "onkeydown":
        case "onkeyup":
        case "onload":
        case "onlosecapture":
        case "onpropertychange":
        case "onreadystatechange":
        case "onrowsdelete":
        case "onrowenter":
        case "onrowexit":
        case "onrowsinserted":
        case "onstart":
        case "onscroll":
        case "onbeforeeditfocus":
        case "onactivate":
        case "onbeforedeactivate":
        case "ondeactivate":
        case "type":
        case "id":
            i.objAttrs[e[o]] = e[o + 1];
            break;
        case "width":
        case "height":
        case "align":
        case "vspace":
        case "hspace":
        case "class":
        case "title":
        case "accesskey":
        case "name":
        case "tabindex":
            i.embedAttrs[e[o]] = i.objAttrs[e[o]] = e[o + 1];
            break;
        default:
            i.embedAttrs[e[o]] = i.params[e[o]] = e[o + 1]
        }
    }
    return i.objAttrs.classid = t, n && (i.embedAttrs.type = n), i
}

function simulateSelect(selectId, widthvalue) {
    var selectObj = $(selectId);
    if (selectObj) {
        if (BROWSER.other) return void(selectObj.getAttribute("change") && (selectObj.onchange = function () {
            eval(selectObj.getAttribute("change"))
        }));
        for (var widthvalue = widthvalue ? widthvalue : 70, defaultopt = selectObj.options[0] ? selectObj.options[0].innerHTML : "", defaultv = "", menuObj = document.createElement("div"), ul = document.createElement("ul"), handleKeyDown = function (e) {
                e = BROWSER.ie ? event : e, 40 != e.keyCode && 38 != e.keyCode || doane(e)
            }, selectwidth = (selectObj.getAttribute("width", i) ? selectObj.getAttribute("width", i) : widthvalue) + "px", tabindex = selectObj.getAttribute("tabindex", i) ? selectObj.getAttribute("tabindex", i) : 1, i = 0; i < selectObj.options.length; i++) {
            var li = document.createElement("li");
            li.innerHTML = selectObj.options[i].innerHTML, li.k_id = i, li.k_value = selectObj.options[i].value, selectObj.options[i].selected && (defaultopt = selectObj.options[i].innerHTML, defaultv = selectObj.options[i].value, li.className = "current", selectObj.setAttribute("selecti", i)), li.onclick = function () {
                if ($(selectId + "_ctrl").innerHTML != this.innerHTML) {
                    var lis = menuObj.getElementsByTagName("li");
                    lis[$(selectId).getAttribute("selecti")].className = "", this.className = "current", $(selectId + "_ctrl").innerHTML = this.innerHTML, $(selectId).setAttribute("selecti", this.k_id), $(selectId).options.length = 0, $(selectId).options[0] = new Option("", this.k_value), eval(selectObj.getAttribute("change"))
                }
                return hideMenu(menuObj.id), !1
            }, ul.appendChild(li)
        }
        selectObj.options.length = 0, selectObj.options[0] = new Option("", defaultv), selectObj.style.display = "none", selectObj.outerHTML += '<a href="javascript:;" id="' + selectId + '_ctrl" style="width:' + selectwidth + '" tabindex="' + tabindex + '">' + defaultopt + "</a>", menuObj.id = selectId + "_ctrl_menu", menuObj.className = "sltm", menuObj.style.display = "none", menuObj.style.width = selectwidth, menuObj.appendChild(ul), $("append_parent").appendChild(menuObj), $(selectId + "_ctrl").onclick = function (e) {
            $(selectId + "_ctrl_menu").style.width = selectwidth, showMenu({
                ctrlid: "loginfield" == selectId ? "account" : selectId + "_ctrl",
                menuid: selectId + "_ctrl_menu",
                evt: "click",
                pos: "43"
            }), doane(e)
        }, $(selectId + "_ctrl").onfocus = menuObj.onfocus = function () {
            _attachEvent(document.body, "keydown", handleKeyDown)
        }, $(selectId + "_ctrl").onblur = menuObj.onblur = function () {
            _detachEvent(document.body, "keydown", handleKeyDown)
        }, $(selectId + "_ctrl").onkeyup = function (e) {
            if (e = e ? e : window.event, value = e.keyCode, 40 == value || 38 == value) "none" == menuObj.style.display ? $(selectId + "_ctrl").onclick() : (t = menuObj.getElementsByTagName("li"), selecti = selectObj.getAttribute("selecti"), t[selecti].className = "", 40 == value ? selecti = parseInt(selecti) + 1 : 38 == value && (selecti = parseInt(selecti) - 1), selecti < 0 ? selecti = t.length - 1 : selecti > t.length - 1 && (selecti = 0), t[selecti].className = "current", selectObj.setAttribute("selecti", selecti), t[selecti].parentNode.scrollTop = t[selecti].offsetTop);
            else if (13 == value) {
                var t = menuObj.getElementsByTagName("li");
                t[selectObj.getAttribute("selecti")].onclick()
            } else 27 == value && hideMenu(menuObj.id)
        }
    }
}

function switchTab(e, t, n, i) {
    $F("_switchTab", arguments)
}

function imageRotate(e, t) {
    $F("_imageRotate", arguments)
}

function thumbImg(e, t) {
    if (e) {
        if (e.onload = null, file = e.src, zw = e.offsetWidth, zh = e.offsetHeight, zw < 2) return e.id || (e.id = "img_" + Math.random()), void setTimeout("thumbImg($('" + e.id + "'), " + t + ")", 100);
        zr = zw / zh, t = t ? 1 : 0, t ? (fixw = e.getAttribute("_width"), fixh = e.getAttribute("_height"), zw > fixw && (zw = fixw, zh = zw / zr), zh > fixh && (zh = fixh, zw = zh * zr)) : (fixw = "undefined" == typeof imagemaxwidth ? "600" : imagemaxwidth, zw > fixw && (zw = fixw, zh = zw / zr, e.style.cursor = "pointer", e.onclick || (e.onclick = function () {
            zoom(e, e.src)
        }))), e.width = zw, e.height = zh
    }
}

function zoom(e, t, n, i, o) {
    $F("_zoom", arguments)
}

function showselect(e, t, n, i) {
    $F("_showselect", arguments)
}

function showColorBox(e, t, n, i) {
    $F("_showColorBox", arguments)
}

function ctrlEnter(e, t, n) {
    return isUndefined(n) && (n = 0), (e.ctrlKey || n) && 13 == e.keyCode ? ($(t).click(), !1) : !0
}

function parseurl(e, t, n) {
    if (isUndefined(n) && (n = !0), n && (e = e.replace(/\[code\]([\s\S]+?)\[\/code\]/gi, function (e, t) {
            return codetag(t, -1)
        })), e = e.replace(/([^>=\]"'\/]|^)((((https?|ftp):\/\/)|www\.)([\w\-]+\.)*[\w\-\u4e00-\u9fa5]+\.([\.a-zA-Z0-9]+|\u4E2D\u56FD|\u7F51\u7EDC|\u516C\u53F8)((\?|\/|:)+[\w\.\/=\?%\-&~`@':+!]*)+\.(swf|flv))/gi, "$1[flash]$2[/flash]"), e = e.replace(/([^>=\]"'\/]|^)((((https?|ftp):\/\/)|www\.)([\w\-]+\.)*[\w\-\u4e00-\u9fa5]+\.([\.a-zA-Z0-9]+|\u4E2D\u56FD|\u7F51\u7EDC|\u516C\u53F8)((\?|\/|:)+[\w\.\/=\?%\-&~`@':+!]*)+\.(mp3|wma))/gi, "$1[audio]$2[/audio]"), e = e.replace(/([^>=\]"'\/@]|^)((((https?|ftp|gopher|news|telnet|rtsp|mms|callto|bctp|ed2k|thunder|qqdl|synacast):\/\/))([\w\-]+\.)*[:\.@\-\w\u4e00-\u9fa5]+\.([\.a-zA-Z0-9]+|\u4E2D\u56FD|\u7F51\u7EDC|\u516C\u53F8)((\?|\/|:)+[\w\.\/=\?%\-&;~`@':+!#]*)*)/gi, "html" == t ? '$1<a href="$2" target="_blank">$2</a>' : "$1[url]$2[/url]"), e = e.replace(/([^\w>=\]"'\/@]|^)((www\.)([\w\-]+\.)*[:\.@\-\w\u4e00-\u9fa5]+\.([\.a-zA-Z0-9]+|\u4E2D\u56FD|\u7F51\u7EDC|\u516C\u53F8)((\?|\/|:)+[\w\.\/=\?%\-&;~`@':+!#]*)*)/gi, "html" == t ? '$1<a href="$2" target="_blank">$2</a>' : "$1[url]$2[/url]"),
        e = e.replace(/([^\w->=\]:"'\.\/]|^)(([\-\.\w]+@[\.\-\w]+(\.\w+)+))/gi, "html" == t ? '$1<a href="mailto:$2">$2</a>' : "$1[email]$2[/email]"), n)
        for (var i = 0; i <= DISCUZCODE.num; i++) e = e.replace("[	DISCUZ_CODE_" + i + "	]", DISCUZCODE.html[i]);
    return e
}

function codetag(e, t) {
    var t = t ? t : 1;
    return DISCUZCODE.num++, t > 0 && "undefined" != typeof wysiwyg && wysiwyg && (e = e.replace(/<br[^\>]*>/gi, "\n")), e = e.replace(/\$/gi, "$$"), DISCUZCODE.html[DISCUZCODE.num] = "[code]" + e + "[/code]", "[	DISCUZ_CODE_" + DISCUZCODE.num + "	]"
}

function saveUserdata(name, data) {
    try {
        window.localStorage ? localStorage.setItem("Discuz_" + name, data) : window.sessionStorage && sessionStorage.setItem("Discuz_" + name, data)
    } catch (e) {
        if (BROWSER.ie && data.length < 54889) with(document.documentElement) setAttribute("value", data), save("Discuz_" + name)
    }
    setcookie("clearUserdata", "", -1)
}

function loadUserdata(name) {
    if (window.localStorage) return localStorage.getItem("Discuz_" + name);
    if (window.sessionStorage) return sessionStorage.getItem("Discuz_" + name);
    if (BROWSER.ie) with(document.documentElement) return load("Discuz_" + name), getAttribute("value")
}

function initTab(e, t) {
    $F("_initTab", arguments)
}

function openDiy() {
    DYNAMICURL ? window.location.href = SITEURL + DYNAMICURL + (DYNAMICURL.indexOf("?") < 0 ? "?" : "&") + "diy=yes" : window.location.href = (window.location.href + "").replace(/[\?\&]diy=yes/g, "").split("#")[0] + (window.location.search && window.location.search.indexOf("?diy=yes") < 0 ? "&diy=yes" : "?diy=yes")
}

function hasClass(e, t) {
    return e.className && -1 != (" " + e.className + " ").indexOf(" " + t + " ")
}

function runslideshow() {
    $F("_runslideshow", [])
}

function toggle_collapse(e, t, n, i) {
    $F("_toggle_collapse", arguments)
}

function updatestring(e, t, n) {
    return t = "_" + t + "_", n ? e.replace(t, "") : -1 == e.indexOf(t) ? e + t : e
}

function getClipboardData() {
    window.document.clipboardswf.SetVariable("str", CLIPBOARDSWFDATA)
}

function setCopy(e, t) {
    $F("_setCopy", arguments)
}

function copycode(e) {
    $F("_copycode", arguments)
}

function showdistrict(e, t, n, i, o) {
    $F("_showdistrict", arguments)
}

function setDoodle(e, t, n, i, o) {
    $F("_setDoodle", arguments)
}

function initSearchmenu(e, t) {
    var n = "/search.php?searchsubmit=yes";
    "undefined" != typeof t && null != t && "" != t || (t = n);
    var i = $(e + "_txt");
    i || (i = $(e));
    var o = i.className;
    if (i.className = o + " xg1", "placeholder" in document.createElement("input") ? ("璇疯緭鍏ユ悳绱㈠唴瀹�" == i.value && (i.value = ""), i.placeholder = "璇疯緭鍏ユ悳绱㈠唴瀹�") : (i.onfocus = function () {
            "璇疯緭鍏ユ悳绱㈠唴瀹�" == i.value && (i.value = "", i.className = o)
        }, i.onblur = function () {
            "" == i.value && (i.value = "璇疯緭鍏ユ悳绱㈠唴瀹�", i.className = o + " xg1")
        }), !$(e + "_type_menu")) return !1;
    for (var a = $(e + "_type"), c = $(e + "_type_menu").getElementsByTagName("a"), s = i.form, r = 0; r < c.length; r++) "curtype" == c[r].className && (a.innerHTML = c[r].innerHTML, $(e + "_mod").value = c[r].rel, s.method = "post", "forum" != c[r].rel && "curforum" != c[r].rel || n == t ? s.action = n : (s.action = t, s.method = "get", $("srchFId") && ($("srchFId").value = "forum" == c[r].rel ? 0 : $("srchFId").value))), c[r].onclick = function () {
        a.innerHTML = this.innerHTML, $(e + "_mod").value = this.rel, s.method = "post", "forum" != this.rel && "curforum" != this.rel || n == t ? s.action = n : (s.action = t, s.method = "get", $("srchFId") && ($("srchFId").value = "forum" == this.rel ? 0 : $("srchFId").value))
    }
}

function searchFocus(e) {
    "璇疯緭鍏ユ悳绱㈠唴瀹�" == e.value && (e.value = ""), null != $("cloudsearchquery") && ($("cloudsearchquery").value = e.value)
}

function extstyle(e) {
    $F("_extstyle", arguments)
}

function widthauto(e) {
    $F("_widthauto", arguments)
}

function updatesecqaa(e) {
    $F("_updatesecqaa", arguments)
}

function updateseccode(e) {
    $F("_updateseccode", arguments)
}

function checksec(e, t, n, i) {
    $F("_checksec", arguments)
}

function createPalette(e, t, n) {
    $F("_createPalette", arguments)
}

function showForummenu(e) {
    $F("_showForummenu", arguments)
}

function showUserApp() {
    $F("_showUserApp", arguments)
}

function cardInit() {
    for (var e = function (e) {
            BROWSER.ie && BROWSER.ie < 7 && -1 != e.href.indexOf("username") || (pos = "1" == e.getAttribute("c") ? "43" : e.getAttribute("c"), USERCARDST = setTimeout(function () {
                ajaxmenu(e, 500, 1, 2, pos, null, "p_pop card")
            }, 250))
        }, t = {}, n = document.body.getElementsByTagName("a"), i = 0; i < n.length; i++)
        if (n[i].getAttribute("c")) {
            var o = n[i].getAttribute("href", 1);
            "undefined" == typeof t[o] && (t[o] = Math.round(1e4 * Math.random())), n[i].setAttribute("mid", "card_" + t[o]), n[i].onmouseover = function () {
                e(this)
            }, n[i].onmouseout = function () {
                clearTimeout(USERCARDST)
            }
        }
}

function navShow(e) {
    var t = $("snav_mn_" + e);
    if (t) {
        var n = $("mu").getElementsByTagName("ul");
        for (i = 0; i < n.length; i++) "cl current" != n[i].className && (n[i].style.display = "none");
        "cl current" != t.className && (showMenu({
            ctrlid: "mn_" + e,
            menuid: "snav_mn_" + e,
            pos: "*"
        }), t.className = "cl floatmu", t.style.width = $("nv").clientWidth + "px", t.style.display = "")
    }
}

function strLenCalc(e, t, n) {
    for (var i = e.value, n = n ? n : 200, o = n, a = strlen(i), c = 0; c < i.length; c++)(i.charCodeAt(c) < 0 || i.charCodeAt(c) > 255) && (o -= "utf-8" == charset ? 2 : 1);
    o >= a ? $(t).innerHTML = o - a : e.value = mb_cutstr(i, n, 0)
}

function patchNotice() {
    $("patch_notice") && ajaxget("misc.php?mod=patch&action=patchnotice", "patch_notice", "")
}

function pluginNotice() {
    $("plugin_notice") && ajaxget("misc.php?mod=patch&action=pluginnotice", "plugin_notice", "")
}

function ipNotice() {
    $("ip_notice") && ajaxget("misc.php?mod=patch&action=ipnotice&_r=" + Math.random(), "ip_notice", "")
}

function noticeTitle() {
    NOTICETITLE = {
        State: 0,
        oldTitle: NOTICECURTITLE,
        flashNumber: 0,
        sleep: 15
    }, getcookie("noticeTitle") ? window.setTimeout("noticeTitleFlash();", 500) : window.setInterval("noticeTitleFlash();", 500), setcookie("noticeTitle", 1, 600)
}

function noticeTitleFlash() {
    (NOTICETITLE.flashNumber < 5 || NOTICETITLE.flashNumber > 4 && !NOTICETITLE.State) && (document.title = (NOTICETITLE.State ? "銆愩€€銆€銆€銆�" : "銆愭柊鎻愰啋銆�") + NOTICETITLE.oldTitle, NOTICETITLE.State = !NOTICETITLE.State), NOTICETITLE.flashNumber = NOTICETITLE.flashNumber < NOTICETITLE.sleep ? ++NOTICETITLE.flashNumber : 0
}

function relatedlinks(e) {
    $F("_relatedlinks", arguments)
}

function con_handle_response(e) {
    return e
}

function showTopLink() {
    var e = $("ft");
    if (e) {
        var t = $("scrolltop"),
            n = parseInt(document.documentElement.clientHeight),
            i = parseInt(document.body.getBoundingClientRect().top),
            o = parseInt(e.clientWidth),
            a = t.clientWidth;
        if (1e3 > o) {
            var c = parseInt(fetchOffset(e).left);
            c = a > c ? 2 * c - a : c, t.style.left = o + c + "px"
        } else t.style.left = "auto", t.style.right = 0;
        BROWSER.ie && BROWSER.ie < 7 && (t.style.top = n - i - 150 + "px"), -100 > i ? t.style.visibility = "visible" : t.style.visibility = "hidden"
    }
}

function showCreditmenu() {
    $F("_showCreditmenu", [])
}

function showUpgradeinfo() {
    $F("_showUpgradeinfo", [])
}

function addFavorite(e, t) {
    try {
        window.external.addFavorite(e, t)
    } catch (n) {
        try {
            window.sidebar.addPanel(t, e, "")
        } catch (n) {
            showDialog("璇锋寜 Ctrl+D 閿坊鍔犲埌鏀惰棌澶�", "notice")
        }
    }
}

function setHomepage(e) {
    BROWSER.ie ? (document.body.style.behavior = "url(#default#homepage)", document.body.setHomePage(e)) : (showDialog("闈� IE 娴忚鍣ㄨ鎵嬪姩灏嗘湰绔欒涓洪椤�", "notice"), doane())
}

function setShortcut() {
    var e = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
    loadUserdata("setshortcut") || e || $F("_setShortcut", [])
}

function smilies_show(e, t, n) {
    $F("_smilies_show", arguments, "smilies")
}

function showfocus(e, t) {
    var n = parseInt($("focuscur").innerHTML);
    "prev" == e ? (n = 1 > n - 1 ? focusnum : n - 1, t || window.clearInterval(focusautoshow)) : "next" == e && (n = n + 1 > focusnum ? 1 : n + 1, t || window.clearInterval(focusautoshow)), $("focuscur").innerHTML = n, $("focus_con").innerHTML = $("focus_" + (n - 1)).innerHTML
}

function rateStarHover(e, t) {
    0 == t ? $(e).style.width = "" : $(e).style.width = 16 * t + "px"
}

function rateStarSet(e, t, n) {
    $(n).value = t, $(e).className = "star star" + t
}

function img_onmouseoverfunc(e) {
    "function" == typeof showsetcover && showsetcover(e)
}

function toggleBlind(e) {
    e && (loadUserdata("is_blindman") ? (saveUserdata("is_blindman", ""), e.title = "寮€鍚緟鍔╄闂�") : (saveUserdata("is_blindman", "1"), e.title = "鍏抽棴杈呭姪璁块棶"))
}

function checkBlind() {
    var e = $("switchblind");
    e && (loadUserdata("is_blindman") ? e.title = "鍏抽棴杈呭姪璁块棶" : e.title = "寮€鍚緟鍔╄闂�")
}

function getElementOffset(e) {
    for (var t = e.offsetLeft, n = e.offsetTop; e = e.offsetParent;) t += e.offsetLeft, n += e.offsetTop;
    return "fixed" == $("nv").style.position && (n -= parseInt($("nv").style.height)), {
        left: t,
        top: n
    }
}

function mobileplayer() {
    var e = navigator.platform,
        t = navigator.userAgent,
        n = /iPhone|iPad|iPod/.test(e) && t.indexOf("AppleWebKit") > -1,
        i = t.indexOf("Android") > -1;
    return !(!n && !i)
}

function setCookie(e, t, n) {
    var i = new Date;
    i.setDate(i.getDate() + n), document.cookie = e + "=" + escape(t) + (null == n ? "" : ";expires=" + i.toGMTString())
}

function getCookie(e) {
    return document.cookie.length > 0 && (c_start = document.cookie.indexOf(e + "="), -1 != c_start) ? (c_start = c_start + e.length + 1, c_end = document.cookie.indexOf(";", c_start), -1 == c_end && (c_end = document.cookie.length), unescape(document.cookie.substring(c_start, c_end))) : ""
}

function geturlparam(e) {
    var t = new RegExp("(^|&)" + e + "=([^&]*)(&|$)", "i"),
        n = window.location.search.substr(1).match(t);
    return null != n ? unescape(n[2]) : null
}
var delayShowST = null,
    dragMenuDisabled = !1,
    showDialogST = null,
    zoomstatus = 1,
    secST = new Array,
    BROWSER = {},
    USERAGENT = navigator.userAgent.toLowerCase();
browserVersion({
    ie: "msie",
    firefox: "",
    chrome: "",
    opera: "",
    safari: "",
    mozilla: "",
    webkit: "",
    maxthon: "",
    qq: "qqbrowser",
    rv: "rv"
}), BROWSER.safari && (BROWSER.firefox = !0), BROWSER.opera = BROWSER.opera ? opera.version() : 0, HTMLNODE = document.getElementsByTagName("head")[0].parentNode, BROWSER.ie && (BROWSER.iemode = parseInt("undefined" != typeof document.documentMode ? document.documentMode : BROWSER.ie), HTMLNODE.className = "ie_all ie" + BROWSER.iemode);
var CSSLOADED = [],
    JSLOADED = [],
    JSMENU = [];
JSMENU.active = [], JSMENU.timer = [], JSMENU.drag = [], JSMENU.layer = 0, JSMENU.zIndex = {
    win: 200,
    menu: 300,
    dialog: 400,
    prompt: 500
}, JSMENU["float"] = "";
var CURRENTSTYPE = null,
    discuz_uid = isUndefined(discuz_uid) ? 0 : discuz_uid,
    creditnotice = isUndefined(creditnotice) ? "" : creditnotice,
    cookiedomain = isUndefined(cookiedomain) ? "" : cookiedomain,
    cookiepath = isUndefined(cookiepath) ? "" : cookiepath,
    EXTRAFUNC = [],
    EXTRASTR = "";
EXTRAFUNC.showmenu = [];
var DISCUZCODE = [];
DISCUZCODE.num = "-1", DISCUZCODE.html = [];
var USERABOUT_BOX = !0,
    USERCARDST = null,
    CLIPBOARDSWFDATA = "",
    NOTICETITLE = [],
    NOTICECURTITLE = document.title,
    safescripts = {},
    evalscripts = [];
BROWSER.firefox && window.HTMLElement && (HTMLElement.prototype.__defineGetter__("innerText", function () {
    for (var e = "", t = this.childNodes, n = 0; n < t.length; n++) 1 == t[n].nodeType ? e += "BR" == t[n].tagName ? "\n" : t[n].innerText : 3 == t[n].nodeType && (e += t[n].nodeValue);
    return e
}), HTMLElement.prototype.__defineSetter__("innerText", function (e) {
    this.textContent = e
}), HTMLElement.prototype.__defineSetter__("outerHTML", function (e) {
    var t = this.ownerDocument.createRange();
    t.setStartBefore(this);
    var n = t.createContextualFragment(e);
    return this.parentNode.replaceChild(n, this), e
}), HTMLElement.prototype.__defineGetter__("outerHTML", function () {
    for (var e, t = this.attributes, n = "<" + this.tagName.toLowerCase(), i = 0; i < t.length; i++) e = t[i], e.specified && (n += " " + e.name + '="' + e.value + '"');
    return this.canHaveChildren ? n + ">" + this.innerHTML + "</" + this.tagName.toLowerCase() + ">" : n + ">"
}), HTMLElement.prototype.__defineGetter__("canHaveChildren", function () {
    switch (this.tagName.toLowerCase()) {
    case "area":
    case "base":
    case "basefont":
    case "col":
    case "frame":
    case "hr":
    case "img":
    case "br":
    case "input":
    case "isindex":
    case "link":
    case "meta":
    case "param":
        return !1
    }
    return !0
})), "undefined" == typeof IN_ADMINCP && ("" != creditnotice && getcookie("creditnotice") && _attachEvent(window, "load", showCreditPrompt, document), "undefined" != typeof showusercard && 1 == showusercard && _attachEvent(window, "load", cardInit, document)), BROWSER.ie && document.documentElement.addBehavior && document.documentElement.addBehavior("#default#userdata");