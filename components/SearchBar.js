import Head from "next/head";
import styles from "../styles/layout.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Spin, Input, Space, AutoComplete, Empty } from "antd";
import "antd/dist/antd.css";
import { useRouter } from "next/router";
import InfiniteScroll from "react-infinite-scroll-component";
import { LoadingOutlined } from "@ant-design/icons";
import AlgoliaClient, { algoliaSearch } from "./AlgoliaSearch";
import Images from "./Images";
import store from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  appendImages,
  setImages,
  setSelectedImage,
  setSearchName,
  setAllImagesPayload,
} from "../redux/actions/imageActions";
import { getErrorString } from "../utils/utils";
import NoResults from "./NoResults";

const { Search } = Input;
const antIcon = <LoadingOutlined style={{ fontSize: 14 }} spin />;

const SearchBar = () => {
  const clientId = "yvPH5ti0aBrOkCf4DQag5nsDCsTH-FbCyxhZjRMdXr4";
  const {
    data: images,
    name: redName,
    page: reduxPage,
    loading: loading,
  } = useSelector((state) => state.allImages);
  const [spin, setSpin] = useState(false);
  const [photo, setPhoto] = useState("");
  const [page, setPage] = useState(reduxPage || 1);
  const [hasMore, setHasMore] = useState(true);
  const [option, setOption] = useState([]);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(async () => {
    const { photo: searchName } = router.query;
    setPhoto(searchName ? searchName : "");

    redName !== searchName &&
      (await fetchResults(searchName, 1)) &&
      dispatch(setSelectedImage({}));
  }, [router.query]);

  const fetchResults = (photoName, page) => {
    setHasMore(true);
    const url = `https://api.unsplash.com/search?page=${page}&query=${
      photoName || "mountains"
    }&client_id=${clientId}`;
    try {
      axios.get(url).then((response) => {
        if (response.data.photos.results.length === 0) {
          setHasMore(false);
        }
        page == 1
          ? dispatch(setImages(response.data.photos.results))
          : dispatch(appendImages(response.data.photos.results, page));
      });
    } catch (error) {
      dispatch(setImages({ error: getErrorString(error) }));
    }
    setPage(page + 1);
  };

  const handleChange = async (value) => {
    setPhoto(value);
   // setSpin(true);
    const response = await algoliaSearch(value);
    if (response) {
     // setSpin(false);
      setOption(
        response.hits.map((item) => ({ value: item.name, label: item.name }))
      );
    }
  };
  const onSelect = (value) => {
    dispatch(setImages([]));
    dispatch(setAllImagesPayload({ page: 1 }));
    router.push({
      query: { photo: value },
    });
  };

  const onSearchButton = (value) => {
    dispatch(setAllImagesPayload({ page: 1 }));
    router.push({
      query: { photo: value },
    });
  };


  return (
    <div className="container">
      <Space className={styles.fix} direction="vertical">
        <AutoComplete
          dropdownMatchSelectWidth={252}
          style={{
            width: 350,
          }}
          options={option}
          onSelect={onSelect}
          onSearch={handleChange}
          value={photo}
        >
          <Input.Search
            placeholder="search image"
            style={{ width: 400 }}
            onSearch={onSearchButton}
           
            // suffix={spin ? <Spin indicator={antIcon}/> : "" }
            
            enterButton
          />

        </AutoComplete>
      </Space>
      <InfiniteScroll
        dataLength={images.length}
        next={() => {
          if (page >= reduxPage) {
            console.log(page);
            fetchResults(photo, page);
          }
        }}
        hasMore={hasMore}
        loader={
          <div className={styles.example}>
            <Spin size="large" />
          </div>
        }
      >
        {images.length ? <Images photo={photo} /> : !hasMore && <NoResults />}
      </InfiniteScroll>
    </div>
  );
};
export default SearchBar;
