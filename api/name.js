module.exports = (req, res) => {
    const {
      query: { name },
    } = req
  
    res.send(`https://project1-65dnl1uco.vercel.app/main.html?name=${name}`)
  }