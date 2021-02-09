const lambdaBodyParser = (event = null) => {
    if (event) {
        let body = {};
        if (event.queryStringParameters) {
            console.log('LAMBDA BODY PARSER => query string');
            body = event.queryStringParameters;
        } else if (event.body) {
            console.log('LAMBDA BODY PARSER => event body');

            if (event.isBase64Encoded) {
                console.log('LAMBDA BODY PARSER => body is base64 string');
                let buff = new Buffer.from(event.body, 'base64')
                body = JSON.parse(buff);
            } else {
                if (typeof event.body === 'object') {
                    console.log('LAMBDA BODY PARSER => body is an object');
                    body = JSON.parse(event.body);
                } else if (typeof event.body === 'string') {
                    console.log('LAMBDA BODY PARSER => body is a string');
                    body = JSON.parse(event.body);
                } else {
                    console.log('LAMBDA BODY PARSER => body is not an object');
                    console.log(event);
                    body = event.body;
                }
            }


        } else {
            console.log('LAMBDA BODY PARSER => event data');
            //just for local invoke
            body = event.data;

            //just for aws lambda server
            //body = event.pathParameters.data;
        }

        return body;
    } else {
        console.log('no event data');
        return {}
    }
}

module.exports = lambdaBodyParser;