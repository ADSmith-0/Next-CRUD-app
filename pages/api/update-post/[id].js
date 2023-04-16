import { putJSON } from "@/lib/fetch";

export default async function handler(req, res) {
    try {
        const { id } = req.query;
        const response = await putJSON(process.env.API_URL+`/${id}`, req.body);
        res.status(response.status).send(response);
    } catch (error) {
        res.status(500).send({ error })
    }
}