import express, { Request, Response } from 'express';
import CreateCustomerUsecase from '../../../usercase/customer/create/create.customer.usecase';
import CustomerRepository from '../../customer/repository/sequelize/customer.repository';
import ListCustomerUseCase from '../../../usercase/customer/list/list.customer.usecase';
import UpdateCustomerUsecase from '../../../usercase/customer/update/update.customer.usecase';


export const customerRoute = express.Router(); 

customerRoute.post("/", async (req: Request, res: Response) => {

    const usecase = new CreateCustomerUsecase(new CustomerRepository());

    try {
        const customerDto = {
            name: req.body.name,
            address: {
                street: req.body.address.street,
                number: req.body.address.number,
                zip: req.body.address.zip,
                city: req.body.address.city
            }
        };

        const response = await usecase.execute(customerDto)
        console.log(response);
        res.send(response);
    }catch (error) {
        console.error("Error creating customer", error);
    }
});

customerRoute.get("/", async (req: Request, res: Response) => {

    const usecase = new ListCustomerUseCase(new CustomerRepository());

    try {

        const ListCustomerDto = {};

        const response = await usecase.execute(ListCustomerDto);

        res.send(response);
    } catch (error) {
        console.log("Error list customer", error);
    }

});

customerRoute.put("/:id", async (req: Request, res: Response) => {
    const usecase = new UpdateCustomerUsecase(new CustomerRepository());

    try {
        const customerDto = {
            id: req.params.id,
            name: req.body.name,
            address: {
                street: req.body.address.street,
                number: req.body.address.number,
                zip: req.body.address.zip,
                city: req.body.address.city
            }
        };

        const response = await usecase.execute(customerDto);
        res.send(response);
    } catch (error) {
        console.error("Error updating product", error);
    }
});     