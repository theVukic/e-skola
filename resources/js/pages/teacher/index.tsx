import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { usePage, router } from '@inertiajs/react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

interface Teacher {
  teacher_id: number;
  tenant_id: number;
  first_name: string;
  last_name: string;
  subject: string;
}

const breadcrumbs: BreadcrumbItem[] = [
   {
    title: 'Teachers',
    href: '/teachers',
   } 
];

const emptyForm = { first_name: '', last_name: '', subject: ''};

type FormState = typeof emptyForm & { id?: number };

export default function TeacherIndex() {
    const { teachers } = usePage<{ teachers?: Teacher[] }>().props;
    const teacherList = teachers ?? [];

    const [open, setOpen] = useState(false);
    const [form, setForm] = useState<FormState>(emptyForm);
    const [isEdit, setIsEdit] = useState(false);

    const handleOpenAdd = () => {
        setForm(emptyForm);
        setIsEdit(false);
        setOpen(true);
    };

    const handleOpenEdit = (teacher: Teacher) => {
        setForm({
            id: teacher.teacher_id,
            first_name: teacher.first_name,
            last_name: teacher.last_name,
            subject: teacher.subject,
        });
        setIsEdit(true);
        setOpen(true);
    };

    const handleClose = () => {
       setOpen(false);
       setForm(emptyForm);
       setIsEdit(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value});
    };

    const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  if (isEdit && form.id) {
    router.put(`/teachers/${form.id}`, form, { onSuccess: handleClose });
  } else {
    // create new teacher
    router.post('/teachers', form, { onSuccess: handleClose });
  }
};

    const handleDelete = (id: number) => {
        if (window.confirm('Da li ste sigurni da želite obrisati ovog profesora?')) {
        router.delete(`/teachers/${id}`);
        }
    };

    return (
  <AppLayout breadcrumbs={breadcrumbs}>
    <Card className="p-6 mt-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Profesori</h1>
        <Button onClick={handleOpenAdd}>Dodaj Profesora</Button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm rounded-lg">
          <thead className="bg-gray-100 dark:bg-neutral-800">
            <tr>
              <th className="px-3 py-2 text-left font-semibold">ID</th>
              <th className="px-4 py-2 text-left font-semibold">Ime</th>
              <th className="px-4 py-2 text-left font-semibold">Prezime</th>
              <th className="px-4 py-2 text-left font-semibold">Subjekt</th>
              <th className="px-4 py-2 text-left font-semibold">Akcija</th>
            </tr>
          </thead>

          <tbody>
            {teacherList.map((teacher) => (
              <tr
                key={teacher.teacher_id}
                className="border-b last:border-0 hover:bg-gray-50 dark:hover:bg-neutral-700"
              >
                <td className="px-4 py-2">{teacher.teacher_id}</td>
                <td className="px-4 py-2">{teacher.first_name}</td>
                <td className="px-4 py-2">{teacher.last_name}</td>
                <td className="px-4 py-2">{teacher.subject}</td>
                <td className="px-4 py-2">
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleOpenEdit(teacher)}
                    >
                      Promjeni
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(teacher.teacher_id)}
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
          <DialogTitle>
            {isEdit ? 'Promjeni Profesora' : 'Dodaj profesora'}
          </DialogTitle>
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
            <Label htmlFor="subject">
              Subjekt
              <Input
                id="subject"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                required
              />
            </Label>
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={handleClose}>
              Otkazi
            </Button>
            <Button type="submit">{isEdit ? 'Promjeni' : 'Dodaj'}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  </AppLayout>
)
}