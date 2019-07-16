function register ({ registerHook, peertubeHelpers }) {
  registerHook({
    target: 'action:video-watch.loaded',
    handler: () => console.log('Hello video watch world')
  })
}

export {
  register
}
