import { render, screen } from '@testing-library/react';
import { FloatingWhatsapp } from '@/app/components/FloatingWhatsapp';

describe('FloatingWhatsapp Component', () => {
  it('should render the whatsapp link with correct phone number', () => {
    render(<FloatingWhatsapp />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', expect.stringContaining('https://wa.me/573225525998'));
  });

  it('should contain the specific tooltip text', () => {
    render(<FloatingWhatsapp />);
    // Checking for the text "Si quieres hablar con una persona escribe aquí"
    const textElement = screen.getByText(/Si quieres hablar con una persona escribe aquí/i);
    expect(textElement).toBeInTheDocument();
  });
});
