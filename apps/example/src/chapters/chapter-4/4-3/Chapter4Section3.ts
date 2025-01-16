import { EmptyPage } from '../../../lib/EmptyPage';
import { main } from './main';

export class Chapter4Section3 extends EmptyPage {
  override async onRender() {
    await main();
  }
}
