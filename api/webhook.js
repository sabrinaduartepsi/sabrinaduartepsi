export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Aceitar body como string ou objeto
    let body = req.body;
    if (typeof body === 'string') {
      try { body = JSON.parse(body); } catch(e) { body = {}; }
    }

    // O Tally pode enviar em formatos diferentes
    const fields = body.data?.fields || body.fields || [];

    const contagem = { A: 0, B: 0, C: 0 };
    const A_keywords = ['cansaço', 'cansa', 'perigoso', 'forte', 'fraqueza', 'parar', 'cansada'];
    const B_keywords = ['culpa', 'disponível', 'disponivel', 'decepcionando', 'cuido', 'todos'];
    const C_keywords = ['vazio', 'equilibrada', 'estranheza', 'vida boa', 'renovada', 'parece bem'];

    let email = '';
    let nome = '';

    for (const field of fields) {
      const tipo = field.type || '';
      const valor = field.value || '';

      if (tipo === 'INPUT_EMAIL' || field.label?.toLowerCase().includes('email')) {
        email = typeof valor === 'string' ? valor : '';
      }
      if (tipo === 'INPUT_TEXT' || field.label?.toLowerCase().includes('nome')) {
        if (!email.includes(valor)) nome = typeof valor === 'string' ? valor : '';
      }

      // Múltipla escolha — pegar o texto da resposta
      let textoResposta = '';
      if (typeof valor === 'string') {
        textoResposta = valor.toLowerCase();
      } else if (Array.isArray(valor)) {
        textoResposta = valor.map(v => typeof v === 'string' ? v : v.text || '').join(' ').toLowerCase();
      } else if (valor && typeof valor === 'object') {
        textoResposta = (valor.text || valor.label || '').toLowerCase();
      }

      if (textoResposta && (tipo === 'MULTIPLE_CHOICE' || tipo === 'RADIO' || tipo === 'DROPDOWN')) {
        if (A_keywords.some(k => textoResposta.includes(k))) contagem.A++;
        else if (B_keywords.some(k => textoResposta.includes(k))) contagem.B++;
        else if (C_keywords.some(k => textoResposta.includes(k))) contagem.C++;
      }
    }

    // Se não identificou perfil pelas keywords, tenta pelo índice da opção
    // A = primeira opção, B = segunda, C = terceira
    if (contagem.A === 0 && contagem.B === 0 && contagem.C === 0) {
      for (const field of fields) {
        const valor = field.value;
        const options = field.options || [];
        if (Array.isArray(options) && options.length > 0) {
          const selectedIndex = options.findIndex(o => 
            o.id === valor || o.text === valor || o === valor
          );
          if (selectedIndex === 0) contagem.A++;
          else if (selectedIndex === 1) contagem.B++;
          else if (selectedIndex === 2) contagem.C++;
        }
      }
    }

    let perfil = 'A';
    if (contagem.B > contagem.A && contagem.B >= contagem.C) perfil = 'B';
    else if (contagem.C > contagem.A && contagem.C > contagem.B) perfil = 'C';

    const nomesPerfil = { A: 'Guerreira Exausta', B: 'Cuida de Todos', C: 'Parece Bem' };
    const primeiroNome = (nome || 'você').split(' ')[0];

    const assuntos = {
      A: 'Seu perfil: A Guerreira Exausta',
      B: 'Seu perfil: A que Cuida de Todos Menos de Si',
      C: 'Seu perfil: A que Parece Bem, Mas Não Está'
    };

    const corpoA = `<p>Olá, ${primeiroNome}.</p>
<p>Você funciona muito bem. Cumpre, resolve, aparece, entrega.</p>
<p>Mas existe uma coisa que você não conta para quase ninguém: por dentro, você está no limite há mais tempo do que consegue admitir.</p>
<p>Não é fraqueza. Você nunca aprendeu a existir sem produzir.</p>
<p>Você está sempre cansada, mas não consegue parar. Quando para, vem a culpa. Sabe o que todo mundo precisa, mas perdeu o fio do que você quer. Chegou longe, mas chegou vazia.</p>
<p>Você não precisa desmontar tudo que construiu. Precisa entender de onde veio esse padrão e aprender, pela primeira vez, a existir sem precisar se provar.</p>
<p>Esse padrão tem nome, tem origem e tem saída.</p>
<p>Criei a <strong>Bússola Interna</strong> para essa mulher: uma mentoria em grupo de 4 encontros ao vivo para você entender o que está por trás do seu esgotamento, com acolhimento, estrutura psicológica e profundidade real.</p>
<p>Se o processo individual fizer mais sentido para o que você está vivendo, o <strong>Reencontro</strong> é um caminho de 12 semanas feito para isso.</p>
<p>Se você leu até aqui e sentiu "esse sou eu", confie nisso.</p>
<p><a href="https://wa.me/5551982373751?text=Quero%20entrar%20para%20a%20Bússola%20Interna">Quero entrar para a Bússola Interna</a><br><a href="https://wa.me/5551982373751?text=Quero%20conversar%20antes%20de%20decidir">Prefiro conversar antes</a></p>
<p>Com cuidado,<br>Sabrina Duarte<br>Psicóloga · CRP 07/26486</p>`;

    const corpoB = `<p>Olá, ${primeiroNome}.</p>
<p>Você está sempre disponível. Para os filhos, para o trabalho, para os amigos, para quem precisa. Você resolve, acolhe, sustenta.</p>
<p>Mas existe uma pergunta que você raramente se permite fazer em voz alta: e eu, quando é a minha vez?</p>
<p>Você se ressente, mas não fala. Ajuda mesmo quando está no limite. Sente culpa quando tenta colocar um limite. E carrega uma exaustão que ninguém vê, porque você mesma faz questão de esconder.</p>
<p>Cuidar de você não é egoísmo. É o que vai permitir que você continue sendo quem é para as pessoas que ama, sem se perder no caminho.</p>
<p>Esse padrão tem nome, tem origem e tem saída.</p>
<p>Criei a <strong>Bússola Interna</strong> para essa mulher: uma mentoria em grupo de 4 encontros ao vivo para você entender o que está por trás desse ciclo, com acolhimento real e estrutura psicológica para dar os primeiros passos.</p>
<p>Se você sente que precisa de um espaço só seu, mais aprofundado, o <strong>Reencontro</strong> é um processo individual de 12 semanas criado para isso.</p>
<p>Se você leu até aqui e sentiu "esse sou eu", confie nisso.</p>
<p><a href="https://wa.me/5551982373751?text=Quero%20entrar%20para%20a%20Bússola%20Interna">Quero entrar para a Bússola Interna</a><br><a href="https://wa.me/5551982373751?text=Quero%20conversar%20antes%20de%20decidir">Prefiro conversar antes</a></p>
<p>Com cuidado,<br>Sabrina Duarte<br>Psicóloga · CRP 07/26486</p>`;

    const corpoC = `<p>Olá, ${primeiroNome}.</p>
<p>Você dá conta. A vida funciona, os compromissos estão em dia, ninguém desconfia.</p>
<p>Mas existe uma sensação que você carrega em silêncio. Algo não fecha. Não é tristeza exatamente. É uma vida que funciona, mas que não parece completamente sua.</p>
<p>Você realiza coisas e não sente o que esperava sentir. Está presente nas situações, mas ausente de si mesma. E tem uma pergunta que tenta não fazer em voz alta: é só isso?</p>
<p>Não está faltando esforço. Está faltando você, a mulher que existia antes de aprender a parecer bem. Ela não foi embora. Só ficou sem espaço.</p>
<p>Esse padrão tem nome, tem origem e tem saída.</p>
<p>Criei o <strong>Reencontro</strong> para essa mulher: um processo individual de 12 semanas para a mulher que perdeu o fio de si mesma, com profundidade real e a estrutura psicológica que esse processo pede.</p>
<p>Se um grupo for o começo que faz sentido para você agora, a <strong>Bússola Interna</strong> é uma mentoria de 4 encontros ao vivo por onde muitas mulheres começam.</p>
<p>Se você leu até aqui e sentiu "esse sou eu", confie nisso.</p>
<p><a href="https://wa.me/5551982373751?text=Quero%20saber%20mais%20sobre%20o%20Reencontro">Quero saber mais sobre o Reencontro</a><br><a href="https://wa.me/5551982373751?text=Quero%20conversar%20antes%20de%20decidir">Prefiro conversar antes</a></p>
<p>Com cuidado,<br>Sabrina Duarte<br>Psicóloga · CRP 07/26486</p>`;

    const corpos = { A: corpoA, B: corpoB, C: corpoC };

    if (email) {
      // Salvar no Brevo
      await fetch('https://api.brevo.com/v3/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'api-key': process.env.BREVO_API_KEY },
        body: JSON.stringify({ email, firstName: primeiroNome, listIds: [3], attributes: { PERFIL_QUIZ: nomesPerfil[perfil] }, updateEnabled: true }),
      });

      // Email para a pessoa
      await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'api-key': process.env.BREVO_API_KEY },
        body: JSON.stringify({
          sender: { name: 'Sabrina Duarte', email: 'contato@sabrinaduartepsi.com.br' },
          to: [{ email, name: primeiroNome }],
          subject: assuntos[perfil],
          htmlContent: corpos[perfil]
        }),
      });

      // Notificação para Sabrina
      await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'api-key': process.env.BREVO_API_KEY },
        body: JSON.stringify({
          sender: { name: 'Quiz Sabrina', email: 'contato@sabrinaduartepsi.com.br' },
          to: [{ email: 'contato@sabrinaduartepsi.com.br', name: 'Sabrina' }],
          subject: `Quiz respondido: ${nomesPerfil[perfil]}`,
          htmlContent: `<p><strong>Nova lead!</strong></p><p>Nome: ${nome}<br>Email: ${email}<br>Perfil: ${nomesPerfil[perfil]}</p><p>Contagem: A=${contagem.A} B=${contagem.B} C=${contagem.C}</p>`
        }),
      });
    }

    return res.status(200).json({ ok: true, perfil, email, contagem });

  } catch (error) {
    return res.status(500).json({ error: error.message, stack: error.stack });
  }
}
