import { Pipe, PipeTransform } from '@angular/core';
/**
 * Map to Iteratble Pipe
 * It accepts Objects and [Maps](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
 *
 * Example:
 *  <div *ngFor="#keyValuePair of someObject | mapToIterable">
 *    key {{keyValuePair.key}} and value {{keyValuePair.value}}
 *  </div>
 */
@Pipe({ name: 'mapToIterable' })
export class MapToIterablePipe implements PipeTransform {
    transform(value: any) {
        const result = [];

        if (value.entries) {
            for (const [key, currentValue] of value.entries()) {
                result.push({ key, currentValue });
            }
        } else {
            for (const key in value) {
                if (value[key]) {
                    result.push({ key, value: value[key] });
                }
            }
        }

        return result;
    }
}
