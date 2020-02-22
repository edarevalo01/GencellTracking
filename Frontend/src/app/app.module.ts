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
import { PersonaComponent } from "./components/persona/persona.component";
import { EpsComponent } from "./components/eps/eps.component";

// Primeng Components

@NgModule({
	declarations: [AppComponent, LoginComponent, PersonaComponent, EpsComponent],
	imports: [BrowserModule, BrowserAnimationsModule, FormsModule, HttpClientModule, AppRoutingModule],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
