const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});
const dynamodb = new AWS.DynamoDB.DocumentClient();
const tableName = 'printers-tbl';
const healthPath = '/health';
const printersPath = '/printers';
const printerPath = '/printer';

exports.handler = async function (event)  {
    console.log('Request event: ', event);
    let response;

    switch(true)
    {
        case event.httpMethod === 'GET' && event.path === healthPath:
            response = buildResponse(200, 'OK');
            break;
        case event.httpMethod === 'GET' && event.path === printersPath:
            response = await getPrinters();
            break;
        case event.httpMethod === 'GET' && event.path === printerPath:
            response = await getPrinter(event.queryStringParameters.printerId);
            break;
        case event.httpMethod === 'POST' && event.path === printerPath:
            response = await createPrinter(JSON.parse(event.body));
            break;
        case event.httpMethod === 'PATCH' && event.path === printerPath:
            const requestBody = JSON.parse(event.body);
            response = await updatePrinter(requestBody.printerId, requestBody.printerIP, requestBody.printerName, requestBody.printerStatus);
            break;
        case event.httpMethod === 'DELETE' && event.path === printerPath:
            response = await deletePrinter(JSON.parse(event.body).printerId);
            break;
        default:
            response = buildResponse(404, '404Not Found');
            break;
    }

    return response;
}

async function getPrinters() {
    const params = {
        TableName: tableName,
    }
    const allPrinters = await scanDynamoRecords(params, []);
    const body = {
        printers: allPrinters
    }
    return buildResponse(200, body);
};

async function getPrinter(printerId) {
    const params = {
        TableName: tableName,
        Key:{
            "printerId": printerId
        }
    }
    return await dynamodb.get(params).promise().then((data) => {
        return buildResponse(200, data.Item);
    }).catch((err) => {
        console.log("error- printer not found",err)
        return buildResponse(500, "error- printer not found");
    });
};

async function createPrinter(printer) {
    const params = {
        TableName: tableName,
        Item: printer
    }
    return await dynamodb.put(params).promise().then(() => {
        const body={
            message: 'Printer created successfully',
            Operation: 'Create',
            Item: printer
        }
        return buildResponse(200, body);
    }).catch((err) => {
        console.log("error- printer not created", err);
        return buildResponse(500, "error- printer not created");
    });
};

async function updatePrinter(printerId, printerIP, printerName, printerStatus) {
    const params = {
        TableName: tableName,
        Key:{
            "printerId": printerId
        },
        UpdateExpression: "set printerIP = :ip, printerName = :name, printerStatus = :status",
        ExpressionAttributeValues:{
            ":ip": printerIP,
            ":name": printerName,
            ":status": printerStatus
        },
        ReturnValues:"UPDATED_NEW"
    }
    return await dynamodb.update(params).promise().then((response) => {
        const body={
            message: 'Printer updated successfully',
            Operation: 'Update',
            Item: response
        }
        return buildResponse(200, body);
    }).catch((err) => {
        console.log( "error- printer not updated",err)
        return buildResponse(500, "error- printer not updated");
    });
};

async function deletePrinter(printerId) {
    const params = {
        TableName: tableName,
        Key:{
            "printerId": printerId
        },
        ReturnValues:"ALL_OLD"
    }
    return await dynamodb.delete(params).promise().then((data) => {
        const body={
            message: 'Printer deleted successfully',
            Operation: 'Delete',
            Item: data
        }
        return buildResponse(200, body);
    }).catch((err) => {
        console.log("error- printed not deleted",err)
        return buildResponse(500, "error- printed not deleted");
    });
};

async function scanDynamoRecords(scanParams, itemArray)
{
    try{
        const data = await dynamodb.scan(scanParams).promise();
        itemArray = itemArray.concat(data.Items);
        if (data.LastEvaluatedKey) {
            scanParams.ExclusiveStartKey = data.LastEvaluatedKey;
            await scanDynamoRecords(scanParams, itemArray);
        }
        return itemArray;
    }
    catch(err){
        console.log(err);
    }

}

function buildResponse(statusCode, body) {
    return {
        statusCode: statusCode,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    };
}


