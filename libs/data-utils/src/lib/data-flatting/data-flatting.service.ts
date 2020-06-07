import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataFlattingService {
  constructor() {}

  // recursively find all last nested child if it not has a children property
  // then we checekd current marker key and if it has we transfrom relativle to add value
  // if value add to true we return new marker data
  // or if add is false (in dafault state) we change marker to disabled state and deleted coord data
  findAndPointCoordByKey(objectKeys, data, marker, add = false) {
    return data.map((item) => {
      if (item.hasOwnProperty([objectKeys.children])) {
        const data = this.findAndPointCoordByKey(
          objectKeys,
          item[objectKeys.children],
          marker,
          add
        );
        return {
          [objectKeys.id]: item[objectKeys.id],
          [objectKeys.name]: item[objectKeys.name],
          [objectKeys.children]: data,
        };
      } else {
        if (item.key === marker.key) {
          if (add) {
            return marker;
          } else {
            return {
              [objectKeys.coord]: null,
              [objectKeys.isNested]: item[objectKeys.isNested],
              [objectKeys.id]: item[objectKeys.id],
              [objectKeys.name]: item[objectKeys.name],
              disabled: true,
            };
          }
        } else {
          return item;
        }
      }
    });
  }

  // recursively find all nested data by children property
  flattedAllNestedData(objectKeys, data) {
    return data.map((item) => {
      if (item.hasOwnProperty([objectKeys.children])) {
        return this.flattedAllNestedData(objectKeys, item[objectKeys.children]);
      } else {
        return item;
      }
    });
  }
}
