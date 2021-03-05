import express = require('express')

const app  = express()
const port = 8080

app.get('/authorisation/:userId', (req: express.Request, res: express.Response) => {
    setTimeout(() => {
        console.log(req.params.userId)
        res.send(200)
    }, 2000);
  })
  
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })