const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const ALL_Q = [
  {cat:"⚽ Aquecimento",q:"A OMS recomenda que as mãos sejam higienizadas por pelo menos quanto tempo com água e sabão?",opts:["5 segundos","20 segundos","1 minuto","5 minutos"],ans:1,exp:"A OMS recomenda pelo menos 20 segundos — tempo de cantar Parabéns duas vezes."},
  {cat:"🏟️ Grandes Eventos",q:"Qual é a forma mais eficaz de eliminar vírus como o Norovírus nas mãos?",opts:["Álcool gel 70%","Somente enxaguar com água","Lavar com água e sabão","Usar luvas cirúrgicas"],ans:2,exp:"Para Norovírus, água e sabão é mais eficaz que álcool gel."},
  {cat:"🧤 Equipamentos",q:"Qual concentração de álcool gel é padrão‑ouro para antissepsia das mãos?",opts:["46%","50%","70%","95%"],ans:2,exp:"Álcool gel a 70% é o padrão recomendado pela ANVISA e OMS."},
  {cat:"🌍 Mundial",q:"A lavagem correta das mãos pode reduzir em quanto os casos de diarreia em crianças?",opts:["Cerca de 10%","Cerca de 25%","Cerca de 48%","Apenas 5%"],ans:2,exp:"Estudos indicam redução de até 48% dos casos de diarreia em crianças."},
  {cat:"🥅 Os 5 Momentos",q:"Qual opção NÃO faz parte dos 5 Momentos para Higiene das Mãos da OMS?",opts:["Antes de tocar o paciente","Após contato com superfícies próximas ao paciente","Ao entrar no corredor do hospital","Antes de realizar procedimento asséptico"],ans:2,exp:"Entrar no corredor não é um dos 5 Momentos da OMS."},
  {cat:"⏱️ Técnica",q:"Na técnica correta de lavagem das mãos da OMS, quantas etapas são recomendadas?",opts:["3 etapas","5 etapas","7 etapas","11 etapas"],ans:2,exp:"São 7 passos: palmas, dorso, entre dedos, dedos em gancho, polegares, pontas dos dedos e punhos."},
  {cat:"🏆 Regulação",q:"No Brasil, qual órgão publica normas sobre higienização das mãos em serviços de saúde?",opts:["SUS","ANVISA","Ministério do Esporte","INMETRO"],ans:1,exp:"A ANVISA é o órgão regulador responsável por essas normas."},
  {cat:"🧪 Ciência",q:"Qual patógeno hospitalar tem transmissão fortemente reduzida com higiene das mãos?",opts:["MRSA","Vírus da gripe sazonal","Toxoplasma gondii","Plasmodium falciparum"],ans:0,exp:"O MRSA é frequentemente transmitido pelas mãos dos profissionais de saúde."},
  {cat:"📋 Regras",q:"O que os profissionais de saúde devem evitar para garantir boa higiene das mãos?",opts:["Uniforme de manga curta","Anéis, pulseiras e unhas com esmalte ou alongamento","Tênis fechado","Cabelo preso"],ans:1,exp:"Anéis, pulseiras e unhas artificiais favorecem acúmulo de microrganismos."},
  {cat:"🎯 Pênalti Final",q:"Qual é a forma correta de secar as mãos após a lavagem?",opts:["Papel toalha descartável, secando completamente","Sacudir as mãos no ar","Secar na roupa","Deixar secar ao natural"],ans:0,exp:"Mãos úmidas transmitem muito mais microrganismos; secar bem é essencial."},
  {cat:"🧴 Álcool Gel",q:"Em qual situação o álcool gel é suficiente para higiene das mãos em área hospitalar?",opts:["Sempre, mesmo sujas de sangue","Quando as mãos não estão visivelmente sujas","Somente após usar o banheiro","Nunca, sempre água e sabão"],ans:1,exp:"Sem sujidade visível, álcool a 70% é eficaz e recomendado."},
  {cat:"🚿 Água e Sabão",q:"Quando a preferência é lavar com água e sabão, mesmo havendo álcool gel?",opts:["Após usar o banheiro","Ao entrar no hospital","Ao sair para o almoço","Sempre que lembrar"],ans:0,exp:"Após o banheiro e com mãos visivelmente sujas, prioriza-se água e sabão."},
  {cat:"👶 Pediatria",q:"Em unidades pediátricas, a higiene das mãos ajuda principalmente a prevenir:",opts:["Quedas","Infecções respiratórias e gastrointestinais","Reações a medicamentos","Desidratação"],ans:1,exp:"As mãos são via importante de transmissão de vírus respiratórios e entéricos."},
  {cat:"💉 Procedimentos",q:"Antes de realizar punção venosa ou injeções, qual ação é obrigatória?",opts:["Vestir jaleco","Higienizar as mãos","Colocar touca","Medir pressão arterial"],ans:1,exp:"Antes de qualquer procedimento asséptico, é obrigatório higienizar as mãos."},
  {cat:"🧪 Fluidos",q:"Após risco de exposição a sangue ou fluidos corporais, o que fazer?",opts:["Trocar de luvas apenas","Limpar a área com gaze","Higienizar as mãos imediatamente","Esperar o fim do plantão"],ans:2,exp:"A higienização das mãos deve ser imediata após risco de exposição."},
  {cat:"🏥 Superfícies",q:"Após tocar grades de leito e estetoscópios de um paciente, qual momento da OMS se aplica?",opts:["Antes de procedimento asséptico","Após contato com superfícies próximas ao paciente","Após risco de exposição a fluidos","Antes de tocar o paciente"],ans:1,exp:"É o quinto momento: após contato com superfícies próximas ao paciente."},
  {cat:"👋 Unhas",q:"Qual característica de unhas é recomendada para quem presta assistência direta?",opts:["Unhas curtas, sem esmalte ou alongamento","Unhas grandes com esmalte claro","Unhas médias com base incolor","Unhas postiças bem lixadas"],ans:0,exp:"Unhas curtas e sem esmalte facilitam a higienização completa."},
  {cat:"🧼 Técnica",q:"Qual parte das mãos costuma ser mais esquecida na higienização?",opts:["Palmas","Punhos","Entre os dedos e polegares","Dorso das mãos"],ans:2,exp:"Espaços interdigitais e polegares são frequentemente esquecidos."},
  {cat:"🌡️ Surtos",q:"Durante surtos de doenças respiratórias, a higiene das mãos deve ser:",opts:["Mantida igual","Reduzida para poupar tempo","Intensificada em todos os momentos indicados","Feita apenas com luvas"],ans:2,exp:"Durante surtos, a adesão aos 5 Momentos precisa ser reforçada."},
  {cat:"👨‍👩‍👧 Público Geral",q:"Em escolas e eventos esportivos, incentivar a higiene das mãos impacta principalmente:",opts:["Notas escolares","Transmissão de infecções","Conforto térmico","Desempenho físico"],ans:1,exp:"Menos infecções significam menos faltas e menor transmissão entre participantes."}
];

// ===== PARTIDA GLOBAL — sem salas =====
function novaPartida() {
  return {
    iniciada: false,
    perguntaIndex: 0,
    perguntas: ALL_Q,
    times: {
      azul:  { gols: 0, respondeu: false, jogadores: [] },
      verde: { gols: 0, respondeu: false, jogadores: [] }
    },
    versao: Date.now() // ✅ versão única para detectar reset
  };
}

let partida = novaPartida();

function todosResponderam() {
  return partida.times.azul.respondeu && partida.times.verde.respondeu;
}

function resetarRespostas() {
  partida.times.azul.respondeu = false;
  partida.times.verde.respondeu = false;
}

function podeIniciar() {
  return partida.times.azul.jogadores.length > 0 &&
         partida.times.verde.jogadores.length > 0;
}

// ===== ROTAS =====

// Registrar jogadores de UM time
// POST /registrar  { time: "azul", jogadores: ["Lucas","Pedro"] }
app.post('/registrar', (req, res) => {
  const { time, jogadores = [] } = req.body;
  if (!['azul','verde'].includes(time))
    return res.status(400).json({ erro: 'Time inválido.' });
  if (!Array.isArray(jogadores) || jogadores.length === 0)
    return res.status(400).json({ erro: 'Informe ao menos 1 jogador.' });

  // ✅ Substitui a lista do time (não acumula de partidas anteriores)
  partida.times[time].jogadores = jogadores.slice(0, 10);

  res.json({
    ok: true,
    versao: partida.versao,
    podeIniciar: podeIniciar(),
    jogadoresAzul: partida.times.azul.jogadores,
    jogadoresVerde: partida.times.verde.jogadores,
    iniciada: partida.iniciada,
  });
});

// Estado — polling do cliente
app.get('/estado', (req, res) => {
  const { time = 'azul' } = req.query;
  const pergunta = partida.perguntas[partida.perguntaIndex];

  const perguntaSegura = pergunta ? {
    index: partida.perguntaIndex,
    total: partida.perguntas.length,
    cat: pergunta.cat,
    q: pergunta.q,
    opts: pergunta.opts,
  } : null;

  res.json({
    versao: partida.versao,
    iniciada: partida.iniciada,
    perguntaIndex: partida.perguntaIndex,
    totalPerguntas: partida.perguntas.length,
    jogadoresAzul: partida.times.azul.jogadores,
    jogadoresVerde: partida.times.verde.jogadores,
    podeIniciar: podeIniciar(),
    pergunta: perguntaSegura,
    placar: {
      azul: partida.times.azul.gols,
      verde: partida.times.verde.gols,
    },
    jaRespondeu: partida.times[time]?.respondeu || false,
    todosResponderam: todosResponderam(),
    fimDeJogo: partida.iniciada && partida.perguntaIndex >= partida.perguntas.length,
  });
});

// Iniciar partida
app.post('/iniciar', (req, res) => {
  if (!podeIniciar())
    return res.status(400).json({ erro: 'Os 2 times precisam ter jogadores.' });

  partida.iniciada = true;
  partida.perguntaIndex = 0;
  partida.times.azul.gols = 0;
  partida.times.azul.respondeu = false;
  partida.times.verde.gols = 0;
  partida.times.verde.respondeu = false;

  res.json({ ok: true, versao: partida.versao });
});

// Responder
app.post('/responder', (req, res) => {
  const { time, resposta } = req.body;

  if (!partida.iniciada)
    return res.status(400).json({ erro: 'Partida não iniciada.' });
  if (partida.perguntaIndex >= partida.perguntas.length)
    return res.status(400).json({ erro: 'Fim de jogo.' });
  if (!['azul','verde'].includes(time))
    return res.status(400).json({ erro: 'Time inválido.' });
  if (partida.times[time].respondeu)
    return res.status(400).json({ erro: 'Já respondeu esta pergunta.' });

  const pergunta = partida.perguntas[partida.perguntaIndex];
  const acertou = Number(resposta) === pergunta.ans;

  if (acertou) partida.times[time].gols++;
  partida.times[time].respondeu = true;

  const todos = todosResponderam();
  if (todos) {
    partida.perguntaIndex++;
    resetarRespostas();
  }

  res.json({
    acertou,
    respostaCorreta: pergunta.ans,
    opcaoTexto: pergunta.opts[pergunta.ans],
    explicacao: pergunta.exp,
    gols: partida.times[time].gols,
    todosResponderam: todos,
    fimDeJogo: partida.perguntaIndex >= partida.perguntas.length,
  });
});

// ✅ Resetar TUDO — nova partida do zero
app.post('/resetar', (req, res) => {
  partida = novaPartida();
  res.json({ ok: true, versao: partida.versao });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`\n✅ Servidor rodando na porta ${PORT}\n`);
});
