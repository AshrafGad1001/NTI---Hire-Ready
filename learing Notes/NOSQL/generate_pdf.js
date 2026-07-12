const puppeteer = require('puppeteer-core');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: "new"
  });
  
  const page = await browser.newPage();
  
  // Point to the local HTML file
  const filePath = 'file:///' + path.join(__dirname, 'NOSQL_Master_A4.html').replace(/\\/g, '/');
  
  await page.goto(filePath, { waitUntil: 'networkidle0' });
  
  // Generate PDF
  await page.pdf({
    path: path.join(__dirname, 'NOSQL_Master.pdf'),
    format: 'A4',
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 }
  });
  
  await browser.close();
  console.log('PDF generated successfully!');
})();
