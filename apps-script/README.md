# Kelappa email gate → Google Sheets

Каждая кнопка «Скачать» на kelappa.com сначала спрашивает email, потом отдаёт `.dmg`.
Адреса падают строками в Google-таблицу через веб-приложение Apps Script.

```
браузер → /email-gate.js → POST JSON → Apps Script (/exec) → лист «Leads»
```

## Настройка (5 минут, делается один раз)

1. Создай пустую таблицу: **https://sheets.new** — назови, например, `Kelappa leads`.
2. В ней: **Extensions → Apps Script** (Расширения → Apps Script).
3. Удали содержимое `Code.gs` и вставь код из [`Code.gs`](./Code.gs) рядом с этим файлом. Сохрани (⌘S).
4. **Deploy → New deployment** → шестерёнка → **Web app**:
   - *Description*: `kelappa leads`
   - *Execute as*: **Me**
   - *Who has access*: **Anyone** ← обязательно, иначе браузер посетителя не достучится
   - **Deploy** → пройти Google-авторизацию (экран «Google hasn't verified this app» → *Advanced* → *Go to … (unsafe)* — это твой собственный скрипт).
5. Скопируй **Web app URL** — он вида
   `https://script.google.com/macros/s/AKfycb..../exec`.
6. Проверь: открой этот URL в браузере — должно вернуться `{"ok":true,"service":"kelappa-leads"}`.
7. Вставь URL в `deploy/email-gate.js`, строка с `var ENDPOINT = ...`, вместо плейсхолдера
   `https://script.google.com/macros/s/REPLACE_ME/exec`. Закоммить и запушь — Railway задеплоит.

Пока в `ENDPOINT` стоит `REPLACE_ME`, гейт **выключен**: кнопки качают напрямую, как раньше,
а в консоли висит предупреждение. Так что коммитить безопасно даже до настройки.

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

На втором листе таблицы:

```
=SORT(UNIQUE(FILTER(Leads!B2:B; Leads!B2:B<>"")))
```

Или с датой первого касания:

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

## Изменение кода Apps Script

После правки `Code.gs` в редакторе нужно **Deploy → Manage deployments → карандаш →
Version: New version → Deploy**. URL при этом не меняется.
