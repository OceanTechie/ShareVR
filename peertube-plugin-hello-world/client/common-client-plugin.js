function register ({ registerHook, peertubeHelpers }) {
  registerHook({
    target: 'action:application.loaded',
    handler: () => console.log('Hello application world')
  })
}

export {
  register
}
