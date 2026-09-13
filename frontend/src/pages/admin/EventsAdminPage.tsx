import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import LoadingSkeleton from '@/components/common/LoadingSkeleton';
import { apiFetch } from '@/lib/api';
import type { SchoolEvent } from '@/types/admin';

const EventsAdminPage = () => {
  const [items, setItems] = useState<SchoolEvent[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const data = await apiFetch<SchoolEvent[]>('/api/events');
      setItems(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchItems(); }, []);

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Eventos (admin)</h1>
        <Button onClick={() => alert('Crear no implementado aún')}>Crear</Button>
      </div>
      <div className="grid gap-4">
        {loading && <LoadingSkeleton variant="cards" rows={3} />}
        {!loading && items.length === 0 && (
          <p className="py-8 text-center text-muted-foreground">No hay eventos cargados.</p>
        )}
        {items.map((i) => (
          <Card key={i.id}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{i.title} — {new Date(i.start_at).toLocaleDateString()}</span>
                <div className="space-x-2">
                  <Button variant="outline" onClick={() => alert('Editar no implementado')}>Editar</Button>
                  <Button variant="destructive" onClick={() => alert('Borrar no implementado')}>Borrar</Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{i.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EventsAdminPage;
