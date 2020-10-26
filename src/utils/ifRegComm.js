/**
 * 신청화면 공통 method를 담은 js
 */

function getIfRegBotBtnSet(tabNum, procSt) {
  // tabNum : 1(기본정보입력) / 2(인터페이스 상세) / 3(승인요청) / 4(승인)
  // procSt : 1(임시저장) / 2(승인요청)
  console.log(`procSt : ${procSt} tabNum : ${tabNum}`);
  const ifRegBotBtnSet = [];
  ifRegBotBtnSet.isBtnPrev = (tabNum > 1);
  ifRegBotBtnSet.isBtnForw = (tabNum < 3);
  ifRegBotBtnSet.isBtnTempSave = (tabNum < 4 && (procSt == null || procSt === '1'));
  ifRegBotBtnSet.isBtnApprReq = (tabNum === 3 && (procSt == null || procSt === '1'));
  ifRegBotBtnSet.isBtnAppr = (tabNum === 4 && procSt === '2');
  ifRegBotBtnSet.isBtnReject = (tabNum === 4 && procSt === '2');

  return ifRegBotBtnSet;
}

function tabChange(val, procSt) {
  let tabNum = 0;
  if (procSt == null || procSt === '1') {
    return;
  }
  window.scrollTo(0, 0);
  tabNum = val;
  localStorage.setItem('APPLY_TABNUM', tabNum);
}

export {
  getIfRegBotBtnSet,
  tabChange,
};
