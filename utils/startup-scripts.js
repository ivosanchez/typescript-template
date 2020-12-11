import Pace from 'pace-progress'

export default {
  run() {
    // pace loading bar
    Pace.start()
    // bind pace load/render complete hook to prerender hook
    Pace.once('hide', () => {
      window.prerenderReady = true
    })

    // turn off chrome scroll restoration
    if (history.scrollRestoration) {
      history.scrollRestoration = 'manual'
    }

    // Spektrum Media production console message
    console.info('%c', 'line-height:24px;padding:12px 150px;background:url(\'https://www.spk.rocks/static/svg/production-spektrum.svg\') center / contain no-repeat;')

    // 800% faster than built-in Math.ceil()
    Math.ceil = n => ~~n + ~~!!(n % 1)
  }
}
