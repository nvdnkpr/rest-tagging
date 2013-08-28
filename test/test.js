// Generated by CoffeeScript 1.6.3
(function() {
  var app, async, http, should, _;

  _ = require("underscore");

  should = require("should");

  async = require("async");

  app = require("../app");

  http = require("../test/support/http");

  describe('REST-Tagging Test', function() {
    before(function(done) {
      http.createServer(app, done);
    });
    after(function(done) {
      done();
    });
    it('PUT /rt/id/TestBucket/id123?score=100 should return 200', function(done) {
      http.request().put('/rt/id/TestBucket/id123?score=100').end(function(resp) {
        resp.statusCode.should.equal(200);
        done();
      });
    });
    it('PUT /rt/id/TestBucket/id123?score=xyz should return 500', function(done) {
      http.request().put('/rt/id/TestBucket/id123?score=xyz').end(function(resp) {
        var result;
        resp.statusCode.should.equal(500);
        result = JSON.parse(resp.body);
        result.message.should.equal("Invalid score format");
        done();
      });
    });
    it('PUT /rt/id/TestBucket/id123?score=100&tags=["tag1","tag2","all"] should return 200 and true', function(done) {
      http.request().put('/rt/id/TestBucket/id123?score=100&tags=["tag1","tag2","all"]').end(function(resp) {
        resp.statusCode.should.equal(200);
        resp.body.should.equal("true");
        done();
      });
    });
    it('PUT /rt/id/TestBucket/id456?score=200&tags=["tag3","tag4","all"] should return 200 and true', function(done) {
      http.request().put('/rt/id/TestBucket/id456?score=200&tags=["tag3","tag4","all"]').end(function(resp) {
        resp.statusCode.should.equal(200);
        resp.body.should.equal("true");
        done();
      });
    });
    it('GET /rt/tags/TestBucket?tags=["all"]', function(done) {
      http.request().get('/rt/tags/TestBucket?tags=["all"]').end(function(resp) {
        var result;
        resp.statusCode.should.equal(200);
        result = JSON.parse(resp.body);
        result.total_items.should.equal(2);
        result.items.should.include("id123");
        result.items.should.include("id456");
        done();
      });
    });
    it('GET /rt/tags/TestBucket?tags=["tag1"]', function(done) {
      http.request().get('/rt/tags/TestBucket?tags=["tag1"]').end(function(resp) {
        var result;
        resp.statusCode.should.equal(200);
        result = JSON.parse(resp.body);
        result.total_items.should.equal(1);
        result.items.should.include("id123");
        done();
      });
    });
    it('GET /rt/tags/TestBucket?tags=["tag3"]', function(done) {
      http.request().get('/rt/tags/TestBucket?tags=["tag3"]').end(function(resp) {
        var result;
        resp.statusCode.should.equal(200);
        result = JSON.parse(resp.body);
        result.total_items.should.equal(1);
        done();
      });
    });
    it('GET /rt/tags/TestBucket?tags=["tag3","tag1"]', function(done) {
      http.request().get('/rt/tags/TestBucket?tags=["tag3","tag1"]').end(function(resp) {
        var result;
        resp.statusCode.should.equal(200);
        result = JSON.parse(resp.body);
        result.total_items.should.equal(0);
        done();
      });
    });
    it('GET /rt/tags/TestBucket?tags=["tag3","tag1"]&type=union', function(done) {
      http.request().get('/rt/tags/TestBucket?tags=["tag3","tag1"]&type=union').end(function(resp) {
        var result;
        resp.statusCode.should.equal(200);
        result = JSON.parse(resp.body);
        result.total_items.should.equal(2);
        result.items.should.include("id123");
        result.items.should.include("id456");
        done();
      });
    });
    it('GET /rt/tags/TestBucket?tags=["tag3","all"]', function(done) {
      http.request().get('/rt/tags/TestBucket?tags=["tag3","all"]').end(function(resp) {
        var result;
        resp.statusCode.should.equal(200);
        result = JSON.parse(resp.body);
        result.total_items.should.equal(1);
        result.items.should.include("id456");
        done();
      });
    });
    it('GET /rt/toptags/TestBucket/10', function(done) {
      http.request().get('/rt/toptags/TestBucket/10').end(function(resp) {
        var result;
        resp.statusCode.should.equal(200);
        result = JSON.parse(resp.body);
        result.total_items.should.equal(5);
        result.items[0].tag.should.equal("all");
        done();
      });
    });
    it('GET /rt/id/TestBucket/id123', function(done) {
      http.request().get('/rt/id/TestBucket/id123').end(function(resp) {
        var result;
        resp.statusCode.should.equal(200);
        result = JSON.parse(resp.body);
        result.should.include("all");
        result.should.include("tag1");
        result.should.include("tag2");
        done();
      });
    });
    it('GET /rt/allids/TestBucket', function(done) {
      http.request().get('/rt/allids/TestBucket').end(function(resp) {
        var result;
        resp.statusCode.should.equal(200);
        result = JSON.parse(resp.body);
        result.should.include("id123");
        result.should.include("id456");
        done();
      });
    });
    it('GET /rt/buckets', function(done) {
      http.request().get('/rt/buckets').end(function(resp) {
        var result;
        resp.statusCode.should.equal(200);
        result = JSON.parse(resp.body);
        result.should.include("TestBucket");
        done();
      });
    });
    it('DELETE /rt/id/TestBucket/id123 should return 200 ', function(done) {
      http.request()["delete"]('/rt/id/TestBucket/id123').expect(200, done);
    });
    it('DELETE /rt/bucket/TestBucket should return 200 ', function(done) {
      http.request()["delete"]('/rt/bucket/TestBucket').expect(200, done);
    });
  });

}).call(this);
