import { EmptyPage } from '../../../lib/EmptyPage';
import { main } from './main';

export class Chapter4Section4 extends EmptyPage {
  override async onRender() {
    await main();
  }
}
