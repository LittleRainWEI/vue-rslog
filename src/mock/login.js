import { param2Obj } from '@/utils'

const userMap = {
  admin: {
    role: ['admin'],
    token: 'admin',
    name: 'Super Admin'
  },
  editor: {
    role: ['editor'],
    token: 'editor',
    name: 'Normal Editor'
  },
  developer: {
    role: ['develop'],
    token: 'develop',
    name: 'Normal Developer'
  }
}

export default {
  loginByUsername: config => {
    const { username } = JSON.parse(config.body)
    return userMap[username]
  },
  getUserInfo: config => {
    const { token } = param2Obj(config.url)
    if (userMap[token]) {
      return userMap[token]
    } else {
      return Promise.reject('error')
    }
  },
  logout: () => 'success'
}
