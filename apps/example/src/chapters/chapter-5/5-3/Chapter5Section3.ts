import { EmptyPage } from '../../../lib/EmptyPage';
import { main } from './main';

export class Chapter5Section3 extends EmptyPage {
  override async onRender() {
    await main();
  }
}
