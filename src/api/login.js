import fetch from '@/utils/fetch'

export function loginByUsername(username, password) {
  const data = {
    username,
    password
  }
  return fetch({
    url: 'api/login/login',
    method: 'post',
    data
  })
}

export function logout() {
  return fetch({
    url: 'api/login/logout',
    method: 'post'
  })
}

export function getUserInfo(token) {
  return fetch({
    url: 'api/user/info',
    method: 'get',
    params: { token }
  })
}
