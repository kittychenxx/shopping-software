export function clearCookie() {
  let cookie = document.cookie
  let cookieData = cookie.split('; ')
  for(let i = 0; i < cookieData.length; i++){
    let cookieItem = cookieData[i].split('=')
    document.cookie=cookieItem[0]+`=; expires=Thu, 01 Jan 1970 00:00:00 GMT`
  }  
}

    
export function setCookie(cname:string, cvalue:string|number, exdays:number):void {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + "; " + expires;
}

export function getCookie(cname:string):string {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
      var c = ca[i].trim();
      if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
  }
  return "";
}