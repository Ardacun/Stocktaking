import { Component } from '@angular/core';

@Component({
  selector: 'app-setting-list',
  standalone: true,
  imports: [],
  templateUrl: './setting-list.component.html',
  styleUrl: './setting-list.component.css'
})
export class SettingListComponent {

  saveSettings(): void {
    console.log("Settings saved");
  }
  
}
