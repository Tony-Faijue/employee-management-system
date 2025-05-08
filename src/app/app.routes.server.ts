import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender
  },
  {path: 'employee-dashboard/:userID', renderMode: RenderMode.Server},
  {path: 'employee-profile/:userID', renderMode: RenderMode.Server},
  {path: 'admin-dashboard/:userID', renderMode: RenderMode.Server},
  {path: 'admin-profile/:userID', renderMode: RenderMode.Server},
  {path: 'manage-company/:userID', renderMode: RenderMode.Server},
  {path: 'manage-groups/:userID', renderMode: RenderMode.Server},
  {path: 'manage-project/:userID', renderMode: RenderMode.Server},
  {path: 'manage-tasks/:userID', renderMode: RenderMode.Server},
  {path: 'manage-employees/:userID', renderMode: RenderMode.Server}];
