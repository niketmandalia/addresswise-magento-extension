define(['jquery'], function ($) {
    "use strict";
    const stateMapping = {

        "ACT": ['569', '605'],
        "NSW": ['570', '606'],
        "NT": ['576', '612'],
        "QLD": ['572', '608'],
        "SA": ['573', '609'],
        "TAS": ['574', '610'],
        "VIC": ['571', '607'],
        "WA": ['575', '611']
    };
    return {
        state: stateMapping
    };
});

