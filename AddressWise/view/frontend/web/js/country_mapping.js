define([
    'jquery',
    './state_mapping'
], function($, state_mapping){
    "use strict";
    const shipping = {
        "Country": {
            country: ".form-shipping-address select[name='country_id']",
        },
        "New Zealand" : {
            search: ".form-shipping-address input[name='street[0]']",
            address1: ".form-shipping-address input[name='street[0]']",
            suburb: ".form-shipping-address input[name=region]",
            city: '.form-shipping-address input[name=city]',
            region: '.form-shipping-address input[name=region]',
            postcode: '.form-shipping-address input[name=postcode]'
        },
        "Australia" : {
            search: ".form-shipping-address input[name='street[0]']",
            address1: ".form-shipping-address input[name='street[0]']",
            city: '.form-shipping-address input[name=city]',
            region: '.form-shipping-address select[name=region_id]',
            postcode: '.form-shipping-address input[name=postcode]',
            state_mapping: state_mapping
        },
        "Search": {
            search: ".form-shipping-address input[name='street[0]']"
        }
    };
    const billing = {
        "Country": {
            country: ".billing-address-form select[name='country_id']"
        },
        "New Zealand" : {
            search: ".billing-address-form input[name='street[0]']",
            address1: ".billing-address-form input[name='street[0]']",
            suburb: ".billing-address-form input[name=region]",
            city: '.billing-address-form input[name=city]',
            region: '.billing-address-form input[name=region]',
            postcode: '.billing-address-form input[name=postcode]'
        },
        "Australia" : {
            search: ".billing-address-form input[name='street[0]']",
            address1: ".billing-address-form input[name='street[0]']",
            city: '.billing-address-form input[name=city]',
            region: '.billing-address-form select[name=region_id]',
            postcode: '.billing-address-form input[name=postcode]'
        },
        "Search": {
            search: ".billing-address-form input[name='street[0]']"
        }
    };
    const address_book = {
        "Country": {
            country: ".form-address-edit select[name='country_id']"
        },
        "New Zealand" : {
            search: ".form-address-edit input#street_1",
            address1: ".form-address-edit input#street_1",
            suburb: ".form-address-edit input[name=region]",
            city: '.form-address-edit input[name=city]',
            region: '.form-address-edit input[name=region]',
            postcode: '.form-address-edit input[name=postcode]'
        },
        "Australia" : {
            search: ".form-address-edit input#street_1",
            address1: ".form-address-edit input#street_1",
            suburb: ".form-address-edit input[name=region]",
            city: '.form-address-edit input[name=city]',
            region: '.form-address-edit select[name=region_id]',
            postcode: '.form-address-edit input[name=postcode]'
        },
        "Search": {
            search: ".form-address-edit input#street_1"
        }
    };
    let country_mapping = {};
    return country_mapping = {
        shipping: {
            Country: shipping["Country"],
            NZ: shipping["New Zealand"],
            AU: shipping["Australia"],
            Search: shipping["Search"].search
        },
        billing: {
            Country: billing["Country"],
            NZ: billing["New Zealand"],
            AU: billing["Australia"],
            Search: billing["Search"].search
        },
        address_book: {
            Country: address_book["Country"],
            NZ: address_book["New Zealand"],
            AU: address_book["Australia"],
            Search: address_book["Search"].search
        },
        state_mapping: state_mapping.state,
        Country: shipping["Country"],
        NZ: shipping["New Zealand"],
        AU: shipping["Australia"]
    };
});
