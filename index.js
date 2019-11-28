const express = require('express');
const app = express();
const bodyParser = require('body-parser');
let request = require("request");
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
        methods: [
            {
                name: "Add up two Dataset",
                parameter: ["Dataset1","Dataset2"],
                output: ["Dataset"]
            },
            {
                name: "Add up three Dataset",
                parameter: ["Dataset1","Dataset2","Dataset3"],
                output: ["Dataset"]
            }
        ]
    };
    response.send(JSON.stringify(apiInfo));
});

app.post('/tool1', async (request, response) => {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    response.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

    let method = request.body[0];
    if (method === "Add up two Dataset") {
        let data = [];
        for (let i = 1; i <  request.body.length; i ++) {
            if ( typeof request.body[i] === "string") {
                let result = await extractURL(request.body[i]);
                data.push(JSON.parse(result));
            }else {
                data.push(request.body[i]);
            }
        }
        console.log(data);
        let result = [];
        for (let i = 0; i < data[0].length; i ++) {
            let row = {};
            let data1Key = Object.keys(data[0][i]);
            let data1Value = Object.values(data[0][i]);
            let data2Value = Object.values(data[1][i]);
            for (let j = 0; j < data1Key.length; j ++) {
                row[data1Key[j]] = data1Value[j] + data2Value[j];
            }
            result.push(row);
        }
        let resultApi = await putData(result);
        response.send(JSON.stringify(["http://127.0.0.1:2223/getData?" + resultApi]));
    } else if (method === "Add up three Dataset"){
        let data = [];
        for (let i = 1; i <  request.body.length; i ++) {
            if ( typeof request.body[i] === "string") {
                let result = await extractURL(request.body[i]);
                data.push(JSON.parse(result));
            }else {
                data.push(request.body[i]);
            }
        }
        console.log(data);
        let result = [];
        for (let i = 0; i < data[0].length; i ++) {
            let row = {};
            let data1Key = Object.keys(data[0][i]);
            let data1Value = Object.values(data[0][i]);
            let data2Value = Object.values(data[1][i]);
            let data3Value = Object.values(data[2][i]);
            for (let j = 0; j < data1Key.length; j ++) {
                row[data1Key[j]] = data1Value[j] + data2Value[j] + data3Value[j];
            }
            result.push(row);
        }
        let resultApi = await putData(result);
        response.send(JSON.stringify(["http://127.0.0.1:2223/getData?" + resultApi]));
    }else {
        response.send("Err")
    }
});

function extractURL(url){
    return new Promise((resolve, reject) => {
        request(url, (error, response, body) => {
            if (error) {
                reject(error);
            }else if (response.statusCode !== 200){
                reject(body);
            }else {
                resolve(body);
            }
        })
    });
}
function putData(data){
    return new Promise((resolve, reject) => {
        request.post("http://127.0.0.1:2223/putData", {
            json: data
        }, (error, response, body) => {
            if (error) {
                reject(error);
            }else if (response.statusCode !== 200){
                reject(body);
            }else {
                resolve(body);
            }
        })
    });
}




app.get('/data1', (request, response) => {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    response.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

    let data = [
        {
            "Column 1": 1,
            "Column 2": 2,
            "Column 3": 3
        },
        {
            "Column 1": 4,
            "Column 2": 5,
            "Column 3": 6
        },
        {
            "Column 1": 7,
            "Column 2": 8,
            "Column 3": 9
        }
    ];
    response.send(JSON.stringify(data));
});

app.get('/data2', (request, response) => {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    response.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

    let data = [
        {
            "Column 1": 9,
            "Column 2": 8,
            "Column 3": 7
        },
        {
            "Column 1": 6,
            "Column 2": 5,
            "Column 3": 4
        },
        {
            "Column 1": 3,
            "Column 2": 2,
            "Column 3": 1
        }
    ];
    response.send(JSON.stringify(data));
});


app.get('/tool2', (request, response) => {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    response.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

    let apiInfo = {
        name: "Chose One",
        desc: "Chose one",
        methods: [
            {
                name: "First One",
                parameter: ["Dataset1","Dataset2"],
                output: ["Dataset"]
            },
            {
                name: "Second one",
                parameter: ["Dataset1","Dataset2"],
                output: ["Dataset"]
            }
        ]
    };
    response.send(JSON.stringify(apiInfo));
});

app.post('/tool2',  (request, response) => {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    response.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    console.log(request.body);
    let method = request.body[0];
    let data1 = request.body[1];
    let data2 = request.body[2];
    if (method === "First One") {

        response.send(JSON.stringify([data1]));
    }else {
        response.send(JSON.stringify([data2]));
    }
});

app.listen(12323);