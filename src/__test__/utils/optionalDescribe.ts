export const optionalDescribe = (test: boolean): jest.Describe =>
  test ? describe : describe.skip;

export const optionalTest = (test: boolean): jest.It => (test ? it : it.skip);
