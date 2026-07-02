// VText landing — i18n (benefit-first, plain-language copy)
(function () {
  "use strict";

  const LANGS = [
    { code: "en", label: "English", short: "EN" },
    { code: "ru", label: "Русский", short: "RU" },
    { code: "es", label: "Español", short: "ES" },
    { code: "fr", label: "Français", short: "FR" },
    { code: "de", label: "Deutsch", short: "DE" },
    { code: "pt", label: "Português", short: "PT" },
    { code: "zh", label: "中文", short: "中" },
    { code: "ja", label: "日本語", short: "日" },
    { code: "ar", label: "العربية", short: "ع" },
  ];

  const I18N = {
    en: {
      nav: { download: `Download` },
      hero: {
        eyebrow: `For your Mac`, h1_1: `Don't type.`, h1_2: `Just talk.`,
        sub: `You don't touch the keyboard. Just say it out loud — VText writes it for you, clean and with punctuation.`,
        download: `Download for Mac`, metaFree: `Free`, metaRest: `· for Mac`,
      },
      demo: {
        appName: `Messages`, file: `File`, edit: `Edit`, view: `View`, contact: `Alex`, online: `online`,
        incoming: `Did you see the plan?`, placeholder: `Message`, badge: `Short`,
        listening: `Listening…`, cleaning: `Cleaning up`, raw: `You said`,
        rawText: `um, hey, so I was thinking maybe we could move the meeting to Thursday afternoon if that's okay, 'cause mornings are kind of crazy for me right now`,
        cleanText: `Can we move the meeting to Thursday afternoon? Mornings are busy for me.`,
      },
      modes: {
        tag: `Two ways`, h2: `Say it however it comes out.`,
        tH: `Every word, no typos`, tP: `Get exactly what you said — spelled right, with punctuation. You don't fix a thing.`,
        sH: `Ramble, get clarity`, sP: `Talk as long and messy as you want. VText makes it short, simple and clear — perfect when your thoughts race ahead.`,
        sYouSaid: `You said`, sSaidText: `um so maybe we could move the meeting to Thursday, if that's okay, 'cause mornings are kinda crazy…`,
        sWrote: `You get`, sWroteText: `Can we move the meeting to Thursday afternoon? Mornings are busy for me.`,
        note: `Each way has its own key.`,
      },
      why: {
        tag: `Good to know`, h2: `Simple, and out of your way.`,
        f1h: `Works anywhere`, f1p: `Chat, email, notes — anywhere you type.`,
        f3h: `Any language`, f3p: `Talk in the language you want.`,
        f4h: `Free`, f4p: `No sign-up. Just download and go.`,
        f5h: `Yours stays yours`, f5p: `Your words aren't saved or shared.`,
      },
      cta: {
        h2: `Talk instead of type.`, sub: `Get VText and send your next message in one breath.`,
        button: `Download for Mac`, fine: `Free · for Mac`,
      },
      footer: {
        note: `Talk. Get text. That's it.`,
        goodtoknow: `For Mac · free for now.<br />Need help? Just write us in the app.`,
      },
    },

    ru: {
      nav: { download: `Скачать` },
      hero: {
        eyebrow: `Для твоего Mac`, h1_1: `Не печатай.`, h1_2: `Просто говори.`,
        sub: `Клавиатура больше не нужна. Просто скажи вслух — VText напишет за тебя, чисто и с пунктуацией.`,
        download: `Скачать для Mac`, metaFree: `Бесплатно`, metaRest: `· для Mac`,
      },
      demo: {
        appName: `Сообщения`, file: `Файл`, edit: `Правка`, view: `Вид`, contact: `Алекс`, online: `в сети`,
        incoming: `Видел план?`, placeholder: `Сообщение`, badge: `Кратко`,
        listening: `Слушаю…`, cleaning: `Причёсываю`, raw: `Ты сказал`,
        rawText: `ну, э-э, я вот подумал, может, перенесём встречу на четверг после обеда, если ок, а то утром у меня сейчас полный завал`,
        cleanText: `Давай перенесём встречу на четверг после обеда? Утром я занят.`,
      },
      modes: {
        tag: `Два способа`, h2: `Говори как получается.`,
        tH: `Каждое слово, без ошибок`, tP: `Получишь ровно то, что сказал — грамотно и с пунктуацией. Ничего не надо править.`,
        sH: `Говори сумбурно — получи ясно`, sP: `Говори сколько угодно и как попало. VText сделает коротко, просто и понятно — то, что нужно, когда мысли несутся.`,
        sYouSaid: `Ты сказал`, sSaidText: `ну, может, перенесём встречу на четверг, если ок, а то утром прям завал…`,
        sWrote: `Ты получишь`, sWroteText: `Давай перенесём встречу на четверг после обеда? Утром я занят.`,
        note: `У каждого способа своя клавиша.`,
      },
      why: {
        tag: `Полезно знать`, h2: `Просто и не мешает.`,
        f1h: `Работает везде`, f1p: `Чат, почта, заметки — везде, где печатаешь.`,
        f3h: `Любой язык`, f3p: `Говори на языке, на каком хочешь.`,
        f4h: `Бесплатно`, f4p: `Без регистрации. Просто скачай и пользуйся.`,
        f5h: `Твоё остаётся твоим`, f5p: `Твои слова никуда не сохраняются и никому не уходят.`,
      },
      cta: {
        h2: `Говори, а не печатай.`, sub: `Установи VText и отправь следующее сообщение на одном дыхании.`,
        button: `Скачать для Mac`, fine: `Бесплатно · для Mac`,
      },
      footer: {
        note: `Сказал. Получил текст. Всё.`,
        goodtoknow: `Для Mac · пока бесплатно.<br />Нужна помощь? Просто напиши нам в приложении.`,
      },
    },

    es: {
      nav: { download: `Descargar` },
      hero: {
        eyebrow: `Para tu Mac`, h1_1: `No escribas.`, h1_2: `Solo habla.`,
        sub: `No tocas el teclado. Solo dilo en voz alta — VText lo escribe por ti, limpio y con puntuación.`,
        download: `Descargar para Mac`, metaFree: `Gratis`, metaRest: `· para Mac`,
      },
      demo: {
        appName: `Mensajes`, file: `Archivo`, edit: `Edición`, view: `Ver`, contact: `Alex`, online: `en línea`,
        incoming: `¿Viste el plan?`, placeholder: `Mensaje`, badge: `Corto`,
        listening: `Escuchando…`, cleaning: `Limpiando`, raw: `Dijiste`,
        rawText: `eh, mira, estaba pensando que quizá podríamos mover la reunión al jueves por la tarde si te va bien, porque las mañanas las tengo de locos ahora`,
        cleanText: `¿Movemos la reunión al jueves por la tarde? Por la mañana estoy ocupado.`,
      },
      modes: {
        tag: `Dos formas`, h2: `Dilo como te salga.`,
        tH: `Cada palabra, sin erratas`, tP: `Recibe justo lo que dijiste — bien escrito y con puntuación. No corriges nada.`,
        sH: `Enrédate, recibe claridad`, sP: `Habla todo lo largo y desordenado que quieras. VText lo deja corto, simple y claro — ideal cuando tus ideas van a mil.`,
        sYouSaid: `Dijiste`, sSaidText: `eh quizá podríamos mover la reunión al jueves, si va bien, porque las mañanas están de locos…`,
        sWrote: `Recibes`, sWroteText: `¿Movemos la reunión al jueves por la tarde? Por la mañana estoy ocupado.`,
        note: `Cada forma tiene su propia tecla.`,
      },
      why: {
        tag: `Bueno saber`, h2: `Simple y sin estorbar.`,
        f1h: `Funciona en todo`, f1p: `Chat, correo, notas — donde escribas.`,
        f3h: `Cualquier idioma`, f3p: `Habla en el idioma que quieras.`,
        f4h: `Gratis`, f4p: `Sin registro. Descarga y listo.`,
        f5h: `Lo tuyo es tuyo`, f5p: `Tus palabras no se guardan ni se comparten.`,
      },
      cta: {
        h2: `Habla en vez de escribir.`, sub: `Consigue VText y envía tu próximo mensaje de un solo aliento.`,
        button: `Descargar para Mac`, fine: `Gratis · para Mac`,
      },
      footer: {
        note: `Habla. Recibe texto. Ya está.`,
        goodtoknow: `Para Mac · gratis por ahora.<br />¿Ayuda? Escríbenos desde la app.`,
      },
    },

    fr: {
      nav: { download: `Télécharger` },
      hero: {
        eyebrow: `Pour ton Mac`, h1_1: `N'écris plus.`, h1_2: `Parle, c'est tout.`,
        sub: `Tu ne touches plus le clavier. Dis-le à voix haute — VText l'écrit pour toi, propre et ponctué.`,
        download: `Télécharger pour Mac`, metaFree: `Gratuit`, metaRest: `· pour Mac`,
      },
      demo: {
        appName: `Messages`, file: `Fichier`, edit: `Édition`, view: `Présentation`, contact: `Alex`, online: `en ligne`,
        incoming: `Tu as vu le plan ?`, placeholder: `Message`, badge: `Court`,
        listening: `À l'écoute…`, cleaning: `Nettoyage`, raw: `Tu as dit`,
        rawText: `euh, en fait, je me disais qu'on pourrait peut-être décaler la réunion à jeudi après-midi si ça te va, parce que les matins c'est un peu la folie en ce moment`,
        cleanText: `On décale la réunion à jeudi après-midi ? Le matin je suis pris.`,
      },
      modes: {
        tag: `Deux façons`, h2: `Dis-le comme ça vient.`,
        tH: `Chaque mot, sans faute`, tP: `Reçois exactement ce que tu as dit — bien orthographié et ponctué. Rien à corriger.`,
        sH: `Pars dans tous les sens, reçois du clair`, sP: `Parle aussi longtemps et en vrac que tu veux. VText fait court, simple et clair — parfait quand tes pensées filent.`,
        sYouSaid: `Tu as dit`, sSaidText: `euh on pourrait peut-être décaler la réunion à jeudi, si ça va, parce que les matins c'est la folie…`,
        sWrote: `Tu reçois`, sWroteText: `On décale la réunion à jeudi après-midi ? Le matin je suis pris.`,
        note: `Chaque façon a sa touche.`,
      },
      why: {
        tag: `Bon à savoir`, h2: `Simple, et jamais dans tes pattes.`,
        f1h: `Marche partout`, f1p: `Chat, e-mail, notes — partout où tu écris.`,
        f3h: `N'importe quelle langue`, f3p: `Parle dans la langue que tu veux.`,
        f4h: `Gratuit`, f4p: `Sans inscription. Télécharge, c'est tout.`,
        f5h: `Le tien reste tien`, f5p: `Tes mots ne sont ni gardés ni partagés.`,
      },
      cta: {
        h2: `Parle au lieu de taper.`, sub: `Prends VText et envoie ton prochain message d'un seul souffle.`,
        button: `Télécharger pour Mac`, fine: `Gratuit · pour Mac`,
      },
      footer: {
        note: `Parle. Reçois du texte. C'est tout.`,
        goodtoknow: `Pour Mac · gratuit pour l'instant.<br />Besoin d'aide ? Écris-nous dans l'app.`,
      },
    },

    de: {
      nav: { download: `Laden` },
      hero: {
        eyebrow: `Für deinen Mac`, h1_1: `Nicht tippen.`, h1_2: `Einfach sprechen.`,
        sub: `Du berührst keine Tastatur. Sag es einfach laut — VText schreibt es für dich, sauber und mit Satzzeichen.`,
        download: `Für Mac laden`, metaFree: `Kostenlos`, metaRest: `· für Mac`,
      },
      demo: {
        appName: `Nachrichten`, file: `Ablage`, edit: `Bearbeiten`, view: `Darstellung`, contact: `Alex`, online: `online`,
        incoming: `Hast du den Plan gesehen?`, placeholder: `Nachricht`, badge: `Kurz`,
        listening: `Höre zu…`, cleaning: `Räume auf`, raw: `Du sagtest`,
        rawText: `ähm, also, ich hab gedacht, vielleicht könnten wir das Meeting auf Donnerstagnachmittag schieben, wenn's passt, weil die Vormittage bei mir grad echt verrückt sind`,
        cleanText: `Können wir das Meeting auf Donnerstagnachmittag schieben? Vormittags bin ich busy.`,
      },
      modes: {
        tag: `Zwei Wege`, h2: `Sag es, wie es kommt.`,
        tH: `Jedes Wort, keine Tippfehler`, tP: `Bekomm genau das, was du gesagt hast — richtig geschrieben, mit Satzzeichen. Du korrigierst nichts.`,
        sH: `Drauflosreden, Klarheit bekommen`, sP: `Red so lang und wirr, wie du willst. VText macht's kurz, einfach und klar — ideal, wenn die Gedanken rasen.`,
        sYouSaid: `Du sagtest`, sSaidText: `ähm vielleicht könnten wir das Meeting auf Donnerstag schieben, wenn's passt, weil die Vormittage verrückt sind…`,
        sWrote: `Du bekommst`, sWroteText: `Können wir das Meeting auf Donnerstagnachmittag schieben? Vormittags bin ich busy.`,
        note: `Jeder Weg hat seine eigene Taste.`,
      },
      why: {
        tag: `Gut zu wissen`, h2: `Einfach, und nie im Weg.`,
        f1h: `Läuft überall`, f1p: `Chat, E-Mail, Notizen — wo du tippst.`,
        f3h: `Jede Sprache`, f3p: `Sprich in der Sprache, die du willst.`,
        f4h: `Kostenlos`, f4p: `Keine Anmeldung. Einfach laden und los.`,
        f5h: `Deins bleibt deins`, f5p: `Deine Worte werden nicht gespeichert oder geteilt.`,
      },
      cta: {
        h2: `Sprich statt zu tippen.`, sub: `Hol dir VText und schick deine nächste Nachricht in einem Atemzug.`,
        button: `Für Mac laden`, fine: `Kostenlos · für Mac`,
      },
      footer: {
        note: `Sprich. Bekomm Text. Fertig.`,
        goodtoknow: `Für Mac · vorerst kostenlos.<br />Hilfe? Schreib uns einfach in der App.`,
      },
    },

    pt: {
      nav: { download: `Baixar` },
      hero: {
        eyebrow: `Para o seu Mac`, h1_1: `Não digite.`, h1_2: `É só falar.`,
        sub: `Você não toca no teclado. É só falar em voz alta — o VText escreve por você, limpo e com pontuação.`,
        download: `Baixar para Mac`, metaFree: `Grátis`, metaRest: `· para Mac`,
      },
      demo: {
        appName: `Mensagens`, file: `Arquivo`, edit: `Editar`, view: `Visualizar`, contact: `Alex`, online: `online`,
        incoming: `Viu o plano?`, placeholder: `Mensagem`, badge: `Curto`,
        listening: `Ouvindo…`, cleaning: `Limpando`, raw: `Você disse`,
        rawText: `é, ó, eu tava pensando que talvez a gente pudesse mudar a reunião pra quinta à tarde se der, porque as manhãs tão uma loucura pra mim agora`,
        cleanText: `A gente muda a reunião pra quinta à tarde? De manhã eu tô ocupado.`,
      },
      modes: {
        tag: `Dois jeitos`, h2: `Fale como vier.`,
        tH: `Cada palavra, sem erros`, tP: `Receba exatamente o que você disse — escrito certo e com pontuação. Você não corrige nada.`,
        sH: `Divague, receba clareza`, sP: `Fale o quanto e tão bagunçado quiser. O VText deixa curto, simples e claro — perfeito quando os pensamentos disparam.`,
        sYouSaid: `Você disse`, sSaidText: `é talvez a gente pudesse mudar a reunião pra quinta, se der, porque as manhãs tão uma loucura…`,
        sWrote: `Você recebe`, sWroteText: `A gente muda a reunião pra quinta à tarde? De manhã eu tô ocupado.`,
        note: `Cada jeito tem sua própria tecla.`,
      },
      why: {
        tag: `Bom saber`, h2: `Simples e fora do caminho.`,
        f1h: `Funciona em tudo`, f1p: `Chat, e-mail, notas — onde você escreve.`,
        f3h: `Qualquer idioma`, f3p: `Fale no idioma que quiser.`,
        f4h: `Grátis`, f4p: `Sem cadastro. Baixe e use.`,
        f5h: `O seu continua seu`, f5p: `Suas palavras não são salvas nem compartilhadas.`,
      },
      cta: {
        h2: `Fale em vez de digitar.`, sub: `Pegue o VText e mande sua próxima mensagem num só fôlego.`,
        button: `Baixar para Mac`, fine: `Grátis · para Mac`,
      },
      footer: {
        note: `Fale. Receba texto. Só isso.`,
        goodtoknow: `Para Mac · grátis por enquanto.<br />Precisa de ajuda? É só escrever pra gente no app.`,
      },
    },

    zh: {
      nav: { download: `下载` },
      hero: {
        eyebrow: `为你的 Mac`, h1_1: `别打字。`, h1_2: `开口说就好。`,
        sub: `你不用碰键盘。只要说出来——VText 替你写好，干净又带标点。`,
        download: `下载 Mac 版`, metaFree: `免费`, metaRest: `· 用于 Mac`,
      },
      demo: {
        appName: `信息`, file: `文件`, edit: `编辑`, view: `显示`, contact: `Alex`, online: `在线`,
        incoming: `看到计划了吗？`, placeholder: `输入消息`, badge: `简短`,
        listening: `正在听…`, cleaning: `整理中`, raw: `你说`,
        rawText: `呃，就是，我在想我们能不能把会议挪到周四下午，如果方便的话，因为我最近上午特别忙`,
        cleanText: `能把会议改到周四下午吗？我上午挺忙的。`,
      },
      modes: {
        tag: `两种方式`, h2: `怎么说出来都行。`,
        tH: `每个字，零错别字`, tP: `你说什么就出什么——拼写正确、带标点。你一个字都不用改。`,
        sH: `尽管啰嗦，结果清楚`, sP: `想说多久、多乱都行。VText 帮你变得又短又简单又清楚——思绪飞快时最合适。`,
        sYouSaid: `你说`, sSaidText: `呃我们能不能把会议挪到周四，如果行的话，因为上午太忙了……`,
        sWrote: `你得到`, sWroteText: `能把会议改到周四下午吗？我上午挺忙的。`,
        note: `每种方式都有自己的键。`,
      },
      why: {
        tag: `小提示`, h2: `简单，不碍事。`,
        f1h: `哪儿都能用`, f1p: `聊天、邮件、笔记——你打字的地方都行。`,
        f3h: `任何语言`, f3p: `想用哪种语言就用哪种。`,
        f4h: `免费`, f4p: `无需注册。下载就能用。`,
        f5h: `你的还是你的`, f5p: `你的话不会被保存，也不会外传。`,
      },
      cta: {
        h2: `用说的，别打字。`, sub: `装上 VText，一口气发出下一条消息。`,
        button: `下载 Mac 版`, fine: `免费 · 用于 Mac`,
      },
      footer: {
        note: `说话。拿到文字。就这么简单。`,
        goodtoknow: `用于 Mac · 目前免费。<br />需要帮助？在应用里直接给我们留言。`,
      },
    },

    ja: {
      nav: { download: `ダウンロード` },
      hero: {
        eyebrow: `あなたの Mac に`, h1_1: `打たない。`, h1_2: `話すだけ。`,
        sub: `キーボードには触れません。声に出すだけで——VText がきれいに、句読点つきで書いてくれます。`,
        download: `Mac 版をダウンロード`, metaFree: `無料`, metaRest: `· Mac 用`,
      },
      demo: {
        appName: `メッセージ`, file: `ファイル`, edit: `編集`, view: `表示`, contact: `Alex`, online: `オンライン`,
        incoming: `予定、見てくれた？`, placeholder: `メッセージ`, badge: `短く`,
        listening: `聞いています…`, cleaning: `整えています`, raw: `あなたの発話`,
        rawText: `えっと、あの、思ったんだけど、もし大丈夫なら会議を木曜の午後にずらせないかな、今って午前中がすごくバタバタしてて`,
        cleanText: `会議を木曜の午後に移せますか？午前中は忙しいです。`,
      },
      modes: {
        tag: `二つの方法`, h2: `出てきたまま話せばいい。`,
        tH: `一言一句、誤字なし`, tP: `話したとおりそのまま——正しく、句読点つき。直す手間はゼロ。`,
        sH: `とりとめなく話しても、すっきり`, sP: `どれだけ長く、ぐちゃぐちゃに話してもOK。VText が短く、シンプルに、分かりやすく——考えが先走るときにぴったり。`,
        sYouSaid: `あなたの発話`, sSaidText: `えっと、もし大丈夫なら会議を木曜にずらせないかな、午前中バタバタしてて…`,
        sWrote: `こう届く`, sWroteText: `会議を木曜の午後に移せますか？午前中は忙しいです。`,
        note: `それぞれに専用のキー。`,
      },
      why: {
        tag: `覚えておくと便利`, h2: `シンプルで、邪魔しない。`,
        f1h: `どこでも使える`, f1p: `チャット、メール、メモ——打つ場所ならどこでも。`,
        f3h: `どんな言語でも`, f3p: `好きな言語で話せます。`,
        f4h: `無料`, f4p: `登録なし。ダウンロードしてすぐ。`,
        f5h: `あなたのものはあなたに`, f5p: `話した言葉は保存も共有もしません。`,
      },
      cta: {
        h2: `打つより、話す。`, sub: `VText を入れて、次のメッセージをひと息で。`,
        button: `Mac 版をダウンロード`, fine: `無料 · Mac 用`,
      },
      footer: {
        note: `話す。文字になる。それだけ。`,
        goodtoknow: `Mac 用 · 今のところ無料。<br />困ったら、アプリから気軽にメッセージを。`,
      },
    },

    ar: {
      nav: { download: `تنزيل` },
      hero: {
        eyebrow: `لجهاز Mac الخاص بك`, h1_1: `لا تكتب.`, h1_2: `فقط تحدّث.`,
        sub: `لن تلمس لوحة المفاتيح. قُلها بصوتٍ عالٍ فقط — يكتبها VText نيابةً عنك، نظيفة ومع الترقيم.`,
        download: `تنزيل لـ Mac`, metaFree: `مجاناً`, metaRest: `· لـ Mac`,
      },
      demo: {
        appName: `الرسائل`, file: `ملف`, edit: `تحرير`, view: `عرض`, contact: `أليكس`, online: `متصل`,
        incoming: `هل رأيت الخطة؟`, placeholder: `رسالة`, badge: `مختصر`,
        listening: `يستمع…`, cleaning: `يُنقّح`, raw: `قلت`,
        rawText: `يعني، آه، كنت أفكّر ربما ننقل الاجتماع إلى بعد ظهر الخميس إن ناسبك، لأن صباحاتي مزدحمة جداً هذه الفترة`,
        cleanText: `هل ننقل الاجتماع إلى بعد ظهر الخميس؟ صباحاً أكون مشغولاً.`,
      },
      modes: {
        tag: `طريقتان`, h2: `قُلها كيفما جاءت.`,
        tH: `كل كلمة، دون أخطاء`, tP: `احصل تماماً على ما قلته — بإملاء صحيح وترقيم. لا تصحّح شيئاً.`,
        sH: `استرسل، واحصل على الوضوح`, sP: `تحدّث بأي طول وفوضى تشاء. يجعله VText قصيراً وبسيطاً وواضحاً — مثالي حين تتسابق أفكارك.`,
        sYouSaid: `قلت`, sSaidText: `يعني ربما ننقل الاجتماع إلى الخميس إن ناسب، لأن الصباحات مزدحمة…`,
        sWrote: `تحصل على`, sWroteText: `هل ننقل الاجتماع إلى بعد ظهر الخميس؟ صباحاً أكون مشغولاً.`,
        note: `لكل طريقة زرّها الخاص.`,
      },
      why: {
        tag: `معلومة مفيدة`, h2: `بسيط ولا يعترض طريقك.`,
        f1h: `يعمل في أي مكان`, f1p: `دردشة، بريد، ملاحظات — أينما تكتب.`,
        f3h: `أي لغة`, f3p: `تحدّث باللغة التي تريدها.`,
        f4h: `مجاني`, f4p: `بلا تسجيل. نزّله وابدأ.`,
        f5h: `ما لك يبقى لك`, f5p: `كلماتك لا تُحفَظ ولا تُشارَك.`,
      },
      cta: {
        h2: `تحدّث بدل أن تكتب.`, sub: `احصل على VText وأرسل رسالتك التالية بنفَسٍ واحد.`,
        button: `تنزيل لـ Mac`, fine: `مجاني · لـ Mac`,
      },
      footer: {
        note: `تحدّث. احصل على نصّ. هذا كل شيء.`,
        goodtoknow: `لـ Mac · مجاني حالياً.<br />تحتاج مساعدة؟ راسلنا من داخل التطبيق.`,
      },
    },
  };

  function getKey(obj, path) {
    return path.split(".").reduce((o, k) => (o == null ? undefined : o[k]), obj);
  }

  function applyLang(code) {
    const dict = I18N[code] || I18N.en;
    const en = I18N.en;
    document.documentElement.lang = code;
    document.documentElement.dir = code === "ar" ? "rtl" : "ltr";

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const k = el.getAttribute("data-i18n");
      const v = getKey(dict, k);
      el.innerHTML = v != null ? v : (getKey(en, k) || el.innerHTML);
    });

    window.__VT_DEMO = {
      placeholder: dict.demo.placeholder, badge: dict.demo.badge,
      listening: dict.demo.listening, cleaning: dict.demo.cleaning,
      rawText: dict.demo.rawText, cleanText: dict.demo.cleanText,
    };

    const cur = document.getElementById("lang-cur");
    const meta = LANGS.find((l) => l.code === code);
    if (cur && meta) cur.textContent = meta.short;
    document.querySelectorAll(".lang-opt").forEach((o) => {
      o.classList.toggle("active", o.dataset.code === code);
    });

    try { localStorage.setItem("vtext_lang", code); } catch (e) {}
    document.dispatchEvent(new CustomEvent("vt-lang", { detail: code }));
  }

  function detectLang() {
    let saved;
    try { saved = localStorage.getItem("vtext_lang"); } catch (e) {}
    if (saved && I18N[saved]) return saved;
    const navs = navigator.languages || [navigator.language || "en"];
    for (const l of navs) {
      const code = (l || "").slice(0, 2).toLowerCase();
      if (I18N[code]) return code;
    }
    return "en";
  }

  function buildSwitcher() {
    const menu = document.getElementById("lang-menu");
    const lang = document.getElementById("lang");
    const btn = document.getElementById("lang-btn");
    if (!menu || !lang || !btn) return;

    LANGS.forEach((l) => {
      const opt = document.createElement("button");
      opt.className = "lang-opt";
      opt.dataset.code = l.code;
      opt.setAttribute("role", "menuitem");
      opt.innerHTML = `<span>${l.label}</span><span class="tick">✓</span>`;
      opt.addEventListener("click", () => {
        applyLang(l.code);
        lang.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
      });
      menu.appendChild(opt);
    });

    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const open = lang.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.addEventListener("click", (e) => {
      if (!lang.contains(e.target)) {
        lang.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
      }
    });
  }

  function init() {
    buildSwitcher();
    applyLang(detectLang());
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
