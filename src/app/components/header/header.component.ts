import { Component, HostListener, Renderer2, ElementRef, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{

  constructor(public dataService: DataService, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.toggleScrolled();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.toggleScrolled();
  }

  @HostListener('window:load', [])
  onWindowLoad() {
    this.toggleScrolled();
  }

  toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader?.classList.contains('scroll-up-sticky') && !selectHeader?.classList.contains('sticky-top') && !selectHeader?.classList.contains('fixed-top')) return;
    if (window.scrollY > 100) {
      this.renderer.addClass(selectBody, 'scrolled');
    } else {
      this.renderer.removeClass(selectBody, 'scrolled');
    }
  }

  toggleMobileNav() {
    const selectBody = document.querySelector('body');
    const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');
    if (selectBody?.classList.contains('mobile-nav-active')) {
      this.renderer.removeClass(selectBody, 'mobile-nav-active');
      this.renderer.removeClass(mobileNavToggleBtn, 'bi-x');
      this.renderer.addClass(mobileNavToggleBtn, 'bi-list');
    } else {
      this.renderer.addClass(selectBody, 'mobile-nav-active');
      this.renderer.removeClass(mobileNavToggleBtn, 'bi-list');
      this.renderer.addClass(mobileNavToggleBtn, 'bi-x');
    }
  }

  hideMobileNav() {
    const selectBody = document.querySelector('body');
    if (selectBody?.classList.contains('mobile-nav-active')) {
      this.toggleMobileNav();
    }
  }

  async onLogout() {
    await this.dataService.logOut();
  }
}
