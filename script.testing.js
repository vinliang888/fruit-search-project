it("should return a list of fruits containing app", () => {
  expect(search('app')).toContain('Apple');
  expect(search('app')).toContain('Pineapple');
  expect(search('app')).toContain('Custard apple');
});

it("should return a list of fruits containing app in order of highest match score", () => {
  expect(search2('app')).toContain({val: 'Apple', score: 6});
  let suggestions2 = search2('app');
  suggestions2.sort((a,b) => (b.score - a.score))
  expect(suggestions2.findIndex((item) => item.val === 'Apple') < suggestions2.findIndex((item) => item.val === 'Pineapple')).toEqual(true);
});

it("should update the DOM with individual li from the results list", () => {
  let results2 = [
    {
      val: 'Apple',
      score: 10
    },
    {
      val: 'Pineapple',
      score: 6
    },
    {
      val: 'Custard apple',
      score: 3
    }
  ]
  showSuggestions(results2,'app')
  const input = document.querySelector('#fruit');
  const suggestions = document.querySelector('.suggestions ul');
  expect(suggestions.childElementCount).toEqual(3);
  expect(suggestions.children[0].innerText).toEqual('Apple');
  expect(suggestions.children[0].children[0].innerText).toEqual('App');
  expect(suggestions.children[0].children[0].nodeName).toEqual('B');
});