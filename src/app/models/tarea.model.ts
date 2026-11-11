export interface Tarea {
  id?: number;
  titulo: string;
  descripcion: string;
  completada: boolean;
  prioridad: 'Alta' | 'Media' | 'Baja';
  origen?: 'Local' | 'REST';
}

export interface TodoExterno {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}
