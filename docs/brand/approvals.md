# Registro de aprovações

| Data | Objeto | Estado e alcance | Arquivos |
|---|---|---|---|
| 2026-09-09 | Nome e domínio | Definidos explicitamente pelo proprietário: SteamHarbor e steamharbor.com | Não se aplica |
| 2026-09-09 | Escopo e sequência | Instrução explícita: branding; escolher direção → refinar → aprovar logo final → sistema de marca; sem UI, merge ou publicação | ADR-0005 |
| 2026-09-09 | Estratégia v001 | Proposta, aguardando avaliação | strategy.md |
| 2026-09-09 | Direções A/B/C v002 | Apresentadas, nenhuma escolhida | proposals/v002/manifest.json |
| — | Logomarca final | Pendente; nenhum arquivo aprovado | Nenhum |
| — | Sistema de marca e futura UI | Bloqueado até aprovação explícita do desenho final | Nenhum |

Após uma escolha, registrar a mensagem e seu alcance, sem promover cores, fonte ou detalhes não mencionados. Para aprovação final, registrar arquivos exatos, versões, caminhos, SHA-256 e eventuais ressalvas. Nunca substituir o binário aprovado em seu caminho; uma revisão deve ter nova versão e novo registro.

## Atualização definitiva — 2026-09-09

As linhas acima preservam o estado da primeira entrega. A sequência abaixo substitui seus estados pendentes; não interpretar a tabela anterior como situação atual. Trechos são mensagens literais da conversa; não foram inventados IDs ou horários de aprovação.

| Ordem | Evidência do proprietário | Decisão e alcance |
|---|---|---|
| 1 | “sinceramente nao gostei de nenhuma das opções” | A/B/C rejeitados; manter apenas histórico |
| 2 | “ok, vamos manter essa como a versão 01 aprovada” | Farol integrado ao controle aprovado como v01 histórica |
| 3 | “adorei esse conceito, agora podemos desenvolver uma logo a partir dele, e também usar ele como base pra desenvolver o theme do site” | Porto ilustrado aprovado como direção para logo e tema; não aprova UI pronta |
| 4 | “Talvez possamos usar containers com simbolos que remetam joysticks?” | Revisão da casinha para contêineres gamer |
| 5 | “ficou ótimo, vamos manter essa como definitiva.” | V02 com contêineres aprovada como logo definitiva; prevalece sobre v01 |
| 6 | “Agora elabore uma documentação profissional sobre a marca ... depois ... guia de marca” | Autoriza desenvolver e registrar documentação oficial no repositório |

Fonte visual final: [steamharbor-v02-approved-board.png](approved/v02/steamharbor-v02-approved-board.png). A imagem imediatamente anterior à mensagem final é o binário `exec-b61ef3bc-0973-46a9-a9c8-214acde7b0f7.png`, copiado sem edição. Dimensões e SHA-256 estão no [manifesto](assets-manifest.json). O rodapé impresso de proposta fica intacto como evidência histórica.

A aprovação cobre a direção e o desenho apresentado. Não afirma que as miniaturas geradas são geometricamente idênticas, que o lettering corresponde a uma fonte conhecida ou que os exports estão prontos. HEX, famílias tipográficas de apoio, mínimos e tempos definidos no guia são especificações técnicas iniciais. Revisões materiais devem ser apresentadas; arquivos oficiais não podem ser sobrescritos.

O proprietário havia pedido que nenhum PR fosse aberto antes de aprovar. Essa condição foi cumprida pela aprovação definitiva; mantém-se a entrega por PR, sem merge ou publicação. A v01 é preservada, mas não é alternativa ativa.

## Continuação técnica — V02-R01

O proprietário autorizou: “pode prosseguir com a tarefa anterior, faça o que for preciso para continuar sem me pedir permissao”, após a explicação da extração e remoção determinística de fundo. Executado o pacote [V02-R01](production/v02-r01/README.md), preservando o binário aprovado. Essa autorização permite o trabalho técnico; o resultado não é registrado como nova aprovação visual.

## Aprovação V02-R01

Após a entrega dos derivados e da prancha clara/escura, o proprietário respondeu “aprovado, continue”. O [ADR-0007](../decisions/ADR-0007-approved-v02-extractions.md) registra os cinco arquivos aprovados com hashes. A [proposta de favicon v01](proposals/favicon-v01/README.md) é posterior e permanece separada, ainda não aprovada.
