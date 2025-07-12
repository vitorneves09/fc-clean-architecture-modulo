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

});