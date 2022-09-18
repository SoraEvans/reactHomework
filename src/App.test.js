import { fireEvent, render, screen } from '@testing-library/react'
import Home from './pages/Home'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { SignUp } from'./pages/SignUp'
import { BrowserRouter } from 'react-router-dom'
import React from 'react'
import { getGistsSuccess } from './redux/slice'
import renderer from 'react-test-renderer'
import NotFound from './pages/NotFound'

test('renders Home page', () => {
  render(<Home />);
  const linkElement = screen.getByText(/Home/i);
  expect(linkElement).toBeInTheDocument();
});

test('Check input change on SignIn page', () => {
  render(
      <Provider store={store}>
        <BrowserRouter>
          <SignUp />
        </BrowserRouter>
      </Provider>
  );
  const input = screen.getByTestId('content-input')

  const hasInputValue = (e, inputValue) => {
    return screen.getByDisplayValue(inputValue) === e
  }

  fireEvent.change(input, { target: { value: 'test text' } })
  expect(hasInputValue(input, 'test text')).toBe(true)
});

describe('Test Reducer', () => {
  it('+++ reducer for getGistsSuccess', () => {
    let state = { output: 100 }
    state = getGistsSuccess(state, { payload: 500 })
    console.log('state:', state)
    expect(state).toEqual({ type: 'gists/getGistsSuccess', payload: { output: 100 } })
  });
});

test('renders correctly', () => {
    const tree = renderer.create(
        <NotFound/>
    ).toJSON();
  expect(tree).toMatchSnapshot();
});