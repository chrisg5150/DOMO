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
          'mom': 'MoM',
          'yoy': 'YoY',
          'pop': 'PoP'
        },
        'optionBar':{
          'show':true,
          'timeShow':true,
          'timeCurrent':{},
          'timeChoices':[
            {
              name:'Month to Date',
              val:'MTD'
            },
            {
              name:'Year to Date',
              val:'YTD'
            },
            {
              name:'Last 12 Months',
              val:'TR12'
            },
            {
              name:'Last 3 Years',
              val:'TR3YR'
            }
          ],
          'metricShow':true,
          'metricCurrent':{},
          'metricChoices':[  
            {
              name:'Revenue',
              val:'Revenue'
            },
            {
              name:'Tickets',
              val:'Tickets'
            }
          ],
          'aggShow':true,
          'aggCurrent':{},
          'aggChoices':[  
            {
              name:'Total',
              val:'Sum'
            },
            {
              name:'Average',
              val:'Avg'
            }
          ],
          'viewShow':true,
          'viewCurrent':{},
          'viewChoices':[
            {
              name:'By Group',
              val:'repGroupDesc'
            },
            {
              name:'By Tier',
              val:'tier'
            },
            {
              name:'By Product',
              val:'productType'
            },
            {
              name:'By Account',
              val:'accountType'
            }
          ],          
        },
        'domoData':{},
        'userData':{
          'userEmail': '',
        }
    });
