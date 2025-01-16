import { ChapterPage } from '../../../lib/ChapterPage';
import { main } from './main';

export class Chapter1Section1 extends ChapterPage {
  override onRender() {
    main();
  }
}
