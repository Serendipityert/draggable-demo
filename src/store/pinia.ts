import { Pinia, createPinia } from "pinia";
import { createPersistedState } from "pinia-plugin-persistedstate";

const pinia = createPinia();
pinia.use(
  createPersistedState({
    serializer: {
      serialize: JSON.stringify,
      deserialize: JSON.parse,
    },
  })
);

export function setupPinia(app: { use: (arg0: Pinia) => void }) {
  app.use(pinia);
}

export { pinia };
