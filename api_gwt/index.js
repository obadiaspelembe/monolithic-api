var express = require('express');
var app = express();
var httpProxy = require('http-proxy');
var apiProxy = httpProxy.createProxyServer();
const M_CUSTOM_FIELDS = 'http://web:8081';
const M_REPORTS = 'http://web:8082';

const PORT = 8000;
const HOST = '0.0.0.0';


app.all("/m_custom_fields/*", function (req, res) {
    console.log("redirecting to m_custom_field");
    apiProxy.web(req, res, { target: M_CUSTOM_FIELDS });
});

app.all("/m_reports/*", function (req, res) {
    console.log("redirecting to m_reports");
    apiProxy.web(req, res, { target: M_REPORTS });
});



app.listen(PORT, HOST, () => {
    console.log(`Proxy Server running on http://${HOST}:${PORT}`);
});