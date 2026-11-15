// Reflexão gratuita: recebe nome, e-mail, WhatsApp (opcional) e aceite.
// Guarda no Brevo só o contato e o aceite. Respostas e resultado NÃO são guardados.
// O tipo de resultado (0, 1 ou 2) só é usado para escolher o texto do e-mail enviado agora.

const WA = '5551982373751';
const SENDER = { name: 'Sabrina Duarte', email: 'contato@sabrinaduartepsi.com.br' };
const ADMIN = { name: 'Sabrina', email: 'sabrina@psielo.com' };
const SITE = 'https://sabrinaduartepsi.vercel.app';
const ACEITE_VERSAO = 'aceite-2026-11-11';

const TIPOS = [
  {
    nome: 'Atenta aos sinais',
    mid: [
      'Suas respostas mostram sinais ainda discretos. De vez em quando a sua cabeça segue trabalhando depois que o trabalho acabou, mas isso ainda não toma conta do seu dia.',
      'Este é um bom momento para reparar. Quem carrega muita responsabilidade costuma ir revisando, antecipando e adiando o descanso aos poucos, sem perceber quando começou.'
    ],
    ask: 'Em que momento do dia a minha cabeça continua trabalhando, mesmo sem ninguém me pedir?',
    inv: {
      text: 'Seus sinais ainda são discretos, e este é um bom momento para entender de onde eles vêm. Na Sessão de Mapa, a gente parte de uma situação real da sua semana e descobre o que faz a sua cabeça continuar trabalhando quando você poderia parar.',
      list: ['o seu primeiro Mapa da Ansiedade: o que dispara, o que você faz para se proteger e quanto isso custa', 'uma prática curta para perceber o padrão antes que ele cresça', 'clareza sobre o próximo passo, se ele fizer sentido para você'],
      extra: '', btn: 'Quero entender o meu padrão'
    }
  },
  {
    nome: 'Cabeça que não desliga',
    mid: [
      'Suas respostas mostram que você dá conta, e que isso já tem um custo. Revisar de cabeça, dizer sim para não decepcionar e deixar o descanso para depois aparecem com frequência na sua rotina.',
      'Muita gente nessa situação acredita que, se baixar a guarda, alguma coisa vai sair do lugar. Essa crença vira uma regra interna: "só posso descansar quando tudo estiver resolvido". E tudo quase nunca está.'
    ],
    ask: 'Qual regra eu sigo sem perceber, e quando foi que eu aprendi a segui-la?',
    inv: {
      text: 'Você já percebeu que funciona assim. O que costuma faltar é entender por que, e o que fazer diferente sem deixar de dar conta. Na Sessão de Mapa, a gente pega uma cena real da sua rotina e encontra a regra interna que mantém a sua cabeça ligada.',
      list: ['o seu Mapa da Ansiedade, com o seu ciclo organizado em uma página', 'a regra que você segue sem perceber, escrita nas suas palavras', 'práticas para os próximos 15 dias, pensadas para caber na sua semana'],
      extra: '', btn: 'Quero entender por que eu não desligo'
    }
  },
  {
    nome: 'Responsabilidade em alerta',
    mid: [
      'Suas respostas indicam que revisar, antecipar e adiar o descanso viraram o seu jeito de se proteger. Em muitos momentos isso parece competência, e por isso passa despercebido. O corpo, porém, costuma avisar antes.',
      'Este resultado mostra como foram as suas últimas semanas. Para um diagnóstico, seria preciso uma avaliação profissional.'
    ],
    ask: 'O que eu imagino que pode acontecer se eu parar de checar, de revisar e de me preparar?',
    inv: {
      text: 'Quando o corpo já está avisando, o primeiro passo é parar de tratar isso como mais uma coisa para dar conta sozinha. A Sessão de Mapa é uma conversa para entender o que sustenta esse jeito de funcionar e decidir, com orientação, qual é o melhor caminho para você agora.',
      list: ['o seu Mapa da Ansiedade: o que dispara, como você se protege e o que isso está custando ao seu corpo e à sua rotina', 'práticas para os próximos 15 dias, incluindo uma para os momentos de mais tensão', 'uma indicação clara do próximo passo: acompanhamento ou psicoterapia'],
      extra: 'Se o que você sente está muito intenso, a psicoterapia pode ser o caminho mais indicado agora. Na conversa, a gente avalia isso com cuidado.',
      btn: 'Quero entender o meu momento'
    }
  }
];

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const waUrl = (nome) => `https://wa.me/${WA}?text=` + encodeURIComponent(`Oi, Sabrina. Fiz a reflexão, meu resultado foi ${nome} e quero conhecer a Sessão de Mapa da Ansiedade.`);

function emailHtml(t, primeiroNome) {
  const p = 'margin:0 0 14px;font-size:16px;line-height:1.65;color:#2B352F;';
  const v = t.inv;
  return `<div style="background:#F5F1ED;padding:24px 12px;font-family:Montserrat,Arial,sans-serif;">
<div style="max-width:560px;margin:0 auto;background:#FFFFFF;border-radius:12px;padding:28px 24px;">
<p style="${p}font-family:'Playfair Display',Georgia,serif;font-size:21px;color:#38463E;">Oi, ${esc(primeiroNome)}.</p>
<p style="${p}">Obrigada por separar esses minutos para olhar para você.</p>
<p style="${p}background:#F5F1ED;border-left:3px solid #C47A5A;padding:10px 14px;font-family:'Playfair Display',Georgia,serif;font-size:18px;">Seu resultado: <strong>${esc(t.nome)}</strong>.</p>
${t.mid.map((m) => `<p style="${p}">${esc(m)}</p>`).join('')}
<p style="${p}">Uma pergunta para levar hoje:</p>
<p style="${p}font-style:italic;font-family:'Playfair Display',Georgia,serif;font-size:18px;color:#38463E;">${esc(t.ask)}</p>
<hr style="border:0;border-top:1px solid #E3DBD0;margin:22px 0;">
<p style="margin:0 0 8px;font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#7A8F7C;font-weight:600;">Por que olhar para isso agora</p>
<p style="${p}">${esc(v.text)}</p>
<p style="margin:16px 0 6px;font-size:14px;font-weight:600;color:#38463E;">Você sai com:</p>
<ul style="margin:0 0 14px;padding-left:20px;font-size:16px;line-height:1.6;color:#2B352F;">${v.list.map((i) => `<li style="margin-bottom:6px;">${esc(i)}</li>`).join('')}</ul>
${v.extra ? `<p style="${p}font-style:italic;color:#667068;">${esc(v.extra)}</p>` : ''}
<p style="margin:22px 0 8px;text-align:center;"><a href="${waUrl(t.nome)}" style="display:block;background:#B26948;color:#FFFFFF;text-decoration:none;font-weight:600;font-size:15px;padding:14px 22px;border-radius:10px;">${esc(v.btn)}</a></p>
<p style="margin:0 0 18px;font-size:12px;color:#667068;">Um encontro de até 2 horas, online ou presencial em Torres.</p>
<p style="${p}">A Sessão de Mapa é uma porta de entrada. Ela não substitui um processo de psicoterapia.</p>
<p style="${p}">Um abraço,<br><strong>Sabrina Duarte</strong><br>Psicóloga · CRP 07/26486 · Torres e online</p>
</div>
<p style="max-width:560px;margin:14px auto 0;font-size:11px;line-height:1.5;color:#667068;">Esta reflexão não é um diagnóstico e não substitui avaliação profissional. Se você estiver em sofrimento intenso, procure um serviço de saúde ou ligue para o CVV, 188, a qualquer hora.<br>Você recebeu este e-mail porque pediu o resultado completo da reflexão gratuita no perfil @sabrinaduartepsi. Para parar de receber, responda este e-mail com a palavra "cancelar".<br><a href="${SITE}/politica-de-privacidade" style="color:#667068;">Política de Privacidade</a></p>
</div>`;
}

async function brevo(path, payload) {
  const r = await fetch('https://api.brevo.com/v3' + path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'api-key': process.env.BREVO_API_KEY },
    body: JSON.stringify(payload)
  });
  if (!r.ok && r.status !== 204) {
    const txt = await r.text().catch(() => '');
    throw new Error(`Brevo ${path} ${r.status} ${txt.slice(0, 160)}`);
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  try {
    let b = req.body;
    if (typeof b === 'string') { try { b = JSON.parse(b); } catch (e) { b = {}; } }
    b = b || {};
    const nome = String(b.nome || '').trim().slice(0, 80);
    const email = String(b.email || '').trim().toLowerCase().slice(0, 120);
    const digits = String(b.whatsapp || '').replace(/\D/g, '');
    const tipo = Number(b.tipo);

    if (b.aceite !== true) return res.status(400).json({ error: 'aceite obrigatório' });
    if (!nome) return res.status(400).json({ error: 'nome obrigatório' });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ error: 'e-mail inválido' });
    if (digits && !/^(55)?\d{10,11}$/.test(digits)) return res.status(400).json({ error: 'whatsapp inválido' });
    if (![0, 1, 2].includes(tipo)) return res.status(400).json({ error: 'tipo inválido' });

    const whatsapp = digits ? (digits.startsWith('55') ? digits : '55' + digits) : '';
    const primeiroNome = nome.split(/\s+/)[0];
    const agora = new Date().toISOString();
    const listId = Number(process.env.BREVO_LIST_ID || 3);

    // Só o que a política diz que é guardado: nome, e-mail, WhatsApp e aceite.
    const attributes = { NOME: nome, OPT_IN: true };
    if (whatsapp) attributes.WHATSAPP = whatsapp;
    await brevo('/contacts', { email, listIds: [listId], attributes, updateEnabled: true });

    await brevo('/smtp/email', {
      sender: SENDER,
      replyTo: { email: SENDER.email, name: SENDER.name },
      to: [{ email, name: primeiroNome }],
      subject: `${primeiroNome}, o resultado da sua reflexão`,
      htmlContent: emailHtml(TIPOS[tipo], primeiroNome)
    });

    // Registro do aceite (data e hora) para a Sabrina. Não inclui respostas nem resultado.
    await brevo('/smtp/email', {
      sender: { name: 'Reflexão gratuita', email: SENDER.email },
      to: [ADMIN],
      subject: `Reflexão: novo aceite de ${primeiroNome}`,
      htmlContent: `<p><strong>Novo aceite registrado.</strong></p><p>Nome: ${esc(nome)}<br>E-mail: ${esc(email)}<br>WhatsApp: ${esc(whatsapp || 'não informado')}<br>Aceite: ${agora} (${ACEITE_VERSAO})</p>`
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('reflexao:', err.message);
    return res.status(500).json({ error: 'falha no envio' });
  }
}
