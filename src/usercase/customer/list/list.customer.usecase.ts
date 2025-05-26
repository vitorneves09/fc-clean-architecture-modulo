import Customer from "../../../domain/customer/entity/customer";
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import { ListCustomerDto, ListCustomerOutput } from "./list.customer.dto";

export default class ListCustomerUseCase{
    private customerRepository: CustomerRepositoryInterface;

    constructor(customerRepository: CustomerRepositoryInterface) {
        this.customerRepository = customerRepository;
    }

    async execute(input: ListCustomerDto): Promise<ListCustomerOutput>{
        const customers = await this.customerRepository.findAll();

        return OutputMapper.toOutput(customers);
    }
}

class OutputMapper{
    static toOutput(customer: Customer[]) :ListCustomerOutput {
        return {
            customers: customer.map(ct => {
                return {
                    id: ct.id,
                    name: ct.name,
                    address: {
                        street: ct.Address.street,
                        number: ct.Address.number,
                        zip: ct.Address.zip,
                        city: ct.Address.city
                    }
                }
            })
        }
    }
}