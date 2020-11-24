const { chromium } = require('playwright')
// const jsdom = require("jsdom");
// const { JSDOM } = jsdom;



const render = async (url, path) => {
  var browser = null
  // var url = "https://certificate-rho.vercel.app/svgTemplate.html?name=Dev Garg"
  try {
    browser = await chromium.launch({
      args: [
        '--no-sandbox',
        '--ignore-certificate-errors'
      ],
      dumpio: true
    })

    const page = await browser.newPage()

    await page.goto(url)
    await page.emulateMedia('screen')
    await page.pdf({
      path: "path.pdf",
      format: 'A4',
      displayHeaderFooter: true,
      printBackground: true,
      margin: {
        top: '120px',
        bottom: '50px',
        right: '0px',
        left: '0px'
      }
    })

    await browser.close()
    process.exit(0)
    // return;
  } catch (error) {
    console.log(error)
    await browser.close()
    process.exit(1)
  }
}

var myArgs = process.argv.slice(2)

render(myArgs[0], myArgs[1])

module.exports = async (req, res) => {
  const  { name } = req.query;
  
  try {
    res.send({
      status: 200,
      // lyrics:
      //  await
      var a : 'https://certificate-rho.vercel.app/svgTemplate.html?name=${name}',
        render(,'./')
    })
  } catch (err) {
    res.send({
      status: 500,
      message: err.message,
    })
  }
}



