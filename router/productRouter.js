import express, { request, response } from 'express';
import Products from '../models/Products.js';
const productRouter = express.Router();


productRouter.get('/all', async (request, response) => {
    try {
        let products = await Products.find({});
        if (products.length === 0) {
            response.status(404).json({
                msg: 'No products found',
            });
        } else {
            response.status(200).json({
                msg: 'Success',
                products: products
            });
        }
        
    }
    catch (error) {
        console.error("Error fetching products:", error);
        response.status(500).json({ 
            msg: "Internal Server Error",
            error: error.message, 
        });
    }
    
})

productRouter.get('/:productId',async(request,response)=>{
    try{
        let {productId}=request.params;
        let product=await Products.findById(productId);
        if(!product){
            return response.status(400).json({
                errors :[
                    {
                        msg:'No product found'
                    }
                ]
            })
        }
        response.status(200).json({
            product:product
        })
    }
    catch(error){
        console.error("Error fetching products:", error);
        response.status(500).json({ 
            msg: "Internal Server Error",
            error: error.message, 
        });
    }
})


export default productRouter;