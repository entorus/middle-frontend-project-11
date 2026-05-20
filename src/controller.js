import { subscribe, snapshot } from 'valtio/vanilla'

export function createTodoController(model, actions, view) {
  view.onSubmit(actions.add)
  view.onChange(actions.validate)
  //   view.onRemove(actions.remove)
  //   view.onFilter(actions.setFilter)

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