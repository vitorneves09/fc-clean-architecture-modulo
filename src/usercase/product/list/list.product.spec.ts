import Product from "../../../domain/product/entity/product";
import ListProductUsecase from "./list.product.usecase";


const inputProduct1 = {
    id: "1",
    name: "Product 1",
    price: 100
  };
  const inputProduct2 = {
    id: "2",
    name: "Product 2",
    price: 200
  };

const MockRepository =  ()=>{
    return {
        create: jest.fn(),
        find: jest.fn(),
        update: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([
            new Product(inputProduct1.id, inputProduct1.name, inputProduct1.price),
            new Product(inputProduct2.id, inputProduct2.name, inputProduct2.price)
        ])),
        delete: jest.fn(),
}}

describe("List product unit test", () => {

    it("should list products", async () => {
        const productRepository = MockRepository();

        const listProductUsecase = new ListProductUsecase(productRepository);

        const output = await listProductUsecase.execute();

        expect(output.products.length).toBe(2);
        expect(output.products[0].id).toEqual(inputProduct1.id);
        expect(output.products[0].name).toEqual(inputProduct1.name);
        expect(output.products[0].price).toEqual(inputProduct1.price);
        expect(output.products[1].id).toEqual(inputProduct2.id);
        expect(output.products[1].name).toEqual(inputProduct2.name);
        expect(output.products[1].price).toEqual(inputProduct2.price);
    });

});