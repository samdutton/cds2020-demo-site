/**
 *
 *  Online store PWA sample.
 *  Copyright 2017 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */
const http = require('http');

const app = require('./app').default;

// Get port from environment and store in Express.
// TODO: H2 + TLS.
const port = parseInt(process.env.PORT, 10) || 3000;
app.set('port', port);

// Create HTTP server.
const server = http.createServer(app);

// Listen on provided port, on all network interfaces.
server.listen(port);
server.on('listening', () => {
  const addr = server.address();
  console.log(`Listening on port ${addr.port}`);
});
server.on('error', (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  // Handle specific listen errors with friendly messages.
  switch (error.code) {
  case 'EACCES':
    console.error(`Port ${port} requires elevated privileges`);
    process.exit(1);
    break;
  case 'EADDRINUSE':
    console.error(`Port ${port} is already in use`);
    process.exit(1);
    break;
  default:
    throw error;
  }
});
