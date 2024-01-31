import * as puppeteer from 'puppeteer';
import * as os from 'os';

// const pagePath = "https://dash.ml";
// const pagePath = "https://get.webgl.org"
// const pagePath = "https://stackoverflow.com/questions/46919013/puppeteer-wait-n-seconds-before-continuing-to-the-next-line";
// const pagePath = "https://react-three-next.vercel.app/"
// const pagePath = "https://threejs.org/examples/?q=webgl#webgl_camera"
// const pagePath = "https://google.com";
// const pagePath = "https://munrocket.github.io/gl-bench/examples/named-measuring.html";
const pagePath = "https://vuer.ai/?ws=ws://localhost:8012&grid=False&background=000000";

// const outputName = "outputs/example";

console.log("Platform: " + os.platform());
console.log("Architecture: " + os.arch());

const args = [
  '--headless',
  `--use-gl=angle`,
];


(async () => {
  console.log("Starting the headless browser...")
  const browser = await puppeteer.launch({
    args,
    headless: "new",
  });
  console.log("Headless browser started.")
  const page = await browser.newPage();
  // await page.coverage.startJSCoverage();
  // this is not a typo: networkidle2 is the correct value.
  await page.goto(pagePath, {waitUntil: 'networkidle2'});
  await page.setViewport({ width: 1280, height: 800 });
  await page.waitForSelector('.leva-c-kXfPOu');
  // pup2ist.write([...jsCoverage]);
  console.log("Waiting for 60 seconds...")
  await page.waitForTimeout(600000);
  // const jsCoverage = await page.coverage.stopJSCoverage();
  // await page.screenshot({ path: outputName + '.png' });
  // await page.pdf({path: outputName + '.pdf'});
  await browser.close();
})();