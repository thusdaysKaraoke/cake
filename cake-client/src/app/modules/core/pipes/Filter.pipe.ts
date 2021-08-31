import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter'
})
export class FilterPipe implements PipeTransform {

    transform(items: any[], filter: { key: string, value: string }): any[] {

        let key = filter.key;
        let value = filter.value;

        if (!items || !key || !value) {
            return items;
        }

        if (value == "_not_null") {
            console.log(items.forEach(i => console.log(i, i[key], key)))
            return items.filter(i => !!i[key]);
        }

        if (value == "_null") {
            return items.filter(i => !i[key]);
        }

        return items.filter(i => {
            key.split(".").forEach(key => i = i[key]);
            return i && JSON.stringify(i).toLowerCase().includes(value.toLowerCase())
        })


    }

}