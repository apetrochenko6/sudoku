import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { NumpadComponent } from './NumpadComponent';

afterEach(() => {
  cleanup();
});

describe('NumpadComponent', () => {
  it('renderuje przyciski od 1 do 9', () => {
    render(<NumpadComponent onNumberSelect={vi.fn()} />);

    for (let value = 1; value <= 9; value += 1) {
      expect(screen.getByRole('button', { name: value.toString() })).toBeTruthy();
    }
  });

  it('wywołuje onNumberSelect z wybraną cyfrą po kliknięciu', () => {
    const onNumberSelect = vi.fn();

    render(<NumpadComponent onNumberSelect={onNumberSelect} />);

    fireEvent.click(screen.getByRole('button', { name: '5' }));

    expect(onNumberSelect).toHaveBeenCalledWith(5);
  });

  it('wywołuje onNumberSelect z wartością 0 po kliknięciu Clear', () => {
    const onNumberSelect = vi.fn();

    render(<NumpadComponent onNumberSelect={onNumberSelect} />);

    fireEvent.click(screen.getByRole('button', { name: 'Clear' }));

    expect(onNumberSelect).toHaveBeenCalledWith(0);
  });
});
