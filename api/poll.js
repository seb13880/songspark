export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const API_KEY = 'afk_06640624c46df1f9ca3deee265bf58ba0f9c7d23';
  const { jobId } = req.query;

  if (!jobId) return res.status(400).json({ error: 'jobId manquant' });

  try {
    const response = await fetch(`https://api.apiframe.ai/v2/jobs/${jobId}`, {
      headers: { 'X-API-Key': API_KEY }
    });

    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
