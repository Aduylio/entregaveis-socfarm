# Supabase Storage — Bucket `materials`

## Visão geral

Os arquivos enviados pelo admin (uploads de materiais) são armazenados no
Supabase Storage, em um bucket chamado **`materials`**.

## Criar o bucket

1. Acesse o dashboard do Supabase:
   https://supabase.com/dashboard/project/wdukjjadjvthcapvpcqf

2. Navegue até **Storage** (menu lateral).

3. Clique em **"New Bucket"**.

4. Configure:

   - **Name:** `materials`
   - **Public bucket:** ✅ Sim (marcar como público)
   - **File size limit:** Defina conforme necessário (ex.: 50 MB)

5. Clique em **"Create bucket"**.

## Por que o bucket precisa ser público

- A Home pública (`/`) exibe os materiais para download.
- Os links `file_url` salvos no banco são as URLs públicas dos arquivos.
- Se o bucket não for público, as URLs retornadas exigirão um token de
  autenticação, o que quebraria o download na Home.
- Como os arquivos são links para conteúdos de evento (apresentações,
  planilhas, etc.), não há risco de segurança em torná-los públicos.

## Políticas de acesso (RLS para Storage)

Após criar o bucket público, as seguintes políticas são aplicadas
automaticamente pelo Supabase:

| Operação | Policy | Público |
|----------|--------|---------|
| SELECT   | `Todos podem visualizar arquivos` | ✅ |
| INSERT   | `Apenas service_role pode inserir` | ❌ |
| UPDATE   | `Apenas service_role pode atualizar` | ❌ |
| DELETE   | `Apenas service_role pode deletar` | ❌ |

Isso significa que:
- Qualquer pessoa (sem autenticação) pode **baixar** arquivos do bucket.
- Apenas o servidor (usando `SUPABASE_SERVICE_ROLE_KEY`) pode **enviar**,
  **atualizar** ou **excluir** arquivos.

**Não altere essas políticas.** Elas garantem que o upload só ocorra via
as rotas protegidas `/api/admin/upload`.

## Como o upload funciona (fluxo)

1. O admin seleciona um arquivo no formulário de material.
2. O frontend envia o arquivo para `POST /api/admin/upload`.
3. A rota valida a sessão administrativa (cookie HttpOnly).
4. Se válida, faz o upload para o bucket `materials` usando a
   `SUPABASE_SERVICE_ROLE_KEY`.
5. O arquivo é salvo com um nome único: `{uuid}-{nome_original}`.
6. A URL pública é retornada e preenchida automaticamente no campo
   `file_url` do formulário.
7. Ao salvar o material, a `file_url` é persistida no banco.

## Estrutura de arquivos no bucket

```
materials/
├── {uuid}-arquivo.pdf
├── {uuid}-planilha.xlsx
└── ...
```

Não há subpastas. O prefixo UUID evita colisão de nomes e garante
unicidade.

## Limpeza de arquivos órfãos

Atualmente não há um mecanismo automático para remover arquivos do
Storage quando um material é excluído. Se necessário, implementar
futuramente:
- Remover o arquivo do Storage na rota `DELETE /api/admin/materials/[id]`
- Ou criar um job periódico para limpar arquivos não referenciados.
