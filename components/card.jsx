import { Button, Card, CardActions, CardActionArea, CardContent, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import style from '../styles/card.module.css';
import { useRouter } from 'next/router';

export default function CustomCard({ id, userId, title, body, passDeletedBack }) {
    const router = useRouter();

    const handlePostClick = e => {
        router.push(`/posts/${id}`);
    }

    const handleEdit = e => {
        router.push(`/update-post/${id}`);
    }

    const handleDelete = async (e) => {
        try{
            // add a modal with confirmation before deletion
            const response = await fetch(`/api/delete-post/${id}`);
            if(response.ok){
                passDeletedBack(id);
            }else{
                console.error(response);
            }
        }catch(e){
            throw e;
        }
    }

    return (
      <Card key={id} className={style.card}>
        <CardActionArea className={style.actionArea} onClick={handlePostClick}>
            <CardContent className={style.cardContent}>
                <Typography gutterBottom variant="h5" component="div">
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {body}
                </Typography>
                <Typography variant="subtitle2" color={grey[400]}>
                    Post Id: {id}, User Id: {userId}
                </Typography>
            </CardContent>
        </CardActionArea>
        <CardActions>
            <Button size="small" onClick={handleEdit}>Edit</Button>
            <Button size="small" color="error" onClick={handleDelete}>Delete</Button>
        </CardActions>
      </Card>
    )
}