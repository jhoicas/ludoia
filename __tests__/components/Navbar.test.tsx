import { render, screen } from '@testing-library/react';
import { Navbar } from '@/app/components/Navbar';

describe('Navbar Component', () => {
  it('should render the Ludoia logo/brand', () => {
    render(<Navbar />);
    const brandElements = screen.getAllByText(/Ludoia/i);
    expect(brandElements.length).toBeGreaterThan(0);
  });
});
