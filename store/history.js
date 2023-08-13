// store/history.js
export const state = () => ({
  histories: [],
  history: {},
});

export const mutations = {
  setHistories(state, histories) {
    state.histories = histories;
  },
  setHistory(state, history) {
    state.history = history;
  },
  /*setHistories(state, histories) {
    state.histories = histories;
  },*/
  addHistory(state, history) {
    state.histories.push(history);
  },
  updateHistory(state, { historyId, updatedHistory }) {
    const index = state.histories.findIndex((h) => h._id === historyId);
    if (index !== -1) {
      state.histories.splice(index, 1, updatedHistory);
    }
  },
  deleteHistory(state, historyId) {
    state.histories = state.histories.filter((h) => h._id !== historyId);
  },
};

export const actions = {
  async loadHistory({ commit }, id) {
    try {
      const response = await this.$axios.get(`/history/${id}`);
      const history = response.data;
      commit("setHistory", history);
    } catch (error) {
      console.error(error);
    }
  },
  async loadHistories({ commit }) {
    try {
      const response = await this.$axios.get("/history");
      const histories = response.data;
      commit("setHistories", histories);
    } catch (error) {
      console.error(error);
    }
  },
  /*
  async loadHistory({ commit }, id) {
    try {
      const response = await this.$axios.get(`/history/${id}`);
      const history = response.data;
      commit("updateHistory", id, history);
    } catch (error) {
      console.error(error);
    }
  },
  async loadHistories({ commit }) {
    try {
      const response = await this.$axios.get("/history");
      const histories = response.data;
      commit("setHistories", histories);
    } catch (error) {
      console.error(error);
    }
  },
  */
  async fetchHistories({ commit }) {
    try {
      const response = await this.$axios.get("/history");
      const histories = response.data;
      commit("setHistories", histories);
    } catch (error) {
      console.error(error);
    }
  },
  async createHistory({ commit }, historyData) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post("/history", historyData)
        .then((response) => {
          const newHistory = response.data;
          commit("addHistory", newHistory);
          resolve(newHistory);
        })
        .catch((error) => {
          console.error(error);
          reject(error);
        });
    });
  },
  async updateHistory({ commit }, { historyId, updatedHistory }) {
    try {
      // console.log("Updating history", historyId, updatedHistory);
      await this.$axios.put(`/history/${historyId}`, updatedHistory);
      commit("updateHistory", { historyId, updatedHistory });
    } catch (error) {
      console.error(error);
    }
  },
  async deleteHistory({ commit }, historyId) {
    try {
      await this.$axios.delete(`/history/${historyId}`);
      commit("deleteHistory", historyId);
    } catch (error) {
      console.error(error);
    }
  },
  addIntroduction({ commit }, { historyId, introduction }) {
    try {
      this.$axios
        .put(`/history/${historyId}/introduction`, {
          introduction,
        })
        .then((response) => {
          // console.log(`addIntroduction on store ${response}`);
          this.$axios.get(`/history/${historyId}`).then((history) => {
            const updatedHistory = history.data;
            commit("updateHistory", { historyId, updatedHistory });
          });
        });
    } catch (error) {
      console.error(error);
    }
  },
  updateIntroduction({ commit }, { introductionId, introduction, historyId }) {
    try {
      this.$axios
        .put(`/introduction/${introductionId}`, {
          introduction,
        })
        .then((response) => {
          this.$axios.get(`/history/${historyId}`).then((history) => {
            const updatedHistory = history.data;
            commit("updateHistory", { historyId, updatedHistory });
          });
        });
    } catch (error) {
      console.error(error);
    }
  },
  deleteIntroduction({ commit }, { historyId, introductionId }) {
    try {
      this.$axios
        .delete(`/history/${historyId}/introduction/${introductionId}`)
        .then((response) => {
          this.$axios.get(`/history/${historyId}`).then((history) => {
            const updatedHistory = history.data;
            commit("updateHistory", { historyId, updatedHistory });
          });
        });
    } catch (error) {
      console.error(error);
    }
  },
};
