# V02-R02 — correção técnica do export reverso

Durante a preparação do tema, a leitura completa de `v02-r01/steamharbor-vertical-reverse-candidate.png` falhou com `image file is truncated`. O hash coincidia com o arquivo registrado; portanto, verificar apenas o hash não bastava para validar a decodificação.

O arquivo antigo permanece preservado como histórico, mas não deve ser usado. A correção está em `steamharbor-vertical-reverse.png`, produzida a partir do PNG vertical íntegro. Abaixo da coordenada y=558 do export, o RGB do lettering foi preenchido com o marfim já aprovado (#F7F3EA), mantendo seu alpha. Todo o emblema e o alpha total são idênticos aos do arquivo vertical fonte. Nenhum desenho foi regenerado.

`steamharbor-horizontal-reverse.png` aplica o mesmo tratamento ao lettering da composição horizontal aprovada, a partir de x=308. É um derivado técnico consistente para a proposta de tema escuro.

O script `tools/brand/repair_reverse.py` documenta a operação e verifica igualdade dos pixels do emblema e do alpha. Os PNGs novos foram integralmente decodificados. `manifest.json` registra seus hashes. Esta correção não altera a geometria aprovada e não implica aprovação do tema apresentado.
