import VuexPersistence from "vuex-persist";

export default ({ store }) => {
  new VuexPersistence({
    storage: window.localStorage, // O window.sessionStorage
  }).plugin(store);
};
