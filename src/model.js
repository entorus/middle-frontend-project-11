import * as Yup from 'yup'
import { proxy } from 'valtio/vanilla'

export const rssModel = proxy({
  items: [],
  form: {
    valid: false,
    error: null,
  }
})

const schema = Yup.string()
  .url('Ссылка должна быть валидным URL')
  .required('Не должно быть пустым')

export const rssActions = {
  add(url) {
    schema.validate(url).then((a) => {
      rssModel.form.valid = true
      console.log(1111, url, a)
    }).catch(({ message }) => {
      rssModel.form.valid = false
      rssModel.form.error = message
      console.log(2222, message)
    })
    return null
  },
}