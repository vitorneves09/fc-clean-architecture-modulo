import { response } from "express";
import { app, sequelize } from "../express";
import request from "supertest";

describe(" E2E Customer API Tests", () => {

    beforeEach(async ()=>{
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

            console.log(response);

        expect(response.status).toBe(200);
        expect(response.body.name).toBe(input.name);
        expect(response.body.price).toBe(input.price);                   
        
    });



});