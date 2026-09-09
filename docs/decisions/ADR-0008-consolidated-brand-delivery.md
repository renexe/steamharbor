# ADR-0008 — Entrega consolidada de branding

Status: Accepted for explicit owner delivery instruction · 2026-09-09.

## Decisão

O proprietário pediu: “o ultimo PR deve trazer todos os anteriores para não termos problemas de merge”. O PR #6 passa a ser a entrega cumulativa, com base diretamente em main. Seu histórico inclui as entregas anteriores #3, #4 e #5; não é necessário mesclá-las separadamente. Os PRs anteriores serão encerrados como substituídos após a confirmação de ancestralidade. Preservar seus commits, arquivos e registros de aprovação.

Isso substitui o encadeamento operacional descrito nas entregas anteriores. Mantêm-se a política de branch própria e a responsabilidade do proprietário pelo merge e publicação. Não habilitar auto-merge ou publicar o domínio.

## Escopo acumulado e estados

A documentação e a v02 aprovada continuam canônicas. O ADR-0007 registra os exports aprovados. O favicon v01 e o tema v01 ficam identificados como propostas. A solicitação para continuar o trabalho não promove automaticamente todos os desenhos apresentados a cânone.

O registro de produção V02-R02 corrige um PNG reverso truncado por derivação determinística, sem substituir silenciosamente o binário histórico. Usar o novo arquivo decodificável em futuras aplicações.

## Validação

Antes da consolidação, a comparação main → branch de entrega mostrou quatro commits à frente e zero atrás. Verificar novamente conflitos e ancestralidade na conclusão. A ausência de conflitos é um estado do momento, não garantia contra alterações futuras da main.
