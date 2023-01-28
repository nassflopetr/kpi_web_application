<?php

namespace App\Http\Controllers;

use Illuminate\Http\Response;

class IndexController extends Controller
{
    public function __invoke(): Response
    {
        return response()->view('index', [
            'translations' => $this->getTranslations()
        ]);
    }

    /**
     * Get translations from localization files
     * @return array
     */
    private function getTranslations(): array
    {
        $translations = [];
        $files = [
            'validation',
        ];

        $locale = app()->getLocale();
        $filesystem = app('files');

        foreach ($files as $file) {
            $path = lang_path("{$locale}/{$file}.php");

            if ($filesystem->exists($path)) {
                $translations[$file] = $filesystem->getRequire($path);
            }
        }

        return $translations;
    }
}
