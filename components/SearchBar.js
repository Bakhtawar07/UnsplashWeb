import Head from "next/head";
import styles from "../styles/layout.module.css";
import axios from "axios";
import { useEffect, useState, lazy, Suspense } from "react";
import { Spin, Input, Space, AutoComplete } from "antd";
import "antd/dist/antd.css";
import { useRouter } from "next/router";
import Link from "next/link";
import InfiniteScroll from "react-infinite-scroll-component";
import { LoadingOutlined } from "@ant-design/icons";
import AlgoliaClient, { algoliaSearch } from "./AlgoliaSearch";
import Images from "./Images";

const antIcon = (
  <LoadingOutlined style={({ fontSize: 24 }, { align: "center" })} spin />
);

const { Search } = Input;

const SearchBar = () => {
  const clientId = "yvPH5ti0aBrOkCf4DQag5nsDCsTH-FbCyxhZjRMdXr4";
  const [photo, setPhoto] = useState("");
  const [result, setResult] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [option, setOption] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const { photo: searchName } = router.query;
    console.log("USE Effect: ", searchName);
    setPhoto(searchName);
    fetchResults(searchName, 1);
  }, [router.query]);

  const fetchResults = (photoName, page) => {
    console.log(page);
    const url =
      "https://api.unsplash.com/search?page=" +
      page +
      "&query=" +
      photoName +
      "&client_id=" +
      clientId;
    try {
      axios.get(url).then((response) => {
        console.log("results:", response.data.photos.results);
        setResult([...result, ...response.data.photos.results]);
      });
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      console.log(error);
    }
    setPage(page + 1);
  };

  const handleChange = async (value) => {
    setPhoto(value);
    const response = await algoliaSearch(value);
    if (response) {
      console.log(response, value, "algolia");
      setOption(response.hits.map(item => ({value: item.name, label: item.name})))
    }
  };

  // const onChange = (e) => {
  //   console.log("here ab ",e)
  //   setPhoto(value)
  // if (e.keyCode === 13 ) {
  //     setResult([]);
  //     e.preventDefault();
  //     router.push({
  //       query: { photo: e.target.value },
  //     });
  //   }
  // };
  const onSelect = (value) => {
    setResult([]);
    router.push({
      query: { photo: value },
    });
  };
  const handleSearch = (value) => {
    console.log("Handle search ",value)
  
  };

  console.log(result);
  return (
    <div className="container">
      <Space className={styles.fix} direction="vertical">
      <AutoComplete
        dropdownMatchSelectWidth={252}
        style={{
          width: 300,
        }}
        options={option}
        onSelect={onSelect}
        onSearch={handleChange}
        value={photo}
      >
          <Input.Search
            placeholder="search image"
            style={{ width: 400 }}
          />
      </AutoComplete>
        </Space>

      <InfiniteScroll
        dataLength={result.length}
        next={() => fetchResults(photo, page)}
        hasMore={true}
        loader={<Spin indicator={antIcon} />}
      >
        <Images result={result} />
      </InfiniteScroll>
    </div>
  );
};
export default SearchBar;
