import VuexPersistence from "vuex-persist";

export default ({ store }) => {
  new VuexPersistence({
    key: "cecar_APIP",
    storage: window.localStorage,
    modules: ["auth", "store"],
  }).plugin(store);
};
