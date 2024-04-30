import { createStore } from "vuex";
import users from "./users";

const store = createStore({
  modules: {
    users,
  },
});
export default store;
