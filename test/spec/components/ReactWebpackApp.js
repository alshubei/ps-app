'use strict';

describe('Main', function () {
  var React = require('react/addons');
  var ReactWebpackApp, component;

  beforeEach(function () {
    var container = document.createElement('div');
    container.id = 'content';
    document.body.appendChild(container);

    ReactWebpackApp = require('components/ReactWebpackApp.js');
    component = React.createElement(ReactWebpackApp);
  });

  it('should create a new instance of ReactWebpackApp', function () {
    expect(component).toBeDefined();
  });
});
