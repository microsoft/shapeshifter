/* eslint-disable no-undef */
import * as React from 'react';
import { TextField, DatePicker } from '@fluentui/react';

export interface IShapeShifterProps {
  label?: string;
  onChange: ()=> void;
  controlType: ComponentFramework.PropertyTypes.EnumProperty<"TextField" | "Date">;
  default: string | undefined;
  onSelectedDate?: (date:any) => void;
}

export class ShapeShifter extends React.Component<IShapeShifterProps> {

  public render(): React.ReactNode {
    let el, theDate;
    switch (this.props.controlType.raw) {
      case "TextField":
        el = <TextField onChange={this.props.onChange} label={this.props.label} defaultValue={this.props.default}></TextField>
        break;
      case "Date":
        theDate = (this.props.default == undefined) ? new Date() : new Date(this.props.default);
        el = <DatePicker onSelectDate={this.props.onSelectedDate} label={this.props.label} defaultValue={this.props.default} value={theDate}></DatePicker>
        break;
    
      default:
        break;
    }
    return el
  }
}
