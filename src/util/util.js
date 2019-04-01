/**
 * Created by XiaoJie on 2019/3/12
 */
'use strict'

/**
 * @description 判断浏览器是否是IE
 * @return {boolean}
 */
function isIE () {
  return !!window.ActiveXObject || 'ActiveXObject' in window
}

/**
 * @description 获取uuid
 * @return {string} uuid
 */
function getUUId () {
  return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, c => {
    return (c === 'x' ? (Math.random() * 16 | 0) : ('r&0x3' | '0x8')).toString(16)
  })
}

/**
 * @description 判断参数是否为对象
 * @param  {*} target
 * @return {boolean}
 */
function isObject (target) {
  return Object.prototype.toString.call(target) === '[object Object]'
}

/**
 * @description 判断参数是否为数组
 * @param  {*} target
 * @return {boolean}
 */
function isArray (target) {
  return Object.prototype.toString.call(target) === '[object Array]'
}

/**
 * @description 判断参数是否为方法
 * @param  {*} target
 * @return {boolean}
 */
function isFunction (target) {
  return Object.prototype.toString.call(target) === '[object Function]'
}

/**
 * @description 判断参数是否为正则表达式
 * @param  {*} target
 * @return {boolean}
 */
function isRegExp (target) {
  return Object.prototype.toString.call(target) === '[object RegExp]'
}

/**
 * @description 判断参数是否为日期对象
 * @param  {*} target
 * @return {boolean}
 */
function isDate (target) {
  return Object.prototype.toString.call(target) === '[object Date]'
}

export {
  isIE,
  getUUId,
  isObject,
  isArray,
  isFunction,
  isRegExp,
  isDate
}
