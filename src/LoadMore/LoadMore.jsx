import { useEffect, useState } from "react";
import styles from "./LoadMore.module.css";

const LoadMore = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);
  const [disableButton, setDisableButton] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const response = await fetch(
          `https://dummyjson.com/products?limit=20&skip=${
            count === 0 ? 0 : count * 20
          }`
        );
        const data = await response.json();
        if (data && data.products && data.products.length) {
          setProducts((prevData) => [...prevData, ...data.products]);
          setLoading(false);
        }
      } catch (e) {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [count]);

  useEffect(() => {
    if (products && products.length === 100) setDisableButton(true);
  }, [products]);

  if (loading) {
    return <div>Loading dat! Please wait.</div>;
  }

  return (
    <div className="container">
      <div className={styles["product-container"]}>
        {products && products.length
          ? products.map((item, index) => (
              <figure className={styles.product} key={index}>
                <img src={item.thumbnail} alt={item.id} />
                <figcaption>{item.title}</figcaption>
              </figure>
            ))
          : null}
      </div>
      <div className={styles["button-container"]}>
        <button disabled={disableButton} onClick={() => setCount(count + 1)}>
          Load More Products
        </button>
        {disableButton ? <p>You have reached 100 products</p> : null}
      </div>
    </div>
  );
};

export default LoadMore;
