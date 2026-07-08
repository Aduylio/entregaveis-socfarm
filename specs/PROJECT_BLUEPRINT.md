# Socfarm Entregáveis

Versão: MVP 1.0

---

# Visão

Socfarm Entregáveis é uma plataforma para disponibilização de materiais de eventos de forma organizada, elegante e extremamente simples.

O objetivo é substituir links de Google Drive por uma experiência profissional, rápida e agradável.

A plataforma deve servir para qualquer evento promovido pelo Socfarm.

Exemplos:

- Experiência Socfarm
- Workshops
- Convenções
- Cursos
- Treinamentos
- Lives
- Imersões

O sistema deve ser reutilizável para qualquer evento apenas alterando as configurações.

---

# Objetivos

Participantes devem localizar qualquer material em menos de 10 segundos.

Organizadores devem publicar um novo material em menos de 30 segundos.

Toda a experiência deve transmitir organização e profissionalismo.

---

# Público

## Participantes

Visualizam materiais.

Pesquisam.

Baixam arquivos.

Nada além disso.

---

## Organizadores

Publicam materiais.

Editam.

Excluem.

Alteram informações do evento.

Alteram capa.

---

# Escopo

O sistema permite:

✔ Download

✔ Pesquisa

✔ Categorias

✔ Upload

✔ Dashboard

✔ Configuração do evento

✔ Alteração de capa

✔ Ordenação

✔ Busca

---

O sistema NÃO possui:

Cadastro de usuários.

Área do aluno.

CRM.

ERP.

Financeiro.

Pagamentos.

Certificados.

Controle de inscrições.

Chat.

Comentários.

---

# Filosofia

Tudo deve ser simples.

Toda funcionalidade deve responder:

"Isto facilita a vida do participante?"

Se não facilitar, provavelmente não deve existir.

---

# Design

Inspirado em:

- Vercel

- Linear

- Notion

- Raycast

- Portal de Materiais do Leandro Ladeira

Características:

Minimalista

Premium

Muito espaço em branco

Poucas cores

Poucos elementos

Excelente responsividade

---

# Paleta

Background

#09090B

Surface

#18181B

Border

#27272A

Primary

#FFFFFF

Secondary

#A1A1AA

Accent

#2563EB

---

# Tipografia

Geist

Fallback

Inter

---

# Stack

Frontend

Next.js

TypeScript

Tailwind

shadcn/ui

Backend

Supabase

Storage

Supabase Storage

Deploy

Vercel

---

# Estrutura

src/

app/

components/

ui/

layout/

materials/

admin/

hooks/

lib/

services/

repositories/

types/

utils/

config/

styles/

---

# Componentes

Header

Hero

SearchBar

CategoryChip

MaterialCard

Section

Container

Footer

Button

Input

Dialog

Badge

---

# Material

Todo material possui:

Título

Descrição

Categoria

Tipo

Arquivo

Ordem

Publicado

Criado em

---

Tipos

PDF

Excel

PowerPoint

ZIP

Vídeo

Link

Documento

Prompt IA

---

# Evento

Cada evento possui

Nome

Descrição

Imagem

Logo

Cor principal

Mensagem inicial

---

# Fluxo Público

Entrar

↓

Visualizar Hero

↓

Pesquisar

↓

Categoria

↓

Selecionar Material

↓

Download

---

# Fluxo Admin

/admin

↓

Senha

↓

Dashboard

↓

Novo Material

↓

Upload

↓

Salvar

↓

Material disponível

---

# Dashboard

O dashboard possui

Lista de materiais

Novo material

Editar

Excluir

Categorias

Configurações

---

# Busca

Pesquisar por

Título

Descrição

Categoria

---

# Categorias

Compras

Financeiro

Gestão

Marketing

IA

Outros

---

# Arquitetura

UI nunca acessa banco.

UI nunca faz upload.

Toda regra de negócio fica em services.

Toda comunicação com banco fica em repositories.

---

# Qualidade

Sempre utilizar

TypeScript

Componentes reutilizáveis

Tailwind

shadcn/ui

Nunca duplicar código.

Nunca criar componentes gigantes.

---

# Critérios

Todo componente deve:

Ser reutilizável.

Ser responsivo.

Possuir tipagem.

Possuir apenas uma responsabilidade.

---

# Roadmap

Sprint 1

Design System

Sprint 2

Home

Sprint 3

Supabase

Sprint 4

Dashboard

Sprint 5

Upload

Sprint 6

Configurações

Sprint 7

Polimento

---

Este documento é a única fonte oficial de requisitos do projeto.