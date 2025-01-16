import { EmptyPage } from '../../../lib/EmptyPage';
import { main } from './main';

export class Chapter5Section2 extends EmptyPage {
  override async onRender() {
    await main();
  }
}
