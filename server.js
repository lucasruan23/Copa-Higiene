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

const salas = {};

function criarSala(salaId) {
  salas[salaId] = {
    iniciada: false,
    perguntaIndex: 0,
    perguntas: ALL_Q,
    times: {},
    timesEsperados: [],
  };
}

function getSala(salaId) {
  if (!salas[salaId]) criarSala(salaId);
  return salas[salaId];
}

function registrarJogador(salaId, time, nome) {
  const sala = getSala(salaId);
  if (!sala.times[time]) {
    sala.times[time] = { gols: 0, respondeu: false, jogadores: [] };
    if (!sala.timesEsperados.includes(time)) sala.timesEsperados.push(time);
  }
  if (nome && !sala.times[time].jogadores.includes(nome) && sala.times[time].jogadores.length < 10) {
    sala.times[time].jogadores.push(nome);
  }
}

function todosResponderam(sala) {
  return sala.timesEsperados.length >= 2 &&
         sala.timesEsperados.every(t => sala.times[t].respondeu);
}

function resetarRespostas(sala) {
  sala.timesEsperados.forEach(t => { sala.times[t].respondeu = false; });
}

function podeIniciar(sala) {
  return sala.timesEsperados.includes('azul') && sala.timesEsperados.includes('verde');
}

// Entrar na sala — aceita múltiplos nomes por time
app.get('/entrar', (req, res) => {
  const { sala = '1', time, nome = '' } = req.query;
  if (!time) return res.status(400).json({ erro: 'Informe o time.' });
  registrarJogador(sala, time, nome);
  const s = getSala(sala);
  res.json({
    ok: true,
    sala,
    time,
    timesNaSala: s.timesEsperados,
    jogadoresAzul: s.times['azul']?.jogadores || [],
    jogadoresVerde: s.times['verde']?.jogadores || [],
    podeIniciar: podeIniciar(s),
    iniciada: s.iniciada,
  });
});

// Iniciar
app.post('/iniciar', (req, res) => {
  const { sala = '1' } = req.body;
  const s = getSala(sala);
  if (!podeIniciar(s)) {
    return res.status(400).json({ erro: 'Aguarde os 2 times entrarem na sala.' });
  }
  s.iniciada = true;
  s.perguntaIndex = 0;
  s.timesEsperados.forEach(t => {
    s.times[t].gols = 0;
    s.times[t].respondeu = false;
  });
  res.json({ ok: true });
});

// Estado — inclui todosResponderam para o polling do cliente
app.get('/estado', (req, res) => {
  const { sala = '1', time } = req.query;
  const s = getSala(sala);
  const pergunta = s.perguntas[s.perguntaIndex];

  const perguntaSegura = pergunta ? {
    index: s.perguntaIndex,
    total: s.perguntas.length,
    cat: pergunta.cat,
    q: pergunta.q,
    opts: pergunta.opts,
  } : null;

  const todos = todosResponderam(s);

  res.json({
    iniciada: s.iniciada,
    perguntaIndex: s.perguntaIndex,
    totalPerguntas: s.perguntas.length,
    timesNaSala: s.timesEsperados,
    jogadoresAzul: s.times['azul']?.jogadores || [],
    jogadoresVerde: s.times['verde']?.jogadores || [],
    podeIniciar: podeIniciar(s),
    pergunta: perguntaSegura,
    placar: Object.fromEntries(
      s.timesEsperados.map(t => [t, s.times[t].gols])
    ),
    jaRespondeu: time ? (s.times[time]?.respondeu || false) : false,
    todosResponderam: todos,
    fimDeJogo: s.iniciada && s.perguntaIndex >= s.perguntas.length,
  });
});

// Responder
app.post('/responder', (req, res) => {
  const { sala = '1', time, resposta } = req.body;
  const s = getSala(sala);

  if (!s.iniciada) return res.status(400).json({ erro: 'Partida não iniciada.' });
  if (s.perguntaIndex >= s.perguntas.length) return res.status(400).json({ erro: 'Fim de jogo.' });
  if (!s.times[time]) return res.status(400).json({ erro: 'Time não registrado.' });
  if (s.times[time].respondeu) return res.status(400).json({ erro: 'Já respondeu esta pergunta.' });

  const pergunta = s.perguntas[s.perguntaIndex];
  const acertou = Number(resposta) === pergunta.ans;

  if (acertou) s.times[time].gols++;
  s.times[time].respondeu = true;

  const todos = todosResponderam(s);
  if (todos) {
    s.perguntaIndex++;
    resetarRespostas(s);
  }

  res.json({
    acertou,
    respostaCorreta: pergunta.ans,
    // ✅ Corrigido: envia o texto da opção correta diretamente
    opcaoTexto: pergunta.opts[pergunta.ans],
    explicacao: pergunta.exp,
    gols: s.times[time].gols,
    todosResponderam: todos,
    fimDeJogo: s.perguntaIndex >= s.perguntas.length,
  });
});

// Resetar sala
app.post('/resetar', (req, res) => {
  const { sala = '1' } = req.body;
  const s = getSala(sala);
  const timesAntigos = { ...s.times };
  const timesEsperados = [...s.timesEsperados];
  criarSala(sala);
  timesEsperados.forEach(t => {
    salas[sala].times[t] = { gols: 0, respondeu: false, jogadores: timesAntigos[t]?.jogadores || [] };
    salas[sala].timesEsperados.push(t);
  });
  res.json({ ok: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`\n✅ Servidor rodando na porta ${PORT}\n`);
});
