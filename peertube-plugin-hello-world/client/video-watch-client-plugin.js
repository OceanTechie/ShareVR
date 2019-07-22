function register ({ registerHook, peertubeHelpers }) {
  registerHook({
    target: 'action:video-watch.init',
    handler: () => console.log('Hello video watch world')
  })

  registerHook({
    target: 'action:video-watch.video.loaded',
    handler: () => 'video loaded'
  })

  registerHook({
    target: 'filter:api.video-watch.video.get.result',
    handler: video => {
      video.name += ' \o/'

      return video
    }
  })

  registerHook({
    target: 'filter:api.video-watch.video-threads.list.result',
    handler: result => {
      result.comments.forEach(c => c.text += ' THREAD')

      return result
    }
  })

  registerHook({
    target: 'filter:api.video-watch.video-thread-replies.list.result',
    handler: result => {
      result.children.forEach(c => c.comment.text += ' REPLY DEEP 1')

      return result
    }
  })
}

export {
  register
}
