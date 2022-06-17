import * as React from 'react';
import { TextField, DatePicker } from '@fluentui/react';

export interface IShapeShifterProps {
  label?: string;
  controlType: string | null;
  default: string | undefined;
}

export class ShapeShifter extends React.Component<IShapeShifterProps> {

  public render(): React.ReactNode {
    let el = (this.props.controlType == "TextField") ?
      <TextField label={this.props.label}></TextField> :
      <DatePicker label={this.props.label}></DatePicker>
    return el
  }
}
