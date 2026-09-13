import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import LoadingSkeleton from '@/components/common/LoadingSkeleton';
import { useAuth } from '@/hooks/useAuth';
import { apiFetch } from '@/lib/api';
import type { Setting } from '@/types/admin';

const SettingsAdminPage = () => {
  const [items, setItems] = useState<Setting[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Setting | null>(null);
  const [keyField, setKeyField] = useState('');
  const [valueField, setValueField] = useState('');
  const { token } = useAuth();

  const fetchItems = async () => {
    setLoading(true);
    try {
      const data = await apiFetch<Setting[]>('/api/settings');
      setItems(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchItems(); }, []);

  const openCreate = () => {
    setEditing(null);
    setKeyField('');
    setValueField('');
    setOpen(true);
  };

  const openEdit = (item: Setting) => {
    setEditing(item);
    setKeyField(item.key);
    setValueField(item.value);
    setOpen(true);
  };

  const save = async () => {
    if (!keyField) return alert('Key requerido');
    try {
      if (editing) {
        await apiFetch(`/api/settings/${encodeURIComponent(editing.key)}`, {
          method: 'PUT',
          token,
          body: { key: keyField, value: valueField },
        });
      } else {
        await apiFetch('/api/settings', {
          method: 'POST',
          token,
          body: { key: keyField, value: valueField },
        });
      }
      setOpen(false);
      fetchItems();
    } catch {
      alert('Error al guardar');
    }
  };

  const remove = async (item: Setting) => {
    if (!confirm(`Eliminar ajuste ${item.key}?`)) return;
    try {
      await apiFetch(`/api/settings/${encodeURIComponent(item.key)}`, { method: 'DELETE', token });
      fetchItems();
    } catch {
      alert('Error al eliminar');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Ajustes del Sitio (admin)</h1>
        <div className="flex items-center gap-2">
          <Button onClick={openCreate}>Crear ajuste</Button>
        </div>
      </div>
      <div className="grid gap-4">
        {loading && <LoadingSkeleton variant="cards" rows={3} />}
        {!loading && items.length === 0 && (
          <p className="py-8 text-center text-muted-foreground">No hay ajustes configurados.</p>
        )}
        {items.map((i) => (
          <Card key={i.key}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{i.key}</span>
                <div className="space-x-2">
                  <Button variant="outline" onClick={() => openEdit(i)}>Editar</Button>
                  <Button variant="destructive" onClick={() => remove(i)}>Eliminar</Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="text-sm whitespace-pre-wrap">{i.value}</pre>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={open} onOpenChange={(o) => setOpen(o)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing ? 'Editar ajuste' : 'Crear ajuste'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <label htmlFor="setting-key" className="block text-sm font-medium">Key</label>
              <Input
                id="setting-key"
                value={keyField}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setKeyField(e.target.value)}
                disabled={!!editing}
              />
            </div>
            <div>
              <label htmlFor="setting-value" className="block text-sm font-medium">Value</label>
              <textarea
                id="setting-value"
                className="w-full rounded border p-2"
                rows={8}
                value={valueField}
                onChange={(e) => setValueField(e.target.value)}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="ghost" onClick={() => setOpen(false)}>Cancelar</Button>
              <Button onClick={save}>{editing ? 'Guardar' : 'Crear'}</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SettingsAdminPage;
