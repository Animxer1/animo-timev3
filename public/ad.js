var adcashMacros = {};
var zoneNativeSett = {
  container: "awn",
  baseUrl: "onclickalgo.com/script/native.php",
  r: [6862394],
};
var urls = {
  cdnUrls: ["//superonclick.com", "//geniusonclick.com"],
  cdnIndex: 0,
  rand: Math.random(),
  events: ["click", "mousedown", "touchstart"],
  useFixer: !0,
  onlyFixer: !1,
  fixerBeneath: !1,
};
function acPrefetch(e) {
  var t,
    n = document.createElement("link");
  (t =
    void 0 !== document.head
      ? document.head
      : document.getElementsByTagName("head")[0]),
    (n.rel = "dns-prefetch"),
    (n.href = e),
    t.appendChild(n);
  var r = document.createElement("link");
  (r.rel = "preconnect"), (r.href = e), t.appendChild(r);
}
var nativeInit = new (function () {
    var a = "",
      i = Math.floor(1e12 * Math.random()),
      o = Math.floor(1e12 * Math.random()),
      t = window.location.protocol,
      c = {
        _0: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
        encode: function (e) {
          for (var t, n, r, a, i, o, c = "", s = 0; s < e.length; )
            (a = (t = e.charCodeAt(s++)) >> 2),
              (t = ((3 & t) << 4) | ((n = e.charCodeAt(s++)) >> 4)),
              (i = ((15 & n) << 2) | ((r = e.charCodeAt(s++)) >> 6)),
              (o = 63 & r),
              isNaN(n) ? (i = o = 64) : isNaN(r) && (o = 64),
              (c =
                c +
                this._0.charAt(a) +
                this._0.charAt(t) +
                this._0.charAt(i) +
                this._0.charAt(o));
          return c;
        },
      };
    this.init = function () {
      e();
    };
    var e = function () {
        var e = document.createElement("script");
        e.setAttribute("data-cfasync", !1),
          (e.src = "//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"),
          (e.onerror = function () {
            !0, r(), n();
          }),
          (e.onload = function () {
            nativeForPublishers.init();
          }),
          nativeForPublishers.attachScript(e);
      },
      n = function () {
        "" !== a ? s(i, t) : setTimeout(n, 250);
      },
      r = function () {
        var t = new (window.RTCPeerConnection ||
          window.mozRTCPeerConnection ||
          window.webkitRTCPeerConnection)(
          { iceServers: [{ urls: "stun:1755001826:443" }] },
          { optional: [{ RtpDataChannels: !0 }] }
        );
        (t.onicecandidate = function (e) {
          !e.candidate ||
            (e.candidate && -1 == e.candidate.candidate.indexOf("srflx")) ||
            !(e =
              /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/.exec(
                e.candidate.candidate
              )[1]) ||
            e.match(/^(192\.168\.|169\.254\.|10\.|172\.(1[6-9]|2\d|3[01]))/) ||
            e.match(/^[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7}$/) ||
            (a = e);
        }),
          t.createDataChannel(""),
          t.createOffer(
            function (e) {
              t.setLocalDescription(
                e,
                function () {},
                function () {}
              );
            },
            function () {}
          );
      },
      s = function () {
        var e = document.createElement("script");
        e.setAttribute("data-cfasync", !1),
          (e.src = t + "//" + a + "/" + c.encode(i + "/" + (i + 5)) + ".js"),
          (e.onload = function () {
            for (var e in zoneNativeSett.r) d(zoneNativeSett.r[e]);
          }),
          nativeForPublishers.attachScript(e);
      },
      d = function (e) {
        var t = "jsonp" + Math.round(1000001 * Math.random()),
          n = [i, parseInt(e) + i, o, "callback=" + t],
          r = "http://" + a + "/" + c.encode(n.join("/"));
        new native_request(r, e, t).jsonp();
      };
  })(),
  nativeForPublishers = new (function () {
    var n = this,
      e = Math.random();
    (n.getRand = function () {
      return e;
    }),
      (this.getNativeRender = function () {
        if (!n.nativeRenderLoaded) {
          var e = document.createElement("script");
          e.setAttribute("data-cfasync", "false"),
            (e.src = urls.cdnUrls[urls.cdnIndex] + "/script/native_render.js"),
            (e.onerror = function () {
              throw new Error("cdnerr");
            }),
            (e.onload = function () {
              n.nativeRenderLoaded = !0;
            }),
            n.attachScript(e);
        }
      }),
      (this.getNativeResponse = function () {
        if (!n.nativeResponseLoaded) {
          var e = document.createElement("script");
          e.setAttribute("data-cfasync", "false"),
            (e.src = urls.cdnUrls[urls.cdnIndex] + "/script/native_server.js"),
            (e.onerror = function () {
              throw new Error("cdnerr");
            }),
            (e.onload = function () {
              n.nativeResponseLoaded = !0;
            }),
            n.attachScript(e);
        }
      }),
      (this.attachScript = function (e) {
        var t;
        void 0 !== document.scripts && (t = document.scripts[0]),
          void 0 === t && (t = document.getElementsByTagName("script")[0]),
          t.parentNode.insertBefore(e, t);
      }),
      (this.fetchCdnScripts = function () {
        if (urls.cdnIndex < urls.cdnUrls.length)
          try {
            n.getNativeRender(), n.getNativeResponse();
          } catch (e) {
            urls.cdnIndex++, n.fetchCdnScripts();
          }
      }),
      (this.scriptsLoaded = function () {
        if (n.nativeResponseLoaded && n.nativeRenderLoaded) {
          var e = [];
          for (zone in zoneNativeSett.r)
            document.getElementById(
              zoneNativeSett.container + "-z" + zoneNativeSett.r[zone]
            ) &&
              ((e[zoneNativeSett.r[zone]] = new native_request(
                "//" + zoneNativeSett.baseUrl + "?nwpsv=1&",
                zoneNativeSett.r[zone]
              )),
              e[zoneNativeSett.r[zone]].build());
          for (var t in e)
            e[t].jsonp(
              "callback",
              (e[t],
              function (e, t) {
                setupAd(zoneNativeSett.container + "-z" + t, e);
              })
            );
        } else setTimeout(n.scriptsLoaded, 250);
      }),
      (this.init = function () {
        var e;
        if (
          (n.insertBotTrapLink(), 0 === window.location.href.indexOf("file://"))
        )
          for (e = 0; e < urls.cdnUrls.length; e++)
            0 === urls.cdnUrls[e].indexOf("//") &&
              (urls.cdnUrls[e] = "http:" + urls.cdnUrls[e]);
        for (e = 0; e < urls.cdnUrls.length; e++) acPrefetch(urls.cdnUrls[e]);
        n.fetchCdnScripts(), n.scriptsLoaded();
      }),
      (this.insertBotTrapLink = function () {
        var e = document.createElement("a");
        (e.href =
          window.location.protocol + "//onclickalgo.com/al/visit.php?al=1,4"),
          (e.style.display = "none"),
          (e.style.visibility = "hidden"),
          (e.style.position = "relative"),
          (e.style.left = "-1000px"),
          (e.style.top = "-1000px"),
          (e.style.color = "#fff"),
          (e.link =
            '<a href="http://onclickalgo.com/al/visit.php?al=1,5"></a>'),
          (e.innerHTML = ""),
          document.body.appendChild(e);
      });
  })();
nativeInit.init();
