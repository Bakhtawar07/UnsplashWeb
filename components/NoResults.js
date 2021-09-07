import React from 'react'
import { Empty } from "antd";
import "antd/dist/antd.css";

 const NoResults = () => {
       
    return (
        
        <div>
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/>
        </div>
    )
}

export default NoResults;