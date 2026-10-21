import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ConfirmationService, MessageService } from "primeng/api";
import { PRIMENG_IMPORTS } from "./prime-ng";

@NgModule({
  imports: [CommonModule, ...PRIMENG_IMPORTS],
  exports: [...PRIMENG_IMPORTS],
  providers: [MessageService, ConfirmationService],
})
export class UiModule { }
