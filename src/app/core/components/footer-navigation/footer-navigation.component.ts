import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'jpix-footer-nav',
    templateUrl: './footer-navigation.component.html',
    styleUrls: ['./footer-navigation.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class FooterNavigationComponent {
    items = [
        {
            title: 'Support',
            links: [
                {
                    title: 'Contact Us',
                    link: '/contact'
                },
                {
                    title: 'FAQs',
                    link: '/faqs'
                }
            ]
        },
        {
            title: 'Learn More',
            links: [
                {
                    title: 'Privacy Policy',
                    url: 'http://www.jostens.com/apps/shop/help/shared/privacy.asp',
                    target: '_blank'
                },
                {
                    title: 'Change, Cancel and Return Policy',
                    link: '/return-policy'
                }
            ]
        }
    ];
}