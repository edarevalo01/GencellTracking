// Native Components
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

// Angular Components
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./components/login/login.component";
import { MainComponent } from "./components/main/main.component";
import { PersonaComponent } from "./components/views/persona/persona.component";
import { EpsComponent } from "./components/views/eps/eps.component";

// Primeng Components
import { ButtonModule } from "primeng/button";
import { ToolbarModule } from "primeng/toolbar";
import { MenubarModule } from "primeng/menubar";
import { TooltipModule } from "primeng/tooltip";
import { TableModule } from "primeng/table";
import { DropdownModule } from "primeng/dropdown";
import { InputTextModule } from "primeng/inputtext";
import { DialogModule } from "primeng/dialog";
import { CalendarModule } from "primeng/calendar";

@NgModule({
	declarations: [AppComponent, LoginComponent, MainComponent, PersonaComponent, EpsComponent],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		FormsModule,
		HttpClientModule,
		AppRoutingModule,
		ButtonModule,
		ToolbarModule,
		MenubarModule,
		TooltipModule,
		TableModule,
		DropdownModule,
		InputTextModule,
		DialogModule,
		CalendarModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
