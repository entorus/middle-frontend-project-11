import { 
  // changeLanguage, 
  t
} from './locales/i18n.js'

export function createTodoView(root) {
  root.innerHTML = `
        <header class="bg-dark text-white py-5">
            <div class="container">
                <div class="mx-auto" style="max-width: 860px;">
                    <h1 class="display-2 fw-normal mb-2">
                        RSS ${t('agg')}
                    </h1>

                    <p class="fs-5 mb-4">
                      ${t('startToday')}
                    </p>

                    <form id="rss-form" class="row g-4 align-items-start">
                        <div class="col">
                            <label for="rss-url" class="visually-hidden">
                                ${t('link')} RSS
                            </label>

                            <input
                                id="rss-url"
                                name="rssUrl"
                                type="url"
                                class="form-control form-control-lg fw-semibold"
                                placeholder="${t('link')} RSS"
                                required
                            />

                            <div class="form-text text-secondary mt-2">
                                <span class="text-capitalize">${t('example')}</span>: https://lorem-rss.hexlet.app/feed
                            </div>
                            <div id="validation-msg">
                            </div>
                        </div>

                        <div class="col-auto">
                            <button id="rss-submit-button" type="submit" class="text-capitalize btn btn-primary btn-lg px-5">
                                ${t('add')}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </header>

        <main class="flex-grow-1">
          <div id="rss-main-container" class="container py-4">
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
    })
  }

  // changeLanguage('en')
    
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
      msgContainer.innerHTML = '' // todo add successfull message
      submitButton.disabled = false
      input.classList.remove('is-invalid')
      input.focus()
    }
    if (state.feeds.length > 0)
      renderPostsContainerLayout(state)
  }

  function renderPostsContainerLayout(state) {
    const main = document.getElementById('rss-main-container')
    // main.innerHTML = ''
    const wrapper = document.createElement('div')
    wrapper.className = 'row mb-3'
    main.appendChild(wrapper)

    const postsContainer = document.createElement('div')
    postsContainer.id = 'rss-posts-container'
    postsContainer.className = 'col-md-8 themed-grid-col'

    const postsTitle = document.createElement('h3')
    postsTitle.className = 'mb-3'
    postsTitle.textContent = t('posts')

    postsContainer.appendChild(postsTitle)
    wrapper.appendChild(postsContainer)

    const feedsContainer = document.createElement('div')
    feedsContainer.id = 'rss-feed-container'
    feedsContainer.className = 'col-6 col-md-4 themed-grid-col'

    const feedsTitle = document.createElement('h3')
    feedsTitle.className = 'mb-3'
    feedsTitle.textContent = t('feeds')

    feedsContainer.appendChild(feedsTitle)

    wrapper.appendChild(feedsContainer)

    renderFeeds(feedsContainer, state)
    renderPosts(postsContainer, state)
  }

  function renderPosts(container, state) {
    console.log(333, state)
    state.feeds[0].posts.forEach((post) => { // todo pass index here
      const postRow = document.createElement('div')
      postRow.className = 'row mb-3'

      const linkCol = document.createElement('div')
      linkCol.className = 'col-md-9'

      const link = document.createElement('a')
      link.href = post.link
      link.textContent = post.title

      linkCol.appendChild(link)

      const buttonCol = document.createElement('div')
      buttonCol.className = 'col-md-1'

      const button = document.createElement('button')
      button.type = 'button'
      button.className = 'btn btn-outline-primary'
      button.textContent = t('view')

      // button.addEventListener('click', () => {
      // })

      buttonCol.appendChild(button)

      postRow.appendChild(linkCol)
      postRow.appendChild(buttonCol)

      container.appendChild(postRow)
    })
  }

  function renderFeeds(container, state) {
    state.feeds.forEach((feed) => {
      const feedRow = document.createElement('div')
      feedRow.className = 'row mb-3'

      const feedTitle = document.createElement('span')
      feedTitle.textContent = feed.title

      const br = document.createElement('br')

      const description = document.createElement('small')
      description.className = 'text-secondary'
      description.textContent = feed.description

      feedRow.appendChild(feedTitle)
      feedRow.appendChild(br)
      feedRow.appendChild(description)

      container.appendChild(feedRow)
    })
  }

  return {
    render,
    onSubmit,
    onChange,
  }
}

// invalid-feedback
// valid-feedback