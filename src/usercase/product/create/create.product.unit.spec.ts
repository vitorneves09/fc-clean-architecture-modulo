import Product from "../../../domain/product/entity/product";
import CreateProductUsecase from "./create.product.usecase";


const input_product= {
    name: "Product 1",
    price: 100,
    type: "a"
}

const input_productb= {
    name: "Product 1",
    price: 100,
    type: "b"
}


const MockRepository = () => {
    return {
        create: jest.fn().mockReturnValue(Promise.resolve(new Product("1", "product 1", 100))),
        find: jest.fn(),
        update: jest.fn(),
        findAll: jest.fn(),
    }
}

describe("Create product unit test", () => {
  it("should create a product", async () => {
    
    const productRepository = MockRepository();

    const createProductUsecase = new CreateProductUsecase(productRepository);

    const output = await createProductUsecase.execute({
      type: "a",
      name: "Product 1",
      price: 100});

    expect(output).toEqual({
      id: expect.any(String),       
        name: input_product.name,
        price: input_product.price});
  });

  it("should create a product b", async () => { 
    const productRepository = MockRepository();
    
    const createProductUsecase = new CreateProductUsecase(productRepository);

    const output = await createProductUsecase.execute({
      type: "b",
      name: "Product 1",
      price: 100});

    expect(output).toEqual({
      id: expect.any(String),       
        name: input_productb.name,
        price: input_productb.price * 2 }
      );
  } );
});