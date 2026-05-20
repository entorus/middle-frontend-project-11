export function createTodoView(root) {
  root.innerHTML = `
        <header class="bg-dark text-white py-5">
            <div class="container">
                <div class="mx-auto" style="max-width: 860px;">
                    <h1 class="display-2 fw-normal mb-2">
                        RSS агрегатор
                    </h1>

                    <p class="fs-5 mb-4">
                        Начните читать RSS сегодня! Это легко, это красиво.
                    </p>

                    <form id="rss-form" class="row g-4 align-items-start">
                        <div class="col">
                            <label for="rss-url" class="visually-hidden">
                                Ссылка RSS
                            </label>

                            <input
                                id="rss-url"
                                name="rssUrl"
                                type="url"
                                class="form-control form-control-lg fw-semibold"
                                placeholder="Ссылка RSS"
                                required
                            />

                            <div class="form-text text-secondary mt-2">
                                Пример: https://lorem-rss.hexlet.app/feed
                            </div>
                            <div id="validation-msg">
                            </div>
                        </div>

                        <div class="col-auto">
                            <button id="rss-submit-button" type="submit" class="btn btn-light btn-lg px-5">
                                Добавить
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </header>

        <main class="flex-grow-1">
            <div class="container py-4">
            </div>
        </main>

        <footer class="border-top bg-light py-3 text-center">
            <div class="container">
                created by
                <a href="https://hexlet.io" target="_blank" rel="noreferrer">
                Hexlet
                </a>
            </div>
        </footer>
    `

  const form = document.getElementById('rss-form')
  const input = document.getElementById('rss-url') // todo rename
  function onSubmit(handler) {
    form.addEventListener('submit', (e) => {
      e.preventDefault()
      const url = e.target.elements.rssUrl.value
      handler(url)
      input.value = ''
    })
  }
  function onChange(handler) {
    input.addEventListener('input', (e) => {
      handler(e.target.value)
      console.log(e.target.value)
    })
  }

  function render(state) {
    const msgContainer = document.getElementById('validation-msg')
    const submitButton = document.getElementById('rss-submit-button')
    msgContainer.innerHTML = ''
    if (state.form.error !== null) {
      const msg = document.createElement('div')
      msg.classList.add('text-danger')
      msg.innerText = state.form.error
      msgContainer.append(msg)
      submitButton.disabled = true
      input.classList.add('is-invalid')
    }else{
      msgContainer.innerHTML = ''
      submitButton.disabled = false
      input.classList.remove('is-invalid')
      input.focus()
    }
  }

  return {
    render,
    onSubmit,
    onChange,
  }
}

// invalid-feedback
// valid-feedback