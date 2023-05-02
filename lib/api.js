import { postJSON, putJSON } from "./fetch";

const createPost = async (data) => {
    try {
        const response = await postJSON(process.env.API_URL, data);
        return response;
    } catch (error) {
        throw Error(error);
    }
}

const getPosts = async (id = "") => {
    try {
        const response = await fetch(process.env.API_URL+`/${id}`);
        const data = await response.json();
        return data;
    } catch (error) {
        throw Error(error);
    }
}

const updatePost = async (id, data) => {
    try {
        const response = await putJSON(process.env.API_URL + `/${id}`, data);
        return response;
    } catch (error) {
        throw Error(error);
    }
}

const deletePost = async (id) => {
    try {
        const response = await fetch(process.env.API_URL + `/${id}`, { method: "DELETE" });
        return response;
    } catch (error) {
        throw Error(error);
    }
}

export { createPost, getPosts, updatePost, deletePost };