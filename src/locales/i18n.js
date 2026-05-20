import i18next from 'i18next'

i18next.init({
  lng: 'ru', // if you're using a language detector, do not define the lng option
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
        notEmpty: 'Should not be empty'
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
        notEmpty: 'Не должно быть пустым'
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