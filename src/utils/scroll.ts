export const scrollTo = (
  to: number,
  duration: number = 500,
  callback?: Function
) => {
  const start = position();
  const change = to - start;
  const increment = 20;
  let currentTime = 0;

  const animateScroll = function() {
    currentTime += increment;

    /* 使用二次输入缓出函数找到该值 */
    const val = easeInOutQuad(currentTime, start, change, duration);

    /* 由于很难检测到滚动元素，所以只需将 document.body 移动即可 */
    move(val);

    /* 动画 */

    if (currentTime < duration) {
      requestAnimFrame(animateScroll);
    } else {
      if (callback && typeof callback === 'function') {
        callback();
      }
    }
  };
  animateScroll();
};

/* 获取当前位置 */
const position = () => {
  return (
    document.documentElement.scrollTop ||
    (document.body.parentNode as HTMLElement).scrollTop ||
    document.body.scrollTop
  );
};

const easeInOutQuad = (t: number, b: number, c: number, d: number) => {
  t /= d / 2;
  if (t < 1) {
    return (c / 2) * t * t + b;
  }
  t--;
  return (-c / 2) * (t * (t - 2) - 1) + b;
};

const move = (amount: number) => {
  document.documentElement.scrollTop = amount;
  (document.body.parentNode as HTMLElement).scrollTop = amount;
  document.body.scrollTop = amount;
};

/* requestAnimationFrame for Smart Animating http://goo.gl/sx5sts */
const requestAnimFrame = (function() {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    (window as any).mozRequestAnimationFrame ||
    function(callback) {
      window.setTimeout(callback, 1000 / 60);
    }
  );
})();
