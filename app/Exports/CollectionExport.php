<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\WithHeadings;

class CollectionExport implements FromCollection
{    
    private $data;
 
    public function __construct($data)
    {
        $this->data = $data;
    }
 
    public function collection()
    {
        //foreach($data in $this->data)
        return collect($this->data);
    }
}
