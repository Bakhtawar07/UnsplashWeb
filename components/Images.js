import React from "react";
import SearchBar from "./SearchBar";
import Link from "next/link";
import styles from "../styles/layout.module.css";
import { Row, Col } from "antd";
import "antd/dist/antd.css";
import {
  LazyLoadImage,
  trackWindowScroll,
} from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Images = (props) => {
  const { result } = props;
  const getImg = (photo, index) => {
    const { id, description, urls, alt_description, color } = photo;
    return (
      <>
        <Col span={6}>
          <Link
            href={{
              pathname: `/photos/${photo.id}`,
              query: {
                photoData: JSON.stringify({
                  alt_description,
                  id,
                  color,
                  description,
                  urls,
                }),
              },
            }}
          >
            <LazyLoadImage
              className={styles.imgst}
              key={id}
              alt={alt_description}
              effect="blur"
              
              src={urls?.thumb}
             
            />
            {/* <img className={styles.imgst} src={urls?.thumb} key={id} /> */}
          </Link>
        </Col>
      </>
    );
  };
  return (
    <div>
      <Row>{result.map(getImg)}</Row>
    </div>
  );
};

export default Images;
