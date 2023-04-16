import { Button, Card, CardActions, CardActionArea, CardContent, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import style from '../styles/card.module.css';
import { useRouter } from 'next/router';

export default function CustomCard({ id, userId, title, body }) {
    const router = useRouter();

    const handleClick = e => {
        router.push(`/posts/${id}`);
    }

    return (
      <Card key={id} className={style.card}>
        <CardActionArea className={style.actionArea} onClick={handleClick}>
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
            <Button size="small">Edit</Button>
            <Button size="small" color="error">Delete</Button>
        </CardActions>
      </Card>
    )
}