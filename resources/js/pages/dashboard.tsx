import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";
import { Head, usePage } from '@inertiajs/react';
import { Users, Book, GraduationCap, BookOpen, ListChecks } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Kontrolna tabla', href: '/dashboard' },
];

const stats = [
    {
      label: 'Studenti',
      icon: Users,
      key: 'totalStudents',
      description: 'Ukupan broj učenika u vašoj školi',
      color: 'text-red-500',
    },
    {
        label: 'Kursevi',
        icon: Book,
        key: 'totalCourses',
        description: 'Ukupno ponuđenih kurseva',
        color: 'text-blue-500',
    },
    {
        label: 'Profesori',
        icon: GraduationCap,
        key: 'totalTeachers',
        description: 'Ukupno profesora',
        color: 'text-green-500',
    },
    {
        label: 'Predmeti',
        icon: BookOpen,
        key: 'totalSubjects',
        description: 'Jedinstveni predmeti koji se predaju',
        color: 'text-orange-500',
    },
    {
        label: 'Upisi',
        icon: ListChecks,
        key: 'totalEnrollments',
        description: 'Ukupno kurseva upisanih',
        color: 'text-purple-500',
    },
];

export default function Dashboard() {
    const pageProps = usePage().props as any;

    return (
    <AppLayout breadcrumbs={breadcrumbs}>
        <Head title={String(pageProps.schoolName ?? 'Kontrolna tabla')} />

        <div className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-neutral-900 dark:via-neutral-950 dark:to-neutral-900" />
        <div className="p-6 sm:p-8">
            <div className="flex items-center justify-between">
            <div>
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                {pageProps.schoolName ?? 'Kontrolna tabla'}
                </h1>
                <p className="mt-2 text-sm sm:text-base text-muted-foreground">
                Pregled ključnih metrika
                </p>
            </div>
            </div>

            <div className="mt-6 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-12">
            {stats.map((stat, idx) => {
                const Icon = stat.icon;
                const hrefMap: Record<string, string> = {
                Studenti: '/students',
                Kursevi: '/courses',
                Profesori: '/teachers',
                Predmeti: '/teachers',
                Upisi: '/enrollments',
                };
                const href = hrefMap[stat.label] ?? '#';
                const value = pageProps[stat.key] ?? 0;

                const spanClass =
                idx === 0 ? 'lg:col-span-4' :
                idx === 1 ? 'lg:col-span-4' :
                idx === 2 ? 'lg:col-span-4' :
                idx === 3 ? 'lg:col-span-6' :
                'lg:col-span-6';

                return (
                <a key={stat.key} href={href} className={`group focus:outline-none ${spanClass}`}>
                    <Card className="h-full border border-border/60 backdrop-blur supports-[backdrop-filter]:bg-background/70 transition-all hover:shadow-lg hover:-translate-y-0.5 focus-visible:ring-2">
                    <div className="p-5 sm:p-6">
                        <div className="flex items-start justify-between">
                        <div>
                            <div className="text-sm font-medium text-muted-foreground">{stat.label}</div>
                            <div className="mt-1 text-4xl font-extrabold tabular-nums leading-none">
                            {value}
                            </div>
                            <p className="mt-2 text-sm text-muted-foreground">{stat.description}</p>
                        </div>

                        <span className="inline-flex h-11 w-11 items-center justify-center rounded-full ring-1 ring-black/5 dark:ring-white/10 bg-gradient-to-br from-white to-neutral-100 dark:from-neutral-800 dark:to-neutral-900 shadow-sm group-hover:shadow-md transition-shadow">
                            <Icon className={`h-5 w-5 ${stat.color}`} />
                        </span>
                        </div>
                    </div>
                    </Card>
                </a>
                );
            })}
            </div>
        </div>
        </div>
    </AppLayout>
    );
}