export function emailTest(email: string):boolean{
  let regEmail = /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
  return regEmail.test(email) ? true : false
}

export function passwordTest(password: string):boolean{
  let reg1 = /^[0-9a-zA-Z]{6,16}$/
  let reg2 = /[0-9]+/
  let reg3 = /[a-z]+/
  let reg4 = /[A-Z]+/
  return (reg1.test(password) && reg2.test(password) && reg3.test(password) && reg4.test(password))? 
    true:false
}