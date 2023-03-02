it("should return a list of fruits containing app", function() {
    expect(search('app')).toContain('Apple');
    expect(search('app')).toContain('Pineapple');
    expect(search('app')).toContain('Custard apple');
  });
