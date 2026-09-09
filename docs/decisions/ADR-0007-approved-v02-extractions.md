# ADR-0007 — Aprovação dos derivados V02-R01

Status: Accepted for the owner's explicit approval · 2026-09-09.

## Evidência e decisão

Após a entrega do pacote de extração V02-R01, links para os arquivos e prancha clara/escura, o proprietário respondeu: “aprovado, continue”. Registrar o pacote como aprovado para a produção da marca, incluindo os recortes e composições apresentados. A aprovação não abrange o novo favicon, que ainda não existia.

Os cinco arquivos de assinatura aprovados são os PNGs `steamharbor-symbol`, `steamharbor-wordmark`, `steamharbor-vertical`, `steamharbor-horizontal-candidate` e `steamharbor-vertical-reverse-candidate`, em `docs/brand/production/v02-r01/`. Seus hashes exatos são fixados em `approved-assets.json` nessa pasta. Preservar os sufixos históricos e não sobrescrever os arquivos para retirar a palavra candidate. O registro governa o estado, não o nome antigo do arquivo.

## Alcance

Este ADR avança o estado provisório de V02-R01 e a atualização de produção do guia. Não substitui a prancha do ADR-0006. A extração preserva o desenho; alpha e descontaminação de bordas continuam sendo estimativas técnicas documentadas, não recuperação de camadas originais.

As reduções `symbol-test-*` são testes históricos de legibilidade; não são promovidas a favicons. Um novo microícone deve ser apresentado separadamente. Não há autorização de merge, publicação ou mudança da UI nesta decisão.
