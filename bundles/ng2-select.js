System.registerDynamic("ng2-select/components/select", ["./select/select"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var select_1 = $__require('./select/select');
  exports.SELECT_DIRECTIVES = [select_1.SelectComponent];
  return module.exports;
});

System.registerDynamic("ng2-select/components/select/select-item", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var SelectItem = (function() {
    function SelectItem(source) {
      var _this = this;
      if (typeof source === 'string') {
        this.id = this.text = source;
      }
      if (typeof source === 'object') {
        this.id = source.id || source.text;
        this.text = source.text;
        if (source.children && source.text) {
          this.children = source.children.map(function(c) {
            var r = new SelectItem(c);
            r.parent = _this;
            return r;
          });
          this.text = source.text;
        }
      }
    }
    SelectItem.prototype.fillChildrenHash = function(optionsMap, startIndex) {
      var i = startIndex;
      this.children.map(function(child) {
        optionsMap.set(child.id, i++);
      });
      return i;
    };
    SelectItem.prototype.hasChildren = function() {
      return this.children && this.children.length > 0;
    };
    SelectItem.prototype.getSimilar = function() {
      var r = new SelectItem(false);
      r.id = this.id;
      r.text = this.text;
      r.parent = this.parent;
      return r;
    };
    return SelectItem;
  }());
  exports.SelectItem = SelectItem;
  return module.exports;
});

System.registerDynamic("ng2-select/components/select/select-pipes", ["@angular/core", "./common"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var core_1 = $__require('@angular/core');
  var common_1 = $__require('./common');
  var HighlightPipe = (function() {
    function HighlightPipe() {}
    HighlightPipe.prototype.transform = function(value, args) {
      if (args.length < 1) {
        return value;
      }
      var query = args[0];
      if (query) {
        var tagRE = new RegExp('<[^<>]*>', 'ig');
        var tagList = value.match(tagRE);
        var tmpValue = value.replace(tagRE, '$!$');
        value = tmpValue.replace(new RegExp(common_1.escapeRegexp(query), 'gi'), '<strong>$&</strong>');
        for (var i = 0; value.indexOf('$!$') > -1; i++) {
          value = value.replace('$!$', tagList[i]);
        }
      }
      return value;
    };
    HighlightPipe = __decorate([core_1.Pipe({name: 'highlight'}), __metadata('design:paramtypes', [])], HighlightPipe);
    return HighlightPipe;
  }());
  exports.HighlightPipe = HighlightPipe;
  function stripTags(input) {
    var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi;
    var commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
    return input.replace(commentsAndPhpTags, '').replace(tags, '');
  }
  exports.stripTags = stripTags;
  return module.exports;
});

System.registerDynamic("ng2-select/components/select/common", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  function escapeRegexp(queryToEscape) {
    return queryToEscape.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
  }
  exports.escapeRegexp = escapeRegexp;
  return module.exports;
});

System.registerDynamic("ng2-select/components/select/off-click", ["@angular/core"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var core_1 = $__require('@angular/core');
  var OffClickDirective = (function() {
    function OffClickDirective() {}
    OffClickDirective.prototype.onClick = function($event) {
      $event.stopPropagation();
    };
    OffClickDirective.prototype.ngOnInit = function() {
      var _this = this;
      setTimeout(function() {
        document.addEventListener('click', _this.offClickHandler);
      }, 0);
    };
    OffClickDirective.prototype.ngOnDestroy = function() {
      document.removeEventListener('click', this.offClickHandler);
    };
    __decorate([core_1.Input('offClick'), __metadata('design:type', Object)], OffClickDirective.prototype, "offClickHandler", void 0);
    __decorate([core_1.HostListener('click', ['$event']), __metadata('design:type', Function), __metadata('design:paramtypes', [MouseEvent]), __metadata('design:returntype', void 0)], OffClickDirective.prototype, "onClick", null);
    OffClickDirective = __decorate([core_1.Directive({selector: '[offClick]'}), __metadata('design:paramtypes', [])], OffClickDirective);
    return OffClickDirective;
  }());
  exports.OffClickDirective = OffClickDirective;
  return module.exports;
});

System.registerDynamic("ng2-select/components/select/select", ["@angular/core", "./select-item", "./select-pipes", "./common", "./off-click"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var core_1 = $__require('@angular/core');
  var select_item_1 = $__require('./select-item');
  var select_pipes_1 = $__require('./select-pipes');
  var common_1 = $__require('./common');
  var off_click_1 = $__require('./off-click');
  var styles = "\n.active {\n  background-color: blue;\n}\n\n.ui-select-toggle {\n  position: relative;\n\n  /* hardcoded, should use variable from bootstrap */\n  padding: 0.375rem 0.75rem;\n}\n\n/* Fix Bootstrap dropdown position when inside a input-group */\n.input-group > .dropdown {\n  /* Instead of relative */\n  position: static;\n}\n\n.ui-select-match > .btn {\n  /* Instead of center because of .btn */\n  text-align: left !important;\n}\n\n.ui-select-match > .caret {\n  position: absolute;\n  top: 45%;\n  right: 15px;\n}\n\n.ui-disabled {\n  background-color: #eceeef;\n  border-radius: 4px;\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  z-index: 5;\n  opacity: 0.6;\n  top: 0;\n  left: 0;\n  cursor: not-allowed;\n}\n\n.ui-select-choices {\n  width: 100%;\n  height: auto;\n  max-height: 200px;\n  overflow-x: hidden;\n  margin-top: 0;\n}\n\n.ui-select-multiple .ui-select-choices {\n  margin-top: 1px;\n}\n\n.ui-select-multiple {\n  height: auto;\n  padding: 3px 3px 0 3px;\n}\n\n.ui-select-multiple input.ui-select-search {\n  background-color: transparent !important; /* To prevent double background when disabled */\n  border: none;\n  outline: none;\n  height: 1.9em;\n  margin-bottom: 3px;\n\n  /* hardcoded, should use variable from bootstrap, but must be adjusted because... reasons */\n  padding: 0.375rem 0.55rem;\n}\n\n.ui-select-multiple .ui-select-match-item {\n  outline: 0;\n  margin: 0 3px 3px 0;\n}\n";
  var optionsTemplate = "\n    <ul *ngIf=\"optionsOpened && options && options.length > 0 && !firstItemHasChildren\"\n        class=\"ui-select-choices dropdown-menu\" role=\"menu\">\n      <li *ngFor=\"let o of options\" role=\"menuitem\">\n        <div class=\"ui-select-choices-row\"\n             [class.active]=\"isActive(o)\"\n             (mouseenter)=\"selectActive(o)\"\n             (click)=\"selectMatch(o, $event)\">\n          <a href=\"javascript:void(0)\" class=\"dropdown-item\">\n            <div [innerHtml]=\"o.text | highlight:inputValue\"></div>\n          </a>\n        </div>\n      </li>\n    </ul>\n\n    <ul *ngIf=\"optionsOpened && options && options.length > 0 && firstItemHasChildren\"\n        class=\"ui-select-choices dropdown-menu\" role=\"menu\">\n      <li *ngFor=\"let c of options; let index=index\" role=\"menuitem\">\n        <div class=\"divider dropdown-divider\" *ngIf=\"index > 0\"></div>\n        <div class=\"dropdown-header\">{{c.text}}</div>\n\n        <div *ngFor=\"let o of c.children\"\n             class=\"ui-select-choices-row\"\n             [class.active]=\"isActive(o)\"\n             (mouseenter)=\"selectActive(o)\"\n             (click)=\"selectMatch(o, $event)\"\n             [ngClass]=\"{'active': isActive(o)}\">\n          <a href=\"javascript:void(0)\" class=\"dropdown-item\">\n            <div [innerHtml]=\"o.text | highlight:inputValue\"></div>\n          </a>\n        </div>\n      </li>\n    </ul>\n";
  var SelectComponent = (function() {
    function SelectComponent(element) {
      this.allowClear = false;
      this.placeholder = '';
      this.idField = 'id';
      this.textField = 'text';
      this.multiple = false;
      this.autocomplete = false;
      this.data = new core_1.EventEmitter();
      this.selected = new core_1.EventEmitter();
      this.removed = new core_1.EventEmitter();
      this.typed = new core_1.EventEmitter();
      this.options = [];
      this.itemObjects = [];
      this.preventInputFocus = false;
      this.inputMode = false;
      this.optionsOpened = false;
      this.inputValue = '';
      this._items = [];
      this._searchItems = [];
      this._disabled = false;
      this._active = [];
      this.searchText = '';
      this.searchTimeout = 0;
      this.element = element;
      this.clickedOutside = this.clickedOutside.bind(this);
    }
    Object.defineProperty(SelectComponent.prototype, "searchItems", {
      set: function(value) {
        value = value || [];
        this._searchItems = value.filter(function(item) {
          if (item && item.search && item.id) {
            return item;
          }
        });
      },
      enumerable: true,
      configurable: true
    });
    ;
    Object.defineProperty(SelectComponent.prototype, "items", {
      set: function(value) {
        var _this = this;
        if (!value) {
          this._items = this.itemObjects = [];
        } else {
          this._items = value.filter(function(item) {
            if ((typeof item === 'string' && item) || (typeof item === 'object' && item && item.text && item.id)) {
              return item;
            }
          });
          this.itemObjects = this._items.map(function(item) {
            return (typeof item === 'string' ? new select_item_1.SelectItem(item) : new select_item_1.SelectItem({
              id: item[_this.idField],
              text: item[_this.textField]
            }));
          });
        }
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(SelectComponent.prototype, "disabled", {
      set: function(value) {
        this._disabled = value;
        if (this._disabled === true) {
          this.hideOptions();
        }
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(SelectComponent.prototype, "active", {
      get: function() {
        return this._active;
      },
      set: function(selectedItems) {
        var _this = this;
        if (!selectedItems || selectedItems.length === 0) {
          this._active = [];
        } else {
          var areItemsStrings_1 = typeof selectedItems[0] === 'string';
          this._active = selectedItems.map(function(item) {
            var data = areItemsStrings_1 ? item : {
              id: item[_this.idField],
              text: item[_this.textField]
            };
            return new select_item_1.SelectItem(data);
          });
        }
      },
      enumerable: true,
      configurable: true
    });
    SelectComponent.prototype.showInput = function(e) {
      if (this.preventInputFocus === true) {
        this.preventInputFocus = false;
        return;
      }
      if (this.autocomplete === true) {
        this.inputMode = true;
        if (this.inputMode === true && ((this.multiple === true && e) || this.multiple === false)) {
          this.focusToInput();
        }
      }
    };
    SelectComponent.prototype.hideInput = function(e) {
      if (this.optionsOpened === false && this.inputMode === true) {
        this.inputMode = false;
      }
    };
    SelectComponent.prototype.inputEvent = function(e, isUpMode) {
      var _this = this;
      if (isUpMode === void 0) {
        isUpMode = false;
      }
      if (e.keyCode === 9) {
        return;
      }
      if (isUpMode && (e.keyCode === 37 || e.keyCode === 39 || e.keyCode === 38 || e.keyCode === 40 || e.keyCode === 13)) {
        e.preventDefault();
        return;
      }
      if (!isUpMode && e.keyCode === 8) {
        var el = this.element.nativeElement.querySelector('div.ui-select-container > input');
        if (!el.value || el.value.length <= 0) {
          if (this.active.length > 0) {
            this.remove(this.active[this.active.length - 1]);
          }
          e.preventDefault();
        }
      }
      if (!isUpMode && e.keyCode === 27) {
        this.hideOptions();
        this.element.nativeElement.children[0].focus();
        e.preventDefault();
        return;
      }
      if (!isUpMode && e.keyCode === 46) {
        if (this.active.length > 0) {
          this.remove(this.active[this.active.length - 1]);
          if (this.autocomplete === true) {
            this.inputMode = true;
            this.focusToInput('');
          } else {
            setTimeout(function() {
              var el = _this.element.nativeElement.querySelector('div.ui-select-container .ui-select-match .ui-select-toggle');
              if (el) {
                el.focus();
              }
            }, 0);
          }
          this.open();
        }
        return;
      }
      if (!isUpMode && e.keyCode === 37 && this._items.length > 0) {
        this.behavior.first();
        return;
      }
      if (!isUpMode && e.keyCode === 39 && this._items.length > 0) {
        this.behavior.last();
        return;
      }
      if (!isUpMode && e.keyCode === 38) {
        this.behavior.prev();
        e.preventDefault();
        return;
      }
      if (!isUpMode && e.keyCode === 40) {
        this.behavior.next();
        e.preventDefault();
        return;
      }
      if (!isUpMode && e.keyCode === 13) {
        if (this.active.indexOf(this.activeOption) === -1) {
          this.selectActiveMatch();
          this.behavior.next();
        }
        e.preventDefault();
        return;
      }
      var target = e.target || e.srcElement;
      if (target && target.value !== undefined) {
        this.inputValue = target.value;
        if (this.optionsOpened === false && this.inputValue) {
          this.open();
          this.focusToInput(this.inputValue);
        }
        this.behavior.filter(new RegExp(common_1.escapeRegexp(this.inputValue), 'ig'));
        this.doEvent('typed', this.inputValue);
      }
    };
    SelectComponent.prototype.ngOnInit = function() {
      this.behavior = (this.firstItemHasChildren) ? new ChildrenBehavior(this) : new GenericBehavior(this);
    };
    SelectComponent.prototype.remove = function(item) {
      if (this._disabled === true) {
        return;
      }
      if (this.multiple === true && this.active) {
        var index = this.active.indexOf(item);
        this.active.splice(index, 1);
        this.data.next(this.active);
        this.doEvent('removed', item);
      }
      if (this.multiple === false) {
        this.active = [];
        this.data.next(this.active);
        this.doEvent('removed', item);
      }
    };
    SelectComponent.prototype.doEvent = function(type, value) {
      if (this[type] && value) {
        this[type].next(value);
      }
    };
    SelectComponent.prototype.clickedOutside = function() {
      this.inputMode = false;
      this.optionsOpened = false;
    };
    Object.defineProperty(SelectComponent.prototype, "firstItemHasChildren", {
      get: function() {
        return this.itemObjects[0] && this.itemObjects[0].hasChildren();
      },
      enumerable: true,
      configurable: true
    });
    SelectComponent.prototype.matchClick = function(e) {
      if (this._disabled === true) {
        return;
      }
      if (this.autocomplete === true) {
        this.inputMode = !this.inputMode;
        if (this.inputMode === true && ((this.multiple === true && e) || this.multiple === false)) {
          this.focusToInput();
          this.open();
        }
      } else {
        if ((this.multiple === true && e) || this.multiple === false) {
          this.focusToInput();
          this.open();
        }
      }
    };
    SelectComponent.prototype.mainClick = function(event) {
      var _this = this;
      if (this.inputMode === true || this._disabled === true) {
        return;
      }
      if (event.keyCode === 46) {
        event.preventDefault();
        this.inputEvent(event);
        return;
      }
      if (event.keyCode === 8) {
        event.preventDefault();
        this.inputEvent(event, true);
        return;
      }
      if (event.keyCode === 9 || event.keyCode === 13 || event.keyCode === 27 || (event.keyCode >= 37 && event.keyCode <= 40)) {
        event.preventDefault();
        return;
      }
      this.multiple ? this.inputMode = true : this.inputMode = this.autocomplete;
      if (this.autocomplete === false && this.multiple === false) {
        var keyCode = event.keyCode;
        if ((keyCode >= 65 && keyCode <= 90) || (keyCode >= 97 && keyCode <= 122)) {
          clearTimeout(this.searchTimeout);
          this.searchText += event.key;
          var item_1;
          if (this._searchItems.length) {
            item_1 = this._searchItems.find(function(it) {
              var search = it.search.toLowerCase();
              return search.startsWith(_this.searchText.toLowerCase());
            });
          }
          var opt = void 0;
          if (item_1) {
            opt = this.options.find(function(el) {
              return el.id == item_1.id;
            });
          } else {
            opt = this.options.find(function(el) {
              var text = el.text.toLowerCase();
              return text.startsWith(_this.searchText.toLowerCase());
            });
          }
          if (opt) {
            this.activeOption = opt;
            this.behavior.updateHighlighted();
          }
          this.searchTimeout = setTimeout(function() {
            _this.searchText = "";
          }, 1000);
        }
        return;
      }
      var value = String.fromCharCode(96 <= event.keyCode && event.keyCode <= 105 ? event.keyCode - 48 : event.keyCode).toLowerCase();
      this.focusToInput(value);
      this.open();
      var target = event.target || event.srcElement;
      target.value = value;
      this.inputEvent(event);
    };
    SelectComponent.prototype.selectActive = function(value) {
      this.activeOption = value;
    };
    SelectComponent.prototype.isActive = function(value) {
      return this.activeOption.text === value.text;
    };
    SelectComponent.prototype.focusToInput = function(value) {
      var _this = this;
      if (value === void 0) {
        value = '';
      }
      setTimeout(function() {
        var el = _this.element.nativeElement.querySelector('div.ui-select-container > input');
        if (el) {
          el.focus();
          el.value = value;
        }
      }, 0);
    };
    SelectComponent.prototype.open = function() {
      var _this = this;
      this.options = this.itemObjects.filter(function(option) {
        return (_this.multiple === false || _this.multiple === true && !_this.active.find(function(o) {
          return option.text === o.text;
        }));
      });
      if (this.options.length > 0) {
        this.behavior.first();
      }
      this.optionsOpened = true;
    };
    SelectComponent.prototype.hideOptions = function() {
      this.inputMode = false;
      this.optionsOpened = false;
    };
    SelectComponent.prototype.selectActiveMatch = function() {
      this.selectMatch(this.activeOption);
    };
    SelectComponent.prototype.selectMatch = function(value, e) {
      if (e === void 0) {
        e = void 0;
      }
      if (e) {
        e.stopPropagation();
        e.preventDefault();
      }
      if (this.options.length <= 0) {
        return;
      }
      if (this.multiple === true) {
        this.active.push(value);
        this.data.next(this.active);
      }
      if (this.multiple === false) {
        this.active[0] = value;
        this.data.next(this.active[0]);
      }
      this.doEvent('selected', value);
      this.hideOptions();
      if (this.multiple === true) {
        this.focusToInput('');
      } else {
        this.preventInputFocus = true;
        this.focusToInput(select_pipes_1.stripTags(value.text));
        this.element.nativeElement.querySelector('.ui-select-container').focus();
      }
    };
    __decorate([core_1.Input(), __metadata('design:type', Boolean)], SelectComponent.prototype, "allowClear", void 0);
    __decorate([core_1.Input(), __metadata('design:type', String)], SelectComponent.prototype, "placeholder", void 0);
    __decorate([core_1.Input(), __metadata('design:type', String)], SelectComponent.prototype, "idField", void 0);
    __decorate([core_1.Input(), __metadata('design:type', String)], SelectComponent.prototype, "textField", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Boolean)], SelectComponent.prototype, "multiple", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Boolean)], SelectComponent.prototype, "autocomplete", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Array), __metadata('design:paramtypes', [Array])], SelectComponent.prototype, "searchItems", null);
    __decorate([core_1.Input(), __metadata('design:type', Array), __metadata('design:paramtypes', [Array])], SelectComponent.prototype, "items", null);
    __decorate([core_1.Input(), __metadata('design:type', Boolean), __metadata('design:paramtypes', [Boolean])], SelectComponent.prototype, "disabled", null);
    __decorate([core_1.Input(), __metadata('design:type', Array), __metadata('design:paramtypes', [Array])], SelectComponent.prototype, "active", null);
    __decorate([core_1.Output(), __metadata('design:type', core_1.EventEmitter)], SelectComponent.prototype, "data", void 0);
    __decorate([core_1.Output(), __metadata('design:type', core_1.EventEmitter)], SelectComponent.prototype, "selected", void 0);
    __decorate([core_1.Output(), __metadata('design:type', core_1.EventEmitter)], SelectComponent.prototype, "removed", void 0);
    __decorate([core_1.Output(), __metadata('design:type', core_1.EventEmitter)], SelectComponent.prototype, "typed", void 0);
    SelectComponent = __decorate([core_1.Component({
      selector: 'ng-select',
      directives: [off_click_1.OffClickDirective],
      pipes: [select_pipes_1.HighlightPipe],
      styles: [styles],
      template: "\n  <div tabindex=\"0\"\n     *ngIf=\"multiple === false\"\n     (keyup)=\"mainClick($event)\"\n     (focus)=\"showInput($event)\"\n     [offClick]=\"clickedOutside\"\n     class=\"ui-select-container dropdown open\">\n    <div [ngClass]=\"{'ui-disabled': disabled}\"></div>\n    <div class=\"ui-select-match\"\n         *ngIf=\"!inputMode\">\n      <span tabindex=\"-1\"\n          class=\"btn btn-default btn-secondary form-control ui-select-toggle\"\n          (click)=\"matchClick($event)\"\n          (keydown)=\"inputEvent($event)\"\n          (keyup)=\"inputEvent($event, true)\"\n          style=\"outline: 0;\">\n        <span *ngIf=\"active.length <= 0\" class=\"ui-select-placeholder text-muted\">{{placeholder}}</span>\n        <span *ngIf=\"active.length > 0\" class=\"ui-select-match-text pull-left\"\n              [ngClass]=\"{'ui-select-allow-clear': allowClear && active.length > 0}\"\n              [innerHTML]=\"active[0].text\"></span>\n        <i class=\"dropdown-toggle pull-right\"></i>\n        <i class=\"caret pull-right\"></i>\n        <a *ngIf=\"allowClear && active.length>0\" style=\"margin-right: 10px; padding: 0;\"\n          (click)=\"remove(activeOption)\" class=\"close pull-right\">\n          &times;\n        </a>\n      </span>\n    </div>\n    <input type=\"text\" autocomplete=\"off\" tabindex=\"-1\"\n           (keydown)=\"inputEvent($event)\"\n           (keyup)=\"inputEvent($event, true)\"\n           (blur)=\"hideInput($event)\"\n           [disabled]=\"disabled\"\n           class=\"form-control ui-select-search\"\n           *ngIf=\"inputMode\"\n           placeholder=\"{{activeOption ? activeOption.text : placeholder}}\">\n      " + optionsTemplate + "\n  </div>\n\n  <div tabindex=\"0\"\n     *ngIf=\"multiple === true\"\n     (keyup)=\"mainClick($event)\"\n     (focus)=\"focusToInput('')\"\n     class=\"ui-select-container ui-select-multiple dropdown form-control open\">\n    <div [ngClass]=\"{'ui-disabled': disabled}\"></div>\n    <span class=\"ui-select-match\">\n        <span *ngFor=\"let a of active\">\n            <span class=\"ui-select-match-item btn btn-default btn-secondary btn-sm\"\n                  tabindex=\"-1\"\n                  type=\"button\"\n                  [ngClass]=\"{'btn-default': true}\">\n               <a class=\"close\"\n                  style=\"margin-left: 10px; padding: 0;\"\n                  (click)=\"remove(a)\">&times;</a>\n               <span>{{a.text}}</span>\n           </span>\n        </span>\n    </span>\n    <input type=\"text\"\n           (keydown)=\"inputEvent($event)\"\n           (keyup)=\"inputEvent($event, true)\"\n           (click)=\"matchClick($event)\"\n           [disabled]=\"disabled\"\n           autocomplete=\"off\"\n           autocorrect=\"off\"\n           autocapitalize=\"off\"\n           spellcheck=\"false\"\n           class=\"form-control ui-select-search\"\n           placeholder=\"{{active.length <= 0 ? placeholder : ''}}\"\n           role=\"combobox\">\n    " + optionsTemplate + "\n  </div>\n  "
    }), __metadata('design:paramtypes', [core_1.ElementRef])], SelectComponent);
    return SelectComponent;
  }());
  exports.SelectComponent = SelectComponent;
  var Behavior = (function() {
    function Behavior(actor) {
      this.optionsMap = new Map();
      this.actor = actor;
    }
    Behavior.prototype.fillOptionsMap = function() {
      var _this = this;
      this.optionsMap.clear();
      var startPos = 0;
      this.actor.itemObjects.map(function(item) {
        startPos = item.fillChildrenHash(_this.optionsMap, startPos);
      });
    };
    Behavior.prototype.ensureHighlightVisible = function(optionsMap) {
      if (optionsMap === void 0) {
        optionsMap = void 0;
      }
      var container = this.actor.element.nativeElement.querySelector('.ui-select-choices');
      if (!container) {
        return;
      }
      var choices = container.querySelectorAll('.ui-select-choices-row');
      if (choices.length < 1) {
        return;
      }
      var activeIndex = this.getActiveIndex(optionsMap);
      if (activeIndex < 0) {
        return;
      }
      var highlighted = choices[activeIndex];
      if (!highlighted) {
        return;
      }
      var posY = highlighted.offsetTop + highlighted.clientHeight - container.scrollTop;
      var height = container.offsetHeight;
      if (posY > height) {
        container.scrollTop += posY - height;
      } else if (posY < highlighted.clientHeight) {
        container.scrollTop -= highlighted.clientHeight - posY;
      }
    };
    Behavior.prototype.getActiveIndex = function(optionsMap) {
      if (optionsMap === void 0) {
        optionsMap = void 0;
      }
      var ai = this.actor.options.indexOf(this.actor.activeOption);
      if (ai < 0 && optionsMap !== void 0) {
        ai = optionsMap.get(this.actor.activeOption.id);
      }
      return ai;
    };
    return Behavior;
  }());
  exports.Behavior = Behavior;
  var GenericBehavior = (function(_super) {
    __extends(GenericBehavior, _super);
    function GenericBehavior(actor) {
      _super.call(this, actor);
    }
    GenericBehavior.prototype.first = function() {
      this.actor.activeOption = this.actor.options[0];
      _super.prototype.ensureHighlightVisible.call(this);
    };
    GenericBehavior.prototype.last = function() {
      this.actor.activeOption = this.actor.options[this.actor.options.length - 1];
      _super.prototype.ensureHighlightVisible.call(this);
    };
    GenericBehavior.prototype.prev = function() {
      var index = this.actor.options.indexOf(this.actor.activeOption);
      this.actor.activeOption = this.actor.options[index - 1 < 0 ? this.actor.options.length - 1 : index - 1];
      _super.prototype.ensureHighlightVisible.call(this);
    };
    GenericBehavior.prototype.next = function() {
      var index = this.actor.options.indexOf(this.actor.activeOption);
      this.actor.activeOption = this.actor.options[index + 1 > this.actor.options.length - 1 ? 0 : index + 1];
      _super.prototype.ensureHighlightVisible.call(this);
    };
    GenericBehavior.prototype.updateHighlighted = function() {
      _super.prototype.ensureHighlightVisible.call(this);
    };
    GenericBehavior.prototype.filter = function(query) {
      var _this = this;
      var options = this.actor.itemObjects.filter(function(option) {
        return select_pipes_1.stripTags(option.text).match(query) && (_this.actor.multiple === false || (_this.actor.multiple === true && _this.actor.active.map(function(item) {
          return item.id;
        }).indexOf(option.id) < 0));
      });
      this.actor.options = options;
      if (this.actor.options.length > 0) {
        this.actor.activeOption = this.actor.options[0];
        _super.prototype.ensureHighlightVisible.call(this);
      }
    };
    return GenericBehavior;
  }(Behavior));
  exports.GenericBehavior = GenericBehavior;
  var ChildrenBehavior = (function(_super) {
    __extends(ChildrenBehavior, _super);
    function ChildrenBehavior(actor) {
      _super.call(this, actor);
    }
    ChildrenBehavior.prototype.first = function() {
      this.actor.activeOption = this.actor.options[0].children[0];
      this.fillOptionsMap();
      this.ensureHighlightVisible(this.optionsMap);
    };
    ChildrenBehavior.prototype.last = function() {
      this.actor.activeOption = this.actor.options[this.actor.options.length - 1].children[this.actor.options[this.actor.options.length - 1].children.length - 1];
      this.fillOptionsMap();
      this.ensureHighlightVisible(this.optionsMap);
    };
    ChildrenBehavior.prototype.prev = function() {
      var _this = this;
      var indexParent = this.actor.options.findIndex(function(option) {
        return _this.actor.activeOption.parent && _this.actor.activeOption.parent.id === option.id;
      });
      var index = this.actor.options[indexParent].children.findIndex(function(option) {
        return _this.actor.activeOption && _this.actor.activeOption.id === option.id;
      });
      this.actor.activeOption = this.actor.options[indexParent].children[index - 1];
      if (!this.actor.activeOption) {
        if (this.actor.options[indexParent - 1]) {
          this.actor.activeOption = this.actor.options[indexParent - 1].children[this.actor.options[indexParent - 1].children.length - 1];
        }
      }
      if (!this.actor.activeOption) {
        this.last();
      }
      this.fillOptionsMap();
      this.ensureHighlightVisible(this.optionsMap);
    };
    ChildrenBehavior.prototype.next = function() {
      var _this = this;
      var indexParent = this.actor.options.findIndex(function(option) {
        return _this.actor.activeOption.parent && _this.actor.activeOption.parent.id === option.id;
      });
      var index = this.actor.options[indexParent].children.findIndex(function(option) {
        return _this.actor.activeOption && _this.actor.activeOption.id === option.id;
      });
      this.actor.activeOption = this.actor.options[indexParent].children[index + 1];
      if (!this.actor.activeOption) {
        if (this.actor.options[indexParent + 1]) {
          this.actor.activeOption = this.actor.options[indexParent + 1].children[0];
        }
      }
      if (!this.actor.activeOption) {
        this.first();
      }
      this.fillOptionsMap();
      this.ensureHighlightVisible(this.optionsMap);
    };
    ChildrenBehavior.prototype.updateHighlighted = function() {
      _super.prototype.ensureHighlightVisible.call(this);
    };
    ChildrenBehavior.prototype.filter = function(query) {
      var options = [];
      var optionsMap = new Map();
      var startPos = 0;
      for (var _i = 0,
          _a = this.actor.itemObjects; _i < _a.length; _i++) {
        var si = _a[_i];
        var children = si.children.filter(function(option) {
          return query.test(option.text);
        });
        startPos = si.fillChildrenHash(optionsMap, startPos);
        if (children.length > 0) {
          var newSi = si.getSimilar();
          newSi.children = children;
          options.push(newSi);
        }
      }
      this.actor.options = options;
      if (this.actor.options.length > 0) {
        this.actor.activeOption = this.actor.options[0].children[0];
        _super.prototype.ensureHighlightVisible.call(this, optionsMap);
      }
    };
    return ChildrenBehavior;
  }(Behavior));
  exports.ChildrenBehavior = ChildrenBehavior;
  return module.exports;
});

System.registerDynamic("ng2-select/ng2-select", ["./components/select", "./components/select/select"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  function __export(m) {
    for (var p in m)
      if (!exports.hasOwnProperty(p))
        exports[p] = m[p];
  }
  var select_1 = $__require('./components/select');
  __export($__require('./components/select/select'));
  __export($__require('./components/select'));
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.default = {directives: [select_1.SELECT_DIRECTIVES]};
  return module.exports;
});

//# sourceMappingURL=ng2-select.js.map