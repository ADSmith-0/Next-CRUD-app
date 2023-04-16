import { Button, TextField } from "@mui/material";
import Alert from '../../components/alert';
import { useState } from 'react';
import { putJSON} from "@/lib/fetch";
import style from "../../styles/add-update-post.module.css";

export async function getServerSideProps(context) {
    try{
        const { id } = context.params;
        const response = await fetch(`http://localhost:3000/api/get-posts/${id}`);
        const data = await response.json();
        return {
            props: {
                postData: data
            }
        }
    }catch(e){
        throw e;
    }
}

export default function UpdatePost({ postData }) {
    const [id, setId] = useState(postData.id);
    const [userId, setUserId] = useState(postData.userId);
    const [title, setTitle] = useState(postData.title);
    const [body, setBody] = useState(postData.body);

    const [successAlertVisible, setSuccessAlertVisible] = useState(false);
    const [errorAlertVisible, setErrorAlertVisible] = useState(false);


    const resetFields = () => {
        setId("");
        setUserId("");
        setTitle("");
        setBody("");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await putJSON(`/api/update-post/${id}`, { id, userId, title, body });
            if (response.ok) {
                resetFields();
                setSuccessAlertVisible(true);
            } else {
                setErrorAlertVisible(true);
            }
        } catch (error) {
            throw error;
        }
    }

    return (
        <div className={`${style.container} ${style.flex}`}>
            <h2>Update a post:</h2>
            {/* Ideally we'd use action with an endpoint at our API  
            like with sveltekit forms, but that doesn't work here */}
            <form className={style.flex} onSubmit={handleSubmit}>
                <TextField
                    label="Post Id"
                    variant="outlined"
                    inputProps={{
                        inputMode: "numeric",
                        pattern: "[0-9]+",
                        required: true,
                        title: "Must be a number"
                    }}
                    value={id}
                    onInput={(e) => setId(e.target.value)}
                    fullWidth
                />
                <TextField
                    label="User Id"
                    variant="outlined"
                    inputProps={{
                        inputMode: "numeric",
                        pattern: "[0-9]+",
                        required: true,
                        title: "Must be a number"
                    }}
                    value={userId}
                    onInput={(e) => setUserId(e.target.value)}
                    fullWidth
                />
                <TextField
                    label="Title"
                    variant="outlined"
                    inputProps={{
                        inputMode: "text",
                        pattern: ".+",
                        required: true,
                        title: "Cannot be empty"
                    }}
                    value={title}
                    onInput={(e) => setTitle(e.target.value)}
                    fullWidth
                />
                <TextField
                    label="Body"
                    variant="outlined"
                    inputProps={{
                        inputMode: "text",
                        pattern: ".+",
                        required: true,
                        title: "Cannot be empty"
                    }}
                    value={body}
                    onInput={(e) => setBody(e.target.value)}
                    fullWidth
                />
                <Button
                    type="submit"
                    variant="contained"
                    className={style.btn}
                >
                    Submit
                </Button>
            </form>
            <Alert visible={successAlertVisible} setVisible={setSuccessAlertVisible}>Post created!</Alert>
            <Alert visible={errorAlertVisible} setVisible={setErrorAlertVisible} severity="error">Something went wrong please try again</Alert>
        </div>
    )
}