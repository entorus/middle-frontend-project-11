import { proxy } from 'valtio/vanilla';

export const rssModel = proxy({
  items: [],
  form: {
    valid: false,
    error: null,
  }
});
export const rssActions = {
  add() {
    return null
  },
}