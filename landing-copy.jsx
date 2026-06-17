// Kelappa Landing — copy (English)

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
};

Object.assign(window, { COPY });
