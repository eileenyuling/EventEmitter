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
  console.log(this._events)
  let callbacks = this._events[eventName]
  if (!callbacks) {
    return
  }
  callbacks.forEach(fn => {
    fn(...args)
  });
}

// const girl = new EventEmitter()
// girl.emit('cry', 111)
// girl.on('cry', (q) => {
//   console.log('crying', q)
// })

