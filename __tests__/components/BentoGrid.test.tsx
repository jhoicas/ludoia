import { render, screen } from '@testing-library/react';
import { BentoGrid } from '@/app/components/BentoGrid';

describe('BentoGrid Component', () => {
  it('should render the success cases section', () => {
    render(<BentoGrid />);
    expect(screen.getByText('Casos de Éxito a la Medida')).toBeInTheDocument();
  });

  it('should render Agendador and StockIA cases', () => {
    render(<BentoGrid />);
    expect(screen.getByText('Agendador')).toBeInTheDocument();
    expect(screen.getByText('StockIA')).toBeInTheDocument();
  });
});
