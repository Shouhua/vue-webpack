var print = function(msg) {
  console.log(`%c[Info] ${msg}`, 'color: green');
}
var warn = function(msg) {
  console.log(`%c[Warn] ${msg}`, 'color: #999999');
}
var error = function(msg) {
  console.log(`%c[Error] ${msg}`, 'color: red');
}

export default {
  print,
  warn,
  error
}