/* global  browser, by, element */
'use strict';

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

describe('Application', function () {
  beforeEach(function () {
    browser.get('/');
  });

  it('home page should greet', function (done) {
    var heading = element(by.css('h1'));
    chai.expect(heading.getText()).to.eventually.equal('Hello World!');
    done();
  });
});
