import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { inputUpdateProductDto, outputUpdateProductDto } from "./update.product.dto";

export default class UpdateProductUsecase {
  private productRepository: ProductRepositoryInterface;
  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository;
  }
  async execute(input: inputUpdateProductDto): Promise<outputUpdateProductDto> {
    const product = await this.productRepository.find(input.id);

    product.changeName(input.name);
    product.changePrice(input.price);
    
    await this.productRepository.update(product);                   
    return {
      id: product.id,
      name: product.name,
      price: product.price,
    };         
}
}