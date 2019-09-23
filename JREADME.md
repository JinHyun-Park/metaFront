1. 개발 환경 세팅
1.1. vscode 사용
1.2. java, node js 설치
1.3. yarn 사용을 위해 : npm install -g babel-cli yarn
* npm은 기본 node js 실행 용도, yarn은 npm보다 빠른 node js 패키지임.
1.4. 크롬 브라우저 Vue JS devtools 설치
  크롬 웹스토어 검색 > Vue.js 검색 > Vue.js devtools 설치
  Vue.js를 <script> 내 URL로 입력할 경우는 devtools 사용을 위해 chrome://extensions 로 이동해서 Vue.js devtools를 찾아 파일 URL에 대한 액세스 허용 선택


2. VS code 확장 설치목록 (VS Code에서 Cntl+Shift+X)
2.1. view-in-browser : html 파일을 기본 브라우저로 볼 수 있도록 함
2.2. vetur 코드에 대한 문법 강조, 코드 자동완성, 디버깅 린팅 기능들 제공
2.3. HTML Snippets : HTML 태그 조각을 빠르게 작성할 수 있도록 도와줌
2.4. JS-CSS-HTML Formatters : JS, CSS, HTML의 코드 자동완성 기능을 제공, 에디터 창에서 Cntl+Space 눌러 사용
2.5. Vue 2 Snippets : Vue.js 2.0 의 코드 조각 지원과 문법 강조 기능 제공
2.6. Vue-beautify : Vue.js 코드에 대한 정리, 배치 기능 제공
2.7. ESLint : 자바스크립트 코드 스타일, 문법 체크 기능을 제공
2.8. vscode-icons : vscode 디렉터리 구조 예쁘게 변경


3. git으로 프로젝트 받아오기 (유용한 사이트에 있는 링크 참고)
3.1. 받아올 디렉터리에 git 설정
  - git init
  - git username, email 추가
  - git remote 설정
  - git pull 수행


4. git으로 repository pull 한 이후
vue프로젝트에 ESLint recommended, autoFixOnSave 적용
--> 이거 적용해야 js, vue 파일에 대해 eslint가 엄격한 코딩 스타일(현재 airBNB 기준 적용시켰음)에 의해 에러 발생하지 않는 코드 작성 가능.
https://velog.io/@skyepodium/VS-code%EC%97%90%EC%84%9C-vue%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-eslint-%EC%A0%81%EC%9A%A9-7xjr4r2on5

위 내용 - settings.json에 내용 추가
{
    "eslint.validate": [
        {"language": "vue", "autoFix": true}, //vue 체크
        {"language": "javascript", "autoFix": true}, //자바스크립트 체크
        {"language": "html", "autoFix": true}, //HTML 체크 <div></div> -> <div />
    ],
    "eslint.autoFixOnSave": true,
    "eslint.alwaysShowStatus": true,
}

5. npm install () --dev 로 설치된 패키지들을 받아오기 위해
 npm install
 * npm install 해주면 dependancy 걸려있는 패키지들이 모두 다운로드 됨.


6. 유용한 사이트
6.1. 개발 환경 구축
  https://handcoding.tistory.com/196

6.2. vue js 한국 사용자 
  http://vuejs.kr/jekyll/update/2017/03/13/vuejs-component-style-guide/

6.3. vue 시작, 다양한 설명과 구조 
  https://beomy.tistory.com/40

6.4. VS Code + Git 연동
  https://evols-atirev.tistory.com/14

6.5. vue 적절한 구조
  https://medium.com/tldr-tech/vue-js-2-vuex-router-yarn-basic-configuration-version-2-7b9c489d43b3

6.6. vue-cli 3.x에서 webpack 설정 방법 페이지
  https://lovemewithoutall.github.io/it/vue-cli-3-webpack/

6.7. 페이지 쪼개는 법(MPA)
  https://kamang-it.tistory.com/entry/JavaScriptVuevue30-cli%EC%97%90%EC%84%9C-%ED%8E%98%EC%9D%B4%EC%A7%80-%EB%8B%A8%EC%9C%84%EB%A1%9C-%EC%AA%BC%EA%B0%9C%EC%84%9C-%EB%B9%8C%EB%93%9C%ED%95%98%EA%B8%B0

6.8. VS Code + Git 연동
  https://evols-atirev.tistory.com/14
  git remote add origin https://github.com/JinHyun-Park/new-meta.git
  git remote add origin2 https://github.com/JinHyun-Park/new-meta.git

6.9. SPA로 개발하여 빌드해서 상용에 올리고 사용자가 직접 url을 쳐서 들어갈 경우 없는 파일에 접근하는 것이기 때문에 Spring에서는 다음과 같은 설정을 해야함
  https://handcoding.tistory.com/196



7. 이 프로젝트의 구성 내용
* 개발자가 직접 아래 내용을 수행할 필요는 없음
  vue create로 프로젝트 생성.
  router, vuex 등 선택
  
  추가한 패키지(-g는 전역, --save는 디렉터리에 설치)
  npm install -g yarn @vue/cli (vue-cli 3.0 이상 버전)
  npm install -g babel-cli yarn
  yarn add -D babel-cli babel-preset-env babel-preset-stage-2
  vue add axios
  
  webpack 설정을 위한 패키지 설치
  npm install --save-dev webpack webpack-cli
  
  vuetify(UI 컴포넌트 등) 적용과 IE11 지원하게 하기 위한 설정
  * https://vuetifyjs.com/ko/getting-started/quick-start
  npm install --save vuetify  (vue add vuetify)
  npm install babel-polyfill --save
  npm install @babel/preset-env --save-dev
  
  npm install --save-dev babel-plugin-syntax-dynamic-import
  
  Babel 라이브러리 설치
  yarn add -D babel-cli babel-preset-env babel-preset-stage-2
  
  material-design icon
  npm install --save material-design-icons-iconfont
  import 'material-design-icons-iconfont/dist/material-design-icons.css'
  
  npm install @mdi/font --save
  
  transform-imports 패키지가 a-la-carte 컴포넌트에 꼭 필요한 건 아니지만 패키지들을 임포팅하는 프로세스를 간단하게   만들기 때문에 "매우" 추천
  https://vuetifyjs.com/ko/framework/a-la-carte
  npm i stylus stylus-loader style-loader css-loader --save-dev
  제한 사항(동적 구성 요소 있을 때 수동으로 구성 요소 가져와야함)에 관해서는 홈페이지 참고
  
  path resolver 설치
  yarn add eslint-import-resolver-webpack -D
  
  ES6 사용을 위한 polyfill 설정(IE에서 Promise 함수 사용을 위함)
  npm install --save es6-promise

  VUE SCROLL
  npm install vue-scroll --save

  뷰 페이징 처리 설치 vuejs-paginate
  npm install --save vuejs-paginate bootstrap@3.3.x

  vue-datepicker
  npm install -save @livelybone/vue-datepicker