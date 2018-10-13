/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
module.exports = __webpack_require__(4);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(2);
__webpack_require__(3);

$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

var selCustomerModel = '#create-customer-modal',
    editEventModal = '#edit-event-modal',
    $editEventModal = $(editEventModal),
    customerSelectText = 'select.select2[name="event_belongstomany_customer_relationship[]"]',
    customersEventSelectText = 'select.select2[name="participation_belongstomany_customer_relationship[]"]';

///////////////////
// Eventos
///////////////////
function initEventModal() {

    var $customerSelect2 = $(customerSelectText);

    $customerSelect2.select2({
        placeholder: 'Quais clientes participaram?',
        allowClear: true,
        ajax: {
            url: '/admin/clientes',
            dataType: 'json',
            data: function data(params) {
                var query = {
                    page: params.page || 1,
                    s: params.term,
                    key: 'name',
                    filter: 'contains'
                };
                return query;
            },
            processResults: function processResults(response) {
                return {
                    results: $.map(response.data, function (item) {
                        return {
                            text: item.name,
                            id: item.id
                        };
                    }),
                    pagination: {
                        more: true
                    }
                };
            }
        },
        language: {
            noResults: function noResults() {
                var newTag = $('.form-group.clientes input.select2-search__field').val();
                return '<div id="newNoResults">\n                            <div class="noResults">Nenhum resultado encontrado</div>\n                            <div class="createNew">\n                                <a href="' + selCustomerModel + '" class="btn btn-primary form-control" data-keyboard="true" data-customer-name="' + newTag + '" data-toggle="modal" data-backdrop="false" data-target="' + selCustomerModel + '">Criar novo cliente: <strong>' + newTag + '</strong></a>\n                            </div>\n                        </div>';
            }
        },
        escapeMarkup: function escapeMarkup(markup) {
            return markup;
        }
    }).on('select2:select', function (e) {
        toastr.success('Cliente adicionado!');
    }).on('select2:unselect', function (e) {
        toastr.error('Cliente removido!');
    });
};

// Evento disparado quando modal de Events abre
$editEventModal.on('show.bs.modal', function (e) {

    var self = $(e.currentTarget),
        parent = $(e.relatedTarget),
        eventId = parent.data('event-id'),
        $modalBody = self.find('.modal-body'),
        eventName = parent.data('event-name');

    self.find('.modal-title span').text(eventName);

    if ($modalBody.is(':empty')) {
        $.ajax({
            url: '/admin/events/' + eventId + '/edit',
            type: 'GET',
            success: function success(data) {
                $modalBody.html($(data)).promise().done(function () {
                    initEventModal();
                });
            }
        });
    }
});

// Enviar formulario de Event Modal via PUT AJAX
$(document.body).on('submit', editEventModal + ' form', function (e) {

    e.preventDefault();

    var $fastEventEditForm = $(e.currentTarget),
        dataForm = $fastEventEditForm.serialize(),
        urlAction = $fastEventEditForm.attr('action');

    $.ajax({
        url: urlAction,
        type: 'PUT',
        data: dataForm,
        success: function success(response) {

            var data = response.data;

            if (response.success) {

                toastr.success('Atualizado com sucesso Evento');

                $editEventModal.modal('hide');
            } else {
                toastr.error('Algo deu errado.');
            }
        }
    });
});

function initEventModalCustomersEvents() {

    var $customersEventSelectText2 = $(customersEventSelectText);

    $customersEventSelectText2.select2({
        placeholder: 'Quais clientes participaram?',
        allowClear: true,
        ajax: {
            url: '/admin/clientes',
            dataType: 'json',
            data: function data(params) {
                var query = {
                    page: params.page || 1,
                    s: params.term,
                    key: 'name',
                    filter: 'contains'
                };
                return query;
            },
            processResults: function processResults(response) {
                return {
                    results: $.map(response.data, function (item) {
                        return {
                            text: item.name,
                            id: item.id
                        };
                    }),
                    pagination: {
                        more: true
                    }
                };
            }
        },
        language: {
            noResults: function noResults() {
                var newTag = $('.form-group.clientes input.select2-search__field').val();
                return '<div id="newNoResults">\n                            <div class="noResults">Nenhum resultado encontrado</div>\n                            <div class="createNew">\n                                <a href="' + selCustomerModel + '" class="btn btn-primary form-control" data-keyboard="true" data-customer-name="' + newTag + '" data-toggle="modal" data-backdrop="false" data-target="' + selCustomerModel + '">Criar novo cliente: <strong>' + newTag + '</strong></a>\n                            </div>\n                        </div>';
            }
        },
        escapeMarkup: function escapeMarkup(markup) {
            return markup;
        }
    }).on('select2:select', function (e) {
        toastr.success('Cliente adicionado!');
    }).on('select2:unselect', function (e) {
        toastr.error('Cliente removido!');
    });
};

$(document).ready(function () {
    var bd = $('body');

    // BREAD de Eventos
    if (bd.hasClass('events')) {
        initEventModal();
    } else if (bd.hasClass('participations')) {
        initEventModalCustomersEvents();
    }
});

/***/ }),
/* 2 */
/***/ (function(module, exports) {

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
$("input[name=cep]").blur(function () {
    //Nova variável "cep" somente com dígitos.
    var cep = $(this).val().replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
    if (cep != "") {

        //Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;

        //Valida o formato do CEP.
        if (validacep.test(cep)) {

            //Preenche os campos com "..." enquanto consulta webservice.
            $("input[name=street]").val("...");
            $("input[name=neighborhood]").val("...");
            $("input[name=city]").val("...");
            $("input[name=country]").val("...");

            //Consulta o webservice viacep.com.br/
            $.getJSON("https://viacep.com.br/ws/" + cep + "/json/?callback=?", function (dados) {
                //cep são paulo 01408-001
                if (!("erro" in dados)) {
                    //Atualiza os campos com os valores da consulta.
                    $("input[name=street]").val(dados.logradouro);
                    $("input[name=neighborhood]").val(dados.bairro);
                    $("input[name=city]").val(dados.localidade);
                    $("input[name=country]").val("Brasil");
                    $("select[name=state] option").removeAttr("selected");
                    $("select[name=state] option").each(function () {
                        if ($(this).text().indexOf(dados.uf + " - ") != -1) {
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
            setTimeout(function () {
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
var nullable_relations = ['professional_id', 'interviewer_id'];

nullable_relations.forEach(function (relation_key) {
    var select_item = jQuery('[name=' + relation_key + ']');
    select_item.prepend(jQuery("<option></option>").attr('value', '').text('Selecionar'));

    if (jQuery('[name=' + relation_key + '] option:selected').attr('selected') === undefined) {
        select_item.val('').change();
    }
});

$(document).ready(function () {
    var selectProfessional = $('select[name=professional_id]');
    var selectCustomerType = $("select[name=customer_type_id]");

    var customerTypeTextSelected = $("select[name=customer_type_id] option:selected").text();
    //logo que carrega a página já ve se o tipo de cliente esta marcado como Em Terapia
    ManageProfessionalSelect(customerTypeTextSelected);

    //quando muda o selecte de tipo de cliente
    selectCustomerType.change(function () {
        var customerTypeTextSelected = $(this).find("option:selected").text();
        ManageProfessionalSelect(customerTypeTextSelected);
    });

    function ManageProfessionalSelect(customerTypeTextSelected) {
        //se selecionado algo diferente de Em Terapia
        if (customerTypeTextSelected != "Em Terapia") {
            //seta o valor pra nulo, o voyager usa o select2 pra fazer os selects, o trigger serve pra atualizar o valor no span do select                    
            selectProfessional.val("").trigger("change");
            //esconde o select de profissional
            selectProfessional.parent().hide();
            //se não esta marcado Em Terapia o select de profissional não é obrigatório
            selectProfessional.attr("required", false);
        } else {
            //senão, mostra o select de profissional
            selectProfessional.parent().show();
            //e se esta marcado Em Terapia o select de profissional é obrigatório
            selectProfessional.attr("required", true);
        }
    }

    //mascaras
    var maskBehavior = function maskBehavior(val) {
        return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
    },
        options = { onKeyPress: function onKeyPress(val, e, field, options) {
            field.mask(maskBehavior.apply({}, arguments), options);
        }
    };

    $('input[name=phone]').mask(maskBehavior, options);

    //fazer com  que sempre que venha valores NULL nos telefones troca pra vazio pra que a mascara possa funcionar
    if ($('input[name=emergency_phone]').val() == "NULL") {
        $('input[name=emergency_phone]').val("");
    }
    if ($('input[name=secondary_phone]').val() == "NULL") {
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
String.prototype.replaceAll = String.prototype.replaceAll || function (needle, replacement) {
    return this.split(needle).join(replacement);
};

$(document).ready(function () {
    var cpfInitial = $("input[name=cpf]").val();
    var emailInitial = $("input[name=email]").val();

    $("input[name=cpf]").blur(function () {
        var _this = this;

        var inputName = $(this).attr('name');
        var value = $(this).val();
        $(".msg-" + inputName + "-validation").remove();
        $("button.btn.btn-primary.save").removeAttr("disabled");
        if (value != "" && value != null) {
            $.ajax({
                url: '/admin/check-if-customer-exists',
                type: 'POST',
                data: { "value": value, "fieldName": inputName },
                success: function success(data) {
                    if (!jQuery.isEmptyObject(data)) {
                        var cpfReplace = data[inputName].replaceAll(".", "").replaceAll("-", "");
                        var cpfInitialReplace = cpfInitial.replaceAll(".", "").replaceAll("-", "");
                        if (cpfInitialReplace != cpfReplace) {
                            $(_this).parent().append("<span class='msg-validation-exists msg-" + inputName + "-validation'>Já existe um cliente com esse " + inputName + " <a href='/admin/clientes/" + data["id"] + "/edit'>acessar</a></span>");
                            $("button.btn.btn-primary.save").attr("disabled", "disabled");
                        }
                    }
                }
            });
        }
    });

    $("input[name=email]").blur(function () {
        var _this2 = this;

        var inputName = $(this).attr('name');
        var value = $(this).val();
        $(".msg-" + inputName + "-validation").remove();
        $("button.btn.btn-primary.save").removeAttr("disabled");
        if (value != "" && value != null) {
            $.ajax({
                url: '/admin/check-if-customer-exists',
                type: 'POST',
                data: { "value": value, "fieldName": inputName },
                success: function success(data) {
                    if (!jQuery.isEmptyObject(data) && emailInitial != data[inputName]) {
                        $(_this2).parent().append("<span class='msg-validation-exists msg-" + inputName + "-validation'>Já existe um cliente com esse " + inputName + " <a href='/admin/clientes/" + data["id"] + "/edit'>acessar</a></span>");
                        $("button.btn.btn-primary.save").attr("disabled", "disabled");
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

$(document).ready(function () {
    $('select.select2[name="customer_belongsto_how_did_find_out_relationship_1[]"]').attr("required", true);
    $('select.select2[name="customer_type_id"]').attr("required", true);
});

var selCustomerModel = '#create-customer-modal',
    $editEventModal = $('#edit-event-modal'),
    $fastCustomerCreate = $('#customer-create'),
    customerSelectText = 'select.select2[name="event_belongstomany_customer_relationship[]"]';

// Evento disparado quando modal de Events abre
$(selCustomerModel).on('show.bs.modal', function (e) {

    var setNameInput = function setNameInput(_customerName) {
        if (_customerName) {
            self.find('.modal-title span').text(_customerName);
            $(e.currentTarget).find('input[name="name"]').val(_customerName);
        }
    };

    var customerName = $(e.relatedTarget).data('customer-name'),
        self = $(e.currentTarget),
        parent = $(e.relatedTarget),
        customerId = parent.data('customer-id'),
        $modalBody = self.find('.modal-body');

    $(customerSelectText).select2('close');

    setNameInput(customerName);

    if ($modalBody.is(':empty')) {
        $.ajax({
            url: '/admin/clientes/create',
            type: 'GET',
            success: function success(data) {
                $modalBody.html($(data)).promise().done(function () {
                    setNameInput(customerName);
                });
            }
        });
    }
}).on('hide.bs.modal', function (e) {
    $(selCustomerModel + ' form')[0].reset();
});

$(document.body).on('submit', selCustomerModel + ' form', function (e) {

    e.preventDefault();

    var $fastCustomerEditForm = $(e.currentTarget),
        dataForm = $fastCustomerEditForm.serialize(),
        urlAction = $fastCustomerEditForm.attr('action');

    $.ajax({
        url: urlAction,
        type: 'POST',
        data: dataForm,
        success: function success(response) {

            var data = response.data;

            if (response.success) {

                toastr.success('Cliente ' + data.name + ' criado com sucesso!');

                $(selCustomerModel).modal('hide');

                var newOption = new Option(data.name, data.id, true, true);
                $(customerSelectText).append(newOption).trigger('change');
            } else if (response.errors) {

                var errors = response.errors;

                for (var key in errors) {
                    if (errors.hasOwnProperty(key)) {
                        toastr.error(errors[key]);
                    }
                }
            } else {
                toastr.error('Algo deu errado.');
            }
        },
        error: function error(response) {}
    });
});

/***/ }),
/* 3 */
/***/ (function(module, exports) {

$(function () {
  var dateFormat = "dd-mm-yy",
      from = $("#from").datepicker({
    dateFormat: dateFormat,
    defaultDate: "+1w",
    changeMonth: true,
    numberOfMonths: 3,
    dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    dayNamesMin: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S', 'D'],
    dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
    monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    nextText: 'Proximo',
    prevText: 'Anterior'
  }).on("change", function () {
    to.datepicker("option", "minDate", getDate(this));
  }),
      to = $("#to").datepicker({
    dateFormat: dateFormat,
    defaultDate: "+1w",
    changeMonth: true,
    numberOfMonths: 3,
    dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    dayNamesMin: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S', 'D'],
    dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
    monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    nextText: 'Proximo',
    prevText: 'Anterior'
  }).on("change", function () {
    from.datepicker("option", "maxDate", getDate(this));
  });

  function getDate(element) {
    var date;
    try {
      date = $.datepicker.parseDate(dateFormat, element.value);
    } catch (error) {
      date = null;
    }

    return date;
  }
});

/***/ }),
/* 4 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);