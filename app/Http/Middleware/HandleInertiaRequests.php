<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use Tightenco\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
  /**
   * The root template that is loaded on the first page visit.
   *
   * @var string
   */
  protected $rootView = 'app';

  /**
   * Determine the current asset version.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return string|null
   */
  public function version(Request $request)
  {
    return parent::version($request);
  }

  /**
   * Define the props that are shared by default.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return array
   */
  public function share(Request $request)
  {
    return array_merge(parent::share($request), [
      'app' => [
        'name' => config('app.name', 'Pasar Pintar')
        // 'name' => 'Pasar Pintar'
      ],
      'auth' => [
        'user' => $request->user(),
      ],
      'flash' => [
        'message' => fn () => $request->session()->get('message')
      ],
      // 'urlPrev' => function() {
      //   if (url()->previous() !== route('login') && url()->previous() !== url()->current()) {
      //     return url()->previous();
      //   } else {
      //     return 'empty';
      //   }
      // },
      'ziggy' => function () {
        return (new Ziggy)->toArray();
      },
    ]);
  }
}
