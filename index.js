const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(bodyParser.json({limit: '1mb'}));
app.use(cors());
app.get('/tool1', (request, response) => {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    response.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

    let apiInfo = {
        name: "Add up",
        desc: "Adding up of two dataset",
        parameter: ["Dataset1","Dataset2"],
        output: ["Dataset"]
    };
    response.send(JSON.stringify(apiInfo));
});

app.post('/tool1',  (request, response) => {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    response.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

    let data1 = request.body[0];
    let data2 = request.body[1];
    let result = [];
    for (let i = 0; i < data1.length; i ++) {
        let row = [];
        for (let j = 0; j < data1[0].length; j ++) {
            row.push(data1[i][j] + data2[i][j]);
        }
        result.push(row);
    }
    response.send(JSON.stringify([result]));
});





app.get('/data1', (request, response) => {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    response.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

    let data = [
        [1,2,3],
        [4,5,6],
        [7,8,9]
    ];
    response.send(JSON.stringify(data));
});

app.get('/data2', (request, response) => {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    response.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

    let data = [
        [9,8,7],
        [6,5,4],
        [3,2,1]
    ];
    response.send(JSON.stringify(data));
});

app.listen(3000);