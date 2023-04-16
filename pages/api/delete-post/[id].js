export default async function handler(req, res){
    try {
        const { id } = req.query;
        const response = await fetch(process.env.API_URL+`/${id}`, { method: "DELETE" });
        res.status(response.status).send(response);
    }catch(error){
        res.status(500).send({ error })
    }
}