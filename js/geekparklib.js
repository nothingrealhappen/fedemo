/**
 * This is a javascript library
 * Author: Dongdong
 * Date: 2014.11.3
 * Mail: mail@liyaodong.com
 */
'use strict';

$(function(){
    window.GeekPark = {
        // 滑动到某个DOM
        "slideToDom" : function(domid, offset){
            $('html,body').animate({
                scrollTop: parseInt($(domid).offset().top - offset) + 'px'
            }, 800);
        },

        // 检测是否为retina屏幕
        "isRetinaDisplay" : function(){
            if (window.matchMedia) {
                var mq = window.matchMedia("only screen and (min--moz-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen  and (min-device-pixel-ratio: 1.3), only screen and (min-resolution: 1.3dppx)");
                if (mq && mq.matches || (window.devicePixelRatio > 1)) {
                return true;
                } else {
                    return false;
                }
            }
        },

        // 检测css动画是否执行完毕
        /*
        var transitionEvent = whichTransitionEvent();

        $('xxx').one(transitionEvent, function(event) {
          // Do something when the transition ends
        });
        */
        "whichTransitionEvent" : function(){
          var t,
              el = document.createElement("fakeelement");

          var transitions = {
            "transition"      : "transitionend",
            "OTransition"     : "oTransitionEnd",
            "MozTransition"   : "transitionend",
            "WebkitTransition": "webkitTransitionEnd"
          }

          for (t in transitions){
            if (el.style[t] !== undefined){
              return transitions[t];
            }
          }
        },

        // 检测是否为移动设备
        // GeekPark.isMobile().any   
        // 改自：https://github.com/kaimallea/isMobile   
        "isMobile" : function(){
          var apple_phone         = /iPhone/i,
          apple_ipod          = /iPod/i,
          apple_tablet        = /iPad/i,
          android_phone       = /(?=.*\bAndroid\b)(?=.*\bMobile\b)/i, // Match 'Android' AND 'Mobile'
          android_tablet      = /Android/i,
          windows_phone       = /IEMobile/i,
          windows_tablet      = /(?=.*\bWindows\b)(?=.*\bARM\b)/i, // Match 'Windows' AND 'ARM'
          other_blackberry    = /BlackBerry/i,
          other_blackberry_10 = /BB10/i,
          other_opera         = /Opera Mini/i,
          other_firefox       = /(?=.*\bFirefox\b)(?=.*\bMobile\b)/i, // Match 'Firefox' AND 'Mobile'
          seven_inch = new RegExp(
              '(?:' +         // Non-capturing group

              'Nexus 7' +     // Nexus 7

              '|' +           // OR

              'BNTV250' +     // B&N Nook Tablet 7 inch

              '|' +           // OR

              'Kindle Fire' + // Kindle Fire

              '|' +           // OR

              'Silk' +        // Kindle Fire, Silk Accelerated

              '|' +           // OR

              'GT-P1000' +    // Galaxy Tab 7 inch

              ')',            // End non-capturing group

              'i');           // Case-insensitive matching

          var match = function(regex, userAgent) {
              return regex.test(userAgent);
          };

          var IsMobileClass = function(userAgent) {
              var ua = userAgent || navigator.userAgent;

              this.apple = {
                  phone:  match(apple_phone, ua),
                  ipod:   match(apple_ipod, ua),
                  tablet: match(apple_tablet, ua),
                  device: match(apple_phone, ua) || match(apple_ipod, ua) || match(apple_tablet, ua)
              };
              this.android = {
                  phone:  match(android_phone, ua),
                  tablet: !match(android_phone, ua) && match(android_tablet, ua),
                  device: match(android_phone, ua) || match(android_tablet, ua)
              };
              this.windows = {
                  phone:  match(windows_phone, ua),
                  tablet: match(windows_tablet, ua),
                  device: match(windows_phone, ua) || match(windows_tablet, ua)
              };
              this.other = {
                  blackberry:   match(other_blackberry, ua),
                  blackberry10: match(other_blackberry_10, ua),
                  opera:        match(other_opera, ua),
                  firefox:      match(other_firefox, ua),
                  device:       match(other_blackberry, ua) || match(other_blackberry_10, ua) || match(other_opera, ua) || match(other_firefox, ua)
              };
              this.seven_inch = match(seven_inch, ua);
              this.any = this.apple.device || this.android.device || this.windows.device || this.other.device || this.seven_inch;
              // excludes 'other' devices and ipods, targeting touchscreen phones
              this.phone = this.apple.phone || this.android.phone || this.windows.phone;
              // excludes 7 inch devices, classifying as phone or tablet is left to the user
              this.tablet = this.apple.tablet || this.android.tablet || this.windows.tablet;

              if (typeof window === 'undefined') {
                  return this;
              }
          };

          var instantiate = function() {
              var IM = new IsMobileClass();
              IM.Class = IsMobileClass;
              return IM;
          };

          if (typeof module != 'undefined' && module.exports && typeof window === 'undefined') {
              //node
              module.exports = IsMobileClass;
          } else if (typeof module != 'undefined' && module.exports && typeof window !== 'undefined') {
              //browserify
              module.exports = instantiate();
          } else if (typeof define === 'function' && define.amd) {
              //AMD
              define(instantiate());
          } else {
              return instantiate();
          }
        } // isMobile end

    };
});

