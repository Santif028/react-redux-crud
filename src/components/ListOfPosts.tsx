import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/store";
import { fetchPosts } from "../store/posts/slice";

export default function ListOfPosts() {
    const dispatch = useAppDispatch()
    const posts = useAppSelector(state => state.posts.posts);
    const status = useAppSelector(state => state.posts.status);
    const error = useAppSelector(state => state.posts.error);

    useEffect(() => {
        dispatch(fetchPosts())
    }, [dispatch])

    if (status === 'pending') {
        return <div>Loading...</div>;
    }

    if (status === 'failed') {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>List of Posts</h1>
            {posts.map((post) => (
                <div key={post.id}>
                    <h3>{post.title}</h3>
                    <p>{post.body}</p>
                    <hr />
                </div>
            ))}
        </div>
    );
}