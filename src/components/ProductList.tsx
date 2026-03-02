import type { Product } from "../types/product";

type ProductListProps = {
  products: [] | Product[];
};

const ProductList = (productListProps: ProductListProps) => {
  const { products } = productListProps;

  return (
    <div>
      {products.map((product) => (
        <p key={product.id}>{product.title}</p>
      ))}
    </div>
  );
};

export default ProductList;
