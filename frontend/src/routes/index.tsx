import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AppShell } from '../components/layout/AppShell';
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import VisitorListPage from '../pages/VisitorListPage';
import AddVisitorPage from '../pages/AddVisitorPage';
import VisitorDetailPage from '../pages/VisitorDetailPage';
import { ProtectedRoute } from './ProtectedRoute';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <AppShell />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: 'dashboard', element: <DashboardPage /> },
      { path: 'visitors', element: <VisitorListPage /> },
      { path: 'visitors/add', element: <AddVisitorPage /> },
      { path: 'visitors/:id', element: <VisitorDetailPage /> },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/dashboard" replace />,
  },
]);
