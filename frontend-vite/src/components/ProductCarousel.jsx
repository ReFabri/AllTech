import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import Loader from "./Loader";
import Message from "./Message";
import { listTopProducts } from "../slices/productTopSlice";

const ProductCarousel = () => {
  const images = [
    {
      url: "https://res.cloudinary.com/r73fgem9f/image/upload/v1683483799/AllTech/carousel1_lkbqqy.jpg",
      text: "Upgrade your life with the latest smartphone technology",
    },
    {
      url: "https://res.cloudinary.com/r73fgem9f/image/upload/v1683483800/AllTech/carousel3_yumb03.jpg",
      text: "Stay connected and stay ahead",
    },
    {
      url: "https://res.cloudinary.com/r73fgem9f/image/upload/v1683483800/AllTech/carousel4_lat3pu.jpg",
      text: "Experience the future in the palm of your hand",
    },
  ];

  const dispatch = useDispatch();
  const productTopRated = useSelector((state) => state.productTop);
  const { loading, error, products } = productTopRated;

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Carousel pause="hover" className="bg-dark">
      {products.map((product, i) => (
        <Carousel.Item key={product._id} style={{ height: "25rem" }}>
          <Link to={`/product/${product._id}`}>
            <Image
              src={images[i].url}
              alt={product.name}
              fluid
              className="mx-auto d-block"
              style={{
                padding: "0",
                borderRadius: "0",
                objectFit: "cover",
                height: "100%",
                width: "100%",
              }}
            />
            <Carousel.Caption className="carousel-caption">
              <h2>{images[i].text}</h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
