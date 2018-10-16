<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use TCG\Voyager\Facades\Voyager;
use TCG\Voyager\Http\Controllers\VoyagerBaseController as BaseVoyagerBaseController;
use App\Exports\CollectionExport;
use App\Exports\ReportsExport;
use Maatwebsite\Excel\Facades\Excel;

class CustomerEventController extends BaseVoyagerBaseController
{
    public function index(Request $request)
    {
        // GET THE SLUG, ex. 'posts', 'pages', etc.
        $slug = $this->getSlug($request);

        // GET THE DataType based on the slug
        $dataType = Voyager::model('DataType')->where('slug', '=', $slug)->first();

        $search = (object) ['value' => $request->get('s'), 
        'key' => $request->get('key'), 
        'filter' => $request->get('filter'), 
        'event_month' => $request->get('event_month'), 
        'customer_type' => $request->get('customer_type'), 
        'event_categories' => $request->get('event_categories'),
        'from' => $request->get('from'),
        'to' => $request->get('to'),
        'export' => $request->get('export'),
        'sexo' => $request->get('sexo'),
        'community' => $request->get('community'),
        'pai_e_mae' => $request->get('pai_e_mae'),
        'event_day' => $request->get('event_day')];

        $dataTypeContent = DB::table("customers")->where('name', $search->value)->get();    
        
        $clientTypes = DB::table("customer_types")->get();    

        $eventCategories = DB::table("event_categories")->get();    

        if ($search->filter) {         
            $event_name =  $search->value;
            $event_start_date_at_month = $search->event_month;
            $event_start_date_at_day = $search->event_day;

            $dataTypeContent = DB::table('customers')
            ->join('customer_participations', 'customers.id', '=', 'customer_participations.customer_id')
            ->join('participations', 'customer_participations.participation_id', '=', 'participations.id')
            ->join('events', 'participations.event_id', '=', 'events.id')
            ->join('customer_types', 'customers.customer_type_id', '=', 'customer_types.id')
            ->select('customers.name as customer_name')
            ->addSelect('customer_types.name as customer_type_name')
            ->addSelect('customers.sexo as customer_sexo')
            ->addSelect('customers.marital_status as customer_marital_status')
            ->addSelect('customers.community as customer_is_from_community')            
            ->addSelect('customers.pai_e_mae as customer_pai_e_mae')            
            ->where('customers.deleted_at', '=', NULL)
            ->distinct('customers.id')
            ->orderBy('customers.name');
                                
            if($event_start_date_at_month != 0){
                $dataTypeContent = $dataTypeContent->whereMonth('participations.date', '=', $event_start_date_at_month);  
            }

            if($event_start_date_at_day != 0){
                $dataTypeContent = $dataTypeContent->whereDay('participations.date', '=', $event_start_date_at_day);  
            }

            if($event_name != null){
                $dataTypeContent = $dataTypeContent->where('events.name', 'like', $event_name);            
            } 

            if($search->customer_type != 0){
                $dataTypeContent = $dataTypeContent->where('customers.customer_type_id', '=', $search->customer_type);  
            }

            if($search->event_categories != 0){
                $dataTypeContent = $dataTypeContent->where('events.event_category_id', '=', $search->event_categories);  
            }
            
            if($search->community != null){
                $dataTypeContent = $dataTypeContent->where('customers.community', '=', $search->community);  
            }

            if($search->sexo != null){
                $dataTypeContent = $dataTypeContent->where('customers.sexo', '=', $search->sexo);  
            }

            if($search->pai_e_mae != null){
                $dataTypeContent = $dataTypeContent->where('customers.pai_e_mae', '=', $search->pai_e_mae);  
            }

            if($search->from != null && $search->to != null){                
                $from = date('Y-m-d', strtotime($search->from));
                $to = date('Y-m-d', strtotime($search->to));                
                $dataTypeContent = $dataTypeContent->whereBetween('participations.date', array($from, $to));
            }

            $dataTypeContent = $dataTypeContent->get();            
            
            if($search->export){
                return Excel::download(new CollectionExport($dataTypeContent), 'export.xlsx');      
            }
            
        }
        
        return view('vendor.voyager.customer-events.browse')
        ->with('dataTypeContent', $dataTypeContent)
        ->with('dataType', $dataType)
        ->with('search', $search)
        ->with('clientTypes', $clientTypes)
        ->with('eventCategories', $eventCategories);
    }    

    public function show(Request $request, $id)
    {
        // GET THE SLUG, ex. 'posts', 'pages', etc.
        $slug = $this->getSlug($request);

        // GET THE DataType based on the slug
        $dataType = Voyager::model('DataType')->where('slug', '=', $slug)->first();

        $dataTypeContent = DB::table("customers")->get();        
        
        return view('vendor.voyager.customer-events.browse')->with('dataTypeContent', $dataTypeContent)->with('dataType', $dataType);
    }    

    public function check_if_customer_exists(Request $request){
        if(!is_null($request->value) && !is_null($request->fieldName)){
            if($request->fieldName == "cpf"){
                $cpfReplace = str_replace(".", "", $request->value);
                $cpfReplace = str_replace("-","", $cpfReplace);
                $dataTypeContent = DB::table("customers")->where($request->fieldName, $request->value)->orWhere($request->fieldName, $cpfReplace)->first(); // If Model doest exist, get data from table name                        
            }else{
                $dataTypeContent = DB::table("customers")->where($request->fieldName, $request->value)->first(); // If Model doest exist, get data from table name                        
            }            
            return response()->json($dataTypeContent);
        }        
    }
}
