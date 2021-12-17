function Events() {
  const events = Object.create(null)

  function checkListener(listener) {
    if (typeof listener !== 'function') {
      throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof func)
    }
  }

  function on(type, listener, context) {
    checkListener(listener)
    events[type] ? events[type].push({ listener, context }) : (events[type] = [{ listener, context }])
  }

  function unshift(type, listener, context) {
    checkListener(listener)
    events[type] ? events[type].unshift({ listener, context }) : (events[type] = [{ listener, context }])
  }

  function off(type) {
    if (events[type]) delete events[type]
  }

  function remove(type, cite) {
    if (events[type]) events[type] = events[type].filter(({ listener }) => listener !== cite)
  }

  function emit(type, ...args) {
    if (events[type]) events[type].forEach(({ listener, context }) => listener.call(context, ...args))
  }

  function once(type, listener, context) {
    checkListener(listener)
    const func = (...args) => {
      listener.call(context, ...args)
      remove(type, func)
    }
    on(type, func, context)
  }

  return {
    on,
    unshift,
    off,
    remove,
    emit,
    once,
  }
}

window.EventEmitter = new Events()
// export default new Events()
