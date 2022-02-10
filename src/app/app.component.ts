import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  rows = [];
  lastIndex = 20;

  ColumnMode = ColumnMode;

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
        console.log('req.response', req.response);
        cb(JSON.parse(req.response));
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
