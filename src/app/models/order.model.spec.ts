import { Order } from './order.model';

describe('Order', () => {
  it('should create an instance', () => {
    expect(new Order(1, 1, new Date(), 'Pending', [], 0)).toBeTruthy();
  });
});
