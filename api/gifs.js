export default async function handler(req, res) {
    const { p, q, uid } = req.query;
    const API_KEY = process.env.KEY;

    const response = await fetch(
        `https://api.klipy.com/api/v1/${API_KEY}/gifs/search?page=${p}&per_page=50&q=${q}&customer_id=${uid}`
    );
    const data = await response.json();

    const urls = data.data.data.map((gif) => gif.file.sm.gif);
    res.status(200).json({ urls });
}
