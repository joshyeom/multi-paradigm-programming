import { EmptyPage } from '../../../lib/EmptyPage';
import { main } from './main';

export class Chapter1Section1 extends EmptyPage {
  override onRender() {
    main();
  }
}
