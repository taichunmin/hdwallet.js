import { Number2WordsPipe } from './number-2-words.pipe';

describe('Number2Words-Pipe', () => {
  it('create an instance', () => {
    const pipe = new Number2WordsPipe();
    expect(pipe).toBeTruthy();
  });
});
