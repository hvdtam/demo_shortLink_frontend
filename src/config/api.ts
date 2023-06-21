import { inDevEnvironment } from "./env";

let apiUrl = "";
const urlDev = "http://localhost:8082/v1/";
const urlProd = "https://s.tamk.dev/";
if (inDevEnvironment) {
  apiUrl = urlDev;
} else {
  apiUrl = urlProd;
}
export default apiUrl;
