function setCookie(c_name, c_pwd, singlee,exdays) {
  var exdate = new Date()
  exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays)
  window.document.cookie = "username" + "=" + c_name +";expires=" + exdate.toGMTString();
  window.document.cookie = "password" + "=" + c_pwd + ";expires=" + exdate.toGMTString();
  window.document.cookie = "single"+"="+singlee
  console.log('setcookie里面的  '+document.cookie)
}
function getCookie(word) {
  if (document.cookie.length > 0) {
    var arr = document.cookie.split('; ')
    for (var i = 0; i < arr.length; i++) {
      var arr2 = arr[i].split('=')
      if (arr2[0] == 'username') {
        word = arr2[1]
      } else if (arr2[0] == 'password') {
        word = arr2[1]
      }
    }
  }
}
   //清除所有cookie
function clearAllCookie() {
    var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    if (keys) {
      for (var i = keys.length; i--;)
        document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
    }
  }
function  keepData(aaa){
    sessionStorage.setItem('user',JSON.stringify(aaa))
  }

export{
  setCookie,
  getCookie,
  clearAllCookie,
  keepData
}