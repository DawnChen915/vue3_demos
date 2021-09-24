/**
 * @description 防抖函数
 */
export function debounce(fun, delay) {
    var interval = delay || 200;
    var timer;
    return function () {
        var th = this;
        var args = arguments;
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(function () {
            timer = null;
            fun.apply(th, args);
        }, interval);
    };
}

/**
 * @description 节流函数
 */
export function throttle(fun, delay) {
    var last;
    var timer;
    var interval = delay || 200;
    return function () {
        var th = this;
        var args = arguments;
        var now = +new Date();
        if (last && now - last < interval) {
            clearTimeout(timer);
            timer = setTimeout(function () {
                last = now;
                fun.apply(th, args);
            }, interval);
        } else {
            last = now;
            fun.apply(th, args);
        }
    }
}


