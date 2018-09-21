<form method="get" class="form-search" action="{{action('CustomerController@index')}}">
    <div id="search-input">                  
        <input type="hidden" value="contains" name="filter" />
        <input type="hidden" value="cpf,name,sannyas,phone,email" name="key" />
        
        <div class="input-group col-md-12">
            <input type="text" class="form-control" placeholder="Procurar Clientes por Nome, Sannyas, Telefone, Email ou CPF (999.999.999-99)" name="s" value="{{ empty($search) ? '' : $search->value }}">
            <span class="input-group-btn">
                <button class="btn btn-info btn-lg" type="submit">
                    <i class="voyager-search"></i>
                </button>
            </span>
        </div>
    </div>
</form>