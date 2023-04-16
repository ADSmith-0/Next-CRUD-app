import { Button, Typography } from "@mui/material";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useRouter } from "next/router";

// could be getStaticProps, depending on how frequently data is updated
export async function getServerSideProps(context){
    const { id } = context.params;
    const response = await fetch(`http://localhost:3000/api/get-posts/${id}`);
    const data = await response.json();
    return {
        props: {
            postData: data
        }
    }
}

export default function Post({ postData }) {
    const { title, body } = postData;
    const router = useRouter();

    const handleClick = e => {
        router.push("/posts");
    }

    return (
        <>
            {/* Ideally this would be a link but idk how to style it like MUI button as a link */}
            <Button startIcon={<ChevronLeftIcon />} onClick={handleClick}>Posts</Button>
            <Typography variant="h1" gutterBottom sx={{ fontSize: "4em" }}>
                {title}
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
                {body}
            </Typography>
        </>
    )
}
