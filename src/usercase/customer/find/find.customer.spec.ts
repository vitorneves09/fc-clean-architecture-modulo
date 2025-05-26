import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import FindCustomerUsecase from "./find.customer.usecase";

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

describe("Test find customer use case", () => {

  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("Should find a Customer", async () => {

    const customerRepository = MockRepository();
    const usecase = new FindCustomerUsecase(customerRepository);


    await customerRepository.create(customer);

    const input = {
      id: "123"
    };

    const output = {
      id: "123",
      name: "Vitor",
      address: {
        street: "Street",
        city: "City",
        number: 123,
        zip: "zip"
      }
    }

    const result = await usecase.execute(input);

    expect(result).toEqual(output);
  });

  it("Should not find a Customer", async () => {
    const customerRepository = MockRepository();
    customerRepository.find.mockImplementation(() => {
      throw new Error("Customer not found");
    });

    const usecase = new FindCustomerUsecase(customerRepository);

    const input = {
      id: "123"
    }

    await expect(usecase.execute(input)).rejects.toThrow("Customer not found");
  });
});