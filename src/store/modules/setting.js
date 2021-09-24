const theme = JSON.parse(sessionStorage.getItem('vue3.x_demo_theme')) || ''
const state = () => ({
    layout: theme.layout || 'horizontal',
})
const getters = {
    layout: (state) => state.layout,
}
const mutations = {
    changeLayout: (state, layout) => {
        if (layout) state.layout = layout
    },
}
const actions = {
    changeLayout({ commit }, layout) {
        commit('changeLayout', layout)
    },
}
export default { state, getters, mutations, actions }
