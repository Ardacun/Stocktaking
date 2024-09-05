import { User } from './user.model';

describe('User', () => {
  it('should create an instance', () => {
    expect(new User(1, 'John Doe', 'john@doe.com', '123456', 'user')).toBeTruthy();
  });
});
