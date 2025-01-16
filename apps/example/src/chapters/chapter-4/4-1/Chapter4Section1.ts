import { EmptyPage } from '../../../lib/EmptyPage';
import { main } from './main';

export class Chapter4Section1 extends EmptyPage {
  override async onRender() {
    await main();
  }
}
