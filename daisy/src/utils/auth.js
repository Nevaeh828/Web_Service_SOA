import axios from "axios";

//获取token，用来渲染用户信息
export function getToken() {
  return localStorage.getItem("token")
}

//设置token，登陆时调用,rdc：暂时想法是我把jwt和account存下来，然后需要用户的其他信息的时候再用account去查询
export function setToken(token,account) {
  const obj = {
    token:token,
    account:account,
    expire: new Date().getTime() + 1000 * 60 * 30//30分钟有效期
  };
  localStorage.setItem("token", obj)
}

//判断是否是登陆状态
export function isLogined() {
  const storage = localStorage.getItem("token");
  const time = new Date().getTime();
  let result = false;
  if (storage) {
      if (time < storage.expire) {
          result = true;
      } else {
          localStorage.removeItem("token");
      }
  }
  return result;
}

//退出登录
export function clearToken() {
  localStorage.removeItem("token")
}


//获取用户的各种信息
export function getUserInfor(account){
  axios.get('/api/User/'+account)
  .then(function (response) {
    console.log(response);
    var data=response.data
    return data
  })
  .catch(function (error) {
    console.log(error);
  });
}