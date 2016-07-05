export interface OptionsBehavior {
    first(): any;
    last(): any;
    prev(): any;
    next(): any;
    updateHighlighted(): any;
    selected(): any;
    filter(query: RegExp): any;
}
