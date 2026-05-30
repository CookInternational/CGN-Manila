/* ============================================================
   CGN MANILA v1.2.1 Final | 2026-05-30T10:25:00Z UTC
   Frontend runtime for manila.cgnnews.net
   ============================================================ */
(function(){
  "use strict";
  const FALLBACK_API = "https://script.google.com/macros/s/AKfycbx41mQg-Ine3XZ-VrMI_SaQn4_K6cDQHA0cBFyGPgupu_edNFoNRjSLv2hoSe_bOytt/exec";
  const SITE = "https://manila.cgnnews.net";
  const MAIN_SITE = "https://www.cgnnews.net";
  const MAIN_PRIVACY = `${MAIN_SITE}/privacy-policy.html`;
  const MAIN_TERMS = `${MAIN_SITE}/terms-of-service.html`;
  const MAIN_COPYRIGHT = `${MAIN_SITE}/copyright/`;
  const MAIN_CONTACT = `${MAIN_SITE}/contact.html`;
  const MAIN_EDITORIAL = `${MAIN_SITE}/editorial-standards/`;
  const TIME_ZONE = "Asia/Manila";
  const MANILA_PAYPAL_BUTTON_ID = localStorage.getItem("CGN_MANILA_PAYPAL_BUTTON_ID") || "SET_PAYPAL_BUTTON_ID";
  const MANILA_CURRENCY = "PHP";
  const MANILA_PRICE_LABEL = localStorage.getItem("CGN_MANILA_PRICE_LABEL") || "₱ / PHP";
  const CGN_ANON_FREE_LIMIT = 3;
  const CGN_FREE_ACCOUNT_LIMIT = 6;
  const MANILA_WEATHER_POINT = { latitude:14.5995, longitude:120.9842, name:"Manila" };
  const BUREAU = "manila";
  const DEFAULT_LANG = "en";
  const LANGS = ["en", "fil", "es", "ceb"];
  const LANG_HREFLANGS = {"en": "en-US", "fil": "fil-PH", "es": "es", "ceb": "ceb-PH"};
  const DATE_LOCALES = {"en": "en-US", "fil": "fil-PH", "es": "es-ES", "ceb": "en-PH"};
  const I18N = {"en": {"langName": "American English", "htmlLang": "en-US", "dir": "ltr", "brand": "CGN Manila", "sub": "Independent coverage for Manila, the Philippines, Southeast Asia and the world.", "home": "Home", "news": "News", "world": "World", "politics": "Politics", "business": "Business", "markets": "Markets", "technology": "Technology", "entertainment": "Entertainment", "environment": "Environment", "energy": "Energy", "opinion": "Opinion", "local": "Manila", "weather": "Weather", "sports": "Sports", "bureaus": "Bureaus", "about": "About", "contact": "Contact", "subscribe": "Subscribe", "account": "Account", "login": "Login", "logout": "Sign out", "createAccount": "Create Account", "paywallTitle": "Subscribe to Continue Reading", "subscribeNow": "Subscribe / Pay With PayPal", "heroKicker": "Cook Global News Network", "heroTitle": "CGN Manila", "heroText": "Independent coverage for Manila, the Philippines, Southeast Asia and the world.", "readLatest": "Read Latest News", "changeLang": "Change Language", "latestNews": "Latest Manila Bureau Coverage", "latestSub": "News, analysis and bureau coverage for Manila readers.", "search": "Search stories", "allCategories": "All categories", "readMore": "Read more", "noStories": "No published Manila stories are available yet.", "updated": "Updated", "by": "By", "whatMeans": "What this means", "additional": "Additional Reporting", "articleMissing": "Article not found", "articleMissingText": "This article is not published yet or this link may be incorrect.", "legalNote": "CGN Manila is a publication of Cook Global News Network. Local wording is adapted for bureau readers while preserving CGN editorial standards.", "copyright": "Copyright © 2026 Cook Global News Network. All Rights Reserved.", "live": "Manila Bureau", "breaking": "Latest"}, "fil": {"langName": "Filipino / Tagalog", "htmlLang": "fil-PH", "dir": "ltr", "brand": "CGN Manila", "sub": "Malayang pagbabalita para sa Manila, Pilipinas, Timog-Silangang Asya at mundo.", "home": "Tahanan", "news": "Balita", "world": "Mundo", "politics": "Pulitika", "business": "Negosyo", "markets": "Merkado", "technology": "Teknolohiya", "entertainment": "Aliwan", "environment": "Kapaligiran", "energy": "Enerhiya", "opinion": "Opinyon", "local": "Manila", "weather": "Panahon", "sports": "Palakasan", "bureaus": "Mga Bureau", "about": "Tungkol", "contact": "Makipag-ugnayan", "subscribe": "Mag-subscribe", "account": "Account", "login": "Mag-sign in", "logout": "Mag-sign out", "createAccount": "Gumawa ng Account", "paywallTitle": "Mag-subscribe para Magpatuloy Magbasa", "subscribeNow": "Mag-subscribe / Magbayad sa PayPal", "heroKicker": "Cook Global News Network", "heroTitle": "CGN Manila", "heroText": "Malayang pagbabalita para sa Manila, Pilipinas, Timog-Silangang Asya at mundo.", "readLatest": "Basahin ang Pinakabagong Balita", "changeLang": "Palitan ang Wika", "latestNews": "Pinakabagong Balita ng Manila Bureau", "latestSub": "Balita, pagsusuri at bureau coverage para sa mga mambabasa sa Manila.", "search": "Maghanap ng kuwento", "allCategories": "Lahat ng kategorya", "readMore": "Magbasa pa", "noStories": "Wala pang nailathalang Manila stories.", "updated": "Na-update", "by": "Ni", "whatMeans": "Ano ang ibig sabihin nito", "additional": "Karagdagang Pag-uulat", "articleMissing": "Walang nahanap na artikulo", "articleMissingText": "Maaaring hindi pa nailalathala ang artikulong ito o maaaring mali ang link.", "legalNote": "Ang CGN Manila ay publikasyon ng Cook Global News Network. Iniangkop ang lokal na pananalita para sa mga mambabasa ng bureau habang sinusunod ang CGN editorial standards.", "copyright": "Copyright © 2026 Cook Global News Network. All Rights Reserved.", "live": "Manila Bureau", "breaking": "Pinakabago"}, "es": {"langName": "Español", "htmlLang": "es", "dir": "ltr", "brand": "CGN Manila", "sub": "Cobertura independiente para Manila, Filipinas, el Sudeste Asiático y el mundo.", "home": "Inicio", "news": "Noticias", "world": "Mundo", "politics": "Política", "business": "Negocios", "markets": "Mercados", "technology": "Tecnología", "entertainment": "Entretenimiento", "environment": "Medio ambiente", "energy": "Energía", "opinion": "Opinión", "local": "Manila", "weather": "Tiempo", "sports": "Deportes", "bureaus": "Bureaus", "about": "Acerca de", "contact": "Contacto", "subscribe": "Suscribirse", "account": "Cuenta", "login": "Iniciar sesión", "logout": "Cerrar sesión", "createAccount": "Crear cuenta", "paywallTitle": "Suscríbete para seguir leyendo", "subscribeNow": "Suscribirse / Pagar con PayPal", "heroKicker": "Cook Global News Network", "heroTitle": "CGN Manila", "heroText": "Cobertura independiente para Manila, Filipinas, el Sudeste Asiático y el mundo.", "readLatest": "Leer últimas noticias", "changeLang": "Cambiar idioma", "latestNews": "Última cobertura del bureau de Manila", "latestSub": "Noticias, análisis y cobertura del bureau para lectores de Manila.", "search": "Buscar noticias", "allCategories": "Todas las categorías", "readMore": "Leer más", "noStories": "Aún no hay noticias publicadas de Manila.", "updated": "Actualizado", "by": "Por", "whatMeans": "Qué significa esto", "additional": "Información adicional", "articleMissing": "Artículo no encontrado", "articleMissingText": "Este artículo aún no está publicado o el enlace puede ser incorrecto.", "legalNote": "CGN Manila es una publicación de Cook Global News Network. El lenguaje local se adapta para los lectores del bureau mientras se mantienen los estándares editoriales de CGN.", "copyright": "Copyright © 2026 Cook Global News Network. All Rights Reserved.", "live": "Bureau de Manila", "breaking": "Último"}, "ceb": {"langName": "Cebuano", "htmlLang": "ceb-PH", "dir": "ltr", "brand": "CGN Manila", "sub": "Independenteng coverage para sa Manila, Pilipinas, Southeast Asia ug sa kalibotan.", "home": "Balay", "news": "Balita", "world": "Kalibotan", "politics": "Politika", "business": "Negosyo", "markets": "Merkado", "technology": "Teknolohiya", "entertainment": "Kalingawan", "environment": "Kinaiyahan", "energy": "Enerhiya", "opinion": "Opinyon", "local": "Manila", "weather": "Panahon", "sports": "Dula", "bureaus": "Mga Bureau", "about": "Mahitungod", "contact": "Kontak", "subscribe": "Subscribe", "account": "Account", "login": "Sign in", "logout": "Sign out", "createAccount": "Create Account", "paywallTitle": "Subscribe aron makapadayon sa pagbasa", "subscribeNow": "Subscribe / Bayad sa PayPal", "heroKicker": "Cook Global News Network", "heroTitle": "CGN Manila", "heroText": "Independenteng coverage para sa Manila, Pilipinas, Southeast Asia ug sa kalibotan.", "readLatest": "Basaha ang Pinakabag-o", "changeLang": "Ilisi ang Pinulongan", "latestNews": "Pinakabag-ong Coverage sa Manila Bureau", "latestSub": "Balita, analysis ug bureau coverage para sa mga magbabasa sa Manila.", "search": "Pangitaa ang istorya", "allCategories": "Tanang category", "readMore": "Basaha pa", "noStories": "Wala pay na-publish nga Manila stories.", "updated": "Na-update", "by": "Ni", "whatMeans": "Unsay pasabot niini", "additional": "Dugang Reporting", "articleMissing": "Wala makit-i ang artikulo", "articleMissingText": "Wala pa ma-publish kini nga artikulo o basin sayop ang link.", "legalNote": "Ang CGN Manila usa ka publikasyon sa Cook Global News Network. Ang lokal nga pulong giangay para sa bureau readers samtang gisunod ang CGN editorial standards.", "copyright": "Copyright © 2026 Cook Global News Network. All Rights Reserved.", "live": "Manila Bureau", "breaking": "Pinakabag-o"}};
  const CATS = ["World","Politics","Business","Markets","Technology","Entertainment","Environment","Energy","Opinion","Local","Weather","Sports","Investigations","Special Reports"];
  const CAT_LABELS = {"en": {"World": "World", "Politics": "Politics", "Business": "Business", "Markets": "Markets", "Technology": "Technology", "Entertainment": "Entertainment", "Environment": "Environment", "Energy": "Energy", "Opinion": "Opinion", "Local": "Manila", "Weather": "Weather", "Sports": "Sports", "Investigations": "Investigations", "Special Reports": "Special Reports"}, "fil": {"World": "Mundo", "Politics": "Pulitika", "Business": "Negosyo", "Markets": "Merkado", "Technology": "Teknolohiya", "Entertainment": "Aliwan", "Environment": "Kapaligiran", "Energy": "Enerhiya", "Opinion": "Opinyon", "Local": "Manila", "Weather": "Panahon", "Sports": "Palakasan", "Investigations": "Investigations", "Special Reports": "Special Reports"}, "es": {"World": "Mundo", "Politics": "Política", "Business": "Negocios", "Markets": "Mercados", "Technology": "Tecnología", "Entertainment": "Entretenimiento", "Environment": "Medio ambiente", "Energy": "Energía", "Opinion": "Opinión", "Local": "Manila", "Weather": "Tiempo", "Sports": "Deportes", "Investigations": "Investigaciones", "Special Reports": "Informes especiales"}, "ceb": {"World": "Kalibotan", "Politics": "Politika", "Business": "Negosyo", "Markets": "Merkado", "Technology": "Teknolohiya", "Entertainment": "Kalingawan", "Environment": "Kinaiyahan", "Energy": "Enerhiya", "Opinion": "Opinyon", "Local": "Manila", "Weather": "Panahon", "Sports": "Dula", "Investigations": "Investigations", "Special Reports": "Special Reports"}};
  function getApiBase(){
    const meta = document.querySelector('meta[name="cgn-api-base"]');
    const val = (window.CGN_API_BASE || (meta && meta.content) || localStorage.getItem("CGN_API_BASE") || FALLBACK_API || "").trim();
    return val.replace(/\?+$/,'').replace(/\/+$/,'');
  }
  function getLang(){
    const path = location.pathname.split('/').filter(Boolean);
    const first = path[0];
    if(LANGS.includes(first)) return first;
    const meta = document.querySelector('meta[name="cgn-language"]');
    return (meta && LANGS.includes(meta.content)) ? meta.content : DEFAULT_LANG;
  }
  function t(key){return (I18N[getLang()]||I18N.en)[key] || I18N.en[key] || key;}
  function languagePath(lang){
    const parts = location.pathname.split('/').filter(Boolean);
    if(LANGS.includes(parts[0])) parts[0]=lang; else parts.unshift(lang);
    return '/' + parts.join('/') + (location.pathname.endsWith('/') ? '/' : '');
  }
  function canonicalLanguagePath(lang, article){
    if(article){
      const date = article.year && article.month && article.day ? `${article.year}/${article.month}/${article.day}` : dateParts(article.published_at).join('/');
      return `${SITE}/${lang}/news/${date}/${article.slug || slugify(article.title)}/`;
    }
    const parts = location.pathname.split('/').filter(Boolean);
    if(LANGS.includes(parts[0])) parts[0]=lang; else parts.unshift(lang);
    return `${SITE}/${parts.join('/')}${parts.length ? '/' : ''}`;
  }
  function dateParts(v){
    const d = v ? new Date(v) : new Date();
    if(isNaN(d)) return ['2026','01','01'];
    return [String(d.getUTCFullYear()), String(d.getUTCMonth()+1).padStart(2,'0'), String(d.getUTCDate()).padStart(2,'0')];
  }
  function slugify(v){return String(v||'').toLowerCase().replace(/&/g,' and ').replace(/[^a-z0-9\s-]/g,'').trim().replace(/\s+/g,'-').replace(/-+/g,'-').replace(/^-+|-+$/g,'') || 'article';}
  function esc(v){return String(v==null?'':v).replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));}
  function stripHtml(v){const d=document.createElement('div'); d.innerHTML=String(v||''); return (d.textContent||d.innerText||'').trim();}
  function prettyDate(v){
    try{return new Intl.DateTimeFormat(DATE_LOCALES[getLang()]||'en-US', {day:'numeric',month:'long',year:'numeric',timeZone:TIME_ZONE}).format(new Date(v||Date.now()));}
    catch(e){return String(v||'').slice(0,10);}
  }
  function articleUrl(a){
    if(a && a.url && /^https?:\/\//.test(a.url)) return a.url;
    if(a && a.canonical_url) return a.canonical_url.replace(SITE,'');
    const p = a && a.year ? [a.year,a.month,a.day] : dateParts(a && a.published_at);
    return `/${getLang()}/news/${p[0]}/${p[1]}/${p[2]}/${a.slug || slugify(a.title)}/`;
  }
  const CATEGORY_IMAGE_MAP = {
    world:'/assets/category/CGNWorld01.png',
    politics:'/assets/category/CGNPolitics01.png',
    business:'/assets/category/CGNBusiness01.jpeg',
    markets:'/assets/category/CGNMarkets01.png',
    technology:'/assets/category/CGNTechnology01.png',
    entertainment:'/assets/category/CGNEntertainment01.png',
    environment:'/assets/category/CGNEnvironment01.png',
    energy:'/assets/category/CGNEnergy01.png',
    opinion:'/assets/category/CGNOpinion01.png',
    local:'/assets/category/CGNLocal01.png',
    weather:'/assets/CGNWeatherBrief01.png',
    sports:'/assets/CGNSportsHighlights01.png'
  };
  function normalizeImagePath(v){
    const raw = String(v||'').trim();
    if(!raw) return '';
    const file = raw.split('/').pop();
    if(!file) return raw;
    if(file==='CGNBusiness01.jpeg') return '/assets/category/CGNBusiness01.jpeg';
    if(file==='CGNPolitics01.png') return '/assets/category/CGNPolitics01.png';
    if(file==='CGNLocal01.png') return '/assets/category/CGNLocal01.png';
    if(file==='CGNEntertainment01.png') return '/assets/category/CGNEntertainment01.png';
    if(file==='CGNWorld01.png') return '/assets/category/CGNWorld01.png';
    if(file==='CGNMarkets01.png') return '/assets/category/CGNMarkets01.png';
    if(file==='CGNTechnology01.png') return '/assets/category/CGNTechnology01.png';
    if(file==='CGNEnvironment01.png') return '/assets/category/CGNEnvironment01.png';
    if(file==='CGNEnergy01.png') return '/assets/category/CGNEnergy01.png';
    if(file==='CGNOpinion01.png') return '/assets/category/CGNOpinion01.png';
    if(file==='CGNWeatherBrief01.png') return '/assets/CGNWeatherBrief01.png';
    if(file==='CGNSportsHighlights01.png') return '/assets/CGNSportsHighlights01.png';
    if(file==='CGNNewsLogo01.png') return '/assets/CGNNewsLogo01.png';
    return raw;
  }
  function categoryImage(category){
    const key = String(category||'').toLowerCase().trim();
    return CATEGORY_IMAGE_MAP[key] || '/assets/CGNWebBanner01.png';
  }
  function imageUrl(a){
    const direct = normalizeImagePath(a && (a.hero_image_url || a.image));
    return direct || categoryImage(a && a.category);
  }
  function configureHead(article){
    const lang = getLang(), i=I18N[lang]||I18N.en;
    document.documentElement.lang = article ? (article.html_lang || i.htmlLang) : i.htmlLang;
    document.documentElement.dir = i.dir || 'ltr';
    document.body.setAttribute('data-lang', lang);
    const title = article ? `${article.seo_title || article.title} | ${i.brand}` : `${i.brand} | ${i.sub}`;
    const desc = article ? (article.seo_description || article.summary || article.subtitle || i.sub) : i.sub;
    document.title = title;
    setMeta('description', desc);
    setMeta('og:title', title, 'property'); setMeta('og:description', desc, 'property'); setMeta('og:type', article?'article':'website','property'); setMeta('og:url', article?canonicalLanguagePath(lang, article):`${SITE}/${lang}/`,'property'); setMeta('og:image', article?imageUrl(article):`${SITE}/assets/CGNWebBanner01.png`,'property');
    setMeta('twitter:card', 'summary_large_image'); setMeta('twitter:title', title); setMeta('twitter:description', desc); setMeta('twitter:image', article?imageUrl(article):`${SITE}/assets/CGNWebBanner01.png`);
    setCanonical(article?canonicalLanguagePath(lang, article):`${SITE}/${lang}/`);
    setAlternateLangs(article);
    injectJsonLd(article);
  }
  function setMeta(name,content,attr='name'){let m=document.querySelector(`meta[${attr}="${name}"]`); if(!m){m=document.createElement('meta'); m.setAttribute(attr,name); document.head.appendChild(m);} m.setAttribute('content', String(content||''));}
  function setCanonical(href){let l=document.querySelector('link[rel="canonical"]'); if(!l){l=document.createElement('link'); l.rel='canonical'; document.head.appendChild(l);} l.href=href;}
  function setAlternateLangs(article){document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(n=>n.remove()); const add=(hl,href)=>{const l=document.createElement('link'); l.rel='alternate'; l.hreflang=hl; l.href=href; document.head.appendChild(l);}; LANGS.forEach(l=>add(LANG_HREFLANGS[l]||l, canonicalLanguagePath(l, article))); add('x-default', canonicalLanguagePath(DEFAULT_LANG, article));}
  function injectJsonLd(article){
    document.querySelectorAll('script[data-cgn-jsonld]').forEach(n=>n.remove());
    const base = article ? {
      '@context':'https://schema.org','@type':'NewsArticle',headline:article.title,description:article.seo_description||article.summary||article.subtitle||'',image:[imageUrl(article)],datePublished:article.published_at||article.updated_at,dateModified:article.updated_at||article.published_at,author:{'@type':'Person',name:article.author||'CGN Manila'},publisher:{'@type':'NewsMediaOrganization',name:'CGN Manila',url:SITE,logo:{'@type':'ImageObject',url:`${SITE}/assets/CGNNewsLogo01.png`}},mainEntityOfPage:canonicalLanguagePath(getLang(), article),inLanguage:article.in_language || (LANG_HREFLANGS[getLang()]||getLang())
    } : {'@context':'https://schema.org','@type':'NewsMediaOrganization',name:'CGN Manila',url:SITE,logo:`${SITE}/assets/CGNNewsLogo01.png`,sameAs:[MAIN_SITE]};
    const s=document.createElement('script'); s.type='application/ld+json'; s.dataset.cgnJsonld='1'; s.textContent=JSON.stringify(base); document.head.appendChild(s);
  }
  function manilaClockText(){
    const locale = DATE_LOCALES[getLang()] || 'en-US';
    const now = new Date();
    const date = new Intl.DateTimeFormat(locale,{day:'2-digit',month:'long',year:'numeric',timeZone:TIME_ZONE}).format(now);
    const time = new Intl.DateTimeFormat(locale,{hour:'numeric',minute:'2-digit',second:'2-digit',hour12:true,timeZone:TIME_ZONE,timeZoneName:'short'}).format(now);
    return `Manila | ${date} | ${time}`;
  }
  function startManilaClock(){
    const el=document.getElementById('cgn-bureau-clock');
    if(!el) return;
    const tick=()=>{ el.textContent=manilaClockText(); };
    tick();
    if(window.__cgnManilaClockTimer) clearInterval(window.__cgnManilaClockTimer);
    window.__cgnManilaClockTimer=setInterval(tick,1000);
  }
  function weatherCodeText_(code){
    const map={0:['☀️','Clear'],1:['🌤️','Mainly clear'],2:['⛅','Partly cloudy'],3:['☁️','Cloudy'],45:['🌫️','Fog'],48:['🌫️','Fog'],51:['🌦️','Drizzle'],53:['🌦️','Drizzle'],55:['🌧️','Drizzle'],61:['🌧️','Light rain'],63:['🌧️','Rain'],65:['🌧️','Heavy rain'],80:['🌦️','Showers'],81:['🌧️','Showers'],82:['⛈️','Heavy showers'],95:['⛈️','Thunderstorm'],96:['⛈️','Thunderstorm'],99:['⛈️','Thunderstorm']};
    return map[Number(code)] || ['🌡️','Weather'];
  }
  async function updateManilaBureauWeather(){
    const el=document.getElementById('cgn-bureau-weather');
    if(!el) return;
    try{
      const url=`https://api.open-meteo.com/v1/forecast?latitude=${MANILA_WEATHER_POINT.latitude}&longitude=${MANILA_WEATHER_POINT.longitude}&current=temperature_2m,apparent_temperature,weather_code,relative_humidity_2m,wind_speed_10m&timezone=Asia%2FManila`;
      const res=await fetch(url,{cache:'no-store'});
      if(!res.ok) throw new Error('Weather API '+res.status);
      const data=await res.json();
      const c=data.current||{};
      const label=weatherCodeText_(c.weather_code);
      const temp=(typeof c.temperature_2m==='number') ? Math.round(c.temperature_2m)+'°C' : '--°C';
      const feels=(typeof c.apparent_temperature==='number') ? 'Feels '+Math.round(c.apparent_temperature)+'°C' : '';
      el.textContent=`${label[0]} Manila Weather ${temp}${feels ? ' · '+feels : ''}`;
      el.title=`${label[1]} · humidity ${c.relative_humidity_2m||'--'}% · wind ${Math.round(c.wind_speed_10m||0)} km/h`;
    }catch(err){
      el.textContent='Manila Weather Center';
      el.title='Open Manila Weather Center';
    }
  }
  function startManilaBureauWeather(){
    updateManilaBureauWeather();
    if(window.__cgnManilaWeatherTimer) clearInterval(window.__cgnManilaWeatherTimer);
    window.__cgnManilaWeatherTimer=setInterval(updateManilaBureauWeather,10*60*1000);
  }

  function apiGet(params){
    const url = `${getApiBase()}?${new URLSearchParams(params).toString()}`;
    return fetch(url, {cache:'no-store'}).then(r=>{ if(!r.ok) throw new Error('CGN account API '+r.status); return r.json(); });
  }
  function getUser(){ return localStorage.getItem('user_id') || ''; }
  function setUser(id, email){ if(id) localStorage.setItem('user_id', id); if(email) localStorage.setItem('cgn_user_email', email); }
  function getAnonId(){
    let id = localStorage.getItem('cgn_manila_anon_id');
    if(!id){ id = 'manila_anon_' + Math.random().toString(36).slice(2) + Date.now().toString(36); localStorage.setItem('cgn_manila_anon_id', id); }
    return id;
  }
  function isActiveStatus(v){ const s=String(v==null?'':v).toLowerCase(); return v===true || s==='true' || s==='active' || s==='paid' || s==='subscriber'; }
  async function refreshAccountButton(){
    const btn=document.getElementById('cgn-account-btn'); if(!btn) return;
    const uid=getUser();
    if(!uid){ btn.textContent=t('login'); btn.classList.remove('subscribed'); return; }
    btn.textContent=t('account');
    try{ const data=await apiGet({action:'manila_subscription_status', user_id:uid}); const active=isActiveStatus(data.subscriber)||isActiveStatus(data.subscription_status)||data.can_subscribe===false; localStorage.setItem('subscriber', active?'true':'false'); btn.classList.toggle('subscribed', active); }
    catch(e){ btn.classList.toggle('subscribed', localStorage.getItem('subscriber')==='true'); }
  }
  function accountModalShell(){
    let modal=document.getElementById('cgn-account-modal');
    if(!modal){
      modal=document.createElement('div'); modal.id='cgn-account-modal'; modal.className='account-modal'; modal.innerHTML=`<div class="account-modal-backdrop" data-cgn-close-account></div><section class="account-modal-card" role="dialog" aria-modal="true" aria-label="CGN Manila account"><button class="account-modal-close" type="button" data-cgn-close-account>×</button><div id="cgn-account-modal-body"></div></section>`; document.body.appendChild(modal);
      modal.addEventListener('click', e=>{ if(e.target.hasAttribute('data-cgn-close-account')) closeAccountModal(); });
    }
    return modal;
  }
  function openAccountModal(mode){ const modal=accountModalShell(); modal.classList.add('open'); renderAccountModal(mode || (getUser()?'dashboard':'login')); }
  function closeAccountModal(){ const modal=document.getElementById('cgn-account-modal'); if(modal) modal.classList.remove('open'); }
  function renderAccountModal(mode){
    const body=document.getElementById('cgn-account-modal-body'); if(!body) return;
    const uid=getUser();
    if(mode==='signup'){
      body.innerHTML=`<h2>${esc(t('createAccount'))}</h2><p>Create a free CGN News account for ${CGN_FREE_ACCOUNT_LIMIT} free articles and subscription access across CGN News.</p><form class="account-form" onsubmit="return CGNManila.signupSubmit(event)"><label>Email</label><input type="email" id="acct-email" autocomplete="email" required><label>Password</label><input type="password" id="acct-password" autocomplete="new-password" required minlength="6"><button class="btn gold" type="submit">${esc(t('createAccount'))}</button><button class="btn alt" type="button" onclick="CGNManila.openAccountModal('login')">${esc(t('login'))}</button></form><div id="account-modal-message" class="account-message"></div>`; return;
    }
    if(!uid || mode==='login'){
      body.innerHTML=`<h2>${esc(t('login'))}</h2><p>Use your main CGN News account. Manila uses the same Users, paywall and subscription system.</p><form class="account-form" onsubmit="return CGNManila.loginSubmit(event)"><label>Email</label><input type="email" id="acct-email" autocomplete="email" required><label>Password</label><input type="password" id="acct-password" autocomplete="current-password" required><button class="btn gold" type="submit">${esc(t('login'))}</button><button class="btn alt" type="button" onclick="CGNManila.openAccountModal('signup')">${esc(t('createAccount'))}</button></form><p class="small-note"><a href="${MAIN_SITE}/reset-password/">Forgot password?</a></p><div id="account-modal-message" class="account-message"></div>`; return;
    }
    body.innerHTML=`<h2>${esc(t('account'))}</h2><div class="account-loading">Loading account…</div>`;
    apiGet({action:'manila_account_details', user_id:uid}).then(data=>renderAccountDashboard(data)).catch(e=>{ body.innerHTML=`<h2>${esc(t('account'))}</h2><p class="account-message error">${esc(e.message)}</p><button class="btn alt" onclick="CGNManila.logout()">${esc(t('logout'))}</button>`; });
  }
  function renderAccountDashboard(data){
    const body=document.getElementById('cgn-account-modal-body'); if(!body) return;
    const acct=data.account||{}, sub=data.subscription||{}; const active=isActiveStatus(sub.subscriber)||isActiveStatus(sub.subscription_status)||acct.active_subscriber===true;
    localStorage.setItem('subscriber', active?'true':'false');
    body.innerHTML=`<h2>${esc(t('account'))}</h2><div class="account-mini-grid"><div><span>Email</span><strong>${esc(acct.email||localStorage.getItem('cgn_user_email')||'')}</strong></div><div><span>Status</span><strong>${active?'Subscriber':'Free Account'}</strong></div><div><span>Currency</span><strong>${MANILA_CURRENCY}</strong></div><div><span>Renewal</span><strong>${esc((sub.subscription_expires_at||sub.renewal_expected_at||'').slice(0,10)||'—')}</strong></div></div>${active?`<div class="account-success">Your CGN News subscription is active for CGN Manila.</div>`:paypalCheckoutHtml('account')}<div class="account-actions"><a class="btn alt" href="/${getLang()}/account/">Account Page</a><button class="btn alt" type="button" onclick="CGNManila.logout()">${esc(t('logout'))}</button></div><div id="account-modal-message" class="account-message"></div>`;
    refreshAccountButton();
  }
  function setAccountMessage(msg, type){ const el=document.getElementById('account-modal-message'); if(el){ el.className='account-message '+(type||''); el.textContent=msg||''; } }
  async function loginSubmit(ev){ ev.preventDefault(); const email=document.getElementById('acct-email').value.trim(); const pass=document.getElementById('acct-password').value; setAccountMessage('Signing in…'); try{ const data=await apiGet({action:'login', email, password:pass}); if(!data.success) throw new Error(data.error||'Login failed'); setUser(data.user_id, data.email||email); setAccountMessage('Signed in.','success'); renderAccountModal('dashboard'); }catch(e){ setAccountMessage(e.message,'error'); } return false; }
  async function signupSubmit(ev){ ev.preventDefault(); const email=document.getElementById('acct-email').value.trim(); const pass=document.getElementById('acct-password').value; setAccountMessage('Creating account…'); try{ const data=await apiGet({action:'signup', email, password:pass}); if(!data.success) throw new Error(data.error||'Signup failed'); setUser(data.user_id, data.email||email); setAccountMessage('Account created.','success'); renderAccountModal('dashboard'); }catch(e){ setAccountMessage(e.message,'error'); } return false; }
  function logout(){ localStorage.removeItem('user_id'); localStorage.removeItem('subscriber'); refreshAccountButton(); closeAccountModal(); if(location.pathname.includes('/account/')) renderStaticPage('account'); }
  function paypalCheckoutHtml(context){
    return `<div class="paypal-box"><h3>Subscribe with PayPal</h3><p>PayPal checkout is configured for Manila in ${MANILA_PRICE_LABEL}. After PayPal returns, CGN Manila attaches access to this same CGN account.</p><form action="https://www.paypal.com/ncp/payment/${encodeURIComponent(MANILA_PAYPAL_BUTTON_ID)}" method="post" target="_blank" class="paypal-form" onsubmit="localStorage.setItem('last_article_url', location.href)"><input type="hidden" name="currency_code" value="${MANILA_CURRENCY}"><input type="submit" value="Pay with PayPal · ${MANILA_PRICE_LABEL}"></form><button type="button" class="btn alt" onclick="CGNManila.confirmManilaPayment()">Already paid? Confirm subscription</button><p class="small-note">Use the same email and account after checkout. If PayPal opens in a new tab, return here and confirm.</p></div>`;
  }
  async function confirmManilaPayment(){ const uid=getUser(); if(!uid){ openAccountModal('login'); return; } setAccountMessage('Confirming subscription…'); try{ const data=await apiGet({action:'manila_confirm_payment', user_id:uid}); if(!data.success) throw new Error(data.error||'Unable to confirm payment'); localStorage.setItem('subscriber','true'); setAccountMessage('Subscription confirmed.','success'); renderAccountModal('dashboard'); }catch(e){ setAccountMessage(e.message,'error'); } }
  function cgnMeterSlug(article){ return ['manila', getLang(), article && (article.slug||slugify(article.title))].filter(Boolean).join(':'); }
  function localAccessDecision(article){
    if(isActiveStatus(localStorage.getItem('subscriber')) || article.locked===false) return {locked:false, reason:'subscriber_or_backend'};
    if(article.locked===true || String(article.locked||'').toLowerCase()==='true') return {locked:true, limit:article.paywall_limit|| (getUser()?CGN_FREE_ACCOUNT_LIMIT:CGN_ANON_FREE_LIMIT), reason:'backend'};
    const key=getUser()?`cgn_manila_meter_user_${getUser()}`:'cgn_manila_meter_anon';
    const slug=cgnMeterSlug(article); let slugs=[]; try{ slugs=JSON.parse(localStorage.getItem(key)||'[]'); }catch(e){}
    slugs=[...new Set((slugs||[]).map(String))]; if(slugs.includes(slug)) return {locked:false, limit:getUser()?CGN_FREE_ACCOUNT_LIMIT:CGN_ANON_FREE_LIMIT, reason:'already_counted'};
    const limit=getUser()?CGN_FREE_ACCOUNT_LIMIT:CGN_ANON_FREE_LIMIT; if(slugs.length>=limit) return {locked:true, limit, reason:'local_meter'};
    slugs.push(slug); try{ localStorage.setItem(key, JSON.stringify(slugs)); }catch(e){} return {locked:false, limit, reason:'counted'};
  }
  function paywallHtml(article, decision){ const logged=!!getUser(); return `<section class="paywall"><h2>${esc(t('paywallTitle'))}</h2><p>${logged?'Your free CGN News account is active. Subscribe for unlimited CGN Manila access.':'Create a free account to get 6 free articles. Subscribers get unlimited access.'}</p><p>${decision&&decision.limit?`Free article limit: ${decision.limit}.`:''}</p>${logged?paypalCheckoutHtml('article'):`<button class="btn gold" onclick="CGNManila.openAccountModal('login')">${esc(t('login'))} / ${esc(t('createAccount'))}</button>`}</section>`; }
  function previewBody(html){ const parts=String(html||'').split('</p>'); return parts.length>3 ? parts.slice(0,3).join('</p>')+'</p>' : String(html||''); }


  function socialIconsHtml(){
    return `
      <a class="cgn-social-icon-link" href="https://instagram.com/cookglobalnews" target="_blank" rel="noopener" aria-label="CGN News on Instagram">
        <svg class="social-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm0 2h10c1.654 0 3 1.346 3 3v10c0 1.654-1.346 3-3 3H7c-1.654 0-3-1.346-3-3V7c0-1.654 1.346-3 3-3zm5 2.8A5.2 5.2 0 006.8 12 5.2 5.2 0 0012 17.2 5.2 5.2 0 0017.2 12 5.2 5.2 0 0012 6.8zm0 2A3.2 3.2 0 0115.2 12 3.2 3.2 0 0112 15.2 3.2 3.2 0 018.8 12 3.2 3.2 0 0112 8.8zm4.5-2.3a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4z"/>
        </svg>
        <span class="sr-only">Instagram</span>
      </a>

      <a class="cgn-social-icon-link" href="https://x.com/CookGlobalNews" target="_blank" rel="noopener" aria-label="CGN News on X">
        <svg class="social-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M18.244 2H21l-6.56 7.5L22 22h-6.828l-5.35-7.01L3.5 22H1l7.03-8.03L2 2h6.914l4.83 6.37L18.244 2zM17.15 20h1.52L7.03 4H5.4l11.75 16z"/>
        </svg>
        <span class="sr-only">X</span>
      </a>

      <a class="cgn-social-icon-link" href="https://youtube.com/@CookGlobalNews" target="_blank" rel="noopener" aria-label="CGN News on YouTube">
        <svg class="social-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.376.505A3.016 3.016 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.376-.505a3.016 3.016 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.75 15.568V8.432L15.818 12 9.75 15.568z"/>
        </svg>
        <span class="sr-only">YouTube</span>
      </a>
    `;
  }

  function renderShell(){
    const lang = getLang(), i = I18N[lang] || I18N.en;
    const top = document.getElementById('cgn-manila-header');

    if(top){
      top.innerHTML = `
        <a class="skip-link" href="#main">Skip to content</a>

        <div class="cgn-topline">
          <div class="cgn-topline-inner">
            <div class="cgn-topline-left">
              <strong>${esc(i.live)}</strong>
              <span aria-hidden="true">·</span>
              <span class="bureau-clock" id="cgn-bureau-clock" aria-live="polite">Manila | Philippine Standard Time</span>
              <a class="bureau-weather" id="cgn-bureau-weather" href="/${lang}/weather/">Manila Weather Center</a>
            </div>

            <div class="cgn-lang" aria-label="${esc(i.changeLang)}">
              ${LANGS.map(l=>`<a class="${l===lang?'active':''}" href="${esc(languagePath(l))}">${esc(I18N[l].langName)}</a>`).join('')}
              <button id="cgn-account-btn" class="account-top-btn" type="button" onclick="CGNManila.openAccountModal()">${esc(getUser()?i.account:i.login)}</button>
            </div>
          </div>
        </div>

        <header class="cgn-header">
          <div class="cgn-header-inner">
            <a class="cgn-brand" href="/${lang}/" aria-label="${esc(i.brand)} homepage">
              <img src="/assets/CGNNewsLogo01.png" alt="${esc(i.brand)} logo" width="95" height="95">
              <span>
                <span class="cgn-brand-title">${esc(i.brand)}</span>
                <span class="network-name">Cook Global News Network</span>
              </span>
            </a>

            <button class="cgn-menu-toggle" type="button" aria-expanded="false" aria-label="Open menu">Menu</button>

            <nav class="cgn-nav" aria-label="Main navigation">
              ${navLinks(lang).join('')}
            </nav>

            <div class="cgn-header-social" aria-label="CGN social media links">
              ${socialIconsHtml()}
            </div>
          </div>
        </header>

        <div class="cgn-breaking">
          <div class="cgn-breaking-inner">
            <span class="cgn-breaking-label">${esc(i.breaking)}</span>
            <span class="cgn-breaking-text" id="cgn-breaking-text">${esc(i.sub)}</span>
          </div>
        </div>`;

      const btn = top.querySelector('.cgn-menu-toggle'), nav = top.querySelector('.cgn-nav');
      if(btn && nav){
        btn.addEventListener('click',()=>{
          nav.classList.toggle('open');
          btn.setAttribute('aria-expanded', nav.classList.contains('open') ? 'true' : 'false');
        });
      }

      startManilaClock();
      startManilaBureauWeather();
      refreshAccountButton();
    }

    const foot = document.getElementById('cgn-manila-footer');

    if(foot){
      foot.innerHTML = `
        <footer class="footer">
          <div class="footer-container">

            <div class="footer-brand-block">
              <a href="/${lang}/" aria-label="${esc(i.brand)} homepage">
                <img src="/assets/CGNNewsLogo01.png" class="footer-logo" alt="${esc(i.brand)}">
              </a>
              <p>Real-Time News.<br>Global Perspective.</p>
              <p class="footer-bureau-name">${esc(i.brand)}</p>
            </div>

            <div>
              <h4><a href="/${lang}/news/">${esc(i.news)}</a></h4>
              <a href="/${lang}/category/world/">${esc(i.world)}</a><br>
              <a href="/${lang}/category/politics/">${esc(i.politics)}</a><br>
              <a href="/${lang}/category/business/">${esc(i.business)}</a><br>
              <a href="/${lang}/category/markets/">${esc(i.markets)}</a><br>
              <a href="/${lang}/category/technology/">${esc(i.technology)}</a><br>
              <a href="/${lang}/weather/">${esc(i.weather)}</a><br>
              <a href="/${lang}/sports/">${esc(i.sports)}</a>
            </div>

            <div>
              <h4><a href="/${lang}/bureaus/">${esc(i.bureaus)}</a></h4>
              <a href="/${lang}/category/entertainment/">${esc(i.entertainment)}</a><br>
              <a href="/${lang}/category/environment/">${esc(i.environment)}</a><br>
              <a href="/${lang}/category/energy/">${esc(i.energy)}</a><br>
              <a href="/${lang}/category/opinion/">${esc(i.opinion)}</a><br>
              <a href="/${lang}/category/local/">${esc(i.local)}</a><br>
              <a href="/${lang}/category/investigations/">Investigations</a><br>
              <a href="/${lang}/category/special-reports/">Special Reports</a><br>
              <a href="https://archives.cgnnews.net/">Archives</a>
            </div>

            <div class="footer-legal-links">
              <h4><a href="${MAIN_EDITORIAL}">Editorial Standards</a></h4>
              <a href="https://www.cgnnews.net/about">About Us</a><br>
              <a href="${MAIN_CONTACT}">${esc(i.contact)}</a><br>
              <a href="${MAIN_TERMS}">Terms of Service</a><br>
              <a href="${MAIN_PRIVACY}">Privacy Policy</a><br>
              <a href="mailto:tips@cgnnews.net?subject=RE%3A%20Manila%20Tip">Submit a Tip</a><br>
              <a href="${MAIN_SITE}/write-for-us">Write For Us</a><br>
              <a href="${MAIN_SITE}/advertise">Advertise With Us</a><br>
              <a href="${MAIN_COPYRIGHT}">Copyright</a>
            </div>

            <div class="footer-bureau">
              <h4><a href="/${lang}/bureaus/">Manila Bureau</a></h4>
              <p class="footer-bureau-name">Cook Global News Network</p>
              <p>Metrobank Center<br>35th Street<br>Suite 909<br>Manila, Philippines</p>
              <p><a href="mailto:tips@cgnnews.net?subject=RE%3A%20Manila%20Bureau">tips@cgnnews.net</a></p>

              <div class="footer-social" aria-label="CGN social media links">
                ${socialIconsHtml()}
              </div>
            </div>

          </div>

          <div class="footer-bottom">
            <a href="${MAIN_COPYRIGHT}">Copyright © 2026 | CGN News — All Rights Reserved</a>
            <span> | Manila Bureau</span>
          </div>
        </footer>`;
    }
  }
  function navLinks(lang){const i=I18N[lang]||I18N.en; return [
    [i.home,`/${lang}/`],[i.news,`/${lang}/news/`],[i.world,`/${lang}/category/world/`],[i.politics,`/${lang}/category/politics/`],[i.business,`/${lang}/category/business/`],[i.markets,`/${lang}/category/markets/`],[i.technology,`/${lang}/category/technology/`],[i.local,`/${lang}/category/local/`],[i.weather,`/${lang}/weather/`],[i.sports,`/${lang}/sports/`]
  ].map(([label,href])=>`<a href="${href}">${esc(label)}</a>`);}
  async function fetchArticles(limit=100){
    const url = `${getApiBase()}?action=manila_articles&bureau=${encodeURIComponent(BUREAU)}&language=${encodeURIComponent(getLang())}&limit=${encodeURIComponent(limit)}&format=paged`;
    const res = await fetch(url, {cache:'no-store'});
    if(!res.ok) throw new Error('Manila articles API '+res.status);
    const data = await res.json();
    if(Array.isArray(data)) return data;
    return data.articles || [];
  }
  async function fetchArticle(slug){
    if(window.CGN_MANILA_STATIC_ARTICLE) return window.CGN_MANILA_STATIC_ARTICLE;
    const params = new URLSearchParams({action:'manila_article', bureau:BUREAU, language:getLang(), slug:slug||'', user_id:getUser(), anon_id:getAnonId()});
    const res = await fetch(`${getApiBase()}?${params.toString()}`, {cache:'no-store'});
    if(!res.ok) throw new Error('Manila article API '+res.status);
    const data = await res.json();
    return data.article || data;
  }
  function renderHero(root){const i=I18N[getLang()]||I18N.en; const hero=document.createElement('section'); hero.className='hero'; hero.innerHTML=`<div class="hero-card"><div class="hero-kicker">${esc(i.heroKicker)}</div><h1>${esc(i.heroTitle)}</h1><p>${esc(i.heroText)}</p><div class="hero-actions"><a class="btn gold" href="#latest">${esc(i.readLatest)}</a><a class="btn alt" href="/${getLang()}/about/">${esc(i.about)}</a></div></div><div class="hero-side"><div class="side-card"><div class="card-kicker">American English · Filipino / Tagalog · Español · Cebuano</div><h2>${esc(i.changeLang)}</h2><p>${LANGS.map(l=>`<a class="btn ghost" href="/${l}/">${esc(I18N[l].langName)}</a>`).join(' ')}</p></div><div class="side-card"><div class="card-kicker">Manila Focus</div><h2>Manila and global coverage</h2><p>Local, national and international reporting presented for Manila readers.</p></div></div>`; root.appendChild(hero);}
  function renderArticleCard(a, idx){return `<article class="article-card ${idx===0?'lead-card':''}"><a href="${esc(articleUrl(a))}"><img src="${esc(imageUrl(a))}" alt="" loading="lazy" decoding="async"></a><div class="article-card-body"><div class="meta"><span>${esc(CAT_LABELS[getLang()][a.category]||a.category||'News')}</span><span>·</span><span>${esc(prettyDate(a.published_at||a.updated_at))}</span></div><h3><a href="${esc(articleUrl(a))}">${esc(a.title)}</a></h3><p>${esc(a.summary || a.subtitle || '').slice(0,220)}</p><div class="meta">${esc(t('by'))}: ${esc(a.author||'CGN Manila')}</div><a class="read" href="${esc(articleUrl(a))}">${esc(t('readMore'))} →</a></div></article>`;}
  function renderTools(root, articles, listEl){
    const lang=getLang(), i=I18N[lang]||I18N.en;
    const box=document.createElement('div'); box.innerHTML=`<div class="tools"><input id="manila-search" type="search" placeholder="${esc(i.search)}"><select id="manila-category"><option value="">${esc(i.allCategories)}</option>${CATS.map(c=>`<option value="${esc(c)}">${esc(CAT_LABELS[lang][c]||c)}</option>`).join('')}</select></div>`; root.appendChild(box);
    const search=box.querySelector('#manila-search'), sel=box.querySelector('#manila-category');
    const apply=()=>{const q=(search.value||'').toLowerCase(), cat=sel.value; const filtered=articles.filter(a=>(!cat||a.category===cat)&&(!q||[a.title,a.subtitle,a.summary,a.author,a.tags,a.category].join(' ').toLowerCase().includes(q))); listEl.innerHTML=filtered.length?filtered.map(renderArticleCard).join(''):`<div class="empty-state">${esc(i.noStories)}</div>`;};
    search.addEventListener('input', apply); sel.addEventListener('change', apply);
  }
  async function renderHome(){
    const main=document.getElementById('main'); if(!main) return; configureHead(null); renderHero(main);
    const i=I18N[getLang()]||I18N.en; const sec=document.createElement('section'); sec.id='latest'; sec.innerHTML=`<div class="section-head"><div><h2>${esc(i.latestNews)}</h2><p>${esc(i.latestSub)}</p></div></div><div id="article-tools"></div><div class="grid loading" id="article-grid"><div class="empty-state">Loading Manila articles…</div></div>`; main.appendChild(sec);
    const grid=sec.querySelector('#article-grid'), tools=sec.querySelector('#article-tools');
    try{const articles=await fetchArticles(120); const latest=articles.find(a=>String(a.breaking||'').toLowerCase()==='true') || articles[0]; const ticker=document.getElementById('cgn-breaking-text'); if(ticker&&latest)ticker.textContent=latest.title; grid.classList.remove('loading'); renderTools(tools, articles, grid); grid.innerHTML=articles.length?articles.map(renderArticleCard).join(''):`<div class="empty-state">${esc(i.noStories)}</div>`;}catch(e){console.error(e); grid.classList.remove('loading'); grid.innerHTML=`<div class="empty-state">${esc(i.noStories)}<br><small>${esc(e.message)}</small></div>`;}
  }
  function currentSlug(){const parts=location.pathname.split('/').filter(Boolean); return parts[parts.length-1] || '';}
  async function renderArticlePage(){
    const main=document.getElementById('main'); if(!main) return; const slug=currentSlug();
    try{const a=await fetchArticle(slug); if(!a || a.success===false || !a.title){throw new Error(a && a.error || 'Not found');} configureHead(a); main.innerHTML=articleHtml(a); const ticker=document.getElementById('cgn-breaking-text'); if(ticker)ticker.textContent=a.title;}catch(e){console.error(e); configureHead(null); main.innerHTML=`<article class="article-layout"><div class="article-kicker">${esc(t('articleMissing'))}</div><h1 class="article-title">${esc(t('articleMissing'))}</h1><p class="article-subtitle">${esc(t('articleMissingText'))}</p><p class="paywall-note">${esc(e.message)}</p></article>`;}
  }
  function articleHtml(a){return `<article class="article-layout"><div class="article-kicker">${esc(CAT_LABELS[getLang()][a.category]||a.category||'News')}</div><h1 class="article-title">${esc(a.title)}</h1>${a.subtitle?`<p class="article-subtitle">${esc(a.subtitle)}</p>`:''}<div class="meta"><span>${esc(t('by'))}: ${esc(a.author||'CGN Manila')}</span><span>·</span><span>${esc(prettyDate(a.published_at||a.updated_at))}</span></div><div class="language-box"><strong>${esc(t('changeLang'))}:</strong>${LANGS.map(l=>`<a href="${esc(canonicalLanguagePath(l,a).replace(SITE,''))}">${esc(I18N[l].langName)}</a>`).join('')}</div><figure class="article-hero"><img src="${esc(imageUrl(a))}" alt="" decoding="async"><figcaption class="credit">${esc(a.image_credit||'CGN News / Cook Global News Network')}</figcaption></figure><div class="article-body">${a.body_html||''}</div>${a.what_this_means?`<section class="what-means"><h2>${esc(t('whatMeans'))}</h2>${a.what_this_means}</section>`:''}</article>`;}
  function renderStaticPage(kind){
    const main=document.getElementById('main'); if(!main) return; configureHead(null); const lang=getLang(), i=I18N[lang]||I18N.en;
    if(kind==='privacy'){ location.replace(MAIN_PRIVACY); return; }
    if(kind==='terms'){ location.replace(MAIN_TERMS); return; }
    if(kind==='copyright'){ location.replace(MAIN_COPYRIGHT); return; }
    if(kind==='contact'){ main.innerHTML=`<section class="page-card"><h1>${esc(i.contact)}</h1><p>Send CGN Manila tips, corrections and bureau messages to <a href="mailto:tips@cgnnews.net">tips@cgnnews.net</a>.</p><div class="legal-note"><strong>Manila Bureau</strong><br>Metrobank Center<br>35th Street<br>Suite 909<br>Manila, Philippines</div></section>`; return; }
    if(kind==='editorial'){ location.replace(MAIN_EDITORIAL); return; }
    if(kind==='account'){
      main.innerHTML=`<section class="page-card account-page"><h1>${esc(i.account)}</h1><p>CGN Manila uses the same CGN News account, paywall and subscription system.</p><div id="account-page-body"></div></section>`;
      const target=document.getElementById('account-page-body');
      if(!getUser()) target.innerHTML=`<div class="account-split"><section><h2>${esc(i.login)}</h2><form class="account-form" onsubmit="return CGNManila.loginSubmit(event)"><label>Email</label><input type="email" id="acct-email" required><label>Password</label><input type="password" id="acct-password" required><button class="btn gold" type="submit">${esc(i.login)}</button></form></section><section><h2>${esc(i.createAccount)}</h2><p>Create a free account for ${CGN_FREE_ACCOUNT_LIMIT} free articles and subscription access.</p><button class="btn alt" onclick="CGNManila.openAccountModal('signup')">${esc(i.createAccount)}</button></section></div><div id="account-modal-message" class="account-message"></div>`;
      else apiGet({action:'manila_account_details', user_id:getUser()}).then(data=>{ const sub=data.subscription||{}, acct=data.account||{}, active=isActiveStatus(sub.subscriber)||isActiveStatus(sub.subscription_status)||acct.active_subscriber===true; target.innerHTML=`<div class="account-mini-grid"><div><span>Email</span><strong>${esc(acct.email||'')}</strong></div><div><span>Status</span><strong>${active?'Subscriber':'Free Account'}</strong></div><div><span>Currency</span><strong>${MANILA_CURRENCY}</strong></div><div><span>Renewal</span><strong>${esc((sub.subscription_expires_at||sub.renewal_expected_at||'').slice(0,10)||'—')}</strong></div></div>${active?'<div class="account-success">Subscription active.</div>':paypalCheckoutHtml('page')}<div class="account-actions"><button class="btn alt" onclick="CGNManila.logout()">${esc(i.logout)}</button></div><div id="account-modal-message" class="account-message"></div>`; }).catch(e=>{ target.innerHTML=`<p class="account-message error">${esc(e.message)}</p>`; });
      return;
    }
    const pages={
      about:{title:i.about, body:`<p>${esc(i.brand)} mirrors the CGN News publishing system for Manila and Philippines-focused bureau coverage. The site uses CGN branding, CGN editorial standards and a bureau-specific article source.</p><p>${esc(i.legalNote)}</p><div class="legal-note"><strong>Manila Bureau</strong><br>Metrobank Center<br>35th Street<br>Suite 909<br>Manila, Philippines<br><a href="mailto:tips@cgnnews.net">tips@cgnnews.net</a></div>`},
      bureaus:{title:i.bureaus, body:`<p>CGN Manila is part of the CGN News bureau/subdomain publishing structure. Manila bureau coverage appears across English, Filipino / Tagalog, Spanish and Cebuano editions of the site.</p><div class="legal-note"><strong>Manila Bureau</strong><br>Metrobank Center<br>35th Street<br>Suite 909<br>Manila, Philippines<br><a href="mailto:tips@cgnnews.net">tips@cgnnews.net</a></div><div id="manila-reporters" class="reporter-grid"></div>`},
      news:{title:i.news, body:`<div id="news-list" class="grid"><div class="empty-state">Loading…</div></div>`}
    };
    const p=pages[kind]||pages.about; main.innerHTML=`<section class="page-card"><h1>${esc(p.title)}</h1>${p.body}</section>`;
    if(kind==='news'){fetchArticles(150).then(arts=>{const el=document.getElementById('news-list'); if(el)el.innerHTML=arts.length?arts.map(renderArticleCard).join(''):`<div class="empty-state">${esc(i.noStories)}</div>`;}).catch(e=>{const el=document.getElementById('news-list'); if(el)el.innerHTML=`<div class="empty-state">${esc(e.message)}</div>`;});}
    if(kind==='bureaus'){renderReporterCards();}
  }
function renderReporterCards(){
  const el = document.getElementById('manila-reporters');
  if(!el) return;

  const ISABEL_BIO = 'Isabel Reyes is a CGN News Foreign Correspondent stationed in Manila, covering the Philippines, Southeast Asia, maritime security, democratic institutions, regional diplomacy, climate risk, consumer pressure and the business corridors linking Manila to Japan, the United States and the wider Indo-Pacific. Her reporting focuses on how politics, sea-lane security, infrastructure, energy costs and typhoon resilience shape daily life across the archipelago and the region.';

  function cleanEmail(email){
    const value = String(email || '').trim();

    if(
      value.includes('@manila.') ||
      value.includes('@manilla.') ||
      value.includes('.manila') ||
      value.includes('.manilla')
    ){
      return 'tips@cgnnews.net';
    }

    return value || 'tips@cgnnews.net';
  }

  function fixReporter(r){
    const fixed = Object.assign({}, r || {});
    const name = String(fixed.name || '').trim().toLowerCase();
    const email = String(fixed.email || '').trim().toLowerCase();

    if(
      name === 'gabriel santos' ||
      name === 'isabel reyes' ||
      email.includes('gabriel') ||
      email.includes('isabel.reyes')
    ){
      fixed.name = 'Isabel Reyes';
      fixed.title = 'Foreign Correspondent — Manila';
      fixed.email = 'isabel.reyes@cgnnews.net';
      fixed.beats = ISABEL_BIO;
      fixed.bio = ISABEL_BIO;
    } else {
      fixed.email = cleanEmail(fixed.email);
    }

    return fixed;
  }

  apiGet({action:'manila_reporters'})
    .then(data => {
      const reps = (data.reporters || []).map(fixReporter);

      if(!reps.length){
        el.innerHTML = '<p class="small-note">Reporter list loading.</p>';
        return;
      }

      el.innerHTML = reps.map(r => `
        <article class="reporter-card">
          <h3>${esc(r.name)}</h3>
          <p><strong>${esc(r.title || '')}</strong></p>
          <p>${esc(r.bio || r.beats || '')}</p>
          <p><a href="mailto:${esc(r.email || 'tips@cgnnews.net')}">${esc(r.email || 'tips@cgnnews.net')}</a></p>
        </article>
      `).join('');
    })
    .catch(e => {
      el.innerHTML = '<p class="small-note">Reporter list loading.</p>';
    });
}
  async function renderPaymentSuccess(){
    const main=document.getElementById('main'); if(!main) return; configureHead(null); main.innerHTML=`<section class="page-card"><h1>Confirming Subscription</h1><p id="payment-message">Checking your CGN Manila account…</p><p><a class="btn alt" href="/${getLang()}/account/">View Account</a> <a class="btn gold" href="/${getLang()}/">Return Home</a></p></section>`;
    const msg=document.getElementById('payment-message'); const uid=getUser();
    if(!uid){ msg.textContent='Please sign in to attach this PayPal payment to your CGN News account.'; openAccountModal('login'); return; }
    try{ const data=await apiGet({action:'manila_confirm_payment', user_id:uid}); if(!data.success) throw new Error(data.error||'Unable to confirm subscription.'); localStorage.setItem('subscriber','true'); msg.textContent='Subscription confirmed. Your CGN News account now has unlimited CGN Manila access.'; }
    catch(e){ msg.textContent=e.message; }
  }
  window.CGNManila = {renderShell, renderHome, renderArticlePage, renderStaticPage, renderPaymentSuccess, fetchArticles, fetchArticle, getLang, I18N, openAccountModal, closeAccountModal, loginSubmit, signupSubmit, logout, confirmManilaPayment};
  document.addEventListener('DOMContentLoaded', renderShell);
})();
