export const calculateTotal = categorizedArticles => {
  let total = 0;
  categorizedArticles.map(category => {
    category.map(article => {
      if (article.isChecked) {
        total = total + article.price * article.quantity;
      }
    });
  });
  return total;
};
