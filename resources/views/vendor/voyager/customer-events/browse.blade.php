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
<form method="get" class="form-search customer-events-form" action="{{action('CustomerEventController@index')}}">
    <div id="search-input" style="margin: 40px;">                  
        <input type="hidden" value="contains" name="filter" />
        
        <div class="input-group col-md-2">            
            <label class="col-md-12">Nome do evento</label>
            <input type="text" class="form-control" name="s" value="{{ empty($search) ? '' : $search->value }}">           
        </div>

        <div class="input-group col-md-2">
            <label class="col-md-12">Tipo de cliente</label>
            <select name="customer_type" class="col-md-12">
                <option value="0" @if ($search->customer_type == 0) selected="selected" @endif>Selecione</option>
                @foreach($clientTypes as $client)
                <option value="{{$client->id}}" @if ($search->customer_type == $client->id) selected="selected" @endif>{{$client->name}}</option>
                @endforeach
            </select>
        </div>

        <div class="input-group col-md-2">
            <label class="col-md-12">Categoria do evento</label>
            <select name="event_categories" class="col-md-12">
                <option value="0" @if ($search->event_categories == 0) selected="selected" @endif>Selecione</option>
                @foreach($eventCategories as $event_category)
                <option value="{{$event_category->id}}" @if ($search->event_categories == $event_category->id) selected="selected" @endif>{{$event_category->name}}</option>
                @endforeach
            </select>
        </div>        

        <div class="input-group col-md-2">
            <label class="col-md-12">Sexo</label>
            <select name="sexo" class="col-md-12">
                <option value="" @if ($search->sexo == "") selected="selected" @endif>Selecione</option>                
                <option value="1" @if ($search->sexo != "" && $search->sexo == 1) selected="selected" @endif>Feminino</option>                
                <option value="0" @if ($search->sexo != "" && $search->sexo == 0) selected="selected" @endif>Masculino</option>                
            </select>
        </div>

        <div class="input-group col-md-2">
            <label class="col-md-12">Morador da Comunidade?</label>
            <select name="community" class="col-md-12">
                <option value="" @if ($search->community == null) selected="selected" @endif>Selecione</option>                
                <option value="1" @if ($search->community != "" && $search->community == 1) selected="selected" @endif>Sim</option>                
                <option value="0" @if ($search->community != "" && $search->community == 0) selected="selected" @endif>Não</option>                
            </select>
        </div>

        <div class="input-group col-md-2">
            <label class="col-md-12">Fez Pai e Mãe?</label>
            <select name="pai_e_mae" class="col-md-12">
                <option value="" @if ($search->pai_e_mae == null) selected="selected" @endif>Selecione</option>                
                <option value="1" @if ($search->pai_e_mae != "" && $search->pai_e_mae == 1) selected="selected" @endif>Sim</option>                
                <option value="0" @if ($search->pai_e_mae != "" && $search->pai_e_mae == 0) selected="selected" @endif>Não</option>                
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

        <div class="input-group col-md-2" style="padding-top: 35px;">
            <label for="export">Exportar como excel</label>
            <input type="checkbox" value="export" name="export" id="export" class="checkbox-export" />
        </div>      

        
        <button type="submit" class="btn btn-primary save search-btn">Buscar</button>
        
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
                                        <th>
                                            Sexo
                                        </th>   
                                        <th>
                                            Fez Pai e Mãe?
                                        </th>   
                                        <th>
                                            Estado Civil
                                        </th>                                   
                                        <th>
                                            Morador da Comunidade?
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
                                        <td>
                                            {{$row->customer_sexo == 0 ? "Masculino" : "Feminino"}}
                                        </td>
                                        <td>
                                            {{$row->customer_pai_e_mae == 0 ? "Não" : "Sim"}}
                                        </td>
                                        <td>
                                            @if($row->customer_marital_status == 0)
                                                Solteiro(a)
                                            @elseif($row->customer_marital_status == 1)
                                                Casado(a)
                                            @else
                                                Separado(a)
                                            @endif
                                        </td>
                                        <td>
                                            {{$row->customer_is_from_community == 0 ? "Não" : "Sim"}}
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
