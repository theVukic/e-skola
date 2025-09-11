import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { usePage, router } from '@inertiajs/react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

interface Course {
  course_id: number;
  tenant_id: number;
  course_name: string;
  teacher_id: number;
}

interface Teacher {
    teacher_id: number;
    first_name: string;
    last_name: string;
}

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Kursevi', href: '/courses' },
];

const emptyForm = { course_name: '', teacher_id: '' };
type FormState = typeof emptyForm & { id?: number };

export default function CourseIndex() {
  const { courses, teachers } = usePage<{ courses?: Course[]; teachers?: Teacher[] }>().props;
  const courseList = courses ?? [];
  const teacherList = teachers ?? [];

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [isEdit, setIsEdit] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleOpenAdd = () => {
    setForm(emptyForm);
    setIsEdit(false);
    setOpen(true);
  };

  const handleOpenEdit = (course: Course) => {
    setForm({
      id: course.course_id,
      course_name: course.course_name,
      teacher_id: String(course.teacher_id),
    });
    setIsEdit(true);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setForm(emptyForm);
    setIsEdit(false);
    setSaving(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      course_name: form.course_name,
      teacher_id: form.teacher_id,
    };

    const opts = {
      preserveScroll: true,
      onSuccess: () => {
        handleClose();
        router.reload({ only: ['courses'] });
      },
      onError: () => {
        setSaving(false);
      },
      onFinish: () => {
        setSaving(false);
      },
    } as const;

    if (isEdit && form.id) {
      router.put(`/courses/${form.id}`, payload, opts);
    } else {
      router.post('/courses', payload, opts);
    }
  };

  const handleDelete = (id: number) => {
    if (!id) return;
    if (window.confirm('Da li ste sigurni da želite obrisati ovoj kurs?')) {
      router.delete(`/courses/${id}`, {
        preserveScroll: true,
        onSuccess: () => router.reload({ only: ['courses'] }),
      });
    }
  };

  const getTeacherName = (teacher_id: number) => {
    const teacher = teacherList.find(t => Number(t.teacher_id) === Number(teacher_id));
    return teacher ? `${teacher.first_name} ${teacher.last_name}` : 'Nepoznat Profesor';
  };

    return (
    <AppLayout breadcrumbs={breadcrumbs}>
        <Card className="p-6 mt-6">
        <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">Kursevi</h1>
            <Button onClick={handleOpenAdd}>Dodaj Kurs</Button>
        </div>

        <div className="overflow-x-auto">
            <table className="min-w-full border text-sm rounded-lg">
            <thead className="bg-gray-100 dark:bg-neutral-800">
                <tr>
                <th className="px-3 py-2 text-left font-semibold">ID</th>
                <th className="px-4 py-2 text-left font-semibold">Naziv</th>
                <th className="px-4 py-2 text-left font-semibold">Profesor</th>
                <th className="px-4 py-2 text-left font-semibold">Akcija</th>
                </tr>
            </thead>

            <tbody>
                {courseList.map((course) => (
                <tr
                    key={course.course_id}
                    className="border-b last:border-0 hover:bg-gray-50 dark:hover:bg-neutral-700"
                >
                    <td className="px-4 py-2">{course.course_id}</td>
                    <td className="px-4 py-2">{course.course_name}</td>
                    <td className="px-4 py-2">{getTeacherName(course.teacher_id)}</td>
                    <td className="px-4 py-2">
                    <div className="flex gap-2">
                        <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleOpenEdit(course)}
                        >
                        Promjeni
                        </Button>
                        <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(course.course_id)}
                        >
                        Obrisi
                        </Button>
                    </div>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        </Card>

        <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
            <DialogHeader>
            <DialogTitle>{isEdit ? 'Promjeni kurs' : 'Dodaj kurs'}</DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <Label htmlFor="course_name">
                Naziv kursa
                <Input
                    id="course_name"
                    name="course_name"
                    value={form.course_name}
                    onChange={handleChange}
                    required
                />
                </Label>
            </div>

            <div>
                <Label htmlFor="teacher_id">
                Profesor
                <select
                    id="teacher_id"
                    name="teacher_id"
                    className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    value={form.teacher_id}
                    onChange={(e) => setForm({ ...form, teacher_id: e.target.value })}
                    required
                >
                    <option value="" disabled>
                    — Odaberi profesora —
                    </option>
                    {teacherList.map((t) => (
                    <option key={t.teacher_id} value={String(t.teacher_id)}>
                        {t.first_name} {t.last_name}
                    </option>
                    ))}
                </select>
                </Label>
            </div>

            <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={handleClose}>
                Otkazi
                </Button>
                <Button type="submit" disabled={saving}>
                {isEdit ? (saving ? 'Spašavam...' : 'Promjeni') : (saving ? 'Spašavam...' : 'Dodaj')}
                </Button>
            </div>
            </form>
        </DialogContent>
        </Dialog>
    </AppLayout>
);

}