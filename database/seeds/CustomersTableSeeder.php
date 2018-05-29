<?php

use Illuminate\Database\Seeder;

class CustomersTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('customers')->delete();
        
        \DB::table('customers')->insert(array (
            0 => 
            array (
                'id' => 51,
                'name' => 'Jwala',
                'email' => 'premjwala@gmail.com',
                'phone' => NULL,
                'cpf' => NULL,
                'birth_day' => NULL,
                'emergency_phone' => NULL,
                'cep' => '90050320',
                'neighborhood' => 'cidade baixa',
                'street' => 'rua da republica',
                'number' => '528',
                'professional_id' => 2,
                'sannyas' => 'Jwala',
                'customer_type_id' => 2,
                'how_did_find_out_id' => 2,
                'created_at' => '2018-05-13 14:09:51',
                'updated_at' => '2018-05-13 14:09:51',
                'marital_status' => 1,
                'sexo' => 1,
                'community' => 1,
                'comments' => NULL,
                'secondary_phone' => NULL,
                'friends' => NULL,
                'country' => NULL,
            ),
            1 => 
            array (
                'id' => 61,
                'name' => 'Joao Gabriel Dos Santos',
                'email' => 'joao@hotmail',
                'phone' => '984284126',
                'cpf' => '989773673299',
                'birth_day' => NULL,
                'emergency_phone' => NULL,
                'cep' => NULL,
                'neighborhood' => NULL,
                'street' => NULL,
                'number' => NULL,
                'professional_id' => 1,
                'sannyas' => NULL,
                'customer_type_id' => 22,
                'how_did_find_out_id' => 1,
                'created_at' => '2018-05-13 14:10:44',
                'updated_at' => '2018-05-13 14:10:44',
                'marital_status' => 1,
                'sexo' => 1,
                'community' => 1,
                'comments' => NULL,
                'secondary_phone' => NULL,
                'friends' => NULL,
                'country' => NULL,
            ),
            2 => 
            array (
                'id' => 67,
                'name' => 'Amirkan1',
                'email' => 'amirkan@gmail.com',
                'phone' => '1234',
                'cpf' => '1111',
                'birth_day' => '0000-00-00',
                'emergency_phone' => 'NULL',
                'cep' => '90050-321',
                'neighborhood' => 'cidade baixa',
                'street' => 'rua da republica',
                'number' => '528',
                'professional_id' => 0,
                'sannyas' => 'amirak',
                'customer_type_id' => 2,
                'how_did_find_out_id' => 2,
                'created_at' => '2014-01-29 15:29:34',
                'updated_at' => '2010-04-22 16:03:15',
                'marital_status' => 1,
                'sexo' => 1,
                'community' => 1,
                'comments' => NULL,
                'secondary_phone' => NULL,
                'friends' => NULL,
                'country' => NULL,
            ),
            3 => 
            array (
                'id' => 68,
                'name' => 'Amorcan',
                'email' => 'amorcan@gmail.com',
                'phone' => '5678',
                'cpf' => '2222',
                'birth_day' => '1968-04-27',
                'emergency_phone' => 'NULL',
                'cep' => '90050-140',
                'neighborhood' => 'baixa cidade',
                'street' => 'sofia veloso',
                'number' => '140',
                'professional_id' => 0,
                'sannyas' => 'amiru',
                'customer_type_id' => 22,
                'how_did_find_out_id' => 1,
                'created_at' => '2014-03-17 16:43:47',
                'updated_at' => '0000-00-00 00:00:00',
                'marital_status' => 1,
                'sexo' => 1,
                'community' => 1,
                'comments' => NULL,
                'secondary_phone' => NULL,
                'friends' => NULL,
                'country' => NULL,
            ),
            4 => 
            array (
                'id' => 69,
                'name' => 'Amor',
                'email' => 'amo@gmail.com',
                'phone' => '9012',
                'cpf' => '3333',
                'birth_day' => '2015-04-11',
                'emergency_phone' => 'NULL',
                'cep' => '90050-140',
                'neighborhood' => 'cidade alta',
                'street' => 'rua bom dia',
                'number' => '141',
                'professional_id' => 0,
                'sannyas' => 'amor',
                'customer_type_id' => 1,
                'how_did_find_out_id' => 22,
                'created_at' => '2014-02-17 13:07:50',
                'updated_at' => '0000-00-00 00:00:00',
                'marital_status' => 1,
                'sexo' => 1,
                'community' => 1,
                'comments' => NULL,
                'secondary_phone' => NULL,
                'friends' => NULL,
                'country' => NULL,
            ),
            5 => 
            array (
                'id' => 71,
                'name' => 'Claudia Monteiro Fortes',
                'email' => 'cmonteirofortes@gmail.com',
                'phone' => '51984263333',
                'cpf' => '46552910010',
                'birth_day' => '1966-07-02',
                'emergency_phone' => '984262222',
                'cep' => '91060490',
                'neighborhood' => 'Jardim Lindóia',
                'street' => 'Rua Emilia Stefani Aluisio',
                'number' => '250/101',
                'professional_id' => 1,
                'sannyas' => NULL,
                'customer_type_id' => 2,
                'how_did_find_out_id' => 22,
                'created_at' => '2018-05-14 20:13:04',
                'updated_at' => '2018-05-14 20:13:04',
                'marital_status' => 1,
                'sexo' => 1,
                'community' => 1,
                'comments' => NULL,
                'secondary_phone' => NULL,
                'friends' => NULL,
                'country' => NULL,
            ),
            6 => 
            array (
                'id' => 81,
                'name' => 'Teste teste',
                'email' => 'teste@Teste.com',
                'phone' => '9999999999999',
                'cpf' => '02237841098',
                'birth_day' => '2018-05-31',
                'emergency_phone' => '9999999999999',
                'cep' => '999999999999',
                'neighborhood' => 'teste teste',
                'street' => 'teste testetste',
                'number' => '777',
                'professional_id' => 2,
                'sannyas' => 'teste',
                'customer_type_id' => 1,
                'how_did_find_out_id' => 1,
                'created_at' => '2018-05-29 01:44:22',
                'updated_at' => '2018-05-29 01:45:01',
                'marital_status' => 1,
                'sexo' => 1,
                'community' => 0,
                'comments' => 'testestetste',
                'secondary_phone' => '9999999999',
                'friends' => 1,
                'country' => NULL,
            ),
            7 => 
            array (
                'id' => 91,
                'name' => 'blablablabla',
                'email' => 'ojoijoi@iuhus.com',
                'phone' => '787878',
                'cpf' => '02237841098',
                'birth_day' => '2018-05-11',
                'emergency_phone' => '87878',
                'cep' => '90010221',
                'neighborhood' => 'ajioaja',
                'street' => 'Av. Senador Salgado FIlho, 359',
                'number' => NULL,
                'professional_id' => 1,
                'sannyas' => 'joijoi',
                'customer_type_id' => 1,
                'how_did_find_out_id' => 1,
                'created_at' => '2018-05-29 01:56:36',
                'updated_at' => '2018-05-29 01:56:36',
                'marital_status' => 1,
                'sexo' => 1,
                'community' => 1,
                'comments' => 'oaijaoijaa',
                'secondary_phone' => '787878',
                'friends' => 1,
                'country' => NULL,
            ),
        ));
        
        
    }
}