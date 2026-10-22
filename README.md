# 🐳 Workshop Docker: O Desafio dos Microsserviços

Bem-vindo(a) à sua primeira missão de orquestração de contêineres! Neste repositório, você encontra uma aplicação dividida em três camadas: **Frontend** (Interface), **Backend** (API) e **Banco de Dados** (PostgreSQL).

Sua missão é conectar essas três peças usando o **Docker Compose** e deixar o painel de status 100% verde — cruzando a linha de chegada! 🏁

---

## 🚀 Passo 1: Abrindo o Ambiente (GitHub Codespaces)

Não é necessário instalar nada no seu computador. Vamos rodar tudo na nuvem!

1. No canto superior direito deste repositório, clique no botão verde **`<> Code`**.
2. Selecione a aba **Codespaces**.
3. Clique em **Create codespace on main**.
4. Aguarde alguns segundos. Uma janela do VS Code abrirá diretamente no seu navegador, já com o **Docker** instalado e pronto para uso.

---

## ⚙️ Passo 2: Preparando as Variáveis

Nossa aplicação precisa de credenciais para funcionar, mas elas **não devem ficar expostas no código** (por isso o arquivo `.env` está no `.gitignore`).

1. No explorador de arquivos à esquerda, localize o arquivo **`.env.example`**.
2. Crie a sua cópia local chamada **`.env`**. No terminal integrado:

   ```bash
   cp .env.example .env
   ```
3. Abra o arquivo `.env` e dê uma olhada nas variáveis configuradas.

---

## 🎮 Passo 3: A Missão (Efeito Dominó)

Você vai construir a infraestrutura em etapas. Abra o terminal integrado (na parte inferior da tela) e siga o roteiro.

> 💡 **Como a comunicação funciona aqui:** o **Nginx** (Frontend) atua como **proxy reverso**. O dashboard faz chamadas para o caminho relativo `/api/...`, e o Nginx as repassa internamente para o Backend pela rede do Docker. Por isso, **basta uma única porta (a `80`)** — você **não precisa** tornar portas públicas manualmente no Codespaces.

### 🚩 Fase 1: Subindo o Frontend

O arquivo `docker-compose.yml` já está configurado para iniciar o Frontend.

No terminal, digite o comando:

```bash
docker compose up -d
```

O Codespaces exibirá um aviso no canto inferior direito informando que a porta **80** foi aberta. Clique em **"Open in Browser"** (ou vá na aba **"Ports"** e clique no ícone de globo da porta 80).

> Veja o painel: o **Frontend** está online (o carro largou!), mas o **Backend** está com erro.

### 🚩 Fase 2: O Despertar do Backend

O Frontend precisa da API para processar dados.

1. Abra o arquivo `docker-compose.yml`.
2. Remova os comentários (`#`) de todas as linhas do bloco **`backend:`**.
3. Atualize o ambiente rodando novamente:

   ```bash
   docker compose up -d
   ```

Volte para a aba do painel no navegador. Em alguns segundos o **Backend** deve ficar verde e o carro avança — mas ainda vai acusar que falta o **Banco de Dados**.

> 💡 Se o card não mudar na hora, aguarde ~10 segundos (o proxy atualiza o endereço do backend) ou atualize a página.

### 🚩 Fase 3: A Fundação (Banco de Dados)

O Backend não sobrevive sem onde gravar os dados.

1. Volte ao arquivo `docker-compose.yml`.
2. Descomente o bloco **`banco_de_dados:`** e também o bloco **`volumes:`** no final do arquivo.
3. Rode o comando mágico pela última vez:

   ```bash
   docker compose up -d
   ```

Verifique seu painel no navegador. Se tudo estiver correto, o carro cruza a linha de chegada e a mensagem de sucesso aparece! 🎉

---

## 🛠️ Guia de Sobrevivência Docker (Comandos Úteis)

Se algo der errado, use estes comandos no terminal para investigar ou reiniciar:

**Ver os contêineres rodando:**

```bash
docker ps
```

**Ler os logs de um serviço específico (ex.: backend):**

```bash
docker compose logs backend
```

**Derrubar tudo e começar do zero:**

```bash
docker compose down
```

**Derrubar tudo e apagar também os dados salvos no volume:**

```bash
docker compose down -v
```

---

## 🧑‍🏫 Para o instrutor

A versão completa e funcional está em **`docker-compose.solution.yml`**. Para subir a solução de uma vez (conferência rápida):

```bash
docker compose -f docker-compose.solution.yml up -d
```

---

Boa sorte, equipe! 🚀
