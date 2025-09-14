import { Head } from '@inertiajs/react';

import AppearanceTabs from '@/components/appearance-tabs';
import HeadingSmall from '@/components/heading-small';
import { type BreadcrumbItem } from '@/types';

import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { appearance } from '@/routes';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Postavke za izgled aplikacije',
        href: appearance().url,
    },
];

export default function Appearance() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Postavke za izgled aplikacije" />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Postavke za izgled aplikacije" description="Promjeni izgled aplikacije" />
                    <AppearanceTabs />
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
