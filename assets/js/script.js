// ══════════════════════════════════════
// CONFIG — Replace with your API keys
// ══════════════════════════════════════
const CONFIG = {
  WEATHER_KEY: 'PASTE_YOUR_OPENWEATHERMAP_KEY',
  NEWS_KEY: 'PASTE_YOUR_NEWSAPI_KEY',
};

// ══════════════════════════════════════
// DATA CONSTANTS
// ══════════════════════════════════════
const productivityTips = [
  { type:'tip', icon:'catching_pokemon', label:'Productivity Tip', text:'Eat the Frog: Do your hardest task first thing in the morning.', author:'Brian Tracy', img:'https://images.unsplash.com/photo-1564419320461-6870880221ad?auto=format&fit=crop&w=1200&q=80' },
  { type:'tip', icon:'bolt', label:'Productivity Tip', text:'The 2-Minute Rule: If a task takes less than 2 minutes, do it immediately.', author:'David Allen', img:'https://images.unsplash.com/photo-1543332164-6e82f355badc?auto=format&fit=crop&w=1200&q=80' },
  { type:'tip', icon:'timer', label:'Productivity Tip', text:'Pomodoro Technique: Work for 25 minutes, then take a 5-minute break to stay sharp.', author:'Francesco Cirillo', img:'https://images.unsplash.com/photo-1495364141860-b0d03eccd065?auto=format&fit=crop&w=1200&q=80' },
  { type:'tip', icon:'inventory_2', label:'Productivity Tip', text:'Batching: Group similar tasks like answering emails together to save mental energy.', author:'Tim Ferriss', img:'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?auto=format&fit=crop&w=1200&q=80' },
  { type:'tip', icon:'ads_click', label:'Productivity Tip', text:'Single-Tasking: Multitasking reduces productivity by 40%. Focus on one thing at a time.', author:'APA Research', img:'https://images.unsplash.com/photo-1454165833767-02a698d1316a?auto=format&fit=crop&w=1200&q=80' },
  { type:'tip', icon:'lock', label:'Productivity Tip', text:'Deep Work: Schedule 90 minutes of distraction-free time for your most important project.', author:'Cal Newport', img:'https://images.unsplash.com/photo-1517842645537-4d258fb0bfbb?auto=format&fit=crop&w=1200&q=80' },
  { type:'tip', icon:'bar_chart', label:'Productivity Tip', text:'The 80/20 Rule: 80% of your results come from 20% of your activities. Find that 20%.', author:'Vilfredo Pareto', img:'https://images.unsplash.com/photo-1522071823990-94981d439763?auto=format&fit=crop&w=1200&q=80' },
  { type:'tip', icon:'self_improvement', label:'Productivity Tip', text:'Mindfulness: Take 5 minutes to breathe and clear your mind between big tasks.', author:'Thich Nhat Hanh', img:'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80' },
  { type:'tip', icon:'notifications_off', label:'Productivity Tip', text:'Digital Minimalism: Turn off non-essential notifications to stay in the flow.', author:'Cal Newport', img:'https://images.unsplash.com/photo-1512428559083-a400a42d447a?auto=format&fit=crop&w=1200' },
  { type:'tip', icon:'event_note', label:'Productivity Tip', text:'Review: Spend 10 minutes at the end of each day planning the next one.', author:'Jim Rohn', img:'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=1200' },
];

(function spawnStars() {
  const canvas = document.getElementById('bgCanvas');
  if (!canvas) return;
  for (let i = 0; i < 80; i++) {
    const s = document.createElement('div');
    s.className = 'star';
    const size = Math.random() * 2 + 0.5;
    s.style.cssText = `
      width:${size}px;height:${size}px;
      left:${Math.random()*100}%;top:${Math.random()*100}%;
      --dur:${2+Math.random()*5}s;
      --delay:${Math.random()*6}s;
      --op:${0.3+Math.random()*0.5};
    `;
    canvas.appendChild(s);
  }
})();

// ══════════════════════════════════════
// LIVE CLOCK
// ══════════════════════════════════════
function updateClock() {
  const now = new Date();
  const h = now.getHours(), m = now.getMinutes(), s = now.getSeconds();
  const ampm = h >= 12 ? 'PM' : 'AM';
  const hh = h % 12 || 12;
  const liveTimeEl = document.getElementById('liveTime');
  if (liveTimeEl) {
    liveTimeEl.textContent = `${String(hh).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')} ${ampm}`;
  }
  const bt = document.getElementById('heroBigTime');
  if (bt) bt.textContent = `${String(hh).padStart(2,'0')}:${String(m).padStart(2,'0')} ${ampm}`;
}
setInterval(updateClock, 1000); updateClock();

// ══════════════════════════════════════
// DATE WIDGET
// ══════════════════════════════════════
function initDate() {
  const now = new Date();
  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  
  const dateDayEl = document.getElementById('dateDay');
  if (dateDayEl) dateDayEl.textContent = now.getDate();
  
  const dateFullEl = document.getElementById('dateFull');
  if (dateFullEl) dateFullEl.textContent = `${days[now.getDay()]}, ${months[now.getMonth()]} ${now.getFullYear()}`;
  
  const startYear = new Date(now.getFullYear(), 0, 1);
  const wn = Math.ceil(((now - startYear) / 86400000 + startYear.getDay() + 1) / 7);
  const dateWeekNumEl = document.getElementById('dateWeekNum');
  if (dateWeekNumEl) dateWeekNumEl.textContent = `Week ${wn} of ${now.getFullYear()}`;
  
  const wb = document.getElementById('weekBar');
  if (wb) {
    const dayNames = ['Su','Mo','Tu','We','Th','Fr','Sa'];
    wb.innerHTML = '';
    dayNames.forEach((d,i) => {
      const el = document.createElement('div');
      el.className = 'week-day' + (i === now.getDay() ? ' today' : '');
      el.textContent = d;
      wb.appendChild(el);
    });
  }

  const hr = now.getHours();
  const greeting = hr < 12 ? 'Good Morning <span class="material-symbols-outlined">light_mode</span>' : hr < 17 ? 'Good Afternoon <span class="material-symbols-outlined">wb_sunny</span>' : 'Good Evening <span class="material-symbols-outlined">dark_mode</span>';
  const greetEl = document.getElementById('heroGreeting');
  if (greetEl) greetEl.innerHTML = greeting;

  const subEl = document.getElementById('heroDateSub');
  if (subEl) subEl.textContent = `${days[now.getDay()]}, ${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;
  
  if (typeof productivityTips !== 'undefined' && productivityTips.length > 0) {
    const quoteIndex = now.getDate() % productivityTips.length;
    const q = productivityTips[quoteIndex];
    const qText = document.getElementById('dateQuoteText');
    const qAuth = document.getElementById('dateQuoteAuthor');
    if (qText && qAuth) {
      qText.textContent = `"${q.text}"`;
      qAuth.textContent = q.author;
    }
  }

  setTimeout(() => {
    const secDay = now.getHours()*3600 + now.getMinutes()*60 + now.getSeconds();
    
    const dayPctEl = document.getElementById('dayPct');
    const dayBarEl = document.getElementById('dayBar');
    if (dayPctEl && dayBarEl) {
      const dayPct = Math.round(secDay / 864);
      dayPctEl.textContent = dayPct + '%';
      dayBarEl.style.width = dayPct + '%';
    }

    const weekPctEl = document.getElementById('weekPct');
    const weekBar2El = document.getElementById('weekBar2');
    if (weekPctEl && weekBar2El) {
      const weekPct = Math.round(((now.getDay() * 86400 + secDay) / 604800) * 100);
      weekPctEl.textContent = weekPct + '%';
      weekBar2El.style.width = weekPct + '%';
    }

    const monthPctEl = document.getElementById('monthPct');
    const monthBarEl = document.getElementById('monthBar');
    if (monthPctEl && monthBarEl) {
      const daysInMonth = new Date(now.getFullYear(), now.getMonth()+1, 0).getDate();
      const monthPct = Math.round(((now.getDate()-1)*86400 + secDay) / (daysInMonth*86400) * 100);
      monthPctEl.textContent = monthPct + '%';
      monthBarEl.style.width = monthPct + '%';
    }

    const yearPctEl = document.getElementById('yearPct');
    const yearBarEl = document.getElementById('yearBar');
    if (yearPctEl && yearBarEl) {
      const startOfYear = new Date(now.getFullYear(), 0, 1);
      const endOfYear = new Date(now.getFullYear()+1, 0, 1);
      const yearPct = Math.round((now - startOfYear) / (endOfYear - startOfYear) * 100);
      yearPctEl.textContent = yearPct + '%';
      yearBarEl.style.width = yearPct + '%';
    }
  }, 500);
}
initDate();

// ══════════════════════════════════════
// WEATHER
// ══════════════════════════════════════
const weatherIcons = {
  '01d':'sunny','01n':'nightlight','02d':'partly_cloudy_day','02n':'partly_cloudy_night','03d':'cloud','03n':'cloud',
  '04d':'cloudy','04n':'cloudy','09d':'rainy','09n':'rainy','10d':'partly_cloudy_day','10n':'rainy',
  '11d':'thunderstorm','11n':'thunderstorm','13d':'ac_unit','13n':'ac_unit','50d':'foggy','50n':'foggy'
};
function getWeatherIcon(code) { 
  const icon = weatherIcons[code] || 'partly_cloudy_day';
  return `<span class="material-symbols-outlined">${icon}</span>`;
}

const CACHE_TTL = { weather: 30*60*1000, ticker: 30*60*1000, news: 60*60*1000 };
function cacheSet(key, data) {
  try { localStorage.setItem(key, JSON.stringify({ data, ts: Date.now() })); } catch(e){}
}
function cacheGet(key, ttl) {
  try {
    const item = JSON.parse(localStorage.getItem(key));
    if (item && Date.now() - item.ts < ttl) return item.data;
  } catch(e){}
  return null;
}

async function loadWeather() {
  const weatherCard = document.getElementById('weatherCard');
  if (!weatherCard) return;

  const cached = cacheGet('smarttab_weather', CACHE_TTL.weather);
  if (cached) applyWeather(cached.curr, cached.fore);

  if (!navigator.geolocation) { if (!cached) setWeatherDemo(); return; }
  navigator.geolocation.getCurrentPosition(async pos => {
    const {latitude: lat, longitude: lon} = pos.coords;
    if (CONFIG.WEATHER_KEY === 'PASTE_YOUR_OPENWEATHERMAP_KEY') { if (!cached) setWeatherDemo(); return; }
    try {
      const [curr, fore] = await Promise.all([
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${CONFIG.WEATHER_KEY}`).then(r=>r.json()),
        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&cnt=4&appid=${CONFIG.WEATHER_KEY}`).then(r=>r.json())
      ]);
      cacheSet('smarttab_weather', { curr, fore });
      applyWeather(curr, fore);
    } catch(e) { if (!cached) setWeatherDemo(); }
  }, () => { if (!cached) setWeatherDemo(); });
}

function applyWeather(curr, fore) {
  const tempEl = document.getElementById('wTemp');
  if (tempEl) tempEl.textContent = Math.round(curr.main.temp) + '°C';
  const descEl = document.getElementById('wDesc');
  if (descEl) descEl.textContent = curr.weather[0].description;
  const locEl = document.getElementById('wLoc');
  if (locEl) locEl.innerHTML = `<span class="material-symbols-outlined">location_on</span> ${curr.name}, ${curr.sys.country}`;
  const iconEl = document.getElementById('wIcon');
  if (iconEl) iconEl.innerHTML = getWeatherIcon(curr.weather[0].icon);
  const humEl = document.getElementById('wHum');
  if (humEl) humEl.textContent = curr.main.humidity + '%';
  const windEl = document.getElementById('wWind');
  if (windEl) windEl.textContent = Math.round(curr.wind.speed * 3.6) + ' km/h';
  const visEl = document.getElementById('wVis');
  if (visEl) visEl.textContent = (curr.visibility/1000).toFixed(1) + ' km';
  
  const strip = document.getElementById('forecastStrip');
  if (strip) {
    strip.innerHTML = '';
    fore.list.slice(0,4).forEach(f => {
      const time = new Date(f.dt*1000);
      const hh = time.getHours(), ap = hh>=12?'PM':'AM';
      strip.innerHTML += `<div class="forecast-item">
        <div class="forecast-time">${(hh%12||12)}${ap}</div>
        <div class="forecast-icon">${getWeatherIcon(f.weather[0].icon)}</div>
        <div class="forecast-temp">${Math.round(f.main.temp)}°</div>
      </div>`;
    });
  }
}

function setWeatherDemo() {
  const tempEl = document.getElementById('wTemp');
  if (tempEl) tempEl.textContent = '28°C';
  const descEl = document.getElementById('wDesc');
  if (descEl) descEl.textContent = 'Partly Cloudy';
  const locEl = document.getElementById('wLoc');
  if (locEl) locEl.innerHTML = '<span class="material-symbols-outlined">location_on</span> Your City (Demo)';
  const iconEl = document.getElementById('wIcon');
  if (iconEl) iconEl.innerHTML = '<span class="material-symbols-outlined" style="font-size:48px">partly_cloudy_day</span>';
  const humEl = document.getElementById('wHum');
  if (humEl) humEl.textContent = '72%';
  const windEl = document.getElementById('wWind');
  if (windEl) windEl.textContent = '14 km/h';
  const visEl = document.getElementById('wVis');
  if (visEl) visEl.textContent = '10.0 km';
  
  const strip = document.getElementById('forecastStrip');
  if (strip) {
    strip.innerHTML = ['9AM','12PM','3PM','6PM'].map((t,i) => `
      <div class="forecast-item">
        <div class="forecast-time">${t}</div>
        <div class="forecast-icon">${getWeatherIcon(['02d','01d','02d','04d'][i])}</div>
        <div class="forecast-temp">${[26,31,30,27][i]}°</div>
      </div>`).join('');
  }
}
loadWeather();
setInterval(loadWeather, 30*60*1000);

// ══════════════════════════════════════
// TICKER / CRYPTO
// ══════════════════════════════════════
const TICKERS = [
  { id:'bitcoin', sym:'BTC', name:'Bitcoin' },
  { id:'ethereum', sym:'ETH', name:'Ethereum' },
  { id:'solana', sym:'SOL', name:'Solana' },
  { id:'dogecoin', sym:'DOGE', name:'Dogecoin' },
  { id:'cardano', sym:'ADA', name:'Cardano' },
  { id:'ripple', sym:'XRP', name:'Ripple' },
];
const FX_PAIRS = [
  { pair:'USD/EUR', base:'usd', target:'eur' },
  { pair:'USD/GBP', base:'usd', target:'gbp' },
  { pair:'USD/INR', base:'usd', target:'inr' },
  { pair:'USD/JPY', base:'usd', target:'jpy' },
  { pair:'EUR/GBP', base:'eur', target:'gbp' },
  { pair:'AUD/USD', base:'aud', target:'usd' },
];
const STOCKS = [
  { sym:'AAPL', name:'Apple Inc.' },
  { sym:'MSFT', name:'Microsoft' },
  { sym:'GOOGL', name:'Alphabet' },
  { sym:'AMZN', name:'Amazon' },
  { sym:'TSLA', name:'Tesla' },
  { sym:'NVDA', name:'Nvidia' },
];
let tickerData = {};

async function loadTickers() {
  const isMarketPage = !!document.getElementById('cryptoGrid');
  const marquee = document.getElementById('marqueeInner');
  if (!isMarketPage && !marquee) return;

  const cached = cacheGet('smarttab_tickers', CACHE_TTL.ticker);
  if (cached) { tickerData = cached; renderAllSectors(); updateMarquee(); }

  // CRYPTO
  try {
    const ids = TICKERS.map(t=>t.id).join(',');
    const data = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`).then(r=>r.json());
    TICKERS.forEach(t => {
      if(data[t.id]) tickerData[t.sym] = { price: data[t.id].usd, change: data[t.id].usd_24h_change };
    });
  } catch(e) {
    TICKERS.forEach(t => { if(!tickerData[t.sym]) tickerData[t.sym] = { price: Math.random()*50000+100, change: (Math.random()-0.5)*8 }; });
  }

  // FX
  try {
    const fx = await fetch('https://open.er-api.com/v6/latest/USD').then(r=>r.json());
    FX_PAIRS.forEach(p => {
      const rate = p.base === 'usd' ? fx.rates[p.target.toUpperCase()] : (fx.rates[p.target.toUpperCase()] / fx.rates[p.base.toUpperCase()]);
      tickerData[p.pair] = { price: rate, change: (Math.random()-0.5)*0.8 };
    });
  } catch(e) {
    FX_PAIRS.forEach(p => { if(!tickerData[p.pair]) tickerData[p.pair] = { price: Math.random(), change: (Math.random()-0.5)*0.5 }; });
  }

  // STOCKS (Simulated for demo)
  STOCKS.forEach(s => {
    if(!tickerData[s.sym]) {
      const basePrices = { AAPL:190, MSFT:420, GOOGL:170, AMZN:180, TSLA:175, NVDA:900 };
      tickerData[s.sym] = { price: basePrices[s.sym] + (Math.random()-0.5)*5, change: (Math.random()-0.5)*4 };
    } else {
      tickerData[s.sym].price += (Math.random()-0.5)*0.5;
      tickerData[s.sym].change = (Math.random()-0.5)*4;
    }
  });

  cacheSet('smarttab_tickers', tickerData);
  renderAllSectors();
  updateMarquee();
  const updateEl = document.getElementById('tickerUpdated');
  if (updateEl) updateEl.textContent = 'Updated ' + new Date().toLocaleTimeString();
}

function renderAllSectors() {
  renderTickers('cryptoGrid', TICKERS.map(t=>({sym:t.sym, ...tickerData[t.sym]})));
  renderTickers('forexGrid', FX_PAIRS.map(p=>({sym:p.pair, ...tickerData[p.pair]})));
  renderTickers('stocksGrid', STOCKS.map(s=>({sym:s.sym, ...tickerData[s.sym]})));
}

function renderTickers(containerId, items) {
  const grid = document.getElementById(containerId);
  if (!grid) return;
  if (!items || items.some(it => it.price === undefined)) return;
  
  grid.innerHTML = '';
  items.forEach(item => {
    const up = item.change >= 0;
    const priceStr = item.price > 100 ? '$'+item.price.toLocaleString('en',{maximumFractionDigits:2}) :
                     item.price > 1   ? item.price.toFixed(4) : item.price.toFixed(6);
    grid.innerHTML += `<div class="ticker-item">
      <div class="ticker-symbol">${item.sym}</div>
      <div class="ticker-price">${priceStr}</div>
      <div class="ticker-change ${up?'up':'down'}">
        <span class="material-symbols-outlined" style="font-size:14px">${up?'arrow_drop_up':'arrow_drop_down'}</span> 
        ${Math.abs(item.change).toFixed(2)}%
      </div>
    </div>`;
  });
}

function updateMarquee() {
  const mi = document.getElementById('marqueeInner');
  if (!mi) return;
  const items = Object.entries(tickerData);
  const html = items.map(([sym, d]) => {
    const up = d.change >= 0;
    return `<span class="marquee-item"><span class="sym">${sym}</span>${d.price > 1 ? '$'+d.price.toLocaleString('en',{maximumFractionDigits:2}) : '$'+d.price.toFixed(5)} <span class="${up?'up':'down'}"><span class="material-symbols-outlined" style="font-size:12px">${up?'arrow_drop_up':'arrow_drop_down'}</span>${Math.abs(d.change).toFixed(2)}%</span></span>`;
  }).join('');
  mi.innerHTML = html + html;
}

loadTickers();
setInterval(loadTickers, 30*60*1000);

// ══════════════════════════════════════
// NEWS
// ══════════════════════════════════════
const savedCat = localStorage.getItem('smarttab_news_cat') || 'technology';
let currentCategory = savedCat;
let newsCache = {};

async function loadNews(cat) {
  if (!document.getElementById('newsList')) return;

  const lsKey = 'smarttab_news_' + cat;
  const lsCached = cacheGet(lsKey, CACHE_TTL.news);
  if (lsCached) { newsCache[cat] = lsCached; renderNews(lsCached); }
  else if (newsCache[cat]) { renderNews(newsCache[cat]); }
  else {
    const list = document.getElementById('newsList');
    list.innerHTML = '<div style="color:var(--text-mute);font-size:.8rem;text-align:center;padding:20px">Loading...</div>';
  }

  if (CONFIG.NEWS_KEY === 'PASTE_YOUR_NEWSAPI_KEY') {
    const demos = {
      technology: [
        { title:'OpenAI announces next-gen reasoning model with multi-modal capabilities', source:{name:'TechCrunch'}, url:'https://techcrunch.com/2024/05/13/openai-announces-gpt-4o-its-newest-flagship-ai-model/', publishedAt: new Date().toISOString() },
        { title:'Apple unveils transparent display MacBook concept at developer preview', source:{name:'The Verge'}, url:'https://www.theverge.com/2024/5/7/24151046/apple-ipad-pro-m4-announced-release-date-price', publishedAt: new Date().toISOString() },
        { title:'Google DeepMind achieves breakthrough in protein folding accuracy', source:{name:'Wired'}, url:'https://www.wired.com/story/google-deepmind-alphafold-3-protein-folding-breakthrough/', publishedAt: new Date().toISOString() },
        { title:'Nvidia GPU shortage expected to ease by Q3 amid new fab expansions', source:{name:'Ars Technica'}, url:'https://arstechnica.com/gadgets/2024/05/nvidias-next-gen-blackwell-gpus-are-coming-later-this-year/', publishedAt: new Date().toISOString() },
        { title:'Quantum computing startup claims 1000-qubit milestone with stable coherence', source:{name:'MIT Tech Review'}, url:'https://www.technologyreview.com/2024/01/16/1086661/quantum-computing-1000-qubit-milestone-ibm-ionq/', publishedAt: new Date().toISOString() },
      ],
      business: [
        { title:'Global markets rally as Fed signals rate cuts ahead of inflation data', source:{name:'Bloomberg'}, url:'https://www.bloomberg.com/news/articles/2024-05-15/us-core-inflation-cools-for-first-time-in-six-months', publishedAt: new Date().toISOString() },
        { title:'Tesla reports record delivery numbers in Q2, stock surges 8%', source:{name:'Reuters'}, url:'https://www.reuters.com/business/autos-transportation/tesla-quarterly-deliveries-fall-first-time-nearly-four-years-2024-04-02/', publishedAt: new Date().toISOString() },
        { title:'Amazon invests $2.75 billion in AI startup Anthropic', source:{name:'WSJ'}, url:'https://www.wsj.com/articles/amazon-invests-additional-2-75-billion-in-ai-startup-anthropic-04d3d8a7', publishedAt: new Date().toISOString() },
        { title:'OPEC+ extends production cuts as oil prices climb past $90/barrel', source:{name:'FT'}, url:'https://www.ft.com/content/1d3c0a32-1b1e-4b4e-869b-8f3a3a4b5c6d', publishedAt: new Date().toISOString() },
        { title:'Reddit IPO market starts trading on the NYSE', source:{name:'CNBC'}, url:'https://www.cnbc.com/2024/03/21/reddit-ipo-rddt-starts-trading-on-the-nyse.html', publishedAt: new Date().toISOString() },
      ],
      science: [
        { title:'NASA confirms water ice deposits near lunar south pole in new survey', source:{name:'NASA'}, url:'https://www.nasa.gov/news-release/nasa-confirms-water-ice-on-moon/', publishedAt: new Date().toISOString() },
        { title:'Scientists develop room-temperature superconductor material at scale', source:{name:'Nature'}, url:'https://www.nature.com/articles/d41586-024-00125-z', publishedAt: new Date().toISOString() },
        { title:'CRISPR therapy shows 93% efficacy in sickle cell disease clinical trial', source:{name:'Science'}, url:'https://www.science.org/content/article/crisper-therapy-shows-promise-sickle-cell-disease', publishedAt: new Date().toISOString() },
        { title:'James Webb captures image of exoplanet with signs of organic molecules', source:{name:'ESA'}, url:'https://www.esa.int/Science_Exploration/Space_Science/Webb_captures_organic_molecules', publishedAt: new Date().toISOString() },
        { title:'Brain-computer interface allows paralysed patient to type 90 words per minute', source:{name:'Nature Medicine'}, url:'https://www.nature.com/articles/s41586-023-06443-4', publishedAt: new Date().toISOString() },
      ]
    };
    newsCache[cat] = demos[cat] || demos.technology;
    cacheSet(lsKey, newsCache[cat]);
    renderNews(newsCache[cat]); return;
  }

  try {
    const r = await fetch(`https://newsapi.org/v2/top-headlines?category=${cat}&pageSize=5&apiKey=${CONFIG.NEWS_KEY}`).then(r=>r.json());
    newsCache[cat] = r.articles || [];
    cacheSet(lsKey, newsCache[cat]);
    renderNews(newsCache[cat]);
  } catch(e) {
    if (!lsCached && !newsCache[cat]) {
      const newsList = document.getElementById('newsList');
      if (newsList) newsList.innerHTML = '<div style="color:var(--text-mute);font-size:.8rem;text-align:center;padding:20px">Unable to load headlines</div>';
    }
  }
}

function renderNews(articles) {
  const list = document.getElementById('newsList');
  if (!list) return;
  if (!articles.length) { list.innerHTML = '<div style="color:var(--text-mute);font-size:.8rem;text-align:center;padding:20px">No articles found.</div>'; return; }
  list.innerHTML = articles.slice(0,5).map((a,i) => {
    const ago = timeSince(new Date(a.publishedAt));
    return `<a class="news-item" href="${a.url}" target="_blank" rel="noopener">
      <div class="news-num">0${i+1}</div>
      <div class="news-content">
        <div class="news-title">${a.title}</div>
        <div class="news-meta">${a.source.name} · ${ago}</div>
      </div>
      <div class="news-arrow"><span class="material-symbols-outlined">arrow_forward</span></div>
    </a>`;
  }).join('');
}

function timeSince(date) {
  const s = Math.floor((new Date() - date) / 1000);
  if (s < 60) return 'just now';
  if (s < 3600) return Math.floor(s/60) + 'm ago';
  if (s < 86400) return Math.floor(s/3600) + 'h ago';
  return Math.floor(s/86400) + 'd ago';
}

function switchTab(cat, btn) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  currentCategory = cat;
  localStorage.setItem('smarttab_news_cat', cat);
  loadNews(cat);
}

(function initNewsTab() {
  const btns = document.querySelectorAll('.tab-btn');
  if (btns.length === 0) return;
  btns.forEach(b => {
    if (b.textContent.trim().toLowerCase().startsWith(savedCat.substring(0,4).toLowerCase())) b.classList.add('active');
    else b.classList.remove('active');
  });
  loadNews(savedCat);
})();

setInterval(() => loadNews(currentCategory), 3600000);

// ══════════════════════════════════════
// DAILY INSIGHT
// ══════════════════════════════════════
let insightData = [];
let insightIdx = 0;
let insightTimer;

async function loadInsights() {
  if (!document.getElementById('insightBody')) return;
  let quoteItems = [];
  try {
    const q = await fetch('https://zenquotes.io/api/random').then(r=>r.json());
    if(q[0]) quoteItems = [{ type:'quote', icon:'format_quote', label:'Quote of the Day', text:`"${q[0].q}"`, author:`— ${q[0].a}`, img:'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200' }];
  } catch(e) {
    quoteItems = [{ type:'quote', icon:'format_quote', label:'Quote of the Day', text:'"The secret of getting ahead is getting started."', author:'— Mark Twain', img:'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200' }];
  }
  insightData = [...quoteItems, ...productivityTips];
  renderInsight();
  buildDots();
  startInsightAuto();
}

let bgToggle = true;
function renderInsight(animate=false) {
  const body = document.getElementById('insightBody');
  if (!body) return;
  const d = insightData[insightIdx] || {};
  const bg1 = document.getElementById('insightBg1');
  const bg2 = document.getElementById('insightBg2');
  
  const updateBg = () => {
    if (!d.img) return;
    const activeLayer = bgToggle ? bg1 : bg2;
    const inactiveLayer = bgToggle ? bg2 : bg1;
    if (activeLayer) activeLayer.style.backgroundImage = `url('${d.img}')`;
    if (activeLayer) activeLayer.classList.add('active');
    if (inactiveLayer) inactiveLayer.classList.remove('active');
    bgToggle = !bgToggle;
  };

  if(animate) {
    body.classList.remove('fade-in'); body.classList.add('fade-out');
    setTimeout(() => {
      body.textContent = d.text;
      const authorEl = document.getElementById('insightAuthor');
      if (authorEl) authorEl.textContent = d.author || '';
      const iconEl = document.getElementById('insightIcon');
      if (iconEl) iconEl.innerHTML = `<span class="material-symbols-outlined">${d.icon || 'lightbulb'}</span>`;
      const labelEl = document.getElementById('insightTypeLabel');
      if (labelEl) labelEl.textContent = d.label || '';
      updateBg();
      body.classList.remove('fade-out'); body.classList.add('fade-in');
      updateDots();
    }, 350);
  } else {
    body.textContent = d.text;
    const authorEl = document.getElementById('insightAuthor');
    if (authorEl) authorEl.textContent = d.author || '';
    const iconEl = document.getElementById('insightIcon');
    if (iconEl) iconEl.innerHTML = `<span class="material-symbols-outlined">${d.icon || 'lightbulb'}</span>`;
    const labelEl = document.getElementById('insightTypeLabel');
    if (labelEl) labelEl.textContent = d.label || '';
    updateBg();
    updateDots();
  }
}

function buildDots() {
  const dots = document.getElementById('insightDots');
  if (!dots) return;
  dots.innerHTML = '';
  insightData.forEach((_,i) => {
    const d = document.createElement('div');
    d.className = 'dot' + (i===0?' active':'');
    d.onclick = () => { insightIdx=i; renderInsight(true); resetInsightAuto(); };
    dots.appendChild(d);
  });
}
function updateDots() {
  document.querySelectorAll('.dot').forEach((d,i) => d.classList.toggle('active', i===insightIdx));
}
function nextInsight() { 
  if (insightData.length === 0) return;
  insightIdx=(insightIdx+1)%insightData.length; renderInsight(true); resetInsightAuto(); 
}
function prevInsight() { 
  if (insightData.length === 0) return;
  insightIdx=(insightIdx-1+insightData.length)%insightData.length; renderInsight(true); resetInsightAuto(); 
}
function startInsightAuto() { 
  if (!document.getElementById('insightBody')) return;
  insightTimer = setInterval(nextInsight, 8000); 
}
function resetInsightAuto() { clearInterval(insightTimer); startInsightAuto(); }
loadInsights();

// ══════════════════════════════════════
// TO-DO LIST
// ══════════════════════════════════════
let todos = JSON.parse(localStorage.getItem('smarttab_todos') || '[]');
const todoInput = document.getElementById('todoInput');
if (todoInput) {
  todoInput.addEventListener('keydown', e => { if(e.key === 'Enter') addTodo(); });
}

function saveTodos() { localStorage.setItem('smarttab_todos', JSON.stringify(todos)); }

function addTodo() {
  if (!todoInput) return;
  const val = todoInput.value.trim();
  if(!val) return;
  todos.push({ id: Date.now(), text: val, done: false });
  saveTodos(); renderTodos(); todoInput.value = '';
  showToast('<span class="material-symbols-outlined">add_task</span> Task added');
}

function toggleTodo(id) {
  todos = todos.map(t => t.id===id ? {...t, done:!t.done} : t);
  saveTodos(); renderTodos();
}

function deleteTodo(id) {
  const el = document.getElementById('todo-'+id);
  if(el) { el.classList.add('removing'); setTimeout(() => { todos=todos.filter(t=>t.id!==id); saveTodos(); renderTodos(); }, 300); }
}

function clearCompleted() {
  const n = todos.filter(t=>t.done).length;
  todos = todos.filter(t=>!t.done);
  saveTodos(); renderTodos();
  if(n) showToast(`${n} task${n>1?'s':''} cleared`);
}

function renderTodos() {
  const list = document.getElementById('todoList');
  if (!list) return;
  list.innerHTML = todos.length ? '' : '<div style="color:var(--text-mute);font-size:.78rem;text-align:center;padding:24px">No tasks yet. Add one above ↑</div>';
  todos.forEach(t => {
    const div = document.createElement('div');
    div.className = 'todo-item' + (t.done?' done':'');
    div.id = 'todo-'+t.id;
    div.innerHTML = `
      <div class="todo-check" onclick="toggleTodo(${t.id})">${t.done?'<span class="material-symbols-outlined" style="font-size:16px">check</span>':''}</div>
      <div class="todo-text">${t.text}</div>
      <button class="todo-del" onclick="deleteTodo(${t.id})"><span class="material-symbols-outlined" style="font-size:18px">close</span></button>`;
    list.appendChild(div);
  });
  const done = todos.filter(t=>t.done).length;
  const countEl = document.getElementById('todoCount');
  if (countEl) countEl.textContent = `${todos.length} task${todos.length!==1?'s':''} · ${done} done`;
}
renderTodos();

// ══════════════════════════════════════
// COLOR DASH GRID GAME
// ══════════════════════════════════════
const COLORS = ['#4f8ef7','#a78bfa','#34d399','#fb923c','#f472b6','#facc15'];
const COLS = 8, ROWS = 6;
let gameGridData = [], score = 0, moves = 0, selected = null;
let best = parseInt(localStorage.getItem('smarttab_gamebest') || '0');

function startGame() {
  const launcher = document.getElementById('gameLauncher');
  const game = document.getElementById('gridGame');
  if (!game) return;
  if (launcher) launcher.style.display = 'none';
  game.classList.add('active');
  score = 0; moves = 0; selected = null;
  gameGridData = Array.from({length:ROWS}, () => Array.from({length:COLS}, () => COLORS[Math.floor(Math.random()*COLORS.length)]));
  const bestEl = document.getElementById('gameBest');
  if (bestEl) bestEl.textContent = best;
  renderGrid();
  updateGameUI();
}

function renderGrid() {
  const g = document.getElementById('gameGrid');
  if (!g) return;
  g.style.gridTemplateColumns = `repeat(${COLS}, 32px)`;
  g.innerHTML = '';
  gameGridData.forEach((row, r) => {
    row.forEach((col, c) => {
      const cell = document.createElement('div');
      cell.className = 'gcell';
      cell.style.background = col;
      cell.style.boxShadow = `0 0 8px ${col}55`;
      cell.onclick = () => selectCell(r, c);
      if(selected && selected[0]===r && selected[1]===c) {
        cell.style.outline = '2px solid white';
        cell.style.outlineOffset = '2px';
      }
      g.appendChild(cell);
    });
  });
}

function selectCell(r, c) {
  if(!selected) { selected=[r,c]; renderGrid(); return; }
  const [r1,c1] = selected;
  if(r1===r && c1===c) { selected=null; renderGrid(); return; }
  [gameGridData[r1][c1], gameGridData[r][c]] = [gameGridData[r][c], gameGridData[r1][c1]];
  moves++;
  selected = null;
  checkMatches();
}

function checkMatches() {
  let matched = new Set();
  for(let r=0; r<ROWS; r++) for(let c=0; c<=COLS-3; c++) {
    if(gameGridData[r][c] && gameGridData[r][c]===gameGridData[r][c+1] && gameGridData[r][c]===gameGridData[r][c+2]) {
      [0,1,2].forEach(i => matched.add(`${r},${c+i}`));
    }
  }
  for(let r=0; r<=ROWS-3; r++) for(let c=0; c<COLS; c++) {
    if(gameGridData[r][c] && gameGridData[r][c]===gameGridData[r+1][c] && gameGridData[r][c]===gameGridData[r+2][c]) {
      [0,1,2].forEach(i => matched.add(`${r+i},${c}`));
    }
  }
  if(matched.size > 0) {
    score += matched.size * 10;
    if(score > best) { best = score; localStorage.setItem('smarttab_gamebest', best); }
    matched.forEach(key => { const [r,c] = key.split(',').map(Number); gameGridData[r][c] = null; });
    renderGrid();
    setTimeout(() => { dropCells(); setTimeout(() => { fillCells(); renderGrid(); updateGameUI(); }, 200); }, 300);
  } else {
    renderGrid(); updateGameUI();
  }
}

function dropCells() {
  for(let c=0; c<COLS; c++) {
    let col = gameGridData.map(r=>r[c]).filter(Boolean);
    while(col.length < ROWS) col.unshift(null);
    for(let r=0; r<ROWS; r++) gameGridData[r][c] = col[r];
  }
}

function fillCells() {
  for(let r=0; r<ROWS; r++) for(let c=0; c<COLS; c++) {
    if(!gameGridData[r][c]) gameGridData[r][c] = COLORS[Math.floor(Math.random()*COLORS.length)];
  }
}

function updateGameUI() {
  const scoreEl = document.getElementById('gameScore');
  if (scoreEl) scoreEl.textContent = score;
  const movesEl = document.getElementById('gameMoves');
  if (movesEl) movesEl.textContent = moves;
  const bestEl = document.getElementById('gameBest');
  if (bestEl) bestEl.textContent = best;
}

// ══════════════════════════════════════
// POMODORO TIMER
// ══════════════════════════════════════
let pomSeconds = 25*60, pomRunning = false, pomInterval, pomPhase = 'focus';
const pomPhases = { focus: 25*60, short: 5*60, long: 15*60 };

function renderPom() {
  const disp = document.getElementById('pomDisplay');
  if (!disp) return;
  const m = Math.floor(pomSeconds/60), s = pomSeconds%60;
  disp.textContent = `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
}

function togglePom() {
  const btn = document.getElementById('pomBtn');
  if (!btn) return;
  pomRunning = !pomRunning;
  btn.innerHTML = pomRunning ? '<span class="material-symbols-outlined" style="font-size:14px">pause</span> Pause' : '<span class="material-symbols-outlined" style="font-size:14px">play_arrow</span> Start';
  if(pomRunning) {
    pomInterval = setInterval(() => {
      pomSeconds--;
      renderPom();
      if(pomSeconds <= 0) {
        clearInterval(pomInterval); pomRunning = false;
        btn.innerHTML = '<span class="material-symbols-outlined" style="font-size:14px">play_arrow</span> Start';
        const phaseEl = document.getElementById('pomPhase');
        if(pomPhase === 'focus') { 
          pomPhase='short'; pomSeconds=pomPhases.short; 
          if(phaseEl) phaseEl.textContent='Break Time 🧘'; 
          showToast('🍅 Break time! 5 minutes.'); 
        } else { 
          pomPhase='focus'; pomSeconds=pomPhases.focus; 
          if(phaseEl) phaseEl.textContent='Focus Mode'; 
          showToast('🎯 Focus time! 25 minutes.'); 
        }
        renderPom();
      }
    }, 1000);
  } else { clearInterval(pomInterval); }
}

function resetPom() {
  clearInterval(pomInterval); pomRunning = false;
  pomPhase = 'focus'; pomSeconds = pomPhases.focus;
  const btn = document.getElementById('pomBtn');
  if (btn) btn.innerHTML = '<span class="material-symbols-outlined" style="font-size:14px">play_arrow</span> Start';
  const phaseEl = document.getElementById('pomPhase');
  if (phaseEl) phaseEl.textContent = 'Focus Mode';
  renderPom();
}
renderPom();

// ══════════════════════════════════════
// TOAST NOTIFICATIONS
// ══════════════════════════════════════
function showToast(msg, dur=2800) {
  const tc = document.getElementById('toastContainer');
  if (!tc) return;
  const t = document.createElement('div');
  t.className = 'toast'; t.innerHTML = msg;
  tc.appendChild(t);
  setTimeout(() => { t.style.opacity='0'; t.style.transform='translateX(20px)'; t.style.transition='all .4s';
    setTimeout(()=>t.remove(), 400); }, dur);
}

// ══════════════════════════════════════
// BOOT / LOADER
// ══════════════════════════════════════
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  if (loader) {
    setTimeout(() => {
      loader.classList.add('hide');
      showToast('<span class="material-symbols-outlined">check_circle</span> Dashboard ready!');
    }, 1600);
  }
});
