import Cookie from 'js-cookie'

export const state = () => ({
  sidebar: false,
  user: null,
})

export const mutations = {
  toggleSidebar(state) {
    state.sidebar = !state.sidebar
  },
  setUserState(state, {id, username, email}) {
    state.user = {
      id,
      username,
      email,
    }
  },
  resetUserState(state) {
    state.user = null
  },
}

export const actions = {
  async nuxtServerInit({dispatch}) {
    await dispatch('updateUserState')
  },
  async updateUserState({commit}) {
    const res = await this.$services.app.session.getCurrentLoginInformations()
    if (!res.user) return
    commit('setUserState', {
      id: res.user.id,
      username: res.user.userName,
      email: res.user.emailAddress,
    })
  },
  logout({commit}) {
    Cookie.remove('OAuthToken')
    commit('resetUserState')
  },
}
