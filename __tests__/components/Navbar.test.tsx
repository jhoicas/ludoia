import { render, screen } from '@testing-library/react';
import { Navbar } from '@/app/components/Navbar';

// Mock next-themes to prevent errors in tests
jest.mock('next-themes', () => ({
  useTheme: () => ({ theme: 'light', setTheme: jest.fn() })
}));

jest.mock('@/app/hooks/useTranslation', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    language: 'es',
    setLanguage: jest.fn()
  })
}));

describe('Navbar Component', () => {
  it('should render the logo text', () => {
    render(<Navbar />);
    expect(screen.getByText('Ludoia')).toBeInTheDocument();
  });
});
