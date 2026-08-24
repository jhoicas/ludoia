import { render, screen } from '@testing-library/react';
import { Hero } from '@/app/components/Hero';

jest.mock('@/app/hooks/useTranslation', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  })
}));

describe('Hero Component', () => {
  it('should render the main title', () => {
    render(<Hero />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent(/hero.title/i);
  });

  it('should render CTA buttons', () => {
    render(<Hero />);
    expect(screen.getByText('hero.ctaPrimary')).toBeInTheDocument();
  });
});
