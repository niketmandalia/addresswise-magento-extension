define([
    'jquery',
    './country_mapping',
    './state_mapping'
], function ($, country_mapping, state_mapping) {
    "use strict";
    let client_Token = '';
    let form_type = null;

    $.ajax({
        url: "/addresswise/index/display",
        type: "GET",
        complete: function (response) {
            client_Token = response.client_Token;
        }
    });

    return function (config) {
        let client_Token = config.client_token;
        let enabled = config.enabled;
        let debounceTimer;

        if (!enabled) {
            return false;
        } else {
            jQuery(document).on('keyup paste focus', "input[name='street[0]']", function (e) {
                clearTimeout(debounceTimer);

                const inputElement = $(this);
                const inputValue = inputElement.val().trim();

                if (inputValue.length >= 4) {
                    // Set a new debounce timer to delay the execution of the event handler
                    debounceTimer = setTimeout(function () {
                        if (inputElement.parents('.billing-address-form').length === 1) {
                            form_type = 'billing';
                            let country_code = $(country_mapping.billing.Country.country).val();
                            inputAddress(country_code, country_mapping.billing.Search);
                        } else if (inputElement.parents('.form-shipping-address').length === 1) {
                            form_type = 'shipping';
                            let country_code = $(country_mapping.shipping.Country.country).val();
                            inputAddress(country_code, country_mapping.shipping.Search);
                        }

                    }, 1000);
                }
            });

            jQuery(document).on('keyup paste focus', country_mapping.address_book.Search, function (e) {
                form_type = 'address_book';
                let country_code = $(country_mapping.address_book.Country.country).val();

                clearTimeout(debounceTimer); // Clear the previous debounce timer

                // Set a new debounce timer to delay the execution of the event handler
                debounceTimer = setTimeout(function () {
                    inputAddress(country_code, country_mapping.address_book.Search);
                }, 1000);
            });

            /**
             * Click event in the suggestion menu
             */
            jQuery(document).on('click', '.af-option', function (e) {
                let txt = $(e.target).attr('id');
                let type = $(e.target).attr('country');
                if (txt === 'no-add' || txt === 'af-option-last' || txt === 'af-option-waiting') {
                    e.preventDefault();
                } else {
                    if (form_type === 'shipping') {
                        let country_code = $(country_mapping.shipping.Country.country).val();
                        if (country_code === 'NZ') {
                            getSelectedAddress(txt, country_mapping.shipping.NZ, country_code);
                        } else if (country_code === 'AU') {
                            getSelectedAddressRest(txt, country_mapping.shipping.AU, country_code);
                        } else {
                            getSelectedAddressRest(txt, country_mapping.shipping.NZ, country_code);
                        }
                    } else if (form_type === 'address_book') {
                        let country_code = $(country_mapping.address_book.Country.country).val();
                        if (country_code === 'NZ') {
                            getSelectedAddress(txt, country_mapping.address_book.NZ, country_code);
                        } else if (country_code === 'AU') {
                            getSelectedAddressRest(txt, country_mapping.address_book.AU, country_code);
                        } else {
                            getSelectedAddressRest(txt, country_mapping.address_book.NZ, country_code);
                        }
                    } else {
                        let country_code = $(country_mapping.billing.Country.country).val();
                        if (country_code === 'NZ') {
                            getSelectedAddress(txt, country_mapping.billing.NZ, country_code);
                        } else if (country_code === 'AU') {
                            getSelectedAddressRest(txt, country_mapping.billing.AU, country_code);
                        } else {
                            getSelectedAddressRest(txt, country_mapping.billing.NZ, country_code);
                        }
                    }
                }
            });

            /**
             * Focus out of input except af-option will hide af-option
             */
            let evt;
            document.onmousemove = function (e) {
                e = e || window.event;
                evt = e;
            }
            jQuery(document).on('focusout', "input[name='street[0]']", function (e) {
                if ($(this).val().trim().length === 0) {

                    clearSuggestions();
                } else if (!$(evt.target).closest('.af-option').length) {
                    $('.af-option').hide();
                }
            });

            /**
             * Get all addresses based on user input
             * @param input
             * @param country_code
             */
            const getAddresses = (input, country_code) => {
                const params = new URLSearchParams();

                params.append('q', input);
                params.append('country', country_code);

                params.append('client_token', client_Token);

                const apiUrl = `https://api.addresswise.co.nz/api/address-suggestions?${params.toString()}`;
                fetch(apiUrl, {
                    method: "GET",
                    headers: {
                        'ngrok-skip-browser-warning': true,
                    },
                }).then((response) => {
                    return response.json();
                }).then((text) => {
                    let obj = text.addresses;
                    let table = document.getElementsByClassName('af-option')[0]
                    $(table).empty();
                    if (text.addresses.length === 0) {
                        createLi('no-add', 'no-add');
                    }
                    for (let key in obj) {
                        if (key <= 5) {
                            createLi(obj[key].address_id, obj[key].full_address, country_code);
                        }
                    }

                }).catch((e) => {
                    console.log(e);
                });
            };

            /**
             * Get selected address with provided ID
             * @param id
             * @param country
             */
            const getSelectedAddress = (id, country, country_code) => {
                form_type = '';
                const params = new URLSearchParams();

                params.append('country', country_code);

                params.append('client_tokens', client_Token);
                params.append('addressId', id);

                let url_fetch = `https://api.addresswise.co.nz/api/getFullAddress?${params.toString()}`;

                fetch(url_fetch, {
                    method: "GET",
                    headers: {
                        'ngrok-skip-browser-warning': true
                    }
                }).then((response) => {
                    return response.json();
                }).then((text) => {
                    $('.af-option').toggle();
                    $(country.address1)[0].value = '';
                    if (text.address.unit_type) {
                        $(country.search).val(text.address.unit_type + ' ' + text.address.unit_value).trigger("change");
                        (text.address.street_alpha) ?
                            $(country.address1).val(text.address.street_number + text.address.street_alpha + ' ' + text.address.street + ' ' + text.address.street_type).trigger("change") :
                            $(country.address1).val(text.address.street_number + ' ' + text.address.street + ' ' + text.address.street_type).trigger("change");
                    } else {
                        (text.address.street_alpha) ?
                            $(country.search).val(text.address.street_number + text.address.street_alpha + ' ' + text.address.street + ' ' + text.address.street_type).trigger("change") :
                            $(country.search).val(text.address.street_number + ' ' + text.address.street + ' ' + text.address.street_type).trigger("change");
                    }
                    $(country.suburb).val(text.address.suburb).trigger("change");
                    $(country.city).val(text.address.city).trigger("change");
                    $(country.postcode).val(text.address.postcode).trigger("change");
                }).catch((e) => {
                    console.log('Error fetching address data:', e);
                    console.log(e);
                });
            };

            const getSelectedAddressRest = (id, country, country_code) => {

                form_type = '';

                const params = new URLSearchParams();

                params.append('country', country_code);
                params.append('client_tokens', client_Token);
                params.append('addressId', id);

                let url_fetch = `https://api.addresswise.co.nz/api/getFullAddress?${params.toString()}`;
                fetch(url_fetch, {
                    method: "GET",
                    headers: {
                        'ngrok-skip-browser-warning': true
                    }
                }).then(response => {
                    return response.json();
                }).then(text => {
                    $(".af-option").toggle();
                    $(country.address1)[0].value = "";
                    let addressArr = {};
                    let obj = text.result.address_components;
                    for (let key in obj) {
                        addressArr[obj[key].types[0]] = obj[key].short_name;
                    }

                    if (addressArr) {
                        let addressString = '';

                        if (addressArr.street_number) {
                            addressString += addressArr.street_number;
                        }

                        if (addressArr.route) {
                            if (addressString) {
                                addressString += ' ';
                            }
                            addressString += addressArr.route;
                        }

                        if (addressArr.subpremise) {
                            if (addressString) {
                                addressString += ' ';
                            }
                            addressString += addressArr.subpremise;
                        }

                        $(country.search).val(addressString).trigger("change");
                    } else {
                        console.log('addressArr is undefined or missing');
                    }

                    if (addressArr.postal_code_suffix) {
                        $(country.postcode).val(addressArr.postal_code_suffix + "-" + addressArr.postal_code).trigger("change");
                    } else {
                        $(country.postcode).val(addressArr.postal_code).trigger("change");
                    }

                    $(country.city).val(addressArr.locality).trigger("change");

                    if (addressArr.administrative_area_level_1) {
                        let stateAbbreviation = addressArr.administrative_area_level_1;

                        if (state_mapping.state[stateAbbreviation]) {
                            let stateValue = state_mapping.state[stateAbbreviation];
                            $(country.region).val(stateValue).trigger("change");
                        } else {
                            console.error('State abbreviation not found in mapping:', stateAbbreviation);
                        }
                    } else {
                        console.error('State information is missing in the response.');
                    }
                }).catch(e => {
                    console.log(e);
                });
            };

            /**
             * Input Addresses
             * @param country_code
             * @param type
             */
            const inputAddress = (country_code, type) => {
                let offset = $(type).offset();
                $(".af-popup").css("top", offset.top + 32);
                $(".af-popup").css("left", offset.left);

                clearSuggestions();

                if ($(type).val().length === 0) {
                    return;
                }
                $(".af-option").show();

                if ($(type).val().length > 4) {
                    if (country_code === 'NZ') {
                        getAddresses($(type).val(), country_code);
                    } else {
                        getAddresses($(type).val(), country_code);
                    }
                } else if ($(type).val().length < 4) {
                    let table = document.getElementsByClassName('af-option')[0];
                    $(table).empty();
                    createLi('af-option-waiting', 'af-option-waiting');
                } else {
                    $('.af-option').hide();
                }
            };

            const clearSuggestions = () => {
                let table = document.getElementsByClassName('af-option')[0];
                $(table).empty();

            };

            /**
             * Create Li element and append to Ul element
             * @param address_id
             * @param address
             */
            const createLi = (address_id, address, country_code) => {
                let table = document.getElementsByClassName('af-option')[0];
                let newTr = document.createElement('tr');
                let newTd = document.createElement('td');
                newTd.setAttribute('id', address_id);
                if (address_id === 'af-option-last' && address === 'af-option-last') {
                } else if (address_id === 'af-option-waiting') {
                    newTd.innerHTML = 'Please type suggestion';
                } else if (address_id === 'no-add') {
                    newTd.innerHTML = 'No addresses were found.';
                } else {
                    newTd.setAttribute('country', country_code);
                    newTd.innerHTML = address;
                }
                newTr.appendChild(newTd);
                table.appendChild(newTr);
            };

        }
    }
});
