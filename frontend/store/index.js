export const state = () => ({
  sidebar: false,
  user: null,
})

export const mutations = {
  toggleSidebar (state) {
    state.sidebar = !state.sidebar
  },
  setUserState (state, {id, username, email}) {
    state.user = {
      id,
      username,
      email,
    }
  },
}

export const actions = {
  async updateUserState({commit}) {
    const res = await this.$services.app.session.getCurrentLoginInformations()
    commit('setUserState', {
      id: res.user.id,
      username: res.user.userName,
      email: res.user.emailAddress,
    })
  },
}
