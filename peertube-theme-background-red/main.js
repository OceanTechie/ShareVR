function register ({ registerHook }) {
  registerHook({
    target: 'action:application.listening',
    handler: displayHelloWorld
  })

  displayHelloWorld()
}

async function unregister () {
  return
}

module.exports = {
  register,
  unregister
}

// ############################################################################

function displayHelloWorld () {
  console.log('hello world peertube')
}
