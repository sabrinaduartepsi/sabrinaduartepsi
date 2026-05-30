export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = req.body;
    const fields = body.data?.fields || [];

    // Contar respostas por perfil
    const contagem = { A: 0, B: 0, C: 0 };

    const A_keywords = ['cansaço', 'perigoso', 'forte', 'fraqueza', 'parar'];
    const B_keywords = ['culpa', 'disponível', 'disponivel', 'decepcionando', 'cuido'];
    const C_keywords = ['vazio', 'equilibrada', 'estranheza', 'vida boa', 'renovada'];

    let email = '';
    let nome = '';

    for (const field of fields) {
      if (field.type === 'INPUT_EMAIL') email = field.value || '';
      if (field.type === 'INPUT_TEXT') nome = field.value || '';

      if (field.type === 'MULTIPLE_CHOICE' && field.value) {
        const r = field.value.toLowerCase();
        if (A_keywords.some(k => r.includes(k))) contagem.A++;
        else if (B_keywords.some(k => r.includes(k))) contagem.B++;
        else if (C_keywords.some(k => r.includes(k))) contagem.C++;
      }
    }

    // Perfil vencedor
    let perfil = 'A';
    if (contagem.B > contagem.A && contagem.B >= contagem.C) perfil = 'B';
    else if (contagem.C > contagem.A && contagem.C > contagem.B) perfil = 'C';

    const urls = {
      A: 'https://sabrinaduartepsi.vercel.app/resultado-guerreira',
      B: 'https://sabrinaduartepsi.vercel.app/resultado-cuida-de-todos',
      C: 'https://sabrinaduartepsi.vercel.app/resultado-parece-bem'
    };

    // Salvar no Brevo
    if (email) {
      const nomesPerfil = {
        A: 'Guerreira Exausta',
        B: 'Cuida de Todos',
        C: 'Parece Bem'
      };
      await fetch('https://api.brevo.com/v3/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': process.env.BREVO_API_KEY,
        },
        body: JSON.stringify({
          email,
          firstName: nome,
          listIds: [3],
          attributes: { PERFIL_QUIZ: nomesPerfil[perfil] },
          updateEnabled: true,
        }),
      });
    }

    return res.status(200).json({
      perfil,
      url: urls[perfil],
      contagem
    });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
