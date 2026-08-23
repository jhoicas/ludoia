import { render, screen } from '@testing-library/react';
import { SaaSGrid } from '@/app/components/SaaSGrid';

describe('SaaSGrid Component', () => {
  it('should render the SaaS grid container', () => {
    render(<SaaSGrid />);
    const heading = screen.getByRole('heading', { name: /características/i, hidden: true });
    expect(heading).toBeInTheDocument();
  });
});
