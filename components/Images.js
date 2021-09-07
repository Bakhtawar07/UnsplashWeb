import React from "react";
import SearchBar from "./SearchBar";
import Link from "next/link";
import styles from "../styles/layout.module.css";
import { Row, Col } from "antd";
import "antd/dist/antd.css";
import router from "next/router";
import {
  LazyLoadImage,
  trackWindowScroll,
} from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useSelector, useDispatch } from "react-redux";
import { setAllImagesPayload, setSelectedImage } from "../redux/actions/imageActions";

const Images = (props) => {

  const dispatch = useDispatch();
  const images = useSelector((state) => state.allImages.data);

  const getImg = (image, index) => {   
    
    const { id, description, urls, alt_description, color } = image;
    return (
      <Col span={6} key={id}>
        <Link
          href={{
            pathname: `/photos/${id}`,
          }}
        >
          <LazyLoadImage
            className={styles.imgst}
            key={id}
            alt={alt_description}
            effect="blur"
            src={urls?.thumb}
            onClick={() => {
              dispatch(setSelectedImage(image));
              dispatch(setAllImagesPayload({name: props.photo}));
              router.push(`/photos/${image.id}`);
            }}
          />
        </Link>
      </Col>
    );
  };
  return (
    <div>
      <Row>{images.map(getImg)}</Row>
    </div>
  );
};

export default Images;
