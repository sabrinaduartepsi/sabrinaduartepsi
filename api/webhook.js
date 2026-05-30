export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = req.body;
    const fields = body.data?.fields || [];

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

    let perfil = 'A';
    if (contagem.B > contagem.A && contagem.B >= contagem.C) perfil = 'B';
    else if (contagem.C > contagem.A && contagem.C > contagem.B) perfil = 'C';

    const nomesPerfil = {
      A: 'Guerreira Exausta',
      B: 'Cuida de Todos',
      C: 'Parece Bem'
    };

    const primeiroNome = nome.split(' ')[0] || nome;

    const emails = {
      A: {
        assunto: 'Seu perfil: A Guerreira Exausta',
        corpo: `<p>Olá, ${primeiroNome}.</p>

<p>Você funciona muito bem. Cumpre, resolve, aparece, entrega.</p>

<p>Mas existe uma coisa que você não conta para quase ninguém: por dentro, você está no limite há mais tempo do que consegue admitir.</p>

<p>Não é fraqueza. Você nunca aprendeu a existir sem produzir.</p>

<p>Você está sempre cansada, mas não consegue parar. Quando para, vem a culpa. Sabe o que todo mundo precisa, mas perdeu o fio do que você quer. Chegou longe, mas chegou vazia.</p>

<p>Você não precisa desmontar tudo que construiu. Precisa entender de onde veio esse padrão e aprender, pela primeira vez, a existir sem precisar se provar.</p>

<p>Esse padrão tem nome, tem origem e tem saída.</p>

<p>Criei a <strong>Bússola Interna</strong> para essa mulher: uma mentoria em grupo de 4 encontros ao vivo para você entender o que está por trás do seu esgotamento, com acolhimento, estrutura psicológica e profundidade real.</p>

<p>Se o processo individual fizer mais sentido para o que você está vivendo, o <strong>Reencontro</strong> é um caminho de 12 semanas feito para isso.</p>

<p>Se você leu até aqui e sentiu "esse sou eu", confie nisso.</p>

<p>
  <a href="https://wa.me/5551982373751?text=Quero%20entrar%20para%20a%20Bússola%20Interna">Quero entrar para a Bússola Interna</a><br>
  <a href="https://wa.me/5551982373751?text=Quero%20conversar%20antes%20de%20decidir">Prefiro conversar antes</a>
</p>

<p>Com cuidado,<br>
Sabrina Duarte<br>
Psicóloga · CRP 07/26486</p>`
      },
      B: {
        assunto: 'Seu perfil: A que Cuida de Todos Menos de Si',
        corpo: `<p>Olá, ${primeiroNome}.</p>

<p>Você está sempre disponível. Para os filhos, para o trabalho, para os amigos, para quem precisa. Você resolve, acolhe, sustenta.</p>

<p>Mas existe uma pergunta que você raramente se permite fazer em voz alta: e eu, quando é a minha vez?</p>

<p>Você se ressente, mas não fala. Ajuda mesmo quando está no limite. Sente culpa quando tenta colocar um limite. E carrega uma exaustão que ninguém vê, porque você mesma faz questão de esconder.</p>

<p>Cuidar de você não é egoísmo. É o que vai permitir que você continue sendo quem é para as pessoas que ama, sem se perder no caminho.</p>

<p>Esse padrão tem nome, tem origem e tem saída.</p>

<p>Criei a <strong>Bússola Interna</strong> para essa mulher: uma mentoria em grupo de 4 encontros ao vivo para você entender o que está por trás desse ciclo, com acolhimento real e estrutura psicológica para dar os primeiros passos.</p>

<p>Se você sente que precisa de um espaço só seu, mais aprofundado, o <strong>Reencontro</strong> é um processo individual de 12 semanas criado para isso.</p>

<p>Se você leu até aqui e sentiu "esse sou eu", confie nisso.</p>

<p>
  <a href="https://wa.me/5551982373751?text=Quero%20entrar%20para%20a%20Bússola%20Interna">Quero entrar para a Bússola Interna</a><br>
  <a href="https://wa.me/5551982373751?text=Quero%20conversar%20antes%20de%20decidir">Prefiro conversar antes</a>
</p>

<p>Com cuidado,<br>
Sabrina Duarte<br>
Psicóloga · CRP 07/26486</p>`
      },
      C: {
        assunto: 'Seu perfil: A que Parece Bem, Mas Não Está',
        corpo: `<p>Olá, ${primeiroNome}.</p>

<p>Você dá conta. A vida funciona, os compromissos estão em dia, ninguém desconfia.</p>

<p>Mas existe uma sensação que você carrega em silêncio. Algo não fecha. Não é tristeza exatamente. É uma vida que funciona, mas que não parece completamente sua.</p>

<p>Você realiza coisas e não sente o que esperava sentir. Está presente nas situações, mas ausente de si mesma. E tem uma pergunta que tenta não fazer em voz alta: é só isso?</p>

<p>Não está faltando esforço. Está faltando você, a mulher que existia antes de aprender a parecer bem. Ela não foi embora. Só ficou sem espaço.</p>

<p>Esse padrão tem nome, tem origem e tem saída.</p>

<p>Criei o <strong>Reencontro</strong> para essa mulher: um processo individual de 12 semanas para a mulher que perdeu o fio de si mesma, com profundidade real e a estrutura psicológica que esse processo pede.</p>

<p>Se um grupo for o começo que faz sentido para você agora, a <strong>Bússola Interna</strong> é uma mentoria de 4 encontros ao vivo por onde muitas mulheres começam.</p>

<p>Se você leu até aqui e sentiu "esse sou eu", confie nisso.</p>

<p>
  <a href="https://wa.me/5551982373751?text=Quero%20saber%20mais%20sobre%20o%20Reencontro">Quero saber mais sobre o Reencontro</a><br>
  <a href="https://wa.me/5551982373751?text=Quero%20conversar%20antes%20de%20decidir">Prefiro conversar antes</a>
</p>

<p>Com cuidado,<br>
Sabrina Duarte<br>
Psicóloga · CRP 07/26486</p>`
      }
    };

    const emailData = emails[perfil];

    // Salvar no Brevo
    if (email) {
      await fetch('https://api.brevo.com/v3/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': process.env.BREVO_API_KEY,
        },
        body: JSON.stringify({
          email,
          firstName: primeiroNome,
          listIds: [3],
          attributes: { PERFIL_QUIZ: nomesPerfil[perfil] },
          updateEnabled: true,
        }),
      });

      // Enviar email de resultado para a pessoa
      await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': process.env.BREVO_API_KEY,
        },
        body: JSON.stringify({
          sender: { name: 'Sabrina Duarte', email: 'contato@sabrinaduartepsi.com.br' },
          to: [{ email, name: primeiroNome }],
          subject: emailData.assunto,
          htmlContent: emailData.corpo,
        }),
      });

      // Notificar Sabrina
      await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': process.env.BREVO_API_KEY,
        },
        body: JSON.stringify({
          sender: { name: 'Quiz Sabrina', email: 'contato@sabrinaduartepsi.com.br' },
          to: [{ email: 'contato@sabrinaduartepsi.com.br', name: 'Sabrina' }],
          subject: `Quiz respondido — ${nomesPerfil[perfil]}`,
          htmlContent: `<p><strong>Nova lead no quiz!</strong></p><p>Nome: ${nome}<br>Email: ${email}<br>Perfil: ${nomesPerfil[perfil]}</p>`,
        }),
      });
    }

    return res.status(200).json({ perfil, contagem });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
