import { postJSON } from "@/lib/fetch";

export default async function handler(req, res) {
    try {
        const response = await postJSON(process.env.API_URL, req.body);
        res.status(response.status).send(response);
    }catch(error){
        console.error(error);
        res.status(500).send({ error });
    }
}
