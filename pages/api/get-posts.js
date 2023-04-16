export default async function handler(req, res) {
    try {
        const response = await fetch(process.env.API_URL);
        const data = await response.json()
        res.status(response.status).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error });
    }
}
