# Back-End — Conecta Cidadão

## Estrutura
- server.js — servidor principal da API
- package.json — configuração do projeto Node.js
- routes/usuarios.js — rota de usuários
- routes/problemas.js — rota de problemas
- middleware/autenticacao.js — autenticação das rotas protegidas
- security/ — validação, senha e geração de tokens JWT

## Testes realizados

Os testes iniciais da API foram realizados com sucesso:

- Servidor iniciado na porta 3000.
- Rota principal da API funcionando.
- Rota de usuários funcionando.
- Login funcionando.
- Token JWT sendo gerado.
- Rotas protegidas exigindo autenticação.
- Cadastro de problema funcionando.
- Validação de problemas funcionando.

## Observação

O armazenamento permanente dos problemas ainda será implementado.
