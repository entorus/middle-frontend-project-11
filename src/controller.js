import { subscribe, snapshot } from 'valtio/vanilla'

export function createTodoController(model, actions, view) {
//   view.onAdd(actions.add)
//   view.onToggle(actions.toggle)
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
  };
}