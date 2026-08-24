import { render, screen } from '@testing-library/react';
import { BentoGrid } from '@/app/components/BentoGrid';

jest.mock('@/app/hooks/useTranslation', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  })
}));

describe('BentoGrid Component', () => {
  it('should render the success cases section', () => {
    render(<BentoGrid />);
    expect(screen.getByText('cases.title')).toBeInTheDocument();
  });

  it('should render Agendador and StockIA cases', () => {
    render(<BentoGrid />);
    expect(screen.getByText('Agendador')).toBeInTheDocument();
    expect(screen.getByText('StockIA')).toBeInTheDocument();
  });
});
