var request = require('supertest');
var app = require('../index');

describe('API', function() {

  describe('Contacts', function() {

    it('GET /contacts should return the list of registered contacts', function() {
      return request(app)
      .get('/api/contacts')
      .send()
      .expect(200);
    });

    it('GET /contacts/:name should return the list of registered contacts with the same name', function() {
      return request(app)
      .get('/api/contacts/foo')
      .send()
      .expect(200);
    });

    it('POST /contacts should create a new contact', function() {
      return request(app)
      .post('/api/contacts')
      .send({
        contact: {
          name:"edward"
        }
      })
      .expect(200);
    });

    it('PUT /contacts/:name/:new should update all contact with the same name', function() {
      return request(app)
      .put('/api/contacts/foo/bar')
      .send()
      .expect(200);
    });

    it('DELETE /contacts/:name should update all contact with the same name', function() {
      return request(app)
      .delete('/api/contacts/foo')
      .send()
      .expect(200);
    });

  });
});
