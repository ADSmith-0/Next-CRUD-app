import { Alert, Button, TextField } from "@mui/material";
import { useEffect, useState } from 'react';
import { postJSON } from "@/lib/fetch";
import style from "../styles/add-post.module.css";

export default function AddPost() {
    const [ userId, setUserId ] = useState("");
    const [ title, setTitle ] = useState("");
    const [ body, setBody ] = useState("");

    const [ successAlertVisible, setSuccessAlertVisible ] = useState(false);
    const [ errorAlertVisible, setErrorAlertVisible ] = useState(false);


    const resetFields = () => {
        setUserId("");
        setTitle("");
        setBody("");
    }

    useEffect(() => {
        const timeout = setTimeout(() => setSuccessAlertVisible(false), 5000);
        return () => clearTimeout(timeout);
    }, [ successAlertVisible ]);

    useEffect(() => {
        const timeout = setTimeout(() => setErrorAlertVisible(false), 5000);
        return () => clearTimeout(timeout);
    }, [ errorAlertVisible ]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await postJSON("/api/create-post", { userId, title, body });
            if(response.ok){
                resetFields();
                setSuccessAlertVisible(true);
            }else{
                setErrorAlertVisible(true);
            }
        }catch(error){
            throw error;
        }
    }

    return (
        <div className={`${style.container} ${style.flex}`}>
            <h2>Add a post:</h2>
            {/* Ideally we'd use action with an endpoint at our API  
            like with sveltekit forms, but that doesn't work here */}
            <form className={style.flex} onSubmit={handleSubmit}>
                <TextField 
                    label="User Id"
                    variant="outlined"
                    inputProps={{
                        inputMode: "numeric",
                        pattern: "[0-9]{1}",
                        required: true,
                        title: "Must be a number < 10"
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
            {
                successAlertVisible &&
                <Alert onClose={() => setSuccessAlertVisible(false)}>Post added!</Alert>
            }
            {
                errorAlertVisible &&
                <Alert severity="error" onClose={() => setErrorAlertVisible(false)}>Something went wrong please try again</Alert>
            }
        </div>
    )
}