export const productsConverter = async (categories, products, productsFromBranch) => {
  console.log(categories);
  console.log(products);
  const modifiedProducts = [];
  products.forEach(product => {
    if (productsFromBranch.find(productFromBranch => productFromBranch.id == product.id)) {
      product['avaliable'] = true;
    } else {
      product['avaliable'] = false;
    }
  });

  categories.forEach(category => {
    let modifiedProduct = {
      name: '',
      products: [],
      isAdded: false,
    };
    modifiedProduct['name'] = category.fullName;
    products.forEach(product => {
      if (!product.avaliable && product.category.id == category.id) {
        modifiedProduct.products.push(product);
      }
    });
    modifiedProducts.push(modifiedProduct);
  });
  console.log(modifiedProducts);
  return modifiedProducts;
};
