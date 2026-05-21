import './styles.scss'
import 'bootstrap'
import { rssModel, rssActions } from './model.js'
import { createTodoView } from './view.js'
import { createTodoController } from './controller.js'

const root = document.getElementById('app')
const view = createTodoView(root)
createTodoController(rssModel, rssActions, view)
