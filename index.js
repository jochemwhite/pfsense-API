import express from 'express'
import cors from 'cors'
import router from "./routes/routes.js"

const app = express()

app.use(cors({ credentials:true, origin:'http://localhost:3000' }));
// app.use(cookieParser());
app.use(express.json());
app.use(router);
app.use(function(req, res, next) {
    res.header('Content-Type', 'application/json;charset=UTF-8')
    res.header('Access-Control-Allow-Credentials', true)
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    )
    next()
  })
app.listen(5000, ()=> console.log('Server running at port 5000'));