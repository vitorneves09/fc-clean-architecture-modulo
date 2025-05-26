import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import CreateCustomerUsecase from "./create.customer.usecase";

const input = {
    name: "Vitor",
    address: {
        street: "Street",
        number: 123,
        zip: "zip",
        city: "City"
    }
}

const MockRepository = () => {
    return {
        create: jest.fn(),
        find: jest.fn(),
        update: jest.fn(),
        findAll: jest.fn(),
    }
}

describe("Unit test create customer use case", () => {

    it("Should create a customer", async () => {
        const customerRepository = MockRepository();
        customerRepository.create.mockReturnValue(Promise.resolve(new Customer("123", "Vitor")));

        const createCustomerUsecase = new CreateCustomerUsecase(customerRepository);

        const output = await createCustomerUsecase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            address: {
                street: input.address.street,
                number: input.address.number,
                zip: input.address.zip,
                city: input.address.city,
            }
        });
    });

    it("Should throw an error when name is missing", async () => {
        const customerRepository = MockRepository();
        const createCustomerUsecase = new CreateCustomerUsecase(customerRepository);

        input.name = "";
        await expect(createCustomerUsecase.execute(input)).rejects.toThrow("Name is required");
    });
})
