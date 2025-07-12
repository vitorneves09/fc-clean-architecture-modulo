import express, { Request, Response } from 'express';
import CreateProductUsecase from '../../../usercase/product/create/create.product.usecase';
import ProductRepository from '../../product/repository/sequelize/product.repository';
import ListProductUsecase from '../../../usercase/product/list/list.product.usecase';
import UpdateProductUsecase from '../../../usercase/product/update/update.product.usecase';
import FindProductUsecase from '../../../usercase/product/find/find.product.usecase';
import DeleteProductUsecase from '../../../usercase/product/delete/delete.product.usecase';

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

productRoute.get("/", async (req: Request, res: Response) => {
    const usecase = new ListProductUsecase(new ProductRepository());
    try {
        const response = await usecase.execute();
        res.send(response);
    } catch (error) {
        console.log("Error list customer", error);
    }
});


productRoute.put("/:id", async (req: Request, res: Response) => {
    const usecase = new UpdateProductUsecase(new ProductRepository());

    try {
        const productDto = {
            id: req.params.id,
            name: req.body.name,
            price: req.body.price,
        };

        const response = await usecase.execute(productDto);
        res.send(response);
    } catch (error) {
        console.error("Error updating product", error);
    }
});

productRoute.get("/:id", async (req: Request, res: Response) => {
    const usecase = new FindProductUsecase(new ProductRepository());
    try {
        const response = await usecase.execute({ id: req.params.id });
        res.send(response);
    } catch (error) {
        res.status(404).send({ error: "Product not found" });
    }
});

productRoute.delete("/:id", async (req: Request, res: Response) => {
    const usecase = new DeleteProductUsecase(new ProductRepository());
    try {
        await usecase.execute({ id: req.params.id });
        res.status(204).send();
    } catch (error) {
        res.status(404).send({ error: "Product not found" });
    }
});