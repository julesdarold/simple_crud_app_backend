const express = require('express')
const mongoose = require('mongoose');
const Product = require('./models/product.model.js');
const app = express()

//middle ware
app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.get('/', (req,res) =>{
    res.send("hello from node api update");
}) 

//load elements in the database
app.post('/api/products', async (req,res) =>{
    try{
       const product =  await Product.create(req.body);
       res.status(200).json(product)
    }catch (error){
        res.status(500).json({message: error.message});
    }
});

//get the complete database in a json format
app.get('/api/products', async (req,res) =>{
    try{
        const products = await Product.find({});
        res.status(200).json(products)
   }catch (error) { 
       res.status(500).json({message: error.message});
   }
});

//get unique product from its id 
app.get('/api/products/:id', async (req,res) => {
    try{
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);

   }catch (error) {
       res.status(500).json({message: error.message});
   }
})


//update a product
app.put('/api/product/:id', async (req, res) =>{
    try{
        const { id } = req.params;
        const product =  await Product.findByIdAndUpdate(id, req.body);

        if(!product){
            return res.status(404).json({message: "Product not found"});
        }

        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);

    }catch{
        res.status(500).json({message: error.message});
    }
})

//delete a product from the database
app.delete('/api/product/:id', async (req, res) =>{
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({ message: "product not found" });
        }
        res.status(200).json({ message: "product deleted successfully" });
    }catch (error){
        res.status(500).json({message: error.message}); 
    }
})



//connection to the mongo cloud databse
mongoose.connect("mongodb+srv://boum:BERGER2005.com@hnevent.mcrf1.mongodb.net/Node-API?retryWrites=true&w=majority&appName=HNEvent")
.then(() =>{
    console.log("Connected to the database!!!");
    app.listen(3000, ()=>{
        console.log('Server is running on port 3000');
    })
})
.catch(() =>{
    console.log("connection failed!!!");
}) 