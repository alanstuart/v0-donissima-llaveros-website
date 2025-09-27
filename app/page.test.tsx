import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import HomePage from './page';

// Mock the window.open function
global.open = jest.fn();

describe('HomePage', () => {
  it('should correctly calculate the total price for items with commas', () => {
    render(<HomePage />);

    // 1. Find the product card for the "Christmas Pet Ornament"
    const productsSection = screen.getByRole('heading', { name: /Our Products/i }).closest('section');
    if (!productsSection) {
      throw new Error("Could not find the 'Our Products' section.");
    }

    const ornamentCard = within(productsSection).getByText('Christmas Pet Ornament').closest('div.group');
    if (!ornamentCard) {
      throw new Error("Could not find the 'Christmas Pet Ornament' product card.");
    }

    // 2. Add the item to the cart
    const addToCartButton = within(ornamentCard).getByText(/Add to Cart/i);
    fireEvent.click(addToCartButton);

    // 3. Open the cart
    const header = screen.getByRole('banner');
    const cartButton = within(header).getByRole('button', { name: /Cart/i });
    fireEvent.click(cartButton);

    // 4. Assert that the total price is correct
    // The bug is that parseFloat("£1,234.00".replace("£", "")) will result in 1, not 1234.
    // So the total price will be displayed as £1.00 instead of £1234.00.
    // This assertion will fail, proving the bug.
    expect(screen.queryByText('£1234.00')).toBeInTheDocument();
  });
});