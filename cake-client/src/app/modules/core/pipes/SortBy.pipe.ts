import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'sortBy'
})
export class SortByPipe implements PipeTransform {

    transform(items: any[], sort: { key: string, order: number }): any[] {
        if (!items || !sort.key) {
            return items;
        }

        let sortedItems = items.sort((a, b) => {

            if (a[sort.key] > b[sort.key]) {
                return (1 * sort.order);
            } else {
                return (-1 * sort.order);
            }
        })


        return (sortedItems);

    }


}