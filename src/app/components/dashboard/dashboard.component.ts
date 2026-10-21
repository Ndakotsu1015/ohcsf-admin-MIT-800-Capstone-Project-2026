import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    PLATFORM_ID,
    ViewChild,
    inject,
} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Subscription, debounceTime } from 'rxjs';
import { DeploymentEndpoint } from 'src/app/api/endpoints/deployment.endpoint';
import { AppTopBarComponent } from 'src/app/layout/app.topbar.component';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { environment } from 'src/environments/environment';
import { Product } from '../../api/product';
import { ProductService } from '../../service/product.service';

@Component({
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
    items!: MenuItem[];
    products!: Product[];
    datas: any = { data: [], table_data: [] };
    chartData: any;
    data: any;
    chartOptions: any;
    options: any;
    count: any
    subscription!: Subscription;
    filterOptions: any[];
    platformId = inject(PLATFORM_ID);
    totalDeployments: number = 0;
    totalRedeployedDeployments: number = 0;
    totalProposedRedeployments: number = 0;

    @ViewChild(AppTopBarComponent) appTopbar!: AppTopBarComponent;

    constructor(
        private productService: ProductService,
        public layoutService: LayoutService,
        public deploymentEndpoint: DeploymentEndpoint,
        private cd: ChangeDetectorRef,
        private readonly http: HttpClient
    ) {
        this.subscription = this.layoutService.configUpdate$
            .pipe(debounceTime(25))
            .subscribe(() => {
                this.initChart();
            });

        this.filterOptions = [
            { label: 'Filter', selected: true },
            { label: 'Option 1', value: '1' },
            { label: 'Option 2', value: '2' },
            { label: 'Option 3', value: '3' },
        ];
    }

    ngOnInit() {
        this.getTotalDeployments();
        this.getTotalProposedRedeployments();
        this.initChart();
        this.initChart2(); // ✅ Ensuring this function is called
        this.productService
            .getProductsSmall()
            .then((data) => (this.products = data));

        this.items = [
            { label: 'Add New', icon: 'pi pi-fw pi-plus' },
            { label: 'Remove', icon: 'pi pi-fw pi-minus' },
        ];
        this.getTotalRedeployedDeployments();

        this.http
            .get(`${environment.apiUrl}/dashboard/1`)
            .subscribe((response: any) => {
                const data2 = response.data;
                data2.forEach((item) => {
                    item.data = this.formatData(item.data);
                });
                this.datas.data = data2;
                console.log(data2);
            });
    }

    initChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue(
            '--text-color-secondary'
        );
        const surfaceBorder =
            documentStyle.getPropertyValue('--surface-border');

        this.chartData = {
            labels: [
                'Administrative',
                'Finance & Account',
                'Planning & Research',
                'HR Management',
                'Legal',
                'ICT',
            ],
            datasets: [
                {
                    label: 'Directors Cadre',
                    data: [65, 59, 80, 81, 56, 55],
                    backgroundColor:
                        documentStyle.getPropertyValue('--bluegray-700'),
                    borderColor:
                        documentStyle.getPropertyValue('--bluegray-700'),
                    tension: 0.4,
                },
                {
                    label: 'Senior Cadre',
                    data: [28, 48, 40, 19, 86, 27, 90],
                    backgroundColor:
                        documentStyle.getPropertyValue('--green-600'),
                    borderColor: documentStyle.getPropertyValue('--green-600'),
                    tension: 0.4,
                },
                {
                    label: 'Junior Cadre',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    backgroundColor: 'gold',
                    borderColor: 'gold',
                    tension: 0.4,
                },
            ],
        };

        this.chartOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: textColor,
                    },
                },
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false,
                    },
                },
                y: {
                    ticks: {
                        color: textColorSecondary,
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false,
                    },
                },
            },
        };

        // this.datas = [
        //     {
        //         chart_title: 'TEst',
        //         data: this.chartData,
        //         options: this.chartOptions,
        //         column_width: 6,
        //     },
        // ];
    }

    initChart2() {
        if (isPlatformBrowser(this.platformId)) {
            const documentStyle = getComputedStyle(document.documentElement);
            const textColor = documentStyle.getPropertyValue('--text-color');
            const textColorSecondary = documentStyle.getPropertyValue(
                '--text-color-secondary'
            );
            const surfaceBorder =
                documentStyle.getPropertyValue('--surface-border');

            this.data = {
                labels: [
                    'Solid Minerals Development',
                    'Marine and Blue Economy',
                    'Steel Development',
                    'Budget and Economic Planning',
                    'Humanitarian Affairs and Poverty Alleviation',
                    'Sports Development',
                    'Arts, Culture and Creative Economy/Tourism',
                    'Information and National Orientation',
                    'Women Affairs',
                    'Finance',
                    'Environment',
                    'Health and Social Welfare',
                    'Education',
                    'Youth Development',
                    'Justice',
                    'Housing & Urban Development',
                    'Water Resources and Sanitation',
                    'Information and Culture',
                    'Works',
                    'Mines and Steel Development',
                    'Petroleum Resources',
                    'Power',
                    'Aviation',
                    'Transport',
                    'Science and Technology and Innovation',
                    'Labour Employment and Productivity',
                    'Commerce and Industry',
                    'Agriculture and Food Security',
                    'Office of the Head of Civil Service of the Federation',
                    'Interior',
                    'Communication and Digital Economy',
                    'Foreign Affairs',
                    'Defense',
                ],
                datasets: [
                    {
                        type: 'bar',
                        label: 'Junior Cadre',
                        backgroundColor:
                            documentStyle.getPropertyValue('--bluegray-700'),
                        borderColor:
                            documentStyle.getPropertyValue('--bluegray-700'),
                        data: [
                            50, 25, 12, 48, 90, 76, 42, 50, 25, 12, 48, 90, 76,
                            42, 50, 25, 12, 48, 90, 76, 42, 50, 25, 12, 48, 90,
                            76, 42, 50, 25, 12, 48, 90,
                        ],
                    },
                    {
                        type: 'bar',
                        label: 'Senior Cadre',
                        backgroundColor:
                            documentStyle.getPropertyValue('--green-600'),
                        borderColor:
                            documentStyle.getPropertyValue('--green-600'),
                        data: [
                            50, 25, 12, 48, 90, 76, 42, 50, 25, 12, 48, 90, 76,
                            42, 50, 25, 12, 48, 90, 76, 42, 50, 25, 12, 48, 90,
                            76, 42, 50, 25, 12, 48, 90,
                        ],
                    },
                    {
                        type: 'bar',
                        label: 'Directors Cadre',
                        backgroundColor: 'gold',
                        borderColor: 'gold',
                        data: [
                            50, 25, 12, 48, 90, 76, 42, 50, 25, 12, 48, 90, 76,
                            42, 50, 25, 12, 48, 90, 76, 42, 50, 25, 12, 48, 90,
                            76, 42, 50, 25, 12, 48, 90,
                        ],
                    },
                ],
            };

            this.options = {
                maintainAspectRatio: false,
                aspectRatio: 0.8,
                plugins: {
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                    },
                    legend: {
                        labels: {
                            color: textColor,
                        },
                    },
                },
                scales: {
                    x: {
                        stacked: true,
                        ticks: {
                            color: textColorSecondary,
                        },
                        grid: {
                            color: surfaceBorder,
                            drawBorder: false,
                        },
                    },
                    y: {
                        stacked: true,
                        ticks: {
                            color: textColorSecondary,
                        },
                        grid: {
                            color: surfaceBorder,
                            drawBorder: false,
                        },
                    },
                },
            };

            console.log('Stacked Bar Chart Data:', this.data); // ✅ Debugging
            console.log('Stacked Bar Chart Options:', this.options); // ✅ Debugging

            this.cd.markForCheck(); // ✅ Ensure Angular detects changes

            // this.datas.push({chart_title: "TEst3", data: this.data, options: this.options, column_width:3 })
            // this.datas.push({
            //     chart_title: 'TEst3',
            //     data: this.data,
            //     options: this.options,
            //     column_width: 6,
            // });
            // this.datas.push({chart_title: "TEst3", data: this.data, options: this.options, column_width:3 })
        }
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    generateColors(count) {
        const colors = [];
        for (let i = 0; i < count; i++) {
            const r = Math.floor(Math.random() * 255);
            const g = Math.floor(Math.random() * 255);
            const b = Math.floor(Math.random() * 255);
            colors.push(`rgba(${r}, ${g}, ${b}, 0.2)`); // Background color
            colors.push(`rgba(${r}, ${g}, ${b}, 1)`); // Border color
        }
        return colors;
    }

    formatData(inputData) {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue(
            '--text-color-secondary'
        );
        const surfaceBorder =
            documentStyle.getPropertyValue('--surface-border');

        // Transform input data into basicData format
        let colors = this.generateColors(inputData.length);
        console.log()
        const basicData = {
            labels: inputData.map((item) => item.name), // Extract ministry names as labels
            datasets: [
                {
                    label: 'Total',
                    data: inputData.map((item) => item.total), // Extract totals as data
                    backgroundColor: colors.filter((_, i) => i % 2 === 0), // Even indices for background
                    borderColor: colors.filter((_, i) => i % 2 !== 0), // Odd indices for border
                    // backgroundColor:
                    //     documentStyle.getPropertyValue('--green-600'),
                    // borderColor: documentStyle.getPropertyValue('--green-600'),
                    tension: 0.4,
                    borderWidth: 1,
                },
            ],
        };

        console.log(basicData);
        return basicData;
    }

    getTotalDeployments(): void {
        this.deploymentEndpoint.countDeployments().subscribe(
          (response) => {
            this.totalDeployments =response.total_deployments;
          },
          (error) => {
            console.error('Error fetching deployment count:', error);
          }
        );
    }

    getTotalProposedRedeployments(): void {
        this.deploymentEndpoint.countProposedRedeployments().subscribe(

            (response) => {
                console.log('response', response.total_proposed_redeployments);

            this.totalProposedRedeployments =response.total_proposed_redeployments;
          },
          (error) => {
            console.error('Error fetching proposed re-deployment count:', error);
          }
        );
    }

    getTotalRedeployedDeployments(): void {
        this.deploymentEndpoint.list().subscribe(
          (response: any) => {
            let pendingRedeploymentsCount = 0;
            if (response && response.data) {
              for (const employeeData in response.data) {
                if (response.data.hasOwnProperty(employeeData)) {
                  const deployments = response.data[employeeData];
                  for (const deployment of deployments) {
                    if (deployment.status === 'Pending' && deployment.is_redeployed === true) {
                      pendingRedeploymentsCount++;
                    }
                  }
                }
              }
            }
            this.totalRedeployedDeployments = pendingRedeploymentsCount;
            console.log('Pending Redeployed Count:', this.totalRedeployedDeployments);
          },
          (error) => {
            console.error('Error fetching pending redeployed count:', error);
          }
        );
      }
}
