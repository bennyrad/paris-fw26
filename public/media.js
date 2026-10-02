const videoLabel = s => s.videoKind === 'analysis' ? 'Analysis coverage' : s.videoKind === 'edited_coverage' ? 'Edited collection coverage' : 'SS27 runway film';

export function mediaSources(s, esc, safeUrl) {
  const links = new Map();
  if (s.video) links.set(`https://www.youtube.com/watch?v=${s.video}`, s.videoTitle || `${s.name} SS27 film`);
  for (const a of s.videoAlternates || []) links.set(`https://www.youtube.com/watch?v=${a.id}`, a.title);
  for (const i of s.images || []) links.set(i.source_url, `${i.image_source} · ${s.name} Womenswear SS27`);
  if (s.mediaSource) links.set(s.mediaSource, `${s.name} Womenswear SS27 · collection source`);
  return [...links].map(([url, title]) => `<li><a href="${esc(safeUrl(url))}" target="_blank" rel="noopener noreferrer">${esc(title)}</a><span class="small">RUNWAY MEDIA · Checked ${esc(s.mediaUpdatedAt || s.updatedAt)}</span></li>`).join('');
}

function gallery(s, esc, safeUrl) {
  if (!s.images?.length) return '';
  return `<div class="runway-gallery" role="region" aria-roledescription="carousel" aria-label="${esc(s.name)} Womenswear SS27 runway looks"><div class="gallery-heading"><h3>Inside the collection</h3><span class="small">WOMENSWEAR · SS27</span></div><div class="gallery-track" tabindex="0" aria-label="Runway looks. Swipe or use left and right arrow keys.">${s.images.map((i,n) => `<figure class="gallery-slide" role="group" aria-roledescription="slide" aria-label="${n+1} of ${s.images.length}"><img src="${esc(i.image_url)}" alt="${esc(i.alt_text)}" loading="lazy" referrerpolicy="no-referrer" width="600" height="900"><figcaption><span class="look-caption">${i.look_number ? `Look ${esc(i.look_number)} · ` : ''}${esc(i.alt_text)}</span><span class="image-credit">Photo: ${esc(i.photographer || i.image_credit || 'Photographer not named')}<br>Source: <a href="${esc(safeUrl(i.source_url))}" target="_blank" rel="noopener noreferrer">${esc(i.image_source)}</a></span></figcaption></figure>`).join('')}</div><div class="gallery-controls"><button type="button" class="gallery-arrow" data-gallery-prev aria-label="Previous runway look" disabled>←</button><span class="gallery-position small" aria-live="polite" aria-atomic="true">1 / ${s.images.length}</span><button type="button" class="gallery-arrow" data-gallery-next aria-label="Next runway look">→</button></div></div>`;
}

export function runwayMedia(s, esc, safeUrl, photo) {
  let html = '';
  if (s.video) {
    html = `<span class="tag">${videoLabel(s)}</span><div class="video"><iframe src="https://www.youtube-nocookie.com/embed/${esc(s.video)}" title="${esc(s.videoTitle || `${s.name} Womenswear Spring/Summer 2027 ${videoLabel(s)}`)}" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div><p class="small">${esc(s.videoOrigin)}. If playback is restricted, <a href="https://www.youtube.com/watch?v=${esc(s.video)}" target="_blank" rel="noopener">watch on YouTube</a>.</p>`;
    if (s.videoNote) html += `<p class="small">${esc(s.videoNote)}</p>`;
    if (s.videoAlternates?.length) html += `<p class="small">${s.videoAlternates.map(a => `<a href="https://www.youtube.com/watch?v=${esc(a.id)}" target="_blank" rel="noopener">${esc(a.title)}</a>`).join(' · ')}</p>`;
  }
  html += gallery(s, esc, safeUrl);
  if (s.images?.length && s.galleryNote) html += `<p class="small">${esc(s.galleryNote)}</p>`;
  if (s.image) html += `<figure class="article-image">${photo(s.image, s.image.alt_text || `${s.name} Spring/Summer 2027 runway photograph`)}</figure>`;
  if (s.video_status === 'video_pending') {
    html += `<div class="pending-media"><span class="tag">Video pending</span><p class="small">${esc(s.videoNote || 'A verified Womenswear SS27 full-show film will be added when available.')}</p>${!s.images?.length ? `<p class="small">${s.galleryNote ? esc(s.galleryNote) : 'No verified image selection is available yet.'}${s.mediaSource ? ` <a href="${esc(safeUrl(s.mediaSource))}" target="_blank" rel="noopener">View the collection source</a>.` : ''}</p>` : ''}</div>`;
  } else if (!s.video && !s.images?.length) html += `<div class="video-missing"><h3>${s.researchStatus === 'preview' ? 'The runway is still ahead.' : 'Recording awaiting verification.'}</h3><p>${esc(s.videoNote || 'A verified SS27 film will be added after the show.')}</p></div>`;
  if (s.images?.length) html += `<p class="small media-rights">Selected SS27 looks. Image rights remain with the credited house, photographers and publishers.</p>`;
  return html;
}

export function bindGalleries(root = document) {
  root.querySelectorAll('.runway-gallery').forEach(g => {
    const track = g.querySelector('.gallery-track'), slides = [...g.querySelectorAll('.gallery-slide')];
    const prev = g.querySelector('[data-gallery-prev]'), next = g.querySelector('[data-gallery-next]'), count = g.querySelector('.gallery-position');
    let index = 0, frame;
    const sync = () => {
      index = slides.reduce((best, slide, i) => Math.abs(slide.offsetLeft - slides[0].offsetLeft - track.scrollLeft) < Math.abs(slides[best].offsetLeft - slides[0].offsetLeft - track.scrollLeft) ? i : best, 0);
      prev.disabled = index === 0; next.disabled = index === slides.length - 1;
      count.textContent = `${index + 1} / ${slides.length}`;
    };
    const go = step => {
      const target = Math.max(0, Math.min(slides.length - 1, index + step));
      track.scrollTo({left: slides[target].offsetLeft - slides[0].offsetLeft, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
    };
    prev.addEventListener('click', () => go(-1)); next.addEventListener('click', () => go(1));
    track.addEventListener('keydown', e => {if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {e.preventDefault(); go(e.key === 'ArrowRight' ? 1 : -1);}});
    track.addEventListener('scroll', () => {cancelAnimationFrame(frame); frame=requestAnimationFrame(sync);}, {passive:true});
    sync();
  });
}
