const http = require('http');

console.log('begin');

const server = http.createServer((req, res) => {
  console.log(req.method, req.url);

  if (req.url === '/') {
    res.write('Hello Node Server');
    res.end();
  }

  if (req.url === '/products') {
    const products = ['iPhone', 'Samsung'];
    res.write(JSON.stringify(products));
    res.end();
  }
});

server.listen(3000, () => {
  console.log('Server is listening on port 3000..');
});

console.log('end');
