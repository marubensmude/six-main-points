# Jornada de Descoberta do Imóvel Ideal

**Mude Imóveis · Evolução de UX/UI do sistema Six Main Points**
Proposta de experiência, copy e implementação front-end · Junho/2026

---

## Sumário consultivo

Hoje o Six Main Points funciona e converte, mas a experiência ainda comunica "formulário". Esta proposta transforma o mesmo método — os seis pontos do SMP — em uma **Jornada de Descoberta do Imóvel Ideal**, em que cada ponto vira uma missão curta, visual e consultiva. O cliente deixa de preencher campos e passa a **montar o seu Mapa do Imóvel Ideal**, com a sensação de avanço, recompensa e cuidado que define a marca.

O objetivo é duplo: tornar o preenchimento mais agradável (para aumentar a taxa de conclusão) e gerar um **dossiê final mais premium**, que reforce o posicionamento consultivo da Mude e ajude o corretor a entender, de imediato, as prioridades reais de cada cliente.

Nada do que já existe se perde. A identidade visual (preto, dourado e branco), os seis pontos, o dossiê, as notificações e o rastreamento permanecem. A camada nova é construída **por cima** da base atual, reaproveitando os mesmos tokens e componentes.

> **Acompanha esta proposta** um protótipo navegável (`Jornada-SMP-Prototipo.html`) que demonstra, na prática, as telas, transições e microinterações descritas aqui. Recomenda-se abri-lo lado a lado com a leitura.

---

## 1. Princípios da nova experiência

A jornada inteira se apoia em cinco princípios, nesta ordem de prioridade:

1. **Uma decisão por vez.** Cada tela pede uma coisa. Nunca bombardear o cliente. O ritmo é conduzido, não imposto.
2. **Progresso visível e recompensado.** O cliente sempre sabe onde está, quanto falta e sente que avançou a cada etapa.
3. **Desejo e racionalidade juntos.** A copy desperta emoção; a estrutura organiza a decisão. Os dois lados convivem.
4. **Sofisticação acima de "gamificação".** Nada de cores berrantes, medalhas infantis ou confetes. A recompensa é discreta, dourada, elegante.
5. **Entrega com sensação de presente.** O fim da jornada não é um "obrigado pelo envio" — é a revelação de um dossiê pensado para o cliente.

---

## 2. Nova estrutura de páginas

O fluxo passa a ter seis telas lógicas, todas dentro do mesmo single-file, controladas pelo mesmo mecanismo de `screen.active` que já existe.

| # | Tela | Papel | Substitui / evolui |
|---|------|-------|--------------------|
| 0 | **Abertura emocional** | Acolher e convidar. Frase-âncora + botão único. | A landing atual (`#lp`) ganha headline emocional |
| 1 | **Captura leve** | Nome, WhatsApp e e-mail, com enquadramento consultivo. | O card de captura atual |
| 2 | **Escolha do ritmo** | Modo Rápido (2 min) ou Completo (5 min). | *Novo* |
| 3 | **Jornada das missões** | As seis missões do SMP, uma por vez, com trilha de progresso. | A tela `#app` com os 6 passos |
| 4 | **Tela de conquista** | "Seu Perfil SMP foi construído." Selo + transição ao dossiê. | *Novo* (antecede o sucesso) |
| 5 | **Dossiê SMP** | Perfil nomeado + mapa visual dos seis pontos + CTA. | A tela `#success` / dossiê, enriquecidos |

A tela 3 é a única que troca de conteúdo internamente (missão por missão), preservando a trilha de progresso fixa no topo. Isso evita a sensação de "rolar um formulário gigante".

---

## 3. Copy por etapa

A linguagem segue o padrão consultivo da Mude: títulos que falam de vida e momento, não de campos. Abaixo, os textos sugeridos, prontos para uso.

### Tela 0 — Abertura

> **Eyebrow:** Six Main Points · Diagnóstico SMP
> **Headline:** *Seu imóvel ideal não começa pela busca. Começa pelo entendimento do seu momento.*
> **Apoio:** Em poucos minutos, vamos montar juntos o seu Mapa do Imóvel Ideal — seis descobertas que revelam o que realmente importa para a sua próxima decisão.
> **Botão:** Começar meu diagnóstico SMP
> **Micro-nota:** Leva de 2 a 5 minutos · 100% confidencial

### Tela 1 — Captura

> **Título:** Para quem estamos desenhando este mapa?
> **Apoio:** Assim a Mude Imóveis acompanha você de perto e envia o seu dossiê personalizado.
> **Botão:** Avançar para a jornada
> **Rodapé de confiança:** Seus dados ficam protegidos e são usados apenas pela curadoria da Mude.

### Tela 2 — Ritmo

> **Título:** Escolha o ritmo da sua descoberta
> **Modo Rápido — 2 minutos:** O essencial dos seis pontos. Perfeito para começar a conversa com a Mude hoje mesmo.
> **Modo Completo — 5 minutos:** Uma curadoria mais refinada, com prioridades e detalhes que evitam visitas desnecessárias. *(Recomendado para alto padrão.)*

### As seis missões

Cada missão tem: rótulo do ponto (eyebrow), título consultivo, frase de orientação e o microfeedback exibido ao concluir.

**Missão 1 de 6 — Localização**
- Título: *Onde a sua vida acontece?*
- Orientação: Em quais regiões você se imagina vivendo ou investindo? A localização é o ponto que mais pesa numa boa escolha.
- Microfeedback: **"Localização mapeada."**

**Missão 2 de 6 — Tipologia**
- Título: *Que formato de imóvel combina com o seu próximo momento?*
- Orientação: Não pense em planta ainda. Pense em como você quer viver — o resto a gente refina depois.
- Microfeedback: **"Perfil de imóvel identificado."**

**Missão 3 de 6 — Qualidade**
- Título: *Qual padrão faz sentido para você?*
- Orientação: O padrão certo equilibra o que você valoriza e o investimento que faz sentido nesta decisão.
- Microfeedback: **"Padrão definido."**

**Missão 4 de 6 — Diferenciais**
- Título: *O que transforma um imóvel na escolha certa?*
- Orientação: Selecione o que importa e diga o peso de cada um. Separar desejo de prioridade evita visitas desnecessárias.
- Microfeedback: **"Prioridades refinadas."**

**Missão 5 de 6 — Faixa de Preço**
- Título: *Qual faixa de investimento faz sentido para essa decisão?*
- Orientação: Não existe resposta certa — existe a faixa que conversa com o seu momento.
- Reforço de confidencialidade: *Sua faixa é confidencial e serve só para selecionar bem — nunca para limitar oportunidades.*
- Microfeedback: **"Faixa de investimento definida."**

**Missão 6 de 6 — Forma de Pagamento**
- Título: *Qual caminho de compra faz mais sentido?*
- Orientação: A forma de pagamento abre portas para oportunidades diferentes. Vamos entender a sua.
- Inclui o **prazo de decisão** (urgência): "Quero comprar agora" · "Nos próximos 3 meses" · "Ainda explorando".
- Microfeedback: **"Caminho de compra compreendido."**

### Tela 4 — Conquista

> **Título:** Seu Perfil SMP foi construído.
> **Apoio:** Agora a Mude Imóveis consegue buscar menos imóveis — e melhores imóveis para você.
> **Botão:** Abrir meu dossiê SMP

### Botões da jornada (substituem "Próximo")

Em vez de um único "Próximo →", o rótulo do botão evolui ao longo da jornada, reforçando a sensação de avanço: *Avançar para o próximo ponto → Continuar meu diagnóstico → Refinar meu perfil → Definir minha faixa → Concluir esta missão → **Gerar meu Perfil SMP***.

---

## 4. Microinterações e transições

Esta é a camada que transforma o fluxo em jornada. Todas as animações usam **easing suave entre 260ms e 440ms** — rápidas o bastante para não cansar, lentas o bastante para serem percebidas.

### 4.1 Transição entre telas — fade + slide horizontal
Ao concluir uma etapa, a tela atual sai suavemente para a esquerda (`exitLeft`, ~260ms) enquanto a próxima entra vindo da direita (`enterRight`, ~440ms). Ao voltar, o movimento se inverte. A sensação é de avanço e continuidade — como virar páginas de um mesmo documento.

### 4.2 Entrada sequencial dos elementos
Em cada tela, os elementos aparecem em cascata: primeiro o título, depois a orientação, depois os cards/opções e, por fim, o botão. Cada um sobe alguns pixels com leve fade (delays escalonados de 80–420ms). Isso cria ritmo e evita a sensação de "tela carregada de uma vez".

### 4.3 Resposta imediata dos cards
Ao selecionar uma opção, o card reage com: leve elevação, borda dourada, fundo creme sutil, um **check discreto** que surge com escala (de 0,4 a 1) e uma microanimação de "pop" (escala 1 → 1,05 → 1). Tudo em ~340ms.

### 4.4 Microcelebração ao concluir cada missão
Após validar a missão, surge por ~1 segundo, no centro da tela, um selo dourado com check e uma frase curta (os microfeedbacks da seção 3). O fundo escurece levemente e o texto pulsa uma vez. Em seguida, a próxima missão entra automaticamente. É a recompensa — discreta e elegante.

### 4.5 Trilha de progresso animada
No topo da jornada, uma trilha com seis nós (Local · Tipo · Padrão · Difer. · Faixa · Pgto). O nó atual ganha um **pulso dourado discreto**; os concluídos ficam dourados sólidos; o segmento entre eles se preenche suavemente. Uma barra fina abaixo reforça a porcentagem.

### 4.6 Linguagem de desafio leve
"Missão 1 de 6", "Missão concluída", "Próxima descoberta" — o vocabulário de missão dá leveza e senso de progresso, sem nunca soltar a sofisticação consultiva.

### 4.7 Selo de conquista
Antes do dossiê, um selo circular com anel girando lentamente e check ao centro marca o momento de virada — a transição do "diagnóstico" para a "entrega".

### Resumo técnico das animações

| Interação | Duração | Easing |
|-----------|---------|--------|
| Saída de tela (`exitLeft/Right`) | 260ms | `cubic-bezier(.22,.61,.36,1)` |
| Entrada de tela (`enterRight/Left`) | 440ms | `cubic-bezier(.22,.61,.36,1)` |
| Reveal sequencial de elementos | 440ms (delays 80–420ms) | mesmo |
| Seleção de card ("pop") | 340ms | mesmo |
| Microcelebração | ~1000ms total | ease |
| Pulso do nó atual | 1,8s em loop | ease-in-out |

---

## 5. Componentes visuais

Todos reaproveitam os tokens já definidos no `:root` do `index.html` (cores, fontes, raios). Nenhuma cor nova é introduzida.

- **Cards de opção** — ícones de traço fino (1,4px) em dourado, título e micro-descrição. Substituem listas longas por escolhas visuais.
- **Chips** — para seleções múltiplas leves (bairros, proximidades, prazo de decisão). Selecionados ficam pretos com texto claro.
- **Sistema de prioridade dos diferenciais** — ao selecionar um diferencial, aparecem três botões: **Essencial** (dourado escuro), **Importante** (dourado), **Desejável** (dourado claro). É a chave que ajuda o corretor a separar desejo de necessidade.
- **Slider de faixa de preço** — valor grande em serifa, thumb preto com anel dourado, e a faixa de confidencialidade reforçada logo abaixo.
- **Campo livre** — em toda missão, um "Quer acrescentar algo?" captura o que as opções não cobrem (vai para o dossiê e para a notificação).
- **Trilha + barra de progresso** — descritas em 4.5.
- **Card de dossiê** — descrito na seção 7.

### Sistema de prioridade — referência rápida

| Nível | Significado | Cor |
|-------|-------------|-----|
| Essencial | Sem isso, não faz sentido | Dourado escuro `--gold-dark` |
| Importante | Pesa muito na decisão | Dourado `--gold` |
| Desejável | Seria ótimo, mas não impede | Dourado claro |

---

## 6. Dois modos de preenchimento

A tela de ritmo oferece dois caminhos pela mesma jornada:

- **Modo Rápido (≈2 min):** as seis missões com as opções essenciais e sem o detalhamento da prioridade (todo diferencial entra como "Importante"). Ideal para mídia paga e clientes frios.
- **Modo Completo (≈5 min):** a jornada plena, com priorização dos diferenciais e campos livres. Recomendado para alto padrão.

Ambos geram um Perfil SMP e um dossiê — o que muda é a profundidade. Tecnicamente, é a mesma sequência de missões; o modo apenas alterna quais blocos de detalhe são exibidos.

---

## 7. Perfil SMP e dossiê premium

### 7.1 O Perfil SMP
Ao final, o sistema interpreta as respostas e atribui um **nome consultivo** ao cliente, com um parágrafo que traduz o seu momento. A lógica sugerida:

| Condição predominante | Perfil |
|-----------------------|--------|
| Alto padrão **ou** faixa ≥ R$ 2 mi | Comprador Estratégico de Alto Padrão |
| Foco em renda / imóvel comercial | Investidor Patrimonial |
| Urgência "ainda explorando" | Comprador em Fase de Descoberta |
| Casa / condomínio para morar | Família em Busca de Conforto e Localização |
| Demais casos | Comprador Consciente |

O nome não é um rótulo fechado — é um espelho que faz o cliente sentir que foi compreendido, e dá ao corretor uma leitura imediata de como conduzir o atendimento.

### 7.2 O dossiê
O dossiê final deixa de ser um resumo e passa a ter **cara de entrega premium**:

- Cabeçalho com o nome do Perfil SMP em serifa itálica e o parágrafo consultivo.
- Grade dos seis pontos com numeração SMP (1 a 6), cada bloco limpo e bem espaçado.
- Os **diferenciais aparecem ordenados por prioridade**, com etiquetas coloridas (Essencial / Importante / Desejável).
- O **nível de urgência** entra junto à forma de pagamento.
- Rodapé com fechamento consultivo, assinatura institucional e o slogan "Mude que a Gente te Acompanha".
- Faixa preto-dourado-preto no topo, mantendo a identidade.

A geração do PDF (jsPDF + html2canvas já presentes) e o envio (Apps Script + EmailJS + Supabase) **não mudam** — apenas recebem os novos campos (perfil, prioridades, urgência) quando existirem.

---

## 8. Implementação em front-end (HTML/CSS/JS puro)

A integração ao `index.html` atual é incremental e de baixo risco. Abaixo, o caminho objetivo.

### 8.1 Reaproveitar o que já existe
- **Tokens:** todas as variáveis em `:root` (`--gold`, `--ink`, `--bg`, fontes, raios) permanecem. A proposta só adiciona variáveis de *easing/duração*:
  ```css
  :root{
    --ease:cubic-bezier(.22,.61,.36,1);
    --t-fast:260ms; --t-mid:380ms; --t-slow:440ms;
  }
  ```
- **Mecanismo de telas:** a função `showScreen(id)` atual ganha a camada de transição (fade+slide):
  ```js
  function showScreen(id){
    const cur=document.querySelector('.screen.active');
    if(!cur){document.getElementById(id).classList.add('active');return;}
    cur.classList.add('exit-left');
    setTimeout(()=>{
      cur.className='screen';
      const nx=document.getElementById(id);
      nx.classList.add('active','enter-right');
      setTimeout(()=>nx.classList.remove('enter-right'),440);
    },260);
  }
  ```
- **Navegação dos passos:** `goToStep(n)` e `nextStep()` continuam orquestrando, agora chamando a microcelebração e a transição interna da missão (ver protótipo: `completeMission`, `transitionMission`).

### 8.2 Adicionar as classes de animação
Copiar do protótipo os keyframes `enterRight/exitLeft/enterLeft/exitRight`, `revealUp`, `popSel`, o pulso do nó (`pulse`) e os estilos `.reveal.d1…d4`. São puramente CSS, não conflitam com o existing.

### 8.3 Trocar os passos por "missões"
Os seis `.step-content` atuais já têm o conteúdo certo. As mudanças são:
1. Renomear o `step-eyebrow` para o formato "Missão X de 6 — Ponto".
2. Atualizar `#step-counter` para "Missão 1 de 6".
3. Trocar os títulos pelos textos da seção 3.
4. Inserir a **trilha de seis nós** acima da barra de progresso (markup em `.trail` do protótipo).
5. Em Diferenciais, adicionar os três botões de prioridade dentro de cada card selecionado.

### 8.4 Microcelebração
Adicionar o overlay `#celebrate` (uma vez, no fim do `body`) e chamar `celebrate(texto, callback)` dentro de `nextStep()` antes de avançar. O callback dispara `goToStep(n+1)`.

### 8.5 Acessibilidade — `prefers-reduced-motion`
Incluir o bloco abaixo. Ele zera as animações para quem prefere menos movimento, mantendo a navegação intacta:
```css
@media (prefers-reduced-motion:reduce){
  *,*::before,*::after{
    animation-duration:.001ms!important; animation-iteration-count:1!important;
    transition-duration:.001ms!important;
  }
  .reveal{opacity:1;transform:none}
  .node.current .dot{animation:none}
}
```
A microcelebração detecta a preferência via `matchMedia` e encurta a exibição.

### 8.6 Ordem de risco
Tudo acima é aditivo: mesmo que uma etapa não seja aplicada, o sistema continua funcional. As funções de envio (`sbSaveLead`, EmailJS, Apps Script) não são tocadas.

---

## 9. Roadmap sugerido (fases publicáveis)

Cada fase é testável e pode ir ao ar de forma independente — o site nunca fica quebrado.

1. **Fase 1 — Camada de movimento.** Transições de tela, reveal sequencial e resposta dos cards. Ganho imediato de percepção, risco mínimo.
2. **Fase 2 — Trilha + microcelebrações.** Trilha de nós animada e as frases de conquista por missão.
3. **Fase 3 — Copy de jornada.** Trocar títulos e rótulos de botão pelos textos consultivos; renomear passos como "missões".
4. **Fase 4 — Prioridade dos diferenciais + dois modos.** Sistema Essencial/Importante/Desejável e a tela de ritmo.
5. **Fase 5 — Conquista + dossiê premium.** Tela de conquista, Perfil SMP nomeado e o novo layout do dossiê.

Sugestão: validar cada fase em `?debug=1` e publicar no GitHub a cada etapa concluída.

---

## 10. Conclusão consultiva

A força do Six Main Points sempre foi o método. O que esta proposta faz é dar a esse método uma **experiência à altura do posicionamento da Mude**: em vez de um formulário que o cliente tolera, uma jornada que ele aprecia — e que termina com um dossiê que parece um presente, não um recibo.

O caminho mais inteligente é começar pela camada de movimento (Fase 1), que entrega o maior salto de percepção com o menor risco, e avançar até o dossiê premium, que é onde a sensação de entrega de alto padrão se consolida. A recomendação é tratar a gamificação sempre como ela aparece aqui: discreta, dourada e a serviço da clareza — nunca como espetáculo.

O resultado esperado é um sistema que conclui mais, comunica melhor e, sobretudo, faz cada cliente sentir que está sendo atendido por uma empresa preparada, cuidadosa e diferenciada.

---

*Mude Imóveis — Mude que a Gente te Acompanha.*
