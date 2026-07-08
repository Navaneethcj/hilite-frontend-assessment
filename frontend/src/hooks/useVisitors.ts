import { useEffect } from 'react';
import { useVisitorStore } from '../store/visitor.store';

export function useVisitors() {
  const {
    visitors,
    totalCount,
    filters,
    loading,
    error,
    setFilters,
    fetchVisitors,
    clearError,
  } = useVisitorStore();

  useEffect(() => {
    void fetchVisitors();
  }, [filters, fetchVisitors]);

  return { visitors, totalCount, filters, loading, error, setFilters, clearError, refetch: fetchVisitors };
}

export function useVisitorDetail(id: string | undefined) {
  const { selectedVisitor, loading, error, fetchVisitorById, clearSelectedVisitor } =
    useVisitorStore();

  useEffect(() => {
    if (id) void fetchVisitorById(id);
    return () => clearSelectedVisitor();
  }, [id, fetchVisitorById, clearSelectedVisitor]);

  return { visitor: selectedVisitor, loading, error };
}
