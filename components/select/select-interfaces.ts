export interface OptionsBehavior {
  first():any;
  last():any;
  prev():any;
  next():any;
  selected():any;
  filter(query:RegExp):any;
}
