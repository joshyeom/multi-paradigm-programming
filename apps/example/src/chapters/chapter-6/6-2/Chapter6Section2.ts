import { ChapterPage } from '../../../lib/ChapterPage';
import { main } from './main';

export class Chapter6Section2 extends ChapterPage {
  override async onRender() {
    await main();
  }
}
