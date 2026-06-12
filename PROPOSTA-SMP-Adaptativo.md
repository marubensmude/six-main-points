# Proposta — Six Main Points Adaptativo

**Mude Imóveis · Evolução do formulário de perfil de compra**
Documento de proposta para aprovação · Junho/2026

---

## 1. O que estamos resolvendo

Hoje o Six Main Points faz as mesmas perguntas para qualquer imóvel. Quem busca um apartamento responde sobre "quintal"; quem sonha com uma fazenda não encontra campos para hectares, pasto ou curral. O formulário é inteligente na forma, mas genérico no conteúdo.

A proposta transforma o Six Main Points num **questionário consultivo e adaptativo**: ao identificar o tipo de imóvel, o sistema personaliza tipologia, qualidade e diferenciais para aquela realidade — conduzindo o cliente a se expressar melhor e permitindo que a Mude entenda com precisão o que ele realmente deseja.

A ideia central permanece o Six Main Points. O que muda é que ele passa a ter **seis pontos sob medida para cada tipo de imóvel**.

---

## 2. Garantia: nada do que já construímos se perde

Esta é a premissa do projeto. Tudo abaixo permanece **exatamente como está**:

- **Identidade visual** — paleta preto/dourado/branco, tipografia, cards, chips, contadores, sliders e toda a estética premium.
- **Os seis passos do SMP** — Localização, Tipologia, Qualidade, Diferenciais, Preço e Pagamento.
- **O Dossiê em PDF** e a tela de sucesso com preview.
- **As notificações** — Google Apps Script (com PDF anexado), backup EmailJS e fila local de segurança.
- **Rastreamento e dados** — Meta Pixel, GA4, atribuição de UTMs, Supabase e armazenamento local.
- **Domínio e publicação** — smp.imoveismude.com.br via GitHub Pages.

A personalização é construída **por cima** dessa base, reutilizando os mesmos componentes visuais. Não há redesenho: há inteligência.

---

## 3. Como funciona (arquitetura, em linguagem simples)

Hoje as opções de cada passo estão "escritas à mão" no HTML. Vamos substituí-las por um **catálogo inteligente** — uma estrutura central que descreve, para cada tipo de imóvel, quais campos, qualidades e diferenciais fazem sentido.

Quando o cliente escolhe o tipo de imóvel, o sistema **monta na hora** as opções daquele tipo, usando os mesmos cards e o mesmo layout de sempre. Para o cliente, a experiência é fluida e bonita como já é. Para a Mude, cada resposta passa a ser muito mais precisa.

Vantagens:

- **Manutenção fácil** — incluir um novo diferencial ou tipo no futuro é editar uma lista, não reprogramar telas.
- **Zero retrabalho visual** — o motor reaproveita os componentes existentes.
- **Compatível com o Dossiê** — os dados continuam sendo coletados no mesmo formato; o PDF apenas ganha os novos campos quando existirem.

---

## 4. Famílias e subtipos

A primeira tela da Tipologia passa a apresentar **quatro famílias**. Ao escolher uma, abrem-se os subtipos correspondentes — navegação limpa, em dois níveis.

| Família | Subtipos |
|---|---|
| 🏠 **Residencial** | Casa em condomínio · Casa de rua · Apartamento · Cobertura |
| 🌾 **Rural** | Chácara · Sítio · **Fazenda** *(novo)* · **Pesqueiro** *(novo — propriedade à beira de rio, perfil de pesca esportiva)* |
| 🏬 **Comercial** | Sala / Ponto comercial · Galpão / Barracão · Prédio / Loja |
| 📐 **Terreno** | Lote em condomínio · Terreno urbano · Área / Gleba rural |

E, acima das famílias, a opção **🤔 "Ainda não sei"**, que abre a mini-descoberta guiada (seção 6).

> Os subtipos marcados são uma sugestão. Você pode adicionar, remover ou renomear qualquer um — basta indicar.

---

## 5. Os Seis Pontos, personalizados por tipo

Abaixo, o conteúdo proposto para os passos que mudam por tipo (**Tipologia / Qualidade / Diferenciais**). Os passos **Localização**, **Preço** e **Pagamento** permanecem iguais para todos.

> **Campo livre em todas as etapas:** cada passo terá sempre um campo aberto ("Quer acrescentar algo?") para o cliente escrever livremente — capturando desejos que as opções não cobrem. Esse texto vai para o Dossiê e para a notificação da Mude.

### 5.1 Residencial

**Casa (condomínio ou de rua)**
- *Tipologia (campos):* Quartos · Suítes · Vagas · Área construída (m²) · Área do terreno (m²) · Pavimentos (térrea / sobrado)
- *Qualidade:* Padrão (MCMV · Médio · Alto · Luxo · Ultra luxo) · Estado (novo/planta · em construção · seminovo · para reformar)
- *Diferenciais:* Piscina · Churrasqueira · Área gourmet · Quintal · Quintal grande · Home office · Energia solar/fotovoltaica · Automação/Smart · Pet friendly · Depósito · Varanda · (condomínio) Segurança 24h · Portaria · Lazer completo · Quadra · Salão de festas · Playground

**Apartamento / Cobertura**
- *Tipologia (campos):* Quartos · Suítes · Vagas · Área privativa (m²) · Andar (baixo / intermediário / alto / cobertura) · Elevador (sim/não) · Posição solar
- *Qualidade:* Padrão (Médio · Alto · Luxo · Ultra luxo) · Estado (novo/planta · em construção · seminovo · para reformar)
- *Diferenciais:* Varanda gourmet · Vista livre · Andar alto · Piscina · Academia · Salão de festas · Portaria 24h · Vaga coberta · Pet friendly · Espaço kids · (cobertura) Terraço / área externa privativa

### 5.2 Rural

**Chácara**
- *Tipologia (campos):* Área total (m² ou hectares) · Casa-sede (sim/não) · Quartos da sede · Pomar · Água (poço / nascente / rede)
- *Qualidade:* Padrão da sede (simples · médio · alto) · Estado de conservação · Pronta para uso / precisa benfeitorias
- *Diferenciais:* Piscina · Área gourmet/lazer · Campo / gramado · Pomar · Poço artesiano · Nascente · Açude/lago · Energia (rede/solar/gerador) · Casa de caseiro · Pet friendly

**Sítio**
- *Tipologia (campos):* Área (hectares) · Casa-sede · Benfeitorias · Aptidão (lazer / produção / mista) · Água (poço · nascente · açude · rio)
- *Qualidade:* Padrão da sede · Estado das benfeitorias · Produtividade da terra
- *Diferenciais:* Pasto formado · Curral · Casa de caseiro · Galpão · Pomar/horta · Açude · Energia · Reserva de mata · Acesso por estrada boa

**Fazenda** *(novo)*
- *Tipologia (campos):* Área (hectares / alqueires) · Aptidão (pecuária · agricultura · mista) · Pasto formado (hectares) · Capacidade (cabeças) · Casa-sede · Documentação (CAR · georreferenciamento)
- *Qualidade:* Nível de formação (bruta · parcialmente formada · formada) · Padrão das benfeitorias · Topografia / mecanização
- *Diferenciais:* Curral / brete / balança · Casa-sede · Casa de funcionários · Galpões / barracões · Silos · Açudes / rios / poços · Energia trifásica · Pista de pouso · Confinamento · Reserva legal regularizada · Pivôs de irrigação

**Pesqueiro** *(novo — propriedade à beira de rio, perfil de pesca esportiva)*
- *Tipologia (campos):* Área total (m² / hectares) · Metros de frente para o rio/água · Casa-sede / sede de apoio · Quartos para hóspedes · Tipo de água (rio · lago · açude · represa)
- *Qualidade:* Padrão das estruturas · Estado de conservação · Pronto para operar / lazer particular
- *Diferenciais:* Frente para rio navegável · Píer / atracadouro · Rampa para barco · Quiosques / ranchos · Área gourmet · Tanques de peixes · Camping / chalés · Energia · Acesso por estrada boa

### 5.3 Comercial

**Sala / Ponto comercial · Prédio / Loja**
- *Tipologia (campos):* Área (m²) · Pavimento / andar · Vagas · Banheiros · Vitrine / fachada · Mezanino (sim/não)
- *Qualidade:* Padrão construtivo · Estado · Adequação (pronto para operar / precisa adequação)
- *Diferenciais:* Localização de fluxo · Estacionamento · Fachada/vitrine ampla · Acessibilidade · Ar-condicionado central · Gerador · Sistema de segurança

**Galpão / Barracão**
- *Tipologia (campos):* Área (m²) · Pé-direito (altura) · Docas · Pátio de manobra · Escritórios · Energia trifásica
- *Qualidade:* Padrão construtivo · Estado · Adequação logística/industrial
- *Diferenciais:* Pé-direito alto · Docas niveladas · Pátio amplo · Ponte rolante · Energia trifásica/alta tensão · Refeitório/vestiários · Fácil acesso a rodovia

### 5.4 Terreno

**Lote em condomínio · Terreno urbano**
- *Tipologia (campos):* Área (m²) · Frente (metros) · Topografia (plano · aclive · declive) · Posição (meio / esquina) · Murado (sim/não)
- *Qualidade:* Infraestrutura pronta (água · energia · esgoto · asfalto) · Situação (limpo · com projeto aprovado · pronto para construir)
- *Diferenciais:* Topografia plana · Esquina · Murado · Infra completa · Documentação regular · Aceita financiamento · (condomínio) Lazer e segurança do condomínio

**Área / Gleba rural**
- *Tipologia (campos):* Área (hectares) · Topografia · Acesso (estrada) · Água · Aptidão
- *Qualidade:* Situação documental · Mecanização · Formação
- *Diferenciais:* Água abundante · Topografia mecanizável · Frente para estrada/rodovia · Energia próxima · Reserva regularizada

---

### 5.5 Localização ampliada (cidade / distrito / estado) e novo mapa

Dois aprimoramentos no Ponto 1 (Localização), pedidos após a aprovação:

- **Cidade, distrito e estado.** O cliente poderá indicar o município, distrito e UF desejados — com **Dourados-MS como padrão**, mas totalmente editável. Para imóveis **rurais**, esse campo ganha destaque, já que a propriedade pode estar em outro município ou estado. Os bairros/regiões de Dourados continuam disponíveis quando a cidade for Dourados.
- **Mapa híbrido (satélite + nomes).** O mapa atual (claro e pouco legível) será substituído por um mapa de **satélite com rótulos de ruas, bairros e cidades** — muito mais nítido e detalhado, ideal tanto para imóveis urbanos quanto rurais (mostra rios, mata e divisas). Gratuito, sem chave de API. O mapa passa a **centralizar automaticamente na cidade escolhida** pelo cliente, não apenas em Dourados.

## 6. Caminho "Ainda não sei" — mini-descoberta guiada

Quando o cliente não sabe o que procura, em vez de travar, conduzimos com leveza. Três perguntas de estilo de vida, uma de cada vez, no mesmo visual de cards:

1. **"Quando você imagina seu dia a dia, você se vê em…"**
   → Uma casa com espaço e quintal · Um apartamento prático e seguro · Em contato com a natureza, no campo · Um espaço para um negócio

2. **"Esse imóvel é mais para…"**
   → Morar · Investir / gerar renda · Os dois

3. **"Você prefere…"**
   → Movimento e conveniência urbana · Tranquilidade e privacidade · Tanto faz

Com base nas respostas, o sistema **sugere uma ou duas famílias/subtipos** ("Pelo que você descreveu, acreditamos que uma *casa em condomínio* ou um *apartamento de alto padrão* fariam sentido para você") e segue com o Six Main Points já personalizado. O cliente sempre pode dizer "quero ver todas as opções".

Isso transforma o ponto de maior abandono — a indecisão — num momento de **acolhimento consultivo**, exatamente o posicionamento da Mude.

---

## 7. O Dossiê e as notificações se adaptam

O Dossiê em PDF passa a refletir o tipo escolhido: uma fazenda mostra hectares, aptidão e benfeitorias; um apartamento mostra andar e lazer. Os campos novos aparecem **apenas quando existem** — nada de seções vazias. O cabeçalho, a estética e a entrega (e-mail com PDF anexado) continuam idênticos.

As notificações para a Mude ganham automaticamente esses novos campos, sem nenhuma mudança no fluxo de envio.

---

## 8. Plano de implementação (em fases, com publicação a cada etapa)

Cada fase é testável e publicada de forma independente — o site nunca fica no ar quebrado.

- **Fase 1 — Motor adaptativo.** Criar o catálogo e o mecanismo que monta as opções por tipo, reaproveitando os componentes atuais. Reorganizar a Tipologia em famílias → subtipos e **incluir a Fazenda**.
- **Fase 2 — Conteúdo por tipo.** Aplicar as listas de tipologia, qualidade e diferenciais de cada subtipo (seção 5) e os campos próprios (hectares, andar, pé-direito, etc.).
- **Fase 3 — Mini-descoberta.** Implementar o caminho "Ainda não sei" (seção 6).
- **Fase 4 — Dossiê adaptativo.** Ajustar o PDF e a tela de sucesso para exibir os novos campos de forma condicional.
- **Fase 5 — Testes e publicação.** Validar cada tipo com `?debug=1`, conferir Dossiê e notificação, e publicar no GitHub.

---

## 9. Pontos para a sua aprovação

Antes de começar, preciso do seu aval em quatro pontos:

1. **Famílias e subtipos** (seção 4) — a lista está boa? Quer incluir/retirar algum subtipo?
2. **Conteúdo por tipo** (seção 5) — as opções de tipologia, qualidade e diferenciais refletem a realidade do mercado de Dourados? O que ajustar?
3. **Mini-descoberta** (seção 6) — as três perguntas e o tom estão adequados?
4. **Ordem das fases** (seção 8) — concorda em começar pela Fase 1?

Com o seu retorno nesses pontos, inicio a implementação pela Fase 1 — sempre preservando tudo o que já está funcionando.

---

*Mude Imóveis — Mude que a Gente te Acompanha.*
