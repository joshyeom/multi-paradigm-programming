import { ChapterPage } from '../../../lib/ChapterPage';
import { main } from './main';

export class Chapter5Section4 extends ChapterPage {
  override async onRender() {
    await main();
  }
}
