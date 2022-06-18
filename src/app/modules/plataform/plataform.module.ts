import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlataformRoutingModule } from './plataform-routing.module';
import { PlataformComponent } from './plataform.component';
import { ProjectComponent } from '../project/project.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { MenuComponent } from '../shared/menu/menu.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { ChatComponent } from '../chat/chat.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';



@NgModule({
  declarations: [
    PlataformComponent,
    MenuComponent,
    ProjectComponent,
    DashboardComponent,
    ChatComponent
  ],
  imports: [
    CommonModule,
    PlataformRoutingModule,
    FontAwesomeModule,
    FormsModule,
    NgxChartsModule,
    BrowserAnimationsModule
  ],
})
export class PlataformModule { }
