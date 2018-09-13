export default {
  required: {
    required: true,
    trigger: 'blur',
    message: '{name}不能为空, 你懂的'
  },
  name: {
    pattern: /^[0-9a-zA-Z]{1,3}$/,
    message: '请输入1-3位数字、字母，你懂得',
    trigger: 'blur'
  }
}