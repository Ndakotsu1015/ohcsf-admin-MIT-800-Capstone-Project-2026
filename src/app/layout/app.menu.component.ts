import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { style } from '@angular/animations';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];
    bottomNavs: { label: string; icon: string; routerLink: string[]; styleClass: string; }[];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: '',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-home', routerLink: ['/admin/dashboard'], class: 'large-icon' },
                    {
                        label: 'Enrollment',
                        icon: 'pi pi-fw pi-circle-on',
                        class:'mx-3 small-icon',
                        routerLink: ['/admin/dashboard/enrollment']
                    },
                    {
                        label: 'Deployment',
                        icon: 'pi pi-fw pi-circle-on',
                        class:'mx-3 small-icon',
                        routerLink: ['/admin/dashboard/deployment']

                    },
                    {
                        label: 'Re-Deployment',
                        icon: 'pi pi-fw pi-circle-on'
                        ,class:'mx-3 small-icon',
                        routerLink: ['/admin/dashboard/redeployment']

                    },
                    {
                        label: 'Re-Deployment Request',
                        icon: 'pi pi-fw pi-circle-on'
                        ,class:'mx-3 small-icon',
                        routerLink: ['/admin/dashboard/redeployment/redeployment-request']

                    },
                    {
                        label: 'Reporting Log', icon: 'pi pi-fw',
                        routerLink: ['/admin/dashboard/deployment/reporting-log'],
                        styleClass: 'large-icon'
                    },

                ]
            },
            {

                items: [
                    // { label: 'Tracker /Status', icon: 'pi pi-fw pi-check-circle' },

                    {
                        label: 'Tracker /Status',
                        icon: 'pi pi-fw pi-check-circle',
                        items: [
                            {
                                label: 'Approval',
                                icon: 'pi pi-fw pi-circle-on',
                                routerLink: ['/admin/dashboard/tracker/approved'],
                                class: 'small-icon'

                            },
                            {
                                label: 'Pending',
                                icon: 'pi pi-fw pi-circle-on',
                                routerLink: ['/admin/dashboard/tracker/pending'],
                                class: 'small-icon'

                            },
                            {
                                label: 'Rejected',
                                icon: 'pi pi-fw pi-circle-on',
                                routerLink: ['/admin/dashboard/tracker/rejected'],
                                class: 'small-icon'

                            }
                        ]
                         ,class: 'large-icon'
                    },

                ]
            },
            {

                items: [
                    // { label: 'Tracker /Status', icon: 'pi pi-fw pi-check-circle' },

                    {
                    label: 'Settings',
                    icon: 'pi pi-fw pi-cog',
                        items: [
                            {
                                label: 'Agency',
                                icon: 'pi pi-fw pi-circle-on',
                                routerLink: ['/admin/dashboard/settings/agency-list'],
                                class: 'small-icon'

                            },
                            {
                                label: 'Department',
                                icon: 'pi pi-fw pi-circle-on',
                                routerLink: ['/auth/login'],
                                class: 'small-icon'

                            },
                            {
                                label: 'Ministry',
                                icon: 'pi pi-fw pi-circle-on',
                                routerLink: ['/auth/login'],
                                class: 'small-icon'

                            }
                        ]
                         ,class: 'large-icon'
                    },
                    {

                        label: 'Logout',
                        icon: 'pi pi-fw pi-power-off',
                        routerLink: ['/auth/login'],
                        styleClass: 'large-icon '
                    },
                ]
            },




        ];


    }
}
