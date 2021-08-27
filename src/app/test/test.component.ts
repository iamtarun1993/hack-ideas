import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TestService } from '../services/test.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  data!: { name: string; image: string; description: string; dateLastEdited: string; }[];
  startIndex!: number;
  lastIndex!: number;
  originalData!: { name: string; image: string; description: string; dateLastEdited: string; }[];
  page!: number;
  itemCount!: number;
  pageCountOptions!: number[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private testService: TestService
  ) { }

  next () {
    this.page ++;
    this.location.replaceState(`/test/${this.page}`);
  }

  prev () {
    this.page --;
    this.location.replaceState(`/test/${this.page}`);
  }

  sort(val: any) {
    let value = (document.getElementById('mySelect') as HTMLSelectElement).value;

    if (value === 'title') {
      this.data = this.data.sort((first, second) => {
        return (first.name > second.name) ? 1 : -1
      })
    } else if (value === 'date') {
      this.data = this.data.sort((first, second) => {
        return (first.dateLastEdited > second.dateLastEdited) ? 1 : -1
      })
    } else {
      this.data = this.originalData;
    }

  }

  typing(event: any) {
    let value = (document.getElementById('myInput') as HTMLInputElement).value;

    if (value) {
      if ((value.indexOf("\"") === 0) && (value.lastIndexOf("\"") === value.length -1 )) {
        let val = value.substring(1, value.length -1)
        this.data = this.originalData.filter((item) => {
          return item.name.toLowerCase().indexOf(val.toLowerCase()) > -1 || item.description.toLowerCase().indexOf(val.toLowerCase()) > -1;
        }) 
      } else {
        let searchItems = value.split(" ");
        console.log(searchItems)
        this.data = this.originalData.filter((item) => {
          var found = true;
          searchItems.forEach((searchItem) => {
            if (item.name.toLowerCase().indexOf(searchItem.toLowerCase()) > -1 || item.description.toLowerCase().indexOf(searchItem.toLowerCase()) > -1) {
              found = true
            } else {
              found = false
            }
          })

          if (found) {
            return true;
          } else {
            return false;
          }
        })
      }
      
    } else {
      this.data = this.originalData
    }
  }

  changePageCount(event: any) {
    let value = (document.getElementById('noOfItems') as HTMLSelectElement).value;
    this.itemCount = parseInt(value);
  }

  
  ngOnInit(): void {
    this.startIndex = 0;
    this.lastIndex = 6;
    this.page = parseInt(this.activatedRoute.snapshot.params.id || 1);
    this.location.replaceState(`/test/${this.page}`);
    

    if (window.innerWidth > 768) {
      this.itemCount = 3;
      this.pageCountOptions = [3, 6, 9, 12, 15];
    } else if (window.innerWidth > 425) {
      this.itemCount = 4;
      this.pageCountOptions = [4, 8, 12, 16, 20];
    } else {
      this.itemCount = 5;
      this.pageCountOptions = [5, 10, 15, 20];
    }
    

    this.testService.getAllData().subscribe((res) => {
      this.originalData = res;
      this.data = Object.assign([], this.originalData);
    })
  }

}
