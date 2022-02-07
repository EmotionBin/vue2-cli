
const state = {
  themeInfo: {
    activeName: ''
  }
}

const mutations = {
  updateActiveTheme (state, { activeName }) {
    state.themeInfo.activeName = activeName
    // 将类名更新到 body 上
    document.body.className = `theme-${activeName}`
    // 写入 localStorage
    window.localStorage.setItem('web-chat-admin-theme', activeName)
  }
}

const actions = {
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
