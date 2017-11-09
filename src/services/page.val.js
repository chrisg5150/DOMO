'use strict';

angular
    .module('app.core')
    .value('PageData', {
        'title': null,
        'icon':null,
        'description': null,
        'loading': false,
        'metricType':'currency',
        'dataGroup':'subcategory',
        'lang':{
          'datepop':'Amazon VC reporting lags 3 to 5 days',
          'salesdollarspop':'Sales Dollars - Shipped cost of goods sold (COGS) during the selected reporting period.',
          'salesunitspop':'Sales Units - Units sold during the selected reporting period.',
          'invoosratepop':'Out of Stock Rate - The percentage of customer glance views during which the item was Out of Stock but replenishable, measured over the total customer glance views the item had.',
          'invlostdollarspop':'Lost Dollars – The total sales that were lost due to out of stock items. Calculated by multiplying Forecasted Units by Out of Stock Rate by Cost per Unit.',
          'invlostunitspop':'Lost Units – The total units that were lost due to out of stock items. Calculated by multiplying Forecasted Units by Out of Stock Rate.',
          'invatriskdollarspop':'At Risk Dollars - The total potential sales that are at risk due to low inventory. Calculated by summing the 4-week demand (on-hand and in-route inventory) and multiplying by the Cost Per Unit and Out of Stock Rate.',
          'invatriskunitspop':'At Risk Units - The total potential units that are at risk due to low inventory. Calculated by summing the 4-week demand (on-hand and in-route inventory) and multiplying by Out of Stock Rate.',
          'vltpop':'Overall Vendor Lead Time (VLT) – The average time between the submission of each PO unit and the time of receipt in our fulfillment centers, during the selected time period (represented in days).',
          'lbbpop':'Lost Buy Box Rate - The percentage page views during which we lost buy box to a third party merchant due to various reasons such as uncompetitive price or being out of stock.',
          'lbblostdollarspop':'Lost Dollars – The total sales (dollars) lost due to a third party merchant. Calculated by multiplying Forecasted Units by Lost Buy Box Rate by Cost Per Unit.',
          'lbblostunitspop':'Lost Units – The total units lost due to a third party merchant. Calculated by multiplying Forecasted Units by Lost Buy Box Rate.',
          'vltdays':'VLT Days',
          'changeas':'change as of',
          'mom':'MoM',
          'wow':'WoW',
          'lost':'Lost',
          'lostlbb':'Lost Buy Box Rate',
          'atrisk':'at Risk',
          'oos':'Out of Stock Rate'
        },
        'optionBar':{
          'show':true,
          'metricShow':true,
          'metricCurrent':{},
          'metricChoices':[
            {
              name:'Dollars',
              val:'dollars'
            },
            {
              name:'Units',
              val:'units'
            }
          ],
          'timeShow':true,
          'timeCurrent':{},
          'timeChoices':[
            {
              name:'Week to Date',
              val:'weekly'
            },
            {
              name:'Month to Date',
              val:'monthly'
            }
          ],
          'viewShow':false,
          'viewCurrent':{},
          'viewChoices':[
            {
              name:'Totals',
              val:'totals'
            },
            {
              name:'Trends',
              val:'trends'
            }
          ],
          'opsShow':false,
          'opsCurrent':{},
          'opsChoices':[

            {
              name:'VLT',
              val:'vlt'
            },
            {
              name:'Trends',
              val:'trends'
            }
          ]
        },
        'domoData':{},
        'userData':{
          'userEmail': '',
        }
    });
