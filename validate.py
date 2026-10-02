import json, pathlib, re
p=pathlib.Path(__file__).parent/'public'
schedule=json.loads((p/'data/schedule.json').read_text());shows=json.loads((p/'data/shows.json').read_text());sources=json.loads((p/'data/sources.json').read_text());pulse=json.loads((p/'data/pulse.json').read_text())
assert len(schedule)==101
assert sum(e['type']=='show' for e in schedule)==67
assert sum(e['type']=='presentation' for e in schedule)==34
assert len({e['id'] for e in schedule})==101
assert len(shows)==32 and len({s['slug'] for s in shows})==32
for e in schedule:
 assert re.fullmatch(r'\d{2}:\d{2}',e['start']),e
 if e['end']:assert e['end']>e['start']
 assert e['type'] in ['show','presentation']
 assert e['access'].startswith('Show' if e['type']=='show' else 'Presentation'),e
lv=next(e for e in schedule if e['slug']=='louis-vuitton')
assert (lv['date'],lv['start'])==('2026-10-06','18:30')
assert max([e for e in schedule if e['type']=='show'],key=lambda e:(e['date'],e['start']))['slug']=='louis-vuitton'
assert next(e for e in schedule if e['slug']=='chanel')['start']=='20:00'
assert '9pm' in next(e for e in schedule if e['slug']=='chanel')['broadcast']
assert '6pm' in next(e for e in schedule if e['slug']=='hermes')['broadcast']
for s in shows:
 assert any(e['slug']==s['slug'] and e['type']=='show' for e in schedule)
 if s['researchStatus']=='media_only':continue
 assert all(k in s for k in ['designer','portrait','bio','history','transition','expectations','past','news','press','community','video'])
 if s['researchStatus']=='reviewed':
  assert s['reception_rating'] in ['positive','neutral','negative']
  assert s['reception_emoji']=={'positive':'😍','neutral':'😐','negative':'🫣'}[s['reception_rating']]
  assert s['reception_confidence'] in ['high','medium','low'] and s['reception_blurb']
  assert all(s.get(k) for k in ['showNotes','approvedReceipts','editorialSource'])
 for para in [s['bio'],s['history'],s['transition'],s['expectations'],s['past'],*s['news'],*s['press'],*s['community']]:
  assert all(ref in sources for ref in para['sources']),s['slug']
for card in pulse['cards']:
 assert all(ref in sources for ref in card['sources'])
for story in pulse['stories']:
 for para in story['paragraphs']:assert all(ref in sources for ref in para['sources'])
assert sum(s['researchStatus']=='reviewed' for s in shows)==30
assert [r['date'] for r in pulse['dailyRecaps']]==['2026-09-28','2026-09-29','2026-09-30','2026-10-01']
assert len(pulse['weekSoFar'])==3 and len(pulse['trends'])==7 and len(pulse['groups'])==3
slugs={s['slug'] for s in shows}
for group in pulse['groups']:assert set(group['shows'])<=slugs
for trend in pulse['trends']:
 assert trend['trend_status'] in ['emerging','recurring','major_signal']
 assert set(trend['related_shows'])<=slugs
for source in sources.values():assert source['url'].startswith('https://') or source['url']=='official-calendar-ss27.pdf'
assert len({s['video'] for s in shows if s['video']})==17
pending={'julie-kegels','maxhosa-africa','matieres-fecales','marie-adam-leenaerdt','mame-kurogouchi','the-row','vaquera','alainpaul','carven','cecilie-bahnsen','uma-wang','schiaparelli'}
for s in shows:
 if s['slug'] in pending:
  assert s['video_status']=='video_pending' and s['video'] is None
  assert len(s['images'])==6
  assert len({i['image_url'] for i in s['images']})==6
  for i in s['images']:
   assert all(i.get(k) for k in ['image_url','image_source','source_url','alt_text']),s['slug']
   assert i.get('photographer') or i.get('image_credit')
   assert len(i['alt_text'].split())>=7 and 'runway image' not in i['alt_text'].lower(),i
   assert i['image_url'].startswith('https://') and i['source_url'].startswith('https://')
 if s['video']:assert re.fullmatch(r'[A-Za-z0-9_-]{11}',s['video'])
lookup={s['slug']:s for s in shows}
assert lookup['hodakova']['video'] is None
assert lookup['saint-laurent']['video']=='iiygG0TrZzY'
assert lookup['weinsanto']['videoKind']=='analysis'
assert all(lookup[k]['videoKind']=='edited_coverage' for k in ['ester-manas','burc-akyol'])
assert lookup['maison-margiela']['videoAlternates'][0]['id']=='GvP1lAVyKjk'
for copy_file in [*p.glob('data/*.json'),p/'app.js',p/'index.html']:
 text=copy_file.read_text()
 assert not re.search(r"Benny[’']s|BENNY[’']S",text),copy_file
assert (p/'official-calendar-ss27.pdf').exists()
assert 'app.js' in (p/'index.html').read_text()
print('Verified 101 calendar entries, 32 show pages, 17 primary videos, 12 six-image galleries, media safeguards, shared copy, citations and final-show anchors.')
