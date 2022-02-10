import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { AppService } from './app.service';
import { TreeComponent } from './tree/tree.component';
import { HttpClientModule } from '@angular/common/http';
import { AngularTreeTableModule } from 'angular-tree-table';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AngularTreeTableModule,
  ],
  declarations: [AppComponent, HelloComponent, TreeComponent],
  exports: [TreeComponent],
  bootstrap: [AppComponent],
  providers: [AppService],
})
export class AppModule {}
