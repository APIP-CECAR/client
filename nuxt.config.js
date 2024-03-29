import colors from "vuetify/es5/util/colors";
require("dotenv").config();

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: "%s - app_cecar",
    title: "app_cecar",
    htmlAttrs: {
      lang: "es",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  env: {
    CECAR_API: process.env.CECAR_API,
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ["~/plugins/axios"],
  // , { src: "~/plugins/vuex-persist", ssr: false }],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules

  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    "@nuxtjs/auth-next",
    "@nuxtjs/axios",
    "@nuxtjs/dotenv",
  ],

  axios: {
    // proxy: true,
    baseURL: process.env.CECAR_API || "http://localhost:5000",
  },

  router: {
    middleware: ["auth"],
    extendRoutes(routes, resolve) {
      routes.push(
        {
          name: "historyProperties:id",
          path: "/historyProperties/:id",
          component: resolve(__dirname, "pages/historyProperties.vue"),
        },
        {
          name: "studentHistory",
          path: "/render/student/:studentId/history/:historyId",
          component: resolve(__dirname, "pages/renderHistory.vue"),
        }
      );
    },
  },

  // Configuración del módulo @nuxt/auth
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: "/auth/login", method: "post", propertyName: "token" },
          logout: { url: "/auth/logout", method: "post", redirect: "/login" },
          user: { url: "/auth/user", method: "get", propertyName: "user" },
        },
      },
    },
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ["defu"],
  },

  compilerOptions: {
    types: ["@nuxtjs/auth-next"],
  },
};
