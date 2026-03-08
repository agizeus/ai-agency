/* roothouse.ai — simple embedded chatbot widget (frontend)

Variant 3: Own bot UI on the site, sending messages to Dex backend.

Backend expected (to be deployed):
POST https://api.roothouse.ai/api/public/chat
Body: { message, pageUrl, userAgent, email? }
Response: { ok: true, reply: string }

This script degrades gracefully when the endpoint is not reachable.
*/
(function () {
  const ENDPOINT = window.ROOTHOUSE_CHAT_ENDPOINT || 'https://api.roothouse.ai/api/public/chat';

  const css = `
  .rh-chat-fab{position:fixed;right:18px;bottom:18px;z-index:9999;display:flex;align-items:center;gap:10px}
  .rh-chat-btn{width:56px;height:56px;border-radius:18px;border:1px solid rgba(15,23,42,.12);background:linear-gradient(135deg,#6d5efc,#28c7b7);color:#fff;box-shadow:0 18px 44px rgba(7,17,31,.22);cursor:pointer;font-weight:800}
  .rh-chat-panel{position:fixed;right:18px;bottom:86px;width:min(380px, calc(100vw - 36px));max-height:min(560px, calc(100vh - 120px));border-radius:20px;overflow:hidden;border:1px solid rgba(15,23,42,.12);background:rgba(255,255,255,.96);box-shadow:0 24px 80px rgba(0,0,0,.22);display:none;z-index:9999}
  .rh-chat-panel.open{display:flex;flex-direction:column}
  .rh-chat-head{padding:14px 14px;display:flex;align-items:center;justify-content:space-between;gap:10px;background:linear-gradient(135deg,#08111f,#12213f);color:#f8fbff}
  .rh-chat-head strong{font-size:14px;letter-spacing:-.01em}
  .rh-chat-close{border:1px solid rgba(255,255,255,.18);background:rgba(255,255,255,.08);color:#fff;border-radius:12px;padding:8px 10px;cursor:pointer}
  .rh-chat-body{padding:14px;display:flex;flex-direction:column;gap:10px;overflow:auto}
  .rh-msg{padding:10px 12px;border-radius:14px;max-width:88%;font-size:14px;line-height:1.35}
  .rh-msg.bot{background:#f3f6fd;border:1px solid rgba(15,23,42,.08);color:#0f172a}
  .rh-msg.user{margin-left:auto;background:linear-gradient(135deg,#6d5efc,#28c7b7);color:#fff}
  .rh-chat-foot{padding:12px;border-top:1px solid rgba(15,23,42,.08);display:flex;gap:10px;background:rgba(255,255,255,.9)}
  .rh-chat-input{flex:1;border:1px solid rgba(15,23,42,.12);border-radius:14px;padding:10px 12px;font-size:14px}
  .rh-chat-send{border:none;border-radius:14px;padding:10px 14px;font-weight:800;cursor:pointer;background:#0f172a;color:#fff}
  .rh-chat-hint{font-size:12px;color:rgba(15,23,42,.65)}
  `;

  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  const fab = document.createElement('div');
  fab.className = 'rh-chat-fab';
  fab.innerHTML = `<button class="rh-chat-btn" aria-label="Chat öffnen">Chat</button>`;

  const panel = document.createElement('div');
  panel.className = 'rh-chat-panel';
  panel.innerHTML = `
    <div class="rh-chat-head">
      <div>
        <strong>roothouse.ai – Chat</strong><br/>
        <span class="rh-chat-hint">Antwort in Sekunden (Preview)</span>
      </div>
      <button class="rh-chat-close" aria-label="Chat schließen">×</button>
    </div>
    <div class="rh-chat-body" role="log" aria-live="polite"></div>
    <form class="rh-chat-foot">
      <input class="rh-chat-input" name="message" placeholder="Wobei kann ich helfen?" autocomplete="off" />
      <button class="rh-chat-send" type="submit">Senden</button>
    </form>
  `;

  document.body.appendChild(fab);
  document.body.appendChild(panel);

  const openBtn = fab.querySelector('.rh-chat-btn');
  const closeBtn = panel.querySelector('.rh-chat-close');
  const body = panel.querySelector('.rh-chat-body');
  const form = panel.querySelector('form');
  const input = panel.querySelector('.rh-chat-input');

  function addMsg(text, who) {
    const div = document.createElement('div');
    div.className = `rh-msg ${who}`;
    div.textContent = text;
    body.appendChild(div);
    body.scrollTop = body.scrollHeight;
  }

  function setOpen(open) {
    panel.classList.toggle('open', open);
    if (open) {
      if (!body.childElementCount) {
        addMsg('Hi! Ich bin der roothouse.ai Chat. Beschreibe kurz dein Anliegen (z.B. Sekretariat, Marketing oder Support).', 'bot');
      }
      setTimeout(() => input.focus(), 30);
    }
  }

  openBtn.addEventListener('click', () => setOpen(true));
  closeBtn.addEventListener('click', () => setOpen(false));

  async function sendToBackend(message) {
    const payload = {
      message,
      pageUrl: location.href,
      userAgent: navigator.userAgent
    };
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    return res.json();
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const msg = (input.value || '').trim();
    if (!msg) return;
    input.value = '';
    addMsg(msg, 'user');

    try {
      const out = await sendToBackend(msg);
      const reply = out && (out.reply || out.response || out.message);
      addMsg(reply || 'Danke! Wir melden uns gleich.', 'bot');
    } catch (err) {
      addMsg('Ich erreiche gerade den Server nicht. Bitte nutze vorerst die Terminbuchung oder schreibe uns per E‑Mail.', 'bot');
    }
  });
})();
