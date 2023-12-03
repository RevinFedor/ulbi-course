import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { getUserAuthData, UserRole } from '@/entities/User';
import { getRouteForbidden, getRouteMain } from '@/shared/const/router';

interface RequireAuthProps {
  children: JSX.Element;
  roles?: UserRole[];
}
export function RequireAuth(props: RequireAuthProps) {
  const { children, roles } = props;

  const auth = useSelector(getUserAuthData);
  const location = useLocation();

  //! есть ли у пользователя auth?.roles нужные роли roles
  const hasRequireAuthProps = useMemo(() => {
    if (!roles) {
      return true;
    }

    //! в отличие от filter возвращает не массив а boolean
    return roles.some((requiredRole) => {
      const hasRole = auth?.roles?.includes(requiredRole);
      return hasRole;
    });
  }, [roles, auth]);

  if (!auth) {
    return <Navigate to={getRouteMain()} state={{ from: location }} replace />;
  }
  if (!hasRequireAuthProps) {
    return (
      <Navigate to={getRouteForbidden()} state={{ from: location }} replace />
    );
  }

  return children;
}
