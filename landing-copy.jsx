// Kelappa Landing — bilingual copy

const { useState, useEffect, useRef } = React;

const COPY = {
  en: {
    nav: { apps: 'Apps', principles: 'Principles', contact: 'Contact' },
    hero: {
      eyebrow: 'Kelappa · Bali',
      h_pre: 'Calm apps for',
      h_hl: 'restless minds',
      h_post: '.',
      sub: 'We make small, considered software for Mac and iPhone — designed for people whose attention does not arrive on schedule. We build for ADHD brains, and the people who love them.',
      cta_primary: 'See the apps',
      cta_secondary: 'Read the manifesto',
      strip_label: 'Available now',
    },
    manifesto: {
      eyebrow: 'Why we exist',
      h: 'The world is loud. Software does not have to be.',
      p1: 'Most apps are built to capture you — streaks, notifications, autoplay, infinite feeds. For a restless brain, that is not a tool. That is another thing to manage.',
      p2: 'We grew up with ADHD. We know what it costs when an app punishes a missed day, or hides what you typed, or asks one more question before saving. So we make the other kind.',
      p3: 'Small apps. Quiet by default. They wait. They remember. They never make you feel behind.',
    },
    principles: {
      eyebrow: 'How we build',
      h: 'Six rules we will not break.',
      items: [
        { n: '01', title: 'One thing per screen', body: 'A screen asks for one decision. Never two, never a sidebar of seventeen.' },
        { n: '02', title: 'No streaks, no shame', body: 'Skipped Tuesday? The app does not notice. Habits are kept, not enforced.' },
        { n: '03', title: 'Always saved', body: 'Type anywhere. Close anywhere. It is there when you come back.' },
        { n: '04', title: 'Quiet by default', body: 'Zero notifications until you ask. No badges. No little red dots.' },
        { n: '05', title: 'Predictable shape', body: 'The thing in the top-left is the thing in the top-left. Every time. Forever.' },
        { n: '06', title: 'Made for the worst day', body: 'If it works on a foggy Monday, it works on any day.' },
      ],
    },
    apps: {
      eyebrow: 'Our apps',
      h: 'Small tools that get out of your way.',
      sub: 'Each one removes one piece of daily friction that an ADHD brain runs into ten times a day. All of them are available now.',
      items: [
        {
          name: 'CCV', sub: 'the notch · file portal',
          tagline: 'Drop a file in your notch. Pick it up anywhere.',
          desc: 'The MacBook notch becomes a parking spot for files. Drag something in. Walk to another screen. Drag it out. No AirDrop dance, no "where did I save that".',
          platforms: ['macOS'],
          status: 'Available',
        },
        {
          name: 'VText', sub: 'voice → text, anywhere',
          tagline: 'Hold two keys. Speak. Paste.',
          desc: 'Press ⌘⇧, say what you mean, release. The text lands wherever your cursor is. Ask the AI to shorten it, soften it, or translate it — then paste.',
          platforms: ['macOS'],
          status: 'Available',
        },
        {
          name: 'FloFi', sub: 'finance, gently',
          tagline: 'Money you can actually look at.',
          desc: 'Track and plan your money without the spreadsheet panic. Calm categories, no judgement, no scary red. Built for brains that forget Tuesday existed.',
          platforms: ['iOS', 'macOS'],
          status: 'Available',
        },
        {
          name: 'Switcher', sub: 'ru / en · keyboard',
          tagline: 'Wrong layout? Already fixed.',
          desc: 'Typed "руддщ" when you meant "hello"? Switcher notices, swaps the layout, and rewrites the word. You never have to retype, or hunt for the menu bar icon again.',
          platforms: ['macOS'],
          status: 'Available',
        },
        {
          name: 'Teleprompter', sub: 'read · stay on camera',
          tagline: 'Read it aloud. Nobody can tell.',
          desc: 'Drop your text in, mount your phone or tablet in a teleprompter rig, and read at your own pace while looking straight into the lens. Long scripts, talking-head videos, podcasts — without memorising a word.',
          platforms: ['Web'],
          status: 'Available',
        },
        {
          name: 'Telesufler', sub: 'floating script · for your eyes only',
          tagline: 'Your script. Hidden when you share.',
          desc: 'Park a small window just under your built-in camera and read from it while looking into the lens. It floats over Zoom and Meet — and when you turn screen sharing on, viewers never see it. Toggle hide with ⌥⇧.',
          platforms: ['macOS'],
          status: 'Available',
        },
      ],
      cta: 'Open',
    },
    cta: {
      eyebrow: 'Begin',
      h_pre: 'Try',
      h_hl: 'one app',
      h_post: ' today.',
      sub: 'You do not have to commit. Open it once. Use it for the one thing it does. See if it stays out of your way.',
      btn: 'See all apps',
    },
    footer: {
      tag: 'A small studio crafting calm apps for Apple platforms.',
      cols: [
        { h: 'Apps', l: ['CCV', 'VText', 'FloFi', 'Switcher', 'Teleprompter', 'Telesufler'] },
      ],
      legal: '© 2026 Kelappa · Made slowly in Ubud · kelappa.studio',
    },
  },

  ru: {
    nav: { apps: 'Приложения', principles: 'Принципы', contact: 'Контакты' },
    hero: {
      eyebrow: 'Kelappa · Бали',
      h_pre: 'Спокойные приложения для',
      h_hl: 'беспокойных умов',
      h_post: '.',
      sub: 'Мы делаем маленькие, продуманные приложения для Mac и iPhone — для людей, чьё внимание приходит не по расписанию. Мы делаем для мозгов с СДВГ и тех, кто их любит.',
      cta_primary: 'Посмотреть приложения',
      cta_secondary: 'Манифест',
      strip_label: 'Уже доступно',
    },
    manifesto: {
      eyebrow: 'Зачем мы',
      h: 'Мир громкий. Софт не обязан.',
      p1: 'Большинство приложений пытаются вас захватить — стрики, уведомления, автоплей, бесконечные ленты. Для беспокойного мозга это не инструмент. Это ещё одна вещь, которой надо управлять.',
      p2: 'Мы выросли с СДВГ. Мы знаем цену, когда приложение наказывает за пропущенный день, прячет то, что вы напечатали, или задаёт ещё один вопрос перед сохранением. Поэтому мы делаем другие.',
      p3: 'Маленькие. Тихие по умолчанию. Они ждут. Они помнят. Они никогда не дадут вам почувствовать, что вы отстали.',
    },
    principles: {
      eyebrow: 'Как мы строим',
      h: 'Шесть правил, которые мы не нарушим.',
      items: [
        { n: '01', title: 'Одна задача на экран', body: 'Экран просит одно решение. Никогда два, никогда сайдбар из семнадцати.' },
        { n: '02', title: 'Без стриков, без стыда', body: 'Пропустили вторник? Приложение этого не заметит. Привычки храним, а не охраняем.' },
        { n: '03', title: 'Всё всегда сохранено', body: 'Печатайте где угодно. Закройте где угодно. Это будет здесь, когда вы вернётесь.' },
        { n: '04', title: 'Тихо по умолчанию', body: 'Ноль уведомлений, пока вы их не попросите. Нет бейджей. Нет красных точек.' },
        { n: '05', title: 'Предсказуемая форма', body: 'То, что в левом верхнем углу — там и есть. Каждый раз. Всегда.' },
        { n: '06', title: 'Для худшего дня', body: 'Если работает в туманный понедельник — работает в любой день.' },
      ],
    },
    apps: {
      eyebrow: 'Наши приложения',
      h: 'Маленькие инструменты, которые не мешают.',
      sub: 'Каждый убирает одну ежедневную точку трения, в которую мозг с СДВГ упирается десять раз в день. Все уже доступны.',
      items: [
        {
          name: 'CCV', sub: 'портал в чёлке',
          tagline: 'Бросьте файл в чёлку. Заберите где угодно.',
          desc: 'Чёлка MacBook — быстрая парковка для файлов. Затащите внутрь. Перейдите на другой экран. Вытащите. Без AirDrop, без «куда я это сохранил».',
          platforms: ['macOS'],
          status: 'Доступно',
        },
        {
          name: 'VText', sub: 'голос → текст',
          tagline: 'Две клавиши. Говорите. Вставьте.',
          desc: 'Зажмите ⌘⇧, скажите что хотели, отпустите. Текст появляется там, где курсор. Попросите ИИ сократить, смягчить, перевести — и вставьте.',
          platforms: ['macOS'],
          status: 'Доступно',
        },
        {
          name: 'FloFi', sub: 'финансы, мягко',
          tagline: 'Деньги, на которые не страшно смотреть.',
          desc: 'Учёт и планирование без табличной паники. Спокойные категории, ноль осуждения, никакого пугающего красного. Для мозгов, которые забывают, что вторник был.',
          platforms: ['iOS', 'macOS'],
          status: 'Доступно',
        },
        {
          name: 'Switcher', sub: 'ru / en · раскладка',
          tagline: 'Не та раскладка? Уже исправлено.',
          desc: 'Написали «руддщ» вместо «hello»? Switcher заметит, переключит раскладку и перепишет слово. Никогда больше не перенабирать и не искать иконку в менюбаре.',
          platforms: ['macOS'],
          status: 'Доступно',
        },
        {
          name: 'Teleprompter', sub: 'читайте · смотрите в камеру',
          tagline: 'Читайте вслух. Никто не догадается.',
          desc: 'Загрузите текст, положите телефон или планшет в подставку-суфлёр перед камерой и читайте в своём темпе, глядя прямо в объектив. Длинные сценарии, говорящая голова, подкасты — без зубрёжки.',
          platforms: ['Web'],
          status: 'Доступно',
        },
        {
          name: 'Telesufler', sub: 'плавающее окно · видно только вам',
          tagline: 'Текст под камерой. Никто не увидит.',
          desc: 'Поставьте маленькое окно прямо под встроенной камерой и читайте, глядя в объектив. Окно держится поверх Zoom и Meet — а когда вы включаете демонстрацию экрана, собеседники его не видят. Скрыть/показать — ⌥⇧.',
          platforms: ['macOS'],
          status: 'Доступно',
        },
      ],
      cta: 'Открыть',
    },
    cta: {
      eyebrow: 'Начать',
      h_pre: 'Попробуйте',
      h_hl: 'одно приложение',
      h_post: ' сегодня.',
      sub: 'Не нужно обещать себе ничего. Откройте один раз. Используйте для одной вещи, которую оно делает. Посмотрите, не мешает ли оно.',
      btn: 'Все приложения',
    },
    footer: {
      tag: 'Маленькая студия, делающая спокойные приложения для платформ Apple.',
      cols: [
        { h: 'Приложения', l: ['CCV', 'VText', 'FloFi', 'Switcher', 'Teleprompter', 'Telesufler'] },
      ],
      legal: '© 2026 Kelappa · Сделано медленно в Убуде · kelappa.studio',
    },
  },
};

Object.assign(window, { COPY });
