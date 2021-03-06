'use strict';

angular
    .module('app.core')
    .value('PageData', {
        'title': null,
        'icon':null,
        'description': null,
        'loading': true,
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
          'metricShow':false,
          'metricCurrent':{},
          'metricChoices':[  
            {
              name:'Revenue',
              val:'Revenue'
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
          'viewAccountShow':false,
          'viewAccountCurrent':{},
          'viewAccountChoices':[
            {
              name:'By Group',
              val:'repGroupDesc'
            },
            {
              name:'By Rep',
              val:'RepName'
            },
            {
              name:'By Trade Status',
              val:'TradeStatus'
            }
          ],   
          'metricAccountShow':false,
          'metricAccountCurrent':{},
          'metricAccountChoices':[
            {
              name:'Opened',
              val:'Opened'
            },
            {
              name:'Active',
              val:'Active'
            },
            {
              name:'Commission',
              val:'CommAmt'
            }
          ],
          'backShow': false      
        },
        'domoData':{},
        'userData':{
          'userEmail': '',
        }
    });
