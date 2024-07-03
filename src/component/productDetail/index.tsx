import React, { useContext, useEffect, useState } from "react";
import Image1 from "../assets/images/image-product-1.jpg";
import Image2 from "../assets/images/image-product-2.jpg";
import Image3 from "../assets/images/image-product-3.jpg";
import Image4 from "../assets/images/image-product-4.jpg";
import PrevBtn from "../assets/images/icon-previous.svg";
import NextBtn from "../assets/images/icon-next.svg";
import "../../styles/Hero.css";
import { useParams } from "react-router-dom";
import { BACKEND_URL } from "../../utils";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { url } from "inspector";
import { ProductContext } from "../../context/ProductProvider";

const ProductDetail = () => {
  // declare dispatch function
  const navigate = useNavigate();
  const { setCartData } = useContext(ProductContext);
  const [product, setproduct] = useState<any>({});
  const [galleryArray, setGalleryArray] = useState<any>([]);
  const [activeImage, setActiveImage] = useState();

  console.log(activeImage, "aneesh");
  const { id } = useParams();
  const authToken = localStorage.getItem("accessToken");

  useEffect(() => {
    !authToken && navigate("/login");
  }, [authToken]);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(BACKEND_URL + `/products/${id}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        if (res.data) {
          setproduct(res.data);
          setGalleryArray(res.data.images);
          setActiveImage(res.data.images[0]);
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  // increase or decrease desired item quantity before checkout
  const [itemQuantity, setItemQuantity] = useState(0);
  const incNum = () => {
    setItemQuantity(itemQuantity + 1);
    setItems({
      ...items,
      added_items: itemQuantity + 1,
      total_price: 125 * (itemQuantity + 1),
    });
  };
  const decNum = () => {
    if (itemQuantity > 0) {
      setItemQuantity(itemQuantity - 1);
      setItems({
        ...items,
        added_items: itemQuantity - 1,
        total_price: 125 * (itemQuantity - 1),
      });
    } else {
      setItemQuantity(0);
    }
  };

  // add item to cart if quantity is more than 0
  const addItem = () => {
    if (itemQuantity === 0) {
      alert("Please select a quantity");
      return;
    }
    //update array id and reset item quantity
    const newData = {
      id: id,
      quantity: itemQuantity,
      title: product?.title,
      price: product?.price,
      img: product?.images[0],
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
    setItems({ ...items });
    setItemQuantity(0);
    // execute add item function to redux STORE
  };

  //cart item object
  const [items, setItems] = useState({
    added_items: 0,
    total_price: 0,
  });

  // desktop gallery modal
  const [photoModal, setPhotoModal] = useState(false);
  const togglePhotoModal = () => {
    setPhotoModal(!photoModal);
    setActiveModalImage(activeImage);
  };

  //   const galleryArray = [Image1, Image2, Image3, Image4];

  // set active image

  const adjustActiveImage = (index) => {
    setActiveImage(index);
    // what ever the user's image was before opening modal will display as active modal image
    setActiveModalImage(index);
  };

  // set active modal image
  const [activeModalImage, setActiveModalImage] = useState(activeImage);
  const adjustActiveModalImage = (index) => {
    setActiveModalImage(index);
  };

  // navigation button function
  // mobile image nav buttons
  const [mobileImgNav, setMobileImgNav] = useState(0);
  const mobileNextImg = (n) => {
    // map through the image to define the similar image in the array
    let mapImg = galleryArray.map((img: any) => {
      return activeImage === img ? (img = true) : null;
    });
    // let the number for the mobile image equal the index number in the array
    let mobileImgNav = mapImg.indexOf(true);
    // set the variable show to equal the sum which is the position in the array
    let show = mobileImgNav + n;
    if (show < 0) {
      show = 3;
    } else if (show > 3) {
      show = 0;
    }
    // when user clicks on the images, the position from the array will update
    setMobileImgNav(show);
    // display as active image
    setActiveImage(galleryArray[show]);
  };

  // desktop image modal
  const [imageNav, setImgNav] = useState(0);
  const nextImg = (n) => {
    let mapImg = galleryArray.map((img: any) => {
      return activeModalImage === img ? (img = true) : null;
    });
    let imageNav = mapImg.indexOf(true);
    let show = imageNav + n;
    if (show < 0) {
      show = 3;
    } else if (show > 3) {
      show = 0;
    }
    setImgNav(show);
    setActiveModalImage(galleryArray[show]);
  };

  return (
    <main>
      <div className="gallery">
        <div className="main-image">
          <button>
            <img className="previewed-img" src={activeImage} alt="item image" />
          </button>
          <div className="navigation-btns">
            <button className="prev" onClick={() => mobileNextImg(-1)}>
              <img src={PrevBtn} alt="previous button" />
            </button>
            <button className="next" onClick={() => mobileNextImg(1)}>
              <img src={NextBtn} alt="next button" />
            </button>
          </div>
        </div>
        <div className="photo-options">
          {galleryArray.map((image, index) => (
            <button
              key={index}
              style={{ backgroundImage: `url(${image})` }}
              className={`img ${activeImage === image ? "selected" : ""}`}
              onClick={() => adjustActiveImage(image)}
            ></button>
          ))}
        </div>
      </div>
      <div className="description">
        <div className="info">
          <p className="company">{product?.brand}</p>
          <h1>{product?.title}</h1>
          <p className="item-info">{product?.description}</p>
          <div className="price-tag">
            <p className="price">{product?.price}</p>
            <p className="retail-price">{product?.price * 2}</p>
          </div>
          <div className="description-btn">
            <div className="quantity-wrapper">
              <button className="min" onClick={decNum}></button>
              <p className="quantity">{itemQuantity}</p>
              <button className="add" onClick={incNum}></button>
            </div>
            {/* cart button */}
            <button className="add-to-cart" onClick={() => addItem()}>
              <span>Add to cart</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetail;
