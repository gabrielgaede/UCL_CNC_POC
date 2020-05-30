module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    if (req.query.command || (req.body && req.body.command)) {
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: "Your Command: " + (req.query.command || req.body.command)
        };
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass a command on the query string or in the request body"
        };
    }
};