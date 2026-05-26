import { httpClient } from './httpClient.js'

function parseXML(data) {
  const parser = new DOMParser()
  const xml = parser.parseFromString(data, 'text/xml')
  const parserError = xml.querySelector('parsererror')

  if (parserError) {
    throw new Error('Invalid XML response')
  }

  const channelInfo = xml.querySelector('channel')

  const info = {
    title: channelInfo.querySelector('title')?.textContent ?? '',
    description: channelInfo.querySelector('description')?.textContent ?? '',
  }

  info.posts = Array.from(channelInfo.querySelectorAll('item')).map((item) => {
    return {
      title: item.querySelector('title')?.textContent ?? '',
      description: item.querySelector('description')?.textContent ?? '',
      link: item.querySelector('link')?.textContent ?? '',
      guid: item.querySelector('guid')?.textContent ?? '',
      creator: item.querySelector('creator')?.textContent ?? '',
      pubDate: item.querySelector('pubDate')?.textContent ?? '',
    }
  })
  return info
}

export function getFeed(url) {
  const preparedUrl = `https://allorigins.hexlet.app/get?url=${encodeURIComponent(url)}`
  return httpClient.get(preparedUrl).then((response) => {
    return parseXML(response.data?.contents)
  }).catch(e => {
    console.error(e)
  })
}