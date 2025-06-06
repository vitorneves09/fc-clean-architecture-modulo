import express, { Request, Response } from 'express';
import CreateProductUsecase from '../../../usercase/product/create/create.product.usecase';
import ProductRepository from '../../product/repository/sequelize/product.repository';

export const productRoute = express.Router(); 

productRoute.post("/", async (req: Request, res: Response) => { 
    const usecase = new CreateProductUsecase(new ProductRepository());

    try {
        const productDto = {
            name: req.body.name,
            price: req.body.price,
            type: req.body.type
        }

        const response = await usecase.execute(productDto);
    
        res.send(response);
        
    } catch (error) {
        console.error("Error creating product" + error);
    }
});