import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dropdownItems'
})
export class DropdownItemsPipe implements PipeTransform {

  transform(items: string[], activeItem: string): unknown {
    if(!activeItem || !items) return
    const filteredValues = items.filter(item => item !== activeItem);
    return filteredValues;;
  }

}
