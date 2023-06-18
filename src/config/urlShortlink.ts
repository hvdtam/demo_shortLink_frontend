import {inDevEnvironment} from './env';

let urlShortlink = ""
const urlDev = "http://localhost:8082/v1/shortlink/"
const urlProd = "https://s.tamk.dev/l"
if (inDevEnvironment) {
  console.log("inDevEnvironment")
  urlShortlink = urlDev
} else {
  urlShortlink = urlProd
}
export default urlShortlink
