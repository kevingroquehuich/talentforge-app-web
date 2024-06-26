import { Component, OnInit, ViewChild, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { BreadcrumbsComponent } from '../../../components/breadcrumbs/breadcrumbs.component';
import { DataService } from '../../../services/data.service';
import { CourseData, ModuleData, SectionModuleData } from '../../../models/course-data.model';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [BreadcrumbsComponent, MatExpansionModule, MatProgressBarModule, MatIconModule, MatButtonModule, MatCardModule],
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.scss'
})
export default class CourseDetailComponent implements OnInit {

  step = signal(0);
  moduleSelected: ModuleData | null = null;
  sectionSelected: SectionModuleData | null = null;
  course: CourseData | null = null;

  @ViewChild('videoPlayer') videoplayer: any;
  public startedPlay: boolean = false;
  public show: boolean = false;


  constructor(private route: ActivatedRoute, private dataService: DataService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadCourseData(id)
      console.log('Course data', this.course);
    }
  }

  loadCourseData(courseId: string): void {
    this.dataService.getCourseWithModulesAndSections(courseId).subscribe({
      next: (course) => {
        this.course = course;
        console.log('Course with modules and sections:', this.course);
      },
      error: (error) => {
        console.error('Error fetching course data:', error);
      }
    });
  }

  setStep(index: number) {
    this.step.set(index);
  }

  nextStep() {
    this.step.update(i => i + 1);
  }

  prevStep() {
    this.step.update(i => i - 1);
  }

  selectModule(module: ModuleData) {
    this.moduleSelected = module;
    this.sectionSelected = null;
  }

  selectSection(section: SectionModuleData): void {
    this.sectionSelected = section;
  }

  calculateProgress(modulesCourse: ModuleData[]): number {
    const completedModules = modulesCourse.filter(modulo => modulo.done).length;
    return (completedModules / modulesCourse.length) * 100;
  }

  // Método para marcar un módulo como completado
  markAsDone(module: ModuleData) {
    module.done = true;
  }

  pauseVideo(videoplayer: any) {
    videoplayer.nativeElement.play();
    // this.startedPlay = true;
    // if(this.startedPlay == true)
    // {
    setTimeout(() => {
      videoplayer.nativeElement.pause();
      if (videoplayer.nativeElement.paused) {
        this.show = !this.show;
      }
    }, 5000);
    // }
  }
}
