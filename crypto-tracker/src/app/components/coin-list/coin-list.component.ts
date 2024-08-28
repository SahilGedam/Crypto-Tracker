import { OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { CurrencyService } from '../../service/currency.service';

@Component({
  selector: 'app-coin-list',
  templateUrl: './coin-list.component.html',
  styleUrl: './coin-list.component.css',
})
export class CoinListComponent implements OnInit {
  bannerData: any = [];
  dataSource: any = [];
  currency: string = 'INR';
  displayedColumns: string[] = [
    'current_price',
    'symbol',
    'price_change_percentage_24h',
    'market_cap',
  ];
  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private api: ApiService,
    private router: Router,
    private currencyService: CurrencyService
  ) {}
  ngOnInit(): void {
    // this.getAllData();
    // this.getBannerData();
    this.currencyService.getCurrency().subscribe((val) => {
      this.currency = val;
      this.getAllData();
      this.getBannerData();
    });
  }
  getBannerData() {
    this.api.getTrendingCurrency('INR').subscribe(
      (res) => {
        // console.log(res);
        this.bannerData = res;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  getAllData() {
    this.api.getCurrency('INR').subscribe(
      (res) => {
        this.dataSource = new MatTableDataSource<any>(res);
        console.log(this.dataSource);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  gotoDetails(row: any) {
    this.router.navigate(['coin-detail', row.id]);
  }
}
