/* eslint-disable no-undef */
import * as React from 'react';
import { TextField, DatePicker, Async, Slider, Rating, Dropdown, ChoiceGroup } from '@fluentui/react';
import { IShapeShifterProps } from './IShapeShifterProps';

export class ShapeShifter extends React.Component<IShapeShifterProps> {
  private _async: Async = new Async();

  public render(): React.ReactNode {
    let el, theDate;

    // Determine what type of control to render and assign it to el
    switch (this.props.controlType.raw) {
      case "TextField":
        el = <TextField onChange={this._async.debounce(this.props.onChange, 1000)} label={this.props.label} defaultValue={this.props.default}></TextField>
        break;
      case "Date":
        // handle nulls if they exist
        theDate = (this.props.default == undefined) ? new Date() : new Date(this.props.default);
        el = <DatePicker onSelectDate={this.props.onSelectedDate} label={this.props.label} defaultValue={this.props.default} value={theDate}></DatePicker>
        break;
      case "Rating":
        el = <Rating min={1} max={5} onChange={this.props.onChange} defaultValue={this.props.default}></Rating>
        break;
      case "Slider":
        el = <Slider
          label={this.props.label}
          max={22}
          defaultValue={this.props.defaultNumber}
          showValue
          // eslint-disable-next-line react/jsx-no-bind
          onChange={this.props.onSliderChange}
        />
        break;
      case "Dropdown":
        el = <Dropdown
          label={this.props.label}
          defaultSelectedKey={this.props.default} // I think this ultimately is the way to do it
          onChange={this.props.onDropdownChange}
          options={this.props.dropdownOptions} />
        break;
      case "ChoiceGroup":
        el = <ChoiceGroup
          label={this.props.label}
          options={this.props.choiceGroupOptions}
          defaultSelectedKey={this.props.default}
          onChange={this.props.onChoiceGroupChange}
        />
        break;
      default:
        break;
    }
    // Return the appropriate control
    return el
  }
}
