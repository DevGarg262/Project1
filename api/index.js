const playwright = require('playwright-aws-lambda');
var url = require('url');

const renderPdf = async (name) => {
  var browser = null

  browser = await playwright.launchChromium()
  const context = await browser.newContext()
  const page = await context.newPage()

//   await page.goto(`https://project1-two.vercel.app/main.html?name=${name}`)
//   var url=window.location.href
//   const myURL = new URL('https://project1-two.vercel.app');
//   const myURL = new URL('/main.html?name=${name}', 'https://project1-two.vercel.app');
  const baseURL = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"
  await page.goto(baseURL)
  
  await page.emulateMedia('screen')
  const pdf = await page.pdf({
    format: 'A4',
    printBackground: true,
    margin: {
      top: '120px',
      bottom: '50px',
      right: '0px',
      left: '0px'
    }
  })

  return pdf
}

export default async function handler (req, res) {
  try {
    const { name } = req.query
  

    if (name === undefined) {
      throw new Error('Name parapamter is missing')
    }

    const file = await renderPdf(name)
    res.statusCode = 200

    res.setHeader('Content-disposition', 'inline; filename=123.pdf')
    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Cache-Control', 'no-cache')
    res.end(file)
  } catch (e) {
    res.statusCode = 500
    res.setHeader('Content-Type', 'text/html')
    res.end(`<h1>Internal Error: </h1><p>${e}</p>`)
    console.error(e)
  }
}
