import { render, screen } from '@testing-library/react';
import { Hero } from '@/app/components/Hero';

describe('Hero Component', () => {
  it('should render the main CTAs', () => {
    render(<Hero />);
    const cta = screen.getAllByRole('link', { name: /demo erp|agendar llamada/i });
    expect(cta.length).toBeGreaterThan(0);
  });
});
