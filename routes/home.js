const router = require('express').Router();

try {
  router.get('/', async (request, response, next) => {
    response.send({ message: 'Welcome to Grapgql Backend' });
  });
} catch (e) {
  console.log(`[Route Error] /home: ${e.message}`);
} finally {
  module.exports = router;
}
