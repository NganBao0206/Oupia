import React from 'react';
import { useParams } from 'react-router-dom/dist';
import PostItem from '../../components/PostItem';

const UserPosts = () => {
    const { slugUser } = useParams();
    const post = {
        title: "hehe",
        createdAt: "12/12/2002",
        description: "ewrtcyvubjnkh gvcfrtdgyuhjnbhvygeuhfndb rhefjadvb ẹm ndaefjajasi da ",
        motelId: {
            fullLocation: "123 nguyen haha"
        }

    }
    return (
        <PostItem post={post}></PostItem>

    );
};

export default UserPosts;