const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

const {getAllEmployees, getEmployeeFromID} = require('./TechQueries.js');

app.listen(3002, () =>
    console.log('Example app listening on port 3002!'),
);

app.get('/allTechs', async (req, res) => {
    const allTechs = await getAllEmployees();
    res.send(allTechs);
});

