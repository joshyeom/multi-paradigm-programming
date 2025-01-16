import { ChapterPage } from '../../ChapterPage';
import { main } from './main';
import {Page, html} from "rune-ts";

export class Chapter1Section5 extends Page<object> {
  override template() {
    return html`
      <div>
        <ul>
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
          <li>5</li>
        </ul>
        <script>
          // 모든 li 요소들을 선택
          const nodeList = document.querySelectorAll('li');

          // for...of 문을 사용하여 NodeList 순회
          for (const node of nodeList) {
            console.log(node.textContent);
            // 1
            // 2
            // 3
            // 4
            // 5
          }
        </script>
      </div>
    `
  }

  override onRender() {
    main();
  }
}
