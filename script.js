document.getElementById('year').textContent=new Date().getFullYear();
/* SIDE MENU */
(function(){
  const panel=document.getElementById('navLinks');
  const btn=document.getElementById('menuBtn');
  const close=document.getElementById('menuClose');
  const backdrop=document.getElementById('menuBackdrop');
  if(!panel||!btn||!close||!backdrop) return;
  const openMenu=()=>{panel.classList.add('open');backdrop.classList.add('open');btn.setAttribute('aria-expanded','true');panel.setAttribute('aria-hidden','false');document.body.classList.add('menu-open')};
  const closeMenu=()=>{panel.classList.remove('open');backdrop.classList.remove('open');btn.setAttribute('aria-expanded','false');panel.setAttribute('aria-hidden','true');document.body.classList.remove('menu-open')};
  btn.addEventListener('click',openMenu);
  close.addEventListener('click',closeMenu);
  backdrop.addEventListener('click',closeMenu);
  panel.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
  document.addEventListener('keydown',e=>{if(e.key==='Escape') closeMenu()});
})();



/*
HOW TO ADD ACHIEVEMENT / REVIEW IMAGES:
Replace:
<div class="photo-slot"><span>Achievement Image 01</span></div>
with:
<div class="photo-slot"><img src="images/achievement1.jpg" alt="Achievement"></div>

Same method for review images.
*/

/* PREMIUM PAGE LOADER + SCROLL ANIMATIONS */
(function(){
  document.body.classList.add('loading');
  const loader=document.getElementById('page-preloader');
  const finish=()=>{
    setTimeout(()=>{
      document.body.classList.remove('loading');
      if(loader) loader.classList.add('is-hidden');
    },1600);
  };
  if(document.readyState==='complete') finish();
  else window.addEventListener('load',finish,{once:true});
  setTimeout(finish,6000); // never leave the visitor stuck on the loader

  const selectors=[
    '.section-label','.section-title','.about-grid>div','.split-card',
    '.why-head','.for-grid>div','.center-head','.gallery .photo-slot',
    '.cta-wrap','.footer-grid>div'
  ];
  document.querySelectorAll(selectors.join(',')).forEach((el,i)=>{
    if(el.closest('.hero')) return;
    el.classList.add('reveal-ready');
    if(el.matches('.about-grid>div:first-child,.for-grid>div:first-child')) el.classList.add('reveal-left');
    if(el.matches('.about-grid>div:nth-child(2),.for-grid>div:nth-child(2)')) el.classList.add('reveal-right');
    if(el.matches('.gallery .photo-slot')) el.style.transitionDelay=(Math.min(i%5,4)*.06)+'s';
  });
  const io=new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){entry.target.classList.add('is-visible');io.unobserve(entry.target)}
    });
  },{threshold:.12,rootMargin:'0px 0px -40px 0px'});
  document.querySelectorAll('.reveal-ready,.reveal-left,.reveal-right').forEach(el=>io.observe(el));

  const glow=document.querySelector('.cursor-glow');
  if(glow && matchMedia('(pointer:fine)').matches){
    window.addEventListener('pointermove',e=>{glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px'},{passive:true});
  }
})();
