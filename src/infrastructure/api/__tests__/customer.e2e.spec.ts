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
        expect(response.body.address.street).toBe("123 Main St");                   
        
    });

    it("should return empty list when no customers exist", async () => {
        const response = await request(app)
            .get("/customer");

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body.customers)).toBe(true);
        expect(response.body.customers).toHaveLength(0);
    });

    it("should return list with one customer", async () => {
        // Arrange: Create a customer first
        const customerData = {
            name: "Jane Smith",
            address: {
                street: "456 Oak Avenue",
                city: "Springfield",
                number: 456,
                zip: "54321"
            }
        };

        await request(app)
            .post("/customer")
            .send(customerData);

        // Act: Get the list
        const response = await request(app)
            .get("/customer");

        // Assert
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body.customers)).toBe(true);
        expect(response.body.customers).toHaveLength(1);
        expect(response.body.customers[0].name).toBe("Jane Smith");
        expect(response.body.customers[0].address.street).toBe("456 Oak Avenue");
        expect(response.body.customers[0].id).toBeDefined();
    });

    it("should get a customer by id", async () => {
        // Arrange: cria um cliente
        const customerData = {
            name: "Carlos Silva",
            address: {
                street: "Rua das Flores",
                city: "Belo Horizonte",
                number: 789,
                zip: "30123-456"
            }
        };

        const createResponse = await request(app)
            .post("/customer")
            .send(customerData);

        const customerId = createResponse.body.id;

        // Act: busca o cliente pelo id
        const response = await request(app)
            .get(`/customer/${customerId}`);

        // Assert
        expect(response.status).toBe(200);
        expect(response.body.id).toBe(customerId);
        expect(response.body.name).toBe("Carlos Silva");
        expect(response.body.address.street).toBe("Rua das Flores");
    });

    it("should return 404 when getting a non-existent customer", async () => {
        const response = await request(app)
            .get("/customer/invalid-id-123");

        expect(response.status).toBe(404);
    });

    it("should delete a customer", async () => {
        // Arrange: cria um cliente
        const customerData = {
            name: "Maria Oliveira",
            address: {
                street: "Av. Brasil",
                city: "Rio de Janeiro",
                number: 321,
                zip: "20000-000"
            }
        };

        const createResponse = await request(app)
            .post("/customer")
            .send(customerData);

        const customerId = createResponse.body.id;

        // Act: deleta o cliente
        const deleteResponse = await request(app)
            .delete(`/customer/${customerId}`);

        // Assert
        expect(deleteResponse.status).toBe(204);

        // Verifica se realmente foi deletado
        const getResponse = await request(app)
            .get(`/customer/${customerId}`);
        expect(getResponse.status).toBe(404);
    });

    it("Should update a product", async () => {

        const customerDate = {
            name: "Customer 1",
            address: {
                street: "123 Main St",
                city: "Anytown",
                number: 123,
                zip: "12345"
            }
        };

        const resposne = await request(app)
            .post("/customer")
            .send(customerDate);


        const newCustomerData = {
            id: resposne.body.id,
            name: "Customer 11",
            address: {
                street: "123 Main St",
                city: "Anytown",
                number: 123,
                zip: "12345"
            }
        }

        const response = await request(app)
            .put("/customer/" + resposne.body.id)
            .send(newCustomerData);

        expect(response.status).toBe(200);
        expect(response.body.name).toBe(newCustomerData.name);
    });

});