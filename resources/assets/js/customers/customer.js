/*
    Preenchimento dos campos pelo CEP
*/

function limpa_formulário_cep() {
    // Limpa valores do formulário de cep.
    $("input[name=street]").val("");
    $("input[name=neighborhood]").val("");
    $("input[name=city]").val("");
    $("input[name=country]").val("");    
    $("select[name=state]").val("");
}

//Quando o campo cep perde o foco.
$("input[name=cep]").blur(function() {
    //Nova variável "cep" somente com dígitos.
    var cep = $(this).val().replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
    if (cep != "") {

        //Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;

        //Valida o formato do CEP.
        if(validacep.test(cep)) {

            //Preenche os campos com "..." enquanto consulta webservice.
            $("input[name=street]").val("...");
            $("input[name=neighborhood]").val("...");
            $("input[name=city]").val("...");
            $("input[name=country]").val("...");                

            //Consulta o webservice viacep.com.br/
            $.getJSON("https://viacep.com.br/ws/"+ cep +"/json/?callback=?", function(dados) {
                //cep são paulo 01408-001
                if (!("erro" in dados)) {
                    //Atualiza os campos com os valores da consulta.
                    $("input[name=street]").val(dados.logradouro);
                    $("input[name=neighborhood]").val(dados.bairro);
                    $("input[name=city]").val(dados.localidade);
                    $("input[name=country]").val("Brasil");                        
                    $("select[name=state] option").removeAttr("selected");
                    $("select[name=state] option").each(function(){
                        if($(this).text().indexOf(dados.uf + " - ") != -1){                                
                            $(this).attr("selected", true);                                
                        }
                    });                                   
                    $("select[name=state]").trigger("change");     
                } //end if.
                else {
                    //CEP pesquisado não foi encontrado.
                    limpa_formulário_cep();
                    alert("CEP não encontrado.");
                }
            });

            //só pra garantir que mudou da um settimeout
            setTimeout(() => {                
                $("select[name=state]").trigger("change");                
            }, 600);

        } //end if.
        else {
            //cep é inválido.
            limpa_formulário_cep();
            alert("Formato de CEP inválido.");
        }
    } //end if.
    else {
        //cep sem valor, limpa formulário.
        limpa_formulário_cep();
    }
});

/*
    END Preenchimento dos campos pelo CEP
    ------------------------------------------------------------------------------------------------------------------------------------
*/

/*
    BEGIN validação Tipo de Cliente/Terapeuta
*/

//fazer o select ter um elemento nulo pra não salvar sempre o primeiro da lista por padrão
var nullable_relations = [
    'professional_id',
];

nullable_relations.forEach(function (relation_key) {
    var select_item = jQuery('[name='+relation_key+']');
    select_item.prepend(
        jQuery("<option></option>")
            .attr('value','')
            .text('Nenhum')
    );

    if (jQuery('[name='+relation_key+'] option:selected').attr('selected') === undefined) {
        select_item.val('').change();
    }
});

$(document).ready(function(){
    var selectProfessional = $('select[name=professional_id]');
    var selectCustomerType = $("select[name=customer_type_id]");
    
    var customerTypeTextSelected = $("select[name=customer_type_id] option:selected").text();       
    //logo que carrega a página já ve se o tipo de cliente esta marcado como Em Terapia
    ManageProfessionalSelect(customerTypeTextSelected);

    //quando muda o selecte de tipo de cliente
    selectCustomerType.change(function(){
        var customerTypeTextSelected = $(this).find("option:selected").text();
        ManageProfessionalSelect(customerTypeTextSelected);        
    });    

    function ManageProfessionalSelect(customerTypeTextSelected){
        //se selecionado algo diferente de Em Terapia
        if(customerTypeTextSelected != "Em Terapia"){
            //seta o valor pra nulo, o voyager usa o select2 pra fazer os selects, o trigger serve pra atualizar o valor no span do select                    
            selectProfessional.val("").trigger("change");
            //esconde o select de profissional
            selectProfessional.parent().hide();
            //se não esta marcado Em Terapia o select de profissional não é obrigatório
            selectProfessional.attr("required",false);
        }else{            
            //senão, mostra o select de profissional
            selectProfessional.parent().show();
            //e se esta marcado Em Terapia o select de profissional é obrigatório
            selectProfessional.attr("required",true);            
        }
    }

    //mascaras
    var maskBehavior = function (val) {
    return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
    },
    options = {onKeyPress: function(val, e, field, options) {
            field.mask(maskBehavior.apply({}, arguments), options);
        }
    };
    
    $('input[name=phone]').mask(maskBehavior, options);

    //fazer com  que sempre que venha valores NULL nos telefones troca pra vazio pra que a mascara possa funcionar
    if($('input[name=emergency_phone]').val() == "NULL"){
        $('input[name=emergency_phone]').val("");
    }
    if($('input[name=secondary_phone]').val() == "NULL"){
        $('input[name=secondary_phone]').val("");
    }

    $('input[name=emergency_phone]').mask(maskBehavior, options);      
    $('input[name=secondary_phone]').mask(maskBehavior, options);      

    $("input[name=cep]").mask('00000-000');
    $("input[name=cpf]").mask('000.000.000-00');    
});

/*
    END validação Tipo de cliente/Profissional
    ---------------------------------------------------------------------------------------------------------------------------------------------------------
*/

/*
    Validação CPF e Email clientes repetidos
*/
String.prototype.replaceAll = String.prototype.replaceAll || function(needle, replacement) {
    return this.split(needle).join(replacement);
};

$(document).ready(function(){
    var cpfInitial = $("input[name=cpf]").val();    
    var emailInitial = $("input[name=email]").val();    
    
    $("input[name=cpf]").blur(function(){       
        var inputName = $(this).attr('name');  
        var value = $(this).val();
        $(".msg-"+inputName+"-validation").remove();
        $("button.btn.btn-primary.save").removeAttr("disabled");
        if(value != "" && value != null){
            $.ajax({
                url: '/admin/check-if-customer-exists',
                type: 'POST',
                data: {"value": value, "fieldName": inputName},
                success: (data) => {                                
                    if(!jQuery.isEmptyObject(data)){
                        var cpfReplace = data[inputName].replaceAll(".","").replaceAll("-","");
                        var cpfInitialReplace = cpfInitial.replaceAll(".","").replaceAll("-","");                    
                        if(cpfInitialReplace != cpfReplace){       
                            $(this).parent().append("<span class='msg-validation-exists msg-"+inputName+"-validation'>Já existe um cliente com esse "+inputName+" <a href='/admin/clientes/"+data["id"]+"/edit'>acessar</a></span>");
                            $("button.btn.btn-primary.save").attr("disabled","disabled");                
                        }
                    }
                }
            });
        }
    });

    $("input[name=email]").blur(function(){       
        var inputName = $(this).attr('name');  
        var value = $(this).val();
        $(".msg-"+inputName+"-validation").remove();
        $("button.btn.btn-primary.save").removeAttr("disabled");
        if(value != "" && value != null){
            $.ajax({
                url: '/admin/check-if-customer-exists',
                type: 'POST',
                data: {"value": value, "fieldName": inputName},
                success: (data) => {                                
                    if(!jQuery.isEmptyObject(data) && emailInitial != data[inputName]){
                        $(this).parent().append("<span class='msg-validation-exists msg-"+inputName+"-validation'>Já existe um cliente com esse "+inputName+" <a href='/admin/clientes/"+data["id"]+"/edit'>acessar</a></span>");
                        $("button.btn.btn-primary.save").attr("disabled","disabled");
                    }
                }
            });
        }
    });

   
});

/*
    END Validação CPF clientes repetidos
    ---------------------------------------------------------------------------------------------------------------------------------------------------------
*/

$(document).ready(function(){
    $('select.select2[name="customer_belongsto_how_did_find_out_relationship_1[]"]').attr("required",true);            
    $('select.select2[name="customer_type_id"]').attr("required",true);                
});


const selCustomerModel = '#create-customer-modal',
    $editEventModal = $('#edit-event-modal'),
    $fastCustomerCreate = $('#customer-create'),
    customerSelectText = 'select.select2[name="event_belongstomany_customer_relationship[]"]';
    
// Evento disparado quando modal de Events abre
$(selCustomerModel).on('show.bs.modal', (e) => {

    const setNameInput = (_customerName) => {
        if(_customerName) {
            self.find('.modal-title span').text(_customerName);
            $(e.currentTarget).find('input[name="name"]').val(_customerName);
        }
    };

    let customerName = $(e.relatedTarget).data('customer-name'),
        self = $(e.currentTarget),
        parent = $(e.relatedTarget),
        customerId = parent.data('customer-id'),
        $modalBody = self.find('.modal-body');

    $(customerSelectText).select2('close');

    setNameInput(customerName);

    if($modalBody.is(':empty')) {
        $.ajax({
            url: '/admin/clientes/create',
            type: 'GET',
            success: (data) => {
                $modalBody.html($(data)).promise().done(() => {
                    setNameInput(customerName);
                });
            }
        });
    }
}).on('hide.bs.modal', (e) => {
    $(selCustomerModel + ' form')[0].reset();
});

$(document.body).on('submit', selCustomerModel + ' form', (e) => {

    e.preventDefault();
    
    let $fastCustomerEditForm = $(e.currentTarget),
        dataForm = $fastCustomerEditForm.serialize(),
        urlAction = $fastCustomerEditForm.attr('action');

    $.ajax({
        url: urlAction,
        type: 'POST',
        data: dataForm,
        success: (response) => {

            let data = response.data;

            if (response.success) {
                
                toastr.success('Cliente ' + data.name + ' criado com sucesso!');

                $(selCustomerModel).modal('hide');

                let newOption = new Option(data.name, data.id, true, true);
                $(customerSelectText).append(newOption).trigger('change');

            } else if(response.errors) {

                let errors = response.errors;
                
                for (var key in errors) {
                    if (errors.hasOwnProperty(key)) {
                        toastr.error(errors[key]);
                    }
                }
            } else {
                toastr.error('Algo deu errado.');
            }
        },
        error: (response) => {
        }
    });
});