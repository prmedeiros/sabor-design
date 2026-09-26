# Carrinho e compra para o delivery

## Objetivo
Transformar o cardápio atual em uma experiência de delivery: o cliente escolhe produtos, revisa quantidades e conclui o pedido.

## O que será construído
- Botões “Adicionar” em todos os combos, hambúrgueres, hot dogs, porções e bebidas.
- Carrinho acessível durante a navegação, com quantidade total e subtotal.
- Painel do carrinho para aumentar, reduzir ou remover itens.
- Página de compra com resumo, dados do cliente, entrega ou retirada, endereço, forma de pagamento e observações.
- Validação do pedido mínimo de R$ 6,00.
- Finalização via WhatsApp com a mensagem do pedido já formatada.
- Opção de pagamento online exibida como indisponível até a Shopify ser criada ou conectada.

## Experiência visual
- Preservar o vermelho, amarelo, tipografia e energia visual já aprovados.
- Adaptar carrinho e compra para celular e computador, sem cobrir conteúdo ou quebrar textos.
- Mostrar valores em reais e deixar subtotal e escolhas sempre claros.

## Detalhes técnicos
- Compartilhar o estado do carrinho entre cardápio e página de compra.
- Manter o carrinho no navegador para que a seleção não desapareça ao mudar de página.
- Criar a página `/checkout` com metadados próprios.
- Preparar a interface para substituir o botão indisponível pelo checkout da Shopify após a conexão.
- Validar compilação, erros no navegador e o fluxo completo até a abertura do WhatsApp.

## Limitação atual
A configuração da Shopify foi pulada. Por isso, o pagamento online real não será ativado nesta etapa; ele depende da criação ou conexão da loja.
