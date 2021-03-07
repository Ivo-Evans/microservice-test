import express = require('express')
const morgan = require('morgan')

const port = 8080

const app  = express()

app.use(morgan('tiny'))


app.get('/authorisation/:userId', (req: express.Request, res: express.Response) => {
    setTimeout(() => {
        console.log(req.params.userId)
        res.send(200)
    }, 2000);
  })
  
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })