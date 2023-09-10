import { Card } from 'flowbite-react';
import React from 'react';
import ReCommendItem from '../RecommendItem';
import { Link } from 'react-router-dom';

const RecommendList = (props) => {
    const {recommentList, title, url} = props;
    if (recommentList)
        return (
            <Card className="my-5">
                <div className="text-xl font-bold flex">
                    <div className="text-left mr-auto">{title}</div>
                    <Link to={url} className="text-right text-blueTemplate">Xem tất cả</Link>
                </div>
                <div className="flex flex-row gap-4 overflow-y-auto py-3">
                    {recommentList.map(recomment => <ReCommendItem recomment={recomment}></ReCommendItem>)}
                </div>
            </Card>
        );
};

export default RecommendList;