# SteamHarbor — Guia de marca

**Edição 1.0 · 9 de setembro de 2026 · Manual oficial de uso e produção**  
Base: [estratégia](branding.md), [aprovação](approvals.md) e [manifesto de arquivos](assets-manifest.json).

## 1. Como usar este guia

Há três níveis de autoridade: **aprovado** identifica decisões explícitas do proprietário; **regra de preservação** protege essas decisões; **especificação técnica inicial** traduz a direção em valores verificáveis e pode exigir ajuste na prova de produção. Não apresentar especificações novas como se cada valor tivesse sido aprovado visualmente pelo proprietário.

A logo definitiva é a v02 com contêineres. A prancha PNG aprovada é a referência visual exata, não um pacote de vetores, fontes ou assets transparentes. O rodapé “aguardando aprovação” dentro da prancha pertence ao momento da apresentação; o registro posterior confirma a aprovação. Não editar o arquivo para remover esse texto.

## 2. Assinatura e invariantes

![Referência visual aprovada](approved/v02/steamharbor-v02-approved-board.png)

Preservar cais em ferradura aberto à frente, barco a vapor central, contêineres azul-petróleo e terracota no cais posterior, direcionais/botões claros, água em tons de teal e nome SteamHarbor com o caráter tipográfico mostrado. Preservar relação de escala, perspectiva e hierarquia: porto e barco primeiro, carga gamer depois.

Não recolocar a casinha. Não introduzir farol, controle como contorno, âncora, mascote ou símbolo oficial da Steam. Não alterar peças, proporções ou cores do arquivo aprovado para acomodar uma composição sem apresentar uma revisão.

## 3. Versões e situação dos arquivos

| Versão | Uso previsto | Situação |
|---|---|---|
| Composição principal colorida com nome abaixo | Marca institucional em espaço generoso | Aprovada visualmente na prancha; export isolado pendente |
| Composição horizontal colorida sobre petróleo | Cabeçalho e assinaturas largas | Referência aprovada na prancha; export e redução pendentes |
| Composição monocromática | Reprodução em uma tinta | Referência visual aprovada; matriz consistente pendente |
| Símbolo colorido isolado | Avatar e aplicações acompanhadas de contexto | Referência aprovada; transparência e tamanhos pendentes |
| Favicon/microícone | 16–32 px e contextos mínimos | Não produzido ou aprovado; não reduzir a prancha inteira |
| Porto detalhado | Ilustrações editoriais e referência do tema | Conceito aprovado; não substitui a logo |
| V01 farol/controle | Arquivo histórico | Aprovada anteriormente, substituída pela v02 |

As repetições da prancha gerada podem conter diferenças. A composição principal grande é a referência de forma; as miniaturas documentam intenção de aplicação. Produzir variantes a partir de uma única matriz, reconciliar diferenças visivelmente e validar antes de liberá-las. Não embutir um PNG dentro de SVG e chamar isso de vetor.

## 4. Área de proteção, proporções e escala

**Especificação inicial:** definir H como altura do emblema isolado, incluindo vapor e contêineres, excluindo o nome. Reservar ao redor da assinatura completa pelo menos 0,15H de espaço livre. Medir a partir do elemento mais externo, não da borda da tela. Não modificar o espaçamento interno aprovado entre nome e emblema.

Até a prova de produção, usar como limites conservadores de teste: assinatura vertical com largura de 280 px, horizontal com largura de 320 px e símbolo isolado com largura de 128 px. São pontos de partida, não tamanhos mínimos certificados. Abaixo deles, não presumir legibilidade. Testar nos tamanhos reais em 1× e 2×, fundo claro/escuro, celular e navegador; conferir nome, abertura do porto e símbolos dos contêineres.

Uma versão para 16/24/32 px provavelmente exigirá simplificação deliberada e aprovação específica. Não retornar ao SH inicial nem utilizar a v01 como favicon por conveniência. Para impressão, definir limites após prova física; não extrapolar automaticamente pixels para milímetros.

## 5. Paleta funcional

A direção de cor está aprovada visualmente. Os HEX abaixo são uma **normalização técnica inicial para futuras aplicações**, não uma medição pixel-exata da ilustração nem autorização para recolorir o PNG. A arte contém sombreados e não se limita a estas amostras.

| Nome | HEX | Função |
|---|---|---|
| Petróleo profundo | `#123D47` | Texto principal, assinatura, superfície escura |
| Marfim do cais | `#F7F3EA` | Fundo claro e texto sobre petróleo |
| Água teal | `#087F8C` | Acentos, áreas ilustrativas e séries gráficas com contraste validado |
| Cobre do barco | `#B64F2B` | Destaque de marca e ações pontuais sobre marfim |
| Âmbar de luz | `#F0B45A` | Realce sobre fundo escuro, detalhe de ilustração |
| Cinza de apoio | `#53666B` | Texto secundário sobre marfim |

### Combinações calculadas

Contraste sRGB calculado por luminância relativa para cores opacas sólidas, arredondado a duas casas. Não certifica a ilustração, fundos translúcidos ou a UI futura.

| Primeiro plano / fundo | Razão | Uso |
|---|---:|---|
| Petróleo / marfim | 10,63:1 | Texto normal e títulos |
| Marfim / petróleo | 10,63:1 | Texto em superfície escura |
| Cinza / marfim | 5,45:1 | Texto secundário |
| Cobre / marfim | 4,58:1 | Texto normal; margem pequena, não reduzir opacidade |
| Âmbar / petróleo | 6,38:1 | Texto e destaque sobre escuro |
| Teal / marfim | 4,29:1 | Não usar para texto normal; reservar para texto grande ou gráficos elegíveis |
| Âmbar / marfim | 1,67:1 | Decoração somente; não comunicar informação sozinho |

WCAG 2.2 AA exige 4,5:1 para texto normal e 3:1 para texto grande (18 pt regular ou 14 pt negrito). A exceção de logotipos não isenta textos e controles da interface. Referência: [W3C — contraste mínimo](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html).

Cobre e âmbar são cores de marca, não equivalentes automáticos de queda e alerta. Estados de sucesso, erro, atraso e estimativa precisam de texto/ícone e tokens semânticos próprios validados na implementação. Gráficos usam rótulos, padrões ou estilos de linha, além de cor. Foco visível deve contrastar com a superfície real, sem depender de brilho.

## 6. Tipografia

**Logotipo:** preservar o lettering raster aprovado. A fonte original da geração não está identificada; não afirmar que o wordmark foi feito com Fraunces ou substituir suas letras por uma fonte parecida sem prova visual.

**Recomendação de sistema:** Fraunces 600–700 para títulos editoriais e Inter 400/500/600 para interface, texto e dados. Fraunces acompanha o caráter acolhedor das serifas; Inter oferece uma linguagem discreta para leitura e tabelas. Esta combinação é especificação inicial, a validar junto ao emblema. Não usar serifas em cada número ou controle.

Corpo inicial de 16 px com entrelinha 1,5; rótulos de 14 px; metadados preferencialmente 13–14 px. Usar algarismos tabulares em comparações, números alinhados à direita, texto sem compressão artificial. Títulos responsivos não devem empurrar a busca e os dados para fora da primeira tela.

[Fraunces](https://github.com/google/fonts/blob/main/ofl/fraunces/OFL.txt) e [Inter](https://github.com/google/fonts/blob/main/ofl/inter/OFL.txt) são distribuídas sob SIL OFL 1.1 nas fontes consultadas em 2026-09-09. Na incorporação, preservar copyright e licença, verificar nomes reservados ao modificar fontes e não vender os arquivos de fonte isoladamente. Registrar versão, origem e hash dos binários efetivamente usados. Nenhuma fonte foi incorporada ao repositório nesta entrega. Preferir hospedagem local de WOFF2 e poucos pesos, com fallback e carregamento que evite deslocamento de layout.

## 7. Fundos e usos incorretos

Preferir marfim uniforme na apresentação principal e petróleo na assinatura reversa. Sobre fotografia ou capa de jogo, usar uma área limpa que garanta separação; não colocar nome sobre detalhes de imagem. Não esticar, inclinar, espelhar, trocar fonte, recolorir por campanha, acrescentar contorno, cortar vapor ou contêineres, aplicar glow, trocar o barco ou girar a perspectiva.

Não eliminar detalhes silenciosamente para criar favicon. Não usar screenshots da conversa como fonte quando o PNG exato está disponível. Não regenerar a marca aprovada com IA para obter outro tamanho, fundo ou composição. Exportação deve partir da matriz aprovada, com transformações documentadas e revisão de fidelidade.

## 8. Iconografia, imagem e composição

Ícones funcionais: família única simples, traço consistente, geometrias abertas e rótulos quando necessário. Busca continua uma lupa; filtros continuam filtros. Ícones não precisam imitar pedra, madeira ou caixas. Usar nomes acessíveis e não depender apenas da forma para funções ambíguas.

Ilustrações: perspectiva de três quartos, volumes limpos, água teal, materiais quentes e luz acolhedora. A [referência de porto detalhado](references/steamharbor-harbor-theme-concept.png) orienta atmosfera e acabamento, mas seu armazém não é parte da logo definitiva. Evitar excesso de brilho, fantasia infantil, violência visual, texturas sob dados e reprodução de ativos de jogos sem origem definida.

Composição: permitir ilustração rica em momentos institucionais; manter tabelas e gráficos visualmente tranquilos. Usar agrupamentos, tipografia e espaço para hierarquia. A identidade não exige cards em todas as seções, painéis de madeira ou mapa náutico como navegação.

## 9. Movimento

Direção inicial: transições funcionais discretas de 120–200 ms; entrada editorial opcional até 300 ms. Vapor ou água podem inspirar movimento pontual em peça institucional, sem loop permanente junto a dados, parallax obrigatório ou som automático. Não deformar a logo. Com redução de movimento ativada, mostrar estado estático e preservar feedback funcional.

Estes tempos são especificações de partida, não animação aprovada. Nenhuma sequência ou asset de movimento foi produzido nesta entrega.

## 10. Tom de voz

Falar diretamente com o jogador, explicar o que o dado permite saber e indicar um próximo passo quando útil. Usar frases curtas, sem culpa em erros, sem falsa certeza e sem metáfora náutica nas tarefas essenciais.

| Preferir | Evitar |
|---|---|
| Jogadores agora; observado em; período acompanhado | Jogo morto; explodiu; sucesso garantido |
| Estimativa; dados insuficientes; indisponível | Aproximações apresentadas como fatos; ausência como zero |
| Menor preço observado desde uma data | Melhor preço de todos os tempos sem cobertura comprovada |
| Ver histórico; explorar jogos; tentar novamente | Embarque já; última chance sem evidência; erro do usuário |

### Exemplos de aplicação

Valores entre chaves são campos de exemplo, nunca dados reais. Usar apenas quando a capacidade e a evidência existirem.

| Situação | Português | Inglês |
|---|---|---|
| Busca | Buscar jogos ou AppID | Search games or AppID |
| Sem resultados | Nenhum jogo encontrado para “{consulta}”. Confira o nome ou tente o AppID. | No games found for “{query}”. Check the name or try an AppID. |
| Catálogo de demonstração | Nenhum resultado neste catálogo de demonstração. | No matches in this sample catalog. |
| Observação | {n} jogadores conectados. Observado em {horário e fuso}. | {n} connected players. Observed at {time and timezone}. |
| Cálculo | Variação de {x}% entre {períodos comparáveis}. Veja o cálculo. | {x}% change between {comparable periods}. See the calculation. |
| Estimativa futura | Estimativa de {métrica}, segundo {fonte}. Consulte o método. | Estimated {metric}, from {source}. See the methodology. |
| Indisponibilidade | Ainda não temos dados de preço para esta região. | Price data is not available for this region yet. |
| Histórico insuficiente | O acompanhamento começou em {data}. Ainda não há dados suficientes para mostrar uma tendência. | Tracking began on {date}. There is not enough history to show a trend yet. |
| Falha com cache | Não foi possível atualizar agora. Mostrando os dados de {horário}. | We could not refresh this data. Showing the last update from {time}. |
| Falha sem cache | Não foi possível carregar estes dados. Tente novamente. | We could not load this data. Try again. |
| Preço contextualizado | Menor preço observado desde {data}, em {região/moeda}. | Lowest price observed since {date}, in {region/currency}. |
| Independência | SteamHarbor é independente e não tem afiliação com Valve ou Steam. | SteamHarbor is independent and is not affiliated with Valve or Steam. |

Só mostrar “Tentar novamente” se houver uma ação funcional. Não dizer que Steam não fornece um dado quando a causa real é fonte ainda não conectada. Não atribuir variação a promoção, patch ou evento sem evidência. Amostra zero é diferente de falta de dados. Estimativas de proprietários continuam fora do MVP conforme a fundação de dados.

## 11. Plano de aplicação no site

1. Preparar exports oficiais e verificar uma matriz única; resolver ícone reduzido antes de integrar o cabeçalho.
2. Criar prova de tokens e tipografia em fundo claro e escuro, incluindo busca, tabela, gráfico e estados indisponíveis.
3. Apresentar uma tela representativa para revisão visual. Manter capacidades e dados reais do produto separados de propostas.
4. Implementar em tarefa própria, mantendo stack, semântica e contratos de dados existentes.
5. Validar teclado, foco, leitor de tela, contraste, zoom de 200%, largura de 320 px, movimento reduzido e desempenho. Executar também lint, types, testes e build quando houver código.

Aprovação do tema não autoriza gráficos decorativos como dados, novas promessas de integração, fontes secretas no cliente ou scraping de SteamDB. Não fazer upload da prancha inteira para servir como logo do cabeçalho.

## 12. Produção e governança

Próximos entregáveis técnicos: matriz editável fiel, PNGs transparentes, assinatura horizontal/vertical, versão monocromática consistente, microícone aprovado, exports para fundos definidos e inventário com dimensões, hashes e origem. Avaliar bordas claras/escuro, alpha e halos no tamanho real. Não declarar esses arquivos concluídos: só as pranchas de referência estão nesta edição.

Arquivos aprovados são imutáveis. Novas revisões recebem caminho/versionamento próprios. Atualizar manifesto, registro de aprovação, índice canônico e ADR quando houver mudança material. Um agente deve ler esses registros antes de produzir qualquer nova imagem. A v01 não é fallback autorizado da v02.

## Atualização de produção — V02-R01

Os PNGs transparentes extraídos e provas de composição estão em [production/v02-r01](production/v02-r01/README.md). Isso avança o estado inicial de exports pendentes descrito nesta edição. Vetor, matriz monocromática consistente e favicon oficial permanecem pendentes; versões horizontal e reversa são candidatas técnicas. A referência visual aprovada não foi substituída.
