export default {
  required: {
    required: true,
    trigger: 'blur',
    message: '{name}不能为空, bbb',
    default: {name: '用户名'}
  },
  // name: {
  //   pattern: /^[0-9a-zA-Z]{1,3}$/,
  //   message: '请输入1-3位数字、字母',
  //   trigger: 'blur'
  // }
  charNumber: {
    pattern: /^[0-9a-zA-Z]{{{min}},{{max}}}$/,
    message: '请输入{{min}}-{{max}}位数字、字母, haha',
    trigger: 'blur',
    default: {min: 3, max: 8}
  }
}