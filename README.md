#  Conecta Cidadão

### "Você informa. A solução acontece."

## Desenvolvimento de Software

**Responsável:** Maria Eduarda

##  Sobre o projeto

O Conecta Cidadão é um sistema desenvolvido para facilitar o registro e o acompanhamento de problemas encontrados pela população.

O usuário poderá registrar um problema, informar o local, adicionar uma descrição e acompanhar o andamento da solicitação.

##  Objetivo

O objetivo do sistema é facilitar a comunicação entre as pessoas e os responsáveis pela solução dos problemas.

O sistema poderá ser utilizado em:

-  Comunidade
-  Educação
-  Empresa
-  Prefeitura

##  Funcionamento

O sistema seguirá este processo:

1. O usuário entra no sistema.
2. Faz login ou cadastro.
3. Escolhe a área do problema.
4. Cadastra o problema.
5. Informa o local.
6. Adiciona uma descrição.
7. Pode adicionar uma foto.
8. Envia o problema.
9. O responsável recebe a solicitação.
10. O usuário acompanha o andamento.

##  Status dos problemas

**Recebido**  
O problema foi registrado no sistema.

**Em andamento**  
O problema está sendo analisado ou solucionado.

**Resolvido**  
O problema foi solucionado.

##  Principais telas

- Tela inicial
- Tela de login
- Tela de escolha da área
- Tela de cadastro do problema
- Tela de acompanhamento
- Tela de problemas resolvidos

## Regras do sistema

- Todo problema deve possuir uma descrição.
- Todo problema deve possuir um local.
- Cada problema deve pertencer a uma área.
- Todo problema começa como "Recebido".
- Apenas usuários autorizados podem alterar o status.
- O usuário pode acompanhar seus problemas.
- Quando solucionado, o problema recebe o status "Resolvido".

## Fluxo

```text
INÍCIO
   ↓
LOGIN / CADASTRO
   ↓
ESCOLHER ÁREA
   ↓
CADASTRAR PROBLEMA
   ↓
LOCAL + DESCRIÇÃO + FOTO
   ↓
ENVIAR
   ↓
RECEBIDO
   ↓
EM ANDAMENTO
   ↓
RESOLVIDO
   ↓
FIM