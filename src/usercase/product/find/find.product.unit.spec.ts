import Product from "../../../domain/product/entity/product";
import FindProductUsecase from "./find.product.usecase";

const inputProduct ={
    id: "1",
    name: "Product 1",
    price: 100
};


const MockRepository = () => {
    return {
        create: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(new Product("1", "Product 1", 100))),
        update: jest.fn(),
        findAll: jest.fn(),
        delete: jest.fn(),
    }
}


describe("Find product unit test", () => {

  it("should find a product", async () => { 
    const productRepository = MockRepository();

    const findProductUsecase = new FindProductUsecase(productRepository);

    const output = await findProductUsecase.execute({ id: "1" });

    expect(output.id).toEqual(inputProduct.id);
    expect(output.name).toEqual(inputProduct.name);
    expect(output.price).toEqual(inputProduct.price);
  });

}); 