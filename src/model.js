import * as Yup from 'yup'
import { proxy } from 'valtio/vanilla'
import { getFeed } from './api/rssApi.js'
import { t } from './locales/i18n.js'

export const rssModel = proxy({
  url: null,
  feeds: null,
  read: [],
  form: {
    valid: false,
    error: null,
  }
})

const schema = Yup.string()
  .url(t('notValid'))
  .required(t('notEmpty'))

export const rssActions = {
  validate(url) {
    return schema.validate(url)
      .then(() => {
        rssModel.form.valid = true
        rssModel.form.error = null
        const isExisting = rssModel.url === url
        if (isExisting) {
          rssModel.form.valid = false
          rssModel.form.error = 'Такой URL уже есть'
        }else{
          return true
        }
      }).catch(({ message }) => {
        rssModel.form.valid = false
        rssModel.form.error = message
        return false
      })

  },
  add(url) {
    rssActions.validate(url)
      .then((isValid) => {
        if (isValid) {
          rssModel.url = url
          rssActions.startFeedUpdate(url)
        }
      })
  },
  markRead(url) {
    rssModel.read.push(url)
  },
  startFeedUpdate(url) {
    function update() {
      let timerId = null
      getFeed(url).then((res) => {
        rssModel.feeds = res
        timerId = setTimeout(update, 5000)
      })
        .catch((error) => {
          clearTimeout(timerId)
          console.error(error)
          rssModel.form.valid = false
          rssModel.form.error = error
        })
    }
    update()
  }
}