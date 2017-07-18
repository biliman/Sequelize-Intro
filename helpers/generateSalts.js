module.exports = function(){
  var characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  var length = 8
  var result = ''
  
  for (var i = length; i > 0; i--) {
    result += characters[Math.round(Math.random() * (characters.length - 1))]
  }
  return result
}