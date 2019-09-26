export default {
  headerOn: {
    type: Boolean,
    default: true,
  },
  asideOn: {
    type: Boolean,
    default: true,
  },
  footerOn: {
    type: Boolean,
    default: true,
  },
  loginPageOn: {
    type: Boolean,
    default: false,
  },
  resetPopOn: 'none',
  subNm: '',
  menuLists: [],
  confirmSet: {
    confirmOn: false,
    confirmMsg: '',
    iconNum: '3', // (1-느낌표, 2-X, 3-체크(기본))
    parentFunc: '',
    param: '',
  },
  alertSet: {
    alertOn: false,
    alertMsg: '',
    parentFunc: '',
    param: '',
  },
};
