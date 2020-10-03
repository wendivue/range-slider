class Model {
  private data: Record<string, number>;

  constructor() {
    this.data = {
      single: null,
      from: null,
      to: null,
      inputSingle: null,
      inputFrom: null,
      inputTo: null,
    };
  }

  add(value: any, prop: string): void {
    const obj = this.data;
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        if (key === prop) value = { [key]: value };
      }
    }

    this.data = { ...this.data, ...value };
  }

  get(prop: string): number {
    const obj = this.data;
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        if (key === prop) return obj[key];
      }
    }
  }
}

export default Model;
