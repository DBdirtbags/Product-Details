const app = require('./server.js');
const supertest = require('supertest');
const request = supertest(app);


it('tests the / endpoint', async done => {
  const response = await request.get('/');
  expect(response.status).toBe(200);
  expect(response.body.message).toBe('hello world!');
  done();
})

it('tests the /products endpoint', async done => {
  const response = await request.get('/products/1');
  expect(
    'product_id' in response.body &&
    'features' in response.body &&
    'slogan' in response.body &&
    'description' in response.body &&
    'category' in response.body &&
    'default_price' in response.body &&
    'features' in response.body &&
    'feature_value' in response.body.features[0] &&
    'feature' in response.body.features[0]
  ).toBe(true);
  done();
});

it('tests the /products/:product_id/styles endpoint', async done => {
  const response = await request.get('/products/1/styles');
  expect(
    'product_id' in response.body &&
    'results' in response.body &&
    'photos' in response.body.results[0] &&
    'skus' in response.body.results[0]
  ).toBe(true);
  done();
});

it('tests the /products/:product_id/related endpoint', async done => {
  const response = await request.get('/products/1/related');
  expect(response.body.length).toBe(4);
  done();
});

it('tests a POST to the /cart endpoint', async done => {
  const response = await request.post('/cart');
  expect(response.status).toBe(201);
  done();
});

it('tests a GET from the /cart endpoint', async done => {
  const response = await request.get('/cart');
  expect(response.status).toBe(200);
  done();
});
