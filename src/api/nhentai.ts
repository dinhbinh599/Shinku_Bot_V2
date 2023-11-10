import { createRequire } from "module";
const require = createRequire(import.meta.url);
const nh = require("nhentai-modules");

class NHentaiApi {
  async simulateNHentaiRequest(code: string) {
    try {
      const g = await nh.Gallery(code);
      if (g.status === 200) {
        return g;
      }
    } catch (e) {
      console.log(e);
    }
  }
}

export default NHentaiApi;
