import express, { Request, Response } from 'express';
import CreateCustomerUsecase from '../../../usercase/customer/create/create.customer.usecase';
import Customer from '../../../domain/customer/entity/customer';
import CustomerRepository from '../../customer/repository/sequelize/customer.repository';


export const customerRoute = express.Router(); 

customerRoute.post("/", async (req: Request, res: Response) => {

    const usecase = new CreateCustomerUsecase(new CustomerRepository());

    try{

        console.log("aqui");
        const customerDto = {
            name: req.body.name,
            address: {
                street: req.body.address.street,
                number: req.body.address.number,
                zip: req.body.address.zip,
                city: req.body.address.city
            }
        };

        const response = usecase.execute(customerDto)
        res.send(response);

    }catch (error) {
        console.error("Error creating customer", error);
    }
});

customerRoute.get("/", async (req: Request, res: Response) => {
    console.log("aqui")
});