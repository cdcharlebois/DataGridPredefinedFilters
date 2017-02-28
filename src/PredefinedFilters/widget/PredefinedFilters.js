define([
    "dojo/_base/declare",
    "mxui/widget/_WidgetBase",

    "mxui/dom",
    "dojo/dom",
    "dojo/dom-prop",
    "dojo/dom-geometry",
    "dojo/dom-class",
    "dojo/dom-style",
    "dojo/dom-construct",
    "dojo/_base/array",
    "dojo/_base/lang",
    "dojo/text",
    "dojo/html",
    "dojo/_base/event",
    "PredefinedFilters/lib/jquery"


], function(declare, _WidgetBase, dom, dojoDom, dojoProp, dojoGeometry, dojoClass, dojoStyle, dojoConstruct, dojoArray, lang, dojoText, dojoHtml, dojoEvent, _jQuery) {
    var $ = _jQuery.noConflict(true);
    "use strict";

    return declare("PredefinedFilters.widget.PredefinedFilters", [_WidgetBase], {


        // Internal variables.
        _handles: null,
        _contextObj: null,
        _grid: null,
        _searchTimeout: null,
        _gridNode: null,
        _datatype: null,
        // modeler
        gridName: null,
        filters: null,
        showFilterIcon: null,
        extraClass: null,
        showAll: null,


        constructor: function() {
            this._handles = [];
        },

        postCreate: function() {
            logger.debug(this.id + ".postCreate");
        },

        update: function(obj, callback) {
            logger.debug(this.id + ".update");
            console.log('updating');

            // Find the grid
            this._gridNode = this._getGridNode(this.gridName);
            console.log(this._gridNode);
            if (this._gridNode) {
                this._grid = dijit.registry.byNode(this._gridNode);
                this._addSearchButtons(this.filters);
                switch (this._grid.config.datasource.type) {
                    case "entityPath":
                    case "microflow":
                        this._dataType = "local";
                        break;
                    case "xpath":
                        this._dataType = "xpath";
                        break;
                    default:
                        this._dataType = "unsupported";
                        break;
                }
                var defaultSet = this.filters.filter(function(f) {
                    return f.isdefault;
                });
                if (defaultSet) {
                    this._applyFilter(defaultSet[0].xpathstring);
                }
            } else {
                console.log('Found a DOM node but it\'s not the grid widget');
            }


            this._contextObj = obj;
            this._updateRendering(callback);
        },

        resize: function(box) {
            logger.debug(this.id + ".resize");
        },

        uninitialize: function() {
            logger.debug(this.id + ".uninitialize");
        },

        _attachButtonToGrid: function(buttonNode) {
            var grid = this._gridNode,
                button = buttonNode
                // ,   toolbar = grid.querySelector('.mx-grid-toolbar');
                ,
                toolbar = grid.querySelector('.mx-grid-search-inputs'),
                filterbar = toolbar.querySelector('.mx-filters');

            if (filterbar) {
                filterbar.appendChild(button);
            } else {
                var fb = document.createElement('div');
                fb.className = 'mx-filters';
                fb.appendChild(button);
                toolbar.appendChild(fb);
            }

            // toolbar.appendChild(button);
        },

        _addSearchButtons: function(map) {
            if (this.showAll) {
                map.push({
                    xpathstring: '',
                    buttontext: 'All',
                    isdefault: false
                });
            }

            map.forEach(lang.hitch(this, function(filter) {
                console.log(filter);
                var iconEl = document.createElement('span'),
                    buttonEl = document.createElement('button');
                if (this.showFilterIcon) {
                    iconEl.className = 'glyphicon glyphicon-filter';
                    buttonEl.appendChild(iconEl);
                }
                buttonEl.appendChild(document.createTextNode(filter.buttontext));
                buttonEl.className = 'mx-button btn btn-default dgfilter-button ';
                if (this.extraClass != '') {
                    buttonEl.className += this.extraClass;
                }
                buttonEl.dataset.filter = filter.xpathstring;
                // this._gridNode.appendChild(buttonEl);
                this._attachButtonToGrid(buttonEl);
                // filter.xpathstring
                // filter.buttontext
                // filter.isdefault
            }));
        },

        _applyFilter: function(xpath) {
            var grid = this._grid,
                datasource = grid._dataSource;

            // clearTimeout(this._searchTimeout);

            if (this._dataType === 'xpath') {
                // this._searchTimeout = setTimeout(lang.hitch(this, function() {
                    datasource.setConstraints(xpath);
                    grid.reload();
                // }), 500);
            }
            else {
              console.log('unsupported grid type :(');
            }
        },

        _setupEvents: function() {
            $('.dgfilter-button').on('click', lang.hitch(this, function(e) {
                try {
                    var filter = e.target.dataset.filter;
                    this._applyFilter(filter);
                } catch (e) {
                    console.log('predefined filter: ' + filter + ' has failed.');
                }
            }));
        },

        _getGridNode: function(gridName) {
            return document.querySelector(".mx-name-" + gridName);
        },

        _updateRendering: function(callback) {
            logger.debug(this.id + "._updateRendering");

            if (this._contextObj !== null) {
                dojoStyle.set(this.domNode, "display", "block");
            } else {
                dojoStyle.set(this.domNode, "display", "none");
            }

            this._setupEvents();
            this._executeCallback(callback);
        },

        _executeCallback: function(cb) {
            if (cb && typeof cb === "function") {
                cb();
            }
        }
    });
});

require(["PredefinedFilters/widget/PredefinedFilters"]);
