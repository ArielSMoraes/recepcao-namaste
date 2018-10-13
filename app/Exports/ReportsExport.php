<?php

namespace App\Exports;

use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromView;

class InvoicesExport implements FromView
{
    private $data;
 
    public function __construct($data)
    {
        $this->data = $data;
    }
 
    public function view(): View
    {
        return view('exports.xml', [
            'data' => $this->data
        ]);
    }
}