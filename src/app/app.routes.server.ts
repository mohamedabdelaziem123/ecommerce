import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'shippingaddress/:cartid',
    renderMode:RenderMode.Server
  },
  {
    path: 'productDetails/:_id',
    renderMode:RenderMode.Server
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
