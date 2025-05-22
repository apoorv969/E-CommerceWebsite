const express = require('express')
const server = express();
const mongoose = require('mongoose');
const cors = require('cors')
require('dotenv').config(); 

const { createProduct } = require('./controller/Product');
const categoriesRouter = require('./routes/Categories')
const brandsRouters = require('./routes/Brands')
const userRouter = require('./routes/Users')
const authRouter = require('./routes/Auth')
const productRouters = require('./routes/Products')
const cartRouter = require('./routes/Cart')
const ordersRouter = require('./routes/Order')



server.use(cors({
    exposedHeaders:['X-Total-Count'],
    origin: process.env.FRONTEND,
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    credentials: true,
}))
server.use(express.json());
server.use('/products', productRouters.router)
server.use('/categories', categoriesRouter.router)
server.use('/brands', brandsRouters.router)
server.use('/users', userRouter.router)
server.use('/auth', authRouter.router)
server.use('/cart', cartRouter.router)
server.use('/orders', ordersRouter.router)

main().catch(err=> console.log(err));

async function main(){
    await mongoose.connect(process.env.MONGOURI);
    console.log("database connected")
}

server.get('/',(req,res)=>{
    res.json({status:'success'})
})


server.listen(process.env.PORT || 3000, ()=>{
    console.log(`server started on port ${process.env.PORT || 3000}`)
})

