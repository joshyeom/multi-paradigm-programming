import { EmptyPage } from '../../../lib/EmptyPage';
import { main as todo } from './todo';
import { main as setting } from './setting';

export class Chapter7Section234 extends EmptyPage {
  override onRender() {
    todo();
    setting();
  }
}
