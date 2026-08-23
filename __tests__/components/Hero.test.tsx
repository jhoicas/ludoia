import { render, screen } from '@testing-library/react';
import { Hero } from '@/app/components/Hero';

describe('Hero Component', () => {
  it('should render the main title', () => {
    render(<Hero />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent(/Software a la Medida/i);
  });

  it('should render CTA buttons', () => {
    render(<Hero />);
    expect(screen.getByText('Cotizar Proyecto')).toBeInTheDocument();
  });
});
