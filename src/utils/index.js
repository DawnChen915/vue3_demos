/**
 * @description 防抖函数
 */
export function debounce(fn, delay) {
    let handle;
    return function (e) {
        // 取消之前的延时调用
        clearTimeout(handle);
        handle = setTimeout(() => {
            fn(e);
        }, delay);
    }

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