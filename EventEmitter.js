function EventEmitter() {
  this._events = {}
}
EventEmitter.prototype.on = function (eventName, callback) {
  if (!this._events) {
    this._events = {}
  }
  let callbacks = this._events[eventName] || []
  callbacks.push(callback)
  this._events[eventName] = callbacks
}
EventEmitter.prototype.emit = function (eventName, ...args) {
  let callbacks = this._events[eventName]
  if (!callbacks) {
    return
  }
  callbacks.forEach(fn => {
    fn(...args)
  });
}
EventEmitter.prototype.off = function (eventName, callback) {
  if (!this._events[eventName]){
    return
  }
  this._events = this._events[eventName].filter(event => {
    return event !== callback && event.r !== callback
  })
}
EventEmitter.prototype.once = function (eventName, callback) {
  const one =  () => {
    callback()
    this.off(eventName, one)
  }
  one.r = callback
  this.on(eventName, one)
}

const a = () => {
  console.log('a')
}
const girl = new EventEmitter()
girl.on('cry', a)
girl.off('cry', a)
girl.emit('cry', 111)


