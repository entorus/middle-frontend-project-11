import './styles.scss'; 
import 'bootstrap';

document.querySelector('#app').innerHTML = `
<header class="bg-dark text-white py-5">
  <div class="container">
    <div class="mx-auto" style="max-width: 860px;">
      <h1 class="display-2 fw-normal mb-2">
        RSS агрегатор
      </h1>

      <p class="fs-5 mb-4">
        Начните читать RSS сегодня! Это легко, это красиво.
      </p>

      <form class="row g-4 align-items-start">
        <div class="col">
          <label for="rss-url" class="visually-hidden">
            Ссылка RSS
          </label>

          <input
            id="rss-url"
            type="url"
            class="form-control form-control-lg fw-semibold"
            placeholder="Ссылка RSS"
            required
          />

          <div class="form-text text-secondary mt-2">
            Пример: https://lorem-rss.hexlet.app/feed
          </div>
        </div>

        <div class="col-auto">
          <button type="submit" class="btn btn-light btn-lg px-5">
            Добавить
          </button>
        </div>
      </form>
    </div>
  </div>
</header>

<main class="flex-grow-1">
  <div class="container py-4">
    <!-- Здесь потом можно выводить фиды и посты -->
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
