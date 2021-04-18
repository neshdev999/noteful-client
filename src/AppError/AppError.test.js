import React from 'react';

import AppError from './AppError';
import { shallow } from 'enzyme';
import App from '../App/App';


describe('When no JS errors are caught in a child component', () => {
  let ErrorBoundaryComponent;

  beforeAll(() => {
    ErrorBoundaryComponent = shallow(<AppError><App /></AppError>);
  });

  it('should render the child component', () => {
    expect(ErrorBoundaryComponent.find(App).exists()).toBeTruthy();
  });
});

describe('When a JS error is caught in a child component', () => {
  let ErrorBoundaryComponent;

  beforeAll(() => {
    jest.spyOn(global.console, 'log');
    ErrorBoundaryComponent = shallow(<AppError><App /></AppError>);
    ErrorBoundaryComponent.instance().componentDidCatch('oh nooos an error');
    ErrorBoundaryComponent.update();
  });

  it('should update the state to indicate an error', () => {
    expect(ErrorBoundaryComponent.instance().state.hasError).toBeTruthy();
  });

});