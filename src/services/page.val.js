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
          'timeShow':true,
          'timeCurrent':{},
          'timeChoices':[
            {
              name:'Today',
              val:'today'
            },
            {
              name:'Week to Date',
              val:'weekToDate'
            },
            {
              name:'Month to Date',
              val:'monthToDate'
            },
            {
              name:'Year to Date',
              val:'yearToDate'
            },
            {
              name:'Last 12 Months',
              val:'last12Months'
            },
            {
              name:'Date Range',
              val:'dateRange'
            }
          ],
          'show':true,
          'metricShow':true,
          'metricCurrent':{},
          'metricChoices':[  
            {
              name:'Total',
              val:'total'
            }
          ],
          'viewShow':true,
          'viewCurrent':{},
          'viewChoices':[
            {
              name:'By Group',
              val:'byGroup'
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
