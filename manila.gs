// ============================================================
// CGN MANILA BACKEND ADD-ON v1.0.0 Alpha | 2026-05-29T20:20:19Z UTC
// Cook Global News Network / CGN News
// Additive helper layer for the existing CGN News Apps Script project.
// No duplicate doGet(). No duplicate doPost(). No bottom overrides.
// Source of truth: Bureaus sheet, same Articles-style columns plus bureau.
// ============================================================

var SHEET_BUREAUS = typeof SHEET_BUREAUS !== "undefined" ? SHEET_BUREAUS : "Bureaus";
var CGN_MANILA_SITE_URL = "https://manila.cgnnews.net";
var CGN_MANILA_BUREAU_KEY = "manila";
var CGN_MANILA_CURRENCY = "PHP";
var CGN_MANILA_PRICE_LABEL = "₱ / PHP";
var CGN_MANILA_LANGUAGES = ["en", "fil", "es", "ceb"];
var CGN_MANILA_DEFAULT_LANGUAGE = "en";
var CGN_MANILA_VERSION = "CGN MANILA BACKEND ADD-ON v1.0.0 Alpha | 2026-05-29T20:20:19Z UTC";

function CGNManilaRoute_(e){
  e = e || { parameter:{} };
  var p = e.parameter || {};
  var a = lower_(safeString_(p.action));
  if(a === "manila_articles" || a === "bureau_articles" || a === "manila_articles_paged" || a === "bureau_articles_paged") return json(CGNManilaGetArticles_(p));
  if(a === "manila_article" || a === "bureau_article") return json(CGNManilaGetArticle_(p));
  if(a === "manila_site_config" || a === "bureau_site_config") return json(CGNManilaSiteConfig_(p));
  if(a === "manila_sitemap_data" || a === "bureau_sitemap_data") return json(CGNManilaSitemapData_(p));
  if(a === "manila_subscription_status") { var sub = getSubscriptionStatus(p.user_id); sub.currency = CGN_MANILA_CURRENCY; sub.price_label = CGN_MANILA_PRICE_LABEL; sub.bureau = CGN_MANILA_BUREAU_KEY; return json(sub); }
  if(a === "manila_account_details") { var acct = getAccountDetails(p.user_id); acct.currency = CGN_MANILA_CURRENCY; acct.price_label = CGN_MANILA_PRICE_LABEL; acct.bureau = CGN_MANILA_BUREAU_KEY; return json(acct); }
  if(a === "manila_confirm_payment") return json(CGNManilaConfirmPayment_(p.user_id));
  if(a === "manila_reporters") return json(CGNManilaReporters_());
  return null;
}

function CGNManilaSheet_(){ return getSheet(SHEET_BUREAUS); }
function CGNManilaNormalizeLanguage_(value){ var raw = lower_(value).replace(/[^a-z-]+/g, ""); return CGN_MANILA_LANGUAGES.indexOf(raw) !== -1 ? raw : ""; }
function CGNManilaLanguageFromRow_(row,h){
  var direct = h.language !== undefined ? CGNManilaNormalizeLanguage_(row[h.language]) : ""; if(direct) return direct;
  var tags = lower_(h.tags !== undefined ? row[h.tags] : "");
  for(var i=0;i<CGN_MANILA_LANGUAGES.length;i++){ var l=CGN_MANILA_LANGUAGES[i]; var re=new RegExp("(^|[,;#\s])(lang|language)[:=\s-]*"+l.replace(/-/g,"[-_]?")+"([,;#\s]|$)","i"); if(re.test(tags)) return l; }
  return CGN_MANILA_DEFAULT_LANGUAGE;
}
function CGNManilaDateParts_(v){ var d=new Date(v||new Date()); if(isNaN(d.getTime())) d=new Date(); return {year:d.getUTCFullYear(),month:String(d.getUTCMonth()+1).padStart(2,"0"),day:String(d.getUTCDate()).padStart(2,"0")}; }
function CGNManilaArticlePath_(a){ var lang=CGNManilaNormalizeLanguage_(a.language)||CGN_MANILA_DEFAULT_LANGUAGE; var p=CGNManilaDateParts_(a.published_at||a.updated_at); var slug=slugify(a.slug||a.title||"article"); return "/"+lang+"/news/"+p.year+"/"+p.month+"/"+p.day+"/"+slug+"/"; }
function CGNManilaArticleObject_(row,h){
  function cell(k){ return h[k] !== undefined ? row[h[k]] : ""; }
  var title=cell("title"), lang=CGNManilaLanguageFromRow_(row,h), cat=normalizeCanonicalCategory_(cell("category"));
  var a={article_id:cell("article_id"), id:cell("article_id"), title:title, subtitle:cell("subtitle"), slug:slugify(cell("slug")||title), category:cat, tags:cell("tags"), author:cell("author"), published_at:cell("published_at"), updated_at:cell("updated_at"), summary:cell("summary"), body_html:cell("body_html"), what_this_means:cell("what_this_means"), hero_image_url:cell("hero_image_url"), image:cell("hero_image_url"), image_credit:cell("image_credit"), inline_images:cell("inline_images"), featured:cell("featured"), breaking:cell("breaking"), views:cell("views"), status:cell("status"), seo_title:cell("seo_title")||title, seo_description:cell("seo_description")||cell("summary"), display_order:cell("display_order"), bureau:cell("bureau"), language:lang};
  var p=CGNManilaDateParts_(a.published_at||a.updated_at); a.year=p.year; a.month=p.month; a.day=p.day; a.url=CGNManilaArticlePath_(a); a.canonical_url=CGN_MANILA_SITE_URL+a.url; return a;
}
function CGNManilaGetArticles_(p){
  p=p||{}; var sheet=CGNManilaSheet_(), values=sheet.getDataRange().getValues(), h=headerMap_(sheet), list=[]; var limit=Math.max(1,Math.min(Number(p.limit||50),500)); var offset=Math.max(0,Number(p.offset||0)); var lang=CGNManilaNormalizeLanguage_(p.language||p.lang); var cat=safeString_(p.category)?normalizeCanonicalCategory_(p.category):""; var includeDrafts=truthy_(p.include_drafts);
  for(var i=1;i<values.length;i++){ var row=values[i]; if(!row[h.article_id]&&!row[h.title]) continue; var bureau=lower_(h.bureau!==undefined?row[h.bureau]:""); if(bureau!==CGN_MANILA_BUREAU_KEY) continue; var a=CGNManilaArticleObject_(row,h); if(lang&&a.language!==lang) continue; if(cat&&normalizeCanonicalCategory_(a.category)!==cat) continue; if(!includeDrafts&&lower_(a.status||"published")!=="published") continue; list.push(a); }
  list.sort(function(a,b){ return Number(a.display_order||9999)-Number(b.display_order||9999) || new Date(b.published_at||b.updated_at||0)-new Date(a.published_at||a.updated_at||0); });
  return {success:true,bureau:CGN_MANILA_BUREAU_KEY,total:list.length,limit:limit,offset:offset,next_offset:offset+limit<list.length?offset+limit:null,articles:list.slice(offset,offset+limit)};
}
function CGNManilaGetArticle_(p){
  p=p||{}; var slug=normalizeArticleRouteSlug_(p.slug||""); var rows=CGNManilaGetArticles_({language:p.language||p.lang,include_drafts:p.include_drafts||false,limit:500}).articles||[]; var article=null; for(var i=0;i<rows.length;i++){ if(slugify(rows[i].slug||rows[i].title)===slug){ article=rows[i]; break; } } if(!article) return {success:false,error:"Not found"};
  var user = getUserById_(p.user_id); var subscriber = isActiveSubscriber_(user); var reader_id = user ? String(user.user_id) : String(p.anon_id||CGN_MANILA_BUREAU_KEY+"_anon_missing"); var reader_type = subscriber ? "subscriber" : user ? "free_user" : "anonymous"; if(subscriber){ article.locked=false; article.reader_type=reader_type; article.access="full"; return article; } var limit=user?6:3; var meterKey=CGN_MANILA_BUREAU_KEY+":"+article.language+":"+article.slug; var used=countArticleViews_(reader_id); if(used>=limit&&!hasViewedArticle_(reader_id,meterKey)){ article.locked=true; article.reader_type=reader_type; article.access="preview"; article.paywall_limit=limit; article.views_used=used; article.body_html=previewHtml_(article.body_html); return article; } if(!hasViewedArticle_(reader_id,meterKey)) logEvent_("article_view",reader_id,{slug:meterKey,article_id:article.article_id,reader_type:reader_type,bureau:CGN_MANILA_BUREAU_KEY}); article.locked=false; article.reader_type=reader_type; article.access="full"; return article;
}
function CGNManilaSiteConfig_(p){ return {success:true,bureau:CGN_MANILA_BUREAU_KEY,site_url:CGN_MANILA_SITE_URL,languages:CGN_MANILA_LANGUAGES,default_language:CGN_MANILA_DEFAULT_LANGUAGE,currency:CGN_MANILA_CURRENCY,price_label:CGN_MANILA_PRICE_LABEL,version:CGN_MANILA_VERSION}; }
function CGNManilaSitemapData_(p){ return {success:true,site_url:CGN_MANILA_SITE_URL,articles:CGNManilaGetArticles_({include_drafts:false,limit:500}).articles}; }
function CGNManilaConfirmPayment_(user_id){ var result = confirmPayment(user_id); result.bureau=CGN_MANILA_BUREAU_KEY; result.currency=CGN_MANILA_CURRENCY; result.price_label=CGN_MANILA_PRICE_LABEL; return result; }
function CGNManilaReporters_(){ return {success:true,bureau:CGN_MANILA_BUREAU_KEY,reporters:[{"name": "Gabriel Santos", "slug": "gabriel-santos", "title": "Bureau Chief", "beats": "General bureau leadership, major stories, editorial coordination", "email": "manila@cgnnews.net", "bio": "Gabriel Santos covers general bureau leadership, major stories, editorial coordination for CGN Manila.", "categories": ["World", "Local", "Special Reports"], "ai": "FALSE"}, {"name": "Maya Reyes", "slug": "maya-reyes", "title": "Local/Civic Reporter", "beats": "City government, transport, public services, civic life", "email": "maya.reyes.manila@cgnnews.net", "bio": "Maya Reyes covers city government, transport, public services, civic life for CGN Manila.", "categories": ["Local", "Politics"], "ai": "TRUE"}, {"name": "Daniel Cruz", "slug": "daniel-cruz", "title": "Politics Reporter", "beats": "Government, elections, policy, public institutions", "email": "daniel.cruz.manila@cgnnews.net", "bio": "Daniel Cruz covers government, elections, policy, public institutions for CGN Manila.", "categories": ["Politics"], "ai": "TRUE"}, {"name": "Leah Bautista", "slug": "leah-bautista", "title": "Business & Markets Reporter", "beats": "Business, markets, trade, consumer economy", "email": "leah.bautista.manila@cgnnews.net", "bio": "Leah Bautista covers business, markets, trade, consumer economy for CGN Manila.", "categories": ["Business", "Markets"], "ai": "TRUE"}, {"name": "Miguel Torres", "slug": "miguel-torres", "title": "Technology Reporter", "beats": "Technology, digital policy, cybersecurity, innovation", "email": "miguel.torres.manila@cgnnews.net", "bio": "Miguel Torres covers technology, digital policy, cybersecurity, innovation for CGN Manila.", "categories": ["Technology"], "ai": "TRUE"}, {"name": "Isabel Navarro", "slug": "isabel-navarro", "title": "Entertainment & Culture Reporter", "beats": "Entertainment, arts, culture, media", "email": "isabel.navarro.manila@cgnnews.net", "bio": "Isabel Navarro covers entertainment, arts, culture, media for CGN Manila.", "categories": ["Entertainment"], "ai": "TRUE"}, {"name": "Angela Ramos", "slug": "angela-ramos", "title": "Weather Reporter", "beats": "Weather, preparedness, climate impact, public safety", "email": "angela.ramos.manila@cgnnews.net", "bio": "Angela Ramos covers weather, preparedness, climate impact, public safety for CGN Manila.", "categories": ["Weather", "Environment"], "ai": "TRUE"}, {"name": "Paolo Garcia", "slug": "paolo-garcia", "title": "Sports Desk Reporter", "beats": "Sports, fixtures, teams, athlete culture, fan experience", "email": "paolo.garcia.manila@cgnnews.net", "bio": "Paolo Garcia covers sports, fixtures, teams, athlete culture, fan experience for CGN Manila.", "categories": ["Sports"], "ai": "TRUE"}, {"name": "Carmen Villanueva", "slug": "carmen-villanueva", "title": "Investigations & Special Reports Reporter", "beats": "Public records, accountability, special reports", "email": "carmen.villanueva.manila@cgnnews.net", "bio": "Carmen Villanueva covers public records, accountability, special reports for CGN Manila.", "categories": ["Investigations", "Special Reports"], "ai": "TRUE"}]}; }
