const express = require('express');
const cors = require('cors');
const path = require('path');
const https = require('https');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const ALL_Q = [
  {cat:"⚽ Aquecimento",q:"A OMS recomenda que as mãos sejam higienizadas por pelo menos quanto tempo com água e sabão?",opts:["5 segundos","40 a 60 segundos","1 minuto","5 minutos"],ans:1,exp:"A OMS recomenda pelo menos 40 a 60 segundos — tempo de cantar Parabéns duas vezes."},
  {cat:"🏟️ Grandes Eventos",q:"Qual é a forma mais eficaz de eliminar vírus como o Norovírus nas mãos?",opts:["Álcool gel 70%","Somente enxaguar com água","Lavar com água e sabão","Usar luvas cirúrgicas"],ans:2,exp:"Para Norovírus, água e sabão é mais eficaz que álcool gel."},
  {cat:"🧤 Equipamentos",q:"Qual concentração de álcool gel é padrão‑ouro para antissepsia das mãos?",opts:["46%","50%","70%","95%"],ans:2,exp:"Álcool gel a 70% é o padrão recomendado pela ANVISA e OMS."},
  {cat:"⚽ Aquecimento",q:"A OMS recomenda que as mãos sejam higienizadas por pelo menos quanto tempo com álcool gel?",opts:["15 segundos","20 a 30 segundos","40 segundos","1 minutos"],ans:1,exp:"De 20 a 30 segundos"},
  {cat:"🥅 Os 5 Momentos",q:"Qual opção NÃO faz parte dos 5 Momentos para Higiene das Mãos da OMS?",opts:["Antes de tocar o paciente","Após contato com superfícies próximas ao paciente","Ao entrar na unidade hospitalar","Antes de realizar procedimento asséptico"],ans:2,exp:"Entrar na unidade não é um dos 5 Momentos da OMS."},
  {cat:"⏱️ Técnica",q:"Na técnica correta de lavagem das mãos da OMS, quantas etapas são recomendadas?",opts:["3 etapas","5 etapas","6 etapas","11 etapas"],ans:2,exp:"São 6 passos: palmas, dorso, entre dedos, dedos em gancho, polegares e punhos."},
  {cat:"🏆 Regulação",q:"No Brasil, qual órgão publica normas sobre higienização das mãos em serviços de saúde?",opts:["SUS","ANVISA","Ministério do Esporte","INMETRO"],ans:1,exp:"A ANVISA é o órgão regulador responsável por essas normas."},
  {cat:"🧪 Ciência",q:"Qual patógeno hospitalar tem transmissão fortemente reduzida com higiene das mãos?",opts:["MRSA","Vírus da gripe sazonal","Toxoplasma gondii","Plasmodium falciparum"],ans:0,exp:"O MRSA é frequentemente transmitido pelas mãos dos profissionais de saúde."},
  {cat:"📋 Regras",q:"O que os profissionais de saúde devem evitar para garantir boa higiene das mãos?",opts:["Uniforme de manga curta","Anéis, pulseiras e unhas com esmalte ou alongamento","Tênis fechado","Cabelo preso"],ans:1,exp:"Anéis, pulseiras e unhas artificiais favorecem acúmulo de microrganismos."},
  {cat:"🎯 Pênalti Final",q:"Qual é a forma correta de secar as mãos após a lavagem?",opts:["Papel toalha descartável, secando completamente","Sacudir as mãos no ar","Secar na roupa","Deixar secar ao natural"],ans:0,exp:"Mãos úmidas transmitem muito mais microrganismos; secar bem é essencial."},
  {cat:"🧴 Álcool Gel",q:"Em qual situação o álcool gel é suficiente para higiene das mãos em área hospitalar?",opts:["Sempre, mesmo sujas de sangue","Quando as mãos não estão visivelmente sujas","Somente após usar o banheiro","Nunca, sempre água e sabão"],ans:1,exp:"Sem sujidade visível, álcool a 70% é eficaz e recomendado."},
  {cat:"🚿 Água e Sabão",q:"Quando a preferência é lavar com água e sabão, mesmo havendo álcool gel?",opts:["Após usar o banheiro","Ao entrar no hospital","Ao sair para o almoço","Sempre que lembrar"],ans:0,exp:"Após o banheiro e com mãos visivelmente sujas, prioriza-se água e sabão."},
  {cat:"👶 Pediatria",q:"Em unidades pediátricas, a higiene das mãos ajuda principalmente a prevenir:",opts:["Quedas","IRAS","Reações a medicamentos","Desidratação"],ans:1,exp:"As mãos são via importante de transmissão de vírus respiratórios e entéricos."},
  {cat:"💉 Procedimentos",q:"Antes de realizar punção venosa ou injeções, qual ação é obrigatória?",opts:["Vestir jaleco","Higienizar as mãos","Colocar touca","Medir pressão arterial"],ans:1,exp:"Antes de qualquer procedimento asséptico, é obrigatório higienizar as mãos."},
  {cat:"🧪 Fluidos",q:"Após risco de exposição a sangue ou fluidos corporais, o que fazer?",opts:["Trocar de luvas apenas","Limpar a área com gaze","Higienizar as mãos imediatamente","Esperar o fim do plantão"],ans:2,exp:"A higienização das mãos deve ser imediata após risco de exposição."},
  {cat:"🏥 Superfícies",q:" A técnica de enfermagem entra no leito para ajustar bomba de infusão, essa ação se refere a qual dos 05 momentos de higiene das mãos?",opts:["Antes de procedimento asséptico","Após contato com superfícies próximas ao paciente","Após risco de exposição a fluidos","Antes de tocar o paciente"],ans:1,exp:"É o quinto momento: após contato com superfícies próximas ao paciente."},
  {cat:"👋 Unhas",q:"Qual característica de unhas é recomendada para quem presta assistência direta?",opts:["Unhas curtas, sem esmalte ou alongamento","Unhas grandes com esmalte claro","Unhas médias com base incolor","Unhas postiças bem lixadas"],ans:0,exp:"Unhas curtas e sem esmalte facilitam a higienização completa."},
  {cat:"🧼 Técnica",q:"Qual parte das mãos costuma ser mais esquecida na higienização?",opts:["Palmas","Punhos","Entre os dedos e polegares","Dorso das mãos"],ans:2,exp:"Espaços interdigitais e polegares são frequentemente esquecidos."},
  {cat:"🌡️ Surtos",q:"Durante surto hospitalar, a prática de higiene das mãos deve ser:",opts:["Substituída pela utilização dos EPI´S","Reduzida para poupar tempo e prestar assistência aos pacientes","Intensificada em todos os momentos indicados","Não é necessário se o profissional estiver utilizando luva de procedimento"],ans:2,exp:"Durante surtos, a adesão aos 5 Momentos precisa ser reforçada."},
  {cat:"👨‍👩‍👧 Público Geral",q:"Em escolas e eventos esportivos, incentivar a higiene das mãos impacta principalmente:",opts:["Notas escolares","Transmissão de infecções","Conforto térmico","Desempenho físico"],ans:1,exp:"Menos infecções significam menos faltas e menor transmissão entre participantes."}
];

// ===== PARTIDA GLOBAL =====
function novaPartida() {
  return {
    versao: Date.now(),
    iniciada: false,
    encerrada: false,
    perguntaIndex: 0,
    aguardandoProxima: false,
    proximaEm: null,
    perguntas: ALL_Q,
    times: {
      azul:  { gols: 0, respondeu: false, jogadores: [] },
      verde: { gols: 0, respondeu: false, jogadores: [] }
    }
  };
}

let partida = novaPartida();

function todosResponderam() {
  return partida.times.azul.respondeu && partida.times.verde.respondeu;
}

function resetarRespostas() {
  partida.times.azul.respondeu  = false;
  partida.times.verde.respondeu = false;
}

function podeIniciar() {
  return partida.times.azul.jogadores.length  > 0 &&
         partida.times.verde.jogadores.length > 0;
}

// ===== ENVIO DE EMAIL via EmailJS =====
function enviarRelatorio(placar, jogadoresAzul, jogadoresVerde) {
  console.log('📧 Iniciando envio de relatório por email...');
  console.log('   Placar:', placar);
  console.log('   Time Azul:', jogadoresAzul);
  console.log('   Time Verde:', jogadoresVerde);

  const azul  = placar.azul;
  const verde = placar.verde;

  let vencedor;
  if (azul > verde)      vencedor = `🔵 Time Azul (${azul} x ${verde})`;
  else if (verde > azul) vencedor = `🟢 Time Verde (${verde} x ${azul})`;
  else                   vencedor = `🤝 Empate (${azul} x ${verde})`;

  const dataHora = new Date().toLocaleString('pt-BR', {
    timeZone: 'America/Sao_Paulo'
  });

  const corpo = `
⚽ RELATÓRIO FINAL — COPA DA HIGIENE
=====================================
📅 Data/Hora: ${dataHora}

🏆 RESULTADO: ${vencedor}

🔵 TIME AZUL — ${azul} gol(s)
Jogadores: ${jogadoresAzul.join(', ') || '—'}

🟢 TIME VERDE — ${verde} gol(s)
Jogadores: ${jogadoresVerde.join(', ') || '—'}

=====================================
Total de perguntas: ${ALL_Q.length}
Aproveitamento geral: ${Math.round((azul + verde) / ALL_Q.length * 100)}%
  `.trim();

  const payload = JSON.stringify({
    service_id:  'service_t2hr53m',
    template_id: 'template_pwoea85',
    user_id:     'uFnIjg1P8MKqSKyAp',
    template_params: {
      to_email:        'raianesouzan09@gmail.com',
      subject:         `⚽ Relatório Copa da Higiene — ${dataHora}`,
      message:         corpo,
      vencedor,
      azul_gols:       String(azul),
      verde_gols:      String(verde),
      jogadores_azul:  jogadoresAzul.join(', ')  || '—',
      jogadores_verde: jogadoresVerde.join(', ') || '—',
      data_hora:       dataHora,
    }
  });

  console.log('📤 Payload montado, enviando para api.emailjs.com...');

  const options = {
    hostname: 'api.emailjs.com',
    path:     '/api/v1.0/email/send',
    method:   'POST',
    headers:  {
      'Content-Type':   'application/json',
      'Content-Length': Buffer.byteLength(payload),
      'origin':         'http://localhost'
    }
  };

  const req = https.request(options, res => {
    let body = '';
    res.on('data', chunk => body += chunk);
    res.on('end', () => {
      if (res.statusCode === 200) {
        console.log('✅ Email enviado com sucesso! Status:', res.statusCode);
      } else {
        console.error('❌ Erro ao enviar email. Status:', res.statusCode);
        console.error('   Resposta:', body);
      }
    });
  });

  req.on('error', e => {
    console.error('❌ Erro de rede ao enviar email:', e.message);
  });

  req.write(payload);
  req.end();
}

// ===== ROTAS =====

// GET /estado
app.get('/estado', (req, res) => {
  const { time = 'azul' } = req.query;

  // ✅ Avança pergunta automaticamente quando countdown expirar
  if (
    partida.aguardandoProxima &&
    partida.proximaEm &&
    Date.now() >= partida.proximaEm
  ) {
    partida.perguntaIndex++;
    partida.aguardandoProxima = false;
    partida.proximaEm         = null;
    resetarRespostas();

    if (partida.perguntaIndex >= partida.perguntas.length) {
      partida.encerrada = true;
      console.log('🏁 Fim de jogo detectado! Enviando relatório...');
      console.log('   Azul:', partida.times.azul.gols,  'gols |', partida.times.azul.jogadores);
      console.log('   Verde:', partida.times.verde.gols, 'gols |', partida.times.verde.jogadores);
      enviarRelatorio(
        { azul: partida.times.azul.gols, verde: partida.times.verde.gols },
        partida.times.azul.jogadores,
        partida.times.verde.jogadores
      );
    }
  }

  const idx       = partida.perguntaIndex;
  const fimDeJogo = partida.iniciada && partida.encerrada;
  const pergunta  = !fimDeJogo ? partida.perguntas[idx] : null;

  const perguntaSegura = pergunta ? {
    index: idx,
    total: partida.perguntas.length,
    cat:   pergunta.cat,
    q:     pergunta.q,
    opts:  pergunta.opts,
  } : null;

  res.json({
    versao:            partida.versao,
    iniciada:          partida.iniciada,
    encerrada:         partida.encerrada,
    perguntaIndex:     idx,
    jogadoresAzul:     partida.times.azul.jogadores,
    jogadoresVerde:    partida.times.verde.jogadores,
    podeIniciar:       podeIniciar(),
    pergunta:          perguntaSegura,
    placar: {
      azul:  partida.times.azul.gols,
      verde: partida.times.verde.gols,
    },
    jaRespondeu:       partida.times[time]?.respondeu || false,
    todosResponderam:  todosResponderam(),
    aguardandoProxima: partida.aguardandoProxima,
    proximaEm:         partida.proximaEm,
    fimDeJogo,
  });
});

// POST /registrar
app.post('/registrar', (req, res) => {
  const { time, jogadores = [] } = req.body;

  if (!['azul','verde'].includes(time))
    return res.status(400).json({ erro: 'Time inválido.' });
  if (!Array.isArray(jogadores) || jogadores.length === 0)
    return res.status(400).json({ erro: 'Informe ao menos 1 jogador.' });

  // ✅ Se partida encerrada, reseta automaticamente para nova partida
  if (partida.encerrada) {
    console.log('🔄 Partida encerrada detectada no /registrar — resetando automaticamente...');
    partida = novaPartida();
  }

  partida.times[time].jogadores = jogadores.slice(0, 10);
  console.log(`✅ Time ${time} registrado:`, partida.times[time].jogadores);

  res.json({
    ok:             true,
    versao:         partida.versao,
    jogadoresAzul:  partida.times.azul.jogadores,
    jogadoresVerde: partida.times.verde.jogadores,
    podeIniciar:    podeIniciar(),
    iniciada:       partida.iniciada,
  });
});

// POST /iniciar
app.post('/iniciar', (req, res) => {
  if (!podeIniciar())
    return res.status(400).json({ erro: 'Os 2 times precisam ter jogadores.' });
  if (partida.iniciada)
    return res.status(400).json({ erro: 'Partida já iniciada.' });

  partida.iniciada              = true;
  partida.encerrada             = false;
  partida.perguntaIndex         = 0;
  partida.aguardandoProxima     = false;
  partida.proximaEm             = null;
  partida.times.azul.gols       = 0;
  partida.times.azul.respondeu  = false;
  partida.times.verde.gols      = 0;
  partida.times.verde.respondeu = false;

  console.log('🚀 Partida iniciada!');
  res.json({ ok: true, versao: partida.versao });
});

// POST /responder
app.post('/responder', (req, res) => {
  const { time, resposta } = req.body;

  if (!partida.iniciada)
    return res.status(400).json({ erro: 'Partida não iniciada.' });
  if (partida.encerrada)
    return res.status(400).json({ erro: 'Partida encerrada.' });
  if (partida.perguntaIndex >= partida.perguntas.length)
    return res.status(400).json({ erro: 'Fim de jogo.' });
  if (!['azul','verde'].includes(time))
    return res.status(400).json({ erro: 'Time inválido.' });
  if (partida.times[time].respondeu)
    return res.status(400).json({ erro: 'Já respondeu esta pergunta.' });

  const pergunta = partida.perguntas[partida.perguntaIndex];
  const acertou  = Number(resposta) === pergunta.ans;

  if (acertou) partida.times[time].gols++;
  partida.times[time].respondeu = true;

  console.log(`📝 ${time} respondeu pergunta ${partida.perguntaIndex + 1} — ${acertou ? '✅ CERTO' : '❌ ERRADO'}`);

  const todos = todosResponderam();

  // ✅ Ambos responderam — inicia countdown de 5s
  if (todos && !partida.aguardandoProxima) {
    partida.aguardandoProxima = true;
    partida.proximaEm         = Date.now() + 5000;
    console.log('⏳ Ambos responderam! Próxima pergunta em 5 segundos...');
  }

  // ✅ Verifica se é a última pergunta
  const ultimaPergunta = partida.perguntaIndex === partida.perguntas.length - 1;
  const fimDeJogo      = todos && ultimaPergunta;

  res.json({
    acertou,
    respostaCorreta:   pergunta.ans,
    opcaoTexto:        pergunta.opts[pergunta.ans],
    explicacao:        pergunta.exp,
    gols:              partida.times[time].gols,
    placar: {
      azul:  partida.times.azul.gols,
      verde: partida.times.verde.gols,
    },
    todosResponderam:  todos,
    aguardandoProxima: partida.aguardandoProxima,
    proximaEm:         partida.proximaEm,
    fimDeJogo,
  });
});

// POST /resetar
app.post('/resetar', (req, res) => {
  console.log('🔄 Partida resetada!');
  partida = novaPartida();
  res.json({ ok: true, versao: partida.versao });
});

// ✅ Reset manual de emergência — acesse /admin/reset no navegador
app.get('/admin/reset', (req, res) => {
  console.log('🚨 Reset manual via /admin/reset');
  partida = novaPartida();
  res.send(`
    <html>
      <body style="font-family:sans-serif;text-align:center;padding:40px;background:#021428;color:#fff">
        <h1>✅ Partida resetada!</h1>
        <p style="color:#90caf9">Nova versão: ${partida.versao}</p>
        <a href="/" style="
          display:inline-block;margin-top:20px;padding:12px 28px;
          background:#1565c0;color:#fff;border-radius:50px;
          text-decoration:none;font-weight:700;font-size:1.1em
        ">🎮 Voltar ao jogo</a>
      </body>
    </html>
  `);
});

// ===== START =====
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`\n✅ Servidor Copa da Higiene rodando na porta ${PORT}\n`);
});
