'use strict';
// Demo catalogue: replace these models, illustrations and video sources with production assets.

// -----------------------------------------------------------------------------
// 01. Product data: model, short description, and image filename (with extension)
// -----------------------------------------------------------------------------
const products = [
  ['G-600L', 'Start mixing with dual decks', 'keyb.png'],
  ['G-600LA', 'Find your signature sound', 'g600al.png'],
  ['G900', 'Create beats at your fingertips', 'g900.png'],
  ['FreedomSolo', 'Discover FreedomSolo', 'FreedomSolo.png'],
  ['StageRocker2', 'Discover StageRocker2', 'StageRocker2.png'],
  ['MIC-01', 'Capture every vocal detail', 'mic.svg'],
  ['PARTY-12', 'Bring your party to life', 'speaker.svg'],
  ['KEY-49', 'Let every chord flow', 'keys.svg'],
  ['MIX-4', 'Shape your mix with ease', 'mixer.svg'],
  ['LIVE-02', 'Two mics. One shared moment.', 'duo.svg'],
].map(([model, description, image]) => ({
  model,
  description,
  image: `assets/${image}`
}));

// -----------------------------------------------------------------------------
// 02. Category names and image paths
// -----------------------------------------------------------------------------
const categoryNames = ['Keyboard', 'Drum', 'DRUMS', 'MICS', 'KARAOKE'];
// Replace each path with the image for the matching category.
const categoryImages = [
  'assets/keyb.png', // Keyboard
  'assets/StageRocker2.png', // Drum
  'assets/category-placeholder.svg', // DRUMS
  'assets/category-placeholder.svg', // MICS
  'assets/category-placeholder.svg', // KARAOKE
];

// Edit these model lists to move products between categories.
// Categories without a group show the full demo catalogue for scrolling tests.
const productModelsByCategory = {
  Keyboard: ['G-600L', 'G-600LA', 'G900'],
  Drum: ['FreedomSolo', 'StageRocker2'],
};

function getCategoryProducts() {
  const models = productModelsByCategory[getCategoryName()];
  if (!models) return products;
  return products.filter(product => models.includes(product.model));
}

function getCategoryName() {
  return categoryNames[state.category % categoryNames.length];
}

function getSelectedProduct() {
  return getCategoryProducts()[state.product];
}
// Provide src/poster for real clips. Empty src keeps the clearly labelled animated layout preview.

// -----------------------------------------------------------------------------
// 03. Video data: set src to load a real video
// -----------------------------------------------------------------------------
// Each model has its own playlist. Add or remove entries inside its array.
// Set src to a path such as "vo/your-video.mp4"; empty src shows a preview.
// Set poster to an optional thumbnail image path. Duration is edited manually.
const clipsByProduct = {
  "FreedomSolo": [
    {
      title: 'FreedomSolo demo',
      duration: '00:48',
      src: 'vo/FreedomSolo_EN_10MB.mp4',
      poster: 'assets/FreedomSolo.png'
    }
  ],
  "StageRocker2": [
    {
      title: 'StageRocker2 demo',
      duration: '00:38',
      src: 'vo/Stage Rocker 2 DJ_2_HD.mp4',
      poster: 'assets/StageRocker2.png'
    }
  ],
  "G-600L": [
    {
      title: 'G-600L demo',
      duration: '01:11',
      src: 'vo/G600L_PACK_EN_10MB.mp4',
      poster: 'assets/keyb.png'
    }
  ],
  "G-600LA": [
    {
      title: 'G-600LA demo',
      duration: '00:58',
      src: 'vo/G600LA_ENHD.mp4',
      poster: 'assets/g600al.png'
    }
  ],
  "G900": [
    {
      title: 'G900 demo',
      duration: '01:13',
      src: 'vo/G900_EN_10MB.mp4',
      poster: 'assets/g900.png'
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
  const product = getSelectedProduct();
  if (!product) return [];
  const model = product.model;
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
    ? (getProductClips()[state.clip]?.src ? 'Playing' : 'Preview playing')
    : 'Paused · Tap to play';
}

async function play() {
  if (!getSelectedProduct()) return;
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
  const product = getSelectedProduct();
  const clip = getProductClips()[state.clip];
  ++playbackRequest;
  player.pause();
  $('.play-toggle').disabled = !product;
  if (!product) {
    player.removeAttribute('src');
    player.load();
    player.hidden = true;
    $('.preview').hidden = true;
    $('#player-title').textContent = 'No products in this category';
    updatePlayback(false);
    $('#play-status').textContent = 'Choose another category';
    return;
  }
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
        <img src="${clip.poster || getSelectedProduct().image}" alt="" draggable="false">
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
// Repeat the five categories to keep ten cards available for scrolling tests.
for (let index = 0; index < categoryNames.length * 2; index++) {
  const type = index % categoryNames.length;
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'category';
  button.innerHTML = `
    <img
      class="category-image"
      src="${categoryImages[type]}"
      alt=""
      draggable="false"
    >
    <span class="category-label">
      ${categoryNames[type]}${index >= categoryNames.length ? '<small>02</small>' : ''}
    </span>
  `;
  button.addEventListener('click', () => {
    state.category = index;
    state.product = 0;
    state.clip = 0;
    select(categories, index);
    renderProducts();
    videoRail.scrollLeft = 0;
    renderVideos();
    loadClip();
  });
  categories.append(button);
}
function renderProducts() {
  productRail.replaceChildren();
  const visibleProducts = getCategoryProducts();
  $('#products-title').innerHTML = `${getCategoryName()} <span>Featured products</span>`;
  $('#product-count').textContent = `${visibleProducts.length} ${visibleProducts.length === 1 ? 'product' : 'products'}`;
  productRail.scrollLeft = 0;
  getCategoryProducts().forEach((product, index) => {
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
  select(productRail, state.product);
}

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
  if (getProductClips()[state.clip]?.src) updatePlayback(false);
});

player.addEventListener('error', () => {
  if (getProductClips()[state.clip]?.src) {
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
renderProducts();
renderVideos();
updateVolume();
// Load the product video only after the welcome screen has been dismissed.
const welcomeScreen = $('#welcome-screen');
const welcomeVideo = $('#welcome-video');
const enterSite = $('#enter-site');
const homepage = $('#homepage');

function enterHomepage() {
  if (welcomeScreen.hidden) return;

  welcomeScreen.hidden = true;
  welcomeVideo.pause();
  welcomeVideo.removeAttribute('autoplay');
  homepage.hidden = false;
  loadClip();
  categories.querySelector('button')?.focus({ preventScroll: true });
  window.scrollTo(0, 0);
}

enterSite.addEventListener('click', enterHomepage);
// The entry button remains usable even if autoplay is blocked or the video fails.
welcomeVideo.muted = true;
welcomeVideo.play().catch(() => {});
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

// Fit the 1080 x 1920 portrait canvas without stretching its proportions.
function resizePortraitCanvas() {
  const scale = Math.min(window.innerWidth / 1080, window.innerHeight / 1920, 1);
  document.documentElement.style.setProperty('--kiosk-scale', scale);
}

resizePortraitCanvas();
window.addEventListener('resize', resizePortraitCanvas);
