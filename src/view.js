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
                              aria-label="url"
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
          <div id="rss-modal" class="modal fade" tabindex="-1">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 id="modal-title" class="modal-title">Modal title</h5>
                  <button type="button" class="btn-close" data-close-modal aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <p id="modal-text">Modal body text goes here.</p>
                </div>
                <div class="modal-footer">
                  <a id="rss-link-full" class="btn btn-primary">${t('read')}</a>
                  <button type="button" class="btn btn-secondary" data-close-modal>${t('close')}</button>
                </div>
              </div>
            </div>
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
  const main = document.getElementById('rss-main-container')
    
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
  function onMarkRead(handler) {
    main.addEventListener('click', (event) => {
      const button = event.target.closest('[data-post-read-btn]')

      if (! button) 
        return

      const href = button.closest('.row').querySelector('a').href
      handler(href)
    })
  }
    
  function render(state) {
    const msgContainer = document.getElementById('validation-msg')
    const submitButton = document.getElementById('rss-submit-button')
    msgContainer.innerHTML = ''
    const msg = document.createElement('div')
    if (state.form.error !== null) {
      msg.className = 'text-danger'
      msg.innerText = state.form.error
      msgContainer.append(msg)
      submitButton.disabled = true
      input.classList.add('is-invalid')
    }else{
      submitButton.disabled = false
      input.classList.remove('is-invalid')
      input.focus()
    }
    if (state.feeds !== null && state.form.error === null) {
      msg.className = 'text-success'
      msg.innerText = t('success')
      msgContainer.append(msg)
      renderPostsContainerLayout(state)
    }
  }

  function renderPostsContainerLayout(state) {
    main.innerHTML = ''
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
    state.feeds.posts.forEach((post) => {
      const postRow = document.createElement('div')
      postRow.className = 'row mb-3'

      const linkCol = document.createElement('div')
      linkCol.className = 'col-md-9'

      const link = document.createElement('a')
      link.href = post.link
      link.textContent = post.title
      if (state.read.includes(post.link))
        link.classList.add('fw-normal')
      else
        link.classList.add('fw-bold')

      linkCol.appendChild(link)

      const buttonCol = document.createElement('div')
      buttonCol.className = 'col-md-1'

      const button = document.createElement('button')
      button.type = 'button'
      button.dataset.postReadBtn = ''
      button.className = 'btn btn-outline-primary'
      button.textContent = t('view')

      const rssModal = document.getElementById('rss-modal')

      button.addEventListener('click', () => {
        const modalTitle = document.getElementById('modal-title')
        const modalText = document.getElementById('modal-text')
        const modalLink = document.getElementById('rss-link-full')
        rssModal.display = 'block'
        rssModal.classList.add('show')
        modalTitle.innerText = post.title
        modalText.innerText = post.description
        modalLink.href = post.link
        rssModal.style.display = 'block'
      })

      buttonCol.appendChild(button)

      postRow.appendChild(linkCol)
      postRow.appendChild(buttonCol)

      container.appendChild(postRow)

      const closeButtons = document.querySelectorAll('[data-close-modal]')
      closeButtons.forEach(button => {
        button.addEventListener('click', () => {
          rssModal.style.display = 'none'
          rssModal.classList.remove('show')
        })
      })
    })
  }

  function renderFeeds(container, state) {
    const feed = state.feeds
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
  }

  return {
    render,
    onSubmit,
    onChange,
    onMarkRead,
  }
}

// invalid-feedback
// valid-feedback