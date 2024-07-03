import { useContext, useEffect, useState } from "react";
import ProductCard from "../common/ProductCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../utils";
import styles from "./index.module.scss";
import Pagination from "@mui/material/Pagination";
import { ProductContext } from "../../context/ProductProvider";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Box } from "@mui/material";

const ProductList = () => {
  const navigate = useNavigate();
  const authToken = localStorage.getItem("accessToken");
  const { setProducts, productData, page, setPage, total, setTotal } =
    useContext(ProductContext);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState<any>("");

  useEffect(() => {
    !authToken && navigate("/login");
  }, [authToken]);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(BACKEND_URL + "/products/category-list", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        if (res.data) {
          setCategories(res.data);
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(
          BACKEND_URL +
            `/products${
              selectedCategory ? "/category/" + selectedCategory : ""
            }`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
            params: {
              limit: 10,
              skip: page,
            },
          }
        );
        if (res.data) {
          setProducts(res.data.products);
          setTotal(res.data.total);
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, [page, selectedCategory]);

  return (
    <div className={styles.mainWrapper}>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "end",
          marginRight: "200px",
          marginTop: "50px",
        }}
      >
        <FormControl fullWidth style={{ width: "200px" }}>
          <InputLabel id="demdisplayEmptyo-simple-select-label">Select Categories</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedCategory}
            
            label="Select Categories"
            onChange={(e: any) => setSelectedCategory(e.target.value)}
          >
            {categories.map((value) => (
              <MenuItem value={value}>{value}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <div className={styles.productList}>
        {productData.map((product) => (
          <ProductCard
            id={product.id}
            key={product.id}
            title={product.title}
            price={product.price}
            category={product.category}
            description={product.description}
            image={product.thumbnail}
          />
        ))}
      </div>
      <div style={{ marginBottom: "20px" }}>
        <Pagination
          count={total}
          page={page + 1}
          size="large"
          onChange={(e, value) => setPage(value - 1)}
        />
      </div>
    </div>
  );
};

export default ProductList;
