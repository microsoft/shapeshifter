/* eslint-disable no-undef */
import { IInputs, IOutputs } from "./generated/ManifestTypes";
import { ShapeShifter, IShapeShifterProps } from "./ShapeShifter";
import * as React from "react";
import { DropdownMenuItemType, IDropdownOption } from "@fluentui/react";

export class Shapeshifter
  implements ComponentFramework.ReactControl<IInputs, IOutputs>
{
  private theComponent: ComponentFramework.ReactControl<IInputs, IOutputs>;
  private notifyOutputChanged: () => void;
  private currentValue: string | null | undefined;
  private defaultValue: string | null;
  private _state: ComponentFramework.Dictionary;

  /**
   * Empty constructor.
   */
  constructor() {}

  /**
   * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
   * Data-set values are not initialized here, use updateView.
   * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
   * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
   * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
   */
  public init(
    context: ComponentFramework.Context<IInputs>,
    notifyOutputChanged: () => void,
    state: ComponentFramework.Dictionary
  ): void {
    this._state = state;
    console.log("using virtual control in ShapeShifter");
    this.defaultValue = context.parameters.Default.raw;
    this.notifyOutputChanged = notifyOutputChanged;
  }

  private onSliderChange = (newValue: number) => {
    this.onChange({}, newValue.toString());
  };

  private onSelectedDate = (date: Date) => {
    this.onChange({}, date.toDateString());
  };

  private onChange = (e?: any, newValue?: string | null) => {
    this.currentValue = newValue;
    this.notifyOutputChanged();
  };

  private tryParseJSONObject(jsonstring: string | null): boolean {
    if (jsonstring == null) return false;
    try {
      JSON.parse(jsonstring);
      return true;
    } catch (e) {
      return false;
    }
  }

  private renderControl(
    context: ComponentFramework.Context<IInputs>
  ): React.ReactElement {
    console.log("entered renderControl in index.ts", context.updatedProperties);

    this.currentValue = context.parameters.Default.raw;
    const _lbl =
      context.parameters.Label.raw == null ? "" : context.parameters.Label.raw;

    const _default =
      context.parameters.Default.raw == null
        ? ""
        : context.parameters.Default.raw;

    const _defaultNo = Number(_default);

    const _optionsString =
      this.tryParseJSONObject(context.parameters.Options.raw) &&
      context.parameters.Options.raw != null
        ? context.parameters.Options.raw
        : `{ "dropdownOptions": [
      { "key": "apple", "text": "Apple" },
      { "key": "banana", "text": "Banana" },
      { "key": "orange", "text": "Orange", "disabled": true },
      { "key": "grape", "text": "Grape" },
      { "key": "broccoli", "text": "Broccoli" },
      { "key": "carrot", "text": "Carrot" },
      { "key": "lettuce", "text": "Lettuce" }
    ]}`;

    const _options = JSON.parse(_optionsString);

    const props: IShapeShifterProps = {
      label: _lbl,
      controlType: context.parameters.ControlType,
      default: _default,
      defaultNumber: _defaultNo,
      onChange: this.onChange,
      onSelectedDate: this.onSelectedDate,
      onSliderChange: this.onSliderChange,
      dropdownOptions: _options["dropdownOptions"],
    };
    return React.createElement(ShapeShifter, props);
  }

  /**
   * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
   * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
   * @returns ReactElement root react element for the control
   */
  public updateView(
    context: ComponentFramework.Context<IInputs>
  ): React.ReactElement {
    return this.renderControl(context);
  }

  /**
   * It is called by the framework prior to a control receiving new data.
   * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
   */
  public getOutputs(): IOutputs {
    return {
      Value: this.currentValue == null ? undefined : this.currentValue,
    };
  }

  /**
   * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
   * i.e. cancelling any pending remote calls, removing listeners, etc.
   */
  public destroy(): void {
    // Add code to cleanup control if necessary
  }
}
