import { useState } from "react";
import { Card, CardActionArea, CardContent, Typography } from '@mui/material';

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

    const [posts, setPosts] = useState(postsData);

    return (
        posts.map(({ title, body, userId, id}) => (
            <Card key={id} sx={{ maxWidth: 345 }}>
                <CardActionArea>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {body}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        ))
    )
}