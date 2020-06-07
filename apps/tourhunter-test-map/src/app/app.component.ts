import { Component, ViewChild, OnDestroy, OnInit } from '@angular/core';
import { NzTreeComponent, NzTreeNodeOptions } from 'ng-zorro-antd/tree';

import { ClustersService } from '@tourhunter/api-firebase-service';
import {
  DataTransformService,
  GroupingProps,
  DataFlattingService,
  GroupedEntityName,
} from '@tourhunter/data-utils';

import { CoordData, ClusterData } from '@tourhunter/api-interface';
import { SelectData } from '@tourhunter/ui';

import { MapData } from '@tourhunter/map';
import { Subscription } from 'rxjs';

@Component({
  selector: 'tourhunter-test-map-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('nzTreeComponent', { static: false })
  private subscribtion: Subscription = new Subscription();
  nzTreeComponent!: NzTreeComponent;
  statusForm = false;
  pointedCoordData: CoordData | null;
  nodes: NzTreeNodeOptions[];
  selectedData: MapData[] | null;
  hoveredMarker: MapData[] = [];
  currentValue: GroupedEntityName;
  geozoneValue: SelectData[];
  massiveValue: SelectData[];
  pointValue: SelectData[];

  // data for create grouping tree and relative nodes
  arrayGrouping = ['geozoneName', 'massiveName', 'pointName'];
  // value which need for us in the tree nodes
  objectKeys: GroupingProps = {
    id: 'key',
    name: 'title',
    coord: 'coord',
    children: 'children',
    isNested: 'isLeaf',
  };

  constructor(
    private clusterService: ClustersService,
    private dataTransform: DataTransformService,
    private dataFlattingService: DataFlattingService
  ) {}

  // when opened a form we add status to map on listen enve click for pointing marker
  // or if we close the form we need unsubscibe event and deleted pointed marker if it has on map
  openedForm(status) {
    this.statusForm = status;
  }

  //when we pointed marker on the map we need transform this data to the form for post this data to db service
  pointedCoord(coords) {
    this.pointedCoordData = coords;
  }

  // when we filled in a form all data we post those to service
  submitData(data: ClusterData) {
    this.clusterService.addCluster(data);
  }

  // if we clicked on a tree at first time we recursively pull up all last nested value and pass this data to a map for creating a marker and go to this position on a map
  // if we clicked on the same tree we clearing all data
  clickedTree(event): void {
    const data = event.node.origin;
    if (data.selected) {
      if (data.hasOwnProperty(this.objectKeys.children)) {
        this.selectedData = this.dataFlattingService
          .flattedAllNestedData(this.objectKeys, data[this.objectKeys.children])
          .flat();
      } else {
        this.selectedData = [data];
      }
    } else {
      this.selectedData = null;
    }
  }

  // if we hovered on the marker we find its on a tree data and deleted coord data and change it to disabled state
  findMarker(marker: MapData) {
    this.hoveredMarker.push(marker);
    this.nodes = this.dataFlattingService.findAndPointCoordByKey(
      this.objectKeys,
      this.nodes,
      marker
    );
  }

  // if we close on a right panel we return default data marker to tree data
  afterClose(marker) {
    this.nodes = this.dataFlattingService.findAndPointCoordByKey(
      this.objectKeys,
      this.nodes,
      marker,
      true
    );
  }

  // create value for selected menu on a map popup
  createValueForSelectMenu(data): SelectData[] {
    return Object.keys(data).map((item) => {
      return {
        key: data[item].key,
        title: data[item].title,
      };
    });
  }

  // if we selected a geozone on the map menu then we need find by key all this massives and add this value to massve value or if geozone values equel to null we clear massive values for selecting
  findMassiveByGeozoneKey(key) {
    if (key) {
      const childrenKey = this.currentValue.geozoneName[key].children;
      const objChildren = {};
      childrenKey.forEach((item) => {
        objChildren[item] = this.currentValue.massiveName[item];
      });
      this.massiveValue = this.createValueForSelectMenu(objChildren);
    } else {
      this.massiveValue = null;
    }
  }

  ngOnInit() {
    this.subscribtion.add(
      this.clusterService.clusters.subscribe((res) => {
        // created data tree from flatted data received from server
        const { nodes, dataNormilize } = this.dataTransform.dataToTree(
          res,
          this.arrayGrouping,
          this.objectKeys
        );
        // data for selecting valueds
        this.currentValue = dataNormilize;
        const { geozoneName } = dataNormilize;
        this.geozoneValue = this.createValueForSelectMenu(geozoneName);
        // pass data to tree nodes
        this.nodes = Object.keys(nodes).map((item) => nodes[item]);
        // pull up all point values for validation
        // because we need has only unique naming for corretcly indexing
        const pointValues = this.dataFlattingService
          .flattedAllNestedData(this.objectKeys, this.nodes)
          .flat(2);
        this.pointValue = this.createValueForSelectMenu(pointValues);
      })
    );
  }

  ngOnDestroy() {
    this.subscribtion.unsubscribe();
  }
}
