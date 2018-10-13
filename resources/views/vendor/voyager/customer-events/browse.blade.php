@extends('voyager::master')

@section('page_title', __('voyager::generic.viewing').' '.$dataType->display_name_plural)

@section('page_header')
    <div class="container-fluid">
        <h1 class="page-title">
            <i class="{{ $dataType->icon }}"></i> {{ $dataType->display_name_plural }}
        </h1>
        
        @include('voyager::multilingual.language-selector')
    </div>
@stop

@section('content')
<form method="get" class="form-search" action="{{action('CustomerEventController@index')}}">
    <div id="search-input" style="margin: 40px;">                  
        <input type="hidden" value="contains" name="filter" />
        
        <div class="input-group col-md-2">
            <input type="text" class="form-control" placeholder="Nome do evento" name="s" value="{{ empty($search) ? '' : $search->value }}">           
        </div>

        <div class="input-group col-md-2">
            <select name="customer_type" class="col-md-12">
                <option value="0" @if ($search->customer_type == 0) selected="selected" @endif>Selecione o tipo de cliente</option>
                @foreach($clientTypes as $client)
                <option value="{{$client->id}}" @if ($search->customer_type == $client->id) selected="selected" @endif>{{$client->name}}</option>
                @endforeach
            </select>
        </div>

        <div class="input-group col-md-2">
            <select name="event_month" class="col-md-12">
                <option value="0" @if ($search->event_month == 0) selected="selected" @endif>Selecione um mês</option>
                <option value="1" @if ($search->event_month == 1) selected="selected" @endif>Janeiro</option>
                <option value="2" @if ($search->event_month == 2) selected="selected" @endif>Fevereiro</option>
                <option value="3" @if ($search->event_month == 3) selected="selected" @endif>Março</option>
                <option value="4" @if ($search->event_month == 4) selected="selected" @endif>Abril</option>
                <option value="5" @if ($search->event_month == 5) selected="selected" @endif>Maio</option>
                <option value="6" @if ($search->event_month == 6) selected="selected" @endif>Junho</option>
                <option value="7" @if ($search->event_month == 7) selected="selected" @endif>Julho</option>
                <option value="8" @if ($search->event_month == 8) selected="selected" @endif>Agosto</option>
                <option value="9" @if ($search->event_month == 9) selected="selected" @endif>Setembro</option>
                <option value="10" @if ($search->event_month == 10) selected="selected" @endif>Outubro</option>
                <option value="11" @if ($search->event_month == 11) selected="selected" @endif>Novembro</option>
                <option value="12" @if ($search->event_month == 12) selected="selected" @endif>Dezembro</option>            
            </select>
        </div>  

        <div class="input-group col-md-2">
            <select name="event_categories" class="col-md-12">
                <option value="0" @if ($search->event_categories == 0) selected="selected" @endif>Selecione a categoria do evento</option>
                @foreach($eventCategories as $event_category)
                <option value="{{$event_category->id}}" @if ($search->event_categories == $event_category->id) selected="selected" @endif>{{$event_category->name}}</option>
                @endforeach
            </select>
        </div>

        <div class="input-group col-md-2">
            <label for="from">De: </label>
            <input type="text" id="from" name="from" value="{{ empty($search) ? '' : $search->from }}">
        </div>

        <div class="input-group col-md-2">
            <label for="to">Até: </label>
            <input type="text" id="to" name="to" value="{{ empty($search) ? '' : $search->to }}">
        </div>  

        <div class="input-group col-md-2">
            <label>Exportar como excel</label>
            <input type="checkbox" value="export" name="export" class="checkbox-export" />
        </div>      

        <span class="input-group-btn">
            <button class="btn btn-info btn-lg" type="submit">
                <i class="voyager-search"></i>
            </button>
        </span>         
    </div>
</form>    
    <div class="page-content browse container-fluid">
        <div class="row">
            <div class="col-md-12">
                <div class="panel panel-bordered">
                    <div class="panel-body">
                        <div class="table-responsive">
                            <table id="dataTable" class="table table-hover">                            
                                <thead>
                                    <tr>                                        
                                        <th>
                                            Nome do Cliente
                                        </th>  
                                        <th>
                                            Tipo de Cliente
                                        </th>                                       
                                    </tr>
                                </thead>
                                <tbody>
                                    @foreach($dataTypeContent as $row)                                    
                                    <tr>                                                                               
                                        <td>
                                            {{$row->customer_name}}
                                        </td>                                                                                                                                                                             
                                        <td>
                                            {{$row->customer_type_name}}
                                        </td>
                                    </tr>                                    
                                    @endforeach
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@stop
