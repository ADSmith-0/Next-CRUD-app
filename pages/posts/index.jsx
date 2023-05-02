import { useState } from "react";
import Alert from '../../components/alert';
import Card from '../../components/card';
import style from '../../styles/posts.module.css';
import { getPosts } from "@/lib/api";

export async function getServerSideProps(context){
    const posts = await getPosts();

    return {
        props: {
            postsData: posts
        }
    }
}

export default function Posts({ postsData }) {

    // Made a state with posts for future updating with useMemo/useSWR
    const [posts, setPosts] = useState(postsData);

    const [ deletedAlertVisible, setDeletedAlertVisible ] = useState(false);
    const [ deletedId, setDeletedId ] = useState(0);


    const handleDelete = async (id) => {
        setDeletedId(id);
        setDeletedAlertVisible(true);

        // refresh data, could be done with caching instead
        const response = await fetch("/api/get-posts");
        const data = await response.json();
        setPosts(data);
    }

    return (
        <>
            <div className={style.container}>
                {posts.map(({ id, userId, title, body }) => (
                    <Card 
                        key={id}
                        id={id}
                        userId={userId}
                        title={title}
                        body={body}
                        passDeletedBack={handleDelete}
                    />
                ))}
            </div>
            <Alert 
                visible={deletedAlertVisible}
                setVisible={setDeletedAlertVisible}
                severity="error"
                position="fixed"
                variant="filled"
            >
                Post {deletedId} has been deleted
            </Alert>
        </>
    )
}