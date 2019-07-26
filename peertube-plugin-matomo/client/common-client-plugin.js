function register ({ registerHook, peertubeHelpers }) {
  initMatomo(registerHook, peertubeHelpers)
    .catch(err => console.error('Cannot initialize Matomo', err))
}

export {
  register
}

function initMatomo (registerHook, peertubeHelpers) {
  return peertubeHelpers.getSettings()
    .then(s => {
      if (!s || !s['site-id'] || !s['url']) {
        console.error('Matomo settings are not set.')
        return
      }

      const matomoUrl = s['url']
      const siteId = s['site-id']

      window._paq = window._paq || [];
      window._paq.push(['trackPageView']);
      window._paq.push(['enableLinkTracking']);
      (function() {
        var u = matomoUrl + '/';
        window._paq.push(['setTrackerUrl', u+'matomo.php']);
        window._paq.push(['setSiteId', siteId]);
        var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
        g.type='text/javascript'; g.async=true; g.defer=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
      })();

      window._paq.push(['setDocumentTitle', window.document.title]);
      window._paq.push(['setCustomUrl', '/' + window.location.hash.substr(1)]);
      window._paq.push(['trackPageView']);

      registerHook({
        target: 'action:router.navigation-end',
        handler: function (params) {
          window._paq.push(['setDocumentTitle', window.document.title]);
          window._paq.push(['setCustomUrl', params.path]);
          window._paq.push(['trackPageView']);
        }
      })
    })

}
