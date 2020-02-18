1. store(actios, mutations, state)를 통해 데이터를 수정하는 행위는 여러 컴포넌트나 화면에서 접근할 시 사용
2. 1번의 경우가 아닐 경우 가급적 vue 내부에서 처리될 수 있도록 하면 개발 상 깔끔.

1. hoc (high order component) 
 : 컴포넌트에서 반복되는 코드 재사용

 vscode update하며 lint 버전업 되었음
 lint 규칙에 위배되어 red line 발생하는 것 해결하는 방법

 F1 > formatter config 에 아래 내용 복붙 ---> !! vscode 재시작 필요
 
 {
  "onSave": true,
  "javascript": {
    "indent_size": 2,
    "indent_char": " ",
    "eol": "auto",
    "preserve_newlines": true,
    "break_chained_methods": false,
    "max_preserve_newlines": 0,
    "space_in_paren": false,
    "space_in_empty_paren": false,
    "jslint_happy": false,
    "space_after_anon_function": false,
    "keep_array_indentation": false,
    "space_before_conditional": true,
    "unescape_strings": false,
    "wrap_line_length": 0,
    "e4x": false,
    "end_with_newline": true,
    "comma_first": false,
    "brace_style": "collapse-preserve-inline",
    "operator_position": "after-newline"
  },
  "css": {
    "indent_size": 4,
    "indentCharacter": " ",
    "indent_char": " ",
    "selector_separator_newline": true,
    "end_with_newline": false,
    "newline_between_rules": true,
    "eol": "\n"
  },
  "html": {
    "indent_inner_html": false,
    "indent_size": 4,
    "indent_char": " ",
    "indent_character": " "
  }
}
