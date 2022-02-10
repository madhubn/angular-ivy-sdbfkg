import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css'],
})
export class TreeComponent {
  rows = [];
  lastIndex = 15;

  ColumnMode: any;

  constructor(private cd: ChangeDetectorRef) {
    this.fetch((data) => {
      data = data.slice(1, this.lastIndex);
      this.rows = data.map((d) => {
        d.treeStatus = 'collapsed';
        d.parentId = null;
        return d;
      });
    });
  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/100k.json`);

    req.onload = () => {
      setTimeout(() => {
        // cb(JSON.parse(req.response));
      }, 500);
    };

    req.send();
  }

  onTreeAction(event: any) {
    const index = event.rowIndex;
    const row = event.row;
    if (row.treeStatus === 'collapsed') {
      row.treeStatus = 'loading';
      this.fetch((data) => {
        data = data.slice(this.lastIndex, this.lastIndex + 3).map((d) => {
          d.treeStatus = 'collapsed';
          d.parentId = row.id;
          return d;
        });
        this.lastIndex = this.lastIndex + 3;
        row.treeStatus = 'expanded';
        this.rows = [...this.rows, ...data];
        this.cd.detectChanges();
      });
    } else {
      row.treeStatus = 'collapsed';
      this.rows = [...this.rows];
      this.cd.detectChanges();
    }
  }
}
