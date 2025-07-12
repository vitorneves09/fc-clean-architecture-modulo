import { response } from "express";
import { app, sequelize } from "../express";
import request from "supertest";
import Address from "../../../domain/customer/value-object/address";

describe(" E2E Customer API Tests", () => {

    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.authenticate();
    });


    it("should create a product A", async () => {
        
        const input = {
            name: "Product 1",
            price: 100,
            type: "a"
        }

        const response = await request(app)
            .post("/product")
            .send(input);

        expect(response.status).toBe(200);
        expect(response.body.name).toBe(input.name);
        expect(response.body.price).toBe(input.price);

    });

    it("Should return empty list when no products exist", async () => {
        const response = await request(app)
            .get("/product");

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body.products)).toBe(true);
        expect(response.body.products).toHaveLength(0);
    });


    it("Should return list with one product", async () => {

        const productData = {
            name: "Product 2",
            price: 200,
            type: "a"
        };

        await request(app)
            .post("/product")
            .send(productData);


        const response = await request(app)
            .get("/product");


        expect(response.status).toBe(200);
        expect(Array.isArray(response.body.products)).toBe(true);
        expect(response.body.products).toHaveLength(1);
        expect(response.body.products[0].name).toBe(productData.name);
    });

    it("Should get a product by id", async () => {
        const productData = {
            name: "Product 3",
            price: 300,
            type: "a"
        };

        const createResponse = await request(app)
            .post("/product")
            .send(productData);

        const productId = createResponse.body.id;

        const response = await request(app)
            .get(`/product/${productId}`);

        expect(response.status).toBe(200);
        expect(response.body.id).toBe(productId);
        expect(response.body.name).toBe(productData.name);
        expect(response.body.price).toBe(productData.price);
    });

    it("Should return 404 when getting a non-existent product", async () => {
        const response = await request(app)
            .get("/product/invalid-id-123");

        expect(response.status).toBe(404);
    });

    it("Should delete a product", async () => {
        const productData = {
            name: "Product 4",
            price: 400,
            type: "a"
        };

        const createResponse = await request(app)
            .post("/product")
            .send(productData);

        const productId = createResponse.body.id;

        const deleteResponse = await request(app)
            .delete(`/product/${productId}`);

        expect(deleteResponse.status).toBe(204);

        const getResponse = await request(app)
            .get(`/product/${productId}`);
        expect(getResponse.status).toBe(404);
    });

    it("Should update a product", async () => {

        const productData = {
            name: "Product 2",
            price: 200,
            type: "a"
        };

        const resposne = await request(app)
            .post("/product")
            .send(productData);


        const response = await request(app)
            .put("/product/" + resposne.body.id)
            .send({
                id: resposne.body.id,
                name: "Product 2",
                price: 250,
            });

        expect(response.status).toBe(200);
        expect(response.body.name).toBe(productData.name);
        expect(response.body.price).toBe(250);
    });

    it("should create a product B", async () => {
        const input = {
            name: "Product B1",
            price: 150,
            type: "b"
        };

        const response = await request(app)
            .post("/product")
            .send(input);

        expect(response.status).toBe(200);
        expect(response.body.name).toBe(input.name);
        expect(response.body.price).toBe(input.price * 2); // Produto B dobra o preço
    });

    it("Should update a product B", async () => {
        const productData = {
            name: "Product B2",
            price: 300,
            type: "b"
        };

        const createResponse = await request(app)
            .post("/product")
            .send(productData);

        const response = await request(app)
            .put("/product/" + createResponse.body.id)
            .send({
                id: createResponse.body.id,
                name: "Product B2 Updated",
                price: 350,
            });

        expect(response.status).toBe(200);
        expect(response.body.name).toBe("Product B2 Updated");
        expect(response.body.price).toBe(350); // Produto B dobra o preço
    });

});