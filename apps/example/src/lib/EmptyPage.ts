import { html, Page } from 'rune-ts';

export class EmptyPage extends Page<object> {
  override template() {
    return html` <div></div> `;
  }
}
