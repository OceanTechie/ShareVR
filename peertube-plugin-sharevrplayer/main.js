async function register ({
  registerHook,
  registerSetting,
  settingsManager,
  storageManager,
  videoCategoryManager,
  videoLicenceManager,
  videoLanguageManager
}) {
  const defaultAdmin = 'PeerTube admin'

  registerHook({
    target: 'action:application.listening',
    handler: () => displayHelloWorld(settingsManager, defaultAdmin)
  })

  registerHook({
    target: 'unknown-hook',
    handler: () => console.log('fake hook')
  })

  registerHook({
    target: 'filter:api.user.signup.allowed.result',
    handler: (result, params) => {
      if (result.allowed === false) return result

      if (params && params.body.email.includes('laposte.net')) {
        return { allowed: false, errorMessage: 'laposte.net emails are not allowed on this instance' }
      }

      return result
    }
  })

  registerSetting({
    name: 'admin-name',
    label: 'Admin name',
    type: 'input',
    private: true,
    default: defaultAdmin
  })

  registerSetting({
    name: 'user-name',
    label: 'User name',
    type: 'input',
    private: false
  })

  const value = await storageManager.getData('toto')
  console.log(value)

  await storageManager.storeData('toto', 'hello' + new Date())

  videoLanguageManager.addLanguage('al_bhed', 'Al Bhed')
  videoLanguageManager.deleteLanguage('fr')

  videoCategoryManager.addCategory(42, 'Best category')
  videoCategoryManager.deleteCategory(1) // Music

  videoLicenceManager.addLicence(42, 'Best licence')
  videoLicenceManager.deleteLicence(7) // Public domain
}

async function unregister () {
  return
}

module.exports = {
  register,
  unregister
}

// ############################################################################

async function displayHelloWorld (settingsManager, defaultAdmin) {
  let value = await settingsManager.getSetting('admin-name')
  if (!value) value = defaultAdmin

  console.log('hello world ' + value)
}
