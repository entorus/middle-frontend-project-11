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
          rssModel.form.error = t('existing')
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
    let timerId = null

    const update = () => {
      getFeed(url)
        .then((feed) => {
          rssModel.feeds = feed
          timerId = setTimeout(update, 5000)
        })
        .catch((error) => {
          clearTimeout(timerId)
          rssModel.form.valid = false

          if (error.message === 'Invalid XML response') {
            rssModel.form.error = t('notContainValidRSS')
          } else if (error.response) {
            rssModel.form.error = error.message
          } else {
            rssModel.form.error = t('networkError')
          }
        })
    }

    update()
  }
}