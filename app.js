(() => {
  const lessons = {
    smalltalk: [
      { phrase: "How’s your day going?", subtitle: "A friendly way to start a conversation", phonetic: "/ howz yer day goh-ing /", tip: '<strong>Sound natural:</strong> “How’s” is a relaxed contraction of “How is.” Keep the whole question light and friendly.' },
      { phrase: "What have you been up to?", subtitle: "A casual way to catch up with someone", phonetic: "/ whut-uv-yoo bin up-too /", tip: '<strong>Link the words:</strong> “Have you” often blends together and sounds like “uv-yoo” in relaxed conversation.' },
      { phrase: "That sounds like a lot of fun.", subtitle: "Show interest and keep the conversation going", phonetic: "/ that sowndz like-uh lot-uh fun /", tip: '<strong>Keep it warm:</strong> A little emphasis on “fun” makes this sound genuinely enthusiastic.' },
      { phrase: "Do you have any plans this weekend?", subtitle: "An easy question for making weekend plans", phonetic: "/ doo-yuh hav-en-ee planz this week-end /", tip: '<strong>Natural rhythm:</strong> “Do you” often sounds like “dʒuh” (“ja”) in fast, casual American speech.' },
      { phrase: "It was great catching up with you.", subtitle: "A warm way to wrap up a conversation", phonetic: "/ it-wuz grayt kach-ing up with-yoo /", tip: '<strong>Flap T:</strong> The T in “catching” softens to a quick tap, almost like a light D sound.' }
    ],
    interview: [
      { phrase: "Tell me a little bit about yourself.", subtitle: "A common and friendly interview opener", phonetic: "/ tel-mee-uh lit-ul bit-uh-bowt yer-self /", tip: '<strong>Keep it focused:</strong> Interviewers usually want a brief overview of your experience and what brings you here.' },
      { phrase: "I’m excited about this opportunity.", subtitle: "Express enthusiasm with confidence", phonetic: "/ im ik-sy-tid uh-bowt this ah-per-too-ni-tee /", tip: '<strong>Stress the key word:</strong> Give “excited” a little energy, and keep the rest of the sentence steady.' },
      { phrase: "One of my strengths is problem-solving.", subtitle: "Talk about your skills clearly", phonetic: "/ wun-uhv-my strengths iz prob-lum-sahl-ving /", tip: '<strong>Sound confident:</strong> A short pause after “strengths” can make your answer easier to follow.' },
      { phrase: "I’d love to learn more about the role.", subtitle: "Show curiosity and interest", phonetic: "/ eyed-luv-tuh lern mor uh-bowt thuh rohl /", tip: '<strong>Polite and direct:</strong> “I’d love to” is enthusiastic without sounding too formal.' },
      { phrase: "Thank you for taking the time to meet with me.", subtitle: "A polished way to close an interview", phonetic: "/ thangk-yoo fer tay-king thuh tym tuh meet with-mee /", tip: '<strong>TH sound:</strong> Place your tongue gently between your teeth for “thank.”' }
    ],
    idioms: [
      { phrase: "I’m just going to wing it.", subtitle: "Handle something without a detailed plan", phonetic: "/ im just goh-ing tuh wing it /", tip: '<strong>“Wing it”</strong> means to improvise or do your best without preparing much. It’s casual and common.' },
      { phrase: "That meeting was a piece of cake.", subtitle: "Say that something was very easy", phonetic: "/ that mee-ting wuz-uh pees-uhv kayk /", tip: '<strong>“A piece of cake”</strong> means easy. It’s informal, so save it for casual conversation.' },
      { phrase: "Let’s touch base later this week.", subtitle: "Suggest a quick follow-up conversation", phonetic: "/ lets tuch bays lay-ter this week /", tip: '<strong>“Touch base”</strong> is a familiar workplace expression meaning to reconnect or check in.' },
      { phrase: "I’m feeling a little under the weather.", subtitle: "A gentle way to say you feel unwell", phonetic: "/ im fee-ling-uh lit-ul un-der thuh weth-er /", tip: '<strong>“Under the weather”</strong> means you feel slightly sick. It’s a friendly, indirect expression.' },
      { phrase: "No worries, we’re on the same page.", subtitle: "Reassure someone that you agree", phonetic: "/ noh wer-eez weer on thuh saym payj /", tip: '<strong>“On the same page”</strong> means you understand or agree with one another.' }
    ],
    pronunciation: [
      { phrase: "I got a better idea.", subtitle: "Practice the soft American flap T", phonetic: "/ eye gah-duh bed-er eye-dee-uh /", tip: '<strong>Flap T:</strong> Between vowel sounds, the T in “better” and “got a” becomes a quick tongue tap—similar to a soft D.' },
      { phrase: "Really, I’d rather go around.", subtitle: "Give your American R a little practice", phonetic: "/ ree-lee eyed rath-er goh uh-rownd /", tip: '<strong>American R:</strong> Curl or bunch the tongue without touching the roof of your mouth. Keep the sound voiced and steady.' },
      { phrase: "I think those three things are theirs.", subtitle: "Practice voiced and unvoiced TH", phonetic: "/ eye thing thohz three thingz ar thairz /", tip: '<strong>TH sounds:</strong> Let the tongue peek between your teeth. “Think” is unvoiced; “those” uses your voice.' },
      { phrase: "Put it on the table over there.", subtitle: "Practice connected speech and the flap T", phonetic: "/ puh-dit on thuh tay-bul oh-ver thair /", tip: '<strong>Link it smoothly:</strong> The T in “put it” can become a quick flap. Try saying the phrase in one easy rhythm.' },
      { phrase: "The red truck turned right.", subtitle: "Build a clear, relaxed American R", phonetic: "/ thuh red truck ternd ryt /", tip: '<strong>R tip:</strong> Keep your lips slightly rounded and avoid tapping your tongue for the American R.' }
    ]
  };
  const questions = ["Hey! What do you like to do on the weekends?", "Nice! What’s a place in your town you’d recommend?", "That sounds fun. What kind of food do you enjoy?", "Cool! What are you looking forward to this week?"];
  const $ = (id) => document.getElementById(id);
  let category = 'smalltalk', index = 0, speed = 1, recognition = null, recording = false, roleplayActive = false, roleplayTurn = 0, transcriptText = '', interimText = '', toastTimer;
  let store = readStore();
  const todayKey = () => new Date().toISOString().slice(0, 10);
  function readStore() { try { return JSON.parse(localStorage.getItem('sayit-progress')) || { streak: 0, lastPractice: null, completed: [], words: [] }; } catch { return { streak: 0, lastPractice: null, completed: [], words: [] }; } }
  function saveStore() { try { localStorage.setItem('sayit-progress', JSON.stringify(store)); } catch {} }
  function getLesson() { return lessons[category][index]; }
  function renderLesson() {
    const lesson = getLesson();
    $('lesson-title').textContent = lesson.phrase; $('lesson-subtitle').textContent = lesson.subtitle; $('phonetic').textContent = lesson.phonetic; $('tip-text').innerHTML = lesson.tip;
    $('phrase-counter').textContent = `PHRASE ${String(index + 1).padStart(2, '0')} / ${String(lessons[category].length).padStart(2, '0')}`;
    $('transcript').className = 'transcript-placeholder'; $('transcript').textContent = 'Your words will appear here as you speak…'; $('score-row').hidden = true; transcriptText = ''; interimText = '';
  }
  function renderProgress() {
    $('streak-count').textContent = store.streak || 0;
    const count = store.completed.filter(x => x.startsWith(`${category}:`)).length;
    $('progress-count').innerHTML = `${count} <small>/ 5 phrases</small>`; $('progress-bar').style.width = `${Math.min(count / 5 * 100, 100)}%`;
    $('word-count').textContent = `${store.words.length} learned`;
    $('word-bank').innerHTML = store.words.length ? store.words.slice(-12).map(w => `<span class="word-chip">${escapeHtml(w)}</span>`).join('') : '<p class="empty-words">Complete a phrase to start building your word bank.</p>';
  }
  function escapeHtml(s) { return s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
  function normalize(s) { return s.toLowerCase().replace(/[’']/g, '').replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim().split(' ').filter(Boolean); }
  function compare(input, final = false) {
    const target = normalize(getLesson().phrase), spoken = normalize(input);
    let matches = 0, used = new Set();
    const aligned = target.map((word, i) => {
      let best = -1, distance = Infinity;
      spoken.forEach((heard, j) => { if (!used.has(j)) { const d = Math.abs(j - i) + (heard === word ? -10 : 0); if (d < distance) { distance = d; best = j; } } });
      if (best >= 0 && spoken[best] === word) { used.add(best); matches++; return `<span class="word-correct">${escapeHtml(word)}</span>`; }
      if (best >= 0 && editDistance(word, spoken[best]) <= Math.max(1, Math.floor(word.length * .25))) { used.add(best); matches += .5; return `<span class="word-missed" title="Heard: ${escapeHtml(spoken[best])}">${escapeHtml(word)}</span>`; }
      return `<span class="word-missed">${escapeHtml(word)}</span>`;
    });
    const accuracy = Math.round(matches / target.length * 100);
    const extra = spoken.map((w, j) => used.has(j) ? '' : ` <span class="word-extra">${escapeHtml(w)}</span>`).join('');
    $('transcript').className = 'transcript-words'; $('transcript').innerHTML = aligned.join(' ') + extra;
    if (final) {
      $('score-row').hidden = false; $('accuracy-score').textContent = `${accuracy}%`;
      $('score-caption').textContent = accuracy >= 80 ? 'Great job — that sounded natural!' : accuracy >= 50 ? 'Nice effort. Try the highlighted words once more.' : 'Keep going — slow it down and try again.';
      $('accuracy-score').style.color = accuracy >= 80 ? 'var(--green)' : accuracy >= 50 ? '#c08a36' : 'var(--red)';
      if (accuracy >= 80) completeLesson();
    }
  }
  function editDistance(a,b) { const row = Array.from({length:b.length+1},(_,i)=>i); for(let i=1;i<=a.length;i++){let prev=row[0];row[0]=i;for(let j=1;j<=b.length;j++){const old=row[j];row[j]=Math.min(row[j]+1,row[j-1]+1,prev+(a[i-1]===b[j-1]?0:1));prev=old;}}return row[b.length]; }
  function completeLesson() {
    const key = `${category}:${index}`;
    if (!store.completed.includes(key)) { store.completed.push(key); const now = todayKey(); if (store.lastPractice !== now) { const y = new Date(Date.now() - 86400000).toISOString().slice(0,10); store.streak = store.lastPractice === y ? (store.streak || 0) + 1 : 1; store.lastPractice = now; } }
    normalize(getLesson().phrase).forEach(w => { if (!store.words.includes(w)) store.words.push(w); }); saveStore(); renderProgress();
  }
  function say(text, rate = speed) {
    if (!('speechSynthesis' in window)) { showToast('Speech playback is not supported in this browser.'); return; }
    speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(text); u.lang = 'en-US'; u.rate = rate;
    const voices = speechSynthesis.getVoices(); u.voice = voices.find(v => v.lang === 'en-US' && /natural|samantha|ava|jenny|aria|zira|google us english/i.test(v.name)) || voices.find(v => v.lang === 'en-US') || null;
    speechSynthesis.speak(u);
  }
  function getRecognition() {
    const Ctor = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Ctor) return null;
    if (!recognition) { recognition = new Ctor(); recognition.lang = 'en-US'; recognition.continuous = false; recognition.interimResults = true; recognition.maxAlternatives = 1;
      recognition.onresult = e => { let finals = '', interim = ''; for (let i=e.resultIndex;i<e.results.length;i++) { const text=e.results[i][0].transcript; if(e.results[i].isFinal) finals += text + ' '; else interim += text; } transcriptText += finals; interimText = interim; if ((transcriptText + interimText).trim()) compare((transcriptText + interimText).trim(), false); };
      recognition.onerror = e => { if(e.error==='not-allowed'||e.error==='service-not-allowed') showToast('Please allow microphone access to practice speaking.'); else if(e.error==='no-speech') showToast('We didn’t hear anything. Give it another try.'); recording=false; updateMic(); };
      recognition.onend = () => { const finalText=(transcriptText+interimText).trim(); recording=false; updateMic(); if(finalText) { compare(finalText,true); if(roleplayActive) handleRoleplayAnswer(finalText); } else if(!roleplayActive) { $('transcript').className='transcript-placeholder'; $('transcript').textContent='Your words will appear here as you speak…'; } };
    }
    return recognition;
  }
  function updateMic() { $('speak-button').classList.toggle('recording',recording); $('speak-button').setAttribute('aria-pressed',String(recording)); $('speak-label').textContent=recording?'Listening… tap to finish':'Hold or click to speak'; $('listening-status').textContent=recording?'● LISTENING':''; }
  function startListening(roleplay=false) {
    const rec=getRecognition(); if(!rec){showToast('Speech recognition works best in Chrome or Edge.');return;}
    roleplayActive=roleplay; transcriptText='';interimText='';recording=true;updateMic();
    if(roleplay) { $('transcript').className='transcript-placeholder';$('transcript').textContent='Listening to your reply…';$('roleplay-button').innerHTML='<span aria-hidden="true">⏹</span> Finish your reply'; }
    try { rec.start(); } catch { recording=false;updateMic(); }
  }
  function stopListening() { if(recording&&recognition){recording=false;updateMic();try{recognition.stop()}catch{}} }
  function handleRoleplayAnswer(text) {
    addChat(text,true); roleplayActive=false;
    if(roleplayTurn >= questions.length) { $('roleplay-button').innerHTML='<span aria-hidden="true">🎙</span> Start a conversation'; $('roleplay-question').textContent='That was a great conversation. Ready for another?'; roleplayTurn=0; return; }
    const q=questions[roleplayTurn++]; setTimeout(()=>{ $('roleplay-question').textContent=q;addChat(q,false);say(q);$('roleplay-button').innerHTML='<span aria-hidden="true">🎙</span> Your turn — speak'; },550);
  }
  function addChat(text,user) { const div=document.createElement('div');div.className=`chat-line ${user?'user-line':'coach-line'}`;const avatar=document.createElement('span');avatar.className='chat-avatar';avatar.textContent=user?'J':'S';const p=document.createElement('p');p.textContent=text;div.append(avatar,p);$('chat-replies').append(div);$('chat-preview').scrollTop=$('chat-preview').scrollHeight; }
  function showToast(message) { const t=$('toast');t.textContent=message;t.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove('show'),2800); }
  document.querySelectorAll('.category-tab').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('.category-tab').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-selected',String(b===button));});category=button.dataset.category;index=0;renderLesson();renderProgress();}));
  $('listen-button').addEventListener('click',()=>say(getLesson().phrase));
  document.querySelectorAll('.speed-option').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.speed-option').forEach(x=>x.classList.toggle('active',x===b));speed=Number(b.dataset.speed);}));
  function nextPhrase(){index=(index+1)%lessons[category].length;renderLesson();}
  $('next-phrase').addEventListener('click',nextPhrase);$('next-button').addEventListener('click',nextPhrase);$('try-again').addEventListener('click',()=>startListening(false));
  $('speak-button').addEventListener('click',()=>{if(recording)stopListening();else startListening(false);});
  $('roleplay-button').addEventListener('click',()=>{if(recording){stopListening();return;} if(roleplayTurn===0){$('chat-replies').innerHTML='';$('roleplay-question').textContent=questions[0];say(questions[0]);} startListening(true);});
  $('phonetic-help').addEventListener('click',()=>showToast('The phonetic guide uses simple sound clues, not formal IPA.'));
  renderLesson();renderProgress();
})();
