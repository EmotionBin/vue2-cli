
const state = {
  menuInfo: {
    currentActive: {
      title: '',
      path: ''
    }
  }
}

const mutations = {
  updateActiveMenu (state, { title, path }) {
    state.menuInfo.currentActive.title = title
    state.menuInfo.currentActive.path = path
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
