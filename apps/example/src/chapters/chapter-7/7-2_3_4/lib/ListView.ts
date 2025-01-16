import { html, View } from 'rune-ts';

export abstract class ListView<IV extends View<object>> extends View<IV['data'][]> {
  abstract ItemView: new (item: IV['data']) => IV;

  private _itemViews: IV[] | null = null;

  get itemViews() {
    if (this._itemViews === null) {
      this._itemViews = this.data.map(item => new this.ItemView(item));
    }
    return this._itemViews;
  }

  override template() {
    return html`
      <div>
        ${this.itemViews}
      </div>
    `;
  }

  append(item: IV['data']): this {
    const itemView = new this.ItemView(item);
    this.data.push(itemView.data);
    this.itemViews.push(itemView);
    this.element().append(itemView.render());
    console.log(this.data.length);
    return this;
  }

  set2(items: IV['data'][]): this {
    this.data.length = 0; // (1)
    this.itemViews.length = 0; // (2)
    this.element().innerHTML = ''; // (3)
    this.data.push(...items); // (4)
    this.itemViews.push(...this.data.map(item => new this.ItemView(item))); // (5)
    this.element().append(...this.itemViews.map(itemView => itemView.render())); // (6)
    return this;
  }

  set(items: IV['data'][]): this {
    let i = 0, j = 0;

    // 기존 항목들을 빠르게 조회하기 위한 맵
    const oldItemsMap = new Map(
      this.data.map(item => [item, true])
    );

    // 앞에서부터 비교
    while (i < this.data.length && j < items.length) {
      const oldItem = this.data[i];
      const newItem = items[j];

      if (oldItem === newItem) {
        // 같은 레퍼런스면 그대로 두고 진행
        i++;
        j++;
        continue;
      }

      // 새 항목(newItem)이 기존에도 있으면(재사용 가능) => 현재 oldItem 제거
      if (oldItemsMap.has(newItem)) {
        this.itemViews[i].element().remove();
        // DOM 상태에 맞춰 이전 itemView, 이전 item 삭제
        this.itemViews.splice(i, 1);
        this.data.splice(i, 1);
      } else {
        // 기존 항목에 없는 경우 => 새 항목을 삽입
        const oldItemView = this.itemViews[i];
        const newItemView = new this.ItemView(newItem);

        // DOM 상에 이미 존재하던 이전 항목 element 앞에 newItemView의 element 삽입
        oldItemView.element().before(newItemView.render());

        // 변경된 DOM 상태에 맞춰 데이터도 이전 항목 앞에 새 항목 삽입
        this.itemViews.splice(i, 0, newItemView);
        this.data.splice(i, 0, newItem);

        i++;
        j++;
      }
    }

    // 남은 기존 항목이 있으면 전부 제거
    while (i < this.data.length) {
      const oldItemView = this.itemViews[i];
      oldItemView.element().remove();
      this.itemViews.splice(i, 1);
      this.data.splice(i, 1);
      // i는 그대로
    }

    // 남은 새 항목이 있으면 전부 삽입
    while (j < items.length) {
      const newItem = items[j];
      const newItemView = new this.ItemView(newItem);
      this.itemViews.push(newItemView);
      this.element().append(newItemView.render());
      this.data.push(newItem);
      j++;
    }

    return this;
  }
}