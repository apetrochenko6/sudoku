import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { afterEach, describe, expect, it } from 'vitest';
import { ErrorCounterComponent } from './ErrorCounterComponent';

afterEach(() => {
  cleanup();
});

describe('ErrorCounterComponent', () => {
  it('wyświetla etykietę Błędy', () => {
    render(<ErrorCounterComponent errorsCount={3} />);

    expect(screen.getByText('Błędy')).toBeInTheDocument();
  });

  it('wyświetla przekazaną liczbę błędów', () => {
    render(<ErrorCounterComponent errorsCount={5} />);

    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('wyświetla 0 po zresetowaniu licznika', () => {
    render(<ErrorCounterComponent errorsCount={0} />);

    expect(screen.getByText('0')).toBeInTheDocument();
  });
});
