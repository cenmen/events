## 概述
 events 订阅发布模式精简使用版

## 使用
```javascript
// import events from './events.js'
const events = window.EventEmitter

function log(params) {
  console.log('==> function log', params, this)
}
const context1 = {
  name: 'context1',
  log: log
}
const context2 = {name: 'context2'}

context1.log('context1')
// ==> function log context1 {name: 'context1', log: ƒ}
log.call(context1, 'context1 call')
// ==> function log context1 call {name: 'context1', log: ƒ}
context1.log.call(context2, 'context2 call')
// ==> function log context2 call {name: 'context2'}

events.on('test', context1.log, context1)
events.on('test', context1.log, context2)
events.on('test', context1.log)
const arrow = (params) => console.log('==> arrow function', params, this)
events.unshift('test', arrow)
events.emit('test', 'emit 1')
// ==> arrow function emit 1 Window {window: Window, self: Window, document: document, name: '', location: Location, …}
// ==> function log emit 1 {name: 'context1', log: ƒ}
// ==> function log emit 1 {name: 'context2'}
// ==> function log emit 1 Window {window: Window, self: Window, document: document, name: '', location: Location, …}

events.remove('test', context1.log)
events.emit('test', 'emit 2')
// ==> arrow function emit 2 Window {window: Window, self: Window, document: document, name: '', location: Location, …}

events.off('test')
events.emit('test', 'emit 3')
// 

events.once('second', context1.log, context1)
events.emit('second', 'emit second 1')
events.emit('second', 'emit second 2')
// ==> function log emit second 1 {name: 'context1', log: ƒ}
```