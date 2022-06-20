import * as React from 'react';
import { TextField, DatePicker } from '@fluentui/react';

export interface IShapeShifterProps {
  label?: string;
  onChange: (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string | null) => void 
  controlType: ComponentFramework.PropertyTypes.EnumProperty<"TextField" | "Date">;
  default: string | undefined;
}

export class ShapeShifter extends React.Component<IShapeShifterProps> {

  public render(): React.ReactNode {
    let el = (this.props.controlType.raw == "TextField") ?
      <TextField onChange={this.props.onChange} label={this.props.label} defaultValue={this.props.default}></TextField> :
      <DatePicker label={this.props.label} defaultValue={this.props.default}></DatePicker>
    return el
  }
}
