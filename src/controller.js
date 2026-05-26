import { subscribe, snapshot } from 'valtio/vanilla'

export function createTodoController(model, actions, view) {
  view.onSubmit(actions.add)
  view.onChange(actions.validate)
  view.onMarkRead(actions.markRead)
  view.onCloseModal()

  function render() {
    view.render(snapshot(model))
  }

  render()

  const unsubscribe = subscribe(model, render)

  return {
    destroy() {
      unsubscribe()
    }
  }
}