import { createStore } from 'vuex'

export default createStore({
  state: {
    token: null
  },
  mutations: {
    setToken(state, payload) {
      state.token = payload
    }
  },
  actions: {
    async login({commit}, usuario) {
      console.log(usuario);
      try {
        const res = await fetch('https://cruddosnodejs.herokuapp.com/api/user/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(usuario)
        })
        const resDB = await res.json()
        console.log(resDB.data.token);

        commit('setToken', resDB.data.token)

        localStorage.setItem('token', resDB.data.token)

      } catch (error) {
        console.log(error);
      }
    },
    leerToken({commit}) {
      if(localStorage.getItem('token')) {
        commit('setToken', localStorage.getItem('token'))
      } else {
        commit('setToken', null)
      }
    },
    cerrarSesion({commit}) {
      localStorage.removeItem('token')
      commit('setToken', null)
    }
  },
  modules: {
  }
})
