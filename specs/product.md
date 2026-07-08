# Product Specification

## Nome do projeto

Portal de Materiais (nome provisório)

---

# Objetivo

Criar um portal moderno para disponibilização de materiais utilizados em eventos, palestras e treinamentos do Socfarm.

O objetivo é proporcionar uma experiência muito mais agradável, organizada e profissional do que simplesmente compartilhar uma pasta do Google Drive.

Os participantes devem encontrar e baixar qualquer material em poucos segundos, enquanto os organizadores conseguem publicar novos arquivos rapidamente durante o evento.

---

# Público-alvo

Participantes de eventos, cursos, mentorias e palestras promovidos pelo Socfarm.

---

# Administradores

Os próprios organizadores e palestrantes do evento.

Não haverá cadastro de administradores.

O acesso será realizado através de uma senha única da área administrativa.

---

# O que o sistema faz

- Exibe os materiais disponíveis para download.
- Organiza os materiais por categorias.
- Permite pesquisar materiais.
- Permite baixar arquivos.
- Permite adicionar novos materiais.
- Permite editar materiais.
- Permite excluir materiais.
- Permite alterar a capa do evento.
- Permite alterar informações básicas do evento.

---

# O que o sistema NÃO faz

Este projeto não é um ERP.

Não possui:

- gestão financeira
- emissão de certificados
- cadastro de participantes
- controle de inscrições
- pagamentos
- CRM
- área do aluno

Seu único propósito é disponibilizar materiais de maneira elegante e organizada.

---

# Princípios do projeto

Todo o desenvolvimento deve seguir estes princípios:

## Simplicidade

Toda funcionalidade deve ser intuitiva.

Se existir uma maneira mais simples de implementar uma solução, ela deve ser priorizada.

---

## Velocidade

O organizador deve conseguir publicar um novo material em menos de 30 segundos.

---

## Organização

Os materiais devem ser facilmente encontrados através de categorias e pesquisa.

---

## Aparência Premium

O portal deve transmitir profissionalismo.

O design será inspirado no portal de materiais do Leandro Ladeira.

Características esperadas:

- minimalista
- moderno
- elegante
- limpo
- muito espaço em branco
- poucos elementos na tela
- excelente responsividade

---

## Facilidade de manutenção

O código deve ser organizado e componentizado.

Toda funcionalidade deve ser reutilizável.

---

# Stack

Frontend

- Next.js
- TypeScript
- Tailwind CSS

Backend

- Supabase

Deploy

- Vercel

---

# MVP

A primeira versão deverá conter apenas:

- Home
- Busca
- Categorias
- Download de materiais
- Área administrativa
- Upload de arquivos
- Alteração de capa
- Alteração de informações do evento

Nada além disso.