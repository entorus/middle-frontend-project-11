import { httpClient } from './httpClient.js'

function parseXML(data) {
  const parser = new DOMParser()
  const xml = parser.parseFromString(data, 'text/xml')
  const parserError = xml.querySelector('parsererror')

  if (parserError) {
    throw new Error('Invalid XML response')
  }

  const channelInfo = xml.querySelector('channel')
  const items = Array.from(channelInfo.querySelectorAll('item')).map((item) => {
    return {
      title: item.querySelector('title')?.textContent ?? '',
      description: item.querySelector('description')?.textContent ?? '',
      link: item.querySelector('link')?.textContent ?? '',
      guid: item.querySelector('guid')?.textContent ?? '',
      creator: item.querySelector('creator')?.textContent ?? '',
      pubDate: item.querySelector('pubDate')?.textContent ?? '',
    }
  })
}

export function getFeed() {
  return httpClient.get('/feed').then((response) => {
    return parseXML(response.data?.contents)
  })
}