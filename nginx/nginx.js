const express = require("express");
const app = express();
const httpProxy = require('http-proxy');
const hosts = process.env.HOSTS.split(",");
const PORT = process.env.PORT || 8000;

const nextHost = ((i) => {
    return () => {
        return hosts[(++i) % hosts.length];
    }
})(1);

let proxy = httpProxy.createProxyServer({});

app.use((req, res) => {
    proxy.web(req, res, {
        target: nextHost()
    });
});

app.listen(PORT, () => console.log(`listening on port ${PORT}!`))