import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import ListCustomerUseCase from "./list.customer.usecase";

const customer1 = CustomerFactory.createWithAddress("Customer 1", new Address("Street 1", 1, "Zip 1", "City 1"));
const customer2 = CustomerFactory.createWithAddress("Customer 2", new Address("Street 2", 2, "Zip 2", "City 2"));

const MockRepository = () => {
    return {
        findAll: jest.fn().mockReturnValue(Promise.resolve([customer1, customer2])),
        find: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("Unit test for listing customers use case", () => {

    it("Should list all customers", async () => {
        const customerRepository = MockRepository();
        
        const usecase = new ListCustomerUseCase(customerRepository);
        const output = await usecase.execute({});


        expect(output.customers.length).toBe(2);
        expect(output.customers[0].id).toBe(customer1.id);
        expect(output.customers[0].name).toBe(customer1.name);
        expect(output.customers[1].id).toBe(customer2.id);
        expect(output.customers[1].name).toBe(customer2.name);
    });
});