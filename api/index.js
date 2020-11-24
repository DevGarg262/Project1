const { chromium } = require('playwright');


module.exports = (req, res) => {
  const { name } = req.query;

 
  res.send(async function render(){
      try {
    browser = await chromium.launch({
      args: [
        '--no-sandbox',
        '--ignore-certificate-errors'
      ],
      dumpio: true
    })

    const page = await browser.newPage()
    await page.goto(`https://project1-65dnl1uco.vercel.app/main.html?name=${name}`)
    await page.emulateMedia('screen')
    await page.pdf({
      format: 'A4',
      displayHeaderFooter: true,
      printBackground: true,
      margin: {
        top: '120px',
        bottom: '50px',
        right: '0px',
        left: '0px',
      }
    })

    await browser.close()
    process.exit(0)
  } catch (error) {
    console.log(error)
    await browser.close()
    process.exit(1)
  }
}
  
  )}
