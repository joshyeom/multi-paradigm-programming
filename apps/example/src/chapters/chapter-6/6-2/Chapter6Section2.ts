import { EmptyPage } from '../../../lib/EmptyPage';
import { main } from './main';

export class Chapter6Section2 extends EmptyPage {
  override async onRender() {
    await main();
  }
}
