const puppeteer = require('puppeteer');
const path = require('path');
(async ()=>{
  const browser = await puppeteer.launch({args:['--no-sandbox','--disable-setuid-sandbox']});
  const page = await browser.newPage();
  const file = 'file://' + path.resolve(__dirname,'../index.html');
  await page.goto(file, {waitUntil:'networkidle0'});
  await page.pdf({path: path.resolve(__dirname,'../../../../media/roothouse-preview-20260303.pdf'), format:'A4', printBackground:true});
  await browser.close();
  console.log('done');
})();
