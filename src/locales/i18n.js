import i18next from 'i18next'

i18next.init({
  lng: 'ru',
  debug: true,
  resources: {
    en: {
      translation: {
        agg: 'aggregator',
        startToday: "Start reading RSS today! It's easy, it's beautiful.",
        link: 'Link',
        add: 'add',
        example: 'example',
        notValid: 'The link must be a valid URL.',
        notEmpty: 'Should not be empty',
        feeds: 'Feeds',
        posts: 'Posts',
        view: 'View',
        read: 'Read full version',
        close: 'Close',
        success: 'RSS successfully loaded',
        existing: 'RSS already exists',
        notContainValidRSS: 'The resource does not contain a valid RSS feed',
        networkError: 'Network Error'
      }
    },
    ru: {
      translation: {
        agg: 'агрегатор',
        startToday: 'Начните читать RSS сегодня! Это легко, это красиво.',
        link: 'Ссылка',
        add: 'добавить',
        example: 'пример',
        notValid: 'Ссылка должна быть валидным URL',
        notEmpty: 'Не должно быть пустым',
        feeds: 'Фиды',
        posts: 'Посты',
        view: 'Просмотр',
        read: 'Читать полностью',
        close: 'Закрыть',
        success: 'RSS успешно загружен',
        existing: 'RSS уже существует',
        notContainValidRSS: 'Ресурс не содержит валидный RSS',
        networkError: 'Ошибка сети'
      }
    }
  }
})

export function t(key, options) {
  return i18next.t(key, options)
}

export function changeLanguage(language) {
  return i18next.changeLanguage(language)
}