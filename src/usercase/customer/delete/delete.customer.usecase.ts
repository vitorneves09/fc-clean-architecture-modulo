import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";

export default class DeleteCustomerUsecase {
    private repository: CustomerRepositoryInterface;

    constructor(repository: CustomerRepositoryInterface) {
        this.repository = repository;
    }

    async execute(input: { id: string }): Promise<void> {
        const customer = await this.repository.find(input.id);
        if (!customer) {
            throw new Error("Customer not found");
        }
        await this.repository.delete(input.id);
    }
}
