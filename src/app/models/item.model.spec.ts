import { Item } from './item.model';

describe('Item', () => {
  it('should create an instance', () => {
    expect(new Item(1, 'Item 1', 'Description 1', 10, 1, 1, 1)).toBeTruthy();
  });
});
