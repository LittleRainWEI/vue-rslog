const getters = {
    token: state => state.user.token,
    name: state => state.user.name,
    status: state => state.user.status,
    roles: state => state.user.roles,
    setting: state => state.user.setting,
    permission_routers: state => state.permission.routers,
    addRouters: state => state.permission.addRouters
}
export default getters
