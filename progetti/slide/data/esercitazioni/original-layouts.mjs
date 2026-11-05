// Layout numbers refer to the sequence before the final assignment move; sourceSlide retains original page numbers.
export function applyOriginalLayouts(slides, imported) {
 const groups=Map.groupBy(imported,s=>s.sourceSlide)
 const paragraphs=source=>groups.get(source).flatMap(s=>s.blocks.filter(b=>b.kind==='text').flatMap(b=>b.paragraphs)).filter(p=>p.text.trim().length>5&&!p.runs.some(r=>r.href))
 const code=source=>groups.get(source).flatMap(s=>s.blocks).find(b=>b.kind==='code'&&/^\.(container|item)\s*\{/.test(b.text))?.text.replaceAll('\t','  ')
 const plans={
  21:['FLOATING','original:float',null],22:['FLOATING','original:clear',null],
  23:['POSITION','original:position-flow',null],24:['POSITION','original:position-out',null],
  29:[null,'original:flex-container',null],31:['flex-direction','original:direction',30],32:['flex-wrap','original:wrap',31],
  33:['flex-flow',null,32],34:['justify-content','original:justify',33],36:['justify-content','original:spacing',null],
  37:['align-items','original:items',35],38:['align-content','original:content',36],40:[null,'original:alignment',null],
  42:['order',null,39],43:['flex-grow','original:grow',40],44:['flex-shrink','original:shrink',41],
  45:['flex-basis',null,42],46:['flex-grow, flex-shrink, flex-basis',null,43],47:['align-self',null,44],
 }
 for(const slide of slides){const plan=plans[slide.number];if(!plan)continue;const[label,example,codeSource]=plan
  let body=paragraphs(slide.sourceSlide).filter(p=>p.text.trim()!==label)
  const previous=slide.blocks.find(b=>b.kind==='tag-reference')?.items[0]
  // Retain the already verified technical corrections for position, order and growth.
  if([23,24,42,43].includes(slide.number))body=(previous?.introduction||[]).map(p=>({text:p.runs.map(r=>r.text).join(''),runs:p.runs}))
  if(slide.number===21)body=body.filter(p=>p.text!=='FLOATING')
  if(slide.number===22)body=body.filter(p=>p.text!=='FLOATING')
  if(slide.number===40)body=paragraphs(37)
  if(slide.number===46)body=body.filter(p=>p.text.trim()!=='flex-grow, flex-shrink, flex-basis')
  const sourceCode=slide.number===34 ? '.container {\n  justify-content:\n    flex-start | flex-end | center |\n    space-between | space-around |\n    space-evenly | start | end | left;\n}' : codeSource?code(codeSource):null
  slide.blocks=[{kind:'original-layout',content:{label,...(label&&previous?.url?{url:previous.url}:{}),paragraphs:body,code:sourceCode,example}}]
  if(!label&&previous?.url)slide.sources=[...(slide.sources||[]),{title:'MDN · display',url:previous.url}]
  slide.layout='original'
  slide.title=groups.get(slide.sourceSlide)[0].title
 }
 return slides
}
