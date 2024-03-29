import * as puppeteer from 'puppeteer';
import * as os from 'os';

// const pagePath = "https://dash.ml";
// const pagePath = "https://get.webgl.org"
// const pagePath = "https://stackoverflow.com/questions/46919013/puppeteer-wait-n-seconds-before-continuing-to-the-next-line";
// const pagePath = "https://react-three-next.vercel.app/"
// const pagePath = "https://threejs.org/examples/?q=webgl#webgl_camera"
// const pagePath = "https://google.com";
// const pagePath = "https://munrocket.github.io/gl-bench/examples/named-measuring.html";
const pagePath = "https://vuer.ai?ws=ws://localhost:8017&grid=False&background=0000ff";

// const outputName = "outputs/example";

console.log("Platform: " + os.platform());
console.log("Architecture: " + os.arch());

let parameters: string[] = [];
if (process.platform == "linux") parameters = [
    '--no-sandbox',
    '--headless=new',
    '--use-angle=vulkan',
    '--enable-features=Vulkan',
    '--disable-vulkan-surface',
    '--enable-unsafe-webgpu',
    '--disable-search-engine-choice-screen',
    '--ash-no-nudges',
    '--no-first-run',
    '--disable-features=Translate',
    '--no-default-browser-check',
    '--window-size=1280,720',
    '--allow-chrome-scheme-url',
    "--proxy-server='direct://'",
    '--proxy-bypass-list=*'
];
else if (process.platform == "darwin") parameters = [
    '--headless',
    // this is for macOS. For linux, use --use-gl=egl
    `--use-gl=angle`,
];


(async () => {
    console.log("Starting the headless browser...")
    const browser = await puppeteer.launch({
        args: parameters,
        headless: "new",
    });
    console.log("Headless browser started.")
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36')
    // await page.coverage.startJSCoverage();
    // this is not a typo: networkidle2 is the correct value.
    await page.goto(pagePath, {waitUntil: 'networkidle2'});
    await page.setViewport({width: 1280, height: 800});
    await page.waitForSelector('.leva-c-kXfPOu');
    // pup2ist.write([...jsCoverage]);
    console.log("Waiting for 60 seconds...")
    await page.waitForTimeout(600000);
    // const jsCoverage = await page.coverage.stopJSCoverage();
    // await page.screenshot({ path: outputName + '.png' });
    // await page.pdf({path: outputName + '.pdf'});
    await browser.close();
})();
