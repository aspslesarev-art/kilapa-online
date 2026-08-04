# Kelappa email gate → Google Sheets

Каждая кнопка «Скачать» на kelappa.com сначала спрашивает email, потом отдаёт `.dmg`.
Адреса падают строками в Google-таблицу через веб-приложение Apps Script.

```
браузер → /email-gate.js → POST JSON → Apps Script (/exec) → лист «Leads»
```

## Что где живёт

| Что | Где |
|---|---|
| Таблица с лидами | [Kelappa leads](https://docs.google.com/spreadsheets/d/1keWRNoi1SiiNVG7CLP_UB1OeQWyxF1qmdfONbqG4HZ4/edit), лист `Leads` |
| Проект Apps Script | [Kelappa leads](https://script.google.com/home/projects/1InTawAg9iQAVfkG8mHhuocR16skRYxzIvWPz-zXVpDPQO4JDa5W5QctM/edit) |
| Аккаунт-владелец | `andre@balinsky.info` |
| Развёртывание | Web app, *Execute as* **Me**, *Who has access* **Anyone** |
| Эндпоинт | прописан в `deploy/email-gate.js`, константа `ENDPOINT` |

Скрипт **не привязан** к таблице (меню Sheets → Extensions не поддалось автоматизации),
он открывает её по `SHEET_ID` в первой строке [`Code.gs`](./Code.gs). Отсюда следствие:
файл в этом репозитории — зеркало того, что развёрнуто, а не источник правды.
Правишь код → обязательно перезаливаешь в редакторе Apps Script (см. ниже).

Проверить, что эндпоинт жив, можно в любой момент — открой `/exec`-URL в браузере,
должно вернуться `{"ok":true,"service":"kelappa-leads"}`.

## Что попадает в таблицу

Лист `Leads`, шапка создаётся автоматически при первой записи:

| колонка | пример | смысл |
|---|---|---|
| `ts` | `2026-08-04T09:12:33.421Z` | момент клика, ISO-8601 UTC |
| `email` | `you@example.com` | приводится к нижнему регистру |
| `app` | `CCV` | какое приложение качали |
| `page` | `/ccv/` | с какой страницы |
| `lang` | `en` | язык страницы в момент клика |
| `referrer` | `https://news.ycombinator.com/` | откуда пришёл |
| `utm_source` / `utm_medium` / `utm_campaign` | `telegram` / `post` / `launch` | из query-строки |
| `userAgent` | `Mozilla/5.0 (Macintosh…` | браузер/ОС |

Строка пишется на **каждое** скачивание, включая повторные тем же человеком —
это лог, а не список подписчиков.

## Уникальные адреса

На отдельном листе:

```
=SORT(UNIQUE(FILTER(Leads!B2:B; Leads!B2:B<>"")))
```

Или с датой первого касания и числом скачиваний:

```
=QUERY(Leads!A2:C; "select B, min(A), count(C) where B is not null group by B order by min(A) desc label min(A) 'first seen', count(C) 'downloads'")
```

## Поведение гейта

- Email спрашивается **один раз на браузер** — потом лежит в `localStorage.kelappa_email`,
  повторные скачивания идут без окна, но строка в таблицу всё равно пишется.
- Если Apps Script недоступен, лид кладётся в `localStorage.kelappa_gate_pending`
  и переотправляется при следующем заходе на сайт. Скачивание при этом **никогда не блокируется**.
- Cmd/Ctrl-клик и правый клик по кнопке гейт не перехватывает (сохранение ссылки как обычно).
- Счётчики abacus (`dl-ccv`, `dl-vtext`, …) теперь срабатывают в момент реального старта
  скачивания, а не в момент клика.
- Язык окна берётся из `<html lang>`: en/ru/es/fr/de/pt/zh/ja/ar, иначе английский.
- Цвет кнопки задаётся страницей через CSS-переменные `--kg-accent` и `--kg-accent-fg`.

## Изменение кода Apps Script

1. Правишь [`Code.gs`](./Code.gs) здесь, коммитишь.
2. Открываешь [проект в Apps Script](https://script.google.com/home/projects/1InTawAg9iQAVfkG8mHhuocR16skRYxzIvWPz-zXVpDPQO4JDa5W5QctM/edit),
   вставляешь новое содержимое, ⌘S.
3. **Deploy → Manage deployments → карандаш → Version: New version → Deploy.**
   URL при этом не меняется — трогать `email-gate.js` не нужно.

Если пропустить шаг 3, прод продолжит крутить старую версию скрипта.

## Как временно выключить сбор

В `deploy/email-gate.js` заменить `ENDPOINT` на
`https://script.google.com/macros/s/REPLACE_ME/exec` — гейт разоружится,
кнопки начнут качать напрямую, в консоли будет предупреждение.
