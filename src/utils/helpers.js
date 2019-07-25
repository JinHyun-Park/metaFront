/**
 * 공통 method를 담은 js
 */
const helpers = {
  /**
     * value의 null 처리
     * @param {*} value
     * @return {Boolean} true/false
     */
  isEmpty(value) {
    console.log('isEmpty 진입!');
    if (value === '' || value === null || value === undefined
            || (value != null && typeof value === 'object' && !Object.keys(value).length)) {
      return true;
    }
    return false;
  },
  isEmpty2(value) {
    console.log('isEmpty2 진입!');
    if (value === '' || value === null || value === undefined
            || (value != null && typeof value === 'object' && !Object.keys(value).length)) {
      return true;
    }
    return false;
  },
};

export default helpers;
