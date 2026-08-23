import { render, screen, fireEvent } from '@testing-library/react';
import { QuoteModule } from '@/app/components/QuoteModule';

// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ success: true }),
  })
) as jest.Mock;

describe('QuoteModule Component', () => {
  it('should render the quote module correctly', () => {
    render(<QuoteModule />);
    expect(screen.getByText('Cotizador Interactivo')).toBeInTheDocument();
  });

  it('should calculate base cost correctly', () => {
    render(<QuoteModule />);
    const slider = screen.getByRole('slider');
    
    // Change to 100 hours
    fireEvent.change(slider, { target: { value: '100' } });
    expect(screen.getByText('Horas Estimadas de Desarrollo: 100h')).toBeInTheDocument();
    
    // 100 hours * $45 = $4,500
    expect(screen.getByText('$4,500.00')).toBeInTheDocument();
  });

  it('should apply source code markup correctly', () => {
    render(<QuoteModule />);
    const modelSelect = screen.getAllByRole('combobox')[0]; // First select is model
    
    fireEvent.change(modelSelect, { target: { value: 'source' } });
    
    // 100 hours * $45 * 2.5 markup = $11,250
    expect(screen.getByText('$11,250.00')).toBeInTheDocument();
  });
});
