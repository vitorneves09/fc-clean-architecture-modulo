import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";

export default class DeleteProductUsecase {
    private repository: ProductRepositoryInterface;

    constructor(repository: ProductRepositoryInterface) {
        this.repository = repository;
    }

    async execute(input: { id: string }): Promise<void> {
        const product = await this.repository.find(input.id);
        if (!product) {
            throw new Error("Product not found");
        }
        await this.repository.delete(input.id);
    }
}
