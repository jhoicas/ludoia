import { render, screen } from '@testing-library/react';
import { QuoteModule } from '@/app/components/QuoteModule';

describe('QuoteModule Component', () => {
  it('should render the quote module', () => {
    render(<QuoteModule />);
    const button = screen.getByRole('button', { name: /cotizar/i });
    expect(button).toBeInTheDocument();
  });
});
