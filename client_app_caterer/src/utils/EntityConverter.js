export const productsConverter = async (categories, products, productsFromBranch, isAll) => {
  const modifiedProducts = [];
  products.forEach(product => {
    let foundBranchProduct = productsFromBranch.find(productFromBranch => productFromBranch.product.id == product.id);
    if (foundBranchProduct != null) {
      if (isAll) product['visible'] = false;
      else {
        product['visible'] = true;
        product['price'] = foundBranchProduct.price;
        product['quantity'] = foundBranchProduct.quantity;
      }
    } else {
      if (isAll) product['visible'] = true;
      else product['visible'] = false;
    }
  });

  categories.forEach(category => {
    let modifiedProduct = {
      name: '',
      products: [],
    };
    modifiedProduct['name'] = category.fullName;
    products.forEach(product => {
      if (product.visible && product.category.id == category.id) {
        modifiedProduct.products.push(product);
      }
    });
    modifiedProducts.push(modifiedProduct);
  });

  return modifiedProducts;
};
