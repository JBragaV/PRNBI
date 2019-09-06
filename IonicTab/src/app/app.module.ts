import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { EnginePageModule } from './engine/engine.module';
import { FotoFuelPageModule } from './engine/foto-fuel/foto-fuel.module';
import { Secao2PageModule } from './secao2/secao2.module';
import { Secao3PageModule } from './secao3/secao3.module';
import { Secao4PageModule } from './secao4/secao4.module';

import { IonicStorageModule } from "@ionic/storage";
import { EmailComposer } from "@ionic-native/email-composer/ngx";


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [HttpClientModule, BrowserModule, IonicModule.forRoot(), AppRoutingModule, EnginePageModule, FotoFuelPageModule,
            Secao2PageModule, Secao3PageModule, Secao4PageModule, IonicStorageModule.forRoot()], 
  providers: [
    StatusBar,
    SplashScreen,
    EmailComposer,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
