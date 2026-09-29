'use strict';
// Demo catalogue: replace these models, illustrations and video sources with production assets.

// -----------------------------------------------------------------------------
// 01. Product data: model, short description, and asset name
// -----------------------------------------------------------------------------
const products = [
['DJ-200', 'Start mixing with dual decks', 'dj'],
['SYN-37', 'Find your signature sound', 'synth'],
['BEAT-8', 'Create beats at your fingertips', 'pad'],
['MIC-01', 'Capture every vocal detail', 'mic'],
['PARTY-12', 'Bring your party to life', 'speaker'],
['KEY-49', 'Let every chord flow', 'keys'],
['MIX-4', 'Shape your mix with ease', 'mixer'],
['LIVE-02', 'Two mics. One shared moment.', 'duo'],
].map(([model, description, image]) => ({
  model,
  description,
  image: `assets/${image}.svg`
}));

// -----------------------------------------------------------------------------
// 02. Category names and SVG icons
// -----------------------------------------------------------------------------
const categoryNames = ['DEEJAY', 'SYNTH', 'DRUMS', 'MICS', 'KARAOKE'];
const iconPaths = [
'<rect x="3" y="7" width="34" height="25" rx="3"/><circle cx="12" cy="19" r="6"/><circle cx="28" cy="19" r="6"/><path d="M19 11v16m3-16v16M7 28h7m12 0h7"/>',
'<rect x="3" y="9" width="34" height="23" rx="3"/><path d="M3 17h34M10 17v15m7-15v15m7-15v15m7-15v15M9 10v3m6-3v3m6-3v3"/>',
'<rect x="5" y="5" width="30" height="30" rx="4"/><path d="M15 5v30M25 5v30M5 15h30M5 25h30"/>',
'<rect x="14" y="3" width="12" height="23" rx="6"/><path d="M9 18v3a11 11 0 0 0 22 0v-3M20 32v6m-7 0h14M17 9h6m-6 5h6"/>',
'<rect x="6" y="3" width="28" height="34" rx="4"/><circle cx="20" cy="25" r="8"/><circle cx="20" cy="11" r="3"/><circle cx="20" cy="25" r="3"/>',
];
// Provide src/poster for real clips. Empty src keeps the clearly labelled animated layout preview.

// -----------------------------------------------------------------------------
// 03. Video data: set src to load a real video
// -----------------------------------------------------------------------------
// Each model has its own playlist. Add or remove entries inside its array.
// Set src to a path such as "vo/your-video.mp4"; empty src shows a preview.
// Set poster to an optional thumbnail image path. Duration is edited manually.
const clipsByProduct = {
  "DJ-200": [
    {
      "title": "Playbox demo",
      "duration": "00:05",
      "src": "vo/kling_20260929_VIDEO_PLAYBOX_st_4077_0.mp4"
    },
    {
      "title": "Feature tour",
      "duration": "Preview",
      "src": ""
    },
    {
      "title": "Live demo",
      "duration": "Preview",
      "src": ""
    }
  ],
  "SYN-37": [
    {
      "title": "Quick start",
      "duration": "Preview",
      "src": ""
    },
    {
      "title": "Feature tour",
      "duration": "Preview",
      "src": ""
    },
    {
      "title": "Live demo",
      "duration": "Preview",
      "src": ""
    }
  ],
  "BEAT-8": [
    {
      "title": "Quick start",
      "duration": "Preview",
      "src": ""
    },
    {
      "title": "Feature tour",
      "duration": "Preview",
      "src": ""
    },
    {
      "title": "Live demo",
      "duration": "Preview",
      "src": ""
    }
  ],
  "MIC-01": [
    {
      "title": "Quick start",
      "duration": "Preview",
      "src": ""
    },
    {
      "title": "Feature tour",
      "duration": "Preview",
      "src": ""
    },
    {
      "title": "Live demo",
      "duration": "Preview",
      "src": ""
    }
  ],
  "PARTY-12": [
    {
      "title": "Quick start",
      "duration": "Preview",
      "src": ""
    },
    {
      "title": "Feature tour",
      "duration": "Preview",
      "src": ""
    },
    {
      "title": "Live demo",
      "duration": "Preview",
      "src": ""
    }
  ],
  "KEY-49": [
    {
      "title": "Quick start",
      "duration": "Preview",
      "src": ""
    },
    {
      "title": "Feature tour",
      "duration": "Preview",
      "src": ""
    },
    {
      "title": "Live demo",
      "duration": "Preview",
      "src": ""
    }
  ],
  "MIX-4": [
    {
      "title": "Quick start",
      "duration": "Preview",
      "src": ""
    },
    {
      "title": "Feature tour",
      "duration": "Preview",
      "src": ""
    },
    {
      "title": "Live demo",
      "duration": "Preview",
      "src": ""
    }
  ],
  "LIVE-02": [
    {
      "title": "Quick start",
      "duration": "Preview",
      "src": ""
    },
    {
      "title": "Feature tour",
      "duration": "Preview",
      "src": ""
    },
    {
      "title": "Live demo",
      "duration": "Preview",
      "src": ""
    }
  ]
};

function getProductClips() {
  const model = products[state.product].model;
  const playlist = clipsByProduct[model];

  // Keep the preview usable if a model has no playlist or an empty playlist.
  return playlist?.length
    ? playlist
    : [{ title: 'Product preview', duration: 'Preview', src: '' }];
}

// -----------------------------------------------------------------------------
// 04. Page state and DOM elements
// -----------------------------------------------------------------------------
const state = {
  category: 0,
  product: 0,
  clip: 0,
  playing: true,
  volume: 70,
  muted: true,
};
const $ = selector => document.querySelector(selector);
const player = $('#player');
const categories = $('.categories');
const productRail = $('.products');
const videoRail = $('.videos');
let playbackRequest = 0;

// -----------------------------------------------------------------------------
// 05. Selection state and playback controls
// -----------------------------------------------------------------------------

function select(container, index) {
  [...container.children].forEach((button, i) => button.setAttribute('aria-pressed', String(i === index)));
}

function updatePlayback(playing) {
  state.playing = playing;
  $('.screen').classList.toggle('paused', !playing);
  $('.play-icon').textContent = playing ? 'Ⅱ' : '▶';
  $('.play-hint').textContent = playing ? 'Tap to pause' : 'Tap to play';
  $('.play-toggle').setAttribute('aria-label', playing ? 'Pause playback' : 'Start playback');
  $('#play-status').textContent = playing
    ? (getProductClips()[state.clip].src ? 'Playing' : 'Preview playing')
    : 'Paused · Tap to play';
}

async function play() {
  const request = ++playbackRequest;
  if (!getProductClips()[state.clip].src) {
    updatePlayback(true);
    return;
  }
  try {
    await player.play();
  } catch {
    if (request === playbackRequest) updatePlayback(false);
  }
}

function loadClip() {
  const product = products[state.product];
  const clip = getProductClips()[state.clip];
  ++playbackRequest;
  player.pause();
  $('#player-title').replaceChildren(document.createTextNode(product.model + ' '));
  const title = document.createElement('span');
  title.textContent = clip.title;
  $('#player-title').append(title);
  $('#preview-model').textContent = product.model;
  $('#preview-description').textContent = product.description;
  $('#preview-image').src = product.image;
  player.hidden = !clip.src;
  $('.preview').hidden = Boolean(clip.src);
  if (clip.src) {
    player.src = clip.src;
    player.poster = clip.poster || product.image;
  } else {
    player.removeAttribute('src');
    player.load();
  }
  select(videoRail, state.clip);
  play();
}

// -----------------------------------------------------------------------------
// 06. Build video, category, and product cards
// -----------------------------------------------------------------------------

function renderVideos() {
  videoRail.replaceChildren();
  getProductClips().forEach((clip, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'video-choice';
    button.innerHTML = `
      <span class="thumbnail">
        <img src="${clip.poster || products[state.product].image}" alt="" draggable="false">
        <span class="thumb-play" aria-hidden="true">▶</span>
        <span class="duration">${clip.duration}</span>
      </span>
      <span class="video-title">
        ${clip.title}<span>· ${clip.duration}</span>
      </span>
    `;
    button.addEventListener('click', () => {
      state.clip = index;
      loadClip();
    });
    videoRail.append(button);
  });
}
for (let index = 0; index < 10; index++) {
  const type = index % 5;
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'category';
  button.innerHTML = `
    <svg viewBox="0 0 40 40" aria-hidden="true">
      ${iconPaths[type]}
    </svg>
    <span class="category-label">
      ${categoryNames[type]}${index >= 5 ? '<small>02</small>' : ''}
    </span>
  `;
  button.addEventListener('click', () => {
    state.category = index;
    state.product = 0;
    state.clip = 0;
    select(categories, index);
    select(productRail, 0);
    $('#products-title').innerHTML = `${categoryNames[type]} <span>Featured products</span>`;
    productRail.scrollLeft = 0;
    renderVideos();
    loadClip();
  });
  categories.append(button);
}
products.forEach((product, index) => {
  const button = document.createElement('button');
  button.className = 'product';
  button.type = 'button';
  button.innerHTML = `
    <img src="${product.image}" alt="${product.model} product illustration" draggable="false">
    <span class="product-copy">
      <strong>${product.model}</strong>
      <span>${product.description}</span>
    </span>
  `;
  button.addEventListener('click', () => {
    state.product = index;
    state.clip = 0;
    select(productRail, index);
    renderVideos();
    loadClip();
  });
  productRail.append(button);
});

// -----------------------------------------------------------------------------
// 07. Player events
// -----------------------------------------------------------------------------
$('.play-toggle').addEventListener('click', () => {
  if (state.playing) {
    ++playbackRequest;
    player.pause();
    updatePlayback(false);
  } else play();
});

player.addEventListener('play', () => updatePlayback(true));
player.addEventListener('pause', () => {
  if (getProductClips()[state.clip].src) updatePlayback(false);
});

player.addEventListener('error', () => {
  if (getProductClips()[state.clip].src) {
    updatePlayback(false);
    $('#play-status').textContent = 'Unable to load video. Please choose another.';
  }
});

// -----------------------------------------------------------------------------
// 08. Volume and mute controls
// -----------------------------------------------------------------------------

function updateVolume() {
  player.volume = state.volume / 100;
  player.muted = state.muted;
  $('#volume').value = state.volume;
  $('#volume-value').value = state.muted ? 'Muted' : `${state.volume}%`;
  $('#mute').setAttribute('aria-pressed', String(state.muted));
  $('#mute').setAttribute('aria-label', state.muted ? 'Unmute' : 'Mute');
  $('#volume-down').disabled = state.volume === 0;
  $('#volume-up').disabled = state.volume === 100 && !state.muted;
}

function setVolume(value) {
  state.volume = Math.max(0, Math.min(100, value));
  state.muted = state.volume === 0;
  updateVolume();
}
$('#volume').addEventListener('input', event => setVolume(Number(event.target.value)));
$('#volume-down').addEventListener('click', () => setVolume(state.volume - 5));
$('#volume-up').addEventListener('click', () => setVolume(state.volume + 5));
$('#mute').addEventListener('click', () => {
  state.muted = !state.muted;
  if (!state.muted && state.volume === 0) state.volume = 70;
  updateVolume();
});
// Keyboard users can move through each horizontal rail without dragging.

// -----------------------------------------------------------------------------
// 09. Keyboard navigation
// -----------------------------------------------------------------------------
for (const rail of [categories, productRail, videoRail]) {
  rail.addEventListener('keydown', event => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    const buttons = [...rail.children];
    const current = buttons.indexOf(document.activeElement);
    if (current < 0) return;
    event.preventDefault();
    const next =
      event.key === 'Home'
        ? 0
        : event.key === 'End'
          ? buttons.length - 1
          : Math.max(
              0,
              Math.min(
                buttons.length - 1,
                current + (event.key === 'ArrowRight' ? 1 : -1),
              ),
            );
    buttons[next].focus();
  });
}

// -----------------------------------------------------------------------------
// 10. Initialize the page
// -----------------------------------------------------------------------------
select(categories, 0);
select(productRail, 0);
renderVideos();
updateVolume();
loadClip();
// Native touch/trackpad scrolling stays intact; mouse users can grab any card.

// -----------------------------------------------------------------------------
// 11. Mouse dragging: use a 6px threshold to prevent accidental clicks
// -----------------------------------------------------------------------------

function enableDragScroll(rail) {
  let gesture = null;
  let suppressClick = false;
  rail.addEventListener('pointerdown', event => {
    if (event.pointerType !== 'mouse' || event.button !== 0) return;
    suppressClick = false;
    gesture = {
      id: event.pointerId,
      x: event.clientX,
      scroll: rail.scrollLeft,
      dragging: false,
    };
  });
  rail.addEventListener('pointermove', event => {
    if (!gesture || event.pointerId !== gesture.id) return;
    const distance = event.clientX - gesture.x;
    if (!gesture.dragging && Math.abs(distance) < 6) return;
    if (!gesture.dragging) {
      gesture.dragging = true;
      suppressClick = true;
      rail.classList.add('is-dragging');
      rail.setPointerCapture(event.pointerId);
    }
    event.preventDefault();
    rail.scrollLeft = gesture.scroll - distance;
  });
  function endDrag(event) {
    if (!gesture || event.pointerId !== gesture.id) return;
    const id = gesture.id;
    gesture = null;
    rail.classList.remove('is-dragging');
    if (rail.hasPointerCapture(id)) rail.releasePointerCapture(id);
  }
  window.addEventListener('pointerup', endDrag);
  window.addEventListener('pointercancel', endDrag);
  rail.addEventListener('lostpointercapture', endDrag);
  rail.addEventListener('click', event => {
    if (suppressClick && event.detail !== 0) {
      event.preventDefault();
      event.stopImmediatePropagation();
      suppressClick = false;
    }
  }, true);
  rail.addEventListener('dragstart', event => event.preventDefault());
}
[categories, productRail, videoRail].forEach(enableDragScroll);
