import { Card } from 'flowbite-react';
import React from 'react';
import PostItem from '../PostItem';

const RecommendItems = (props) => {

    const images = ["https://th.bing.com/th/id/OIP.CE_EKVdLIgLLzqHtkIMLGgHaE1?pid=ImgDet&rs=1",
     "https://th.bing.com/th/id/R.e738b5403370e28ca0473365925a3bdd?rik=J68QTJABGcJO7Q&riu=http%3a%2f%2fwww.impawards.com%2ftv%2fposters%2fhouse_md_ver6_xlg.jpg&ehk=zgEVs%2f3TdmBdq3xasuMTmi30rY7D86t9Ezz4cmefNl8%3d&risl=&pid=ImgRaw&r=0",
      "https://th.bing.com/th/id/OIP.CE_EKVdLIgLLzqHtkIMLGgHaE1?pid=ImgDet&rs=1",
      "https://th.bing.com/th/id/OIP.CE_EKVdLIgLLzqHtkIMLGgHaE1?pid=ImgDet&rs=1",
        "https://th.bing.com/th/id/OIP.CE_EKVdLIgLLzqHtkIMLGgHaE1?pid=ImgDet&rs=1" ,
        "https://th.bing.com/th/id/OIP.CE_EKVdLIgLLzqHtkIMLGgHaE1?pid=ImgDet&rs=1",
        "https://th.bing.com/th/id/OIP.CE_EKVdLIgLLzqHtkIMLGgHaE1?pid=ImgDet&rs=1",
        "https://th.bing.com/th/id/OIP.CE_EKVdLIgLLzqHtkIMLGgHaE1?pid=ImgDet&rs=1" ,
        "https://th.bing.com/th/id/OIP.CE_EKVdLIgLLzqHtkIMLGgHaE1?pid=ImgDet&rs=1"]

    return (
        <Card className="my-5">
            <div className="text-xl font-bold flex">
                <div className="text-left mr-auto">{props.title}</div>
                <div className="text-right">Xem tất cả</div>
            </div>
            <div className="flex flex-row gap-4 overflow-y-auto py-3">
                {images.map(image => <PostItem imgSource={image}></PostItem>)}
            </div>
        </Card>
    );
};

export default RecommendItems;