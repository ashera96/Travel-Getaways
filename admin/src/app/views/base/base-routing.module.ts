import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

//import { CardsComponent } from './cards.component';
import { FormsComponent } from "./forms.component";
//import { SwitchesComponent } from './switches.component';
import { TablesComponent } from "./tables.component";
//import { TabsComponent } from './tabs.component';
//import { CarouselsComponent } from './carousels.component';
//import { CollapsesComponent } from './collapses.component';
import { PaginationsComponent } from "./paginations.component";
import { MessagesComponent } from './messages/messages.component';
import { AddToursComponent } from './tours/add-tours/add-tours.component';
import { ToursComponent } from './tours/tours.component';
//import {PopoversComponent} from './popovers.component';
//import {ProgressComponent} from './progress.component';
//import {TooltipsComponent} from './tooltips.component';

const routes: Routes = [
  {
    path: "",
    data: {
      title: "Base"
    },
    children: [
      {
        path: "",
        redirectTo: "cards"
      },
      {
        path: "forms",
        component: FormsComponent,
        data: {
          title: "Forms"
        }
      },
      {
        path: "tables",
        component: TablesComponent,
        data: {
          title: "Tables"
        }
      },
      {
        path: "paginations",
        component: PaginationsComponent,
        data: {
          title: "Pagination"
        }
      },
      {
        path: "messages",
        component: MessagesComponent,
        data: {
          title: "Messages"
        }
      },
      {
        path: "tours",
        component: ToursComponent,
        data: {
          title: "Tours"
        }
      },
      {
        path: "add-tour",
        component: AddToursComponent,
        data: {
          title: "Add Tours"
        }
      },
      // {
      //   path: "tours/:id/edit",
      //   component: AddToursComponent,
      //   data: {
      //     title: "Edit Tour"
      //   }
      // }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BaseRoutingModule {}
