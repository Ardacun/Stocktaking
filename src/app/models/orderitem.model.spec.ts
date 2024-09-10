import { OrderItem } from './orderitem.model';

describe('Orderitem', () => {
  it('should create an instance', () => {
    expect(new OrderItem(1, 1, 1, 1)).toBeTruthy();
  });
});
