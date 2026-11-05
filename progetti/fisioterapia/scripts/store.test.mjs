import test from 'node:test'
import assert from 'node:assert/strict'
import { isCalendarDate, isOfferedProposal } from '../data/availability.mjs'

const visit = { id:'TEST-1', status:'confirmed', professional:'giulia-riva', address:'Via Esempio 12, Milano', cap:'20121', date:'2026-11-17', period:'sera', time:'20:30', name:'Viola Esempio', email:'viola@example.com', notes:'Citofono originale' }
let moduleId=0
async function store(t, records=[]) {
  const previous=Object.getOwnPropertyDescriptor(globalThis,'localStorage'), values=new Map([['passo-visite-v1',JSON.stringify(records)]])
  const storage={getItem:key=>values.get(key)??null,setItem:(key,value)=>values.set(key,value)}
  Object.defineProperty(globalThis,'localStorage',{configurable:true,value:storage})
  t.after(()=>{if(previous)Object.defineProperty(globalThis,'localStorage',previous);else delete globalThis.localStorage})
  return {storage, api:await import('../data/store.mjs?test='+moduleId++)}
}

test('a proposal must match coverage, day, period and the selected professional’s actual slot',()=>{
  assert.ok(isOfferedProposal(visit))
  for(const change of [{cap:'00100'},{date:'2026-11-18'},{period:'mattina'},{professional:'luca-sala'},{time:'22:00'},{address:''}]) assert.equal(isOfferedProposal({...visit,...change}),false)
  assert.ok(isOfferedProposal({...visit,professional:'luca-sala',time:'21:45'}))
  assert.equal(isCalendarDate('2026-02-31'),false)
  assert.equal(isCalendarDate('2026-11-17'),true)
})
test('unsupported dates cannot become available or be accepted through stale navigation',async t=>{
  const invalid={...visit,status:'pending',date:'2026-11-18'}, {api}=await store(t,[invalid])
  assert.equal(api.available(invalid.professional,invalid.date,invalid.time),false)
  assert.equal(api.respond(invalid.id,true),false)
  assert.equal(api.readBookings()[0].status,'pending')
})
test('acceptance applies the entire proposed change; rejection keeps every original field',async t=>{
  const change={professional:'luca-sala',time:'21:45',address:'Via Nuova 24, Milano',cap:'20122',date:visit.date,period:'sera',name:'Viola Nuova',email:'nuova@example.com',notes:'Citofono nuovo'}
  const {api}=await store(t,[{...visit,change}])
  assert.equal(api.available('giulia-riva',visit.date,'20:30'),false)
  assert.equal(api.available('luca-sala',visit.date,'21:45'),false)
  assert.ok(api.respond(visit.id,false))
  assert.equal(api.readBookings()[0].professional,visit.professional)
  assert.equal(api.readBookings()[0].notes,visit.notes)
  api.saveBookings([{...visit,change}])
  assert.ok(api.respond(visit.id,true))
  const accepted=api.readBookings()[0]
  for(const key of Object.keys(change)) assert.equal(accepted[key],change[key])
  assert.equal(accepted.change,undefined)
  assert.equal(api.available('giulia-riva',visit.date,'20:30'),true)
})
test('failed writes retain the current session instead of re-reading stale storage',async t=>{
  const {api,storage}=await store(t,[])
  assert.deepEqual(api.readBookings(),[])
  storage.setItem=()=>{throw new Error('Quota exceeded')}
  api.saveBookings([visit])
  assert.equal(api.storageAvailable,false)
  assert.equal(api.readBookings()[0].id,visit.id)
  api.clearBookings()
  assert.deepEqual(api.readBookings(),[])
})
