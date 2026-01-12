//Note: These tests are required for azure pipeline file
const request = require('supertest');
const { expect } = require('chai');
const app = require('../app');

describe('API Root Endpoint Tests', () => {
  describe('GET /', () => {
    it('should return 404 status code', (done) => {
      request(app)
        .get('/')
        .expect(404)
        .end(done);
    });

    it('should return error message for non-existent route', (done) => {
      request(app)
        .get('/')
        .expect(404)
        .end((err, res) => {
          if (err) return done(err);

          expect(res.body).to.have.property('error');
          expect(res.body.error).to.have.property('message');
          expect(res.body.error.message).to.equal(
            'This page does not exist, Navigate to /products or /orders or /visitors or /health'
          );
          done();
        });
    });

    it('should return JSON response', (done) => {
      request(app)
        .get('/')
        .expect('Content-Type', /json/)
        .expect(404)
        .end(done);
    });
  });
});
