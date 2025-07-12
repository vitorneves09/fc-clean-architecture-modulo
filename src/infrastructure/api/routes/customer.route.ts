import express, { Request, Response } from 'express';
import CreateCustomerUsecase from '../../../usercase/customer/create/create.customer.usecase';
import CustomerRepository from '../../customer/repository/sequelize/customer.repository';
import ListCustomerUseCase from '../../../usercase/customer/list/list.customer.usecase';
import UpdateCustomerUsecase from '../../../usercase/customer/update/update.customer.usecase';
import FindCustomerUsecase from '../../../usercase/customer/find/find.customer.usecase';
import DeleteCustomerUsecase from '../../../usercase/customer/delete/delete.customer.usecase';


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

customerRoute.get("/:id", async (req: Request, res: Response) => {
    const usecase = new FindCustomerUsecase(new CustomerRepository());
    try {
        const response = await usecase.execute({ id: req.params.id });
        res.send(response);
    } catch (error) {
        res.status(404).send({ error: "Customer not found" });
    }
});

customerRoute.delete("/:id", async (req: Request, res: Response) => {
    const usecase = new DeleteCustomerUsecase(new CustomerRepository());
    try {
        await usecase.execute({ id: req.params.id });
        res.status(204).send();
    } catch (error) {
        res.status(404).send({ error: "Customer not found" });
    }
});