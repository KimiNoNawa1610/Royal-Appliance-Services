
const {Client} = require('pg');
const client = new Client({
    host: "awsras.cy59gewxovx2.us-east-1.rds.amazonaws.com",
    user: "admin443",
    password: "Talonss5!",
    port: "5432",
    database: "CentralDatabase",
});

client.connect();


 async function getAllEmployees(){

    try {
        const res = await client.query(
            `SELECT * FROM "Employees"."Employee"`
        );
        return res.rows;
    } catch (err) {
        return err.stack;
    }
}
async function getEmployeeById(id){

    try {
        const res = await client.query(
            `SELECT * FROM "Employees"."Employee" where "employeeID" = ${id}`
        );
        return res.rows;
    } catch (err) {
        return err.stack;
    }
}


module.exports = {getAllEmployees, getAllEmployees};
