import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "/pages/photos/pol.module.css";
import { setSelectedImage } from "../../redux/actions/imageActions";
import { useDispatch, useSelector } from "react-redux";

const clientId = "9OArSFu6_bQX8RNi71wLFN_pj9yhZLK5dLuP_KuvAOM";

const PhotoDetaill = (props) => {
  const imageState = useSelector((state) => state.image);
  const { data: image, error } = imageState;
  const router = useRouter();
  const dispatch = useDispatch();

  const { alt_description, id: imageID, description, color } = image;
  useEffect(() => {
    props.data && dispatch(setSelectedImage(props.data));
  }, [props.data]);

  useEffect(() => {
    const { id } = router.query;
    id && !props.data && fetchResults(id);
  }, [router.query?.id]);

  const fetchResults = (id) => {
    const url = `https://api.unsplash.com/photos/${id}?client_id=${clientId}`;
    try {
      axios.get(url).then((response) => {
        dispatch(setSelectedImage(response.data));
      });
    } catch (error) {
      dispatch(setSelectedImage({ error: getErrorString(error) }));
    }
  };

  return (
    <>
      <div className={styles.polaroid}>
        <img
          src={image.urls?.thumb}
          style={({ width: "100%" })}
        />
        <div className={styles.container}>
          <p>{image.alt_description}</p>
          <p>{image.description}</p>
          <p>Color code: {image.color}</p>
          <p>Image id is: {image?.id} </p>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = async (ctx) => {
  const res = await fetch(
    `https://api.unsplash.com/photos/${ctx.query.id}?client_id=${clientId}`
  );
  const data = await res.json();
  return {
    props: { data },
  };
};

export default PhotoDetaill;
