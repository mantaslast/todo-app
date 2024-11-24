import { createApp } from "vue";
import { createPinia } from "pinia";
import "./style.css";
import App from "./App.vue";
import { httpProvider } from "@/core/httpProvider";

const pinia = createPinia();
const app = createApp(App);

httpProvider.get("/data.json").then((data) => {
  console.log("data", data);
});

app.use(pinia);
app.mount("#app");
