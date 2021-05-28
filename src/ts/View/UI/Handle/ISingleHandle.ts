import Constants from 'Helpers/enums';

interface ISingleHandle {
  moveElement(percentage: number, elementType: Constants): void;
}

export { ISingleHandle };
