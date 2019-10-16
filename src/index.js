jsmvc.view.card = (headerChildElements, bodyChildElements, callbacks) => {
    const v = jsmvc.view;
    return v.div({ 'class': 'card' }, [
        () => {
            if (headerChildElements) {
                return v.div({ 'class': 'card-header' }, headerChildElements)
            }
        },
        v.div({ 'class': 'card-body' },
            bodyChildElements
        )
    ], callbacks);
};

jsmvc.view.field = (label, attrs, hint, data, dataId, callbacks) => {
    if (!attrs) {
        attrs = {};
    }
    if (!attrs.cols) {
        attrs.cols = 6;
    }

    if (!callbacks) {
        callbacks = [];
    }
    if (!Array.isArray(callbacks)) {
        callbacks = [callbacks];
    }

    const v = jsmvc.view;
    return v.div({ 'class': `form-group col-${attrs.cols || 4}` }, [
        v.label({ 'for': dataId },
            label
        ),
        v.input(Object.assign({ 'class': 'form-control', 'id': dataId, 'type': 'text' }, attrs), [], [
            (input) => {
                input.value = data[dataId];
                input.on('change', () => {
                    data[dataId] = input.value;
                });
                data.on(`change:${dataId}`, () => {
                    input.value = data[dataId];
                });
            },
            ...callbacks
        ]),
        () => {
            if (hint) {
                return v.small({ 'class': 'form-text text-muted' },
                    hint
                );
            }
        }

    ]);
};

var domContentLoadedCallback = function () {
    const m = jsmvc.model;
    const data = window.data = m({
        'Front_E15': 56,
        'Front_E18': 9,
        'Front_E22': 350000,
        'Front_E24': 120000,
        'Front_E25': 0,
        'Front_E27': 650000,
        'Front_E29': 0,
        'Front_E31': 5,
        'Front_E33': 1.2
    });

    for (let index = 0, length = 28; index < length; index++) {
        data.setProperty(`Front_D${44 + index}`, 0);
        data.setProperty(`Front_E${44 + index}`, 12);
        data.setProperty(`Front_F${44 + index}`, 'Y');
    }

    const v = jsmvc.view;
    v(document.getElementById('app'), null, [
        v.card(
            'INPUTS', [
            v.div({ 'class': 'row' }, [
                v.field('Age', null, 'Nearest Birthday at 1/1/2019. Ages Between 18 - 64', data, 'Front_E15'),
                v.field('Enter Projection Period', null, 'Must End Prior to Age 65', data, 'Front_E18'),
                v.field('Estimated 2019 T4 Income', null, null, data, 'Front_E22'),
                v.field('Estimated 2018 ITA 146.(1) "Earned Income"', null, null, data, 'Front_E24'),
                v.field('Estimated 1990 ITA 146.(1) "Earned Income"', null, null, data, 'Front_E25'),
                v.field('RRSPs to date available for transfer', null, null, data, 'Front_E27'),
                v.field('Unused RRSP Deduction Limit at end of 2018', null, null, data, 'Front_E29'),
                v.field('ROA %', null, null, data, 'Front_E31'),
                v.field('Non-Integris AUM Fee', null, null, data, 'Front_E33')
            ]),
            v.hr(),
            v.p(null,
                'If purchase of past service is contemplated, provide information in the green input fields below re: historical T4 information.'
            ),
            ...(() => {
                const array = []
                for (let index = 0, length = 28; index < length; index++) {
                    array.push(
                        v.p({ 'style': 'margin-bottom: 8px;' },
                            v.strong(null, 1991 + index),
                        ),
                        v.div({ 'class': 'row' }, [
                            v.field('Annual Rate of T4 Earnings in Year bought-back', null, null, data, `Front_D${44 + index}`),
                            v.field('Number of Complete Months worked in Year', null, null, data, `Front_E${44 + index}`),
                            v.field('Utilize -$8,000 RRSP Contribution Room Availability?', null, '["Y" = Yes or leave blank for No]', data, `Front_F${44 + index}`)
                        ])
                    )
                }
                return array;
            })()
        ]),
        v.card([
            v.span(null,
                () => `${data['Front_E18']} Year Projection Results`,
                (span) => {
                    data.on('change:Front_E18', () => {
                        span.render();
                    });
                }
            )
        ], [
            v.table({ 'class': 'table table-bordered' }, [
                v.thead(null,
                    v.tr(null, [
                        v.th({ 'width': '25%' }),
                        v.th(null),
                        v.th({ 'width': '10%' }, 'Accumulated Account'),
                        v.th({ 'width': '10%' }, 'Accumulated Account Net of INTEGRIS fees at ROA interest'),
                        v.th({ 'width': '10%' }, 'Accumulated Contributions W/O Interest')
                    ])
                ),
                v.tbody(null, [
                    v.tr(null, [
                        v.td(null),
                        v.td(null, 'RRSP'),
                        v.td({ 'class': 'text-right' }, '0'),
                        v.td({ 'class': 'text-right' }, '0'),
                        v.td({ 'class': 'text-right' }, '0'),
                    ]),
                    v.tr({ 'class': 'hasBorderTop' }, [
                        v.td({ 'rowspan': 6 }, 'INTEGRIS AUM Fees'),
                        v.td(null, 'INTEGRIS  DC Accumulation'),
                        v.td({ 'class': 'text-right' }, '0'),
                        v.td({ 'class': 'text-right' }, '0'),
                        v.td({ 'class': 'text-right' }, '0'),
                    ]),
                    v.tr(null, [
                        v.td(null, 'INTEGRIS  DC Fees W/O Interest'),
                        v.td({ 'class': 'text-right' }, '0'),
                        v.td({ 'class': 'text-right' }, '0'),
                        v.td({ 'class': 'text-right' }, '0'),
                    ]),
                    v.tr(null, [
                        v.td(null, 'INTEGRIS  DC Fees accumulated at ROA interest'),
                        v.td({ 'class': 'text-right' }, '0'),
                        v.td({ 'class': 'text-right' }, '0'),
                        v.td({ 'class': 'text-right' }, '0'),
                    ]),
                    v.tr({ 'class': 'hasBorderTop' }, [
                        v.td(null, 'INTEGRIS DC/DB Accumulation'),
                        v.td({ 'class': 'text-right' }, '0'),
                        v.td({ 'class': 'text-right' }, '0'),
                        v.td({ 'class': 'text-right' }, '0'),
                    ]),
                    v.tr(null, [
                        v.td(null, 'INTEGRIS  DC/DB Fees W/O Interest'),
                        v.td({ 'class': 'text-right' }, '0'),
                        v.td({ 'class': 'text-right' }, '0'),
                        v.td({ 'class': 'text-right' }, '0'),
                    ]),
                    v.tr(null, [
                        v.td(null, 'INTEGRIS  DC/DB Fees accumulated at ROA interest'),
                        v.td({ 'class': 'text-right' }, '0'),
                        v.td({ 'class': 'text-right' }, '0'),
                        v.td({ 'class': 'text-right' }, '0'),
                    ]),
                    v.tr({ 'class': 'hasBorderTop' }, [
                        v.td({ 'rowspan': 6 }, 'INTEGRIS Fee for Service'),
                        v.td(null, 'INTEGRIS  DC Accumulation'),
                        v.td({ 'class': 'text-right' }, '0'),
                        v.td({ 'class': 'text-right' }, '0'),
                        v.td({ 'class': 'text-right' }, '0'),
                    ]),
                    v.tr(null, [
                        v.td(null, 'INTEGRIS  DC Fees W/O Interest'),
                        v.td({ 'class': 'text-right' }, '0'),
                        v.td({ 'class': 'text-right' }, '0'),
                        v.td({ 'class': 'text-right' }, '0'),
                    ]),
                    v.tr(null, [
                        v.td(null, 'INTEGRIS  DC Fees accumulated at ROA interest'),
                        v.td({ 'class': 'text-right' }, '0'),
                        v.td({ 'class': 'text-right' }, '0'),
                        v.td({ 'class': 'text-right' }, '0'),
                    ]),
                    v.tr({ 'class': 'hasBorderTop' }, [
                        v.td(null, 'INTEGRIS DC/DB Accumulation'),
                        v.td({ 'class': 'text-right' }, '0'),
                        v.td({ 'class': 'text-right' }, '0'),
                        v.td({ 'class': 'text-right' }, '0'),
                    ]),
                    v.tr(null, [
                        v.td(null, 'INTEGRIS  DC/DB Fees W/O Interest'),
                        v.td({ 'class': 'text-right' }, '0'),
                        v.td({ 'class': 'text-right' }, '0'),
                        v.td({ 'class': 'text-right' }, '0'),
                    ]),
                    v.tr(null, [
                        v.td(null, 'INTEGRIS  DC/DB Fees accumulated at ROA interest'),
                        v.td({ 'class': 'text-right' }, '0'),
                        v.td({ 'class': 'text-right' }, '0'),
                        v.td({ 'class': 'text-right' }, '0'),
                    ])
                ])
            ]),
            v.table({ 'class': 'table table-bordered' }, [
                v.tbody(null, [
                    v.tr(null, [
                        v.th({ 'colspan': 2 }, 'RESULTS')
                    ])
                ]),
                v.tbody(null, [
                    v.tr(null, [
                        v.td({ 'class': 'text-right', 'width': '25%' }, '0'),
                        v.td(null, 'Total Funds Projected at Retirement Date in the Member\'s RRSP Account')
                    ]),
                    v.tr(null, [
                        v.td({ 'class': 'text-right' }, '0'),
                        v.td(null, 'Total PPP Funds Projected at Retirement (net of INTEGRIS Fees)')
                    ]),
                    v.tr(null, [
                        v.td({ 'class': 'text-right' }, '0'),
                        v.td(null, 'Excess assets available in registered assets at retirement due to upgrade to PPP')
                    ]),
                    v.tr(null, [
                        v.td({ 'class': 'text-right' }, '0'),
                        v.td(null, 'Adjusment for Extra Contributions Required by PPP rules above RRSP limits')
                    ]),
                    v.tr(null, [
                        v.td({ 'class': 'text-right' }, '0'),
                        v.td(null, 'Excess assets created by PPP after adjusting for additional contributions required by PPP')
                    ]),
                    v.tr(null, [
                        v.td({ 'class': 'text-right' }, '0'),
                        v.td(null, 'Past Service bought-back (Years)')
                    ]),
                    v.tr(null, [
                        v.td({ 'class': 'text-right' }, '0'),
                        v.td(null, 'Total Cost of Past Service')
                    ]),
                    v.tr(null, [
                        v.td({ 'class': 'text-right' }, '0'),
                        v.td(null, 'Qualifying Transfer from Member\'s existing RRSPs')
                    ]),
                    v.tr(null, [
                        v.td({ 'class': 'text-right' }, '0'),
                        v.td(null, 'Tax Deductible Company Past Service Contribution')
                    ]),
                    v.tr(null, [
                        v.td({ 'class': 'text-right' }, '0'),
                        v.td(null, 'RRSP Room Utilized')
                    ]),
                    v.tr(null, [
                        v.td({ 'class': 'text-right' }, '0'),
                        v.td(null, 'Unused RRSP Room After PSPA Utilization of RRSP Room')
                    ])
                ])
            ]),
            v.table({ 'class': 'table table-bordered' }, [
                v.tbody(null, [
                    v.tr(null, [
                        v.td({ 'class': 'text-right', 'width': '25%' }, '0'),
                        v.td(null, 'Company Contributions made to purchase Past Service')
                    ]),
                    v.tr(null, [
                        v.td({ 'class': 'text-right', 'width': '25%' }, '0'),
                        v.td(null, 'PPP Investment Management Expenses ')
                    ]),
                    v.tr(null, [
                        v.td({ 'class': 'text-right', 'width': '25%' }, '0'),
                        v.td(null, 'PPP INTEGRIS Expenses')
                    ]),
                    v.tr(null, [
                        v.td({ 'class': 'text-right', 'width': '25%' }, '0'),
                        v.td(null, 'Additional tax-deductible contributions due to payment of expenses')
                    ]),
                    v.tr(null, [
                        v.td({ 'class': 'text-right', 'width': '25%' }, '0'),
                        v.td(null, 'Additional PPP Investment Earnings generated net of expenses ')
                    ]),
                    v.tr(null, [
                        v.td({ 'class': 'text-right', 'width': '25%' }, '0'),
                        v.td(null, 'PPP investment management fees over entire period')
                    ]),
                    v.tr(null, [
                        v.td({ 'class': 'text-right', 'width': '25%' }, '0'),
                        v.td(null, '')
                    ]),
                    v.tr(null, [
                        v.td({ 'class': 'text-right', 'width': '25%' }, '0'),
                        v.td(null, 'Monthly Defined Benefit Pension @65')
                    ]),
                    v.tr(null, [
                        v.td({ 'class': 'text-right', 'width': '25%' }, '0'),
                        v.td(null, 'Additional RRSP account balance at age 65')
                    ]),
                    v.tr(null, [
                        v.td({ 'class': 'text-right', 'width': '25%' }, '0'),
                        v.td(null, 'DC/AVC account ')
                    ]),
                    v.tr(null, [
                        v.td({ 'class': 'text-right', 'width': '25%' }, '0'),
                        v.td(null, 'DB/DC/PPP Initial Year Contributions')
                    ]),
                    v.tr(null, [
                        v.td({ 'class': 'text-right', 'width': '25%' }, '0'),
                        v.td(null, 'RRSP Initial Year Contribution')
                    ]),
                    v.tr(null, [
                        v.td({ 'class': 'text-right', 'width': '25%' }, '0'),
                        v.td(null, 'DB/DC/PPP RRSP Initial Year Current Service Costs')
                    ]),
                    v.tr(null, [
                        v.td({ 'class': 'text-right', 'width': '25%' }, '0'),
                        v.td(null, 'Total Initial Year Current Service Costs including Qualifying Transfer')
                    ]),
                    v.tr(null, [
                        v.td({ 'class': 'text-right', 'width': '25%' }, '0'),
                        v.td(null, 'RRSP Investment Management Expenses ')
                    ])
                ]),
            ])
        ], [])
    ]);
};

if (document.readyState === 'complete' || (document.readyState !== 'loading' && !document.documentElement.doScroll)) {
    domContentLoadedCallback();
} else {
    document.addEventListener('DOMContentLoaded', domContentLoadedCallback);
}