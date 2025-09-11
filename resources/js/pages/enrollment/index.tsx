import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { usePage, router } from '@inertiajs/react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

interface Enrollment {
  enrollment_id: number;
  tenant_id: number;
  student_id: number;
  course_id: number;
  enrollment_date: string;
}

interface Student {
  student_id: number;
  first_name: string;
  last_name: string;
}

interface Course {
  course_id: number;
  course_name: string;
}

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Upisi', href: '/enrollments' },
];

const emptyForm = { student_id: '', course_id: '', enrollment_date: '' };
type FormState = typeof emptyForm & { id?: number };

export default function EnrollmentIndex() {
  const { enrollments, students, courses } = usePage<{ 
    enrollments?: Enrollment[];
    students?: Student[];
    courses?: Course[]; 
    }>().props;

  const enrollmentList = enrollments ?? [];
  const studentList = students ?? [];
  const courseList = courses ?? [];

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [isEdit, setIsEdit] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleOpenAdd = () => {
    setForm(emptyForm);
    setIsEdit(false);
    setOpen(true);
  };

  const handleOpenEdit = (enrollment: Enrollment) => {
    setForm({
      id: enrollment.enrollment_id,
      student_id: String(enrollment.student_id),
      course_id: String(enrollment.course_id),
      enrollment_date: enrollment.enrollment_date,
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      ...form,
      student_id: Number(form.student_id),
      course_id: Number(form.course_id),
    };

    const opts = {
      preserveScroll: true,
      onSuccess: () => {
        handleClose();
        router.reload({ only: ['enrollments'] });
      },
      onError: () => {
        setSaving(false);
      },
      onFinish: () => {
        setSaving(false);
      },
    } as const;

    if (isEdit && form.id) {
      router.put(`/enrollments/${form.id}`, payload, opts);
    } else {
      router.post('/enrollments', payload, opts);
    }
  };

  const handleDelete = (id: number) => {
    if (!id) return;
    if (window.confirm('Da li ste sigurni da želite obrisati ovoj upis?')) {
      router.delete(`/enrollments/${id}`, {
        preserveScroll: true,
        onSuccess: () => router.reload({ only: ['enrollments'] }),
      });
    }
  };

  const getStudentName = (student_id: number) => {
    const student = studentList.find(s => s.student_id === Number(student_id));
    return student ? `${student.first_name} ${student.last_name}` : student_id;
  };

  const getCourseName = (course_id: number) => {
    const course = courseList.find(c => c.course_id === course_id);
    return course ? course.course_name : course_id;
  };

  return (
  <AppLayout breadcrumbs={breadcrumbs}>
    <Card className="p-6 mt-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Upisi</h1>
        <Button onClick={handleOpenAdd}>Dodaj Upis</Button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm rounded-lg">
          <thead className="bg-gray-100 dark:bg-neutral-800">
            <tr>
              <th className="px-3 py-2 text-left font-semibold">ID</th>
              <th className="px-4 py-2 text-left font-semibold">Student</th>
              <th className="px-4 py-2 text-left font-semibold">Kurs</th>
              <th className="px-4 py-2 text-left font-semibold">Datum upisa</th>
              <th className="px-4 py-2 text-left font-semibold">Akcija</th>
            </tr>
          </thead>

          <tbody>
            {enrollmentList.map((enrollment) => (
              <tr
                key={enrollment.enrollment_id}
                className="border-b last:border-0 hover:bg-gray-50 dark:hover:bg-neutral-700"
              >
                <td className="px-4 py-2">{enrollment.enrollment_id}</td>
                <td className="px-4 py-2">{getStudentName(enrollment.student_id)}</td>
                <td className="px-4 py-2">{getCourseName(enrollment.course_id)}</td>
                <td className="px-4 py-2">
                  {enrollment.enrollment_date
                    ? new Date(enrollment.enrollment_date).toLocaleDateString()
                    : '—'}
                </td>
                <td className="px-4 py-2">
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleOpenEdit(enrollment)}
                    >
                      Promjeni
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(enrollment.enrollment_id)}
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
          <DialogTitle>{isEdit ? 'Promjeni upis' : 'Dodaj upis'}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="student_id">
              Student
              <select
                id="student_id"
                name="student_id"
                className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ring"
                value={form.student_id}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  — Odaberi studenta —
                </option>
                {studentList.map((s) => (
                  <option key={s.student_id} value={String(s.student_id)}>
                    {s.first_name} {s.last_name}
                  </option>
                ))}
              </select>
            </Label>
          </div>

          <div>
            <Label htmlFor="course_id">
              Kurs
              <select
                id="course_id"
                name="course_id"
                className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ring"
                value={form.course_id}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  — Odaberi kurs —
                </option>
                {courseList.map((c) => (
                  <option key={c.course_id} value={String(c.course_id)}>
                    {c.course_name}
                  </option>
                ))}
              </select>
            </Label>
          </div>

          <div>
            <Label htmlFor="enrollment_date">
              Datum upisa
              <Input
                id="enrollment_date"
                name="enrollment_date"
                type="date"
                value={form.enrollment_date}
                onChange={handleChange}
                required
              />
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

  