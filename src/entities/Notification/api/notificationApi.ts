import { createSelector } from '@reduxjs/toolkit';
import { rtkApi } from '@/shared/api/rtkApi';
import { Notification } from '../model/types/notification';

const notificationApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    //! типа данные с сервера, и типа параметров (нет)
    getNotifications: build.query<Notification[], null>({
      query: () => ({
        url: '/notifications',
      }),
    }),
  }),
});

export const useNotifications = notificationApi.useGetNotificationsQuery;

//! получение из store
const useNotificationsResult =
  notificationApi.endpoints.getNotifications.select(null);

export const useNotificationsData = createSelector(
  useNotificationsResult,
  (usersResult) => usersResult.data,
);

//   const testData = useAppSelector(useNotificationsData);
