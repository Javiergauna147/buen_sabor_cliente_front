import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCardComponent {
  @Input()
  imgUrl = ""
  @Input()
  title = ""
  @Input()
  description = ""
  @Input()
  id = ""

  @Output() onSelect = new EventEmitter<String>();

  onClick() {
    this.onSelect.emit(this.id);
  }
}
