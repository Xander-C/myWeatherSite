/**
 * 
 * @param {String} innerHTML 元素内部的HTML
 * @param {String} tagName 元素标签名
 * @param {String} style 元素的样式
 */
export function createElement(innerHTML,tagName="span",style="margin: 0 1rem 0 1rem;") {
  const element = document.createElement(tagName);
  element.innerHTML = innerHTML;
  element.style = style;
  return element;
}

/**
 * 
 * @param {HTMLElement} element 目标HTML元素
 * @param {String} animationClassName 动画的class名，参考animation.css的官方文档
 * @param {Number} duration 动画的持续时间，如果为0，则返回一个停止动画的函数
 */
export function createAnimation(element, animationClassName,duration=0){
  element.classList.remove(animationClassName);
  element.classList.add(animationClassName);
  const stopAnimation = () => element.classList.remove(animationClassName);
  if (duration === 0) {
    return stopAnimation;
  }
  else {
    setTimeout(stopAnimation, duration);
  }
}