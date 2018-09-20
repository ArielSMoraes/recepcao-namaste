//gambiarra pra fazer o select ter um elemento nulo pra não salvar sempre o primeiro da lista por padrão
var nullable_relations = [
    'professional_id',
];

nullable_relations.forEach(function (relation_key) {
    var select_item = jQuery('[name='+relation_key+']');
    // Add the "None" option
    select_item.prepend(
        jQuery("<option></option>")
            .attr('value','')
            .text('Nenhum')
    );

    // Select it when editing an item that has a null relation
    if (jQuery('[name='+relation_key+'] option:selected').attr('selected') === undefined) {
        select_item.val('').change();
    }
});

$(document).ready(function(){
    var selectProfessional = $('select[name=professional_id]');
    var selectCustomerType = $("select[name=customer_type_id]");
    
    var customerTypeTextSelected = $("select[name=customer_type_id] option:selected").text();    
    var professionalTextSelected = $("select[name=customer_type_id] option:selected").text();    
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