(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const p of document.querySelectorAll('link[rel="modulepreload"]'))l(p);new MutationObserver(p=>{for(const u of p)if(u.type==="childList")for(const f of u.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&l(f)}).observe(document,{childList:!0,subtree:!0});function o(p){const u={};return p.integrity&&(u.integrity=p.integrity),p.referrerPolicy&&(u.referrerPolicy=p.referrerPolicy),p.crossOrigin==="use-credentials"?u.credentials="include":p.crossOrigin==="anonymous"?u.credentials="omit":u.credentials="same-origin",u}function l(p){if(p.ep)return;p.ep=!0;const u=o(p);fetch(p.href,u)}})();var ar=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},sr={exports:{}};/*!
  * Bootstrap v5.3.8 (https://getbootstrap.com/)
  * Copyright 2011-2025 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */(function(s,n){(function(o,l){s.exports=l()})(ar,function(){const o=new Map,l={set(i,e,t){o.has(i)||o.set(i,new Map);const a=o.get(i);a.has(e)||a.size===0?a.set(e,t):console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(a.keys())[0]}.`)},get:(i,e)=>o.has(i)&&o.get(i).get(e)||null,remove(i,e){if(!o.has(i))return;const t=o.get(i);t.delete(e),t.size===0&&o.delete(i)}},p="transitionend",u=i=>(i&&window.CSS&&window.CSS.escape&&(i=i.replace(/#([^\s"#']+)/g,(e,t)=>`#${CSS.escape(t)}`)),i),f=i=>i==null?`${i}`:Object.prototype.toString.call(i).match(/\s([a-z]+)/i)[1].toLowerCase(),x=i=>{i.dispatchEvent(new Event(p))},$=i=>!(!i||typeof i!="object")&&(i.jquery!==void 0&&(i=i[0]),i.nodeType!==void 0),L=i=>$(i)?i.jquery?i[0]:i:typeof i=="string"&&i.length>0?document.querySelector(u(i)):null,_=i=>{if(!$(i)||i.getClientRects().length===0)return!1;const e=getComputedStyle(i).getPropertyValue("visibility")==="visible",t=i.closest("details:not([open])");if(!t)return e;if(t!==i){const a=i.closest("summary");if(a&&a.parentNode!==t||a===null)return!1}return e},T=i=>!i||i.nodeType!==Node.ELEMENT_NODE||!!i.classList.contains("disabled")||(i.disabled!==void 0?i.disabled:i.hasAttribute("disabled")&&i.getAttribute("disabled")!=="false"),j=i=>{if(!document.documentElement.attachShadow)return null;if(typeof i.getRootNode=="function"){const e=i.getRootNode();return e instanceof ShadowRoot?e:null}return i instanceof ShadowRoot?i:i.parentNode?j(i.parentNode):null},H=()=>{},K=i=>{i.offsetHeight},Q=()=>window.jQuery&&!document.body.hasAttribute("data-bs-no-jquery")?window.jQuery:null,me=[],ae=()=>document.documentElement.dir==="rtl",ce=i=>{var e;e=()=>{const t=Q();if(t){const a=i.NAME,c=t.fn[a];t.fn[a]=i.jQueryInterface,t.fn[a].Constructor=i,t.fn[a].noConflict=()=>(t.fn[a]=c,i.jQueryInterface)}},document.readyState==="loading"?(me.length||document.addEventListener("DOMContentLoaded",()=>{for(const t of me)t()}),me.push(e)):e()},se=(i,e=[],t=i)=>typeof i=="function"?i.call(...e):t,Di=(i,e,t=!0)=>{if(!t)return void se(i);const a=(h=>{if(!h)return 0;let{transitionDuration:g,transitionDelay:v}=window.getComputedStyle(h);const y=Number.parseFloat(g),w=Number.parseFloat(v);return y||w?(g=g.split(",")[0],v=v.split(",")[0],1e3*(Number.parseFloat(g)+Number.parseFloat(v))):0})(e)+5;let c=!1;const d=({target:h})=>{h===e&&(c=!0,e.removeEventListener(p,d),se(i))};e.addEventListener(p,d),setTimeout(()=>{c||x(e)},a)},Kt=(i,e,t,a)=>{const c=i.length;let d=i.indexOf(e);return d===-1?!t&&a?i[c-1]:i[0]:(d+=t?1:-1,a&&(d=(d+c)%c),i[Math.max(0,Math.min(d,c-1))])},Is=/[^.]*(?=\..*)\.|.*/,Os=/\..*/,Ps=/::\d+$/,qt={};let Li=1;const Ni={mouseenter:"mouseover",mouseleave:"mouseout"},js=new Set(["click","dblclick","mouseup","mousedown","contextmenu","mousewheel","DOMMouseScroll","mouseover","mouseout","mousemove","selectstart","selectend","keydown","keypress","keyup","orientationchange","touchstart","touchmove","touchend","touchcancel","pointerdown","pointermove","pointerup","pointerleave","pointercancel","gesturestart","gesturechange","gestureend","focus","blur","change","reset","select","submit","focusin","focusout","load","unload","beforeunload","resize","move","DOMContentLoaded","readystatechange","error","abort","scroll"]);function Mi(i,e){return e&&`${e}::${Li++}`||i.uidEvent||Li++}function Bi(i){const e=Mi(i);return i.uidEvent=e,qt[e]=qt[e]||{},qt[e]}function Fi(i,e,t=null){return Object.values(i).find(a=>a.callable===e&&a.delegationSelector===t)}function Ri(i,e,t){const a=typeof e=="string",c=a?t:e||t;let d=Hi(i);return js.has(d)||(d=i),[a,c,d]}function zi(i,e,t,a,c){if(typeof e!="string"||!i)return;let[d,h,g]=Ri(e,t,a);e in Ni&&(h=(A=>function(C){if(!C.relatedTarget||C.relatedTarget!==C.delegateTarget&&!C.delegateTarget.contains(C.relatedTarget))return A.call(this,C)})(h));const v=Bi(i),y=v[g]||(v[g]={}),w=Fi(y,h,d?t:null);if(w)return void(w.oneOff=w.oneOff&&c);const b=Mi(h,e.replace(Is,"")),I=d?function(S,A,C){return function E(F){const V=S.querySelectorAll(A);for(let{target:P}=F;P&&P!==this;P=P.parentNode)for(const N of V)if(N===P)return Ut(F,{delegateTarget:P}),E.oneOff&&m.off(S,F.type,A,C),C.apply(P,[F])}}(i,t,h):function(S,A){return function C(E){return Ut(E,{delegateTarget:S}),C.oneOff&&m.off(S,E.type,A),A.apply(S,[E])}}(i,h);I.delegationSelector=d?t:null,I.callable=h,I.oneOff=c,I.uidEvent=b,y[b]=I,i.addEventListener(g,I,d)}function Wt(i,e,t,a,c){const d=Fi(e[t],a,c);d&&(i.removeEventListener(t,d,!!c),delete e[t][d.uidEvent])}function Ds(i,e,t,a){const c=e[t]||{};for(const[d,h]of Object.entries(c))d.includes(a)&&Wt(i,e,t,h.callable,h.delegationSelector)}function Hi(i){return i=i.replace(Os,""),Ni[i]||i}const m={on(i,e,t,a){zi(i,e,t,a,!1)},one(i,e,t,a){zi(i,e,t,a,!0)},off(i,e,t,a){if(typeof e!="string"||!i)return;const[c,d,h]=Ri(e,t,a),g=h!==e,v=Bi(i),y=v[h]||{},w=e.startsWith(".");if(d===void 0){if(w)for(const b of Object.keys(v))Ds(i,v,b,e.slice(1));for(const[b,I]of Object.entries(y)){const S=b.replace(Ps,"");g&&!e.includes(S)||Wt(i,v,h,I.callable,I.delegationSelector)}}else{if(!Object.keys(y).length)return;Wt(i,v,h,d,c?t:null)}},trigger(i,e,t){if(typeof e!="string"||!i)return null;const a=Q();let c=null,d=!0,h=!0,g=!1;e!==Hi(e)&&a&&(c=a.Event(e,t),a(i).trigger(c),d=!c.isPropagationStopped(),h=!c.isImmediatePropagationStopped(),g=c.isDefaultPrevented());const v=Ut(new Event(e,{bubbles:d,cancelable:!0}),t);return g&&v.preventDefault(),h&&i.dispatchEvent(v),v.defaultPrevented&&c&&c.preventDefault(),v}};function Ut(i,e={}){for(const[t,a]of Object.entries(e))try{i[t]=a}catch{Object.defineProperty(i,t,{configurable:!0,get:()=>a})}return i}function Vi(i){if(i==="true")return!0;if(i==="false")return!1;if(i===Number(i).toString())return Number(i);if(i===""||i==="null")return null;if(typeof i!="string")return i;try{return JSON.parse(decodeURIComponent(i))}catch{return i}}function Gt(i){return i.replace(/[A-Z]/g,e=>`-${e.toLowerCase()}`)}const Se={setDataAttribute(i,e,t){i.setAttribute(`data-bs-${Gt(e)}`,t)},removeDataAttribute(i,e){i.removeAttribute(`data-bs-${Gt(e)}`)},getDataAttributes(i){if(!i)return{};const e={},t=Object.keys(i.dataset).filter(a=>a.startsWith("bs")&&!a.startsWith("bsConfig"));for(const a of t){let c=a.replace(/^bs/,"");c=c.charAt(0).toLowerCase()+c.slice(1),e[c]=Vi(i.dataset[a])}return e},getDataAttribute:(i,e)=>Vi(i.getAttribute(`data-bs-${Gt(e)}`))};class ct{static get Default(){return{}}static get DefaultType(){return{}}static get NAME(){throw new Error('You have to implement the static method "NAME", for each component!')}_getConfig(e){return e=this._mergeConfigObj(e),e=this._configAfterMerge(e),this._typeCheckConfig(e),e}_configAfterMerge(e){return e}_mergeConfigObj(e,t){const a=$(t)?Se.getDataAttribute(t,"config"):{};return{...this.constructor.Default,...typeof a=="object"?a:{},...$(t)?Se.getDataAttributes(t):{},...typeof e=="object"?e:{}}}_typeCheckConfig(e,t=this.constructor.DefaultType){for(const[a,c]of Object.entries(t)){const d=e[a],h=$(d)?"element":f(d);if(!new RegExp(c).test(h))throw new TypeError(`${this.constructor.NAME.toUpperCase()}: Option "${a}" provided type "${h}" but expected type "${c}".`)}}}class ve extends ct{constructor(e,t){super(),(e=L(e))&&(this._element=e,this._config=this._getConfig(t),l.set(this._element,this.constructor.DATA_KEY,this))}dispose(){l.remove(this._element,this.constructor.DATA_KEY),m.off(this._element,this.constructor.EVENT_KEY);for(const e of Object.getOwnPropertyNames(this))this[e]=null}_queueCallback(e,t,a=!0){Di(e,t,a)}_getConfig(e){return e=this._mergeConfigObj(e,this._element),e=this._configAfterMerge(e),this._typeCheckConfig(e),e}static getInstance(e){return l.get(L(e),this.DATA_KEY)}static getOrCreateInstance(e,t={}){return this.getInstance(e)||new this(e,typeof t=="object"?t:null)}static get VERSION(){return"5.3.8"}static get DATA_KEY(){return`bs.${this.NAME}`}static get EVENT_KEY(){return`.${this.DATA_KEY}`}static eventName(e){return`${e}${this.EVENT_KEY}`}}const Yt=i=>{let e=i.getAttribute("data-bs-target");if(!e||e==="#"){let t=i.getAttribute("href");if(!t||!t.includes("#")&&!t.startsWith("."))return null;t.includes("#")&&!t.startsWith("#")&&(t=`#${t.split("#")[1]}`),e=t&&t!=="#"?t.trim():null}return e?e.split(",").map(t=>u(t)).join(","):null},k={find:(i,e=document.documentElement)=>[].concat(...Element.prototype.querySelectorAll.call(e,i)),findOne:(i,e=document.documentElement)=>Element.prototype.querySelector.call(e,i),children:(i,e)=>[].concat(...i.children).filter(t=>t.matches(e)),parents(i,e){const t=[];let a=i.parentNode.closest(e);for(;a;)t.push(a),a=a.parentNode.closest(e);return t},prev(i,e){let t=i.previousElementSibling;for(;t;){if(t.matches(e))return[t];t=t.previousElementSibling}return[]},next(i,e){let t=i.nextElementSibling;for(;t;){if(t.matches(e))return[t];t=t.nextElementSibling}return[]},focusableChildren(i){const e=["a","button","input","textarea","select","details","[tabindex]",'[contenteditable="true"]'].map(t=>`${t}:not([tabindex^="-"])`).join(",");return this.find(e,i).filter(t=>!T(t)&&_(t))},getSelectorFromElement(i){const e=Yt(i);return e&&k.findOne(e)?e:null},getElementFromSelector(i){const e=Yt(i);return e?k.findOne(e):null},getMultipleElementsFromSelector(i){const e=Yt(i);return e?k.find(e):[]}},kt=(i,e="hide")=>{const t=`click.dismiss${i.EVENT_KEY}`,a=i.NAME;m.on(document,t,`[data-bs-dismiss="${a}"]`,function(c){if(["A","AREA"].includes(this.tagName)&&c.preventDefault(),T(this))return;const d=k.getElementFromSelector(this)||this.closest(`.${a}`);i.getOrCreateInstance(d)[e]()})},Ki=".bs.alert",Ls=`close${Ki}`,Ns=`closed${Ki}`;class dt extends ve{static get NAME(){return"alert"}close(){if(m.trigger(this._element,Ls).defaultPrevented)return;this._element.classList.remove("show");const e=this._element.classList.contains("fade");this._queueCallback(()=>this._destroyElement(),this._element,e)}_destroyElement(){this._element.remove(),m.trigger(this._element,Ns),this.dispose()}static jQueryInterface(e){return this.each(function(){const t=dt.getOrCreateInstance(this);if(typeof e=="string"){if(t[e]===void 0||e.startsWith("_")||e==="constructor")throw new TypeError(`No method named "${e}"`);t[e](this)}})}}kt(dt,"close"),ce(dt);const qi='[data-bs-toggle="button"]';class pt extends ve{static get NAME(){return"button"}toggle(){this._element.setAttribute("aria-pressed",this._element.classList.toggle("active"))}static jQueryInterface(e){return this.each(function(){const t=pt.getOrCreateInstance(this);e==="toggle"&&t[e]()})}}m.on(document,"click.bs.button.data-api",qi,i=>{i.preventDefault();const e=i.target.closest(qi);pt.getOrCreateInstance(e).toggle()}),ce(pt);const We=".bs.swipe",Ms=`touchstart${We}`,Bs=`touchmove${We}`,Fs=`touchend${We}`,Rs=`pointerdown${We}`,zs=`pointerup${We}`,Hs={endCallback:null,leftCallback:null,rightCallback:null},Vs={endCallback:"(function|null)",leftCallback:"(function|null)",rightCallback:"(function|null)"};class xt extends ct{constructor(e,t){super(),this._element=e,e&&xt.isSupported()&&(this._config=this._getConfig(t),this._deltaX=0,this._supportPointerEvents=!!window.PointerEvent,this._initEvents())}static get Default(){return Hs}static get DefaultType(){return Vs}static get NAME(){return"swipe"}dispose(){m.off(this._element,We)}_start(e){this._supportPointerEvents?this._eventIsPointerPenTouch(e)&&(this._deltaX=e.clientX):this._deltaX=e.touches[0].clientX}_end(e){this._eventIsPointerPenTouch(e)&&(this._deltaX=e.clientX-this._deltaX),this._handleSwipe(),se(this._config.endCallback)}_move(e){this._deltaX=e.touches&&e.touches.length>1?0:e.touches[0].clientX-this._deltaX}_handleSwipe(){const e=Math.abs(this._deltaX);if(e<=40)return;const t=e/this._deltaX;this._deltaX=0,t&&se(t>0?this._config.rightCallback:this._config.leftCallback)}_initEvents(){this._supportPointerEvents?(m.on(this._element,Rs,e=>this._start(e)),m.on(this._element,zs,e=>this._end(e)),this._element.classList.add("pointer-event")):(m.on(this._element,Ms,e=>this._start(e)),m.on(this._element,Bs,e=>this._move(e)),m.on(this._element,Fs,e=>this._end(e)))}_eventIsPointerPenTouch(e){return this._supportPointerEvents&&(e.pointerType==="pen"||e.pointerType==="touch")}static isSupported(){return"ontouchstart"in document.documentElement||navigator.maxTouchPoints>0}}const Te=".bs.carousel",Wi=".data-api",Ks="ArrowLeft",qs="ArrowRight",ut="next",Ue="prev",Ge="left",$t="right",Ws=`slide${Te}`,Qt=`slid${Te}`,Us=`keydown${Te}`,Gs=`mouseenter${Te}`,Ys=`mouseleave${Te}`,Qs=`dragstart${Te}`,Xs=`load${Te}${Wi}`,Zs=`click${Te}${Wi}`,Ui="carousel",St="active",Gi=".active",Yi=".carousel-item",Js=Gi+Yi,en={[Ks]:$t,[qs]:Ge},tn={interval:5e3,keyboard:!0,pause:"hover",ride:!1,touch:!0,wrap:!0},an={interval:"(number|boolean)",keyboard:"boolean",pause:"(string|boolean)",ride:"(boolean|string)",touch:"boolean",wrap:"boolean"};class Ye extends ve{constructor(e,t){super(e,t),this._interval=null,this._activeElement=null,this._isSliding=!1,this.touchTimeout=null,this._swipeHelper=null,this._indicatorsElement=k.findOne(".carousel-indicators",this._element),this._addEventListeners(),this._config.ride===Ui&&this.cycle()}static get Default(){return tn}static get DefaultType(){return an}static get NAME(){return"carousel"}next(){this._slide(ut)}nextWhenVisible(){!document.hidden&&_(this._element)&&this.next()}prev(){this._slide(Ue)}pause(){this._isSliding&&x(this._element),this._clearInterval()}cycle(){this._clearInterval(),this._updateInterval(),this._interval=setInterval(()=>this.nextWhenVisible(),this._config.interval)}_maybeEnableCycle(){this._config.ride&&(this._isSliding?m.one(this._element,Qt,()=>this.cycle()):this.cycle())}to(e){const t=this._getItems();if(e>t.length-1||e<0)return;if(this._isSliding)return void m.one(this._element,Qt,()=>this.to(e));const a=this._getItemIndex(this._getActive());if(a===e)return;const c=e>a?ut:Ue;this._slide(c,t[e])}dispose(){this._swipeHelper&&this._swipeHelper.dispose(),super.dispose()}_configAfterMerge(e){return e.defaultInterval=e.interval,e}_addEventListeners(){this._config.keyboard&&m.on(this._element,Us,e=>this._keydown(e)),this._config.pause==="hover"&&(m.on(this._element,Gs,()=>this.pause()),m.on(this._element,Ys,()=>this._maybeEnableCycle())),this._config.touch&&xt.isSupported()&&this._addTouchEventListeners()}_addTouchEventListeners(){for(const t of k.find(".carousel-item img",this._element))m.on(t,Qs,a=>a.preventDefault());const e={leftCallback:()=>this._slide(this._directionToOrder(Ge)),rightCallback:()=>this._slide(this._directionToOrder($t)),endCallback:()=>{this._config.pause==="hover"&&(this.pause(),this.touchTimeout&&clearTimeout(this.touchTimeout),this.touchTimeout=setTimeout(()=>this._maybeEnableCycle(),500+this._config.interval))}};this._swipeHelper=new xt(this._element,e)}_keydown(e){if(/input|textarea/i.test(e.target.tagName))return;const t=en[e.key];t&&(e.preventDefault(),this._slide(this._directionToOrder(t)))}_getItemIndex(e){return this._getItems().indexOf(e)}_setActiveIndicatorElement(e){if(!this._indicatorsElement)return;const t=k.findOne(Gi,this._indicatorsElement);t.classList.remove(St),t.removeAttribute("aria-current");const a=k.findOne(`[data-bs-slide-to="${e}"]`,this._indicatorsElement);a&&(a.classList.add(St),a.setAttribute("aria-current","true"))}_updateInterval(){const e=this._activeElement||this._getActive();if(!e)return;const t=Number.parseInt(e.getAttribute("data-bs-interval"),10);this._config.interval=t||this._config.defaultInterval}_slide(e,t=null){if(this._isSliding)return;const a=this._getActive(),c=e===ut,d=t||Kt(this._getItems(),a,c,this._config.wrap);if(d===a)return;const h=this._getItemIndex(d),g=b=>m.trigger(this._element,b,{relatedTarget:d,direction:this._orderToDirection(e),from:this._getItemIndex(a),to:h});if(g(Ws).defaultPrevented||!a||!d)return;const v=!!this._interval;this.pause(),this._isSliding=!0,this._setActiveIndicatorElement(h),this._activeElement=d;const y=c?"carousel-item-start":"carousel-item-end",w=c?"carousel-item-next":"carousel-item-prev";d.classList.add(w),K(d),a.classList.add(y),d.classList.add(y),this._queueCallback(()=>{d.classList.remove(y,w),d.classList.add(St),a.classList.remove(St,w,y),this._isSliding=!1,g(Qt)},a,this._isAnimated()),v&&this.cycle()}_isAnimated(){return this._element.classList.contains("slide")}_getActive(){return k.findOne(Js,this._element)}_getItems(){return k.find(Yi,this._element)}_clearInterval(){this._interval&&(clearInterval(this._interval),this._interval=null)}_directionToOrder(e){return ae()?e===Ge?Ue:ut:e===Ge?ut:Ue}_orderToDirection(e){return ae()?e===Ue?Ge:$t:e===Ue?$t:Ge}static jQueryInterface(e){return this.each(function(){const t=Ye.getOrCreateInstance(this,e);if(typeof e!="number"){if(typeof e=="string"){if(t[e]===void 0||e.startsWith("_")||e==="constructor")throw new TypeError(`No method named "${e}"`);t[e]()}}else t.to(e)})}}m.on(document,Zs,"[data-bs-slide], [data-bs-slide-to]",function(i){const e=k.getElementFromSelector(this);if(!e||!e.classList.contains(Ui))return;i.preventDefault();const t=Ye.getOrCreateInstance(e),a=this.getAttribute("data-bs-slide-to");return a?(t.to(a),void t._maybeEnableCycle()):Se.getDataAttribute(this,"slide")==="next"?(t.next(),void t._maybeEnableCycle()):(t.prev(),void t._maybeEnableCycle())}),m.on(window,Xs,()=>{const i=k.find('[data-bs-ride="carousel"]');for(const e of i)Ye.getOrCreateInstance(e)}),ce(Ye);const ht=".bs.collapse",sn=`show${ht}`,nn=`shown${ht}`,on=`hide${ht}`,rn=`hidden${ht}`,ln=`click${ht}.data-api`,Xt="show",Qe="collapse",Ct="collapsing",cn=`:scope .${Qe} .${Qe}`,Zt='[data-bs-toggle="collapse"]',dn={parent:null,toggle:!0},pn={parent:"(null|element)",toggle:"boolean"};class Xe extends ve{constructor(e,t){super(e,t),this._isTransitioning=!1,this._triggerArray=[];const a=k.find(Zt);for(const c of a){const d=k.getSelectorFromElement(c),h=k.find(d).filter(g=>g===this._element);d!==null&&h.length&&this._triggerArray.push(c)}this._initializeChildren(),this._config.parent||this._addAriaAndCollapsedClass(this._triggerArray,this._isShown()),this._config.toggle&&this.toggle()}static get Default(){return dn}static get DefaultType(){return pn}static get NAME(){return"collapse"}toggle(){this._isShown()?this.hide():this.show()}show(){if(this._isTransitioning||this._isShown())return;let e=[];if(this._config.parent&&(e=this._getFirstLevelChildren(".collapse.show, .collapse.collapsing").filter(c=>c!==this._element).map(c=>Xe.getOrCreateInstance(c,{toggle:!1}))),e.length&&e[0]._isTransitioning||m.trigger(this._element,sn).defaultPrevented)return;for(const c of e)c.hide();const t=this._getDimension();this._element.classList.remove(Qe),this._element.classList.add(Ct),this._element.style[t]=0,this._addAriaAndCollapsedClass(this._triggerArray,!0),this._isTransitioning=!0;const a=`scroll${t[0].toUpperCase()+t.slice(1)}`;this._queueCallback(()=>{this._isTransitioning=!1,this._element.classList.remove(Ct),this._element.classList.add(Qe,Xt),this._element.style[t]="",m.trigger(this._element,nn)},this._element,!0),this._element.style[t]=`${this._element[a]}px`}hide(){if(this._isTransitioning||!this._isShown()||m.trigger(this._element,on).defaultPrevented)return;const e=this._getDimension();this._element.style[e]=`${this._element.getBoundingClientRect()[e]}px`,K(this._element),this._element.classList.add(Ct),this._element.classList.remove(Qe,Xt);for(const t of this._triggerArray){const a=k.getElementFromSelector(t);a&&!this._isShown(a)&&this._addAriaAndCollapsedClass([t],!1)}this._isTransitioning=!0,this._element.style[e]="",this._queueCallback(()=>{this._isTransitioning=!1,this._element.classList.remove(Ct),this._element.classList.add(Qe),m.trigger(this._element,rn)},this._element,!0)}_isShown(e=this._element){return e.classList.contains(Xt)}_configAfterMerge(e){return e.toggle=!!e.toggle,e.parent=L(e.parent),e}_getDimension(){return this._element.classList.contains("collapse-horizontal")?"width":"height"}_initializeChildren(){if(!this._config.parent)return;const e=this._getFirstLevelChildren(Zt);for(const t of e){const a=k.getElementFromSelector(t);a&&this._addAriaAndCollapsedClass([t],this._isShown(a))}}_getFirstLevelChildren(e){const t=k.find(cn,this._config.parent);return k.find(e,this._config.parent).filter(a=>!t.includes(a))}_addAriaAndCollapsedClass(e,t){if(e.length)for(const a of e)a.classList.toggle("collapsed",!t),a.setAttribute("aria-expanded",t)}static jQueryInterface(e){const t={};return typeof e=="string"&&/show|hide/.test(e)&&(t.toggle=!1),this.each(function(){const a=Xe.getOrCreateInstance(this,t);if(typeof e=="string"){if(a[e]===void 0)throw new TypeError(`No method named "${e}"`);a[e]()}})}}m.on(document,ln,Zt,function(i){(i.target.tagName==="A"||i.delegateTarget&&i.delegateTarget.tagName==="A")&&i.preventDefault();for(const e of k.getMultipleElementsFromSelector(this))Xe.getOrCreateInstance(e,{toggle:!1}).toggle()}),ce(Xe);var J="top",ne="bottom",oe="right",ee="left",At="auto",Ze=[J,ne,oe,ee],De="start",Je="end",Qi="clippingParents",Jt="viewport",et="popper",Xi="reference",ei=Ze.reduce(function(i,e){return i.concat([e+"-"+De,e+"-"+Je])},[]),ti=[].concat(Ze,[At]).reduce(function(i,e){return i.concat([e,e+"-"+De,e+"-"+Je])},[]),Zi="beforeRead",Ji="read",ea="afterRead",ta="beforeMain",ia="main",aa="afterMain",sa="beforeWrite",na="write",oa="afterWrite",ra=[Zi,Ji,ea,ta,ia,aa,sa,na,oa];function we(i){return i?(i.nodeName||"").toLowerCase():null}function re(i){if(i==null)return window;if(i.toString()!=="[object Window]"){var e=i.ownerDocument;return e&&e.defaultView||window}return i}function Le(i){return i instanceof re(i).Element||i instanceof Element}function de(i){return i instanceof re(i).HTMLElement||i instanceof HTMLElement}function ii(i){return typeof ShadowRoot<"u"&&(i instanceof re(i).ShadowRoot||i instanceof ShadowRoot)}const ai={name:"applyStyles",enabled:!0,phase:"write",fn:function(i){var e=i.state;Object.keys(e.elements).forEach(function(t){var a=e.styles[t]||{},c=e.attributes[t]||{},d=e.elements[t];de(d)&&we(d)&&(Object.assign(d.style,a),Object.keys(c).forEach(function(h){var g=c[h];g===!1?d.removeAttribute(h):d.setAttribute(h,g===!0?"":g)}))})},effect:function(i){var e=i.state,t={popper:{position:e.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(e.elements.popper.style,t.popper),e.styles=t,e.elements.arrow&&Object.assign(e.elements.arrow.style,t.arrow),function(){Object.keys(e.elements).forEach(function(a){var c=e.elements[a],d=e.attributes[a]||{},h=Object.keys(e.styles.hasOwnProperty(a)?e.styles[a]:t[a]).reduce(function(g,v){return g[v]="",g},{});de(c)&&we(c)&&(Object.assign(c.style,h),Object.keys(d).forEach(function(g){c.removeAttribute(g)}))})}},requires:["computeStyles"]};function _e(i){return i.split("-")[0]}var Ne=Math.max,Et=Math.min,tt=Math.round;function si(){var i=navigator.userAgentData;return i!=null&&i.brands&&Array.isArray(i.brands)?i.brands.map(function(e){return e.brand+"/"+e.version}).join(" "):navigator.userAgent}function la(){return!/^((?!chrome|android).)*safari/i.test(si())}function it(i,e,t){e===void 0&&(e=!1),t===void 0&&(t=!1);var a=i.getBoundingClientRect(),c=1,d=1;e&&de(i)&&(c=i.offsetWidth>0&&tt(a.width)/i.offsetWidth||1,d=i.offsetHeight>0&&tt(a.height)/i.offsetHeight||1);var h=(Le(i)?re(i):window).visualViewport,g=!la()&&t,v=(a.left+(g&&h?h.offsetLeft:0))/c,y=(a.top+(g&&h?h.offsetTop:0))/d,w=a.width/c,b=a.height/d;return{width:w,height:b,top:y,right:v+w,bottom:y+b,left:v,x:v,y}}function ni(i){var e=it(i),t=i.offsetWidth,a=i.offsetHeight;return Math.abs(e.width-t)<=1&&(t=e.width),Math.abs(e.height-a)<=1&&(a=e.height),{x:i.offsetLeft,y:i.offsetTop,width:t,height:a}}function ca(i,e){var t=e.getRootNode&&e.getRootNode();if(i.contains(e))return!0;if(t&&ii(t)){var a=e;do{if(a&&i.isSameNode(a))return!0;a=a.parentNode||a.host}while(a)}return!1}function Ce(i){return re(i).getComputedStyle(i)}function un(i){return["table","td","th"].indexOf(we(i))>=0}function Ie(i){return((Le(i)?i.ownerDocument:i.document)||window.document).documentElement}function Tt(i){return we(i)==="html"?i:i.assignedSlot||i.parentNode||(ii(i)?i.host:null)||Ie(i)}function da(i){return de(i)&&Ce(i).position!=="fixed"?i.offsetParent:null}function gt(i){for(var e=re(i),t=da(i);t&&un(t)&&Ce(t).position==="static";)t=da(t);return t&&(we(t)==="html"||we(t)==="body"&&Ce(t).position==="static")?e:t||function(a){var c=/firefox/i.test(si());if(/Trident/i.test(si())&&de(a)&&Ce(a).position==="fixed")return null;var d=Tt(a);for(ii(d)&&(d=d.host);de(d)&&["html","body"].indexOf(we(d))<0;){var h=Ce(d);if(h.transform!=="none"||h.perspective!=="none"||h.contain==="paint"||["transform","perspective"].indexOf(h.willChange)!==-1||c&&h.willChange==="filter"||c&&h.filter&&h.filter!=="none")return d;d=d.parentNode}return null}(i)||e}function oi(i){return["top","bottom"].indexOf(i)>=0?"x":"y"}function mt(i,e,t){return Ne(i,Et(e,t))}function pa(i){return Object.assign({},{top:0,right:0,bottom:0,left:0},i)}function ua(i,e){return e.reduce(function(t,a){return t[a]=i,t},{})}const ha={name:"arrow",enabled:!0,phase:"main",fn:function(i){var e,t=i.state,a=i.name,c=i.options,d=t.elements.arrow,h=t.modifiersData.popperOffsets,g=_e(t.placement),v=oi(g),y=[ee,oe].indexOf(g)>=0?"height":"width";if(d&&h){var w=function(R,B){return pa(typeof(R=typeof R=="function"?R(Object.assign({},B.rects,{placement:B.placement})):R)!="number"?R:ua(R,Ze))}(c.padding,t),b=ni(d),I=v==="y"?J:ee,S=v==="y"?ne:oe,A=t.rects.reference[y]+t.rects.reference[v]-h[v]-t.rects.popper[y],C=h[v]-t.rects.reference[v],E=gt(d),F=E?v==="y"?E.clientHeight||0:E.clientWidth||0:0,V=A/2-C/2,P=w[I],N=F-b[y]-w[S],O=F/2-b[y]/2+V,D=mt(P,O,N),M=v;t.modifiersData[a]=((e={})[M]=D,e.centerOffset=D-O,e)}},effect:function(i){var e=i.state,t=i.options.element,a=t===void 0?"[data-popper-arrow]":t;a!=null&&(typeof a!="string"||(a=e.elements.popper.querySelector(a)))&&ca(e.elements.popper,a)&&(e.elements.arrow=a)},requires:["popperOffsets"],requiresIfExists:["preventOverflow"]};function at(i){return i.split("-")[1]}var hn={top:"auto",right:"auto",bottom:"auto",left:"auto"};function ga(i){var e,t=i.popper,a=i.popperRect,c=i.placement,d=i.variation,h=i.offsets,g=i.position,v=i.gpuAcceleration,y=i.adaptive,w=i.roundOffsets,b=i.isFixed,I=h.x,S=I===void 0?0:I,A=h.y,C=A===void 0?0:A,E=typeof w=="function"?w({x:S,y:C}):{x:S,y:C};S=E.x,C=E.y;var F=h.hasOwnProperty("x"),V=h.hasOwnProperty("y"),P=ee,N=J,O=window;if(y){var D=gt(t),M="clientHeight",R="clientWidth";D===re(t)&&Ce(D=Ie(t)).position!=="static"&&g==="absolute"&&(M="scrollHeight",R="scrollWidth"),(c===J||(c===ee||c===oe)&&d===Je)&&(N=ne,C-=(b&&D===O&&O.visualViewport?O.visualViewport.height:D[M])-a.height,C*=v?1:-1),c!==ee&&(c!==J&&c!==ne||d!==Je)||(P=oe,S-=(b&&D===O&&O.visualViewport?O.visualViewport.width:D[R])-a.width,S*=v?1:-1)}var B,U=Object.assign({position:g},y&&hn),le=w===!0?function(be,te){var ue=be.x,he=be.y,W=te.devicePixelRatio||1;return{x:tt(ue*W)/W||0,y:tt(he*W)/W||0}}({x:S,y:C},re(t)):{x:S,y:C};return S=le.x,C=le.y,v?Object.assign({},U,((B={})[N]=V?"0":"",B[P]=F?"0":"",B.transform=(O.devicePixelRatio||1)<=1?"translate("+S+"px, "+C+"px)":"translate3d("+S+"px, "+C+"px, 0)",B)):Object.assign({},U,((e={})[N]=V?C+"px":"",e[P]=F?S+"px":"",e.transform="",e))}const ri={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:function(i){var e=i.state,t=i.options,a=t.gpuAcceleration,c=a===void 0||a,d=t.adaptive,h=d===void 0||d,g=t.roundOffsets,v=g===void 0||g,y={placement:_e(e.placement),variation:at(e.placement),popper:e.elements.popper,popperRect:e.rects.popper,gpuAcceleration:c,isFixed:e.options.strategy==="fixed"};e.modifiersData.popperOffsets!=null&&(e.styles.popper=Object.assign({},e.styles.popper,ga(Object.assign({},y,{offsets:e.modifiersData.popperOffsets,position:e.options.strategy,adaptive:h,roundOffsets:v})))),e.modifiersData.arrow!=null&&(e.styles.arrow=Object.assign({},e.styles.arrow,ga(Object.assign({},y,{offsets:e.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:v})))),e.attributes.popper=Object.assign({},e.attributes.popper,{"data-popper-placement":e.placement})},data:{}};var It={passive:!0};const li={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:function(i){var e=i.state,t=i.instance,a=i.options,c=a.scroll,d=c===void 0||c,h=a.resize,g=h===void 0||h,v=re(e.elements.popper),y=[].concat(e.scrollParents.reference,e.scrollParents.popper);return d&&y.forEach(function(w){w.addEventListener("scroll",t.update,It)}),g&&v.addEventListener("resize",t.update,It),function(){d&&y.forEach(function(w){w.removeEventListener("scroll",t.update,It)}),g&&v.removeEventListener("resize",t.update,It)}},data:{}};var gn={left:"right",right:"left",bottom:"top",top:"bottom"};function Ot(i){return i.replace(/left|right|bottom|top/g,function(e){return gn[e]})}var mn={start:"end",end:"start"};function ma(i){return i.replace(/start|end/g,function(e){return mn[e]})}function ci(i){var e=re(i);return{scrollLeft:e.pageXOffset,scrollTop:e.pageYOffset}}function di(i){return it(Ie(i)).left+ci(i).scrollLeft}function pi(i){var e=Ce(i),t=e.overflow,a=e.overflowX,c=e.overflowY;return/auto|scroll|overlay|hidden/.test(t+c+a)}function va(i){return["html","body","#document"].indexOf(we(i))>=0?i.ownerDocument.body:de(i)&&pi(i)?i:va(Tt(i))}function vt(i,e){var t;e===void 0&&(e=[]);var a=va(i),c=a===((t=i.ownerDocument)==null?void 0:t.body),d=re(a),h=c?[d].concat(d.visualViewport||[],pi(a)?a:[]):a,g=e.concat(h);return c?g:g.concat(vt(Tt(h)))}function ui(i){return Object.assign({},i,{left:i.x,top:i.y,right:i.x+i.width,bottom:i.y+i.height})}function fa(i,e,t){return e===Jt?ui(function(a,c){var d=re(a),h=Ie(a),g=d.visualViewport,v=h.clientWidth,y=h.clientHeight,w=0,b=0;if(g){v=g.width,y=g.height;var I=la();(I||!I&&c==="fixed")&&(w=g.offsetLeft,b=g.offsetTop)}return{width:v,height:y,x:w+di(a),y:b}}(i,t)):Le(e)?function(a,c){var d=it(a,!1,c==="fixed");return d.top=d.top+a.clientTop,d.left=d.left+a.clientLeft,d.bottom=d.top+a.clientHeight,d.right=d.left+a.clientWidth,d.width=a.clientWidth,d.height=a.clientHeight,d.x=d.left,d.y=d.top,d}(e,t):ui(function(a){var c,d=Ie(a),h=ci(a),g=(c=a.ownerDocument)==null?void 0:c.body,v=Ne(d.scrollWidth,d.clientWidth,g?g.scrollWidth:0,g?g.clientWidth:0),y=Ne(d.scrollHeight,d.clientHeight,g?g.scrollHeight:0,g?g.clientHeight:0),w=-h.scrollLeft+di(a),b=-h.scrollTop;return Ce(g||d).direction==="rtl"&&(w+=Ne(d.clientWidth,g?g.clientWidth:0)-v),{width:v,height:y,x:w,y:b}}(Ie(i)))}function ba(i){var e,t=i.reference,a=i.element,c=i.placement,d=c?_e(c):null,h=c?at(c):null,g=t.x+t.width/2-a.width/2,v=t.y+t.height/2-a.height/2;switch(d){case J:e={x:g,y:t.y-a.height};break;case ne:e={x:g,y:t.y+t.height};break;case oe:e={x:t.x+t.width,y:v};break;case ee:e={x:t.x-a.width,y:v};break;default:e={x:t.x,y:t.y}}var y=d?oi(d):null;if(y!=null){var w=y==="y"?"height":"width";switch(h){case De:e[y]=e[y]-(t[w]/2-a[w]/2);break;case Je:e[y]=e[y]+(t[w]/2-a[w]/2)}}return e}function st(i,e){e===void 0&&(e={});var t=e,a=t.placement,c=a===void 0?i.placement:a,d=t.strategy,h=d===void 0?i.strategy:d,g=t.boundary,v=g===void 0?Qi:g,y=t.rootBoundary,w=y===void 0?Jt:y,b=t.elementContext,I=b===void 0?et:b,S=t.altBoundary,A=S!==void 0&&S,C=t.padding,E=C===void 0?0:C,F=pa(typeof E!="number"?E:ua(E,Ze)),V=I===et?Xi:et,P=i.rects.popper,N=i.elements[A?V:I],O=function(te,ue,he,W){var ke=ue==="clippingParents"?function(z){var ie=vt(Tt(z)),ge=["absolute","fixed"].indexOf(Ce(z).position)>=0&&de(z)?gt(z):z;return Le(ge)?ie.filter(function(Pe){return Le(Pe)&&ca(Pe,ge)&&we(Pe)!=="body"}):[]}(te):[].concat(ue),xe=[].concat(ke,[he]),rt=xe[0],Y=xe.reduce(function(z,ie){var ge=fa(te,ie,W);return z.top=Ne(ge.top,z.top),z.right=Et(ge.right,z.right),z.bottom=Et(ge.bottom,z.bottom),z.left=Ne(ge.left,z.left),z},fa(te,rt,W));return Y.width=Y.right-Y.left,Y.height=Y.bottom-Y.top,Y.x=Y.left,Y.y=Y.top,Y}(Le(N)?N:N.contextElement||Ie(i.elements.popper),v,w,h),D=it(i.elements.reference),M=ba({reference:D,element:P,placement:c}),R=ui(Object.assign({},P,M)),B=I===et?R:D,U={top:O.top-B.top+F.top,bottom:B.bottom-O.bottom+F.bottom,left:O.left-B.left+F.left,right:B.right-O.right+F.right},le=i.modifiersData.offset;if(I===et&&le){var be=le[c];Object.keys(U).forEach(function(te){var ue=[oe,ne].indexOf(te)>=0?1:-1,he=[J,ne].indexOf(te)>=0?"y":"x";U[te]+=be[he]*ue})}return U}function vn(i,e){e===void 0&&(e={});var t=e,a=t.placement,c=t.boundary,d=t.rootBoundary,h=t.padding,g=t.flipVariations,v=t.allowedAutoPlacements,y=v===void 0?ti:v,w=at(a),b=w?g?ei:ei.filter(function(A){return at(A)===w}):Ze,I=b.filter(function(A){return y.indexOf(A)>=0});I.length===0&&(I=b);var S=I.reduce(function(A,C){return A[C]=st(i,{placement:C,boundary:c,rootBoundary:d,padding:h})[_e(C)],A},{});return Object.keys(S).sort(function(A,C){return S[A]-S[C]})}const ya={name:"flip",enabled:!0,phase:"main",fn:function(i){var e=i.state,t=i.options,a=i.name;if(!e.modifiersData[a]._skip){for(var c=t.mainAxis,d=c===void 0||c,h=t.altAxis,g=h===void 0||h,v=t.fallbackPlacements,y=t.padding,w=t.boundary,b=t.rootBoundary,I=t.altBoundary,S=t.flipVariations,A=S===void 0||S,C=t.allowedAutoPlacements,E=e.options.placement,F=_e(E),V=v||(F!==E&&A?function(z){if(_e(z)===At)return[];var ie=Ot(z);return[ma(z),ie,ma(ie)]}(E):[Ot(E)]),P=[E].concat(V).reduce(function(z,ie){return z.concat(_e(ie)===At?vn(e,{placement:ie,boundary:w,rootBoundary:b,padding:y,flipVariations:A,allowedAutoPlacements:C}):ie)},[]),N=e.rects.reference,O=e.rects.popper,D=new Map,M=!0,R=P[0],B=0;B<P.length;B++){var U=P[B],le=_e(U),be=at(U)===De,te=[J,ne].indexOf(le)>=0,ue=te?"width":"height",he=st(e,{placement:U,boundary:w,rootBoundary:b,altBoundary:I,padding:y}),W=te?be?oe:ee:be?ne:J;N[ue]>O[ue]&&(W=Ot(W));var ke=Ot(W),xe=[];if(d&&xe.push(he[le]<=0),g&&xe.push(he[W]<=0,he[ke]<=0),xe.every(function(z){return z})){R=U,M=!1;break}D.set(U,xe)}if(M)for(var rt=function(z){var ie=P.find(function(ge){var Pe=D.get(ge);if(Pe)return Pe.slice(0,z).every(function(Rt){return Rt})});if(ie)return R=ie,"break"},Y=A?3:1;Y>0&&rt(Y)!=="break";Y--);e.placement!==R&&(e.modifiersData[a]._skip=!0,e.placement=R,e.reset=!0)}},requiresIfExists:["offset"],data:{_skip:!1}};function wa(i,e,t){return t===void 0&&(t={x:0,y:0}),{top:i.top-e.height-t.y,right:i.right-e.width+t.x,bottom:i.bottom-e.height+t.y,left:i.left-e.width-t.x}}function _a(i){return[J,oe,ne,ee].some(function(e){return i[e]>=0})}const ka={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:function(i){var e=i.state,t=i.name,a=e.rects.reference,c=e.rects.popper,d=e.modifiersData.preventOverflow,h=st(e,{elementContext:"reference"}),g=st(e,{altBoundary:!0}),v=wa(h,a),y=wa(g,c,d),w=_a(v),b=_a(y);e.modifiersData[t]={referenceClippingOffsets:v,popperEscapeOffsets:y,isReferenceHidden:w,hasPopperEscaped:b},e.attributes.popper=Object.assign({},e.attributes.popper,{"data-popper-reference-hidden":w,"data-popper-escaped":b})}},xa={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:function(i){var e=i.state,t=i.options,a=i.name,c=t.offset,d=c===void 0?[0,0]:c,h=ti.reduce(function(w,b){return w[b]=function(I,S,A){var C=_e(I),E=[ee,J].indexOf(C)>=0?-1:1,F=typeof A=="function"?A(Object.assign({},S,{placement:I})):A,V=F[0],P=F[1];return V=V||0,P=(P||0)*E,[ee,oe].indexOf(C)>=0?{x:P,y:V}:{x:V,y:P}}(b,e.rects,d),w},{}),g=h[e.placement],v=g.x,y=g.y;e.modifiersData.popperOffsets!=null&&(e.modifiersData.popperOffsets.x+=v,e.modifiersData.popperOffsets.y+=y),e.modifiersData[a]=h}},hi={name:"popperOffsets",enabled:!0,phase:"read",fn:function(i){var e=i.state,t=i.name;e.modifiersData[t]=ba({reference:e.rects.reference,element:e.rects.popper,placement:e.placement})},data:{}},$a={name:"preventOverflow",enabled:!0,phase:"main",fn:function(i){var e=i.state,t=i.options,a=i.name,c=t.mainAxis,d=c===void 0||c,h=t.altAxis,g=h!==void 0&&h,v=t.boundary,y=t.rootBoundary,w=t.altBoundary,b=t.padding,I=t.tether,S=I===void 0||I,A=t.tetherOffset,C=A===void 0?0:A,E=st(e,{boundary:v,rootBoundary:y,padding:b,altBoundary:w}),F=_e(e.placement),V=at(e.placement),P=!V,N=oi(F),O=N==="x"?"y":"x",D=e.modifiersData.popperOffsets,M=e.rects.reference,R=e.rects.popper,B=typeof C=="function"?C(Object.assign({},e.rects,{placement:e.placement})):C,U=typeof B=="number"?{mainAxis:B,altAxis:B}:Object.assign({mainAxis:0,altAxis:0},B),le=e.modifiersData.offset?e.modifiersData.offset[e.placement]:null,be={x:0,y:0};if(D){if(d){var te,ue=N==="y"?J:ee,he=N==="y"?ne:oe,W=N==="y"?"height":"width",ke=D[N],xe=ke+E[ue],rt=ke-E[he],Y=S?-R[W]/2:0,z=V===De?M[W]:R[W],ie=V===De?-R[W]:-M[W],ge=e.elements.arrow,Pe=S&&ge?ni(ge):{width:0,height:0},Rt=e.modifiersData["arrow#persistent"]?e.modifiersData["arrow#persistent"].padding:{top:0,right:0,bottom:0,left:0},ds=Rt[ue],ps=Rt[he],zt=mt(0,M[W],Pe[W]),Yo=P?M[W]/2-Y-zt-ds-U.mainAxis:z-zt-ds-U.mainAxis,Qo=P?-M[W]/2+Y+zt+ps+U.mainAxis:ie+zt+ps+U.mainAxis,Ai=e.elements.arrow&&gt(e.elements.arrow),Xo=Ai?N==="y"?Ai.clientTop||0:Ai.clientLeft||0:0,us=(te=le==null?void 0:le[N])!=null?te:0,Zo=ke+Qo-us,hs=mt(S?Et(xe,ke+Yo-us-Xo):xe,ke,S?Ne(rt,Zo):rt);D[N]=hs,be[N]=hs-ke}if(g){var gs,Jo=N==="x"?J:ee,er=N==="x"?ne:oe,Ke=D[O],Ht=O==="y"?"height":"width",ms=Ke+E[Jo],vs=Ke-E[er],Ei=[J,ee].indexOf(F)!==-1,fs=(gs=le==null?void 0:le[O])!=null?gs:0,bs=Ei?ms:Ke-M[Ht]-R[Ht]-fs+U.altAxis,ys=Ei?Ke+M[Ht]+R[Ht]-fs-U.altAxis:vs,ws=S&&Ei?function(tr,ir,Ti){var _s=mt(tr,ir,Ti);return _s>Ti?Ti:_s}(bs,Ke,ys):mt(S?bs:ms,Ke,S?ys:vs);D[O]=ws,be[O]=ws-Ke}e.modifiersData[a]=be}},requiresIfExists:["offset"]};function fn(i,e,t){t===void 0&&(t=!1);var a,c,d=de(e),h=de(e)&&function(b){var I=b.getBoundingClientRect(),S=tt(I.width)/b.offsetWidth||1,A=tt(I.height)/b.offsetHeight||1;return S!==1||A!==1}(e),g=Ie(e),v=it(i,h,t),y={scrollLeft:0,scrollTop:0},w={x:0,y:0};return(d||!d&&!t)&&((we(e)!=="body"||pi(g))&&(y=(a=e)!==re(a)&&de(a)?{scrollLeft:(c=a).scrollLeft,scrollTop:c.scrollTop}:ci(a)),de(e)?((w=it(e,!0)).x+=e.clientLeft,w.y+=e.clientTop):g&&(w.x=di(g))),{x:v.left+y.scrollLeft-w.x,y:v.top+y.scrollTop-w.y,width:v.width,height:v.height}}function bn(i){var e=new Map,t=new Set,a=[];function c(d){t.add(d.name),[].concat(d.requires||[],d.requiresIfExists||[]).forEach(function(h){if(!t.has(h)){var g=e.get(h);g&&c(g)}}),a.push(d)}return i.forEach(function(d){e.set(d.name,d)}),i.forEach(function(d){t.has(d.name)||c(d)}),a}var Sa={placement:"bottom",modifiers:[],strategy:"absolute"};function Ca(){for(var i=arguments.length,e=new Array(i),t=0;t<i;t++)e[t]=arguments[t];return!e.some(function(a){return!(a&&typeof a.getBoundingClientRect=="function")})}function Pt(i){i===void 0&&(i={});var e=i,t=e.defaultModifiers,a=t===void 0?[]:t,c=e.defaultOptions,d=c===void 0?Sa:c;return function(h,g,v){v===void 0&&(v=d);var y,w,b={placement:"bottom",orderedModifiers:[],options:Object.assign({},Sa,d),modifiersData:{},elements:{reference:h,popper:g},attributes:{},styles:{}},I=[],S=!1,A={state:b,setOptions:function(E){var F=typeof E=="function"?E(b.options):E;C(),b.options=Object.assign({},d,b.options,F),b.scrollParents={reference:Le(h)?vt(h):h.contextElement?vt(h.contextElement):[],popper:vt(g)};var V,P,N=function(O){var D=bn(O);return ra.reduce(function(M,R){return M.concat(D.filter(function(B){return B.phase===R}))},[])}((V=[].concat(a,b.options.modifiers),P=V.reduce(function(O,D){var M=O[D.name];return O[D.name]=M?Object.assign({},M,D,{options:Object.assign({},M.options,D.options),data:Object.assign({},M.data,D.data)}):D,O},{}),Object.keys(P).map(function(O){return P[O]})));return b.orderedModifiers=N.filter(function(O){return O.enabled}),b.orderedModifiers.forEach(function(O){var D=O.name,M=O.options,R=M===void 0?{}:M,B=O.effect;if(typeof B=="function"){var U=B({state:b,name:D,instance:A,options:R});I.push(U||function(){})}}),A.update()},forceUpdate:function(){if(!S){var E=b.elements,F=E.reference,V=E.popper;if(Ca(F,V)){b.rects={reference:fn(F,gt(V),b.options.strategy==="fixed"),popper:ni(V)},b.reset=!1,b.placement=b.options.placement,b.orderedModifiers.forEach(function(B){return b.modifiersData[B.name]=Object.assign({},B.data)});for(var P=0;P<b.orderedModifiers.length;P++)if(b.reset!==!0){var N=b.orderedModifiers[P],O=N.fn,D=N.options,M=D===void 0?{}:D,R=N.name;typeof O=="function"&&(b=O({state:b,options:M,name:R,instance:A})||b)}else b.reset=!1,P=-1}}},update:(y=function(){return new Promise(function(E){A.forceUpdate(),E(b)})},function(){return w||(w=new Promise(function(E){Promise.resolve().then(function(){w=void 0,E(y())})})),w}),destroy:function(){C(),S=!0}};if(!Ca(h,g))return A;function C(){I.forEach(function(E){return E()}),I=[]}return A.setOptions(v).then(function(E){!S&&v.onFirstUpdate&&v.onFirstUpdate(E)}),A}}var yn=Pt(),wn=Pt({defaultModifiers:[li,hi,ri,ai]}),gi=Pt({defaultModifiers:[li,hi,ri,ai,xa,ya,$a,ha,ka]});const Aa=Object.freeze(Object.defineProperty({__proto__:null,afterMain:aa,afterRead:ea,afterWrite:oa,applyStyles:ai,arrow:ha,auto:At,basePlacements:Ze,beforeMain:ta,beforeRead:Zi,beforeWrite:sa,bottom:ne,clippingParents:Qi,computeStyles:ri,createPopper:gi,createPopperBase:yn,createPopperLite:wn,detectOverflow:st,end:Je,eventListeners:li,flip:ya,hide:ka,left:ee,main:ia,modifierPhases:ra,offset:xa,placements:ti,popper:et,popperGenerator:Pt,popperOffsets:hi,preventOverflow:$a,read:Ji,reference:Xi,right:oe,start:De,top:J,variationPlacements:ei,viewport:Jt,write:na},Symbol.toStringTag,{value:"Module"})),Ea="dropdown",Me=".bs.dropdown",mi=".data-api",_n="ArrowUp",Ta="ArrowDown",kn=`hide${Me}`,xn=`hidden${Me}`,$n=`show${Me}`,Sn=`shown${Me}`,Ia=`click${Me}${mi}`,Oa=`keydown${Me}${mi}`,Cn=`keyup${Me}${mi}`,nt="show",Be='[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)',An=`${Be}.${nt}`,jt=".dropdown-menu",En=ae()?"top-end":"top-start",Tn=ae()?"top-start":"top-end",In=ae()?"bottom-end":"bottom-start",On=ae()?"bottom-start":"bottom-end",Pn=ae()?"left-start":"right-start",jn=ae()?"right-start":"left-start",Dn={autoClose:!0,boundary:"clippingParents",display:"dynamic",offset:[0,2],popperConfig:null,reference:"toggle"},Ln={autoClose:"(boolean|string)",boundary:"(string|element)",display:"string",offset:"(array|string|function)",popperConfig:"(null|object|function)",reference:"(string|element|object)"};class fe extends ve{constructor(e,t){super(e,t),this._popper=null,this._parent=this._element.parentNode,this._menu=k.next(this._element,jt)[0]||k.prev(this._element,jt)[0]||k.findOne(jt,this._parent),this._inNavbar=this._detectNavbar()}static get Default(){return Dn}static get DefaultType(){return Ln}static get NAME(){return Ea}toggle(){return this._isShown()?this.hide():this.show()}show(){if(T(this._element)||this._isShown())return;const e={relatedTarget:this._element};if(!m.trigger(this._element,$n,e).defaultPrevented){if(this._createPopper(),"ontouchstart"in document.documentElement&&!this._parent.closest(".navbar-nav"))for(const t of[].concat(...document.body.children))m.on(t,"mouseover",H);this._element.focus(),this._element.setAttribute("aria-expanded",!0),this._menu.classList.add(nt),this._element.classList.add(nt),m.trigger(this._element,Sn,e)}}hide(){if(T(this._element)||!this._isShown())return;const e={relatedTarget:this._element};this._completeHide(e)}dispose(){this._popper&&this._popper.destroy(),super.dispose()}update(){this._inNavbar=this._detectNavbar(),this._popper&&this._popper.update()}_completeHide(e){if(!m.trigger(this._element,kn,e).defaultPrevented){if("ontouchstart"in document.documentElement)for(const t of[].concat(...document.body.children))m.off(t,"mouseover",H);this._popper&&this._popper.destroy(),this._menu.classList.remove(nt),this._element.classList.remove(nt),this._element.setAttribute("aria-expanded","false"),Se.removeDataAttribute(this._menu,"popper"),m.trigger(this._element,xn,e)}}_getConfig(e){if(typeof(e=super._getConfig(e)).reference=="object"&&!$(e.reference)&&typeof e.reference.getBoundingClientRect!="function")throw new TypeError(`${Ea.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);return e}_createPopper(){if(Aa===void 0)throw new TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org/docs/v2/)");let e=this._element;this._config.reference==="parent"?e=this._parent:$(this._config.reference)?e=L(this._config.reference):typeof this._config.reference=="object"&&(e=this._config.reference);const t=this._getPopperConfig();this._popper=gi(e,this._menu,t)}_isShown(){return this._menu.classList.contains(nt)}_getPlacement(){const e=this._parent;if(e.classList.contains("dropend"))return Pn;if(e.classList.contains("dropstart"))return jn;if(e.classList.contains("dropup-center"))return"top";if(e.classList.contains("dropdown-center"))return"bottom";const t=getComputedStyle(this._menu).getPropertyValue("--bs-position").trim()==="end";return e.classList.contains("dropup")?t?Tn:En:t?On:In}_detectNavbar(){return this._element.closest(".navbar")!==null}_getOffset(){const{offset:e}=this._config;return typeof e=="string"?e.split(",").map(t=>Number.parseInt(t,10)):typeof e=="function"?t=>e(t,this._element):e}_getPopperConfig(){const e={placement:this._getPlacement(),modifiers:[{name:"preventOverflow",options:{boundary:this._config.boundary}},{name:"offset",options:{offset:this._getOffset()}}]};return(this._inNavbar||this._config.display==="static")&&(Se.setDataAttribute(this._menu,"popper","static"),e.modifiers=[{name:"applyStyles",enabled:!1}]),{...e,...se(this._config.popperConfig,[void 0,e])}}_selectMenuItem({key:e,target:t}){const a=k.find(".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)",this._menu).filter(c=>_(c));a.length&&Kt(a,t,e===Ta,!a.includes(t)).focus()}static jQueryInterface(e){return this.each(function(){const t=fe.getOrCreateInstance(this,e);if(typeof e=="string"){if(t[e]===void 0)throw new TypeError(`No method named "${e}"`);t[e]()}})}static clearMenus(e){if(e.button===2||e.type==="keyup"&&e.key!=="Tab")return;const t=k.find(An);for(const a of t){const c=fe.getInstance(a);if(!c||c._config.autoClose===!1)continue;const d=e.composedPath(),h=d.includes(c._menu);if(d.includes(c._element)||c._config.autoClose==="inside"&&!h||c._config.autoClose==="outside"&&h||c._menu.contains(e.target)&&(e.type==="keyup"&&e.key==="Tab"||/input|select|option|textarea|form/i.test(e.target.tagName)))continue;const g={relatedTarget:c._element};e.type==="click"&&(g.clickEvent=e),c._completeHide(g)}}static dataApiKeydownHandler(e){const t=/input|textarea/i.test(e.target.tagName),a=e.key==="Escape",c=[_n,Ta].includes(e.key);if(!c&&!a||t&&!a)return;e.preventDefault();const d=this.matches(Be)?this:k.prev(this,Be)[0]||k.next(this,Be)[0]||k.findOne(Be,e.delegateTarget.parentNode),h=fe.getOrCreateInstance(d);if(c)return e.stopPropagation(),h.show(),void h._selectMenuItem(e);h._isShown()&&(e.stopPropagation(),h.hide(),d.focus())}}m.on(document,Oa,Be,fe.dataApiKeydownHandler),m.on(document,Oa,jt,fe.dataApiKeydownHandler),m.on(document,Ia,fe.clearMenus),m.on(document,Cn,fe.clearMenus),m.on(document,Ia,Be,function(i){i.preventDefault(),fe.getOrCreateInstance(this).toggle()}),ce(fe);const Pa="backdrop",ja="show",Da=`mousedown.bs.${Pa}`,Nn={className:"modal-backdrop",clickCallback:null,isAnimated:!1,isVisible:!0,rootElement:"body"},Mn={className:"string",clickCallback:"(function|null)",isAnimated:"boolean",isVisible:"boolean",rootElement:"(element|string)"};class La extends ct{constructor(e){super(),this._config=this._getConfig(e),this._isAppended=!1,this._element=null}static get Default(){return Nn}static get DefaultType(){return Mn}static get NAME(){return Pa}show(e){if(!this._config.isVisible)return void se(e);this._append();const t=this._getElement();this._config.isAnimated&&K(t),t.classList.add(ja),this._emulateAnimation(()=>{se(e)})}hide(e){this._config.isVisible?(this._getElement().classList.remove(ja),this._emulateAnimation(()=>{this.dispose(),se(e)})):se(e)}dispose(){this._isAppended&&(m.off(this._element,Da),this._element.remove(),this._isAppended=!1)}_getElement(){if(!this._element){const e=document.createElement("div");e.className=this._config.className,this._config.isAnimated&&e.classList.add("fade"),this._element=e}return this._element}_configAfterMerge(e){return e.rootElement=L(e.rootElement),e}_append(){if(this._isAppended)return;const e=this._getElement();this._config.rootElement.append(e),m.on(e,Da,()=>{se(this._config.clickCallback)}),this._isAppended=!0}_emulateAnimation(e){Di(e,this._getElement(),this._config.isAnimated)}}const Dt=".bs.focustrap",Bn=`focusin${Dt}`,Fn=`keydown.tab${Dt}`,Na="backward",Rn={autofocus:!0,trapElement:null},zn={autofocus:"boolean",trapElement:"element"};class Ma extends ct{constructor(e){super(),this._config=this._getConfig(e),this._isActive=!1,this._lastTabNavDirection=null}static get Default(){return Rn}static get DefaultType(){return zn}static get NAME(){return"focustrap"}activate(){this._isActive||(this._config.autofocus&&this._config.trapElement.focus(),m.off(document,Dt),m.on(document,Bn,e=>this._handleFocusin(e)),m.on(document,Fn,e=>this._handleKeydown(e)),this._isActive=!0)}deactivate(){this._isActive&&(this._isActive=!1,m.off(document,Dt))}_handleFocusin(e){const{trapElement:t}=this._config;if(e.target===document||e.target===t||t.contains(e.target))return;const a=k.focusableChildren(t);a.length===0?t.focus():this._lastTabNavDirection===Na?a[a.length-1].focus():a[0].focus()}_handleKeydown(e){e.key==="Tab"&&(this._lastTabNavDirection=e.shiftKey?Na:"forward")}}const Ba=".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",Fa=".sticky-top",Lt="padding-right",Ra="margin-right";class vi{constructor(){this._element=document.body}getWidth(){const e=document.documentElement.clientWidth;return Math.abs(window.innerWidth-e)}hide(){const e=this.getWidth();this._disableOverFlow(),this._setElementAttributes(this._element,Lt,t=>t+e),this._setElementAttributes(Ba,Lt,t=>t+e),this._setElementAttributes(Fa,Ra,t=>t-e)}reset(){this._resetElementAttributes(this._element,"overflow"),this._resetElementAttributes(this._element,Lt),this._resetElementAttributes(Ba,Lt),this._resetElementAttributes(Fa,Ra)}isOverflowing(){return this.getWidth()>0}_disableOverFlow(){this._saveInitialAttribute(this._element,"overflow"),this._element.style.overflow="hidden"}_setElementAttributes(e,t,a){const c=this.getWidth();this._applyManipulationCallback(e,d=>{if(d!==this._element&&window.innerWidth>d.clientWidth+c)return;this._saveInitialAttribute(d,t);const h=window.getComputedStyle(d).getPropertyValue(t);d.style.setProperty(t,`${a(Number.parseFloat(h))}px`)})}_saveInitialAttribute(e,t){const a=e.style.getPropertyValue(t);a&&Se.setDataAttribute(e,t,a)}_resetElementAttributes(e,t){this._applyManipulationCallback(e,a=>{const c=Se.getDataAttribute(a,t);c!==null?(Se.removeDataAttribute(a,t),a.style.setProperty(t,c)):a.style.removeProperty(t)})}_applyManipulationCallback(e,t){if($(e))t(e);else for(const a of k.find(e,this._element))t(a)}}const pe=".bs.modal",Hn=`hide${pe}`,Vn=`hidePrevented${pe}`,za=`hidden${pe}`,Ha=`show${pe}`,Kn=`shown${pe}`,qn=`resize${pe}`,Wn=`click.dismiss${pe}`,Un=`mousedown.dismiss${pe}`,Gn=`keydown.dismiss${pe}`,Yn=`click${pe}.data-api`,Va="modal-open",Ka="show",fi="modal-static",Qn={backdrop:!0,focus:!0,keyboard:!0},Xn={backdrop:"(boolean|string)",focus:"boolean",keyboard:"boolean"};class Fe extends ve{constructor(e,t){super(e,t),this._dialog=k.findOne(".modal-dialog",this._element),this._backdrop=this._initializeBackDrop(),this._focustrap=this._initializeFocusTrap(),this._isShown=!1,this._isTransitioning=!1,this._scrollBar=new vi,this._addEventListeners()}static get Default(){return Qn}static get DefaultType(){return Xn}static get NAME(){return"modal"}toggle(e){return this._isShown?this.hide():this.show(e)}show(e){this._isShown||this._isTransitioning||m.trigger(this._element,Ha,{relatedTarget:e}).defaultPrevented||(this._isShown=!0,this._isTransitioning=!0,this._scrollBar.hide(),document.body.classList.add(Va),this._adjustDialog(),this._backdrop.show(()=>this._showElement(e)))}hide(){this._isShown&&!this._isTransitioning&&(m.trigger(this._element,Hn).defaultPrevented||(this._isShown=!1,this._isTransitioning=!0,this._focustrap.deactivate(),this._element.classList.remove(Ka),this._queueCallback(()=>this._hideModal(),this._element,this._isAnimated())))}dispose(){m.off(window,pe),m.off(this._dialog,pe),this._backdrop.dispose(),this._focustrap.deactivate(),super.dispose()}handleUpdate(){this._adjustDialog()}_initializeBackDrop(){return new La({isVisible:!!this._config.backdrop,isAnimated:this._isAnimated()})}_initializeFocusTrap(){return new Ma({trapElement:this._element})}_showElement(e){document.body.contains(this._element)||document.body.append(this._element),this._element.style.display="block",this._element.removeAttribute("aria-hidden"),this._element.setAttribute("aria-modal",!0),this._element.setAttribute("role","dialog"),this._element.scrollTop=0;const t=k.findOne(".modal-body",this._dialog);t&&(t.scrollTop=0),K(this._element),this._element.classList.add(Ka),this._queueCallback(()=>{this._config.focus&&this._focustrap.activate(),this._isTransitioning=!1,m.trigger(this._element,Kn,{relatedTarget:e})},this._dialog,this._isAnimated())}_addEventListeners(){m.on(this._element,Gn,e=>{e.key==="Escape"&&(this._config.keyboard?this.hide():this._triggerBackdropTransition())}),m.on(window,qn,()=>{this._isShown&&!this._isTransitioning&&this._adjustDialog()}),m.on(this._element,Un,e=>{m.one(this._element,Wn,t=>{this._element===e.target&&this._element===t.target&&(this._config.backdrop!=="static"?this._config.backdrop&&this.hide():this._triggerBackdropTransition())})})}_hideModal(){this._element.style.display="none",this._element.setAttribute("aria-hidden",!0),this._element.removeAttribute("aria-modal"),this._element.removeAttribute("role"),this._isTransitioning=!1,this._backdrop.hide(()=>{document.body.classList.remove(Va),this._resetAdjustments(),this._scrollBar.reset(),m.trigger(this._element,za)})}_isAnimated(){return this._element.classList.contains("fade")}_triggerBackdropTransition(){if(m.trigger(this._element,Vn).defaultPrevented)return;const e=this._element.scrollHeight>document.documentElement.clientHeight,t=this._element.style.overflowY;t==="hidden"||this._element.classList.contains(fi)||(e||(this._element.style.overflowY="hidden"),this._element.classList.add(fi),this._queueCallback(()=>{this._element.classList.remove(fi),this._queueCallback(()=>{this._element.style.overflowY=t},this._dialog)},this._dialog),this._element.focus())}_adjustDialog(){const e=this._element.scrollHeight>document.documentElement.clientHeight,t=this._scrollBar.getWidth(),a=t>0;if(a&&!e){const c=ae()?"paddingLeft":"paddingRight";this._element.style[c]=`${t}px`}if(!a&&e){const c=ae()?"paddingRight":"paddingLeft";this._element.style[c]=`${t}px`}}_resetAdjustments(){this._element.style.paddingLeft="",this._element.style.paddingRight=""}static jQueryInterface(e,t){return this.each(function(){const a=Fe.getOrCreateInstance(this,e);if(typeof e=="string"){if(a[e]===void 0)throw new TypeError(`No method named "${e}"`);a[e](t)}})}}m.on(document,Yn,'[data-bs-toggle="modal"]',function(i){const e=k.getElementFromSelector(this);["A","AREA"].includes(this.tagName)&&i.preventDefault(),m.one(e,Ha,a=>{a.defaultPrevented||m.one(e,za,()=>{_(this)&&this.focus()})});const t=k.findOne(".modal.show");t&&Fe.getInstance(t).hide(),Fe.getOrCreateInstance(e).toggle(this)}),kt(Fe),ce(Fe);const Ae=".bs.offcanvas",qa=".data-api",Zn=`load${Ae}${qa}`,Wa="show",Ua="showing",Ga="hiding",Ya=".offcanvas.show",Jn=`show${Ae}`,eo=`shown${Ae}`,to=`hide${Ae}`,Qa=`hidePrevented${Ae}`,Xa=`hidden${Ae}`,io=`resize${Ae}`,ao=`click${Ae}${qa}`,so=`keydown.dismiss${Ae}`,no={backdrop:!0,keyboard:!0,scroll:!1},oo={backdrop:"(boolean|string)",keyboard:"boolean",scroll:"boolean"};class Ee extends ve{constructor(e,t){super(e,t),this._isShown=!1,this._backdrop=this._initializeBackDrop(),this._focustrap=this._initializeFocusTrap(),this._addEventListeners()}static get Default(){return no}static get DefaultType(){return oo}static get NAME(){return"offcanvas"}toggle(e){return this._isShown?this.hide():this.show(e)}show(e){this._isShown||m.trigger(this._element,Jn,{relatedTarget:e}).defaultPrevented||(this._isShown=!0,this._backdrop.show(),this._config.scroll||new vi().hide(),this._element.setAttribute("aria-modal",!0),this._element.setAttribute("role","dialog"),this._element.classList.add(Ua),this._queueCallback(()=>{this._config.scroll&&!this._config.backdrop||this._focustrap.activate(),this._element.classList.add(Wa),this._element.classList.remove(Ua),m.trigger(this._element,eo,{relatedTarget:e})},this._element,!0))}hide(){this._isShown&&(m.trigger(this._element,to).defaultPrevented||(this._focustrap.deactivate(),this._element.blur(),this._isShown=!1,this._element.classList.add(Ga),this._backdrop.hide(),this._queueCallback(()=>{this._element.classList.remove(Wa,Ga),this._element.removeAttribute("aria-modal"),this._element.removeAttribute("role"),this._config.scroll||new vi().reset(),m.trigger(this._element,Xa)},this._element,!0)))}dispose(){this._backdrop.dispose(),this._focustrap.deactivate(),super.dispose()}_initializeBackDrop(){const e=!!this._config.backdrop;return new La({className:"offcanvas-backdrop",isVisible:e,isAnimated:!0,rootElement:this._element.parentNode,clickCallback:e?()=>{this._config.backdrop!=="static"?this.hide():m.trigger(this._element,Qa)}:null})}_initializeFocusTrap(){return new Ma({trapElement:this._element})}_addEventListeners(){m.on(this._element,so,e=>{e.key==="Escape"&&(this._config.keyboard?this.hide():m.trigger(this._element,Qa))})}static jQueryInterface(e){return this.each(function(){const t=Ee.getOrCreateInstance(this,e);if(typeof e=="string"){if(t[e]===void 0||e.startsWith("_")||e==="constructor")throw new TypeError(`No method named "${e}"`);t[e](this)}})}}m.on(document,ao,'[data-bs-toggle="offcanvas"]',function(i){const e=k.getElementFromSelector(this);if(["A","AREA"].includes(this.tagName)&&i.preventDefault(),T(this))return;m.one(e,Xa,()=>{_(this)&&this.focus()});const t=k.findOne(Ya);t&&t!==e&&Ee.getInstance(t).hide(),Ee.getOrCreateInstance(e).toggle(this)}),m.on(window,Zn,()=>{for(const i of k.find(Ya))Ee.getOrCreateInstance(i).show()}),m.on(window,io,()=>{for(const i of k.find("[aria-modal][class*=show][class*=offcanvas-]"))getComputedStyle(i).position!=="fixed"&&Ee.getOrCreateInstance(i).hide()}),kt(Ee),ce(Ee);const Za={"*":["class","dir","id","lang","role",/^aria-[\w-]*$/i],a:["target","href","title","rel"],area:[],b:[],br:[],col:[],code:[],dd:[],div:[],dl:[],dt:[],em:[],hr:[],h1:[],h2:[],h3:[],h4:[],h5:[],h6:[],i:[],img:["src","srcset","alt","title","width","height"],li:[],ol:[],p:[],pre:[],s:[],small:[],span:[],sub:[],sup:[],strong:[],u:[],ul:[]},ro=new Set(["background","cite","href","itemtype","longdesc","poster","src","xlink:href"]),lo=/^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:/?#]*(?:[/?#]|$))/i,co=(i,e)=>{const t=i.nodeName.toLowerCase();return e.includes(t)?!ro.has(t)||!!lo.test(i.nodeValue):e.filter(a=>a instanceof RegExp).some(a=>a.test(t))},po={allowList:Za,content:{},extraClass:"",html:!1,sanitize:!0,sanitizeFn:null,template:"<div></div>"},uo={allowList:"object",content:"object",extraClass:"(string|function)",html:"boolean",sanitize:"boolean",sanitizeFn:"(null|function)",template:"string"},ho={entry:"(string|element|function|null)",selector:"(string|element)"};class go extends ct{constructor(e){super(),this._config=this._getConfig(e)}static get Default(){return po}static get DefaultType(){return uo}static get NAME(){return"TemplateFactory"}getContent(){return Object.values(this._config.content).map(e=>this._resolvePossibleFunction(e)).filter(Boolean)}hasContent(){return this.getContent().length>0}changeContent(e){return this._checkContent(e),this._config.content={...this._config.content,...e},this}toHtml(){const e=document.createElement("div");e.innerHTML=this._maybeSanitize(this._config.template);for(const[c,d]of Object.entries(this._config.content))this._setContent(e,d,c);const t=e.children[0],a=this._resolvePossibleFunction(this._config.extraClass);return a&&t.classList.add(...a.split(" ")),t}_typeCheckConfig(e){super._typeCheckConfig(e),this._checkContent(e.content)}_checkContent(e){for(const[t,a]of Object.entries(e))super._typeCheckConfig({selector:t,entry:a},ho)}_setContent(e,t,a){const c=k.findOne(a,e);c&&((t=this._resolvePossibleFunction(t))?$(t)?this._putElementInTemplate(L(t),c):this._config.html?c.innerHTML=this._maybeSanitize(t):c.textContent=t:c.remove())}_maybeSanitize(e){return this._config.sanitize?function(t,a,c){if(!t.length)return t;if(c&&typeof c=="function")return c(t);const d=new window.DOMParser().parseFromString(t,"text/html"),h=[].concat(...d.body.querySelectorAll("*"));for(const g of h){const v=g.nodeName.toLowerCase();if(!Object.keys(a).includes(v)){g.remove();continue}const y=[].concat(...g.attributes),w=[].concat(a["*"]||[],a[v]||[]);for(const b of y)co(b,w)||g.removeAttribute(b.nodeName)}return d.body.innerHTML}(e,this._config.allowList,this._config.sanitizeFn):e}_resolvePossibleFunction(e){return se(e,[void 0,this])}_putElementInTemplate(e,t){if(this._config.html)return t.innerHTML="",void t.append(e);t.textContent=e.textContent}}const mo=new Set(["sanitize","allowList","sanitizeFn"]),bi="fade",Nt="show",vo=".tooltip-inner",Ja=".modal",es="hide.bs.modal",ft="hover",yi="focus",wi="click",fo={AUTO:"auto",TOP:"top",RIGHT:ae()?"left":"right",BOTTOM:"bottom",LEFT:ae()?"right":"left"},bo={allowList:Za,animation:!0,boundary:"clippingParents",container:!1,customClass:"",delay:0,fallbackPlacements:["top","right","bottom","left"],html:!1,offset:[0,6],placement:"top",popperConfig:null,sanitize:!0,sanitizeFn:null,selector:!1,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',title:"",trigger:"hover focus"},yo={allowList:"object",animation:"boolean",boundary:"(string|element)",container:"(string|element|boolean)",customClass:"(string|function)",delay:"(number|object)",fallbackPlacements:"array",html:"boolean",offset:"(array|string|function)",placement:"(string|function)",popperConfig:"(null|object|function)",sanitize:"boolean",sanitizeFn:"(null|function)",selector:"(string|boolean)",template:"string",title:"(string|element|function)",trigger:"string"};class Re extends ve{constructor(e,t){if(Aa===void 0)throw new TypeError("Bootstrap's tooltips require Popper (https://popper.js.org/docs/v2/)");super(e,t),this._isEnabled=!0,this._timeout=0,this._isHovered=null,this._activeTrigger={},this._popper=null,this._templateFactory=null,this._newContent=null,this.tip=null,this._setListeners(),this._config.selector||this._fixTitle()}static get Default(){return bo}static get DefaultType(){return yo}static get NAME(){return"tooltip"}enable(){this._isEnabled=!0}disable(){this._isEnabled=!1}toggleEnabled(){this._isEnabled=!this._isEnabled}toggle(){this._isEnabled&&(this._isShown()?this._leave():this._enter())}dispose(){clearTimeout(this._timeout),m.off(this._element.closest(Ja),es,this._hideModalHandler),this._element.getAttribute("data-bs-original-title")&&this._element.setAttribute("title",this._element.getAttribute("data-bs-original-title")),this._disposePopper(),super.dispose()}show(){if(this._element.style.display==="none")throw new Error("Please use show on visible elements");if(!this._isWithContent()||!this._isEnabled)return;const e=m.trigger(this._element,this.constructor.eventName("show")),t=(j(this._element)||this._element.ownerDocument.documentElement).contains(this._element);if(e.defaultPrevented||!t)return;this._disposePopper();const a=this._getTipElement();this._element.setAttribute("aria-describedby",a.getAttribute("id"));const{container:c}=this._config;if(this._element.ownerDocument.documentElement.contains(this.tip)||(c.append(a),m.trigger(this._element,this.constructor.eventName("inserted"))),this._popper=this._createPopper(a),a.classList.add(Nt),"ontouchstart"in document.documentElement)for(const d of[].concat(...document.body.children))m.on(d,"mouseover",H);this._queueCallback(()=>{m.trigger(this._element,this.constructor.eventName("shown")),this._isHovered===!1&&this._leave(),this._isHovered=!1},this.tip,this._isAnimated())}hide(){if(this._isShown()&&!m.trigger(this._element,this.constructor.eventName("hide")).defaultPrevented){if(this._getTipElement().classList.remove(Nt),"ontouchstart"in document.documentElement)for(const e of[].concat(...document.body.children))m.off(e,"mouseover",H);this._activeTrigger[wi]=!1,this._activeTrigger[yi]=!1,this._activeTrigger[ft]=!1,this._isHovered=null,this._queueCallback(()=>{this._isWithActiveTrigger()||(this._isHovered||this._disposePopper(),this._element.removeAttribute("aria-describedby"),m.trigger(this._element,this.constructor.eventName("hidden")))},this.tip,this._isAnimated())}}update(){this._popper&&this._popper.update()}_isWithContent(){return!!this._getTitle()}_getTipElement(){return this.tip||(this.tip=this._createTipElement(this._newContent||this._getContentForTemplate())),this.tip}_createTipElement(e){const t=this._getTemplateFactory(e).toHtml();if(!t)return null;t.classList.remove(bi,Nt),t.classList.add(`bs-${this.constructor.NAME}-auto`);const a=(c=>{do c+=Math.floor(1e6*Math.random());while(document.getElementById(c));return c})(this.constructor.NAME).toString();return t.setAttribute("id",a),this._isAnimated()&&t.classList.add(bi),t}setContent(e){this._newContent=e,this._isShown()&&(this._disposePopper(),this.show())}_getTemplateFactory(e){return this._templateFactory?this._templateFactory.changeContent(e):this._templateFactory=new go({...this._config,content:e,extraClass:this._resolvePossibleFunction(this._config.customClass)}),this._templateFactory}_getContentForTemplate(){return{[vo]:this._getTitle()}}_getTitle(){return this._resolvePossibleFunction(this._config.title)||this._element.getAttribute("data-bs-original-title")}_initializeOnDelegatedTarget(e){return this.constructor.getOrCreateInstance(e.delegateTarget,this._getDelegateConfig())}_isAnimated(){return this._config.animation||this.tip&&this.tip.classList.contains(bi)}_isShown(){return this.tip&&this.tip.classList.contains(Nt)}_createPopper(e){const t=se(this._config.placement,[this,e,this._element]),a=fo[t.toUpperCase()];return gi(this._element,e,this._getPopperConfig(a))}_getOffset(){const{offset:e}=this._config;return typeof e=="string"?e.split(",").map(t=>Number.parseInt(t,10)):typeof e=="function"?t=>e(t,this._element):e}_resolvePossibleFunction(e){return se(e,[this._element,this._element])}_getPopperConfig(e){const t={placement:e,modifiers:[{name:"flip",options:{fallbackPlacements:this._config.fallbackPlacements}},{name:"offset",options:{offset:this._getOffset()}},{name:"preventOverflow",options:{boundary:this._config.boundary}},{name:"arrow",options:{element:`.${this.constructor.NAME}-arrow`}},{name:"preSetPlacement",enabled:!0,phase:"beforeMain",fn:a=>{this._getTipElement().setAttribute("data-popper-placement",a.state.placement)}}]};return{...t,...se(this._config.popperConfig,[void 0,t])}}_setListeners(){const e=this._config.trigger.split(" ");for(const t of e)if(t==="click")m.on(this._element,this.constructor.eventName("click"),this._config.selector,a=>{const c=this._initializeOnDelegatedTarget(a);c._activeTrigger[wi]=!(c._isShown()&&c._activeTrigger[wi]),c.toggle()});else if(t!=="manual"){const a=t===ft?this.constructor.eventName("mouseenter"):this.constructor.eventName("focusin"),c=t===ft?this.constructor.eventName("mouseleave"):this.constructor.eventName("focusout");m.on(this._element,a,this._config.selector,d=>{const h=this._initializeOnDelegatedTarget(d);h._activeTrigger[d.type==="focusin"?yi:ft]=!0,h._enter()}),m.on(this._element,c,this._config.selector,d=>{const h=this._initializeOnDelegatedTarget(d);h._activeTrigger[d.type==="focusout"?yi:ft]=h._element.contains(d.relatedTarget),h._leave()})}this._hideModalHandler=()=>{this._element&&this.hide()},m.on(this._element.closest(Ja),es,this._hideModalHandler)}_fixTitle(){const e=this._element.getAttribute("title");e&&(this._element.getAttribute("aria-label")||this._element.textContent.trim()||this._element.setAttribute("aria-label",e),this._element.setAttribute("data-bs-original-title",e),this._element.removeAttribute("title"))}_enter(){this._isShown()||this._isHovered?this._isHovered=!0:(this._isHovered=!0,this._setTimeout(()=>{this._isHovered&&this.show()},this._config.delay.show))}_leave(){this._isWithActiveTrigger()||(this._isHovered=!1,this._setTimeout(()=>{this._isHovered||this.hide()},this._config.delay.hide))}_setTimeout(e,t){clearTimeout(this._timeout),this._timeout=setTimeout(e,t)}_isWithActiveTrigger(){return Object.values(this._activeTrigger).includes(!0)}_getConfig(e){const t=Se.getDataAttributes(this._element);for(const a of Object.keys(t))mo.has(a)&&delete t[a];return e={...t,...typeof e=="object"&&e?e:{}},e=this._mergeConfigObj(e),e=this._configAfterMerge(e),this._typeCheckConfig(e),e}_configAfterMerge(e){return e.container=e.container===!1?document.body:L(e.container),typeof e.delay=="number"&&(e.delay={show:e.delay,hide:e.delay}),typeof e.title=="number"&&(e.title=e.title.toString()),typeof e.content=="number"&&(e.content=e.content.toString()),e}_getDelegateConfig(){const e={};for(const[t,a]of Object.entries(this._config))this.constructor.Default[t]!==a&&(e[t]=a);return e.selector=!1,e.trigger="manual",e}_disposePopper(){this._popper&&(this._popper.destroy(),this._popper=null),this.tip&&(this.tip.remove(),this.tip=null)}static jQueryInterface(e){return this.each(function(){const t=Re.getOrCreateInstance(this,e);if(typeof e=="string"){if(t[e]===void 0)throw new TypeError(`No method named "${e}"`);t[e]()}})}}ce(Re);const wo=".popover-header",_o=".popover-body",ko={...Re.Default,content:"",offset:[0,8],placement:"right",template:'<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',trigger:"click"},xo={...Re.DefaultType,content:"(null|string|element|function)"};class Mt extends Re{static get Default(){return ko}static get DefaultType(){return xo}static get NAME(){return"popover"}_isWithContent(){return this._getTitle()||this._getContent()}_getContentForTemplate(){return{[wo]:this._getTitle(),[_o]:this._getContent()}}_getContent(){return this._resolvePossibleFunction(this._config.content)}static jQueryInterface(e){return this.each(function(){const t=Mt.getOrCreateInstance(this,e);if(typeof e=="string"){if(t[e]===void 0)throw new TypeError(`No method named "${e}"`);t[e]()}})}}ce(Mt);const _i=".bs.scrollspy",$o=`activate${_i}`,ts=`click${_i}`,So=`load${_i}.data-api`,ot="active",ki="[href]",is=".nav-link",Co=`${is}, .nav-item > ${is}, .list-group-item`,Ao={offset:null,rootMargin:"0px 0px -25%",smoothScroll:!1,target:null,threshold:[.1,.5,1]},Eo={offset:"(number|null)",rootMargin:"string",smoothScroll:"boolean",target:"element",threshold:"array"};class bt extends ve{constructor(e,t){super(e,t),this._targetLinks=new Map,this._observableSections=new Map,this._rootElement=getComputedStyle(this._element).overflowY==="visible"?null:this._element,this._activeTarget=null,this._observer=null,this._previousScrollData={visibleEntryTop:0,parentScrollTop:0},this.refresh()}static get Default(){return Ao}static get DefaultType(){return Eo}static get NAME(){return"scrollspy"}refresh(){this._initializeTargetsAndObservables(),this._maybeEnableSmoothScroll(),this._observer?this._observer.disconnect():this._observer=this._getNewObserver();for(const e of this._observableSections.values())this._observer.observe(e)}dispose(){this._observer.disconnect(),super.dispose()}_configAfterMerge(e){return e.target=L(e.target)||document.body,e.rootMargin=e.offset?`${e.offset}px 0px -30%`:e.rootMargin,typeof e.threshold=="string"&&(e.threshold=e.threshold.split(",").map(t=>Number.parseFloat(t))),e}_maybeEnableSmoothScroll(){this._config.smoothScroll&&(m.off(this._config.target,ts),m.on(this._config.target,ts,ki,e=>{const t=this._observableSections.get(e.target.hash);if(t){e.preventDefault();const a=this._rootElement||window,c=t.offsetTop-this._element.offsetTop;if(a.scrollTo)return void a.scrollTo({top:c,behavior:"smooth"});a.scrollTop=c}}))}_getNewObserver(){const e={root:this._rootElement,threshold:this._config.threshold,rootMargin:this._config.rootMargin};return new IntersectionObserver(t=>this._observerCallback(t),e)}_observerCallback(e){const t=h=>this._targetLinks.get(`#${h.target.id}`),a=h=>{this._previousScrollData.visibleEntryTop=h.target.offsetTop,this._process(t(h))},c=(this._rootElement||document.documentElement).scrollTop,d=c>=this._previousScrollData.parentScrollTop;this._previousScrollData.parentScrollTop=c;for(const h of e){if(!h.isIntersecting){this._activeTarget=null,this._clearActiveClass(t(h));continue}const g=h.target.offsetTop>=this._previousScrollData.visibleEntryTop;if(d&&g){if(a(h),!c)return}else d||g||a(h)}}_initializeTargetsAndObservables(){this._targetLinks=new Map,this._observableSections=new Map;const e=k.find(ki,this._config.target);for(const t of e){if(!t.hash||T(t))continue;const a=k.findOne(decodeURI(t.hash),this._element);_(a)&&(this._targetLinks.set(decodeURI(t.hash),t),this._observableSections.set(t.hash,a))}}_process(e){this._activeTarget!==e&&(this._clearActiveClass(this._config.target),this._activeTarget=e,e.classList.add(ot),this._activateParents(e),m.trigger(this._element,$o,{relatedTarget:e}))}_activateParents(e){if(e.classList.contains("dropdown-item"))k.findOne(".dropdown-toggle",e.closest(".dropdown")).classList.add(ot);else for(const t of k.parents(e,".nav, .list-group"))for(const a of k.prev(t,Co))a.classList.add(ot)}_clearActiveClass(e){e.classList.remove(ot);const t=k.find(`${ki}.${ot}`,e);for(const a of t)a.classList.remove(ot)}static jQueryInterface(e){return this.each(function(){const t=bt.getOrCreateInstance(this,e);if(typeof e=="string"){if(t[e]===void 0||e.startsWith("_")||e==="constructor")throw new TypeError(`No method named "${e}"`);t[e]()}})}}m.on(window,So,()=>{for(const i of k.find('[data-bs-spy="scroll"]'))bt.getOrCreateInstance(i)}),ce(bt);const ze=".bs.tab",To=`hide${ze}`,Io=`hidden${ze}`,Oo=`show${ze}`,Po=`shown${ze}`,jo=`click${ze}`,Do=`keydown${ze}`,Lo=`load${ze}`,No="ArrowLeft",as="ArrowRight",Mo="ArrowUp",ss="ArrowDown",xi="Home",ns="End",He="active",os="fade",$i="show",rs=".dropdown-toggle",Si=`:not(${rs})`,ls='[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]',Ci=`.nav-link${Si}, .list-group-item${Si}, [role="tab"]${Si}, ${ls}`,Bo=`.${He}[data-bs-toggle="tab"], .${He}[data-bs-toggle="pill"], .${He}[data-bs-toggle="list"]`;class Ve extends ve{constructor(e){super(e),this._parent=this._element.closest('.list-group, .nav, [role="tablist"]'),this._parent&&(this._setInitialAttributes(this._parent,this._getChildren()),m.on(this._element,Do,t=>this._keydown(t)))}static get NAME(){return"tab"}show(){const e=this._element;if(this._elemIsActive(e))return;const t=this._getActiveElem(),a=t?m.trigger(t,To,{relatedTarget:e}):null;m.trigger(e,Oo,{relatedTarget:t}).defaultPrevented||a&&a.defaultPrevented||(this._deactivate(t,e),this._activate(e,t))}_activate(e,t){e&&(e.classList.add(He),this._activate(k.getElementFromSelector(e)),this._queueCallback(()=>{e.getAttribute("role")==="tab"?(e.removeAttribute("tabindex"),e.setAttribute("aria-selected",!0),this._toggleDropDown(e,!0),m.trigger(e,Po,{relatedTarget:t})):e.classList.add($i)},e,e.classList.contains(os)))}_deactivate(e,t){e&&(e.classList.remove(He),e.blur(),this._deactivate(k.getElementFromSelector(e)),this._queueCallback(()=>{e.getAttribute("role")==="tab"?(e.setAttribute("aria-selected",!1),e.setAttribute("tabindex","-1"),this._toggleDropDown(e,!1),m.trigger(e,Io,{relatedTarget:t})):e.classList.remove($i)},e,e.classList.contains(os)))}_keydown(e){if(![No,as,Mo,ss,xi,ns].includes(e.key))return;e.stopPropagation(),e.preventDefault();const t=this._getChildren().filter(c=>!T(c));let a;if([xi,ns].includes(e.key))a=t[e.key===xi?0:t.length-1];else{const c=[as,ss].includes(e.key);a=Kt(t,e.target,c,!0)}a&&(a.focus({preventScroll:!0}),Ve.getOrCreateInstance(a).show())}_getChildren(){return k.find(Ci,this._parent)}_getActiveElem(){return this._getChildren().find(e=>this._elemIsActive(e))||null}_setInitialAttributes(e,t){this._setAttributeIfNotExists(e,"role","tablist");for(const a of t)this._setInitialAttributesOnChild(a)}_setInitialAttributesOnChild(e){e=this._getInnerElement(e);const t=this._elemIsActive(e),a=this._getOuterElement(e);e.setAttribute("aria-selected",t),a!==e&&this._setAttributeIfNotExists(a,"role","presentation"),t||e.setAttribute("tabindex","-1"),this._setAttributeIfNotExists(e,"role","tab"),this._setInitialAttributesOnTargetPanel(e)}_setInitialAttributesOnTargetPanel(e){const t=k.getElementFromSelector(e);t&&(this._setAttributeIfNotExists(t,"role","tabpanel"),e.id&&this._setAttributeIfNotExists(t,"aria-labelledby",`${e.id}`))}_toggleDropDown(e,t){const a=this._getOuterElement(e);if(!a.classList.contains("dropdown"))return;const c=(d,h)=>{const g=k.findOne(d,a);g&&g.classList.toggle(h,t)};c(rs,He),c(".dropdown-menu",$i),a.setAttribute("aria-expanded",t)}_setAttributeIfNotExists(e,t,a){e.hasAttribute(t)||e.setAttribute(t,a)}_elemIsActive(e){return e.classList.contains(He)}_getInnerElement(e){return e.matches(Ci)?e:k.findOne(Ci,e)}_getOuterElement(e){return e.closest(".nav-item, .list-group-item")||e}static jQueryInterface(e){return this.each(function(){const t=Ve.getOrCreateInstance(this);if(typeof e=="string"){if(t[e]===void 0||e.startsWith("_")||e==="constructor")throw new TypeError(`No method named "${e}"`);t[e]()}})}}m.on(document,jo,ls,function(i){["A","AREA"].includes(this.tagName)&&i.preventDefault(),T(this)||Ve.getOrCreateInstance(this).show()}),m.on(window,Lo,()=>{for(const i of k.find(Bo))Ve.getOrCreateInstance(i)}),ce(Ve);const Oe=".bs.toast",Fo=`mouseover${Oe}`,Ro=`mouseout${Oe}`,zo=`focusin${Oe}`,Ho=`focusout${Oe}`,Vo=`hide${Oe}`,Ko=`hidden${Oe}`,qo=`show${Oe}`,Wo=`shown${Oe}`,cs="hide",Bt="show",Ft="showing",Uo={animation:"boolean",autohide:"boolean",delay:"number"},Go={animation:!0,autohide:!0,delay:5e3};class yt extends ve{constructor(e,t){super(e,t),this._timeout=null,this._hasMouseInteraction=!1,this._hasKeyboardInteraction=!1,this._setListeners()}static get Default(){return Go}static get DefaultType(){return Uo}static get NAME(){return"toast"}show(){m.trigger(this._element,qo).defaultPrevented||(this._clearTimeout(),this._config.animation&&this._element.classList.add("fade"),this._element.classList.remove(cs),K(this._element),this._element.classList.add(Bt,Ft),this._queueCallback(()=>{this._element.classList.remove(Ft),m.trigger(this._element,Wo),this._maybeScheduleHide()},this._element,this._config.animation))}hide(){this.isShown()&&(m.trigger(this._element,Vo).defaultPrevented||(this._element.classList.add(Ft),this._queueCallback(()=>{this._element.classList.add(cs),this._element.classList.remove(Ft,Bt),m.trigger(this._element,Ko)},this._element,this._config.animation)))}dispose(){this._clearTimeout(),this.isShown()&&this._element.classList.remove(Bt),super.dispose()}isShown(){return this._element.classList.contains(Bt)}_maybeScheduleHide(){this._config.autohide&&(this._hasMouseInteraction||this._hasKeyboardInteraction||(this._timeout=setTimeout(()=>{this.hide()},this._config.delay)))}_onInteraction(e,t){switch(e.type){case"mouseover":case"mouseout":this._hasMouseInteraction=t;break;case"focusin":case"focusout":this._hasKeyboardInteraction=t}if(t)return void this._clearTimeout();const a=e.relatedTarget;this._element===a||this._element.contains(a)||this._maybeScheduleHide()}_setListeners(){m.on(this._element,Fo,e=>this._onInteraction(e,!0)),m.on(this._element,Ro,e=>this._onInteraction(e,!1)),m.on(this._element,zo,e=>this._onInteraction(e,!0)),m.on(this._element,Ho,e=>this._onInteraction(e,!1))}_clearTimeout(){clearTimeout(this._timeout),this._timeout=null}static jQueryInterface(e){return this.each(function(){const t=yt.getOrCreateInstance(this,e);if(typeof e=="string"){if(t[e]===void 0)throw new TypeError(`No method named "${e}"`);t[e](this)}})}}return kt(yt),ce(yt),{Alert:dt,Button:pt,Carousel:Ye,Collapse:Xe,Dropdown:fe,Modal:Fe,Offcanvas:Ee,Popover:Mt,ScrollSpy:bt,Tab:Ve,Toast:yt,Tooltip:Re}})})(sr);const ye={CART:"vf_cart",ORDERS:"vf_orders",CUSTOMERS:"vf_customers",ADMIN_AUTH:"vf_admin_auth",DAILY_SPECIAL:"vf_daily_special_id"},wt={getId(){const s=localStorage.getItem(ye.DAILY_SPECIAL);return s?parseInt(s):20},setId(s){localStorage.setItem(ye.DAILY_SPECIAL,s.toString()),window.dispatchEvent(new CustomEvent("daily-special-updated",{detail:{productId:s}}))}},Z={get(){return JSON.parse(localStorage.getItem(ye.CART)||"[]")},save(s){localStorage.setItem(ye.CART,JSON.stringify(s)),window.dispatchEvent(new CustomEvent("cart-updated",{detail:{cart:s}}))},add(s,n=1){const o=this.get(),l=o.find(p=>p.id===s.id);return l?l.qty+=n:o.push({id:s.id,name:s.name,tamilName:s.tamilName,price:s.price,originalPrice:s.originalPrice,image:s.image,qty:n}),this.save(o),o},remove(s){const n=this.get().filter(o=>o.id!==s);return this.save(n),n},updateQty(s,n){const o=this.get(),l=o.find(p=>p.id===s);return l&&(l.qty=Math.max(1,n)),this.save(o),o},clear(){this.save([])},getCount(){return this.get().reduce((s,n)=>s+n.qty,0)},getSubtotal(){return this.get().reduce((s,n)=>s+n.price*n.qty,0)},getDelivery(){return this.getSubtotal()>=499?0:49},getTotal(){return this.getSubtotal()+this.getDelivery()}},$e={get(){return JSON.parse(localStorage.getItem(ye.ORDERS)||"[]")},save(s){localStorage.setItem(ye.ORDERS,JSON.stringify(s))},create(s,n){const o=this.get(),l={id:"VF-"+Date.now().toString(36).toUpperCase(),customer:s,items:n,subtotal:n.reduce((p,u)=>p+u.price*u.qty,0),delivery:Z.getDelivery(),total:Z.getTotal(),status:"pending",createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()};return o.unshift(l),this.save(o),_t.addOrUpdate(s,l),Z.clear(),l},updateStatus(s,n){const o=this.get(),l=o.find(p=>p.id===s);return l&&(l.status=n,l.updatedAt=new Date().toISOString()),this.save(o),l},getById(s){return this.get().find(n=>n.id===s)},getTotalRevenue(){return this.get().filter(s=>s.status!=="cancelled").reduce((s,n)=>s+n.total,0)},getRecentOrders(s=5){return this.get().slice(0,s)},getOrdersByStatus(s){return s==="all"?this.get():this.get().filter(n=>n.status===s)}},_t={get(){return JSON.parse(localStorage.getItem(ye.CUSTOMERS)||"[]")},save(s){localStorage.setItem(ye.CUSTOMERS,JSON.stringify(s))},addOrUpdate(s,n){const o=this.get(),l=o.find(p=>p.phone===s.phone);l?(l.name=s.name,l.address=s.address,l.orders.push(n.id),l.totalSpent+=n.total,l.lastOrder=n.createdAt):o.push({id:"CUS-"+Date.now().toString(36).toUpperCase(),name:s.name,phone:s.phone,address:s.address,orders:[n.id],totalSpent:n.total,joinedAt:new Date().toISOString(),lastOrder:n.createdAt}),this.save(o)},getById(s){return this.get().find(n=>n.id===s)},search(s){const n=s.toLowerCase();return this.get().filter(o=>o.name.toLowerCase().includes(n)||o.phone.includes(n)||o.id.toLowerCase().includes(n))}},Vt={CREDENTIALS:{username:"admin",password:"admin123"},login(s,n){return s===this.CREDENTIALS.username&&n===this.CREDENTIALS.password?(localStorage.setItem(ye.ADMIN_AUTH,JSON.stringify({loggedIn:!0,loginTime:Date.now()})),!0):!1},isLoggedIn(){return JSON.parse(localStorage.getItem(ye.ADMIN_AUTH)||"{}").loggedIn===!0},logout(){localStorage.removeItem(ye.ADMIN_AUTH)}};function nr(){if($e.get().length>0)return;const s=[{name:"Priya Shankar",phone:"9876543210",address:"45, Anna Nagar, Chennai - 600040"},{name:"Karthik Vel",phone:"9876543211",address:"12, RS Puram, Coimbatore - 641002"},{name:"Lakshmi Devi",phone:"9876543212",address:"78, Srirangam, Trichy - 620006"},{name:"Ramesh Kumar",phone:"9876543213",address:"23, KK Nagar, Madurai - 625020"},{name:"Meena Ravi",phone:"9876543214",address:"56, Thiruvanmiyur, Chennai - 600041"}],n=["pending","processing","delivered","delivered","delivered"],o=s.map((p,u)=>{const f=[{id:u+1,name:["Karupu Kauvni Kanji","Ulunda Kanji","Sprouted Ragi Kanji","Millet Kanji","Bamboo Kanji"][u],tamilName:"டெமோ",price:[89,79,99,85,119][u],qty:Math.ceil(Math.random()*3)},{id:u+6,name:["Poondu Kanji","Moringa Kanji","Kerala Kanji","Pumpkin Kanji","Quinoa Kanji"][u],tamilName:"டெமோ",price:[75,95,89,79,139][u],qty:Math.ceil(Math.random()*2)}],x=f.reduce((_,T)=>_+T.price*T.qty,0),$=x>=499?0:49;return{id:`VF-DEMO${(u+1).toString().padStart(3,"0")}`,customer:p,items:f,subtotal:x,delivery:$,total:x+$,status:n[u],createdAt:new Date(Date.now()-u*864e5).toISOString(),updatedAt:new Date(Date.now()-u*432e5).toISOString()}});$e.save(o);const l=s.map((p,u)=>({id:`CUS-DEMO${(u+1).toString().padStart(3,"0")}`,name:p.name,phone:p.phone,address:p.address,orders:[o[u].id],totalSpent:o[u].total,joinedAt:new Date(Date.now()-u*1728e5).toISOString(),lastOrder:o[u].createdAt}));_t.save(l)}const Ss={KANJI:{id:"kanji",name:"Kanji Varieties",tamilName:"கஞ்சி வகைகள்",icon:"bowl",count:21,image:"./images/cat_kanji_varieties.jpg",tagline:"Traditional slow-cooked earthenware porridges crafted from 21 ancient grains, millets, and medicinal roots.",badge:"21 Heirloom Varieties",chips:["Clay Pot Cooked","21 Ancient Grains","Zero Chemicals"],accent:"#2D5E3F"},DAILY_SPL:{id:"daily-spl",name:"Daily Special",tamilName:"தினசரி சிறப்பு கஞ்சி",icon:"sparkle",count:1,image:"./images/cat_daily_special.jpg",tagline:"Master chef's sunrise curation brewed fresh each dawn with seasonal wild herbs and pure palm nectar.",badge:"Sunrise Fresh Today",chips:["Sunrise Brew","Seasonal Herbs","Limited Batches"],accent:"#D4A017"},SOLID:{id:"solid-eats",name:"Healthy Snacks",tamilName:"ஆரோக்கிய சிற்றுண்டிகள் (பயறுகள் & முட்டை)",icon:"salad",count:2,image:"./images/cat_solid_eats.jpg",tagline:"Nutritious sprouted pulses (முளைகட்டிய பயறுகள்) & farm-fresh boiled egg (அவித்த முட்டை) for vital stamina.",badge:"Sprouts & Boiled Egg",chips:["Sprouts Pulses","Boiled Egg","High Protein"],accent:"#8B4513"},SWEETS:{id:"traditional-sweets",name:"Traditional Sweets",tamilName:"பாரம்பரிய இனிப்புகள் (உளுந்தங்களி)",icon:"pot",count:1,image:"./images/ulundhan_kali.jpg",tagline:"Authentic heritage sweets crafted with cold-pressed sesame oil, pure Karupatti (palm jaggery), and black urad dal.",badge:"Pure Palm Jaggery",chips:["Black Urad Dal","Pure Karupatti","Cold-Pressed Nallennai"],accent:"#5A321E"}},G=[{id:1,name:"Karupu Kauvni Kanji",tamilName:"கருப்பு கவுணி கஞ்சி",category:"kanji",price:89,originalPrice:120,description:"Ancient black rice porridge, rich in anthocyanins and antioxidants. A royal delicacy from Tamil heritage, slow-cooked to perfection with jaggery and coconut milk.",nutrition:{calories:"185",protein:"4.2g",fiber:"3.1g",iron:"12%",calcium:"8%",vitB:"15%"},rating:4.9,reviews:342,badge:"bestseller",inStock:!0,stock:45,image:"./images/karupu_kauvni_kanji.jpg"},{id:2,name:"Ulunda Kanji",tamilName:"உளுந்த கஞ்சி",category:"kanji",price:79,originalPrice:110,description:"Traditional urad dal porridge, known for its warming properties and rich protein content. Perfect for cold mornings, prepared the authentic Tamil way.",nutrition:{calories:"170",protein:"8.5g",fiber:"2.8g",iron:"15%",calcium:"10%",vitB:"18%"},rating:4.8,reviews:218,badge:"bestseller",inStock:!0,stock:38,image:"./images/ulunda_kanji.jpg"},{id:3,name:"Sprouted Ragi Kanji",tamilName:"முளைகட்டிய ராகி கஞ்சி",category:"kanji",price:99,originalPrice:140,description:"Nutrient-dense sprouted finger millet porridge. Sprouting increases bioavailability of calcium and iron. A superfood from grandmother's kitchen.",nutrition:{calories:"160",protein:"5.8g",fiber:"4.5g",iron:"18%",calcium:"22%",vitB:"20%"},rating:4.9,reviews:456,badge:"bestseller",inStock:!0,stock:52,image:"./images/sprouted_ragi_kanji.jpg"},{id:4,name:"Kulakar Kollu Kanji",tamilName:"குளகர் கொள்ளு கஞ்சி",category:"kanji",price:85,originalPrice:115,description:"Horse gram porridge — a powerful weight-management superfood. Stone-ground and slow-cooked with traditional spices for authentic flavor.",nutrition:{calories:"145",protein:"9.2g",fiber:"5.1g",iron:"20%",calcium:"6%",vitB:"12%"},rating:4.7,reviews:167,badge:null,inStock:!0,stock:30,image:"./images/kollu_kanji.jpg"},{id:5,name:"Moringa Kanji",tamilName:"முருங்கை கஞ்சி",category:"kanji",price:95,originalPrice:130,description:'Drumstick leaf-infused kanji, packed with vitamins and minerals. The "miracle tree" porridge for immunity and vitality.',nutrition:{calories:"135",protein:"6.1g",fiber:"3.8g",iron:"25%",calcium:"15%",vitB:"22%"},rating:4.8,reviews:203,badge:"new",inStock:!0,stock:42,image:"./images/moringa_kanji.jpg"},{id:6,name:"Poondu Kanji",tamilName:"பூண்டு கஞ்சி",category:"kanji",price:75,originalPrice:100,description:"Garlic-infused healing porridge, a traditional remedy for cold and flu. Known for its immunity-boosting and heart-healthy properties.",nutrition:{calories:"155",protein:"3.8g",fiber:"2.5g",iron:"10%",calcium:"5%",vitB:"14%"},rating:4.6,reviews:145,badge:null,inStock:!0,stock:25,image:"./images/poondu_kanji.jpg"},{id:7,name:"Kerala Kanji",tamilName:"கேரளா கஞ்சி",category:"kanji",price:89,originalPrice:125,description:"Inspired by Kerala's traditional rice gruel, enriched with coconut milk and spices. A comforting, wholesome porridge.",nutrition:{calories:"175",protein:"4.0g",fiber:"2.2g",iron:"8%",calcium:"12%",vitB:"10%"},rating:4.7,reviews:178,badge:null,inStock:!0,stock:35,image:"./images/kerala_kanji.jpg"},{id:8,name:"Millet Kanji",tamilName:"சிறுதானிய கஞ்சி",category:"kanji",price:85,originalPrice:120,description:"Multi-millet porridge combining foxtail, barnyard, and little millet. A nutritional powerhouse that fuels your day naturally.",nutrition:{calories:"165",protein:"5.5g",fiber:"4.8g",iron:"16%",calcium:"14%",vitB:"18%"},rating:4.8,reviews:289,badge:"bestseller",inStock:!0,stock:60,image:"./images/millet_kanji.jpg"},{id:9,name:"Pumpkin Kanji",tamilName:"பூசணி கஞ்சி",category:"kanji",price:79,originalPrice:105,description:"Sweet pumpkin porridge with jaggery and cardamom. Rich in beta-carotene, this golden kanji is both delicious and nutritious.",nutrition:{calories:"140",protein:"3.2g",fiber:"3.5g",iron:"8%",calcium:"6%",vitB:"25%"},rating:4.5,reviews:112,badge:null,inStock:!0,stock:28,image:"./images/pumpkin_kanji.jpg"},{id:10,name:"Mashroom Kanji",tamilName:"காளான் கஞ்சி",category:"kanji",price:109,originalPrice:150,description:"Exotic mushroom porridge with earthy flavors. Packed with vitamin D and antioxidants for immune system support.",nutrition:{calories:"130",protein:"7.0g",fiber:"2.8g",iron:"10%",calcium:"4%",vitB:"30%"},rating:4.6,reviews:89,badge:"new",inStock:!0,stock:20,image:"./images/mashroom_kanji.jpg"},{id:11,name:"Wheat Kanji",tamilName:"கோதுமை கஞ்சி",category:"kanji",price:69,originalPrice:95,description:"Wholesome broken wheat porridge, a staple comfort food. Light on the stomach and filling for the soul.",nutrition:{calories:"180",protein:"5.2g",fiber:"4.0g",iron:"12%",calcium:"6%",vitB:"16%"},rating:4.5,reviews:156,badge:null,inStock:!0,stock:50,image:"./images/wheat_kanji.jpg"},{id:12,name:"Bamboo Kanji",tamilName:"மூங்கில் கஞ்சி",category:"kanji",price:119,originalPrice:160,description:"Rare bamboo rice porridge from tribal recipes. A unique delicacy with nutty flavor, harvested once in decades.",nutrition:{calories:"155",protein:"4.8g",fiber:"3.2g",iron:"14%",calcium:"8%",vitB:"12%"},rating:4.9,reviews:67,badge:"bestseller",inStock:!0,stock:15,image:"./images/bamboo_kanji.jpg"},{id:13,name:"Kolakandha",tamilName:"கோலாகண்டா",category:"kanji",price:95,originalPrice:130,description:"Heritage recipe kolakandha — fermented rice porridge with cumin and ginger. A probiotic-rich traditional Tamil drink.",nutrition:{calories:"125",protein:"3.5g",fiber:"2.0g",iron:"8%",calcium:"10%",vitB:"14%"},rating:4.7,reviews:198,badge:null,inStock:!0,stock:40,image:"./images/kolakandha.jpg"},{id:14,name:"Vegetable Kanji",tamilName:"காய்கறி கஞ்சி",category:"kanji",price:85,originalPrice:115,description:"Garden-fresh vegetable porridge with seasonal greens. A rainbow of nutrition in every spoonful.",nutrition:{calories:"120",protein:"4.5g",fiber:"5.2g",iron:"15%",calcium:"12%",vitB:"20%"},rating:4.6,reviews:134,badge:null,inStock:!0,stock:35,image:"./images/vegetable_kanji.jpg"},{id:15,name:"Navar Nava Pire Kanji",tamilName:"நாவர் நவ பிரே கஞ்சி",category:"kanji",price:129,originalPrice:175,description:"Nine-grain traditional porridge combining ancient grains. The ultimate nutrition blend from Siddha medicine traditions.",nutrition:{calories:"190",protein:"7.8g",fiber:"5.5g",iron:"22%",calcium:"18%",vitB:"25%"},rating:4.9,reviews:312,badge:"bestseller",inStock:!0,stock:25,image:"./images/navar_kanji.jpg"},{id:16,name:"Keerai Kanji",tamilName:"கீரை கஞ்சி",category:"kanji",price:79,originalPrice:110,description:"Fresh spinach and amaranth greens porridge. Iron-rich superfood kanji for strength and vitality.",nutrition:{calories:"115",protein:"5.0g",fiber:"4.2g",iron:"28%",calcium:"15%",vitB:"18%"},rating:4.7,reviews:167,badge:null,inStock:!0,stock:32,image:"./images/keerai_kanji.jpg"},{id:17,name:"Quinoa Kanji",tamilName:"கினோவா கஞ்சி",category:"kanji",price:139,originalPrice:190,description:"Modern superfood meets Tamil tradition. Quinoa cooked the kanji way with coconut milk and palm jaggery.",nutrition:{calories:"175",protein:"8.5g",fiber:"4.0g",iron:"15%",calcium:"8%",vitB:"20%"},rating:4.6,reviews:98,badge:"new",inStock:!0,stock:22,image:"./images/quinoa_kanji.jpg"},{id:18,name:"Barli Kanji",tamilName:"பார்லி கஞ்சி",category:"kanji",price:75,originalPrice:100,description:"Cooling barley porridge, perfect for summer. Known for its kidney-friendly properties and soothing taste.",nutrition:{calories:"150",protein:"4.2g",fiber:"6.0g",iron:"10%",calcium:"6%",vitB:"12%"},rating:4.5,reviews:123,badge:null,inStock:!0,stock:40,image:"./images/barli_kanji.jpg"},{id:19,name:"Chola Kanji",tamilName:"சோளக் கஞ்சி",category:"kanji",price:79,originalPrice:105,description:"Sorghum porridge — the drought-resistant supergrain of Tamil Nadu. Gluten-free and packed with energy.",nutrition:{calories:"170",protein:"5.0g",fiber:"3.8g",iron:"14%",calcium:"8%",vitB:"16%"},rating:4.6,reviews:145,badge:null,inStock:!0,stock:38,image:"./images/chola_kanji.jpg"},{id:20,name:"Daily SPL 1",tamilName:"தினசரி சிறப்பு 1",category:"daily-spl",price:99,originalPrice:149,description:"Chef's daily special kanji — a unique blend that changes daily. Today's pick combines seasonal ingredients with traditional recipes.",nutrition:{calories:"165",protein:"6.0g",fiber:"4.0g",iron:"15%",calcium:"10%",vitB:"18%"},rating:4.8,reviews:567,badge:"daily",inStock:!0,stock:100,image:"./images/daily_spl_kanji.jpg"},{id:21,name:"Sprouts Pulses",tamilName:"முளை கட்டிய பருப்புகள்",category:"solid-eats",price:69,originalPrice:95,description:"Fresh multi-sprout bowl with green gram, black gram, and horse gram. Tossed with lime, onion, and curry leaves.",nutrition:{calories:"120",protein:"10.5g",fiber:"6.0g",iron:"18%",calcium:"8%",vitB:"22%"},rating:4.7,reviews:234,badge:null,inStock:!0,stock:45,image:"./images/sprouts_pulses.jpg"},{id:22,name:"Boiled Egg",tamilName:"வேக வைத்த முட்டை",category:"solid-eats",price:29,originalPrice:40,description:"Farm-fresh country eggs, perfectly boiled. Served with a side of spiced salt and pepper. Pure protein power.",nutrition:{calories:"78",protein:"6.3g",fiber:"0g",iron:"5%",calcium:"3%",vitB:"10%"},rating:4.5,reviews:456,badge:null,inStock:!0,stock:80,image:"./images/egg.jpg"},{id:23,name:"Poitha Bath",tamilName:"பொய்த்த பாத்",category:"kanji",price:89,originalPrice:120,description:"Traditional fermented rice bath — a probiotic powerhouse. Left overnight and served cold with raw onion and green chilli.",nutrition:{calories:"145",protein:"3.8g",fiber:"2.0g",iron:"8%",calcium:"12%",vitB:"35%"},rating:4.8,reviews:289,badge:"bestseller",inStock:!0,stock:35,image:"./images/poitha_bath.jpg"},{id:24,name:"Ulundhan Kali",tamilName:"உளுந்தங்களி",category:"traditional-sweets",price:99,originalPrice:139,description:"Authentic traditional Tamil sweet made with whole black urad dal, pure palm jaggery (கருப்பட்டி), crushed cardamom, and pure cold-pressed sesame oil (நல்லெண்ணெய்). Deeply nourishing, rich in iron and calcium, passed down through generations.",nutrition:{calories:"220",protein:"6.5g",fiber:"3.8g",iron:"24%",calcium:"18%",vitB:"16%"},rating:5,reviews:215,badge:"bestseller",inStock:!0,stock:40,image:"./images/ulundhan_kali.jpg"}],or=[{id:1,text:"The Sprouted Ragi Kanji takes me back to my grandmother's kitchen. Authentic taste, pure ingredients. My whole family starts the day with VedicFueloon!",name:"Priya Shankar",tamilName:"பிரியா சங்கர்",location:"Coimbatore, Tamil Nadu",rating:5,initial:"P"},{id:2,text:"I've been ordering Karupu Kauvni Kanji for 3 months. My blood sugar levels have improved significantly. This is not just food — it's medicine from nature.",name:"Dr. Ramesh Kumar",tamilName:"டாக்டர் ரமேஷ் குமார்",location:"Coimbatore, Tamil Nadu",rating:5,initial:"R"},{id:3,text:"As a fitness enthusiast, I love the Sprouts Pulses bowl and Ulundhan Kali. High protein, clean ingredients, and the taste is absolutely incredible. Best health food brand!",name:"Karthik Vel",tamilName:"கார்த்திக் வேல்",location:"Coimbatore, Tamil Nadu",rating:5,initial:"K"},{id:4,text:"The Bamboo Kanji and Ulundhan Kali are rare authentic finds! VedicFueloon brings forgotten Tamil recipes back to our dining table. Absolutely brilliant!",name:"Lakshmi Devi",tamilName:"லட்சுமி தேவி",location:"Coimbatore, Tamil Nadu",rating:5,initial:"L"}],ks=["linear-gradient(135deg, #2D5E3F 0%, #1B3A2D 100%)","linear-gradient(135deg, #D4A017 0%, #B8880F 100%)","linear-gradient(135deg, #8B4513 0%, #654321 100%)","linear-gradient(135deg, #556B2F 0%, #3B4F1E 100%)","linear-gradient(135deg, #CD853F 0%, #A0522D 100%)","linear-gradient(135deg, #6B8E23 0%, #4F6B1A 100%)","linear-gradient(135deg, #8B7355 0%, #6B5B3E 100%)","linear-gradient(135deg, #2E8B57 0%, #1E6B42 100%)"];function Cs(s){return ks[(s-1)%ks.length]}function As(s){return G.find(n=>n.id===parseInt(s))}function xs(s){return s==="all"?G:s==="daily-spl"?[{...Pi(),category:"daily-spl",badge:"daily"}]:s==="kanji"?G.filter(n=>n.category==="kanji"||n.category==="daily-spl"):G.filter(n=>n.category===s)}function Pi(){const s=localStorage.getItem("vf_daily_special_id");if(s){const n=G.find(o=>o.id===parseInt(s));if(n)return n}return G.find(n=>n.id===20)||G[0]}const r={leaf:'<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.9C15.5 4.9 17 3.5 19 1c1 2 2 4.5 1 8-1 3.5-3.5 5-7 7"></path><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path></svg>',pot:'<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11h18"></path><path d="M5 11v8a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-8"></path><path d="M12 5v6"></path><path d="M9 3h6"></path></svg>',mortar:'<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 22h14"></path><path d="M5 22c-1 0-2-1-2-3v-3c0-2 3-3 9-3s9 1 9 3v3c0 2-1 3-2 3"></path><path d="M12 3v10"></path><circle cx="12" cy="3" r="2"></circle></svg>',star:'<svg class="icon-svg" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>',starEmpty:'<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>',cart:'<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>',plus:'<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>',heart:'<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>',search:'<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>',check:'<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',x:'<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',alert:'<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>',fire:'<svg class="icon-svg" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 23c-3.87 0-7-3.13-7-7 0-2.38 1.19-4.47 3-5.74V9c0-3.87 3.13-7 7-7a1 1 0 0 1 .71.29c.18.19.29.45.29.71v2.28c1.48 1.45 2.39 3.21 2.68 5.22A5 5 0 0 1 22 15a5 5 0 0 1-5 5h-.06A7 7 0 0 1 12 23zm0-18.93A5 5 0 0 0 8 9v2a1 1 0 0 1-.45.84A5 5 0 0 0 7 16a5 5 0 0 0 5 5 5 5 0 0 0 4.06-2.07A3 3 0 0 0 20 15a3 3 0 0 0-2-2.83 1 1 0 0 1-.68-.93c-.14-1.86-.86-3.44-2.14-4.7A1 1 0 0 1 15 5.8V4.14A5 5 0 0 0 12 4.07z"></path></svg>',sparkle:'<svg class="icon-svg" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 1l2.09 6.26L20 9.27l-4.91 3.82L16.82 20 12 16.77 7.18 20l1.73-6.91L4 9.27l5.91-2.01L12 1z"></path></svg>',handshake:'<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 17l-5-5-4 4-3-3-5 5"></path><path d="M4 15v4h4"></path><path d="M20 15v4h-4"></path></svg>',phone:'<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13 1 .37 2.01.72 2.97a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.96.35 1.97.59 2.97.72A2 2 0 0 1 22 16.92z"></path></svg>',settings:'<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>',realWhatsapp:'<svg class="real-brand-logo real-wa-logo" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="24" r="23" fill="#25D366"/><path fill-rule="evenodd" clip-rule="evenodd" d="M24 8.5C15.44 8.5 8.5 15.44 8.5 24c0 3.01.86 5.82 2.35 8.21L9 39l7.02-1.78A15.42 15.42 0 0 0 24 39.5c8.56 0 15.5-6.94 15.5-15.5S32.56 8.5 24 8.5zm7.88 21.25c-.33.93-1.64 1.72-2.7 1.95-.73.16-1.69.29-4.91-1.05-4.1-1.71-6.76-5.88-6.96-6.15-.2-.27-1.65-2.2-1.65-4.19 0-1.99 1.05-2.97 1.42-3.37.37-.4.82-.5 1.09-.5.27 0 .54.01.79.02.26.01.6-.1.95.73.36.86 1.22 2.97 1.32 3.19.1.21.17.47.03.76-.14.29-.22.46-.43.7-.21.24-.44.55-.63.73-.21.22-.44.45-.19.89.26.44 1.15 1.89 2.47 3.07 1.69 1.5 3.13 1.98 3.57 2.19.45.22.7.19.96-.11.26-.3.11-1.29 1.41-1.74.3-.44.6-.37 1.02-.21.42.16 2.64 1.25 3.1 1.48.46.23.76.35.87.55.12.2.12 1.16-.21 2.09z" fill="#FFFFFF"/></svg>',realInstagram:'<svg class="real-brand-logo real-ig-logo" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="realIgRadial" cx="20%" cy="110%" r="95%"><stop offset="0%" stop-color="#FFD521"/><stop offset="25%" stop-color="#FF543E"/><stop offset="65%" stop-color="#C837AB"/><stop offset="100%" stop-color="#3771C8"/></radialGradient></defs><rect width="48" height="48" rx="12" fill="url(#realIgRadial)"/><rect x="9.5" y="9.5" width="29" height="29" rx="8" fill="none" stroke="#FFFFFF" stroke-width="3.2"/><circle cx="24" cy="24" r="7" fill="none" stroke="#FFFFFF" stroke-width="3.2"/><circle cx="31.8" cy="16.2" r="2.2" fill="#FFFFFF"/></svg>',messageCircle:'<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>',arrowRight:'<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>',arrowLeft:'<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>',chevronRight:'<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>',chevronLeft:'<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>',trash:'<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>',truck:'<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>',users:'<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>',home:'<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>',logOut:'<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>',barChart:'<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="20" x2="12" y2="10"></line><line x1="18" y1="20" x2="18" y2="4"></line><line x1="6" y1="20" x2="6" y2="16"></line></svg>',package:'<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>',bowl:'<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11h18c0 5.523-4.477 10-10 10H7C4.477 21 2 17.523 3 11z"></path><path d="M7 11c0-4 2-6 5-6s5 2 5 6"></path><line x1="12" y1="3" x2="12" y2="5"></line></svg>',vegCircle:'<svg class="icon-svg" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="3" fill="none" stroke="#27AE60" stroke-width="2"/><circle cx="12" cy="12" r="5" fill="#27AE60"/></svg>',clipboard:'<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>',shoppingBag:'<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>',wheat:'<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 22 16 8"></path><path d="M3.47 12.53 5 11l1.53 1.53a3.5 3.5 0 0 1 0 4.94L5 19l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z"></path><path d="M7.47 8.53 9 7l1.53 1.53a3.5 3.5 0 0 1 0 4.94L9 15l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z"></path><path d="M11.47 4.53 13 3l1.53 1.53a3.5 3.5 0 0 1 0 4.94L13 11l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z"></path><path d="M20 2h2v2a4 4 0 0 1-4 4h-2V6a4 4 0 0 1 4-4Z"></path><path d="M11.47 17.47 13 19l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L5 19l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z"></path><path d="M15.47 13.47 17 15l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L9 15l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z"></path><path d="M19.47 9.47 21 11l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L13 11l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z"></path></svg>',flask:'<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3h6"></path><path d="M10 9V3"></path><path d="M14 9V3"></path><path d="M10 9l-4 11a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2L14 9"></path></svg>',nutrition:'<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path><line x1="6" y1="1" x2="6" y2="4"></line><line x1="10" y1="1" x2="10" y2="4"></line><line x1="14" y1="1" x2="14" y2="4"></line></svg>',edit:'<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>',diamond:'<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 12l10 10 10-10L12 2z"></path></svg>',hourglass:'<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 22h14"></path><path d="M5 2h14"></path><path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22"></path><path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2"></path></svg>',salad:'<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 21h10"></path><path d="M12 21a9 9 0 0 0 9-9H3a9 9 0 0 0 9 9Z"></path><path d="M11.38 12a2.4 2.4 0 0 1-.4-4.77 2.4 2.4 0 0 1 3.2-2.77 2.4 2.4 0 0 1 3.47-.63 2.4 2.4 0 0 1 3.37 1.44 2.4 2.4 0 0 1-1.02 3.73"></path><path d="M12.62 12a2.4 2.4 0 0 0 .4-4.77 2.4 2.4 0 0 0-3.2-2.77"></path></svg>',list:'<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>',eco:'<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 22c1.25-1.25 2.5-2.5 4-3.5C8.5 17 11 16.5 14 17c-1 1-2 2.5-2 4.5"></path><path d="M11 20A7 7 0 0 1 9.8 6.9C15.5 4.9 17 3.5 19 1c1 2 2 4.5 1 8-1 3.5-3.5 5-7 7"></path></svg>',lock:'<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>',eye:'<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="10" r="3"></circle></svg>',currency:'<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>',lightning:'<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>',flower:'<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M12 2a4 4 0 0 0-4 4c0 3 4 6 4 6s4-3 4-6a4 4 0 0 0-4-4z"></path><path d="M12 22a4 4 0 0 0 4-4c0-3-4-6-4-6s-4 3-4 6a4 4 0 0 0 4 4z"></path><path d="M2 12a4 4 0 0 0 4 4c3 0 6-4 6-4s-3-4-6-4a4 4 0 0 0-4 4z"></path><path d="M22 12a4 4 0 0 0-4-4c-3 0-6 4-6 4s3 4 6 4a4 4 0 0 0 4-4z"></path></svg>',checkCircle:'<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>',shieldCheck:'<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><polyline points="9 12 11 14 15 10"></polyline></svg>'};function rr(){const s=Z.getCount();return`
    <header class="site-header-fixed" id="siteHeader">
      <div class="announcement-bar">
        <div class="announce-track">
          <span class="announce-item"><span class="announce-icon">${r.leaf}</span> 100% Natural Ingredients | 100% இயற்கை பொருட்கள்</span>
          <span class="announce-divider">${r.diamond}</span>
          <span class="announce-item"><span class="announce-icon">${r.mortar}</span> Stone Ground Traditional Recipes | கல் உரல் அரைப்பு</span>
          <span class="announce-divider">${r.diamond}</span>
          <span class="announce-item"><span class="announce-icon">${r.pot}</span> Traditional Tamil Health Foods | பாரம்பரிய தமிழ் உணவு</span>
          <span class="announce-divider">${r.diamond}</span>
          <span class="announce-item"><span class="announce-icon">${r.leaf}</span> 100% Natural Ingredients | 100% இயற்கை பொருட்கள்</span>
          <span class="announce-divider">${r.diamond}</span>
          <span class="announce-item"><span class="announce-icon">${r.mortar}</span> Stone Ground Traditional Recipes | கல் உரல் அரைப்பு</span>
          <span class="announce-divider">${r.diamond}</span>
          <span class="announce-item"><span class="announce-icon">${r.pot}</span> Traditional Tamil Health Foods | பாரம்பரிய தமிழ் உணவு</span>
        </div>
      </div>
      <nav class="navbar" id="navbar">
        <div class="container">
          <a href="#/" class="navbar-brand" id="mainNavBrand" title="VedicFueloon — Home (Double-click to open Admin Panel)">
            <div class="brand-logo-wrap" title="VedicFueloon">
              <img 
                id="navbarLogoImg"
                class="brand-logo-animated" 
                src="./vedicfueloon_logo_animated.webp" 
                alt="VedicFueloon Animated Logo" 
                loading="eager"
                onerror="this.onerror=null;this.src='./vedicfueloon-emblem.png';"
              />
            </div>
            <div class="brand-info">
              <div class="brand-name">Vedic<span>Fueloon</span></div>
              <div class="brand-tagline d-none d-sm-block">Power in Every Bite</div>
            </div>
          </a>
          
          <div class="nav-links" id="navLinks">
            <a href="#/" class="nav-link" data-page="home">Home</a>
            <a href="#/shop" class="nav-link" data-page="shop">Kanji & Menu</a>
            <a href="#/about" class="nav-link" data-page="about">Our Story</a>
            <a href="#/contact" class="nav-link" data-page="contact">Contact</a>
            <a href="#/admin" class="nav-link d-md-none nav-link-mobile-admin" data-page="admin">${r.settings} Admin Portal</a>
          </div>
          
          <div class="nav-actions">
            <a href="#/admin" class="nav-admin-link d-none d-md-inline-flex" title="Admin Portal">${r.settings} Admin</a>
            <button class="nav-cart-btn btn-ripple" id="navCartBtn" onclick="location.hash='#/cart'" title="View Shopping Cart">
              <span class="cart-icon">${r.cart}</span>
              <span class="cart-text d-none d-sm-inline">Cart</span>
              <span class="cart-count" id="cartCount">${s}</span>
            </button>
            <button class="mobile-toggle d-flex d-md-none" id="mobileToggle" aria-label="Toggle navigation menu" aria-expanded="false">
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>
        <!-- Continuous Flower Petals Garland along the bottom edge -->
        <div class="navbar-petal-border" aria-hidden="true"></div>
      </nav>
    </header>
  `}function lr(){return`
    <footer class="site-footer">
      <div class="footer-top">
        <div class="container">
          <div class="footer-grid">
            <div class="footer-brand">
              <div class="footer-logo">
                <img src="./vedicfueloon-logo-clean.png" alt="VedicFueloon" class="footer-clean-logo" />
              </div>
              <p>Authentic Tamil traditional health foods, crafted with love and heritage. Every spoon carries the wisdom of ancient Siddha nutrition and grandmother's stone-ground recipes.</p>
              <div class="footer-social">
                <a href="https://wa.me/919876543210?text=Hi!%20I%20would%20like%20to%20order%20from%20VedicFueloon" target="_blank" rel="noopener" aria-label="WhatsApp Official" class="social-brand-btn social-wa-btn" title="Chat on WhatsApp (+91 98765 43210)">
                  ${r.realWhatsapp}
                </a>
                <a href="https://instagram.com/vedicfueloon" target="_blank" rel="noopener" aria-label="Instagram Official" class="social-brand-btn social-ig-btn" title="Follow on Instagram (@vedicfueloon)">
                  ${r.realInstagram}
                </a>
              </div>
            </div>
            
            <div class="footer-col">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="#/">${r.chevronRight} Home</a></li>
                <li><a href="#/shop">${r.chevronRight} Menu</a></li>
                <li><a href="#/about">${r.chevronRight} Our Story</a></li>
                <li><a href="#/contact">${r.chevronRight} Contact</a></li>
                <li><a href="#/cart">${r.chevronRight} Cart</a></li>
              </ul>
            </div>
            
            <div class="footer-col">
              <h4>Popular Items</h4>
              <ul>
                <li><a href="#/product/1">${r.chevronRight} Karupu Kauvni Kanji</a></li>
                <li><a href="#/product/3">${r.chevronRight} Sprouted Ragi Kanji</a></li>
                <li><a href="#/product/8">${r.chevronRight} Millet Kanji</a></li>
                <li><a href="#/product/12">${r.chevronRight} Bamboo Kanji</a></li>
                <li><a href="#/product/15">${r.chevronRight} Navar Nava Pire</a></li>
              </ul>
            </div>
            
            <div class="footer-col">
              <h4>Direct Connect</h4>
              <ul class="footer-exclusive-channels">
                <li>
                  <a href="https://wa.me/919876543210?text=Hi!%20I%20would%20like%20to%20order%20from%20VedicFueloon" target="_blank" rel="noopener" class="footer-channel-link">
                    <span class="channel-link-logo">${r.realWhatsapp}</span>
                    <div class="channel-link-meta">
                      <span class="channel-link-title">WhatsApp Order</span>
                      <span class="channel-link-sub">+91 98765 43210</span>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="https://instagram.com/vedicfueloon" target="_blank" rel="noopener" class="footer-channel-link">
                    <span class="channel-link-logo">${r.realInstagram}</span>
                    <div class="channel-link-meta">
                      <span class="channel-link-title">Instagram DM</span>
                      <span class="channel-link-sub">@vedicfueloon</span>
                    </div>
                  </a>
                </li>
                <li class="footer-channels-note">
                  <span class="pulse-dot"></span> WhatsApp & Instagram Only
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="footer-bottom">
          <p>&copy; ${new Date().getFullYear()} VedicFueloon. All rights reserved.</p>
          <span class="footer-tamil-quote">${r.flower} உங்கள் உணவே உங்கள் மருந்து — Let food be thy medicine ${r.flower}</span>
        </div>
      </div>
      <div class="footer-petal-garland" aria-hidden="true"></div>
    </footer>
  `}function qe(s){var f;const n=Math.round((1-s.price/s.originalPrice)*100),o=Cs(s.id),l=s.badge?`<span class="badge badge-${s.badge}">${s.badge==="bestseller"?"Best Seller":s.badge==="new"?"New Harvest":s.badge==="daily"?"Daily Special":""}</span>`:"",p=ji(s.rating),u=(f=s.nutrition)!=null&&f.protein?`${s.nutrition.protein} Protein`:"Heritage Recipe";return`
    <div class="product-card hover-lift tilt-hover" data-product-id="${s.id}">
      <div class="card-image" style="background: ${o};">
        ${s.image?`<img src="${s.image}" alt="${s.name}" loading="lazy" />`:`
            <div class="card-art-placeholder">
              <div class="art-glow"></div>
              <div class="art-icon">${r.bowl}</div>
              <div class="art-leaf">${r.leaf}</div>
              <span class="art-tamil-tag tamil-text">${s.tamilName.split(" ")[0]||"கஞ்சி"}</span>
            </div>
          `}
        <div class="card-badges">
          ${n>0?`<span class="badge badge-sale">${n}% OFF</span>`:""}
          ${l}
        </div>
        <div class="card-nutrient-chip">${r.sparkle} ${u}</div>
        <button class="card-wishlist" aria-label="Add to wishlist" onclick="event.stopPropagation(); this.classList.toggle('active');">${r.heart}</button>
      </div>
      <div class="card-body">
        <div class="card-tamil-name tamil-text">${s.tamilName}</div>
        <h3 class="card-title">${s.name}</h3>
        <p class="card-desc">${s.description}</p>
        <div class="card-rating">
          <span class="stars">${p}</span>
          <strong>${s.rating}</strong>
          <span>(${s.reviews} reviews)</span>
        </div>
        <div class="card-footer">
          <div class="card-price">
            ₹${s.price}
            ${s.originalPrice>s.price?`<span class="original-price">₹${s.originalPrice}</span>`:""}
          </div>
          <button class="card-add-btn btn-ripple" onclick="event.stopPropagation(); window.addToCart(${s.id})" aria-label="Add to cart" title="Add to Cart">
            ${r.plus}
          </button>
        </div>
      </div>
    </div>
  `}function ji(s){let n="";for(let o=1;o<=5;o++)o<=Math.floor(s)||o-.5<=s?n+=r.star:n+=`<span class="star-empty">${r.starEmpty}</span>`;return n}function X(s,n,o="success"){let l=document.getElementById("toastContainer");l||(l=document.createElement("div"),l.id="toastContainer",l.className="toast-container",document.body.appendChild(l));const p={success:r.check,error:r.x,warning:r.alert},u=document.createElement("div");u.className=`toast ${o==="error"?"toast-error":o==="warning"?"toast-warning":""}`,u.innerHTML=`
    <span class="toast-icon">${p[o]||r.check}</span>
    <div class="toast-content">
      <div class="toast-title">${s}</div>
      <div class="toast-message">${n}</div>
    </div>
    <span class="toast-close" onclick="this.parentElement.remove()">${r.x}</span>
  `,l.appendChild(u),requestAnimationFrame(()=>{u.classList.add("show")}),setTimeout(()=>{u.classList.remove("show"),setTimeout(()=>u.remove(),300)},3500)}function Es(){const s=Z.getCount(),n=document.getElementById("cartCount");n&&(n.textContent=s,s>0&&(n.parentElement.classList.add("cart-bounce"),setTimeout(()=>n.parentElement.classList.remove("cart-bounce"),500)))}function cr(){const s=document.querySelectorAll("h1, h2, h3, .display-heading, .special-title, .cat-title, .comm-banner-title, .comm-channel-title, .product-title, .section-header h2, .section-header h3");function n(o){if(typeof Intl<"u"&&Intl.Segmenter)try{const l=new Intl.Segmenter(void 0,{granularity:"grapheme"});return Array.from(l.segment(o),p=>p.segment)}catch{}return Array.from(o)}s.forEach(o=>{if(o.closest(".modal, .announcement-bar, .admin-sidebar, .admin-layout, .toast, .navbar, .product-card")||(o.classList.add("split-heading","heading-rise"),o.dataset.split==="done"))return;o.dataset.split="done";let l=0;function p(f){var x;if(f.nodeType===Node.TEXT_NODE){const $=f.textContent;if(!$)return null;const L=document.createDocumentFragment();return $.split(/(\s+)/).forEach(T=>{if(T)if(/^\s+$/.test(T)){const j=document.createElement("span");j.className="split-space",j.innerHTML="&nbsp;",L.appendChild(j)}else{const j=document.createElement("span");j.className="split-word",n(T).forEach(K=>{const Q=document.createElement("span");Q.className="split-char",Q.style.setProperty("--char-idx",l++),Q.textContent=K,j.appendChild(Q)}),L.appendChild(j)}}),L}else if(f.nodeType===Node.ELEMENT_NODE){const $=f.tagName.toLowerCase();if($==="br"||$==="svg"||$==="path"||$==="circle"||$==="polygon"||$==="rect"||$==="line"||$==="polyline"||(x=f.classList)!=null&&x.contains("icon-svg"))return f.cloneNode(!0);const L=f.cloneNode(!1);return f.childNodes.forEach(_=>{const T=p(_);T&&L.appendChild(T)}),L}return f.cloneNode(!0)}const u=document.createDocumentFragment();Array.from(o.childNodes).forEach(f=>{const x=p(f);x&&u.appendChild(x)}),u.childNodes.length>0&&(o.innerHTML="",o.appendChild(u))})}function Ts(){window._vfScrollObserver&&window._vfScrollObserver.disconnect(),cr(),document.querySelectorAll("section:not(.hero)").forEach(o=>{o.classList.contains("section-scroll-blur")||o.classList.add("section-scroll-blur")});const s=new IntersectionObserver(o=>{o.forEach(l=>{l.isIntersecting?l.target.classList.add("visible"):l.target.classList.remove("visible")})},{threshold:.08,rootMargin:"0px 0px -30px 0px"});window._vfScrollObserver=s,document.querySelectorAll(".split-heading, .heading-rise, .section-header, .reveal, .reveal-stagger, .reveal-left, .reveal-right, .reveal-scale, .section-animate, .section-scroll-blur").forEach(o=>{o.closest(".modal, .announcement-bar, .admin-sidebar, .admin-layout, .toast, .navbar, .product-card")||s.observe(o)})}function dr(s){document.querySelectorAll(".nav-link").forEach(n=>{n.classList.toggle("active",n.dataset.page===s)})}function q(s){return"₹"+s.toLocaleString("en-IN")}function lt(s){return new Date(s).toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"})}function pr(){const s=G.filter(l=>l.badge==="bestseller"),n=G.filter(l=>l.badge==="new"),o=Pi();return`
    <!-- Hero Section -->
    <section class="hero kolam-bg kolam-dark gradient-animate hero-animate">
      <div class="container">
        <div class="hero-content">
          <div class="hero-text">
            <div class="hero-badge">${r.pot} வேதிக்ஃபூலூன் — பாரம்பரிய தமிழ் உணவு</div>
            <h1 class="hero-title">
              The Power of<br/>
              <span class="highlight">Ancient Tamil</span><br/>
              Nutrition
            </h1>
            <p class="hero-tamil tamil-text">"உணவே மருந்து · மருந்தே உணவு"</p>
            <p class="hero-desc">
              Authentic stone-ground Kanji varieties and traditional health foods, 
              passed down through generations. Crafted with care for pure nutrition 
              and unmatched flavor.
            </p>
            <div class="hero-actions">
              <a href="#/shop" class="btn btn-primary btn-lg btn-ripple">
                ${r.bowl} Shop Kanji (கஞ்சி வாங்க)
              </a>
            </div>
          </div>
          <div class="hero-slider-wrapper parallax-float" id="heroProductSlider">
            <div class="hero-slider-card">
              <div class="hero-slides-container">
                ${s.map((l,p)=>`
                  <div class="hero-slide ${p===0?"active":""}" data-slide-index="${p}">
                    <img src="${l.image}" alt="${l.name}" class="hero-slide-img" loading="${p===0?"eager":"lazy"}" />
                    <div class="hero-slide-overlay"></div>
                    <div class="hero-slide-top-bar">
                      <span class="hero-slide-badge">${r.fire} TOP SELLER</span>
                      <span class="hero-slide-rating">★ ${l.rating}</span>
                    </div>
                    <div class="hero-slide-info">
                      <div class="hero-slide-title-row">
                        <div>
                          <h3 class="hero-slide-title">${l.name}</h3>
                          <div class="hero-slide-tamil">${l.tamilName}</div>
                        </div>
                        <div class="hero-slide-price-box">
                          <span class="hero-slide-price">₹${l.price}</span>
                          ${l.originalPrice?`<span class="hero-slide-original-price">₹${l.originalPrice}</span>`:""}
                        </div>
                      </div>
                      <div class="hero-slide-action-row">
                        <a href="#/product/${l.id}" class="hero-slide-btn btn-ripple">
                          ${r.bowl} Order Now
                        </a>
                        <div class="hero-slider-dots">
                          ${s.map((u,f)=>`
                            <button class="hero-slider-dot ${f===p?"active":""}" data-dot-index="${f}" aria-label="Go to slide ${f+1}"></button>
                          `).join("")}
                        </div>
                      </div>
                    </div>
                  </div>
                `).join("")}
              </div>
              <button class="hero-slider-nav-btn hero-slider-prev" id="heroSlidePrev" aria-label="Previous Slide">
                ${r.chevronLeft}
              </button>
              <button class="hero-slider-nav-btn hero-slider-next" id="heroSlideNext" aria-label="Next Slide">
                ${r.chevronRight}
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- Traditional Tamil Flower Garland Design along Bottom of Hero -->
      <div class="hero-flower-border" aria-hidden="true">
        <div class="hero-flower-center">
          <svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" class="hero-flower-center-svg" aria-hidden="true">
            <circle cx="22" cy="22" r="20" fill="#1B3A2D" stroke="#D4A017" stroke-width="1.5" />
            <!-- Sacred 8-petal Lotus flower -->
            <path d="M 22,5 C 19,12 19,16 22,22 C 25,16 25,12 22,5 Z" fill="#F3C644" stroke="#9A6F09" stroke-width="0.5" />
            <path d="M 22,39 C 19,32 19,28 22,22 C 25,28 25,32 22,39 Z" fill="#F3C644" stroke="#9A6F09" stroke-width="0.5" />
            <path d="M 5,22 C 12,19 16,19 22,22 C 16,25 12,25 5,22 Z" fill="#F3C644" stroke="#9A6F09" stroke-width="0.5" />
            <path d="M 39,22 C 32,19 28,19 22,22 C 28,25 32,25 39,22 Z" fill="#F3C644" stroke="#9A6F09" stroke-width="0.5" />
            <path d="M 10,10 C 15,15 17,17 22,22 C 17,21 13,17 10,10 Z" fill="#FFEAA7" stroke="#D4A017" stroke-width="0.5" />
            <path d="M 34,10 C 29,15 27,17 22,22 C 27,21 31,17 34,10 Z" fill="#FFEAA7" stroke="#D4A017" stroke-width="0.5" />
            <path d="M 10,34 C 15,29 17,27 22,22 C 17,23 13,27 10,34 Z" fill="#FFEAA7" stroke="#D4A017" stroke-width="0.5" />
            <path d="M 34,34 C 29,29 27,27 22,22 C 27,23 31,27 34,34 Z" fill="#FFEAA7" stroke="#D4A017" stroke-width="0.5" />
            <circle cx="22" cy="22" r="5" fill="#E84393" stroke="#FFFDF0" stroke-width="1" />
            <circle cx="22" cy="22" r="2.2" fill="#F3C644" />
          </svg>
        </div>
      </div>
    </section>


    <!-- Categories Section -->
    <section class="section section-cream kolam-bg section-scroll-blur" id="categoriesSection">
      <div class="container">
        <div class="section-header text-center reveal">
          <span class="section-badge">${r.bowl} EXPLORE CATEGORIES</span>
          <h2>Our Traditional Menu</h2>
          <p class="tamil-text" style="color: var(--gold-700); margin-top: var(--space-2);">எங்கள் பாரம்பரிய உணவு வகைகள்</p>
        </div>

        <!-- Category Filter Pills -->
        <div class="category-filter-nav reveal">
          <button class="category-filter-pill active" onclick="location.hash='#/shop'">
            <span>${r.list} All Items</span>
            <span class="pill-badge">25</span>
          </button>
          <button class="category-filter-pill" onclick="location.hash='#/shop?category=kanji'">
            <span>${r.bowl} Kanji Varieties</span>
            <span class="pill-badge">21</span>
          </button>
          <button class="category-filter-pill" onclick="location.hash='#/shop?category=daily-spl'">
            <span>${r.sparkle} Daily Special</span>
            <span class="pill-badge">1</span>
          </button>
          <button class="category-filter-pill" onclick="location.hash='#/shop?category=solid-eats'">
            <span>${r.salad} Healthy Snacks</span>
            <span class="pill-badge">2</span>
          </button>
          <button class="category-filter-pill" onclick="location.hash='#/shop?category=traditional-sweets'">
            <span>${r.pot} Traditional Sweets</span>
            <span class="pill-badge">1</span>
          </button>
        </div>

        <!-- Rich Visual Category Cards -->
        <div class="grid-4 reveal-stagger">
          ${Object.values(Ss).map(l=>{const p=l.id==="daily-spl",u=p&&o.image||l.image,f=p?`Daily Special: ${o.name}`:l.name,x=p?o.tamilName:l.tamilName,$=p?`Today's Sunrise Curation: Freshly brewed ${o.name} with authentic heirloom herbs. Limited morning batches!`:l.tagline;return`
            <div class="category-card tilt-hover" onclick="location.hash='#/shop?category=${l.id}'">
              <!-- Food Image with slow zoom -->
              <div class="cat-image-wrap">
                <img src="${u}" alt="${f}" class="cat-image" loading="lazy" />
                <div class="cat-vignette"></div>
              </div>

              <!-- Top Bar -->
              <div class="cat-top-bar">
                <span class="cat-badge-pill">
                  ${l.id==="kanji"?r.pot:p?r.sparkle:l.id==="traditional-sweets"?r.pot:r.salad}
                  ${p?"Today's Special":l.badge}
                </span>
                <span class="cat-count-pill">${l.count} ITEMS</span>
              </div>

              <!-- Content Overlay -->
              <div class="cat-content">
                <div class="cat-tamil tamil-text">${x}</div>
                <h3 class="cat-title">${f}</h3>
                <p class="cat-desc">${$}</p>

                ${l.id==="solid-eats"?`
                  <!-- Dual Preview of Healthy Snacks: Sprouts Pulses & Boiled Egg -->
                  <div class="cat-dual-preview">
                    <div class="dual-thumb" onclick="event.stopPropagation(); location.hash='#/product/21';" title="View Sprouted Pulses">
                      <img src="./images/sprouts_pulses.jpg" alt="Sprouts Pulses" />
                      <div>
                        <div class="dual-thumb-name">Sprouts Pulses</div>
                        <div class="dual-thumb-tamil tamil-text">முளைகட்டிய பயறு</div>
                      </div>
                    </div>
                    <div class="dual-thumb" onclick="event.stopPropagation(); location.hash='#/product/22';" title="View Boiled Egg">
                      <img src="./images/egg.jpg" alt="Boiled Egg" />
                      <div>
                        <div class="dual-thumb-name">Boiled Egg</div>
                        <div class="dual-thumb-tamil tamil-text">அவித்த முட்டை</div>
                      </div>
                    </div>
                  </div>
                `:l.id==="traditional-sweets"?`
                  <!-- Preview of Traditional Sweets: Ulundhan Kali -->
                  <div class="cat-dual-preview">
                    <div class="dual-thumb" onclick="event.stopPropagation(); location.hash='#/product/24';" title="View Ulundhan Kali">
                      <img src="./images/ulundhan_kali.jpg" alt="Ulundhan Kali" />
                      <div>
                        <div class="dual-thumb-name">Ulundhan Kali (₹99)</div>
                        <div class="dual-thumb-tamil tamil-text">உளுந்தங்களி · ⭐ 5.0</div>
                      </div>
                    </div>
                  </div>
                `:p?`
                  <!-- Live Preview of Today's Special Item -->
                  <div class="cat-dual-preview">
                    <div class="dual-thumb" onclick="event.stopPropagation(); location.hash='#/product/${o.id}';" title="Order Today's Special">
                      <img src="${o.image}" alt="${o.name}" />
                      <div>
                        <div class="dual-thumb-name">${o.name} (₹${o.price})</div>
                        <div class="dual-thumb-tamil tamil-text">${o.tamilName} · ⭐ ${o.rating}</div>
                      </div>
                    </div>
                  </div>
                `:`
                  <!-- Ingredient / Quality Chips -->
                  <div class="cat-chips">
                    ${(l.chips||[]).map(L=>`<span class="cat-chip">${r.sparkle} ${L}</span>`).join("")}
                  </div>
                `}

                <!-- Footer CTA -->
                <div class="cat-footer-btn">
                  <span>Explore ${l.name}</span>
                  <span class="cat-btn-arrow">${r.arrowRight}</span>
                </div>
              </div>
            </div>
          `}).join("")}
        </div>

        <!-- Dedicated Healthy Snacks Spotlight (Sprouted Pulses + Boiled Egg) -->
        <div class="solid-eats-spotlight reveal" style="margin-top: var(--space-8); background: white; border: 1.5px solid rgba(212, 160, 23, 0.28); border-radius: var(--radius-2xl); padding: var(--space-6) var(--space-8); box-shadow: 0 10px 28px rgba(0,0,0,0.06);">
          <div style="display:flex; justify-content:space-between; align-items:flex-end; flex-wrap:wrap; gap:var(--space-4); margin-bottom: var(--space-6);">
            <div>
              <span class="section-badge">${r.salad} HEALTHY SNACKS SPOTLIGHT (ஆரோக்கிய சிற்றுண்டிகள்)</span>
              <h3 style="font-family: var(--font-display); font-size: var(--text-2xl); font-weight: 800; color: var(--primary-900); margin: var(--space-1) 0;">
                Sprouted Pulses & Farm-Fresh Boiled Eggs
              </h3>
              <p class="tamil-text" style="color: var(--gold-700); font-size: var(--text-sm);">
                பாரம்பரிய கஞ்சியோடு சேர்த்து உண்ணும் 2 சிறந்த ஊட்டச்சத்து உணவுகள் — 100% இயற்கை புரதம்
              </p>
            </div>
            <a href="#/shop?category=solid-eats" class="btn btn-outline btn-sm btn-ripple">
              View Healthy Snacks Menu ${r.arrowRight}
            </a>
          </div>

          <div class="grid-2 reveal-stagger">
            ${G.filter(l=>l.category==="solid-eats").map(l=>qe(l)).join("")}
          </div>
        </div>

        <!-- Dedicated Traditional Sweets Spotlight (Ulundhan Kali) -->
        <div class="traditional-sweets-spotlight reveal" style="margin-top: var(--space-8); background: white; border: 1.5px solid rgba(212, 160, 23, 0.28); border-radius: var(--radius-2xl); padding: var(--space-6) var(--space-8); box-shadow: 0 10px 28px rgba(0,0,0,0.06);">
          <div style="display:flex; justify-content:space-between; align-items:flex-end; flex-wrap:wrap; gap:var(--space-4); margin-bottom: var(--space-6);">
            <div>
              <span class="section-badge">${r.pot} TRADITIONAL SWEETS (பாரம்பரிய இனிப்புகள்)</span>
              <h3 style="font-family: var(--font-display); font-size: var(--text-2xl); font-weight: 800; color: var(--primary-900); margin: var(--space-1) 0;">
                Traditional Sweets · பாரம்பரிய உளுந்தங்களி
              </h3>
              <p class="tamil-text" style="color: var(--gold-700); font-size: var(--text-sm);">
                கருப்பு உளுந்து, சுத்தமான கருப்பட்டி & செக்கு நல்லெண்ணெய் கொண்டு பாரம்பரிய முறையில் தயார் செய்யப்பட்டது
              </p>
            </div>
            <a href="#/shop?category=traditional-sweets" class="btn btn-outline btn-sm btn-ripple">
              View Sweets Menu ${r.arrowRight}
            </a>
          </div>

          <div class="grid-products reveal-stagger">
            ${G.filter(l=>l.category==="traditional-sweets").map(l=>qe(l)).join("")}
          </div>
        </div>

        <!-- Heritage Quality Ribbon Strip -->
        <div class="category-heritage-ribbon reveal">
          <div class="heritage-ribbon-item">
            <div class="heritage-ribbon-icon">${r.pot}</div>
            <div>
              <div class="heritage-ribbon-title">Clay Pot Slow Cooked</div>
              <div class="heritage-ribbon-desc">Retains 100% natural minerals and gives distinct earthen aroma (மண்பானை சமையல்).</div>
            </div>
          </div>
          <div class="heritage-ribbon-item">
            <div class="heritage-ribbon-icon">${r.mortar}</div>
            <div>
              <div class="heritage-ribbon-title">Stone Mortar Ground</div>
              <div class="heritage-ribbon-desc">Pulverized cold without heat degradation in granite mortars (கல் உரல் அரைப்பு).</div>
            </div>
          </div>
          <div class="heritage-ribbon-item">
            <div class="heritage-ribbon-icon">${r.wheat}</div>
            <div>
              <div class="heritage-ribbon-title">21 Ancient Grains</div>
              <div class="heritage-ribbon-desc">Unpolished Karupu Kauvni, Ragi, Kodo & Barnyard millets (பாரம்பரிய தானியங்கள்).</div>
            </div>
          </div>
          <div class="heritage-ribbon-item">
            <div class="heritage-ribbon-icon">${r.truck}</div>
            <div>
              <div class="heritage-ribbon-title">Fresh Sunrise Delivery</div>
              <div class="heritage-ribbon-desc">Simmered before dawn and delivered hot for peak morning immunity and vitality.</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 🌟 Sunrise Daily Special Spotlight Banner -->
    <section class="section section-scroll-blur" style="padding-top: var(--space-2); padding-bottom: var(--space-8);">
      <div class="container">
        <div class="daily-special-sunrise-card reveal glow-border">
          <div class="special-card-left">
            <div class="special-card-media">
              <img src="${o.image}" alt="${o.name}" class="special-card-img" />
              <div class="special-card-stamp">
                <span class="pulse-dot-green"></span>
                <span>TODAY'S SPECIAL · இன்றைய சிறப்பு</span>
              </div>
            </div>
          </div>
          <div class="special-card-right">
            <div class="special-tag-row">
              <span class="section-badge">${r.sparkle} CHEF'S SUNRISE CURATION</span>
              <span class="special-tag-hot">${r.fire} Brewed Fresh Today</span>
            </div>
            <h2 class="display-heading special-title">${o.name}</h2>
            <div class="tamil-text special-tamil">${o.tamilName}</div>
            <p class="special-desc">${o.description}</p>
            
            <div class="special-nutrition-chips">
              <span class="nutrition-chip">${r.leaf} ${o.nutrition.calories} kcal</span>
              <span class="nutrition-chip">${r.pot} ${o.nutrition.protein} Protein</span>
              <span class="nutrition-chip">${r.mortar} ${o.nutrition.iron} Iron</span>
              <span class="nutrition-chip">${r.shieldCheck} 100% Traditional</span>
            </div>

            <div class="special-price-action-row">
              <div class="special-pricing">
                <span class="special-curr-price">₹${o.price}</span>
                <span class="special-old-price">₹${o.originalPrice}</span>
                <span class="special-discount-badge">Save ₹${o.originalPrice-o.price}</span>
              </div>
              <div class="special-action-buttons">
                <button class="btn btn-primary btn-lg btn-ripple" onclick="window.addToCart(${o.id}, 1)">
                  ${r.cart} Order Today's Special
                </button>
                <a href="#/product/${o.id}" class="btn btn-ghost btn-lg btn-ripple">
                  Recipe Details ${r.arrowRight}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Products - Best Sellers -->
    <section class="section section-scroll-blur">
      <div class="container">
        <div class="section-header reveal">
          <div style="display:flex; align-items:flex-start; justify-content:space-between; flex-wrap:wrap; gap:var(--space-4);">
            <div>
              <span class="section-badge">${r.fire} HANDCRAFTED KANJI</span>
              <h2 class="display-heading">Best Sellers</h2>
              <p class="tamil-text" style="color: var(--gold-700); margin-top: var(--space-2);">எங்கள் சிறந்த விற்பனை கஞ்சி வகைகள்</p>
            </div>
            <a href="#/shop" class="btn btn-outline btn-ripple" style="margin-top:var(--space-4);">View All Menu ${r.arrowRight}</a>
          </div>
        </div>
        <div class="products-scroll-wrapper reveal">
          <div class="products-scroll" id="featuredScroll">
            ${s.map(l=>qe(l)).join("")}
          </div>
          <button class="scroll-btn scroll-left" onclick="document.getElementById('featuredScroll').scrollBy({left:-310,behavior:'smooth'})">${r.arrowLeft}</button>
          <button class="scroll-btn scroll-right" onclick="document.getElementById('featuredScroll').scrollBy({left:310,behavior:'smooth'})">${r.arrowRight}</button>
        </div>
      </div>
    </section>

    <!-- Tamil Heritage Section -->
    <section class="section section-dark kolam-bg kolam-dark section-scroll-blur">
      <div class="container">
        <div class="text-center section-animate" style="max-width:800px; margin:0 auto;">
          <div class="ornament-divider">
            <span class="ornament-icon" style="color: var(--gold-500);">${r.pot}</span>
          </div>
          <h2 style="font-size: var(--text-4xl); margin-bottom: var(--space-6);">
            Rooted in Tamil <span style="color: var(--gold-500);">Tradition</span>
          </h2>
          <p class="tamil-text text-glow" style="font-size: var(--text-2xl); color: var(--gold-400); margin-bottom: var(--space-6); line-height: 1.6;">
            "உங்கள் உணவே உங்கள் மருந்து"
          </p>
          <p style="font-size: var(--text-lg); color: var(--cream-300); line-height: 1.8; margin-bottom: var(--space-8);">
            For centuries, Tamil culture has recognized that true health begins with what we eat. 
            Our ancestors created Kanji — not just as food, but as <em>medicine</em>. Each grain is carefully 
            selected, stone-ground, and slow-cooked following Siddha principles to maximize nutrition 
            and healing properties. At VedicFueloon, we bring this ancient wisdom to your modern kitchen.
          </p>
          <div class="ornament-divider">
            <span class="ornament-icon" style="color: var(--gold-500);">${r.diamond}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- New Arrivals -->
    ${n.length>0?`
    <section class="section section-scroll-blur">
      <div class="container">
        <div class="section-header reveal">
          <span class="section-badge">${r.sparkle} NEW ARRIVALS</span>
          <h2>Fresh Additions</h2>
          <p>புதிய சேர்க்கைகள் — Newly added to our traditional menu</p>
        </div>
        <div class="grid-products reveal-stagger">
          ${n.map(l=>qe(l)).join("")}
        </div>
      </div>
    </section>
    `:""}

    <!-- Testimonials -->
    <section class="section section-cream section-scroll-blur">
      <div class="container">
        <div class="section-header text-center reveal">
          <span class="section-badge">${r.messageCircle} CUSTOMER LOVE</span>
          <h2>What Our Family Says</h2>
          <p class="tamil-text" style="color: var(--gold-700); margin-top: var(--space-2);">எங்கள் வாடிக்கையாளர்கள் சொல்வது</p>
        </div>
        <div class="grid-2 reveal-stagger" style="max-width:900px; margin:0 auto;">
          ${or.map(l=>`
            <div class="testimonial-card hover-lift">
              <p class="test-text">${l.text}</p>
              <div class="test-author">
                <div class="test-avatar">${l.initial}</div>
                <div>
                  <div class="test-name">${l.name}</div>
                  <div class="test-location">${l.location}</div>
                  <div class="test-stars">${ji(l.rating)}</div>
                </div>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="section section-dark kolam-bg kolam-dark section-scroll-blur" style="padding: var(--space-16) 0;">
      <div class="container text-center section-animate">
        <h2 style="font-size: var(--text-4xl); margin-bottom: var(--space-4);">
          Ready to Taste <span style="color: var(--gold-500);">Tradition</span>?
        </h2>
        <p class="tamil-text text-glow" style="font-size: var(--text-xl); color: var(--gold-400); margin-bottom: var(--space-8);">
          பாரம்பரியத்தை சுவைக்க தயாரா?
        </p>
        <div style="display:flex; gap:var(--space-4); justify-content:center; flex-wrap:wrap; align-items:center;">
          <a href="#/shop" class="btn btn-primary btn-lg btn-ripple">${r.bowl} Order Now</a>
          <a href="https://instagram.com/vedicfueloon" target="_blank" rel="noopener" class="btn btn-ghost btn-lg btn-ripple" style="display:inline-flex; align-items:center; gap:8px;">
            <span style="width:24px; height:24px; display:inline-block;">${r.realInstagram}</span> Instagram DM
          </a>
        </div>
      </div>
    </section>

    <!-- Trust Badges (Positioned as the last screen below Ready to Taste Tradition) -->
    <section class="section section-cream kolam-bg section-scroll-blur" style="padding: var(--space-16) 0 var(--space-12); border-top: 1px solid rgba(212, 160, 23, 0.18);">
      <div class="container">
        <div class="grid-4 reveal-stagger" id="trustBadges">
          <div class="trust-card glow-border">
            <div class="trust-icon" style="color: var(--primary-500);">${r.leaf}</div>
            <div class="trust-value counter" data-target="100">100%</div>
            <div class="trust-label">Natural Ingredients</div>
            <div class="trust-tamil tamil-text">இயற்கை பொருட்கள்</div>
          </div>
          <div class="trust-card glow-border">
            <div class="trust-icon" style="color: var(--gold-600);">${r.pot}</div>
            <div class="trust-value">Zero</div>
            <div class="trust-label">Artificial Preservatives</div>
            <div class="trust-tamil tamil-text">செயற்கை நிறமிகள்</div>
          </div>
          <div class="trust-card glow-border">
            <div class="trust-icon" style="color: var(--orange-500);">${r.mortar}</div>
            <div class="trust-value">Stone Mortar</div>
            <div class="trust-label">Ground Fresh Daily</div>
            <div class="trust-tamil tamil-text">கல் உரலில் அரைத்தது</div>
          </div>
          <div class="trust-card glow-border">
            <div class="trust-icon" style="color: var(--primary-400);">${r.users}</div>
            <div class="trust-value counter" data-target="500">500+</div>
            <div class="trust-label">Happy Customers</div>
            <div class="trust-tamil tamil-text">மகிழ்ச்சியான வாடிக்கையாளர்கள்</div>
          </div>
        </div>
      </div>
    </section>
  `}function ur(){const s=document.getElementById("heroProductSlider");if(!s)return;window._heroSliderInterval&&(clearInterval(window._heroSliderInterval),window._heroSliderInterval=null);const n=s.querySelectorAll(".hero-slide");if(!n||n.length===0)return;let o=0;const l=n.length;function p(j){j<0?o=l-1:j>=l?o=0:o=j,n.forEach((H,K)=>{H.classList.toggle("active",K===o)}),s.querySelectorAll(".hero-slider-dot").forEach(H=>{const K=parseInt(H.getAttribute("data-dot-index"),10);H.classList.toggle("active",K===o)})}function u(){p(o+1)}function f(){p(o-1)}function x(){$(),window._heroSliderInterval=setInterval(()=>{if(!document.body.contains(s)){$();return}u()},3500)}function $(){window._heroSliderInterval&&(clearInterval(window._heroSliderInterval),window._heroSliderInterval=null)}const L=s.querySelector("#heroSlidePrev"),_=s.querySelector("#heroSlideNext");L&&(L.onclick=j=>{j.stopPropagation(),f(),x()}),_&&(_.onclick=j=>{j.stopPropagation(),u(),x()}),s.querySelectorAll(".hero-slider-dot").forEach(j=>{j.onclick=H=>{H.stopPropagation();const K=parseInt(j.getAttribute("data-dot-index"),10);isNaN(K)||(p(K),x())}}),s.addEventListener("mouseenter",$),s.addEventListener("mouseleave",x);let T=0;s.addEventListener("touchstart",j=>{T=j.changedTouches[0].clientX,$()},{passive:!0}),s.addEventListener("touchend",j=>{const H=j.changedTouches[0].clientX,K=T-H;Math.abs(K)>40&&(K>0?u():f()),x()},{passive:!0}),x()}function hr(s={}){const n=s.category||"all",o=xs(n),l=[{id:"all",name:"All Items",tamilName:"அனைத்தும்",count:G.length},...Object.values(Ss).map(u=>({...u,count:xs(u.id).length}))],p={all:r.list,kanji:r.bowl,"daily-spl":r.sparkle,"solid-eats":r.salad,"traditional-sweets":r.pot};return`
    <section class="section" style="padding-top: var(--space-8);">
      <div class="container">
        <!-- Page Header -->
        <div class="section-header reveal">
          <span class="section-badge">${r.bowl} OUR TRADITIONAL MENU</span>
          <h1 class="display-heading" style="font-size: var(--text-4xl);">
            Traditional Kanji<br/>& Health Foods
          </h1>
          <p class="tamil-text" style="color: var(--gold-700); margin-top: var(--space-2);">
            எங்கள் பாரம்பரிய கஞ்சி மற்றும் சிறப்பு உணவு வகைகள்
          </p>
        </div>

        <!-- Mobile Filter Bar using Bootstrap Collapse -->
        <div class="d-md-none mb-3">
          <button class="btn btn-outline-gold w-100 d-flex align-items-center justify-content-between py-2 px-3" 
                  type="button" data-bs-toggle="collapse" data-bs-target="#shopSidebarCollapse" 
                  aria-expanded="false" aria-controls="shopSidebarCollapse" id="mobileFilterToggleBtn">
            <span class="d-inline-flex align-items-center gap-2 font-weight-bold">
              ${r.sparkle} Filter, Search & Sort
            </span>
            <span class="badge" style="background: var(--gold-500); color: var(--primary-900); font-size: 11px;">Filter ▾</span>
          </button>
        </div>

        <div class="shop-layout">
          <!-- Sidebar (Collapsible on Mobile via Bootstrap, Fixed Sticky on Desktop) -->
          <div class="collapse d-md-block" id="shopSidebarCollapse">
            <aside class="shop-sidebar reveal">
              <div class="sidebar-section">
                <h4>Categories</h4>
                ${l.map(u=>`
                  <div class="sidebar-item ${u.id===n?"active":""}" 
                       onclick="location.hash='#/shop${u.id!=="all"?"?category="+u.id:""}'">
                    <span>${p[u.id]||r.list}</span>
                    <span>${u.name}</span>
                    <span class="item-count">${u.count}</span>
                  </div>
                `).join("")}
              </div>
              
              <div class="sidebar-section">
                <h4>Sort By</h4>
                <select class="form-select" id="sortSelect" onchange="window.shopSort(this.value)">
                  <option value="default">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="name">Name (A-Z)</option>
                </select>
              </div>

              <div class="sidebar-section">
                <h4>Search</h4>
                <input type="text" class="form-input" placeholder="Search kanji..." 
                       id="shopSearch" oninput="window.shopSearch(this.value)" />
              </div>
              
              <div class="sidebar-section" style="border-bottom:none;">
                <h4>Price Range</h4>
                <div style="display:flex; gap:var(--space-2); align-items:center;">
                  <span style="font-size:var(--text-sm); color:var(--neutral-500);">₹29</span>
                  <input type="range" min="29" max="199" value="199" 
                         style="flex:1; accent-color: var(--gold-600);"
                         id="priceRange" oninput="window.shopPriceFilter(this.value)" />
                  <span style="font-size:var(--text-sm); color:var(--neutral-500);" id="priceRangeVal">₹199</span>
                </div>
              </div>
            </aside>
          </div>

          <!-- Products Grid -->
          <div>
            <!-- Category Tabs (mobile-friendly) -->
            <div class="tabs reveal" style="margin-bottom: var(--space-6);">
              ${l.map(u=>`
                <button class="tab-btn ${u.id===n?"active":""}"
                        onclick="location.hash='#/shop${u.id!=="all"?"?category="+u.id:""}'">
                  ${u.name}
                </button>
              `).join("")}
            </div>

            <div class="reveal" style="margin-bottom:var(--space-4); display:flex; justify-content:space-between; align-items:center;">
              <p style="color:var(--neutral-500); font-size:var(--text-sm);">
                Showing <strong id="productCount">${o.length}</strong> products
              </p>
            </div>

            <div class="grid-products reveal-stagger" id="productsGrid">
              ${o.map(u=>qe(u)).join("")}
            </div>

            <div id="noResults" class="empty-state hidden">
              <div class="empty-icon" style="color: var(--neutral-400);">${r.search}</div>
              <h3>No products found</h3>
              <p>Try adjusting your search or filters</p>
              <button class="btn btn-primary btn-ripple" onclick="location.hash='#/shop'">View All Products</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  `}function gr(){window.shopSort=function(s){const n=document.getElementById("productsGrid");if(!n)return;const o=[...n.querySelectorAll(".product-card")],l=f=>{const x=f.querySelector(".card-price").textContent;return parseInt(x.replace(/[^\d]/g,""))},p=f=>{var $;const x=(($=f.querySelector(".card-rating strong"))==null?void 0:$.textContent)||"0";return parseFloat(x)},u=f=>{var x;return((x=f.querySelector(".card-title"))==null?void 0:x.textContent)||""};o.sort((f,x)=>{switch(s){case"price-low":return l(f)-l(x);case"price-high":return l(x)-l(f);case"rating":return p(x)-p(f);case"name":return u(f).localeCompare(u(x));default:return 0}}),o.forEach(f=>n.appendChild(f))},window.shopSearch=function(s){const n=document.getElementById("productsGrid"),o=document.getElementById("noResults"),l=document.getElementById("productCount");if(!n)return;const p=s.toLowerCase();let u=0;n.querySelectorAll(".product-card").forEach(f=>{var T,j,H;const x=((T=f.querySelector(".card-title"))==null?void 0:T.textContent.toLowerCase())||"",$=((j=f.querySelector(".card-tamil-name"))==null?void 0:j.textContent)||"",L=((H=f.querySelector(".card-desc"))==null?void 0:H.textContent.toLowerCase())||"",_=!p||x.includes(p)||$.includes(p)||L.includes(p);f.style.display=_?"":"none",_&&u++}),l&&(l.textContent=u),o&&o.classList.toggle("hidden",u>0)},window.shopPriceFilter=function(s){const n=document.getElementById("productsGrid"),o=document.getElementById("productCount"),l=document.getElementById("priceRangeVal");if(!n)return;l&&(l.textContent=`₹${s}`);let p=0;n.querySelectorAll(".product-card").forEach(u=>{const x=parseInt(u.querySelector(".card-price").textContent.replace(/[^\d]/g,""))<=parseInt(s);u.style.display=x?"":"none",x&&p++}),o&&(o.textContent=p)}}function mr(s){const n=As(s);if(!n)return`
      <section class="section">
        <div class="container">
          <div class="empty-state">
            <div class="empty-icon" style="color: var(--neutral-400);">${r.search}</div>
            <h3>Product Not Found</h3>
            <p>The product you're looking for doesn't exist.</p>
            <a href="#/shop" class="btn btn-primary btn-ripple">Browse Menu</a>
          </div>
        </div>
      </section>
    `;const o=Math.round((1-n.price/n.originalPrice)*100),l=G.filter(u=>u.category==="kanji"||u.category==="daily-spl"),p=Cs(n.id);return`
    <section class="section product-detail-page">
      <div class="container">
        <!-- Breadcrumb -->
        <div class="product-breadcrumb reveal">
          <a href="#/">Home</a> <span>›</span>
          <a href="#/shop">Menu</a> <span>›</span>
          <span style="color:var(--neutral-900); font-weight:500;">${n.name}</span>
        </div>

        <!-- Product Detail -->
        <div class="product-detail reveal">
          <div class="product-image-main" style="background: ${p};">
            ${n.image?`<img src="${n.image}" alt="${n.name}" />`:`<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:var(--gold-400);opacity:0.5;">${r.bowl}</div>`}
          </div>

          <div class="product-info">
            <div class="product-category-label">${n.category.replace("-"," ").toUpperCase()}</div>
            <h1 class="product-title">${n.name}</h1>
            <p class="product-tamil-name tamil-text">${n.tamilName}</p>
            
            <div class="product-rating">
              <span class="star-rating">${ji(n.rating)}</span>
              <strong>${n.rating}</strong>
              <span style="color:var(--neutral-400);">(${n.reviews} reviews)</span>
              ${n.badge?`<span class="badge badge-${n.badge}" style="margin-left:var(--space-2);">${n.badge==="bestseller"?"Best Seller":n.badge==="new"?"New":n.badge==="daily"?"Daily Special":""}</span>`:""}
            </div>

            <div class="product-price-block">
              <span class="product-current-price">₹${n.price}</span>
              ${n.originalPrice>n.price?`
                <span class="product-original-price">₹${n.originalPrice}</span>
                <span class="product-discount">${o}% OFF</span>
              `:""}
            </div>

            <p class="product-desc">${n.description}</p>

            <div style="display:flex; align-items:center; gap:var(--space-2); margin-bottom:var(--space-4);">
              <span class="badge badge-veg">${r.vegCircle} Veg</span>
              <span style="font-size:var(--text-sm); color: ${n.inStock?"var(--success)":"var(--danger)"}; font-weight:600;">
                ${n.inStock?`${r.check} In Stock (${n.stock} available)`:`${r.x} Out of Stock`}
              </span>
            </div>

            <div class="product-add-section">
              <div class="qty-selector">
                <button onclick="window.updateDetailQty(-1)">−</button>
                <input type="text" class="qty-value" id="detailQty" value="1" readonly />
                <button onclick="window.updateDetailQty(1)">+</button>
              </div>
              <button class="btn btn-primary btn-lg btn-ripple" onclick="window.addToCart(${n.id}, parseInt(document.getElementById('detailQty').value))" ${n.inStock?"":'disabled style="opacity:0.5;cursor:not-allowed;"'}>
                ${r.cart} Add to Cart
              </button>
            </div>

            <!-- Nutrition Facts -->
            <div class="product-nutrition">
              <h4>${r.nutrition} Nutrition Facts <span style="font-weight:400; font-size:var(--text-sm); color:var(--neutral-400);">(per serving)</span></h4>
              <div class="nutrition-grid">
                <div class="nutrition-item">
                  <div class="nut-value">${n.nutrition.calories}</div>
                  <div class="nut-label">Calories</div>
                </div>
                <div class="nutrition-item">
                  <div class="nut-value">${n.nutrition.protein}</div>
                  <div class="nut-label">Protein</div>
                </div>
                <div class="nutrition-item">
                  <div class="nut-value">${n.nutrition.fiber}</div>
                  <div class="nut-label">Fiber</div>
                </div>
                <div class="nutrition-item">
                  <div class="nut-value">${n.nutrition.iron}</div>
                  <div class="nut-label">Iron</div>
                </div>
                <div class="nutrition-item">
                  <div class="nut-value">${n.nutrition.calcium}</div>
                  <div class="nut-label">Calcium</div>
                </div>
                <div class="nutrition-item">
                  <div class="nut-value">${n.nutrition.vitB}</div>
                  <div class="nut-label">Vitamin B</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- All Available Kanji Varieties Section -->
        <div style="margin-top: var(--space-16);">
          <div class="section-header reveal">
            <div style="display:flex; justify-content:space-between; align-items:flex-end; flex-wrap:wrap; gap:var(--space-4);">
              <div>
                <span class="section-badge">${r.bowl} ALL KANJI VARIETIES (அனைத்து கஞ்சி வகைகள்)</span>
                <h2>Explore All Available Kanjies</h2>
                <p class="tamil-text" style="color: var(--gold-700); margin-top: var(--space-2);">
                  பாரம்பரிய முறைப்படி தயாரிக்கப்படும் 21 வகையான ஆரோக்கிய கஞ்சி வகைகள் — 100% இயற்கை பொருட்கள்
                </p>
              </div>
              <a href="#/shop?category=kanji" class="btn btn-outline btn-sm btn-ripple">
                View Full Menu ${r.arrowRight}
              </a>
            </div>
          </div>
          <div class="grid-products reveal-stagger">
            ${l.map(u=>u.id===n.id?`
                  <div style="position:relative; outline: 2px solid var(--gold-500); border-radius: var(--radius-xl); box-shadow: 0 0 15px rgba(212,160,23,0.3);">
                    <div style="position:absolute; top:-12px; left:50%; transform:translateX(-50%); background:var(--gold-600); color:var(--primary-950); font-size:11px; font-weight:800; letter-spacing:0.05em; padding:3px 12px; border-radius:var(--radius-full); z-index:10; box-shadow:0 2px 6px rgba(0,0,0,0.25);">
                      CURRENTLY VIEWING
                    </div>
                    ${qe(u)}
                  </div>
                `:qe(u)).join("")}
          </div>
        </div>
      </div>
    </section>
  `}function vr(){window.updateDetailQty=function(s){const n=document.getElementById("detailQty");if(n){const o=Math.max(1,parseInt(n.value)+s);n.value=o}}}function fr(){const s=Z.get();if(s.length===0)return`
      <section class="section">
        <div class="container">
          <div class="empty-state">
            <div class="empty-icon" style="color: var(--neutral-400);">${r.cart}</div>
            <h3>Your Cart is Empty</h3>
            <p>Looks like you haven't added any traditional goodness yet!</p>
            <p class="tamil-text" style="color:var(--gold-600); margin-bottom:var(--space-4);">உங்கள் கூடை காலியாக உள்ளது</p>
            <a href="#/shop" class="btn btn-primary btn-lg btn-ripple">${r.bowl} Explore Menu</a>
          </div>
        </div>
      </section>
    `;const n=Z.getSubtotal(),o=Z.getDelivery(),l=Z.getTotal(),p=s.reduce((u,f)=>u+(f.originalPrice-f.price)*f.qty,0);return`
    <section class="section" style="padding-top: var(--space-8);">
      <div class="container">
        <div class="cart-page-header reveal">
          <h1>Your Cart</h1>
          <p style="color:var(--neutral-500); margin-top:var(--space-2);">${s.length} item${s.length>1?"s":""} in your cart</p>
        </div>

        <div class="cart-layout">
          <!-- Cart Items -->
          <div class="reveal">
            ${s.map(u=>`
              <div class="cart-item" data-cart-id="${u.id}">
                <div class="cart-item-image">
                  ${u.image?`<img src="${u.image}" alt="${u.name}" style="width:100%;height:100%;object-fit:cover;border-radius:var(--radius-lg);" />`:`<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:var(--gold-400);">${r.bowl}</div>`}
                </div>
                <div class="cart-item-info">
                  <h4>${u.name}</h4>
                  <span class="cart-item-tamil tamil-text">${u.tamilName}</span>
                  <div class="cart-item-actions">
                    <div class="qty-selector">
                      <button onclick="window.updateCartQty(${u.id}, ${u.qty-1})">−</button>
                      <input type="text" class="qty-value" value="${u.qty}" readonly />
                      <button onclick="window.updateCartQty(${u.id}, ${u.qty+1})">+</button>
                    </div>
                    <button class="cart-item-remove" onclick="window.removeCartItem(${u.id})">${r.trash} Remove</button>
                  </div>
                </div>
                <div class="cart-item-price">
                  ${q(u.price*u.qty)}
                  ${u.qty>1?`<div style="font-size:var(--text-xs); color:var(--neutral-400); font-weight:400;">₹${u.price} × ${u.qty}</div>`:""}
                </div>
              </div>
            `).join("")}
          </div>

          <!-- Cart Summary -->
          <div class="cart-summary reveal">
            <h3 style="margin-bottom: var(--space-6); padding-bottom: var(--space-4); border-bottom: 1px solid var(--cream-200);">
              Order Summary
            </h3>
            
            <div class="summary-row">
              <span>Subtotal</span>
              <span>${q(n)}</span>
            </div>
            
            <div class="summary-row">
              <span>Delivery</span>
              <span>${o===0?`<span class="free-badge">FREE ${r.check}</span>`:q(o)}</span>
            </div>
            
            ${p>0?`
            <div class="summary-row" style="color: var(--success);">
              <span>You Save</span>
              <span>-${q(p)}</span>
            </div>
            `:""}

            ${n<499?`
            <div style="background: var(--gold-100); padding: var(--space-3); border-radius: var(--radius-md); margin: var(--space-3) 0; font-size: var(--text-xs); color: var(--gold-800); display:flex; align-items:center; gap:var(--space-2);">
              ${r.truck} Add ₹${499-n} more for FREE delivery!
            </div>
            `:""}
            
            <div class="summary-row total">
              <span>Total</span>
              <span>${q(l)}</span>
            </div>
            
            <a href="#/checkout" class="btn btn-primary btn-lg btn-ripple" style="width:100%; margin-top:var(--space-6);">
              Proceed to Checkout ${r.arrowRight}
            </a>
            
            <a href="#/shop" class="btn btn-outline btn-ripple" style="width:100%; margin-top:var(--space-3);">
              ${r.arrowLeft} Continue Shopping
            </a>
          </div>
        </div>
      </div>
    </section>
  `}function br(){window.updateCartQty=function(s,n){if(n<1){window.removeCartItem(s);return}Z.updateQty(s,n),window.navigateTo(location.hash)},window.removeCartItem=function(s){Z.remove(s),window.navigateTo(location.hash),window.showToastGlobal("Removed","Item removed from cart","warning")}}function yr(){const s=Z.get();if(s.length===0)return`
      <section class="section">
        <div class="container">
          <div class="empty-state">
            <div class="empty-icon" style="color: var(--neutral-400);">${r.cart}</div>
            <h3>Nothing to Checkout</h3>
            <p>Add items to your cart before checking out.</p>
            <a href="#/shop" class="btn btn-primary btn-ripple">Browse Menu</a>
          </div>
        </div>
      </section>
    `;const n=Z.getSubtotal(),o=Z.getDelivery(),l=Z.getTotal();return`
    <section class="section" style="padding-top: var(--space-8);">
      <div class="container">
        <div class="section-header reveal">
          <h1>Checkout</h1>
          <p style="color:var(--neutral-500);">Complete your order to enjoy traditional Tamil goodness</p>
        </div>

        <div class="checkout-layout">
          <!-- Checkout Form -->
          <div class="checkout-form reveal">
            <h3>${r.clipboard} Delivery Details</h3>
            
            <div class="form-group">
              <label class="form-label">Full Name *</label>
              <input type="text" class="form-input" id="checkoutName" placeholder="Enter your full name" required />
            </div>
            
            <div class="form-group">
              <label class="form-label">Phone Number *</label>
              <input type="tel" class="form-input" id="checkoutPhone" placeholder="+91 98765 43210" required />
            </div>
            
            <div class="form-group">
              <label class="form-label">Email (Optional)</label>
              <input type="email" class="form-input" id="checkoutEmail" placeholder="your@email.com" />
            </div>
            
            <div class="form-group">
              <label class="form-label">Delivery Address *</label>
              <textarea class="form-textarea" id="checkoutAddress" placeholder="Enter your full delivery address including pincode" rows="3"></textarea>
            </div>
            
            <div class="form-group">
              <label class="form-label">Special Instructions (Optional)</label>
              <textarea class="form-textarea" id="checkoutNotes" placeholder="Any special requests or notes..." rows="2"></textarea>
            </div>

            <div id="checkoutError" style="display:none; background:var(--danger-light); color:var(--danger); padding:var(--space-3) var(--space-4); border-radius:var(--radius-md); font-size:var(--text-sm); margin-bottom:var(--space-4);">
              Please fill in all required fields.
            </div>
            
            <button class="btn btn-primary btn-lg btn-ripple" style="width:100%;" onclick="window.placeOrder()">
              ${r.cart} Place Order — ${q(l)}
            </button>

            <p style="text-align:center; margin-top:var(--space-4); font-size:var(--text-xs); color:var(--neutral-400);">
              By placing this order, you agree to our terms & conditions
            </p>
          </div>

          <!-- Order Summary -->
          <div class="cart-summary reveal">
            <h3 style="margin-bottom: var(--space-6); padding-bottom: var(--space-4); border-bottom: 1px solid var(--cream-200);">
              ${r.shoppingBag} Order Summary
            </h3>
            
            ${s.map(p=>`
              <div style="display:flex; justify-content:space-between; align-items:center; padding:var(--space-3) 0; border-bottom:1px solid var(--cream-100);">
                <div style="display:flex; align-items:center; gap:var(--space-3);">
                  ${p.image?`<img src="${p.image}" alt="${p.name}" style="width:40px;height:40px;object-fit:cover;border-radius:var(--radius-md);flex-shrink:0;" />`:""}
                  <div>
                    <div style="font-weight:600; font-size:var(--text-sm);">${p.name}</div>
                    <div style="font-size:var(--text-xs); color:var(--neutral-400);">Qty: ${p.qty}</div>
                  </div>
                </div>
                <div style="font-weight:600;">${q(p.price*p.qty)}</div>
              </div>
            `).join("")}
            
            <div class="summary-row" style="margin-top:var(--space-4);">
              <span>Subtotal</span>
              <span>${q(n)}</span>
            </div>
            <div class="summary-row">
              <span>Delivery</span>
              <span>${o===0?`<span class="free-badge">FREE ${r.check}</span>`:q(o)}</span>
            </div>
            <div class="summary-row total">
              <span>Total</span>
              <span>${q(l)}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  `}function wr(s){return`
    <section class="section">
      <div class="container">
        <div class="order-confirmation reveal">
          <div class="confirm-icon">${r.check}</div>
          <h2 style="color: var(--success); margin-bottom: var(--space-4);">Order Placed Successfully!</h2>
          <p class="tamil-text" style="color:var(--gold-600); font-size:var(--text-xl); margin-bottom:var(--space-6);">
            உங்கள் ஆர்டர் வெற்றிகரமாக வைக்கப்பட்டது!
          </p>
          
          <div style="background:var(--cream-50); border-radius:var(--radius-xl); padding:var(--space-8); max-width:500px; margin:0 auto; text-align:left; border:1px solid var(--cream-200);">
            <div style="display:flex; justify-content:space-between; margin-bottom:var(--space-3);">
              <span style="color:var(--neutral-500);">Order ID</span>
              <strong>${s.id}</strong>
            </div>
            <div style="display:flex; justify-content:space-between; margin-bottom:var(--space-3);">
              <span style="color:var(--neutral-500);">Items</span>
              <strong>${s.items.length} products</strong>
            </div>
            <div style="display:flex; justify-content:space-between; margin-bottom:var(--space-3);">
              <span style="color:var(--neutral-500);">Total</span>
              <strong style="color:var(--primary-700); font-size:var(--text-lg);">${q(s.total)}</strong>
            </div>
            <div style="display:flex; justify-content:space-between;">
              <span style="color:var(--neutral-500);">Status</span>
              <span class="status-badge status-pending">${r.hourglass} Pending</span>
            </div>
          </div>

          <div style="margin-top:var(--space-8); display:flex; gap:var(--space-4); justify-content:center; flex-wrap:wrap;">
            <a href="#/shop" class="btn btn-primary btn-lg btn-ripple">${r.bowl} Continue Shopping</a>
            <a href="#/" class="btn btn-outline btn-lg btn-ripple">${r.arrowLeft} Back to Home</a>
          </div>
        </div>
      </div>
    </section>
  `}function _r(){window.placeOrder=function(){var _,T,j,H,K;const s=(_=document.getElementById("checkoutName"))==null?void 0:_.value.trim(),n=(T=document.getElementById("checkoutPhone"))==null?void 0:T.value.trim(),o=(j=document.getElementById("checkoutAddress"))==null?void 0:j.value.trim(),l=(H=document.getElementById("checkoutEmail"))==null?void 0:H.value.trim(),p=(K=document.getElementById("checkoutNotes"))==null?void 0:K.value.trim(),u=document.getElementById("checkoutError");if(!s||!n||!o){u&&(u.style.display="block");return}const f={name:s,phone:n,address:o,email:l,notes:p},x=Z.get(),$=$e.create(f,x),L=document.getElementById("pageContent");if(L){const{renderOrderConfirmation:Q}={renderOrderConfirmation:wr};L.innerHTML=Q($),window.scrollTo({top:0,behavior:"smooth"}),window.initReveal&&window.initReveal()}X("Order Placed!",`Order ${$.id} confirmed`,"success")}}function kr(){return`
    <!-- About Hero -->
    <section class="about-hero kolam-bg kolam-dark">
      <div class="container reveal">
        <span class="section-badge" style="margin-bottom:var(--space-4);">${r.pot} OUR STORY</span>
        <h1 style="font-size: var(--text-5xl); color: var(--cream-50); margin-bottom: var(--space-4);">
          The <span style="color: var(--gold-500);">VedicFueloon</span> Story
        </h1>
        <p class="tamil-text" style="font-size: var(--text-2xl); color: var(--gold-400); margin-bottom: var(--space-4);">
          வேதிக்ஃபூலூன் கதை — பாரம்பரியத்தின் சக்தி
        </p>
        <p style="font-size: var(--text-lg); color: var(--cream-300); max-width: 700px; margin: 0 auto; line-height: 1.8;">
          From the fertile lands of Tamil Nadu, we bring ancient recipes to your modern table. 
          Every grain is a story, every spoon a tradition.
        </p>
      </div>
    </section>

    <!-- Our Story -->
    <section class="section">
      <div class="container">
        <div class="about-story reveal">
          <div class="about-story-image" style="background: linear-gradient(135deg, #2D5E3F, #1B3A2D); display:flex; align-items:center; justify-content:center; color: var(--gold-400); opacity:0.6;">
            ${r.pot}
          </div>
          <div>
            <span class="section-badge">${r.leaf} OUR ORIGIN</span>
            <h2 style="margin-bottom: var(--space-6);">Born from Tamil Heritage</h2>
            <p style="color: var(--neutral-600); line-height: 1.8; margin-bottom: var(--space-4);">
              VedicFueloon was born from a simple belief — that the ancient food wisdom of Tamil Nadu 
              holds the key to modern wellness. Our founder grew up watching grandmothers prepare 
              stone-ground Kanji using recipes passed down through generations.
            </p>
            <p style="color: var(--neutral-600); line-height: 1.8; margin-bottom: var(--space-4);">
              Each morning, the rhythmic sound of the stone mortar (கல் உரல்) would fill the kitchen, 
              grinding fresh grains, herbs, and spices into the most nourishing porridge you've ever tasted. 
              This wasn't just food — it was medicine, ritual, and love combined.
            </p>
            <p style="color: var(--neutral-600); line-height: 1.8; margin-bottom: var(--space-6);">
              Today, we've preserved these ancient Siddha nutrition principles while making them 
              accessible to busy modern families. Every VedicFueloon product is a bridge between 
              our glorious past and your healthy future.
            </p>
            <p class="tamil-text" style="font-size: var(--text-lg); color: var(--gold-700); font-style: italic;">
              "பாட்டியின் கைமணம் — ஒவ்வொரு கவளத்திலும் சக்தி"
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Values -->
    <section class="section section-cream kolam-bg">
      <div class="container">
        <div class="section-header text-center reveal">
          <span class="section-badge">${r.sparkle} WHAT WE STAND FOR</span>
          <h2>Our Values</h2>
          <p class="tamil-text" style="color: var(--gold-700); margin-top: var(--space-2);">எங்கள் மதிப்புகள்</p>
        </div>
        
        <div class="values-grid reveal-stagger">
          <div class="value-card tilt-hover">
            <div class="value-icon" style="color: var(--primary-500);">${r.wheat}</div>
            <h4>100% Natural</h4>
            <p>Every ingredient is sourced directly from Tamil Nadu's organic farms. No chemicals, no shortcuts — just pure, natural goodness.</p>
          </div>
          <div class="value-card tilt-hover">
            <div class="value-icon" style="color: var(--gold-600);">${r.pot}</div>
            <h4>Ancient Recipes</h4>
            <p>Our recipes follow authentic Siddha nutrition principles, perfected over centuries by Tamil ancestors for optimal health.</p>
          </div>
          <div class="value-card tilt-hover">
            <div class="value-icon" style="color: var(--orange-500);">${r.mortar}</div>
            <h4>Stone Ground</h4>
            <p>We use traditional stone mortars to grind our ingredients, preserving nutrients and creating the authentic texture and flavor.</p>
          </div>
          <div class="value-card tilt-hover">
            <div class="value-icon" style="color: var(--primary-400);">${r.handshake}</div>
            <h4>Support Local Farmers</h4>
            <p>We work directly with local Tamil Nadu farmers, ensuring fair prices and supporting the agricultural community.</p>
          </div>
          <div class="value-card tilt-hover">
            <div class="value-icon" style="color: var(--info);">${r.flask}</div>
            <h4>Zero Preservatives</h4>
            <p>Our foods are prepared fresh with zero artificial preservatives, colors, or flavors. What you see is what you get.</p>
          </div>
          <div class="value-card tilt-hover">
            <div class="value-icon" style="color: var(--success);">${r.eco}</div>
            <h4>Eco-Friendly</h4>
            <p>Sustainable packaging and eco-conscious practices. We care for the earth as much as we care for your health.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Mission CTA -->
    <section class="section section-dark kolam-bg kolam-dark">
      <div class="container text-center section-animate">
        <div class="ornament-divider">
          <span class="ornament-icon" style="color: var(--gold-500);">${r.pot}</span>
        </div>
        <h2 style="font-size: var(--text-4xl); margin-bottom: var(--space-6);">
          Our Mission: <span style="color: var(--gold-500);">Power in Every Bite</span>
        </h2>
        <p style="font-size: var(--text-lg); color: var(--cream-300); max-width: 700px; margin: 0 auto var(--space-8); line-height: 1.8;">
          To revive and share the incredible nutritional wisdom of Tamil cuisine with the world. 
          We believe that when you eat the way our ancestors intended, your body thrives.
        </p>
        <p class="tamil-text text-glow" style="font-size: var(--text-xl); color: var(--gold-400); margin-bottom: var(--space-8);">
          ஒவ்வொரு கவளத்திலும் சக்தி — Power in Every Bite
        </p>
        <a href="#/shop" class="btn btn-primary btn-lg btn-ripple">${r.bowl} Experience the Tradition</a>
      </div>
    </section>
  `}function xr(){return`
    <!-- Communication Screen Hero -->
    <section class="about-hero kolam-bg kolam-dark" style="padding: var(--space-16) 0 var(--space-12);">
      <div class="container text-center reveal">
        <span class="section-badge" style="background: rgba(212, 160, 23, 0.15); color: var(--gold-400); border: 1px solid rgba(212, 160, 23, 0.3); margin-bottom: var(--space-4);">
          <span style="display:inline-flex; align-items:center; gap:6px;">
            <span style="width:16px; height:16px; display:inline-block;">${r.realWhatsapp}</span>
            <span style="width:16px; height:16px; display:inline-block;">${r.realInstagram}</span>
            OFFICIAL DIRECT COMMUNICATION
          </span>
        </span>
        <h1 style="font-size: var(--text-4xl); color: var(--cream-50); margin-bottom: var(--space-3); font-family: var(--font-display);">
          Direct <span style="color: var(--gold-500);">Communication</span>
        </h1>
        <p class="tamil-text text-glow" style="font-size: var(--text-2xl); color: var(--gold-400); margin-bottom: var(--space-4);">
          வாட்ஸ்அப் மற்றும் இன்ஸ்டாகிராம் நேரடி தொடர்பு மட்டுமே
        </p>
        <p style="font-size: var(--text-base); color: var(--cream-300); max-width: 680px; margin: 0 auto; line-height: 1.7;">
          For lightning-fast replies, custom dietary kanji orders, and fresh dawn harvest updates, connect with us exclusively through our two official channels.
        </p>
      </div>
    </section>

    <!-- Communication Screen Main Content -->
    <section class="section section-cream section-scroll-blur" style="padding: var(--space-12) 0 var(--space-20);">
      <div class="container">
        
        <!-- Exclusive Channels Banner Strip -->
        <div class="comm-exclusive-banner reveal">
          <div class="comm-banner-left">
            <span class="comm-banner-pill">${r.sparkle} DIRECT 1-ON-1 CONNECT</span>
            <h3 class="comm-banner-title">Exclusive Communication Policy</h3>
            <p class="comm-banner-desc">
              We do not use slow automated email ticketing. We serve every patron directly through 
              <strong>WhatsApp</strong> and <strong>Instagram</strong> for authentic personal care.
            </p>
          </div>
          <div class="comm-banner-badges">
            <div class="comm-mini-badge wa-mini">
              <span class="badge-brand-icon">${r.realWhatsapp}</span>
              <div>
                <strong>WhatsApp Order</strong>
                <small>Instant Response</small>
              </div>
            </div>
            <div class="comm-mini-badge ig-mini">
              <span class="badge-brand-icon">${r.realInstagram}</span>
              <div>
                <strong>Instagram DM</strong>
                <small>Stories & Updates</small>
              </div>
            </div>
          </div>
        </div>

        <!-- The 2 Official Communication Cards (WhatsApp & Instagram Only) -->
        <div class="comm-cards-grid reveal-stagger">
          
          <!-- Official WhatsApp Communication Card -->
          <div class="comm-channel-card comm-card-wa hover-lift">
            <div class="comm-card-header">
              <div class="comm-brand-symbol wa-symbol-wrap">
                ${r.realWhatsapp}
              </div>
              <div class="comm-channel-status wa-status">
                <span class="live-pulse-dot"></span>
                <span>Online · Instant Replies</span>
              </div>
            </div>

            <div class="comm-card-body">
              <div class="comm-card-kicker">OFFICIAL ORDER & SUPPORT DESK</div>
              <h2 class="comm-channel-title">WhatsApp Chat & Quick Order</h2>
              <div class="comm-tamil-sub tamil-text">வாட்ஸ்அப் நேரடி உரையாடல் & உடனடி ஆர்டர்</div>
              
              <div class="comm-handle-box wa-handle-box">
                <span class="handle-icon">${r.phone}</span>
                <span class="handle-text">+91 98765 43210</span>
                <button class="handle-copy-btn btn-ripple" onclick="window.copyToClipboard('+919876543210', 'WhatsApp number copied!')" title="Copy Number">
                  ${r.clipboard} Copy
                </button>
              </div>

              <p class="comm-channel-desc">
                Chat directly with our master brew team. Place instant orders for traditional Kanji varieties, 
                Sprouts Pulses, and Boiled Eggs, and receive real-time sunrise delivery tracking.
              </p>

              <div class="comm-perks-list">
                <div class="comm-perk-item">
                  <span class="perk-check">${r.check}</span>
                  <span>Instant order placement & live earthenware batch status</span>
                </div>
                <div class="comm-perk-item">
                  <span class="perk-check">${r.check}</span>
                  <span>Custom dietary guidance according to your Siddha body constitution</span>
                </div>
                <div class="comm-perk-item">
                  <span class="perk-check">${r.check}</span>
                  <span>Sunrise morning delivery scheduling (6:00 AM - 9:30 AM)</span>
                </div>
              </div>

              <!-- Primary Action Button -->
              <a href="https://wa.me/919876543210?text=Hi!%20I%20would%20like%20to%20order%20from%20VedicFueloon" 
                 target="_blank" rel="noopener" class="comm-primary-btn wa-primary-btn btn-ripple">
                <span class="btn-brand-icon">${r.realWhatsapp}</span>
                <span>Chat on WhatsApp (+91 98765 43210)</span>
                <span class="btn-arrow">${r.arrowRight}</span>
              </a>

              <!-- Quick Message Prompt Chips -->
              <div class="comm-prompts-section">
                <div class="prompts-label">Quick Order Prompts (Tap to open in WhatsApp):</div>
                <div class="prompts-chips">
                  <a href="https://wa.me/919876543210?text=Hi!%20I%20would%20like%20to%20order%20today%27s%20fresh%20Kanji%20varieties." 
                     target="_blank" rel="noopener" class="prompt-chip">
                    ${r.bowl} Order Today's Kanji
                  </a>
                  <a href="https://wa.me/919876543210?text=Hi!%20I%20want%20to%20order%20Healthy%20Snacks%20(Sprouts%20Pulses%20and%20Boiled%20Egg)." 
                     target="_blank" rel="noopener" class="prompt-chip">
                    ${r.salad} Order Healthy Snacks
                  </a>
                  <a href="https://wa.me/919876543210?text=Hi!%20I%20would%20like%20to%20inquire%20about%20bulk%20catering%20for%20a%20family%20event." 
                     target="_blank" rel="noopener" class="prompt-chip">
                    ${r.wheat} Bulk Event Catering
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- Official Instagram Communication Card -->
          <div class="comm-channel-card comm-card-ig hover-lift">
            <div class="comm-card-header">
              <div class="comm-brand-symbol ig-symbol-wrap">
                ${r.realInstagram}
              </div>
              <div class="comm-channel-status ig-status">
                <span class="live-pulse-dot ig-dot"></span>
                <span>Active Daily · Stories Every Dawn</span>
              </div>
            </div>

            <div class="comm-card-body">
              <div class="comm-card-kicker">OFFICIAL COMMUNITY & DIRECT MESSAGE</div>
              <h2 class="comm-channel-title">Instagram DM & Daily Stories</h2>
              <div class="comm-tamil-sub tamil-text">இன்ஸ்டாகிராம் நேரடி செய்தி & தினசரி கதைகள்</div>
              
              <div class="comm-handle-box ig-handle-box">
                <span class="handle-icon">${r.sparkle}</span>
                <span class="handle-text">@vedicfueloon</span>
                <a href="https://instagram.com/vedicfueloon" target="_blank" rel="noopener" class="handle-copy-btn btn-ripple" title="Visit Profile">
                  ${r.arrowRight} Visit
                </a>
              </div>

              <p class="comm-channel-desc">
                Follow our daily sunrise preparation rituals, watch grandmother's stone-mortar grinding reels, 
                and send us a Direct Message (DM) for queries, reviews, and community stories.
              </p>

              <div class="comm-perks-list">
                <div class="comm-perk-item">
                  <span class="perk-check ig-check">${r.check}</span>
                  <span>Send a Direct Message (DM) anytime for fast replies & menu recommendations</span>
                </div>
                <div class="comm-perk-item">
                  <span class="perk-check ig-check">${r.check}</span>
                  <span>Watch dawn stone-grinding, clay-pot simmering & authentic ingredients</span>
                </div>
                <div class="comm-perk-item">
                  <span class="perk-check ig-check">${r.check}</span>
                  <span>Join 10,000+ passionate traditional food lovers across Tamil Nadu</span>
                </div>
              </div>

              <!-- Primary Action Button -->
              <a href="https://instagram.com/vedicfueloon" 
                 target="_blank" rel="noopener" class="comm-primary-btn ig-primary-btn btn-ripple">
                <span class="btn-brand-icon">${r.realInstagram}</span>
                <span>Send Instagram DM (@vedicfueloon)</span>
                <span class="btn-arrow">${r.arrowRight}</span>
              </a>

              <!-- Quick Message Prompt Chips -->
              <div class="comm-prompts-section">
                <div class="prompts-label">Explore Instagram Highlights (Tap to view):</div>
                <div class="prompts-chips">
                  <a href="https://instagram.com/vedicfueloon" 
                     target="_blank" rel="noopener" class="prompt-chip ig-chip">
                    ${r.pot} Watch Stone Grinding Reels
                  </a>
                  <a href="https://instagram.com/vedicfueloon" 
                     target="_blank" rel="noopener" class="prompt-chip ig-chip">
                    ${r.sparkle} Check Daily Special Batch
                  </a>
                  <a href="https://instagram.com/vedicfueloon" 
                     target="_blank" rel="noopener" class="prompt-chip ig-chip">
                    ${r.heart} Read Customer Testimonials
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Interactive Direct Message to WhatsApp Composer -->
        <div class="comm-composer-card reveal" style="margin-top: var(--space-12);">
          <div class="composer-header">
            <div class="composer-header-title">
              <span class="section-badge" style="background: rgba(37, 211, 102, 0.15); color: #128C7E; border: 1px solid rgba(37, 211, 102, 0.3);">
                <span style="width:14px; height:14px; display:inline-block; vertical-align:middle;">${r.realWhatsapp}</span>
                INSTANT WHATSAPP MESSAGE LAUNCHER
              </span>
              <h3>Compose Your Request Directly to WhatsApp</h3>
              <p class="tamil-text" style="color: var(--gold-700); font-size: var(--text-sm); margin-top: var(--space-1);">
                உங்கள் செய்தியை இங்கே உள்ளிட்டு நேரடியாக வாட்ஸ்அப்பில் அனுப்பவும்
              </p>
            </div>
            <div class="composer-badge-icon">
              ${r.realWhatsapp}
            </div>
          </div>

          <div class="composer-grid">
            <div class="form-group">
              <label class="form-label">Your Name (உங்கள் பெயர்)</label>
              <input type="text" class="form-input" id="waComposerName" placeholder="e.g. Priya Shankar" />
            </div>

            <div class="form-group">
              <label class="form-label">Select Communication Topic (தலைப்பு)</label>
              <select class="form-input" id="waComposerTopic" style="cursor: pointer;">
                <option value="Fresh Kanji Order">Place Fresh Kanji Order (கஞ்சி ஆர்டர்)</option>
                <option value="Healthy Snacks Order">Order Healthy Snacks: Sprouts & Eggs (ஆரோக்கிய சிற்றுண்டிகள்)</option>
                <option value="Traditional Sweets Order">Order Traditional Sweets: Ulundhan Kali (பாரம்பரிய இனிப்புகள்)</option>
                <option value="Dietary Guidance">Dietary & Herbal Nutrition Guidance (ஊட்டச்சத்து விவரம்)</option>
                <option value="Bulk Catering">Bulk Event / Family Gathering Catering (நிகழ்வு ஆர்டர்)</option>
                <option value="General Inquiry">General Question & Feedback (பொதுவான விவரம்)</option>
              </select>
            </div>
          </div>

          <div class="form-group" style="margin-top: var(--space-4);">
            <label class="form-label">Your Message or Order Details (செய்தி விவரம்)</label>
            <textarea class="form-textarea" id="waComposerMessage" rows="3" placeholder="Write the items you need, delivery address, or questions..."></textarea>
          </div>

          <button class="btn btn-lg btn-ripple comm-send-btn" onclick="window.sendToWhatsAppComposer()">
            <span style="width:24px; height:24px; display:inline-block;">${r.realWhatsapp}</span>
            <span>Send Directly to WhatsApp (+91 98765 43210)</span>
            ${r.arrowRight}
          </button>
        </div>

      </div>
    </section>
  `}function $r(){window.copyToClipboard=function(s,n){navigator.clipboard&&navigator.clipboard.writeText?navigator.clipboard.writeText(s).then(()=>{X("Copied!",n||"Copied to clipboard","success")}).catch(()=>{X("Copied!",s,"info")}):X("Contact Number",s,"info")},window.sendToWhatsAppComposer=function(){var f,x,$;const s=((f=document.getElementById("waComposerName"))==null?void 0:f.value.trim())||"Valued Patron",n=((x=document.getElementById("waComposerTopic"))==null?void 0:x.value)||"Fresh Kanji Order",o=($=document.getElementById("waComposerMessage"))==null?void 0:$.value.trim();let l=`Vanakkam VedicFueloon!

*Name:* ${s}
*Topic:* ${n}`;o?l+=`
*Message:* ${o}`:l+=`
*Message:* I would like to order fresh traditional health foods from VedicFueloon.`;const u=`https://wa.me/919876543210?text=${encodeURIComponent(l)}`;X("Opening WhatsApp","Connecting directly to our WhatsApp support...","success"),window.open(u,"_blank")}}function Sr(){return`
    <div class="admin-login-page kolam-bg kolam-dark">
      <div class="admin-login-card">
        <div class="login-logo">
          <img src="./vedicfueloon-logo-clean.png" alt="VedicFueloon" style="max-height:64px; object-fit:contain;" />
          <h2>Admin Panel</h2>
          <p>VedicFueloon Management System</p>
        </div>
        
        <div id="loginError" class="login-error">
          Invalid username or password. Try admin / admin123
        </div>
        
        <div class="form-group">
          <label class="form-label">Username</label>
          <input type="text" class="form-input" id="adminUsername" placeholder="Enter username" value="admin" />
        </div>
        
        <div class="form-group">
          <label class="form-label">Password</label>
          <input type="password" class="form-input" id="adminPassword" placeholder="Enter password" 
                 onkeydown="if(event.key==='Enter') window.adminLogin()" />
        </div>
        
        <button class="btn btn-primary btn-lg" style="width:100%; margin-top:var(--space-4);" onclick="window.adminLogin()">
          ${r.lock} Login to Admin Panel
        </button>
        
        <p style="text-align:center; margin-top:var(--space-6); font-size:var(--text-xs); color:var(--neutral-400);">
          Demo credentials: admin / admin123
        </p>
        
        <div style="text-align:center; margin-top:var(--space-4);">
          <a href="#/" style="font-size:var(--text-sm); color:var(--primary-500);">${r.arrowLeft} Back to Store</a>
        </div>
      </div>
    </div>
  `}function Cr(){window.adminLogin=function(){var l,p;const s=(l=document.getElementById("adminUsername"))==null?void 0:l.value.trim(),n=(p=document.getElementById("adminPassword"))==null?void 0:p.value,o=document.getElementById("loginError");Vt.login(s,n)?location.hash="#/admin/dashboard":o&&o.classList.add("show")}}function Ar(){const s=$e.get(),n=_t.get(),o=$e.getTotalRevenue(),l=$e.getRecentOrders(5),p=Pi(),u=wt.getId(),f=[];for(let _=6;_>=0;_--){const T=new Date;T.setDate(T.getDate()-_);const j=T.toLocaleDateString("en-IN",{weekday:"short"}),K=s.filter(Q=>new Date(Q.createdAt).toDateString()===T.toDateString()&&Q.status!=="cancelled").reduce((Q,me)=>Q+me.total,0);f.push({day:j,revenue:K})}const x=Math.max(...f.map(_=>_.revenue),1),$=s.filter(_=>_.status==="pending").length,L=s.filter(_=>_.status==="processing").length;return`
    <div class="admin-header">
      <div>
        <div style="display:inline-flex; align-items:center; gap:8px; background:rgba(39, 174, 96, 0.15); border:1px solid rgba(39, 174, 96, 0.35); padding:4px 12px; border-radius:9999px; font-size:var(--text-xs); color:#2ecc71; margin-bottom:8px;">
          <span style="width:7px; height:7px; border-radius:50%; background:#2ecc71; box-shadow:0 0 8px #2ecc71; animation:pulse 2s infinite;"></span>
          LIVE STORE SYSTEM ONLINE
        </div>
        <h1>Executive Dashboard</h1>
        <p style="color:var(--cream-300); font-size:var(--text-sm);">Tamil Heritage Health Foods · Store Control Panel</p>
      </div>
      <div class="admin-user">
        <div style="text-align:right;">
          <div style="font-weight:700; color:var(--cream-50);">Master Admin</div>
          <div style="font-size:var(--text-xs); color:var(--gold-400);">VedicFueloon Headquarters</div>
        </div>
        <div class="admin-avatar">VF</div>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon">${r.currency}</div>
        <div class="stat-value">${q(o)}</div>
        <div class="stat-label">Total Revenue</div>
        <span class="stat-change positive">↑ 12.5%</span>
      </div>
      <div class="stat-card">
        <div class="stat-icon">${r.package}</div>
        <div class="stat-value">${s.length}</div>
        <div class="stat-label">Total Orders</div>
        <span class="stat-change positive">↑ 8.3%</span>
      </div>
      <div class="stat-card">
        <div class="stat-icon">${r.users}</div>
        <div class="stat-value">${n.length}</div>
        <div class="stat-label">Customers</div>
        <span class="stat-change positive">↑ 5.1%</span>
      </div>
      <div class="stat-card">
        <div class="stat-icon">${r.bowl}</div>
        <div class="stat-value">${G.length}</div>
        <div class="stat-label">Products</div>
        <span class="stat-change positive">Active</span>
      </div>
    </div>

    <!-- 🌟 DAILY SPECIAL MANAGEMENT CARD -->
    <div class="daily-special-admin-card">
      <div class="special-admin-header">
        <div style="display:flex; align-items:center; gap:var(--space-3);">
          <div class="special-sparkle-icon">${r.sparkle}</div>
          <div>
            <h3 style="margin:0; font-size:var(--text-lg); font-weight:700; color:var(--gold-400);">Daily Special Manager · இன்றைய சிறப்பு கஞ்சி</h3>
            <p style="margin:0; font-size:var(--text-xs); color:var(--cream-300);">Choose the featured Daily Special item — instantly updates across the user store & home page</p>
          </div>
        </div>
        <span class="live-pill-badge">
          <span class="pulse-dot-green"></span>
          LIVE ON CUSTOMER SCREEN
        </span>
      </div>

      <div class="special-admin-grid">
        <!-- Current Active Live Preview -->
        <div class="special-preview-box">
          <div class="special-preview-media">
            <img src="${p.image}" alt="${p.name}" id="adminSpecialImg" />
            <span class="special-preview-price">₹${p.price}</span>
          </div>
          <div class="special-preview-details">
            <span class="special-badge-tag">${r.pot} Active Special</span>
            <h4 id="adminSpecialTitle">${p.name}</h4>
            <div class="tamil-text" id="adminSpecialTamil" style="color:var(--gold-400); font-size:var(--text-sm); font-weight:600;">${p.tamilName}</div>
            <p id="adminSpecialDesc" style="font-size:var(--text-xs); color:var(--cream-300); margin: var(--space-2) 0; line-height:1.5;">${p.description.substring(0,110)}...</p>
            <div style="display:flex; gap:var(--space-4); font-size:var(--text-xs); color:var(--cream-400); margin-top:8px;">
              <span>Stock: <strong style="color:var(--gold-400);">${p.stock} left</strong></span>
              <span>Rating: <strong style="color:var(--gold-400);">⭐ ${p.rating} (${p.reviews})</strong></span>
            </div>
          </div>
        </div>

        <!-- Interactive Selector Controls -->
        <div class="special-controls-box">
          <label class="form-label" style="color:var(--cream-100); font-weight:600; margin-bottom:var(--space-2); display:block;">
            Select Daily Special from Catalog:
          </label>
          <div style="display:flex; gap:var(--space-3); margin-bottom:var(--space-4); flex-wrap:wrap;">
            <select id="adminDailySpecialSelect" class="form-select special-dropdown" onchange="window.previewDailySpecial(this.value)">
              ${G.map(_=>`
                <option value="${_.id}" ${_.id===u?"selected":""}>
                  ${_.name} (${_.tamilName}) — ₹${_.price}
                </option>
              `).join("")}
            </select>
            <button class="btn btn-primary btn-ripple" onclick="window.saveDailySpecial()" style="white-space:nowrap;">
              ${r.check} Set As Daily Special
            </button>
          </div>

          <div style="margin-top:var(--space-3);">
            <div style="font-size:var(--text-xs); color:var(--gold-400); margin-bottom:var(--space-2); text-transform:uppercase; letter-spacing:0.05em; font-weight:700;">
              ⚡ Quick Select Popular Kanji:
            </div>
            <div class="quick-pick-pills">
              ${[1,2,3,10,15,20,23].map(_=>{const T=G.find(H=>H.id===_);return T?`
                  <button class="quick-pick-pill ${T.id===u?"active":""}" 
                          onclick="window.quickSelectDailySpecial(${T.id})">
                    <span>${T.name}</span>
                    <span class="pill-price">₹${T.price}</span>
                  </button>
                `:""}).join("")}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="dashboard-grid">
      <!-- Revenue Chart -->
      <div class="chart-container">
        <div class="chart-header">
          <h3>${r.barChart} Revenue Overview</h3>
          <span style="font-size:var(--text-sm); color:var(--neutral-500);">Last 7 days</span>
        </div>
        <div class="bar-chart">
          ${f.map(_=>`
            <div class="bar">
              <div class="bar-value">${_.revenue>0?q(_.revenue):"-"}</div>
              <div class="bar-fill" style="height: ${Math.max(4,_.revenue/x*160)}px;"></div>
              <div class="bar-label">${_.day}</div>
            </div>
          `).join("")}
        </div>
      </div>

      <!-- Quick Stats -->
      <div>
        <!-- Pending Orders Alert -->
        ${$>0?`
        <div style="background: var(--warning-light); border: 1px solid var(--warning); border-radius: var(--radius-xl); padding: var(--space-5); margin-bottom: var(--space-6);">
          <div style="display:flex; align-items:center; gap:var(--space-3);">
            <span style="font-size:var(--text-2xl); color:var(--warning);">${r.alert}</span>
            <div>
              <div style="font-weight:700; color:var(--neutral-900);">${$} Pending Order${$>1?"s":""}</div>
              <div style="font-size:var(--text-sm); color:var(--neutral-600);">Needs your attention</div>
            </div>
          </div>
        </div>
        `:""}
        
        ${L>0?`
        <div style="background: var(--info-light); border: 1px solid var(--info); border-radius: var(--radius-xl); padding: var(--space-5); margin-bottom: var(--space-6);">
          <div style="display:flex; align-items:center; gap:var(--space-3);">
            <span style="font-size:var(--text-2xl); color:var(--primary-600);">${r.package}</span>
            <div>
              <div style="font-weight:700; color:var(--neutral-900);">${L} Processing</div>
              <div style="font-size:var(--text-sm); color:var(--neutral-600);">Being prepared</div>
            </div>
          </div>
        </div>
        `:""}

        <!-- Low Stock Alert -->
        <div class="chart-container">
          <div class="chart-header">
            <h3>${r.lightning} Low Stock Items</h3>
          </div>
          ${G.filter(_=>_.stock<25).slice(0,5).map(_=>`
            <div style="display:flex; justify-content:space-between; align-items:center; padding:var(--space-3) 0; border-bottom:1px solid var(--cream-100);">
              <div>
                <div style="font-weight:600; font-size:var(--text-sm);">${_.name}</div>
                <div class="tamil-text" style="font-size:var(--text-xs); color:var(--orange-500);">${_.tamilName}</div>
              </div>
              <span class="status-badge ${_.stock<15?"status-outstock":"status-lowstock"}">${_.stock} left</span>
            </div>
          `).join("")}
        </div>
      </div>
    </div>

    <!-- Recent Orders Table -->
    <div class="admin-table-container" style="margin-top: var(--space-8);">
      <div class="admin-table-header">
        <h3>${r.clipboard} Recent Orders</h3>
        <button class="btn btn-sm btn-outline" onclick="window.adminNavigate('orders')">View All →</button>
      </div>
      <table class="admin-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Items</th>
            <th>Total</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          ${l.length>0?l.map(_=>`
            <tr>
              <td><strong>${_.id}</strong></td>
              <td>${_.customer.name}</td>
              <td>${_.items.length} item${_.items.length>1?"s":""}</td>
              <td><strong>${q(_.total)}</strong></td>
              <td><span class="status-badge status-${_.status}">${_.status.charAt(0).toUpperCase()+_.status.slice(1)}</span></td>
              <td style="font-size:var(--text-xs); color:var(--neutral-500);">${lt(_.createdAt)}</td>
            </tr>
          `).join(""):`
            <tr><td colspan="6" style="text-align:center; padding:var(--space-8); color:var(--neutral-400);">No orders yet</td></tr>
          `}
        </tbody>
      </table>
    </div>
  `}window.previewDailySpecial=function(s){const n=G.find(f=>f.id===parseInt(s));if(!n)return;const o=document.getElementById("adminSpecialImg"),l=document.getElementById("adminSpecialTitle"),p=document.getElementById("adminSpecialTamil"),u=document.getElementById("adminSpecialDesc");o&&(o.src=n.image),l&&(l.textContent=n.name),p&&(p.textContent=n.tamilName),u&&(u.textContent=n.description.substring(0,110)+"...")};window.saveDailySpecial=function(){const s=document.getElementById("adminDailySpecialSelect");if(!s)return;const n=parseInt(s.value);wt.setId(n);const o=G.find(l=>l.id===n);X("🌟 Daily Special Updated!",`${o?o.name:"Item"} is now live for all users on the store!`,"success"),window.adminNavigate("dashboard")};window.quickSelectDailySpecial=function(s){const n=parseInt(s);wt.setId(n);const o=G.find(l=>l.id===n);X("🌟 Daily Special Set!",`${o?o.name:"Item"} is now active as today's Daily Special!`,"success"),window.adminNavigate("dashboard")};let je=[...G];function Er(){const s=wt.getId();return`
    <div class="admin-header">
      <div>
        <h1>Products</h1>
        <p style="color:var(--neutral-500); font-size:var(--text-sm);">Manage your product catalog & Daily Special</p>
      </div>
      <button class="btn btn-primary" onclick="window.openProductModal()">+ Add Product</button>
    </div>

    <div class="admin-table-container">
      <div class="admin-table-header">
        <h3>${r.bowl} All Products (${je.length})</h3>
        <div class="admin-table-search">
          <input type="text" class="search-input" placeholder="Search products..." 
                 id="adminProductSearch" oninput="window.adminSearchProducts(this.value)" />
        </div>
      </div>
      <div style="overflow-x:auto;">
        <table class="admin-table" id="adminProductsTable">
          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Rating</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${je.map(n=>`
              <tr data-product-id="${n.id}">
                <td>
                  <div class="table-product">
                    <div class="table-product-img" style="background: linear-gradient(135deg, #2D5E3F, #1B3A2D); display:flex; align-items:center; justify-content:center; color:var(--gold-400); overflow:hidden; border-radius:var(--radius-md);">
                      ${n.image?`<img src="${n.image}" alt="${n.name}" style="width:100%;height:100%;object-fit:cover;" />`:r.bowl}
                    </div>
                    <div>
                      <div class="table-product-name" style="display:flex; align-items:center; gap:6px;">
                        <span>${n.name}</span>
                        ${n.id===s?'<span class="badge" style="background:rgba(212,160,23,0.25); color:var(--gold-400); border:1px solid rgba(212,160,23,0.5); font-size:10px; font-weight:700;">🌟 DAILY SPL</span>':""}
                      </div>
                      <div class="table-product-tamil">${n.tamilName}</div>
                    </div>
                  </div>
                </td>
                <td><span class="badge" style="background:var(--cream-100); color:var(--neutral-700);">${n.category}</span></td>
                <td><strong>${q(n.price)}</strong> <span style="color:var(--neutral-400); text-decoration:line-through; font-size:var(--text-xs);">${q(n.originalPrice)}</span></td>
                <td>${n.stock}</td>
                <td><span style="color:var(--gold-500);">${r.star}</span> ${n.rating}</td>
                <td>
                  <span class="status-badge ${n.stock>25?"status-instock":n.stock>10?"status-lowstock":"status-outstock"}">
                    ${n.stock>25?"In Stock":n.stock>10?"Low Stock":"Critical"}
                  </span>
                </td>
                <td>
                  <div class="table-actions">
                    <button class="table-action-btn ${n.id===s?"active":""}" style="${n.id===s?"background:rgba(212,160,23,0.25); color:var(--gold-400);":""}" onclick="window.setAsDailySpecial(${n.id})" title="${n.id===s?"Active Daily Special":"Set as Daily Special"}">${r.sparkle}</button>
                    <button class="table-action-btn" onclick="window.editProduct(${n.id})" title="Edit">${r.edit}</button>
                    <button class="table-action-btn delete" onclick="window.deleteProduct(${n.id})" title="Delete">${r.trash}</button>
                  </div>
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </div>

    <!-- Product Modal -->
    <div class="modal-overlay" id="productModal">
      <div class="modal" style="max-width:600px;">
        <div class="modal-header">
          <h3 id="productModalTitle">Add New Product</h3>
          <button class="modal-close" onclick="window.closeProductModal()">${r.x}</button>
        </div>
        <input type="hidden" id="editProductId" value="" />
        
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:var(--space-4);">
          <div class="form-group">
            <label class="form-label">Product Name *</label>
            <input type="text" class="form-input" id="prodName" placeholder="e.g., Ragi Kanji" />
          </div>
          <div class="form-group">
            <label class="form-label">Tamil Name *</label>
            <input type="text" class="form-input" id="prodTamilName" placeholder="e.g., ராகி கஞ்சி" />
          </div>
        </div>
        
        <div class="form-group">
          <label class="form-label">Category *</label>
          <select class="form-select" id="prodCategory">
            <option value="kanji">Kanji Varieties</option>
            <option value="daily-spl">Daily Special</option>
            <option value="solid-eats">Healthy Snacks</option>
            <option value="traditional-sweets">Traditional Sweets</option>
          </select>
        </div>
        
        <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:var(--space-4);">
          <div class="form-group">
            <label class="form-label">Price (₹) *</label>
            <input type="number" class="form-input" id="prodPrice" placeholder="99" />
          </div>
          <div class="form-group">
            <label class="form-label">Original Price (₹)</label>
            <input type="number" class="form-input" id="prodOrigPrice" placeholder="149" />
          </div>
          <div class="form-group">
            <label class="form-label">Stock *</label>
            <input type="number" class="form-input" id="prodStock" placeholder="50" />
          </div>
        </div>
        
        <div class="form-group">
          <label class="form-label">Description</label>
          <textarea class="form-textarea" id="prodDesc" placeholder="Product description..." rows="3"></textarea>
        </div>
        
        <div style="display:flex; gap:var(--space-4); margin-top:var(--space-4);">
          <button class="btn btn-primary" style="flex:1;" onclick="window.saveProduct()">Save Product</button>
          <button class="btn btn-outline" onclick="window.closeProductModal()">Cancel</button>
        </div>
      </div>
    </div>
  `}function Tr(){window.openProductModal=function(s=null){const n=document.getElementById("productModal"),o=document.getElementById("productModalTitle");n&&(s?(o.textContent="Edit Product",document.getElementById("editProductId").value=s.id,document.getElementById("prodName").value=s.name,document.getElementById("prodTamilName").value=s.tamilName,document.getElementById("prodCategory").value=s.category,document.getElementById("prodPrice").value=s.price,document.getElementById("prodOrigPrice").value=s.originalPrice,document.getElementById("prodStock").value=s.stock,document.getElementById("prodDesc").value=s.description):(o.textContent="Add New Product",document.getElementById("editProductId").value="",["prodName","prodTamilName","prodPrice","prodOrigPrice","prodStock","prodDesc"].forEach(l=>{const p=document.getElementById(l);p&&(p.value="")})),n.classList.add("active"))},window.closeProductModal=function(){var s;(s=document.getElementById("productModal"))==null||s.classList.remove("active")},window.editProduct=function(s){const n=je.find(o=>o.id===s);n&&window.openProductModal(n)},window.deleteProduct=function(s){confirm("Are you sure you want to delete this product?")&&(je=je.filter(n=>n.id!==s),window.adminNavigate&&window.adminNavigate("products"),X("Deleted","Product removed successfully","warning"))},window.saveProduct=function(){var $,L,_,T,j,H,K,Q;const s=($=document.getElementById("editProductId"))==null?void 0:$.value,n=(L=document.getElementById("prodName"))==null?void 0:L.value.trim(),o=(_=document.getElementById("prodTamilName"))==null?void 0:_.value.trim(),l=(T=document.getElementById("prodCategory"))==null?void 0:T.value,p=parseInt((j=document.getElementById("prodPrice"))==null?void 0:j.value),u=parseInt((H=document.getElementById("prodOrigPrice"))==null?void 0:H.value)||p,f=parseInt((K=document.getElementById("prodStock"))==null?void 0:K.value),x=(Q=document.getElementById("prodDesc"))==null?void 0:Q.value.trim();if(!n||!o||!p||!f){X("Missing Fields","Please fill in all required fields","error");return}if(s){const me=je.find(ae=>ae.id===parseInt(s));me&&Object.assign(me,{name:n,tamilName:o,category:l,price:p,originalPrice:u,stock:f,description:x}),X("Updated Successfully",`${n} updated successfully`,"success")}else{const me={id:Date.now(),name:n,tamilName:o,category:l,price:p,originalPrice:u,description:x,nutrition:{calories:"160",protein:"5g",fiber:"4g",iron:"15%",calcium:"10%",vitB:"15%"},rating:5,reviews:1,badge:"new",inStock:!0,stock:f,image:""};je.unshift(me),X("Added Successfully",`${n} added to catalog`,"success")}window.closeProductModal(),window.adminNavigate&&window.adminNavigate("products")},window.adminSearchProducts=function(s){const n=s.toLowerCase();document.querySelectorAll("#adminProductsTable tbody tr").forEach(l=>{const p=l.textContent.toLowerCase();l.style.display=p.includes(n)?"":"none"})},window.setAsDailySpecial=function(s){wt.setId(s);const n=je.find(o=>o.id===s);X("🌟 Daily Special Set!",`${n?n.name:"Product"} is now active as today's Daily Special!`,"success"),window.adminNavigate&&window.adminNavigate("products")}}function Ir(){const s=$e.get(),n={all:s.length,pending:s.filter(o=>o.status==="pending").length,processing:s.filter(o=>o.status==="processing").length,delivered:s.filter(o=>o.status==="delivered").length,cancelled:s.filter(o=>o.status==="cancelled").length};return`
    <div class="admin-header">
      <div>
        <h1>Orders</h1>
        <p style="color:var(--neutral-500); font-size:var(--text-sm);">Manage customer orders</p>
      </div>
    </div>

    <!-- Status Filter Tabs -->
    <div class="tabs" style="margin-bottom: var(--space-6);">
      <button class="tab-btn active" onclick="window.filterAdminOrders('all', this)">All (${n.all})</button>
      <button class="tab-btn" onclick="window.filterAdminOrders('pending', this)">${r.hourglass} Pending (${n.pending})</button>
      <button class="tab-btn" onclick="window.filterAdminOrders('processing', this)">${r.package} Processing (${n.processing})</button>
      <button class="tab-btn" onclick="window.filterAdminOrders('delivered', this)">${r.checkCircle} Delivered (${n.delivered})</button>
      <button class="tab-btn" onclick="window.filterAdminOrders('cancelled', this)">${r.x} Cancelled (${n.cancelled})</button>
    </div>

    <div class="admin-table-container">
      <div class="admin-table-header">
        <h3>${r.clipboard} Orders</h3>
        <div class="admin-table-search">
          <input type="text" class="search-input" placeholder="Search orders..." 
                 oninput="window.adminSearchOrders(this.value)" />
        </div>
      </div>
      <div style="overflow-x:auto;">
        <table class="admin-table" id="adminOrdersTable">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Phone</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${s.length>0?s.map(o=>`
              <tr data-order-id="${o.id}" data-status="${o.status}">
                <td><strong>${o.id}</strong></td>
                <td>
                  <div style="font-weight:600;">${o.customer.name}</div>
                  <div style="font-size:var(--text-xs); color:var(--neutral-400); max-width:150px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${o.customer.address}</div>
                </td>
                <td style="font-size:var(--text-sm);">${o.customer.phone}</td>
                <td>
                  <div style="font-size:var(--text-sm);">
                    ${o.items.map(l=>`${l.name} ×${l.qty}`).join("<br/>")}
                  </div>
                </td>
                <td><strong>${q(o.total)}</strong></td>
                <td>
                  <select class="form-select" style="padding:var(--space-1) var(--space-3); font-size:var(--text-xs); min-width:120px; padding-right:var(--space-8);"
                          onchange="window.updateOrderStatus('${o.id}', this.value)">
                    <option value="pending" ${o.status==="pending"?"selected":""}>Pending</option>
                    <option value="processing" ${o.status==="processing"?"selected":""}>Processing</option>
                    <option value="delivered" ${o.status==="delivered"?"selected":""}>Delivered</option>
                    <option value="cancelled" ${o.status==="cancelled"?"selected":""}>Cancelled</option>
                  </select>
                </td>
                <td style="font-size:var(--text-xs); color:var(--neutral-500); white-space:nowrap;">${lt(o.createdAt)}</td>
                <td>
                  <div class="table-actions">
                    <button class="table-action-btn" onclick="window.viewOrderDetail('${o.id}')" title="View Details">${r.eye}</button>
                  </div>
                </td>
              </tr>
            `).join(""):`
              <tr><td colspan="8" style="text-align:center; padding:var(--space-8); color:var(--neutral-400);">No orders yet</td></tr>
            `}
          </tbody>
        </table>
      </div>
    </div>

    <!-- Order Detail Modal -->
    <div class="modal-overlay" id="orderDetailModal">
      <div class="modal" style="max-width:600px;">
        <div class="modal-header">
          <h3>Order Details</h3>
          <button class="modal-close" onclick="document.getElementById('orderDetailModal').classList.remove('active')">${r.x}</button>
        </div>
        <div id="orderDetailContent"></div>
      </div>
    </div>
  `}function Or(){window.updateOrderStatus=function(s,n){$e.updateStatus(s,n),X("Status Updated",`Order ${s} → ${n}`,"success")},window.filterAdminOrders=function(s,n){document.querySelectorAll("#adminOrdersTable tbody tr").forEach(l=>{s==="all"?l.style.display="":l.style.display=l.dataset.status===s?"":"none"}),document.querySelectorAll(".tabs .tab-btn").forEach(l=>l.classList.remove("active")),n&&n.classList.add("active")},window.adminSearchOrders=function(s){const n=s.toLowerCase();document.querySelectorAll("#adminOrdersTable tbody tr").forEach(o=>{o.style.display=o.textContent.toLowerCase().includes(n)?"":"none"})},window.viewOrderDetail=function(s){var l;const n=$e.getById(s);if(!n)return;const o=document.getElementById("orderDetailContent");o&&(o.innerHTML=`
        <div style="margin-bottom:var(--space-4);">
          <div style="display:flex; justify-content:space-between; margin-bottom:var(--space-3);">
            <span style="color:var(--neutral-500);">Order ID</span>
            <strong>${n.id}</strong>
          </div>
          <div style="display:flex; justify-content:space-between; margin-bottom:var(--space-3);">
            <span style="color:var(--neutral-500);">Customer</span>
            <strong>${n.customer.name}</strong>
          </div>
          <div style="display:flex; justify-content:space-between; margin-bottom:var(--space-3);">
            <span style="color:var(--neutral-500);">Phone</span>
            <span>${n.customer.phone}</span>
          </div>
          <div style="display:flex; justify-content:space-between; margin-bottom:var(--space-3);">
            <span style="color:var(--neutral-500);">Address</span>
            <span style="text-align:right; max-width:250px;">${n.customer.address}</span>
          </div>
        </div>
        
        <h4 style="margin:var(--space-4) 0 var(--space-3);">Items</h4>
        ${n.items.map(p=>`
          <div style="display:flex; justify-content:space-between; padding:var(--space-2) 0; border-bottom:1px solid var(--cream-100);">
            <span>${p.name} × ${p.qty}</span>
            <strong>${q(p.price*p.qty)}</strong>
          </div>
        `).join("")}
        
        <div style="margin-top:var(--space-4); padding-top:var(--space-4); border-top:2px solid var(--cream-200);">
          <div style="display:flex; justify-content:space-between; margin-bottom:var(--space-2);">
            <span>Subtotal</span><span>${q(n.subtotal)}</span>
          </div>
          <div style="display:flex; justify-content:space-between; margin-bottom:var(--space-2);">
            <span>Delivery</span><span>${n.delivery===0?"FREE":q(n.delivery)}</span>
          </div>
          <div style="display:flex; justify-content:space-between; font-size:var(--text-lg); font-weight:700; color:var(--primary-700);">
            <span>Total</span><span>${q(n.total)}</span>
          </div>
        </div>
        
        <div style="margin-top:var(--space-4); display:flex; justify-content:space-between; align-items:center;">
          <span style="color:var(--neutral-500); font-size:var(--text-sm);">${lt(n.createdAt)}</span>
          <span class="status-badge status-${n.status}">${n.status}</span>
        </div>
      `),(l=document.getElementById("orderDetailModal"))==null||l.classList.add("active")}}function Pr(){const s=_t.get();return`
    <div class="admin-header">
      <div>
        <h1>Customers</h1>
        <p style="color:var(--neutral-500); font-size:var(--text-sm);">View and manage your customer base</p>
      </div>
      <div style="display:flex; gap:var(--space-3); align-items:center;">
        <span style="font-size:var(--text-sm); color:var(--neutral-500);">Total: <strong>${s.length}</strong></span>
      </div>
    </div>

    <div class="admin-table-container">
      <div class="admin-table-header">
        <h3>${r.users} All Customers</h3>
        <div class="admin-table-search">
          <input type="text" class="search-input" placeholder="Search by name, phone, ID..." 
                 oninput="window.adminSearchCustomers(this.value)" />
        </div>
      </div>
      <div style="overflow-x:auto;">
        <table class="admin-table" id="adminCustomersTable">
          <thead>
            <tr>
              <th>Customer ID</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Orders</th>
              <th>Total Spent</th>
              <th>Last Order</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${s.length>0?s.map(n=>`
              <tr>
                <td><strong style="font-size:var(--text-xs);">${n.id}</strong></td>
                <td>
                  <div style="display:flex; align-items:center; gap:var(--space-2);">
                    <div style="width:36px; height:36px; border-radius:50%; background:var(--primary-100); color:var(--primary-700); display:flex; align-items:center; justify-content:center; font-weight:700; font-size:var(--text-sm); flex-shrink:0;">
                      ${n.name.charAt(0)}
                    </div>
                    <strong>${n.name}</strong>
                  </div>
                </td>
                <td style="font-size:var(--text-sm);">${n.phone}</td>
                <td style="font-size:var(--text-xs); color:var(--neutral-500); max-width:200px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${n.address}</td>
                <td><span class="badge" style="background:var(--primary-50); color:var(--primary-700);">${n.orders.length}</span></td>
                <td><strong style="color:var(--primary-700);">${q(n.totalSpent)}</strong></td>
                <td style="font-size:var(--text-xs); color:var(--neutral-500);">${lt(n.lastOrder)}</td>
                <td>
                  <div class="table-actions">
                    <button class="table-action-btn" onclick="window.viewCustomerDetail('${n.id}')" title="View Details">${r.eye}</button>
                  </div>
                </td>
              </tr>
            `).join(""):`
              <tr><td colspan="8" style="text-align:center; padding:var(--space-8); color:var(--neutral-400);">No customers yet</td></tr>
            `}
          </tbody>
        </table>
      </div>
    </div>

    <!-- Customer Detail Modal -->
    <div class="modal-overlay" id="customerDetailModal">
      <div class="modal" style="max-width:600px;">
        <div class="modal-header">
          <h3>Customer Details</h3>
          <button class="modal-close" onclick="document.getElementById('customerDetailModal').classList.remove('active')">${r.x}</button>
        </div>
        <div id="customerDetailContent"></div>
      </div>
    </div>
  `}function jr(){window.adminSearchCustomers=function(s){const n=s.toLowerCase();document.querySelectorAll("#adminCustomersTable tbody tr").forEach(o=>{o.style.display=o.textContent.toLowerCase().includes(n)?"":"none"})},window.viewCustomerDetail=function(s){var p;const n=_t.getById(s);if(!n)return;const o=n.orders.map(u=>$e.getById(u)).filter(Boolean),l=document.getElementById("customerDetailContent");l&&(l.innerHTML=`
        <div style="display:flex; align-items:center; gap:var(--space-4); margin-bottom:var(--space-6);">
          <div style="width:64px; height:64px; border-radius:50%; background:var(--primary-100); color:var(--primary-700); display:flex; align-items:center; justify-content:center; font-weight:700; font-size:var(--text-2xl); flex-shrink:0;">
            ${n.name.charAt(0)}
          </div>
          <div>
            <h3 style="margin-bottom:var(--space-1); font-size:var(--text-xl);">${n.name}</h3>
            <span style="font-size:var(--text-sm); color:var(--neutral-500);">${n.id}</span>
          </div>
        </div>
        
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:var(--space-4); margin-bottom:var(--space-6);">
          <div style="background:var(--cream-50); padding:var(--space-4); border-radius:var(--radius-md);">
            <div style="font-size:var(--text-xs); color:var(--neutral-500); margin-bottom:var(--space-1);">Phone</div>
            <div style="font-weight:600;">${n.phone}</div>
          </div>
          <div style="background:var(--cream-50); padding:var(--space-4); border-radius:var(--radius-md);">
            <div style="font-size:var(--text-xs); color:var(--neutral-500); margin-bottom:var(--space-1);">Total Spent</div>
            <div style="font-weight:700; color:var(--primary-700); font-size:var(--text-lg);">${q(n.totalSpent)}</div>
          </div>
          <div style="background:var(--cream-50); padding:var(--space-4); border-radius:var(--radius-md); grid-column:1/-1;">
            <div style="font-size:var(--text-xs); color:var(--neutral-500); margin-bottom:var(--space-1);">Address</div>
            <div style="font-size:var(--text-sm);">${n.address}</div>
          </div>
        </div>
        
        <h4 style="margin-bottom:var(--space-3);">Order History (${o.length})</h4>
        ${o.length>0?o.map(u=>`
          <div style="display:flex; justify-content:space-between; align-items:center; padding:var(--space-3); border-bottom:1px solid var(--cream-100);">
            <div>
              <div style="font-weight:600; font-size:var(--text-sm);">${u.id}</div>
              <div style="font-size:var(--text-xs); color:var(--neutral-500);">${lt(u.createdAt)}</div>
            </div>
            <div style="text-align:right;">
              <div style="font-weight:600;">${q(u.total)}</div>
              <span class="status-badge status-${u.status}" style="font-size:10px;">${u.status}</span>
            </div>
          </div>
        `).join(""):'<p style="color:var(--neutral-400); font-size:var(--text-sm);">No orders found</p>'}
        
        <div style="margin-top:var(--space-4); text-align:center;">
          <span style="font-size:var(--text-xs); color:var(--neutral-400);">Customer since ${lt(n.joinedAt)}</span>
        </div>
      `),(p=document.getElementById("customerDetailModal"))==null||p.classList.add("active")}}const Ii=document.getElementById("app");function Dr(s){const n=s.replace("#","")||"/",[o,l]=n.split("?"),p={};return l&&l.split("&").forEach(u=>{const[f,x]=u.split("=");p[f]=decodeURIComponent(x)}),{path:o,params:p}}function Oi(){const{path:s,params:n}=Dr(location.hash);if(s.startsWith("/admin")){Lr(s);return}let o="",l="";switch(!0){case(s==="/"||s===""):o=pr(),l="home";break;case(s==="/shop"||s==="/products"||s==="/kanji"||s==="/menu"):o=hr(n),l="shop";break;case s.startsWith("/product/"):const u=s.split("/")[2];o=mr(u),l="shop";break;case s==="/cart":o=fr(),l="cart";break;case s==="/checkout":o=yr(),l="checkout";break;case s==="/about":o=kr(),l="about";break;case s==="/contact":o=xr(),l="contact";break;default:o=`
        <section class="section">
          <div class="container">
            <div class="empty-state">
              <div class="empty-icon" style="color: var(--neutral-400);">${r.search}</div>
              <h3>Page Not Found</h3>
              <p>The page you're looking for doesn't exist.</p>
              <a href="#/" class="btn btn-primary btn-ripple">Go Home</a>
            </div>
          </div>
        </section>
      `}Ii.innerHTML=`
    ${rr()}
    <main id="pageContent" class="page-enter">
      ${o}
    </main>
    ${lr()}
  `,dr(l),Ts(),Nr(),Mr();const p=document.getElementById("navbarLogoVideo");p&&typeof p.play=="function"&&p.paused&&p.play().catch(()=>{}),l==="home"?ur():(window._heroVideoInterval&&(clearInterval(window._heroVideoInterval),window._heroVideoInterval=null),window._heroSliderInterval&&(clearInterval(window._heroSliderInterval),window._heroSliderInterval=null)),window.scrollTo({top:0,behavior:"instant"})}function Lr(s,n){if(s==="/admin"||s==="/admin/login"){if(Vt.isLoggedIn()){location.hash="#/admin/dashboard";return}Ii.innerHTML=Sr();return}if(!Vt.isLoggedIn()){location.hash="#/admin/login";return}let o="",l="";switch(s){case"/admin/dashboard":o=Ar(),l="dashboard";break;case"/admin/products":o=Er(),l="products";break;case"/admin/orders":o=Ir(),l="orders";break;case"/admin/customers":o=Pr(),l="customers";break;default:location.hash="#/admin/dashboard";return}Ii.innerHTML=`
    <div class="admin-layout">
      <aside class="admin-sidebar">
        <div class="admin-brand">
          <img src="./vedicfueloon logo.jpeg" alt="VedicFueloon" />
          <div>
            <div class="admin-brand-text">Vedic<span>Fueloon</span></div>
            <span class="admin-brand-sub">Admin Panel</span>
          </div>
        </div>
        
        <nav class="admin-nav">
          <button class="admin-nav-item ${l==="dashboard"?"active":""}" onclick="window.adminNavigate('dashboard')">
            <span class="nav-icon">${r.barChart}</span> Dashboard
          </button>
          <button class="admin-nav-item ${l==="products"?"active":""}" onclick="window.adminNavigate('products')">
            <span class="nav-icon">${r.bowl}</span> Products
          </button>
          <button class="admin-nav-item ${l==="orders"?"active":""}" onclick="window.adminNavigate('orders')">
            <span class="nav-icon">${r.package}</span> Orders
          </button>
          <button class="admin-nav-item ${l==="customers"?"active":""}" onclick="window.adminNavigate('customers')">
            <span class="nav-icon">${r.users}</span> Customers
          </button>
          
          <div class="admin-nav-divider"></div>
          
          <a class="admin-nav-item" href="#/" style="text-decoration:none;">
            <span class="nav-icon">${r.home}</span> View Store
          </a>
        </nav>
        
        <button class="admin-logout" onclick="window.adminLogout()">
          <span class="nav-icon">${r.logOut}</span> Logout
        </button>
      </aside>
      
      <main class="admin-main page-enter">
        ${o}
      </main>
    </div>
  `}window.adminNavigate=function(s){location.hash=`#/admin/${s}`};window.adminLogout=function(){Vt.logout(),location.hash="#/admin/login",X("Logged Out","See you soon!","success")};window.navigateTo=function(s){Oi()};window.addToCart=function(s,n=1){const o=As(s);o&&(Z.add(o,n),Es(),X("Added to Cart!",`${o.name} × ${n}`,"success"))};window.showToastGlobal=X;window.initReveal=Ts;function Nr(){const s=document.getElementById("mobileToggle"),n=document.getElementById("navLinks");if(s&&n){const o=()=>{s.classList.remove("active"),s.setAttribute("aria-expanded","false"),n.classList.remove("mobile-open")};s.addEventListener("click",l=>{l.stopPropagation();const p=s.classList.toggle("active");s.setAttribute("aria-expanded",p?"true":"false"),n.classList.toggle("mobile-open",p)}),n.querySelectorAll(".nav-link").forEach(l=>{l.addEventListener("click",o)}),document.addEventListener("click",l=>{!l.target.closest("#navbar")&&n.classList.contains("mobile-open")&&o()}),document.addEventListener("keydown",l=>{l.key==="Escape"&&n.classList.contains("mobile-open")&&o()}),window.addEventListener("resize",()=>{window.innerWidth>768&&n.classList.contains("mobile-open")&&o()})}}function Mr(){document.querySelectorAll(".product-card").forEach(s=>{s.addEventListener("click",n=>{if(n.target.closest(".card-add-btn")||n.target.closest(".card-wishlist"))return;const o=s.dataset.productId;o&&(location.hash=`#/product/${o}`)})})}window.addEventListener("cart-updated",()=>{Es()});document.addEventListener("dblclick",s=>{s.target.closest("#mainNavBrand, .navbar-brand, .brand-name, .brand-info")&&(s.preventDefault(),s.stopPropagation(),location.hash="#/admin",X("Admin Portal","Opening Admin Panel...","info"))});window.addEventListener("scroll",()=>{const s=document.getElementById("navbar");s&&s.classList.toggle("scrolled",window.scrollY>30)},{passive:!0});function $s(){nr(),gr(),vr(),br(),_r(),$r(),Cr(),Tr(),Or(),jr(),window.addEventListener("hashchange",Oi),Oi()}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",$s):$s();
