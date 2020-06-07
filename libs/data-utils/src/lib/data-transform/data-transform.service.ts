import { Injectable } from '@angular/core';

export interface GroupingProps {
  id: string;
  name: string;
  children: string;
  coord: string;
  isNested: string;
}

export interface GroupedData {
  children: number[];
  key: number;
  title: string;
}

export interface GroupedEntityObject {
  [key: number]: GroupedData;
}

export interface GroupedEntityName {
  [kye: string]: GroupedEntityObject;
}

@Injectable({
  providedIn: 'root',
})
export class DataTransformService {
  constructor() {}

  dataToTree(data, arrayGrouping: string[], objectKeys: GroupingProps) {
    const ids = {};
    const idsArr = [];
    const treeArr = [];
    const arrayGrouped: GroupedEntityName = {};

    // create uniq id for each prop items
    arrayGrouping.forEach((item, index) => {
      if (index === 0) {
        idsArr.push(this.createUniqDataId(data, ids, item, objectKeys));
      } else {
        idsArr.push(
          this.createUniqDataId(idsArr[index - 1], ids, item, objectKeys)
        );
      }
    });

    // after this we need last array objects with all item ids
    const lastIds = idsArr[idsArr.length - 1];
    // create object with number uniq ids from ids with unique naming
    const objectIds = this.transformUniqPropObj(ids, objectKeys);
    // cut last item from arrya for grouping
    const arrayTreeGrouping = [...arrayGrouping].slice(0, -1);

    // create grouping all parent
    arrayTreeGrouping.forEach((item, index) => {
      arrayGrouped[item] = this.groupedData(
        lastIds,
        item,
        arrayGrouping[index + 1],
        objectKeys
      );
    });

    // then we need create tree children items from down up
    arrayTreeGrouping
      .slice()
      .reverse()
      .forEach((item, index) => {
        if (index === 0) {
          treeArr.push(
            this.createTree(arrayGrouped[item], objectIds, objectKeys, true)
          );
        } else {
          treeArr.push(
            this.createTree(
              arrayGrouped[item],
              treeArr[treeArr.length - 1],
              objectKeys
            )
          );
        }
      });

    return { nodes: treeArr[treeArr.length - 1], dataNormilize: arrayGrouped };
  }

  createUniqDataId(data, ids, type: string, objectKeys) {
    return data.map((item) => {
      const i = Object.keys(ids).length;
      const nameId = item[type];
      if (!ids[nameId]) {
        ids[nameId] = {};
        ids[nameId][objectKeys.id] = i + 1;
        ids[nameId][objectKeys.name] = nameId;
        ids[nameId][objectKeys.coord] = item[objectKeys.coord];
      }
      return {
        ...item,
        [type + 'Id']: ids[nameId][objectKeys.id],
      };
    });
  }

  transformUniqPropObj(ids, objectKeys) {
    const objectIds = {};
    Object.keys(ids).forEach((item) => {
      const prop = ids[item];
      objectIds[prop[objectKeys.id]] = prop;
    });
    return objectIds;
  }

  groupedData(
    data,
    type: string,
    childrenType: string,
    objectKeys
  ): GroupedEntityObject {
    const groupedObj = {};
    const id = type + 'Id';
    const childId = childrenType + 'Id';
    data.forEach((item) => {
      if (!groupedObj[item[id]]) {
        groupedObj[item[id]] = {
          [objectKeys.id]: item[id],
          [objectKeys.name]: item[type],
          [objectKeys.children]: [item[childId]],
        };
      }
      if (!groupedObj[item[id]][objectKeys.children].includes(item[childId])) {
        groupedObj[item[id]][objectKeys.children].push(item[childId]);
      }
    });
    return groupedObj;
  }

  createTree(data, childData, objectKeys, ifFirst = false) {
    const tree = {};
    Object.keys(data).forEach((item) => {
      const itemData = data[item];
      let mergedChildren;
      if (ifFirst) {
        mergedChildren = itemData[objectKeys.children].map((itemPoint) => {
          return { ...childData[itemPoint], [objectKeys.isNested]: true };
        });
      } else {
        mergedChildren = itemData[objectKeys.children].map((itemPoint) => {
          return childData[itemPoint];
        });
      }
      tree[item] = {
        [objectKeys.id]: itemData[objectKeys.id],
        [objectKeys.name]: itemData[objectKeys.name],
        [objectKeys.children]: mergedChildren,
      };
    });
    return tree;
  }
}
