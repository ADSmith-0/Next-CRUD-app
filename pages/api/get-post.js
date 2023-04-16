export default async function handler(req, res) {
    try {
        const { id } = req.params
        console.log(id);
        const response = await fetch(process.env.API_URL+"/"+id);
        // const data = await response.json();

        res.status(response.status).json({ "hello": "world" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error });
    }
}
