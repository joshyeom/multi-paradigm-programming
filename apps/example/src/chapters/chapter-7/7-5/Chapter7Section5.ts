import { EmptyPage } from '../../../lib/EmptyPage';
import { main } from './alert';

export class Chapter7Section5 extends EmptyPage {
  override async onRender() {
    await main();
  }
}
