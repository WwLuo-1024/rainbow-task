/* eslint-disable prettier/prettier */
class BaseModel {
  data: string | null;
  message: string | null;
  constructor(data: string | null, message: string | null) {
    if (typeof data === 'string') {
      this.message = data;
      data = null;
      message = null;
    }

    if (data) {
      this.data = data;
    }

    if (message) {
      this.message = message;
    }
  }
}

export class SuccessModel extends BaseModel {
  errno: number;
  constructor(data: any, message?: string | null) {
    super(data, message);
    this.errno = 0;
  }
}

export class ErrorModel extends BaseModel {
  errno: number;
  constructor(data: string | null, message: string | null) {
    super(data, message);
    this.errno = -1;
  }
}
