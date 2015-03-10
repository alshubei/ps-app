'use strict';

describe('Main', function () {
  var React = require('react');
  var App, component;

  beforeEach(function () {
    var container = document.createElement('div');
    container.id = 'content';
    document.body.appendChild(container);

    App = require('components/App.js');
    component = React.createElement(ReactWebpackApp);
  });

  it('should create a new instance of App', function () {
    expect(component).toBeDefined();
  });
});
