import React, { useContext, useEffect, useState } from 'react';
import MyBreadcrumb from '../../../components/MyBreadCrumb';
import APIs, { endpoints } from '../../../configs/APIs';
import SearchPost from '../../../components/SearchPost';
import PostRentList from '../../../components/Post/PostRentList';
import { ParamsContext, ParamsProvider } from '../../../providers/ParamsProvider';
import { useDebounce } from 'use-debounce';
import { useNavigate } from 'react-router-dom';
import AutocompleteLocation from '../../../components/AutocompleteLocation';
import goongJs from '@goongmaps/goong-js';

const Posts = () => {
    const [posts, setPosts] = useState(null);
    const { params, } = useContext(ParamsContext);
    const [debouncedParams] = useDebounce(params, 500);
    const [map, setMap] = useState(null);
    const navigate = useNavigate();
    const getPost = async () => {
        navigate({ search: new URLSearchParams(debouncedParams).toString() });
        try {
            let res = await APIs.get(endpoints['posts'], {
                params: {
                    ...debouncedParams,
                }
            });
            if (res.status === 200) {
                console.log(res.data)
                setPosts(res.data.posts);
            }

        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        console.log(params);
        console.log(debouncedParams);

        getPost();
    }, [debouncedParams])

    return (
        <div className="container">
            <MyBreadcrumb BreadCrumbName="Bài viết" />
            <SearchPost />
            <PostRentList posts={posts} />
        </div>
    );
};

export default () => (
    <ParamsProvider>
        <Posts />
    </ParamsProvider>
);
