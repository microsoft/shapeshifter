import { IDropdownOption, IChoiceGroupOption } from '@fluentui/react';

/** React Properties for the ShapeShifter Component */

export interface IShapeShifterProps {
  /** Optional Label Property for ShapeShifter */
  label?: string;
  /** Handles generic changes for ShapeShifter */
  onChange: () => void;
  /** Property that we read to determine what time of FluentUI Component to render. New components need to be enumerated here.*/
  controlType: ComponentFramework.PropertyTypes.EnumProperty<"TextField" | "Date" | "Slider" | "Dropdown" | "ChoiceGroup">;
  /** Optional default string value for ShapeShifter */
  default?: string | undefined;
  /** Optional default number value for ShapeShifter */
  defaultNumber?: number | undefined;
  /** Handles a date selection for ShapeShifter */
  onSelectedDate?: (date: any) => void;
  /** Handles slider value changes for ShapeShifter */
  onSliderChange?: (newValue: any) => void;
  /** Handles dropdown value changes for ShapeShifter */
  onDropdownChange?: (e: any, selectedItem: any) => void;
  /** Handles choice group changes for ShapeShifter */
  onChoiceGroupChange?: (e: any, selectedItem: any) => void;
  /** Options for ShapeShifter if it is rendering as a DropDown */
  dropdownOptions: IDropdownOption[];
  /** Options for ShapeShifter if it is rendering as a ChoiceGroup */
  choiceGroupOptions: IChoiceGroupOption[];
}
