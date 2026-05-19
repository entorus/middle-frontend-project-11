import './styles.scss'
import 'bootstrap'
import { rssModel, rssActions } from './model.js'
import { createTodoView } from './view.js'
import { createTodoController } from './controller.js'

const root = document.getElementById('app')
const view = createTodoView(root)
createTodoController(rssModel, rssActions, view)

// // import { object, string, number, date } from 'yup'
// import * as Yup from 'yup'

// const form = document.getElementById('rss-form')

// // let link = object({
// //   link: string().url().required(),
// // })

// let schema = Yup.string()
//   .url('Ссылка должна быть валидным URL')
//   .required('Не должно быть пустым')

// form.addEventListener('submit', (e) => {
//   e.preventDefault()
//   const url = e.target.elements.rssUrl.value
//   schema.validate(url).then((a) => {
//     // submit
//   }).catch(({ message }) => {
//     console.log(2222, message)
//   })
// })
