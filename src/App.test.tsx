import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Store } from './services/store/Store';
import App from './App';

describe('App', () => {
  it('renders the root layout', () => {
    const { container } = render(
      <Provider store={Store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );
    expect(container).toBeTruthy();
  });
});
