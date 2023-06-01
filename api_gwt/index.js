var express = require('express');
const CONFIG = require('./config.json');
const yamlProcessor = require("js-yaml");
const fs = require("fs"); 
var matchstick = require('./matchurl');


var app = express();


const PORT = 8000;
const HOST = '0.0.0.0';

var httpProxy = require('http-proxy');
var apiProxy = httpProxy.createProxyServer();

let openAPI = fs.readFileSync(CONFIG.openApiFile, "utf8");
let loadedOpenAPI = yamlProcessor.load(openAPI);

const paths = Object.keys(loadedOpenAPI.paths);

function getMatchingPattern(url, method) {

    var targetPath = url;

    paths.forEach(path => {
        var splitted = path.split("/")
        var qrps = splitted.filter(path => path.startsWith("{"));
        if (qrps.length > 0 && matchstick(path, 'template').match(url)) targetPath = path;
    })

    var targetService = loadedOpenAPI.paths[targetPath];
    var securityScopes = [];

    if (targetService[method]) {

        const security = targetService[method]?.security;

        var securityPolicies = security ?? []


        securityPolicies.forEach(policy => {
            Object.keys(policy).forEach(key => { 
                console.log(securityScopes.concat(policy[key]))
            })
        })

    }
}

const BEARER_HEARER = "Bearer 9bf8753e4d8c92db8de29f0be97e2fa6c29274d2c292f975ce7ed2e663228896"

CONFIG.services.forEach(service => {

    // Match exact routes
    app.all(service.routing_prefix, function (req, res) {
        if (req.headers.authorization !== BEARER_HEARER) return res.status(403).json()

        getMatchingPattern(req.url, req.method.toLowerCase())
        apiProxy.web(req, res, { target: service.service_endpoint })
    })

    // Match route for [endpoint]/*
    app.all(`${service.routing_prefix}/*`, function (req, res) {
        if (req.headers.authorization !== BEARER_HEARER) return res.status(403).json()
        getMatchingPattern(req.url, req.method.toLowerCase())
        apiProxy.web(req, res, { target: service.service_endpoint })
    })
});



app.listen(PORT, HOST, () => {
    console.log(`Proxy Server running on http://${HOST}:${PORT}`);
});