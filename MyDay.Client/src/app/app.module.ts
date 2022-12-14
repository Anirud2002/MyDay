import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { ExploreComponent } from './components/explore/explore.component';
import { HeaderComponent } from './components/header/header.component'; 
import { PageTitleComponent } from './components/page-title/page-title.component';
import { FloatingButtonComponent } from './components/floating-button/floating-button.component';
import { JournalsComponent } from './components/journals/journals.component';
import { SupportComponent } from './components/support/support.component';
import { ProfileComponent } from './components/profile/profile.component';
import { InfoComponent } from './components/profile/components/info/info.component';
import { MyPostsComponent } from './components/profile/components/my-posts/my-posts.component';
import { MyJournalsComponent } from './components/profile/components/my-journals/my-journals.component';
import { CommentDialogueComponent } from './components/comment-dialogue/comment-dialogue.component';
import { DropdownItemsPipe } from './_pipes/dropdown-items.pipe';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { TokenInterceptor } from './_interceptors/token.interceptor';
import { CacheInterceptor } from './_interceptors/cache.interceptor';
import { ReactionsComponent } from './components/reactions/reactions.component';
import { PostOptionsComponent } from './components/post-options/post-options.component';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    ExploreComponent,
    HeaderComponent,
    PageTitleComponent,
    FloatingButtonComponent,
    JournalsComponent,
    SupportComponent,
    ProfileComponent,
    InfoComponent,
    MyPostsComponent,
    MyJournalsComponent,
    CommentDialogueComponent,
    DropdownItemsPipe,
    SignInComponent,
    SignUpComponent,
    ReactionsComponent,
    PostOptionsComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule,
    FontAwesomeModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
