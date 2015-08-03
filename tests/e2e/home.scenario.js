/* global  browser, by, element */
'use strict';

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

beforeEach(function () {
  browser.get('/');
});

describe('Application', function () {
  it('home page should greet', function () {
    var heading = element(by.css('h1'));
    chai.expect(heading.getText()).to.eventually.equal('Hello World!');
  });
});
