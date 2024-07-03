import { useState, FC, useContext } from "react";
import styles from "./index.module.scss";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CgShoppingBag } from "react-icons/cg";
import { Button } from "../Button";
import { ProductContext } from "../../../context/ProductProvider";

interface Product {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  rating?: {
    count?: number;
    rate?: number;
  };
  title: string;
}

interface ProductCardProps extends Product {
  key: number;
}

const ProductCard: FC<ProductCardProps> = ({
  id,
  key,
  title,
  price,
  category,
  description,
  image,
}) => {
  const [isLoadingProduct, setIsLoadingProduct] = useState(false);
  const { setCartData } = useContext(ProductContext);

  const addToCartHandler = () => {
    setIsLoadingProduct(true);
  };

  const addItem = (id) => {
    //update array id and reset item quantity
    const newData = {
      id: id,
      quantity: 1,
      title: title,
      price: price,
      img: image,
    };
    setCartData((prev) => {
      const existingItemIndex = prev.findIndex(
        (item) => item.id === newData.id
      );

      if (existingItemIndex !== -1) {
        // Update existing item
        return prev.map((item, index) =>
          index === existingItemIndex ? { ...item, ...newData } : item
        );
      } else {
        // Add new item
        return [...prev, newData];
      }
    });
  };

  return (
    <motion.div
      id={title}
      key={key}
      tabIndex={id}
      whileHover={{ cursor: "pointer" }}
      // onMouseEnter={() => showActionIcons(true)}
      // onMouseLeave={() => showActionIcons(false)}
      whileTap={{ cursor: "grabbing" }}
      transition={{
        ease: "easeInOut",
        duration: 0.4,
      }}
    >
      <div className={styles.productItem}>
        <div className={styles.productPic}>
          <Link to={`/product/${String(id)}`}>
            <img src={image} alt={title} />
          </Link>
        </div>
      </div>
      <div className={styles.productDetailsContainer}>
        <Link
          to={`/product/${String(id)}`}
          className={styles.productDetailsWrapper}
        >
          <div className={styles.productDetails}>
            <div className={styles.productTitle}>
              <div>{title}</div>
            </div>
            <div className={styles.productPrice}>{price}$</div>
          </div>
        </Link>
        <motion.div
          key={key}
          whileHover={{ zoom: 1.2 }}
          style={{ height: "100%" }}
          onClick={() => addToCartHandler()}
        >
          <Button className={styles.iconCcontainer} onClick={() => addItem(id)}>
            <CgShoppingBag
              className={`${styles.icon} ${
                isLoadingProduct && styles.loadingIcon
              }`}
            />
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
