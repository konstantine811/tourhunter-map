import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { ClusterData } from '@tourhunter/api-interface';

@Injectable({
  providedIn: 'root',
})
export class ClustersService {
  private clusterCollection: AngularFirestoreCollection<ClusterData>;
  clusters: Observable<ClusterData[]>;
  constructor(private db: AngularFirestore) {
    this.clusterCollection = this.db.collection<ClusterData>('clusters');
    this.clusters = this.clusterCollection.valueChanges();
  }

  addCluster(cluster: ClusterData) {
    this.clusterCollection.add(cluster);
  }
}
