require([
    "dojo/_base/declare",
    "PredefinedFilters/widget/PredefinedFilters",
    "dojo/_base/lang",
], function (declare, _rootWidget, lang) {
    return declare("PredefinedFilters.widget.PredefinedFiltersContext", [_rootWidget], {
        //extra modeler variable
        baseEnum: null,
        update: function (obj, callback) {
            logger.debug(this.id + ".update");
            // console.log('updating');

            // Find the grid
            this._clxNode = this._getCollectionNode(this.gridName);
            // console.log(this._clxNode);
            if (this._clxNode) {
                this._clx = dijit.registry.byNode(this._clxNode);
                this._addSearchButtons(this.filters);
                if (this.isListView) {
                    this._dataType = "xpath";
                } else {
                    switch (this._clx.config.datasource.type) {
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
                }
                var defaultSet = this.filters.filter(function (f) {
                    return f.isdefault;
                });
                // if set contextually, then set the default according to the Enum
                if (this.baseEnum) {
                    var keyToMatch = obj.get(this.baseEnum)
                        , winningFilter = this.filters.find(function (el) {
                            return el.enumkey == keyToMatch
                        });
                    if (winningFilter) {
                        lang.hitch(this, this._setInitialFilter(winningFilter.xpathstring));    
                    }
                    else if (defaultSet.length > 0) {
                        console.log('matching enum key not found. Skipping to default')
                        lang.hitch(this, this._setInitialFilter(defaultSet[0].xpathstring));
                    }  
                }
                // else if set by default
                else if (defaultSet.length > 0) {
                    lang.hitch(this, this._setInitialFilter(defaultSet[0].xpathstring));
                }
            } else {
                console.log('Found a DOM node but it\'s not the grid widget');
            }


            this._contextObj = obj;
            this._updateRendering(callback);
        }

        
    })
});

require(["PredefinedFilters/widget/PredefinedFiltersContext"], function () {
    "use strict";
});
