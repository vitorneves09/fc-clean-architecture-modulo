import Product from "../../../domain/product/entity/product";
import UpdateProductUsecase from "./update.product.usecase";




const inputProduct = {
    id: "1",
    name: "Product 1",
    price: 100
};

const product = new Product(inputProduct.id, inputProduct.name, inputProduct.price);


const MockRepository = () => {
    return {
        create: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        update: jest.fn(),
        findAll: jest.fn(),
        delete: jest.fn(),
    }
}

describe("Update product unit test", () => {

    it("should update a product", async () => {
        const productRepository = MockRepository();

        const updateProductUsecase = new UpdateProductUsecase(productRepository);

        const output = await updateProductUsecase.execute({
            id: inputProduct.id,
            name: "Updated Product",
            price: 150
        });

        expect(output.id).toEqual(inputProduct.id);
        expect(output.name).toEqual("Updated Product");
        expect(output.price).toEqual(150);
    });

});