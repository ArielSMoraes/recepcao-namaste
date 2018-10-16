<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class CollectionExport implements FromCollection, WithMapping, WithHeadings
{    
    private $data;
 
    public function __construct($data)
    {
        $this->data = $data;
    }

    /**
    * @var Invoice $invoice
    */
    public function map($data): array
    {                
        return [
            $data->customer_name,
            $data->customer_type_name,
            $data->customer_sexo == 1 ? "Feminino" : "Masculino",
            $data->customer_pai_e_mae == 0 ? "Não" : "Sim",
            $data->customer_marital_status == 0 ? "Solteiro(a)" : $data->customer_marital_status == 1 ? "Casado(a)" : "Separado(a)",
            $data->customer_is_from_community == "0" ? "Não" : "Sim"
            //Date::dateTimeToExcel($data->created_at),
        ];
    }

    public function headings(): array
    {
        return [
            'Nome do Cliente',
            'Tipo do Cliente',
            'Sexo',
            'Fez Pai e Mãe?',
            'Estado Civil',
            'Morador da Comunidade?',
        ];
    }
 
    public function collection()
    {        
        return $this->data;
    }
}
