export const state = () => ({
  users: [],
});

export const mutations = {
  SET_USERS(state, users) {
    state.users = users;
  },
  ADD_USER(state, user) {
    state.users.push(user);
  },
  UPDATE_USER(state, updatedUser) {
    const index = state.users.findIndex((user) => user._id === updatedUser._id);
    if (index !== -1) {
      state.users.splice(index, 1, updatedUser);
    }
  },
  DELETE_USER(state, userId) {
    state.users = state.users.filter((user) => user._id !== userId);
  },
};

export const actions = {
  async fetchUsers({ commit }) {
    try {
      const response = await this.$axios.get("/users");
      commit("SET_USERS", response.data);
    } catch (error) {
      console.error(error);
    }
  },
  async addUser({ commit }, newUser) {
    try {
      const response = await this.$axios.post("/users", newUser);
      commit("ADD_USER", response.data);
    } catch (error) {
      console.error(error);
    }
  },
  async editUser({ commit }, editedUser) {
    try {
      const response = await this.$axios.put(
        `/users/${editedUser._id}`,
        editedUser
      );
      commit("UPDATE_USER", response.data);
    } catch (error) {
      console.error(error);
    }
  },
  async deleteUser({ commit }, userId) {
    try {
      await this.$axios.delete(`/users/${userId}`);
      commit("DELETE_USER", userId);
    } catch (error) {
      console.error(error);
    }
  },
};

export const getters = {
  getUsers: (state) => state.users,
};
