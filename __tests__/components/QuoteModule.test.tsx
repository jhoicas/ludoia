import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QuoteModule } from '@/app/components/QuoteModule';

// Mock translation hook
jest.mock('@/app/hooks/useTranslation', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  })
}));

// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({
      estimate: {
        estimatedUsd: "$10,000",
        estimatedCop: "$40,000,000",
        estimatedTime: "2 meses",
        complexity: "Alta",
        recommendedStack: ["React", "Node"]
      }
    }),
  })
) as jest.Mock;

describe('QuoteModule Component', () => {
  it('should render the quote module title (translation key)', () => {
    render(<QuoteModule />);
    expect(screen.getByText('quote.title')).toBeInTheDocument();
  });

  it('should prevent submission if description is too short', () => {
    render(<QuoteModule />);
    const button = screen.getByRole('button', { name: /quote.button/i });
    expect(button).toBeDisabled();
    
    const textarea = screen.getByPlaceholderText('quote.placeholder');
    fireEvent.change(textarea, { target: { value: 'short' } });
    
    expect(button).toBeDisabled(); // 5 chars < 10
  });

  it('should submit and display AI estimation', async () => {
    render(<QuoteModule />);
    const textarea = screen.getByPlaceholderText('quote.placeholder');
    const emailInput = screen.getByPlaceholderText('name@company.com');
    const button = screen.getByRole('button', { name: /quote.button/i });
    
    fireEvent.change(textarea, { target: { value: 'This is a valid long description for the AI to parse.' } });
    fireEvent.change(emailInput, { target: { value: 'test@ludoia.com' } });
    
    expect(button).not.toBeDisabled();
    
    fireEvent.click(button);
    
    await waitFor(() => {
      expect(screen.getByText('AI Estimate Results')).toBeInTheDocument();
      expect(screen.getByText('$10,000')).toBeInTheDocument();
      expect(screen.getByText('Alta')).toBeInTheDocument();
    });
  });
});
