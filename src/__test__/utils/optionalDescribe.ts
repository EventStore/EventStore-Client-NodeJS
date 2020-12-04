export const optionalDescribe = (test: boolean): jest.Describe =>
  test ? describe : describe.skip;
