#!/usr/bin/env node
/* ============================================================
   CGN MANILA STATIC BUILDER v1.2.0 Final | 2026-05-30T00:00:00Z UTC
   Builds crawlable article pages, sitemap.xml, news-sitemap.xml and feeds.
   ============================================================ */
import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT = process.cwd();
const SITE = 'https://manila.cgnnews.net';
const BUREAU = 'manila';
const API = (process.env.CGN_API_URL || process.env.CGN_API_BASE || 'https://script.google.com/macros/s/AKfycbx41mQg-Ine3XZ-VrMI_SaQn4_K6cDQHA0cBFyGPgupu_edNFoNRjSLv2hoSe_bOytt/exec').replace(/\?+$/,'').replace(/\/+$/,'');
const LANGS = ['en','fil','es','ceb'];
const NOW = new Date().toISOString();
const LANG = {"en": {"html": "en-US", "href": "en-US", "locale": "en-US", "name": "American English", "brand": "CGN Manila", "sub": "Independent coverage for Manila, the Philippines, Southeast Asia and the world.", "by": "By", "whatMeans": "What this means", "changeLang": "Change Language"}, "fil": {"html": "fil-PH", "href": "fil-PH", "locale": "fil-PH", "name": "Filipino / Tagalog", "brand": "CGN Manila", "sub": "Malayang pagbabalita para sa Manila, Pilipinas, Timog-Silangang Asya at mundo.", "by": "Ni", "whatMeans": "Ano ang ibig sabihin nito", "changeLang": "Palitan ang Wika"}, "es": {"html": "es", "href": "es", "locale": "es-ES", "name": "Español", "brand": "CGN Manila", "sub": "Cobertura independiente para Manila, Filipinas, el Sudeste Asiático y el mundo.", "by": "Por", "whatMeans": "Qué significa esto", "changeLang": "Cambiar idioma"}, "ceb": {"html": "ceb-PH", "href": "ceb-PH", "locale": "en-PH", "name": "Cebuano", "brand": "CGN Manila", "sub": "Independenteng coverage para sa Manila, Pilipinas, Southeast Asia ug sa kalibotan.", "by": "Ni", "whatMeans": "Unsay pasabot niini", "changeLang": "Ilisi ang Pinulongan"}};
const CATEGORY_IMAGES = {
  World:'/assets/category/CGNWorld01.png', Politics:'/assets/category/CGNPolitics01.png', Business:'/assets/category/CGNBusiness01.jpeg', Markets:'/assets/category/CGNMarkets01.png', Technology:'/assets/category/CGNTechnology01.png', Entertainment:'/assets/category/CGNEntertainment01.png', Environment:'/assets/category/CGNEnvironment01.png', Energy:'/assets/category/CGNEnergy01.png', Opinion:'/assets/category/CGNOpinion01.png', Local:'/assets/category/CGNLocal01.png', Weather:'/assets/CGNWeatherBrief01.png', Sports:'/assets/CGNSportsHighlights01.png', Investigations:'/assets/CGNWebBanner01.png', 'Special Reports':'/assets/CGNWebBanner01.png'
};
const BASE_HEAD = `
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="cgn-api-base" content="${esc(API)}">
<meta name="theme-color" content="#07172f">
<meta name="robots" content="index,follow,max-image-preview:large">
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png">
<link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="stylesheet" href="/assets/manila.css">
<script defer src="/assets/manila.js"></script>`;
function esc(v){return String(v==null?'':v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));}
function stripHtml(v){return String(v||'').replace(/<script[\s\S]*?<\/script>/gi,' ').replace(/<style[\s\S]*?<\/style>/gi,' ').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();}
function slugify(v){return String(v||'').toLowerCase().replace(/&/g,' and ').replace(/[^a-z0-9\s-]/g,'').trim().replace(/\s+/g,'-').replace(/-+/g,'-').replace(/^-+|-+$/g,'')||'article';}
function dateParts(v){const d = v ? new Date(v) : new Date(); if(Number.isNaN(d.getTime())) return ['2026','01','01']; return [String(d.getUTCFullYear()), String(d.getUTCMonth()+1).padStart(2,'0'), String(d.getUTCDate()).padStart(2,'0')];}
function articlePath(a, lang=a.language||'en'){const [y,m,d]=dateParts(a.published_at||a.updated_at); return `/${lang}/news/${y}/${m}/${d}/${a.slug||slugify(a.title)}/`;}
function abs(pathname){return `${SITE}${pathname}`;}
function normalizeImage(v, category){const raw=String(v||'').trim(); if(raw){const file=raw.split('/').pop(); for(const val of Object.values(CATEGORY_IMAGES)){if(val.endsWith(file)) return abs(val);} return raw.startsWith('/')?abs(raw):raw;} return abs(CATEGORY_IMAGES[category]||'/assets/CGNWebBanner01.png');}
function imageUrl(a){return normalizeImage(a.hero_image_url || a.image, a.category);}
function languageUrl(lang,a){return `${SITE}${articlePath(a, lang)}`;}
function jsonLd(a){const lang=a.language||'en'; return JSON.stringify({'@context':'https://schema.org','@type':'NewsArticle',headline:a.title,description:a.seo_description||a.summary||a.subtitle||'',image:[imageUrl(a)],datePublished:a.published_at||a.updated_at,dateModified:a.updated_at||a.published_at,author:{'@type':'Person',name:a.author||'CGN Manila'},publisher:{'@type':'NewsMediaOrganization',name:'CGN Manila',url:SITE,logo:{'@type':'ImageObject',url:`${SITE}/assets/CGNNewsLogo01.png`}},mainEntityOfPage:abs(articlePath(a, lang)),inLanguage:a.in_language||LANG[lang].html});}
async function fetchArticles(lang){
  const url = `${API}?action=manila_articles&bureau=${encodeURIComponent(BUREAU)}&language=${encodeURIComponent(lang)}&limit=500&format=paged`;
  try{const res = await fetch(url); if(!res.ok) throw new Error(`HTTP ${res.status}`); const data = await res.json(); const list = Array.isArray(data) ? data : (data.articles || []); return list.map(a=>({...a, language:a.language||lang, canonical_url:a.canonical_url || abs(articlePath({...a,language:lang}, lang))}));}
  catch(err){console.warn(`Manila API fetch failed for ${lang}: ${err.message}`); return [];}
}
function articleHtml(a){
  const lang=a.language||'en', i=LANG[lang]||LANG.en, url=abs(articlePath(a, lang));
  const desc=a.seo_description||a.summary||a.subtitle||i.sub; const title=`${a.seo_title||a.title} | ${i.brand}`;
  return `<!doctype html><html lang="${i.html}"><head>${BASE_HEAD}<meta name="cgn-language" content="${lang}"><title>${esc(title)}</title><meta name="description" content="${esc(desc)}"><link rel="canonical" href="${url}">${LANGS.map(l=>`<link rel="alternate" hreflang="${LANG[l].href}" href="${languageUrl(l,a)}">`).join('')}<link rel="alternate" hreflang="x-default" href="${languageUrl('en',a)}"><meta property="og:type" content="article"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(desc)}"><meta property="og:url" content="${url}"><meta property="og:image" content="${esc(imageUrl(a))}"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(title)}"><meta name="twitter:description" content="${esc(desc)}"><meta name="twitter:image" content="${esc(imageUrl(a))}"><script type="application/ld+json">${jsonLd(a)}</script><script>window.CGN_MANILA_STATIC_ARTICLE=${JSON.stringify(a).replace(/</g,'\\u003c')};</script></head><body data-lang="${lang}"><div id="cgn-manila-header"></div><main id="main" class="cgn-main"><article class="article-layout"><div class="article-kicker">${esc(a.category||'News')}</div><h1 class="article-title">${esc(a.title)}</h1>${a.subtitle?`<p class="article-subtitle">${esc(a.subtitle)}</p>`:''}<div class="meta"><span>${esc(i.by)}: ${esc(a.author||'CGN Manila')}</span><span>·</span><span>${esc(new Date(a.published_at||a.updated_at||Date.now()).toLocaleDateString(i.locale,{day:'numeric',month:'long',year:'numeric',timeZone:'Asia/Manila'}))}</span></div><div class="language-box"><strong>${esc(i.changeLang)}:</strong>${LANGS.map(l=>`<a href="${languageUrl(l,a).replace(SITE,'')}">${esc(LANG[l].name)}</a>`).join('')}</div><figure class="article-hero"><img src="${esc(imageUrl(a))}" alt="" decoding="async"><figcaption class="credit">${esc(a.image_credit||'CGN News / Cook Global News Network')}</figcaption></figure><div class="article-body">${a.body_html||''}</div>${a.what_this_means?`<section class="what-means"><h2>${esc(i.whatMeans)}</h2>${a.what_this_means}</section>`:''}</article></main><div id="cgn-manila-footer"></div></body></html>`;
}
async function write(file, content){await fs.mkdir(path.dirname(file),{recursive:true}); await fs.writeFile(file, content);}
function urlXml(loc,lastmod){return `  <url><loc>${esc(loc)}</loc><lastmod>${esc(lastmod||NOW)}</lastmod></url>`;}
function newsXml(a){return `  <url><loc>${esc(abs(articlePath(a,a.language||'en')))}</loc><news:news><news:publication><news:name>CGN Manila</news:name><news:language>${a.language||'en'}</news:language></news:publication><news:publication_date>${esc(a.published_at||a.updated_at||NOW)}</news:publication_date><news:title>${esc(a.title)}</news:title></news:news></url>`;}
function feedXml(lang,articles){const i=LANG[lang]; return `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${esc(i.brand)}</title><link>${SITE}/${lang}/</link><description>${esc(i.sub)}</description><language>${i.html}</language><lastBuildDate>${new Date().toUTCString()}</lastBuildDate>${articles.slice(0,50).map(a=>`<item><title>${esc(a.title)}</title><link>${esc(abs(articlePath(a,lang)))}</link><guid>${esc(abs(articlePath(a,lang)))}</guid><pubDate>${new Date(a.published_at||a.updated_at||Date.now()).toUTCString()}</pubDate><description>${esc(a.summary||stripHtml(a.body_html).slice(0,240))}</description></item>`).join('')}</channel></rss>`;}
async function main(){
  const all=[];
  for(const lang of LANGS){const arts=await fetchArticles(lang); for(const a of arts){a.language=a.language||lang; await write(path.join(ROOT, articlePath(a, lang), 'index.html'), articleHtml(a)); all.push(a);} await write(path.join(ROOT, lang, 'feed.xml'), feedXml(lang, arts));}
  const categorySlugs=['world','politics','business','markets','technology','entertainment','environment','energy','opinion','local','weather','sports','investigations','special-reports'];
  const baseUrls=['/',...LANGS.map(l=>`/${l}/`),...LANGS.flatMap(l=>[`/${l}/news/`,`/${l}/about/`,`/${l}/contact/`,`/${l}/privacy-policy/`,`/${l}/terms-of-service/`,`/${l}/editorial-standards/`,`/${l}/copyright/`,`/${l}/bureaus/`,`/${l}/weather/`,`/${l}/sports/`,...categorySlugs.map(c=>`/${l}/category/${c}/`)])];
  await write(path.join(ROOT,'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${baseUrls.map(u=>urlXml(abs(u),NOW)).join('\n')}\n${all.map(a=>urlXml(abs(articlePath(a,a.language||'en')), a.updated_at||a.published_at||NOW)).join('\n')}\n</urlset>\n`);
  const cutoff=Date.now()-48*3600*1000; const newsItems=all.filter(a=>new Date(a.published_at||a.updated_at||0).getTime()>=cutoff).slice(0,1000);
  await write(path.join(ROOT,'news-sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">\n${newsItems.map(newsXml).join('\n')}\n</urlset>\n`);
  console.log(`CGN Manila static build complete. Articles: ${all.length}. API: ${API}`);
}
main().catch(err=>{console.error(err); process.exit(1);});
