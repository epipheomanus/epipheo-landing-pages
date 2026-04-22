// Load ElevenLabs client dynamically (avoids ES module import that WP Rocket breaks)
let Conversation;
(function() {
  const script = document.createElement('script');
  script.type = 'module';
  script.textContent = `
    import { Conversation as C } from 'https://esm.sh/@11labs/client';
    window.__11labs_Conversation = C;
    window.dispatchEvent(new Event('11labs-ready'));
  `;
  document.head.appendChild(script);
  window.addEventListener('11labs-ready', () => {
    Conversation = window.__11labs_Conversation;
  });
})();

const AGENT_ID = 'agent_7501kp9xbx9tfr4vse9xpvmcw6av';

// ---- DOM refs ----
const chatFrame   = document.getElementById('chat');
const msgStage    = document.getElementById('msgStage');
const chatInput   = document.getElementById('chatInput');
const sendBtn     = document.getElementById('sendBtn');
const promptsEl   = document.getElementById('prompts'); // may be null if removed
const orb         = document.getElementById('orb'); // may be null if voice disabled
const voiceStatus = document.getElementById('voiceStatus'); // may be null if voice disabled
const statusDot   = document.getElementById('statusDot');
const modeBtns    = chatFrame ? chatFrame.querySelectorAll('.chat-mode button') : [];

// ---- State ----
let session          = null;
let currentMode      = 'text';
let voiceActive      = false;
let hasUserSentMsg   = false; // suppress agent greeting before first user msg
let volumeRafId      = null;

// ============================================================
// HUBSPOT QUOTE MODAL
// ============================================================
const HS_PORTAL_ID = '20864859';
const HS_FORM_ID   = 'e5f5b509-ffe1-46c3-8825-1154264756f7';
const HS_REGION    = 'na1';

let hsScriptLoaded   = false;
let hsScriptLoading  = false;
let modalEl          = null;

function loadHsScript() {
  return new Promise((resolve) => {
    if (hsScriptLoaded) { resolve(); return; }
    if (hsScriptLoading) {
      // Poll until loaded
      const poll = setInterval(() => {
        if (hsScriptLoaded) { clearInterval(poll); resolve(); }
      }, 80);
      return;
    }
    hsScriptLoading = true;
    const s = document.createElement('script');
    s.src = '//js.hsforms.net/forms/embed/v2.js';
    s.charset = 'utf-8';
    s.type = 'text/javascript'; // plain script so WP Rocket does NOT rewrite it
    s.onload = () => { hsScriptLoaded = true; resolve(); };
    s.onerror = () => { hsScriptLoading = false; resolve(); }; // resolve anyway, form will fail gracefully
    document.head.appendChild(s);
  });
}

function buildModal() {
  if (modalEl) return modalEl;

  const overlay = document.createElement('div');
  overlay.id = 'hs-quote-modal';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', 'Get a Quote');
  overlay.innerHTML = `
    <div class="hs-modal-card" id="hs-modal-card">
      <button class="hs-modal-close" id="hs-modal-close" aria-label="Close">&times;</button>
      <div class="hs-modal-header">
        <p class="hs-modal-eyebrow">Free Scope Call</p>
        <h2 class="hs-modal-title">Get a Quote</h2>
        <p class="hs-modal-sub">Tell us about your project. We'll respond within one business day.</p>
      </div>
      <div id="hs-form-target"></div>
    </div>
  `;

  document.body.appendChild(overlay);
  modalEl = overlay;

  // Close on backdrop click
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  // Close button
  document.getElementById('hs-modal-close').addEventListener('click', closeModal);

  // Close on Escape — scoped to check our own open state so it does NOT
  // interfere with the video lightbox's Escape handler
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('is-open')) closeModal();
  });

  return overlay;
}

let hsFormRendered = false;

async function openModal() {
  const modal = buildModal();
  modal.classList.add('is-open');
  document.body.style.overflow = 'hidden';

  // Load HubSpot embed script and render form once
  if (!hsFormRendered) {
    await loadHsScript();
    if (window.hbspt && window.hbspt.forms) {
      window.hbspt.forms.create({
        region:   HS_REGION,
        portalId: HS_PORTAL_ID,
        formId:   HS_FORM_ID,
        target:   '#hs-form-target',
        onFormSubmitted: () => {
          const target = document.getElementById('hs-form-target');
          if (target) {
            target.innerHTML = `
              <div class="hs-modal-success">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="24" cy="24" r="24" fill="#FF5F3C" opacity="0.15"/>
                  <path d="M14 24l8 8 12-16" stroke="#FF5F3C" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <h3>You're in.</h3>
                <p>We'll be in touch within one business day.</p>
              </div>
            `;
          }
        }
      });
      hsFormRendered = true;
    }
  }

  // Focus trap: focus the close button
  requestAnimationFrame(() => {
    document.getElementById('hs-modal-close')?.focus();
  });
}

function closeModal() {
  if (!modalEl) return;
  modalEl.classList.remove('is-open');
  document.body.style.overflow = '';
}

// ============================================================
// CTA BUTTON INTERCEPTION
// Targets:
//   - [data-scroll-chat] buttons (mid-cta, final CTA, footer)
//   - .btn-ghost.get-a-quote-btn (new nav button)
//   - .btn-primary in .nav-actions (existing nav CTA)
//   - Any element whose text contains "Scope My Project" or "Get a Quote"
// ============================================================
function interceptCTAs() {
  // data-scroll-chat buttons — replace scroll behavior with modal
  document.querySelectorAll('[data-scroll-chat]').forEach(el => {
    el.removeAttribute('data-scroll-chat');
    el.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
    el.dataset.hsCtaBound = '1';
  });

  // Explicit "Get a Quote" ghost button in nav
  document.querySelectorAll('.get-a-quote-btn').forEach(el => {
    if (el.dataset.hsCtaBound) return;
    el.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
    el.dataset.hsCtaBound = '1';
  });

  // Nav CTA button (.nav-actions .btn-primary) — also routes to modal
  document.querySelectorAll('.nav-actions .btn-primary').forEach(el => {
    if (el.dataset.hsCtaBound) return;
    el.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
    el.dataset.hsCtaBound = '1';
  });

  // Catch-all: any button or anchor whose text matches CTA phrases
  const ctaPhrases = /scope\s+my\s+project|get\s+a\s+quote/i;
  document.querySelectorAll('a[href], button').forEach(el => {
    if (el.dataset.hsCtaBound) return;
    if (ctaPhrases.test(el.textContent)) {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
      });
      el.dataset.hsCtaBound = '1';
    }
  });
}

// ============================================================
// ANCHOR AUTO-OPEN: #get-a-quote
// epipheo.com/explainer-video-price/#get-a-quote opens modal on load
// ============================================================
function checkAnchorOpen() {
  if (window.location.hash === '#get-a-quote') {
    // Small delay to let page render
    setTimeout(openModal, 400);
  }
}

// Run immediately if DOM is already ready (modules are deferred),
// otherwise wait for DOMContentLoaded.
function initModal() {
  interceptCTAs();
  checkAnchorOpen();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initModal);
} else {
  // DOM already ready — run now
  initModal();
}

// Also handle hash changes (e.g. SPA navigation or in-page links)
window.addEventListener('hashchange', () => {
  if (window.location.hash === '#get-a-quote') openModal();
});

// ============================================================
// MODE TOGGLE (Text / Voice)
// ============================================================
modeBtns.forEach(btn => btn.addEventListener('click', () => setMode(btn.dataset.mode)));

function setMode(m) {
  currentMode = m;
  chatFrame.dataset.mode = m;
  modeBtns.forEach(b => b.classList.toggle('on', b.dataset.mode === m));
  if (m !== 'voice' && voiceActive) stopVoice();
  if (m === 'text') silenceSession();
}

function silenceSession() {
  if (!session) return;
  try { session.setMuted(true); } catch (_) {}
  try { session.setVolume?.({ volume: 0 }); } catch (_) {}
}

// ============================================================
// VOICE ORB
// ============================================================
if (orb) {
  orb.addEventListener('click', toggleVoice);
  orb.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleVoice(); }
  });
}

async function toggleVoice() {
  voiceActive ? stopVoice() : await startVoice();
}

async function startVoice() {
  voiceActive = true;
  chatFrame.dataset.voice = 'on';
  if (voiceStatus) voiceStatus.textContent = 'Connecting…';
  await ensureSession();
  if (!session) {
    voiceActive = false;
    chatFrame.dataset.voice = 'off';
    if (voiceStatus) voiceStatus.textContent = 'Could not connect. Try again.';
    return;
  }
  try { await session.setMuted(false); } catch (_) {}
  try { session.setVolume?.({ volume: 1 }); } catch (_) {}
  if (voiceStatus) voiceStatus.textContent = 'Listening… speak naturally';
  startVolumeLoop();
}

async function stopVoice() {
  voiceActive = false;
  chatFrame.dataset.voice = 'off';
  if (voiceStatus) voiceStatus.textContent = 'Tap the orb to start scoping';
  stopVolumeLoop();
  if (orb) orb.style.transform = '';
  const s = session;
  session = null;
  if (s) {
    try { s.setMuted(true); } catch (_) {}
    try { s.setVolume?.({ volume: 0 }); } catch (_) {}
    try { await s.endSession(); } catch (_) {}
  }
}

function startVolumeLoop() {
  function tick() {
    if (!voiceActive || !session) return;
    const vol = Math.max(
      session.getInputVolume?.()  ?? 0,
      session.getOutputVolume?.() ?? 0
    );
    if (orb) orb.style.transform = `scale(${1 + vol * 0.15})`;
    volumeRafId = requestAnimationFrame(tick);
  }
  volumeRafId = requestAnimationFrame(tick);
}

function stopVolumeLoop() {
  if (volumeRafId) { cancelAnimationFrame(volumeRafId); volumeRafId = null; }
}

// ============================================================
// SESSION MANAGEMENT
// ============================================================
async function ensureSession() {
  if (session) return;
  dotState('connecting');
  try {
    const opts = {
      agentId:        AGENT_ID,
      onConnect:      handleConnect,
      onDisconnect:   handleDisconnect,
      onMessage:      handleMessage,
      onStatusChange: handleStatusChange,
      onModeChange:   handleModeChange,
      onError:        handleError,
    };
    if (currentMode === 'text') {
      opts.textOnly = true;
    }
    session = await Conversation.startSession(opts);
  } catch (err) {
    session = null;
    dotState('error');
    console.error('[ElevenLabs] startSession failed:', err);
  }
}

// ============================================================
// AGENT CALLBACKS
// ============================================================
function handleConnect() {
  dotState('connected');
}

function handleDisconnect() {
  session = null;
  dotState('disconnected');
  if (voiceActive) stopVoice();
}

// ============================================================
// FIX #2: Message debounce / grouping
// ============================================================
const AGENT_MSG_DEBOUNCE_MS = 350;
let agentMsgBuffer   = '';
let agentMsgDebounce = null;
let agentMsgEl       = null;

function flushAgentBuffer() {
  agentMsgDebounce = null;
  if (!agentMsgBuffer) return;

  const html = formatAgentMessage(agentMsgBuffer);
  agentMsgBuffer = '';

  if (agentMsgEl && agentMsgEl.parentNode === msgStage) {
    agentMsgEl.innerHTML = `<span class="who">Agent</span>${html}`;
  } else {
    agentMsgEl = document.createElement('div');
    agentMsgEl.className = 'msg agent';
    agentMsgEl.innerHTML = `<span class="who">Agent</span>${html}`;
    msgStage.appendChild(agentMsgEl);
    while (msgStage.children.length > MAX_MSGS) {
      msgStage.firstElementChild?.remove();
    }
  }

  msgStage.scrollTop = msgStage.scrollHeight;
  resolveWistiaCards(agentMsgEl);
  removeTyping();
  sendBtn.disabled = false;
}

function handleMessage({ message, source }) {
  if (source === 'ai') {
    if (!hasUserSentMsg) return;

    removeTyping();

    agentMsgBuffer += (agentMsgBuffer ? '\n' : '') + message;
    clearTimeout(agentMsgDebounce);
    agentMsgDebounce = setTimeout(flushAgentBuffer, AGENT_MSG_DEBOUNCE_MS);

  } else if (source === 'user' && currentMode === 'voice') {
    addMsg(escHtml(message), 'user');
  }
}

function handleStatusChange({ status }) {
  if (status === 'connected')    dotState('connected');
  if (status === 'connecting')   dotState('connecting');
  if (status === 'disconnected') { session = null; dotState('disconnected'); }
}

function handleModeChange({ mode }) {
  if (currentMode !== 'voice') return;
  if (!voiceStatus) return;
  if (mode === 'speaking')       voiceStatus.textContent = 'Agent is speaking…';
  else if (mode === 'listening') voiceStatus.textContent = 'Listening… speak naturally';
  else                           voiceStatus.textContent = 'Processing…';
}

function handleError(msg) {
  console.error('[ElevenLabs] error:', msg);
  if (!hasUserSentMsg) return;
  clearTimeout(agentMsgDebounce);
  agentMsgDebounce = null;
  agentMsgBuffer   = '';
  agentMsgEl       = null;
  removeTyping();
  addMsg('Connection hiccup. Describe your project — length, audience, what it needs to do — and I\'ll get you a <span class="accent">scoped range</span>.', 'agent');
  sendBtn.disabled = false;
}

// ============================================================
// TEXT CHAT
// ============================================================
promptsEl?.
addEventListener('click', e => {
  const btn = e.target.closest('.prompt');
  if (!btn) return;
  chatInput.value = btn.textContent.trim();
  submitMessage();
});

chatInput?.addEventListener('keydown', e => {
  if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submitMessage(); }
});
sendBtn?.addEventListener('click', submitMessage);

async function submitMessage() {
  const q = chatInput.value.trim();
  if (!q || sendBtn.disabled) return;

  chatInput.value = '';
  sendBtn.disabled = true;
  hasUserSentMsg = true;

  clearTimeout(agentMsgDebounce);
  agentMsgDebounce = null;
  agentMsgBuffer   = '';
  agentMsgEl       = null;

  if (promptsEl) promptsEl.style.display = 'none';

  addMsg(escHtml(q), 'user');
  addTyping();

  await ensureSession();

  if (!session) {
    removeTyping();
    addMsg('Couldn\'t connect to the agent. Check your connection and try again.', 'agent');
    sendBtn.disabled = false;
    return;
  }

  await new Promise(r => setTimeout(r, 300));

  try {
    session.sendUserMessage(q);
  } catch (err) {
    removeTyping();
    addMsg('Something went wrong. Please try sending again.', 'agent');
    sendBtn.disabled = false;
  }
}

// ============================================================
// MESSAGE RENDERING
// ============================================================
const MAX_MSGS = 50;
let lastMsg = { who: null, text: null, el: null };

function addMsg(html, who) {
  if (lastMsg.el && lastMsg.who === who && lastMsg.text === html &&
      lastMsg.el.parentNode === msgStage) {
    return lastMsg.el;
  }
  const el = document.createElement('div');
  el.className = 'msg ' + who;
  el.innerHTML = `<span class="who">${who === 'user' ? 'You' : 'Agent'}</span>${html}`;
  msgStage.appendChild(el);
  while (msgStage.children.length > MAX_MSGS) {
    msgStage.firstElementChild?.remove();
  }
  msgStage.scrollTop = msgStage.scrollHeight;
  lastMsg = { who, text: html, el };
  resolveWistiaCards(el);
  return el;
}

function addTyping() {
  if (msgStage.querySelector('.typing-indicator')) return;
  const el = document.createElement('div');
  el.className = 'msg agent typing-indicator';
  el.innerHTML = '<span class="who">Agent</span><span class="typing"><span></span><span></span><span></span></span>';
  msgStage.appendChild(el);
  msgStage.scrollTop = msgStage.scrollHeight;
}

function removeTyping() {
  msgStage.querySelector('.typing-indicator')?.remove();
}

// ============================================================
// WISTIA VIDEO CARD RENDERING
// ============================================================
const thumbCache = {};

function extractWistiaId(url) {
  const m = url.match(/\/medias\/([a-z0-9]+)/i);
  return m ? m[1] : null;
}

async function fetchWistiaThumbnail(wistiaUrl) {
  const id = extractWistiaId(wistiaUrl);
  if (!id) return null;
  if (Object.prototype.hasOwnProperty.call(thumbCache, id)) return thumbCache[id];

  try {
    const resp = await fetch(`https://fast.wistia.com/embed/medias/${id}.json`);
    if (resp.ok) {
      const data = await resp.json();
      const assets = data?.media?.assets ?? [];
      const still  = assets.find(a => a.type === 'still_image');
      if (still?.url) {
        const thumbUrl = still.url.replace(/\.bin$/, '.jpg') + '?image_crop_resized=600x338';
        thumbCache[id] = thumbUrl;
        return thumbUrl;
      }
    }
  } catch (e) {
    console.warn('[Wistia media JSON] failed for', id, e);
  }

  try {
    const resp = await fetch(
      `https://fast.wistia.com/oembed?url=${encodeURIComponent(wistiaUrl)}&format=json`
    );
    if (resp.ok) {
      const data = await resp.json();
      if (data?.thumbnail_url) {
        const thumbUrl = data.thumbnail_url.replace(/\?.*$/, '') + '?image_crop_resized=600x338';
        thumbCache[id] = thumbUrl;
        return thumbUrl;
      }
    }
  } catch (e) {
    console.warn('[Wistia oEmbed] failed for', wistiaUrl, e);
  }

  thumbCache[id] = null;
  return null;
}

function buildVideoCard({ name, client, price, duration, url, thumbUrl }) {
  const safeUrl    = escAttr(url);
  const safeName   = escHtml(name);
  const safeClient = escHtml(client);
  const safePrice  = escHtml(price);
  const safeDur    = escHtml(duration);
  const safeThumb  = escAttr(thumbUrl);

  const videoId = extractWistiaId(url);
  return `<div class="wistia-video-card" data-video-id="${escAttr(videoId || '')}" data-video-url="${safeUrl}" style="cursor:pointer">
    <div class="wistia-thumb-wrap">
      <img src="${safeThumb}" alt="${safeName} thumbnail" class="wistia-thumb" loading="lazy">
      <div class="wistia-play-icon">
        <svg width="54" height="54" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="27" cy="27" r="27" fill="#2792dc"/>
          <polygon points="22,16 22,38 40,27" fill="#fff"/>
        </svg>
      </div>
    </div>
    <div class="wistia-card-meta">
      <div class="wistia-card-title">${safeName}</div>
      <div class="wistia-card-client">${safeClient}</div>
      <div class="wistia-card-details">
        <span class="wistia-card-price">~${safePrice}</span>
        <span class="wistia-card-sep">&middot;</span>
        <span class="wistia-card-duration">${safeDur}</span>
      </div>
    </div>
  </div>`;
}

function resolveWistiaCards(msgEl) {
  const placeholders = msgEl.querySelectorAll('.wistia-card-placeholder');
  if (!placeholders.length) return;

  placeholders.forEach(async (ph) => {
    const url      = ph.dataset.url;
    const name     = ph.dataset.name || '';
    const client   = ph.dataset.client || '';
    const price    = ph.dataset.price || '';
    const duration = ph.dataset.duration || '';
    if (!url) return;

    const thumbUrl = await fetchWistiaThumbnail(url);

    if (!ph.isConnected) return;

    if (thumbUrl) {
      const cardHtml = buildVideoCard({ name, client, price, duration, url, thumbUrl });
      const wrapper  = document.createElement('div');
      wrapper.innerHTML = cardHtml;
      ph.replaceWith(wrapper.firstElementChild);
    } else {
      const link = document.createElement('a');
      link.href   = url;
      link.target = '_blank';
      link.rel    = 'noopener';
      link.textContent = `${name} — ${price} — Watch Video`;
      link.style.color = '#FF5F3C';
      link.style.textDecoration = 'underline';
      ph.replaceWith(link);
    }
    msgStage.scrollTop = msgStage.scrollHeight;
  });
}

// ============================================================
// AGENT MESSAGE FORMATTING
// ============================================================
const VIDEO_LINE_RE = /^(.+?)\s*\|\s*(.+?)\s*\|\s*~?(\$[\d,]+K?)\s*\|\s*([\d:]+(?:\s*(?:seconds?|sec|s))?)\s*\|\s*(?:[^|]+\|\s*)?(https?:\/\/[^\s]+wistia\.com\/medias\/\w+)\s*$/;

function formatAgentMessage(text) {
  const lines = text.split('\n');
  const outputParts = [];

  for (const line of lines) {
    const trimmed = line.trim();

    const match = trimmed.match(VIDEO_LINE_RE);
    if (match) {
      const [, name, client, price, duration, url] = match;
      outputParts.push(
        `<div class="wistia-card-placeholder" data-url="${escAttr(url)}" data-name="${escAttr(name.trim())}" data-client="${escAttr(client.trim())}" data-price="${escAttr(price.trim())}" data-duration="${escAttr(duration.trim())}">` +
        `<div class="wistia-card-loading">Loading preview&hellip;</div></div>`
      );
      continue;
    }

    if (trimmed === '') {
      outputParts.push('<br>');
      continue;
    }

    let html = escHtml(trimmed);

    html = html.replace(
      /\$[\d,]+K?(?:\s*[–\-]\s*\$?[\d,]+K?)?/g,
      m => `<span class="accent">${m}</span>`
    );

    html = html.replace(
      /(https?:\/\/[^\s<]+)/g,
      url => `<a href="${url}" target="_blank" rel="noopener" style="color:#FF5F3C;text-decoration:underline">${url}</a>`
    );

    outputParts.push(`<p class="agent-line">${html}</p>`);
  }

  return outputParts.join('');
}

function escHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function escAttr(s) {
  return String(s)
    .replace(/&/g, '&amp;').replace(/"/g, '&quot;')
    .replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// ============================================================
// STATUS DOT
// ============================================================
function dotState(state) {
  statusDot?.classList.remove('connecting', 'error');
  if (state === 'connecting') statusDot?.classList.add('connecting');
  if (state === 'error')      statusDot?.classList.add('error');
}

// ============================================================
// NAV
// ============================================================
const nav      = document.getElementById('nav');
const navMenu  = document.getElementById('navMenu');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  nav?.classList.toggle('is-scrolled', window.scrollY > 8);
}, { passive: true });

navMenu?.addEventListener('click', () => {
  const open = navLinks?.classList.toggle('is-open');
  navMenu.setAttribute('aria-expanded', String(!!open));
});

document.addEventListener('click', e => {
  if (navLinks?.classList.contains('is-open') &&
      !navLinks.contains(e.target) && e.target !== navMenu) {
    navLinks.classList.remove('is-open');
    navMenu?.setAttribute('aria-expanded', 'false');
  }
});

// ============================================================
// VIDEO LIGHTBOX (same pattern as page-landing.php)
// Escape handler is guarded so it does NOT fire when the HS quote modal
// is open (which would otherwise clobber body.overflow).
// ============================================================
(function() {
  // Create lightbox DOM if it doesn't already exist
  if (!document.getElementById('video-lightbox')) {
    const lb = document.createElement('div');
    lb.id = 'video-lightbox';
    lb.style.cssText = 'display:none;position:fixed;inset:0;z-index:99999;background:rgba(0,0,0,.85);align-items:center;justify-content:center;';
    lb.innerHTML = `
      <div style="position:relative;width:90vw;max-width:960px;aspect-ratio:16/9;">
        <div id="video-lightbox-player" style="width:100%;height:100%;"></div>
        <button id="video-lightbox-close" style="position:absolute;top:-40px;right:0;background:none;border:none;color:#fff;font-size:32px;cursor:pointer;line-height:1;padding:4px 8px;">&times;</button>
      </div>`;
    document.body.appendChild(lb);
  }

  var lightbox = document.getElementById('video-lightbox');
  var playerContainer = document.getElementById('video-lightbox-player');
  var closeBtn = document.getElementById('video-lightbox-close');
  var currentVideo = null;

  // Load Wistia E-v1.js if not already present
  if (!document.querySelector('script[src*="fast.wistia.com/assets/external/E-v1.js"]') &&
      !document.querySelector('script[data-rocket-src*="E-v1.js"]')) {
    var ws = document.createElement('script');
    ws.src = 'https://fast.wistia.com/assets/external/E-v1.js';
    ws.async = true;
    document.head.appendChild(ws);
  }

  function isLightboxOpen() {
    return lightbox.style.display === 'flex';
  }

  function openVideo(videoId) {
    playerContainer.innerHTML = '';
    var embed = document.createElement('div');
    embed.className = 'wistia_embed wistia_async_' + videoId + ' videoFoam=true playerColor=FF5F3C autoPlay=true';
    embed.style.cssText = 'width:100%;height:100%;';
    playerContainer.appendChild(embed);
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    window._wq = window._wq || [];
    window._wq.push({ id: videoId, onReady: function(video) {
      currentVideo = video;
      video.play();
    }});
  }

  function closeVideo() {
    if (!isLightboxOpen()) return;
    if (currentVideo) {
      currentVideo.pause();
      currentVideo.remove();
      currentVideo = null;
    }
    playerContainer.innerHTML = '';
    lightbox.style.display = 'none';
    document.body.style.overflow = '';
  }

  closeBtn.addEventListener('click', closeVideo);
  lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) closeVideo();
  });
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && isLightboxOpen()) closeVideo();
  });

  // Delegate clicks on video cards (they're dynamically created)
  document.addEventListener('click', function(e) {
    var card = e.target.closest('.wistia-video-card[data-video-id]');
    if (card) {
      e.preventDefault();
      e.stopPropagation();
      var videoId = card.getAttribute('data-video-id');
      if (videoId) {
        openVideo(videoId);
      } else {
        // Fallback: open URL in new tab if no video ID
        var url = card.getAttribute('data-video-url');
        if (url) window.open(url, '_blank');
      }
    }
  });
})();

// ============================================================
// FOOTER YEAR
// ============================================================
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ============================================================
// PRE-WARM SESSION
// ============================================================
setTimeout(() => { ensureSession(); }, 1500);
