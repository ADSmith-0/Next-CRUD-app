import { useState } from "react";
import Alert from '../../components/alert';
import Card from '../../components/card';
import style from '../../styles/posts.module.css';

export async function getServerSideProps(context){
    const response = await fetch('http://localhost:3000/api/get-posts');
    const posts = await response.json();

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


    const handleDelete = id => {
        setDeletedId(id);
        setDeletedAlertVisible(true);
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