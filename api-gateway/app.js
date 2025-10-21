import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

import { services } from './config/addresses.js';

const app = express();

services.forEach((service) => {
  app.use(service.path, createProxyMiddleware({
    target: service.target,
    changeOrigin: true,
    pathRewrite: { [`^${service.path}`]: '' },
  }));
});

app.listen(5000, () => {
  console.log('API Gateway listening on port 5000');
});
