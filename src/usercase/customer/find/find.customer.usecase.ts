import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import { InputFindCustomer, OutputFindCustomer } from "./find.customer.dto";

export default class FindCustomerUsecase {
    private customerRepository: CustomerRepositoryInterface;

    constructor(customerRepository: CustomerRepositoryInterface) {
        this.customerRepository = customerRepository;
    }


    async execute(input: InputFindCustomer): Promise<OutputFindCustomer> {

        const customer = await this.customerRepository.find(input.id)

        return {
            id: customer.id,
            name: customer.name,
            address: {
                street: customer.Address.street,
                city: customer.Address.city,
                number: customer.Address.number,
                zip: customer.Address.zip,
            }
        };
    }
}