import { app, sequelize } from "../express";
import request from "supertest";

describe(" E2E Customer API Tests", () => {

    beforeEach(async ()=>{
        await sequelize.sync({ force: true });
    });    

    afterAll(async () => {
        await sequelize.authenticate();
    });


    it("should create a customer", async ()=>{
        const response = await request(app)
            .post("/customer")
            .send({
                name: "John Doe",
                active: true,
                address: {
                    street: "123 Main St",
                    city: "Anytown",
                    number: 123,
                    zip: "12345"
                } });

            console.log(response);

        expect(response.status).toBe(200);
        expect(response.body.name).toBe("John Doe");
        expect(response.body.active).toBe(true);
        expect(response.body.address.street).toBe("123 Main St");                   
        
    });

});