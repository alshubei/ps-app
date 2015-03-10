'use strict';

describe('Main', function () {
  var React = require('react');
  var ReactWebpackApp, component;

  beforeEach(function () {
    var container = document.createElement('div');
    container.id = 'content';
    document.body.appendChild(container);

    ReactWebpackApp = require('components/App.js');
    component = React.createElement(ReactWebpackApp);
  });

  it('should create a new instance of App', function () {
    expect(component).toBeDefined();
  });
});
