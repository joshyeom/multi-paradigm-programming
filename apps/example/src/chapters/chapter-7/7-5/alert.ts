import { html, View, on } from 'rune-ts';

export class AlertView extends View<{ message: string }> {
  private resolve!: () => void; // (1)
  readonly promise = new Promise<void>(res => this.resolve = res); // (2)

  override template() {
    return html`
      <div>
        <div class="message">${this.data.message}</div>
        <button>확인</button>  
      </div>
    `;
  }

  @on('click', 'button') // (3)
  private close() {
    this.element().remove();
    this.resolve();
  }

  static open(message: string) { // (4)
    const view = new AlertView({ message });
    document.body.append(view.render());
    return view.promise;
  }
}

export class ConfirmView extends View<{ message: string }> {
  private resolve!: (bool: boolean) => void; // (1)
  readonly promise = new Promise<boolean>(res => this.resolve = res); // (2)

  override template() {
    return html`
      <div>
        <div class="message">${this.data.message}</div>
        <button class="cancel">취소</button>
        <button class="confirm">확인</button>  
      </div>
    `;
  }

  @on('click', 'button')
  private close(e: MouseEvent) {
    const button = e.currentTarget as HTMLButtonElement;
    this.element().remove();
    this.resolve(button.matches('.confirm'));
  }

  static open(message: string) {
    const view = new ConfirmView({ message });
    document.body.append(view.render());
    return view.promise;
  }
}

export async function main() {
  alert('완료되었습니다.');
  console.log('alert');

  await AlertView.open('완료되었습니다.');
  console.log('AlertView');

  if (confirm('삭제하시겠습니까?')) {
    console.log('삭제');
  } else {
    console.log('취소');
  }

  if (await ConfirmView.open('완료되었습니다.')) {
    console.log('삭제');
  } else {
    console.log('취소');
  }
}