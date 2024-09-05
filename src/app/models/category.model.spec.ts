import { Category } from './category.model';

describe('Category', () => {
  it('should create an instance', () => {
    expect(new Category(1, 'Category 1', 'Category 1 description')).toBeTruthy();
  });
});
