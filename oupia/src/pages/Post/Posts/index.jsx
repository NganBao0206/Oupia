import React, { useContext, useEffect, useState } from 'react';
import MyBreadcrumb from '../../../components/MyBreadCrumb';
import APIs, { endpoints } from '../../../configs/APIs';
import SearchPost from '../../../components/SearchPost';
import PostRentList from '../../../components/Post/PostList';
import { ParamsContext, ParamsProvider } from '../../../providers/ParamsProvider';
import { useDebounce } from 'use-debounce';
import { useNavigate } from 'react-router-dom';
import { Pagination } from 'flowbite-react';

const Posts = () => {
    const [posts, setPosts] = useState(null);
    const [totalPages, setTotalPages] = useState(null);
    const { params, setParams } = useContext(ParamsContext);
    const [debouncedParams] = useDebounce(params, 500);

    const [currentPage, setCurrentPage] = useState(params.page || 1);
    const onPageChange = (page) => {
        setCurrentPage(page);
        setParams({...params, page: page});
    }

    const navigate = useNavigate();
    const getPost = async () => {
        navigate({ search: new URLSearchParams(debouncedParams).toString() });
        try {
            let res = await APIs.get(endpoints['posts'], {
                params: {
                    page: currentPage,
                    ...debouncedParams,
                }
            });
            if (res.status === 200) {
                console.log(res.data)
                setPosts(res.data.posts);
                setTotalPages(res.data.pages);
            }
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        if (params.page && params.page !== currentPage)
            setCurrentPage(params.page);
    }, [params.page, currentPage])

    useEffect(() => {
        getPost();
    }, [debouncedParams])

    return (
        <div className="container">
            <MyBreadcrumb BreadCrumbName="Bài viết" />
            <SearchPost />
            <PostRentList posts={posts} />
            {totalPages != null && currentPage != null ? (<>
                <div className="flex items-center justify-center text-center">
                    <Pagination
                        currentPage={currentPage}
                        layout="pagination"
                        nextLabel=""
                        previousLabel=""
                        onPageChange={page => { onPageChange(page) }}
                        showIcons
                        totalPages={totalPages}
                    />
                </div>
            </>) : <></>}

        </div>
    );
};

export default () => (
    <ParamsProvider>
        <Posts />
    </ParamsProvider>
);
