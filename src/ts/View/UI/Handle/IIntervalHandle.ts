import Constants from 'Helpers/enums';

interface IIntervalHandle {
  moveElement(percentage: number, elementType: Constants): void;
}

export { IIntervalHandle };
