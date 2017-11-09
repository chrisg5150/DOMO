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
