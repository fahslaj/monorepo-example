import { render } from '@testing-library/react';

import PlaceholderPage from './placeholder-page';

describe('PlaceholderPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PlaceholderPage />);
    expect(baseElement).toBeTruthy();
  });
});
