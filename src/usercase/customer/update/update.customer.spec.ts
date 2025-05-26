import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import UpdateCustomerUsecase from "./update.customer.usecase";

const customer = new Customer("123", "Vitor");
const address = new Address("Street", 123, "zip", "City");
customer.changeAddress(address);

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        create: jest.fn(),
        update: jest.fn(),
        findAll: jest.fn(),
    }
}

describe("Unit test update customer use case", () => {
    it("Should update a customer", async () => {
        const customerRepository = MockRepository();
        const usecase = new UpdateCustomerUsecase(customerRepository);

        const input = {
            id: "123",
            name: "Vitor Updated",
            address: {
                street: "Street Updated",
                number: 456,
                zip: "zip Updated",
                city: "City Updated"
            }
        };

        const output = await usecase.execute(input);

        expect(output).toEqual({
            id: "123",
            name: "Vitor Updated",
            address: {
                street: "Street Updated",
                number: 456,
                zip: "zip Updated",
                city: "City Updated"
            }
        });
    });

    it("Should throw an error when customer not found", async () => {
        const customerRepository = MockRepository();
        customerRepository.find.mockImplementation(() => {
            throw new Error("Customer not found");
        });

        const usecase = new UpdateCustomerUsecase(customerRepository);

        const input = {
            id: "123",
            name: "Vitor Updated",
            address: {
                street: "Street Updated",
                number: 456,
                zip: "zip Updated",
                city: "City Updated"
            }
        };

        await expect(usecase.execute(input)).rejects.toThrow("Customer not found");
    });
}); 