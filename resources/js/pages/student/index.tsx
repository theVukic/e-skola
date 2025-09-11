import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { usePage, router } from '@inertiajs/react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

interface Student {
  student_id: number;
  tenant_id: number;
  first_name: string;
  last_name: string;
  grade: string;
}

type Paginated<T> = { data: T[]; links?: unknown; meta?: unknown };

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Studenti', href: '/students' },
];

const emptyForm = { first_name: '', last_name: '', grade: '' };
type FormState = typeof emptyForm & { id?: number };

export default function StudentIndex() {
  const { students: raw } = usePage<{ students?: Student[] | Paginated<Student> }>().props;
  const studentList: Student[] = Array.isArray(raw) ? raw : (raw?.data ?? []);

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [isEdit, setIsEdit] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleOpenAdd = () => {
    setForm(emptyForm);
    setIsEdit(false);
    setOpen(true);
  };

  const handleOpenEdit = (student: Student) => {
    setForm({
      id: student.student_id,
      first_name: student.first_name,
      last_name: student.last_name,
      grade: String(student.grade),
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
      first_name: form.first_name,
      last_name: form.last_name,
      grade: form.grade,
    };

    const opts = {
      preserveScroll: true,
      onSuccess: () => {
        handleClose();
        router.reload({ only: ['students'] });
      },
      onError: () => {
        setSaving(false);
      },
      onFinish: () => {
        setSaving(false);
      },
    } as const;

    if (isEdit && form.id) {
      router.put(`/students/${form.id}`, payload, opts);
    } else {
      router.post('/students', payload, opts);
    }
  };

  const handleDelete = (id: number) => {
    if (!id) return;
    if (window.confirm('Da li ste sigurni da želite obrisati ovog studenta?')) {
      router.delete(`/students/${id}`, {
        preserveScroll: true,
        onSuccess: () => router.reload({ only: ['students'] }),
      });
    }
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Card className="p-6 mt-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Studenti</h1>
          <Button onClick={handleOpenAdd}>Dodaj Studenta</Button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border text-sm rounded-lg">
            <thead className="bg-gray-100 dark:bg-neutral-800">
              <tr>
                <th className="px-3 py-2 text-left font-semibold">ID</th>
                <th className="px-4 py-2 text-left font-semibold">Ime</th>
                <th className="px-4 py-2 text-left font-semibold">Prezime</th>
                <th className="px-4 py-2 text-left font-semibold">Razred</th>
                <th className="px-4 py-2 text-left font-semibold">Akcija</th>
              </tr>
            </thead>

            <tbody>
              {studentList.map((student) => (
                <tr
                  key={student.student_id}
                  className="border-b last:border-0 hover:bg-gray-50 dark:hover:bg-neutral-700"
                >
                  <td className="px-4 py-2">{student.student_id}</td>
                  <td className="px-4 py-2">{student.first_name}</td>
                  <td className="px-4 py-2">{student.last_name}</td>
                  <td className="px-4 py-2">{student.grade}</td>
                  <td className="px-4 py-2">
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleOpenEdit(student)}
                      >
                        Promjeni
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(student.student_id)}
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
            <DialogTitle>{isEdit ? 'Promjeni studenta' : 'Dodaj studenta'}</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="first_name">
                Ime
                <Input
                  id="first_name"
                  name="first_name"
                  value={form.first_name}
                  onChange={handleChange}
                  required
                />
              </Label>
            </div>
            <div>
              <Label htmlFor="last_name">
                Prezime
                <Input
                  id="last_name"
                  name="last_name"
                  value={form.last_name}
                  onChange={handleChange}
                  required
                />
              </Label>
            </div>
            <div>
              <Label htmlFor="grade">
                Razred
                <Input
                  id="grade"
                  name="grade"
                  value={form.grade}
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
