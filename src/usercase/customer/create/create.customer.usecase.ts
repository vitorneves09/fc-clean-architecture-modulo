import Customer from "../../../domain/customer/entity/customer";
import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import Address from "../../../domain/customer/value-object/address";
import { CreateCustomerDto, CreateCustomerOutput } from "./create.customer.dto";
import { v4 as uuid } from "uuid";
export default class CreateCustomerUsecase {
    private customerRepository: CustomerRepositoryInterface;

    constructor(customerRepository: CustomerRepositoryInterface) {
        this.customerRepository = customerRepository;
    }

    async execute(input: CreateCustomerDto): Promise<CreateCustomerOutput> {
        const customer = await CustomerFactory.createWithAddress(input.name, new Address(
            input.address.street,
            input.address.number,
            input.address.zip,
            input.address.city));
        
            console.log(customer);

        await this.customerRepository.create(customer);

        return {
            id: customer.id,
            name: customer.name,
            address: {
                street: customer.Address.street,
                number: customer.Address.number,
                zip: customer.Address.zip,
                city: customer.Address.city,
            }
        }
    }
}